import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../core/services/api.service';
import { InstitucionEducativa, Parroquia } from '../../../../core/models';
import { FiltrosPanelComponent } from '../../../shared/components/filtros-panel/filtros-panel.component';

@Component({
  selector: 'app-instituciones',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltrosPanelComponent],
  templateUrl: './instituciones.component.html',
  styleUrl: './instituciones.component.css'
})
export class InstitucionesComponent implements OnInit {
  instituciones: InstitucionEducativa[] = [];
  parroquias: Parroquia[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', parroquiaId: null, direccion: '', codigo: '', tipo: '', latitud: null, longitud: null, electoresRegistrados: null, junfem: null, junmas: null, juninif: null, junfinf: null, juninim: null, junfinm: null };
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
    this.form = { nombre: '', parroquiaId: this.parroquias[0]?.id || null, direccion: '', codigo: '', tipo: '', latitud: null, longitud: null, electoresRegistrados: null, junfem: null, junmas: null, juninif: null, junfinf: null, juninim: null, junfinm: null };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(i: InstitucionEducativa): void {
    this.editMode = true;
    this.selectedId = i.id;
    this.form = { nombre: i.nombre, parroquiaId: i.parroquiaId, direccion: i.direccion || '', codigo: i.codigo || '', tipo: i.tipo || '', latitud: i.latitud ?? null, longitud: i.longitud ?? null, electoresRegistrados: i.electoresRegistrados ?? null, junfem: i.junfem ?? null, junmas: i.junmas ?? null, juninif: i.juninif ?? null, junfinf: i.junfinf ?? null, juninim: i.juninim ?? null, junfinm: i.junfinm ?? null };
    this.errorMessage = '';
    this.showModal = true;
  }

  /** NUMJUN calculado en el formulario (JUNFEM + JUNMAS). */
  get numjunFormulario(): number | null {
    const f = this.form?.junfem != null && this.form.junfem !== '' ? Number(this.form.junfem) : null;
    const m = this.form?.junmas != null && this.form.junmas !== '' ? Number(this.form.junmas) : null;
    if (f == null && m == null) return null;
    return (f ?? 0) + (m ?? 0);
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    // Normalizar campos numéricos (inputs vacíos → null)
    const form = { ...this.form };
    form.latitud = form.latitud === '' || form.latitud == null ? null : Number(form.latitud);
    form.longitud = form.longitud === '' || form.longitud == null ? null : Number(form.longitud);
    form.electoresRegistrados = form.electoresRegistrados === '' || form.electoresRegistrados == null ? null : Math.trunc(Number(form.electoresRegistrados));
    // Campos de juntas (INTEGER, >= 0)
    const juntas: ('junfem' | 'junmas' | 'juninif' | 'junfinf' | 'juninim' | 'junfinm')[] =
      ['junfem', 'junmas', 'juninif', 'junfinf', 'juninim', 'junfinm'];
    for (const k of juntas) {
      form[k] = form[k] === '' || form[k] == null ? null : Math.trunc(Number(form[k]));
      if (form[k] != null && (isNaN(form[k]) || form[k] < 0)) {
        this.errorMessage = 'Los campos de juntas deben ser números mayores o iguales a 0.';
        return;
      }
    }
    if (form.juninif != null && form.junfinf != null && form.juninif > form.junfinf) {
      this.errorMessage = 'JUNINIF (inicio juntas femeninas) no puede ser mayor que JUNFINF (fin).';
      return;
    }
    if (form.juninim != null && form.junfinm != null && form.juninim > form.junfinm) {
      this.errorMessage = 'JUNINIM (inicio juntas masculinas) no puede ser mayor que JUNFINM (fin).';
      return;
    }
    // NUMJUN calculado por el backend (JUNFEM + JUNMAS)
    form.numjun = form.junfem == null && form.junmas == null ? null : (form.junfem ?? 0) + (form.junmas ?? 0);
    if ((form.latitud != null && (isNaN(form.latitud) || form.latitud < -90 || form.latitud > 90)) ||
        (form.longitud != null && (isNaN(form.longitud) || form.longitud < -180 || form.longitud > 180))) {
      this.errorMessage = 'Latitud debe estar entre -90 y 90, longitud entre -180 y 180.';
      return;
    }
    if (form.electoresRegistrados != null && (isNaN(form.electoresRegistrados) || form.electoresRegistrados < 0)) {
      this.errorMessage = 'Electores registrados debe ser un número mayor o igual a 0.';
      return;
    }
    if (this.editMode && this.selectedId) {
      this.api.updateInstitucion(this.selectedId, form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createInstitucion(form).subscribe({
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
    const data: any[][] = [
      ['nombre', 'parroquia', 'junfem', 'junmas', 'juninif', 'junfinf', 'juninim', 'junfinm'],
      ['INSTITUCION EJEMPLO', 'PARROQUIA EJEMPLO', 8, 7, 1, 8, 9, 15]
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 30 }, { wch: 30 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 9 }];
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
      this.importPreview = json.map((raw, i) => {
        const row = this.normalizeRow(raw);
        return {
          index: i + 2,
          nombre: row['nombre'] || '',
          parroquia: row['parroquia'] || '',
          junfem: row['junfem'] ?? '',
          junmas: row['junmas'] ?? '',
          juninif: row['juninif'] ?? '',
          junfinf: row['junfinf'] ?? '',
          juninim: row['juninim'] ?? '',
          junfinm: row['junfinm'] ?? ''
        };
      });
    };
    reader.readAsArrayBuffer(this.importFile);
  }

  /** Normaliza encabezados de fila a minúsculas (acepta JUNFEM, Junfem, junfem...). */
  private normalizeRow(row: any): any {
    const out: any = {};
    for (const k of Object.keys(row)) out[k.trim().toLowerCase()] = row[k];
    return out;
  }

  /** Celda de juntas: vacío → null, número >= 0 → entero; inválido → NaN. */
  private parseJuntasCell(v: any): number | null {
    if (v == null || v === '') return null;
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0) return NaN;
    return Math.trunc(n);
  }

  importar(): void {
    if (!this.importPreview || this.importPreview.length === 0) return;
    this.importing = true;
    this.importSuccess = '';
    this.importErrors = [];
    let completed = 0;
    let errors = 0;
    const etiquetas: Record<string, string> = {
      junfem: 'JUNFEM', junmas: 'JUNMAS', juninif: 'JUNINIF',
      junfinf: 'JUNFINF', juninim: 'JUNINIM', junfinm: 'JUNFINM'
    };
    this.importPreview.forEach(item => {
      if (!item.nombre) { errors++; this.importErrors.push(`Fila ${item.index}: nombre requerido`); completed++; return; }
      const parroquia = this.parroquias.find(p => p.nombre === item.parroquia);
      if (!item.parroquia || !parroquia) { errors++; this.importErrors.push(`Fila ${item.index}: parroquia "${item.parroquia}" no encontrada`); completed++; return; }
      // Campos de juntas (opcionales, INTEGER >= 0)
      const juntas: any = {};
      for (const k of Object.keys(etiquetas)) {
        const v = this.parseJuntasCell(item[k]);
        if (Number.isNaN(v)) { errors++; this.importErrors.push(`Fila ${item.index}: ${etiquetas[k]} debe ser un número mayor o igual a 0`); completed++; return; }
        juntas[k] = v;
      }
      if (juntas.juninif != null && juntas.junfinf != null && juntas.juninif > juntas.junfinf) {
        errors++; this.importErrors.push(`Fila ${item.index}: JUNINIF no puede ser mayor que JUNFINF`); completed++; return;
      }
      if (juntas.juninim != null && juntas.junfinm != null && juntas.juninim > juntas.junfinm) {
        errors++; this.importErrors.push(`Fila ${item.index}: JUNINIM no puede ser mayor que JUNFINM`); completed++; return;
      }
      this.api.createInstitucion({ nombre: item.nombre, parroquiaId: parroquia.id, ...juntas }).subscribe({
        next: () => { completed++; if (completed === this.importPreview!.length) this.finishImport(errors); },
        error: (err) => { errors++; this.importErrors.push(`Fila ${item.index}: ${err.error?.message || 'Error'}`); completed++; if (completed === this.importPreview!.length) this.finishImport(errors); }
      });
    });
  }

  private finishImport(errors: number): void {
    this.importing = false;
    if (errors === 0) this.importSuccess = `${this.importPreview!.length} registros importados correctamente.`;
    else this.importSuccess = `Importación completada con ${errors} error(es).`;
    this.load();
  }
}
