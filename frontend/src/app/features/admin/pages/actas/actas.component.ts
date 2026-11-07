import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, MesaActaFotosDeMesa, MesaActaFoto } from '../../../../core/models';

/**
 * Página "Actas" (ADMIN/SUPERVISOR): lista todas las mesas de la elección
 * con sus fotos del acta para revisión rápida. Las mesas sin foto se marcan
 * para identificar cuáles cerraron sin respaldo.
 */
@Component({
  selector: 'app-actas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent implements OnInit, OnDestroy {
  elecciones: Eleccion[] = [];
  selectedEleccionId: number | null = null;
  mesas: MesaActaFotosDeMesa[] = [];
  loading = false;
  searchText = '';
  filtro: 'todas' | 'con-foto' | 'sin-foto' = 'todas';

  visorUrl: string | null = null;
  visorInfo = '';

  private thumbCache = new Map<number, string>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((data: Eleccion[]) => {
      this.elecciones = data;
      if (data.length > 0) {
        this.selectedEleccionId = data[0].id;
        this.load();
      }
    });
  }

  ngOnDestroy(): void {
    this.limpiarThumbs();
    this.cerrarVisor();
  }

  onEleccionChange(): void {
    this.limpiarThumbs();
    this.load();
  }

  load(): void {
    if (!this.selectedEleccionId) return;
    this.loading = true;
    this.api.getActaFotosPorEleccion(this.selectedEleccionId).subscribe({
      next: (data) => { this.mesas = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get mesasFiltradas(): MesaActaFotosDeMesa[] {
    const q = this.searchText.trim().toLowerCase();
    return this.mesas.filter(m => {
      if (this.filtro === 'con-foto' && (m.fotos?.length || 0) === 0) return false;
      if (this.filtro === 'sin-foto' && (m.fotos?.length || 0) > 0) return false;
      if (!q) return true;
      return (m.mesaNumero || '').toLowerCase().includes(q) ||
        (m.institucionNombre || '').toLowerCase().includes(q) ||
        (m.parroquiaNombre || '').toLowerCase().includes(q);
    });
  }

  get totalConFoto(): number {
    return this.mesas.filter(m => (m.fotos?.length || 0) > 0).length;
  }

  get totalSinFoto(): number {
    return this.mesas.filter(m => (m.fotos?.length || 0) === 0).length;
  }

  /** Miniatura en caché (blob) de una foto */
  thumbUrl(foto: MesaActaFoto): string {
    let url = this.thumbCache.get(foto.id);
    if (url === undefined) {
      this.thumbCache.set(foto.id, '');
      this.api.getActaFotoBlob(foto.mesaId, foto.id).subscribe({
        next: (blob) => {
          this.thumbCache.set(foto.id, URL.createObjectURL(blob));
        },
        error: () => this.thumbCache.set(foto.id, '')
      });
      return '';
    }
    return url;
  }

  abrirVisor(foto: MesaActaFoto, mesa: MesaActaFotosDeMesa): void {
    this.api.getActaFotoBlob(foto.mesaId, foto.id).subscribe({
      next: (blob) => {
        this.visorUrl = URL.createObjectURL(blob);
        this.visorInfo = `Mesa ${mesa.mesaNumero} — ${mesa.institucionNombre || ''}` +
          (foto.subidoPorNombre ? ` · Subida por ${foto.subidoPorNombre}` : '') +
          (foto.createdAt ? ` · ${foto.createdAt}` : '');
      }
    });
  }

  cerrarVisor(): void {
    if (this.visorUrl) {
      URL.revokeObjectURL(this.visorUrl);
      this.visorUrl = null;
      this.visorInfo = '';
    }
  }

  private limpiarThumbs(): void {
    for (const url of this.thumbCache.values()) {
      if (url) URL.revokeObjectURL(url);
    }
    this.thumbCache.clear();
  }
}
