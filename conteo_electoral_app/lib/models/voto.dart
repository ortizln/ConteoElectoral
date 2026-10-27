class Voto {
  final int? id;
  final int? candidatoId;
  final int mesaId;
  final int cantidadVotos;
  final int eleccionesId;
  final int? opcionPapeletaId;
  final int? listaId;
  final bool sincronizado;
  final DateTime fechaRegistro;

  Voto({
    this.id,
    this.candidatoId,
    required this.mesaId,
    required this.cantidadVotos,
    required this.eleccionesId,
    this.opcionPapeletaId,
    this.listaId,
    this.sincronizado = false,
    DateTime? fechaRegistro,
  }) : fechaRegistro = fechaRegistro ?? DateTime.now();

  factory Voto.fromJson(Map<String, dynamic> json) {
    // B9: tolerar campos nulos del servidor para que un registro remoto malo
    // no trabe el cursor de pull completo
    final mesaId = (json['mesaId'] as num?)?.toInt();
    final cantidad = (json['cantidadVotos'] as num?)?.toInt();
    if (mesaId == null || cantidad == null) {
      throw FormatException('Voto remoto inválido: mesaId/cantidadVotos nulos');
    }
    DateTime fecha;
    try {
      fecha = json['fechaRegistro'] != null
          ? DateTime.parse(json['fechaRegistro'].toString())
          : DateTime.now();
    } catch (_) {
      fecha = DateTime.now();
    }
    return Voto(
      id: (json['id'] as num?)?.toInt(),
      candidatoId: (json['candidatoId'] as num?)?.toInt(),
      mesaId: mesaId,
      cantidadVotos: cantidad,
      eleccionesId: (json['eleccionesId'] as num?)?.toInt() ?? 0,
      opcionPapeletaId: (json['opcionPapeletaId'] as num?)?.toInt(),
      listaId: (json['listaId'] as num?)?.toInt(),
      sincronizado: json['sincronizado'] ?? false,
      fechaRegistro: fecha,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      if (candidatoId != null) 'candidatoId': candidatoId,
      'mesaId': mesaId,
      'cantidadVotos': cantidadVotos,
      'eleccionesId': eleccionesId,
      if (opcionPapeletaId != null) 'opcionPapeletaId': opcionPapeletaId,
      if (listaId != null) 'listaId': listaId,
      'fechaRegistro': fechaRegistro.toIso8601String(),
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
