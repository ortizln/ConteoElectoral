class Cargo {
  final int id;
  final String nombre;
  final String descripcion;
  final int eleccionesId;
  final String? tipoVotacion;
  final int? tipoCircunscripcionId;
  final String? tipoCircunscripcionCodigo;
  final String? tipoCircunscripcionNombre;
  final int? cantidadDignidades;
  final int? maxCandidatosLista;
  final bool? activo;

  Cargo({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.eleccionesId,
    this.tipoVotacion,
    this.tipoCircunscripcionId,
    this.tipoCircunscripcionCodigo,
    this.tipoCircunscripcionNombre,
    this.cantidadDignidades,
    this.maxCandidatosLista,
    this.activo,
  });

  factory Cargo.fromJson(Map<String, dynamic> json) {
    return Cargo(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'] ?? '',
      eleccionesId: json['eleccionesId'],
      tipoVotacion: json['tipoVotacion'],
      tipoCircunscripcionId: json['tipoCircunscripcionId'],
      tipoCircunscripcionCodigo: json['tipoCircunscripcionCodigo'],
      tipoCircunscripcionNombre: json['tipoCircunscripcionNombre'],
      cantidadDignidades: json['cantidadDignidades'],
      maxCandidatosLista: json['maxCandidatosLista'],
      activo: json['activo'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
      'eleccionesId': eleccionesId,
      'tipoVotacion': tipoVotacion,
      'tipoCircunscripcionId': tipoCircunscripcionId,
      'tipoCircunscripcionCodigo': tipoCircunscripcionCodigo,
      'tipoCircunscripcionNombre': tipoCircunscripcionNombre,
      'cantidadDignidades': cantidadDignidades,
      'maxCandidatosLista': maxCandidatosLista,
      'activo': activo,
    };
  }
}
