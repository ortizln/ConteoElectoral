class Provincia {
  final int id;
  final String nombre;
  final int zonaId;
  final String? zonaNombre;
  final String? descripcion;

  Provincia({
    required this.id,
    required this.nombre,
    required this.zonaId,
    this.zonaNombre,
    this.descripcion,
  });

  factory Provincia.fromJson(Map<String, dynamic> json) {
    return Provincia(
      id: json['id'],
      nombre: json['nombre'],
      zonaId: json['zonaId'],
      zonaNombre: json['zonaNombre'],
      descripcion: json['descripcion'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'zonaId': zonaId,
      'descripcion': descripcion,
    };
  }
}
