import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../../../core/services/api.service';
import { ReporteResumen, ReporteCandidato, ReportePartido, Eleccion } from '../../../../core/models';

Chart.register(...registerables);

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;

  elecciones: Eleccion[] = [];
  selectedEleccionId: number | null = null;
  resumen: ReporteResumen | null = null;
  candidatos: ReporteCandidato[] = [];
  partidos: ReportePartido[] = [];
  loading = false;
  error = '';

  private barChart?: Chart;
  private pieChart?: Chart;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarElecciones();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initCharts(), 300);
  }

  cargarElecciones(): void {
    this.api.getEleccionesActivas().subscribe({
      next: (res) => {
        this.elecciones = res;
        if (this.elecciones.length > 0) {
          this.selectedEleccionId = this.elecciones[0].id;
          this.cargarReportes();
        }
      },
      error: () => this.error = 'Error al cargar elecciones'
    });
  }

  cargarReportes(): void {
    if (!this.selectedEleccionId) return;
    this.loading = true;
    this.error = '';

    this.api.getReporteResumen(this.selectedEleccionId).subscribe({
      next: (r) => this.resumen = r,
      error: () => {}
    });

    this.api.getReporteCandidatos(this.selectedEleccionId).subscribe({
      next: (r) => {
        this.candidatos = r;
        this.updateCharts();
      },
      error: () => {}
    });

    this.api.getReportePartidos(this.selectedEleccionId).subscribe({
      next: (r) => this.partidos = r,
      error: () => {},
      complete: () => this.loading = false
    });
  }

  exportarCsv(): void {
    if (!this.selectedEleccionId) return;
    this.api.exportarReporteCsv(this.selectedEleccionId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-votos-${this.selectedEleccionId}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.error = 'Error al exportar CSV'
    });
  }

  private initCharts(): void {
    if (this.barChartRef?.nativeElement && !this.barChart) {
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          plugins: { legend: { display: false }, title: { display: true, text: 'Votos por Candidato' } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
    if (this.pieChartRef?.nativeElement && !this.pieChart) {
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          plugins: { legend: { position: 'right' }, title: { display: true, text: 'Distribución de Votos' } }
        }
      });
    }
  }

  private updateCharts(): void {
    if (!this.barChart && !this.pieChart) this.initCharts();

    const top10 = this.candidatos.slice(0, 10);
    const labels = top10.map(c => c.nombreCompleto);
    const data = top10.map(c => c.totalVotos);
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'];

    if (this.barChart) {
      this.barChart.data.labels = labels;
      this.barChart.data.datasets = [{
        label: 'Votos',
        data,
        backgroundColor: colors.slice(0, data.length),
        borderRadius: 6
      }];
      this.barChart.update('none');
    }
    if (this.pieChart) {
      this.pieChart.data.labels = labels;
      this.pieChart.data.datasets = [{
        data,
        backgroundColor: colors.slice(0, data.length)
      }];
      this.pieChart.update('none');
    }
  }

  getMaxVotos(): number {
    if (this.candidatos.length === 0) return 0;
    return Math.max(...this.candidatos.map(c => c.totalVotos));
  }
}
