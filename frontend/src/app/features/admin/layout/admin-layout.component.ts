import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Conteo Electoral</h2>
          <span class="badge bg-primary">{{ userRole }}</span>
        </div>
        
        <nav class="sidebar-nav">
          <a routerLink="elecciones" routerLinkActive="active" class="nav-item">
            <span>🏛️</span> Elecciones
          </a>
          <a routerLink="partidos" routerLinkActive="active" class="nav-item">
            <span>🎯</span> Partidos
          </a>
          <a routerLink="cargos" routerLinkActive="active" class="nav-item">
            <span>📋</span> Cargos
          </a>
          <a routerLink="candidatos" routerLinkActive="active" class="nav-item">
            <span>👤</span> Candidatos
          </a>
          <a routerLink="recintos" routerLinkActive="active" class="nav-item">
            <span>🏢</span> Recintos
          </a>
          <a routerLink="mesas" routerLinkActive="active" class="nav-item">
            <span>🗳️</span> Mesas
          </a>
          <a routerLink="usuarios" routerLinkActive="active" class="nav-item">
            <span>👥</span> Usuarios
          </a>
        </nav>

        <div class="sidebar-footer">
          <button (click)="logout()" class="btn btn-outline-danger w-100">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 260px;
      background: #1e3a8a;
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100vh;
    }

    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .sidebar-header h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 16px 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: all 0.2s;
    }

    .nav-item:hover, .nav-item.active {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .main-content {
      flex: 1;
      margin-left: 260px;
      padding: 32px;
      background: #f8fafc;
    }
  `]
})
export class AdminLayoutComponent {
  get userRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.rol || '';
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