import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Usuario, Mesa } from '../../../../core/models';

@Component({
  selector: 'app-asignar-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-mesas.component.html',
  styleUrl: './asignar-mesas.component.css'
})
export class AsignarMesasComponent implements OnInit {
  elecciones: Eleccion[] = [];
  miembros: Usuario[] = [];
  mesasDisponibles: any[] = [];
  mesasAsignadas: any[] = [];
  todasMesas: any[] = [];
  eleccionId: number | null = null;
  usuarioId: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEleccionesActivas().subscribe((e: Eleccion[]) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.eleccionId = e[0].id;
        this.onEleccionChange();
      }
    });
    this.api.getUsuariosByRol('MIEMBRO_MESA').subscribe((m: Usuario[]) => this.miembros = m);
  }

  onEleccionChange(): void {
    if (this.eleccionId) {
      this.api.getMesasByEleccion(this.eleccionId).subscribe((mesas: any[]) => {
        this.todasMesas = mesas;
        if (this.usuarioId) {
          this.onUsuarioChange();
        }
      });
    }
  }

  onUsuarioChange(): void {
    if (this.usuarioId && this.eleccionId) {
      this.api.getMesasByEleccion(this.eleccionId).subscribe((mesas: any[]) => {
        this.todasMesas = mesas;
        this.mesasDisponibles = mesas.filter((m: any) => m.usuarioId == null && !m.cerrada);
        this.api.getMesasByUsuario(this.usuarioId!, this.eleccionId!).subscribe((asignadas: any[]) => {
          this.mesasAsignadas = asignadas;
        });
      });
    } else {
      this.mesasAsignadas = [];
      this.mesasDisponibles = [];
    }
  }

  asignarMesa(mesa: any): void {
    if (this.usuarioId) {
      this.api.asignarUsuarioAMesa(mesa.id, this.usuarioId).subscribe({
        next: () => this.onUsuarioChange(),
        error: (err) => alert(err.error?.message || 'Error al asignar la mesa')
      });
    }
  }

  desasignarMesa(mesa: any): void {
    if (this.usuarioId && confirm('Quitar asignacion de esta mesa?')) {
      this.api.desasignarUsuarioDeMesa(mesa.id, this.usuarioId).subscribe(() => {
        this.onUsuarioChange();
      });
    }
  }

  getMiembroSeleccionado(): Usuario | undefined {
    return this.miembros.find(m => m.id === this.usuarioId);
  }
}