class Mesa {
  final int id;
  final String numero;
  final String sexo;
  final int institucionId;
  final String? institucionNombre;
  /// Nombre de la parroquia de la mesa (viene en MesaResponse del backend).
  final String? parroquiaNombre;
  final int eleccionesId;
  final bool cerrada;
  final int? usuarioId;
  final int? votosNulos;
  final int? votosBlanco;
  /// Ausentes registrados manualmente para esta mesa.
  final int? ausentes;
  /// El acta fue aprobada por ADMIN/SUPERVISOR: bloquea edición local.
  final bool aprobada;

  Mesa({
    required this.id,
    required this.numero,
    required this.sexo,
    required this.institucionId,
    this.institucionNombre,
    this.parroquiaNombre,
    required this.eleccionesId,
    required this.cerrada,
    this.usuarioId,
    this.votosNulos,
    this.votosBlanco,
    this.ausentes,
    this.aprobada = false,
  });

  factory Mesa.fromJson(Map<String, dynamic> json) {
    return Mesa(
      id: json['id'],
      numero: json['numero'],
      sexo: json['sexo'],
      institucionId: json['institucionId'] ?? json['recintoId'] ?? 0,
      institucionNombre: json['institucionNombre'],
      parroquiaNombre: json['parroquiaNombre'],
      eleccionesId: json['eleccionesId'],
      cerrada: json['cerrada'] ?? false,
      usuarioId: json['usuarioId'],
      votosNulos: json['votosNulos'] ?? 0,
      votosBlanco: json['votosBlanco'] ?? 0,
      ausentes: json['ausentes'] ?? 0,
      aprobada: json['aprobada'] == true || json['aprobada'] == 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'numero': numero,
      'sexo': sexo,
      'institucionId': institucionId,
      'institucionNombre': institucionNombre,
      'parroquiaNombre': parroquiaNombre,
      'eleccionesId': eleccionesId,
      'cerrada': cerrada,
      'usuarioId': usuarioId,
      'votosNulos': votosNulos,
      'votosBlanco': votosBlanco,
      'ausentes': ausentes,
      'aprobada': aprobada,
    };
  }
}
