class Eleccion {
  final int id;
  final String nombre;
  final String descripcion;
  final DateTime fechaInicio;
  final DateTime fechaFin;
  final bool activa;

  Eleccion({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.fechaInicio,
    required this.fechaFin,
    required this.activa,
  });

  factory Eleccion.fromJson(Map<String, dynamic> json) {
    return Eleccion(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'] ?? '',
      fechaInicio: DateTime.parse(json['fechaInicio']),
      fechaFin: DateTime.parse(json['fechaFin']),
      activa: json['activa'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
      'fechaInicio': fechaInicio.toIso8601String(),
      'fechaFin': fechaFin.toIso8601String(),
      'activa': activa,
    };
  }
}
