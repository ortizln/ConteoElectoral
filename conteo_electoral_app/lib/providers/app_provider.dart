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
import '../config/server_url.dart';
import '../config/app_config.dart';

class AppProvider extends ChangeNotifier {
  final DatabaseHelper _db = DatabaseHelper.instance;
  final ApiService _api = ApiService();
  late SyncService _sync;

  ApiService get api => _api;

  Usuario? _usuario;
  Eleccion? _eleccionActual;
  Mesa? _mesaActual;
  Recinto? _recintoActual;
  bool _isOnline = true;
  bool _isLoading = false;
  String? _error;
  String _serverUrl = AppEnvironment.defaultApiUrl;
  int _pendingSyncCount = 0;
  int _failedSyncCount = 0;
  bool _isSyncing = false;
  bool _syncQueued = false;

  String _currentVersion = '';
  String? _latestVersion;
  bool _updateAvailable = false;
  bool _checkingUpdate = false;
  final StompService _stomp = StompService();
  StreamSubscription? _connectivitySub;
  StreamSubscription? _stompSyncSub;
  StreamSubscription? _stompDataSub;
  Timer? _retryTimer;
  Timer? _nulosDebounce;
  Timer? _blancoDebounce;

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
    _sync.onUnauthorized = _onSessionExpired;
    await _sync.init();
    _usuario = await _db.getUsuarioSession();
    if (_usuario != null) {
      await _cargarEleccionActual();
    }
    await _refreshSyncCounts();
    await _checkConnectivity();
    _initStomp();
    _loadCurrentVersion();
    _checkForUpdate();
    // B7: empujar la cola pendiente al iniciar la app (no esperar a votar)
    if (_usuario != null && _isOnline) {
      unawaited(sincronizarVotos());
    }
  }

  void _initStomp() {
    final wsBaseUrl = ServerUrl.stripApiSuffix(_serverUrl);
    _db.getToken().then((token) {
      _stomp.connect(wsBaseUrl, eleccionId: _eleccionActual?.id, token: token);
    });
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
    var saved = prefs.getString('server_url');
    // Migrar URLs antiguas hardcodeadas (emulador/LAN) al dominio
    if (saved == null ||
        saved == 'http://10.0.2.2:8081/api' ||
        saved == 'http://192.168.1.43:8081/api') {
      saved = AppEnvironment.defaultApiUrl;
      await prefs.setString('server_url', saved);
    }
    _serverUrl = ServerUrl.normalizeApiUrl(saved);
    await _api.setServerUrl(_serverUrl);
  }

  Future<void> setServerUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    _serverUrl = ServerUrl.normalizeApiUrl(url);
    await prefs.setString('server_url', _serverUrl);
    await _api.setServerUrl(_serverUrl);
    _sync = SyncService(_api.baseUrl);
    await _sync.init();
    _sync.setStomp(_stomp);
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
      final wasOffline = !_isOnline;
      _isOnline = result != ConnectivityResult.none;
      notifyListeners();
      if (_isOnline && wasOffline) {
        // Reconexión: revivir ops FAILED (p. ej. por un corte de red) y sincronizar
        unawaited(retryFailedSync());
      }
    });
  }

  @override
  void dispose() {
    _retryTimer?.cancel();
    _nulosDebounce?.cancel();
    _blancoDebounce?.cancel();
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

    try {
      final response = await _api.login(username, password);
      
      if (response != null) {
        _usuario = response.toUsuario();
        await _db.guardarSession(_usuario!, response.token);
        // Token fresco: reconectar STOMP (el anterior pudo caducar y agotar reintentos)
        _stomp.connect(ServerUrl.stripApiSuffix(_serverUrl), token: response.token);
        _isLoading = false;
        notifyListeners();
        return true;
      }
      
      _isLoading = false;
      _error = 'Credenciales inválidas. Verifique usuario y contraseña.';
      notifyListeners();
      return false;
    } catch (e) {
      _isLoading = false;
      _error = 'Error de conexión: $e';
      notifyListeners();
      return false;
    }
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

  // Guarda para no ejecutar dos veces el logout (push y pull pueden recibir
  // 401 casi al mismo tiempo)
  bool _handlingSessionExpired = false;

  // Token expirado detectado por el sync (push/pull): cerrar sesión para que
  // el usuario vea la pantalla de login y sepa que debe ingresar nuevamente.
  // Los votos locales y la cola de sync se conservan.
  Future<void> _onSessionExpired() async {
    if (_handlingSessionExpired || _usuario == null) return;
    _handlingSessionExpired = true;
    try {
      _error = 'Sesión expirada. Inicie sesión nuevamente.';
      notifyListeners();
      await logout();
    } finally {
      _handlingSessionExpired = false;
    }
  }

  Future<bool> descargarDatos() async {
    if (_usuario == null) return false;
    
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final token = await _db.getToken();
      if (token == null) {
        _isLoading = false;
        _error = 'Sesión no encontrada. Inicie sesión nuevamente.';
        notifyListeners();
        return false;
      }
      
      final elecciones = await _api.getEleccionesActivas(token: token);
      if (elecciones.isEmpty) {
        _isLoading = false;
        _error = 'No hay elecciones activas disponibles.';
        notifyListeners();
        return false;
      }
      
      await _db.guardarElecciones(elecciones);
      _eleccionActual = elecciones.first;
      _stomp.connect(ServerUrl.stripApiSuffix(_serverUrl), eleccionId: _eleccionActual!.id, token: token);
      
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
      
      _isLoading = false;
      notifyListeners();
      // B7: tras descargar datos, empujar la cola local pendiente
      unawaited(sincronizarVotos());
      return true;
    } on UnauthorizedException {
      // B15: token vencido → limpiar sesión para que aparezca la pantalla de login
      // (los datos locales y la cola de sync se conservan)
      _isLoading = false;
      _error = 'Sesión expirada. Inicie sesión nuevamente.';
      notifyListeners();
      await logout();
      return false;
    } catch (e) {
      _isLoading = false;
      _error = 'Error al descargar datos: $e';
      notifyListeners();
      return false;
    }
  }

  Future<void> _cargarEleccionActual() async {
    final elecciones = await _db.getElecciones();
    if (elecciones.isNotEmpty) {
      _eleccionActual = elecciones.first;
      
      if (_usuario != null) {
        final mesas = await _db.getMesasByUsuario(_usuario!.id);
        if (mesas.isNotEmpty) {
          // Preferir una mesa abierta: si la primera está cerrada, al iniciar
          // la app caía directo a la pantalla "Mesa Cerrada"
          Mesa? abierta;
          for (final m in mesas) {
            if (!m.cerrada) { abierta = m; break; }
          }
          await seleccionarMesa(abierta ?? mesas.first);
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

    final isListaCargo = listaId != null || _isCargoLista(candidato.cargoId);
    final targetListaId = listaId ?? candidato.listaId;

    if (isListaCargo && targetListaId != null) {
      await _registrarVotoLista(targetListaId, cantidad);
      return;
    }

    final existente = _votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.candidatoId == candidato.id,
      orElse: () => null,
    );

    Voto voto;
    if (existente != null) {
      voto = existente.copyWith(
        cantidadVotos: existente.cantidadVotos + cantidad,
      );
      await _db.actualizarVoto(existente.id!, voto);
    } else {
      voto = Voto(
        candidatoId: candidato.id,
        mesaId: _mesaActual!.id,
        cantidadVotos: cantidad,
        eleccionesId: _mesaActual!.eleccionesId,
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

  Future<void> _registrarVotoLista(int listaId, int cantidad) async {
    final existente = _votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.listaId == listaId && v?.candidatoId == null,
      orElse: () => null,
    );

    Voto voto;
    if (existente != null) {
      voto = existente.copyWith(
        cantidadVotos: existente.cantidadVotos + cantidad,
      );
      await _db.actualizarVoto(existente.id!, voto);
    } else {
      voto = Voto(
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

  bool _isCargoLista(int? cargoId) {
    if (cargoId == null) return false;
    final cargo = _cargos.cast<Cargo?>().firstWhere(
      (c) => c?.id == cargoId,
      orElse: () => null,
    );
    return cargo?.tipoVotacion == 'LISTA';
  }

  Future<void> registrarVotosLista(int listaId, List<Candidato> candidatos, int cantidad) async {
    await _registrarVotoLista(listaId, cantidad);
  }

  Future<void> _recargarVotos() async {
    if (_mesaActual == null) return;
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
    final count = await _sync.retryFailedOps(force: true);
    if (count > 0 && _isOnline) await sincronizarVotos();
    await _refreshSyncCounts();
    return count;
  }

  Future<void> sincronizarVotos({bool forceRetry = false}) async {
    if (!_isOnline) return;
    // B11: no descartar el trigger si ya hay un sync en curso; repetir al terminar
    if (_isSyncing) {
      _syncQueued = true;
      return;
    }

    _isSyncing = true;
    notifyListeners();

    try {
      // forceRetry: el usuario pidió sincronizar explícitamente → dar 5 intentos
      // nuevos a las ops FAILED (una op con error permanente acumula retry_count
      // y quedaría trabada para siempre sin este reset)
      await _sync.retryFailedOps(force: forceRetry);
      await _sync.processPush();
      if (_eleccionActual != null) {
        await _sync.pullChanges(_eleccionActual!.id);
      }
      await _recargarVotos();
    } catch (_) {}

    await _refreshSyncCounts();
    _isSyncing = false;
    notifyListeners();

    final hasPending = _pendingSyncCount + _failedSyncCount > 0;
    _scheduleRetryIfNeeded(hasPending);

    if (_syncQueued) {
      _syncQueued = false;
      Timer(const Duration(milliseconds: 300), () => sincronizarVotos());
    }
  }

  void _scheduleRetryIfNeeded(bool hasPending) {
    _retryTimer?.cancel();
    if (hasPending && _isOnline) {
      _retryTimer = Timer(const Duration(seconds: 15), () {
        sincronizarVotos();
      });
    }
  }

  Future<void> actualizarNulos(int valor) async {
    if (_mesaActual == null) return;
    _votosNulos = valor < 0 ? 0 : valor;
    await _db.actualizarNulosBlanco(_mesaActual!.id, votosNulos: _votosNulos, votosBlanco: _votosBlanco);
    notifyListeners();
    final mesa = _mesaActual!;
    final nulos = _votosNulos;
    // B4: encolar inmediatamente en la outbox local (si la app se cierra en los
    // 500ms del debounce, el cambio no se pierde); el debounce solo limita la red
    await _sync.enqueueNulos(mesa.id, mesa.eleccionesId, nulos);
    await _refreshSyncCounts();
    notifyListeners();
    _nulosDebounce?.cancel();
    _nulosDebounce = Timer(const Duration(milliseconds: 500), () {
      if (_isOnline) unawaited(sincronizarVotos());
    });
  }

  Future<void> actualizarBlanco(int valor) async {
    if (_mesaActual == null) return;
    _votosBlanco = valor < 0 ? 0 : valor;
    await _db.actualizarNulosBlanco(_mesaActual!.id, votosNulos: _votosNulos, votosBlanco: _votosBlanco);
    notifyListeners();
    final mesa = _mesaActual!;
    final blanco = _votosBlanco;
    // B4: encolado inmediato en la outbox local; debounce solo para la red
    await _sync.enqueueBlanco(mesa.id, mesa.eleccionesId, blanco);
    await _refreshSyncCounts();
    notifyListeners();
    _blancoDebounce?.cancel();
    _blancoDebounce = Timer(const Duration(milliseconds: 500), () {
      if (_isOnline) unawaited(sincronizarVotos());
    });
  }

  Future<void> cerrarActa() async {
    if (_mesaActual == null) return;

    _isLoading = true;
    notifyListeners();

    // B12: garantizar el orden NULOS/BLANCO → CERRAR en la cola (se procesan
    // por created_at ASC); cancelar debounces y re-afirmar los valores finales
    _nulosDebounce?.cancel();
    _blancoDebounce?.cancel();
    final mesa = _mesaActual!;
    await _sync.enqueueNulos(mesa.id, mesa.eleccionesId, _votosNulos);
    await _sync.enqueueBlanco(mesa.id, mesa.eleccionesId, _votosBlanco);
    await _sync.enqueueCerrarMesa(mesa.id, mesa.eleccionesId);
    await _db.cerrarMesaLocal(mesa.id);

    if (_isOnline) {
      await sincronizarVotos();
    }

    _mesaActual = await _db.getMesa(mesa.id);
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
      {'status': 'PENDING', 'last_error': null, 'retry_count': 0},
      where: 'id = ?',
      whereArgs: [id],
    );
    await _refreshSyncCounts();
    notifyListeners(); // B13: refrescar contadores del banner en la UI
    if (_isOnline) await sincronizarVotos();
  }

  Future<void> deleteSyncOp(int id) async {
    final db = await _db.database;
    await db.delete('sync_queue', where: 'id = ?', whereArgs: [id]);
    await _refreshSyncCounts();
    notifyListeners(); // B13: refrescar contadores del banner en la UI
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