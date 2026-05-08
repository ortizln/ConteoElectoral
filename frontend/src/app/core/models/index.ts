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
}

export interface Candidato {
  id: number;
  nombre: string;
  apellido: string;
  nombreCompleto: string;
  partidoId: number | null;
  partidoNombre: string;
  partidoSigla: string | null;
  cargoId: number;
  cargoNombre: string;
  fotoUrl: string | null;
  eleccionesId: number;
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

export interface DashboardData {
  eleccionId: number;
  eleccionNombre: string;
  totalVotos: number;
  totalMesas: number;
  mesasCerradas: number;
  mesasAbiertas: number;
  porcentajeMesasCerradas: number;
  resultados: ResultadoCandidato[];
}

export interface ResultadoCandidato {
  candidatoId: number;
  nombreCompleto: string;
  partidoNombre: string;
  cargoNombre: string;
  totalVotos: number;
  porcentaje: number;
}