export interface InstitucionEducativa {
  id: number;
  nombre: string;
  parroquiaId: number;
  parroquiaNombre?: string;
  direccion?: string;
  codigo?: string;
  tipo?: string;
}
