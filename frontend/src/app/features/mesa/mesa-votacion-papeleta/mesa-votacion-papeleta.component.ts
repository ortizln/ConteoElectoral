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
  errorMensaje = '';
  observaciones = '';
  private observacionesTimeout: any = null;
  private wsSub!: Subscription;

  // Foto del acta (obligatoria antes de cerrar) — galería como en la APK
  showFotoActaModal = false;
  fotoActaFiles: File[] = [];
  fotoActaPreviews: { url: string; nombre: string }[] = [];
  fotoActaExistentes: { url: string; nombre: string }[] = [];
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
    if (this.observacionesTimeout) clearTimeout(this.observacionesTimeout);
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
    this.errorMensaje = '';
    this.cerrada = mesa.cerrada;
    this.observaciones = mesa.observaciones ?? '';
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
    const opcionId = this.opcionSeleccionada.id;
    const cant = Number(this.cantidadInput);
    this.errorMensaje = '';
    this.api.registrarVotoPapeleta({
      opcionPapeletaId: opcionId,
      mesaId: this.mesaActual.id,
      cantidadVotos: cant
    }).subscribe({
      next: () => {
        // Mantener la opción y la cantidad registrada en el input; antes se
        // limpiaban y el miembro veía el contador en cero tras guardar.
        this.cantidadInput = cant;
        this.loadVotos();
      },
      error: (err) => {
        this.errorMensaje = err?.error?.message || 'No se pudo registrar el voto de la papeleta';
      }
    });
  }

  cerrarMesa() {
    if (!this.mesaActual || this.cerrada) return;
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

  onFotoActaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fotoActaError = '';
    Array.from(input.files || []).forEach(file => {
      this.fotoActaFiles.push(file);
      this.fotoActaPreviews.push({ url: URL.createObjectURL(file), nombre: file.name });
    });
    input.value = '';
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

  cerrarFotoActaModal() {
    if (this.fotoActaSubiendo) return;
    this.showFotoActaModal = false;
    this.liberarFotosActa();
    this.fotoActaError = '';
  }

  confirmarCerrarConFoto() {
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
        this.guardarObservaciones(() => this.cerrarMesaBackend(mesaId));
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

  get observacionesMesa(): string { return this.observaciones; }
  set observacionesMesa(valor: string) {
    this.observaciones = valor ?? '';
    if (this.observacionesTimeout) clearTimeout(this.observacionesTimeout);
    this.observacionesTimeout = setTimeout(() => this.guardarObservaciones(), 500);
  }

  guardarObservaciones(onDone?: () => void): void {
    if (this.observacionesTimeout) {
      clearTimeout(this.observacionesTimeout);
      this.observacionesTimeout = null;
    }
    const continuar = () => onDone?.();
    if (!this.mesaActual || this.cerrada || this.mesaActual.aprobada) {
      continuar();
      return;
    }
    this.api.actualizarObservacionesMesa(this.mesaActual.id, this.observaciones).subscribe({
      next: (m) => {
        this.mesaActual.observaciones = m.observaciones ?? null;
        continuar();
      },
      error: (err) => {
        this.errorMensaje = err?.error?.message || 'No se pudieron guardar las observaciones';
        continuar();
      }
    });
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
