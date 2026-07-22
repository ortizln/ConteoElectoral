import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Rol, RolPermiso } from '../../../../core/models';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  permisos: RolPermiso[] = [];
  selectedRolId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.api.getRoles().subscribe({
      next: (r) => {
        this.roles = r;
        if (r.length > 0) {
          this.selectedRolId = r[0].id;
          this.loadPermisos();
        }
      },
      error: () => this.error = 'Error al cargar roles'
    });
  }

  loadPermisos(): void {
    if (!this.selectedRolId) return;
    this.loading = true;
    this.api.getPermisosByRol(this.selectedRolId).subscribe({
      next: (r) => {
        this.permisos = r;
        this.loading = false;
      },
      error: () => { this.error = 'Error al cargar permisos'; this.loading = false; }
    });
  }

  selectRol(id: number): void {
    this.selectedRolId = id;
    this.loadPermisos();
  }

  togglePermiso(permiso: RolPermiso, field: 'puedeVer' | 'puedeCrear' | 'puedeEditar' | 'puedeEliminar'): void {
    const update = { [field]: !permiso[field] };
    this.saving = true;
    this.api.updatePermiso(permiso.id, update).subscribe({
      next: (r) => {
        Object.assign(permiso, r);
        this.saving = false;
        this.success = 'Permiso actualizado';
        setTimeout(() => this.success = '', 2000);
      },
      error: () => { this.error = 'Error al actualizar permiso'; this.saving = false; }
    });
  }
}
