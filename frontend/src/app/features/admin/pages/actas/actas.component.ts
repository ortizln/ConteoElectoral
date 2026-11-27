import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import {
  ActaCorreccionRequest, Eleccion, MesaActaFotosDeMesa, MesaActaFoto,
  Provincia, Canton, Parroquia, InstitucionEducativa, Voto
} from '../../../../core/models';

/**
 * Página "Actas" (ADMIN/SUPERVISOR): lista todas las mesas de la elección
 * con sus fotos del acta para revisión rápida. Las mesas sin foto se marcan
 * para identificar cuáles cerraron sin respaldo.
 *
 * Incluye filtros dependientes por provincia → cantón → parroquía → recinto.
 */
@Component({
  selector: 'app-actas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent implements OnInit, OnDestroy {
  elecciones: Eleccion[] = [];
  selectedEleccionId: number | null = null;
  mesas: MesaActaFotosDeMesa[] = [];
  loading = false;
  searchText = '';
  filtro: 'todas' | 'con-foto' | 'sin-foto' = 'todas';

  // Catálogos territoriales para los filtros
  provincias: Provincia[] = [];
  cantones: Canton[] = [];
  parroquias: Parroquia[] = [];
  recintos: InstitucionEducativa[] = [];
  provinciaId: number | null = null;
  cantonId: number | null = null;
  parroquiaId: number | null = null;
  recintoId: number | null = null;

  visorUrl: string | null = null;
  visorInfo = '';

  // Corrección / aprobación del acta por ADMIN/SUPERVISOR
  correccionMesa: MesaActaFotosDeMesa | null = null;
  correccionVotos: Voto[] = [];
  correccionNulos = 0;
  correccionBlanco = 0;
  correccionAusentes = 0;
  correccionCargando = false;
  correccionGuardando = false;
  correccionError = '';
  correccionSuccess = '';
  nombresListas = new Map<number, string>();

  private thumbCache = new Map<number, string>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.api.getEleccionesActivas().subscribe((data: Eleccion[]) => {
      this.elecciones = data;
      if (data.length > 0) {
        this.selectedEleccionId = data[0].id;
        this.load();
      }
    });
  }

  ngOnDestroy(): void {
    this.limpiarThumbs();
    this.cerrarVisor();
  }

  private cargarCatalogos(): void {
    this.api.getProvincias().subscribe({ next: d => this.provincias = d || [], error: () => {} });
    this.api.getCantones().subscribe({ next: d => this.cantones = d || [], error: () => {} });
    this.api.getParroquias().subscribe({ next: d => this.parroquias = d || [], error: () => {} });
    this.api.getInstituciones().subscribe({ next: d => this.recintos = d || [], error: () => {} });
  }

  /** Catálogos dependientes: cada nivel muestra solo los hijos del superior. */
  get cantonesDisponibles(): Canton[] {
    return this.provinciaId != null
      ? this.cantones.filter(c => c.provinciaId === this.provinciaId)
      : this.cantones;
  }

  get parroquiasDisponibles(): Parroquia[] {
    if (this.cantonId != null) {
      return this.parroquias.filter(p => p.cantonId === this.cantonId);
    }
    if (this.provinciaId != null) {
      const cantonIds = new Set(this.cantonesDisponibles.map(c => c.id));
      return this.parroquias.filter(p => cantonIds.has(p.cantonId));
    }
    return this.parroquias;
  }

  get recintosDisponibles(): InstitucionEducativa[] {
    const parroquiaIds = new Set(this.parroquiasDisponibles.map(p => p.id));
    return this.recintos.filter(r => parroquiaIds.has(r.parroquiaId));
  }

  onProvinciaChange(): void {
    this.cantonId = null;
    this.parroquiaId = null;
    this.recintoId = null;
  }

  onCantonChange(): void {
    this.parroquiaId = null;
    this.recintoId = null;
  }

  onParroquiaChange(): void {
    this.recintoId = null;
  }

  limpiarFiltros(): void {
    this.provinciaId = null;
    this.cantonId = null;
    this.parroquiaId = null;
    this.recintoId = null;
    this.searchText = '';
    this.filtro = 'todas';
  }

  onEleccionChange(): void {
    this.limpiarThumbs();
    this.cerrarCorreccion();
    this.load();
  }

  load(): void {
    if (!this.selectedEleccionId) return;
    this.loading = true;
    this.api.getActaFotosPorEleccion(this.selectedEleccionId).subscribe({
      next: (data) => { this.mesas = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  /** Compara por ID y, si el backend aún no envía el ID, por nombre del catálogo. */
  private coincideCatalogo(
    id: number | null,
    mesaId: number | null | undefined,
    nombre: string | null | undefined,
    catalogo: { id: number; nombre: string }[]
  ): boolean {
    if (id == null) return true;
    if (mesaId != null) return mesaId === id;
    const item = catalogo.find(c => c.id === id);
    // Si no hay dato en la mesa ni en el catálogo, no se descarta.
    return !item || !nombre || nombre.trim().toLowerCase() === item.nombre.trim().toLowerCase();
  }

  get mesasFiltradas(): MesaActaFotosDeMesa[] {
    const q = this.searchText.trim().toLowerCase();
    return this.mesas.filter(m => {
      if (this.filtro === 'con-foto' && (m.fotos?.length || 0) === 0) return false;
      if (this.filtro === 'sin-foto' && (m.fotos?.length || 0) > 0) return false;

      if (!this.coincideCatalogo(this.provinciaId, m.provinciaId, m.provinciaNombre, this.provincias)) return false;
      if (!this.coincideCatalogo(this.cantonId, m.cantonId, m.cantonNombre, this.cantones)) return false;
      if (!this.coincideCatalogo(this.parroquiaId, m.parroquiaId, m.parroquiaNombre, this.parroquias)) return false;
      if (!this.coincideCatalogo(this.recintoId, m.institucionId, m.institucionNombre, this.recintos)) return false;

      if (!q) return true;
      return (m.mesaNumero || '').toLowerCase().includes(q) ||
        (m.institucionNombre || '').toLowerCase().includes(q) ||
        (m.parroquiaNombre || '').toLowerCase().includes(q) ||
        (m.cantonNombre || '').toLowerCase().includes(q) ||
        (m.provinciaNombre || '').toLowerCase().includes(q);
    });
  }

  get totalConFoto(): number {
    return this.mesas.filter(m => (m.fotos?.length || 0) > 0).length;
  }

  get totalSinFoto(): number {
    return this.mesas.filter(m => (m.fotos?.length || 0) === 0).length;
  }

  /** Miniatura en caché (blob) de una foto */
  thumbUrl(foto: MesaActaFoto): string {
    let url = this.thumbCache.get(foto.id);
    if (url === undefined) {
      this.thumbCache.set(foto.id, '');
      this.api.getActaFotoBlob(foto.mesaId, foto.id).subscribe({
        next: (blob) => {
          this.thumbCache.set(foto.id, URL.createObjectURL(blob));
        },
        error: () => this.thumbCache.set(foto.id, '')
      });
      return '';
    }
    return url;
  }

  abrirVisor(foto: MesaActaFoto, mesa: MesaActaFotosDeMesa): void {
    this.api.getActaFotoBlob(foto.mesaId, foto.id).subscribe({
      next: (blob) => {
        this.visorUrl = URL.createObjectURL(blob);
        this.visorInfo = `Mesa ${mesa.mesaNumero} — ${mesa.institucionNombre || ''}` +
          (foto.subidoPorNombre ? ` · Subida por ${foto.subidoPorNombre}` : '') +
          (foto.createdAt ? ` · ${foto.createdAt}` : '');
      }
    });
  }

  cerrarVisor(): void {
    if (this.visorUrl) {
      URL.revokeObjectURL(this.visorUrl);
      this.visorUrl = null;
      this.visorInfo = '';
    }
  }

  // ===== Corrección y aprobación del acta =====

  abrirCorreccion(mesa: MesaActaFotosDeMesa): void {
    if (mesa.aprobada) {
      this.correccionError = 'El acta ya fue aprobada; debe desaprobarla antes de corregirla.';
      return;
    }
    this.cerrarVisor();
    this.correccionMesa = mesa;
    this.correccionVotos = [];
    this.correccionNulos = mesa.votosNulos ?? 0;
    this.correccionBlanco = mesa.votosBlanco ?? 0;
    this.correccionAusentes = mesa.ausentes ?? 0;
    this.correccionError = '';
    this.correccionSuccess = '';
    this.correccionCargando = true;
    this.api.getVotosByMesa(mesa.mesaId).subscribe({
      next: (votos) => {
        this.correccionVotos = (votos || []).map(v => ({ ...v, cantidadVotos: Number(v.cantidadVotos) || 0 }));
        this.correccionCargando = false;
      },
      error: (err) => {
        this.correccionError = err?.error?.message || 'No se pudieron cargar los votos de esta mesa.';
        this.correccionCargando = false;
      }
    });
    if (this.selectedEleccionId && this.nombresListas.size === 0) {
      this.api.getListasByEleccion(this.selectedEleccionId).subscribe({
        next: (listas) => {
          for (const l of listas || []) {
            const id = Number(l.id ?? l.listaId);
            const nombre = l.nombre ?? l.nombreLista ?? l.listaNombre;
            if (id && nombre) this.nombresListas.set(id, String(nombre));
          }
        },
        error: () => {}
      });
    }
  }

  cerrarCorreccion(): void {
    this.correccionMesa = null;
    this.correccionVotos = [];
    this.correccionError = '';
    this.correccionSuccess = '';
    this.correccionCargando = false;
    this.correccionGuardando = false;
  }

  nombreVoto(voto: Voto): string {
    const candidato = `${voto.candidatoApellido || ''} ${voto.candidatoNombre || ''}`.trim();
    if (candidato) return candidato;
    if (voto.listaId != null) {
      return this.nombresListas.get(voto.listaId) || `Lista #${voto.listaId}`;
    }
    return `Voto #${voto.id}`;
  }

  private actualizarMesaEnLista(respuesta: {
    id: number; cerrada?: boolean | null; aprobada?: boolean | null;
    votosNulos?: number | null; votosBlanco?: number | null; ausentes?: number | null;
  }): void {
    const idx = this.mesas.findIndex(m => m.mesaId === respuesta.id);
    if (idx < 0) return;
    const mesa = this.mesas[idx];
    this.mesas = [
      ...this.mesas.slice(0, idx),
      {
        ...mesa,
        cerrada: respuesta.cerrada ?? mesa.cerrada,
        aprobada: respuesta.aprobada ?? mesa.aprobada,
        votosNulos: respuesta.votosNulos ?? mesa.votosNulos,
        votosBlanco: respuesta.votosBlanco ?? mesa.votosBlanco,
        ausentes: respuesta.ausentes ?? mesa.ausentes
      },
      ...this.mesas.slice(idx + 1)
    ];
    if (this.correccionMesa?.mesaId === respuesta.id) {
      this.correccionMesa = this.mesas.find(m => m.mesaId === respuesta.id) || this.correccionMesa;
    }
  }

  guardarCorreccion(): void {
    if (!this.correccionMesa || this.correccionGuardando) return;
    if (this.correccionMesa.aprobada) {
      this.correccionError = 'El acta ya fue aprobada; debe desaprobarla antes de corregirla.';
      return;
    }
    this.correccionError = '';
    this.correccionSuccess = '';
    this.correccionGuardando = true;
    const data: ActaCorreccionRequest = {
      votosNulos: Math.max(0, Number(this.correccionNulos) || 0),
      votosBlanco: Math.max(0, Number(this.correccionBlanco) || 0),
      ausentes: Math.max(0, Number(this.correccionAusentes) || 0),
      votos: this.correccionVotos.map(v => ({
        votoId: v.id,
        cantidadVotos: Math.max(0, Number(v.cantidadVotos) || 0)
      }))
    };
    this.api.corregirActa(this.correccionMesa.mesaId, data).subscribe({
      next: (respuesta) => {
        this.actualizarMesaEnLista(respuesta);
        this.correccionGuardando = false;
        this.correccionSuccess = 'Corrección guardada correctamente.';
      },
      error: (err) => {
        this.correccionError = err?.error?.message || 'No se pudo guardar la corrección del acta.';
        this.correccionGuardando = false;
      }
    });
  }

  aprobar(mesa: MesaActaFotosDeMesa): void {
    if (!confirm(`¿Aprobar el acta de la mesa ${mesa.mesaNumero}? El miembro de mesa no podrá volver a editarla.`)) return;
    this.api.aprobarMesa(mesa.mesaId).subscribe({
      next: (respuesta) => {
        this.actualizarMesaEnLista(respuesta);
        if (this.correccionMesa?.mesaId === mesa.mesaId) {
          this.correccionError = '';
          this.correccionSuccess = 'Acta aprobada. Para corregirla, desapruebe el acta primero.';
        }
      },
      error: (err) => {
        if (this.correccionMesa?.mesaId === mesa.mesaId) {
          this.correccionError = err?.error?.message || 'No se pudo aprobar el acta.';
        }
      }
    });
  }

  desaprobar(mesa: MesaActaFotosDeMesa): void {
    if (!confirm(`¿Desaprobar el acta de la mesa ${mesa.mesaNumero}? Se permitirán nuevas correcciones.`)) return;
    this.api.desaprobarMesa(mesa.mesaId).subscribe({
      next: (respuesta) => {
        this.actualizarMesaEnLista(respuesta);
        if (this.correccionMesa?.mesaId === mesa.mesaId) {
          this.correccionError = '';
          this.correccionSuccess = 'Acta desaprobada. Ya puede corregir los datos.';
        }
      },
      error: (err) => {
        if (this.correccionMesa?.mesaId === mesa.mesaId) {
          this.correccionError = err?.error?.message || 'No se pudo desaprobar el acta.';
        }
      }
    });
  }

  private limpiarThumbs(): void {
    for (const url of this.thumbCache.values()) {
      if (url) URL.revokeObjectURL(url);
    }
    this.thumbCache.clear();
  }
}
