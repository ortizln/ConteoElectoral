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
  filterRol: string | null = null;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizes: number[] = [5, 10, 25, 50];
  Math = Math;
  errorMessage: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    const obs = this.filterRol
      ? this.api.getUsuariosByRol(this.filterRol)
      : this.api.getUsuarios();
    obs.subscribe((d: Usuario[]) => this.usuarios = d);
  }

  filtrarPorRol(): void { this.load(); this.currentPage = 1; }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  get usuariosOrdenados(): Usuario[] {
    if (!this.sortColumn) return this.usuarios;
    return [...this.usuarios].sort((a, b) => {
      const valA = (a as any)[this.sortColumn];
      const valB = (b as any)[this.sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === 'boolean') {
        const cmp = valA === valB ? 0 : valA ? -1 : 1;
        return this.sortDirection === 'asc' ? cmp : -cmp;
      }
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get usuariosFiltrados(): Usuario[] {
    if (!this.searchText) return this.usuariosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.usuariosOrdenados.filter(item =>
      Object.values(item).some(v => v != null && String(v).toLowerCase().includes(term))
    );
  }

  get usuariosPaginados(): Usuario[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.usuariosFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.usuariosFiltrados.length / this.pageSize) || 1;
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  goToPage(p: number): void { this.currentPage = Math.max(1, Math.min(p, this.totalPages)); }
  prevPage(): void { this.goToPage(this.currentPage - 1); }
  nextPage(): void { this.goToPage(this.currentPage + 1); }
  onPageSizeChange(): void { this.currentPage = 1; }

  toUpper(obj: any, prop: string): void {
    if (obj[prop]) obj[prop] = obj[prop].toUpperCase();
  }

  openModal(): void {
    this.editingUser = null;
    this.form = { username: '', password: '', nombre: '', apellido: '', email: '', rolId: 3, activo: true };
    this.errorMessage = '';
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
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingUser = null; this.errorMessage = ''; }

  openResetPasswordModal(user: Usuario): void {
    this.resetUser = user;
    this.newPassword = '';
    this.confirmPassword = '';
    this.showResetModal = true;
  }

  closeResetModal(): void { this.showResetModal = false; this.resetUser = null; }

  save(): void {
    this.errorMessage = '';
    if (this.editingUser) {
      this.api.updateUsuario(this.editingUser.id, this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
      });
    } else {
      this.api.createUsuario(this.form).subscribe({
        next: () => { this.load(); this.closeModal(); },
        error: (err) => { this.errorMessage = err.error?.message || 'Error al guardar. Intente de nuevo.'; }
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

  readonly roles: { value: string; label: string }[] = [
    { value: 'ADMIN', label: 'ADMIN' },
    { value: 'SUPERVISOR', label: 'SUPERVISOR' },
    { value: 'MIEMBRO_MESA', label: 'MIEMBRO MESA' }
  ];
}
