import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-mesa-votacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa-votacion.component.html',
  styleUrl: './mesa-votacion.component.css'
})
export class MesaVotacionComponent implements OnInit, OnDestroy {
  @ViewChild('cantidadInput') cantidadInput!: ElementRef<HTMLInputElement>;

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
  private wsSubscription: Subscription | null = null;
  private eleccionId: number | null = null;

  // List voting
  listas: ListaElectoral[] = [];
  listasFiltradas: (ListaElectoral & { colorPartido?: string })[] = [];
  showListaModal = false;
  listaLlamada: ListaElectoral | null = null;
  cantidadLista = 1;
  cargosConLista: Cargo[] = [];
  mostrarListas = false;

  // Delete vote confirmation
  showDeleteConfirm = false;
  deleteVotoId: number | null = null;
  deletePassword = '';
  deleteError = '';
  deleteCargando = false;

  // Votos registrados drawer (mobile)
  showVotosPanel = false;

  // Selector de mesa colapsable
  selectorColapsado = false;

  private colors: string[] = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#e11d48'];

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private wsService: WebSocketService
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
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
    this.votosNulos = mesa.votosNulos ?? 0;
    this.votosBlanco = mesa.votosBlanco ?? 0;
    this.nulosBlancosPorCargo = [];
    this.cargoNuloId = null;
    this.cargarNulosBlancosPorCargo(mesa);
    this.loadVotos();
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
        this.cargoNuloId = cargoDefault;
      },
      error: () => {
        this.nulosBlancosPorCargo = [];
        this.cargoNuloId = this.cargoDefaultId([]);
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

  aplicarFiltro(): void {
    const cargo = this.cargos.find(c => c.id === this.filtroCargoId);
    this.mostrarListas = cargo?.tipoVotacion === 'LISTA';

    if (this.mostrarListas) {
      this.candidatoSeleccionado = null;
      let filtradas = [...this.listas];
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
    // Excluir candidatos que pertenecen a una lista (votan por lista, no individual)
    filtrados = filtrados.filter(c => !c.listaId);
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
    if (this.filtroCargoId) {
      filtrados = filtrados.filter(c => c.cargoId === this.filtroCargoId);
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
      error: () => {}
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

    this.animando = true;
    const existingVoto = this.votosRegistrados.find(v => v.candidatoId === this.candidatoSeleccionado!.id);
    const cant = this.cantidadVotos || 1;

    if (existingVoto) {
      this.api.actualizarVoto(existingVoto.id, {
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: existingVoto.cantidadVotos + cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe(() => {
        this.loadVotos();
        this.cantidadVotos = 1;
        this.animando = false;
      });
    } else {
      this.api.registrarVoto({
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe(() => {
        this.loadVotos();
        this.cantidadVotos = 1;
        this.animando = false;
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
    if (!this.mesaActual) return;
    if (!confirm('¿Está seguro de cerrar el acta? Una vez cerrada no podrá modificar los votos.')) return;
    this.api.cerrarMesa(this.mesaActual.id).subscribe(() => {
      this.mesaActual!.cerrada = true;
    });
  }

  abrirListaModal(lista: ListaElectoral): void {
    this.listaLlamada = lista;
    this.cantidadLista = 1;
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
    this.cantidadLista = 1;
  }

  votarLista(): void {
    if (!this.mesaActual || !this.listaLlamada || this.mesaActual.cerrada) return;
    const cant = this.cantidadLista || 1;
    this.api.registrarVoto({
      listaId: this.listaLlamada.id,
      mesaId: this.mesaActual.id,
      cantidadVotos: cant,
      eleccionesId: this.mesaActual.eleccionesId
    }).subscribe(() => {
      this.cerrarListaModal();
      this.loadVotos();
    });
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
