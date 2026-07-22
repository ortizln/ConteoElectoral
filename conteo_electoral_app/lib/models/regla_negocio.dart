class ReglaNegocio {
  final int id;
  final String tipo;
  final String modulo;
  final String nombre;
  final String? descripcion;
  final String condicion;
  final String? mensajeError;
  final String? accion;
  final bool activa;
  final int prioridad;
  final String? createdAt;
  final String? updatedAt;

  ReglaNegocio({
    required this.id,
    required this.tipo,
    required this.modulo,
    required this.nombre,
    this.descripcion,
    required this.condicion,
    this.mensajeError,
    this.accion,
    required this.activa,
    required this.prioridad,
    this.createdAt,
    this.updatedAt,
  });

  factory ReglaNegocio.fromJson(Map<String, dynamic> json) {
    return ReglaNegocio(
      id: json['id'],
      tipo: json['tipo'] ?? 'VALIDACION',
      modulo: json['modulo'] ?? 'CANDIDATOS',
      nombre: json['nombre'] ?? '',
      descripcion: json['descripcion'],
      condicion: json['condicion'] ?? '{}',
      mensajeError: json['mensajeError'],
      accion: json['accion'],
      activa: json['activa'] ?? true,
      prioridad: json['prioridad'] ?? 0,
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'tipo': tipo,
      'modulo': modulo,
      'nombre': nombre,
      'descripcion': descripcion,
      'condicion': condicion,
      'mensajeError': mensajeError,
      'accion': accion,
      'activa': activa,
      'prioridad': prioridad,
    };
  }
}
