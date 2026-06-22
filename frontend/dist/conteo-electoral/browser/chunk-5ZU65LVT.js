import {
  HttpClient,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7A5LCT4I.js";

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
  // Dashboard
  getDashboard(eleccionId) {
    return this.http.get(`${this.API_URL}/dashboard/eleccion/${eleccionId}`);
  }
  getDashboardConFiltros(eleccionId, cargoId, partidoId, zonaId, provinciaId, cantonId, parroquiaId, institucionId) {
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
    const queryString = params.toString();
    if (queryString)
      url += "?" + queryString;
    return this.http.get(url);
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
//# sourceMappingURL=chunk-5ZU65LVT.js.map
