import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Cargo } from '../../../../core/models';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargos.component.html',
  styleUrl: './cargos.component.css'
})
export class CargosComponent implements OnInit {
  cargos: Cargo[] = [];
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', descripcion: '', eleccionesId: null };
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
    this.api.getCargosByEleccion(eleccionId).subscribe((d: Cargo[]) => this.cargos = d);
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

  get cargosOrdenados(): Cargo[] {
    if (!this.sortColumn) return this.cargos;
    return [...this.cargos].sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get cargosFiltrados(): Cargo[] {
    if (!this.searchText) return this.cargosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.cargosOrdenados.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get cargosPaginados(): Cargo[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.cargosFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.cargosFiltrados.length / this.pageSize) || 1;
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
    this.form = { nombre: '', descripcion: '', eleccionesId: this.elecciones[0]?.id };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(cargo: Cargo): void {
    this.editMode = true;
    this.selectedId = cargo.id;
    this.form = { nombre: cargo.nombre, descripcion: cargo.descripcion, eleccionesId: cargo.eleccionesId || this.form.eleccionesId };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateCargo(this.selectedId, this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createCargo(this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este cargo?')) {
      this.api.deleteCargo(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}
