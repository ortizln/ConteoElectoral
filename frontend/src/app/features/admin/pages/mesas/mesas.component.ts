import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Recinto, Mesa } from '../../../../core/models';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent implements OnInit {
  mesas: Mesa[] = [];
  elecciones: Eleccion[] = [];
  recintos: Recinto[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { numero: '', sexo: 'MIXTA', recintoId: null, eleccionesId: null };
  filterRecintoId: number | null = null;
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
      if (e.length > 0) {
        this.form.eleccionesId = e[0].id;
        this.load(e[0].id);
      }
    });
  }

  load(eleccionId: number): void {
    const obs = this.filterRecintoId
      ? this.api.getMesasByRecinto(this.filterRecintoId)
      : this.api.getMesasByEleccion(eleccionId);
    obs.subscribe((d: Mesa[]) => this.mesas = d);
    this.api.getRecintosByEleccion(eleccionId).subscribe((d: Recinto[]) => this.recintos = d);
  }

  filtrarPorRecinto(): void {
    if (this.form.eleccionesId) this.load(this.form.eleccionesId);
    this.currentPage = 1;
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

  get mesasOrdenadas(): Mesa[] {
    if (!this.sortColumn) return this.mesas;
    return [...this.mesas].sort((a, b) => {
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

  get mesasFiltradas(): Mesa[] {
    if (!this.searchText) return this.mesasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.mesasOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get mesasPaginadas(): Mesa[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.mesasFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.mesasFiltradas.length / this.pageSize) || 1;
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
    this.form = { numero: '', sexo: 'MIXTA', recintoId: this.recintos[0]?.id, eleccionesId: this.form.eleccionesId };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(m: Mesa): void {
    this.editMode = true;
    this.selectedId = m.id;
    this.form = { numero: m.numero, sexo: m.sexo, recintoId: m.recintoId, eleccionesId: m.eleccionesId };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateMesa(this.selectedId, this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createMesa(this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  cerrar(id: number): void { if (confirm('Cerrar esta mesa?')) this.api.cerrarMesa(id).subscribe(() => this.load(this.form.eleccionesId)); }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar esta mesa?')) {
      this.api.deleteMesa(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}
