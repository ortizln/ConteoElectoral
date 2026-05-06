import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { InstitucionEducativa, Parroquia } from '../../../../core/models';

@Component({
  selector: 'app-instituciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instituciones.component.html',
  styleUrl: './instituciones.component.css'
})
export class InstitucionesComponent implements OnInit {
  instituciones: InstitucionEducativa[] = [];
  parroquias: Parroquia[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', parroquiaId: null, direccion: '', codigo: '', tipo: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadParroquias();
    this.load();
  }

  loadParroquias(): void {
    this.api.getParroquias().subscribe((d: Parroquia[]) => this.parroquias = d);
  }

  load(): void {
    this.api.getInstituciones().subscribe((d: InstitucionEducativa[]) => this.instituciones = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', parroquiaId: this.parroquias[0]?.id || null, direccion: '', codigo: '', tipo: '' };
    this.showModal = true;
  }

  edit(i: InstitucionEducativa): void {
    this.editMode = true;
    this.selectedId = i.id;
    this.form = { nombre: i.nombre, parroquiaId: i.parroquiaId, direccion: i.direccion || '', codigo: i.codigo || '', tipo: i.tipo || '' };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateInstitucion(this.selectedId, this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    } else {
      this.api.createInstitucion(this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta institución?')) {
      this.api.deleteInstitucion(id).subscribe(() => this.load());
    }
  }
}
