export interface InstitucionEducativa {
  id: number;
  nombre: string;
  parroquiaId: number;
  parroquiaNombre?: string;
  direccion?: string;
  codigo?: string;
  tipo?: string;
  latitud?: number | null;
  longitud?: number | null;
  electoresRegistrados?: number | null;
}
