import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { CarouselImage } from '../../../../core/models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  images: CarouselImage[] = [];
  loading = false;
  uploading = false;
  errorMsg = '';
  successMsg = '';
  selectedFile: File | null = null;
  newCaption = '';
  editingId: number | null = null;
  editCaption = '';
  editOrden = 0;
  private readonly API_URL = environment.apiUrl;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.loading = true;
    this.api.getCarouselImages().subscribe({
      next: (res) => { this.images = res; this.loading = false; },
      error: () => { this.errorMsg = 'Error al cargar imágenes'; this.loading = false; }
    });
  }

  getImageUrl(id: number): string {
    return `${this.API_URL}/carousel/${id}/image`;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
  }

  uploadImage(): void {
    if (!this.selectedFile) return;
    if (!this.newCaption.trim()) { this.errorMsg = 'La descripción es obligatoria'; return; }
    this.uploading = true;
    this.errorMsg = '';
    this.successMsg = '';
    const nextOrden = this.images.length > 0 ? Math.max(...this.images.map(i => i.orden)) + 1 : 1;
    this.api.uploadCarouselImage(this.selectedFile, this.newCaption, nextOrden).subscribe({
      next: () => {
        this.uploading = false;
        this.selectedFile = null;
        this.newCaption = '';
        this.successMsg = 'Imagen subida correctamente';
        this.loadImages();
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || 'Error al subir imagen';
      }
    });
  }

  startEdit(img: CarouselImage): void {
    this.editingId = img.id;
    this.editCaption = img.caption;
    this.editOrden = img.orden;
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  saveEdit(id: number): void {
    if (!this.editCaption.trim()) { this.errorMsg = 'La descripción es obligatoria'; return; }
    this.api.updateCarouselImage(id, { caption: this.editCaption, orden: this.editOrden }).subscribe({
      next: () => {
        this.editingId = null;
        this.successMsg = 'Imagen actualizada correctamente';
        this.loadImages();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error al actualizar imagen';
      }
    });
  }

  deleteImage(id: number): void {
    if (!confirm('¿Eliminar esta imagen del carrusel?')) return;
    this.api.deleteCarouselImage(id).subscribe({
      next: () => {
        this.successMsg = 'Imagen eliminada correctamente';
        this.loadImages();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error al eliminar imagen';
      }
    });
  }
}
