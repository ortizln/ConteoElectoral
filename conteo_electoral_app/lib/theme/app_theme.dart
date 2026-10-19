import 'package:flutter/material.dart';
import '../core/theme/alantek_colors.dart';

/// Colores semánticos de la app.
/// API ESTABLE: las pantallas usan AppColors.* — no renombrar.
/// Los valores provienen de la paleta ALANTEK (AlantekColors).
class AppColors {
  AppColors._();

  // Primarios / acentos (paleta ALANTEK)
  static const primary = AlantekColors.military500;
  static const primaryLight = AlantekColors.military700;
  static const primaryDark = AlantekColors.military900;
  static const secondary = AlantekColors.brown600;
  static const accent = AlantekColors.orange500;
  static const success = AlantekColors.success;
  static const warning = AlantekColors.yellow400;
  static const error = AlantekColors.danger;
  static const info = AlantekColors.info;

  // Neutros (adaptables light/dark).
  // ThemeProvider llama a applyTheme() al cambiar de modo; los valores por
  // defecto son los del tema claro. Por eso NO son const.
  static Color dark = AlantekColors.military900;
  static Color gray = AlantekColors.neutral700;
  static Color lightGray = AlantekColors.neutral500;
  static Color muted = AlantekColors.neutral100;
  static Color background = AlantekColors.cream100;
  static Color surface = AlantekColors.white;
  static Color border = AlantekColors.neutral200;

  static bool _isDark = false;
  static bool get isDarkMode => _isDark;

  /// Aplica la paleta neutra del tema (llamar antes de notifyListeners).
  static void applyTheme({required bool isDark}) {
    _isDark = isDark;
    if (isDark) {
      dark = const Color(0xFFF2F5F0);
      gray = const Color(0xFFA3ADA1);
      lightGray = const Color(0xFF8B958A);
      muted = const Color(0xFF2A352B);
      background = AlantekColors.neutral900;
      surface = AlantekColors.military700;
      border = const Color(0xFF3F4D42);
    } else {
      dark = AlantekColors.military900;
      gray = AlantekColors.neutral700;
      lightGray = AlantekColors.neutral500;
      muted = AlantekColors.neutral100;
      background = AlantekColors.cream100;
      surface = AlantekColors.white;
      border = AlantekColors.neutral200;
    }
  }

  // Gradiente de encabezados
  static const gradientStart = AlantekColors.military500;
  static const gradientEnd = AlantekColors.military700;

  static const List<Color> chartColors = AlantekColors.chartColors;
}

class AppTheme {
  AppTheme._();

  // ---------------- CLARO ----------------
  static ThemeData get light => _base(
        brightness: Brightness.light,
        scaffoldBg: AlantekColors.cream100,
        surface: AlantekColors.white,
        onSurface: AlantekColors.military900,
        outline: AlantekColors.neutral200,
        inputFill: AlantekColors.neutral100,
      );

  // ---------------- OSCURO ----------------
  static ThemeData get dark => _base(
        brightness: Brightness.dark,
        scaffoldBg: AlantekColors.neutral900,
        surface: AlantekColors.military700,
        onSurface: const Color(0xFFF2F5F0),
        outline: const Color(0xFF3F4D42),
        inputFill: AlantekColors.military900,
      );

  static ThemeData _base({
    required Brightness brightness,
    required Color scaffoldBg,
    required Color surface,
    required Color onSurface,
    required Color outline,
    required Color inputFill,
  }) {
    final isDark = brightness == Brightness.dark;
    final primary = isDark ? const Color(0xFF7D9A72) : AppColors.primary;
    final accent = isDark ? const Color(0xFFE08A45) : AppColors.accent;
    final error = isDark ? const Color(0xFFE8705F) : AppColors.error;

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: ColorScheme(
        brightness: brightness,
        primary: primary,
        onPrimary: isDark ? AppColors.dark : Colors.white,
        secondary: accent,
        onSecondary: isDark ? AppColors.dark : Colors.white,
        error: error,
        onError: Colors.white,
        surface: surface,
        onSurface: onSurface,
        outline: outline,
      ),
      scaffoldBackgroundColor: scaffoldBg,
      appBarTheme: AppBarTheme(
        backgroundColor: surface,
        foregroundColor: onSurface,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: onSurface,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardThemeData(
        color: surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(color: outline, width: 1),
        ),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: isDark ? AppColors.dark : Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primary,
          side: BorderSide(color: primary),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(foregroundColor: primary),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: inputFill,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: error),
        ),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        prefixIconColor: isDark ? const Color(0xFFA3ADA1) : AlantekColors.neutral700,
        labelStyle: TextStyle(
          color: isDark ? const Color(0xFFA3ADA1) : AlantekColors.neutral700,
        ),
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: primary,
        foregroundColor: isDark ? AppColors.dark : Colors.white,
        elevation: 4,
      ),
      dividerTheme: DividerThemeData(color: outline, thickness: 1),
      chipTheme: ChipThemeData(
        backgroundColor: inputFill,
        selectedColor: primary.withValues(alpha: 0.15),
        labelStyle: TextStyle(
          fontSize: 13,
          color: isDark ? const Color(0xFFCfd6CB) : AlantekColors.military900,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        side: BorderSide.none,
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: primary,
        unselectedItemColor: isDark ? const Color(0xFFA3ADA1) : AlantekColors.neutral700,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      drawerTheme: DrawerThemeData(backgroundColor: surface),
      dialogTheme: DialogThemeData(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }
}

class AppTextStyles {
  AppTextStyles._();

  static TextStyle get h1 => TextStyle(
      fontSize: 28, fontWeight: FontWeight.bold, color: AppColors.dark);
  static TextStyle get h2 => TextStyle(
      fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.dark);
  static TextStyle get h3 => TextStyle(
      fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.dark);
  static TextStyle get body => TextStyle(fontSize: 15, color: AppColors.dark);
  static TextStyle get bodySmall =>
      TextStyle(fontSize: 13, color: AppColors.gray);
  static TextStyle get caption =>
      TextStyle(fontSize: 12, color: AppColors.lightGray);
  static TextStyle get statValue => TextStyle(
      fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.dark);
  static TextStyle get statLabel =>
      TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.gray);
}
