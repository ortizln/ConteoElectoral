import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Eleccion, Candidato, DatoGeografico } from '../../../../core/models';
import { PROVINCIAS_ECUADOR, ProvinciaCoords } from '../../../../core/data/ecuador-provincias';
import L from 'leaflet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-geografico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-geografico.component.html',
  styleUrl: './dashboard-geografico.component.css'
})
export class DashboardGeograficoComponent implements OnInit, OnDestroy, AfterViewInit {
  elecciones: Eleccion[] = [];
  candidatos: Candidato[] = [];
  selectedEleccionId: number | null = null;
  selectedCandidatoId: number | null = null;
  loading = false;
  nivel: 'provincia' | 'canton' | 'parroquia' = 'provincia';
  tituloNivel = 'Provincias';
  items: DatoGeografico[] = [];
  totalVotos = 0;
  selectedItem: DatoGeografico | null = null;
  provinciaRef: ProvinciaCoords | null = null;
  private map?: L.Map;
  private markersLayer?: L.LayerGroup;
  private subs: Subscription[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.subs.push(this.api.getEleccionesActivas().subscribe(elecciones => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        this.selectedEleccionId = elecciones[0].id;
        this.loadCandidatos();
        this.loadData();
      }
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 200);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.map?.remove();
  }

  loadCandidatos(): void {
    if (this.selectedEleccionId) {
      this.subs.push(this.api.getCandidatosByEleccion(this.selectedEleccionId).subscribe(c => this.candidatos = c));
    }
  }

  onEleccionChange(): void {
    this.selectedCandidatoId = null;
    this.nivel = 'provincia';
    this.tituloNivel = 'Provincias';
    this.selectedItem = null;
    this.provinciaRef = null;
    this.loadCandidatos();
    this.loadData();
  }

  onCandidatoChange(): void {
    this.nivel = 'provincia';
    this.tituloNivel = 'Provincias';
    this.selectedItem = null;
    this.provinciaRef = null;
    this.loadData();
  }

  loadData(): void {
    if (!this.selectedEleccionId) return;
    this.loading = true;
    const candId = this.selectedCandidatoId ?? undefined;

    if (this.nivel === 'provincia') {
      this.subs.push(this.api.getGeoProvincias(this.selectedEleccionId, candId).subscribe(res => {
        this.totalVotos = res.totalVotos;
        this.items = res.items;
        this.updateMap();
        this.loading = false;
      }));
    } else if (this.nivel === 'canton' && this.selectedItem) {
      const provId = this.selectedItem.id;
      this.subs.push(this.api.getGeoCantonesByProvincia(this.selectedEleccionId, provId, candId).subscribe(items => {
        this.items = items;
        this.totalVotos = items.reduce((s, i) => s + i.totalVotos, 0);
        this.updateMap();
        this.loading = false;
      }));
    } else if (this.nivel === 'parroquia' && this.selectedItem) {
      const cantId = this.selectedItem.id;
      this.subs.push(this.api.getGeoParroquiasByCanton(this.selectedEleccionId, cantId, candId).subscribe(items => {
        this.items = items;
        this.totalVotos = items.reduce((s, i) => s + i.totalVotos, 0);
        this.updateMap();
        this.loading = false;
      }));
    }
  }

  private initMap(): void {
    if (this.map) return;
    this.map = L.map('geoMap', { center: [-1.4, -78.5], zoom: 7, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);
    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  private getColor(votos: number, maxVotos: number): string {
    if (maxVotos === 0) return '#888';
    const ratio = votos / maxVotos;
    if (ratio > 0.75) return '#dc2626';
    if (ratio > 0.5) return '#f97316';
    if (ratio > 0.25) return '#eab308';
    return '#22c55e';
  }

  private updateMap(): void {
    if (!this.map || !this.markersLayer) return;
    this.markersLayer.clearLayers();
    const maxVotos = Math.max(...this.items.map(i => i.totalVotos), 1);

    if (this.nivel === 'provincia') {
      for (const item of this.items) {
        const coords = PROVINCIAS_ECUADOR.find(p => p.id === item.id);
        if (!coords) continue;
        const radius = Math.max(8, Math.sqrt(item.totalVotos / maxVotos) * 40);
        const color = this.getColor(item.totalVotos, maxVotos);
        const marker = L.circleMarker([coords.lat, coords.lng], {
          radius, color, fillColor: color, fillOpacity: 0.7, weight: 2, opacity: 1
        });
        marker.bindPopup(`<b>${item.nombre}</b><br>Votos: ${item.totalVotos.toLocaleString()}<br>${item.porcentaje != null ? item.porcentaje + '%' : ''}`);
        marker.on('click', () => this.drillDown(item, coords));
        this.markersLayer!.addLayer(marker);
      }
    } else {
      for (const item of this.items) {
        const jitter = (Math.random() - 0.5) * 0.1;
        const base = this.provinciaRef ?? { lat: -1.4, lng: -78.5 };
        const lat = base.lat + jitter;
        const lng = base.lng + jitter;
        const radius = Math.max(5, Math.sqrt(item.totalVotos / maxVotos) * 30);
        const color = this.getColor(item.totalVotos, maxVotos);
        const marker = L.circleMarker([lat, lng], {
          radius, color, fillColor: color, fillOpacity: 0.6, weight: 1, opacity: 1
        });
        marker.bindPopup(`<b>${item.nombre}</b><br>Votos: ${item.totalVotos.toLocaleString()}`);
        if (this.nivel === 'canton') {
          marker.on('click', () => {
            this.selectedItem = item;
            this.nivel = 'parroquia';
            this.tituloNivel = 'Parroquias';
            this.loadData();
          });
        }
        this.markersLayer!.addLayer(marker);
      }
    }
  }

  drillDown(item: DatoGeografico, coords: ProvinciaCoords): void {
    this.selectedItem = item;
    this.provinciaRef = coords;
    this.nivel = 'canton';
    this.tituloNivel = `Cantones - ${item.nombre}`;
    if (this.map) this.map.setView([coords.lat, coords.lng], 8);
    this.loadData();
  }

  onSidebarClick(item: DatoGeografico): void {
    if (this.nivel === 'provincia') {
      const coords = PROVINCIAS_ECUADOR.find(p => p.id === item.id);
      if (coords) this.drillDown(item, coords);
    }
  }

  volver(): void {
    if (this.nivel === 'canton') {
      this.nivel = 'provincia';
      this.tituloNivel = 'Provincias';
      this.selectedItem = null;
      this.provinciaRef = null;
      if (this.map) this.map.setView([-1.4, -78.5], 7);
      this.loadData();
    } else if (this.nivel === 'parroquia') {
      this.nivel = 'canton';
      this.tituloNivel = 'Cantones';
      this.selectedItem = null;
      this.loadData();
    }
  }
}
