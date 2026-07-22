class Reconteo {
  final int id;
  final int mesaId;
  final String? mesaNumero;
  final String? institucionNombre;
  final String motivo;
  final String solicitadoPor;
  final String? fechaSolicitud;
  final String estado;
  final String? resultado;
  final String? realizadoPor;
  final String? fechaRealizacion;
  final String? createdAt;

  Reconteo({
    required this.id, required this.mesaId, this.mesaNumero,
    this.institucionNombre, required this.motivo, required this.solicitadoPor,
    this.fechaSolicitud, required this.estado, this.resultado,
    this.realizadoPor, this.fechaRealizacion, this.createdAt,
  });

  factory Reconteo.fromJson(Map<String, dynamic> json) => Reconteo(
    id: json['id'], mesaId: json['mesaId'], mesaNumero: json['mesaNumero'],
    institucionNombre: json['institucionNombre'], motivo: json['motivo'] ?? '',
    solicitadoPor: json['solicitadoPor'] ?? '',
    fechaSolicitud: json['fechaSolicitud'], estado: json['estado'] ?? 'PENDIENTE',
    resultado: json['resultado'], realizadoPor: json['realizadoPor'],
    fechaRealizacion: json['fechaRealizacion'], createdAt: json['createdAt'],
  );

  Map<String, dynamic> toJson() => {
    'mesaId': mesaId, 'motivo': motivo, 'solicitadoPor': solicitadoPor,
    'estado': estado, 'resultado': resultado, 'realizadoPor': realizadoPor,
  };
}

class Impugnacion {
  final int id; final int? mesaId; final String? mesaNumero;
  final String tipo; final String descripcion; final String solicitante;
  final String? fechaImpugnacion; final String estado; final String? createdAt;

  Impugnacion({
    required this.id, this.mesaId, this.mesaNumero, required this.tipo,
    required this.descripcion, required this.solicitante,
    this.fechaImpugnacion, required this.estado, this.createdAt,
  });

  factory Impugnacion.fromJson(Map<String, dynamic> json) => Impugnacion(
    id: json['id'], mesaId: json['mesaId'], mesaNumero: json['mesaNumero'],
    tipo: json['tipo'] ?? '', descripcion: json['descripcion'] ?? '',
    solicitante: json['solicitante'] ?? '',
    fechaImpugnacion: json['fechaImpugnacion'], estado: json['estado'] ?? 'PENDIENTE',
    createdAt: json['createdAt'],
  );

  Map<String, dynamic> toJson() => {
    'mesaId': mesaId, 'tipo': tipo, 'descripcion': descripcion, 'solicitante': solicitante,
    'estado': estado,
  };
}

class Observacion {
  final int id; final int? mesaId; final String? mesaNumero;
  final int? usuarioId; final String? usuarioNombre;
  final String tipo; final String descripcion;
  final String? fecha; final String? createdAt;

  Observacion({
    required this.id, this.mesaId, this.mesaNumero,
    this.usuarioId, this.usuarioNombre,
    required this.tipo, required this.descripcion,
    this.fecha, this.createdAt,
  });

  factory Observacion.fromJson(Map<String, dynamic> json) => Observacion(
    id: json['id'], mesaId: json['mesaId'], mesaNumero: json['mesaNumero'],
    usuarioId: json['usuarioId'], usuarioNombre: json['usuarioNombre'],
    tipo: json['tipo'] ?? 'OBSERVACION', descripcion: json['descripcion'] ?? '',
    fecha: json['fecha'], createdAt: json['createdAt'],
  );

  Map<String, dynamic> toJson() => {
    'mesaId': mesaId, 'tipo': tipo, 'descripcion': descripcion,
  };
}

class Resolucion {
  final int id; final String codigo; final String titulo;
  final String? descripcion; final int? impugnacionId;
  final String? impugnacionDescripcion; final String resueltoPor;
  final String? fechaResolucion; final String? detalle; final String? createdAt;

  Resolucion({
    required this.id, required this.codigo, required this.titulo,
    this.descripcion, this.impugnacionId, this.impugnacionDescripcion,
    required this.resueltoPor, this.fechaResolucion, this.detalle, this.createdAt,
  });

  factory Resolucion.fromJson(Map<String, dynamic> json) => Resolucion(
    id: json['id'], codigo: json['codigo'] ?? '', titulo: json['titulo'] ?? '',
    descripcion: json['descripcion'], impugnacionId: json['impugnacionId'],
    impugnacionDescripcion: json['impugnacionDescripcion'],
    resueltoPor: json['resueltoPor'] ?? '',
    fechaResolucion: json['fechaResolucion'], detalle: json['detalle'], createdAt: json['createdAt'],
  );

  Map<String, dynamic> toJson() => {
    'codigo': codigo, 'titulo': titulo, 'descripcion': descripcion,
    'impugnacionId': impugnacionId, 'resueltoPor': resueltoPor, 'detalle': detalle,
  };
}
