import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardData, Eleccion, Cargo, Partido, Zona, Provincia, Canton, Parroquia, InstitucionEducativa, Mesa, ResultadoCandidato, ResultadoLista, ResultadoRecinto, ResultadoMesa, MesaActaFoto, CandidatoDetalleResponse, GeoGroup, MesaCerradaResponse, Candidato } from '../../core/models';
import { GeoGroupTableComponent } from './geo-group-table.component';
import { Subscription } from 'rxjs';
import { catchError, of } from 'rxjs';

Chart.register(...registerables);

type ResultadoListaCategoriaItem = {
  lista: string;
  numero: number;
  partido: string;
  votos: number;
  porcentaje: number;
};

type ResultadoListaCategoriaCard = {
  clave: string;
  categoria: string;
  titulo: string;
  icono: string;
  totalVotos: number;
  items: ResultadoListaCategoriaItem[];
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, GeoGroupTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  /** Modo solo lectura de /resultados: sin descargas ni acciones de administración. */
  @Input() publico = false;

  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('categoriaListaChart') categoriaListaCharts!: QueryList<ElementRef<HTMLCanvasElement>>;

  elecciones: Eleccion[] = [];
  selectedEleccionId: number | null = null;
  dashboard: DashboardData | null = null;
  eleccionNombre = '';

  resultados: ResultadoCandidato[] = [];
  resultadosOrdenados: ResultadoCandidato[] = [];
  showListaResults = false;
  resultadosListas: ResultadoLista[] = [];

  // Drill-down por recinto / mesa
  resultadosRecinto: ResultadoRecinto[] = [];
  resultadosMesa: ResultadoMesa[] = [];
  showDrillRecinto = false;
  showDrillMesa = false;
  drillMesaSeleccionada: ResultadoMesa | null = null;
  drillMesaFotos: MesaActaFoto[] = [];
  drillMesaFotosLoading = false;
  drillMesaFotoVisor: string | null = null;

  // Pestañas de resultados: una por cargo + Recintos y Mesas
  tabResultados = '';

  // Modal de resumen por recinto
  showRecintoResumen = false;
  recintoResumen: ResultadoRecinto | null = null;
  recintoResumenData: DashboardData | null = null;
  recintoResumenLoading = false;

  /** Un card por contienda por lista: JP, consejal urbano y consejal rural. */
  categoriasListasCards: ResultadoListaCategoriaCard[] = [
    { clave: 'junta', categoria: 'Juntas Parroquiales', titulo: 'Resultado por Junta Parroquial', icono: 'bi-people-fill', totalVotos: 0, items: [] },
    { clave: 'urbano', categoria: 'Consejales Urbanos', titulo: 'Resultado por Consejal Urbano', icono: 'bi-building', totalVotos: 0, items: [] },
    { clave: 'rural', categoria: 'Consejales Rurales', titulo: 'Resultado por Consejal Rural', icono: 'bi-tree-fill', totalVotos: 0, items: [] }
  ];

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
  filtroMesaTexto: string = '';

  mesas: Mesa[] = [];
  userRole: string = '';
  /** El supervisor con mesas asignadas trabaja solo sobre ese alcance. */
  mesasAsignadasActivas = false;

  ultimaActualizacion = '';
  filtrosMinimized = true;
  statsMinimized = false;

  // Card toggle states
  barChartMinimized = false;
  barChartFullscreen = false;
  pieChartMinimized = false;
  pieChartFullscreen = false;
  categoriaChartMinimized: Record<string, boolean> = { junta: false, urbano: false, rural: false };
  categoriaChartFullscreen: Record<string, boolean> = { junta: false, urbano: false, rural: false };
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

  // Nulos/Blanco detail modal
  showNulosBlancoDetalle = false;
  nulosBlancoTipo: 'nulos' | 'blanco' = 'nulos';
  nulosBlancoMesas: any[] = [];
  nulosBlancoLoading = false;

  private barChart?: Chart;
  private pieChart?: Chart;
  private categoriaCharts: Chart[] = [];
  private wsSubscription?: Subscription;
  private autoRefreshTimer?: ReturnType<typeof setInterval>;

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
    else if (card in this.categoriaChartMinimized) {
      this.categoriaChartMinimized[card] = !this.categoriaChartMinimized[card];
    }
    else if (card === 'resultados') this.resultadosMinimized = !this.resultadosMinimized;
    else if (card === 'stats') this.statsMinimized = !this.statsMinimized;
    setTimeout(() => this.resizeCharts(), 60);
  }

  get algunaCategoriaFullscreen(): boolean {
    return Object.values(this.categoriaChartFullscreen).some(Boolean);
  }

  toggleFullscreen(card: string): void {
    const esCategoria = card in this.categoriaChartFullscreen;
    const activarCategoria = esCategoria && !this.categoriaChartFullscreen[card];
    const activating = card === 'barChart' ? !this.barChartFullscreen
      : card === 'pieChart' ? !this.pieChartFullscreen
      : esCategoria ? activarCategoria
      : !this.resultadosFullscreen;
    this.barChartFullscreen = false;
    this.pieChartFullscreen = false;
    Object.keys(this.categoriaChartFullscreen).forEach(k => this.categoriaChartFullscreen[k] = false);
    this.resultadosFullscreen = false;
    if (activating) {
      if (card === 'barChart') this.barChartFullscreen = true;
      else if (card === 'pieChart') this.pieChartFullscreen = true;
      else if (esCategoria) this.categoriaChartFullscreen[card] = true;
      else if (card === 'resultados') this.resultadosFullscreen = true;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // El contenedor cambia de tamaño (incluye la transición de salir de fullscreen),
    // por eso se ajusta al primer frame y de nuevo al finalizar la animación.
    requestAnimationFrame(() => this.resizeCharts());
    setTimeout(() => this.resizeCharts(), 350);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    setTimeout(() => this.resizeCharts(), 80);
  }

  /** Ajusta los canvas al tamaño real de su wrapper (Chart.js responsive:false). */
  private resizeCharts(): void {
    const charts = [this.barChart, this.pieChart, ...this.categoriaCharts]
      .filter((c): c is Chart => !!c);
    charts.forEach(chart => {
      const canvas = chart.canvas as HTMLCanvasElement;
      const wrap = canvas?.parentElement as HTMLElement | null;
      if (!wrap) return;
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (width > 0 && height > 0) {
        chart.resize(width, height);
      }
    });
  }

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((elecciones: Eleccion[]) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        this.selectedEleccionId = elecciones[0].id;
        this.eleccionNombre = elecciones[0].nombre;
        if (!this.publico) this.cargarMetaFotos(elecciones[0].id);
        this.loadZonas();
        this.api.getInstituciones().subscribe((data: InstitucionEducativa[]) => {
          this.instituciones = data;
        });
        if (!this.publico) this.loadMesas();
        this.loadDashboard();
        if (!this.publico) {
          this.subscribeToUpdates();
          this.subscribeToMesaEstado();
          this.startAutoRefresh();
        }
      }
    });
  }

  private startAutoRefresh(): void {
    this.stopAutoRefresh();
    this.autoRefreshTimer = setInterval(() => {
      this.recargarSilencioso();
    }, 30000);
  }

  private stopAutoRefresh(): void {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = undefined;
    }
  }

  private procesarResultados(data: DashboardData): void {
    this.showListaResults = (data.resultadosListas?.length || 0) > 0;
    this.resultadosListas = data.resultadosListas || [];
    this.resultadosRecinto = data.resultadosRecinto || [];
    this.resultadosMesa = data.resultadosMesa || [];

    const resultados: ResultadoCandidato[] = [...(data.resultados || [])];
    const totalVotosNulos = data.totalVotosNulos || 0;
    const totalVotosBlanco = data.totalVotosBlanco || 0;
    const totalGeneral = data.totalVotos + totalVotosNulos + totalVotosBlanco;
    if (totalVotosNulos > 0) {
      resultados.push({
        candidatoId: 0,
        nombreCompleto: 'Votos Nulos',
        partidoNombre: '—',
        cargoNombre: '—',
        totalVotos: totalVotosNulos,
        porcentaje: totalGeneral > 0 ? Math.round(totalVotosNulos * 10000 / totalGeneral) / 100 : 0
      });
    }
    if (totalVotosBlanco > 0) {
      resultados.push({
        candidatoId: -1,
        nombreCompleto: 'Votos en Blanco',
        partidoNombre: '—',
        cargoNombre: '—',
        totalVotos: totalVotosBlanco,
        porcentaje: totalGeneral > 0 ? Math.round(totalVotosBlanco * 10000 / totalGeneral) / 100 : 0
      });
    }
    this.resultados = resultados;

    // Mantener una pestaña válida tras cualquier actualización de datos
    const validas = [...this.cargoTabs.map(t => t.label), 'recintos', 'mesas', 'Recintos', 'Mesas'];
    if (!this.tabResultados || !validas.includes(this.tabResultados)) {
      this.tabResultados = this.cargoTabs[0]?.label || 'recintos';
    }
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
      this.initCategoriaCharts();
      this.updateCharts();
      this.updateCategoriaCharts();
      this.resizeCharts();
    }, 100);
  }

  loadDataComplete(): void {
    this.computeCategoriasListas();
    this.updateCharts();
    this.updateCategoriaCharts();
    this.ultimaActualizacion = new Date().toLocaleTimeString();
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    this.stopAutoRefresh();
    this.barChart?.destroy();
    this.pieChart?.destroy();
    this.categoriaCharts.forEach(c => c.destroy());
    this.categoriaCharts = [];
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
      this.filtroMesaId ?? undefined,
      this.publico
    ) : this.api.getDashboard(this.selectedEleccionId, this.publico);

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
    if (!this.publico) {
      this.cargarMetaFotos(this.selectedEleccionId);
      this.subscribeToUpdates();
    }
    this.loadDashboard();
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
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroZonaId) {
      this.api.getProvinciasByZona(this.filtroZonaId).subscribe((data: Provincia[]) => {
        this.provincias = data;
      });
    } else {
      this.api.getProvincias().subscribe((data: Provincia[]) => { this.provincias = data; });
    }
    this.aplicarFiltros();
  }

  onProvinciaChange(): void {
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroProvinciaId) {
      this.api.getCantonesByProvincia(this.filtroProvinciaId).subscribe((data: Canton[]) => {
        this.cantones = data;
      });
    } else {
      this.api.getCantones().subscribe((data: Canton[]) => { this.cantones = data; });
    }
    this.aplicarFiltros();
  }

  onCantonChange(): void {
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroCantonId) {
      this.api.getParroquiasByCanton(this.filtroCantonId).subscribe((data: Parroquia[]) => {
        this.parroquias = data;
      });
    } else {
      this.api.getParroquias().subscribe((data: Parroquia[]) => { this.parroquias = data; });
    }
    this.aplicarFiltros();
  }

  onParroquiaChange(): void {
    this.filtroInstitucionId = null;
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.instituciones = [];
    if (this.filtroParroquiaId) {
      this.api.getInstitucionesByParroquia(this.filtroParroquiaId).subscribe((data: InstitucionEducativa[]) => {
        this.instituciones = data;
      });
    } else {
      // Sin parroquia: todas las instituciones (permite drill-down directo por recinto)
      this.api.getInstituciones().subscribe((data: InstitucionEducativa[]) => {
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
    this.api.getDashboard(this.selectedEleccionId, this.publico).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
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
    if (!this.selectedEleccionId || this.publico) return;
    // El supervisor solo puede explorar las mesas que tiene asignadas; el ADMIN ve todas.
    const soloAsignadas = this.userRole === 'SUPERVISOR';
    const obs = soloAsignadas
      ? this.api.getMesasByCurrentUser(this.selectedEleccionId)
      : this.api.getMesasByEleccion(this.selectedEleccionId);
    obs.subscribe({
      next: (data: Mesa[]) => {
        this.mesas = data || [];
        this.mesasAsignadasActivas = soloAsignadas && this.mesas.length > 0;
      },
      error: () => {
        this.mesas = [];
        this.mesasAsignadasActivas = false;
      }
    });
  }

  // ===== Drill-down: recinto / mesa =====

  /** Chip con el alcance activo (recinto o mesa seleccionado) */
  get alcanceActivo(): string {
    if (this.filtroMesaId) {
      const m = this.resultadosMesa.find(x => x.mesaId === this.filtroMesaId);
      return `Mesa ${m?.mesaNumero ?? this.filtroMesaId}`;
    }
    if (this.filtroInstitucionId) {
      const r = this.resultadosRecinto.find(x => x.recintoId === this.filtroInstitucionId);
      return `Recinto ${r?.recintoNombre ?? this.filtroInstitucionId}`;
    }
    return '';
  }

  /** Seleccionar un recinto en la tabla → drill-down a sus mesas */
  seleccionarRecinto(r: ResultadoRecinto): void {
    if (!this.selectedEleccionId) return;
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.filtroInstitucionId = r.recintoId;
    this.filtroParroquiaId = null;
    this.filtroCantonId = null;
    this.filtroProvinciaId = null;
    this.filtroZonaId = null;
    // Cargar instituciones del filtro para que el select refleje la selección
    this.api.getInstituciones().subscribe((data: InstitucionEducativa[]) => {
      this.instituciones = data;
      this.aplicarFiltros();
    });
  }

  /** Seleccionar una mesa en la tabla → ver candidatos + fotos del acta */
  seleccionarMesa(m: ResultadoMesa): void {
    if (!this.selectedEleccionId) return;
    this.filtroMesaId = m.mesaId;
    const mesa = this.mesas.find(x => x.id === m.mesaId);
    this.filtroMesaTexto = mesa ? this.etiquetaMesa(mesa) : `Mesa ${m.mesaNumero}`;
    this.drillMesaSeleccionada = m;
    this.showDrillMesa = true;
    this.drillMesaFotos = [];
    this.drillMesaFotosLoading = true;
    this.aplicarFiltros();
    if (this.publico) {
      this.drillMesaFotosLoading = false;
      return;
    }
    this.api.getActaFotos(m.mesaId).subscribe({
      next: (fotos) => {
        this.drillMesaFotos = fotos;
        this.drillMesaFotosLoading = false;
      },
      error: () => { this.drillMesaFotosLoading = false; }
    });
  }

  cerrarDrillMesa(): void {
    this.showDrillMesa = false;
    this.drillMesaSeleccionada = null;
    this.drillMesaFotos = [];
    this.limpiarAlcance();
  }

  verFotoActa(foto: MesaActaFoto): void {
    this.api.getActaFotoBlob(foto.mesaId, foto.id).subscribe({
      next: (blob) => {
        this.drillMesaFotoVisor = URL.createObjectURL(blob);
      }
    });
  }

  /** URL en caché de la miniatura de una foto del acta */
  private fotoThumbCache = new Map<number, string>();
  fotoThumbUrl(foto: MesaActaFoto): string {
    let url = this.fotoThumbCache.get(foto.id);
    if (url === undefined) {
      this.fotoThumbCache.set(foto.id, '');
      this.api.getActaFotoBlob(foto.mesaId, foto.id).subscribe({
        next: (blob) => {
          this.fotoThumbCache.set(foto.id, URL.createObjectURL(blob));
          // Change detection es automática; no forzar pasadas desde callbacks HTTP.
        },
        error: () => { this.fotoThumbCache.set(foto.id, ''); }
      });
      return '';
    }
    return url;
  }

  cerrarFotoVisor(): void {
    if (this.drillMesaFotoVisor) {
      URL.revokeObjectURL(this.drillMesaFotoVisor);
      this.drillMesaFotoVisor = null;
    }
  }

  // ===== Fotos de candidato / logos de lista (caché blob) =====
  private candFotoCache = new Map<number, string>();
  private listaLogoCache = new Map<number, string>();
  // Mapas "tiene foto/logo" por id: evitan peticiones 404 (null = aún no cargado)
  private candTieneFoto: Map<number, boolean> | null = null;
  private listTieneLogo: Map<number, boolean> | null = null;

  /** Carga una vez por elección si cada candidato tiene foto y cada lista tiene logo */
  cargarMetaFotos(eleccionId: number): void {
    this.candTieneFoto = null;
    this.listTieneLogo = null;
    this.api.getCandidatosByEleccion(eleccionId).subscribe({
      next: (candidatos: Candidato[]) => {
        const m = new Map<number, boolean>();
        candidatos.forEach(c => m.set(c.id, !!c.tieneFoto));
        this.candTieneFoto = m;
        // Change detection es automática; no forzar pasadas desde callbacks HTTP.
      },
      error: () => { this.candTieneFoto = new Map(); }
    });
    this.api.getListasByEleccion(eleccionId).subscribe({
      next: (listas: any[]) => {
        const m = new Map<number, boolean>();
        listas.forEach((l: any) => m.set(l.id, !!l.tieneLogo));
        this.listTieneLogo = m;
        // Change detection es automática; no forzar pasadas desde callbacks HTTP.
      },
      error: () => { this.listTieneLogo = new Map(); }
    });
  }

  fotoCandidatoThumb(id: number): string {
    if (!this.candTieneFoto?.get(id)) return '';
    let url = this.candFotoCache.get(id);
    if (url === undefined) {
      this.candFotoCache.set(id, '');
      this.api.getFotoCandidatoBlob(id).subscribe({
        next: (blob) => {
          this.candFotoCache.set(id, URL.createObjectURL(blob));
          // Change detection es automática; no forzar pasadas desde callbacks HTTP.
        },
        error: () => this.candFotoCache.set(id, '')
      });
      return '';
    }
    return url;
  }

  logoListaThumb(id: number): string {
    if (!this.listTieneLogo?.get(id)) return '';
    let url = this.listaLogoCache.get(id);
    if (url === undefined) {
      this.listaLogoCache.set(id, '');
      this.api.getLogoListaBlob(id).subscribe({
        next: (blob) => {
          this.listaLogoCache.set(id, URL.createObjectURL(blob));
          // Change detection es automática; no forzar pasadas desde callbacks HTTP.
        },
        error: () => this.listaLogoCache.set(id, '')
      });
      return '';
    }
    return url;
  }

  // ===== Modal de resumen por recinto =====

  /** Abrir modal con el resumen del recinto (KPIs + top candidatos + mesas) */
  abrirResumenRecinto(r: ResultadoRecinto): void {
    if (!this.selectedEleccionId) return;
    this.recintoResumen = r;
    this.recintoResumenData = null;
    this.recintoResumenLoading = true;
    this.showRecintoResumen = true;
    this.api.getDashboardConFiltros(
      this.selectedEleccionId,
      undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      r.recintoId, this.publico
    ).subscribe({
      next: (data: DashboardData) => {
        this.recintoResumenData = data;
        this.recintoResumenLoading = false;
      },
      error: () => { this.recintoResumenLoading = false; }
    });
  }

  cerrarResumenRecinto(): void {
    this.showRecintoResumen = false;
    this.recintoResumen = null;
    this.recintoResumenData = null;
  }

  /** Del modal: aplicar drill-down al recinto (chip de alcance) */
  aplicarRecintoDesdeResumen(): void {
    const r = this.recintoResumen;
    this.cerrarResumenRecinto();
    if (r) this.seleccionarRecinto(r);
  }

  /** Top candidatos del recinto (modal de resumen) */
  get recintoTopCandidatos(): ResultadoCandidato[] {
    return [...(this.recintoResumenData?.resultados || [])]
      .sort((a, b) => b.totalVotos - a.totalVotos)
      .slice(0, 5);
  }

  /** Pestañas por cargo (individual → candidatos, LISTA → listas). */
  get cargoTabs(): { label: string; esLista: boolean; count: number }[] {
    const orden = ['Alcaldes', 'Consejales Urbanos', 'Consejales Rurales', 'Juntas Parroquiales'];
    const tipos = new Map<string, boolean>();
    const registrar = (nombre: string, esLista: boolean) => {
      const label = this.etiquetaCategoria(nombre);
      if (!tipos.has(label) || esLista) tipos.set(label, esLista);
    };
    for (const c of this.cargos || []) {
      if (c?.nombre) registrar(c.nombre, (c.tipoVotacion || '').toUpperCase() === 'LISTA');
    }
    for (const r of this.resultados || []) registrar(r.cargoNombre, false);
    for (const r of this.resultadosListas || []) registrar(r.cargoNombre, true);

    return Array.from(tipos.entries())
      .map(([label, esLista]) => ({
        label,
        esLista,
        count: esLista
          ? this.resultadosListas.filter(l => this.etiquetaCategoria(l.cargoNombre) === label).length
          : this.resultados.filter(r => this.etiquetaCategoria(r.cargoNombre) === label ||
              (r.candidatoId <= 0 && label === this.primeraCargoIndividual)).length
      }))
      .sort((a, b) => {
        const ia = orden.indexOf(a.label) < 0 ? 99 : orden.indexOf(a.label);
        const ib = orden.indexOf(b.label) < 0 ? 99 : orden.indexOf(b.label);
        return ia !== ib ? ia - ib : a.label.localeCompare(b.label);
      });
  }

  /** Las pestañas usan etiquetas ("Recintos", "Mesas"); normalizamos para evitar comparar contra claves en minúsculas. */
  private get tabResultadosKey(): string {
    return (this.tabResultados || '').toLowerCase();
  }

  get esTabCargo(): boolean {
    const key = this.tabResultadosKey;
    return key !== 'recintos' && key !== 'mesas';
  }

  get esTabMesas(): boolean {
    return this.tabResultadosKey === 'mesas';
  }

  onTabResultadosChange(tab: string): void {
    this.tabResultados = tab;
    if (this.esTabMesas) this.cargarCatalogosParaMesas();
  }

  /** Catálogos completos para los filtros de la pestaña Mesas (sin depender de Zona). */
  private catalogosMesasCargados = false;
  private cargarCatalogosParaMesas(): void {
    if (this.catalogosMesasCargados) return;
    this.catalogosMesasCargados = true;
    this.api.getProvincias().subscribe(data => {
      if (!this.filtroZonaId) this.provincias = data;
    });
    this.api.getCantones().subscribe(data => {
      if (!this.filtroProvinciaId) this.cantones = data;
    });
    this.api.getParroquias().subscribe(data => {
      if (!this.filtroCantonId) this.parroquias = data;
    });
    this.api.getInstituciones().subscribe(data => {
      if (!this.filtroParroquiaId) this.instituciones = data;
    });
  }

  get tabCargoActual(): { label: string; esLista: boolean; count: number } | undefined {
    return this.cargoTabs.find(t => t.label === this.tabResultados);
  }

  /** Normaliza el nombre del cargo a una de las cuatro categorías del reporte. */
  private etiquetaCategoria(nombre?: string | null): string {
    const original = (nombre || '').trim() || 'Otros';
    const n = original.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    if (n.includes('ALCALDE')) return 'Alcaldes';
    if ((n.includes('JUNTA') && n.includes('PARROQUI')) || n.includes('VOCAL')) {
      return 'Juntas Parroquiales';
    }
    if (n.includes('CONCEJAL') || n.includes('CONSEJAL') ||
        n.includes('CONCEJO') || n.includes('CONSEJO')) {
      if (n.includes('URBAN')) return 'Consejales Urbanos';
      if (n.includes('RURAL')) return 'Consejales Rurales';
    }
    return original;
  }

  private get primeraCargoIndividual(): string | undefined {
    for (const c of this.cargos || []) {
      if (c?.nombre && (c.tipoVotacion || '').toUpperCase() !== 'LISTA') {
        return this.etiquetaCategoria(c.nombre);
      }
    }
    const r = this.resultados.find(x => x.candidatoId > 0 && x.cargoNombre);
    return r ? this.etiquetaCategoria(r.cargoNombre) : undefined;
  }

  /** Palabra a usar en la tabla según el cargo activo. */
  get etiquetaPostulacion(): string {
    switch (this.tabResultados) {
      case 'Alcaldes': return 'Alcalde';
      case 'Consejales Urbanos': return 'Consejal Urbano';
      case 'Consejales Rurales': return 'Consejal Rural';
      case 'Juntas Parroquiales': return 'Junta Parroquial';
      default: return 'Postulación';
    }
  }

  /** Resultados individuales del cargo indicado (nulos/blanco solo en el primero). */
  resultadosDelCargo(label: string): ResultadoCandidato[] {
    const propios = this.resultadosOrdenados.filter(
      r => r.candidatoId > 0 && this.etiquetaCategoria(r.cargoNombre) === label);
    if (label === this.primeraCargoIndividual) {
      return [...propios, ...this.resultadosOrdenados.filter(r => r.candidatoId <= 0)];
    }
    return propios;
  }

  get resultadosDelTab(): ResultadoCandidato[] {
    return this.esTabCargo && !this.tabCargoActual?.esLista
      ? this.resultadosDelCargo(this.tabResultados) : [];
  }

  get resultadosListasDelTab(): ResultadoLista[] {
    return this.esTabCargo && this.tabCargoActual?.esLista
      ? this.resultadosListas.filter(l => this.etiquetaCategoria(l.cargoNombre) === this.tabResultados)
      : [];
  }

  get mesasFiltradasPorRecinto(): Mesa[] {
    return this.mesas.filter(m =>
      (this.filtroInstitucionId == null || m.institucionId === this.filtroInstitucionId) &&
      (this.filtroParroquiaId == null || m.parroquiaId === this.filtroParroquiaId) &&
      (this.filtroCantonId == null || m.cantonId === this.filtroCantonId) &&
      (this.filtroProvinciaId == null || m.provinciaId === this.filtroProvinciaId)
    );
  }

  onFiltroRecintoResultadosChange(): void {
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.aplicarFiltros();
  }

  onFiltroMesaResultadosChange(): void {
    const m = this.mesas.find(x => x.id === this.filtroMesaId);
    this.filtroMesaTexto = m ? this.etiquetaMesa(m) : '';
    this.aplicarFiltros();
  }

  /** Etiqueta del contador según la pestaña activa */
  get tabCountLabel(): string {
    if (this.tabResultadosKey === 'recintos') return `${this.resultadosRecinto.length} recintos`;
    if (this.tabResultadosKey === 'mesas') return `${this.resultadosMesa.length} mesas`;
    return `${this.tabCargoActual?.count || 0} resultados`;
  }

  limpiarAlcance(): void {
    this.filtroMesaId = null;
    this.filtroMesaTexto = '';
    this.filtroInstitucionId = null;
    this.aplicarFiltros();
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
      this.filtroMesaId ?? undefined,
      this.publico
    ).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.loadDataComplete();
    });
  }

  /** Etiqueta del datalist de mesas: "Mesa {numero} - {institución}" */
  etiquetaMesa(m: Mesa): string {
    return `Mesa ${m.numero} - ${m.institucionNombre || ''}`.replace(/ -$/, '');
  }

  /**
   * Resuelve el texto escrito en el datalist a una mesa.
   * Prioridad: coincidencia exacta de la etiqueta → número de mesa →
   * única coincidencia por subcadena (si hay varias, no resuelve).
   */
  private resolverMesaPorTexto(texto: string): Mesa | null {
    const t = texto.trim().toLowerCase();
    if (!t) return null;
    const exacta = this.mesas.find(m => this.etiquetaMesa(m).toLowerCase() === t);
    if (exacta) return exacta;
    const porNumero = this.mesas.find(m => String(m.numero).toLowerCase() === t);
    if (porNumero) return porNumero;
    const contiene = this.mesas.filter(m => this.etiquetaMesa(m).toLowerCase().includes(t));
    return contiene.length === 1 ? contiene[0] : null;
  }

  /** Aplica el filtro solo cuando el texto resuelve a una mesa (o se vacía). */
  onMesaTextoInput(ev: Event): void {
    const texto = ((ev.target as HTMLInputElement).value || '').trim();
    this.filtroMesaTexto = texto;
    if (!texto) {
      if (this.filtroMesaId !== null) {
        this.filtroMesaId = null;
        this.aplicarFiltros();
      }
      return;
    }
    const elegida = this.resolverMesaPorTexto(texto);
    if (elegida && elegida.id !== this.filtroMesaId) {
      this.filtroMesaId = elegida.id;
      this.aplicarFiltros();
    }
  }

  /** Al salir del campo, el texto refleja el filtro realmente aplicado. */
  onMesaTextoBlur(): void {
    if (this.filtroMesaId == null) {
      this.filtroMesaTexto = '';
      return;
    }
    const m = this.mesas.find(x => x.id === this.filtroMesaId);
    this.filtroMesaTexto = m ? this.etiquetaMesa(m) : '';
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
    this.filtroMesaTexto = '';
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.catalogosMesasCargados = false;
    this.cargarCatalogosParaMesas();
    this.loadDashboard();
  }

  subscribeToUpdates(): void {
    this.wsSubscription?.unsubscribe();
    if (!this.selectedEleccionId) return;
    const subscribe = () => {
      this.wsSubscription = this.wsService.subscribeToResultados(this.selectedEleccionId!)
        .pipe(
          catchError(err => {
            console.warn('WebSocket error, retrying in 10s:', err);
            setTimeout(subscribe, 10000);
            return of(null as any);
          })
        )
        .subscribe(() => {
          this.recargarSilencioso();
        });
    };
    subscribe();
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
      if (r.candidatoId === 0 || r.candidatoId === -1 || (r.candidatoId ?? 0) < -1) continue;
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
    if (r.candidatoId === -1) return 'blanco-row';
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter(x => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0 && x.candidatoId !== -1)]
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .findIndex(x => x.nombreCompleto === r.nombreCompleto);
      return 'candidato-row top-' + (idx + 1);
    }
    return 'candidato-row';
  }

  getRankClass(r: any): string {
    if (r.candidatoId === 0) return 'candidato-rank rank-nulos';
    if (r.candidatoId === -1) return 'candidato-rank rank-blanco';
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter(x => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0 && x.candidatoId !== -1)]
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .findIndex(x => x.nombreCompleto === r.nombreCompleto);
      return 'candidato-rank rank-top-' + (idx + 1);
    }
    return 'candidato-rank';
  }

  /** Ícono Unicode para el sexo del mesa (♂ / ♀ / ⚥) */
  getSexoIcono(sexo: string | undefined | null): string {
    if (!sexo) return '⚥';
    switch (sexo.toUpperCase()) {
      case 'MASCULINO': return '♂';
      case 'FEMENINO': return '♀';
      case 'MIXTA': return '⚥';
      default: return '⚥';
    }
  }

  getRankIcon(r: any, i: number): string {
    if (r.candidatoId === 0) return 'bi-x-circle-fill';
    if (r.candidatoId === -1) return 'bi-square';
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter(x => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0 && x.candidatoId !== -1)]
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .findIndex(x => x.nombreCompleto === r.nombreCompleto);
      return ['bi-trophy-fill', 'bi-award-fill', 'bi-award'][idx] || '';
    }
    return '';
  }

  getRankLabel(r: any, i: number): string {
    if (this.getRankIcon(r, i)) return '';
    return (i + 1).toString();
  }

  getSortIcon(col: string): string {
    if (this.sortColumn !== col) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  private isDarkMode(): boolean {
    return document.body.getAttribute('data-theme') === 'dark';
  }

  private getChartTextColor(): string {
    return this.isDarkMode() ? '#f2f5f0' : '#263329';
  }

  private getChartGridColor(): string {
    return this.isDarkMode() ? '#3f4d42' : '#e3e7e0';
  }

  private getChartColors(): string[] {
    return this.isDarkMode()
      ? ['#7d9a72', '#e08a45', '#e6b94f', '#e8705f', '#6fb3d0', '#5fbb86', '#b98a5e', '#a3ada1']
      : ['#48563c', '#d97732', '#e6b94f', '#c0392b', '#2d6a8a', '#2f7d4f', '#78543d', '#6b766f'];
  }

  initCharts(): void {
    const textColor = this.getChartTextColor();
    if (this.barChartRef?.nativeElement) {
      if (this.barChart) this.barChart.destroy();
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: {
          responsive: false, maintainAspectRatio: false, animation: false,
          color: textColor,
          scales: {
            x: { ticks: { color: textColor }, grid: { color: this.getChartGridColor() } },
            y: { ticks: { color: textColor }, grid: { color: this.getChartGridColor() } }
          },
          plugins: { legend: { display: false, labels: { color: textColor } } }
        }
      });
    }
    if (this.pieChartRef?.nativeElement) {
      if (this.pieChart) this.pieChart.destroy();
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: { labels: [], datasets: [] },
        options: {
          responsive: false, maintainAspectRatio: false, animation: false,
          color: textColor,
          plugins: { legend: { position: 'bottom', labels: { color: textColor } } }
        }
      });
    }
  }

  updateCharts(): void {
    if (!this.resultados.length) return;
    const resultados: any[] = this.resultados;
    const colors = this.getChartColors();
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
    if (this.filtroMesaId) f.mesaId = this.filtroMesaId;
    return f;
  }

  /** Agrupa los resultados por lista en JP / consejal urbano / consejal rural. */
  private computeCategoriasListas(): void {
    for (const card of this.categoriasListasCards) {
      const items = (this.resultadosListas || [])
        .filter(l => this.etiquetaCategoria(l.cargoNombre) === card.categoria)
        .map(l => ({
          lista: l.listaNombre,
          numero: l.numeroLista,
          partido: l.partidoNombre || '—',
          votos: l.totalVotos
        }))
        .sort((a, b) => b.votos - a.votos);
      const total = items.reduce((s, l) => s + l.votos, 0);
      card.totalVotos = total;
      card.items = items.map(l => ({
        ...l,
        porcentaje: total > 0 ? l.votos * 100 / total : 0
      }));
    }
  }

  initCategoriaCharts(): void {
    this.categoriaCharts.forEach(c => c.destroy());
    this.categoriaCharts = this.categoriaListaCharts.toArray().map(ref => new Chart(ref.nativeElement, {
      type: 'doughnut',
      data: { labels: [], datasets: [] },
      options: {
        responsive: false, maintainAspectRatio: false, animation: false,
        color: this.getChartTextColor(),
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        cutout: '60%'
      }
    }));
    this.updateCategoriaCharts();
  }

  updateCategoriaCharts(): void {
    const colors = this.getChartColors();
    this.categoriaCharts.forEach((chart, index) => {
      const card = this.categoriasListasCards[index];
      if (!card) return;
      chart.data.labels = card.items.map(i => i.lista);
      chart.data.datasets = [{
        data: card.items.map(i => i.votos),
        backgroundColor: colors.slice(0, card.items.length)
      }];
      chart.update('none');
    });
  }

  exportarPdf(): void {
    if (this.publico) return;
    if (this.selectedEleccionId) {
      this.api.exportDashboardPdf(this.selectedEleccionId, this.getFiltrosActuales());
    }
  }

  exportarExcel(): void {
    if (this.publico) return;
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

  /** Igual que Alcaldes, pero para filas de listas (JP / consejales). */
  verDetalleLista(listaId: number): void {
    if (!this.selectedEleccionId) return;
    this.detalleLoading = true;
    this.showDetalle = true;
    this.geoDetalleTab = 'mesas';
    this.api.getDetalleLista(listaId, this.selectedEleccionId).subscribe({
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

  verMesasCerradas(): void {
    if (this.publico || !this.selectedEleccionId) return;
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
    if (this.publico) return;
    this.api.descargarActaMesa(mesaId);
  }

  confirmarReabrirMesa(m: MesaCerradaResponse): void {
    if (this.publico) return;
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

  verDetalleNulosBlanco(tipo: 'nulos' | 'blanco'): void {
    if (!this.selectedEleccionId) return;
    this.showNulosBlancoDetalle = true;
    this.nulosBlancoTipo = tipo;
    this.nulosBlancoLoading = true;
    this.nulosBlancoMesas = [];
    this.api.getMesasByEleccion(this.selectedEleccionId).subscribe({
      next: (mesas) => {
        this.nulosBlancoMesas = mesas.filter(m => {
          const valor = tipo === 'nulos' ? m.votosNulos : m.votosBlanco;
          return valor != null && valor > 0;
        });
        this.nulosBlancoLoading = false;
      },
      error: () => { this.nulosBlancoLoading = false; }
    });
  }

  cerrarNulosBlancoDetalle(): void {
    this.showNulosBlancoDetalle = false;
    this.nulosBlancoMesas = [];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
