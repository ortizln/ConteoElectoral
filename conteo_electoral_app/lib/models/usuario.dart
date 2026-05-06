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
