import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'stomp_service.dart';
import '../database/database_helper.dart';
import '../models/models.dart';

class SyncService {
  final DatabaseHelper _db = DatabaseHelper.instance;
  final String _baseUrl;
  StompService? _stomp;
  static const int maxRetries = 5;

  SyncService(this._baseUrl);

  void setStomp(StompService stomp) { _stomp = stomp; }

  Future<String?> _getToken() async => await _db.getToken();

  Map<String, String> _headers(String? token) => {
    'Content-Type': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
  };

  Future<void> init() async {
    await _resetStalePending();
  }

  Future<void> _resetStalePending() async {
    final db = await _db.database;
    await db.rawUpdate(
      "UPDATE sync_queue SET status = 'PENDING', last_error = NULL, retry_count = 0 WHERE status = 'FAILED' AND retry_count < $maxRetries",
    );
  }

  Future<void> enqueueVoto(Voto voto) async {
    final entityId = voto.candidatoId != null ? (voto.id ?? 0) : -(voto.listaId ?? 0);
    final existingId = await _findPending('voto', entityId);
    if (existingId != null) {
      final db = await _db.database;
      await db.update(
        'sync_queue',
        {'payload': jsonEncode(voto.toJson()), 'created_at': DateTime.now().toIso8601String(), 'retry_count': 0},
        where: 'id = ?',
        whereArgs: [existingId],
      );
    } else {
      await _db.enqueueSync('voto', entityId, 'CREATE', voto.toJson(), eleccionId: voto.eleccionesId);
    }
  }

  Future<void> enqueueCerrarMesa(int mesaId, int eleccionId) async {
    await _db.enqueueSync('mesa', mesaId, 'CERRAR', {'id': mesaId, 'cerrada': true}, eleccionId: eleccionId);
  }

  Future<void> enqueueNulos(int mesaId, int eleccionId, int votosNulos) async {
    final existingId = await _findPendingEntity('mesa', mesaId, 'NULOS');
    if (existingId != null) {
      final db = await _db.database;
      await db.update(
        'sync_queue',
        {'payload': jsonEncode({'votosNulos': votosNulos}), 'created_at': DateTime.now().toIso8601String(), 'retry_count': 0},
        where: 'id = ?',
        whereArgs: [existingId],
      );
    } else {
      await _db.enqueueSync('mesa', mesaId, 'NULOS', {'votosNulos': votosNulos}, eleccionId: eleccionId);
    }
  }

  Future<void> enqueueBlanco(int mesaId, int eleccionId, int votosBlanco) async {
    final existingId = await _findPendingEntity('mesa', mesaId, 'BLANCO');
    if (existingId != null) {
      final db = await _db.database;
      await db.update(
        'sync_queue',
        {'payload': jsonEncode({'votosBlanco': votosBlanco}), 'created_at': DateTime.now().toIso8601String(), 'retry_count': 0},
        where: 'id = ?',
        whereArgs: [existingId],
      );
    } else {
      await _db.enqueueSync('mesa', mesaId, 'BLANCO', {'votosBlanco': votosBlanco}, eleccionId: eleccionId);
    }
  }

  Future<int?> _findPendingEntity(String entityType, int entityId, String operation) async {
    final db = await _db.database;
    final maps = await db.query(
      'sync_queue',
      columns: ['id'],
      where: "entity_type = ? AND entity_id = ? AND operation = ? AND status = 'PENDING'",
      whereArgs: [entityType, entityId, operation],
      limit: 1,
    );
    return maps.isNotEmpty ? maps.first['id'] as int? : null;
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

    final List<Map<String, dynamic>> batch = [];
    final List<int> ids = [];

    for (final op in ops) {
      final id = op['id'] as int;
      final entityType = op['entity_type'] as String;
      final entityId = op['entity_id'] as int;
      final operation = op['operation'] as String;
      final operationId = op['operation_id'] as String? ?? '';
      final payload = jsonDecode(op['payload'] as String) as Map<String, dynamic>;
      final retryCount = op['retry_count'] as int? ?? 0;

      if (retryCount >= maxRetries) {
        await _db.markSyncFailed(id, 'Excedió reintentos máximos ($maxRetries)');
        continue;
      }

      batch.add({
        'operationId': operationId,
        'entity': entityType.toLowerCase(),
        'entityId': entityId,
        'action': operation,
        'data': payload,
      });
      ids.add(id);
    }

    if (batch.isEmpty) return 0;

    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/sync/push'),
        headers: _headers(token),
        body: jsonEncode({'operations': batch}),
      );

