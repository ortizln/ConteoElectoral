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
  int? _selectedListaId;
  List<Candidato> _selectedListaCandidates = [];
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

  bool get _isListaCargo {
    if (_filtroCargo.isEmpty) return false;
    final provider = context.read<AppProvider>();
    return provider.cargos.any(
      (c) => c.nombre == _filtroCargo && c.tipoVotacion == 'LISTA',
    );
  }

  Map<int, List<Candidato>> get _agrupadosPorLista {
    final provider = context.read<AppProvider>();
    var filtered = provider.candidatos.where((c) => c.activo != false);
    if (_filtroCargo.isNotEmpty) {
      filtered = filtered.where((c) => c.cargoNombre == _filtroCargo);
    }
    if (_busqueda.isNotEmpty) {
      final q = _busqueda.toLowerCase();
      filtered = filtered.where((c) => c.nombreCompleto.toLowerCase().contains(q));
    }
    final grouped = <int, List<Candidato>>{};
    for (final c in filtered) {
      if (c.listaId != null) {
        grouped.putIfAbsent(c.listaId!, () => []);
        grouped[c.listaId!]!.add(c);
      }
    }
    for (final key in grouped.keys) {
      grouped[key]!.sort((a, b) => (a.ordenEnLista ?? 0).compareTo(b.ordenEnLista ?? 0));
    }
    return grouped;
  }

  int _getVotosLista(int listaId) {
    final provider = context.read<AppProvider>();
    final candidatos = _agrupadosPorLista[listaId] ?? [];
    return candidatos.fold(0, (sum, c) => sum + provider.getVotosCandidato(c));
  }



  Future<void> _registrar() async {
    final cantidad = int.tryParse(_cantidadCtrl.text) ?? 1;
    if (cantidad <= 0) return;

    final provider = context.read<AppProvider>();

    if (_selectedListaId != null) {
      await provider.registrarVotosLista(_selectedListaId!, _selectedListaCandidates, cantidad);
    } else if (_selected != null) {
      await provider.registrarVoto(_selected!, cantidad);
    } else {
      return;
    }

    setState(() {
      _selected = null;
      _selectedListaId = null;
      _selectedListaCandidates = [];
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
            appBar: AppBar(
              leading: _statusDot(provider.isOnline),
              title: const Text('Votación'),
              actions: [
                if (provider.failedSyncCount > 0)
                  IconButton(
                    icon: const Icon(Icons.sync_problem,
                        color: AppColors.warning),
                    tooltip:
                        '${provider.failedSyncCount} sincronizaciones fallidas',
                    onPressed: () =>
                        Navigator.pushNamed(context, '/pendientes'),
                  ),
              ],
            ),
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
            appBar: AppBar(
              leading: _statusDot(provider.isOnline),
              title: const Text('Mesa Cerrada'),
              actions: [
                if (provider.failedSyncCount > 0)
                  IconButton(
                    icon: const Icon(Icons.sync_problem,
                        color: AppColors.warning),
                    tooltip:
                        '${provider.failedSyncCount} sincronizaciones fallidas',
                    onPressed: () =>
                        Navigator.pushNamed(context, '/pendientes'),
                  ),
              ],
            ),
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
            leading: _statusDot(provider.isOnline),
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
              if (provider.failedSyncCount > 0)
                IconButton(
                  icon: const Icon(Icons.sync_problem,
                      color: AppColors.warning),
                  tooltip:
                      '${provider.failedSyncCount} sincronizaciones fallidas',
                  onPressed: () =>
                      Navigator.pushNamed(context, '/pendientes'),
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

              // Nulos y Blanco controls
              if (provider.mesaActual?.cerrada == true)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  color: AppColors.surface,
                  child: Row(
                    children: [
                      _nulosBlancoBadge('🗳️ Nulos', provider.votosNulos, AppColors.error),
                      const SizedBox(width: 16),
                      _nulosBlancoBadge('⬜ Blanco', provider.votosBlanco, AppColors.gray),
                    ],
                  ),
                )
              else
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  color: AppColors.surface,
                  child: Row(
                    children: [
                      // Nulos
                      _nulosBlancoControl(
                        label: 'Nulos',
                        value: provider.votosNulos,
                        icon: Icons.cancel_outlined,
                        color: AppColors.error,
                        onMinus: () => provider.actualizarNulos(provider.votosNulos - 1),
                        onPlus: () => provider.actualizarNulos(provider.votosNulos + 1),
                      ),
                      const SizedBox(width: 16),
                      // Blanco
                      _nulosBlancoControl(
                        label: 'Blanco',
                        value: provider.votosBlanco,
                        icon: Icons.check_circle_outline,
                        color: AppColors.gray,
                        onMinus: () => provider.actualizarBlanco(provider.votosBlanco - 1),
                        onPlus: () => provider.actualizarBlanco(provider.votosBlanco + 1),
                      ),
                    ],
                  ),
                ),
              const Divider(height: 1),
              // Candidate list
              Expanded(
                child: RefreshIndicator(
                  onRefresh: () async => _sincronizar(),
                  child: _isListaCargo
                      ? (_agrupadosPorLista.isEmpty
                          ? const EmptyState(
                              icon: Icons.person_search_outlined,
                              title: 'Sin listas',
                              subtitle: 'No se encontraron listas')
                          : ListView.builder(
                              padding: const EdgeInsets.fromLTRB(16, 8, 16, 100),
                              itemCount: _agrupadosPorLista.length,
                              itemBuilder: (context, index) {
                                final listaId =
                                    _agrupadosPorLista.keys.elementAt(index);
                                final candidatosLista =
                                    _agrupadosPorLista[listaId]!;
                                final isSelected =
                                    _selectedListaId == listaId;
                                final partidoNombre =
                                    candidatosLista.first.partidoNombre;

                                final numeroLista =
                                    candidatosLista.first.numeroLista;
                                final listaNombre =
                                    candidatosLista.first.listaNombre;
                                final votosLista = _getVotosLista(listaId);

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
                                    onTap: () => setState(() {
                                      if (isSelected) {
                                        _selectedListaId = null;
                                        _selectedListaCandidates = [];
                                      } else {
                                        _selectedListaId = listaId;
                                        _selectedListaCandidates =
                                            candidatosLista;
                                        _selected = null;
                                      }
                                    }),
                                    child: Padding(
                                      padding: const EdgeInsets.all(12),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Container(
                                                width: 44,
                                                height: 44,
                                                decoration: BoxDecoration(
                                                  color: isSelected
                                                      ? AppColors.primary
                                                      : AppColors.primary
                                                          .withValues(
                                                              alpha: 0.1),
                                                  borderRadius:
                                                      BorderRadius.circular(12),
                                                ),
                                                child: Center(
                                                  child: isSelected
                                                      ? const Icon(Icons.check,
                                                          color: Colors.white,
                                                          size: 22)
                                                      : Text(
                                                          '${numeroLista ?? ''}',
                                                          style: TextStyle(
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                              color:
                                                                  AppColors
                                                                      .primary,
                                                              fontSize: 18)),
                                                ),
                                              ),
                                              const SizedBox(width: 12),
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      listaNombre ??
                                                          partidoNombre,
                                                      style: const TextStyle(
                                                          fontWeight:
                                                              FontWeight.w600,
                                                          fontSize: 14)),
                                                    const SizedBox(height: 2),
                                                    Text(
                                                      partidoNombre,
                                                      style: AppTextStyles
                                                          .bodySmall),
                                                  ],
                                                ),
                                              ),
                                              Container(
                                                padding: const EdgeInsets
                                                    .symmetric(
                                                    horizontal: 14,
                                                    vertical: 6),
                                                decoration: BoxDecoration(
                                                  color: votosLista > 0
                                                      ? AppColors.success
                                                          .withValues(alpha: 0.1)
                                                      : AppColors.muted,
                                                  borderRadius:
                                                      BorderRadius.circular(16),
                                                ),
                                                child: Text(
                                                  '$votosLista',
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 16,
                                                    color: votosLista > 0
                                                        ? AppColors.success
                                                        : AppColors.lightGray,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 8),
                                          Text(
                                            '${candidatosLista.length} candidatos',
                                            style: AppTextStyles.bodySmall,
                                          ),
                                          const SizedBox(height: 4),
                                          Wrap(
                                            spacing: 4,
                                            runSpacing: 2,
                                            children: candidatosLista
                                                .take(5)
                                                .map((c) => Container(
                                                      padding:
                                                          const EdgeInsets
                                                              .symmetric(
                                                              horizontal: 6,
                                                              vertical: 2),
                                                      decoration: BoxDecoration(
                                                        color: AppColors.muted,
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(4),
                                                      ),
                                                      child: Text(
                                                        c.nombreCompleto,
                                                        style:
                                                            const TextStyle(
                                                                fontSize: 10),
                                                      ),
                                                    ))
                                                .toList(),
                                          ),
                                          if (candidatosLista.length > 5)
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  top: 2),
                                              child: Text(
                                                '+${candidatosLista.length - 5} más',
                                                style: const TextStyle(
                                                    fontSize: 10,
                                                    color: AppColors.gray),
                                              ),
                                            ),
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ))
                      : _candidatosFiltrados.isEmpty
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
                                    onTap: () => setState(() {
                                      if (isSelected) {
                                        _selected = null;
                                      } else {
                                        _selected = c;
                                        _selectedListaId = null;
                                        _selectedListaCandidates = [];
                                      }
                                    }),
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
                                                      color: Colors.white,
                                                      size: 22)
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
                                                        fontWeight:
                                                            FontWeight.w600,
                                                        fontSize: 14)),
                                                const SizedBox(height: 2),
                                                Text(
                                                    '${c.partidoNombre} · ${c.cargoNombre ?? ''}',
                                                    style: AppTextStyles
                                                        .bodySmall),
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
          bottomSheet: _selected != null || _selectedListaId != null
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
                              child: Text(
                                _selectedListaId != null
                                    ? (_selectedListaCandidates.first.listaNombre ??
                                        _selectedListaCandidates.first.partidoNombre)
                                    : _selected!.nombreCompleto,
                                style: AppTextStyles.h3),
                            ),
                            IconButton(
                              icon: const Icon(Icons.close),
                              onPressed: () => setState(() {
                                _selected = null;
                                _selectedListaId = null;
                                _selectedListaCandidates = [];
                              }),
                            ),
                          ],
                        ),
                        if (_selectedListaId != null)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8),
                            child: Text(
                              '${_selectedListaCandidates.length} candidatos en la lista',
                              style: AppTextStyles.bodySmall),
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
                              label: Text(
                                _selectedListaId != null
                                    ? 'Votar Lista'
                                    : 'Registrar'),
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

  Widget _nulosBlancoBadge(String label, int value, Color color) {
    return Row(
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
        const SizedBox(width: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text('$value', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: color)),
        ),
      ],
    );
  }

  Widget _nulosBlancoControl({
    required String label,
    required int value,
    required IconData icon,
    required Color color,
    required VoidCallback onMinus,
    required VoidCallback onPlus,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          border: Border.all(color: AppColors.border),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          children: [
            Icon(icon, size: 18, color: color),
            const SizedBox(width: 6),
            Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
            const Spacer(),
            GestureDetector(
              onTap: onMinus,
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(color: AppColors.muted, borderRadius: BorderRadius.circular(6)),
                child: const Icon(Icons.remove, size: 16),
              ),
            ),
            const SizedBox(width: 8),
            Text('$value', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: onPlus,
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(color: AppColors.muted, borderRadius: BorderRadius.circular(6)),
                child: const Icon(Icons.add, size: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _statusDot(bool isOnline) {
    return Padding(
      padding: const EdgeInsets.only(left: 12),
      child: Container(
        width: 10,
        height: 10,
        decoration: BoxDecoration(
          color: isOnline ? AppColors.success : AppColors.error,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: (isOnline ? AppColors.success : AppColors.error)
                  .withValues(alpha: 0.5),
              blurRadius: 4,
              spreadRadius: 1,
            ),
          ],
        ),
      ),
    );
  }
}
