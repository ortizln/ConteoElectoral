import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Recinto } from '../../../../core/models';

@Component({
  selector: 'app-recintos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recintos.component.html',
  styleUrl: './recintos.component.css'
})
export class RecintosComponent implements OnInit {
  recintos: Recinto[] = [];
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', direccion: '', eleccionesId: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) this.load(e[0].id);
    });
  }

  load(eleccionId: number): void {
    this.api.getRecintosByEleccion(eleccionId).subscribe((d: Recinto[]) => this.recintos = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', direccion: '', eleccionesId: this.elecciones[0]?.id };
    this.showModal = true;
  }

  edit(r: Recinto): void {
    this.editMode = true;
    this.selectedId = r.id;
    this.form = { nombre: r.nombre, direccion: r.direccion, eleccionesId: r.eleccionesId || this.form.eleccionesId };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateRecinto(this.selectedId, this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    } else {
      this.api.createRecinto(this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este recinto?')) {
      this.api.deleteRecinto(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}