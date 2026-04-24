import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Usuario } from '../../../../core/models';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestión de Usuarios</h1>
        <button class="btn btn-primary" (click)="openModal()">+ Nuevo Usuario</button>
      </div>
      <div class="card">
        <table class="table table-hover">
          <thead><tr><th>Usuario</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            <tr *ngFor="let u of usuarios">
              <td><strong>{{ u.username }}</strong></td>
              <td>{{ u.nombre }} {{ u.apellido }}</td>
              <td>{{ u.email }}</td>
              <td><span class="badge bg-primary">{{ u.rol }}</span></td>
              <td><span class="badge" [class.bg-success]="u.activo" [class.bg-secondary]="!u.activo">{{ u.activo ? 'Activo' : 'Inactivo' }}</span></td>
              <td><button class="btn btn-sm btn-outline-danger">Eliminar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header"><h3>Nuevo Usuario</h3><button class="btn-close" (click)="closeModal()">×</button></div>
          <div class="modal-body">
            <div class="form-group"><label>Usuario</label><input type="text" class="form-control" [(ngModel)]="form.username"></div>
            <div class="form-group"><label>Password</label><input type="password" class="form-control" [(ngModel)]="form.password"></div>
            <div class="form-group"><label>Nombre</label><input type="text" class="form-control" [(ngModel)]="form.nombre"></div>
            <div class="form-group"><label>Apellido</label><input type="text" class="form-control" [(ngModel)]="form.apellido"></div>
            <div class="form-group"><label>Email</label><input type="email" class="form-control" [(ngModel)]="form.email"></div>
            <div class="form-group">
              <label>Rol</label>
              <select class="form-select" [(ngModel)]="form.rolId">
                <option [value]="1">ADMIN</option>
                <option [value]="2">SUPERVISOR</option>
                <option [value]="3">MIEMBRO_MESA</option>
              </select>
            </div>
          </div>
          <div class="modal-footer"><button class="btn btn-secondary" (click)="closeModal()">Cancelar</button><button class="btn btn-primary" (click)="save()">Guardar</button></div>
        </div>
      </div>
    </div>
  `,
  styles: [`.page-container { max-width: 1000px; margin: 0 auto; } .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; } .page-header h1 { font-size: 24px; font-weight: 600; margin: 0; } .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; } .modal-content { background: white; border-radius: 12px; width: 100%; max-width: 400px; } .modal-header { display: flex; justify-content: space-between; padding: 20px; border-bottom: 1px solid #e2e8f0; } .modal-body { padding: 20px; } .modal-footer { padding: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; } .form-group { margin-bottom: 16px; } .form-group label { display: block; margin-bottom: 6px; font-weight: 500; }`]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  showModal = false;
  form: any = { username: '', password: '', nombre: '', apellido: '', email: '', rolId: 3 };

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.api.getUsuarios().subscribe((d: Usuario[]) => this.usuarios = d); }

  openModal(): void { this.form = { username: '', password: '', nombre: '', apellido: '', email: '', rolId: 3 }; this.showModal = true; }
  closeModal(): void { this.showModal = false; }
  save(): void { this.api.createUsuario(this.form).subscribe(() => { this.load(); this.closeModal(); }); }
}