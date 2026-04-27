import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleccion, Partido, Cargo, Candidato, Recinto, Mesa, Voto, Usuario } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Elecciones
  getElecciones(): Observable<Eleccion[]> {
    return this.http.get<Eleccion[]>(`${this.API_URL}/elecciones`);
  }

  getEleccionById(id: number): Observable<Eleccion> {
    return this.http.get<Eleccion>(`${this.API_URL}/elecciones/${id}`);
  }

  getEleccionesActivas(): Observable<Eleccion[]> {
    return this.http.get<Eleccion[]>(`${this.API_URL}/elecciones/activas`);
  }

  createEleccion(data: Partial<Eleccion>): Observable<Eleccion> {
    return this.http.post<Eleccion>(`${this.API_URL}/elecciones`, data);
  }

  updateEleccion(id: number, data: Partial<Eleccion>): Observable<Eleccion> {
    return this.http.put<Eleccion>(`${this.API_URL}/elecciones/${id}`, data);
  }

  deleteEleccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/elecciones/${id}`);
  }

  // Partidos
  getPartidosByEleccion(eleccionId: number): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.API_URL}/partidos/eleccion/${eleccionId}`);
  }

  createPartido(data: Partial<Partido>): Observable<Partido> {
    return this.http.post<Partido>(`${this.API_URL}/partidos`, data);
  }

  updatePartido(id: number, data: Partial<Partido>): Observable<Partido> {
    return this.http.put<Partido>(`${this.API_URL}/partidos/${id}`, data);
  }

  deletePartido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/partidos/${id}`);
  }

  // Cargos
  getCargosByEleccion(eleccionId: number): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.API_URL}/cargos/eleccion/${eleccionId}`);
  }

  createCargo(data: Partial<Cargo>): Observable<Cargo> {
    return this.http.post<Cargo>(`${this.API_URL}/cargos`, data);
  }

  updateCargo(id: number, data: Partial<Cargo>): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.API_URL}/cargos/${id}`, data);
  }

  deleteCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/cargos/${id}`);
  }

  // Candidatos
  getCandidatosByEleccion(eleccionId: number): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.API_URL}/candidatos/eleccion/${eleccionId}`);
  }

  createCandidato(data: Partial<Candidato>): Observable<Candidato> {
    return this.http.post<Candidato>(`${this.API_URL}/candidatos`, data);
  }

  updateCandidato(id: number, data: Partial<Candidato>): Observable<Candidato> {
    return this.http.put<Candidato>(`${this.API_URL}/candidatos/${id}`, data);
  }

  deleteCandidato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/candidatos/${id}`);
  }

  // Recintos
  getRecintosByEleccion(eleccionId: number): Observable<Recinto[]> {
    return this.http.get<Recinto[]>(`${this.API_URL}/recintos/eleccion/${eleccionId}`);
  }

  createRecinto(data: Partial<Recinto>): Observable<Recinto> {
    return this.http.post<Recinto>(`${this.API_URL}/recintos`, data);
  }

  updateRecinto(id: number, data: Partial<Recinto>): Observable<Recinto> {
    return this.http.put<Recinto>(`${this.API_URL}/recintos/${id}`, data);
  }

  deleteRecinto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/recintos/${id}`);
  }

  // Mesas
  getMesasByEleccion(eleccionId: number): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas/eleccion/${eleccionId}`);
  }

  getMesasByRecinto(recintoId: number): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas/recinto/${recintoId}`);
  }

  createMesa(data: Partial<Mesa>): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.API_URL}/mesas`, data);
  }

  updateMesa(id: number, data: Partial<Mesa>): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.API_URL}/mesas/${id}`, data);
  }

  deleteMesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/mesas/${id}`);
  }

  cerrarMesa(id: number): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.API_URL}/mesas/${id}/cerrar`, {});
  }

  asignarUsuarioAMesa(mesaId: number, usuarioId: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/mesas/${mesaId}/asignar-usuario/${usuarioId}`, {});
  }

  // Votos
  getVotosByMesa(mesaId: number): Observable<Voto[]> {
    return this.http.get<Voto[]>(`${this.API_URL}/votos/mesa/${mesaId}`);
  }

  getVotosByEleccion(eleccionId: number): Observable<Voto[]> {
    return this.http.get<Voto[]>(`${this.API_URL}/votos/eleccion/${eleccionId}`);
  }

  registrarVoto(data: { candidatoId: number; mesaId: number; cantidadVotos: number; eleccionesId: number }): Observable<Voto> {
    return this.http.post<Voto>(`${this.API_URL}/votos`, data);
  }

  actualizarVoto(id: number, data: { candidatoId: number; mesaId: number; cantidadVotos: number; eleccionesId: number }): Observable<Voto> {
    return this.http.put<Voto>(`${this.API_URL}/votos/${id}`, data);
  }

  // Dashboard
  getDashboard(eleccionId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/dashboard/eleccion/${eleccionId}`);
  }

  // Usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }

  createUsuario(data: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios`, data);
  }

  updateUsuario(id: number, data: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/usuarios/${id}`, data);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/usuarios/${id}`);
  }

  resetPassword(id: number, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/usuarios/${id}/reset-password`, { nuevaPassword: newPassword });
  }
}