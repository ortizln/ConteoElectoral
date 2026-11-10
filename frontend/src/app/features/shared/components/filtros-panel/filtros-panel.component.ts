import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Panel de filtros colapsable reutilizable.
 * Inicia minimizado y recuerda el estado (abierto/cerrado) por `clave`
 * en localStorage, así cada página mantiene su propia preferencia.
 *
 * Uso:
 *   <app-filtros-panel titulo="Filtros" clave="mesas" [activos]="2">
 *     <div class="filter-item">...</div>
 *   </app-filtros-panel>
 */
@Component({
  selector: 'app-filtros-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtros-panel.component.html',
  styleUrl: './filtros-panel.component.css'
})
export class FiltrosPanelComponent implements OnInit {
  /** Título visible en la cabecera del panel */
  @Input() titulo = 'Filtros';
  /** Clave única por página para persistir el estado de expansión */
  @Input() clave = 'default';
  /** Número de filtros activos (muestra un badge cuando es mayor que 0) */
  @Input() activos = 0;

  abierto = false;

  ngOnInit(): void {
    // Por defecto inicia minimizado; solo se expande si el usuario lo dejó así
    this.abierto = localStorage.getItem('filtros-panel:' + this.clave) === '1';
  }

  toggle(): void {
    this.abierto = !this.abierto;
    try {
      localStorage.setItem('filtros-panel:' + this.clave, this.abierto ? '1' : '0');
    } catch { /* sin persistencia si localStorage no está disponible */ }
  }
}
