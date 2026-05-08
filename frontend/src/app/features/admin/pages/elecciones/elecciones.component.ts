import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion } from '../../../../core/models';

@Component({
  selector: 'app-elecciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './elecciones.component.html',
  styleUrl: './elecciones.component.css'
})
export class EleccionesComponent implements OnInit {
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', activa: true };
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
    this.api.getElecciones().subscribe((data: Eleccion[]) => this.elecciones = data);
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

  get eleccionesOrdenadas(): Eleccion[] {
    if (!this.sortColumn) return this.elecciones;
    return [...this.elecciones].sort((a, b) => {
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

  get eleccionesFiltradas(): Eleccion[] {
    if (!this.searchText) return this.eleccionesOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.eleccionesOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get eleccionesPaginadas(): Eleccion[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.eleccionesFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.eleccionesFiltradas.length / this.pageSize) || 1;
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
    this.form = { nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', activa: true };
    this.editMode = false;
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(eleccion: Eleccion): void {
    this.form = { ...eleccion };
    this.selectedId = eleccion.id;
    this.editMode = true;
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedId = null;
    this.errorMessage = '';
  }

  save(): void {
    this.errorMessage = '';
    const data = {
      ...this.form,
      fechaInicio: new Date(this.form.fechaInicio),
      fechaFin: new Date(this.form.fechaFin)
    };

    if (this.editMode && this.selectedId) {
      this.api.updateEleccion(this.selectedId, data).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createEleccion(data).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar esta eleccion?')) {
      this.api.deleteEleccion(id).subscribe(() => this.load());
    }
  }
}
