import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../core/services/api.service';
import { Parroquia, Canton, Provincia } from '../../../../core/models';
import { FiltrosPanelComponent } from '../../../shared/components/filtros-panel/filtros-panel.component';

@Component({
  selector: 'app-parroquias',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltrosPanelComponent],
  templateUrl: './parroquias.component.html',
  styleUrl: './parroquias.component.css'
})
export class ParroquiasComponent implements OnInit {
  parroquias: Parroquia[] = [];
  cantones: Canton[] = [];
  cantonesFiltrados: Canton[] = [];
  provincias: Provincia[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', cantonId: null, descripcion: '', tipoParroquia: 'RURAL' };
  tiposParroquia: Array<'URBANA' | 'RURAL'> = ['URBANA', 'RURAL'];
  filterProvinciaId: number | null = null;
  filterCantonId: number | null = null;
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

  ngOnInit(): void {
    this.api.getProvincias().subscribe((d: Provincia[]) => this.provincias = d);
    this.api.getCantones().subscribe((d: Canton[]) => {
      this.cantones = d;
      this.cantonesFiltrados = d;
    });
    this.load();
  }

  load(): void {
    const obs = this.filterCantonId
      ? this.api.getParroquiasByCanton(this.filterCantonId)
      : this.api.getParroquias();
    obs.subscribe((d: Parroquia[]) => this.parroquias = d);
  }

  onProvinciaChange(): void {
    this.filterCantonId = null;
    if (this.filterProvinciaId) {
      this.api.getCantonesByProvincia(this.filterProvinciaId).subscribe((d: Canton[]) => {
        this.cantonesFiltrados = d;
      });
    } else {
      this.cantonesFiltrados = this.cantones;
    }
    this.load();
    this.currentPage = 1;
  }

  filtrarPorCanton(): void { this.load(); this.currentPage = 1; }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get parroquiasOrdenadas(): Parroquia[] {
    if (!this.sortColumn) return this.parroquias;
    return [...this.parroquias].sort((a, b) => {
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

  get parroquiasFiltradas(): Parroquia[] {
    if (!this.searchText) return this.parroquiasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.parroquiasOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get parroquiasPaginadas(): Parroquia[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.parroquiasFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.parroquiasFiltradas.length / this.pageSize) || 1;
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
    this.form = { nombre: '', cantonId: this.cantones[0]?.id || null, descripcion: '', tipoParroquia: 'RURAL' };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(p: Parroquia): void {
    this.editMode = true;
    this.selectedId = p.id;
    this.form = { nombre: p.nombre, cantonId: p.cantonId, descripcion: p.descripcion || '', tipoParroquia: p.tipoParroquia || 'RURAL' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateParroquia(this.selectedId, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createParroquia(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta parroquia?')) {
      this.api.deleteParroquia(id).subscribe(() => this.load());
    }
  }

  descargarTemplate(): void {
    const data: any[][] = [
      ['nombre', 'canton', 'tipoParroquia'],
      ['PARROQUIA EJEMPLO', 'CANTON EJEMPLO', 'RURAL'],
      ['PARROQUIA URBANA EJEMPLO', 'CANTON EJEMPLO', 'URBANA']
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 30 }, { wch: 30 }, { wch: 16 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Parroquias');
    XLSX.writeFile(wb, 'plantilla_parroquias.xlsx');
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
    this.api.getCantones().subscribe((cantones: Canton[]) => this.cantones = cantones);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(sheet);
      // Normalizacion de cabeceras: aceptar 'tipo', 'tipo_parroquia', 'tipo de parroquia', etc.
      const normalize = (k: string) => String(k || '').trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
      this.importPreview = json.map((row, i) => {
        const r: any = {};
        Object.keys(row).forEach(k => { r[normalize(k)] = row[k]; });
        const rawTipo = String(r['tipoparroquia'] ?? r['tipo'] ?? '').trim().toUpperCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const tipoParroquia = rawTipo.startsWith('URB') ? 'URBANA' : rawTipo.startsWith('RUR') ? 'RURAL' : '';
        return {
          index: i + 2,
          nombre: String(r['nombre'] ?? '').trim(),
          canton: String(r['canton'] ?? '').trim(),
          tipoParroquia
        };
      });
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
      const canton = this.cantones.find(c => c.nombre === item.canton);
      if (!item.canton || !canton) { errors++; this.importErrors.push(`Fila ${item.index}: cantón "${item.canton}" no encontrado`); completed++; return; }
      if (!item.tipoParroquia) { errors++; this.importErrors.push(`Fila ${item.index}: tipoParroquia debe ser URBANA o RURAL`); completed++; return; }
      this.api.createParroquia({ nombre: item.nombre, cantonId: canton.id, tipoParroquia: item.tipoParroquia }).subscribe({
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
