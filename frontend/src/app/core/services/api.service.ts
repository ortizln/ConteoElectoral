import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleccion, Partido, Cargo, Candidato, Mesa, Voto, Usuario, Zona, Provincia, Canton, Parroquia, InstitucionEducativa } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Zonas
  getZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.API_URL}/zonas`);
  }

  createZona(data: Partial<Zona>): Observable<Zona> {
    return this.http.post<Zona>(`${this.API_URL}/zonas`, data);
  }

  updateZona(id: number, data: Partial<Zona>): Observable<Zona> {
    return this.http.put<Zona>(`${this.API_URL}/zonas/${id}`, data);
  }

  deleteZona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/zonas/${id}`);
  }

  // Provincias
  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.API_URL}/provincias`);
  }

  getProvinciasByZona(zonaId: number): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.API_URL}/provincias/zona/${zonaId}`);
  }

  createProvincia(data: Partial<Provincia>): Observable<Provincia> {
    return this.http.post<Provincia>(`${this.API_URL}/provincias`, data);
  }

  updateProvincia(id: number, data: Partial<Provincia>): Observable<Provincia> {
    return this.http.put<Provincia>(`${this.API_URL}/provincias/${id}`, data);
  }

  deleteProvincia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/provincias/${id}`);
  }

  // Cantones
  getCantones(): Observable<Canton[]> {
    return this.http.get<Canton[]>(`${this.API_URL}/cantones`);
  }

  getCantonesByProvincia(provinciaId: number): Observable<Canton[]> {
    return this.http.get<Canton[]>(`${this.API_URL}/cantones/provincia/${provinciaId}`);
  }

  createCanton(data: Partial<Canton>): Observable<Canton> {
    return this.http.post<Canton>(`${this.API_URL}/cantones`, data);
  }

  updateCanton(id: number, data: Partial<Canton>): Observable<Canton> {
    return this.http.put<Canton>(`${this.API_URL}/cantones/${id}`, data);
  }

  deleteCanton(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/cantones/${id}`);
  }

  // Parroquias
  getParroquias(): Observable<Parroquia[]> {
    return this.http.get<Parroquia[]>(`${this.API_URL}/parroquias`);
  }

  getParroquiasByCanton(cantonId: number): Observable<Parroquia[]> {
    return this.http.get<Parroquia[]>(`${this.API_URL}/parroquias/canton/${cantonId}`);
  }

  createParroquia(data: Partial<Parroquia>): Observable<Parroquia> {
    return this.http.post<Parroquia>(`${this.API_URL}/parroquias`, data);
  }

  updateParroquia(id: number, data: Partial<Parroquia>): Observable<Parroquia> {
    return this.http.put<Parroquia>(`${this.API_URL}/parroquias/${id}`, data);
  }

  deleteParroquia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/parroquias/${id}`);
  }

  // Instituciones Educativas
  getInstituciones(): Observable<InstitucionEducativa[]> {
    return this.http.get<InstitucionEducativa[]>(`${this.API_URL}/instituciones`);
  }

  getInstitucionesByParroquia(parroquiaId: number): Observable<InstitucionEducativa[]> {
    return this.http.get<InstitucionEducativa[]>(`${this.API_URL}/instituciones/parroquia/${parroquiaId}`);
  }

  createInstitucion(data: Partial<InstitucionEducativa>): Observable<InstitucionEducativa> {
    return this.http.post<InstitucionEducativa>(`${this.API_URL}/instituciones`, data);
  }

  updateInstitucion(id: number, data: Partial<InstitucionEducativa>): Observable<InstitucionEducativa> {
    return this.http.put<InstitucionEducativa>(`${this.API_URL}/instituciones/${id}`, data);
  }

  deleteInstitucion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/instituciones/${id}`);
  }

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

  // Mesas
  getMesasByEleccion(eleccionId: number): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas/eleccion/${eleccionId}`);
  }

  getMesasByInstitucion(institucionId: number): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas/institucion/${institucionId}`);
  }

  asignarUsuarioAMesa(mesaId: number, usuarioId: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/mesas/${mesaId}/asignar-usuario/${usuarioId}`, {});
  }

  desasignarUsuarioDeMesa(mesaId: number, usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/mesas/${mesaId}/asignar-usuario/${usuarioId}`);
  }

  createMesa(data: Partial<Mesa>): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.API_URL}/mesas`, data);
  }

  updateMesa(id: number, data: Partial<Mesa>): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.API_URL}/mesas/${id}`, data);
  }

  cerrarMesa(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/mesas/${id}/cerrar`, {});
  }

  deleteMesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/mesas/${id}`);
  }

  // Usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }

  getUsuariosByRol(rolNombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios/rol/${rolNombre}`);
  }

  createUsuario(data: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios`, data);
  }

  updateUsuario(id: number, data: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/usuarios/${id}`, data);
  }

  resetPassword(id: number, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/usuarios/${id}/reset-password`, { nuevaPassword: newPassword });
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/usuarios/${id}`);
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

  // Importar Excel
  importarExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.API_URL}/import/excel`, formData);
  }

  // Dashboard
  getDashboard(eleccionId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/dashboard/eleccion/${eleccionId}`);
  }

  getDashboardConFiltros(
    eleccionId: number, 
    cargoId?: number, 
    partidoId?: number, 
    zonaId?: number,
    provinciaId?: number,
    cantonId?: number,
    parroquiaId?: number,
    institucionId?: number
  ): Observable<any> {
    let url = `${this.API_URL}/dashboard/eleccion/${eleccionId}/filtrar`;
    const params = new URLSearchParams();
    if (cargoId !== undefined) params.set('cargoId', cargoId.toString());
    if (partidoId !== undefined) params.set('partidoId', partidoId.toString());
    if (zonaId !== undefined) params.set('zonaId', zonaId.toString());
    if (provinciaId !== undefined) params.set('provinciaId', provinciaId.toString());
    if (cantonId !== undefined) params.set('cantonId', cantonId.toString());
    if (parroquiaId !== undefined) params.set('parroquiaId', parroquiaId.toString());
    if (institucionId !== undefined) params.set('institucionId', institucionId.toString());
    const queryString = params.toString();
    if (queryString) url += '?' + queryString;
    return this.http.get<any>(url);
  }
}
