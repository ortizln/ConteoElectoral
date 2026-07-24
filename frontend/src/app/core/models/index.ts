export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  rol: string;
}

export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
}

export interface Eleccion {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
  totalVotos?: number;
  totalMesas?: number;
  mesasCerradas?: number;
}

export interface Partido {
  id: number;
  nombre: string;
  sigla: string;
  logoUrl: string;
  eleccionesId: number;
}

export interface Cargo {
  id: number;
  nombre: string;
  descripcion: string;
  eleccionesId: number;
  tipoVotacion?: string;
  tipoCircunscripcionId?: number;
  tipoCircunscripcionCodigo?: string;
  tipoCircunscripcionNombre?: string;
  cantidadDignidades?: number;
  maxCandidatosLista?: number;
  activo?: boolean;
}

export interface Candidato {
  id: number;
  nombre: string;
  apellido: string;
  nombreCompleto: string;
  partidoId: number | null;
  partidoNombre: string;
  partidoSigla: string | null;
  cargoId?: number;
  cargoNombre?: string;
  listaId?: number;
  listaNombre?: string;
  numeroLista?: number;
  fotoUrl: string | null;
  eleccionesId?: number;
  ordenEnLista?: number;
  tipo?: string;
  principal?: boolean;
  activo?: boolean;
}

