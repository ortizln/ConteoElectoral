import 'package:flutter/material.dart';

/// Paleta ALANTEK — fuente única de verdad (tokens).
/// Web y móvil comparten estos mismos hex (ver frontend/src/styles/_tokens.scss).
class AlantekColors {
  AlantekColors._();

  // Militar (primarios)
  static const military900 = Color(0xFF263329);
  static const military700 = Color(0xFF344331);
  static const military500 = Color(0xFF48563C);

  // Acentos
  static const orange500 = Color(0xFFD97732);
  static const brown600 = Color(0xFF78543D);
  static const yellow400 = Color(0xFFE6B94F);

  // Fondos y superficies
  static const cream100 = Color(0xFFF6F0E5);
  static const white = Color(0xFFFFFFFF);

  // Neutros
  static const neutral900 = Color(0xFF1B241D);
  static const neutral700 = Color(0xFF45514A);
  static const neutral500 = Color(0xFF6B766F);
  static const neutral300 = Color(0xFFC9CFC7);
  static const neutral200 = Color(0xFFE3E7E0);
  static const neutral100 = Color(0xFFF0F3EE);

  // Semánticos
  static const success = Color(0xFF2F7D4F);
  static const successBg = Color(0xFFE4F2E9);
  static const danger = Color(0xFFC0392B);
  static const dangerBg = Color(0xFFFBE9E7);
  static const warningFg = Color(0xFF8A6A1F);
  static const warningBg = Color(0xFFFBF3DC);
  static const info = Color(0xFF2D6A8A);
  static const infoBg = Color(0xFFE5F0F5);

  // Paleta de gráficos ALANTEK (reemplaza la violeta)
  static const List<Color> chartColors = [
    Color(0xFF48563C), // military-500
    Color(0xFFD97732), // orange-500
    Color(0xFF78543D), // brown-600
    Color(0xFFE6B94F), // yellow-400
    Color(0xFF2F7D4F), // success
    Color(0xFF2D6A8A), // info
    Color(0xFFC0392B), // danger
    Color(0xFF7D9A72), // military-light
    Color(0xFFB98A5E), // orange-light
    Color(0xFF5A6B8C), // slate-blue
  ];
}
