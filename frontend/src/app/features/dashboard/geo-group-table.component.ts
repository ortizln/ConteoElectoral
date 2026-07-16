import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoGroup } from '../../core/models';

@Component({
  selector: 'geo-group-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="detalle-tabla-wrapper">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ title }}</th>
            <th class="text-right">Votos</th>
            <th class="text-right">%</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items; let i = index">
            <td>{{ i + 1 }}</td>
            <td><strong>{{ item.nombre }}</strong></td>
            <td class="text-right">{{ item.votos | number }}</td>
            <td class="text-right"><span class="porcentaje-badge">{{ item.porcentaje | number:'1.1-1' }}%</span></td>
          </tr>
          <tr *ngIf="items.length === 0">
            <td colspan="4" class="text-center py-3">Sin datos</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class GeoGroupTableComponent {
  @Input() items: GeoGroup[] = [];
  @Input() title = '';
}
