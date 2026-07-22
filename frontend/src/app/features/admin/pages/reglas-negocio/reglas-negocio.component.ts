import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, ReglaNegocio } from '../../../../core';

@Component({
  selector: 'app-reglas-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reglas-negocio.component.html'
})
export class ReglasNegocioComponent implements OnInit {
  reglas: ReglaNegocio[] = [];
  filteredReglas: ReglaNegocio[] = [];
  showModal = false;
  editing = false;
  selectedRegla: Partial<ReglaNegocio> = {};
  filtroModulo = '';
  filtroTipo = '';
  filtroActiva: string = '';
  modulos: {codigo: string; nombre: string}[] = [];
  tipos: {codigo: string; nombre: string}[] = [];

  condicionPreview = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadModulos();
    this.loadTipos();
    this.loadReglas();
  }

  loadModulos(): void {
    this.api.getModulosReglas().subscribe(data => this.modulos = data);
  }

  loadTipos(): void {
    this.api.getTiposReglas().subscribe(data => this.tipos = data);
  }

  loadReglas(): void {
    this.api.getReglasNegocio().subscribe(data => {
      this.reglas = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredReglas = this.reglas.filter(r => {
      if (this.filtroModulo && r.modulo !== this.filtroModulo) return false;
      if (this.filtroTipo && r.tipo !== this.filtroTipo) return false;
      if (this.filtroActiva !== '') {
        const activa = this.filtroActiva === 'true';
        if (r.activa !== activa) return false;
      }
      return true;
    });
  }

  openCreate(): void {
    this.editing = false;
    this.selectedRegla = {
      tipo: 'VALIDACION',
      modulo: 'CANDIDATOS',
      activa: true,
      prioridad: 0,
      condicion: '{"condition":"AND","rules":[{"field":"","operator":"EQUALS","value":""}]}'
    };
    this.updateCondicionPreview();
    this.showModal = true;
  }

  openEdit(regla: ReglaNegocio): void {
    this.editing = true;
    this.selectedRegla = { ...regla };
    this.updateCondicionPreview();
    this.showModal = true;
  }

  save(): void {
    if (!this.selectedRegla.nombre || !this.selectedRegla.condicion) return;
    try { JSON.parse(this.selectedRegla.condicion); } catch { return; }
    if (this.editing && this.selectedRegla.id) {
      this.api.updateReglaNegocio(this.selectedRegla.id, this.selectedRegla as ReglaNegocio)
        .subscribe(() => { this.showModal = false; this.loadReglas(); });
    } else {
      this.api.createReglaNegocio(this.selectedRegla as ReglaNegocio)
        .subscribe(() => { this.showModal = false; this.loadReglas(); });
    }
  }

  delete(id: number): void {
    if (confirm('¿Eliminar esta regla de negocio?')) {
      this.api.deleteReglaNegocio(id).subscribe(() => this.loadReglas());
    }
  }

  toggleActiva(regla: ReglaNegocio): void {
    this.api.toggleReglaNegocio(regla.id).subscribe(() => this.loadReglas());
  }

  getModuloNombre(codigo: string): string {
    return this.modulos.find(m => m.codigo === codigo)?.nombre || codigo;
  }

  getTipoNombre(codigo: string): string {
    return this.tipos.find(t => t.codigo === codigo)?.nombre || codigo;
  }

  getCondicionResumen(condicion: string): string {
    try {
      const obj = JSON.parse(condicion);
      const rules = obj.rules || [];
      return `${obj.condition || 'AND'} (${rules.length} regla${rules.length !== 1 ? 's' : ''})`;
    } catch { return 'JSON inválido'; }
  }

  updateCondicionPreview(): void {
    try {
      const obj = JSON.parse(this.selectedRegla.condicion || '{}');
      this.condicionPreview = JSON.stringify(obj, null, 2);
    } catch {
      this.condicionPreview = 'JSON inválido';
    }
  }

  validateCondicion(): boolean {
    try {
      JSON.parse(this.selectedRegla.condicion || '');
      return true;
    } catch {
      return false;
    }
  }
}
