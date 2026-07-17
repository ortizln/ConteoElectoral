class Voto {
  final int? id;
  final int candidatoId;
  final int mesaId;
  final int cantidadVotos;
  final int eleccionesId;
  final int? opcionPapeletaId;
  final bool sincronizado;
  final DateTime fechaRegistro;

  Voto({
    this.id,
    required this.candidatoId,
    required this.mesaId,
    required this.cantidadVotos,
    required this.eleccionesId,
    this.opcionPapeletaId,
    this.sincronizado = false,
    DateTime? fechaRegistro,
  }) : fechaRegistro = fechaRegistro ?? DateTime.now();

  factory Voto.fromJson(Map<String, dynamic> json) {
    return Voto(
      id: json['id'],
      candidatoId: json['candidatoId'],
      mesaId: json['mesaId'],
      cantidadVotos: json['cantidadVotos'],
      eleccionesId: json['eleccionesId'],
      opcionPapeletaId: json['opcionPapeletaId'],
      sincronizado: json['sincronizado'] ?? false,
      fechaRegistro: json['fechaRegistro'] != null
          ? DateTime.parse(json['fechaRegistro'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'candidatoId': candidatoId,
      'mesaId': mesaId,
      'cantidadVotos': cantidadVotos,
      'eleccionesId': eleccionesId,
      if (opcionPapeletaId != null) 'opcionPapeletaId': opcionPapeletaId,
    };
  }

  Voto copyWith({
    int? id,
    int? candidatoId,
    int? mesaId,
    int? cantidadVotos,
    int? eleccionesId,
    int? opcionPapeletaId,
    bool? sincronizado,
    DateTime? fechaRegistro,
  }) {
    return Voto(
      id: id ?? this.id,
      candidatoId: candidatoId ?? this.candidatoId,
      mesaId: mesaId ?? this.mesaId,
      cantidadVotos: cantidadVotos ?? this.cantidadVotos,
      eleccionesId: eleccionesId ?? this.eleccionesId,
      opcionPapeletaId: opcionPapeletaId ?? this.opcionPapeletaId,
      sincronizado: sincronizado ?? this.sincronizado,
      fechaRegistro: fechaRegistro ?? this.fechaRegistro,
    );
  }
}
