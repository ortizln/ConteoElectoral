import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';
import '../database/database_helper.dart';

class ApiService {
  static const String baseUrl = 'http://10.0.2.2:8080/api';
  
  final DatabaseHelper _db = DatabaseHelper.instance;

  Map<String, String> _headers({String? token}) {
    final headers = <String, String>{
      'Content-Type': 'application/json',
    };
    if (token != null) {
      headers['Authorization'] = 'Bearer $token';
    }
    return headers;
  }

  Future<LoginResponse?> login(String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: _headers(),
        body: jsonEncode({
          'username': username,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return LoginResponse.fromJson(data);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<List<Eleccion>> getEleccionesActivas({String? token}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/elecciones/activas'),
        headers: _headers(token: token),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Eleccion.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Partido>> getPartidosByEleccion(int eleccionesId, {String? token}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/partidos/eleccion/$eleccionesId'),
        headers: _headers(token: token),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Partido.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Cargo>> getCargosByEleccion(int eleccionesId, {String? token}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/cargos/eleccion/$eleccionesId'),
        headers: _headers(token: token),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Cargo.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Candidato>> getCandidatosByEleccion(int eleccionesId, {String? token}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/candidatos/eleccion/$eleccionesId'),
        headers: _headers(token: token),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Candidato.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Recinto>> getRecintosByEleccion(int eleccionesId, {String? token}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/recintos/eleccion/$eleccionesId'),
        headers: _headers(token: token),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Recinto.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Mesa>> getMesasByEleccion(int eleccionesId, {String? token}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/mesas/eleccion/$eleccionesId'),
        headers: _headers(token: token),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Mesa.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<bool> registrarVoto(Voto voto, {String? token}) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/votos'),
        headers: _headers(token: token),
        body: jsonEncode(voto.toJson()),
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  Future<bool> actualizarVoto(int id, Voto voto, {String? token}) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/votos/$id'),
        headers: _headers(token: token),
        body: jsonEncode(voto.toJson()),
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  Future<bool> cerrarMesa(int mesaId, {String? token}) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/mesas/$mesaId/cerrar'),
        headers: _headers(token: token),
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  Future<bool> sincronizarVoto(Voto voto, {String? token}) async {
    try {
      http.Response response;
      if (voto.id != null) {
        response = await http.put(
          Uri.parse('$baseUrl/votos/${voto.id}'),
          headers: _headers(token: token),
          body: jsonEncode(voto.toJson()),
        );
      } else {
        response = await http.post(
          Uri.parse('$baseUrl/votos'),
          headers: _headers(token: token),
          body: jsonEncode(voto.toJson()),
        );
      }
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}

class LoginResponse {
  final String token;
  final String type;
  final int id;
  final String username;
  final String nombre;
  final String apellido;
  final String rol;

  LoginResponse({
    required this.token,
    required this.type,
    required this.id,
    required this.username,
    required this.nombre,
    required this.apellido,
    required this.rol,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      token: json['token'],
      type: json['type'],
      id: json['id'],
      username: json['username'],
      nombre: json['nombre'],
      apellido: json['apellido'],
      rol: json['rol'],
    );
  }

  Usuario toUsuario() {
    return Usuario(
      id: id,
      username: username,
      nombre: nombre,
      apellido: apellido,
      rol: rol,
      activo: true,
    );
  }
}