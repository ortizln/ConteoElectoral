import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../database/database_helper.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';
import '../models/models.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<List<Mesa>>? _mesasFuture;

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
    _mesasFuture = null;
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
            title: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 6,
                  height: 6,
                  margin: const EdgeInsets.only(right: 8),
                  decoration: BoxDecoration(
                    color: provider.isOnline
                        ? AppColors.success
                        : AppColors.error,
                    shape: BoxShape.circle,
                  ),
                ),
                const Text('Conteo Electoral'),
              ],
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.download_outlined),
                tooltip: 'Descargar datos',
                onPressed: _descargarDatos,
              ),
              if (provider.failedSyncCount + provider.pendingSyncCount > 0)
                IconButton(
                  icon: const Icon(Icons.sync_problem,
                      color: AppColors.warning),
                  tooltip:
                      '${provider.pendingSyncCount} pendientes, ${provider.failedSyncCount} fallidos',
                  onPressed: () =>
                      Navigator.pushNamed(context, '/pendientes'),
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
                    padding: const EdgeInsets.fromLTRB(12, 10, 12, 16),
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

                      // Eleccion title row
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        decoration: BoxDecoration(
                          color: AppColors.surface,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppColors.border),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: AppColors.primary.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: const Icon(Icons.how_to_vote_outlined,
                                  color: AppColors.primary, size: 16),
                            ),
                            const SizedBox(width: 10),
                            Flexible(
                              child: Text(
                                provider.eleccionActual?.nombre ??
                                    'Sin datos',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 14,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 10),

                      // Nulos / Blanco stats row
                      FutureBuilder<List<Mesa>>(
                        future: _mesasFuture ??= DatabaseHelper.instance
                            .getMesasByUsuario(provider.usuario!.id),
                        builder: (context, snapshot) {
                          final mesas = snapshot.data ?? <Mesa>[];
                          int totalNulos = 0, totalBlanco = 0;
                          for (final m in mesas) {
                            totalNulos += m.votosNulos ?? 0;
                            totalBlanco += m.votosBlanco ?? 0;
                          }
                          return Row(
                            children: [
                              Expanded(
                                child: _nulosBlancoTile(
                                  'Nulos',
                                  totalNulos,
                                  Icons.cancel_outlined,
                                  AppColors.error,
                                  () => _showNulosBlancoDetalle(this.context, mesas, 'Nulos'),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: _nulosBlancoTile(
                                  'Blanco',
                                  totalBlanco,
                                  Icons.check_circle_outline,
                                  AppColors.gray,
                                  () => _showNulosBlancoDetalle(this.context, mesas, 'Blanco'),
                                ),
                              ),
                            ],
                          );
                        },
                      ),
                      const SizedBox(height: 10),

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

  Widget _nulosBlancoTile(String label, int total, IconData icon, Color color, VoidCallback onTap) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: AppColors.border),
          ),
          child: Row(
            children: [
              Icon(icon, size: 16, color: color),
              const SizedBox(width: 6),
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text('$total', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: color)),
              ),
              const SizedBox(width: 4),
              const Icon(Icons.chevron_right, size: 14, color: AppColors.lightGray),
            ],
          ),
        ),
      ),
    );
  }

  void _showNulosBlancoDetalle(BuildContext context, List<Mesa> mesas, String tipo) {
    final color = tipo == 'Nulos' ? AppColors.error : AppColors.gray;
    final icon = tipo == 'Nulos' ? Icons.cancel_outlined : Icons.check_circle_outline;
    final conValor = mesas.where((m) {
      final v = tipo == 'Nulos' ? m.votosNulos : m.votosBlanco;
      return v != null && v > 0;
    }).toList();

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 20),
                const SizedBox(width: 8),
                Text('Votos $tipo por Mesa', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 16),
            if (conValor.isEmpty)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: const Center(child: Text('No hay votos registrados')),
              )
            else
              ...conValor.map((m) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Row(
                  children: [
                    Container(
                      width: 40, height: 40,
                      decoration: BoxDecoration(
                        color: color.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: Text(m.numero, style: TextStyle(fontWeight: FontWeight.bold, color: color, fontSize: 14)),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Mesa ${m.numero}', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                          if (m.institucionNombre != null)
                            Text(m.institucionNombre!, style: const TextStyle(fontSize: 11, color: AppColors.gray)),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: color.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        '${tipo == 'Nulos' ? m.votosNulos : m.votosBlanco}',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: color),
                      ),
                    ),
                  ],
                ),
              )),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cerrar'),
              ),
            ),
          ],
        ),
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
          ListTile(
            leading: const Icon(Icons.sync, color: AppColors.warning),
            title: const Text('Sync Pendientes'),
            subtitle: provider.pendingSyncCount + provider.failedSyncCount > 0
                ? Text('${provider.pendingSyncCount} pend, ${provider.failedSyncCount} fallidos',
                    style: const TextStyle(fontSize: 11, color: AppColors.gray))
                : null,
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/pendientes');
            },
          ),
          ListTile(
            leading: const Icon(Icons.settings_outlined),
            title: const Text('Configuración'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/configuracion');
            },
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
