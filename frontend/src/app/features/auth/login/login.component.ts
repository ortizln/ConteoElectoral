import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { CarouselImage, RecuperarPasswordRequest } from '../../../core/models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  error = '';
  images: CarouselImage[] = [];
  currentIndex = 0;
  private intervalId: any;
  private readonly API_URL = environment.apiUrl;
  apkDownloadUrl = `${environment.apiUrl}/configuracion/apk`;
  apkVersion = '';

  showRecoveryModal = false;
  recuperando = false;
  recuperarForm: RecuperarPasswordRequest = { username: '', identificacion: '', celular: '' };
  recuperarError = '';
  recuperarSuccess = '';

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImages();
    this.loadApkVersion();
  }

  /** Versión del APK disponible para descarga desde el login */
  loadApkVersion(): void {
    this.api.getApkVersion().subscribe({
      next: (res) => { this.apkVersion = res?.version || ''; },
      error: () => { this.apkVersion = ''; }
    });
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  loadImages(): void {
    this.api.getCarouselImages().subscribe({
      next: (res) => {
        this.images = res;
        if (this.images.length > 1) this.startCarousel();
      }
    });
  }

  getImageUrl(id: number): string {
    return `${this.API_URL}/carousel/${id}/image`;
  }

  private startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }

  private stopCarousel(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

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

  openRecoveryModal(): void {
    this.recuperarForm = { username: this.username, identificacion: '', celular: '' };
    this.recuperarError = '';
    this.recuperarSuccess = '';
    this.showRecoveryModal = true;
  }

  closeRecoveryModal(): void {
    this.showRecoveryModal = false;
    this.recuperarError = '';
    this.recuperarSuccess = '';
  }

  submitRecovery(): void {
    this.recuperarError = '';
    this.recuperarSuccess = '';
    const { username, identificacion, celular } = this.recuperarForm;
    if (!username.trim() || !identificacion.trim() || !celular.trim()) {
      this.recuperarError = 'Ingrese el usuario, la identificación y el celular.';
      return;
    }
    this.recuperando = true;
    this.api.recuperarPassword(this.recuperarForm).subscribe({
      next: (res) => {
        this.recuperando = false;
        this.recuperarSuccess = `${res.mensaje} Enviado al número ${res.enviadoA}.`;
      },
      error: (err) => {
        this.recuperando = false;
        this.recuperarError = err.error?.message || 'No se pudo recuperar la contraseña. Intente de nuevo.';
      }
    });
  }

  private redirectByRole(rol: string): void {
    switch (rol) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'SUPERVISOR':
        this.router.navigate(['/dashboard']);
        break;
      case 'MIEMBRO_MESA':
        this.router.navigate(['/mesa']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}
