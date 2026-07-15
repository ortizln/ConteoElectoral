import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
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

  toUpper(obj: any, prop: string): void {
    if (obj[prop]) obj[prop] = obj[prop].toUpperCase();
  }

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

  descargarTemplate(): void {
    const data: any[][] = [['nombre', 'parroquia'], ['INSTITUCION EJEMPLO', 'PARROQUIA EJEMPLO']];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 30 }, { wch: 30 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Instituciones');
    XLSX.writeFile(wb, 'plantilla_instituciones.xlsx');
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
    this.api.getParroquias().subscribe((parroquias: Parroquia[]) => this.parroquias = parroquias);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row['nombre'] || '', parroquia: row['parroquia'] || '' }));
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
      const parroquia = this.parroquias.find(p => p.nombre === item.parroquia);
      if (!item.parroquia || !parroquia) { errors++; this.importErrors.push(`Fila ${item.index}: parroquia "${item.parroquia}" no encontrada`); completed++; return; }
      this.api.createInstitucion({ nombre: item.nombre, parroquiaId: parroquia.id }).subscribe({
        next: () => { completed++; if (completed === this.importPreview!.length) this.finishImport(errors); },
        error: (err) => { errors++; this.importErrors.push(`Fila ${item.index}: ${err.error?.message || 'Error'}`); completed++; if (completed === this.importPreview!.length) this.finishImport(errors); }
      });
    });
  }

  private finishImport(errors: number): void {
    this.importing = false;
    if (errors === 0) this.importSuccess = `✅ ${this.importPreview!.length} registros importados correctamente.`;
    else this.importSuccess = `⚠️ Importación completada con ${errors} error(es).`;
    this.load();
  }
}
