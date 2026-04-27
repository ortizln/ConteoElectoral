import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Usuario } from '../../../../core/models';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
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