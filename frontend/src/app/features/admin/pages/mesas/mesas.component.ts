import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Recinto, Mesa } from '../../../../core/models';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent implements OnInit {
  mesas: Mesa[] = [];
  elecciones: Eleccion[] = [];
  recintos: Recinto[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { numero: '', sexo: 'MIXTA', recintoId: null, eleccionesId: null };

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
    this.api.getMesasByEleccion(eleccionId).subscribe((d: Mesa[]) => this.mesas = d);
    this.api.getRecintosByEleccion(eleccionId).subscribe((d: Recinto[]) => this.recintos = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { numero: '', sexo: 'MIXTA', recintoId: this.recintos[0]?.id, eleccionesId: this.form.eleccionesId };
    this.showModal = true;
  }

  edit(m: Mesa): void {
    this.editMode = true;
    this.selectedId = m.id;
    this.form = { numero: m.numero, sexo: m.sexo, recintoId: m.recintoId, eleccionesId: m.eleccionesId };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateMesa(this.selectedId, this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    } else {
      this.api.createMesa(this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    }
  }

  cerrar(id: number): void { if (confirm('Cerrar esta mesa?')) this.api.cerrarMesa(id).subscribe(() => this.load(this.form.eleccionesId)); }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar esta mesa?')) {
      this.api.deleteMesa(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}