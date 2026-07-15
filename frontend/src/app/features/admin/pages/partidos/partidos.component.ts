import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
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
  showImportModal = false;
  importFile: File | null = null;
  importing = false;
  importPreview: any[] | null = null;
  importSuccess = '';
  importErrors: string[] = [];

  constructor(public api: ApiService) {}

  get isAdmin(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('electoral_user') || '{}');
      return user.rol === 'ADMIN';
    } catch { return false; }
  }

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

  toUpper(obj: any, prop: string): void {
    if (obj[prop]) obj[prop] = obj[prop].toUpperCase();
  }

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

  descargarTemplate(): void {
    const data: any[][] = [['nombre', 'siglas'], ['PARTIDO EJEMPLO', 'SIGLAS']];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 30 }, { wch: 20 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Partidos');
    XLSX.writeFile(wb, 'plantilla_partidos.xlsx');
  }

  openImportModal(): void {
    this.showImportModal = true;
    this.importFile = null;
    this.importPreview = null;
    this.importSuccess = '';
    this.importErrors = [];
  }

  closeImportModal(): void {
    this.showImportModal = false;
    this.importFile = null;
    this.importPreview = null;
  }

  onImportFileSelected(event: any): void {
    this.importFile = event.target.files?.[0] || null;
    this.importPreview = null;
    this.importSuccess = '';
    this.importErrors = [];
    if (!this.importFile) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row['nombre'] || '', siglas: row['siglas'] || '' }));
    };
    reader.readAsArrayBuffer(this.importFile);
  }

  importar(): void {
    if (!this.importPreview || this.importPreview.length === 0) return;
    this.importing = true;
    this.importSuccess = '';
    this.importErrors = [];
    let completed = 0;
    let errors = 0;
    this.importPreview.forEach(item => {
      if (!item.nombre) { errors++; this.importErrors.push(`Fila ${item.index}: nombre requerido`); completed++; return; }
      if (!item.siglas) { errors++; this.importErrors.push(`Fila ${item.index}: siglas requerido`); completed++; return; }
      this.api.createPartido({ nombre: item.nombre, sigla: item.siglas }).subscribe({
        next: () => { completed++; if (completed === this.importPreview!.length) this.finishImport(errors); },
        error: (err) => { errors++; this.importErrors.push(`Fila ${item.index}: ${err.error?.message || 'Error'}`); completed++; if (completed === this.importPreview!.length) this.finishImport(errors); }
      });
    });
  }

  private finishImport(errors: number): void {
    this.importing = false;
    if (errors === 0) this.importSuccess = `✅ ${this.importPreview!.length} registros importados correctamente.`;
    else this.importSuccess = `⚠️ Importación completada con ${errors} error(es).`;
    this.load(this.form.eleccionesId);
  }
}
