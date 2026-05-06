import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';

class ZonasScreen extends StatefulWidget {
  const ZonasScreen({super.key});

  @override
  State<ZonasScreen> createState() => _ZonasScreenState();
}

class _ZonasScreenState extends State<ZonasScreen> {
  List<Zona> _zonas = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadZonas();
  }

  Future<void> _loadZonas() async {
    setState(() => _isLoading = true);
    final api = context.read<AppProvider>().api;
    final zonas = await api.getZonas();
    setState(() {
      _zonas = zonas;
      _isLoading = false;
    });
  }

  Future<void> _showForm({Zona? zona}) async {
    final nombreController = TextEditingController(text: zona?.nombre ?? '');
    final descripcionController = TextEditingController(text: zona?.descripcion ?? '');

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(zona == null ? 'Nueva Zona' : 'Editar Zona'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nombreController,
              decoration: const InputDecoration(
                labelText: 'Nombre',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: descripcionController,
              decoration: const InputDecoration(
                labelText: 'Descripción',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final api = context.read<AppProvider>().api;
              final zonaNueva = Zona(
                id: zona?.id ?? 0,
                nombre: nombreController.text,
                descripcion: descripcionController.text,
              );

              if (zona == null) {
                await api.createZona(zonaNueva);
              } else {
                await api.updateZona(zona.id, zonaNueva);
              }

              if (mounted) {
                Navigator.pop(context);
                _loadZonas();
              }
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  Future<void> _deleteZona(int id) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar'),
        content: const Text('¿Está seguro de eliminar esta zona?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Eliminar'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      final api = context.read<AppProvider>().api;
      await api.deleteZona(id);
      _loadZonas();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Zonas'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _zonas.length,
              itemBuilder: (context, index) {
                final zona = _zonas[index];
                return ListTile(
                  title: Text(zona.nombre),
                  subtitle: Text(zona.descripcion ?? ''),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () => _showForm(zona: zona),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteZona(zona.id),
                      ),
                    ],
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showForm(),
        child: const Icon(Icons.add),
      ),
    );
  }
}
