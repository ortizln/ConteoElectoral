import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-tipos-eleccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipos-eleccion.component.html',
  styleUrl: './tipos-eleccion.component.css'
})
export class TiposEleccionComponent implements OnInit {
  tipos: any[] = [];
  cargosDisponibles: any[] = [];
  cargosAsignados: any[] = [];
  selectedTipo: any = null;
  nuevoTipo = { nombre: '', descripcion: '' };
  cargoToAdd: any = {};
  showNuevoTipo = false;
  showAsignarCargo = false;

  editingTipo: any = null;
  editTipoForm = { nombre: '', descripcion: '' };
  showEditarTipo = false;

  editandoOrdenId: number | null = null;
  nuevoOrden: number = 0;
  selectedCargoInfo: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTipos();
    this.api.getCargos().subscribe(cargos => this.cargosDisponibles = cargos);
  }

  loadTipos() {
    this.api.getTiposEleccion().subscribe(data => this.tipos = data);
  }

  selectTipo(tipo: any) {
    this.selectedTipo = tipo;
    this.loadCargosAsignados();
  }

  loadCargosAsignados() {
    if (!this.selectedTipo) return;
    this.api.getCargosByTipoEleccion(this.selectedTipo.id).subscribe(data => {
      this.cargosAsignados = data;
    });
  }

  crearTipo() {
    this.api.createTipoEleccion(this.nuevoTipo).subscribe(() => {
      this.loadTipos();
      this.nuevoTipo = { nombre: '', descripcion: '' };
      this.showNuevoTipo = false;
    });
  }

  openEditarTipo() {
    if (!this.selectedTipo) return;
    this.editingTipo = this.selectedTipo;
    this.editTipoForm = { nombre: this.selectedTipo.nombre, descripcion: this.selectedTipo.descripcion };
    this.showEditarTipo = true;
  }

  guardarEditarTipo() {
    if (!this.editingTipo) return;
    this.api.updateTipoEleccion(this.editingTipo.id, this.editTipoForm).subscribe(() => {
      this.loadTipos();
      this.showEditarTipo = false;
      this.editingTipo = null;
      const updated = this.tipos.find(t => t.id === this.selectedTipo?.id);
      if (updated) this.selectedTipo = updated;
    });
  }

  openAsignarCargo() {
    this.cargoToAdd = { cargoId: null, orden: 0 };
    this.showAsignarCargo = true;
  }

  asignarCargo() {
    if (!this.cargoToAdd.cargoId) return;
    this.api.addCargoToTipoEleccion(this.selectedTipo.id, this.cargoToAdd).subscribe(() => {
      this.loadCargosAsignados();
      this.showAsignarCargo = false;
    });
  }

  removerCargo(id: number) {
    this.api.removeCargoFromTipoEleccion(id).subscribe(() => this.loadCargosAsignados());
  }

  startEditarOrden(ca: any) {
    this.editandoOrdenId = ca.id;
    this.nuevoOrden = ca.orden;
  }

  guardarOrden(id: number) {
    this.api.updateCargoOrdenInTipoEleccion(id, { orden: this.nuevoOrden }).subscribe(() => {
      this.editandoOrdenId = null;
      this.loadCargosAsignados();
    });
  }

  cancelarEditarOrden() {
    this.editandoOrdenId = null;
  }

  getCargoInfo(cargoId: number): any {
    return this.cargosDisponibles.find(c => c.id === cargoId);
  }

  getTipoVotacionLabel(tv: string): string {
    const labels: any = {
      INDIVIDUAL: 'Individual',
      LISTA: 'Lista',
      PLURINOMINAL: 'Plurinominal',
      PREFERENCIAL: 'Preferencial',
      MIXTO: 'Mixto'
    };
    return labels[tv] || tv;
  }
}
