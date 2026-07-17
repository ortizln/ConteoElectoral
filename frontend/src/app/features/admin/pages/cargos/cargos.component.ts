import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
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
  tiposCircunscripcion: any[] = [];
  form: any = { nombre: '', descripcion: '', eleccionesId: null, tipoVotacion: 'LISTA', tipoCircunscripcionId: null, cantidadDignidades: 1, maxCandidatosLista: null };
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
    this.api.getTiposCircunscripcion().subscribe(tc => this.tiposCircunscripcion = tc);
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

  toUpper(obj: any, prop: string): void {
    if (obj[prop]) obj[prop] = obj[prop].toUpperCase();
  }

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', descripcion: '', eleccionesId: this.elecciones[0]?.id, tipoVotacion: 'LISTA', tipoCircunscripcionId: null, cantidadDignidades: 1, maxCandidatosLista: null };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(cargo: Cargo): void {
    this.editMode = true;
    this.selectedId = cargo.id;
    this.form = { nombre: cargo.nombre, descripcion: cargo.descripcion, eleccionesId: cargo.eleccionesId || this.form.eleccionesId, tipoVotacion: cargo.tipoVotacion || 'LISTA', tipoCircunscripcionId: cargo.tipoCircunscripcionId, cantidadDignidades: cargo.cantidadDignidades || 1, maxCandidatosLista: cargo.maxCandidatosLista };
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

  descargarTemplate(): void {
    const data: any[][] = [['nombre', 'eleccion'], ['CARGO EJEMPLO', 'ELECCION EJEMPLO']];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 30 }, { wch: 30 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cargos');
    XLSX.writeFile(wb, 'plantilla_cargos.xlsx');
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
    this.api.getElecciones().subscribe((elecciones: Eleccion[]) => this.elecciones = elecciones);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row['nombre'] || '', eleccion: row['eleccion'] || '' }));
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
      const eleccion = this.elecciones.find(e => e.nombre === item.eleccion);
      if (!item.eleccion || !eleccion) { errors++; this.importErrors.push(`Fila ${item.index}: elección "${item.eleccion}" no encontrada`); completed++; return; }
      this.api.createCargo({ nombre: item.nombre, eleccionesId: eleccion.id }).subscribe({
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
