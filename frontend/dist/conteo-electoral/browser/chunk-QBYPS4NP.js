import {
  HttpClient,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-3DSQS3EE.js";

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  constructor(http) {
    this.http = http;
    this.API_URL = environment.apiUrl;
  }
  // Zonas
  getZonas() {
    return this.http.get(`${this.API_URL}/zonas`);
  }
  createZona(data) {
    return this.http.post(`${this.API_URL}/zonas`, data);
  }
  updateZona(id, data) {
    return this.http.put(`${this.API_URL}/zonas/${id}`, data);
  }
  deleteZona(id) {
    return this.http.delete(`${this.API_URL}/zonas/${id}`);
  }
  // Provincias
  getProvincias() {
    return this.http.get(`${this.API_URL}/provincias`);
  }
  getProvinciasByZona(zonaId) {
    return this.http.get(`${this.API_URL}/provincias/zona/${zonaId}`);
  }
  createProvincia(data) {
    return this.http.post(`${this.API_URL}/provincias`, data);
  }
  updateProvincia(id, data) {
    return this.http.put(`${this.API_URL}/provincias/${id}`, data);
  }
  deleteProvincia(id) {
    return this.http.delete(`${this.API_URL}/provincias/${id}`);
  }
  // Cantones
  getCantones() {
    return this.http.get(`${this.API_URL}/cantones`);
  }
  getCantonesByProvincia(provinciaId) {
    return this.http.get(`${this.API_URL}/cantones/provincia/${provinciaId}`);
  }
  createCanton(data) {
    return this.http.post(`${this.API_URL}/cantones`, data);
  }
  updateCanton(id, data) {
    return this.http.put(`${this.API_URL}/cantones/${id}`, data);
  }
  deleteCanton(id) {
    return this.http.delete(`${this.API_URL}/cantones/${id}`);
  }
  // Parroquias
  getParroquias() {
    return this.http.get(`${this.API_URL}/parroquias`);
  }
  getParroquiasByCanton(cantonId) {
    return this.http.get(`${this.API_URL}/parroquias/canton/${cantonId}`);
  }
  createParroquia(data) {
    return this.http.post(`${this.API_URL}/parroquias`, data);
  }
  updateParroquia(id, data) {
    return this.http.put(`${this.API_URL}/parroquias/${id}`, data);
  }
  deleteParroquia(id) {
    return this.http.delete(`${this.API_URL}/parroquias/${id}`);
  }
  // Instituciones Educativas
  getInstituciones() {
    return this.http.get(`${this.API_URL}/instituciones`);
  }
  getInstitucionesByParroquia(parroquiaId) {
    return this.http.get(`${this.API_URL}/instituciones/parroquia/${parroquiaId}`);
  }
  createInstitucion(data) {
    return this.http.post(`${this.API_URL}/instituciones`, data);
  }
  updateInstitucion(id, data) {
    return this.http.put(`${this.API_URL}/instituciones/${id}`, data);
  }
  deleteInstitucion(id) {
    return this.http.delete(`${this.API_URL}/instituciones/${id}`);
  }
  // Elecciones
  getElecciones() {
    return this.http.get(`${this.API_URL}/elecciones`);
  }
  getEleccionById(id) {
    return this.http.get(`${this.API_URL}/elecciones/${id}`);
  }
  getEleccionesActivas() {
    return this.http.get(`${this.API_URL}/elecciones/activas`);
  }
  createEleccion(data) {
    return this.http.post(`${this.API_URL}/elecciones`, data);
  }
  updateEleccion(id, data) {
    return this.http.put(`${this.API_URL}/elecciones/${id}`, data);
  }
  deleteEleccion(id) {
    return this.http.delete(`${this.API_URL}/elecciones/${id}`);
  }
  // Partidos
  getPartidosByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/partidos/eleccion/${eleccionId}`);
  }
  createPartido(data) {
    return this.http.post(`${this.API_URL}/partidos`, data);
  }
  updatePartido(id, data) {
    return this.http.put(`${this.API_URL}/partidos/${id}`, data);
  }
  deletePartido(id) {
    return this.http.delete(`${this.API_URL}/partidos/${id}`);
  }
  // Cargos
  getCargos() {
    return this.http.get(`${this.API_URL}/cargos`);
  }
  getCargosByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/cargos/eleccion/${eleccionId}`);
  }
  createCargo(data) {
    return this.http.post(`${this.API_URL}/cargos`, data);
  }
  updateCargo(id, data) {
    return this.http.put(`${this.API_URL}/cargos/${id}`, data);
  }
  deleteCargo(id) {
    return this.http.delete(`${this.API_URL}/cargos/${id}`);
  }
  // Candidatos
  getCandidatosByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/candidatos/eleccion/${eleccionId}`);
  }
  createCandidato(data) {
    return this.http.post(`${this.API_URL}/candidatos`, data);
  }
  updateCandidato(id, data) {
    return this.http.put(`${this.API_URL}/candidatos/${id}`, data);
  }
  deleteCandidato(id) {
    return this.http.delete(`${this.API_URL}/candidatos/${id}`);
  }
  // Mesas
  getMesasByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/mesas/eleccion/${eleccionId}`);
  }
  getMesasByCurrentUser(eleccionId) {
    return this.http.get(`${this.API_URL}/mesas/usuario/actual/eleccion/${eleccionId}`);
  }
  getMesasCerradas(eleccionId) {
    return this.http.get(`${this.API_URL}/mesas/cerradas?eleccionId=${eleccionId}`);
  }
  descargarActaMesa(mesaId) {
    window.open(`${this.API_URL}/mesas/${mesaId}/exportar-acta`, "_blank");
  }
  getMesasByUsuario(usuarioId, eleccionId) {
    return this.http.get(`${this.API_URL}/mesas/usuario/${usuarioId}/eleccion/${eleccionId}`);
  }
  getMesasByInstitucion(institucionId) {
    return this.http.get(`${this.API_URL}/mesas/institucion/${institucionId}`);
  }
  asignarUsuarioAMesa(mesaId, usuarioId) {
    return this.http.post(`${this.API_URL}/mesas/${mesaId}/asignar-usuario/${usuarioId}`, {});
  }
  desasignarUsuarioDeMesa(mesaId, usuarioId) {
    return this.http.delete(`${this.API_URL}/mesas/${mesaId}/asignar-usuario/${usuarioId}`);
  }
  createMesa(data) {
    return this.http.post(`${this.API_URL}/mesas`, data);
  }
  updateMesa(id, data) {
    return this.http.put(`${this.API_URL}/mesas/${id}`, data);
  }
  cerrarMesa(id) {
    return this.http.post(`${this.API_URL}/mesas/${id}/cerrar`, {});
  }
  reabrirMesa(id) {
    return this.http.post(`${this.API_URL}/mesas/${id}/reabrir`, {});
  }
  actualizarVotosNulos(mesaId, votosNulos) {
    return this.http.put(`${this.API_URL}/mesas/${mesaId}/votos-nulos`, { votosNulos });
  }
  actualizarVotosBlanco(mesaId, votosBlanco) {
    return this.http.put(`${this.API_URL}/mesas/${mesaId}/votos-blanco`, { votosBlanco });
  }
  verifyPassword(password) {
    return this.http.post(`${this.API_URL}/auth/verify-password`, { password });
  }
  deleteMesa(id) {
    return this.http.delete(`${this.API_URL}/mesas/${id}`);
  }
  // Usuarios
  getUsuarios() {
    return this.http.get(`${this.API_URL}/usuarios`);
  }
  getUsuariosByRol(rolNombre) {
    return this.http.get(`${this.API_URL}/usuarios/rol/${rolNombre}`);
  }
  createUsuario(data) {
    return this.http.post(`${this.API_URL}/usuarios`, data);
  }
  updateUsuario(id, data) {
    return this.http.put(`${this.API_URL}/usuarios/${id}`, data);
  }
  resetPassword(id, newPassword) {
    return this.http.post(`${this.API_URL}/usuarios/${id}/reset-password`, { nuevaPassword: newPassword });
  }
  deleteUsuario(id) {
    return this.http.delete(`${this.API_URL}/usuarios/${id}`);
  }
  // Votos
  getVotosByMesa(mesaId) {
    return this.http.get(`${this.API_URL}/votos/mesa/${mesaId}`);
  }
  getVotosByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/votos/eleccion/${eleccionId}`);
  }
  getDetalleCandidato(candidatoId, eleccionId) {
    return this.http.get(`${this.API_URL}/votos/candidato/${candidatoId}/detalle?eleccionId=${eleccionId}`);
  }
  registrarVoto(data) {
    return this.http.post(`${this.API_URL}/votos`, data);
  }
  actualizarVoto(id, data) {
    return this.http.put(`${this.API_URL}/votos/${id}`, data);
  }
  deleteVoto(id) {
    return this.http.delete(`${this.API_URL}/votos/${id}`);
  }
  // Download helper
  downloadBlob(data, filename) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  exportPdf(url, filename) {
    this.http.get(url, { responseType: "blob" }).subscribe({
      next: (blob) => this.downloadBlob(blob, filename),
      error: () => console.error("Error al descargar PDF")
    });
  }
  exportExcel(url, filename) {
    this.http.get(url, { responseType: "blob" }).subscribe({
      next: (blob) => this.downloadBlob(blob, filename),
      error: () => console.error("Error al descargar Excel")
    });
  }
  // Export Zonas
  exportZonasPdf() {
    this.exportPdf(`${this.API_URL}/zonas/exportar-pdf`, "zonas.pdf");
  }
  exportZonasExcel() {
    this.exportExcel(`${this.API_URL}/zonas/exportar-excel`, "zonas.xlsx");
  }
  // Export Provincias
  exportProvinciasPdf() {
    this.exportPdf(`${this.API_URL}/provincias/exportar-pdf`, "provincias.pdf");
  }
  exportProvinciasExcel() {
    this.exportExcel(`${this.API_URL}/provincias/exportar-excel`, "provincias.xlsx");
  }
  // Export Cantones
  exportCantonesPdf() {
    this.exportPdf(`${this.API_URL}/cantones/exportar-pdf`, "cantones.pdf");
  }
  exportCantonesExcel() {
    this.exportExcel(`${this.API_URL}/cantones/exportar-excel`, "cantones.xlsx");
  }
  // Export Parroquias
  exportParroquiasPdf() {
    this.exportPdf(`${this.API_URL}/parroquias/exportar-pdf`, "parroquias.pdf");
  }
  exportParroquiasExcel() {
    this.exportExcel(`${this.API_URL}/parroquias/exportar-excel`, "parroquias.xlsx");
  }
  // Export Instituciones
  exportInstitucionesPdf() {
    this.exportPdf(`${this.API_URL}/instituciones/exportar-pdf`, "instituciones.pdf");
  }
  exportInstitucionesExcel() {
    this.exportExcel(`${this.API_URL}/instituciones/exportar-excel`, "instituciones.xlsx");
  }
  // Export Elecciones
  exportEleccionesPdf() {
    this.exportPdf(`${this.API_URL}/elecciones/exportar-pdf`, "elecciones.pdf");
  }
  exportEleccionesExcel() {
    this.exportExcel(`${this.API_URL}/elecciones/exportar-excel`, "elecciones.xlsx");
  }
  // Export Partidos
  exportPartidosPdf(eleccionId) {
    this.exportPdf(`${this.API_URL}/partidos/exportar-pdf${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "partidos.pdf");
  }
  exportPartidosExcel(eleccionId) {
    this.exportExcel(`${this.API_URL}/partidos/exportar-excel${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "partidos.xlsx");
  }
  // Export Cargos
  exportCargosPdf(eleccionId) {
    this.exportPdf(`${this.API_URL}/cargos/exportar-pdf${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "cargos.pdf");
  }
  exportCargosExcel(eleccionId) {
    this.exportExcel(`${this.API_URL}/cargos/exportar-excel${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "cargos.xlsx");
  }
  // Export Candidatos
  exportCandidatosPdf(eleccionId) {
    this.exportPdf(`${this.API_URL}/candidatos/exportar-pdf${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "candidatos.pdf");
  }
  exportCandidatosExcel(eleccionId) {
    this.exportExcel(`${this.API_URL}/candidatos/exportar-excel${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "candidatos.xlsx");
  }
  // Export Mesas
  exportMesasPdf(eleccionId) {
    this.exportPdf(`${this.API_URL}/mesas/exportar-pdf${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "mesas.pdf");
  }
  exportMesasExcel(eleccionId) {
    this.exportExcel(`${this.API_URL}/mesas/exportar-excel${eleccionId ? "?eleccionesId=" + eleccionId : ""}`, "mesas.xlsx");
  }
  // Export Usuarios
  exportUsuariosPdf() {
    this.exportPdf(`${this.API_URL}/usuarios/exportar-pdf`, "usuarios.pdf");
  }
  exportUsuariosExcel() {
    this.exportExcel(`${this.API_URL}/usuarios/exportar-excel`, "usuarios.xlsx");
  }
  // Export Dashboard
  exportDashboardPdf(eleccionId, filtros) {
    let url = `${this.API_URL}/dashboard/eleccion/${eleccionId}/exportar-pdf`;
    const params = new URLSearchParams();
    if (filtros) {
      if (filtros.cargoId)
        params.set("cargoId", filtros.cargoId);
      if (filtros.partidoId)
        params.set("partidoId", filtros.partidoId);
      if (filtros.zonaId)
        params.set("zonaId", filtros.zonaId);
      if (filtros.provinciaId)
        params.set("provinciaId", filtros.provinciaId);
      if (filtros.cantonId)
        params.set("cantonId", filtros.cantonId);
      if (filtros.parroquiaId)
        params.set("parroquiaId", filtros.parroquiaId);
      if (filtros.institucionId)
        params.set("institucionId", filtros.institucionId);
    }
    const qs = params.toString();
    if (qs)
      url += "?" + qs;
    this.exportPdf(url, "resultados.pdf");
  }
  exportDashboardExcel(eleccionId, filtros) {
    let url = `${this.API_URL}/dashboard/eleccion/${eleccionId}/exportar-excel`;
    const params = new URLSearchParams();
    if (filtros) {
      if (filtros.cargoId)
        params.set("cargoId", filtros.cargoId);
      if (filtros.partidoId)
        params.set("partidoId", filtros.partidoId);
      if (filtros.zonaId)
        params.set("zonaId", filtros.zonaId);
      if (filtros.provinciaId)
        params.set("provinciaId", filtros.provinciaId);
      if (filtros.cantonId)
        params.set("cantonId", filtros.cantonId);
      if (filtros.parroquiaId)
        params.set("parroquiaId", filtros.parroquiaId);
      if (filtros.institucionId)
        params.set("institucionId", filtros.institucionId);
    }
    const qs = params.toString();
    if (qs)
      url += "?" + qs;
    this.exportExcel(url, "resultados.xlsx");
  }
  // Export Acta de Cierre
  exportActaMesaPdf(mesaId) {
    this.exportPdf(`${this.API_URL}/mesas/${mesaId}/exportar-acta`, `acta_mesa_${mesaId}.pdf`);
  }
  // Importar Excel
  importarExcel(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.API_URL}/import/excel`, formData);
  }
  // Carousel
  getCarouselImages() {
    return this.http.get(`${this.API_URL}/carousel`);
  }
  getCarouselImageUrl(id) {
    return `${this.API_URL}/carousel/${id}/image`;
  }
  uploadCarouselImage(file, caption, orden) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    if (orden !== void 0)
      formData.append("orden", orden.toString());
    return this.http.post(`${this.API_URL}/carousel`, formData);
  }
  updateCarouselImage(id, data) {
    return this.http.put(`${this.API_URL}/carousel/${id}`, data);
  }
  deleteCarouselImage(id) {
    return this.http.delete(`${this.API_URL}/carousel/${id}`);
  }
  // Configuracion del Sistema
  getConfiguracion() {
    return this.http.get(`${this.API_URL}/configuracion`);
  }
  updateConfiguracion(data) {
    return this.http.put(`${this.API_URL}/configuracion`, data);
  }
  uploadLogo(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.API_URL}/configuracion/logo`, formData);
  }
  deleteLogo() {
    return this.http.delete(`${this.API_URL}/configuracion/logo`);
  }
  uploadApk(file, version = "1.0.0") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("version", version);
    return this.http.post(`${this.API_URL}/configuracion/apk`, formData);
  }
  deleteApk() {
    return this.http.delete(`${this.API_URL}/configuracion/apk`);
  }
  getApkVersion() {
    return this.http.get(`${this.API_URL}/configuracion/apk/version`);
  }
  // ApkVersion (nuevo sistema de versiones)
  getApkVersions() {
    return this.http.get(`${this.API_URL}/apk-versions`);
  }
  uploadApkVersion(file, version) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("version", version);
    return this.http.post(`${this.API_URL}/apk-versions`, formData);
  }
  deleteApkVersion(id) {
    return this.http.delete(`${this.API_URL}/apk-versions/${id}`);
  }
  getApkVersionDownloadUrl(id) {
    return `${this.API_URL}/apk-versions/${id}/download`;
  }
  // Roles y Permisos
  getRoles() {
    return this.http.get(`${this.API_URL}/permisos/roles`);
  }
  getPermisos() {
    return this.http.get(`${this.API_URL}/permisos`);
  }
  getPermisosByRol(rolId) {
    return this.http.get(`${this.API_URL}/permisos/rol/${rolId}`);
  }
  updatePermiso(id, data) {
    return this.http.put(`${this.API_URL}/permisos/${id}`, data);
  }
  // Papeletas
  getPapeletasByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/papeletas/eleccion/${eleccionId}`);
  }
  getPapeletaById(id) {
    return this.http.get(`${this.API_URL}/papeletas/${id}`);
  }
  generarPapeletas(eleccionId) {
    return this.http.post(`${this.API_URL}/papeletas/generar/${eleccionId}`, {});
  }
  regenerarPapeletas(eleccionId) {
    return this.http.post(`${this.API_URL}/papeletas/regenerar/${eleccionId}`, {});
  }
  // Tipos de Elección
  getTiposEleccion() {
    return this.http.get(`${this.API_URL}/tipos-eleccion`);
  }
  getTipoEleccionById(id) {
    return this.http.get(`${this.API_URL}/tipos-eleccion/${id}`);
  }
  createTipoEleccion(data) {
    return this.http.post(`${this.API_URL}/tipos-eleccion`, data);
  }
  updateTipoEleccion(id, data) {
    return this.http.put(`${this.API_URL}/tipos-eleccion/${id}`, data);
  }
  // Tipos de Circunscripción
  getTiposCircunscripcion() {
    return this.http.get(`${this.API_URL}/tipos-circunscripcion`);
  }
  // Tipo Elección Cargo
  getCargosByTipoEleccion(tipoEleccionId) {
    return this.http.get(`${this.API_URL}/tipo-eleccion-cargo/${tipoEleccionId}`);
  }
  addCargoToTipoEleccion(tipoEleccionId, data) {
    return this.http.post(`${this.API_URL}/tipo-eleccion-cargo/${tipoEleccionId}`, data);
  }
  updateCargoOrdenInTipoEleccion(id, data) {
    return this.http.put(`${this.API_URL}/tipo-eleccion-cargo/${id}`, data);
  }
  removeCargoFromTipoEleccion(id) {
    return this.http.delete(`${this.API_URL}/tipo-eleccion-cargo/${id}`);
  }
  // Voto Papeleta
  registrarVotoPapeleta(data) {
    return this.http.post(`${this.API_URL}/voto-papeleta`, data);
  }
  getVotosPapeletaByMesa(mesaId) {
    return this.http.get(`${this.API_URL}/voto-papeleta/mesa/${mesaId}`);
  }
  getVotosPapeletaByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/voto-papeleta/eleccion/${eleccionId}`);
  }
  deleteVotoPapeleta(id) {
    return this.http.delete(`${this.API_URL}/voto-papeleta/${id}`);
  }
  // Escrutinio Avanzado
  getEscrutinioResumen() {
    return this.http.get(`${this.API_URL}/escrutinio/resumen`);
  }
  getReconteos(eleccionId, mesaId) {
    let params = new URLSearchParams();
    if (eleccionId)
      params.set("eleccionId", String(eleccionId));
    if (mesaId)
      params.set("mesaId", String(mesaId));
    const qs = params.toString();
    return this.http.get(`${this.API_URL}/escrutinio/reconteos${qs ? "?" + qs : ""}`);
  }
  getReconteoById(id) {
    return this.http.get(`${this.API_URL}/escrutinio/reconteos/${id}`);
  }
  createReconteo(data) {
    return this.http.post(`${this.API_URL}/escrutinio/reconteos`, data);
  }
  updateReconteoEstado(id, estado, resultado, realizadoPor) {
    let params = new URLSearchParams({ estado });
    if (resultado)
      params.set("resultado", resultado);
    if (realizadoPor)
      params.set("realizadoPor", realizadoPor);
    return this.http.patch(`${this.API_URL}/escrutinio/reconteos/${id}/estado?${params.toString()}`, {});
  }
  getImpugnaciones(eleccionId) {
    let params = new URLSearchParams();
    if (eleccionId)
      params.set("eleccionId", String(eleccionId));
    const qs = params.toString();
    return this.http.get(`${this.API_URL}/escrutinio/impugnaciones${qs ? "?" + qs : ""}`);
  }
  getImpugnacionById(id) {
    return this.http.get(`${this.API_URL}/escrutinio/impugnaciones/${id}`);
  }
  createImpugnacion(data) {
    return this.http.post(`${this.API_URL}/escrutinio/impugnaciones`, data);
  }
  updateImpugnacionEstado(id, estado) {
    return this.http.patch(`${this.API_URL}/escrutinio/impugnaciones/${id}/estado?estado=${estado}`, {});
  }
  getObservaciones(eleccionId, mesaId) {
    let params = new URLSearchParams();
    if (eleccionId)
      params.set("eleccionId", String(eleccionId));
    if (mesaId)
      params.set("mesaId", String(mesaId));
    const qs = params.toString();
    return this.http.get(`${this.API_URL}/escrutinio/observaciones${qs ? "?" + qs : ""}`);
  }
  createObservacion(data) {
    return this.http.post(`${this.API_URL}/escrutinio/observaciones`, data);
  }
  getResoluciones() {
    return this.http.get(`${this.API_URL}/escrutinio/resoluciones`);
  }
  getResolucionById(id) {
    return this.http.get(`${this.API_URL}/escrutinio/resoluciones/${id}`);
  }
  createResolucion(data) {
    return this.http.post(`${this.API_URL}/escrutinio/resoluciones`, data);
  }
  // Circunscripciones
  getCircunscripcionesByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/circunscripciones/eleccion/${eleccionId}`);
  }
  getCircunscripcionById(id) {
    return this.http.get(`${this.API_URL}/circunscripciones/${id}`);
  }
  createCircunscripcion(data) {
    return this.http.post(`${this.API_URL}/circunscripciones`, data);
  }
  updateCircunscripcion(id, data) {
    return this.http.put(`${this.API_URL}/circunscripciones/${id}`, data);
  }
  deleteCircunscripcion(id) {
    return this.http.delete(`${this.API_URL}/circunscripciones/${id}`);
  }
  calcularDHondt(id) {
    return this.http.post(`${this.API_URL}/circunscripciones/${id}/calcular-dhondt`, {});
  }
  consultarResultadosDHondt(id) {
    return this.http.get(`${this.API_URL}/circunscripciones/${id}/resultados-dhondt`);
  }
  // Reglas de Negocio
  getReglasNegocio(modulo, tipo, activa) {
    let params = new URLSearchParams();
    if (modulo)
      params.set("modulo", modulo);
    if (tipo)
      params.set("tipo", tipo);
    if (activa !== void 0)
      params.set("activa", String(activa));
    const qs = params.toString();
    const url = `${this.API_URL}/reglas-negocio${qs ? "?" + qs : ""}`;
    return this.http.get(url);
  }
  getReglaNegocioById(id) {
    return this.http.get(`${this.API_URL}/reglas-negocio/${id}`);
  }
  createReglaNegocio(data) {
    return this.http.post(`${this.API_URL}/reglas-negocio`, data);
  }
  updateReglaNegocio(id, data) {
    return this.http.put(`${this.API_URL}/reglas-negocio/${id}`, data);
  }
  deleteReglaNegocio(id) {
    return this.http.delete(`${this.API_URL}/reglas-negocio/${id}`);
  }
  toggleReglaNegocio(id) {
    return this.http.patch(`${this.API_URL}/reglas-negocio/${id}/toggle`, {});
  }
  getModulosReglas() {
    return this.http.get(`${this.API_URL}/reglas-negocio/modulos`);
  }
  getTiposReglas() {
    return this.http.get(`${this.API_URL}/reglas-negocio/tipos`);
  }
  // Listas Electorales
  getListasByEleccion(eleccionId) {
    return this.http.get(`${this.API_URL}/listas-electorales/eleccion/${eleccionId}`);
  }
  getListaDetalle(id) {
    return this.http.get(`${this.API_URL}/listas-electorales/${id}`);
  }
  crearListaElectoral(data) {
    return this.http.post(`${this.API_URL}/listas-electorales`, data);
  }
  // Plantillas Papeleta
  getPlantillasPapeleta() {
    return this.http.get(`${this.API_URL}/plantillas-papeleta`);
  }
  // Dashboard
  getDashboard(eleccionId) {
    return this.http.get(`${this.API_URL}/dashboard/eleccion/${eleccionId}`);
  }
  // Dashboard Geográfico
  getGeoProvincias(eleccionId, candidatoId) {
    let url = `${this.API_URL}/dashboard/geografico/${eleccionId}/provincias`;
    if (candidatoId)
      url += `?candidatoId=${candidatoId}`;
    return this.http.get(url);
  }
  getGeoCantonesByProvincia(eleccionId, provinciaId, candidatoId) {
    let url = `${this.API_URL}/dashboard/geografico/${eleccionId}/provincias/${provinciaId}/cantones`;
    if (candidatoId)
      url += `?candidatoId=${candidatoId}`;
    return this.http.get(url);
  }
  getGeoParroquiasByCanton(eleccionId, cantonId, candidatoId) {
    let url = `${this.API_URL}/dashboard/geografico/${eleccionId}/cantones/${cantonId}/parroquias`;
    if (candidatoId)
      url += `?candidatoId=${candidatoId}`;
    return this.http.get(url);
  }
  getDashboardConFiltros(eleccionId, cargoId, partidoId, zonaId, provinciaId, cantonId, parroquiaId, institucionId, mesaId) {
    let url = `${this.API_URL}/dashboard/eleccion/${eleccionId}/filtrar`;
    const params = new URLSearchParams();
    if (cargoId !== void 0)
      params.set("cargoId", cargoId.toString());
    if (partidoId !== void 0)
      params.set("partidoId", partidoId.toString());
    if (zonaId !== void 0)
      params.set("zonaId", zonaId.toString());
    if (provinciaId !== void 0)
      params.set("provinciaId", provinciaId.toString());
    if (cantonId !== void 0)
      params.set("cantonId", cantonId.toString());
    if (parroquiaId !== void 0)
      params.set("parroquiaId", parroquiaId.toString());
    if (institucionId !== void 0)
      params.set("institucionId", institucionId.toString());
    if (mesaId !== void 0)
      params.set("mesaId", mesaId.toString());
    const queryString = params.toString();
    if (queryString)
      url += "?" + queryString;
    return this.http.get(url);
  }
  getReporteResumen(eleccionId) {
    return this.http.get(`${this.API_URL}/reportes/${eleccionId}/resumen`);
  }
  getReporteCandidatos(eleccionId) {
    return this.http.get(`${this.API_URL}/reportes/${eleccionId}/candidatos`);
  }
  getReportePartidos(eleccionId) {
    return this.http.get(`${this.API_URL}/reportes/${eleccionId}/partidos`);
  }
  exportarReporteCsv(eleccionId) {
    return this.http.get(`${this.API_URL}/reportes/${eleccionId}/exportar/csv`, { responseType: "blob" });
  }
  static {
    this.\u0275fac = function ApiService_Factory(t) {
      return new (t || _ApiService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  ApiService
};
//# sourceMappingURL=chunk-QBYPS4NP.js.map
