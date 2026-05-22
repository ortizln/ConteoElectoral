import 'dart:convert';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/models.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._internal();
  static Database? _database;

  DatabaseHelper._internal();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('conteo_electoral.db');
    return _database!;
  }

  Future<Database> _initDB(String fileName) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, fileName);
    return await openDatabase(
      path,
      version: 2,
      onCreate: _createDB,
      onUpgrade: _upgradeDB,
    );
  }

  Future<void> _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE elecciones (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        fechaInicio TEXT NOT NULL,
        fechaFin TEXT NOT NULL,
        activa INTEGER NOT NULL
      )
    ''');


    await db.execute('''
      CREATE TABLE partidos (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        sigla TEXT,
        logoUrl TEXT,
        eleccionesId INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE cargos (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        eleccionesId INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE candidatos (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        partidoId INTEGER,
        partidoNombre TEXT,
        cargoId INTEGER NOT NULL,
        cargoNombre TEXT NOT NULL,
        fotoUrl TEXT,
        eleccionesId INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE recintos (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        direccion TEXT,
        institucionId INTEGER NOT NULL,
        eleccionesId INTEGER NOT NULL,
        totalMesas INTEGER DEFAULT 0
      )
    ''');


    await db.execute('''
      CREATE TABLE mesas (
        id INTEGER PRIMARY KEY,
        numero TEXT NOT NULL,
        sexo TEXT NOT NULL,
        institucionId INTEGER NOT NULL,
        institucionNombre TEXT,
        eleccionesId INTEGER NOT NULL,
        cerrada INTEGER NOT NULL DEFAULT 0,
        usuarioId INTEGER
      )
    ''');

    await db.execute('''
      CREATE TABLE votos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        candidatoId INTEGER NOT NULL,
        mesaId INTEGER NOT NULL,
        cantidadVotos INTEGER NOT NULL,
        eleccionesId INTEGER NOT NULL,
        sincronizado INTEGER NOT NULL DEFAULT 0,
        fechaRegistro TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE session (
        id INTEGER PRIMARY KEY,
        usuarioJson TEXT NOT NULL,
        token TEXT,
        fecha TEXT NOT NULL
      )
    ''');

    await db.execute('CREATE INDEX idx_votos_mesa ON votos(mesaId)');
    await db.execute('CREATE INDEX idx_votos_sinc ON votos(sincronizado)');
  }

  Future<void> _upgradeDB(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 2) {
      await db.execute('ALTER TABLE mesas ADD COLUMN institucionId INTEGER DEFAULT 0');
      await db.execute('UPDATE mesas SET institucionId = recintoId');
      await db.execute('ALTER TABLE mesas ADD COLUMN institucionNombre TEXT');
      await db.execute('ALTER TABLE elecciones ADD COLUMN fechaInicio TEXT');
      await db.execute('UPDATE elecciones SET fechaInicio = fecha_inicio');
      await db.execute('ALTER TABLE elecciones ADD COLUMN fechaFin TEXT');
      await db.execute('UPDATE elecciones SET fechaFin = fecha_fin');
    }
  }

  Future<void> guardarElecciones(List<Eleccion> elecciones) async {
    final db = await database;
    final batch = db.batch();
    for (var eleccion in elecciones) {
      batch.insert(
        'elecciones',
        {
          'id': eleccion.id,
          'nombre': eleccion.nombre,
          'descripcion': eleccion.descripcion,
          'fechaInicio': eleccion.fechaInicio.toIso8601String(),
          'fechaFin': eleccion.fechaFin.toIso8601String(),
          'activa': eleccion.activa ? 1 : 0,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<List<Eleccion>> getElecciones() async {
    final db = await database;
    final maps = await db.query('elecciones', where: 'activa = ?', whereArgs: [1]);
    return maps.map((m) => Eleccion(
      id: m['id'] as int,
      nombre: m['nombre'] as String,
      descripcion: m['descripcion'] as String? ?? '',
      fechaInicio: DateTime.parse(m['fechaInicio'] as String),
      fechaFin: DateTime.parse(m['fechaFin'] as String),
      activa: (m['activa'] as int) == 1,
    )).toList();
  }

  Future<void> guardarPartidos(List<Partido> partidos) async {
    final db = await database;
    final batch = db.batch();
    for (var partido in partidos) {
      batch.insert(
        'partidos',
        {
          'id': partido.id,
          'nombre': partido.nombre,
          'sigla': partido.sigla,
          'logoUrl': partido.logoUrl,
          'eleccionesId': partido.eleccionesId,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<List<Partido>> getPartidos(int eleccionesId) async {
    final db = await database;
    final maps = await db.query(
      'partidos',
      where: 'eleccionesId = ?',
      whereArgs: [eleccionesId],
    );
    return maps.map((m) => Partido(
      id: m['id'] as int,
      nombre: m['nombre'] as String,
      sigla: m['sigla'] as String? ?? '',
      logoUrl: m['logoUrl'] as String?,
      eleccionesId: m['eleccionesId'] as int,
    )).toList();
  }

  Future<void> guardarCargos(List<Cargo> cargos) async {
    final db = await database;
    final batch = db.batch();
    for (var cargo in cargos) {
      batch.insert(
        'cargos',
        {
          'id': cargo.id,
          'nombre': cargo.nombre,
          'descripcion': cargo.descripcion,
          'eleccionesId': cargo.eleccionesId,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<List<Cargo>> getCargos(int eleccionesId) async {
    final db = await database;
    final maps = await db.query(
      'cargos',
      where: 'eleccionesId = ?',
      whereArgs: [eleccionesId],
    );
    return maps.map((m) => Cargo(
      id: m['id'] as int,
      nombre: m['nombre'] as String,
      descripcion: m['descripcion'] as String? ?? '',
      eleccionesId: m['eleccionesId'] as int,
    )).toList();
  }

  Future<void> guardarCandidatos(List<Candidato> candidatos) async {
    final db = await database;
    final batch = db.batch();
    for (var candidato in candidatos) {
      batch.insert(
        'candidatos',
        {
          'id': candidato.id,
          'nombre': candidato.nombre,
          'apellido': candidato.apellido,
          'partidoId': candidato.partidoId,
          'partidoNombre': candidato.partidoNombre,
          'cargoId': candidato.cargoId,
          'cargoNombre': candidato.cargoNombre,
          'fotoUrl': candidato.fotoUrl,
          'eleccionesId': candidato.eleccionesId,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<List<Candidato>> getCandidatos(int eleccionesId) async {
    final db = await database;
    final maps = await db.query(
      'candidatos',
      where: 'eleccionesId = ?',
      whereArgs: [eleccionesId],
      orderBy: 'cargoNombre, apellido',
    );
    return maps.map((m) => Candidato(
      id: m['id'] as int,
      nombre: m['nombre'] as String,
      apellido: m['apellido'] as String,
      partidoId: m['partidoId'] as int?,
      partidoNombre: m['partidoNombre'] as String? ?? 'Independiente',
      cargoId: m['cargoId'] as int,
      cargoNombre: m['cargoNombre'] as String,
      fotoUrl: m['fotoUrl'] as String?,
      eleccionesId: m['eleccionesId'] as int,
    )).toList();
  }

  Future<void> guardarRecintos(List<Recinto> recintos) async {
    final db = await database;
    final batch = db.batch();
    for (var recinto in recintos) {
      batch.insert(
        'recintos',
        {
          'id': recinto.id,
          'nombre': recinto.nombre,
          'direccion': recinto.direccion,
          'institucionId': recinto.institucionId,
          'eleccionesId': recinto.eleccionesId,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit();
  }

  Future<List<Recinto>> getRecintos(int eleccionesId) async {
    final db = await database;
    final maps = await db.query(
      'recintos',
      where: 'eleccionesId = ?',
      whereArgs: [eleccionesId],
    );
    return maps.map((m) => Recinto(
      id: m['id'] as int,
      nombre: m['nombre'] as String,
      direccion: m['direccion'] as String? ?? '',
      institucionId: m['institucionId'] as int,
      eleccionesId: m['eleccionesId'] as int,
      totalMesas: m['totalMesas'] as int? ?? 0,
    )).toList();
  }

  Future<Recinto?> getRecinto(int id) async {
    final db = await database;
    final maps = await db.query('recintos', where: 'id = ?', whereArgs: [id]);
    if (maps.isEmpty) return null;
    final m = maps.first;
    return Recinto(
      id: m['id'] as int,
      nombre: m['nombre'] as String,
      direccion: m['direccion'] as String? ?? '',
      institucionId: m['institucionId'] as int,
      eleccionesId: m['eleccionesId'] as int,
      totalMesas: m['totalMesas'] as int? ?? 0,
    );
  }

  Future<void> guardarMesas(List<Mesa> mesas) async {
    final db = await database;
    final batch = db.batch();
    for (var mesa in mesas) {
      batch.insert(
        'mesas',
        {
          'id': mesa.id,
          'numero': mesa.numero,
          'sexo': mesa.sexo,
          'institucionId': mesa.institucionId,
          'institucionNombre': mesa.institucionNombre,
          'eleccionesId': mesa.eleccionesId,
          'cerrada': mesa.cerrada ? 1 : 0,
          'usuarioId': mesa.usuarioId,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<List<Mesa>> getMesasByUsuario(int usuarioId) async {
    final db = await database;
    final maps = await db.query(
      'mesas',
      where: 'usuarioId = ?',
      whereArgs: [usuarioId],
    );
    return maps.map((m) => Mesa(
      id: m['id'] as int,
      numero: m['numero'] as String,
      sexo: m['sexo'] as String,
      institucionId: m['institucionId'] as int,
      institucionNombre: m['institucionNombre'] as String?,
      eleccionesId: m['eleccionesId'] as int,
      cerrada: (m['cerrada'] as int) == 1,
      usuarioId: m['usuarioId'] as int?,
    )).toList();
  }

  Future<Mesa?> getMesa(int id) async {
    final db = await database;
    final maps = await db.query('mesas', where: 'id = ?', whereArgs: [id]);
    if (maps.isEmpty) return null;
    final m = maps.first;
    return Mesa(
      id: m['id'] as int,
      numero: m['numero'] as String,
      sexo: m['sexo'] as String,
      institucionId: m['institucionId'] as int,
      institucionNombre: m['institucionNombre'] as String?,
      eleccionesId: m['eleccionesId'] as int,
      cerrada: (m['cerrada'] as int) == 1,
      usuarioId: m['usuarioId'] as int?,
    );
  }

  Future<int> guardarVoto(Voto voto) async {
    final db = await database;
    return await db.insert('votos', {
      'candidatoId': voto.candidatoId,
      'mesaId': voto.mesaId,
      'cantidadVotos': voto.cantidadVotos,
      'eleccionesId': voto.eleccionesId,
      'sincronizado': voto.sincronizado ? 1 : 0,
      'fechaRegistro': voto.fechaRegistro.toIso8601String(),
    });
  }

  Future<void> actualizarVoto(int id, Voto voto) async {
    final db = await database;
    await db.update(
      'votos',
      {
        'cantidadVotos': voto.cantidadVotos,
        'sincronizado': 0,
        'fechaRegistro': DateTime.now().toIso8601String(),
      },
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<List<Voto>> getVotosByMesa(int mesaId) async {
    final db = await database;
    final maps = await db.query(
      'votos',
      where: 'mesaId = ?',
      whereArgs: [mesaId],
    );
    return maps.map((m) => Voto(
      id: m['id'] as int?,
      candidatoId: m['candidatoId'] as int,
      mesaId: m['mesaId'] as int,
      cantidadVotos: m['cantidadVotos'] as int,
      eleccionesId: m['eleccionesId'] as int,
      sincronizado: (m['sincronizado'] as int) == 1,
      fechaRegistro: DateTime.parse(m['fechaRegistro'] as String),
    )).toList();
  }

  Future<Voto?> getVotoByCandidatoAndMesa(int candidatoId, int mesaId) async {
    final db = await database;
    final maps = await db.query(
      'votos',
      where: 'candidatoId = ? AND mesaId = ?',
      whereArgs: [candidatoId, mesaId],
      limit: 1,
    );
    if (maps.isEmpty) return null;
    final m = maps.first;
    return Voto(
      id: m['id'] as int?,
      candidatoId: m['candidatoId'] as int,
      mesaId: m['mesaId'] as int,
      cantidadVotos: m['cantidadVotos'] as int,
      eleccionesId: m['eleccionesId'] as int,
      sincronizado: (m['sincronizado'] as int) == 1,
      fechaRegistro: DateTime.parse(m['fechaRegistro'] as String),
    );
  }

  Future<List<Voto>> getVotosPendientes() async {
    final db = await database;
    final maps = await db.query(
      'votos',
      where: 'sincronizado = ?',
      whereArgs: [0],
    );
    return maps.map((m) => Voto(
      id: m['id'] as int?,
      candidatoId: m['candidatoId'] as int,
      mesaId: m['mesaId'] as int,
      cantidadVotos: m['cantidadVotos'] as int,
      eleccionesId: m['eleccionesId'] as int,
      sincronizado: (m['sincronizado'] as int) == 1,
      fechaRegistro: DateTime.parse(m['fechaRegistro'] as String),
    )).toList();
  }

  Future<void> marcarVotoSincronizado(int id) async {
    final db = await database;
    await db.update(
      'votos',
      {'sincronizado': 1},
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<void> guardarVotosSincronizados(List<Voto> votos) async {
    final db = await database;
    final batch = db.batch();
    for (var voto in votos) {
      batch.insert(
        'votos',
        {
          'id': voto.id,
          'candidatoId': voto.candidatoId,
          'mesaId': voto.mesaId,
          'cantidadVotos': voto.cantidadVotos,
          'eleccionesId': voto.eleccionesId,
          'sincronizado': 1,
          'fechaRegistro': voto.fechaRegistro.toIso8601String(),
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<void> limpiarVotosSincronizadosByMesa(int mesaId) async {
    final db = await database;
    await db.delete('votos', where: 'mesaId = ? AND sincronizado = 1', whereArgs: [mesaId]);
  }

  Future<void> eliminarVoto(int id) async {
    final db = await database;
    await db.delete('votos', where: 'id = ?', whereArgs: [id]);
  }

  Future<void> cerrarMesaLocal(int mesaId) async {
    final db = await database;
    await db.update(
      'mesas',
      {'cerrada': 1},
      where: 'id = ?',
      whereArgs: [mesaId],
    );
  }

  Future<void> guardarSession(Usuario usuario, String? token) async {
    final db = await database;
    await db.delete('session');
    await db.insert('session', {
      'id': 1,
      'usuarioJson': jsonEncode(usuario.toJson()),
      'token': token,
      'fecha': DateTime.now().toIso8601String(),
    });
  }

  Future<Usuario?> getUsuarioSession() async {
    final db = await database;
    final maps = await db.query('session', limit: 1);
    if (maps.isEmpty) return null;
    final usuarioJson = jsonDecode(maps.first['usuarioJson'] as String);
    return Usuario.fromJson(usuarioJson as Map<String, dynamic>);
  }

  Future<String?> getToken() async {
    final db = await database;
    final maps = await db.query('session', limit: 1);
    if (maps.isEmpty) return null;
    return maps.first['token'] as String?;
  }

  Future<void> limpiarSession() async {
    final db = await database;
    await db.delete('session');
  }

  Future<int> getCountVotosPendientes() async {
    final db = await database;
    final result = await db.rawQuery(
      'SELECT COUNT(*) as count FROM votos WHERE sincronizado = 0',
    );
    return (result.first['count'] as int?) ?? 0;
  }

  Future<int> getTotalVotosByMesa(int mesaId) async {
    final db = await database;
    final result = await db.rawQuery(
      'SELECT COALESCE(SUM(cantidadVotos), 0) as total FROM votos WHERE mesaId = ?',
      [mesaId],
    );
    return (result.first['total'] as int?) ?? 0;
  }
}
