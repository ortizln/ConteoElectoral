import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';

class ZonasScreen extends StatefulWidget {
  const ZonasScreen({super.key});

  @override
  State<ZonasScreen> createState() => _ZonasScreenState();
}

class _ZonasScreenState extends State<ZonasScreen> {
  List<Zona> _items = [];
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
    _items = await api.getZonas();
    if (mounted) setState(() => _loading = false);
  }

  List<Zona> get _filtered {
    if (_search.isEmpty) return _items;
    final q = _search.toLowerCase();
    return _items.where((z) => z.nombre.toLowerCase().contains(q) || (z.descripcion ?? '').toLowerCase().contains(q)).toList();
  }

  Future<void> _showForm({Zona? item}) async {
    final nombreCtrl = TextEditingController(text: item?.nombre ?? '');
    final descCtrl = TextEditingController(text: item?.descripcion ?? '');
    final formKey = GlobalKey<FormState>();

    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(
          left: 24, right: 24, top: 24,
          bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
        ),
        child: Form(
          key: formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(item == null ? 'Nueva Zona' : 'Editar Zona', style: AppTextStyles.h3),
              const SizedBox(height: 20),
              TextFormField(
                controller: nombreCtrl,
                decoration: const InputDecoration(labelText: 'Nombre', prefixIcon: Icon(Icons.label_outline)),
                validator: (v) => (v == null || v.isEmpty) ? 'Requerido' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: descCtrl,
                decoration: const InputDecoration(labelText: 'Descripción', prefixIcon: Icon(Icons.description_outlined)),
                maxLines: 3,
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(child: OutlinedButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancelar'))),
                  const SizedBox(width: 12),
                  Expanded(child: ElevatedButton(onPressed: () async {
                    if (!formKey.currentState!.validate()) return;
                    final api = context.read<AppProvider>().api;
                    final z = Zona(id: item?.id ?? 0, nombre: nombreCtrl.text, descripcion: descCtrl.text);
                    if (item == null) await api.createZona(z); else await api.updateZona(z.id, z);
                    if (ctx.mounted) Navigator.pop(ctx, true);
                  }, child: const Text('Guardar'))),
                ],
              ),
            ],
          ),
        ),
      ),
    );
    if (saved == true) _load();
  }

  Future<void> _delete(Zona item) async {
    final confirm = await showConfirmDialog(context, title: 'Eliminar', message: '¿Eliminar "${item.nombre}"?', confirmText: 'Eliminar', confirmColor: AppColors.error);
    if (confirm) {
      await context.read<AppProvider>().api.deleteZona(item.id);
      _load();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Zonas')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Buscar zonas...',
                prefixIcon: Icon(Icons.search, size: 20),
                isDense: true,
              ),
              onChanged: (v) => setState(() => _search = v),
            ),
          ),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _filtered.isEmpty
                    ? EmptyState(icon: Icons.map_outlined, title: 'Sin zonas', subtitle: 'Agregue la primera zona', actionLabel: 'Agregar', onAction: () => _showForm())
                    : RefreshIndicator(
                        onRefresh: _load,
                        child: ListView.builder(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          itemCount: _filtered.length,
                          itemBuilder: (_, i) => CrudListTile(
                            title: _filtered[i].nombre,
                            subtitle: _filtered[i].descripcion,
                            icon: Icons.map_outlined,
                            iconColor: AppColors.primary,
                            onEdit: () => _showForm(item: _filtered[i]),
                            onDelete: () => _delete(_filtered[i]),
                          ),
                        ),
                      ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(onPressed: () => _showForm(), child: const Icon(Icons.add)),
    );
  }
}
