import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../core/services/api.service';
import { Provincia, Zona } from '../../../../core/models';

@Component({
  selector: 'app-provincias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provincias.component.html',
  styleUrl: './provincias.component.css'
})
export class ProvinciasComponent implements OnInit {
  provincias: Provincia[] = [];
  zonas: Zona[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', zonaId: null, descripcion: '' };
  filterZonaId: number | null = null;
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
    this.loadZonas();
    this.load();
  }

  loadZonas(): void {
    this.api.getZonas().subscribe((d: Zona[]) => this.zonas = d);
  }

  load(): void {
    const obs = this.filterZonaId
      ? this.api.getProvinciasByZona(this.filterZonaId)
      : this.api.getProvincias();
    obs.subscribe((d: Provincia[]) => this.provincias = d);
  }

  filtrarPorZona(): void { this.load(); this.currentPage = 1; }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get provinciasOrdenadas(): Provincia[] {
    if (!this.sortColumn) return this.provincias;
    return [...this.provincias].sort((a, b) => {
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

  get provinciasFiltradas(): Provincia[] {
    if (!this.searchText) return this.provinciasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.provinciasOrdenadas.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get provinciasPaginadas(): Provincia[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.provinciasFiltradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.provinciasFiltradas.length / this.pageSize) || 1;
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
    this.form = { nombre: '', zonaId: this.zonas[0]?.id || null, descripcion: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  edit(p: Provincia): void {
    this.editMode = true;
    this.selectedId = p.id;
    this.form = { nombre: p.nombre, zonaId: p.zonaId, descripcion: p.descripcion || '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  save(): void {
    this.errorMessage = '';
    if (this.editMode && this.selectedId) {
      this.api.updateProvincia(this.selectedId, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createProvincia(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta provincia?')) {
      this.api.deleteProvincia(id).subscribe(() => this.load());
    }
  }

  descargarTemplate(): void {
    const data: any[][] = [['nombre', 'zona'], ['PROVINCIA EJEMPLO', 'ZONA EJEMPLO']];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 30 }, { wch: 30 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Provincias');
    XLSX.writeFile(wb, 'plantilla_provincias.xlsx');
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
    this.api.getZonas().subscribe((zonas: Zona[]) => this.zonas = zonas);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row['nombre'] || '', zona: row['zona'] || '' }));
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
      const zona = this.zonas.find(z => z.nombre === item.zona);
      if (!item.zona || !zona) { errors++; this.importErrors.push(`Fila ${item.index}: zona "${item.zona}" no encontrada`); completed++; return; }
      this.api.createProvincia({ nombre: item.nombre, zonaId: zona.id }).subscribe({
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
