class InstitucionEducativa {
  final int id;
  final String nombre;
  final int parroquiaId;
  final String? parroquiaNombre;
  final String? direccion;
  final String? codigo;
  final String? tipo;
  // ===== Juntas (mesas) =====
  final int? junfem; // Nº juntas femeninas
  final int? junmas; // Nº juntas masculinas
  final int? juninif; // Inicio juntas femeninas (nº mesa)
  final int? junfinf; // Fin juntas femeninas (nº mesa)
  final int? juninim; // Inicio juntas masculinas (nº mesa)
  final int? junfinm; // Fin juntas masculinas (nº mesa)
  final int? numjun; // Total de juntas = junfem + junmas (calculado en backend)

  InstitucionEducativa({
    required this.id,
    required this.nombre,
    required this.parroquiaId,
    this.parroquiaNombre,
    this.direccion,
    this.codigo,
    this.tipo,
    this.junfem,
    this.junmas,
    this.juninif,
    this.junfinf,
    this.juninim,
    this.junfinm,
    this.numjun,
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
      junfem: json['junfem'],
      junmas: json['junmas'],
      juninif: json['juninif'],
      junfinf: json['junfinf'],
      juninim: json['juninim'],
      junfinm: json['junfinm'],
      numjun: json['numjun'],
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
      'junfem': junfem,
      'junmas': junmas,
      'juninif': juninif,
      'junfinf': junfinf,
      'juninim': juninim,
      'junfinm': junfinm,
      // numjun lo calcula el backend (junfem + junmas)
    };
  }
}
