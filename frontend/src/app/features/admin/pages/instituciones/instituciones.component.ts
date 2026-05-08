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
  filterParroquiaId: number | null = null;
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
    this.loadParroquias();
    this.load();
  }

  loadParroquias(): void {
    this.api.getParroquias().subscribe((d: Parroquia[]) => this.parroquias = d);
  }

  load(): void {
    const obs = this.filterParroquiaId
      ? this.api.getInstitucionesByParroquia(this.filterParroquiaId)
      : this.api.getInstituciones();
    obs.subscribe((d: InstitucionEducativa[]) => this.instituciones = d);
  }

  filtrarPorParroquia(): void { this.load(); this.currentPage = 1; }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get institucionesOrdenadas(): InstitucionEducativa[] {
    if (!this.sortColumn) return this.instituciones;
    return [...this.instituciones].sort((a, b) => {
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

  get institucionesFiltradas(): InstitucionEducativa[] {
    if (!this.searchText) return this.institucionesOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.institucionesOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get institucionesPaginadas(): InstitucionEducativa[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.institucionesFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.institucionesFiltradas.length / this.pageSize) || 1;
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
    this.form = { nombre: '', parroquiaId: this.parroquias[0]?.id || null, direccion: '', codigo: '', tipo: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(i: InstitucionEducativa): void {
    this.editMode = true;
    this.selectedId = i.id;
    this.form = { nombre: i.nombre, parroquiaId: i.parroquiaId, direccion: i.direccion || '', codigo: i.codigo || '', tipo: i.tipo || '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateInstitucion(this.selectedId, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createInstitucion(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta institución?')) {
      this.api.deleteInstitucion(id).subscribe(() => this.load());
    }
  }
}
