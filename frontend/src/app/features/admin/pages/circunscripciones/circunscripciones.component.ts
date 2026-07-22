import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Circunscripcion, ResultadoDHondt, AsignacionDHondt } from '../../../../core';

@Component({
  selector: 'app-circunscripciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './circunscripciones.component.html'
})
export class CircunscripcionesComponent implements OnInit {
  elecciones: any[] = [];
  selectedEleccionId = 0;
  circunscripciones: Circunscripcion[] = [];
  showModal = false;
  editing = false;
  selected: Partial<Circunscripcion> = {};
  tiposCircunscripcion: any[] = [];
  resultado: ResultadoDHondt | null = null;
  resultadoCircId = 0;
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe(data => {
      this.elecciones = data;
      if (data.length > 0) {
        this.selectedEleccionId = data[0].id!;
        this.loadCircunscripciones();
      }
    });
    this.api.getTiposCircunscripcion().subscribe(data => this.tiposCircunscripcion = data);
  }

  loadCircunscripciones(): void {
    if (this.selectedEleccionId) {
      this.api.getCircunscripcionesByEleccion(this.selectedEleccionId)
        .subscribe(data => this.circunscripciones = data);
    }
  }

  openCreate(): void {
    this.editing = false;
    this.selected = { eleccionId: this.selectedEleccionId, escanos: 1, umbralElectoral: 0, metodoAsignacion: 'D_HONDT', activa: true };
    this.showModal = true;
  }

  openEdit(c: Circunscripcion): void {
    this.editing = true;
    this.selected = { ...c };
    this.showModal = true;
  }

  save(): void {
    if (!this.selected.nombre) return;
    if (this.editing && this.selected.id) {
      this.api.updateCircunscripcion(this.selected.id, this.selected as Circunscripcion)
        .subscribe(() => { this.showModal = false; this.loadCircunscripciones(); });
    } else {
      this.api.createCircunscripcion(this.selected as Circunscripcion)
        .subscribe(() => { this.showModal = false; this.loadCircunscripciones(); });
    }
  }

  delete(id: number): void {
    if (confirm('Eliminar esta circunscripción?')) {
      this.api.deleteCircunscripcion(id).subscribe(() => this.loadCircunscripciones());
    }
  }

  calcular(id: number): void {
    this.loading = true;
    this.resultadoCircId = id;
    this.resultado = null;
    this.api.calcularDHondt(id).subscribe({
      next: r => { this.resultado = r; this.loading = false; },
      error: () => this.loading = false
    });
  }

  verResultados(id: number): void {
    this.resultadoCircId = id;
    this.resultado = null;
    this.api.consultarResultadosDHondt(id).subscribe({
      next: r => this.resultado = r,
      error: () => {}
    });
  }

  cerrarResultados(): void {
    this.resultado = null;
    this.resultadoCircId = 0;
  }
}
