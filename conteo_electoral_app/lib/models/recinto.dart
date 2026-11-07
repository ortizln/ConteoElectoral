class Recinto {
  final int id;
  final String nombre;
  final String direccion;
  final int institucionId;
  final String? institucionNombre;
  final int? parroquiaId;
  final String? parroquiaNombre;
  final int? cantonId;
  final String? cantonNombre;
  final int? provinciaId;
  final String? provinciaNombre;
  final int? zonaId;
  final String? zonaNombre;
  final int eleccionesId;
  final int totalMesas;
  final double? latitud;
  final double? longitud;
  final int? electoresRegistrados;

  Recinto({
    required this.id,
    required this.nombre,
    required this.direccion,
    required this.institucionId,
    this.institucionNombre,
    this.parroquiaId,
    this.parroquiaNombre,
    this.cantonId,
    this.cantonNombre,
    this.provinciaId,
    this.provinciaNombre,
    this.zonaId,
    this.zonaNombre,
    required this.eleccionesId,
    required this.totalMesas,
    this.latitud,
    this.longitud,
    this.electoresRegistrados,
  });

  factory Recinto.fromJson(Map<String, dynamic> json) {
    return Recinto(
      id: json['id'],
      nombre: json['nombre'],
      direccion: json['direccion'] ?? '',
      institucionId: json['institucionId'],
      institucionNombre: json['institucionNombre'],
      parroquiaId: json['parroquiaId'],
      parroquiaNombre: json['parroquiaNombre'],
      cantonId: json['cantonId'],
      cantonNombre: json['cantonNombre'],
      provinciaId: json['provinciaId'],
      provinciaNombre: json['provinciaNombre'],
      zonaId: json['zonaId'],
      zonaNombre: json['zonaNombre'],
      eleccionesId: json['eleccionesId'],
      totalMesas: json['totalMesas'] ?? 0,
      latitud: (json['latitud'] as num?)?.toDouble(),
      longitud: (json['longitud'] as num?)?.toDouble(),
      electoresRegistrados: json['electoresRegistrados'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'direccion': direccion,
      'institucionId': institucionId,
      'eleccionesId': eleccionesId,
    };
  }
}
