import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/app_provider.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/votacion_screen.dart';
import 'screens/zonas_screen.dart';
import 'screens/provincias_screen.dart';
import 'screens/cantones_screen.dart';
import 'screens/parroquias_screen.dart';
import 'screens/instituciones_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ConteoElectoralApp());
}

class ConteoElectoralApp extends StatelessWidget {
  const ConteoElectoralApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AppProvider()..init(),
      child: Consumer<AppProvider>(
        builder: (context, provider, _) {
          return MaterialApp(
            title: 'Conteo Electoral',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.light,
            home: provider.usuario == null
                ? const LoginScreen()
                : const HomeScreen(),
            routes: {
              '/votacion': (context) => const VotacionScreen(),
              '/zonas': (context) => const ZonasScreen(),
              '/provincias': (context) => const ProvinciasScreen(),
              '/cantones': (context) => const CantonesScreen(),
              '/parroquias': (context) => const ParroquiasScreen(),
              '/instituciones': (context) => const InstitucionesScreen(),
            },
          );
        },
      ),
    );
  }
}
