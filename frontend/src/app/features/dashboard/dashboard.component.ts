import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardData, Eleccion, Cargo, Partido, Zona, Provincia, Canton, Parroquia, InstitucionEducativa, Mesa, ResultadoCandidato, CandidatoDetalleResponse, GeoGroup, MesaCerradaResponse } from '../../core/models';
import { GeoGroupTableComponent } from './geo-group-table.component';
import { Subscription } from 'rxjs';
import { catchError, of } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, GeoGroupTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;

  elecciones: Eleccion[] = [];
  selectedEleccionId: number | null = null;
  dashboard: DashboardData | null = null;
  eleccionNombre = '';

  resultados: ResultadoCandidato[] = [];
  resultadosOrdenados: ResultadoCandidato[] = [];

  sortColumn: string = 'votos';
  sortDirection: 'asc' | 'desc' = 'desc';

  zonas: Zona[] = [];
  provincias: Provincia[] = [];
  cantones: Canton[] = [];
  parroquias: Parroquia[] = [];
  instituciones: InstitucionEducativa[] = [];
  cargos: Cargo[] = [];
  partidos: Partido[] = [];

  filtroZonaId: number | null = null;
  filtroProvinciaId: number | null = null;
  filtroCantonId: number | null = null;
  filtroParroquiaId: number | null = null;
  filtroInstitucionId: number | null = null;
  filtroCargoId: number | null = null;
  filtroPartidoId: number | null = null;
  filtroMesaId: number | null = null;

  mesas: Mesa[] = [];
  userRole: string = '';

  ultimaActualizacion = '';
  filtrosMinimized = true;

  // Card toggle states
  barChartMinimized = false;
  barChartFullscreen = false;
  pieChartMinimized = false;
  pieChartFullscreen = false;
  resultadosMinimized = false;
  resultadosFullscreen = false;

  // Candidate detail modal
  showDetalle = false;
  detalleCandidato: CandidatoDetalleResponse | null = null;
  detalleLoading = false;
  geoDetalleTab = 'mesas';
  geoDetalleTabs: { key: string; label: string; count: number }[] = [];

  // Closed mesas modal
  showMesasCerradas = false;
  mesasCerradasList: MesaCerradaResponse[] = [];
  mesasCerradasLoading = false;

  // Reabrir mesa - password confirmation
  showReabrirConfirm = false;
  reabrirMesaSeleccionada: MesaCerradaResponse | null = null;
  reabrirPassword = '';
  reabrirError = '';
  reabrirCargando = false;

  private barChart?: Chart;
  private pieChart?: Chart;
  private wsSubscription?: Subscription;

  constructor(
    private api: ApiService,
    private wsService: WebSocketService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const user = this.authService.getCurrentUser();
    this.userRole = user?.rol || '';
  }

  toggleMinimize(card: string): void {
    if (card === 'barChart') this.barChartMinimized = !this.barChartMinimized;
    else if (card === 'pieChart') this.pieChartMinimized = !this.pieChartMinimized;
    else if (card === 'resultados') this.resultadosMinimized = !this.resultadosMinimized;
  }

  toggleFullscreen(card: string): void {
    const activating = card === 'barChart' ? !this.barChartFullscreen
      : card === 'pieChart' ? !this.pieChartFullscreen
      : !this.resultadosFullscreen;
    this.barChartFullscreen = false;
    this.pieChartFullscreen = false;
    this.resultadosFullscreen = false;
    if (activating) {
      if (card === 'barChart') this.barChartFullscreen = true;
      else if (card === 'pieChart') this.pieChartFullscreen = true;
      else if (card === 'resultados') this.resultadosFullscreen = true;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    setTimeout(() => {
      this.barChart?.resize();
      this.pieChart?.resize();
    }, 100);
  }

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((elecciones: Eleccion[]) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        this.selectedEleccionId = elecciones[0].id;
        this.eleccionNombre = elecciones[0].nombre;
        this.loadZonas();
        this.loadMesas();
        this.loadDashboard();
        this.subscribeToUpdates();
        this.subscribeToMesaEstado();
      }
    });
  }

  private procesarResultados(data: DashboardData): void {
    const resultados = [...(data.resultados || [])];
    const totalVotosNulos = data.totalVotosNulos || 0;
    if (totalVotosNulos > 0) {
      const totalGeneral = data.totalVotos + totalVotosNulos;
      resultados.push({
        candidatoId: 0,
        nombreCompleto: 'Votos Nulos',
        partidoNombre: '—',
        cargoNombre: '—',
        totalVotos: totalVotosNulos,
        porcentaje: totalGeneral > 0 ? Math.round(totalVotosNulos * 10000 / totalGeneral) / 100 : 0
      });
    }
    this.resultados = resultados;
  }

  private subscribeToMesaEstado(): void {
    if (!this.selectedEleccionId) return;
    this.wsService.subscribeToMesaEstado(this.selectedEleccionId).subscribe({
      next: (msg: any) => {
        if (msg.tipo === 'mesa-estado') {
          this.loadDashboard();
          if (this.showMesasCerradas && !msg.cerrada) {
            this.mesasCerradasList = this.mesasCerradasList.filter(m => m.id !== msg.mesaId);
          }
        }
      },
      error: () => {}
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
      this.updateCharts();
    }, 100);
  }

  loadDataComplete(): void {
    this.updateCharts();
    this.ultimaActualizacion = new Date().toLocaleTimeString();
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    this.barChart?.destroy();
    this.pieChart?.destroy();
    document.body.style.overflow = '';
  }

  recargarSilencioso(): void {
    if (!this.selectedEleccionId) return;
    const tieneFiltros = this.filtroZonaId || this.filtroProvinciaId || this.filtroCantonId ||
                         this.filtroParroquiaId || this.filtroInstitucionId || this.filtroCargoId || this.filtroPartidoId || this.filtroMesaId;
    const obs = tieneFiltros ? this.api.getDashboardConFiltros(
      this.selectedEleccionId,
      this.filtroCargoId ?? undefined,
      this.filtroPartidoId ?? undefined,
      this.filtroZonaId ?? undefined,
      this.filtroProvinciaId ?? undefined,
      this.filtroCantonId ?? undefined,
      this.filtroParroquiaId ?? undefined,
      this.filtroInstitucionId ?? undefined,
      this.filtroMesaId ?? undefined
    ) : this.api.getDashboard(this.selectedEleccionId);

    obs.subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.loadDataComplete();
    });
  }

  onEleccionChange(event: Event): void {
    this.selectedEleccionId = Number((event.target as HTMLSelectElement).value);
    const eleccion = this.elecciones.find(e => e.id === this.selectedEleccionId);
    this.eleccionNombre = eleccion?.nombre || '';
    this.loadDashboard();
    this.subscribeToUpdates();
  }

  loadZonas(): void {
    this.api.getZonas().subscribe((data: Zona[]) => {
      this.zonas = data;
    });
  }

  onZonaChange(): void {
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroZonaId) {
      this.api.getProvinciasByZona(this.filtroZonaId).subscribe((data: Provincia[]) => {
        this.provincias = data;
      });
    }
    this.aplicarFiltros();
  }

  onProvinciaChange(): void {
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroProvinciaId) {
      this.api.getCantonesByProvincia(this.filtroProvinciaId).subscribe((data: Canton[]) => {
        this.cantones = data;
      });
    }
    this.aplicarFiltros();
  }

  onCantonChange(): void {
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroCantonId) {
      this.api.getParroquiasByCanton(this.filtroCantonId).subscribe((data: Parroquia[]) => {
        this.parroquias = data;
      });
    }
    this.aplicarFiltros();
  }

  onParroquiaChange(): void {
    this.filtroInstitucionId = null;
    this.instituciones = [];
    if (this.filtroParroquiaId) {
      this.api.getInstitucionesByParroquia(this.filtroParroquiaId).subscribe((data: InstitucionEducativa[]) => {
        this.instituciones = data;
      });
    }
    this.aplicarFiltros();
  }

  onInstitucionChange(): void {
    this.aplicarFiltros();
  }

  loadDashboard(): void {
    if (!this.selectedEleccionId) return;
    this.api.getDashboard(this.selectedEleccionId).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.cdr.detectChanges();
      this.loadDataComplete();
    });
    this.api.getCargosByEleccion(this.selectedEleccionId).subscribe((data: Cargo[]) => {
      this.cargos = data;
    });
    this.api.getPartidosByEleccion(this.selectedEleccionId).subscribe((data: Partido[]) => {
      this.partidos = data;
    });
  }

  loadMesas(): void {
    if (!this.selectedEleccionId) return;
    this.api.getMesasByCurrentUser(this.selectedEleccionId).subscribe((data: Mesa[]) => {
      this.mesas = data;
    });
  }

  aplicarFiltros(): void {
    if (!this.selectedEleccionId) return;
    this.api.getDashboardConFiltros(
      this.selectedEleccionId,
      this.filtroCargoId ?? undefined,
      this.filtroPartidoId ?? undefined,
      this.filtroZonaId ?? undefined,
      this.filtroProvinciaId ?? undefined,
      this.filtroCantonId ?? undefined,
      this.filtroParroquiaId ?? undefined,
      this.filtroInstitucionId ?? undefined,
      this.filtroMesaId ?? undefined
    ).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.cdr.detectChanges();
      this.loadDataComplete();
    });
  }

  onMesaChange(): void {
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.filtroZonaId = null;
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.filtroCargoId = null;
    this.filtroPartidoId = null;
    this.filtroMesaId = null;
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.loadDashboard();
  }

  subscribeToUpdates(): void {
    this.wsSubscription?.unsubscribe();
    if (!this.selectedEleccionId) return;
    this.wsSubscription = this.wsService.subscribeToResultados(this.selectedEleccionId)
      .pipe(catchError(err => { console.warn('WebSocket error:', err); return of(null as any); }))
      .subscribe((data: DashboardData | null) => {
        if (data) {
          this.dashboard = data;
          this.procesarResultados(data);
          this.ordenarResultados();
          this.loadDataComplete();
        }
      });
  }

  ordenarResultados(): void {
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    this.resultadosOrdenados = [...this.resultados].sort((a: any, b: any) => {
      switch (this.sortColumn) {
        case 'nombreCompleto': return dir * a.nombreCompleto.localeCompare(b.nombreCompleto);
        case 'partidoNombre': return dir * a.partidoNombre.localeCompare(b.partidoNombre);
        case 'cargoNombre': return dir * a.cargoNombre.localeCompare(b.cargoNombre);
        case 'porcentaje': return dir * (a.porcentaje - b.porcentaje);
        default: return dir * (a.totalVotos - b.totalVotos);
      }
    });
    this.computeTop3();
  }

  top3Cargos: Map<string, Set<string>> = new Map();

  private computeTop3(): void {
    const grupos = new Map<string, any[]>();
    for (const r of this.resultadosOrdenados) {
      if (r.candidatoId === 0) continue;
      const key = r.cargoNombre;
      if (!grupos.has(key)) grupos.set(key, []);
      grupos.get(key)!.push(r);
    }
    const top3 = new Map<string, Set<string>>();
    for (const [cargo, items] of grupos) {
      const sorted = [...items].sort((a, b) => b.totalVotos - a.totalVotos);
      const top = new Set<string>();
      sorted.slice(0, 3).forEach(r => top.add(r.nombreCompleto));
      top3.set(cargo, top);
    }
    this.top3Cargos = top3;
  }

  setSortColumn(col: string): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'desc';
    }
    this.ordenarResultados();
  }

  getRowClass(r: any): string {
    if (r.candidatoId === 0) return 'nulos-row';
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter(x => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0)]
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .findIndex(x => x.nombreCompleto === r.nombreCompleto);
      return 'candidato-row top-' + (idx + 1);
    }
    return 'candidato-row';
  }

  getRankClass(r: any): string {
    if (r.candidatoId === 0) return 'candidato-rank rank-nulos';
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter(x => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0)]
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .findIndex(x => x.nombreCompleto === r.nombreCompleto);
      return 'candidato-rank rank-top-' + (idx + 1);
    }
    return 'candidato-rank';
  }

  getRankLabel(r: any, i: number): string {
    if (r.candidatoId === 0) return '✗';
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter(x => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0)]
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .findIndex(x => x.nombreCompleto === r.nombreCompleto);
      return ['🥇', '🥈', '🥉'][idx] || (i + 1).toString();
    }
    return (i + 1).toString();
  }

  getSortIcon(col: string): string {
    if (this.sortColumn !== col) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  initCharts(): void {
    if (this.barChartRef?.nativeElement) {
      if (this.barChart) this.barChart.destroy();
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: { responsive: true, animation: false, plugins: { legend: { display: false } } }
      });
    }
    if (this.pieChartRef?.nativeElement) {
      if (this.pieChart) this.pieChart.destroy();
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: { labels: [], datasets: [] },
        options: { responsive: true, animation: false, plugins: { legend: { position: 'bottom' } } }
      });
    }
  }

  updateCharts(): void {
    if (!this.dashboard?.resultados) return;
    const resultados: any[] = this.dashboard.resultados;
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    if (this.barChart) {
      this.barChart.data.labels = resultados.map((r: any) => r.nombreCompleto);
      this.barChart.data.datasets = [{
        data: resultados.map((r: any) => r.totalVotos),
        backgroundColor: colors.slice(0, resultados.length)
      }];
      this.barChart.update('none');
    }
    if (this.pieChart) {
      this.pieChart.data.labels = resultados.map((r: any) => r.nombreCompleto);
      this.pieChart.data.datasets = [{
        data: resultados.map((r: any) => r.totalVotos),
        backgroundColor: colors.slice(0, resultados.length)
      }];
      this.pieChart.update('none');
    }
  }

  getFiltrosActuales(): any {
    const f: any = {};
    if (this.filtroCargoId) f.cargoId = this.filtroCargoId;
    if (this.filtroPartidoId) f.partidoId = this.filtroPartidoId;
    if (this.filtroZonaId) f.zonaId = this.filtroZonaId;
    if (this.filtroProvinciaId) f.provinciaId = this.filtroProvinciaId;
    if (this.filtroCantonId) f.cantonId = this.filtroCantonId;
    if (this.filtroParroquiaId) f.parroquiaId = this.filtroParroquiaId;
    if (this.filtroInstitucionId) f.institucionId = this.filtroInstitucionId;
    return f;
  }

  exportarPdf(): void {
    if (this.selectedEleccionId) {
      this.api.exportDashboardPdf(this.selectedEleccionId, this.getFiltrosActuales());
    }
  }

  exportarExcel(): void {
    if (this.selectedEleccionId) {
      this.api.exportDashboardExcel(this.selectedEleccionId, this.getFiltrosActuales());
    }
  }

  verDetalleCandidato(candidatoId: number): void {
    if (!this.selectedEleccionId) return;
    this.detalleLoading = true;
    this.showDetalle = true;
    this.geoDetalleTab = 'mesas';
    this.api.getDetalleCandidato(candidatoId, this.selectedEleccionId).subscribe({
      next: (data) => {
        this.detalleCandidato = data;
        this.detalleLoading = false;
        this.geoDetalleTabs = [
          { key: 'mesas', label: 'Mesas', count: data.votosPorMesa?.length || 0 },
          { key: 'zonas', label: 'Zonas', count: data.zonas?.length || 0 },
          { key: 'provincias', label: 'Provincias', count: data.provincias?.length || 0 },
          { key: 'cantones', label: 'Cantones', count: data.cantones?.length || 0 },
          { key: 'parroquias', label: 'Parroquias', count: data.parroquias?.length || 0 },
          { key: 'instituciones', label: 'Instituciones', count: data.instituciones?.length || 0 },
        ].filter(t => t.count > 0);
      },
      error: () => { this.detalleLoading = false; }
    });
  }

  cerrarDetalle(): void {
    this.showDetalle = false;
    this.detalleCandidato = null;
  }

  verMesasCerradas(): void {
    if (!this.selectedEleccionId) return;
    this.showMesasCerradas = true;
    this.mesasCerradasLoading = true;
    this.api.getMesasCerradas(this.selectedEleccionId).subscribe({
      next: (data) => { this.mesasCerradasList = data; this.mesasCerradasLoading = false; },
      error: () => { this.mesasCerradasLoading = false; }
    });
  }

  cerrarMesasCerradas(): void {
    this.showMesasCerradas = false;
    this.mesasCerradasList = [];
  }

  descargarActa(mesaId: number): void {
    this.api.descargarActaMesa(mesaId);
  }

  confirmarReabrirMesa(m: MesaCerradaResponse): void {
    this.reabrirMesaSeleccionada = m;
    this.reabrirPassword = '';
    this.reabrirError = '';
    this.reabrirCargando = false;
    this.showReabrirConfirm = true;
  }

  cancelarReabrir(): void {
    this.showReabrirConfirm = false;
    this.reabrirMesaSeleccionada = null;
    this.reabrirPassword = '';
    this.reabrirError = '';
  }

  ejecutarReabrir(): void {
    if (!this.reabrirMesaSeleccionada || !this.reabrirPassword) {
      this.reabrirError = 'Ingrese su contraseña';
      return;
    }
    this.reabrirCargando = true;
    this.reabrirError = '';
    this.api.verifyPassword(this.reabrirPassword).subscribe({
      next: (res) => {
        if (!res.valid) {
          this.reabrirError = 'Contraseña incorrecta';
          this.reabrirCargando = false;
          return;
        }
        this.api.reabrirMesa(this.reabrirMesaSeleccionada!.id).subscribe({
          next: () => {
            this.mesasCerradasList = this.mesasCerradasList.filter(
              m => m.id !== this.reabrirMesaSeleccionada!.id
            );
            this.cancelarReabrir();
          },
          error: () => {
            this.reabrirError = 'Error al reabrir la mesa';
            this.reabrirCargando = false;
          }
        });
      },
      error: () => {
        this.reabrirError = 'Error al verificar la contraseña';
        this.reabrirCargando = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
