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

  showForm = false;
  formData: any = {
    eleccionId: null, cargoId: null, partidoId: null,
    circunscripcionTipo: '', circunscripcionId: null,
    numeroLista: null, nombre: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getElecciones().subscribe(data => this.elecciones = data);
  }

  selectEleccion(e: any) {
    this.selectedEleccion = e;
    this.loadListas();
    this.api.getPartidosByEleccion(e.id).subscribe(p => this.partidos = p);
    this.api.getCargosByEleccion(e.id).subscribe(c => this.cargos = c);
  }

  loadListas() {
    if (!this.selectedEleccion) return;
    this.api.getListasByEleccion(this.selectedEleccion.id).subscribe(data => {
      this.listas = data;
      this.listaDetalle = null;
    });
  }

  verDetalle(id: number) {
    this.api.getListaDetalle(id).subscribe(data => this.listaDetalle = data);
  }

  openForm() {
    this.formData = {
      eleccionId: this.selectedEleccion?.id,
      cargoId: null, partidoId: null,
      circunscripcionTipo: 'NACIONAL', circunscripcionId: null,
      numeroLista: null, nombre: ''
    };
    this.showForm = true;
  }

  crearLista() {
    this.formData.eleccionId = this.selectedEleccion?.id;
    this.api.crearListaElectoral(this.formData).subscribe(() => {
      this.loadListas();
      this.showForm = false;
    });
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
