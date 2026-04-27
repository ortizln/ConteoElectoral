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
        <h1>Gestion de Usuarios</h1>
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
              <td><span class="badge" [class.bg-danger]="u.rol === 'ADMIN'" [class.bg-primary]="u.rol === 'SUPERVISOR'" [class.bg-success]="u.rol === 'MIEMBRO_MESA'">{{ u.rol }}</span></td>
              <td><span class="badge" [class.bg-success]="u.activo" [class.bg-secondary]="!u.activo">{{ u.activo ? 'Activo' : 'Inactivo' }}</span></td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary" (click)="openEditModal(u)">Editar</button>
                  <button class="btn btn-sm btn-outline-warning" (click)="openResetPasswordModal(u)">Resetear Pass</button>
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteUsuario(u)">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Nuevo/Editar Usuario -->
      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}</h3>
            <button class="btn-close" (click)="closeModal()">x</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Usuario</label>
              <input type="text" class="form-control" [(ngModel)]="form.username" [disabled]="editingUser !== null">
            </div>
            <div class="form-group" *ngIf="!editingUser">
              <label>Password</label>
              <input type="password" class="form-control" [(ngModel)]="form.password">
            </div>
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" class="form-control" [(ngModel)]="form.nombre">
            </div>
            <div class="form-group">
              <label>Apellido</label>
              <input type="text" class="form-control" [(ngModel)]="form.apellido">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" [(ngModel)]="form.email">
            </div>
            <div class="form-group">
              <label>Rol</label>
              <select class="form-select" [(ngModel)]="form.rolId">
                <option [value]="1">ADMIN</option>
                <option [value]="2">SUPERVISOR</option>
                <option [value]="3">MIEMBRO_MESA</option>
              </select>
            </div>
            <div class="form-group" *ngIf="editingUser">
              <label>Estado</label>
              <select class="form-select" [(ngModel)]="form.activo">
                <option [value]="true">Activo</option>
                <option [value]="false">Inactivo</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
            <button class="btn btn-primary" (click)="save()">{{ editingUser ? 'Actualizar' : 'Crear' }}</button>
          </div>
        </div>
      </div>

      <!-- Modal Resetear Password -->
      <div class="modal-overlay" *ngIf="showResetModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Resetear Password - {{ resetUser?.username }}</h3>
            <button class="btn-close" (click)="closeResetModal()">x</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Nueva Password</label>
              <input type="password" class="form-control" [(ngModel)]="newPassword" placeholder="Ingrese nueva password">
            </div>
            <div class="form-group">
              <label>Confirmar Password</label>
              <input type="password" class="form-control" [(ngModel)]="confirmPassword" placeholder="Confirme la password">
            </div>
            <div class="alert alert-warning" *ngIf="newPassword && confirmPassword && newPassword !== confirmPassword">
              Las passwords no coinciden
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="closeResetModal()">Cancelar</button>
            <button class="btn btn-warning" (click)="resetPassword()" [disabled]="!newPassword || !confirmPassword || newPassword !== confirmPassword">Resetear</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1100px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page-header h1 { font-size: 24px; font-weight: 600; margin: 0; }
    .btn-group { display: flex; gap: 8px; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 12px; width: 100%; max-width: 450px; }
    .modal-header { display: flex; justify-content: space-between; padding: 20px; border-bottom: 1px solid #e2e8f0; }
    .modal-body { padding: 20px; }
    .modal-footer { padding: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 12px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; margin-bottom: 6px; font-weight: 500; }
    .alert { padding: 12px; border-radius: 8px; margin-top: 12px; }
    .alert-warning { background: #fef3cd; color: #856404; border: 1px solid #ffeaa7; }
  `]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  showModal = false;
  showResetModal = false;
  editingUser: Usuario | null = null;
  resetUser: Usuario | null = null;
  newPassword = '';
  confirmPassword = '';
  form: any = { username: '', password: '', nombre: '', apellido: '', email: '', rolId: 3, activo: true };

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.api.getUsuarios().subscribe((d: Usuario[]) => this.usuarios = d); }

  openModal(): void {
    this.editingUser = null;
    this.form = { username: '', password: '', nombre: '', apellido: '', email: '', rolId: 3, activo: true };
    this.showModal = true;
  }

  openEditModal(user: Usuario): void {
    this.editingUser = user;
    this.form = { 
      username: user.username, 
      password: '', 
      nombre: user.nombre, 
      apellido: user.apellido, 
      email: user.email, 
      rolId: user.rol === 'ADMIN' ? 1 : user.rol === 'SUPERVISOR' ? 2 : 3, 
      activo: user.activo 
    };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingUser = null; }

  openResetPasswordModal(user: Usuario): void {
    this.resetUser = user;
    this.newPassword = '';
    this.confirmPassword = '';
    this.showResetModal = true;
  }

  closeResetModal(): void { this.showResetModal = false; this.resetUser = null; }

  save(): void {
    if (this.editingUser) {
      this.api.updateUsuario(this.editingUser.id, this.form).subscribe(() => {
        this.load();
        this.closeModal();
      });
    } else {
      this.api.createUsuario(this.form).subscribe(() => {
        this.load();
        this.closeModal();
      });
    }
  }

  resetPassword(): void {
    if (this.resetUser && this.newPassword === this.confirmPassword) {
      this.api.resetPassword(this.resetUser.id, this.newPassword).subscribe(() => {
        this.closeResetModal();
        alert('Password reseteada exitosamente para: ' + this.resetUser!.username);
      });
    }
  }

  deleteUsuario(user: Usuario): void {
    if (confirm('Esta seguro de eliminar al usuario: ' + user.username + '?')) {
      this.api.deleteUsuario(user.id).subscribe(() => this.load());
    }
  }
}