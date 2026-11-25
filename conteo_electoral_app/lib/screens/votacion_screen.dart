import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
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

/// Cargo presente en la mesa, ya sea individual o por lista.
class _CategoriaMesa {
  final String etiqueta;
  bool esLista;
  final Set<int> cargoIds;

  _CategoriaMesa(this.etiqueta, this.esLista, [Set<int>? ids])
      : cargoIds = ids ?? <int>{};
}

class _VotacionScreenState extends State<VotacionScreen> {
  Candidato? _selected;
  int? _selectedListaId;
  List<Candidato> _selectedListaCandidates = [];
  final _cantidadCtrl = TextEditingController(text: '1');
  String _filtroPartido = '';
  String _busqueda = '';
  final String _ordenPor = 'cargo';
  bool _mostrarListas = false;
  /// null = aún no se eligió; siempre se fija al primer cargo de la mesa.
  String? _categoriaSel;
  bool _pendingCategoriaDefault = false;
  int _fotosCount = 0;
  /// Bloquea el botón mientras se guarda para evitar doble registro por doble tap.
  bool _registrando = false;

  static const _categoriasOrden = [
    'Alcalde',
    'Consejal Rural',
    'Consejal Urbano',
    'Junta Parroquial',
  ];

  /// Normaliza el nombre del cargo a las cuatro categorías del conteo.
  String? _categoriaCargo(String? nombre) {
    if (nombre == null || nombre.trim().isEmpty) return null;
    final n = nombre.toLowerCase()
        .replaceAll('á', 'a').replaceAll('é', 'e')
        .replaceAll('í', 'i').replaceAll('ó', 'o')
        .replaceAll('ú', 'u').replaceAll('ñ', 'n');
    if (n.contains('alcalde')) return 'Alcalde';
    if ((n.contains('junta') && n.contains('parroqui')) || n.contains('vocal')) {
      return 'Junta Parroquial';
    }
    if (n.contains('consej') || n.contains('concejo') || n.contains('consejo')) {
      if (n.contains('urban')) return 'Consejal Urbano';
      if (n.contains('rural')) return 'Consejal Rural';
    }
    return null;
  }

  /// Cargos que realmente tiene esta mesa (según los candidatos autorizados
  /// por el backend). El orden es fijo y no se muestran categorías ausentes.
  List<_CategoriaMesa> get _categoriasDeMesa {
    final provider = context.read<AppProvider>();
    final mapa = <String, _CategoriaMesa>{};
    for (final c in provider.candidatosVisibles) {
      final etiqueta = _categoriaCargo(c.cargoNombre);
      if (etiqueta == null) continue;
      final cargo = provider.cargos.cast<Cargo?>().firstWhere(
            (cg) => cg?.id == c.cargoId,
            orElse: () => null,
          );
      final esLista = cargo?.tipoVotacion == 'LISTA';
      final actual = mapa[etiqueta];
      if (actual == null) {
        mapa[etiqueta] = _CategoriaMesa(
            etiqueta, esLista, c.cargoId == null ? <int>{} : {c.cargoId!});
      } else {
        if (c.cargoId != null) actual.cargoIds.add(c.cargoId!);
        if (esLista) actual.esLista = true;
      }
    }
    return _categoriasOrden
        .where(mapa.containsKey)
        .map((e) => mapa[e]!)
        .toList();
  }

  @override
  void initState() {
    super.initState();
    _cargarFotosCount();
  }

  Future<void> _cargarFotosCount() async {
    final provider = context.read<AppProvider>();
    final mesa = provider.mesaActual;
    if (mesa == null) return;
    final total = await provider.contarFotosActa(mesa.id);
    if (mounted) setState(() => _fotosCount = total);
  }

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
    var list = List<Candidato>.from(provider.candidatosVisibles);

    if (_busqueda.isNotEmpty) {
      final q = _busqueda.toLowerCase();
      list = list
          .where((c) => c.nombreCompleto.toLowerCase().contains(q))
          .toList();
    }
    if (_filtroPartido.isNotEmpty) {
      list = list.where((c) => c.partidoNombre == _filtroPartido).toList();
    }

