import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Candidato, Partido, Cargo } from '../../../../core/models';

@Component({
  selector: 'app-candidatos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidatos.component.html',
  styleUrl: './candidatos.component.css'
})
export class CandidatosComponent implements OnInit {
  candidatos: Candidato[] = [];
  elecciones: Eleccion[] = [];
  partidos: Partido[] = [];
  cargos: Cargo[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', apellido: '', partidoId: null, cargoId: null, eleccionesId: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.form.eleccionesId = e[0].id;
        this.load(e[0].id);
      }
    });
  }

  load(eleccionId: number): void {
    this.api.getCandidatosByEleccion(eleccionId).subscribe((d: Candidato[]) => this.candidatos = d);
    this.api.getPartidosByEleccion(eleccionId).subscribe((d: Partido[]) => this.partidos = d);
    this.api.getCargosByEleccion(eleccionId).subscribe((d: Cargo[]) => this.cargos = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', apellido: '', partidoId: null, cargoId: this.cargos[0]?.id, eleccionesId: this.form.eleccionesId };
    this.showModal = true;
  }

  edit(c: Candidato): void {
    this.editMode = true;
    this.selectedId = c.id;
    this.form = { nombre: c.nombre, apellido: c.apellido, partidoId: c.partidoId, cargoId: c.cargoId, eleccionesId: c.eleccionesId };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateCandidato(this.selectedId, this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    } else {
      this.api.createCandidato(this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este candidato?')) {
      this.api.deleteCandidato(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}