import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';
import '../models/models.dart';

class VotacionScreen extends StatefulWidget {
  const VotacionScreen({super.key});

  @override
  State<VotacionScreen> createState() => _VotacionScreenState();
}

class _VotacionScreenState extends State<VotacionScreen> {
  Candidato? _selected;
  final _cantidadCtrl = TextEditingController(text: '1');
  String _filtroPartido = '';
  String _filtroCargo = '';
  String _busqueda = '';
  final String _ordenPor = 'cargo';

  String? _circunscripcionParaCandidato(Candidato c, AppProvider provider) {
    if (c.cargoId == null) return null;
    final cargo = provider.cargos.cast<Cargo?>().firstWhere(
          (cg) => cg?.id == c.cargoId,
          orElse: () => null,
        );
    return cargo?.tipoCircunscripcionCodigo;
  }

  String? _tipoVotacionParaCandidato(Candidato c, AppProvider provider) {
    if (c.cargoId == null) return null;
    final cargo = provider.cargos.cast<Cargo?>().firstWhere(
          (cg) => cg?.id == c.cargoId,
          orElse: () => null,
        );
    return cargo?.tipoVotacion;
  }

  @override
  void dispose() {
    _cantidadCtrl.dispose();
    super.dispose();
  }

  List<Candidato> get _candidatosFiltrados {
    final provider = context.read<AppProvider>();
    var list = List<Candidato>.from(provider.candidatos);

    if (_busqueda.isNotEmpty) {
      final q = _busqueda.toLowerCase();
      list = list
          .where((c) => c.nombreCompleto.toLowerCase().contains(q))
          .toList();
    }
    if (_filtroPartido.isNotEmpty) {
      list = list.where((c) => c.partidoNombre == _filtroPartido).toList();
    }
    if (_filtroCargo.isNotEmpty) {
      list = list.where((c) => c.cargoNombre == _filtroCargo).toList();
    }

    list = list.where((c) => c.activo != false).toList();

    switch (_ordenPor) {
      case 'partido':
        list.sort((a, b) => a.partidoNombre.compareTo(b.partidoNombre));
        break;
      case 'candidato':
        list.sort((a, b) => a.nombreCompleto.compareTo(b.nombreCompleto));
        break;
      default:
        list.sort(
            (a, b) => (a.cargoNombre ?? '').compareTo(b.cargoNombre ?? ''));
    }
    return list;
  }

  List<String> get _partidosUnicos {
    final p = context.read<AppProvider>();
    return p.candidatos.map((c) => c.partidoNombre).toSet().toList()..sort();
  }

