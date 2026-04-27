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
        <h1>Gestion de Candidatos</h1>
        <button class="btn btn-primary btn-sm" (click)="openModal()">+ Nuevo</button>
      </div>
      <div class="card">
        <table class="table table-hover table-sm">
          <thead><tr><th>Nombre</th><th>Partido</th><th>Cargo</th><th class="text-center">Acciones</th></tr></thead>
          <tbody>
            <tr *ngFor="let c of candidatos">
              <td><strong>{{ c.nombreCompleto }}</strong></td>
              <td>{{ c.partidoNombre }}</td>
              <td>{{ c.cargoNombre }}</td>
              <td class="text-center">
                <button class="btn btn-outline-primary btn-sm me-1" (click)="edit(c)">Editar</button>
                <button class="btn btn-outline-danger btn-sm" (click)="delete(c.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ editMode ? 'Editar' : 'Nuevo' }} Candidato</h3>
            <button class="btn-close" (click)="closeModal()">x</button>
          </div>
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
            <button class="btn btn-secondary btn-sm" (click)="closeModal()">Cancelar</button>
            <button class="btn btn-primary btn-sm" (click)="save()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.page-container { max-width: 1000px; margin: 0 auto; } .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; } .page-header h1 { font-size: 20px; font-weight: 600; margin: 0; } .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; } .modal-content { background: white; border-radius: 8px; width: 100%; max-width: 400px; } .modal-header { display: flex; justify-content: space-between; padding: 16px; border-bottom: 1px solid #e2e8f0; } .modal-header h3 { margin: 0; font-size: 16px; } .btn-close { background: none; border: none; font-size: 20px; cursor: pointer; } .modal-body { padding: 16px; } .modal-footer { padding: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 8px; } .form-group { margin-bottom: 12px; } .form-group label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 14px; }`]
})
export class CandidatosComponent implements OnInit {
  candidatos: Candidato[] = [];
  elecciones: Eleccion[] = [];
  partidos: Partido[] = [];
  cargos: Cargo[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
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

  openModal(): void {
    this.editMode = false;
    this.form = { nombre: '', apellido: '', partidoId: null, cargoId: this.cargos[0]?.id, eleccionesId: this.form.eleccionesId };
    this.showModal = true;
  }

  edit(c: Candidato): void {
    this.editMode = true;
    this.selectedId = c.id;
    this.form = { nombre: c.nombre, apellido: c.apellido, partidoId: c.partidoId, cargoId: c.cargoId, eleccionesId: c.eleccionesId };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateCandidato(this.selectedId, this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    } else {
      this.api.createCandidato(this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar este candidato?')) {
      this.api.deleteCandidato(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}