import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

/**
 * Resultados para el perfil VISITANTE: misma visualización del dashboard, pero
 * con sesión obligatoria. El modo `publico` desactiva descargas, fotos de acta,
 * mesas cerradas y cualquier acción de manipulación.
 */
@Component({
  selector: 'app-resultados-publicos',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  template: '<app-dashboard [publico]="true"></app-dashboard>'
})
export class ResultadosPublicosComponent {}
