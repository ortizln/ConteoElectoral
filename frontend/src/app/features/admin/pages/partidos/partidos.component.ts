import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Partido } from '../../../../core/models';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
export class PartidosComponent implements OnInit {
  partidos: Partido[] = [];
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', sigla: '', eleccionesId: null };
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
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) this.load(e[0].id);
    });
  }

  load(eleccionId: number): void {
    this.api.getPartidosByEleccion(eleccionId).subscribe((d: Partido[]) => this.partidos = d);
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

  get partidosOrdenados(): Partido[] {
    if (!this.sortColumn) return this.partidos;
    return [...this.partidos].sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get partidosFiltrados(): Partido[] {
    if (!this.searchText) return this.partidosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.partidosOrdenados.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get partidosPaginados(): Partido[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.partidosFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.partidosFiltrados.length / this.pageSize) || 1;
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
    this.form = { nombre: '', sigla: '', eleccionesId: this.elecciones[0]?.id };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(partido: Partido): void {
    this.editMode = true;
    this.selectedId = partido.id;
    this.form = { nombre: partido.nombre, sigla: partido.sigla, eleccionesId: partido.eleccionesId || this.form.eleccionesId };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updatePartido(this.selectedId, this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createPartido(this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este partido?')) {
      this.api.deletePartido(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}
