import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';

class ProvinciasScreen extends StatefulWidget {
  const ProvinciasScreen({super.key});

  @override
  State<ProvinciasScreen> createState() => _ProvinciasScreenState();
}

class _ProvinciasScreenState extends State<ProvinciasScreen> {
  List<Provincia> _items = [];
  List<Zona> _zonas = [];
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
    _zonas = await api.getZonas();
    _items = await api.getProvincias();
    if (mounted) setState(() => _loading = false);
  }

  List<Provincia> get _filtered {
    if (_search.isEmpty) return _items;
    final q = _search.toLowerCase();
    return _items
        .where((p) =>
            p.nombre.toLowerCase().contains(q) ||
            (p.zonaNombre ?? '').toLowerCase().contains(q))
        .toList();
  }

  Future<void> _showForm({Provincia? item}) async {
    final nombreCtrl = TextEditingController(text: item?.nombre ?? '');
    final descCtrl = TextEditingController(text: item?.descripcion ?? '');
    int? zonaId = item?.zonaId ?? _zonas.firstOrNull?.id;
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
                  Text(item == null ? 'Nueva Provincia' : 'Editar Provincia',
                      style: AppTextStyles.h3),
                  const SizedBox(height: 20),
                  DropdownButtonFormField<int>(
                    initialValue: zonaId,
                    decoration: const InputDecoration(
                        labelText: 'Zona',
                        prefixIcon: Icon(Icons.map_outlined)),
                    items: _zonas
                        .map((z) => DropdownMenuItem(
                            value: z.id, child: Text(z.nombre)))
                        .toList(),
                    onChanged: (v) => setLocalState(() => zonaId = v),
                    validator: (v) => v == null ? 'Seleccione una zona' : null,
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
                                  zonaId == null) return;
                              final api = context.read<AppProvider>().api;
                              final p = Provincia(
                                  id: item?.id ?? 0,
                                  nombre: nombreCtrl.text,
                                  zonaId: zonaId!,
                                  descripcion: descCtrl.text);
                              if (item == null) {
                                await api.createProvincia(p);
                              } else {
                                await api.updateProvincia(p.id, p);
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

  Future<void> _delete(Provincia item) async {
    final confirm = await showConfirmDialog(context,
        title: 'Eliminar',
        message: '¿Eliminar "${item.nombre}"?',
        confirmText: 'Eliminar',
        confirmColor: AppColors.error);
    if (confirm) {
      await context.read<AppProvider>().api.deleteProvincia(item.id);
      _load();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Provincias')),
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            decoration: const InputDecoration(
                hintText: 'Buscar provincias...',
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
                      icon: Icons.location_city_outlined,
                      title: 'Sin provincias',
                      subtitle: 'Agregue la primera provincia',
                      actionLabel: 'Agregar',
                      onAction: () => _showForm())
                  : RefreshIndicator(
                      onRefresh: _load,
                      child: ListView.builder(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        itemCount: _filtered.length,
                        itemBuilder: (_, i) => CrudListTile(
                          title: _filtered[i].nombre,
                          subtitle: 'Zona: ${_filtered[i].zonaNombre ?? "N/A"}',
                          icon: Icons.location_city_outlined,
                          iconColor: AppColors.secondary,
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
