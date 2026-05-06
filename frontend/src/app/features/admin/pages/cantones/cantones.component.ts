import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Canton, Provincia } from '../../../../core/models';

@Component({
  selector: 'app-cantones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cantones.component.html',
  styleUrl: './cantones.component.css'
})
export class CantonesComponent implements OnInit {
  cantones: Canton[] = [];
  provincias: Provincia[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', provinciaId: null, descripcion: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProvincias();
    this.load();
  }

  loadProvincias(): void {
    this.api.getProvincias().subscribe((d: Provincia[]) => this.provincias = d);
  }

  load(): void {
    this.api.getCantones().subscribe((d: Canton[]) => this.cantones = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', provinciaId: this.provincias[0]?.id || null, descripcion: '' };
    this.showModal = true;
  }

  edit(c: Canton): void {
    this.editMode = true;
    this.selectedId = c.id;
    this.form = { nombre: c.nombre, provinciaId: c.provinciaId, descripcion: c.descripcion || '' };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateCanton(this.selectedId, this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    } else {
      this.api.createCanton(this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este cantón?')) {
      this.api.deleteCanton(id).subscribe(() => this.load());
    }
  }
}