    list = list.where((c) => c.activo != false).toList();
    if (_categoriaSel != null) {
      list = list
          .where((c) => _categoriaCargo(c.cargoNombre) == _categoriaSel)
          .toList();
    }
    // Only show candidates for cargos that are NOT list-type in individual mode
    list = list.where((c) {
      if (c.cargoId == null) return true;
      final cargo = provider.cargos.cast<Cargo?>().firstWhere(
        (cg) => cg?.id == c.cargoId,
        orElse: () => null,
      );
      return cargo?.tipoVotacion != 'LISTA';
    }).toList();

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

  Map<int, List<Candidato>> get _agrupadosPorLista {
    final provider = context.read<AppProvider>();
    var filtered = provider.candidatosVisibles.where((c) => c.activo != false);
    if (_categoriaSel != null) {
      filtered =
          filtered.where((c) => _categoriaCargo(c.cargoNombre) == _categoriaSel);
    }
    // Only show candidates for list-type cargos in list mode
    filtered = filtered.where((c) {
      if (c.cargoId == null) return false;
      final cargo = provider.cargos.cast<Cargo?>().firstWhere(
        (cg) => cg?.id == c.cargoId,
        orElse: () => null,
      );
      return cargo?.tipoVotacion == 'LISTA';
    });
    if (_filtroPartido.isNotEmpty) {
      filtered = filtered.where((c) => c.partidoNombre == _filtroPartido);
    }
    if (_busqueda.isNotEmpty) {
      final q = _busqueda.toLowerCase();
      filtered =
          filtered.where((c) => c.nombreCompleto.toLowerCase().contains(q));
    }
    final grouped = <int, List<Candidato>>{};
    for (final c in filtered) {
      if (c.listaId != null) {
        grouped.putIfAbsent(c.listaId!, () => []);
        grouped[c.listaId!]!.add(c);
      }
    }
    for (final key in grouped.keys) {
      grouped[key]!
          .sort((a, b) => (a.ordenEnLista ?? 0).compareTo(b.ordenEnLista ?? 0));
    }
    return grouped;
  }

  int _getVotosLista(int listaId) {
    final provider = context.read<AppProvider>();
    final listVoto = provider.votosMesa.cast<Voto?>().firstWhere(
      (v) => v?.listaId == listaId && v?.candidatoId == null,
      orElse: () => null,
    );
    // El voto de lista manda. Solo se suman votos individuales heredados
    // cuando no existe aún el voto de lista (evita contar dos veces lo mismo).
    if (listVoto != null) return listVoto.cantidadVotos;
    final candidatos = _agrupadosPorLista[listaId] ?? [];
    return candidatos.fold(0, (sum, c) => sum + provider.getVotosCandidato(c));
  }

  /// Votos ya registrados para la postulación seleccionada.
  /// Se colocan en el cuadro para poder corregirlos en lugar de acumular.
  int _cantidadPreferida({Candidato? candidato, int? listaId}) {
    final provider = context.read<AppProvider>();
    final votos = listaId != null
        ? _getVotosLista(listaId)
        : (candidato != null ? provider.getVotosCandidato(candidato) : 0);
    return votos > 0 ? votos : 1;
  }

