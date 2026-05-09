import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Parroquia, Canton, Provincia } from '../../../../core/models';

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
  cantonesFiltrados: Canton[] = [];
  provincias: Provincia[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', cantonId: null, descripcion: '' };
  filterProvinciaId: number | null = null;
  filterCantonId: number | null = null;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizes: number[] = [5, 10, 25, 50];
  Math = Math;
  errorMessage: string = '';

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.api.getProvincias().subscribe((d: Provincia[]) => this.provincias = d);
    this.api.getCantones().subscribe((d: Canton[]) => {
      this.cantones = d;
      this.cantonesFiltrados = d;
    });
    this.load();
  }

  load(): void {
    const obs = this.filterCantonId
      ? this.api.getParroquiasByCanton(this.filterCantonId)
      : this.api.getParroquias();
    obs.subscribe((d: Parroquia[]) => this.parroquias = d);
  }

  onProvinciaChange(): void {
    this.filterCantonId = null;
    if (this.filterProvinciaId) {
      this.api.getCantonesByProvincia(this.filterProvinciaId).subscribe((d: Canton[]) => {
        this.cantonesFiltrados = d;
      });
    } else {
      this.cantonesFiltrados = this.cantones;
    }
    this.load();
    this.currentPage = 1;
  }

  filtrarPorCanton(): void { this.load(); this.currentPage = 1; }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get parroquiasOrdenadas(): Parroquia[] {
    if (!this.sortColumn) return this.parroquias;
    return [...this.parroquias].sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === 'boolean') {
        const cmp = valA === valB ? 0 : valA ? -1 : 1;
        return this.sortDirection === 'asc' ? cmp : -cmp;
      }
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get parroquiasFiltradas(): Parroquia[] {
    if (!this.searchText) return this.parroquiasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.parroquiasOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get parroquiasPaginadas(): Parroquia[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.parroquiasFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.parroquiasFiltradas.length / this.pageSize) || 1;
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  goToPage(p: number): void { this.currentPage = Math.max(1, Math.min(p, this.totalPages)); }
  prevPage(): void { this.goToPage(this.currentPage - 1); }
  nextPage(): void { this.goToPage(this.currentPage + 1); }
  onPageSizeChange(): void { this.currentPage = 1; }

  toUpper(obj: any, prop: string): void {
    if (obj[prop]) obj[prop] = obj[prop].toUpperCase();
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', cantonId: this.cantones[0]?.id || null, descripcion: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(p: Parroquia): void {
    this.editMode = true;
    this.selectedId = p.id;
    this.form = { nombre: p.nombre, cantonId: p.cantonId, descripcion: p.descripcion || '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateParroquia(this.selectedId, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createParroquia(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta parroquia?')) {
      this.api.deleteParroquia(id).subscribe(() => this.load());
    }
  }
}
