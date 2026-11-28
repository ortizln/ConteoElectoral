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

interface NavGroup {
  key: string;
  label: string;
  icon: string;
  items: NavItem[];
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
  sidebarCollapsed = false;
  baseAdminPath = '/admin';

  adminPrefix = (path: string) => `${this.baseAdminPath}/${path}`;

  navGroups: NavGroup[] = [
    {
      key: 'principal', label: 'Principal', icon: 'bi-house-gear',
      items: [
        { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard Electoral', roles: ['ADMIN', 'SUPERVISOR'] },
        { path: '/mesa', icon: 'bi-check2-square', label: 'Módulo de Votación', roles: ['ADMIN', 'MIEMBRO_MESA'] },
        { path: '/actas', icon: 'bi-camera-fill', label: 'Actas', roles: ['ADMIN', 'SUPERVISOR'] },
        { path: '/resultados', icon: 'bi-bar-chart-line', label: 'Resultados', roles: ['VISITANTE'] },
      ],
    },
    {
      key: 'operacion', label: 'Operación', icon: 'bi-diagram-3',
      items: [
        { path: '/admin/elecciones', icon: 'bi-bank', label: 'Elecciones', roles: ['ADMIN'] },
        { path: '/admin/cargos', icon: 'bi-clipboard-data', label: 'Cargos', roles: ['ADMIN'] },
        { path: '/admin/partidos', icon: 'bi-flag', label: 'Partidos', roles: ['ADMIN'] },
        { path: '/admin/candidatos', icon: 'bi-person', label: 'Candidatos', roles: ['ADMIN'] },
        { path: '/admin/listas-electorales', icon: 'bi-list-check', label: 'Listas Electorales', roles: ['ADMIN'] },
        { path: '/admin/asignar-mesas', icon: 'bi-pencil-square', label: 'Asignar Mesas', roles: ['ADMIN'] },
        { path: '/admin/tipos-eleccion', icon: 'bi-sliders', label: 'Config. Electoral', roles: ['ADMIN'] },
        { path: '/admin/papeletas', icon: 'bi-file-earmark-text', label: 'Papeletas', roles: ['ADMIN'] },
        { path: '/admin/escrutinio', icon: 'bi-search', label: 'Escrutinio', roles: ['ADMIN'] },
      ],
    },
    {
      key: 'territorio', label: 'Territorio', icon: 'bi-map',
      items: [
        { path: '/admin/zonas', icon: 'bi-globe-americas', label: 'Zonas', roles: ['ADMIN'] },
        { path: '/admin/provincias', icon: 'bi-geo-alt', label: 'Provincias', roles: ['ADMIN'] },
        { path: '/admin/cantones', icon: 'bi-buildings', label: 'Cantones', roles: ['ADMIN'] },
        { path: '/admin/parroquias', icon: 'bi-house-door', label: 'Parroquias', roles: ['ADMIN'] },
        { path: '/admin/circunscripciones', icon: 'bi-signpost-split', label: 'Circunscripciones', roles: ['ADMIN'] },
        { path: '/admin/instituciones', icon: 'bi-mortarboard', label: 'Instituciones', roles: ['ADMIN'] },
        { path: '/admin/mesas', icon: 'bi-check2-square', label: 'Mesas', roles: ['ADMIN'] },
      ],
    },
    {
      key: 'reportes', label: 'Reportes', icon: 'bi-graph-up',
      items: [
        { path: '/admin/reportes', icon: 'bi-file-earmark-bar-graph', label: 'Reportes', roles: ['ADMIN'] },
        { path: '/admin/dashboard-geografico', icon: 'bi-pin-map', label: 'Dashboard Geográfico', roles: ['ADMIN'] },
      ],
    },
    {
      key: 'seguridad', label: 'Usuarios y permisos', icon: 'bi-shield-lock',
      items: [
        { path: '/admin/usuarios', icon: 'bi-people', label: 'Usuarios', roles: ['ADMIN'] },
        { path: '/admin/roles', icon: 'bi-shield-check', label: 'Roles y Permisos', roles: ['ADMIN'] },
        { path: '/admin/reglas-negocio', icon: 'bi-journal-text', label: 'Reglas de Negocio', roles: ['ADMIN'] },
      ],
    },
    {
      key: 'configuracion', label: 'Configuración', icon: 'bi-gear',
      items: [
        { path: '/admin/configuracion', icon: 'bi-whatsapp', label: 'Configuración WPP', roles: ['ADMIN'] },
      ],
    },
  ];

  expandedGroups: Record<string, boolean> = {};

  // Listas estables: los getters que devolvían arrays nuevos en cada ciclo de
  // change detection recreaban el menú continuamente y bloqueaban el render.
  navGroupsFiltered: NavGroup[] = [];
  allNavItemsFiltered: NavItem[] = [];

  private rebuildNav(): void {
    const rol = this.userRole;
    this.navGroupsFiltered = this.navGroups
      .map(g => ({ ...g, items: g.items.filter(item => item.roles.includes(rol)) }))
      .filter(g => g.items.length > 0);
    this.allNavItemsFiltered = this.navGroupsFiltered.flatMap(g => g.items);
  }

  isGroupExpanded(key: string): boolean {
    return this.expandedGroups[key] !== false;
  }

  isGroupActive(group: NavGroup): boolean {
    return group.items.some(item => this.router.isActive(item.path, false));
  }

  toggleGroup(key: string): void {
    this.expandedGroups[key] = !this.isGroupExpanded(key);
    localStorage.setItem('sidebar_groups', JSON.stringify(this.expandedGroups));
  }

  get userRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.rol || '';
  }

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre + ' ' + user?.apellido || '';
  }

  get roleLabel(): string {
    switch (this.userRole) {
      case 'ADMIN': return 'Administrador';
      case 'SUPERVISOR': return 'Supervisor';
      case 'MIEMBRO_MESA': return 'Miembro de Mesa';
      case 'VISITANTE': return 'Visitante';
      case 'OPERADOR': return 'Operador';
      default: return this.userRole;
    }
  }



  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  get isMobile(): boolean { return window.innerWidth <= 991; }

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    try {
      const guardado = localStorage.getItem('sidebar_groups');
      if (guardado) this.expandedGroups = JSON.parse(guardado) || {};
    } catch {
      this.expandedGroups = {};
    }
    for (const grupo of this.navGroups) {
      if (this.expandedGroups[grupo.key] === undefined) this.expandedGroups[grupo.key] = true;
    }
    this.rebuildNav();
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }

  toggleCollapse(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem('sidebar_collapsed', String(this.sidebarCollapsed));
  }

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
