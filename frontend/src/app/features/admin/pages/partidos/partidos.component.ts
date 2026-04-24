import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Partido } from '../../../../core/models';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestión de Partidos Políticos</h1>
        <button class="btn btn-primary" (click)="openModal()">+ Nuevo Partido</button>
      </div>
      <div class="card">
        <table class="table table-hover">
          <thead><tr><th>Nombre</th><th>Sigla</th><th>Acciones</th></tr></thead>
          <tbody>
            <tr *ngFor="let partido of partidos">
              <td>{{ partido.nombre }}</td>
              <td>{{ partido.sigla }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" (click)="delete(partido.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header"><h3>Nuevo Partido</h3><button class="btn-close" (click)="closeModal()">×</button></div>
          <div class="modal-body">
            <div class="form-group">
              <label>Nombre</label><input type="text" class="form-control" [(ngModel)]="form.nombre">
            </div>
            <div class="form-group">
              <label>Sigla</label><input type="text" class="form-control" [(ngModel)]="form.sigla">
            </div>
            <div class="form-group">
              <label>Elección</label>
              <select class="form-select" [(ngModel)]="form.eleccionesId">
                <option *ngFor="let e of elecciones" [value]="e.id">{{ e.nombre }}</option>
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
export class PartidosComponent implements OnInit {
  partidos: Partido[] = [];
  elecciones: Eleccion[] = [];
  showModal = false;
  form: any = { nombre: '', sigla: '', eleccionesId: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) this.load(e[0].id);
    });
  }

  load(eleccionId: number): void {
    this.api.getPartidosByEleccion(eleccionId).subscribe((d: Partido[]) => this.partidos = d);
  }

  openModal(): void {
    this.form = { nombre: '', sigla: '', eleccionesId: this.elecciones[0]?.id };
    this.showModal = true;
  }
  closeModal(): void { this.showModal = false; }
  save(): void {
    this.api.createPartido(this.form).subscribe(() => {
      this.load(this.form.eleccionesId);
      this.closeModal();
    });
  }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.api.deleteEleccion(id as any).subscribe(() => this.load(this.form.eleccionesId));
  }
}