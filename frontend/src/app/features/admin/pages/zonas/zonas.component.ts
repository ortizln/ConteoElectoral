import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Zona } from '../../../../core/models';

@Component({
  selector: 'app-zonas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zonas.component.html',
  styleUrl: './zonas.component.css'
})
export class ZonasComponent implements OnInit {
  zonas: Zona[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', descripcion: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getZonas().subscribe((d: Zona[]) => this.zonas = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', descripcion: '' };
    this.showModal = true;
  }

  edit(z: Zona): void {
    this.editMode = true;
    this.selectedId = z.id;
    this.form = { nombre: z.nombre, descripcion: z.descripcion || '' };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateZona(this.selectedId, this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    } else {
      this.api.createZona(this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta zona?')) {
      this.api.deleteZona(id).subscribe(() => this.load());
    }
  }
}
