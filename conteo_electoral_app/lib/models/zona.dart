class Zona {
  final int id;
  final String nombre;
  final String? descripcion;

  Zona({
    required this.id,
    required this.nombre,
    this.descripcion,
  });

  factory Zona.fromJson(Map<String, dynamic> json) {
    return Zona(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
    };
  }
}
