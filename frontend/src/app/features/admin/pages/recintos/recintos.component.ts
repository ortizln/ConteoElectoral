import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Recinto, InstitucionEducativa } from '../../../../core/models';

@Component({
  selector: 'app-recintos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recintos.component.html',
  styleUrl: './recintos.component.css'
})
export class RecintosComponent implements OnInit {
  recintos: Recinto[] = [];
  elecciones: Eleccion[] = [];
  instituciones: InstitucionEducativa[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', direccion: '', eleccionesId: null, institucionId: null };
  filterInstitucionId: number | null = null;
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
    this.api.getInstituciones().subscribe((d: InstitucionEducativa[]) => this.instituciones = d);
  }

  load(eleccionId: number): void {
    const obs = this.filterInstitucionId
      ? this.api.getRecintosByInstitucion(this.filterInstitucionId)
      : this.api.getRecintosByEleccion(eleccionId);
    obs.subscribe((d: Recinto[]) => this.recintos = d);
  }

  filtrarPorInstitucion(): void {
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

  get recintosOrdenados(): Recinto[] {
    if (!this.sortColumn) return this.recintos;
    return [...this.recintos].sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get recintosFiltrados(): Recinto[] {
    if (!this.searchText) return this.recintosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.recintosOrdenados.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get recintosPaginados(): Recinto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.recintosFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.recintosFiltrados.length / this.pageSize) || 1;
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
    this.form = { nombre: '', direccion: '', eleccionesId: this.elecciones[0]?.id, institucionId: null };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(r: Recinto): void {
    this.editMode = true;
    this.selectedId = r.id;
    this.form = { nombre: r.nombre, direccion: r.direccion, eleccionesId: r.eleccionesId || this.form.eleccionesId, institucionId: r.institucionId };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateRecinto(this.selectedId, this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createRecinto(this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este recinto?')) {
      this.api.deleteRecinto(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}
