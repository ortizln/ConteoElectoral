import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion } from '../../../../core/models';

@Component({
  selector: 'app-elecciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './elecciones.component.html',
  styleUrl: './elecciones.component.css'
})
export class EleccionesComponent implements OnInit {
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', activa: true };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getElecciones().subscribe((data: Eleccion[]) => this.elecciones = data);
  }

  openModal(): void {
    this.form = { nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', activa: true };
    this.editMode = false;
    this.showModal = true;
  }

  edit(eleccion: Eleccion): void {
    this.form = { ...eleccion };
    this.selectedId = eleccion.id;
    this.editMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedId = null;
  }

  save(): void {
    const data = {
      ...this.form,
      fechaInicio: new Date(this.form.fechaInicio),
      fechaFin: new Date(this.form.fechaFin)
    };

    if (this.editMode && this.selectedId) {
      this.api.updateEleccion(this.selectedId, data).subscribe(() => {
        this.load();
        this.closeModal();
      });
    } else {
      this.api.createEleccion(data).subscribe(() => {
        this.load();
        this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar esta eleccion?')) {
      this.api.deleteEleccion(id).subscribe(() => this.load());
    }
  }
}