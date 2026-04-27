import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../models/models.dart';

class VotacionScreen extends StatefulWidget {
  const VotacionScreen({super.key});

  @override
  State<VotacionScreen> createState() => _VotacionScreenState();
}

class _VotacionScreenState extends State<VotacionScreen> {
  Candidato? _candidatoSeleccionado;
  final _cantidadController = TextEditingController(text: '1');
  String _filtroPartido = '';
  String _filtroCargo = '';
  String _busqueda = '';
  String _ordenarPor = 'cargo';

  @override
  void dispose() {
    _cantidadController.dispose();
    super.dispose();
  }

  List<Candidato> get _candidatosFiltrados {
    final provider = context.read<AppProvider>();
    var candidatos = provider.candidatos;

    if (_busqueda.isNotEmpty) {
      final texto = _busqueda.toLowerCase();
      candidatos = candidatos.where((c) =>
        c.nombre.toLowerCase().contains(texto) ||
        c.apellido.toLowerCase().contains(texto)
      ).toList();
    }

    if (_filtroPartido.isNotEmpty) {
      candidatos = candidatos.where((c) =>
        c.partidoNombre == _filtroPartido
      ).toList();
    }

    if (_filtroCargo.isNotEmpty) {
      candidatos = candidatos.where((c) =>
        c.cargoNombre == _filtroCargo
      ).toList();
    }

    switch (_ordenarPor) {
      case 'partido':
        candidatos.sort((a, b) => a.partidoNombre.compareTo(b.partidoNombre));
        break;
      case 'candidato':
        candidatos.sort((a, b) => a.nombreCompleto.compareTo(b.nombreCompleto));
        break;
      default:
        candidatos.sort((a, b) => a.cargoNombre.compareTo(b.cargoNombre));
    }

    return candidatos;
  }

  List<String> get _partidosUnicos {
    final provider = context.read<AppProvider>();
    return provider.candidatos
        .map((c) => c.partidoNombre)
        .toSet()
        .toList()
      ..sort();
  }

  List<String> get _cargosUnicos {
    final provider = context.read<AppProvider>();
    return provider.candidatos
        .map((c) => c.cargoNombre)
        .toSet()
        .toList()
      ..sort();
  }

