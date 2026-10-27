import 'dart:async';
import 'dart:convert';
import 'package:stomp_dart_client/stomp.dart';
import 'package:stomp_dart_client/stomp_config.dart';
import 'package:stomp_dart_client/stomp_frame.dart';

class StompService {
  StompClient? _client;
  int? _eleccionId;
  int _failedAttempts = 0;
  static const int _maxFailedAttempts = 5;
  final StreamController<bool> _connectionController = StreamController<bool>.broadcast();
  final StreamController<void> _syncEventController = StreamController<void>.broadcast();
  final StreamController<void> _dataChangedController = StreamController<void>.broadcast();

  Stream<bool> get onConnectionChange => _connectionController.stream;
  Stream<void> get onSyncEvent => _syncEventController.stream;
  Stream<void> get onDataChanged => _dataChangedController.stream;
  bool get isConnected => _client?.connected ?? false;

  void connect(String wsBaseUrl, {int? eleccionId, String? token}) {
    _eleccionId = eleccionId;
    disconnect();
    _failedAttempts = 0;
    _client = StompClient(
      config: StompConfig.sockJS(
        url: '$wsBaseUrl/ws',
        stompConnectHeaders: token != null ? {'Authorization': 'Bearer $token'} : null,
        onConnect: (StompFrame frame) {
          _failedAttempts = 0;
          _connectionController.add(true);
          _subscribe();
        },
        onDisconnect: (StompFrame? frame) {
          _connectionController.add(false);
        },
        onStompError: (StompFrame frame) {
          // B16: un error de autenticación (p. ej. JWT vencido) se repite en cada
          // reconexión; detener el loop tras N intentos en vez de martillar al servidor
          _failedAttempts++;
          if (_failedAttempts >= _maxFailedAttempts) {
            disconnect();
          }
          _connectionController.add(false);
        },
        reconnectDelay: const Duration(seconds: 5),
        heartbeatOutgoing: const Duration(seconds: 10),
        heartbeatIncoming: const Duration(seconds: 10),
      ),
    );
    _client!.activate();
  }

  void _subscribe() {
    _client?.subscribe(
      destination: '/topic/sync',
      callback: (StompFrame frame) {
        _syncEventController.add(null);
      },
    );
    if (_eleccionId != null) {
      _client?.subscribe(
        destination: '/topic/resultados/$_eleccionId',
        callback: (StompFrame frame) {
          _dataChangedController.add(null);
        },
      );
    }
  }

  void send(String destination, Map<String, dynamic> body) {
    _client?.send(
      destination: destination,
      body: jsonEncode(body),
    );
  }

  void disconnect() {
    _client?.deactivate();
    _client = null;
  }

  void dispose() {
    disconnect();
    _connectionController.close();
    _syncEventController.close();
    _dataChangedController.close();
  }
}
