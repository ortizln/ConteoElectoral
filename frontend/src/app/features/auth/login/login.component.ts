import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { CarouselImage } from '../../../core/models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  loading = false;
  error = '';
  images: CarouselImage[] = [];
  currentIndex = 0;
  private intervalId: any;
  private readonly API_URL = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImages();
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
