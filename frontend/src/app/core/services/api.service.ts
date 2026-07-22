import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApkVersionItem, Eleccion, Partido, Cargo, Candidato, Mesa, Voto, Usuario, Zona, Provincia, Canton, Parroquia, InstitucionEducativa, CarouselImage, Rol, RolPermiso, CandidatoDetalleResponse, MesaCerradaResponse, ReglaNegocio, Circunscripcion, ResultadoDHondt, Reconteo, Impugnacion, Observacion, Resolucion, EscrutinioResumen, GeoResumen, DatoGeografico, ReporteResumen, ReporteCandidato, ReportePartido } from '../models';
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
  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.API_URL}/cargos`);
  }

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

  getMesasByCurrentUser(eleccionId: number): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas/usuario/actual/eleccion/${eleccionId}`);
  }

  getMesasCerradas(eleccionId: number): Observable<MesaCerradaResponse[]> {
    return this.http.get<MesaCerradaResponse[]>(`${this.API_URL}/mesas/cerradas?eleccionId=${eleccionId}`);
  }

  descargarActaMesa(mesaId: number): void {
    window.open(`${this.API_URL}/mesas/${mesaId}/exportar-acta`, '_blank');
  }

  getMesasByUsuario(usuarioId: number, eleccionId: number): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas/usuario/${usuarioId}/eleccion/${eleccionId}`);
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

  reabrirMesa(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/mesas/${id}/reabrir`, {});
  }

  actualizarVotosNulos(mesaId: number, votosNulos: number): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.API_URL}/mesas/${mesaId}/votos-nulos`, { votosNulos });
  }

  actualizarVotosBlanco(mesaId: number, votosBlanco: number): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.API_URL}/mesas/${mesaId}/votos-blanco`, { votosBlanco });
  }

  verifyPassword(password: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`${this.API_URL}/auth/verify-password`, { password });
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

  getDetalleCandidato(candidatoId: number, eleccionId: number): Observable<CandidatoDetalleResponse> {
    return this.http.get<CandidatoDetalleResponse>(`${this.API_URL}/votos/candidato/${candidatoId}/detalle?eleccionId=${eleccionId}`);
  }

  registrarVoto(data: { candidatoId: number; mesaId: number; cantidadVotos: number; eleccionesId: number }): Observable<Voto> {
    return this.http.post<Voto>(`${this.API_URL}/votos`, data);
  }

  actualizarVoto(id: number, data: { candidatoId: number; mesaId: number; cantidadVotos: number; eleccionesId: number }): Observable<Voto> {
    return this.http.put<Voto>(`${this.API_URL}/votos/${id}`, data);
  }

  deleteVoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/votos/${id}`);
  }

  // Download helper
  private downloadBlob(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private exportPdf(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => this.downloadBlob(blob, filename),
      error: () => console.error('Error al descargar PDF')
    });
  }

  private exportExcel(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => this.downloadBlob(blob, filename),
      error: () => console.error('Error al descargar Excel')
    });
  }

  // Export Zonas
  exportZonasPdf(): void { this.exportPdf(`${this.API_URL}/zonas/exportar-pdf`, 'zonas.pdf'); }
  exportZonasExcel(): void { this.exportExcel(`${this.API_URL}/zonas/exportar-excel`, 'zonas.xlsx'); }

  // Export Provincias
  exportProvinciasPdf(): void { this.exportPdf(`${this.API_URL}/provincias/exportar-pdf`, 'provincias.pdf'); }
  exportProvinciasExcel(): void { this.exportExcel(`${this.API_URL}/provincias/exportar-excel`, 'provincias.xlsx'); }

  // Export Cantones
  exportCantonesPdf(): void { this.exportPdf(`${this.API_URL}/cantones/exportar-pdf`, 'cantones.pdf'); }
  exportCantonesExcel(): void { this.exportExcel(`${this.API_URL}/cantones/exportar-excel`, 'cantones.xlsx'); }

  // Export Parroquias
  exportParroquiasPdf(): void { this.exportPdf(`${this.API_URL}/parroquias/exportar-pdf`, 'parroquias.pdf'); }
  exportParroquiasExcel(): void { this.exportExcel(`${this.API_URL}/parroquias/exportar-excel`, 'parroquias.xlsx'); }

  // Export Instituciones
  exportInstitucionesPdf(): void { this.exportPdf(`${this.API_URL}/instituciones/exportar-pdf`, 'instituciones.pdf'); }
  exportInstitucionesExcel(): void { this.exportExcel(`${this.API_URL}/instituciones/exportar-excel`, 'instituciones.xlsx'); }

  // Export Elecciones
  exportEleccionesPdf(): void { this.exportPdf(`${this.API_URL}/elecciones/exportar-pdf`, 'elecciones.pdf'); }
  exportEleccionesExcel(): void { this.exportExcel(`${this.API_URL}/elecciones/exportar-excel`, 'elecciones.xlsx'); }

  // Export Partidos
  exportPartidosPdf(eleccionId?: number): void { this.exportPdf(`${this.API_URL}/partidos/exportar-pdf${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'partidos.pdf'); }
  exportPartidosExcel(eleccionId?: number): void { this.exportExcel(`${this.API_URL}/partidos/exportar-excel${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'partidos.xlsx'); }

  // Export Cargos
  exportCargosPdf(eleccionId?: number): void { this.exportPdf(`${this.API_URL}/cargos/exportar-pdf${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'cargos.pdf'); }
  exportCargosExcel(eleccionId?: number): void { this.exportExcel(`${this.API_URL}/cargos/exportar-excel${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'cargos.xlsx'); }

  // Export Candidatos
  exportCandidatosPdf(eleccionId?: number): void { this.exportPdf(`${this.API_URL}/candidatos/exportar-pdf${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'candidatos.pdf'); }
  exportCandidatosExcel(eleccionId?: number): void { this.exportExcel(`${this.API_URL}/candidatos/exportar-excel${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'candidatos.xlsx'); }

  // Export Mesas
  exportMesasPdf(eleccionId?: number): void { this.exportPdf(`${this.API_URL}/mesas/exportar-pdf${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'mesas.pdf'); }
  exportMesasExcel(eleccionId?: number): void { this.exportExcel(`${this.API_URL}/mesas/exportar-excel${eleccionId ? '?eleccionesId='+eleccionId : ''}`, 'mesas.xlsx'); }

  // Export Usuarios
  exportUsuariosPdf(): void { this.exportPdf(`${this.API_URL}/usuarios/exportar-pdf`, 'usuarios.pdf'); }
  exportUsuariosExcel(): void { this.exportExcel(`${this.API_URL}/usuarios/exportar-excel`, 'usuarios.xlsx'); }

  // Export Dashboard
  exportDashboardPdf(eleccionId: number, filtros?: any): void {
    let url = `${this.API_URL}/dashboard/eleccion/${eleccionId}/exportar-pdf`;
    const params = new URLSearchParams();
    if (filtros) {
      if (filtros.cargoId) params.set('cargoId', filtros.cargoId);
      if (filtros.partidoId) params.set('partidoId', filtros.partidoId);
      if (filtros.zonaId) params.set('zonaId', filtros.zonaId);
      if (filtros.provinciaId) params.set('provinciaId', filtros.provinciaId);
      if (filtros.cantonId) params.set('cantonId', filtros.cantonId);
      if (filtros.parroquiaId) params.set('parroquiaId', filtros.parroquiaId);
      if (filtros.institucionId) params.set('institucionId', filtros.institucionId);
    }
    const qs = params.toString();
    if (qs) url += '?' + qs;
    this.exportPdf(url, 'resultados.pdf');
  }

  exportDashboardExcel(eleccionId: number, filtros?: any): void {
    let url = `${this.API_URL}/dashboard/eleccion/${eleccionId}/exportar-excel`;
    const params = new URLSearchParams();
    if (filtros) {
      if (filtros.cargoId) params.set('cargoId', filtros.cargoId);
      if (filtros.partidoId) params.set('partidoId', filtros.partidoId);
      if (filtros.zonaId) params.set('zonaId', filtros.zonaId);
      if (filtros.provinciaId) params.set('provinciaId', filtros.provinciaId);
      if (filtros.cantonId) params.set('cantonId', filtros.cantonId);
      if (filtros.parroquiaId) params.set('parroquiaId', filtros.parroquiaId);
      if (filtros.institucionId) params.set('institucionId', filtros.institucionId);
    }
    const qs = params.toString();
    if (qs) url += '?' + qs;
    this.exportExcel(url, 'resultados.xlsx');
  }

  // Export Acta de Cierre
  exportActaMesaPdf(mesaId: number): void {
    this.exportPdf(`${this.API_URL}/mesas/${mesaId}/exportar-acta`, `acta_mesa_${mesaId}.pdf`);
  }

  // Importar Excel
  importarExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.API_URL}/import/excel`, formData);
  }

  // Carousel
  getCarouselImages(): Observable<CarouselImage[]> {
    return this.http.get<CarouselImage[]>(`${this.API_URL}/carousel`);
  }

  getCarouselImageUrl(id: number): string {
    return `${this.API_URL}/carousel/${id}/image`;
  }

  uploadCarouselImage(file: File, caption: string, orden?: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    if (orden !== undefined) formData.append('orden', orden.toString());
    return this.http.post<any>(`${this.API_URL}/carousel`, formData);
  }

  updateCarouselImage(id: number, data: Partial<CarouselImage>): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/carousel/${id}`, data);
  }

  deleteCarouselImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/carousel/${id}`);
  }

  // Configuracion del Sistema
  getConfiguracion(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/configuracion`);
  }

  updateConfiguracion(data: { nombrePartido: string; descripcion: string }): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/configuracion`, data);
  }

  uploadLogo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.API_URL}/configuracion/logo`, formData);
  }

  deleteLogo(): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/configuracion/logo`);
  }

  uploadApk(file: File, version: string = '1.0.0'): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('version', version);
    return this.http.post<any>(`${this.API_URL}/configuracion/apk`, formData);
  }

  deleteApk(): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/configuracion/apk`);
  }

  getApkVersion(): Observable<{ version: string; apkNombre: string }> {
    return this.http.get<{ version: string; apkNombre: string }>(`${this.API_URL}/configuracion/apk/version`);
  }

  // ApkVersion (nuevo sistema de versiones)
  getApkVersions(): Observable<ApkVersionItem[]> {
    return this.http.get<ApkVersionItem[]>(`${this.API_URL}/apk-versions`);
  }

  uploadApkVersion(file: File, version: string): Observable<ApkVersionItem> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('version', version);
    return this.http.post<ApkVersionItem>(`${this.API_URL}/apk-versions`, formData);
  }

  deleteApkVersion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/apk-versions/${id}`);
  }

  getApkVersionDownloadUrl(id: number): string {
    return `${this.API_URL}/apk-versions/${id}/download`;
  }

  // Roles y Permisos
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.API_URL}/permisos/roles`);
  }

  getPermisos(): Observable<RolPermiso[]> {
    return this.http.get<RolPermiso[]>(`${this.API_URL}/permisos`);
  }

  getPermisosByRol(rolId: number): Observable<RolPermiso[]> {
    return this.http.get<RolPermiso[]>(`${this.API_URL}/permisos/rol/${rolId}`);
  }

  updatePermiso(id: number, data: Partial<RolPermiso>): Observable<RolPermiso> {
    return this.http.put<RolPermiso>(`${this.API_URL}/permisos/${id}`, data);
  }

  // Papeletas
  getPapeletasByEleccion(eleccionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/papeletas/eleccion/${eleccionId}`);
  }

  getPapeletaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/papeletas/${id}`);
  }

  generarPapeletas(eleccionId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.API_URL}/papeletas/generar/${eleccionId}`, {});
  }

  regenerarPapeletas(eleccionId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.API_URL}/papeletas/regenerar/${eleccionId}`, {});
  }

  // Tipos de Elección
  getTiposEleccion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/tipos-eleccion`);
  }

  getTipoEleccionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/tipos-eleccion/${id}`);
  }

  createTipoEleccion(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/tipos-eleccion`, data);
  }

  updateTipoEleccion(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/tipos-eleccion/${id}`, data);
  }

  // Tipos de Circunscripción
  getTiposCircunscripcion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/tipos-circunscripcion`);
  }

  // Tipo Elección Cargo
  getCargosByTipoEleccion(tipoEleccionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/tipo-eleccion-cargo/${tipoEleccionId}`);
  }

  addCargoToTipoEleccion(tipoEleccionId: number, data: any): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/tipo-eleccion-cargo/${tipoEleccionId}`, data);
  }

  updateCargoOrdenInTipoEleccion(id: number, data: any): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/tipo-eleccion-cargo/${id}`, data);
  }

  removeCargoFromTipoEleccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/tipo-eleccion-cargo/${id}`);
  }

  // Voto Papeleta
  registrarVotoPapeleta(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/voto-papeleta`, data);
  }

  getVotosPapeletaByMesa(mesaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/voto-papeleta/mesa/${mesaId}`);
  }

  getVotosPapeletaByEleccion(eleccionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/voto-papeleta/eleccion/${eleccionId}`);
  }

  deleteVotoPapeleta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/voto-papeleta/${id}`);
  }

  // Escrutinio Avanzado
  getEscrutinioResumen(): Observable<EscrutinioResumen> {
    return this.http.get<EscrutinioResumen>(`${this.API_URL}/escrutinio/resumen`);
  }

  getReconteos(eleccionId?: number, mesaId?: number): Observable<Reconteo[]> {
    let params = new URLSearchParams();
    if (eleccionId) params.set('eleccionId', String(eleccionId));
    if (mesaId) params.set('mesaId', String(mesaId));
    const qs = params.toString();
    return this.http.get<Reconteo[]>(`${this.API_URL}/escrutinio/reconteos${qs ? '?'+qs : ''}`);
  }

  getReconteoById(id: number): Observable<Reconteo> {
    return this.http.get<Reconteo>(`${this.API_URL}/escrutinio/reconteos/${id}`);
  }

  createReconteo(data: Partial<Reconteo>): Observable<Reconteo> {
    return this.http.post<Reconteo>(`${this.API_URL}/escrutinio/reconteos`, data);
  }

  updateReconteoEstado(id: number, estado: string, resultado?: string, realizadoPor?: string): Observable<Reconteo> {
    let params = new URLSearchParams({ estado });
    if (resultado) params.set('resultado', resultado);
    if (realizadoPor) params.set('realizadoPor', realizadoPor);
    return this.http.patch<Reconteo>(`${this.API_URL}/escrutinio/reconteos/${id}/estado?${params.toString()}`, {});
  }

  getImpugnaciones(eleccionId?: number): Observable<Impugnacion[]> {
    let params = new URLSearchParams();
    if (eleccionId) params.set('eleccionId', String(eleccionId));
    const qs = params.toString();
    return this.http.get<Impugnacion[]>(`${this.API_URL}/escrutinio/impugnaciones${qs ? '?'+qs : ''}`);
  }

  getImpugnacionById(id: number): Observable<Impugnacion> {
    return this.http.get<Impugnacion>(`${this.API_URL}/escrutinio/impugnaciones/${id}`);
  }

  createImpugnacion(data: Partial<Impugnacion>): Observable<Impugnacion> {
    return this.http.post<Impugnacion>(`${this.API_URL}/escrutinio/impugnaciones`, data);
  }

  updateImpugnacionEstado(id: number, estado: string): Observable<Impugnacion> {
    return this.http.patch<Impugnacion>(`${this.API_URL}/escrutinio/impugnaciones/${id}/estado?estado=${estado}`, {});
  }

  getObservaciones(eleccionId?: number, mesaId?: number): Observable<Observacion[]> {
    let params = new URLSearchParams();
    if (eleccionId) params.set('eleccionId', String(eleccionId));
    if (mesaId) params.set('mesaId', String(mesaId));
    const qs = params.toString();
    return this.http.get<Observacion[]>(`${this.API_URL}/escrutinio/observaciones${qs ? '?'+qs : ''}`);
  }

  createObservacion(data: Partial<Observacion>): Observable<Observacion> {
    return this.http.post<Observacion>(`${this.API_URL}/escrutinio/observaciones`, data);
  }

  getResoluciones(): Observable<Resolucion[]> {
    return this.http.get<Resolucion[]>(`${this.API_URL}/escrutinio/resoluciones`);
  }

  getResolucionById(id: number): Observable<Resolucion> {
    return this.http.get<Resolucion>(`${this.API_URL}/escrutinio/resoluciones/${id}`);
  }

  createResolucion(data: Partial<Resolucion>): Observable<Resolucion> {
    return this.http.post<Resolucion>(`${this.API_URL}/escrutinio/resoluciones`, data);
  }

  // Circunscripciones
  getCircunscripcionesByEleccion(eleccionId: number): Observable<Circunscripcion[]> {
    return this.http.get<Circunscripcion[]>(`${this.API_URL}/circunscripciones/eleccion/${eleccionId}`);
  }

  getCircunscripcionById(id: number): Observable<Circunscripcion> {
    return this.http.get<Circunscripcion>(`${this.API_URL}/circunscripciones/${id}`);
  }

  createCircunscripcion(data: Partial<Circunscripcion>): Observable<Circunscripcion> {
    return this.http.post<Circunscripcion>(`${this.API_URL}/circunscripciones`, data);
  }

  updateCircunscripcion(id: number, data: Partial<Circunscripcion>): Observable<Circunscripcion> {
    return this.http.put<Circunscripcion>(`${this.API_URL}/circunscripciones/${id}`, data);
  }

  deleteCircunscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/circunscripciones/${id}`);
  }

  calcularDHondt(id: number): Observable<ResultadoDHondt> {
    return this.http.post<ResultadoDHondt>(`${this.API_URL}/circunscripciones/${id}/calcular-dhondt`, {});
  }

  consultarResultadosDHondt(id: number): Observable<ResultadoDHondt> {
    return this.http.get<ResultadoDHondt>(`${this.API_URL}/circunscripciones/${id}/resultados-dhondt`);
  }

  // Reglas de Negocio
  getReglasNegocio(modulo?: string, tipo?: string, activa?: boolean): Observable<ReglaNegocio[]> {
    let params = new URLSearchParams();
    if (modulo) params.set('modulo', modulo);
    if (tipo) params.set('tipo', tipo);
    if (activa !== undefined) params.set('activa', String(activa));
    const qs = params.toString();
    const url = `${this.API_URL}/reglas-negocio${qs ? '?' + qs : ''}`;
    return this.http.get<ReglaNegocio[]>(url);
  }

  getReglaNegocioById(id: number): Observable<ReglaNegocio> {
    return this.http.get<ReglaNegocio>(`${this.API_URL}/reglas-negocio/${id}`);
  }

  createReglaNegocio(data: Partial<ReglaNegocio>): Observable<ReglaNegocio> {
    return this.http.post<ReglaNegocio>(`${this.API_URL}/reglas-negocio`, data);
  }

  updateReglaNegocio(id: number, data: Partial<ReglaNegocio>): Observable<ReglaNegocio> {
    return this.http.put<ReglaNegocio>(`${this.API_URL}/reglas-negocio/${id}`, data);
  }

  deleteReglaNegocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/reglas-negocio/${id}`);
  }

  toggleReglaNegocio(id: number): Observable<ReglaNegocio> {
    return this.http.patch<ReglaNegocio>(`${this.API_URL}/reglas-negocio/${id}/toggle`, {});
  }

  getModulosReglas(): Observable<{codigo: string; nombre: string}[]> {
    return this.http.get<{codigo: string; nombre: string}[]>(`${this.API_URL}/reglas-negocio/modulos`);
  }

  getTiposReglas(): Observable<{codigo: string; nombre: string}[]> {
    return this.http.get<{codigo: string; nombre: string}[]>(`${this.API_URL}/reglas-negocio/tipos`);
  }

  // Listas Electorales
  getListasByEleccion(eleccionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/listas-electorales/eleccion/${eleccionId}`);
  }

  getListaDetalle(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/listas-electorales/${id}`);
  }

  crearListaElectoral(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/listas-electorales`, data);
  }

  // Plantillas Papeleta
  getPlantillasPapeleta(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/plantillas-papeleta`);
  }

  // Dashboard
  getDashboard(eleccionId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/dashboard/eleccion/${eleccionId}`);
  }

  // Dashboard Geográfico
  getGeoProvincias(eleccionId: number, candidatoId?: number): Observable<GeoResumen> {
    let url = `${this.API_URL}/dashboard/geografico/${eleccionId}/provincias`;
    if (candidatoId) url += `?candidatoId=${candidatoId}`;
    return this.http.get<GeoResumen>(url);
  }

  getGeoCantonesByProvincia(eleccionId: number, provinciaId: number, candidatoId?: number): Observable<DatoGeografico[]> {
    let url = `${this.API_URL}/dashboard/geografico/${eleccionId}/provincias/${provinciaId}/cantones`;
    if (candidatoId) url += `?candidatoId=${candidatoId}`;
    return this.http.get<DatoGeografico[]>(url);
  }

  getGeoParroquiasByCanton(eleccionId: number, cantonId: number, candidatoId?: number): Observable<DatoGeografico[]> {
    let url = `${this.API_URL}/dashboard/geografico/${eleccionId}/cantones/${cantonId}/parroquias`;
    if (candidatoId) url += `?candidatoId=${candidatoId}`;
    return this.http.get<DatoGeografico[]>(url);
  }

  getDashboardConFiltros(
    eleccionId: number, 
    cargoId?: number, 
    partidoId?: number, 
    zonaId?: number,
    provinciaId?: number,
    cantonId?: number,
    parroquiaId?: number,
    institucionId?: number,
    mesaId?: number
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
    if (mesaId !== undefined) params.set('mesaId', mesaId.toString());
    const queryString = params.toString();
    if (queryString) url += '?' + queryString;
    return this.http.get<any>(url);
  }

  getReporteResumen(eleccionId: number): Observable<ReporteResumen> {
    return this.http.get<ReporteResumen>(`${this.API_URL}/reportes/${eleccionId}/resumen`);
  }

  getReporteCandidatos(eleccionId: number): Observable<ReporteCandidato[]> {
    return this.http.get<ReporteCandidato[]>(`${this.API_URL}/reportes/${eleccionId}/candidatos`);
  }

  getReportePartidos(eleccionId: number): Observable<ReportePartido[]> {
    return this.http.get<ReportePartido[]>(`${this.API_URL}/reportes/${eleccionId}/partidos`);
  }

  exportarReporteCsv(eleccionId: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}/reportes/${eleccionId}/exportar/csv`, { responseType: 'blob' });
  }
}
