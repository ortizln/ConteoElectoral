import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-papeletas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './papeletas.component.html',
  styleUrl: './papeletas.component.css'
})
export class PapeletasComponent implements OnInit {
  elecciones: any[] = [];
  selectedEleccion: any = null;
  papeletas: any[] = [];
  loading = false;
  generando = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getElecciones().subscribe(data => this.elecciones = data);
  }

  selectEleccion(eleccion: any) {
    this.selectedEleccion = eleccion;
    this.loadPapeletas();
  }

  loadPapeletas() {
    if (!this.selectedEleccion) return;
    this.loading = true;
    this.api.getPapeletasByEleccion(this.selectedEleccion.id).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  generar() {
    if (!this.selectedEleccion) return;
    this.generando = true;
    this.api.generarPapeletas(this.selectedEleccion.id).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.generando = false;
      },
      error: () => this.generando = false
    });
  }

  regenerar() {
    if (!this.selectedEleccion || !confirm('¿Regenerar todas las papeletas? Se perderán los cambios manuales.')) return;
    this.generando = true;
    this.api.regenerarPapeletas(this.selectedEleccion.id).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.generando = false;
      },
      error: () => this.generando = false
    });
  }

  getOptionIcon(tipo: string): string {
    switch (tipo) {
      case 'CANDIDATO': return 'bi-person-badge';
      case 'PARTIDO': return 'bi-people';
      case 'NULO': return 'bi-x-circle';
      case 'BLANCO': return 'bi-square';
      default: return 'bi-question-circle';
    }
  }
}
