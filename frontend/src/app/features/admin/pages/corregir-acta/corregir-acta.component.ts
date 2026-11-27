import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import {
  ActaCorreccionRequest, MesaActaFoto, MesaActaFotosDeMesa, Voto
} from '../../../../core/models';

interface FotoActaVista {
  foto: MesaActaFoto;
  url: string;
}

/**
 * Página dedicada a corregir un acta: formulario a la izquierda y foto ampliada
 * a la derecha, con miniaturas inferiores cuando la mesa tiene más de una foto.
 */
@Component({
  selector: 'app-corregir-acta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './corregir-acta.component.html',
  styleUrl: './corregir-acta.component.css'
})
export class CorregirActaComponent implements OnInit, OnDestroy {
  mesa: MesaActaFotosDeMesa | null = null;
  mesaId: number | null = null;
  eleccionId: number | null = null;

  votos: Voto[] = [];
  nulos = 0;
  blanco = 0;
  ausentes = 0;
  cargando = true;
  guardando = false;
  error = '';
  success = '';

  nombresListas = new Map<number, string>();
  cargosPorLista = new Map<number, string>();

  readonly categorias = [
    'Alcaldes',
    'Consejales Rurales',
    'Consejales Urbanos',
    'Juntas Parroquiales'
  ];
  tabActiva = this.categorias[0];

  fotos: FotoActaVista[] = [];
  fotoSeleccionadaId: number | null = null;
  zoom = 1;

  private readonly zoomMin = 0.5;
  private readonly zoomMax = 4;
  private readonly zoomPaso = 0.25;

