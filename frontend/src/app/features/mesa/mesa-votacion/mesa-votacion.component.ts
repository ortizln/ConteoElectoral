import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Eleccion, Candidato, Mesa, Voto, Partido, Cargo } from '../../../core/models';

@Component({
  selector: 'app-mesa-votacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mesa-container">
      <header class="mesa-header">
        <div>
          <h1>Registro de Votos</h1>
          <p>Mesa: {{ mesaActual?.numero }} - {{ mesaActual?.institucionNombre }}</p>
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
          <div class="filtros-candidatos mb-4">
            <div class="row g-3">
              <div class="col-md-4">
                <input type="text" class="form-control" [(ngModel)]="filtroTexto" (input)="aplicarFiltro()" placeholder="Buscar candidato...">
              </div>
              <div class="col-md-3">
                <select class="form-select" [(ngModel)]="filtroPartidoId" (change)="aplicarFiltro()">
                  <option [ngValue]="null">Todos los Partidos</option>
                  <option *ngFor="let p of partidos" [ngValue]="p.id">{{ p.nombre }}</option>
                </select>
              </div>
              <div class="col-md-3">
                <select class="form-select" [(ngModel)]="filtroCargoId" (change)="aplicarFiltro()">
                  <option [ngValue]="null">Todos los Cargos</option>
                  <option *ngFor="let c of cargos" [ngValue]="c.id">{{ c.nombre }}</option>
                </select>
              </div>
              <div class="col-md-2">
                <button class="btn btn-outline-secondary w-100" (click)="limpiarFiltro()">Limpiar</button>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover candidato-table">
              <thead>
                <tr>
                  <th style="width: 50px">#</th>
                  <th>Candidato</th>
                  <th>Partido</th>
                  <th>Cargo</th>
                  <th class="text-end" style="width: 150px">Votos</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let candidato of candidatosFiltrados; let i = index" 
                    [class.selected-row]="candidatoSeleccionado?.id === candidato.id"
                    [class.disabled]="mesaActual?.cerrada">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <div class="candidato-nombre">
                      <strong>{{ candidato.nombre }} {{ candidato.apellido }}</strong>
                    </div>
                  </td>
                  <td>
                    <span class="badge" [style.backgroundColor]="candidato.colorPartido">
                      {{ candidato.partidoNombre }}
                    </span>
                  </td>
                  <td>{{ candidato.cargoNombre }}</td>
                  <td class="text-end">
                    <div *ngIf="candidatoSeleccionado?.id === candidato.id && !mesaActual?.cerrada" class="input-voto">
                      <input type="number" class="form-control form-control-sm text-end" 
                             #cantidadInput [(ngModel)]="cantidadVotos" min="1" 
                             (keyup.enter)="registrarVoto()">
                      <button class="btn btn-primary btn-sm mt-1 w-100" (click)="registrarVoto()">Registrar</button>
                    </div>
                    <div *ngIf="candidatoSeleccionado?.id !== candidato.id">
                      <button class="btn btn-outline-primary btn-sm" (click)="seleccionarCandidato(candidato)">
                        Seleccionar
                      </button>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="candidatosFiltrados.length === 0">
                  <td colspan="5" class="text-center text-muted">No hay candidatos que coincidan con los filtros</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3>Votos Registrados</h3>
          <div class="d-flex gap-2">
            <select class="form-select form-select-sm" [(ngModel)]="ordenarPor" (change)="ordenarVotos()" style="width: 150px;">
              <option value="candidato">Por Candidato</option>
              <option value="partido">Por Partido</option>
              <option value="votos">Por Votos</option>
            </select>
            <button class="btn btn-outline-secondary btn-sm" (click)="ordenarAscendente = !ordenarAscendente; ordenarVotos()">
              {{ ordenarAscendente ? '↑ Asc' : '↓ Desc' }}
            </button>
          </div>
          <button *ngIf="!mesaActual?.cerrada" class="btn btn-danger" (click)="cerrarMesa()">
            Cerrar Acta
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th class="sortable" (click)="ordenarPor = 'candidato'; ordenarVotos()">Candidato</th>
              <th class="sortable" (click)="ordenarPor = 'partido'; ordenarVotos()">Partido</th>
              <th class="sortable text-end" (click)="ordenarPor = 'votos'; ordenarVotos()">Votos</th>
              <th *ngIf="!mesaActual?.cerrada" class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let voto of votosRegistrados; let i = index">
              <td><strong>{{ i + 1 }}.</strong> {{ voto.candidatoNombre }} {{ voto.candidatoApellido }}</td>
              <td>{{ voto.partidoNombre }}</td>
              <td class="text-end"><strong>{{ voto.cantidadVotos }}</strong></td>
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
    .form-control-lg { font-size: 1.5rem; text-align: center; }
    .btn-lg { padding: 12px 24px; font-size: 1.1rem; }
    .quick-votes { margin-top: 12px; }
    .quick-buttons { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
    .quick-buttons .btn { min-width: 60px; }
    .card-header h3 { margin: 0; font-size: 18px; font-weight: 600; }
    .filtros-candidatos { padding: 16px; background: #f8fafc; border-radius: 8px; }
    .candidato-table th { background: #f8fafc; font-weight: 600; }
    .candidato-table .selected-row { background: #eff6ff; }
    .candidato-table .disabled { opacity: 0.5; }
    .input-voto { max-width: 120px; margin-left: auto; }
    .sortable { cursor: pointer; user-select: none; }
    .sortable:hover { background: #e2e8f0; }
  `]
})
export class MesaVotacionComponent implements OnInit {
  @ViewChild('cantidadInput') cantidadInput!: ElementRef<HTMLInputElement>;
  
  elecciones: Eleccion[] = [];
  candidatos: Candidato[] = [];
  candidatosFiltrados: (Candidato & { colorPartido: string })[] = [];
  candidatosAux: Candidato[] = [];
  mesaActual: Mesa | null = null;
  votosRegistrados: Voto[] = [];
  candidatoSeleccionado: Candidato | null = null;
  cantidadVotos = 1;
  totalVotos = 0;
  
  filtroTexto = '';
  filtroPartidoId: number | null = null;
  filtroCargoId: number | null = null;
  partidos: Partido[] = [];
  cargos: Cargo[] = [];
  
  ordenarPor: 'candidato' | 'partido' | 'votos' = 'votos';
  ordenarAscendente = false;
  
  private colors: string[] = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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
      this.candidatosAux = data;
      this.aplicarFiltro();
    });

    this.api.getPartidosByEleccion(eleccionId).subscribe((data: Partido[]) => {
      this.partidos = data;
    });
    
    this.api.getCargosByEleccion(eleccionId).subscribe((data: Cargo[]) => {
      this.cargos = data;
    });

    const user = this.authService.getCurrentUser();
    this.api.getMesasByEleccion(eleccionId).subscribe((mesas: Mesa[]) => {
      this.mesaActual = mesas.find((m: Mesa) => m.usuarioId === user?.id) || null;
      if (this.mesaActual) {
        this.loadVotos();
      }
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
    
    this.candidatosFiltrados = filtrados.map((c, i) => ({
      ...c,
      colorPartido: this.getColorPartido(c.partidoNombre, i)
    }));
  }

  limpiarFiltro(): void {
    this.filtroTexto = '';
    this.filtroPartidoId = null;
    this.filtroCargoId = null;
    this.aplicarFiltro();
  }

  getColorPartido(partidoNombre: string, index: number): string {
    return this.colors[index % this.colors.length];
  }

  loadVotos(): void {
    if (!this.mesaActual) return;
    
    this.api.getVotosByMesa(this.mesaActual.id).subscribe((votos: Voto[]) => {
      this.votosRegistrados = votos;
      this.totalVotos = votos.reduce((sum: number, v: Voto) => sum + v.cantidadVotos, 0);
      this.ordenarVotos();
    });
  }

  ordenarVotos(): void {
    const dir = this.ordenarAscendente ? 1 : -1;
    this.votosRegistrados = [...this.votosRegistrados].sort((a, b) => {
      switch (this.ordenarPor) {
        case 'candidato':
          return dir * (a.candidatoNombre + a.candidatoApellido).localeCompare(b.candidatoNombre + b.candidatoApellido);
        case 'partido':
          return dir * a.partidoNombre.localeCompare(b.partidoNombre);
        case 'votos':
          return dir * (b.cantidadVotos - a.cantidadVotos);
      }
    });
  }

  seleccionarCandidato(candidato: Candidato): void {
    this.candidatoSeleccionado = candidato;
    setTimeout(() => {
      this.cantidadInput?.nativeElement?.focus();
    }, 100);
  }

  setCantidad(cantidad: number): void {
    this.cantidadVotos = cantidad;
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