  Future<void> _registrar() async {
    if (_registrando) return;
    final cantidad = int.tryParse(_cantidadCtrl.text) ?? 1;
    if (cantidad <= 0) return;

    final provider = context.read<AppProvider>();
    if (provider.mesaActual?.cerrada == true) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('La mesa está cerrada; no se pueden registrar votos'),
        ));
      }
      return;
    }

    setState(() => _registrando = true);
    try {
      if (_selectedListaId != null) {
        await provider.registrarVotosLista(
            _selectedListaId!, _selectedListaCandidates, cantidad);
      } else if (_selected != null) {
        await provider.registrarVoto(_selected!, cantidad);
      } else {
        return;
      }

      if (!mounted) return;
      setState(() {
        _selected = null;
        _selectedListaId = null;
        _selectedListaCandidates = [];
        _cantidadCtrl.text = '1';
      });

      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text('Voto registrado'),
        duration: Duration(seconds: 1),
      ));
    } finally {
      if (mounted) setState(() => _registrando = false);
    }
  }

  Future<void> _cerrar() async {
    final provider = context.read<AppProvider>();
    final mesa = provider.mesaActual;
    if (mesa == null) return;

    await _cargarFotosCount();
    if (!mounted) return;

    // Respaldos obligatorios: si no hay ninguna foto de esta mesa, se abre la
    // galería en modo obligatorio y no se permite cerrar sin al menos una.
    if (_fotosCount == 0) {
      final capturadas = await _abrirFotosActa(obligatorio: true);
      if (capturadas != true || !mounted) return;
    }

    final confirm = await showConfirmDialog(
      context,
      title: 'Cerrar Acta',
      message: 'Una vez cerrada no podrá modificar los votos.\n¿Está seguro?',
      confirmText: 'Cerrar Acta',
      confirmColor: AppColors.error,
    );
    if (confirm && mounted) {
      await provider.cerrarActa();
      if (mounted) {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text('Acta cerrada')));
        final mesaCerrada = provider.mesaActual;
        if (mesaCerrada != null) {
          await showResumenMesaDialog(
            context,
            mesa: mesaCerrada,
            votos: provider.votosMesa,
            candidatos: provider.candidatos,
            nulos: provider.votosNulos,
            blanco: provider.votosBlanco,
          );
        }
      }
    }
  }

  /// Toma una foto con la cámara o elige varias de la galería del dispositivo.
  /// Cada archivo se copia a un directorio persistente y se sube de inmediato
  /// si hay red; si no, queda en cola para el próximo sync.
  Future<int> _capturarFotos(ImageSource source) async {
    final mesa = context.read<AppProvider>().mesaActual;
    if (mesa == null) return 0;
    try {
      final picker = ImagePicker();
      final List<XFile> archivos = [];
      if (source == ImageSource.camera) {
        final foto = await picker.pickImage(
          source: ImageSource.camera,
          maxWidth: 1920,
          imageQuality: 75,
        );
        if (foto != null) archivos.add(foto);
      } else {
        archivos.addAll(await picker.pickMultiImage(
          maxWidth: 1920,
          imageQuality: 75,
        ));
      }
      if (!mounted || archivos.isEmpty) return 0;

      final provider = context.read<AppProvider>();
      var guardadas = 0;
      for (final archivo in archivos) {
        if (await provider.guardarFotoActa(mesa.id, archivo.path)) guardadas++;
      }
      await _cargarFotosCount();
      if (!mounted) return guardadas;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(guardadas > 0
            ? '$guardadas foto(s) guardada(s)'
            : 'No se pudo guardar la(s) foto(s)'),
        duration: const Duration(seconds: 1),
      ));
      return guardadas;
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Error al agregar fotos: $e'),
        ));
      }
      return 0;
    }
  }

  /// Galería de fotos del acta. En modo [obligatorio] (cierre) no se permite
  /// continuar sin al menos una foto de la mesa.
  Future<bool> _abrirFotosActa({required bool obligatorio}) async {
    final provider = context.read<AppProvider>();
    final mesa = provider.mesaActual;
    if (mesa == null) return false;

    var fotos = await provider.getFotosActa(mesa.id);
    if (!mounted) return false;

    await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setSheetState) {
            Future<void> recargar() async {
              fotos = await context.read<AppProvider>().getFotosActa(mesa.id);
              if (ctx.mounted) setSheetState(() {});
              await _cargarFotosCount();
            }

            return SafeArea(
              child: SizedBox(
                height: MediaQuery.of(ctx).size.height * 0.78,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 16, 16, 8),
                      child: Row(
                        children: [
                          const Icon(Icons.photo_library_outlined, size: 22),
                          const SizedBox(width: 8),
                          const Expanded(
                            child: Text('Fotos del acta',
                                style: TextStyle(
                                    fontSize: 18, fontWeight: FontWeight.bold)),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text('${fotos.length}',
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.primary)),
                          ),
                          IconButton(
                            icon: const Icon(Icons.close),
                            onPressed: () => Navigator.pop(ctx, false),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Text(
                        obligatorio
                            ? 'Registre al menos una foto del acta para cerrar la mesa.'
                            : 'Tome o elija fotos del acta en cualquier momento. Se suben automáticamente.',
                        style: AppTextStyles.bodySmall,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Expanded(
                      child: fotos.isEmpty
                          ? Center(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(Icons.add_photo_alternate_outlined,
                                      size: 56, color: AppColors.gray),
                                  const SizedBox(height: 8),
                                  Text('Sin fotos del acta',
                                      style: TextStyle(color: AppColors.gray)),
                                ],
                              ),
                            )
                          : GridView.builder(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 16),
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 3,
                                crossAxisSpacing: 8,
                                mainAxisSpacing: 8,
                              ),
                              itemCount: fotos.length,
                              itemBuilder: (ctx, index) {
                                final foto = fotos[index];
                                final path = foto['filePath'] as String;
                                final subida = (foto['uploaded'] as int) == 1;
                                return ClipRRect(
                                  borderRadius: BorderRadius.circular(8),
                                  child: Stack(
                                    fit: StackFit.expand,
                                    children: [
                                      GestureDetector(
                                        onTap: () => _verFoto(path),
                                        child: Image.file(
                                          File(path),
                                          fit: BoxFit.cover,
                                          errorBuilder: (_, __, ___) => Container(
                                            color: AppColors.muted,
                                            child:
                                                const Icon(Icons.broken_image),
                                          ),
                                        ),
                                      ),
                                      Positioned(
                                        left: 4,
                                        bottom: 4,
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 6, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: Colors.black54,
                                            borderRadius:
                                                BorderRadius.circular(4),
                                          ),
                                          child: Text(
                                            subida ? 'Enviada' : 'Pendiente',
                                            style: const TextStyle(
                                                color: Colors.white, fontSize: 9),
                                          ),
                                        ),
                                      ),
                                      if (!subida)
                                        Positioned(
                                          right: 2,
                                          top: 2,
                                          child: GestureDetector(
                                            onTap: () async {
                                              final ok = await context
                                                  .read<AppProvider>()
                                                  .eliminarFotoActa(
                                                      foto['id'] as int);
                                              if (!ctx.mounted) return;
                                              if (!ok) {
                                                ScaffoldMessenger.of(ctx)
                                                    .showSnackBar(const SnackBar(
                                                  content: Text(
                                                      'No se pudo eliminar la foto'),
                                                ));
                                              }
                                              await recargar();
                                            },
                                            child: Container(
                                              padding: const EdgeInsets.all(4),
                                              decoration: const BoxDecoration(
                                                color: Colors.black54,
                                                shape: BoxShape.circle,
                                              ),
                                              child: const Icon(Icons.close,
                                                  size: 14,
                                                  color: Colors.white),
                                            ),
                                          ),
                                        ),
                                    ],
                                  ),
                                );
                              },
                            ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
                      child: Column(
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: OutlinedButton.icon(
                                  onPressed: () async {
                                    await _capturarFotos(ImageSource.camera);
                                    await recargar();
                                  },
                                  icon: const Icon(Icons.photo_camera, size: 18),
                                  label: const Text('Tomar foto'),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: OutlinedButton.icon(
                                  onPressed: () async {
                                    await _capturarFotos(ImageSource.gallery);
                                    await recargar();
                                  },
                                  icon:
                                      const Icon(Icons.photo_library, size: 18),
                                  label: const Text('Elegir fotos'),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: obligatorio && fotos.isEmpty
                                  ? null
                                  : () => Navigator.pop(ctx, true),
                              child: Text(obligatorio ? 'Continuar' : 'Listo'),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
    if (!mounted) return false;
    return fotos.isNotEmpty;
  }

  /// Visor a pantalla completa de una foto del acta.
  void _verFoto(String path) {
    showDialog(
      context: context,
      builder: (dialogContext) => Dialog.fullscreen(
        child: Stack(
          children: [
            Positioned.fill(
              child: Image.file(File(path), fit: BoxFit.contain),
            ),
            Positioned(
              top: 8,
              right: 8,
              child: CircleAvatar(
                backgroundColor: Colors.black54,
                child: IconButton(
                  icon: const Icon(Icons.close, color: Colors.white),
                  onPressed: () => Navigator.pop(dialogContext),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _sincronizar() async {
    final provider = context.read<AppProvider>();
    final antes = provider.pendingSyncCount + provider.failedSyncCount;
    // Sync manual del usuario: forzar reintento de ops FAILED (les da 5
    // intentos nuevos) — sin esto, un error permanente quedaba trabado
    await provider.sincronizarVotos(forceRetry: true);
    if (!mounted) return;
    final restantes = provider.pendingSyncCount + provider.failedSyncCount;
    // B13: mensaje según el resultado real, no siempre "Sincronizado"
    final String msg;
    if (!provider.isOnline) {
      msg = 'Sin conexión: los cambios quedaron en cola';
    } else if (restantes == 0) {
      msg = 'Sincronizado ✓';
    } else {
      msg = 'Quedan $restantes operación(es) pendientes ($antes antes)';
    }
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, _) {
        if (provider.mesaActual == null) {
          return Scaffold(
            appBar: AppBar(
              leading: Padding(
                padding: const EdgeInsets.only(left: 8),
                child: _statusDot(provider.isOnline, size: 6),
              ),
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
            body: Center(
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
            body: Center(
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
                  SizedBox(height: 24),
                  OutlinedButton.icon(
                    onPressed: () {
                      final provider = context.read<AppProvider>();
                      final mesa = provider.mesaActual;
                      if (mesa == null) return;
                      showResumenMesaDialog(
                        context,
                        mesa: mesa,
                        votos: provider.votosMesa,
                        candidatos: provider.candidatos,
                        nulos: provider.votosNulos,
                        blanco: provider.votosBlanco,
                      );
                    },
                    icon: const Icon(Icons.summarize_outlined, size: 18),
                    label: const Text('Ver resumen'),
                  ),
                ],
              ),
            ),
          );
        }

        // No hay opción "Todos": al entrar (o al cambiar de mesa) se activa
        // automáticamente el primer cargo que realmente tiene la mesa.
        final categoriasActuales = _categoriasDeMesa;
        final seleccionActual = _categoriaSel;
        if (categoriasActuales.isNotEmpty &&
            (seleccionActual == null ||
                !categoriasActuales.any((c) => c.etiqueta == seleccionActual)) &&
            !_pendingCategoriaDefault) {
          _pendingCategoriaDefault = true;
          WidgetsBinding.instance.addPostFrameCallback((_) {
            _pendingCategoriaDefault = false;
            if (!mounted) return;
            final actuales = _categoriasDeMesa;
            if (actuales.isEmpty) return;
            if (_categoriaSel == null ||
                !actuales.any((c) => c.etiqueta == _categoriaSel)) {
              _seleccionarCategoria(actuales.first);
            }
          });
        }

        return Scaffold(
          appBar: AppBar(
            leading: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => Navigator.pop(context),
                ),
                _statusDot(provider.isOnline, size: 6),
              ],
            ),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Mesa ${provider.mesaActual?.numero ?? ''}',
                    style: const TextStyle(fontSize: 16)),
                if (provider.mesaActual?.institucionNombre != null)
                  Text(
                      '${provider.mesaActual!.institucionNombre!}'
                      '${(provider.mesaActual?.sexo ?? '').isNotEmpty ? ' · ${provider.mesaActual!.sexo}' : ''}',
                      style:
                          TextStyle(fontSize: 11, color: AppColors.gray)),
              ],
            ),
            actions: [
              IconButton(
                icon: Badge(
                  label: Text('$_fotosCount'),
                  isLabelVisible: _fotosCount > 0,
                  child: const Icon(Icons.photo_library_outlined),
                ),
                tooltip: 'Fotos del acta ($_fotosCount)',
                onPressed: () => _abrirFotosActa(obligatorio: false),
              ),
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
                  icon:
                      const Icon(Icons.sync_problem, color: AppColors.warning),
                  tooltip:
                      '${provider.failedSyncCount} sincronizaciones fallidas',
                  onPressed: () => Navigator.pushNamed(context, '/pendientes'),
                ),
              IconButton(
                  icon: const Icon(Icons.sync),
                  tooltip: 'Sincronizar',
                  onPressed: _sincronizar),
            ],
          ),
          body: Column(
            children: [
              // Solo las pestañas de cargos de la mesa; se quitaron los filtros.
              Container(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                color: AppColors.surface,
                child: _buildModoSelector(),
              ),

              // Mesa info card
              Container(
                margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppColors.gradientStart, AppColors.gradientEnd],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Text(
                          provider.mesaActual?.numero ?? '',
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                'Mesa ${provider.mesaActual?.numero ?? ''}',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 15,
                                ),
                              ),
                              if ((provider.mesaActual?.sexo ?? '')
                                  .isNotEmpty) ...[
                                const SizedBox(width: 6),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.2),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: Text(
                                    provider.mesaActual!.sexo,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 10,
                                      fontWeight: FontWeight.w700,
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                ),
                              ],
                            ],
                          ),
                          if (provider.mesaActual?.institucionNombre != null)
                            Text(
                              provider.mesaActual!.institucionNombre!,
                              style: TextStyle(
                                color: Colors.white.withValues(alpha: 0.8),
                                fontSize: 12,
                              ),
                            ),
                          Text(
                            'ID: ${provider.mesaActual?.id ?? ''}',
                            style: TextStyle(
                              color: Colors.white.withValues(alpha: 0.7),
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                    ),
                    if (!(provider.mesaActual?.cerrada ?? false))
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.success.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text('Abierta',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 11,
                                fontWeight: FontWeight.w600)),
                      )
                    else
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.error.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text('Cerrada',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 11,
                                fontWeight: FontWeight.w600)),
                      ),
                  ],
                ),
              ),
              const Divider(height: 1),
              // Candidate list
              Expanded(
                child: RefreshIndicator(
                  onRefresh: () async => _sincronizar(),
                  child: _mostrarListas
                      ? (_agrupadosPorLista.isEmpty
                          ? const EmptyState(
                              icon: Icons.person_search_outlined,
                              title: 'Sin listas',
                              subtitle: 'No se encontraron listas')
                          : ListView.builder(
                              padding:
                                  const EdgeInsets.fromLTRB(16, 8, 16, 100),
                              itemCount: _agrupadosPorLista.length + 2,
                              itemBuilder: (context, index) {
                                if (index >= _agrupadosPorLista.length) {
                                  return _nulosBlancoFila(
                                      index - _agrupadosPorLista.length,
                                      provider);
                                }
                                final listaId =
                                    _agrupadosPorLista.keys.elementAt(index);
                                final candidatosLista =
                                    _agrupadosPorLista[listaId]!;
                                final isSelected = _selectedListaId == listaId;
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
                                        _cantidadCtrl.text = '1';
                                      } else {
                                        _selectedListaId = listaId;
                                        _selectedListaCandidates =
                                            candidatosLista;
                                        _selected = null;
                                        _cantidadCtrl.text =
                                            '${_cantidadPreferida(listaId: listaId)}';
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
                                                          style: const TextStyle(
                                                              fontWeight:
                                                                  FontWeight
                                                                      .bold,
                                                              color: AppColors
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
                                                        [
                                                          candidatosLista.first
                                                              .cargoNombre,
                                                          partidoNombre,
                                                        ]
                                                            .where((s) =>
                                                                s != null &&
                                                                s.isNotEmpty)
                                                            .join(' · '),
                                                        style: AppTextStyles
                                                            .bodySmall),
                                                  ],
                                                ),
                                              ),
                                              Container(
                                                padding:
                                                    const EdgeInsets.symmetric(
                                                        horizontal: 14,
                                                        vertical: 6),
                                                decoration: BoxDecoration(
                                                  color: votosLista > 0
                                                      ? AppColors.success
                                                          .withValues(
                                                              alpha: 0.1)
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
                                            '${candidatosLista.length} candidatos · toca la lista para verlos',
                                            style: AppTextStyles.bodySmall,
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
                              padding:
                                  const EdgeInsets.fromLTRB(16, 8, 16, 100),
                              itemCount: _candidatosFiltrados.length + 2,
                              itemBuilder: (context, index) {
                                if (index >= _candidatosFiltrados.length) {
                                  return _nulosBlancoFila(
                                      index - _candidatosFiltrados.length,
                                      provider);
                                }
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
                                        _cantidadCtrl.text = '1';
                                      } else {
                                        _selected = c;
                                        _selectedListaId = null;
                                        _selectedListaCandidates = [];
                                        _cantidadCtrl.text =
                                            '${_cantidadPreferida(candidato: c)}';
                                      }
                                    }),
                                    child: Padding(
                                      padding: const EdgeInsets.all(12),
                                      child: Row(
                                        children: [
                                          Container(
                                            width: 44,
                                            height: 44,
                                            clipBehavior: Clip.antiAlias,
                                            decoration: BoxDecoration(
                                              color: isSelected
                                                  ? AppColors.primary
                                                  : partyColor.withValues(
                                                      alpha: 0.1),
                                              borderRadius:
                                                  BorderRadius.circular(12),
                                            ),
                                            child: isSelected
                                                ? const Center(
                                                    child: Icon(Icons.check,
                                                        color: Colors.white,
                                                        size: 22))
                                                : (c.tieneFoto == true
                                                    ? _FotoCandidato(
                                                        candidatoId: c.id,
                                                        fallback: Center(
                                                          child: Text(
                                                              c.nombreCompleto[
                                                                  0],
                                                              style: TextStyle(
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                  color:
                                                                      partyColor,
                                                                  fontSize:
                                                                      18)),
                                                        ),
                                                      )
                                                    : Center(
                                                        child: Text(
                                                            c.nombreCompleto[
                                                                0],
                                                            style: TextStyle(
                                                                fontWeight:
                                                                    FontWeight
                                                                        .bold,
                                                                color:
                                                                    partyColor,
                                                                fontSize:
                                                                    18)),
                                                      )),
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
                                      ? (_selectedListaCandidates
                                              .first.listaNombre ??
                                          _selectedListaCandidates
                                              .first.partidoNombre)
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
                              onPressed: _registrando ? null : _registrar,
                              icon: const Icon(Icons.how_to_vote, size: 20),
                              label: Text(_registrando
                                  ? 'Registrando...'
                                  : (_selectedListaId != null
                                      ? 'Votar Lista'
                                      : 'Registrar')),
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
                style: TextStyle(
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

  Widget _nulosBlancoFila(int tipo, AppProvider provider) {
    final esNulos = tipo == 0;
    final color = esNulos ? AppColors.error : AppColors.gray;
    final valor = esNulos ? provider.votosNulos : provider.votosBlanco;
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: AppColors.border),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => _editarNulosBlanco(esNulos),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                    esNulos
                        ? Icons.cancel_outlined
                        : Icons.check_circle_outline,
                    color: color,
                    size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(esNulos ? 'Votos Nulos' : 'Votos en Blanco',
                        style: const TextStyle(
                            fontWeight: FontWeight.w600, fontSize: 14)),
                    const SizedBox(height: 2),
                    Text('Toque para modificar',
                        style: AppTextStyles.bodySmall),
                  ],
                ),
              ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                decoration: BoxDecoration(
                  color: valor > 0
                      ? color.withValues(alpha: 0.1)
                      : AppColors.muted,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text('$valor',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: valor > 0 ? color : AppColors.lightGray)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _editarNulosBlanco(bool esNulos) async {
    final provider = context.read<AppProvider>();
    final messenger = ScaffoldMessenger.of(context);
    final color = esNulos ? AppColors.error : AppColors.gray;
    final ctrl = TextEditingController(
        text: '${esNulos ? provider.votosNulos : provider.votosBlanco}');

    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        void cambiar(int delta) {
          final v = int.tryParse(ctrl.text) ?? 0;
          final nv = v + delta;
          if (nv >= 0) ctrl.text = '$nv';
        }

        return Padding(
          padding: EdgeInsets.fromLTRB(
              20, 16, 20, 24 + MediaQuery.of(ctx).viewInsets.bottom),
          child: StatefulBuilder(
            builder: (ctx, setSheetState) {
              return Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                          esNulos
                              ? Icons.cancel_outlined
                              : Icons.check_circle_outline,
                          color: color,
                          size: 20),
                      const SizedBox(width: 8),
                      Text(
                          esNulos ? 'Votos Nulos' : 'Votos en Blanco',
                          style: const TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text('Ingrese el total de la mesa',
                      style: AppTextStyles.bodySmall),
                  const SizedBox(height: 16),
                  Center(
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _quantityBtn(Icons.remove, () {
                          cambiar(-1);
                          setSheetState(() {});
                        }),
                        const SizedBox(width: 12),
                        SizedBox(
                          width: 90,
                          child: TextField(
                            controller: ctrl,
                            textAlign: TextAlign.center,
                            keyboardType: TextInputType.number,
                            style: const TextStyle(
                                fontSize: 26, fontWeight: FontWeight.bold),
                            decoration: InputDecoration(
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)),
                            ),
                            onChanged: (_) => setSheetState(() {}),
                          ),
                        ),
                        const SizedBox(width: 12),
                        _quantityBtn(Icons.add, () {
                          cambiar(1);
                          setSheetState(() {});
                        }),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () async {
                        final valor = int.tryParse(ctrl.text) ?? 0;
                        if (valor < 0) return;
                        if (esNulos) {
                          await provider.actualizarNulos(valor);
                        } else {
                          await provider.actualizarBlanco(valor);
                        }
                        if (ctx.mounted) Navigator.pop(ctx);
                        messenger.showSnackBar(SnackBar(
                          content: Text(esNulos
                              ? 'Votos nulos actualizados'
                              : 'Votos en blanco actualizados'),
                          duration: const Duration(seconds: 1),
                        ));
                      },
                      icon: const Icon(Icons.save, size: 20),
                      label: const Text('Guardar'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: color,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        );
      },
    );
    ctrl.dispose();
  }

  void _seleccionarCategoria(_CategoriaMesa cat) {
    setState(() {
      _categoriaSel = cat.etiqueta;
      _mostrarListas = cat.esLista;
      _selected = null;
      _selectedListaId = null;
      _selectedListaCandidates = [];
      _cantidadCtrl.text = '1';
    });
  }

  /// Pestañas de los cargos de la mesa: Alcalde / Consejal Rural /
  /// Consejal Urbano / Junta Parroquial. No hay "Todos" y solo aparecen los
  /// cargos que realmente tiene la mesa.
  Widget _buildModoSelector() {
    final categorias = _categoriasDeMesa;
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          for (var i = 0; i < categorias.length; i++) ...[
            if (i > 0) const SizedBox(width: 6),
            _filterChip(categorias[i].etiqueta, categorias[i].etiqueta,
                _categoriaSel == categorias[i].etiqueta,
                () => _seleccionarCategoria(categorias[i])),
          ],
        ],
      ),
    );
  }

  Widget _statusDot(bool isOnline, {double size = 6}) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: isOnline ? AppColors.success : AppColors.error,
        shape: BoxShape.circle,
      ),
    );
  }
}

