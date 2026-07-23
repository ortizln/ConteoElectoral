class Voto {
  final int? id;
  final int candidatoId;
  final int mesaId;
  final int cantidadVotos;
  final int eleccionesId;
  final int? opcionPapeletaId;
  final int? listaId;
  final bool sincronizado;
  final DateTime fechaRegistro;

  Voto({
    this.id,
    required this.candidatoId,
    required this.mesaId,
    required this.cantidadVotos,
    required this.eleccionesId,
    this.opcionPapeletaId,
    this.listaId,
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
      listaId: json['listaId'],
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
      if (listaId != null) 'listaId': listaId,
    };
  }

  Voto copyWith({
    int? id,
    int? candidatoId,
    int? mesaId,
    int? cantidadVotos,
    int? eleccionesId,
    int? opcionPapeletaId,
    int? listaId,
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
      listaId: listaId ?? this.listaId,
      sincronizado: sincronizado ?? this.sincronizado,
      fechaRegistro: fechaRegistro ?? this.fechaRegistro,
    );
  }
}
