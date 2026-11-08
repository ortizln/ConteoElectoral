class Candidato {
  final int id;
  final String nombre;
  final String apellido;
  final int? partidoId;
  final String partidoNombre;
  final String? partidoSigla;
  final int? cargoId;
  final String? cargoNombre;
  final int? listaId;
  final String? listaNombre;
  final int? numeroLista;
  final String? fotoUrl;
  final bool? tieneFoto;
  final int? eleccionesId;
  final int? provinciaId;
  final int? cantonId;
  final int? parroquiaId;
  final int? ordenEnLista;
  final String? tipo;
  final bool? principal;
  final bool? activo;

  Candidato({
    required this.id,
    required this.nombre,
    required this.apellido,
    this.partidoId,
    required this.partidoNombre,
    this.partidoSigla,
    this.cargoId,
    this.cargoNombre,
    this.listaId,
    this.listaNombre,
    this.numeroLista,
    this.fotoUrl,
    this.tieneFoto,
    this.eleccionesId,
    this.provinciaId,
    this.cantonId,
    this.parroquiaId,
    this.ordenEnLista,
    this.tipo,
    this.principal,
    this.activo,
  });

  factory Candidato.fromJson(Map<String, dynamic> json) {
    return Candidato(
      id: json['id'],
      nombre: json['nombre'],
      apellido: json['apellido'],
      partidoId: json['partidoId'],
      partidoNombre: json['partidoNombre'] ?? 'Independiente',
      partidoSigla: json['partidoSigla'],
      cargoId: json['cargoId'],
      cargoNombre: json['cargoNombre'],
      listaId: json['listaId'],
      listaNombre: json['listaNombre'],
      numeroLista: json['numeroLista'],
      fotoUrl: json['fotoUrl'],
      tieneFoto: json['tieneFoto'],
      eleccionesId: json['eleccionesId'],
      provinciaId: json['provinciaId'],
      cantonId: json['cantonId'],
      parroquiaId: json['parroquiaId'],
      ordenEnLista: json['ordenEnLista'],
      tipo: json['tipo'],
      principal: json['principal'],
      activo: json['activo'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'apellido': apellido,
      'partidoId': partidoId,
      'partidoNombre': partidoNombre,
      'partidoSigla': partidoSigla,
      'cargoId': cargoId,
      'cargoNombre': cargoNombre,
      'listaId': listaId,
      'listaNombre': listaNombre,
      'numeroLista': numeroLista,
      'fotoUrl': fotoUrl,
      'tieneFoto': tieneFoto,
      'eleccionesId': eleccionesId,
      'provinciaId': provinciaId,
      'cantonId': cantonId,
      'parroquiaId': parroquiaId,
      'ordenEnLista': ordenEnLista,
      'tipo': tipo,
      'principal': principal,
      'activo': activo,
    };
  }

  String get nombreCompleto => '$nombre $apellido';
}
