import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:package_info_plus/package_info_plus.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/sync_service.dart';
import '../services/stomp_service.dart';
import '../database/database_helper.dart';

class AppProvider extends ChangeNotifier {
  final DatabaseHelper _db = DatabaseHelper.instance;
  final ApiService _api = ApiService();
  late final SyncService _sync;

  ApiService get api => _api;

  Usuario? _usuario;
  Eleccion? _eleccionActual;
  Mesa? _mesaActual;
  Recinto? _recintoActual;
  bool _isOnline = true;
  bool _isLoading = false;
  String? _error;
  String _serverUrl = 'http://10.0.2.2:8081/api';
  int _pendingSyncCount = 0;
  int _failedSyncCount = 0;
  bool _isSyncing = false;

  String _currentVersion = '';
  String? _latestVersion;
  bool _updateAvailable = false;
  bool _checkingUpdate = false;
  final StompService _stomp = StompService();
  StreamSubscription? _connectivitySub;
  StreamSubscription? _stompSyncSub;
  StreamSubscription? _stompDataSub;

  List<Candidato> _candidatos = [];
  List<Partido> _partidos = [];
  List<Cargo> _cargos = [];
  List<Voto> _votosMesa = [];
  int _totalVotos = 0;
  int _votosNulos = 0;
  int _votosBlanco = 0;

  Usuario? get usuario => _usuario;
  Eleccion? get eleccionActual => _eleccionActual;
  Mesa? get mesaActual => _mesaActual;
  Recinto? get recintoActual => _recintoActual;
  bool get isOnline => _isOnline;
  bool get isLoading => _isLoading;
  String? get error => _error;
  String get serverUrl => _serverUrl;
  int get pendingSyncCount => _pendingSyncCount;
  int get failedSyncCount => _failedSyncCount;
  bool get isSyncing => _isSyncing;

  String get currentVersion => _currentVersion;
  String? get latestVersion => _latestVersion;
  bool get updateAvailable => _updateAvailable;
  bool get checkingUpdate => _checkingUpdate;

  List<Candidato> get candidatos => _candidatos;
  List<Partido> get partidos => _partidos;
  List<Cargo> get cargos => _cargos;
  List<Voto> get votosMesa => _votosMesa;
  int get totalVotos => _totalVotos;
  int get votosNulos => _votosNulos;
  int get votosBlanco => _votosBlanco;

  Future<void> init() async {
    await _loadServerUrl();
    _sync = SyncService(_api.baseUrl);
    await _sync.init();
    _usuario = await _db.getUsuarioSession();
    if (_usuario != null) {
      await _cargarEleccionActual();
    }
    await _refreshSyncCounts();
    _checkConnectivity();
    _initStomp();
    _loadCurrentVersion();
    _checkForUpdate();
  }

  void _initStomp() {
    final wsBaseUrl = _serverUrl.replaceAll('/api', '');
    _stomp.connect(wsBaseUrl, eleccionId: _eleccionActual?.id);
    _sync.setStomp(_stomp);
    _stompSyncSub = _stomp.onSyncEvent.listen((_) {
      sincronizarVotos();
    });
    _stompDataSub = _stomp.onDataChanged.listen((_) {
      sincronizarVotos();
    });
  }

  Future<void> _loadServerUrl() async {
    final prefs = await SharedPreferences.getInstance();
    _serverUrl = prefs.getString('server_url') ?? 'http://10.0.2.2:8081/api';
    await _api.setServerUrl(_serverUrl);
  }

