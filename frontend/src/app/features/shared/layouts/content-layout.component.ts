import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="content-layout">
      <header class="top-header">
        <div class="header-left">
          <span class="header-brand">Conteo Electoral</span>
        </div>
        <div class="header-right">
          <div class="header-user-info">
            <span class="header-user-name">{{ userName }}</span>
            <span class="header-role-badge">{{ userRole }}</span>
          </div>
          <button (click)="logout()" class="btn btn-outline-light btn-sm header-logout">
            <span>🚪</span> Salir
          </button>
        </div>
      </header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <div class="footer-brand">
          <span class="footer-logo-placeholder"></span>
          <strong>ALANTEK</strong>
        </div>
        <span>&copy; 2026 Sistema de Conteo Electoral. Todos los derechos reservados.</span>
      </footer>
    </div>
  `,
  styles: [`
    .content-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .top-header {
      background: linear-gradient(135deg, #1e3a8a, #3b82f6);
      color: white;
      padding: 0 2rem;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 99;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .header-left { display: flex; align-items: center; gap: 1rem; }
    .header-brand { font-size: 1.1rem; font-weight: 700; letter-spacing: 0.3px; }
    .header-right { display: flex; align-items: center; gap: 1rem; }
    .header-user-info { display: flex; align-items: center; gap: 0.5rem; }
    .header-user-name { font-size: 0.875rem; font-weight: 600; }
    .header-role-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      background: rgba(255,255,255,0.2);
      color: white;
    }
    .header-logout { border-color: rgba(255,255,255,0.4) !important; color: white !important; font-size: 0.8rem; padding: 0.3rem 0.75rem; }
    .header-logout:hover { background: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.6) !important; }

    .main-content {
      flex: 1;
      background: #f1f5f9;
      padding-bottom: 4rem;
      overflow-y: auto;
    }

    .app-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 98;
      background: white;
      border-top: 1px solid #e2e8f0;
      padding: 0.75rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      font-size: 0.8rem;
      color: #64748b;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #334155;
      letter-spacing: 0.5px;
    }

    .footer-logo-placeholder {
      width: 22px;
      height: 22px;
      border: 1.5px dashed #94a3b8;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  `]
})
export class ContentLayoutComponent {
  get userRole(): string {
    return this.authService.getCurrentUser()?.rol || '';
  }

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre + ' ' + user?.apellido || '';
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