/// Foto del candidato (caché del provider: memoria + disco).
/// Muestra el fallback (inicial con color del partido) mientras carga o si
/// no hay foto disponible.
class _FotoCandidato extends StatefulWidget {
  const _FotoCandidato({required this.candidatoId, required this.fallback});

  final int candidatoId;
  final Widget fallback;

  @override
  State<_FotoCandidato> createState() => _FotoCandidatoState();
}

class _FotoCandidatoState extends State<_FotoCandidato> {
  Uint8List? _bytes;

  @override
  void initState() {
    super.initState();
    final cacheado = context
        .read<AppProvider>()
        .fotoCandidatoCacheada(widget.candidatoId);
    if (cacheado != null) {
      _bytes = cacheado;
    } else {
      _cargar();
    }
  }

  Future<void> _cargar() async {
    final bytes =
        await context.read<AppProvider>().getFotoCandidato(widget.candidatoId);
    if (!mounted) return;
    setState(() => _bytes = bytes);
  }

  @override
  Widget build(BuildContext context) {
    final bytes = _bytes;
    if (bytes != null) {
      return Image.memory(
        bytes,
        fit: BoxFit.cover,
        width: double.infinity,
        height: double.infinity,
        gaplessPlayback: true,
      );
    }
    // Aún no carga (o no tiene foto): inicial de respaldo
    return widget.fallback;
  }
}
