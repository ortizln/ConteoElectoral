import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Parroquia, Canton } from '../../../../core/models';

@Component({
  selector: 'app-parroquias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parroquias.component.html',
  styleUrl: './parroquias.component.css'
})
export class ParroquiasComponent implements OnInit {
  parroquias: Parroquia[] = [];
  cantones: Canton[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', cantonId: null, descripcion: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCantones();
    this.load();
  }

  loadCantones(): void {
    this.api.getCantones().subscribe((d: Canton[]) => this.cantones = d);
  }

  load(): void {
    this.api.getParroquias().subscribe((d: Parroquia[]) => this.parroquias = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', cantonId: this.cantones[0]?.id || null, descripcion: '' };
    this.showModal = true;
  }

  edit(p: Parroquia): void {
    this.editMode = true;
    this.selectedId = p.id;
    this.form = { nombre: p.nombre, cantonId: p.cantonId, descripcion: p.descripcion || '' };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateParroquia(this.selectedId, this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    } else {
      this.api.createParroquia(this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta parroquia?')) {
      this.api.deleteParroquia(id).subscribe(() => this.load());
    }
  }
}