  Future<void> _registrar() async {
    if (_selected == null) return;
    final cantidad = int.tryParse(_cantidadCtrl.text) ?? 1;
    if (cantidad <= 0) return;

    final provider = context.read<AppProvider>();
    await provider.registrarVoto(_selected!, cantidad);

    setState(() {
      _selected = null;
      _cantidadCtrl.text = '1';
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text('Voto registrado'),
        duration: Duration(seconds: 1),
      ));
    }
  }

  Future<void> _cerrar() async {
    final confirm = await showConfirmDialog(
      context,
      title: 'Cerrar Acta',
      message: 'Una vez cerrada no podrá modificar los votos.\n¿Está seguro?',
      confirmText: 'Cerrar Acta',
      confirmColor: AppColors.error,
    );
    if (confirm && mounted) {
      await context.read<AppProvider>().cerrarActa();
      if (mounted) {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text('Acta cerrada')));
      }
    }
  }

  Future<void> _sincronizar() async {
    await context.read<AppProvider>().sincronizarVotos();
    if (mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Sincronizado')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, _) {
        if (provider.mesaActual == null) {
          return Scaffold(
            appBar: AppBar(title: const Text('Votación')),
            body: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.info_outline, size: 64, color: AppColors.gray),
                  SizedBox(height: 16),
                  Text('Sin mesa seleccionada',
                      style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppColors.gray)),
                  SizedBox(height: 8),
                  Text('Seleccione una mesa desde la pantalla principal',
                      style: TextStyle(color: AppColors.gray)),
                ],
              ),
            ),
          );
        }

        if (provider.mesaActual?.cerrada == true) {
          return Scaffold(
            appBar: AppBar(title: const Text('Mesa Cerrada')),
            body: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.lock_outline, size: 64, color: AppColors.error),
                  SizedBox(height: 16),
                  Text('Acta cerrada',
                      style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppColors.error)),
                  SizedBox(height: 8),
                  Text('No se pueden modificar los votos',
                      style: TextStyle(color: AppColors.gray)),
                ],
              ),
            ),
          );
        }

        return Scaffold(
          appBar: AppBar(
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Mesa ${provider.mesaActual?.numero ?? ''}',
                    style: const TextStyle(fontSize: 16)),
                if (provider.mesaActual?.institucionNombre != null)
                  Text(provider.mesaActual!.institucionNombre!,
                      style:
                          const TextStyle(fontSize: 11, color: AppColors.gray)),
              ],
            ),
            actions: [
              if (provider.totalVotos > 0)
                TextButton.icon(
                  onPressed: _cerrar,
                  icon: const Icon(Icons.lock_outline,
                      size: 18, color: AppColors.error),
                  label: const Text('Cerrar',
                      style: TextStyle(color: AppColors.error, fontSize: 13)),
                ),
              IconButton(
                  icon: const Icon(Icons.sync),
                  tooltip: 'Sincronizar',
                  onPressed: _sincronizar),
            ],
          ),
          body: Column(
            children: [
              // Filters
              Container(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                color: AppColors.surface,
                child: Column(
                  children: [
                    TextField(
                      decoration: const InputDecoration(
                        hintText: 'Buscar candidato...',
                        prefixIcon: Icon(Icons.search, size: 20),
                        contentPadding:
                            EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        isDense: true,
                      ),
                      onChanged: (v) => setState(() => _busqueda = v),
                    ),
                    const SizedBox(height: 8),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          _filterChip('Todos', '',
                              _filtroPartido.isEmpty && _filtroCargo.isEmpty,
                              () {
                            setState(() {
                              _filtroPartido = '';
                              _filtroCargo = '';
                            });
                          }),
                          const SizedBox(width: 6),
                          ..._partidosUnicos.take(5).map((p) => Padding(
                                padding: const EdgeInsets.only(right: 6),
                                child: _filterChip(
                                    p,
                                    p,
                                    _filtroPartido == p,
                                    () => setState(() {
                                          _filtroPartido =
                                              _filtroPartido == p ? '' : p;
                                        })),
                              )),
                        ],
                      ),
                    ),
                    if (_partidosUnicos.length > 5) ...[
                      const SizedBox(height: 6),
                      SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          children: [
                            ..._partidosUnicos.skip(5).map((p) => Padding(
                                  padding: const EdgeInsets.only(right: 6),
                                  child: _filterChip(
                                      p,
                                      p,
                                      _filtroPartido == p,
                                      () => setState(() {
                                            _filtroPartido =
                                                _filtroPartido == p ? '' : p;
                                          })),
                                )),
                          ],
                        ),
                      ),
                    ],
                  ],
                ),
              ),

              // Candidate list
              Expanded(
                child: RefreshIndicator(
                  onRefresh: () async => _sincronizar(),
                  child: _candidatosFiltrados.isEmpty
                      ? const EmptyState(
                          icon: Icons.person_search_outlined,
                          title: 'Sin candidatos',
                          subtitle: 'No se encontraron candidatos')
                      : ListView.builder(
                          padding: const EdgeInsets.fromLTRB(16, 8, 16, 100),
                          itemCount: _candidatosFiltrados.length,
                          itemBuilder: (context, index) {
                            final c = _candidatosFiltrados[index];
                            final votos = provider.getVotosCandidato(c);
                            final isSelected = _selected?.id == c.id;
                            final partyColor = AppColors.chartColors[
                                index % AppColors.chartColors.length];

                            return Card(
                              margin: const EdgeInsets.only(bottom: 8),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                                side: BorderSide(
                                  color: isSelected
                                      ? AppColors.primary
                                      : AppColors.border,
                                  width: isSelected ? 2 : 1,
                                ),
                              ),
                              child: InkWell(
                                borderRadius: BorderRadius.circular(12),
                                onTap: () => setState(
                                    () => _selected = isSelected ? null : c),
                                child: Padding(
                                  padding: const EdgeInsets.all(12),
                                  child: Row(
                                    children: [
                                      Container(
                                        width: 44,
                                        height: 44,
                                        decoration: BoxDecoration(
                                          color: isSelected
                                              ? AppColors.primary
                                              : partyColor.withValues(
                                                  alpha: 0.1),
                                          borderRadius:
                                              BorderRadius.circular(12),
                                        ),
                                        child: Center(
                                          child: isSelected
                                              ? const Icon(Icons.check,
                                                  color: Colors.white, size: 22)
                                              : Text(c.nombreCompleto[0],
                                                  style: TextStyle(
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      color: partyColor,
                                                      fontSize: 18)),
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(c.nombreCompleto,
                                                style: const TextStyle(
                                                    fontWeight: FontWeight.w600,
                                                    fontSize: 14)),
                                            const SizedBox(height: 2),
                                            Text(
                                                '${c.partidoNombre} · ${c.cargoNombre ?? ''}',
                                                style: AppTextStyles.bodySmall),
                                            if (_circunscripcionParaCandidato(
                                                        c, provider) !=
                                                    null ||
                                                _tipoVotacionParaCandidato(
                                                        c, provider) !=
                                                    null) ...[
                                              const SizedBox(height: 4),
                                              _badgesRow(c, provider),
                                            ],
                                          ],
                                        ),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 14, vertical: 6),
                                        decoration: BoxDecoration(
                                          color: votos > 0
                                              ? AppColors.success
                                                  .withValues(alpha: 0.1)
                                              : AppColors.muted,
                                          borderRadius:
                                              BorderRadius.circular(16),
                                        ),
                                        child: Text(
                                          '$votos',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16,
                                            color: votos > 0
                                                ? AppColors.success
                                                : AppColors.lightGray,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ),
            ],
          ),

          // Bottom vote panel
          bottomSheet: _selected != null
              ? Container(
                  padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    boxShadow: [
                      BoxShadow(
                          color: Colors.black.withValues(alpha: 0.08),
                          blurRadius: 12,
                          offset: const Offset(0, -4))
                    ],
                  ),
                  child: SafeArea(
                    top: false,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(_selected!.nombreCompleto,
                                  style: AppTextStyles.h3),
                            ),
                            IconButton(
                              icon: const Icon(Icons.close),
                              onPressed: () => setState(() => _selected = null),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            // Quantity controls
                            Row(
                              children: [
                                _quantityBtn(Icons.remove, () {
                                  final v =
                                      int.tryParse(_cantidadCtrl.text) ?? 1;
                                  if (v > 1) _cantidadCtrl.text = '${v - 1}';
                                }),
                                const SizedBox(width: 8),
                                SizedBox(
                                  width: 70,
                                  child: TextField(
                                    controller: _cantidadCtrl,
                                    textAlign: TextAlign.center,
                                    keyboardType: TextInputType.number,
                                    style: const TextStyle(
                                        fontSize: 22,
                                        fontWeight: FontWeight.bold),
                                    decoration: InputDecoration(
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                              vertical: 8),
                                      border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(10)),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                _quantityBtn(Icons.add, () {
                                  final v =
                                      int.tryParse(_cantidadCtrl.text) ?? 1;
                                  _cantidadCtrl.text = '${v + 1}';
                                }),
                              ],
                            ),
                            const Spacer(),
                            ElevatedButton.icon(
                              onPressed: _registrar,
                              icon: const Icon(Icons.how_to_vote, size: 20),
                              label: const Text('Registrar'),
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 28, vertical: 14),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                )
              : null,
        );
      },
    );
  }

  Widget _filterChip(
      String label, String value, bool selected, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: selected
              ? AppColors.primary.withValues(alpha: 0.15)
              : AppColors.muted,
          borderRadius: BorderRadius.circular(20),
          border: selected
              ? Border.all(color: AppColors.primary.withValues(alpha: 0.3))
              : null,
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
            color: selected ? AppColors.primary : AppColors.gray,
          ),
        ),
      ),
    );
  }

  Widget _badgesRow(Candidato c, AppProvider provider) {
    final circ = _circunscripcionParaCandidato(c, provider);
    final tipoVot = _tipoVotacionParaCandidato(c, provider);
    return Row(
      children: [
        if (tipoVot != null)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(tipoVot,
                style: const TextStyle(
                    fontSize: 10,
                    color: AppColors.primary,
                    fontWeight: FontWeight.w600)),
          ),
        if (circ != null) ...[
          const SizedBox(width: 4),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: AppColors.gray.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(circ,
                style: const TextStyle(
                    fontSize: 10,
                    color: AppColors.gray,
                    fontWeight: FontWeight.w600)),
          ),
        ],
      ],
    );
  }

  Widget _quantityBtn(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.muted,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, size: 20, color: AppColors.dark),
      ),
    );
  }
}
