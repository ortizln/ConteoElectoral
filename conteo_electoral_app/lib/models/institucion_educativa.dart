class InstitucionEducativa {
  final int id;
  final String nombre;
  final int parroquiaId;
  final String? parroquiaNombre;
  final String? direccion;
  final String? codigo;
  final String? tipo;

  InstitucionEducativa({
    required this.id,
    required this.nombre,
    required this.parroquiaId,
    this.parroquiaNombre,
    this.direccion,
    this.codigo,
    this.tipo,
  });

  factory InstitucionEducativa.fromJson(Map<String, dynamic> json) {
    return InstitucionEducativa(
      id: json['id'],
      nombre: json['nombre'],
      parroquiaId: json['parroquiaId'],
      parroquiaNombre: json['parroquiaNombre'],
      direccion: json['direccion'],
      codigo: json['codigo'],
      tipo: json['tipo'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'parroquiaId': parroquiaId,
      'direccion': direccion,
      'codigo': codigo,
      'tipo': tipo,
    };
  }
}
