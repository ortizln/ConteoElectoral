import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

/**
 * Resultados públicos: misma visualización del dashboard, sin autenticación.
 * El modo `publico` desactiva descargas, fotos de acta, mesas cerradas y acciones.
 */
@Component({
  selector: 'app-resultados-publicos',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  template: '<app-dashboard [publico]="true"></app-dashboard>'
})
export class ResultadosPublicosComponent {}
