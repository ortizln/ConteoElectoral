import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Partido } from '../../../../core/models';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
export class PartidosComponent implements OnInit {
  partidos: Partido[] = [];
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', sigla: '', eleccionesId: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) this.load(e[0].id);
    });
  }

  load(eleccionId: number): void {
    this.api.getPartidosByEleccion(eleccionId).subscribe((d: Partido[]) => this.partidos = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', sigla: '', eleccionesId: this.elecciones[0]?.id };
    this.showModal = true;
  }

  edit(partido: Partido): void {
    this.editMode = true;
    this.selectedId = partido.id;
    this.form = { nombre: partido.nombre, sigla: partido.sigla, eleccionesId: partido.eleccionesId || this.form.eleccionesId };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updatePartido(this.selectedId, this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    } else {
      this.api.createPartido(this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este partido?')) {
      this.api.deletePartido(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}