import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardData, Eleccion, Cargo, Partido, Recinto, Zona, Provincia, Canton, Parroquia, InstitucionEducativa } from '../../core/models';
import { Subscription } from 'rxjs';
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
  
  // Filtros jerárquicos
  zonas: Zona[] = [];
  provincias: Provincia[] = [];
  cantones: Canton[] = [];
  parroquias: Parroquia[] = [];
  instituciones: InstitucionEducativa[] = [];
  recintos: Recinto[] = [];
  cargos: Cargo[] = [];
  partidos: Partido[] = [];
  
  filtroZonaId: number | null = null;
  filtroProvinciaId: number | null = null;
  filtroCantonId: number | null = null;
  filtroParroquiaId: number | null = null;
  filtroInstitucionId: number | null = null;
  filtroRecintoId: number | null = null;
  filtroCargoId: number | null = null;
  filtroPartidoId: number | null = null;
  
  private barChart?: Chart;
  private pieChart?: Chart;
  private wsSubscription?: Subscription;
  
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
  }
  
  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    this.barChart?.destroy();
    this.pieChart?.destroy();
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
    this.filtroRecintoId = null;
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.recintos = [];
    
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
    this.filtroRecintoId = null;
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.recintos = [];
    
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
    this.filtroRecintoId = null;
    this.parroquias = [];
    this.instituciones = [];
    this.recintos = [];
    
    if (this.filtroCantonId) {
      this.api.getParroquiasByCanton(this.filtroCantonId).subscribe((data: Parroquia[]) => {
        this.parroquias = data;
      });
    }
    this.aplicarFiltros();
  }
  
  onParroquiaChange(): void {
    this.filtroInstitucionId = null;
    this.filtroRecintoId = null;
    this.instituciones = [];
    this.recintos = [];
    
    if (this.filtroParroquiaId) {
      this.api.getInstitucionesByParroquia(this.filtroParroquiaId).subscribe((data: InstitucionEducativa[]) => {
        this.instituciones = data;
      });
    }
    this.aplicarFiltros();
  }
  
  onInstitucionChange(): void {
    this.filtroRecintoId = null;
    this.recintos = [];
    
    if (this.filtroInstitucionId) {
      this.api.getRecintosByInstitucion(this.filtroInstitucionId).subscribe((data: Recinto[]) => {
        this.recintos = data;
      });
    }
    this.aplicarFiltros();
  }
  
  loadDashboard(): void {
    if (!this.selectedEleccionId) return;
    
    this.api.getDashboard(this.selectedEleccionId).subscribe((data: DashboardData) => {
      this.dashboard = data;
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
    
    const zonaId = this.filtroZonaId ?? undefined;
    const provinciaId = this.filtroProvinciaId ?? undefined;
    const cantonId = this.filtroCantonId ?? undefined;
    const parroquiaId = this.filtroParroquiaId ?? undefined;
    const institucionId = this.filtroInstitucionId ?? undefined;
    const recintoId = this.filtroRecintoId ?? undefined;
    const cargoId = this.filtroCargoId ?? undefined;
    const partidoId = this.filtroPartidoId ?? undefined;
    
    this.api.getDashboardConFiltros(
      this.selectedEleccionId,
      cargoId,
      partidoId,
      recintoId,
      zonaId,
      provinciaId,
      cantonId,
      parroquiaId,
      institucionId
    ).subscribe((data: DashboardData) => {
      this.dashboard = data;
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
    this.filtroRecintoId = null;
    this.filtroCargoId = null;
    this.filtroPartidoId = null;
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.recintos = [];
    this.loadDashboard();
  }
  
  subscribeToUpdates(): void {
    this.wsSubscription?.unsubscribe();
    
    if (!this.selectedEleccionId) return;
    
    this.wsSubscription = this.wsService.subscribeToResultados(this.selectedEleccionId)
      .pipe(
        catchError(err => {
          console.warn('WebSocket error:', err);
          return of(null as any);
        })
      )
      .subscribe((data: DashboardData | null) => {
        if (data) {
          this.dashboard = data;
          this.loadDataComplete();
        }
      });
  }
  
  initCharts(): void {
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
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    
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
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
