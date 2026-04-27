import 'package:flutter/foundation.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../database/database_helper.dart';

class AppProvider extends ChangeNotifier {
  final DatabaseHelper _db = DatabaseHelper.instance;
  final ApiService _api = ApiService();
  
  Usuario? _usuario;
  Eleccion? _eleccionActual;
  Mesa? _mesaActual;
  Recinto? _recintoActual;
  bool _isOnline = true;
  bool _isLoading = false;
  String? _error;
  
  List<Candidato> _candidatos = [];
  List<Partido> _partidos = [];
  List<Cargo> _cargos = [];
  List<Voto> _votosMesa = [];
  int _totalVotos = 0;

  Usuario? get usuario => _usuario;
  Eleccion? get eleccionActual => _eleccionActual;
  Mesa? get mesaActual => _mesaActual;
  Recinto? get recintoActual => _recintoActual;
  bool get isOnline => _isOnline;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  List<Candidato> get candidatos => _candidatos;
  List<Partido> get partidos => _partidos;
  List<Cargo> get cargos => _cargos;
  List<Voto> get votosMesa => _votosMesa;
  int get totalVotos => _totalVotos;

  Future<void> init() async {
    _usuario = await _db.getUsuarioSession();
    if (_usuario != null) {
      await _cargarEleccionActual();
    }
    _checkConnectivity();
  }

  Future<void> _checkConnectivity() async {
    final result = await Connectivity().checkConnectivity();
    _isOnline = result != ConnectivityResult.none;
    notifyListeners();
    
    Connectivity().onConnectivityChanged.listen((result) {
      _isOnline = result != ConnectivityResult.none;
      notifyListeners();
      
      if (_isOnline) {
        sincronizarVotos();
      }
    });
  }

  Future<bool> login(String username, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    final response = await _api.login(username, password);
    
    if (response != null) {
      _usuario = response.toUsuario();
      await _db.guardarSession(_usuario!, response.token);
      _isLoading = false;
      notifyListeners();
      return true;
    }
    
    _isLoading = false;
    _error = 'Credenciales inválidas';
    notifyListeners();
    return false;
  }

  Future<void> logout() async {
    await _db.limpiarSession();
    _usuario = null;
    _eleccionActual = null;
    _mesaActual = null;
    _recintoActual = null;
    _candidatos = [];
    _votosMesa = [];
    notifyListeners();
  }

  Future<void> descargarDatos() async {
    if (_usuario == null) return;
    
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final token = await _db.getToken();
      
      final elecciones = await _api.getEleccionesActivas(token: token);
      if (elecciones.isNotEmpty) {
        await _db.guardarElecciones(elecciones);
        _eleccionActual = elecciones.first;
        
        final partidos = await _api.getPartidosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarPartidos(partidos);
        
        final cargos = await _api.getCargosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarCargos(cargos);
        
        final candidatos = await _api.getCandidatosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarCandidatos(candidatos);
        
        final recintos = await _api.getRecintosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarRecintos(recintos);
        
        final mesas = await _api.getMesasByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarMesas(mesas);
        
        _partidos = partidos;
        _cargos = cargos;
        _candidatos = candidatos;
      }
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = 'Error al descargar datos: $e';
      notifyListeners();
    }
  }

  Future<void> _cargarEleccionActual() async {
    final elecciones = await _db.getElecciones();
    if (elecciones.isNotEmpty) {
      _eleccionActual = elecciones.first;
      
      if (_usuario != null) {
        final mesas = await _db.getMesasByUsuario(_usuario!.id);
        if (mesas.isNotEmpty) {
          await seleccionarMesa(mesas.first);
        }
      }
    }
  }

  Future<void> seleccionarMesa(Mesa mesa) async {
    _mesaActual = mesa;
    _recintoActual = await _db.getRecinto(mesa.recintoId);
    _votosMesa = await _db.getVotosByMesa(mesa.id);
    _totalVotos = _votosMesa.fold(0, (sum, v) => sum + v.cantidadVotos);
    notifyListeners();
  }

  Future<void> registrarVoto(Candidato candidato, int cantidad) async {
    if (_mesaActual == null) return;
    
    final existente = _votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.candidatoId == candidato.id,
      orElse: () => null,
    );

    if (existente != null) {
      final nuevoVoto = existente.copyWith(
        cantidadVotos: existente.cantidadVotos + cantidad,
      );
      await _db.actualizarVoto(existente.id!, nuevoVoto);
    } else {
      final nuevoVoto = Voto(
        candidatoId: candidato.id,
        mesaId: _mesaActual!.id,
        cantidadVotos: cantidad,
        eleccionesId: _mesaActual!.eleccionesId,
      );
      await _db.guardarVoto(nuevoVoto);
    }

    await _recargarVotos();
    
    if (_isOnline) {
      await sincronizarVotos();
    }
  }

  Future<void> _recargarVotos() async {
    _votosMesa = await _db.getVotosByMesa(_mesaActual!.id);
    _totalVotos = _votosMesa.fold(0, (sum, v) => sum + v.cantidadVotos);
    notifyListeners();
  }

  Future<void> sincronizarVotos() async {
    if (_mesaActual == null || !_isOnline) return;
    
    final pendientes = await _db.getVotosPendientes();
    if (pendientes.isEmpty) return;

    _isLoading = true;
    notifyListeners();

    final token = await _db.getToken();
    for (var voto in pendientes) {
      final success = await _api.sincronizarVoto(voto, token: token);
      if (success && voto.id != null) {
        await _db.marcarVotoSincronizado(voto.id!);
      }
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> cerrarActa() async {
    if (_mesaActual == null) return;
    
    _isLoading = true;
    notifyListeners();

    if (_isOnline) {
      final token = await _db.getToken();
      await _api.cerrarMesa(_mesaActual!.id, token: token);
    }
    
    await _db.cerrarMesaLocal(_mesaActual!.id);
    await sincronizarVotos();
    
    _mesaActual = await _db.getMesa(_mesaActual!.id);
    
    _isLoading = false;
    notifyListeners();
  }

  int getVotosCandidato(Candidato candidato) {
    final voto = _votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.candidatoId == candidato.id,
      orElse: () => null,
    );
    return voto?.cantidadVotos ?? 0;
  }

  Future<int> get votosPendientes => _db.getCountVotosPendientes();
}