export interface Zona {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Provincia {
  id: number;
  nombre: string;
  zonaId: number;
  zonaNombre?: string;
  descripcion?: string;
}

export interface Canton {
  id: number;
  nombre: string;
  provinciaId: number;
  provinciaNombre?: string;
  descripcion?: string;
}

export interface Parroquia {
  id: number;
  nombre: string;
  cantonId: number;
  cantonNombre?: string;
  descripcion?: string;
}

export interface InstitucionEducativa {
  id: number;
  nombre: string;
  parroquiaId: number;
  parroquiaNombre?: string;
  direccion?: string;
  codigo?: string;
  tipo?: string;
}

export interface Mesa {
  id: number;
  numero: string;
  sexo: string;
  institucionId: number;
  institucionNombre: string;
  eleccionesId: number;
  cerrada: boolean;
  votosNulos: number;
  votosBlanco: number;
  usuarioId: number | null;
  usuarioNombre: string | null;
}

export interface Voto {
  id: number;
  candidatoId: number;
  candidatoNombre: string;
  candidatoApellido: string;
  partidoNombre: string;
  mesaId: number;
  mesaNumero: string;
  cantidadVotos: number;
  eleccionesId: number;
}

export interface ResultadoLista {
  listaId: number;
  listaNombre: string;
  numeroLista: number;
  partidoNombre: string;
  partidoSigla: string;
  cargoNombre: string;
  totalVotos: number;
  porcentaje: number;
}

export interface DashboardData {
  eleccionId: number;
  eleccionNombre: string;
  totalVotos: number;
  totalVotosNulos: number;
  totalMesas: number;
  mesasCerradas: number;
  mesasAbiertas: number;
  porcentajeMesasCerradas: number;
  resultados: ResultadoCandidato[];
  resultadosProvincia?: ResultadoGeo[];
  resultadosParroquia?: ResultadoGeo[];
  resultadosListas?: ResultadoLista[];
}

export interface CarouselImage {
  id: number;
  caption: string;
  orden: number;
  createdAt?: string;
}

export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface RolPermiso {
  id: number;
  rolId: number;
  rolNombre: string;
  modulo: string;
  puedeVer: boolean;
  puedeCrear: boolean;
  puedeEditar: boolean;
  puedeEliminar: boolean;
}

export interface CandidatoDetalleResponse {
  candidatoId: number;
  nombreCompleto: string;
  partidoNombre: string;
  cargoNombre: string;
  totalVotos: number;
  votosPorMesa: VotoPorMesa[];
  zonas: GeoGroup[];
  provincias: GeoGroup[];
  cantones: GeoGroup[];
  parroquias: GeoGroup[];
  instituciones: GeoGroup[];
}

export interface VotoPorMesa {
  mesaId: number;
  mesaNumero: string;
  institucion: string;
  parroquia: string;
  votos: number;
}

export interface GeoGroup {
  id: number;
  nombre: string;
  votos: number;
  porcentaje: number;
}

export interface ResultadoGeo {
  id: number;
  nombre: string;
  totalVotos: number;
  porcentaje: number;
}

export interface MesaCerradaResponse {
  id: number;
  numero: string;
  sexo: string;
  institucionNombre: string;
  parroquiaNombre: string;
  cantonNombre: string;
  provinciaNombre: string;
  zonaNombre: string;
  totalVotos: number;
}

export interface Circunscripcion {
  id: number;
  eleccionId: number;
  eleccionNombre?: string;
  tipoCircunscripcionId?: number;
  tipoCircunscripcionCodigo?: string;
  tipoCircunscripcionNombre?: string;
  nombre: string;
  codigo?: string;
  escanos: number;
  umbralElectoral?: number;
  metodoAsignacion: string;
  activa: boolean;
  createdAt?: string;
}

export interface AsignacionDHondt {
  partidoId: number;
  partidoNombre: string;
  partidoSigla?: string;
  listaId?: number;
  listaNombre?: string;
  votosValidos: number;
  porcentajeVotos: number;
  escanosAsignados: number;
  cocientes: number[];
}

export interface ResultadoDHondt {
  circunscripcionId: number;
  circunscripcionNombre: string;
  totalEscanos: number;
  totalVotosValidos: number;
  umbralElectoral: number;
  asignaciones: AsignacionDHondt[];
}

export interface Reconteo {
  id: number;
  mesaId: number;
  mesaNumero?: string;
  institucionNombre?: string;
  motivo: string;
  solicitadoPor: string;
  fechaSolicitud?: string;
  estado: string;
  resultado?: string;
  realizadoPor?: string;
  fechaRealizacion?: string;
  createdAt?: string;
}

export interface Impugnacion {
  id: number;
  mesaId?: number;
  mesaNumero?: string;
  tipo: string;
  descripcion: string;
  solicitante: string;
  fechaImpugnacion?: string;
  estado: string;
  createdAt?: string;
}

export interface Observacion {
  id: number;
  mesaId?: number;
  mesaNumero?: string;
  usuarioId?: number;
  usuarioNombre?: string;
  tipo: string;
  descripcion: string;
  fecha?: string;
  createdAt?: string;
}

export interface Resolucion {
  id: number;
  codigo: string;
  titulo: string;
  descripcion?: string;
  impugnacionId?: number;
  impugnacionDescripcion?: string;
  resueltoPor: string;
  fechaResolucion?: string;
  detalle?: string;
  createdAt?: string;
}

export interface EscrutinioResumen {
  reconteosPendientes: number;
  impugnacionesPendientes: number;
  totalObservaciones: number;
  totalResoluciones: number;
}

export interface ReglaNegocio {
  id: number;
  tipo: string;
  modulo: string;
  nombre: string;
  descripcion?: string;
  condicion: string;
  mensajeError?: string;
  accion?: string;
  activa: boolean;
  prioridad: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResultadoCandidato {
  candidatoId: number;
  nombreCompleto: string;
  partidoNombre: string;
  cargoNombre: string;
  totalVotos: number;
  porcentaje: number;
}

export interface DatoGeografico {
  id: number;
  nombre: string;
  totalVotos: number;
  porcentaje?: number;
}

export interface GeoResumen {
  totalVotos: number;
  items: DatoGeografico[];
}

export interface ReporteResumen {
  totalVotos: number;
  totalMesas: number;
  mesasCerradas: number;
  mesasPendientes: number;
  totalCandidatos: number;
  totalPartidos: number;
  votosNulos: number;
  votosBlanco: number;
  participacion: number;
}

export interface ReporteCandidato {
  id: number;
  nombre: string;
  apellido: string;
  nombreCompleto: string;
  partido: string;
  partidoSigla: string;
  cargo: string;
  totalVotos: number;
  porcentaje: number;
}

export interface ReportePartido {
  id: number;
  nombre: string;
  sigla: string;
  totalVotos: number;
  porcentaje: number;
  totalCandidatos: number;
}

export interface ReporteLista {
  listaId: number;
  listaNombre: string;
  numeroLista: number;
  partidoId: number | null;
  partidoNombre: string;
  partidoSigla: string;
  cargoId: number | null;
  cargoNombre: string;
  totalVotos: number;
  porcentaje: number;
}

export interface ListaElectoral {
  id: number;
  nombre: string;
  partidoId?: number;
  partidoNombre?: string;
  partidoSigla?: string;
  cargoId?: number;
  cargoNombre?: string;
  numeroLista?: number;
  circunscripcionId?: number;
  activa?: boolean;
  candidatos?: Candidato[];
}

export interface ApkVersionItem {
  id: number;
  version: string;
  nombreArchivo: string;
  fechaSubida: string;
}