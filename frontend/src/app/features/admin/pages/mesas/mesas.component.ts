import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Recinto, Mesa } from '../../../../core/models';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestion de Mesas</h1>
        <button class="btn btn-primary btn-sm" (click)="openModal()">+ Nueva</button>
      </div>
      <div class="card">
        <table class="table table-hover table-sm">
          <thead><tr><th>Numero</th><th>Recinto</th><th>Sexo</th><th>Estado</th><th class="text-center">Acciones</th></tr></thead>
          <tbody>
            <tr *ngFor="let m of mesas">
              <td><strong>{{ m.numero }}</strong></td>
              <td>{{ m.recintoNombre }}</td>
              <td>{{ m.sexo }}</td>
              <td>
                <span class="badge" [class.bg-success]="!m.cerrada" [class.bg-danger]="m.cerrada">
                  {{ m.cerrada ? 'CERRADA' : 'ABIERTA' }}
                </span>
              </td>
              <td class="text-center">
                <button *ngIf="!m.cerrada" class="btn btn-outline-warning btn-sm me-1" (click)="cerrar(m.id)">Cerrar</button>
                <button *ngIf="!m.cerrada" class="btn btn-outline-primary btn-sm me-1" (click)="edit(m)">Editar</button>
                <button *ngIf="!m.cerrada" class="btn btn-outline-danger btn-sm" (click)="delete(m.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ editMode ? 'Editar' : 'Nueva' }} Mesa</h3>
            <button class="btn-close" (click)="closeModal()">x</button>
          </div>
          <div class="modal-body">
            <div class="form-group"><label>Numero</label><input type="text" class="form-control" [(ngModel)]="form.numero"></div>
            <div class="form-group"><label>Sexo</label><select class="form-select" [(ngModel)]="form.sexo"><option value="MASCULINO">Masculino</option><option value="FEMENINO">Femenino</option><option value="MIXTA">Mixta</option></select></div>
            <div class="form-group"><label>Recinto</label><select class="form-select" [(ngModel)]="form.recintoId"><option *ngFor="let r of recintos" [value]="r.id">{{ r.nombre }}</option></select></div>
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
export class MesasComponent implements OnInit {
  mesas: Mesa[] = [];
  elecciones: Eleccion[] = [];
  recintos: Recinto[] = [];
  showModal = false;
  editMode = false;
  selectedId: number | null = null;
  form: any = { numero: '', sexo: 'MIXTA', recintoId: null, eleccionesId: null };

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
    this.api.getMesasByEleccion(eleccionId).subscribe((d: Mesa[]) => this.mesas = d);
    this.api.getRecintosByEleccion(eleccionId).subscribe((d: Recinto[]) => this.recintos = d);
  }

  openModal(): void {
    this.editMode = false;
    this.form = { numero: '', sexo: 'MIXTA', recintoId: this.recintos[0]?.id, eleccionesId: this.form.eleccionesId };
    this.showModal = true;
  }

  edit(m: Mesa): void {
    this.editMode = true;
    this.selectedId = m.id;
    this.form = { numero: m.numero, sexo: m.sexo, recintoId: m.recintoId, eleccionesId: m.eleccionesId };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.selectedId = null; }

  save(): void {
    if (this.editMode && this.selectedId) {
      this.api.updateMesa(this.selectedId, this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    } else {
      this.api.createMesa(this.form).subscribe(() => {
        this.load(this.form.eleccionesId);
        this.closeModal();
      });
    }
  }

  cerrar(id: number): void { if (confirm('Cerrar esta mesa?')) this.api.cerrarMesa(id).subscribe(() => this.load(this.form.eleccionesId)); }

  delete(id: number): void {
    if (confirm('Esta seguro de eliminar esta mesa?')) {
      this.api.deleteMesa(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
}