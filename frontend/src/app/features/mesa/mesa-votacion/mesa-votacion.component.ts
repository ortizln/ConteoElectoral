import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { Eleccion, Candidato, Mesa, MesaNuloBlancoPorCargo, Voto, Partido, Cargo, ListaElectoral } from '../../../core/models';

interface VotoConIndice extends Voto {
  indice: number;
}

interface CategoriaMesa {
  etiqueta: string;
  cargoIds: number[];
  esLista: boolean;
}

@Component({
  selector: 'app-mesa-votacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa-votacion.component.html',
  styleUrl: './mesa-votacion.component.css'
})
export class MesaVotacionComponent implements OnInit, OnDestroy {
  @ViewChild('cantidadInput') cantidadInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cantidadListaInput') cantidadListaInput!: ElementRef<HTMLInputElement>;

  elecciones: Eleccion[] = [];
  candidatos: Candidato[] = [];
  candidatosFiltrados: (Candidato & { colorPartido?: string })[] = [];
  candidatosAux: Candidato[] = [];
  mesasDisponibles: Mesa[] = [];
  mesaActual: Mesa | null = null;
  votosRegistrados: VotoConIndice[] = [];
  candidatoSeleccionado: Candidato | null = null;
  cantidadVotos = 1;
  totalVotos = 0;
  votosNulos = 0;
  votosBlanco = 0;
  nulosBlancosPorCargo: MesaNuloBlancoPorCargo[] = [];
  cargoNuloId: number | null = null;
  private nulosBlancoTimeouts: { [tipo: string]: any } = {};

  filtroTexto = '';
  filtroPartidoId: number | null = null;
  filtroCargoId: number | null = null;
  partidos: Partido[] = [];
  cargos: Cargo[] = [];

  sortColumnCandidatos = 'partido';
  sortDirectionCandidatos: 'asc' | 'desc' = 'asc';
  sortColumnVotos = 'votos';
  sortDirectionVotos: 'asc' | 'desc' = 'desc';

  animando = false;
  errorMensaje = '';
  private wsSubscription: Subscription | null = null;
  private eleccionId: number | null = null;

  // List voting
  listas: ListaElectoral[] = [];
  listasFiltradas: (ListaElectoral & { colorPartido?: string })[] = [];
  // Igual que la APK: las listas visibles se derivan de los candidatos que el
  // backend devuelve para la mesa (ya filtrados por territorio URBANA/RURAL,
  // provincia, cantón y parroquia).
  private listaIdsElegibles = new Set<number>();
  private candidatosPorMesaCargados = false;
  showListaModal = false;
  listaLlamada: ListaElectoral | null = null;
  listaSeleccionada: ListaElectoral | null = null;
  cantidadLista = 1;
  cargosConLista: Cargo[] = [];
  mostrarListas = false;
  // Igual que la APK: se puede votar por listas sin antes elegir un cargo.
  modoVotacion: 'CANDIDATOS' | 'LISTAS' = 'CANDIDATOS';
  /** Cargo elegido arriba; también fija nulos/blancos. */
  categoriaSel: string | null = null;
  private cargoIdsCategoriaSel: number[] = [];
  private usuarioSeleccionoCargoNulo = false;

  private static readonly CATEGORIAS_ORDEN = [
    'Alcalde', 'Consejal Rural', 'Consejal Urbano', 'Junta Parroquial'
  ];

  // Delete vote confirmation
  showDeleteConfirm = false;
  deleteVotoId: number | null = null;
  deletePassword = '';
  deleteError = '';
  deleteCargando = false;

  // Foto del acta (obligatoria antes de cerrar) — galería como en la APK
  showFotoActaModal = false;
  fotoActaFiles: File[] = [];
  fotoActaPreviews: { url: string; nombre: string }[] = [];
  fotoActaExistentes: { url: string; nombre: string }[] = [];
  fotoActaSubiendo = false;
  fotoActaError = '';

  // Votos registrados drawer (mobile)
  showVotosPanel = false;

  // Selector de mesa colapsable
  selectorColapsado = false;

