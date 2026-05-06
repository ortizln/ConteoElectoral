import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Provincia, Zona } from '../../../../core/models';

@Component({
  selector: 'app-provincias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provincias.component.html',
  styleUrl: './provincias.component.css'
})
export class ProvinciasComponent implements OnInit {
  provincias: Provincia[] = [];
  zonas: Zona[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', zonaId: null, descripcion: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadZonas();
    this.load();
  }

  loadZonas(): void {
    this.api.getZonas().subscribe((d: Zona[]) => this.zonas = d);
  }

  load(): void {
    this.api.getProvincias().subscribe((d: Provincia[]) => this.provincias = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', zonaId: this.zonas[0]?.id || null, descripcion: '' };
    this.showModal = true;
  }

  edit(p: Provincia): void {
    this.editMode = true;
    this.selectedId = p.id;
    this.form = { nombre: p.nombre, zonaId: p.zonaId, descripcion: p.descripcion || '' };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateProvincia(this.selectedId, this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    } else {
      this.api.createProvincia(this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta provincia?')) {
      this.api.deleteProvincia(id).subscribe(() => this.load());
    }
  }
}
