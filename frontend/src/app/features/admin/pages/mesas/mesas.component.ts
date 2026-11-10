import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, InstitucionEducativa, Mesa, Zona, Provincia, Canton, Parroquia } from '../../../../core/models';

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
  instituciones: InstitucionEducativa[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { numero: '', sexo: 'MIXTA', institucionId: null, eleccionesId: null };
  // Rango de mesas a crear (solo creación): de `rangoDesde` a `rangoHasta` inclusive
  rangoDesde: number | null = null;
  rangoHasta: number | null = null;
  creandoRango = false;
  filterInstitucionId: number | null = null;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizes: number[] = [5, 10, 25, 50];
  Math = Math;
  errorMessage: string = '';

  // Geographic filters for modal
  zonas: Zona[] = [];
  provinciasDisponibles: Provincia[] = [];
  cantonesDisponibles: Canton[] = [];
  parroquiasDisponibles: Parroquia[] = [];
  filterZonaId: number | null = null;
  filterProvinciaId: number | null = null;
  filterCantonId: number | null = null;
  filterParroquiaId: number | null = null;
  buscarInstitucionText: string = '';
  institucionesCargadas = false;
  zonasCargadas = false;

  constructor(public api: ApiService) {}

  get isAdmin(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('electoral_user') || '{}');
      return user.rol === 'ADMIN';
    } catch { return false; }
  }

  ngOnInit(): void {
    this.api.getZonas().subscribe((d: Zona[]) => { this.zonas = d; this.zonasCargadas = true; });
    this.api.getInstituciones().subscribe((d: InstitucionEducativa[]) => {
      this.instituciones = d;
      this.institucionesCargadas = true;
    });
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.form.eleccionesId = e[0].id;
        this.load(e[0].id);
      }
    });
  }

  get filteredInstituciones(): InstitucionEducativa[] {
    let result = this.instituciones;
    if (this.filterParroquiaId) {
      result = result.filter(i => Number(i.parroquiaId) === Number(this.filterParroquiaId));
    }
    if (this.buscarInstitucionText) {
      const term = this.buscarInstitucionText.toLowerCase();
      result = result.filter(i => i.nombre && i.nombre.toLowerCase().includes(term));
    }
    return result;
  }

  load(eleccionId: number): void {
    const obs = this.filterInstitucionId
      ? this.api.getMesasByInstitucion(this.filterInstitucionId)
      : this.api.getMesasByEleccion(eleccionId);
    obs.subscribe((d: Mesa[]) => this.mesas = d);
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

  toUpper(obj: any, prop: string): void {
    if (obj[prop]) obj[prop] = obj[prop].toUpperCase();
  }

  openModal(): void {
    this.editMode = false;
    this.form = { numero: '', sexo: 'MIXTA', institucionId: null, eleccionesId: this.form.eleccionesId };
    this.rangoDesde = null;
    this.rangoHasta = null;
    this.creandoRango = false;
    this.errorMessage = '';
    this.resetModalFilters();
    this.showModal = true;
  }

  edit(m: Mesa): void {
    this.editMode = true;
    this.selectedId = m.id;
    this.form = { numero: m.numero, sexo: m.sexo, institucionId: m.institucionId, eleccionesId: m.eleccionesId };
    this.rangoDesde = null;
    this.rangoHasta = null;
    this.errorMessage = '';
    this.resetModalFilters();
    this.showModal = true;
  }

  /** Cantidad de mesas que se crearán con el rango actual */
  get mesasARango(): number {
    if (this.rangoDesde == null || this.rangoHasta == null) return 0;
    if (this.rangoHasta < this.rangoDesde) return 0;
    return this.rangoHasta - this.rangoDesde + 1;
  }

  resetModalFilters(): void {
    this.filterZonaId = null;
    this.filterProvinciaId = null;
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.provinciasDisponibles = [];
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    this.buscarInstitucionText = '';
  }

  onModalZonaChange(): void {
    this.filterProvinciaId = null;
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.form.institucionId = null;
    this.provinciasDisponibles = [];
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    if (this.filterZonaId) {
      this.api.getProvinciasByZona(this.filterZonaId).subscribe((d: Provincia[]) => this.provinciasDisponibles = d);
    }
  }

  onModalProvinciaChange(): void {
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.form.institucionId = null;
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    if (this.filterProvinciaId) {
      this.api.getCantonesByProvincia(this.filterProvinciaId).subscribe((d: Canton[]) => this.cantonesDisponibles = d);
    }
  }

  onModalCantonChange(): void {
    this.filterParroquiaId = null;
    this.form.institucionId = null;
    this.parroquiasDisponibles = [];
    if (this.filterCantonId) {
      this.api.getParroquiasByCanton(this.filterCantonId).subscribe((d: Parroquia[]) => this.parroquiasDisponibles = d);
    }
  }

  onModalParroquiaChange(): void {
    this.form.institucionId = null;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; this.errorMessage = ''; }

  async save(): Promise<void> {
    this.errorMessage = '';
    if (!this.form.eleccionesId) {
      this.errorMessage = 'Debe seleccionar una elección';
      return;
    }

    // Edición: una sola mesa
    if (this.editMode && this.selectedId) {
      this.api.updateMesa(this.selectedId, this.form).subscribe({
        next: () => { this.load(this.form.eleccionesId); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
      return;
    }

    // Creación: rango de mesas (ej. de 1 a 8 crea 1,2,3...8)
    if (!this.form.institucionId) {
      this.errorMessage = 'Debe seleccionar una institución';
      return;
    }
    const desde = Number(this.rangoDesde);
    const hasta = Number(this.rangoHasta);
    if (!Number.isInteger(desde) || !Number.isInteger(hasta) || desde < 1 || hasta < 1) {
      this.errorMessage = 'Ingrese un rango de números válido (desde y hasta deben ser números enteros mayores a 0)';
      return;
    }
    if (hasta < desde) {
      this.errorMessage = 'El número "hasta" debe ser mayor o igual al número "desde"';
      return;
    }
    if (hasta - desde + 1 > 100) {
      this.errorMessage = 'El rango no puede superar 100 mesas por creación';
      return;
    }

    this.creandoRango = true;
    let creadas = 0;
    const duplicadas: string[] = [];
    const otrosErrores: string[] = [];

    for (let n = desde; n <= hasta; n++) {
      try {
        await firstValueFrom(this.api.createMesa({ ...this.form, numero: String(n) }));
        creadas++;
      } catch (err: any) {
        const msg = err?.error?.message || 'Error desconocido';
        if (msg.toLowerCase().includes('ya existe')) duplicadas.push(String(n));
        else otrosErrores.push(`${n}: ${msg}`);
      }
    }

    this.creandoRango = false;
    this.load(this.form.eleccionesId);

    if (otrosErrores.length > 0) {
      this.errorMessage = `Se crearon ${creadas} mesa(s). Errores: ${otrosErrores.join('; ')}`;
      return;
    }
    if (duplicadas.length > 0) {
      this.errorMessage = `Se crearon ${creadas} mesa(s). Ya existían y se omitieron las mesas: ${duplicadas.join(', ')}`;
      return;
    }
    this.closeModal();
  }

  cerrar(id: number): void { if (confirm('Cerrar esta mesa?')) this.api.cerrarMesa(id).subscribe(() => this.load(this.form.eleccionesId)); }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar esta mesa?')) {
      this.api.deleteMesa(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}
