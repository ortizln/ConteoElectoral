import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';

class ProvinciasScreen extends StatefulWidget {
  const ProvinciasScreen({super.key});

  @override
  State<ProvinciasScreen> createState() => _ProvinciasScreenState();
}

class _ProvinciasScreenState extends State<ProvinciasScreen> {
  List<Provincia> _provincias = [];
  List<Zona> _zonas = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final api = context.read<AppProvider>().api;
    final zonas = await api.getZonas();
    final provincias = await api.getProvincias();
    setState(() {
      _zonas = zonas;
      _provincias = provincias;
      _isLoading = false;
    });
  }

  Future<void> _showForm({Provincia? provincia}) async {
    final nombreController = TextEditingController(text: provincia?.nombre ?? '');
    final descripcionController = TextEditingController(text: provincia?.descripcion ?? '');
    int? selectedZonaId = provincia?.zonaId ?? _zonas.first.id;

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(provincia == null ? 'Nueva Provincia' : 'Editar Provincia'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            DropdownButton<int>(
              value: selectedZonaId,
              isExpanded: true,
              hint: const Text('Seleccione Zona'),
              items: _zonas.map((z) => DropdownMenuItem(
                value: z.id,
                child: Text(z.nombre),
              )).toList(),
              onChanged: (value) => selectedZonaId = value,
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
              final provinciaNueva = Provincia(
                id: provincia?.id ?? 0,
                nombre: nombreController.text,
                zonaId: selectedZonaId!,
                descripcion: descripcionController.text,
              );

              if (provincia == null) {
                await api.createProvincia(provinciaNueva);
              } else {
                await api.updateProvincia(provincia.id, provinciaNueva);
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

  Future<void> _deleteProvincia(int id) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar'),
        content: const Text('¿Está seguro de eliminar esta provincia?'),
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
      await api.deleteProvincia(id);
      _loadData();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Provincias'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _provincias.length,
              itemBuilder: (context, index) {
                final p = _provincias[index];
                return ListTile(
                  title: Text(p.nombre),
                  subtitle: Text('Zona: ${p.zonaNombre ?? 'N/A'} - ${p.descripcion ?? ''}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () => _showForm(provincia: p),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteProvincia(p.id),
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
