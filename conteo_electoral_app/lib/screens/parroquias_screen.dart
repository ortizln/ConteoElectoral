import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';

class ParroquiasScreen extends StatefulWidget {
  const ParroquiasScreen({super.key});

  @override
  State<ParroquiasScreen> createState() => _ParroquiasScreenState();
}

class _ParroquiasScreenState extends State<ParroquiasScreen> {
  List<Parroquia> _parroquias = [];
  List<Canton> _cantones = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final api = context.read<AppProvider>().api;
    final cantones = await api.getCantones();
    final parroquias = await api.getParroquias();
    setState(() {
      _cantones = cantones;
      _parroquias = parroquias;
      _isLoading = false;
    });
  }

  Future<void> _showForm({Parroquia? parroquia}) async {
    final nombreController = TextEditingController(text: parroquia?.nombre ?? '');
    final descripcionController = TextEditingController(text: parroquia?.descripcion ?? '');
    int? selectedCantonId = parroquia?.cantonId ?? _cantones.first.id;

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(parroquia == null ? 'Nueva Parroquia' : 'Editar Parroquia'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            DropdownButton<int>(
              value: selectedCantonId,
              isExpanded: true,
              hint: const Text('Seleccione Cantón'),
              items: _cantones.map((c) => DropdownMenuItem(
                value: c.id,
                child: Text(c.nombre),
              )).toList(),
              onChanged: (value) => selectedCantonId = value,
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
              final parroquiaNueva = Parroquia(
                id: parroquia?.id ?? 0,
                nombre: nombreController.text,
                cantonId: selectedCantonId!,
                descripcion: descripcionController.text,
              );

              if (parroquia == null) {
                await api.createParroquia(parroquiaNueva);
              } else {
                await api.updateParroquia(parroquia.id, parroquiaNueva);
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

  Future<void> _deleteParroquia(int id) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar'),
        content: const Text('¿Está seguro de eliminar esta parroquia?'),
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
      await api.deleteParroquia(id);
      _loadData();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Parroquias'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _parroquias.length,
              itemBuilder: (context, index) {
                final p = _parroquias[index];
                return ListTile(
                  title: Text(p.nombre),
                  subtitle: Text('Cantón: ${p.cantonNombre ?? 'N/A'} - ${p.descripcion ?? ''}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () => _showForm(parroquia: p),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteParroquia(p.id),
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
