import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { FiltrosPanelComponent } from '../../../shared/components/filtros-panel/filtros-panel.component';
import { Eleccion, Usuario, Mesa, Provincia, Canton, Parroquia } from '../../../../core/models';

@Component({
  selector: 'app-asignar-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltrosPanelComponent],
  templateUrl: './asignar-mesas.component.html',
  styleUrl: './asignar-mesas.component.css'
})
export class AsignarMesasComponent implements OnInit {
  elecciones: Eleccion[] = [];
  miembros: Usuario[] = [];
  mesasDisponibles: any[] = [];
  mesasAsignadas: any[] = [];
  todasMesas: any[] = [];
  eleccionId: number | null = null;
  usuarioId: number | null = null;

  // Geografia para filtrar las mesas por territorio
  provincias: Provincia[] = [];
  cantonesAll: Canton[] = [];      // todos los cantones (se cargan una vez)
  parroquiasAll: Parroquia[] = []; // todas las parroquias (se cargan una vez)

  // Filtros de mesas (provincia -> canton -> parroquia -> nombre)
  filtroProvinciaId: number | null = null;
  filtroCantonId: number | null = null;
  filtroParroquiaId: number | null = null;
  filtroTexto: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.eleccionId = e[0].id;
        this.onEleccionChange();
      }
    });
    this.api.getUsuariosByRol('MIEMBRO_MESA').subscribe((m: Usuario[]) => this.miembros = m);
    this.api.getProvincias().subscribe((p: Provincia[]) => this.provincias = p);
    this.api.getCantones().subscribe((c: Canton[]) => this.cantonesAll = c);
    this.api.getParroquias().subscribe((p: Parroquia[]) => this.parroquiasAll = p);
  }

  onEleccionChange(): void {
    if (this.eleccionId) {
      this.api.getMesasByEleccion(this.eleccionId).subscribe((mesas: any[]) => {
        this.todasMesas = mesas;
        if (this.usuarioId) {
          this.onUsuarioChange();
        }
      });
    }
  }

  onUsuarioChange(): void {
    if (this.usuarioId && this.eleccionId) {
      this.api.getMesasByEleccion(this.eleccionId).subscribe((mesas: any[]) => {
        this.todasMesas = mesas;
        this.mesasDisponibles = mesas.filter((m: any) => m.usuarioId == null && !m.cerrada);
        this.api.getMesasByUsuario(this.usuarioId!, this.eleccionId!).subscribe((asignadas: any[]) => {
          this.mesasAsignadas = asignadas;
        });
      });
    } else {
      this.mesasAsignadas = [];
      this.mesasDisponibles = [];
    }
  }

  // ===== Filtros por territorio =====

  /** Cantones de la provincia seleccionada en el filtro (o todos si no hay provincia) */
  get cantonesFiltrados(): Canton[] {
    if (this.filtroProvinciaId == null) return this.cantonesAll;
    return this.cantonesAll.filter(c => c.provinciaId === this.filtroProvinciaId);
  }

  /** Parroquias del canton seleccionado en el filtro (o todas si no hay canton) */
  get parroquiasFiltradas(): Parroquia[] {
    if (this.filtroCantonId == null) return this.parroquiasAll;
    return this.parroquiasAll.filter(p => p.cantonId === this.filtroCantonId);
  }

  onFiltroProvinciaChange(): void {
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
  }

  onFiltroCantonChange(): void {
    this.filtroParroquiaId = null;
  }

  limpiarFiltros(): void {
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroTexto = '';
  }

  /** Aplica los filtros de territorio y de texto a una lista de mesas */
  private aplicarFiltros(mesas: any[]): any[] {
    const t = this.filtroTexto.trim().toLowerCase();
    // Truthiness: null, '' o undefined dejan el filtro inactivo
    const provId = this.filtroProvinciaId ? Number(this.filtroProvinciaId) : null;
    const cantId = this.filtroCantonId ? Number(this.filtroCantonId) : null;
    const parrId = this.filtroParroquiaId ? Number(this.filtroParroquiaId) : null;
    return mesas.filter(m => {
      if (provId != null && m.provinciaId !== provId) return false;
      if (cantId != null && m.cantonId !== cantId) return false;
      if (parrId != null && m.parroquiaId !== parrId) return false;
      if (t) {
        const nombre = (m.institucionNombre || '').toLowerCase();
        const numero = String(m.numero ?? '').toLowerCase();
        if (!nombre.includes(t) && !numero.includes(t)) return false;
      }
      return true;
    });
  }

  get disponiblesFiltradas(): any[] {
    return this.aplicarFiltros(this.mesasDisponibles);
  }

  get asignadasFiltradas(): any[] {
    return this.aplicarFiltros(this.mesasAsignadas);
  }

  get hayFiltrosActivos(): boolean {
    return this.filtrosActivos > 0;
  }

  /** Nº de filtros de territorio/texto activos (para el badge del panel) */
  get filtrosActivos(): number {
    return (this.filtroProvinciaId ? 1 : 0) + (this.filtroCantonId ? 1 : 0) +
           (this.filtroParroquiaId ? 1 : 0) + (this.filtroTexto.trim() ? 1 : 0);
  }

  // ===== Asignacion =====

  asignarMesa(mesa: any): void {
    if (this.usuarioId) {
      this.api.asignarUsuarioAMesa(mesa.id, this.usuarioId).subscribe({
        next: () => this.onUsuarioChange(),
        error: (err) => alert(err.error?.message || 'Error al asignar la mesa')
      });
    }
  }

  desasignarMesa(mesa: any): void {
    if (this.usuarioId && confirm('Quitar asignacion de esta mesa?')) {
      this.api.desasignarUsuarioDeMesa(mesa.id, this.usuarioId).subscribe(() => {
        this.onUsuarioChange();
      });
    }
  }

  getMiembroSeleccionado(): Usuario | undefined {
    const id = typeof this.usuarioId === 'string' ? Number(this.usuarioId) : this.usuarioId;
    return this.miembros.find(m => m.id === id);
  }
}
