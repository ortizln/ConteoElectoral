class Usuario {
  final int id;
  final String username;
  final String nombre;
  final String apellido;
  final String rol;
  final bool activo;

  Usuario({
    required this.id,
    required this.username,
    required this.nombre,
    required this.apellido,
    required this.rol,
    required this.activo,
  });

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      id: json['id'],
      username: json['username'],
      nombre: json['nombre'],
      apellido: json['apellido'],
      rol: json['rol'],
      activo: json['activo'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'nombre': nombre,
      'apellido': apellido,
      'rol': rol,
      'activo': activo,
    };
  }

  String get nombreCompleto => '$nombre $apellido';
}

class Eleccion {
  final int id;
  final String nombre;
  final String descripcion;
  final DateTime fechaInicio;
  final DateTime fechaFin;
  final bool activa;

  Eleccion({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.fechaInicio,
    required this.fechaFin,
    required this.activa,
  });

  factory Eleccion.fromJson(Map<String, dynamic> json) {
    return Eleccion(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'] ?? '',
      fechaInicio: DateTime.parse(json['fechaInicio']),
      fechaFin: DateTime.parse(json['fechaFin']),
      activa: json['activa'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
      'fechaInicio': fechaInicio.toIso8601String(),
      'fechaFin': fechaFin.toIso8601String(),
      'activa': activa,
    };
  }
}

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

class Cargo {
  final int id;
  final String nombre;
  final String descripcion;
  final int eleccionesId;

  Cargo({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.eleccionesId,
  });

  factory Cargo.fromJson(Map<String, dynamic> json) {
    return Cargo(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'] ?? '',
      eleccionesId: json['eleccionesId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
      'eleccionesId': eleccionesId,
    };
  }
}

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

class Recinto {
  final int id;
  final String nombre;
  final String direccion;
  final int eleccionesId;
  final int totalMesas;

  Recinto({
    required this.id,
    required this.nombre,
    required this.direccion,
    required this.eleccionesId,
    required this.totalMesas,
  });

  factory Recinto.fromJson(Map<String, dynamic> json) {
    return Recinto(
      id: json['id'],
      nombre: json['nombre'],
      direccion: json['direccion'] ?? '',
      eleccionesId: json['eleccionesId'],
      totalMesas: json['totalMesas'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'direccion': direccion,
      'eleccionesId': eleccionesId,
      'totalMesas': totalMesas,
    };
  }
}

class Mesa {
  final int id;
  final String numero;
  final String sexo;
  final int recintoId;
  final int eleccionesId;
  final bool cerrada;
  final int? usuarioId;

  Mesa({
    required this.id,
    required this.numero,
    required this.sexo,
    required this.recintoId,
    required this.eleccionesId,
    required this.cerrada,
    this.usuarioId,
  });

  factory Mesa.fromJson(Map<String, dynamic> json) {
    return Mesa(
      id: json['id'],
      numero: json['numero'],
      sexo: json['sexo'],
      recintoId: json['recintoId'],
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
      'recintoId': recintoId,
      'eleccionesId': eleccionesId,
      'cerrada': cerrada,
      'usuarioId': usuarioId,
    };
  }
}

class Voto {
  final int? id;
  final int candidatoId;
  final int mesaId;
  final int cantidadVotos;
  final int eleccionesId;
  final bool sincronizado;
  final DateTime fechaRegistro;

  Voto({
    this.id,
    required this.candidatoId,
    required this.mesaId,
    required this.cantidadVotos,
    required this.eleccionesId,
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
    };
  }

  Voto copyWith({
    int? id,
    int? candidatoId,
    int? mesaId,
    int? cantidadVotos,
    int? eleccionesId,
    bool? sincronizado,
    DateTime? fechaRegistro,
  }) {
    return Voto(
      id: id ?? this.id,
      candidatoId: candidatoId ?? this.candidatoId,
      mesaId: mesaId ?? this.mesaId,
      cantidadVotos: cantidadVotos ?? this.cantidadVotos,
      eleccionesId: eleccionesId ?? this.eleccionesId,
      sincronizado: sincronizado ?? this.sincronizado,
      fechaRegistro: fechaRegistro ?? this.fechaRegistro,
    );
  }
}

class MesaDetalle {
  final Mesa mesa;
  final Recinto recinto;
  final List<Voto> votos;
  final int totalVotos;

  MesaDetalle({
    required this.mesa,
    required this.recinto,
    required this.votos,
  }) : totalVotos = votos.fold(0, (sum, v) => sum + v.cantidadVotos);
}