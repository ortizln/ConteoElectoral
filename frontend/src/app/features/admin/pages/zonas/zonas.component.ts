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
    this.load();
  }

  load(): void {
    this.api.getZonas().subscribe((d: Zona[]) => this.zonas = d);
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get zonasOrdenadas(): Zona[] {
    if (!this.sortColumn) return this.zonas;
    return [...this.zonas].sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get zonasFiltradas(): Zona[] {
    if (!this.searchText) return this.zonasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.zonasOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get zonasPaginadas(): Zona[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.zonasFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.zonasFiltradas.length / this.pageSize) || 1;
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
    this.form = { nombre: '', descripcion: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(z: Zona): void {
    this.editMode = true;
    this.selectedId = z.id;
    this.form = { nombre: z.nombre, descripcion: z.descripcion || '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateZona(this.selectedId, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createZona(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta zona?')) {
      this.api.deleteZona(id).subscribe(() => this.load());
    }
  }
}
