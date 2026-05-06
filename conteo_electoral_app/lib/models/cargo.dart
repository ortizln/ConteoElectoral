class Cargo {
  final int id;
  final String nombre;
  final String descripcion;
  final int eleccionesId;

  Cargo({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.eleccionesId,
  });

  factory Cargo.fromJson(Map<String, dynamic> json) {
    return Cargo(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'] ?? '',
      eleccionesId: json['eleccionesId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
      'eleccionesId': eleccionesId,
    };
  }
}
