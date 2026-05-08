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
  filterProvinciaId: number | null = null;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizes: number[] = [5, 10, 25, 50];
  Math = Math;
  errorMessage: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProvincias();
    this.load();
  }

  loadProvincias(): void {
    this.api.getProvincias().subscribe((d: Provincia[]) => this.provincias = d);
  }

  load(): void {
    const obs = this.filterProvinciaId
      ? this.api.getCantonesByProvincia(this.filterProvinciaId)
      : this.api.getCantones();
    obs.subscribe((d: Canton[]) => this.cantones = d);
  }

  filtrarPorProvincia(): void { this.load(); this.currentPage = 1; }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get cantonesOrdenados(): Canton[] {
    if (!this.sortColumn) return this.cantones;
    return [...this.cantones].sort((a, b) => {
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

  get cantonesFiltrados(): Canton[] {
    if (!this.searchText) return this.cantonesOrdenados;
    const term = this.searchText.toLowerCase();
    return this.cantonesOrdenados.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get cantonesPaginados(): Canton[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.cantonesFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.cantonesFiltrados.length / this.pageSize) || 1;
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

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', provinciaId: this.provincias[0]?.id || null, descripcion: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(c: Canton): void {
    this.editMode = true;
    this.selectedId = c.id;
    this.form = { nombre: c.nombre, provinciaId: c.provinciaId, descripcion: c.descripcion || '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateCanton(this.selectedId, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createCanton(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este cantón?')) {
      this.api.deleteCanton(id).subscribe(() => this.load());
    }
  }
}
