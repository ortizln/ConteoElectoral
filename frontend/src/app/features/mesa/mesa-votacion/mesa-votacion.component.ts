import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Eleccion, Candidato, Mesa, Voto, Partido, Cargo } from '../../../core/models';

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
export class MesaVotacionComponent implements OnInit {
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

  private colors: string[] = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#e11d48'];

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((elecciones: Eleccion[]) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        const eleccion = elecciones[0];
        this.loadData(eleccion.id);
      }
    });
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
    let filtrados = [...this.candidatosAux];
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
    if (!confirm('¿Está seguro de eliminar este registro?')) return;
    this.api.deleteVoto(id).subscribe(() => this.loadVotos());
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
