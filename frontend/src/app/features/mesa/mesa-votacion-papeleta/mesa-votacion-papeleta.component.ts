import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { Subscription } from 'rxjs';

interface VotoPapeletaReg {
  opcionPapeletaId: number;
  papeletaTitulo: string;
  opcionEtiqueta: string;
  cantidadVotos: number;
}

@Component({
  selector: 'app-mesa-votacion-papeleta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesa-votacion-papeleta.component.html',
  styleUrl: './mesa-votacion-papeleta.component.css'
})
export class MesaVotacionPapeletaComponent implements OnInit, OnDestroy {
  elecciones: any[] = [];
  mesaActual: any = null;
  mesasDisponibles: any[] = [];
  papeletas: any[] = [];
  papeletaActual: any = null;
  opcionSeleccionada: any = null;
  cantidadInput = 0;
  votosRegistrados: VotoPapeletaReg[] = [];
  totalVotos = 0;
  cerrada = false;
  private wsSub!: Subscription;

  // Foto del acta (obligatoria antes de cerrar)
  showFotoActaModal = false;
  fotoActaFile: File | null = null;
  fotoActaPreview: string | null = null;
  fotoActaExistenteUrl: string | null = null;
  fotoActaSubiendo = false;
  fotoActaError = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private ws: WebSocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getEleccionesActivas().subscribe(data => {
      this.elecciones = data;
      if (this.elecciones.length > 0) this.loadMesas();
    });
  }

  ngOnDestroy() {
    if (this.wsSub) this.wsSub.unsubscribe();
  }

  loadMesas() {
    this.api.getMesasByCurrentUser(this.elecciones[0]?.id!).subscribe(data => {
      this.mesasDisponibles = data;
      if (this.mesasDisponibles.length === 1) {
        this.seleccionarMesa(this.mesasDisponibles[0]);
      }
    });
  }

  seleccionarMesa(mesa: any) {
    this.mesaActual = mesa;
    this.cerrada = mesa.cerrada;
    this.loadPapeletas();
    this.loadVotos();
    this.suscribirWS();
  }

  suscribirWS() {
    if (this.wsSub) this.wsSub.unsubscribe();
    const eleccionId = this.elecciones[0]?.id;
    if (!eleccionId) return;
    this.wsSub = this.ws.subscribeToMesaEstado(eleccionId).subscribe(msg => {
      if (msg.mesaId === this.mesaActual?.id) {
        this.cerrada = msg.cerrada;
        if (this.mesaActual) this.mesaActual.cerrada = msg.cerrada;
      }
    });
  }

  loadPapeletas() {
    if (!this.mesaActual) return;
    this.api.getPapeletasByEleccion(this.mesaActual.eleccionesId || this.mesaActual.eleccionId).subscribe(data => {
      this.papeletas = data;
      if (this.papeletas.length > 0) this.seleccionarPapeleta(this.papeletas[0]);
    });
  }

  seleccionarPapeleta(p: any) {
    this.papeletaActual = p;
    this.opcionSeleccionada = null;
    this.cantidadInput = 0;
  }

  loadVotos() {
    if (!this.mesaActual) return;
    this.api.getVotosPapeletaByMesa(this.mesaActual.id).subscribe(data => {
      this.votosRegistrados = data.map((v: any) => ({
        opcionPapeletaId: v.opcionPapeletaId,
        papeletaTitulo: this.findPapeletaTitulo(v.opcionPapeletaId),
        opcionEtiqueta: v.opcionEtiqueta,
        cantidadVotos: v.cantidadVotos
      }));
      this.totalVotos = this.votosRegistrados.reduce((s, v) => s + v.cantidadVotos, 0);
    });
  }

  findPapeletaTitulo(opcionPapeletaId: number): string {
    for (const p of this.papeletas) {
      if (p.opciones?.some((o: any) => o.id === opcionPapeletaId)) return p.titulo;
    }
    return '';
  }

  seleccionarOpcion(op: any) {
    if (this.cerrada) return;
    this.opcionSeleccionada = op;
    this.cantidadInput = 0;
  }

  getOptionIcon(tipo: string): string {
    switch (tipo) {
      case 'CANDIDATO': return 'bi-person-badge';
      case 'PARTIDO': return 'bi-people';
      case 'LISTA': return 'bi-list-ul';
      case 'NULO': return 'bi-x-circle';
      case 'BLANCO': return 'bi-square';
      default: return 'bi-question-circle';
    }
  }

  registrarVoto() {
    if (!this.opcionSeleccionada || this.cantidadInput <= 0 || this.cerrada) return;
    const existing = this.votosRegistrados.find(v => v.opcionPapeletaId === this.opcionSeleccionada.id);
    if (existing) {
      existing.cantidadVotos = this.cantidadInput;
    } else {
      this.votosRegistrados.push({
        opcionPapeletaId: this.opcionSeleccionada.id,
        papeletaTitulo: this.papeletaActual?.titulo || '',
        opcionEtiqueta: this.opcionSeleccionada.etiqueta,
        cantidadVotos: this.cantidadInput
      });
    }
    this.totalVotos = this.votosRegistrados.reduce((s, v) => s + v.cantidadVotos, 0);
    this.api.registrarVotoPapeleta({
      opcionPapeletaId: this.opcionSeleccionada.id,
      mesaId: this.mesaActual.id,
      cantidadVotos: this.cantidadInput
    }).subscribe();
    this.opcionSeleccionada = null;
    this.cantidadInput = 0;
  }

  cerrarMesa() {
    if (!this.mesaActual || this.cerrada) return;
    // Obligatorio: foto del acta antes de cerrar (modal con subida)
    this.fotoActaFile = null;
    this.fotoActaPreview = null;
    this.fotoActaError = '';
    this.fotoActaExistenteUrl = null;
    this.showFotoActaModal = true;
    this.api.getActaFotos(this.mesaActual.id).subscribe({
      next: (fotos) => {
        if (fotos.length > 0 && this.mesaActual) {
          this.api.getActaFotoBlob(this.mesaActual.id, fotos[0].id).subscribe({
            next: (blob) => { this.fotoActaExistenteUrl = URL.createObjectURL(blob); },
            error: () => {}
          });
        }
      },
      error: () => {}
    });
  }

  onFotoActaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.fotoActaFile = file;
    this.fotoActaError = '';
    if (this.fotoActaPreview) URL.revokeObjectURL(this.fotoActaPreview);
    this.fotoActaPreview = file ? URL.createObjectURL(file) : null;
  }

  cerrarFotoActaModal() {
    if (this.fotoActaSubiendo) return;
    this.showFotoActaModal = false;
    if (this.fotoActaPreview) { URL.revokeObjectURL(this.fotoActaPreview); this.fotoActaPreview = null; }
    this.fotoActaFile = null;
    this.fotoActaError = '';
  }

  confirmarCerrarConFoto() {
    if (!this.mesaActual) return;
    const mesaId = this.mesaActual.id;
    if (this.fotoActaFile) {
      this.fotoActaSubiendo = true;
      this.fotoActaError = '';
      this.api.subirActaFoto(mesaId, this.fotoActaFile).subscribe({
        next: () => { this.fotoActaSubiendo = false; this.cerrarMesaBackend(mesaId); },
        error: (err) => {
          this.fotoActaSubiendo = false;
          this.fotoActaError = err.error?.message || 'Error al subir la foto del acta';
        }
      });
    } else if (this.fotoActaExistenteUrl) {
      this.cerrarMesaBackend(mesaId);
    } else {
      this.fotoActaError = 'Debe seleccionar la foto del acta';
    }
  }

  private cerrarMesaBackend(mesaId: number) {
    if (!confirm('¿Cerrar mesa? No podrá modificar los votos después.')) return;
    this.api.cerrarMesa(mesaId).subscribe({
      next: () => {
        this.cerrada = true;
        if (this.mesaActual && this.mesaActual.id === mesaId) this.mesaActual.cerrada = true;
        this.cerrarFotoActaModal();
      },
      error: (err) => {
        this.fotoActaError = err.error?.message || 'Error al cerrar la mesa';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getPartidoSigla(op: any): string {
    if (op.tipoOpcion === 'LISTA') return 'Lista ' + (op.numeroLista || '');
    return op.partidoSigla || '';
  }
}