  private colors: string[] = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#e11d48'];

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private wsService: WebSocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((elecciones: Eleccion[]) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        const eleccion = elecciones[0];
        this.eleccionId = eleccion.id;
        this.loadData(eleccion.id);
        this.subscribeToMesaEstado(eleccion.id);
      }
    });
  }

  private subscribeToMesaEstado(eleccionId: number): void {
    this.wsSubscription = this.wsService.subscribeToMesaEstado(eleccionId).subscribe({
      next: (msg: any) => {
        if (msg.tipo === 'mesa-estado') {
          if (this.mesaActual && this.mesaActual.id === msg.mesaId) {
            this.mesaActual.cerrada = msg.cerrada;
          }
          const idx = this.mesasDisponibles.findIndex(m => m.id === msg.mesaId);
          if (idx >= 0) {
            this.mesasDisponibles[idx] = { ...this.mesasDisponibles[idx], cerrada: msg.cerrada };
          }
        }
      },
      error: () => {}
    });
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
  }

  loadData(eleccionId: number): void {
    this.api.getCandidatosByEleccion(eleccionId).subscribe((data: Candidato[]) => {
      this.candidatos = data;
      this.candidatosAux = data;
      this.aplicarFiltro();
    });
    this.api.getPartidosByEleccion(eleccionId).subscribe((data: Partido[]) => {
      this.partidos = data;
    });
    this.api.getCargosByEleccion(eleccionId).subscribe((data: Cargo[]) => {
      this.cargos = data;
      this.cargosConLista = data.filter(c => c.tipoVotacion === 'LISTA');
      if (this.mesaActual && this.cargoNuloId == null && data.length > 0) {
        this.cargoNuloId = this.cargoDefaultId(this.nulosBlancosPorCargo);
      }
      // Los candidatos ya pudieron llegar antes que los cargos: recalcular
      // el filtro para excluir los cargos que se votan por lista.
      this.aplicarFiltro();
    });
    this.api.getListasByEleccion(eleccionId).subscribe((data: ListaElectoral[]) => {
      this.listas = data;
    });
    this.api.getMesasByCurrentUser(eleccionId).subscribe((mesas: Mesa[]) => {
      this.mesasDisponibles = mesas;
      if (mesas.length > 0) {
        this.seleccionarMesa(mesas[0]);
      }
    });
  }

  seleccionarMesa(mesa: Mesa): void {
    this.mesaActual = mesa;
    this.errorMensaje = '';
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
    this.listaSeleccionada = null;
    this.cantidadLista = 1;
    this.votosNulos = mesa.votosNulos ?? 0;
    this.votosBlanco = mesa.votosBlanco ?? 0;
    this.nulosBlancosPorCargo = [];
    this.cargoNuloId = null;
    this.categoriaSel = null;
    this.cargoIdsCategoriaSel = [];
    this.usuarioSeleccionoCargoNulo = false;
    this.listaIdsElegibles = new Set<number>();
    this.candidatosPorMesaCargados = false;
    this.cargarNulosBlancosPorCargo(mesa);
    this.loadVotos();
    // Filtro de territorio: solo candidatos que le corresponden a esta mesa
    this.api.getCandidatosByMesa(mesa.id).subscribe({
      next: (data: Candidato[]) => {
        this.candidatos = data;
        this.candidatosAux = data;
        this.listaIdsElegibles = new Set(
          data.filter(c => c.listaId != null).map(c => c.listaId!)
        );
        this.candidatosPorMesaCargados = true;
        this.aplicarFiltro();
        this.asegurarCategoriaPorDefecto();
      },
      error: (err) => {
        // El backend valida la territorialidad y clasificación URBANA/RURAL aquí.
        // Antes se silenciaba y el miembro veía una lista incompleta sin saber por qué.
        this.errorMensaje = err?.error?.message
          ? `No se pudieron cargar los candidatos de esta mesa: ${err.error.message}`
          : 'No se pudieron cargar los candidatos de esta mesa. Verifique la clasificación Urbana/Rural de la parroquia.';
        this.candidatosPorMesaCargados = false;
        this.listaIdsElegibles = new Set<number>();
        this.aplicarFiltro();
        this.asegurarCategoriaPorDefecto();
      }
    });
  }

  private cargarNulosBlancosPorCargo(mesa: Mesa): void {
    this.api.getNulosBlancosPorCargo(mesa.id).subscribe({
      next: (filas) => {
        let finales = filas;
        const vacias = filas.every(f => (f.nulos || 0) === 0 && (f.blancos || 0) === 0);
        const conHistorico = (mesa.votosNulos ?? 0) > 0 || (mesa.votosBlanco ?? 0) > 0;
        const cargoDefault = this.cargoDefaultId(filas);
        if (vacias && conHistorico && cargoDefault != null) {
          // Histórico global: atribuirlo al cargo default (Alcaldes)
          finales = filas.map(f => f.cargoId === cargoDefault
            ? { ...f, nulos: mesa.votosNulos ?? 0, blancos: mesa.votosBlanco ?? 0 }
            : f);
          if (!mesa.cerrada) {
            const nulos = mesa.votosNulos ?? 0;
            const blancos = mesa.votosBlanco ?? 0;
            if (nulos > 0) {
              this.api.actualizarNuloBlanco(mesa.id, cargoDefault, 'NULO', nulos).subscribe({ error: () => {} });
            }
            if (blancos > 0) {
              this.api.actualizarNuloBlanco(mesa.id, cargoDefault, 'BLANCO', blancos).subscribe({ error: () => {} });
            }
          }
        }
        this.nulosBlancosPorCargo = finales;
        // Si el usuario ya eligió Alcalde/Consejal/Junta, se respeta ese cargo.
        if (!this.usuarioSeleccionoCargoNulo) this.cargoNuloId = cargoDefault;
      },
      error: () => {
        this.nulosBlancosPorCargo = [];
        if (!this.usuarioSeleccionoCargoNulo) {
          this.cargoNuloId = this.cargoDefaultId([]);
        }
      }
    });
  }

  private cargoDefaultId(filas: MesaNuloBlancoPorCargo[]): number | null {
    const alcalde = this.cargos.find(c => /alcalde/i.test(c.nombre));
    if (alcalde) return alcalde.id;
    if (filas.length > 0) return filas[0].cargoId;
    return this.cargos.length > 0 ? this.cargos[0].id : null;
  }

  loadVotos(): void {
    if (!this.mesaActual) return;
    this.api.getVotosByMesa(this.mesaActual.id).subscribe((votos: Voto[]) => {
      this.votosRegistrados = votos.map((v, i) => ({ ...v, indice: i + 1 }));
      this.totalVotos = votos.reduce((sum: number, v: Voto) => sum + v.cantidadVotos, 0);
      this.ordenarVotos();
    });
  }

  // Miniaturas de foto de candidato / logo de lista (caché blob)
  private fotoThumbCache = new Map<number, string>();
  private logoThumbCache = new Map<number, string>();

  fotoCandidatoThumb(id: number): string {
    let url = this.fotoThumbCache.get(id);
    if (url === undefined) {
      this.fotoThumbCache.set(id, '');
      this.api.getFotoCandidatoBlob(id).subscribe({
        next: (blob) => { this.fotoThumbCache.set(id, URL.createObjectURL(blob)); this.cdr.detectChanges(); },
        error: () => this.fotoThumbCache.set(id, '')
      });
      return '';
    }
    return url;
  }

  logoListaThumb(id: number): string {
    let url = this.logoThumbCache.get(id);
    if (url === undefined) {
      this.logoThumbCache.set(id, '');
      this.api.getLogoListaBlob(id).subscribe({
        next: (blob) => { this.logoThumbCache.set(id, URL.createObjectURL(blob)); this.cdr.detectChanges(); },
        error: () => this.logoThumbCache.set(id, '')
      });
      return '';
    }
    return url;
  }

  /** Normaliza el nombre del cargo a las cuatro categorías del conteo. */
  private categoriaDe(nombre?: string | null): string | null {
    if (!nombre) return null;
    const n = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (n.includes('alcalde')) return 'Alcalde';
    if ((n.includes('junta') && n.includes('parroqui')) || n.includes('vocal')) {
      return 'Junta Parroquial';
    }
    if (n.includes('consej') || n.includes('concejo') || n.includes('consejo')) {
      if (n.includes('urban')) return 'Consejal Urbano';
      if (n.includes('rural')) return 'Consejal Rural';
    }
    return null;
  }

  /** Cargos que tiene esta mesa, derivados de los candidatos autorizados. */
  get categoriasMesa(): CategoriaMesa[] {
    const encontradas = new Map<string, CategoriaMesa>();
    for (const c of this.candidatos) {
      const cargo = this.cargos.find(cg => cg.id === c.cargoId);
      const etiqueta = this.categoriaDe(c.cargoNombre || cargo?.nombre);
      if (!etiqueta || c.cargoId == null) continue;
      const esLista = (c.tipoVotacion || cargo?.tipoVotacion || '') === 'LISTA';
      const actual = encontradas.get(etiqueta);
      if (!actual) {
        encontradas.set(etiqueta, {
          etiqueta, cargoIds: [c.cargoId], esLista
        });
      } else {
        if (!actual.cargoIds.includes(c.cargoId)) actual.cargoIds.push(c.cargoId);
        if (esLista) actual.esLista = true;
      }
    }
    return Array.from(encontradas.values()).sort((a, b) => {
      const ia = MesaVotacionComponent.CATEGORIAS_ORDEN.indexOf(a.etiqueta);
      const ib = MesaVotacionComponent.CATEGORIAS_ORDEN.indexOf(b.etiqueta);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }

  /** Al elegir Alcalde/Consejal/Junta se activa su modo y su nulo/blanco. */
  seleccionarCategoria(cat: CategoriaMesa): void {
    this.categoriaSel = cat.etiqueta;
    this.cargoIdsCategoriaSel = [...cat.cargoIds];
    this.filtroCargoId = cat.cargoIds.length > 0 ? cat.cargoIds[0] : null;
    this.usuarioSeleccionoCargoNulo = false;
    this.setModoVotacion(cat.esLista ? 'LISTAS' : 'CANDIDATOS');
    if (cat.cargoIds.length > 0) {
      this.cargoNuloId = cat.cargoIds[0];
      this.usuarioSeleccionoCargoNulo = true;
    }
  }

  /** No hay pestaña "Todos": siempre queda activo el primer cargo de la mesa. */
  private asegurarCategoriaPorDefecto(): void {
    const cats = this.categoriasMesa;
    if (cats.length === 0) return;
    if (cats.some(c => c.etiqueta === this.categoriaSel)) return;
    this.seleccionarCategoria(cats[0]);
  }

  onFiltroCargoChange(): void {
    if (this.filtroCargoId != null) {
      const cat = this.categoriasMesa.find(c => c.cargoIds.includes(this.filtroCargoId!));
      if (cat) {
        this.categoriaSel = cat.etiqueta;
        this.cargoIdsCategoriaSel = [...cat.cargoIds];
        this.cargoNuloId = this.filtroCargoId;
        this.usuarioSeleccionoCargoNulo = true;
      }
    }
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    const cargo = this.cargos.find(c => c.id === this.filtroCargoId);
    this.mostrarListas = this.modoVotacion === 'LISTAS' || cargo?.tipoVotacion === 'LISTA';
    if (this.mostrarListas) {
      this.candidatoSeleccionado = null;
      // Igual que en la APK: en modo Listas se muestran las listas de todos los
      // cargos LISTA (o solo del cargo elegido en el filtro).
      const cargosLista = this.filtroCargoId
        ? this.cargos.filter(c => c.id === this.filtroCargoId && c.tipoVotacion === 'LISTA')
        : this.categoriaSel
          ? this.cargos.filter(c => this.cargoIdsCategoriaSel.includes(c.id) && c.tipoVotacion === 'LISTA')
          : this.cargosConLista;
      let filtradas = this.listas.filter(l => cargosLista.some(c => c.id === l.cargoId));
      // Validez territorial exacta (igual que la APK): el backend ya filtró los
      // candidatos de esta mesa por URBANA/RURAL, provincia, cantón y parroquia.
      // solo se pueden votar listas que tengan candidatos elegibles en la mesa.
      if (!this.candidatosPorMesaCargados) {
        this.listasFiltradas = [];
        return;
      }
      filtradas = filtradas.filter(l => this.listaIdsElegibles.has(l.id));
      // Concejales URBANA/RURAL: solo la circunscripción de su cargo.
      // Compatibilidad: JUNTA PARROQUIAL puede estar registrada como "PARROQUIAL".
      filtradas = filtradas.filter(l => {
        const cargoLista = this.cargos.find(c => c.id === l.cargoId);
        const circ = cargoLista?.tipoCircunscripcionCodigo;
        if (circ !== 'URBANA' && circ !== 'RURAL') return true;
        const esJunta = cargoLista?.nombre?.toUpperCase().includes('JUNTA PARROQUIAL');
        return !l.circunscripcionTipo ||
          l.circunscripcionTipo === circ ||
          (esJunta && l.circunscripcionTipo === 'PARROQUIAL');
      });
      if (this.filtroPartidoId) {
        filtradas = filtradas.filter(l => l.partidoId === this.filtroPartidoId);
      }
      if (this.filtroTexto) {
        const texto = this.filtroTexto.toLowerCase();
        filtradas = filtradas.filter(l =>
          l.nombre.toLowerCase().includes(texto) ||
          (l.partidoNombre && l.partidoNombre.toLowerCase().includes(texto))
        );
      }
      this.listasFiltradas = filtradas.map(l => ({
        ...l,
        colorPartido: this.getColorPartido(l.partidoNombre || l.nombre)
      }));
      return;
    }

    let filtrados = [...this.candidatosAux];
    // Los cargos con tipoVotacion LISTA se votan por lista, nunca individual.
    // No basta con mirar candidato.listaId: si aún no se asignó, aparecían
    // todos los candidatos (concejales y juntas) en el registro individual.
    filtrados = filtrados.filter(c => {
      if (c.listaId) return false;
      // El backend ya envía el tipo de votación del cargo en cada candidato;
      // se usa primero para no depender del orden de carga de /cargos.
      const cargoCandidato = this.cargos.find(cg => cg.id === c.cargoId);
      const tipo = c.tipoVotacion || cargoCandidato?.tipoVotacion;
      return tipo !== 'LISTA';
    });
    if (this.filtroTexto) {
      const texto = this.filtroTexto.toLowerCase();
      filtrados = filtrados.filter(c =>
        c.nombre.toLowerCase().includes(texto) ||
        c.apellido.toLowerCase().includes(texto)
      );
    }
    if (this.filtroPartidoId) {
      filtrados = filtrados.filter(c => c.partidoId === this.filtroPartidoId);
    }
    const idsPermitidos = this.filtroCargoId != null
      ? [this.filtroCargoId]
      : (this.categoriaSel ? this.cargoIdsCategoriaSel : []);
    if (idsPermitidos.length > 0) {
      filtrados = filtrados.filter(c => c.cargoId != null && idsPermitidos.includes(c.cargoId));
    }
    this.candidatosFiltrados = filtrados.map(c => ({
      ...c,
      colorPartido: this.getColorPartido(c.partidoNombre)
    }));
    this.ordenarCandidatos();
  }

  getColorPartido(partidoNombre: string): string {
    let hash = 0;
    for (let i = 0; i < partidoNombre.length; i++) {
      hash = partidoNombre.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.colors[Math.abs(hash) % this.colors.length];
  }

  limpiarFiltro(): void {
    this.filtroTexto = '';
    this.filtroPartidoId = null;
    this.filtroCargoId = null;
    this.categoriaSel = null;
    this.cargoIdsCategoriaSel = [];
    this.aplicarFiltro();
    this.asegurarCategoriaPorDefecto();
  }

  setModoVotacion(modo: 'CANDIDATOS' | 'LISTAS'): void {
    this.modoVotacion = modo;
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
    this.listaSeleccionada = null;
    this.cantidadLista = 1;
    this.aplicarFiltro();
  }

  setSortCandidatos(col: string): void {
    if (this.sortColumnCandidatos === col) {
      this.sortDirectionCandidatos = this.sortDirectionCandidatos === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnCandidatos = col;
      this.sortDirectionCandidatos = 'asc';
    }
    this.ordenarCandidatos();
  }

  getSortIconCandidatos(col: string): string {
    if (this.sortColumnCandidatos !== col) return '⇅';
    return this.sortDirectionCandidatos === 'asc' ? '↑' : '↓';
  }

  ordenarCandidatos(): void {
    const dir = this.sortDirectionCandidatos === 'asc' ? 1 : -1;
    this.candidatosFiltrados = [...this.candidatosFiltrados].sort((a: any, b: any) => {
      switch (this.sortColumnCandidatos) {
        case 'nombre': return dir * (a.nombre + a.apellido).localeCompare(b.nombre + b.apellido);
        case 'partido': return dir * (a.partidoNombre || '').localeCompare(b.partidoNombre || '');
        case 'cargo': return dir * a.cargoNombre.localeCompare(b.cargoNombre);
        default: return 0;
      }
    });
  }

  setSortVotos(col: string): void {
    if (this.sortColumnVotos === col) {
      this.sortDirectionVotos = this.sortDirectionVotos === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnVotos = col;
      this.sortDirectionVotos = 'desc';
    }
    this.ordenarVotos();
  }

  getSortIconVotos(col: string): string {
    if (this.sortColumnVotos !== col) return '⇅';
    return this.sortDirectionVotos === 'asc' ? '↑' : '↓';
  }

  ordenarVotos(): void {
    const dir = this.sortDirectionVotos === 'asc' ? 1 : -1;
    this.votosRegistrados = [...this.votosRegistrados].sort((a, b) => {
      switch (this.sortColumnVotos) {
        case 'candidato': return dir * ((a.candidatoNombre ?? '') + (a.candidatoApellido ?? '')).localeCompare((b.candidatoNombre ?? '') + (b.candidatoApellido ?? ''));
        case 'partido': return dir * (a.partidoNombre ?? '').localeCompare(b.partidoNombre ?? '');
        case 'votos': return dir * (a.cantidadVotos - b.cantidadVotos);
        default: return 0;
      }
    });
  }

  seleccionarCandidato(candidato: Candidato): void {
    this.candidatoSeleccionado = candidato;
    // Si ya hay votos, se muestra el total cargado: registrar reemplaza ese valor.
    this.cantidadVotos = this.votosRegistrados.find(v => v.candidatoId === candidato.id)?.cantidadVotos ?? 1;
    setTimeout(() => this.cantidadInput?.nativeElement?.focus(), 100);
  }

  cancelarSeleccion(): void {
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
  }

  get nulosCargoSel(): number {
    return this.nulosBlancosPorCargo.find(f => f.cargoId === this.cargoNuloId)?.nulos ?? 0;
  }

  set nulosCargoSel(valor: number) {
    this.actualizarFilaCargo('nulos', Math.max(0, valor || 0));
  }

  get blancosCargoSel(): number {
    return this.nulosBlancosPorCargo.find(f => f.cargoId === this.cargoNuloId)?.blancos ?? 0;
  }

  set blancosCargoSel(valor: number) {
    this.actualizarFilaCargo('blancos', Math.max(0, valor || 0));
  }

  get cargoNuloNombre(): string {
    return this.cargos.find(c => c.id === this.cargoNuloId)?.nombre ?? '';
  }

  get totalNulosGlobal(): number {
    if (this.nulosBlancosPorCargo.length === 0) return this.votosNulos;
    return this.nulosBlancosPorCargo.reduce((s, f) => s + (f.nulos || 0), 0);
  }

  get totalBlancosGlobal(): number {
    if (this.nulosBlancosPorCargo.length === 0) return this.votosBlanco;
    return this.nulosBlancosPorCargo.reduce((s, f) => s + (f.blancos || 0), 0);
  }

  incrementarNulos(): void {
    this.nulosCargoSel = this.nulosCargoSel + 1;
  }

  decrementarNulos(): void {
    if (this.nulosCargoSel > 0) this.nulosCargoSel = this.nulosCargoSel - 1;
  }

  incrementarBlanco(): void {
    this.blancosCargoSel = this.blancosCargoSel + 1;
  }

  decrementarBlanco(): void {
    if (this.blancosCargoSel > 0) this.blancosCargoSel = this.blancosCargoSel - 1;
  }

  private actualizarFilaCargo(campo: 'nulos' | 'blancos', valor: number): void {
    if (this.cargoNuloId == null) return;
    const idx = this.nulosBlancosPorCargo.findIndex(f => f.cargoId === this.cargoNuloId);
    if (idx < 0) return;
    const actualizadas = [...this.nulosBlancosPorCargo];
    actualizadas[idx] = { ...actualizadas[idx], [campo]: valor };
    this.nulosBlancosPorCargo = actualizadas;
    this.programarGuardadoNuloBlanco(campo === 'nulos' ? 'NULO' : 'BLANCO');
  }

  private programarGuardadoNuloBlanco(tipo: 'NULO' | 'BLANCO'): void {
    if (this.nulosBlancoTimeouts[tipo]) clearTimeout(this.nulosBlancoTimeouts[tipo]);
    this.nulosBlancoTimeouts[tipo] = setTimeout(() => this.guardarNuloBlanco(tipo), 400);
  }

  guardarNuloBlanco(tipo: 'NULO' | 'BLANCO'): void {
    if (!this.mesaActual || this.cargoNuloId == null) return;
    const fila = this.nulosBlancosPorCargo.find(f => f.cargoId === this.cargoNuloId);
    if (!fila) return;
    const cantidad = tipo === 'NULO' ? (fila.nulos || 0) : (fila.blancos || 0);
    this.api.actualizarNuloBlanco(this.mesaActual.id, this.cargoNuloId, tipo, cantidad).subscribe({
      next: (m) => {
        if (this.mesaActual) {
          this.mesaActual.votosNulos = m.votosNulos;
          this.mesaActual.votosBlanco = m.votosBlanco;
          this.votosNulos = m.votosNulos ?? 0;
          this.votosBlanco = m.votosBlanco ?? 0;
        }
      },
      error: (err) => {
        this.errorMensaje = err?.error?.message || 'No se pudo guardar el registro de nulos/blancos';
      }
    });
  }

  siglaDe(partidoNombre?: string | null): string {
    if (!partidoNombre) return '—';
    const partido = this.partidos.find(p => p.nombre === partidoNombre);
    if (partido?.sigla) return partido.sigla;
    const iniciales = partidoNombre.split(/\s+/).filter(Boolean)
      .map(palabra => palabra[0]).join('').substring(0, 4).toUpperCase();
    return iniciales || partidoNombre;
  }

  registrarVoto(): void {
    if (!this.mesaActual || !this.candidatoSeleccionado || this.mesaActual.cerrada) return;
    const cant = Number(this.cantidadVotos);
    if (!Number.isInteger(cant) || cant < 1) {
      this.errorMensaje = 'La cantidad de votos debe ser al menos 1';
      return;
    }

    this.errorMensaje = '';
    this.animando = true;
    const existingVoto = this.votosRegistrados.find(v => v.candidatoId === this.candidatoSeleccionado!.id);
    const onError = (err: any) => {
      this.animando = false;
      this.errorMensaje = err?.error?.message || 'No se pudo registrar el voto';
    };

    if (existingVoto) {
      this.api.actualizarVoto(existingVoto.id, {
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe({
        next: () => {
          this.loadVotos();
          this.cantidadVotos = 1;
          this.animando = false;
        },
        error: onError
      });
    } else {
      this.api.registrarVoto({
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe({
        next: () => {
          this.loadVotos();
          this.cantidadVotos = 1;
          this.animando = false;
        },
        error: onError
      });
    }
  }

  eliminarVoto(id: number): void {
    this.deleteVotoId = id;
    this.deletePassword = '';
    this.deleteError = '';
    this.deleteCargando = false;
    this.showDeleteConfirm = true;
  }

  cancelarDeleteVoto(): void {
    this.showDeleteConfirm = false;
    this.deleteVotoId = null;
    this.deletePassword = '';
    this.deleteError = '';
  }

  toggleVotosPanel(): void {
    this.showVotosPanel = !this.showVotosPanel;
  }

  toggleSelector(): void {
    this.selectorColapsado = !this.selectorColapsado;
  }

  ejecutarDeleteVoto(): void {
    if (!this.deleteVotoId || !this.deletePassword) {
      this.deleteError = 'Ingrese su contraseña';
      return;
    }
    this.deleteCargando = true;
    this.deleteError = '';
    this.api.verifyPassword(this.deletePassword).subscribe({
      next: (res) => {
        if (!res.valid) {
          this.deleteError = 'Contraseña incorrecta';
          this.deleteCargando = false;
          return;
        }
        this.api.deleteVoto(this.deleteVotoId!).subscribe(() => {
          this.cancelarDeleteVoto();
          this.loadVotos();
        });
      },
      error: () => {
        this.deleteError = 'Error al verificar la contraseña';
        this.deleteCargando = false;
      }
    });
  }

  imprimirActa(): void {
    if (this.mesaActual) {
      this.api.exportActaMesaPdf(this.mesaActual.id);
    }
  }

  cerrarMesa(): void {
    if (!this.mesaActual || this.mesaActual.cerrada) return;
    const mesaId = this.mesaActual.id;
    // Igual que la APK: se exige al menos una foto del acta para cerrar.
    this.liberarFotosActa();
    this.fotoActaError = '';
    this.showFotoActaModal = true;
    this.api.getActaFotos(mesaId).subscribe({
      next: (fotos) => {
        fotos.forEach(f => {
          this.api.getActaFotoBlob(mesaId, f.id).subscribe({
            next: (blob) => {
              this.fotoActaExistentes.push({
                url: URL.createObjectURL(blob),
                nombre: f.nombreArchivo || `Foto ${f.id}`
              });
            },
            error: () => {}
          });
        });
      },
      error: () => {}
    });
  }

  onFotoActaSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fotoActaError = '';
    Array.from(input.files || []).forEach(file => {
      this.fotoActaFiles.push(file);
      this.fotoActaPreviews.push({ url: URL.createObjectURL(file), nombre: file.name });
    });
    input.value = ''; // permite volver a elegir las mismas fotos
  }

  quitarFotoActa(index: number): void {
    URL.revokeObjectURL(this.fotoActaPreviews[index].url);
    this.fotoActaPreviews.splice(index, 1);
    this.fotoActaFiles.splice(index, 1);
  }

  private liberarFotosActa(): void {
    this.fotoActaPreviews.forEach(p => URL.revokeObjectURL(p.url));
    this.fotoActaExistentes.forEach(f => URL.revokeObjectURL(f.url));
    this.fotoActaPreviews = [];
    this.fotoActaExistentes = [];
    this.fotoActaFiles = [];
  }

  cerrarFotoActaModal(): void {
    if (this.fotoActaSubiendo) return;
    this.showFotoActaModal = false;
    this.liberarFotosActa();
    this.fotoActaError = '';
  }

  confirmarCerrarConFoto(): void {
    if (!this.mesaActual) return;
    const mesaId = this.mesaActual.id;
    if (this.fotoActaFiles.length + this.fotoActaExistentes.length === 0) {
      this.fotoActaError = 'Debe registrar al menos una foto del acta';
      return;
    }
    this.fotoActaSubiendo = true;
    this.fotoActaError = '';
    const subirSiguiente = (idx: number): void => {
      if (idx >= this.fotoActaFiles.length) {
        this.fotoActaSubiendo = false;
        this.cerrarMesaBackend(mesaId);
        return;
      }
      this.api.subirActaFoto(mesaId, this.fotoActaFiles[idx]).subscribe({
        next: () => subirSiguiente(idx + 1),
        error: (err) => {
          this.fotoActaSubiendo = false;
          this.fotoActaError = err?.error?.message || 'Error al subir la foto del acta';
        }
      });
    };
    subirSiguiente(0);
  }

  private cerrarMesaBackend(mesaId: number): void {
    if (!confirm('¿Está seguro de cerrar el acta? Una vez cerrada no podrá modificar los votos.')) return;
    this.api.cerrarMesa(mesaId).subscribe({
      next: () => {
        if (this.mesaActual && this.mesaActual.id === mesaId) this.mesaActual.cerrada = true;
        this.cerrarFotoActaModal();
      },
      error: (err) => {
        // p.ej. 400 "Debe subir la foto del acta antes de cerrar la mesa"
        this.fotoActaError = err.error?.message || 'Error al cerrar la mesa';
      }
    });
  }

  /** "Votar" abre el formulario en la fila; "Ver" solo consulta los candidatos. */
  seleccionarLista(lista: ListaElectoral): void {
    this.listaSeleccionada = lista;
    this.cantidadLista = this.votosRegistrados.find(v => v.listaId === lista.id)?.cantidadVotos ?? 1;
    setTimeout(() => this.cantidadListaInput?.nativeElement?.focus(), 100);
  }

  cancelarSeleccionLista(): void {
    this.listaSeleccionada = null;
    this.cantidadLista = 1;
  }

  abrirListaModal(lista: ListaElectoral): void {
    this.listaLlamada = lista;
    this.showListaModal = true;
    if (!lista.candidatos || lista.candidatos.length === 0) {
      this.api.getListaDetalle(lista.id).subscribe((detalle: any) => {
        if (this.listaLlamada?.id === lista.id) {
          this.listaLlamada = { ...lista, candidatos: detalle.candidatos || [] };
        }
      });
    }
  }

  decrementarCantidadLista(): void {
    if (this.cantidadLista > 1) this.cantidadLista--;
  }

  incrementarCantidadLista(): void {
    this.cantidadLista++;
  }

  cerrarListaModal(): void {
    this.showListaModal = false;
    this.listaLlamada = null;
  }

  registrarVotoLista(): void {
    if (!this.mesaActual || !this.listaSeleccionada || this.mesaActual.cerrada) return;
    const cant = Number(this.cantidadLista);
    if (!Number.isInteger(cant) || cant < 1) {
      this.errorMensaje = 'La cantidad de votos debe ser al menos 1';
      return;
    }
    this.errorMensaje = '';
    const existingVoto = this.votosRegistrados.find(v => v.listaId === this.listaSeleccionada!.id);
    const onError = (err: any) => {
      this.errorMensaje = err?.error?.message || 'No se pudo registrar el voto a la lista';
    };
    const onSuccess = () => {
      this.cancelarSeleccionLista();
      this.loadVotos();
    };
    if (existingVoto) {
      this.api.actualizarVoto(existingVoto.id, {
        listaId: this.listaSeleccionada.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe({ next: onSuccess, error: onError });
    } else {
      this.api.registrarVoto({
        listaId: this.listaSeleccionada.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe({ next: onSuccess, error: onError });
    }
  }

  getEstadoMesaClass(): string {
    if (!this.mesaActual) return '';
    return this.mesaActual.cerrada ? 'estado-cerrada' : 'estado-abierta';
  }

  getEstadoMesaText(): string {
    if (!this.mesaActual) return '';
    return this.mesaActual.cerrada ? 'CERRADA' : 'ABIERTA';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
