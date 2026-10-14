import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:conteo_electoral_app/database/database_helper.dart';

void main() {
  late DatabaseHelper db;

  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  setUp(() async {
    DatabaseHelper.resetForTesting();
    db = DatabaseHelper.instance;
    final path = await databaseFactory.getDatabasesPath();
    await databaseFactory.deleteDatabase('$path/conteo_electoral.db');
  });

  group('T01-T05: Outbox Local', () {
    test('T01: enqueueSync crea operación con UUID y status PENDING', () async {
      final id = await db.enqueueSync('voto', 1, 'CREATE', {'test': true}, eleccionId: 1);
      expect(id, greaterThan(0));

      final ops = await db.getPendingSyncOps();
      expect(ops.length, 1);
      expect(ops.first['status'], 'PENDING');
      expect(ops.first['operation_id'], isNotNull);
      expect(ops.first['operation_id'], isNotEmpty);
    });

    test('T02: operación persiste tras reopen (simulado via getPendingSyncOps)', () async {
      await db.enqueueSync('voto', 1, 'CREATE', {'test': true});
      final ops = await db.getPendingSyncOps();
      expect(ops.length, 1);
      expect(ops.first['status'], 'PENDING');
    });

    test('T03: incrementRetry incrementa retry_count sin resetear', () async {
      final id = await db.enqueueSync('voto', 1, 'CREATE', {'test': true});
      await db.incrementRetry(id);
      await db.incrementRetry(id);

      final ops = await db.getAllSyncOps();
      expect(ops.first['retry_count'], 2);
    });

    test('T04: markSyncFailed marca FAILED pero NO borra la fila', () async {
      final id = await db.enqueueSync('voto', 1, 'CREATE', {'test': true});
      await db.markSyncFailed(id, 'test error');

      final ops = await db.getAllSyncOps();
      expect(ops.length, 1, reason: 'Fila FAILED no debe ser borrada');
      expect(ops.first['status'], 'FAILED');
      expect(ops.first['last_error'], 'test error');
    });

    test('T05: cleanFailedSyncOps NO borra filas FAILED', () async {
      final id = await db.enqueueSync('voto', 1, 'CREATE', {'test': true});
      await db.markSyncFailed(id, 'error');

      await db.cleanFailedSyncOps();

      final ops = await db.getAllSyncOps();
      expect(ops.length, 1, reason: 'cleanFailedSyncOps debe estar deshabilitado');
    });
  });

  group('Outbox: markSyncDone', () {
    test('markSyncDone marca ACKNOWLEDGED sin borrar', () async {
      final id = await db.enqueueSync('voto', 1, 'CREATE', {'test': true});
      await db.markSyncDone(id);

      final dbRaw = await db.database;
      final allOps = await dbRaw.query('sync_queue');
      expect(allOps.where((o) => o['status'] == 'ACKNOWLEDGED').length, 1);
      expect(allOps.first['ack_at'], isNotNull);

      final pending = await db.getPendingSyncCount();
      expect(pending, 0, reason: 'No debe quedar PENDING tras ACK');
    });
  });

  group('Outbox: operationId UUID', () {
    test('cada enqueue genera operationId único', () async {
      await db.enqueueSync('voto', 1, 'CREATE', {'a': 1});
      await db.enqueueSync('voto', 2, 'CREATE', {'b': 2});

      final ops = await db.getPendingSyncOps();
      expect(ops.length, 2);
      expect(ops[0]['operation_id'], isNot(equals(ops[1]['operation_id'])));
    });
  });

  group('Cursor de pull', () {
    test('getServerCursor inicia en 0', () async {
      final cursor = await db.getServerCursor();
      expect(cursor, 0);
    });

    test('setServerCursor persiste valor', () async {
      await db.setServerCursor(42);
      final cursor = await db.getServerCursor();
      expect(cursor, 42);
    });
  });

  group('Votos: proteccion de datos locales', () {
    test('eliminarVoto solo borra si sincronizado=1', () async {
      final db2 = await db.database;
      await db2.insert('votos', {
        'candidatoId': 1, 'mesaId': 1, 'cantidadVotos': 10,
        'eleccionesId': 1, 'sincronizado': 0, 'fechaRegistro': DateTime.now().toIso8601String(),
      });
      final localId = await db2.insert('votos', {
        'candidatoId': 2, 'mesaId': 1, 'cantidadVotos': 5,
        'eleccionesId': 1, 'sincronizado': 1, 'fechaRegistro': DateTime.now().toIso8601String(),
      });

      await db.eliminarVoto(localId);

      final remaining = await db2.query('votos');
      expect(remaining.length, 1, reason: 'Voto local no sincronizado NO debe ser borrado');
      expect(remaining.first['sincronizado'], 0);
    });

    test('guardarVotosSincronizados con ignore no sobrescribe local pendiente', () async {
      final db2 = await db.database;
      await db2.insert('votos', {
        'id': 100, 'candidatoId': 1, 'mesaId': 1, 'cantidadVotos': 10,
        'eleccionesId': 1, 'sincronizado': 0, 'fechaRegistro': DateTime.now().toIso8601String(),
      });

      await db.guardarVotosSincronizados([]);

      final remaining = await db2.query('votos', where: 'id = 100');
      expect(remaining.length, 1, reason: 'Voto local pendiente debe preservarse');
    });
  });
}
