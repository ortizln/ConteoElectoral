import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardData, Eleccion, Cargo, Partido, Recinto } from '../../core/models';
import { Subscription } from 'rxjs';
import { catchError, of } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div>
          <h1>Resultados en Tiempo Real</h1>
          <p class="text-muted">{{ eleccionNombre }}</p>
        </div>
        <div class="header-actions">
          <select class="form-select" (change)="onEleccionChange($event)" style="width: 250px;">
            <option *ngFor="let e of elecciones" [value]="e.id">{{ e.nombre }}</option>
          </select>
          <button class="btn btn-outline-primary" (click)="logout()">Cerrar Sesión</button>
        </div>
      </header>

      <div class="filters-bar">
        <select class="form-select" [(ngModel)]="filtroCargoId" (change)="aplicarFiltros()">
          <option [ngValue]="null">Todos los Cargos</option>
          <option *ngFor="let c of cargos" [value]="c.id">{{ c.nombre }}</option>
        </select>
        <select class="form-select" [(ngModel)]="filtroPartidoId" (change)="aplicarFiltros()">
          <option [ngValue]="null">Todos los Partidos</option>
          <option *ngFor="let p of partidos" [value]="p.id">{{ p.nombre }}</option>
        </select>
        <select class="form-select" [(ngModel)]="filtroRecintoId" (change)="aplicarFiltros()">
          <option [ngValue]="null">Todos los Recintos</option>
          <option *ngFor="let r of recintos" [value]="r.id">{{ r.nombre }}</option>
        </select>
        <button class="btn btn-outline-secondary" (click)="limpiarFiltros()">Limpiar</button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon bg-primary">
            <span>🗳️</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ dashboard?.totalVotos || 0 }}</div>
            <div class="stat-label">Total Votos</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-success">
            <span>✅</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ dashboard?.mesasCerradas || 0 }}</div>
            <div class="stat-label">Mesas Cerradas</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-warning">
            <span>📊</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ dashboard?.totalMesas || 0 }}</div>
            <div class="stat-label">Total Mesas</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-info">
            <span>📈</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ dashboard?.porcentajeMesasCerradas || 0 }}%</div>
            <div class="stat-label">Progreso</div>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="card chart-card">
          <div class="card-header">
            <h3>Resultados por Candidato</h3>
          </div>
          <div class="card-body">
            <canvas #barChart></canvas>
          </div>
        </div>

        <div class="card chart-card">
          <div class="card-header">
            <h3>Distribución de Votos</h3>
          </div>
          <div class="card-body">
            <canvas #pieChart></canvas>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3>Detalle de Resultados</h3>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Partido</th>
              <th>Cargo</th>
              <th class="text-end">Votos</th>
              <th class="text-end">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of dashboard?.resultados">
              <td><strong>{{ r.nombreCompleto }}</strong></td>
              <td>{{ r.partidoNombre }}</td>
              <td>{{ r.cargoNombre }}</td>
              <td class="text-end">{{ r.totalVotos | number }}</td>
              <td class="text-end">
                <div class="progress-container">
                  <div class="progress">
                    <div class="progress-bar" [style.width.%]="r.porcentaje"></div>
                  </div>
                  <span>{{ r.porcentaje | number:'1.2-2' }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { max-width: 1400px; margin: 0 auto; padding: 24px; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .dashboard-header h1 { font-size: 28px; font-weight: 700; color: #1e293b; margin: 0; }
    .header-actions { display: flex; gap: 12px; align-items: center; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
    .bg-primary { background: #dbeafe; }
    .bg-success { background: #dcfce7; }
    .bg-warning { background: #fef3c7; }
    .bg-info { background: #e0f2fe; }
    .stat-value { font-size: 28px; font-weight: 700; color: #1e293b; }
    .stat-label { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px; }
    .chart-card { border-radius: 12px; }
    .card-header { padding: 20px; border-bottom: 1px solid #e2e8f0; }
    .card-header h3 { margin: 0; font-size: 18px; font-weight: 600; }
    .card-body { padding: 20px; }
    .progress-container { display: flex; align-items: center; gap: 12px; }
    .progress { flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; }
    .progress-bar { background: #3b82f6; border-radius: 4px; }
    .filters-bar { display: flex; gap: 12px; margin-bottom: 24px; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .filters-bar .form-select { flex: 1; max-width: 200px; }
    @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .charts-grid { grid-template-columns: 1fr; } .filters-bar { flex-wrap: wrap; } }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  
  elecciones: Eleccion[] = [];
  selectedEleccionId: number | null = null;
  dashboard: DashboardData | null = null;
  eleccionNombre = '';

  filtros: {
    cargos: { id: number; nombre: string }[];
    partidos: { id: number; nombre: string }[];
    recintos: { id: number; nombre: string }[];
  } = { cargos: [], partidos: [], recintos: [] };
  
  get cargos() { return this.filtros.cargos; }
  get partidos() { return this.filtros.partidos; }
  get recintos() { return this.filtros.recintos; }

  filtroCargoId: number | null = null;
  filtroPartidoId: number | null = null;
  filtroRecintoId: number | null = null;

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

  loadDashboard(): void {
    if (!this.selectedEleccionId) return;
    
    this.api.getDashboard(this.selectedEleccionId).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.cdr.detectChanges();
      this.loadDataComplete();
    });

    this.api.getCargosByEleccion(this.selectedEleccionId).subscribe((data: Cargo[]) => {
      this.filtros.cargos = data;
    });
    this.api.getPartidosByEleccion(this.selectedEleccionId).subscribe((data: Partido[]) => {
      this.filtros.partidos = data;
    });
    this.api.getRecintosByEleccion(this.selectedEleccionId).subscribe((data: Recinto[]) => {
      this.filtros.recintos = data;
    });
  }

  aplicarFiltros(): void {
    if (!this.selectedEleccionId) return;
    
    const cargoId = this.filtroCargoId ?? undefined;
    const partidoId = this.filtroPartidoId ?? undefined;
    const recintoId = this.filtroRecintoId ?? undefined;
    
    this.api.getDashboardConFiltros(
      this.selectedEleccionId,
      cargoId,
      partidoId,
      recintoId
    ).subscribe((data: DashboardData) => {
      this.dashboard = data;
      this.cdr.detectChanges();
      this.loadDataComplete();
    });
  }

  limpiarFiltros(): void {
    this.filtroCargoId = null;
    this.filtroPartidoId = null;
    this.filtroRecintoId = null;
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