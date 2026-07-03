import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-importar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './importar.component.html',
  styleUrl: './importar.component.css'
})
export class ImportarComponent {
  selectedFile: File | null = null;
  importing = false;
  result: any = null;
  errorMessage = '';

  constructor(private api: ApiService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
    this.result = null;
    this.errorMessage = '';
  }

  importar(): void {
    if (!this.selectedFile) return;
    this.importing = true;
    this.result = null;
    this.errorMessage = '';

    this.api.importarExcel(this.selectedFile).subscribe({
      next: (res) => {
        this.result = res;
        this.importing = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al importar el archivo';
        this.importing = false;
      }
    });
  }

  descargarTemplate(): void {
    const header = ['zona', 'provincia', 'canton', 'parroquia', 'institucion'];
    const exampleRow = ['Zona 1', 'Pichincha', 'Quito', 'La Mariscal', 'Unidad Educativa Central'];
    const data: any[][] = [header, exampleRow];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = header.map(() => ({ wch: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plantilla');
    XLSX.writeFile(wb, 'plantilla_importacion.xlsx');
  }
}
