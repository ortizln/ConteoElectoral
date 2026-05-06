class Partido {
  final int id;
  final String nombre;
  final String sigla;
  final String? logoUrl;
  final int eleccionesId;

  Partido({
    required this.id,
    required this.nombre,
    required this.sigla,
    this.logoUrl,
    required this.eleccionesId,
  });

  factory Partido.fromJson(Map<String, dynamic> json) {
    return Partido(
      id: json['id'],
      nombre: json['nombre'],
      sigla: json['sigla'] ?? '',
      logoUrl: json['logoUrl'],
      eleccionesId: json['eleccionesId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'sigla': sigla,
      'logoUrl': logoUrl,
      'eleccionesId': eleccionesId,
    };
  }
}
