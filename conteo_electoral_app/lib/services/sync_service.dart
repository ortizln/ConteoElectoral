import 'dart:convert';
import 'package:http/http.dart' as http;
import '../database/database_helper.dart';
import '../models/models.dart';

class SyncService {
  final DatabaseHelper _db = DatabaseHelper.instance;
  final String _baseUrl;
  static const int maxRetries = 5;

  SyncService(this._baseUrl);

  Future<String?> _getToken() async => await _db.getToken();

  Map<String, String> _headers(String? token) => {
    'Content-Type': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
  };

  Future<void> init() async {
    await _db.cleanFailedSyncOps();
    await _resetStalePending();
  }

  Future<void> _resetStalePending() async {
    final db = await _db.database;
    final stale = DateTime.now().subtract(const Duration(hours: 1)).toIso8601String();
    await db.rawUpdate(
      "UPDATE sync_queue SET status = 'PENDING' WHERE status = 'FAILED' AND retry_count < $maxRetries AND created_at > ?",
      [stale],
    );
  }

  Future<void> enqueueVoto(Voto voto) async {
    final entityId = voto.id ?? 0;
    final existingId = await _findPending('VOTO', entityId);
    if (existingId != null) {
      final db = await _db.database;
      await db.update(
        'sync_queue',
        {'payload': jsonEncode(voto.toJson()), 'created_at': DateTime.now().toIso8601String(), 'retry_count': 0},
        where: 'id = ?',
        whereArgs: [existingId],
      );
    } else {
      await _db.enqueueSync('VOTO', entityId, voto.id != null ? 'UPDATE' : 'CREATE', voto.toJson(), eleccionId: voto.eleccionesId);
    }
  }

  Future<void> enqueueCerrarMesa(int mesaId, int eleccionId) async {
    await _db.enqueueSync('MESA', mesaId, 'CLOSE', {'id': mesaId, 'cerrada': true}, eleccionId: eleccionId);
  }

  Future<int?> _findPending(String entityType, int entityId) async {
    final db = await _db.database;
    final maps = await db.query(
      'sync_queue',
      columns: ['id'],
      where: "entity_type = ? AND entity_id = ? AND status = 'PENDING'",
      whereArgs: [entityType, entityId],
      limit: 1,
    );
    return maps.isNotEmpty ? maps.first['id'] as int? : null;
  }

  Future<int> processPush() async {
    final token = await _getToken();
    final ops = await _db.getPendingSyncOps(limit: 50);
    if (ops.isEmpty) return 0;

    int sent = 0;
    for (final op in ops) {
      final id = op['id'] as int;
      final entityType = op['entity_type'] as String;
      final entityId = op['entity_id'] as int;
      final operation = op['operation'] as String;
      final payload = jsonDecode(op['payload'] as String) as Map<String, dynamic>;
      final retryCount = op['retry_count'] as int? ?? 0;

      if (retryCount >= maxRetries) {
        await _db.markSyncFailed(id, 'Excedió reintentos máximos ($maxRetries)');
        continue;
      }

      try {
        final success = await _sendOperation(entityType, entityId, operation, payload, token);
        if (success) {
          await _db.markSyncDone(id);
          sent++;
        } else {
          await _db.incrementRetry(id);
        }
      } catch (e) {
        await _db.markSyncFailed(id, e.toString());
      }
    }
    return sent;
  }

  Future<bool> _sendOperation(
    String entityType,
    int entityId,
    String operation,
    Map<String, dynamic> payload,
    String? token,
  ) async {
    final uri = Uri.parse('$_baseUrl/sync/push');
    final response = await http.post(
      uri,
      headers: _headers(token),
      body: jsonEncode({
        'operations': [
          {
            'entityType': entityType,
            'entityId': entityId,
            'operation': operation,
            'payload': payload,
          }
        ],
      }),
    );
    return response.statusCode == 200;
  }

  Future<int> pullChanges(int eleccionId) async {
    final token = await _getToken();
    final lastPull = await _db.getLastPullTimestamp();
    final since = lastPull?.toIso8601String() ?? '1970-01-01T00:00:00';

    final uri = Uri.parse('$_baseUrl/sync/pull?eleccionId=$eleccionId&since=${Uri.encodeComponent(since)}');
    final response = await http.get(uri, headers: _headers(token));

    if (response.statusCode != 200) return 0;

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final cambios = data['cambios'] as List<dynamic>? ?? [];
    if (cambios.isEmpty) return 0;

    int applied = 0;
    for (final c in cambios) {
      final ct = c['entityType'] as String?;
      final op = c['operation'] as String?;
      final p = c['payload'] as Map<String, dynamic>?;
      if (ct == null || op == null || p == null) continue;

      try {
        await _applyRemoteChange(ct, op, p);
        applied++;
      } catch (_) {}
    }

    await _db.setLastPullTimestamp(DateTime.now());
    return applied;
  }

  Future<void> _applyRemoteChange(String entityType, String operation, Map<String, dynamic> payload) async {
    if (entityType == 'VOTO') {
      final voto = Voto.fromJson(payload);
      if (operation == 'CREATE' || operation == 'UPDATE') {
        await _db.guardarVoto(voto);
        await _db.marcarVotoSincronizado(voto.id ?? 0);
      } else if (operation == 'DELETE') {
        final id = payload['id'] as int?;
        if (id != null) await _db.eliminarVoto(id);
      }
    } else if (entityType == 'MESA') {
      final mesaId = payload['id'] as int?;
      if (mesaId != null && operation == 'CLOSE') {
        await _db.cerrarMesaLocal(mesaId);
      }
    }
  }

  Future<int> retryFailedOps() async {
    final db = await _db.database;
    final result = await db.rawUpdate(
      "UPDATE sync_queue SET status = 'PENDING', last_error = NULL WHERE status = 'FAILED'",
    );
    return result;
  }

  Future<Map<String, int>> getSyncStatus() async {
    final pending = await _db.getPendingSyncCount();
    final failed = await _db.getFailedSyncCount();
    return {'pending': pending, 'failed': failed};
  }
}
