import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Reconteo, Impugnacion, Observacion, Resolucion, EscrutinioResumen } from '../../../../core';

@Component({
  selector: 'app-escrutinio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './escrutinio.component.html'
})
export class EscrutinioComponent implements OnInit {
  activeTab = 'reconteos';
  elecciones: any[] = [];
  selectedEleccionId = 0;
  resumen: EscrutinioResumen = { reconteosPendientes: 0, impugnacionesPendientes: 0, totalObservaciones: 0, totalResoluciones: 0 };

  reconteos: Reconteo[] = [];
  impugnaciones: Impugnacion[] = [];
  observaciones: Observacion[] = [];
  resoluciones: Resolucion[] = [];

  showModal = false;
  modalType = '';
  editing = false;
  reconteoForm: Partial<Reconteo> = {};
  impugnacionForm: Partial<Impugnacion> = {};
  observacionForm: Partial<Observacion> = {};
  resolucionForm: Partial<Resolucion> = {};

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getElecciones().subscribe(data => {
      this.elecciones = data;
      if (data.length > 0) {
        this.selectedEleccionId = data[0].id!;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.api.getEscrutinioResumen().subscribe(r => this.resumen = r);
    if (this.selectedEleccionId) {
      this.api.getReconteos(this.selectedEleccionId).subscribe(r => this.reconteos = r);
      this.api.getImpugnaciones(this.selectedEleccionId).subscribe(r => this.impugnaciones = r);
      this.api.getObservaciones(this.selectedEleccionId).subscribe(r => this.observaciones = r);
    }
    this.api.getResoluciones().subscribe(r => this.resoluciones = r);
  }

  openReconteo(): void {
    this.modalType = 'reconteo';
    this.reconteoForm = { mesaId: undefined, motivo: '', solicitadoPor: '' };
    this.showModal = true;
  }

  openImpugnacion(): void {
    this.modalType = 'impugnacion';
    this.impugnacionForm = { tipo: 'VOTO', descripcion: '', solicitante: '' };
    this.showModal = true;
  }

  openObservacion(): void {
    this.modalType = 'observacion';
    this.observacionForm = { tipo: 'OBSERVACION', descripcion: '' };
    this.showModal = true;
  }

  openResolucion(): void {
    this.modalType = 'resolucion';
    this.resolucionForm = { codigo: '', titulo: '', resueltoPor: '', detalle: '' };
    this.showModal = true;
  }

  saveReconteo(): void {
    if (!this.reconteoForm.motivo || !this.reconteoForm.solicitadoPor) return;
    this.api.createReconteo(this.reconteoForm).subscribe(() => {
      this.showModal = false; this.loadData();
    });
  }

  saveImpugnacion(): void {
    if (!this.impugnacionForm.descripcion || !this.impugnacionForm.solicitante) return;
    this.api.createImpugnacion(this.impugnacionForm).subscribe(() => {
      this.showModal = false; this.loadData();
    });
  }

  saveObservacion(): void {
    if (!this.observacionForm.descripcion) return;
    this.api.createObservacion(this.observacionForm).subscribe(() => {
      this.showModal = false; this.loadData();
    });
  }

  saveResolucion(): void {
    if (!this.resolucionForm.codigo || !this.resolucionForm.titulo || !this.resolucionForm.resueltoPor) return;
    this.api.createResolucion(this.resolucionForm).subscribe(() => {
      this.showModal = false; this.loadData();
    });
  }

  updateReconteoEstado(id: number, estado: string): void {
    this.api.updateReconteoEstado(id, estado).subscribe(() => this.loadData());
  }

  updateImpugnacionEstado(id: number, estado: string): void {
    this.api.updateImpugnacionEstado(id, estado).subscribe(() => this.loadData());
  }

  getBadgeClass(estado: string): string {
    const map: Record<string, string> = {
      'PENDIENTE': 'bg-warning', 'EN_PROCESO': 'bg-info', 'EN_REVISION': 'bg-info',
      'COMPLETADO': 'bg-success', 'APROBADA': 'bg-success',
      'RECHAZADO': 'bg-danger', 'RECHAZADA': 'bg-danger'
    };
    return map[estado] || 'bg-secondary';
  }
}
