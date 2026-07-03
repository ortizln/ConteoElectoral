import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/models.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';

class InstitucionesScreen extends StatefulWidget {
  const InstitucionesScreen({super.key});

  @override
  State<InstitucionesScreen> createState() => _InstitucionesScreenState();
}

class _InstitucionesScreenState extends State<InstitucionesScreen> {
  List<InstitucionEducativa> _items = [];
  List<Parroquia> _parroquias = [];
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
    _parroquias = await api.getParroquias();
    _items = await api.getInstituciones();
    if (mounted) setState(() => _loading = false);
  }

  List<InstitucionEducativa> get _filtered {
    if (_search.isEmpty) return _items;
    final q = _search.toLowerCase();
    return _items.where((i) => i.nombre.toLowerCase().contains(q) || (i.parroquiaNombre ?? '').toLowerCase().contains(q)).toList();
  }

  Future<void> _showForm({InstitucionEducativa? item}) async {
    final nombreCtrl = TextEditingController(text: item?.nombre ?? '');
    final codCtrl = TextEditingController(text: item?.codigo ?? '');
    int? parroquiaId = item?.parroquiaId ?? _parroquias.firstOrNull?.id;
    final formKey = GlobalKey<FormState>();

    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setLocalState) => Padding(
          padding: EdgeInsets.only(left: 24, right: 24, top: 24, bottom: MediaQuery.of(ctx).viewInsets.bottom + 24),
          child: Form(
            key: formKey,
            child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              Text(item == null ? 'Nueva Institución' : 'Editar Institución', style: AppTextStyles.h3),
              const SizedBox(height: 20),
              DropdownButtonFormField<int>(
                initialValue: parroquiaId,
                decoration: const InputDecoration(labelText: 'Parroquia', prefixIcon: Icon(Icons.terrain_outlined)),
                items: _parroquias.map((p) => DropdownMenuItem(value: p.id, child: Text(p.nombre))).toList(),
                onChanged: (v) => setLocalState(() => parroquiaId = v),
                validator: (v) => v == null ? 'Seleccione una parroquia' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(controller: nombreCtrl, decoration: const InputDecoration(labelText: 'Nombre', prefixIcon: Icon(Icons.school_outlined)), validator: (v) => (v == null || v.isEmpty) ? 'Requerido' : null),
              const SizedBox(height: 16),
              TextFormField(controller: codCtrl, decoration: const InputDecoration(labelText: 'Código', prefixIcon: Icon(Icons.tag_outlined))),
              const SizedBox(height: 24),
              Row(children: [
                Expanded(child: OutlinedButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancelar'))),
                const SizedBox(width: 12),
                Expanded(child: ElevatedButton(onPressed: () async {
                  if (!formKey.currentState!.validate() || parroquiaId == null) return;
                  final api = context.read<AppProvider>().api;
                  final i = InstitucionEducativa(id: item?.id ?? 0, nombre: nombreCtrl.text, parroquiaId: parroquiaId!, codigo: codCtrl.text);
                  if (item == null) await api.createInstitucion(i); else await api.updateInstitucion(i.id, i);
                  if (ctx.mounted) Navigator.pop(ctx, true);
                }, child: const Text('Guardar'))),
              ]),
            ]),
          ),
        ),
      ),
    );
    if (saved == true) _load();
  }

  Future<void> _delete(InstitucionEducativa item) async {
    final confirm = await showConfirmDialog(context, title: 'Eliminar', message: '¿Eliminar "${item.nombre}"?', confirmText: 'Eliminar', confirmColor: AppColors.error);
    if (confirm) { await context.read<AppProvider>().api.deleteInstitucion(item.id); _load(); }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Instituciones')),
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            decoration: const InputDecoration(hintText: 'Buscar instituciones...', prefixIcon: Icon(Icons.search, size: 20), isDense: true),
            onChanged: (v) => setState(() => _search = v),
          ),
        ),
        Expanded(
          child: _loading
              ? const Center(child: CircularProgressIndicator())
              : _filtered.isEmpty
                  ? EmptyState(icon: Icons.school_outlined, title: 'Sin instituciones', subtitle: 'Agregue la primera institución', actionLabel: 'Agregar', onAction: () => _showForm())
                  : RefreshIndicator(
                      onRefresh: _load,
                      child: ListView.builder(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        itemCount: _filtered.length,
                        itemBuilder: (_, i) => CrudListTile(
                          title: _filtered[i].nombre,
                          subtitle: 'Parroquia: ${_filtered[i].parroquiaNombre ?? "N/A"}',
                          icon: Icons.school_outlined, iconColor: AppColors.accent,
                          onEdit: () => _showForm(item: _filtered[i]), onDelete: () => _delete(_filtered[i]),
                        ),
                      ),
                    ),
        ),
      ]),
      floatingActionButton: FloatingActionButton(onPressed: () => _showForm(), child: const Icon(Icons.add)),
    );
  }
}