      if (response.statusCode == 200) {
        final body = jsonDecode(response.body) as Map<String, dynamic>;
        final results = body['results'] as List<dynamic>? ?? [];
        int acked = 0;
        for (final r in results) {
          final rid = r['operationId'] as String?;
          final ok = r['success'] as bool? ?? false;
          final err = r['error'] as String?;
          final idx = batch.indexWhere((b) => b['operationId'] == rid);
          if (idx >= 0 && idx < ids.length) {
            if (ok) {
              await _db.markSyncDone(ids[idx]);
              acked++;
            } else {
              await _db.markSyncFailed(ids[idx], err ?? 'Error desconocido');
            }
          }
        }
        return acked;
      } else {
        for (final id in ids) {
          await _db.incrementRetry(id);
        }
        return 0;
      }
    } catch (_) {
      for (final id in ids) {
        await _db.incrementRetry(id);
      }
      return 0;
    }
  }

  Future<int> pullChanges(int eleccionId) async {
    final token = await _getToken();
    final lastPull = await _db.getLastPullTimestamp();
    String since = '1970-01-01T00:00:00';
    if (lastPull != null) {
      since = lastPull.toUtc().toIso8601String().replaceAll(RegExp(r'[Z].*$'), '');
    }

    final uri = Uri.parse('$_baseUrl/sync/pull?eleccionId=$eleccionId&since=${Uri.encodeComponent(since)}');
    final response = await http.get(uri, headers: _headers(token));

    if (response.statusCode != 200) {
      debugPrint('sync/pull HTTP ${response.statusCode}: ${response.body.substring(0, response.body.length.clamp(0, 200))}');
      return 0;
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final cambios = data['operations'] as List<dynamic>? ?? data['cambios'] as List<dynamic>? ?? [];
    if (cambios.isEmpty) return 0;

    int applied = 0;
    bool anyFailed = false;
    for (final c in cambios) {
      final ct = (c['entity'] ?? c['entityType']) as String?;
      final op = (c['action'] ?? c['operation']) as String?;
      final p = (c['data'] ?? c['payload']) as Map<String, dynamic>?;
      if (ct == null || op == null || p == null) continue;

      try {
        await _applyRemoteChange(ct, op, p);
        applied++;
      } catch (_) {
        anyFailed = true;
      }
    }

    // Solo avanzar cursor si todos los cambios se aplicaron exitosamente
    if (!anyFailed) {
      await _db.setLastPullTimestamp(DateTime.now());
    }
    debugPrint('sync/pull: aplicados $applied/${cambios.length}${anyFailed ? ' (parcial)' : ''}');
    return applied;
  }

  Future<void> _applyRemoteChange(String entityType, String operation, Map<String, dynamic> payload) async {
    final et = entityType.toLowerCase();
    final op = operation.toUpperCase();
    if (et == 'voto') {
      final voto = Voto.fromJson(payload);
      if (op == 'CREATE' || op == 'UPDATE') {
        await _db.upsertVotoRemoto(voto);
      } else if (op == 'DELETE') {
        final id = payload['id'] as int?;
        if (id != null) await _db.eliminarVoto(id);
      }
    } else if (et == 'mesa') {
      final mesaId = payload['id'] as int?;
      if (mesaId == null) return;
      if (op == 'CERRAR' || op == 'CLOSE') {
        await _db.cerrarMesaLocal(mesaId);
      } else if (op == 'MESA_DATA') {
        // No pisar valores con operaciones locales aún no sincronizadas
        final nulosPendientes = await _findPendingEntity('mesa', mesaId, 'NULOS');
        final blancoPendientes = await _findPendingEntity('mesa', mesaId, 'BLANCO');
        await _db.actualizarNulosBlanco(
          mesaId,
          votosNulos: nulosPendientes != null ? null : payload['votosNulos'] as int?,
          votosBlanco: blancoPendientes != null ? null : payload['votosBlanco'] as int?,
        );
        final cerrada = payload['cerrada'] as bool? ?? false;
        if (cerrada) await _db.cerrarMesaLocal(mesaId);
      }
    }
  }

  Future<int> retryFailedOps({bool force = false}) async {
    final db = await _db.database;
    final String sql = force
        ? "UPDATE sync_queue SET status = 'PENDING', last_error = NULL, retry_count = 0 WHERE status = 'FAILED'"
        : "UPDATE sync_queue SET status = 'PENDING', last_error = NULL, retry_count = 0 WHERE status = 'FAILED' AND retry_count < $maxRetries";
    return await db.rawUpdate(sql);
  }

  Future<Map<String, int>> getSyncStatus() async {
    final pending = await _db.getPendingSyncCount();
    final failed = await _db.getFailedSyncCount();
    return {'pending': pending, 'failed': failed};
  }
}
