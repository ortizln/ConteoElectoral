import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion } from '../../../../core/models';

@Component({
  selector: 'app-elecciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestión de Elecciones</h1>
        <button class="btn btn-primary" (click)="openModal()">
          + Nueva Elección
        </button>
      </div>

      <div class="card">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Total Votos</th>
              <th>Mesas Cerradas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let eleccion of elecciones">
              <td><strong>{{ eleccion.nombre }}</strong></td>
              <td>{{ eleccion.fechaInicio | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>{{ eleccion.fechaFin | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <span class="badge" [class.bg-success]="eleccion.activa" [class.bg-secondary]="!eleccion.activa">
                  {{ eleccion.activa ? 'Activa' : 'Inactiva' }}
                </span>
              </td>
              <td>{{ eleccion.totalVotos || 0 }}</td>
              <td>{{ eleccion.mesasCerradas || 0 }} / {{ eleccion.totalMesas || 0 }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" (click)="edit(eleccion)">Editar</button>
                <button class="btn btn-sm btn-outline-danger" (click)="delete(eleccion.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ editMode ? 'Editar' : 'Nueva' }} Elección</h3>
            <button class="btn-close" (click)="closeModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" class="form-control" [(ngModel)]="form.nombre" required>
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea class="form-control" [(ngModel)]="form.descripcion" rows="3"></textarea>
            </div>
            <div class="row">
              <div class="col">
                <label>Fecha Inicio</label>
                <input type="datetime-local" class="form-control" [(ngModel)]="form.fechaInicio">
              </div>
              <div class="col">
                <label>Fecha Fin</label>
                <input type="datetime-local" class="form-control" [(ngModel)]="form.fechaFin">
              </div>
            </div>
            <div class="form-check mt-3">
              <input type="checkbox" class="form-check-input" [(ngModel)]="form.activa" id="activa">
              <label class="form-check-label" for="activa">Elección activa</label>
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
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 600; color: #1e293b; margin: 0; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 12px; width: 100%; max-width: 500px; animation: slideIn 0.2s; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e2e8f0; }
    .modal-header h3 { margin: 0; font-size: 18px; }
    .btn-close { background: none; border: none; font-size: 24px; cursor: pointer; }
    .modal-body { padding: 20px; }
    .modal-footer { padding: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class EleccionesComponent implements OnInit {
  elecciones: Eleccion[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', activa: true };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getElecciones().subscribe((data: Eleccion[]) => this.elecciones = data);
  }

  openModal(): void {
    this.form = { nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', activa: true };
    this.editMode = false;
    this.showModal = true;
  }

  edit(eleccion: Eleccion): void {
    this.form = { ...eleccion };
    this.selectedId = eleccion.id;
    this.editMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedId = null;
  }

  save(): void {
    const data = {
      ...this.form,
      fechaInicio: new Date(this.form.fechaInicio),
      fechaFin: new Date(this.form.fechaFin)
    };

    if (this.editMode && this.selectedId) {
      this.api.updateEleccion(this.selectedId, data).subscribe(() => {
        this.load();
        this.closeModal();
      });
    } else {
      this.api.createEleccion(data).subscribe(() => {
        this.load();
        this.closeModal();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta elección?')) {
      this.api.deleteEleccion(id).subscribe(() => this.load());
    }
  }
}