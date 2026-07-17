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
  final int? eleccionesId;
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
    this.eleccionesId,
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
      eleccionesId: json['eleccionesId'],
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
      'eleccionesId': eleccionesId,
      'ordenEnLista': ordenEnLista,
      'tipo': tipo,
      'principal': principal,
      'activo': activo,
    };
  }

  String get nombreCompleto => '$nombre $apellido';
}
