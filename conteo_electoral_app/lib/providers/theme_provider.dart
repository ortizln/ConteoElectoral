import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:ui' show PlatformDispatcher;

/// Preferencia de tema (claro/oscuro/sistema) persistida en SharedPreferences.
/// Clave: 'alantek_theme_mode' = 'light' | 'dark' | 'system'
class ThemeProvider extends ChangeNotifier {
  static const _key = 'alantek_theme_mode';

  ThemeMode _mode = ThemeMode.system;

  ThemeMode get mode => _mode;

  bool get isDark =>
      _mode == ThemeMode.dark ||
      (_mode == ThemeMode.system &&
          PlatformDispatcher.instance.platformBrightness == Brightness.dark);

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    switch (prefs.getString(_key)) {
      case 'dark':
        _mode = ThemeMode.dark;
      case 'light':
        _mode = ThemeMode.light;
      default:
        _mode = ThemeMode.system;
    }
    notifyListeners();
  }

  Future<void> setMode(ThemeMode mode) async {
    _mode = mode;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, mode.name);
  }

  Future<void> toggle() async {
    final next = _mode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    await setMode(next);
  }
}
