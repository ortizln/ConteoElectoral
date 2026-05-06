import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';

class InstitucionesScreen extends StatefulWidget {
  const InstitucionesScreen({super.key});

  @override
  State<InstitucionesScreen> createState() => _InstitucionesScreenState();
}

class _InstitucionesScreenState extends State<InstitucionesScreen> {
  List<InstitucionEducativa> _instituciones = [];
  List<Parroquia> _parroquias = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final api = context.read<AppProvider>().api;
    final parroquias = await api.getParroquias();
    final instituciones = await api.getInstituciones();
    setState(() {
      _parroquias = parroquias;
      _instituciones = instituciones;
      _isLoading = false;
    });
  }

  Future<void> _showForm({InstitucionEducativa? institucion}) async {
    final nombreController = TextEditingController(text: institucion?.nombre ?? '');
    final direccionController = TextEditingController(text: institucion?.direccion ?? '');
    final codigoController = TextEditingController(text: institucion?.codigo ?? '');
    final tipoController = TextEditingController(text: institucion?.tipo ?? '');
    int? selectedParroquiaId = institucion?.parroquiaId ?? _parroquias.first.id;

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(institucion == null ? 'Nueva Institución' : 'Editar Institución'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownButton<int>(
                value: selectedParroquiaId,
                isExpanded: true,
                hint: const Text('Seleccione Parroquia'),
                items: _parroquias.map((p) => DropdownMenuItem(
                  value: p.id,
                  child: Text(p.nombre),
                )).toList(),
                onChanged: (value) => selectedParroquiaId = value,
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
                controller: direccionController,
                decoration: const InputDecoration(
                  labelText: 'Dirección',
                  border: OutlineInputBorder(),
                ),
                maxLines: 2,
              ),
              const SizedBox(height: 16),
              TextField(
                controller: codigoController,
                decoration: const InputDecoration(
                  labelText: 'Código',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: tipoController,
                decoration: const InputDecoration(
                  labelText: 'Tipo (Ej: Unidad Educativa)',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final api = context.read<AppProvider>().api;
              final institucionNueva = InstitucionEducativa(
                id: institucion?.id ?? 0,
                nombre: nombreController.text,
                parroquiaId: selectedParroquiaId!,
                direccion: direccionController.text,
                codigo: codigoController.text,
                tipo: tipoController.text,
              );

              if (institucion == null) {
                await api.createInstitucion(institucionNueva);
              } else {
                await api.updateInstitucion(institucion.id, institucionNueva);
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

  Future<void> _deleteInstitucion(int id) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar'),
        content: const Text('¿Está seguro de eliminar esta institución?'),
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
      await api.deleteInstitucion(id);
      _loadData();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Instituciones Educativas'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _instituciones.length,
              itemBuilder: (context, index) {
                final i = _instituciones[index];
                return ListTile(
                  title: Text(i.nombre),
                  subtitle: Text(
                    'Parroquia: ${i.parroquiaNombre ?? 'N/A'}\n'
                    '${i.direccion ?? ''} - Código: ${i.codigo ?? 'N/A'} - Tipo: ${i.tipo ?? 'N/A'}',
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () => _showForm(institucion: i),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteInstitucion(i.id),
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
