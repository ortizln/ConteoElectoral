class Mesa {
  final int id;
  final String numero;
  final String sexo;
  final int institucionId;
  final String? institucionNombre;
  final int eleccionesId;
  final bool cerrada;
  final int? usuarioId;

  Mesa({
    required this.id,
    required this.numero,
    required this.sexo,
    required this.institucionId,
    this.institucionNombre,
    required this.eleccionesId,
    required this.cerrada,
    this.usuarioId,
  });

  factory Mesa.fromJson(Map<String, dynamic> json) {
    return Mesa(
      id: json['id'],
      numero: json['numero'],
      sexo: json['sexo'],
      institucionId: json['institucionId'] ?? json['recintoId'] ?? 0,
      institucionNombre: json['institucionNombre'],
      eleccionesId: json['eleccionesId'],
      cerrada: json['cerrada'] ?? false,
      usuarioId: json['usuarioId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'numero': numero,
      'sexo': sexo,
      'institucionId': institucionId,
      'institucionNombre': institucionNombre,
      'eleccionesId': eleccionesId,
      'cerrada': cerrada,
      'usuarioId': usuarioId,
    };
  }
}
