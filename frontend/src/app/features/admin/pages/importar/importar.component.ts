import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
}
