import 'dart:io';

import 'package:package_info_plus/package_info_plus.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Resultado de la limpieza de la APK descargada.
class ApkCleanupResult {
  final bool permissionGranted;
  final int deleted;

  const ApkCleanupResult(this.permissionGranted, this.deleted);
}

/// Borra la APK del instalador que queda en Descargas después de instalar
/// o actualizar la aplicación.
class ApkCleanupService {
  static const _prefKey = 'apk_cleanup_version';

  static const _folders = <String>[
    '/storage/emulated/0/Download',
    '/storage/emulated/0/Downloads',
    '/sdcard/Download',
  ];

  /// Se ejecuta una sola vez por versión instalada.
  Future<ApkCleanupResult> runIfNeeded() async {
    final prefs = await SharedPreferences.getInstance();
    final info = await PackageInfo.fromPlatform();
    final version = '${info.version}+${info.buildNumber}';

    if (prefs.getString(_prefKey) == version) {
      return const ApkCleanupResult(true, 0);
    }

    final result = await clean();
    await prefs.setString(_prefKey, version);
    return result;
  }

  /// Fuerza la limpieza (se usa desde el botón manual del menú).
  Future<ApkCleanupResult> clean({bool abrirAjustesSiFalta = false}) async {
    if (!Platform.isAndroid) {
      return const ApkCleanupResult(false, 0);
    }

    if (!await _ensurePermission(abrirAjustesSiFalta)) {
      return const ApkCleanupResult(false, 0);
    }

    var deleted = 0;
    for (final path in _folders) {
      final dir = Directory(path);
      if (!await dir.exists()) continue;

      try {
        await for (final entity in dir.list(followLinks: false)) {
          if (entity is! File) continue;
          final name = entity.uri.pathSegments.last.toLowerCase();
          if (!name.endsWith('.apk') || !_isOurApk(name)) continue;
          try {
            await entity.delete();
            deleted++;
          } catch (_) {
            // Algunos archivos pueden estar en uso; se omite.
          }
        }
      } catch (_) {
        // Carpeta no accesible en este dispositivo; se omite.
      }
    }

    return ApkCleanupResult(true, deleted);
  }

  bool _isOurApk(String name) {
    return name == 'app-release.apk' ||
        name.contains('conteo') ||
        name.contains('conteo_electoral') ||
        name.contains('app-release');
  }

  Future<bool> _ensurePermission(bool abrirAjustesSiFalta) async {
    if (await Permission.manageExternalStorage.isGranted) return true;

    final manage = await Permission.manageExternalStorage.request();
    if (manage.isGranted) return true;

    // Android 10 o inferior: basta con permiso de almacenamiento clásico.
    try {
      final legacy = await Permission.storage.request();
      if (legacy.isGranted) return true;
    } catch (_) {
      // En Android 11+ este permiso ya no aplica.
    }

    if (abrirAjustesSiFalta) {
      await openAppSettings();
    }
    return false;
  }
}
