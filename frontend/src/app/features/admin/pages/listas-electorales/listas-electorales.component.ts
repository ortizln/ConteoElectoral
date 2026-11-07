import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-listas-electorales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listas-electorales.component.html',
  styleUrl: './listas-electorales.component.css'
})
export class ListasElectoralesComponent implements OnInit {
  elecciones: any[] = [];
  selectedEleccion: any = null;
  listas: any[] = [];
  listaDetalle: any = null;
  partidos: any[] = [];
  cargos: any[] = [];
  candidatos: any[] = [];
  candidatosDisponibles: any[] = [];

  showForm = false;
  editando = false;
  editandoId: number | null = null;
  formData: any = {
    eleccionId: null, cargoId: null, partidoId: null,
    circunscripcionTipo: 'NACIONAL', circunscripcionId: null,
    numeroLista: null, nombre: ''
  };

  filtroCandidato = '';

  // Miniaturas de logo en caché (blob)
  private logoThumbCache = new Map<number, string>();
  logoThumb(id: number): string {
    let url = this.logoThumbCache.get(id);
    if (url === undefined) {
      this.logoThumbCache.set(id, '');
      this.api.getLogoListaBlob(id).subscribe({
        next: (blob) => this.logoThumbCache.set(id, URL.createObjectURL(blob)),
        error: () => this.logoThumbCache.set(id, '')
      });
      return '';
    }
    return url;
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getElecciones().subscribe(data => this.elecciones = data);
  }

  selectEleccion(e: any) {
    this.selectedEleccion = e;
    this.listaDetalle = null;
    this.loadListas();
    this.api.getPartidosByEleccion(e.id).subscribe(p => this.partidos = p);
    this.api.getCargosByEleccion(e.id).subscribe(c => this.cargos = c);
    this.api.getCandidatosByEleccion(e.id).subscribe(c => this.candidatos = c);
  }

  loadListas() {
    if (!this.selectedEleccion) return;
    this.api.getListasByEleccion(this.selectedEleccion.id).subscribe(data => {
      this.listas = data;
    });
  }

  verDetalle(id: number) {
    this.api.getListaDetalle(id).subscribe(data => {
      this.listaDetalle = data;
      this.actualizarDisponibles();
    });
  }

  actualizarDisponibles() {
    if (!this.listaDetalle) return;
    const enLista = this.listaDetalle.candidatos?.map((c: any) => c.id) || [];
    this.candidatosDisponibles = this.candidatos
      .filter((c: any) =>
        c.cargoId === this.listaDetalle.cargoId &&
        c.partidoId === this.listaDetalle.partidoId &&
        !enLista.includes(c.id)
      );
  }

  openForm(lista?: any) {
    this.logoPreview = '';
    this.logoUploading = false;
    if (lista) {
      this.editando = true;
      this.editandoId = lista.id;
      this.formData = {
        eleccionId: this.selectedEleccion?.id,
        cargoId: lista.cargoId,
        partidoId: lista.partidoId,
        circunscripcionTipo: lista.circunscripcionTipo || 'NACIONAL',
        circunscripcionId: lista.circunscripcionId,
        numeroLista: lista.numeroLista,
        nombre: lista.nombre
      };
      if (lista.tieneLogo) {
        this.api.getLogoListaBlob(lista.id).subscribe({
          next: (blob) => { this.logoPreview = URL.createObjectURL(blob); }
        });
      }
    } else {
      this.editando = false;
      this.editandoId = null;
      this.formData = {
        eleccionId: this.selectedEleccion?.id,
        cargoId: null, partidoId: null,
        circunscripcionTipo: 'NACIONAL', circunscripcionId: null,
        numeroLista: null, nombre: ''
      };
    }
    this.showForm = true;
  }

  cerrarForm() {
    this.showForm = false;
    if (this.logoPreview.startsWith('blob:')) URL.revokeObjectURL(this.logoPreview);
    this.logoPreview = '';
  }

  // Logo de la lista (se sube de inmediato al elegir el archivo)
  logoPreview = '';
  logoUploading = false;

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    if (!file || !this.editandoId) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar los 5 MB');
      input.value = '';
      return;
    }
    this.logoUploading = true;
    this.api.subirLogoLista(this.editandoId, file).subscribe({
      next: () => {
        this.logoUploading = false;
        if (this.logoPreview.startsWith('blob:')) URL.revokeObjectURL(this.logoPreview);
        this.logoPreview = URL.createObjectURL(file);
        this.loadListas();
      },
      error: (err) => {
        this.logoUploading = false;
        alert(err.error?.message || 'Error al subir el logo');
      }
    });
    input.value = '';
  }

  eliminarLogo() {
    if (!this.editandoId) return;
    this.api.eliminarLogoLista(this.editandoId).subscribe({
      next: () => {
        if (this.logoPreview.startsWith('blob:')) URL.revokeObjectURL(this.logoPreview);
        this.logoPreview = '';
        this.loadListas();
      },
      error: () => alert('Error al eliminar el logo')
    });
  }

  guardarLista() {
    const req = { ...this.formData, eleccionId: this.selectedEleccion.id };
    if (this.editando) {
      this.api.actualizarListaElectoral(this.listaDetalle.id, req).subscribe(() => {
        this.loadListas();
        this.verDetalle(this.listaDetalle.id);
        this.showForm = false;
      });
    } else {
      this.api.crearListaElectoral(req).subscribe(() => {
        this.loadListas();
        this.showForm = false;
      });
    }
  }

  agregarCandidato(c: any) {
    if (!this.listaDetalle) return;
    this.api.asignarListaCandidato(c.id, this.listaDetalle.id).subscribe(() => {
      this.verDetalle(this.listaDetalle.id);
    });
  }

  quitarCandidato(c: any) {
    if (!this.listaDetalle) return;
    this.api.asignarListaCandidato(c.id, null).subscribe(() => {
      this.verDetalle(this.listaDetalle.id);
    });
  }

  get candidatosDisponiblesFiltrados(): any[] {
    if (!this.filtroCandidato) return this.candidatosDisponibles;
    const q = this.filtroCandidato.toLowerCase();
    return this.candidatosDisponibles.filter((c: any) =>
      c.nombreCompleto?.toLowerCase().includes(q) ||
      c.cargoNombre?.toLowerCase().includes(q)
    );
  }

  getCargoNombre(id: number): string {
    return this.cargos.find(c => c.id === id)?.nombre || '-';
  }

  getPartidoNombre(id: number): string {
    return this.partidos.find(p => p.id === id)?.nombre || 'Independiente';
  }

  getPartidoSigla(id: number): string {
    return this.partidos.find(p => p.id === id)?.sigla || '';
  }
}