  private listasCargadas = false;
  private objectUrls: string[] = [];
  private destruido = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('mesaId'));
    this.mesaId = Number.isFinite(id) && id > 0 ? id : null;
    const eleccion = Number(this.route.snapshot.queryParamMap.get('eleccionId'));
    this.eleccionId = Number.isFinite(eleccion) && eleccion > 0 ? eleccion : null;

    if (!this.mesaId) {
      this.cargando = false;
      this.error = 'No se indicó la mesa que se debe corregir.';
      return;
    }

    if (this.eleccionId) {
      this.cargarMesa();
      return;
    }

    this.api.getEleccionesActivas().subscribe({
      next: (elecciones) => {
        this.eleccionId = elecciones?.[0]?.id ?? null;
        if (this.eleccionId) {
          this.cargarMesa();
        } else {
          this.cargando = false;
          this.error = 'No hay elecciones activas para cargar el acta.';
        }
      },
      error: () => {
        this.cargando = false;
        this.error = 'No se pudieron cargar las elecciones activas.';
      }
    });
  }

  ngOnDestroy(): void {
    this.destruido = true;
    this.liberarFotos();
  }

  volver(): void {
    this.router.navigate(['/actas']);
  }

  private cargarMesa(): void {
    if (!this.eleccionId || !this.mesaId) return;
    this.cargando = true;
    this.api.getActaFotosPorEleccion(this.eleccionId).subscribe({
      next: (data) => {
        const mesa = (data || []).find(m => m.mesaId === this.mesaId);
        if (!mesa) {
          this.cargando = false;
          this.error = 'No se encontró la mesa en la elección activa.';
          return;
        }
        this.mesa = mesa;
        this.nulos = mesa.votosNulos ?? 0;
        this.blanco = mesa.votosBlanco ?? 0;
        this.ausentes = mesa.ausentes ?? 0;
        this.cargarFotos(mesa.fotos || []);
        this.cargarListas();
        this.cargarVotos();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err?.error?.message || 'No se pudo cargar el acta de la mesa.';
      }
    });
  }

  private cargarVotos(): void {
    if (!this.mesaId) return;
    this.api.getVotosByMesa(this.mesaId).subscribe({
      next: (votos) => {
        this.votos = (votos || []).map(v => ({ ...v, cantidadVotos: Number(v.cantidadVotos) || 0 }));
        this.seleccionarPrimerTabConVotos();
        this.cargando = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudieron cargar los votos de esta mesa.';
        this.cargando = false;
      }
    });
  }

  private cargarListas(): void {
    if (!this.eleccionId || this.listasCargadas) return;
    this.listasCargadas = true;
    this.api.getListasByEleccion(this.eleccionId).subscribe({
      next: (listas) => {
        for (const l of listas || []) {
          const id = Number(l.id ?? l.listaId);
          const nombre = l.nombre ?? l.nombreLista ?? l.listaNombre;
          if (id && nombre) this.nombresListas.set(id, String(nombre));
          if (id && l.cargoNombre) this.cargosPorLista.set(id, String(l.cargoNombre));
        }
        if (this.tabActiva === 'Otros') this.seleccionarPrimerTabConVotos();
      },
      error: () => { this.listasCargadas = false; }
    });
  }

  // ===== Fotos del acta =====

  private cargarFotos(fotos: MesaActaFoto[]): void {
    this.liberarFotos();
    this.fotos = fotos.map(foto => ({ foto, url: '' }));
    this.fotoSeleccionadaId = this.fotos.length > 0 ? this.fotos[0].foto.id : null;

    for (const item of this.fotos) {
      if (!this.mesaId) break;
      this.api.getActaFotoBlob(this.mesaId, item.foto.id).subscribe({
        next: (blob) => {
          if (this.destruido) return;
          const url = URL.createObjectURL(blob);
          item.url = url;
          this.objectUrls.push(url);
        },
        error: () => { item.url = ''; }
      });
    }
  }

  private liberarFotos(): void {
    for (const url of this.objectUrls) URL.revokeObjectURL(url);
    this.objectUrls = [];
  }

  get fotoGrande(): FotoActaVista | null {
    const seleccionada = this.fotos.find(f => f.foto.id === this.fotoSeleccionadaId);
    return seleccionada || this.fotos[0] || null;
  }

  get fotoGrandeUrl(): string {
    return this.fotoGrande?.url || '';
  }

  seleccionarFoto(item: FotoActaVista): void {
    this.fotoSeleccionadaId = item.foto.id;
    this.zoom = 1;
  }

  zoomIn(): void {
    this.zoom = Math.min(this.zoomMax, Math.round((this.zoom + this.zoomPaso) * 100) / 100);
  }

  zoomOut(): void {
    this.zoom = Math.max(this.zoomMin, Math.round((this.zoom - this.zoomPaso) * 100) / 100);
  }

  resetZoom(): void {
    this.zoom = 1;
  }

  get puedeAlejar(): boolean {
    return this.zoom > this.zoomMin;
  }

  get puedeAcercar(): boolean {
    return this.zoom < this.zoomMax;
  }

  esFotoActiva(item: FotoActaVista): boolean {
    return this.fotoGrande?.foto.id === item.foto.id;
  }

  // ===== Votos por cargo =====

  nombreVoto(voto: Voto): string {
    const candidato = `${voto.candidatoApellido || ''} ${voto.candidatoNombre || ''}`.trim();
    if (candidato) return candidato;
    if (voto.listaId != null) {
      return this.nombresListas.get(voto.listaId) || `Lista #${voto.listaId}`;
    }
    return `Voto #${voto.id}`;
  }

  private categoriaDeNombre(nombre?: string | null): string | null {
    const original = (nombre || '').trim();
    if (!original) return null;
    const n = original.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (n.includes('alcalde')) return 'Alcaldes';
    if ((n.includes('junta') && n.includes('parroqui')) || n.includes('vocal')) {
      return 'Juntas Parroquiales';
    }
    if (n.includes('concejal') || n.includes('consejal') ||
        n.includes('concejo') || n.includes('consejo')) {
      if (n.includes('urban')) return 'Consejales Urbanos';
      if (n.includes('rural')) return 'Consejales Rurales';
    }
    return null;
  }

  categoriaVoto(voto: Voto): string {
    const nombre = voto.cargoNombre ||
      (voto.listaId != null ? this.cargosPorLista.get(voto.listaId) : undefined);
    return this.categoriaDeNombre(nombre) || 'Otros';
  }

  get tabs(): { label: string; count: number }[] {
    const conteos = new Map<string, number>(
      this.categorias.map(label => [label, 0] as [string, number])
    );
    let otros = 0;
    for (const voto of this.votos) {
      const categoria = this.categoriaVoto(voto);
      if (conteos.has(categoria)) {
        conteos.set(categoria, (conteos.get(categoria) || 0) + 1);
      } else {
        otros++;
      }
    }
    const tabs = this.categorias.map(label => ({
      label,
      count: conteos.get(label) || 0
    }));
    if (otros > 0) tabs.push({ label: 'Otros', count: otros });
    return tabs;
  }

  get votosVisibles(): Voto[] {
    return this.votos.filter(v => this.categoriaVoto(v) === this.tabActiva);
  }

  get totalVotosVisibles(): number {
    return this.votosVisibles.reduce((sum, v) => sum + (Number(v.cantidadVotos) || 0), 0);
  }

  private seleccionarPrimerTabConVotos(): void {
    const tab = this.tabs.find(t => t.count > 0);
    this.tabActiva = tab ? tab.label : this.categorias[0];
  }

  // ===== Corrección / aprobación =====

  private aplicarRespuestaMesa(respuesta: {
    id: number; cerrada?: boolean | null; aprobada?: boolean | null;
    votosNulos?: number | null; votosBlanco?: number | null; ausentes?: number | null;
  }): void {
    if (!this.mesa || this.mesa.mesaId !== respuesta.id) return;
    this.mesa = {
      ...this.mesa,
      cerrada: respuesta.cerrada ?? this.mesa.cerrada,
      aprobada: respuesta.aprobada ?? this.mesa.aprobada,
      votosNulos: respuesta.votosNulos ?? this.mesa.votosNulos,
      votosBlanco: respuesta.votosBlanco ?? this.mesa.votosBlanco,
      ausentes: respuesta.ausentes ?? this.mesa.ausentes
    };
    this.nulos = this.mesa.votosNulos ?? 0;
    this.blanco = this.mesa.votosBlanco ?? 0;
    this.ausentes = this.mesa.ausentes ?? 0;
  }

  guardar(): void {
    if (!this.mesa || !this.mesaId || this.guardando) return;
    if (this.mesa.aprobada) {
      this.error = 'El acta ya fue aprobada; debe desaprobarla antes de corregirla.';
      return;
    }
    this.error = '';
    this.success = '';
    this.guardando = true;
    const data: ActaCorreccionRequest = {
      votosNulos: Math.max(0, Number(this.nulos) || 0),
      votosBlanco: Math.max(0, Number(this.blanco) || 0),
      ausentes: Math.max(0, Number(this.ausentes) || 0),
      votos: this.votos.map(v => ({
        votoId: v.id,
        cantidadVotos: Math.max(0, Number(v.cantidadVotos) || 0)
      }))
    };
    this.api.corregirActa(this.mesaId, data).subscribe({
      next: (respuesta) => {
        this.aplicarRespuestaMesa(respuesta);
        this.guardando = false;
        this.success = 'Corrección guardada correctamente.';
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo guardar la corrección del acta.';
        this.guardando = false;
      }
    });
  }

  aprobar(): void {
    if (!this.mesa || !this.mesaId) return;
    if (!confirm(`¿Aprobar el acta de la mesa ${this.mesa.mesaNumero}? El miembro de mesa no podrá volver a editarla.`)) return;
    this.api.aprobarMesa(this.mesaId).subscribe({
      next: (respuesta) => {
        this.aplicarRespuestaMesa(respuesta);
        this.error = '';
        this.success = 'Acta aprobada. Para corregirla, desapruebe el acta primero.';
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo aprobar el acta.';
      }
    });
  }

  desaprobar(): void {
    if (!this.mesa || !this.mesaId) return;
    if (!confirm(`¿Desaprobar el acta de la mesa ${this.mesa.mesaNumero}? Se permitirán nuevas correcciones.`)) return;
    this.api.desaprobarMesa(this.mesaId).subscribe({
      next: (respuesta) => {
        this.aplicarRespuestaMesa(respuesta);
        this.error = '';
        this.success = 'Acta desaprobada. Ya puede corregir los datos.';
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo desaprobar el acta.';
      }
    });
  }
}
