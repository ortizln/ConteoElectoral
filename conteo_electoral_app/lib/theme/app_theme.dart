import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFF8B5CF6);
  static const primaryLight = Color(0xFFA78BFA);
  static const primaryDark = Color(0xFF7C3AED);
  static const secondary = Color(0xFF6366F1);
  static const accent = Color(0xFF3B82F6);
  static const success = Color(0xFF22C55E);
  static const warning = Color(0xFFF59E0B);
  static const error = Color(0xFFEF4444);
  static const info = Color(0xFF06B6D4);

  static const dark = Color(0xFF1E293B);
  static const gray = Color(0xFF64748B);
  static const lightGray = Color(0xFF94A3B8);
  static const muted = Color(0xFFF1F5F9);
  static const background = Color(0xFFF8FAFC);
  static const surface = Color(0xFFFFFFFF);
  static const border = Color(0xFFE2E8F0);

  static const gradientStart = Color(0xFF8B5CF6);
  static const gradientEnd = Color(0xFF6366F1);

  static const List<Color> chartColors = [
    Color(0xFF8B5CF6),
    Color(0xFF6366F1),
    Color(0xFF3B82F6),
    Color(0xFF06B6D4),
    Color(0xFF22C55E),
    Color(0xFFF59E0B),
    Color(0xFFF97316),
    Color(0xFFEF4444),
    Color(0xFFEC4899),
    Color(0xFFA855F7),
  ];
}

class AppTheme {
  static ThemeData get light {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: const ColorScheme.light(
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        surface: AppColors.surface,
        error: AppColors.error,
      ),
      scaffoldBackgroundColor: AppColors.background,
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.surface,
        foregroundColor: AppColors.dark,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: AppColors.dark,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardThemeData(
        color: AppColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: AppColors.border, width: 1),
        ),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
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
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.muted,
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
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: AppColors.error),
        ),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        prefixIconColor: AppColors.gray,
        labelStyle: const TextStyle(color: AppColors.gray),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 4,
      ),
      dividerTheme: const DividerThemeData(
        color: AppColors.border,
        thickness: 1,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.muted,
        selectedColor: AppColors.primary.withValues(alpha: 0.15),
        labelStyle: const TextStyle(fontSize: 13, color: AppColors.dark),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        side: BorderSide.none,
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.surface,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.gray,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      drawerTheme: const DrawerThemeData(
        backgroundColor: AppColors.surface,
      ),
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
  static const h1 = TextStyle(
      fontSize: 28, fontWeight: FontWeight.bold, color: AppColors.dark);
  static const h2 = TextStyle(
      fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.dark);
  static const h3 = TextStyle(
      fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.dark);
  static const body = TextStyle(fontSize: 15, color: AppColors.dark);
  static const bodySmall = TextStyle(fontSize: 13, color: AppColors.gray);
  static const caption = TextStyle(fontSize: 12, color: AppColors.lightGray);
  static const statValue = TextStyle(
      fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.dark);
  static const statLabel = TextStyle(
      fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.gray);
}
