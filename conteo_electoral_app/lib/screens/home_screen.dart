import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../database/database_helper.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _autoLoad();
    });
  }

  Future<void> _autoLoad() async {
    final provider = context.read<AppProvider>();
    if (provider.eleccionActual == null) {
      await provider.descargarDatos();
    }
    if (mounted) _checkUpdateDialog();
  }

  Future<void> _descargarDatos() async {
    final provider = context.read<AppProvider>();
    await provider.descargarDatos();
    if (provider.error != null && mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(provider.error!)));
    }
  }

  Future<void> _logout() async {
    final confirm = await showConfirmDialog(
      context,
      title: 'Cerrar Sesión',
      message: '¿Está seguro de cerrar sesión?',
      confirmText: 'Cerrar',
      confirmColor: AppColors.error,
    );
    if (confirm && mounted) {
      await context.read<AppProvider>().logout();
      if (mounted) {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (_) => const LoginScreen()),
          (route) => false,
        );
      }
    }
  }

  void _checkUpdateDialog() {
    final provider = context.read<AppProvider>();
    if (!provider.updateAvailable) return;
    provider.isVersionSkipped(provider.latestVersion!).then((skipped) {
      if (!mounted || skipped) return;
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) => AlertDialog(
          title: const Text('Actualización disponible'),
          content: Text(
              'Nueva versión ${provider.latestVersion} disponible.\n'
              'Tu versión actual: v${provider.currentVersion}\n\n'
              'Contacta al administrador para obtener la nueva APK.'),
          actions: [
            TextButton(
              onPressed: () {
                provider.skipVersion(provider.latestVersion!);
                Navigator.pop(ctx);
              },
              child: const Text('Saltar esta versión'),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Cerrar'),
            ),
          ],
        ),
      );
    });
  }

  void _openVotacion(mesa) {
    final provider = context.read<AppProvider>();
    provider.seleccionarMesa(mesa).then((_) {
      if (mounted) Navigator.pushNamed(context, '/votacion');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, _) {
        return Scaffold(
          drawer: _buildDrawer(provider),
          appBar: AppBar(
            title: const Text('Conteo Electoral'),
            actions: [
              IconButton(
                icon: const Icon(Icons.download_outlined),
                tooltip: 'Descargar datos',
                onPressed: _descargarDatos,
              ),
              IconButton(
                icon: const Icon(Icons.logout),
                tooltip: 'Cerrar sesión',
                onPressed: _logout,
              ),
            ],
          ),
          body: provider.isLoading
              ? const Center(child: CircularProgressIndicator())
              : RefreshIndicator(
                  onRefresh: _descargarDatos,
                  child: ListView(
                    padding: const EdgeInsets.all(16),
                    children: [
                      // User card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [
                              AppColors.gradientStart,
                              AppColors.gradientEnd
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 24,
                              backgroundColor:
                                  Colors.white.withValues(alpha: 0.2),
                              child: Text(
                                (provider.usuario?.nombreCompleto ?? 'U')[0],
                                style: const TextStyle(
                                    fontSize: 22,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                      provider.usuario?.nombreCompleto ??
                                          'Usuario',
                                      style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w600)),
                                  const SizedBox(height: 2),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8, vertical: 2),
                                    decoration: BoxDecoration(
                                      color:
                                          Colors.white.withValues(alpha: 0.2),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(provider.usuario?.rol ?? '',
                                        style: const TextStyle(
                                            color: Colors.white, fontSize: 11)),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Stats row
                      Row(
                        children: [
                          Expanded(
                            child: StatCard(
                              label: 'Elección',
                              value: provider.eleccionActual?.nombre ??
                                  'Sin datos',
                              icon: Icons.how_to_vote_outlined,
                              color: AppColors.primary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Votar section
                      if (provider.eleccionActual != null)
                        FutureBuilder<List>(
                          future: DatabaseHelper.instance
                              .getMesasByUsuario(provider.usuario!.id),
                          builder: (context, snapshot) {
                            final mesas = snapshot.data ?? [];
                            if (mesas.isEmpty) {
                              return const Card(
                                child: Padding(
                                  padding: EdgeInsets.all(20),
                                  child: Center(
                                      child: Text('Sin mesas asignadas')),
                                ),
                              );
                            }

                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding:
                                      const EdgeInsets.only(left: 4, bottom: 8),
                                  child: Text(
                                      'Mesas Asignadas (${mesas.length})',
                                      style: AppTextStyles.h3),
                                ),
                                ...mesas.map((m) => Card(
                                      child: ListTile(
                                        contentPadding:
                                            const EdgeInsets.symmetric(
                                                horizontal: 16, vertical: 4),
                                        leading: Container(
                                          width: 44,
                                          height: 44,
                                          decoration: BoxDecoration(
                                            color: m.cerrada
                                                ? AppColors.error
                                                    .withValues(alpha: 0.1)
                                                : AppColors.success
                                                    .withValues(alpha: 0.1),
                                            borderRadius:
                                                BorderRadius.circular(12),
                                          ),
                                          child: Center(
                                            child: Text(m.numero,
                                                style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  color: m.cerrada
                                                      ? AppColors.error
                                                      : AppColors.success,
                                                  fontSize: 16,
                                                )),
                                          ),
                                        ),
                                        title: Text('Mesa ${m.numero}',
                                            style: const TextStyle(
                                                fontWeight: FontWeight.w600)),
                                        subtitle: Text(
                                            m.cerrada ? 'Cerrada' : 'Abierta',
                                            style: TextStyle(
                                                color: m.cerrada
                                                    ? AppColors.error
                                                    : AppColors.success)),
                                        trailing: const Icon(
                                            Icons.chevron_right,
                                            color: AppColors.lightGray),
                                        onTap: m.cerrada
                                            ? null
                                            : () => _openVotacion(m),
                                      ),
                                    )),
                              ],
                            );
                          },
                        ),

                      const SizedBox(height: 16),

                      // Admin sections
                      if (provider.usuario?.rol == 'ADMIN') ...[
                        const Padding(
                          padding: EdgeInsets.only(left: 4, bottom: 8),
                          child:
                              Text('Administración', style: AppTextStyles.h3),
                        ),
                        _adminTile(
                            Icons.map_outlined,
                            'Zonas',
                            AppColors.primary,
                            () => Navigator.pushNamed(context, '/zonas')),
                        _adminTile(
                            Icons.location_city_outlined,
                            'Provincias',
                            AppColors.secondary,
                            () => Navigator.pushNamed(context, '/provincias')),
                        _adminTile(
                            Icons.location_on_outlined,
                            'Cantones',
                            AppColors.warning,
                            () => Navigator.pushNamed(context, '/cantones')),
                        _adminTile(
                            Icons.terrain_outlined,
                            'Parroquias',
                            AppColors.info,
                            () => Navigator.pushNamed(context, '/parroquias')),
                        _adminTile(
                            Icons.school_outlined,
                            'Instituciones',
                            AppColors.accent,
                            () =>
                                Navigator.pushNamed(context, '/instituciones')),
                      ],

                      const SizedBox(height: 16),
                      SyncIndicator(isOnline: provider.isOnline, pendientes: provider.pendingSyncCount),
                      const SizedBox(height: 24),
                    ],
                  ),
                ),
        );
      },
    );
  }

  Widget _adminTile(
      IconData icon, String label, Color color, VoidCallback onTap) {
    return Card(
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(10)),
          child: Icon(icon, color: color, size: 22),
        ),
        title: Text(label,
            style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
        trailing: const Icon(Icons.chevron_right, color: AppColors.lightGray),
        onTap: onTap,
      ),
    );
  }

  Widget _buildDrawer(AppProvider provider) {
    return Drawer(
      child: Column(
        children: [
          UserAccountsDrawerHeader(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [AppColors.gradientStart, AppColors.gradientEnd],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            accountName: Text(provider.usuario?.nombreCompleto ?? ''),
            accountEmail: Text(provider.usuario?.rol ?? ''),
            currentAccountPicture: CircleAvatar(
              backgroundColor: Colors.white.withValues(alpha: 0.2),
              child: Text(
                (provider.usuario?.nombreCompleto ?? 'U')[0],
                style: const TextStyle(
                    fontSize: 28,
                    color: Colors.white,
                    fontWeight: FontWeight.bold),
              ),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.dashboard_outlined),
            title: const Text('Dashboard'),
            onTap: () => Navigator.pop(context),
          ),
          if (provider.usuario?.rol == 'ADMIN') ...[
            const Divider(),
            const Padding(
              padding: EdgeInsets.only(left: 16, top: 8, bottom: 4),
              child: Text('ADMINISTRACIÓN',
                  style: TextStyle(
                      fontSize: 11,
                      color: AppColors.gray,
                      fontWeight: FontWeight.w600)),
            ),
            ListTile(
              leading: const Icon(Icons.map_outlined, color: AppColors.primary),
              title: const Text('Zonas'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/zonas');
              },
            ),
            ListTile(
              leading: const Icon(Icons.location_city_outlined,
                  color: AppColors.secondary),
              title: const Text('Provincias'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/provincias');
              },
            ),
            ListTile(
              leading: const Icon(Icons.location_on_outlined,
                  color: AppColors.warning),
              title: const Text('Cantones'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/cantones');
              },
            ),
            ListTile(
              leading:
                  const Icon(Icons.terrain_outlined, color: AppColors.info),
              title: const Text('Parroquias'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/parroquias');
              },
            ),
            ListTile(
              leading:
                  const Icon(Icons.school_outlined, color: AppColors.accent),
              title: const Text('Instituciones'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/instituciones');
              },
            ),
          ],
          const Spacer(),
          if (provider.currentVersion.isNotEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              child: Text('v${provider.currentVersion}',
                  style: const TextStyle(
                      fontSize: 12, color: AppColors.gray)),
            ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.logout, color: AppColors.error),
            title: const Text('Cerrar Sesión',
                style: TextStyle(color: AppColors.error)),
            onTap: () {
              Navigator.pop(context);
              _logout();
            },
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
