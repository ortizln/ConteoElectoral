import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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