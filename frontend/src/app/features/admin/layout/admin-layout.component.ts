import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  roles: string[];
  isQuickLink?: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  sidebarOpen = false;
  baseAdminPath = '/admin';

  adminPrefix = (path: string) => `${this.baseAdminPath}/${path}`;

  navItems: NavItem[] = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard Electoral', roles: ['ADMIN', 'SUPERVISOR'] },
    { path: '/mesa', icon: '🗳️', label: 'Módulo de Votación', roles: ['ADMIN', 'MIEMBRO_MESA'] },
  ];

  adminNavItems: NavItem[] = [
    { path: '/admin/elecciones', icon: '🏛️', label: 'Elecciones', roles: ['ADMIN'] },
    { path: '/admin/zonas', icon: '🌍', label: 'Zonas', roles: ['ADMIN'] },
    { path: '/admin/provincias', icon: '📍', label: 'Provincias', roles: ['ADMIN'] },
    { path: '/admin/cantones', icon: '🏘️', label: 'Cantones', roles: ['ADMIN'] },
    { path: '/admin/parroquias', icon: '🏘️', label: 'Parroquias', roles: ['ADMIN'] },
    { path: '/admin/instituciones', icon: '🏫', label: 'Instituciones', roles: ['ADMIN'] },
    { path: '/admin/partidos', icon: '🎯', label: 'Partidos', roles: ['ADMIN'] },
    { path: '/admin/cargos', icon: '📋', label: 'Cargos', roles: ['ADMIN'] },
    { path: '/admin/candidatos', icon: '👤', label: 'Candidatos', roles: ['ADMIN'] },
    { path: '/admin/mesas', icon: '🗳️', label: 'Mesas', roles: ['ADMIN'] },
    { path: '/admin/asignar-mesas', icon: '📝', label: 'Asignar Mesas', roles: ['ADMIN'] },
    { path: '/admin/listas-electorales', icon: '📋', label: 'Listas Electorales', roles: ['ADMIN'] },
    { path: '/admin/tipos-eleccion', icon: '⚙️', label: 'Config. Electoral', roles: ['ADMIN'] },
    { path: '/admin/papeletas', icon: '📄', label: 'Papeletas', roles: ['ADMIN'] },
    { path: '/admin/circunscripciones', icon: '🗺️', label: 'Circunscripciones', roles: ['ADMIN'] },
    { path: '/admin/escrutinio', icon: '🔍', label: 'Escrutinio', roles: ['ADMIN'] },
    { path: '/admin/dashboard-geografico', icon: '🗺️', label: 'Dashboard Geográfico', roles: ['ADMIN'] },
    { path: '/admin/reportes', icon: '📊', label: 'Reportes', roles: ['ADMIN'] },
    { path: '/admin/usuarios', icon: '👥', label: 'Usuarios', roles: ['ADMIN'] },
    { path: '/admin/roles', icon: '🔐', label: 'Roles y Permisos', roles: ['ADMIN'] },
    { path: '/admin/reglas-negocio', icon: '⚖️', label: 'Reglas de Negocio', roles: ['ADMIN'] },
    { path: '/admin/configuracion', icon: '⚙️', label: 'Configuración', roles: ['ADMIN'] },
  ];

  get navItemsFiltered(): NavItem[] {
    return this.navItems.filter(item => item.roles.includes(this.userRole));
  }

  get adminNavItemsFiltered(): NavItem[] {
    return this.adminNavItems.filter(item => item.roles.includes(this.userRole));
  }

  get userRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.rol || '';
  }

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre + ' ' + user?.apellido || '';
  }



  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  get isMobile(): boolean { return window.innerWidth <= 991; }

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }

  closeSidebar(): void {
    if (this.isMobile) this.sidebarOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isMobile) this.sidebarOpen = false;
  }

  toggleTheme(): void { this.themeService.toggleDarkMode(); }
  logout(): void { this.authService.logout(); this.router.navigate(['/login']); }
}
