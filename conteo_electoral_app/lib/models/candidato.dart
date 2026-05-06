class Candidato {
  final int id;
  final String nombre;
  final String apellido;
  final int? partidoId;
  final String partidoNombre;
  final int cargoId;
  final String cargoNombre;
  final String? fotoUrl;
  final int eleccionesId;

  Candidato({
    required this.id,
    required this.nombre,
    required this.apellido,
    this.partidoId,
    required this.partidoNombre,
    required this.cargoId,
    required this.cargoNombre,
    this.fotoUrl,
    required this.eleccionesId,
  });

  factory Candidato.fromJson(Map<String, dynamic> json) {
    return Candidato(
      id: json['id'],
      nombre: json['nombre'],
      apellido: json['apellido'],
      partidoId: json['partidoId'],
      partidoNombre: json['partidoNombre'] ?? 'Independiente',
      cargoId: json['cargoId'],
      cargoNombre: json['cargoNombre'],
      fotoUrl: json['fotoUrl'],
      eleccionesId: json['eleccionesId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'apellido': apellido,
      'partidoId': partidoId,
      'partidoNombre': partidoNombre,
      'cargoId': cargoId,
      'cargoNombre': cargoNombre,
      'fotoUrl': fotoUrl,
      'eleccionesId': eleccionesId,
    };
  }

  String get nombreCompleto => '$nombre $apellido';
}
