import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  roles: string[];
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  navItems: NavItem[] = [
    { path: 'elecciones', icon: '🏛️', label: 'Elecciones', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'zonas', icon: '🌍', label: 'Zonas', roles: ['ADMIN'] },
    { path: 'provincias', icon: '📍', label: 'Provincias', roles: ['ADMIN'] },
    { path: 'cantones', icon: '🏘️', label: 'Cantones', roles: ['ADMIN'] },
    { path: 'parroquias', icon: '🏘️', label: 'Parroquias', roles: ['ADMIN'] },
    { path: 'instituciones', icon: '🏫', label: 'Instituciones', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'partidos', icon: '🎯', label: 'Partidos', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'cargos', icon: '📋', label: 'Cargos', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'candidatos', icon: '👤', label: 'Candidatos', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'mesas', icon: '🗳️', label: 'Mesas', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'asignar-mesas', icon: '📝', label: 'Asignar Mesas', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'listas-electorales', icon: '📋', label: 'Listas Electorales', roles: ['ADMIN'] },
    { path: 'tipos-eleccion', icon: '⚙️', label: 'Config. Electoral', roles: ['ADMIN'] },
    { path: 'papeletas', icon: '📄', label: 'Papeletas', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: 'configuracion', icon: '⚙️', label: 'Configuración', roles: ['ADMIN'] }
  ];

  get userRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.rol || '';
  }

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre + ' ' + user?.apellido || '';
  }

  get filteredNavItems(): NavItem[] {
    return this.navItems.filter(item => item.roles.includes(this.userRole));
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
