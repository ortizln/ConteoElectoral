import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';

class CantonesScreen extends StatefulWidget {
  const CantonesScreen({super.key});

  @override
  State<CantonesScreen> createState() => _CantonesScreenState();
}

class _CantonesScreenState extends State<CantonesScreen> {
  List<Canton> _items = [];
  List<Provincia> _provincias = [];
  bool _loading = false;
  String _search = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    final api = context.read<AppProvider>().api;
    _provincias = await api.getProvincias();
    _items = await api.getCantones();
    if (mounted) setState(() => _loading = false);
  }

  List<Canton> get _filtered {
    if (_search.isEmpty) return _items;
    final q = _search.toLowerCase();
    return _items
        .where((c) =>
            c.nombre.toLowerCase().contains(q) ||
            (c.provinciaNombre ?? '').toLowerCase().contains(q))
        .toList();
  }

  Future<void> _showForm({Canton? item}) async {
    final nombreCtrl = TextEditingController(text: item?.nombre ?? '');
    final descCtrl = TextEditingController(text: item?.descripcion ?? '');
    int? provinciaId = item?.provinciaId ?? _provincias.firstOrNull?.id;
    final formKey = GlobalKey<FormState>();

    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setLocalState) => Padding(
          padding: EdgeInsets.only(
              left: 24,
              right: 24,
              top: 24,
              bottom: MediaQuery.of(ctx).viewInsets.bottom + 24),
          child: Form(
            key: formKey,
            child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(item == null ? 'Nuevo Cantón' : 'Editar Cantón',
                      style: AppTextStyles.h3),
                  const SizedBox(height: 20),
                  DropdownButtonFormField<int>(
                    initialValue: provinciaId,
                    decoration: const InputDecoration(
                        labelText: 'Provincia',
                        prefixIcon: Icon(Icons.location_city_outlined)),
                    items: _provincias
                        .map((p) => DropdownMenuItem(
                            value: p.id, child: Text(p.nombre)))
                        .toList(),
                    onChanged: (v) => setLocalState(() => provinciaId = v),
                    validator: (v) =>
                        v == null ? 'Seleccione una provincia' : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                      controller: nombreCtrl,
                      decoration: const InputDecoration(
                          labelText: 'Nombre',
                          prefixIcon: Icon(Icons.label_outline)),
                      validator: (v) =>
                          (v == null || v.isEmpty) ? 'Requerido' : null),
                  const SizedBox(height: 16),
                  TextFormField(
                      controller: descCtrl,
                      decoration: const InputDecoration(
                          labelText: 'Descripción',
                          prefixIcon: Icon(Icons.description_outlined)),
                      maxLines: 3),
                  const SizedBox(height: 24),
                  Row(children: [
                    Expanded(
                        child: OutlinedButton(
                            onPressed: () => Navigator.pop(ctx, false),
                            child: const Text('Cancelar'))),
                    const SizedBox(width: 12),
                    Expanded(
                        child: ElevatedButton(
                            onPressed: () async {
                              if (!formKey.currentState!.validate() ||
                                  provinciaId == null) return;
                              final api = context.read<AppProvider>().api;
                              final c = Canton(
                                  id: item?.id ?? 0,
                                  nombre: nombreCtrl.text,
                                  provinciaId: provinciaId!,
                                  descripcion: descCtrl.text);
                              if (item == null) {
                                await api.createCanton(c);
                              } else {
                                await api.updateCanton(c.id, c);
                              }
                              if (ctx.mounted) Navigator.pop(ctx, true);
                            },
                            child: const Text('Guardar'))),
                  ]),
                ]),
          ),
        ),
      ),
    );
    if (saved == true) _load();
  }

  Future<void> _delete(Canton item) async {
    final confirm = await showConfirmDialog(context,
        title: 'Eliminar',
        message: '¿Eliminar "${item.nombre}"?',
        confirmText: 'Eliminar',
        confirmColor: AppColors.error);
    if (confirm) {
      await context.read<AppProvider>().api.deleteCanton(item.id);
      _load();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cantones')),
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            decoration: const InputDecoration(
                hintText: 'Buscar cantones...',
                prefixIcon: Icon(Icons.search, size: 20),
                isDense: true),
            onChanged: (v) => setState(() => _search = v),
          ),
        ),
        Expanded(
          child: _loading
              ? const Center(child: CircularProgressIndicator())
              : _filtered.isEmpty
                  ? EmptyState(
                      icon: Icons.location_on_outlined,
                      title: 'Sin cantones',
                      subtitle: 'Agregue el primer cantón',
                      actionLabel: 'Agregar',
                      onAction: () => _showForm())
                  : RefreshIndicator(
                      onRefresh: _load,
                      child: ListView.builder(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        itemCount: _filtered.length,
                        itemBuilder: (_, i) => CrudListTile(
                          title: _filtered[i].nombre,
                          subtitle:
                              'Provincia: ${_filtered[i].provinciaNombre ?? "N/A"}',
                          icon: Icons.location_on_outlined,
                          iconColor: AppColors.warning,
                          onEdit: () => _showForm(item: _filtered[i]),
                          onDelete: () => _delete(_filtered[i]),
                        ),
                      ),
                    ),
        ),
      ]),
      floatingActionButton: FloatingActionButton(
          onPressed: () => _showForm(), child: const Icon(Icons.add)),
    );
  }
}
