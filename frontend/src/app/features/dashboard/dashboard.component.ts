import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardData, Eleccion, Cargo, Partido, Zona, Provincia, Canton, Parroquia, InstitucionEducativa, ResultadoCandidato } from '../../core/models';
import { Subscription, interval } from 'rxjs';
import { catchError, of } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  autoRefresh = true;
  ultimaActualizacion = '';
  animando = false;
  filtrosMinimized = false;

  // Candidate detail modal
  showDetalle = false;
  detalleCandidato: any = null;
  detalleLoading = false;

  private barChart?: Chart;
  private pieChart?: Chart;
  private wsSubscription?: Subscription;
  private pollingSubscription?: Subscription;

  constructor(
    private api: ApiService,
    private wsService: WebSocketService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((elecciones: Eleccion[]) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        this.selectedEleccionId = elecciones[0].id;
        this.eleccionNombre = elecciones[0].nombre;
        this.loadZonas();
        this.loadDashboard();
        this.subscribeToUpdates();
        this.startPolling();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initCharts(), 100);
  }

  loadDataComplete(): void {
    if (!this.barChart && this.barChartRef?.nativeElement) {
      this.initCharts();
    }
    this.updateCharts();
    this.ultimaActualizacion = new Date().toLocaleTimeString();
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    this.pollingSubscription?.unsubscribe();
    this.barChart?.destroy();
    this.pieChart?.destroy();
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.startPolling();
    } else {
      this.pollingSubscription?.unsubscribe();
      this.pollingSubscription = undefined;
    }
  }

  startPolling(): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = interval(15000).subscribe(() => {
      if (this.autoRefresh && this.selectedEleccionId) {
        this.recargarSilencioso();
      }
    });
  }

  recargarSilencioso(): void {
    if (!this.selectedEleccionId) return;
    this.animando = true;
    const tieneFiltros = this.filtroZonaId || this.filtroProvinciaId || this.filtroCantonId ||
                         this.filtroParroquiaId || this.filtroInstitucionId || this.filtroCargoId || this.filtroPartidoId;
    const obs = tieneFiltros ? this.api.getDashboardConFiltros(
      this.selectedEleccionId,
      this.filtroCargoId ?? undefined,
      this.filtroPartidoId ?? undefined,
      this.filtroZonaId ?? undefined,
      this.filtroProvinciaId ?? undefined,
      this.filtroCantonId ?? undefined,
      this.filtroParroquiaId ?? undefined,
      this.filtroInstitucionId ?? undefined
    ) : this.api.getDashboard(this.selectedEleccionId);

    obs.subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.resultados = data.resultados || [];
      this.ordenarResultados();
      this.cdr.detectChanges();
      this.loadDataComplete();
      setTimeout(() => this.animando = false, 500);
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
      this.resultados = data.resultados || [];
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
      this.filtroInstitucionId ?? undefined
    ).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.resultados = data.resultados || [];
      this.ordenarResultados();
      this.cdr.detectChanges();
      this.loadDataComplete();
    });
  }

  limpiarFiltros(): void {
    this.filtroZonaId = null;
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.filtroCargoId = null;
    this.filtroPartidoId = null;
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
          this.resultados = data.resultados || [];
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

  getSortIcon(col: string): string {
    if (this.sortColumn !== col) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  initCharts(): void {
    this.barChart?.destroy();
    this.pieChart?.destroy();
    this.barChart = undefined;
    this.pieChart = undefined;
    if (this.barChartRef?.nativeElement) {
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
    if (this.pieChartRef?.nativeElement) {
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: { labels: [], datasets: [] },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
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
      this.barChart.update();
    }
    if (this.pieChart) {
      this.pieChart.data.labels = resultados.map((r: any) => r.nombreCompleto);
      this.pieChart.data.datasets = [{
        data: resultados.map((r: any) => r.totalVotos),
        backgroundColor: colors.slice(0, resultados.length)
      }];
      this.pieChart.update();
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
    this.api.getDetalleCandidato(candidatoId, this.selectedEleccionId).subscribe({
      next: (data) => { this.detalleCandidato = data; this.detalleLoading = false; },
      error: () => { this.detalleLoading = false; }
    });
  }

  cerrarDetalle(): void {
    this.showDetalle = false;
    this.detalleCandidato = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
