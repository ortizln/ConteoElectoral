import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { Eleccion, Candidato, Mesa, Voto, Partido, Cargo, ListaElectoral } from '../../../core/models';

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
  private nulosTimeout: any = null;
  private blancoTimeout: any = null;

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
    this.loadVotos();
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
        case 'candidato': return dir * (a.candidatoNombre + a.candidatoApellido).localeCompare(b.candidatoNombre + b.candidatoApellido);
        case 'partido': return dir * a.partidoNombre.localeCompare(b.partidoNombre);
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

  incrementarNulos(): void {
    this.votosNulos = (this.votosNulos || 0) + 1;
    this.guardarVotosNulos();
  }

  decrementarNulos(): void {
    if ((this.votosNulos || 0) > 0) {
      this.votosNulos = this.votosNulos - 1;
      this.guardarVotosNulos();
    }
  }

  incrementarBlanco(): void {
    this.votosBlanco = (this.votosBlanco || 0) + 1;
    this.guardarVotosBlanco();
  }

  decrementarBlanco(): void {
    if ((this.votosBlanco || 0) > 0) {
      this.votosBlanco = this.votosBlanco - 1;
      this.guardarVotosBlanco();
    }
  }

  guardarVotosBlanco(): void {
    if (!this.mesaActual) return;
    if (this.blancoTimeout) clearTimeout(this.blancoTimeout);
    this.blancoTimeout = setTimeout(() => {
      this.api.actualizarVotosBlanco(this.mesaActual!.id, this.votosBlanco || 0).subscribe({
        next: (m) => { this.mesaActual!.votosBlanco = m.votosBlanco; },
        error: () => {}
      });
    }, 400);
  }

  guardarVotosNulos(): void {
    if (!this.mesaActual) return;
    if (this.nulosTimeout) clearTimeout(this.nulosTimeout);
    this.nulosTimeout = setTimeout(() => {
      this.api.actualizarVotosNulos(this.mesaActual!.id, this.votosNulos || 0).subscribe({
        next: (m) => { this.mesaActual!.votosNulos = m.votosNulos; },
        error: () => {}
      });
    }, 400);
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
