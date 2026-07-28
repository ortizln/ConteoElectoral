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
  formData: any = {
    eleccionId: null, cargoId: null, partidoId: null,
    circunscripcionTipo: 'NACIONAL', circunscripcionId: null,
    numeroLista: null, nombre: ''
  };

  filtroCandidato = '';

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
    if (lista) {
      this.editando = true;
      this.formData = {
        eleccionId: this.selectedEleccion?.id,
        cargoId: lista.cargoId,
        partidoId: lista.partidoId,
        circunscripcionTipo: lista.circunscripcionTipo || 'NACIONAL',
        circunscripcionId: lista.circunscripcionId,
        numeroLista: lista.numeroLista,
        nombre: lista.nombre
      };
    } else {
      this.editando = false;
      this.formData = {
        eleccionId: this.selectedEleccion?.id,
        cargoId: null, partidoId: null,
        circunscripcionTipo: 'NACIONAL', circunscripcionId: null,
        numeroLista: null, nombre: ''
      };
    }
    this.showForm = true;
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
