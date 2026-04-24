import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Candidato, Partido, Cargo } from '../../../../core/models';

@Component({
  selector: 'app-candidatos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestión de Candidatos</h1>
        <button class="btn btn-primary" (click)="openModal()">+ Nuevo Candidato</button>
      </div>
      <div class="card">
        <table class="table table-hover">
          <thead><tr><th>Nombre</th><th>Partido</th><th>Cargo</th><th>Acciones</th></tr></thead>
          <tbody>
            <tr *ngFor="let c of candidatos">
              <td><strong>{{ c.nombreCompleto }}</strong></td>
              <td>{{ c.partidoNombre }}</td>
              <td>{{ c.cargoNombre }}</td>
              <td><button class="btn btn-sm btn-outline-danger">Eliminar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header"><h3>Nuevo Candidato</h3><button class="btn-close" (click)="closeModal()">×</button></div>
          <div class="modal-body">
            <div class="form-group"><label>Nombre</label><input type="text" class="form-control" [(ngModel)]="form.nombre"></div>
            <div class="form-group"><label>Apellido</label><input type="text" class="form-control" [(ngModel)]="form.apellido"></div>
            <div class="form-group">
              <label>Partido</label>
              <select class="form-select" [(ngModel)]="form.partidoId">
                <option [value]="null">Independiente</option>
                <option *ngFor="let p of partidos" [value]="p.id">{{ p.nombre }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Cargo</label>
              <select class="form-select" [(ngModel)]="form.cargoId">
                <option *ngFor="let c of cargos" [value]="c.id">{{ c.nombre }}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
            <button class="btn btn-primary" (click)="save()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.page-container { max-width: 1000px; margin: 0 auto; } .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; } .page-header h1 { font-size: 24px; font-weight: 600; margin: 0; } .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; } .modal-content { background: white; border-radius: 12px; width: 100%; max-width: 400px; } .modal-header { display: flex; justify-content: space-between; padding: 20px; border-bottom: 1px solid #e2e8f0; } .modal-body { padding: 20px; } .modal-footer { padding: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; } .form-group { margin-bottom: 16px; } .form-group label { display: block; margin-bottom: 6px; font-weight: 500; }`]
})
export class CandidatosComponent implements OnInit {
  candidatos: Candidato[] = [];
  elecciones: Eleccion[] = [];
  partidos: Partido[] = [];
  cargos: Cargo[] = [];
  showModal = false;
  form: any = { nombre: '', apellido: '', partidoId: null, cargoId: null, eleccionesId: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.form.eleccionesId = e[0].id;
        this.load(e[0].id);
      }
    });
  }

  load(eleccionId: number): void {
    this.api.getCandidatosByEleccion(eleccionId).subscribe((d: Candidato[]) => this.candidatos = d);
    this.api.getPartidosByEleccion(eleccionId).subscribe((d: Partido[]) => this.partidos = d);
    this.api.getCargosByEleccion(eleccionId).subscribe((d: Cargo[]) => this.cargos = d);
  }

  openModal(): void { this.showModal = true; }
  closeModal(): void { this.showModal = false; }
  save(): void {
    this.api.createCandidato(this.form).subscribe(() => {
      this.load(this.form.eleccionesId);
      this.closeModal();
    });
  }
}