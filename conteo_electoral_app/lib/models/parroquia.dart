class Parroquia {
  final int id;
  final String nombre;
  final int cantonId;
  final String? cantonNombre;
  final String? descripcion;

  Parroquia({
    required this.id,
    required this.nombre,
    required this.cantonId,
    this.cantonNombre,
    this.descripcion,
  });

  factory Parroquia.fromJson(Map<String, dynamic> json) {
    return Parroquia(
      id: json['id'],
      nombre: json['nombre'],
      cantonId: json['cantonId'],
      cantonNombre: json['cantonNombre'],
      descripcion: json['descripcion'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'cantonId': cantonId,
      'descripcion': descripcion,
    };
  }
}
