import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';

class CantonesScreen extends StatefulWidget {
  const CantonesScreen({super.key});

  @override
  State<CantonesScreen> createState() => _CantonesScreenState();
}

class _CantonesScreenState extends State<CantonesScreen> {
  List<Canton> _cantones = [];
  List<Provincia> _provincias = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final api = context.read<AppProvider>().api;
    final provincias = await api.getProvincias();
    final cantones = await api.getCantones();
    setState(() {
      _provincias = provincias;
      _cantones = cantones;
      _isLoading = false;
    });
  }

  Future<void> _showForm({Canton? canton}) async {
    final nombreController = TextEditingController(text: canton?.nombre ?? '');
    final descripcionController = TextEditingController(text: canton?.descripcion ?? '');
    int? selectedProvinciaId = canton?.provinciaId ?? _provincias.first.id;

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(canton == null ? 'Nuevo Cantón' : 'Editar Cantón'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            DropdownButton<int>(
              value: selectedProvinciaId,
              isExpanded: true,
              hint: const Text('Seleccione Provincia'),
              items: _provincias.map((p) => DropdownMenuItem(
                value: p.id,
                child: Text(p.nombre),
              )).toList(),
              onChanged: (value) => selectedProvinciaId = value,
            ),
            const SizedBox(height: 16),
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
              final cantonNuevo = Canton(
                id: canton?.id ?? 0,
                nombre: nombreController.text,
                provinciaId: selectedProvinciaId!,
                descripcion: descripcionController.text,
              );

              if (canton == null) {
                await api.createCanton(cantonNuevo);
              } else {
                await api.updateCanton(canton.id, cantonNuevo);
              }

              if (mounted) {
                Navigator.pop(context);
                _loadData();
              }
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  Future<void> _deleteCanton(int id) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar'),
        content: const Text('¿Está seguro de eliminar este cantón?'),
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
      await api.deleteCanton(id);
      _loadData();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cantones'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _cantones.length,
              itemBuilder: (context, index) {
                final c = _cantones[index];
                return ListTile(
                  title: Text(c.nombre),
                  subtitle: Text('Provincia: ${c.provinciaNombre ?? 'N/A'} - ${c.descripcion ?? ''}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () => _showForm(canton: c),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteCanton(c.id),
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
