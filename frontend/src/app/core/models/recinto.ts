export interface Recinto {
  id: number;
  nombre: string;
  direccion?: string;
  institucionId: number;
  institucionNombre?: string;
  parroquiaId?: number;
  parroquiaNombre?: string;
  cantonId?: number;
  cantonNombre?: string;
  provinciaId?: number;
  provinciaNombre?: string;
  zonaId?: number;
  zonaNombre?: string;
  eleccionesId: number;
  totalMesas?: number;
}
