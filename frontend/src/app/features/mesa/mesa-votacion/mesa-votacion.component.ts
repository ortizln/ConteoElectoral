import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Eleccion, Candidato, Mesa, Voto } from '../../../core/models';

@Component({
  selector: 'app-mesa-votacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mesa-container">
      <header class="mesa-header">
        <div>
          <h1>Registro de Votos</h1>
          <p>Mesa: {{ mesaActual?.numero }} - {{ mesaActual?.recintoNombre }}</p>
        </div>
        <div class="header-actions">
          <span class="badge" [class.bg-success]="!mesaActual?.cerrada" [class.bg-danger]="mesaActual?.cerrada">
            {{ mesaActual?.cerrada ? 'CERRADA' : 'ABIERTA' }}
          </span>
          <button class="btn btn-outline-danger" (click)="logout()">Cerrar Sesión</button>
        </div>
      </header>

      <div *ngIf="mesaActual?.cerrada" class="alert alert-warning">
        Esta mesa ha sido cerrada. No se pueden registrar más votos.
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <h3>Registro de Votos</h3>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <label class="form-label">Seleccionar Candidato</label>
            <div class="candidato-grid">
              <div 
                *ngFor="let candidato of candidatos" 
                class="candidato-card"
                [class.selected]="candidatoSeleccionado?.id === candidato.id"
                [class.disabled]="mesaActual?.cerrada"
                (click)="seleccionarCandidato(candidato)"
              >
                <div class="candidato-foto">
                  {{ candidato.nombre.charAt(0) }}{{ candidato.apellido.charAt(0) }}
                </div>
                <div class="candidato-info">
                  <strong>{{ candidato.nombreCompleto }}</strong>
                  <small>{{ candidato.partidoNombre }} - {{ candidato.cargoNombre }}</small>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="candidatoSeleccionado && !mesaActual?.cerrada" class="voto-form">
            <div class="row align-items-end">
              <div class="col-md-6">
                <label class="form-label">Cantidad de Votos</label>
                <input type="number" class="form-control" [(ngModel)]="cantidadVotos" min="1" value="1">
              </div>
              <div class="col-md-2">
                <button class="btn btn-primary w-100" (click)="registrarVoto()">
                  Registrar Votos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3>Votos Registrados</h3>
          <button *ngIf="!mesaActual?.cerrada" class="btn btn-danger" (click)="cerrarMesa()">
            Cerrar Acta
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Partido</th>
              <th class="text-end">Votos</th>
              <th *ngIf="!mesaActual?.cerrada" class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let voto of votosRegistrados">
              <td>{{ voto.candidatoNombre }} {{ voto.candidatoApellido }}</td>
              <td>{{ voto.partidoNombre }}</td>
              <td class="text-end">{{ voto.cantidadVotos }}</td>
              <td *ngIf="!mesaActual?.cerrada" class="text-end">
                <button class="btn btn-sm btn-outline-danger" (click)="eliminarVoto(voto.id)">
                  Eliminar
                </button>
              </td>
            </tr>
            <tr *ngIf="votosRegistrados.length === 0">
              <td colspan="4" class="text-center text-muted">No hay votos registrados</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2">TOTAL</th>
              <th class="text-end">{{ totalVotos }}</th>
              <th *ngIf="!mesaActual?.cerrada"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .mesa-container { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .mesa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .mesa-header h1 { font-size: 24px; font-weight: 600; margin: 0; }
    .header-actions { display: flex; gap: 12px; align-items: center; }
    .candidato-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .candidato-card { display: flex; align-items: center; gap: 12px; padding: 16px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
    .candidato-card:hover { border-color: #3b82f6; }
    .candidato-card.selected { border-color: #3b82f6; background: #eff6ff; }
    .candidato-card.disabled { opacity: 0.6; pointer-events: none; }
    .candidato-foto { width: 48px; height: 48px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; }
    .candidato-info { display: flex; flex-direction: column; }
    .candidato-info small { color: #64748b; }
    .voto-form { padding: 20px; background: #f8fafc; border-radius: 12px; margin-top: 20px; }
    .card-header h3 { margin: 0; font-size: 18px; font-weight: 600; }
  `]
})
export class MesaVotacionComponent implements OnInit {
  elecciones: Eleccion[] = [];
  candidatos: Candidato[] = [];
  mesaActual: Mesa | null = null;
  votosRegistrados: Voto[] = [];
  candidatoSeleccionado: Candidato | null = null;
  cantidadVotos = 1;
  totalVotos = 0;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((elecciones: Eleccion[]) => {
      if (elecciones.length > 0) {
        const eleccion = elecciones[0];
        this.loadData(eleccion.id);
      }
    });
  }

  loadData(eleccionId: number): void {
    this.api.getCandidatosByEleccion(eleccionId).subscribe((data: Candidato[]) => {
      this.candidatos = data;
    });

    const user = this.authService.getCurrentUser();
    this.api.getMesasByEleccion(eleccionId).subscribe((mesas: Mesa[]) => {
      this.mesaActual = mesas.find((m: Mesa) => m.usuarioId === user?.id) || null;
      if (this.mesaActual) {
        this.loadVotos();
      }
    });
  }

  loadVotos(): void {
    if (!this.mesaActual) return;
    
    this.api.getVotosByMesa(this.mesaActual.id).subscribe((votos: Voto[]) => {
      this.votosRegistrados = votos;
      this.totalVotos = votos.reduce((sum: number, v: Voto) => sum + v.cantidadVotos, 0);
    });
  }

  seleccionarCandidato(candidato: Candidato): void {
    this.candidatoSeleccionado = candidato;
  }

  registrarVoto(): void {
    if (!this.mesaActual || !this.candidatoSeleccionado) return;

    const existingVoto = this.votosRegistrados.find(v => v.candidatoId === this.candidatoSeleccionado!.id);
    
    if (existingVoto) {
      this.api.actualizarVoto(existingVoto.id, {
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: existingVoto.cantidadVotos + this.cantidadVotos,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe(() => {
        this.loadVotos();
        this.cantidadVotos = 1;
      });
    } else {
      this.api.registrarVoto({
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: this.cantidadVotos,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe(() => {
        this.loadVotos();
        this.cantidadVotos = 1;
      });
    }
  }

  eliminarVoto(id: number): void {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.api.actualizarVoto(id, {
        candidatoId: 0,
        mesaId: 0,
        cantidadVotos: 0,
        eleccionesId: 0
      } as any).subscribe(() => this.loadVotos());
    }
  }

  cerrarMesa(): void {
    if (!this.mesaActual) return;
    
    if (confirm('¿Está seguro de cerrar el acta? Una vez cerrada no podrá modificar los votos.')) {
      this.api.cerrarMesa(this.mesaActual.id).subscribe(() => {
        this.mesaActual!.cerrada = true;
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}