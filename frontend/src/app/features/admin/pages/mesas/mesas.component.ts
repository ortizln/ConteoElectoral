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
        <h1>Gestión de Mesas</h1>
        <button class="btn btn-primary" (click)="openModal()">+ Nueva Mesa</button>
      </div>
      <div class="card">
        <table class="table table-hover">
          <thead><tr><th>Número</th><th>Recinto</th><th>Sexo</th><th>Estado</th><th>Acciones</th></tr></thead>
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
              <td>
                <button *ngIf="!m.cerrada" class="btn btn-sm btn-outline-danger" (click)="cerrar(m.id)">Cerrar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header"><h3>Nueva Mesa</h3><button class="btn-close" (click)="closeModal()">×</button></div>
          <div class="modal-body">
            <div class="form-group"><label>Número</label><input type="text" class="form-control" [(ngModel)]="form.numero"></div>
            <div class="form-group"><label>Sexo</label><select class="form-select" [(ngModel)]="form.sexo"><option value="MASCULINO">Masculino</option><option value="FEMENINO">Femenino</option><option value="MIXTA">Mixta</option></select></div>
            <div class="form-group"><label>Recinto</label><select class="form-select" [(ngModel)]="form.recintoId"><option *ngFor="let r of recintos" [value]="r.id">{{ r.nombre }}</option></select></div>
          </div>
          <div class="modal-footer"><button class="btn btn-secondary" (click)="closeModal()">Cancelar</button><button class="btn btn-primary" (click)="save()">Guardar</button></div>
        </div>
      </div>
    </div>
  `,
  styles: [`.page-container { max-width: 1000px; margin: 0 auto; } .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; } .page-header h1 { font-size: 24px; font-weight: 600; margin: 0; } .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; } .modal-content { background: white; border-radius: 12px; width: 100%; max-width: 400px; } .modal-header { display: flex; justify-content: space-between; padding: 20px; border-bottom: 1px solid #e2e8f0; } .modal-body { padding: 20px; } .modal-footer { padding: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; } .form-group { margin-bottom: 16px; } .form-group label { display: block; margin-bottom: 6px; font-weight: 500; }`]
})
export class MesasComponent implements OnInit {
  mesas: Mesa[] = [];
  elecciones: Eleccion[] = [];
  recintos: Recinto[] = [];
  showModal = false;
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

  openModal(): void { this.form = { numero: '', sexo: 'MIXTA', recintoId: this.recintos[0]?.id, eleccionesId: this.form.eleccionesId }; this.showModal = true; }
  closeModal(): void { this.showModal = false; }
  save(): void { this.api.createMesa(this.form).subscribe(() => { this.load(this.form.eleccionesId); this.closeModal(); }); }
  cerrar(id: number): void { if (confirm('¿Cerrar mesa?')) this.api.cerrarMesa(id).subscribe(() => this.load(this.form.eleccionesId)); }
}