import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { environment } from '../../../../../environments/environment';
import { ApkVersionItem, CarouselImage, Rol, RolPermiso } from '../../../../core/models';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ImportarComponent } from '../importar/importar.component';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, UsuariosComponent, ImportarComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {
  activeTab: 'config' | 'carousel' | 'apk' | 'usuarios' | 'importar' | 'permisos' = 'config';
  config: any = { nombrePartido: '', descripcion: '' };
  logoUrl: string | null = null;
  selectedLogo: File | null = null;
  loading = false;
  saving = false;
  uploading = false;
  successMsg = '';
  errorMsg = '';
  private readonly API_URL = environment.apiUrl;

  // APK
  apkNombre: string | null = null;
  apkVersion: string | null = null;
  apkVersionInput: string = '';
  manualUrl = `${this.API_URL}/configuracion/manual?t=${new Date().getTime()}`;
  apkDownloadUrl = '';
  tieneApk = false;
  selectedApk: File | null = null;
  uploadingApk = false;
  apkVersions: ApkVersionItem[] = [];
  apkVersionsLoading = false;
  apkVersionUploadVersion = '';
  apkVersionFile: File | null = null;
  apkVersionUploading = false;

  // Carousel
  carouselImages: CarouselImage[] = [];
  carouselLoading = false;
  carouselFile: File | null = null;
  carouselPreviewUrl: string | null = null;
  carouselCaption = '';
  carouselDragOver = false;
  editingCarouselId: number | null = null;
  editCaption = '';
  editOrden = 0;

  // Permisos
  roles: Rol[] = [];
  permisos: RolPermiso[] = [];
  permisosLoading = false;
  permisosSaving = false;

  // Modulos disponibles
  readonly MODULOS = [
    { key: 'ELECCIONES', label: 'Elecciones' },
    { key: 'ZONAS', label: 'Zonas' },
    { key: 'PROVINCIAS', label: 'Provincias' },
    { key: 'CANTONES', label: 'Cantones' },
    { key: 'PARROQUIAS', label: 'Parroquias' },
    { key: 'INSTITUCIONES', label: 'Instituciones' },
    { key: 'PARTIDOS', label: 'Partidos' },
    { key: 'CARGOS', label: 'Cargos' },
    { key: 'CANDIDATOS', label: 'Candidatos' },
    { key: 'MESAS', label: 'Mesas' },
    { key: 'USUARIOS', label: 'Usuarios' },
    { key: 'CONFIGURACION', label: 'Configuración' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadConfig();
    this.loadCarousel();
    this.loadApkVersions();
    this.loadRoles();
    this.loadPermisos();
  }

  loadConfig(): void {
    this.loading = true;
    this.api.getConfiguracion().subscribe({
      next: (res) => {
        this.config = res;
        this.logoUrl = res.tieneLogo ? `${this.API_URL}/configuracion/logo?t=${new Date().getTime()}` : null;
        this.tieneApk = res.tieneApk;
        this.apkNombre = res.apkNombre || null;
        this.apkVersion = res.apkVersion || null;
        this.apkVersionInput = res.apkVersion || '';
        this.apkDownloadUrl = `${this.API_URL}/configuracion/apk?t=${new Date().getTime()}`;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar la configuración';
        this.loading = false;
      }
    });
  }

  onLogoSelected(event: any): void {
    this.selectedLogo = event.target.files?.[0] || null;
  }

  uploadLogo(): void {
    if (!this.selectedLogo) return;
    this.uploading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.api.uploadLogo(this.selectedLogo).subscribe({
      next: () => {
        this.uploading = false;
        this.selectedLogo = null;
        this.successMsg = 'Logo actualizado correctamente';
        this.logoUrl = `${this.API_URL}/configuracion/logo?t=${new Date().getTime()}`;
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || 'Error al subir el logo';
      }
    });
  }

  deleteLogo(): void {
    this.uploading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.api.deleteLogo().subscribe({
      next: () => {
        this.uploading = false;
        this.logoUrl = null;
        this.successMsg = 'Logo eliminado correctamente';
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || 'Error al eliminar el logo';
      }
    });
  }

  saveConfig(): void {
    this.saving = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.api.updateConfiguracion(this.config).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Configuración guardada correctamente';
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error?.message || 'Error al guardar la configuración';
      }
    });
  }

  // APK methods
  getApkDownloadUrl(): string {
    return `${this.API_URL}/configuracion/apk?t=${new Date().getTime()}`;
  }

  getManualUrl(): string {
    return `${this.API_URL}/configuracion/manual?t=${new Date().getTime()}`;
  }

  onApkSelected(event: any): void {
    this.selectedApk = event.target.files?.[0] || null;
  }

  uploadApk(): void {
    if (!this.selectedApk) return;
    this.uploadingApk = true;
    this.errorMsg = '';
    this.successMsg = '';
    const version = this.apkVersionInput.trim() || '1.0.0';
    this.api.uploadApk(this.selectedApk, version).subscribe({
      next: (res) => {
        this.uploadingApk = false;
        this.selectedApk = null;
        this.tieneApk = true;
        this.apkNombre = res.apkNombre || 'app.apk';
        this.apkVersion = res.apkVersion || version;
        this.apkVersionInput = this.apkVersion || '';
        this.successMsg = 'APK subido correctamente';
      },
      error: (err) => {
        this.uploadingApk = false;
        this.errorMsg = err.error?.message || 'Error al subir el APK';
      }
    });
  }

  deleteApk(): void {
    if (!confirm('¿Eliminar el archivo APK?')) return;
    this.uploadingApk = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.api.deleteApk().subscribe({
      next: () => {
        this.uploadingApk = false;
        this.tieneApk = false;
        this.apkNombre = null;
        this.apkVersion = null;
        this.apkVersionInput = '';
        this.successMsg = 'APK eliminado correctamente';
      },
      error: (err) => {
        this.uploadingApk = false;
        this.errorMsg = err.error?.message || 'Error al eliminar el APK';
      }
    });
  }

  // APK version list methods
  loadApkVersions(): void {
    this.apkVersionsLoading = true;
    this.api.getApkVersions().subscribe({
      next: (res) => { this.apkVersions = res; this.apkVersionsLoading = false; },
      error: () => { this.apkVersionsLoading = false; }
    });
  }

  onApkVersionFileSelected(event: any): void {
    this.apkVersionFile = event.target.files?.[0] || null;
  }

  uploadNewApkVersion(): void {
    if (!this.apkVersionFile || !this.apkVersionUploadVersion.trim()) return;
    this.apkVersionUploading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.api.uploadApkVersion(this.apkVersionFile, this.apkVersionUploadVersion.trim()).subscribe({
      next: () => {
        this.apkVersionUploading = false;
        this.apkVersionFile = null;
        this.apkVersionUploadVersion = '';
        this.successMsg = 'Versión APK subida correctamente';
        this.loadApkVersions();
      },
      error: (err) => {
        this.apkVersionUploading = false;
        this.errorMsg = err.error?.message || 'Error al subir versión APK';
      }
    });
  }

  deleteApkVersionItem(id: number): void {
    if (!confirm('¿Eliminar esta versión APK?')) return;
    this.api.deleteApkVersion(id).subscribe({
      next: () => {
        this.successMsg = 'Versión APK eliminada correctamente';
        this.loadApkVersions();
      },
      error: (err) => { this.errorMsg = err.error?.message || 'Error al eliminar'; }
    });
  }

  getApkVersionDownloadUrl(id: number): string {
    return this.api.getApkVersionDownloadUrl(id);
  }

  // Carousel methods
  loadCarousel(): void {
    this.carouselLoading = true;
    this.api.getCarouselImages().subscribe({
      next: (res) => { this.carouselImages = res; this.carouselLoading = false; },
      error: () => { this.carouselLoading = false; }
    });
  }

  getCarouselImageUrl(id: number): string {
    return `${this.API_URL}/carousel/${id}/image`;
  }

  setCarouselFile(file: File | null): void {
    this.carouselFile = file;
    if (this.carouselPreviewUrl) { URL.revokeObjectURL(this.carouselPreviewUrl); this.carouselPreviewUrl = null; }
    if (file) this.carouselPreviewUrl = URL.createObjectURL(file);
  }

  onCarouselFileSelected(event: any): void {
    this.setCarouselFile(event.target.files?.[0] || null);
  }

  onCarouselDrop(event: DragEvent): void {
    event.preventDefault();
    this.carouselDragOver = false;
    this.setCarouselFile(event.dataTransfer?.files?.[0] || null);
  }

  clearCarouselFile(): void {
    this.setCarouselFile(null);
  }

  uploadCarouselImage(): void {
    if (!this.carouselFile || !this.carouselCaption.trim()) return;
    this.uploading = true;
    this.errorMsg = '';
    this.successMsg = '';
    const nextOrden = this.carouselImages.length > 0 ? Math.max(...this.carouselImages.map(i => i.orden)) + 1 : 1;
    this.api.uploadCarouselImage(this.carouselFile, this.carouselCaption, nextOrden).subscribe({
      next: () => {
        this.uploading = false;
        this.setCarouselFile(null);
        this.carouselCaption = '';
        this.successMsg = 'Imagen del carrusel subida correctamente';
        this.loadCarousel();
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || 'Error al subir imagen';
      }
    });
  }

  startEditCarousel(img: CarouselImage): void {
    this.editingCarouselId = img.id;
    this.editCaption = img.caption;
    this.editOrden = img.orden;
  }

  cancelEditCarousel(): void {
    this.editingCarouselId = null;
  }

  saveCarouselEdit(id: number): void {
    if (!this.editCaption.trim()) return;
    this.api.updateCarouselImage(id, { caption: this.editCaption, orden: this.editOrden }).subscribe({
      next: () => {
        this.editingCarouselId = null;
        this.successMsg = 'Imagen actualizada correctamente';
        this.loadCarousel();
      },
      error: (err) => { this.errorMsg = err.error?.message || 'Error al actualizar'; }
    });
  }

  deleteCarouselImage(id: number): void {
    if (!confirm('¿Eliminar esta imagen del carrusel?')) return;
    this.api.deleteCarouselImage(id).subscribe({
      next: () => {
        this.successMsg = 'Imagen eliminada correctamente';
        this.loadCarousel();
      },
      error: (err) => { this.errorMsg = err.error?.message || 'Error al eliminar'; }
    });
  }

  // Permisos
  loadRoles(): void {
    this.api.getRoles().subscribe({
      next: (res) => { this.roles = res; },
      error: () => {}
    });
  }

  loadPermisos(): void {
    this.permisosLoading = true;
    this.api.getPermisos().subscribe({
      next: (res) => { this.permisos = res; this.permisosLoading = false; },
      error: () => { this.permisosLoading = false; }
    });
  }

  getPermiso(rolId: number, modulo: string): RolPermiso | undefined {
    return this.permisos.find(p => p.rolId === rolId && p.modulo === modulo);
  }

  togglePermiso(permiso: RolPermiso | undefined, campo: 'puedeCrear' | 'puedeEditar' | 'puedeEliminar' | 'puedeVer'): void {
    if (!permiso) return;
    (permiso as any)[campo] = !(permiso as any)[campo];
  }

  savePermisos(): void {
    this.permisosSaving = true;
    this.errorMsg = '';
    this.successMsg = '';
    let completed = 0;
    const total = this.permisos.length;
    this.permisos.forEach(p => {
      this.api.updatePermiso(p.id, {
        rolId: p.rolId,
        modulo: p.modulo,
        puedeVer: p.puedeVer,
        puedeCrear: p.puedeCrear,
        puedeEditar: p.puedeEditar,
        puedeEliminar: p.puedeEliminar
      }).subscribe({
        next: () => {
          completed++;
          if (completed === total) {
            this.permisosSaving = false;
            this.successMsg = 'Permisos guardados correctamente';
          }
        },
        error: () => {
          completed++;
          this.errorMsg = 'Error al guardar algunos permisos';
          if (completed === total) this.permisosSaving = false;
        }
      });
    });
  }
}
