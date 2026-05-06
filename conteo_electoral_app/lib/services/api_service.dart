import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/app_config.dart';
import '../models/models.dart';

class ApiService {
  static const String _serverUrlKey = 'server_url';
  String _baseUrl = AppEnvironment.current.baseUrl;

  String get baseUrl => _baseUrl;

  Future<void> loadServerUrl() async {
    final prefs = await SharedPreferences.getInstance();
    _baseUrl = prefs.getString(_serverUrlKey) ?? AppEnvironment.current.baseUrl;
  }

  Future<void> setServerUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    _baseUrl = url.endsWith('/api') ? url : '$url/api';
    await prefs.setString(_serverUrlKey, _baseUrl);
  }

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

  // Zonas
  Future<List<Zona>> getZonas() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/zonas'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Zona.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<Zona?> createZona(Zona zona) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/zonas'),
        headers: _headers(),
        body: jsonEncode(zona.toJson()),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return Zona.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<Zona?> updateZona(int id, Zona zona) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/zonas/$id'),
        headers: _headers(),
        body: jsonEncode(zona.toJson()),
      );
      if (response.statusCode == 200) {
        return Zona.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> deleteZona(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/zonas/$id'),
        headers: _headers(),
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      return false;
    }
  }

  // Provincias
  Future<List<Provincia>> getProvincias() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/provincias'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Provincia.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Provincia>> getProvinciasByZona(int zonaId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/provincias/zona/$zonaId'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Provincia.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<Provincia?> createProvincia(Provincia provincia) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/provincias'),
        headers: _headers(),
        body: jsonEncode(provincia.toJson()),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return Provincia.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<Provincia?> updateProvincia(int id, Provincia provincia) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/provincias/$id'),
        headers: _headers(),
        body: jsonEncode(provincia.toJson()),
      );
      if (response.statusCode == 200) {
        return Provincia.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> deleteProvincia(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/provincias/$id'),
        headers: _headers(),
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      return false;
    }
  }

  // Cantones
  Future<List<Canton>> getCantones() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/cantones'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Canton.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Canton>> getCantonesByProvincia(int provinciaId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/cantones/provincia/$provinciaId'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Canton.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<Canton?> createCanton(Canton canton) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/cantones'),
        headers: _headers(),
        body: jsonEncode(canton.toJson()),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return Canton.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<Canton?> updateCanton(int id, Canton canton) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/cantones/$id'),
        headers: _headers(),
        body: jsonEncode(canton.toJson()),
      );
      if (response.statusCode == 200) {
        return Canton.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> deleteCanton(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/cantones/$id'),
        headers: _headers(),
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      return false;
    }
  }

  // Parroquias
  Future<List<Parroquia>> getParroquias() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/parroquias'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Parroquia.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<Parroquia>> getParroquiasByCanton(int cantonId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/parroquias/canton/$cantonId'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => Parroquia.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<Parroquia?> createParroquia(Parroquia parroquia) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/parroquias'),
        headers: _headers(),
        body: jsonEncode(parroquia.toJson()),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return Parroquia.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<Parroquia?> updateParroquia(int id, Parroquia parroquia) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/parroquias/$id'),
        headers: _headers(),
        body: jsonEncode(parroquia.toJson()),
      );
      if (response.statusCode == 200) {
        return Parroquia.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> deleteParroquia(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/parroquias/$id'),
        headers: _headers(),
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      return false;
    }
  }

  // Instituciones Educativas
  Future<List<InstitucionEducativa>> getInstituciones() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/instituciones'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => InstitucionEducativa.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<List<InstitucionEducativa>> getInstitucionesByParroquia(int parroquiaId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/instituciones/parroquia/$parroquiaId'),
        headers: _headers(),
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((e) => InstitucionEducativa.fromJson(e)).toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  Future<InstitucionEducativa?> createInstitucion(InstitucionEducativa institucion) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/instituciones'),
        headers: _headers(),
        body: jsonEncode(institucion.toJson()),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return InstitucionEducativa.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<InstitucionEducativa?> updateInstitucion(int id, InstitucionEducativa institucion) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/instituciones/$id'),
        headers: _headers(),
        body: jsonEncode(institucion.toJson()),
      );
      if (response.statusCode == 200) {
        return InstitucionEducativa.fromJson(jsonDecode(response.body));
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> deleteInstitucion(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/instituciones/$id'),
        headers: _headers(),
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      return false;
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
      final response = await http.post(
        Uri.parse('$baseUrl/votos'),
        headers: _headers(token: token),
        body: jsonEncode(voto.toJson()),
      );
      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      return false;
    }
  }

  Future<Map<String, dynamic>> testConnection() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 405 || response.statusCode == 200) {
        return {'success': true, 'message': 'Conexión exitosa al servidor'};
      } else if (response.statusCode == 401 || response.statusCode == 403) {
        return {'success': true, 'message': 'Servidor responde (auth requerida)'};
      }
      return {'success': false, 'message': 'Servidor responde con código: ${response.statusCode}'};
    } catch (e) {
      return {'success': false, 'message': 'No se pudo conectar: $e'};
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