  Future<void> _registrarVoto() async {
    if (_candidatoSeleccionado == null) return;

    final cantidad = int.tryParse(_cantidadController.text) ?? 1;
    if (cantidad <= 0) return;

    final provider = context.read<AppProvider>();
    await provider.registrarVoto(_candidatoSeleccionado!, cantidad);

    setState(() {
      _candidatoSeleccionado = null;
      _cantidadController.text = '1';
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Voto registrado'),
          duration: Duration(seconds: 1),
        ),
      );
    }
  }

  Future<void> _cerrarActa() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cerrar Acta'),
        content: const Text(
          '¿Está seguro de cerrar el acta? Una vez cerrada no podrá modificar los votos.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Cerrar Acta'),
          ),
        ],
      ),
    );

    if (confirm == true && mounted) {
      final provider = context.read<AppProvider>();
      await provider.cerrarActa();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Acta cerrada')),
        );
      }
    }
  }

  Future<void> _sincronizar() async {
    final provider = context.read<AppProvider>();
    await provider.sincronizarVotos();
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Datos sincronizados')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Consumer<AppProvider>(
          builder: (context, provider, _) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Mesa ${provider.mesaActual?.numero ?? ''}',
                  style: const TextStyle(fontSize: 16),
                ),
                Text(
                  provider.recintoActual?.nombre ?? '',
                  style: const TextStyle(fontSize: 12),
                ),
              ],
            );
          },
        ),
        actions: [
          Consumer<AppProvider>(
            builder: (context, provider, _) {
              if (provider.mesaActual?.cerrada == true) {
                return Container(
                  margin: const EdgeInsets.only(right: 16),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Text(
                    'CERRADA',
                    style: TextStyle(color: Colors.white),
                  ),
                );
              }
              return const SizedBox.shrink();
            },
          ),
          IconButton(
            icon: const Icon(Icons.sync),
            tooltip: 'Sincronizar',
            onPressed: _sincronizar,
          ),
        ],
      ),
      body: Consumer<AppProvider>(
        builder: (context, provider, _) {
          if (provider.mesaActual?.cerrada == true) {
            return const Center(
              child: Card(
                color: Colors.red,
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child: Text(
                    'Esta mesa ha sido cerrada',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                    ),
                  ),
                ),
              ),
            );
          }

          return Column(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                color: Colors.grey[100],
                child: Column(
                  children: [
                    TextField(
                      decoration: const InputDecoration(
                        hintText: 'Buscar candidato...',
                        prefixIcon: Icon(Icons.search),
                        border: OutlineInputBorder(),
                        contentPadding: EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        isDense: true,
                      ),
                      onChanged: (value) {
                        setState(() => _busqueda = value);
                      },
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              contentPadding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              isDense: true,
                            ),
                            hint: const Text('Partido'),
                            items: [
                              const DropdownMenuItem(
                                value: '',
                                child: Text('Todos'),
                              ),
                              ..._partidosUnicos.map((p) => DropdownMenuItem(
                                value: p,
                                child: Text(p),
                              )),
                            ],
                            onChanged: (value) {
                              setState(() => _filtroPartido = value ?? '');
                            },
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              contentPadding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              isDense: true,
                            ),
                            hint: const Text('Cargo'),
                            items: [
                              const DropdownMenuItem(
                                value: '',
                                child: Text('Todos'),
                              ),
                              ..._cargosUnicos.map((c) => DropdownMenuItem(
                                value: c,
                                child: Text(c),
                              )),
                            ],
                            onChanged: (value) {
                              setState(() => _filtroCargo = value ?? '');
                            },
                          ),
                        ),
                        const SizedBox(width: 8),
                        DropdownButton<String>(
                          value: _ordenarPor,
                          items: const [
                            DropdownMenuItem(
                              value: 'cargo',
                              child: Text('Cargo'),
                            ),
                            DropdownMenuItem(
                              value: 'partido',
                              child: Text('Partido'),
                            ),
                            DropdownMenuItem(
                              value: 'candidato',
                              child: Text('Nombre'),
                            ),
                          ],
                          onChanged: (value) {
                            setState(() => _ordenarPor = value ?? 'cargo');
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: _candidatosFiltrados.length,
                  itemBuilder: (context, index) {
                    final candidato = _candidatosFiltrados[index];
                    final votos = provider.getVotosCandidato(candidato);

                    return ListTile(
                      leading: _candidatoSeleccionado?.id == candidato.id
                          ? const CircleAvatar(
                              backgroundColor: Colors.blue,
                              child: Icon(Icons.check, color: Colors.white),
                            )
                          : CircleAvatar(
                              backgroundColor: Colors.grey[300],
                              child: Text(
                                candidato.nombre[0] + candidato.apellido[0],
                              ),
                            ),
                      title: Text(candidato.nombreCompleto),
                      subtitle: Text(
                        '${candidato.partidoNombre} - ${candidato.cargoNombre}',
                      ),
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: votos > 0 ? Colors.green[100] : Colors.grey[200],
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Text(
                          '$votos',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: votos > 0 ? Colors.green[800] : Colors.grey[600],
                          ),
                        ),
                      ),
                      selected: _candidatoSeleccionado?.id == candidato.id,
                      onTap: () {
                        setState(() {
                          _candidatoSeleccionado = candidato;
                        });
                      },
                    );
                  },
                ),
              ),
              if (_candidatoSeleccionado != null)
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.1),
                        blurRadius: 8,
                        offset: const Offset(0, -2),
                      ),
                    ],
                  ),
                  child: SafeArea(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          _candidatoSeleccionado!.nombreCompleto,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _cantidadController,
                                decoration: const InputDecoration(
                                  labelText: 'Cantidad de Votos',
                                  border: OutlineInputBorder(),
                                ),
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: ElevatedButton(
                                onPressed: _registrarVoto,
                                style: ElevatedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(vertical: 16),
                                ),
                                child: const Text(
                                  'Registrar',
                                  style: TextStyle(fontSize: 16),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          );
        },
      ),
      floatingActionButton: Consumer<AppProvider>(
        builder: (context, provider, _) {
          if (provider.mesaActual?.cerrada == true || provider.totalVotos == 0) {
            return const SizedBox.shrink();
          }
          return FloatingActionButton.extended(
            onPressed: _cerrarActa,
            backgroundColor: Colors.red,
            icon: const Icon(Icons.lock),
            label: const Text('Cerrar Acta'),
          );
        },
      ),
    );
  }
}