  Future<void> setServerUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    _serverUrl = url.endsWith('/api') ? url : '$url/api';
    await prefs.setString('server_url', _serverUrl);
    await _api.setServerUrl(url);
    notifyListeners();
  }

  Future<Map<String, dynamic>> testServerConnection() async {
    return await _api.testConnection();
  }

  Future<void> _loadCurrentVersion() async {
    try {
      final info = await PackageInfo.fromPlatform();
      _currentVersion = info.version;
    } catch (_) {}
  }

  Future<void> _checkForUpdate() async {
    if (_currentVersion.isEmpty) return;
    _checkingUpdate = true;
    notifyListeners();
    final result = await _api.getApkVersion();
    final serverVersion = result['version'];
    if (serverVersion != null && serverVersion.isNotEmpty) {
      final serverParts = serverVersion.split('.').map(int.tryParse).toList();
      final currentParts =
          _currentVersion.split('.').map(int.tryParse).toList();
      if (serverParts.length == currentParts.length) {
        bool newer = false;
        for (int i = 0; i < serverParts.length; i++) {
          final sp = serverParts[i] ?? 0;
          final cp = currentParts[i] ?? 0;
          if (sp > cp) {
            newer = true;
            break;
          } else if (sp < cp) {
            break;
          }
        }
        if (newer) {
          _latestVersion = serverVersion;
          _updateAvailable = true;
        }
      }
    }
    _checkingUpdate = false;
    notifyListeners();
  }

  Future<bool> isVersionSkipped(String version) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('skipped_version') == version;
  }

  Future<void> skipVersion(String version) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('skipped_version', version);
    _updateAvailable = false;
    notifyListeners();
  }

  Future<void> _checkConnectivity() async {
    final result = await Connectivity().checkConnectivity();
    _isOnline = result != ConnectivityResult.none;
    notifyListeners();

    _connectivitySub = Connectivity().onConnectivityChanged.listen((result) {
      _isOnline = result != ConnectivityResult.none;
      notifyListeners();
      if (_isOnline) {
        sincronizarVotos();
      }
    });
  }

  @override
  void dispose() {
    _connectivitySub?.cancel();
    _stompSyncSub?.cancel();
    _stompDataSub?.cancel();
    _stomp.dispose();
    super.dispose();
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
        _stomp.connect(_serverUrl.replaceAll('/api', ''), eleccionId: _eleccionActual!.id);
        
        final partidos = await _api.getPartidosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarPartidos(partidos);
        
        final cargos = await _api.getCargosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarCargos(cargos);
        
        final candidatos = await _api.getCandidatosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarCandidatos(candidatos);
        
        final recintos = await _api.getRecintosByEleccion(_eleccionActual!.id, token: token);
        await _db.guardarRecintos(recintos);
        
        final mesas = await _api.getMesasByCurrentUser(_eleccionActual!.id, token: token);
        await _db.guardarMesas(mesas);

        for (var mesa in mesas) {
          await _db.limpiarVotosSincronizadosByMesa(mesa.id);
          final votosServer = await _api.getVotosByMesa(mesa.id, token: token);
          if (votosServer.isNotEmpty) {
            await _db.guardarVotosSincronizados(votosServer);
          }
        }
        
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
    _recintoActual = null;
    _votosMesa = await _db.getVotosByMesa(mesa.id);
    _totalVotos = _votosMesa.fold(0, (sum, v) => sum + v.cantidadVotos);
    _votosNulos = mesa.votosNulos ?? 0;
    _votosBlanco = mesa.votosBlanco ?? 0;
    notifyListeners();
  }

  Future<void> registrarVoto(Candidato candidato, int cantidad, {int? listaId}) async {
    if (_mesaActual == null) return;

    final existente = _votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.candidatoId == candidato.id,
      orElse: () => null,
    );

    Voto voto;
    if (existente != null) {
      voto = existente.copyWith(
        cantidadVotos: existente.cantidadVotos + cantidad,
        listaId: listaId,
      );
      await _db.actualizarVoto(existente.id!, voto);
    } else {
      voto = Voto(
        candidatoId: candidato.id,
        mesaId: _mesaActual!.id,
        cantidadVotos: cantidad,
        eleccionesId: _mesaActual!.eleccionesId,
        listaId: listaId,
      );
      final newId = await _db.guardarVoto(voto);
      voto = voto.copyWith(id: newId);
    }

    await _sync.enqueueVoto(voto);
    await _recargarVotos();
    await _refreshSyncCounts();

    if (_isOnline) {
      await sincronizarVotos();
    }
  }

  Future<void> registrarVotosLista(int listaId, List<Candidato> candidatos, int cantidad) async {
    for (final candidato in candidatos) {
      await registrarVoto(candidato, cantidad, listaId: listaId);
    }
  }

  Future<void> _recargarVotos() async {
    _votosMesa = await _db.getVotosByMesa(_mesaActual!.id);
    _totalVotos = _votosMesa.fold(0, (sum, v) => sum + v.cantidadVotos);
    final mesa = await _db.getMesa(_mesaActual!.id);
    if (mesa != null) {
      _votosNulos = mesa.votosNulos ?? 0;
      _votosBlanco = mesa.votosBlanco ?? 0;
    }
    notifyListeners();
  }

  Future<int> retryFailedSync() async {
    final count = await _sync.retryFailedOps();
    if (count > 0 && _isOnline) await sincronizarVotos();
    await _refreshSyncCounts();
    return count;
  }

  Future<void> sincronizarVotos() async {
    if (!_isOnline || _isSyncing) return;

    _isSyncing = true;
    notifyListeners();

    try {
      await _sync.processPush();
      if (_eleccionActual != null) {
        await _sync.pullChanges(_eleccionActual!.id);
      }
      await _recargarVotos();
    } catch (_) {}

    await _refreshSyncCounts();
    _isSyncing = false;
    notifyListeners();
  }

  Future<void> actualizarNulos(int valor) async {
    if (_mesaActual == null) return;
    _votosNulos = valor < 0 ? 0 : valor;
    await _db.actualizarNulosBlanco(_mesaActual!.id, votosNulos: _votosNulos, votosBlanco: _votosBlanco);
    await _sync.enqueueNulos(_mesaActual!.id, _mesaActual!.eleccionesId, _votosNulos);
    await _refreshSyncCounts();
    if (_isOnline) await sincronizarVotos();
    notifyListeners();
  }

  Future<void> actualizarBlanco(int valor) async {
    if (_mesaActual == null) return;
    _votosBlanco = valor < 0 ? 0 : valor;
    await _db.actualizarNulosBlanco(_mesaActual!.id, votosNulos: _votosNulos, votosBlanco: _votosBlanco);
    await _sync.enqueueBlanco(_mesaActual!.id, _mesaActual!.eleccionesId, _votosBlanco);
    await _refreshSyncCounts();
    if (_isOnline) await sincronizarVotos();
    notifyListeners();
  }

  Future<void> cerrarActa() async {
    if (_mesaActual == null) return;

    _isLoading = true;
    notifyListeners();

    await _sync.enqueueCerrarMesa(_mesaActual!.id, _mesaActual!.eleccionesId);
    await _db.cerrarMesaLocal(_mesaActual!.id);

    if (_isOnline) {
      await sincronizarVotos();
    }

    _mesaActual = await _db.getMesa(_mesaActual!.id);
    await _refreshSyncCounts();
    _isLoading = false;
    notifyListeners();
  }

  Future<List<Map<String, dynamic>>> getSyncOps() async {
    return await _db.getAllSyncOps();
  }

  Future<void> retryAllFailed() async {
    await retryFailedSync();
  }

  Future<void> retrySingleOp(int id) async {
    final db = await _db.database;
    await db.update(
      'sync_queue',
      {'status': 'PENDING', 'last_error': null},
      where: 'id = ?',
      whereArgs: [id],
    );
    await _refreshSyncCounts();
    if (_isOnline) await sincronizarVotos();
  }

  Future<void> deleteSyncOp(int id) async {
    final db = await _db.database;
    await db.delete('sync_queue', where: 'id = ?', whereArgs: [id]);
    await _refreshSyncCounts();
  }

  Future<void> _refreshSyncCounts() async {
    final status = await _sync.getSyncStatus();
    _pendingSyncCount = status['pending'] ?? 0;
    _failedSyncCount = status['failed'] ?? 0;
  }

  int getVotosCandidato(Candidato candidato) {
    final voto = _votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.candidatoId == candidato.id,
      orElse: () => null,
    );
    return voto?.cantidadVotos ?? 0;
  }
}