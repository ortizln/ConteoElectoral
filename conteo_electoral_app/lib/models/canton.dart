class Canton {
  final int id;
  final String nombre;
  final int provinciaId;
  final String? provinciaNombre;
  final String? descripcion;

  Canton({
    required this.id,
    required this.nombre,
    required this.provinciaId,
    this.provinciaNombre,
    this.descripcion,
  });

  factory Canton.fromJson(Map<String, dynamic> json) {
    return Canton(
      id: json['id'],
      nombre: json['nombre'],
      provinciaId: json['provinciaId'],
      provinciaNombre: json['provinciaNombre'],
      descripcion: json['descripcion'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'provinciaId': provinciaId,
      'descripcion': descripcion,
    };
  }
}
