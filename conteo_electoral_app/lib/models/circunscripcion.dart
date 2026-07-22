class Circunscripcion {
  final int id;
  final int eleccionId;
  final String? eleccionNombre;
  final int? tipoCircunscripcionId;
  final String? tipoCircunscripcionCodigo;
  final String? tipoCircunscripcionNombre;
  final String nombre;
  final String? codigo;
  final int escanos;
  final double? umbralElectoral;
  final String metodoAsignacion;
  final bool activa;
  final String? createdAt;

  Circunscripcion({
    required this.id,
    required this.eleccionId,
    this.eleccionNombre,
    this.tipoCircunscripcionId,
    this.tipoCircunscripcionCodigo,
    this.tipoCircunscripcionNombre,
    required this.nombre,
    this.codigo,
    required this.escanos,
    this.umbralElectoral,
    required this.metodoAsignacion,
    required this.activa,
    this.createdAt,
  });

  factory Circunscripcion.fromJson(Map<String, dynamic> json) {
    return Circunscripcion(
      id: json['id'],
      eleccionId: json['eleccionId'],
      eleccionNombre: json['eleccionNombre'],
      tipoCircunscripcionId: json['tipoCircunscripcionId'],
      tipoCircunscripcionCodigo: json['tipoCircunscripcionCodigo'],
      tipoCircunscripcionNombre: json['tipoCircunscripcionNombre'],
      nombre: json['nombre'] ?? '',
      codigo: json['codigo'],
      escanos: json['escanos'] ?? 1,
      umbralElectoral: (json['umbralElectoral'] as num?)?.toDouble(),
      metodoAsignacion: json['metodoAsignacion'] ?? 'D_HONDT',
      activa: json['activa'] ?? true,
      createdAt: json['createdAt'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'eleccionId': eleccionId,
      'tipoCircunscripcionId': tipoCircunscripcionId,
      'nombre': nombre,
      'codigo': codigo,
      'escanos': escanos,
      'umbralElectoral': umbralElectoral,
      'metodoAsignacion': metodoAsignacion,
      'activa': activa,
    };
  }
}

class AsignacionDHondt {
  final int partidoId;
  final String partidoNombre;
  final String? partidoSigla;
  final int? listaId;
  final String? listaNombre;
  final int votosValidos;
  final double porcentajeVotos;
  final int escanosAsignados;
  final List<double> cocientes;

  AsignacionDHondt({
    required this.partidoId,
    required this.partidoNombre,
    this.partidoSigla,
    this.listaId,
    this.listaNombre,
    required this.votosValidos,
    required this.porcentajeVotos,
    required this.escanosAsignados,
    required this.cocientes,
  });

  factory AsignacionDHondt.fromJson(Map<String, dynamic> json) {
    return AsignacionDHondt(
      partidoId: json['partidoId'],
      partidoNombre: json['partidoNombre'] ?? '',
      partidoSigla: json['partidoSigla'],
      listaId: json['listaId'],
      listaNombre: json['listaNombre'],
      votosValidos: json['votosValidos'] ?? 0,
      porcentajeVotos: (json['porcentajeVotos'] as num?)?.toDouble() ?? 0,
      escanosAsignados: json['escanosAsignados'] ?? 0,
      cocientes: (json['cocientes'] as List?)?.map((e) => (e as num).toDouble()).toList() ?? [],
    );
  }
}

class ResultadoDHondt {
  final int circunscripcionId;
  final String circunscripcionNombre;
  final int totalEscanos;
  final int totalVotosValidos;
  final double umbralElectoral;
  final List<AsignacionDHondt> asignaciones;

  ResultadoDHondt({
    required this.circunscripcionId,
    required this.circunscripcionNombre,
    required this.totalEscanos,
    required this.totalVotosValidos,
    required this.umbralElectoral,
    required this.asignaciones,
  });

  factory ResultadoDHondt.fromJson(Map<String, dynamic> json) {
    return ResultadoDHondt(
      circunscripcionId: json['circunscripcionId'],
      circunscripcionNombre: json['circunscripcionNombre'] ?? '',
      totalEscanos: json['totalEscanos'] ?? 0,
      totalVotosValidos: json['totalVotosValidos'] ?? 0,
      umbralElectoral: (json['umbralElectoral'] as num?)?.toDouble() ?? 0,
      asignaciones: (json['asignaciones'] as List?)
          ?.map((e) => AsignacionDHondt.fromJson(e))
          .toList() ?? [],
    );
  }
}
