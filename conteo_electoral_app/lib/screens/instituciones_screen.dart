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
    return _items
        .where((i) =>
            i.nombre.toLowerCase().contains(q) ||
            (i.parroquiaNombre ?? '').toLowerCase().contains(q))
        .toList();
  }

  Future<void> _showForm({InstitucionEducativa? item}) async {
    final nombreCtrl = TextEditingController(text: item?.nombre ?? '');
    final codCtrl = TextEditingController(text: item?.codigo ?? '');
    int? parroquiaId = item?.parroquiaId ?? _parroquias.firstOrNull?.id;
    // Campos de juntas (números de mesa desde/hasta)
    final junfemCtrl = TextEditingController(text: item?.junfem?.toString() ?? '');
    final junmasCtrl = TextEditingController(text: item?.junmas?.toString() ?? '');
    final juninifCtrl = TextEditingController(text: item?.juninif?.toString() ?? '');
    final junfinfCtrl = TextEditingController(text: item?.junfinf?.toString() ?? '');
    final juninimCtrl = TextEditingController(text: item?.juninim?.toString() ?? '');
    final junfinmCtrl = TextEditingController(text: item?.junfinm?.toString() ?? '');
    final formKey = GlobalKey<FormState>();

    int? parseOrNull(String v) => v.trim().isEmpty ? null : int.tryParse(v.trim());

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
                  Text(
                      item == null ? 'Nueva Institución' : 'Editar Institución',
                      style: AppTextStyles.h3),
                  const SizedBox(height: 20),
                  DropdownButtonFormField<int>(
                    initialValue: parroquiaId,
                    decoration: const InputDecoration(
                        labelText: 'Parroquia',
                        prefixIcon: Icon(Icons.terrain_outlined)),
                    items: _parroquias
                        .map((p) => DropdownMenuItem(
                            value: p.id, child: Text(p.nombre)))
                        .toList(),
                    onChanged: (v) => setLocalState(() => parroquiaId = v),
                    validator: (v) =>
                        v == null ? 'Seleccione una parroquia' : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                      controller: nombreCtrl,
                      decoration: const InputDecoration(
                          labelText: 'Nombre',
                          prefixIcon: Icon(Icons.school_outlined)),
                      validator: (v) =>
                          (v == null || v.isEmpty) ? 'Requerido' : null),
                  const SizedBox(height: 16),
                  TextFormField(
                      controller: codCtrl,
                      decoration: const InputDecoration(
                          labelText: 'Código',
                          prefixIcon: Icon(Icons.tag_outlined))),
                  const SizedBox(height: 20),
                  Text('Juntas (mesas)',
                      style: AppTextStyles.bodySmall
                          .copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 12),
                  Row(children: [
                    Expanded(
                      child: TextFormField(
                          controller: junfemCtrl,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                              labelText: 'JUNFEM',
                              helperText: 'Juntas femeninas',
                              isDense: true),
                          onChanged: (_) => setLocalState(() {})),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextFormField(
                          controller: junmasCtrl,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                              labelText: 'JUNMAS',
                              helperText: 'Juntas masculinas',
                              isDense: true),
                          onChanged: (_) => setLocalState(() {})),
                    ),
                  ]),
                  const SizedBox(height: 12),
                  Row(children: [
                    Expanded(
                      child: TextFormField(
                          controller: juninifCtrl,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                              labelText: 'JUNINIF',
                              helperText: 'Inicio j. femeninas',
                              isDense: true)),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextFormField(
                          controller: junfinfCtrl,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                              labelText: 'JUNFINF',
                              helperText: 'Fin j. femeninas',
                              isDense: true)),
                    ),
                  ]),
                  const SizedBox(height: 12),
                  Row(children: [
                    Expanded(
                      child: TextFormField(
                          controller: juninimCtrl,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                              labelText: 'JUNINIM',
                              helperText: 'Inicio j. masculinas',
                              isDense: true)),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextFormField(
                          controller: junfinmCtrl,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                              labelText: 'JUNFINM',
                              helperText: 'Fin j. masculinas',
                              isDense: true)),
                    ),
                  ]),
                  const SizedBox(height: 12),
                  // NUMJUN calculado: JUNFEM + JUNMAS
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    decoration: BoxDecoration(
                      color: AppColors.accent.withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                          color: AppColors.accent.withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.numbers, size: 18),
                        const SizedBox(width: 8),
                        Text('NUMJUN (total): ',
                            style: AppTextStyles.bodySmall),
                        Text(
                          '${(int.tryParse(junfemCtrl.text.trim()) ?? 0) + (int.tryParse(junmasCtrl.text.trim()) ?? 0)}',
                          style: AppTextStyles.bodySmall
                              .copyWith(fontWeight: FontWeight.w700),
                        ),
                      ],
                    ),
                  ),
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
                                  parroquiaId == null) {
                                return;
                              }
                              // Validar juntas: números >= 0 e inicio <= fin
                              final junfem = parseOrNull(junfemCtrl.text);
                              final junmas = parseOrNull(junmasCtrl.text);
                              final juninif = parseOrNull(juninifCtrl.text);
                              final junfinf = parseOrNull(junfinfCtrl.text);
                              final juninim = parseOrNull(juninimCtrl.text);
                              final junfinm = parseOrNull(junfinmCtrl.text);
                              final invalidos = [junfem, junmas, juninif, junfinf, juninim, junfinm]
                                  .where((v) => v != null && v < 0)
                                  .isNotEmpty;
                              if (invalidos) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text(
                                            'Los campos de juntas deben ser >= 0')));
                                return;
                              }
                              if (juninif != null &&
                                  junfinf != null &&
                                  juninif > junfinf) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text(
                                            'JUNINIF no puede ser mayor que JUNFINF')));
                                return;
                              }
                              if (juninim != null &&
                                  junfinm != null &&
                                  juninim > junfinm) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text(
                                            'JUNINIM no puede ser mayor que JUNFINM')));
                                return;
                              }
                              final api = context.read<AppProvider>().api;
                              final i = InstitucionEducativa(
                                  id: item?.id ?? 0,
                                  nombre: nombreCtrl.text,
                                  parroquiaId: parroquiaId!,
                                  codigo: codCtrl.text,
                                  junfem: junfem,
                                  junmas: junmas,
                                  juninif: juninif,
                                  junfinf: junfinf,
                                  juninim: juninim,
                                  junfinm: junfinm);
                              if (item == null) {
                                await api.createInstitucion(i);
                              } else {
                                await api.updateInstitucion(i.id, i);
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

  Future<void> _delete(InstitucionEducativa item) async {
    final confirm = await showConfirmDialog(context,
        title: 'Eliminar',
        message: '¿Eliminar "${item.nombre}"?',
        confirmText: 'Eliminar',
        confirmColor: AppColors.error);
    if (confirm) {
      await context.read<AppProvider>().api.deleteInstitucion(item.id);
      _load();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Instituciones')),
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            decoration: const InputDecoration(
                hintText: 'Buscar instituciones...',
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
                      icon: Icons.school_outlined,
                      title: 'Sin instituciones',
                      subtitle: 'Agregue la primera institución',
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
                              'Parroquia: ${_filtered[i].parroquiaNombre ?? "N/A"}'
                              '${_filtered[i].numjun != null ? ' · Juntas: ${_filtered[i].numjun}' : ''}',
                          icon: Icons.school_outlined,
                          iconColor: AppColors.accent,
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
