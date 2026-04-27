import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import 'votacion_screen.dart';
import '../database/database_helper.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final provider = context.read<AppProvider>();
    await provider.descargarDatos();
    
    if (provider.eleccionActual != null) {
      final db = DatabaseHelper.instance;
      final mesas = await db.getMesasByUsuario(provider.usuario!.id);
      if (mesas.isNotEmpty) {
        await provider.seleccionarMesa(mesas.first);
        if (mounted) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => const VotacionScreen()),
          );
        }
      }
    }
  }

  Future<void> _descargarDatos() async {
    final provider = context.read<AppProvider>();
    await provider.descargarDatos();
    
    if (provider.error != null && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(provider.error!)),
      );
    }
  }

  Future<void> _logout() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cerrar Sesión'),
        content: const Text('¿Está seguro de cerrar sesión?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );

    if (confirm == true && mounted) {
      final provider = context.read<AppProvider>();
      await provider.logout();
      if (mounted) {
        Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Conteo Electoral'),
        actions: [
          IconButton(
            icon: const Icon(Icons.download),
            tooltip: 'Descargar Datos',
            onPressed: _descargarDatos,
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Cerrar Sesión',
            onPressed: _logout,
          ),
        ],
      ),
      body: Consumer<AppProvider>(
        builder: (context, provider, _) {
          if (provider.isLoading) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Descargando datos...'),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: _descargarDatos,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Card(
                  child: ListTile(
                    leading: const CircleAvatar(
                      child: Icon(Icons.person),
                    ),
                    title: Text(provider.usuario?.nombreCompleto ?? 'Usuario'),
                    subtitle: Text(provider.usuario?.rol ?? ''),
                  ),
                ),
                const SizedBox(height: 16),
                Card(
                  child: ListTile(
                    leading: const CircleAvatar(
                      child: Icon(Icons.how_to_vote),
                    ),
                    title: Text(provider.eleccionActual?.nombre ?? 'Sin elección activa'),
                    subtitle: provider.eleccionActual != null
                        ? const Text('Elección activa')
                        : const Text('No hay elecciones activas'),
                    trailing: provider.eleccionActual != null
                        ? const Icon(Icons.check_circle, color: Colors.green)
                        : const Icon(Icons.warning, color: Colors.orange),
                  ),
                ),
                const SizedBox(height: 16),
                if (provider.eleccionActual == null) ...[
                  const Card(
                    color: Colors.orange,
                    child: ListTile(
                      leading: Icon(Icons.download, color: Colors.white),
                      title: Text(
                        'Descargar Datos',
                        style: TextStyle(color: Colors.white),
                      ),
                      subtitle: Text(
                        'Pulse el botón de descarga para obtener los datos de la elección',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                ] else ...[
                  FutureBuilder<List>(
                    future: DatabaseHelper.instance.getMesasByUsuario(provider.usuario!.id),
                    builder: (context, snapshot) {
                      if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        return const Card(
                          child: ListTile(
                            leading: Icon(Icons.info_outline),
                            title: Text('Sin mesas asignadas'),
                            subtitle: Text('No tiene mesas asignadas'),
                          ),
                        );
                      }

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Mesas Asignadas (${snapshot.data!.length})',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          ...snapshot.data!.map((mesa) => Card(
                            child: ListTile(
                              leading: CircleAvatar(
                                backgroundColor: mesa.cerrada
                                    ? Colors.red[100]
                                    : Colors.green[100],
                                child: Text(mesa.numero),
                              ),
                              title: Text('Mesa ${mesa.numero}'),
                              subtitle: Text(mesa.cerrada
                                  ? 'CERRADA'
                                  : 'Abierta'),
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () async {
                                await provider.seleccionarMesa(mesa);
                                if (mounted) {
                                  Navigator.pushReplacement(
                                    context,
                                    MaterialPageRoute(
                                      builder: (_) => const VotacionScreen(),
                                    ),
                                  );
                                }
                              },
                            ),
                          )),
                        ],
                      );
                    },
                  ),
                ],
                const SizedBox(height: 24),
                Consumer<AppProvider>(
                  builder: (context, provider, _) {
                    if (provider.isOnline) {
                      return Card(
                        color: Colors.green[50],
                        child: const ListTile(
                          leading: Icon(Icons.wifi, color: Colors.green),
                          title: Text('En línea'),
                          subtitle: Text('Sincronización disponible'),
                        ),
                      );
                    } else {
                      return Card(
                        color: Colors.orange[50],
                        child: const ListTile(
                          leading: Icon(Icons.wifi_off, color: Colors.orange),
                          title: Text('Sin conexión'),
                          subtitle: Text('Los datos se sincronizarán cuando tenga conexión'),
                        ),
                      );
                    }
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}