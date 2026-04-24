import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Conteo Electoral</h1>
          <p>Sistema de Gestión de Votaciones</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input 
              type="text" 
              id="username" 
              [(ngModel)]="username" 
              name="username"
              class="form-control"
              placeholder="Ingrese su usuario"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password"
              class="form-control"
              placeholder="Ingrese su contraseña"
              required
            >
          </div>

          <div *ngIf="error" class="alert alert-danger">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
            {{ loading ? 'Ingresando...' : 'Iniciar Sesión' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .login-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 8px;
    }

    .login-header p {
      color: #64748b;
      font-size: 14px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }

    .alert {
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .alert-danger {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.redirectByRole(response.rol);
        },
        error: (err: any) => {
          this.loading = false;
          this.error = err.error?.message || 'Credenciales inválidas';
        }
      });
  }

  private redirectByRole(rol: string): void {
    switch (rol) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'SUPERVISOR':
        this.router.navigate(['/admin']);
        break;
      case 'MIEMBRO_MESA':
        this.router.navigate(['/mesa']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}