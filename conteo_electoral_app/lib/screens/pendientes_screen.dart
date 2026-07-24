import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

class PendientesScreen extends StatefulWidget {
  const PendientesScreen({super.key});

  @override
  State<PendientesScreen> createState() => _PendientesScreenState();
}

class _PendientesScreenState extends State<PendientesScreen> {
  List<Map<String, dynamic>> _ops = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final provider = context.read<AppProvider>();
    final ops = await provider.getSyncOps();
    if (mounted) {
      setState(() {
        _ops = ops;
        _loading = false;
      });
    }
  }

  String _entityLabel(String type) {
    switch (type) {
      case 'VOTO': return 'Voto';
      case 'MESA': return 'Mesa';
      default: return type;
    }
  }

  IconData _entityIcon(String type) {
    switch (type) {
      case 'VOTO': return Icons.how_to_vote_outlined;
      case 'MESA': return Icons.table_restaurant;
      default: return Icons.sync;
    }
  }

  String _payloadPreview(Map<String, dynamic>? payload) {
    if (payload == null) return '—';
    if (payload.containsKey('id')) {
      return '#${payload['id']}';
    }
    return '...';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sync Pendientes'),
        actions: [
          if (_ops.any((o) => o['status'] == 'FAILED'))
            IconButton(
              icon: const Icon(Icons.refresh),
              tooltip: 'Reintentar fallidos',
              onPressed: () async {
                final provider = context.read<AppProvider>();
                await provider.retryAllFailed();
                await _load();
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Reintentando fallidos...')),
                  );
                  provider.sincronizarVotos();
                }
              },
            ),
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            tooltip: 'Recargar',
            onPressed: _load,
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _ops.isEmpty
              ? const Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.check_circle_outline, size: 64, color: AppColors.success),
                      SizedBox(height: 16),
                      Text('No hay operaciones pendientes',
                          style: TextStyle(fontSize: 16, color: AppColors.gray)),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView.separated(
                    padding: const EdgeInsets.all(12),
                    itemCount: _ops.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 6),
                    itemBuilder: (context, index) {
                      final op = _ops[index];
                      final id = op['id'] as int;
                      final entityType = op['entity_type'] as String;
                      final entityId = op['entity_id'] as int;
                      final operation = op['operation'] as String;
                      final status = op['status'] as String;
                      final retryCount = op['retry_count'] as int? ?? 0;
                      final lastError = op['last_error'] as String?;
                      final createdAt = op['created_at'] as String? ?? '';
                      final payloadStr = op['payload'] as String?;
                      Map<String, dynamic>? payload;
                      if (payloadStr != null) {
                        try {
                          payload = jsonDecode(payloadStr) as Map<String, dynamic>;
                        } catch (_) {}
                      }

                      final isFailed = status == 'FAILED';
                      final date = createdAt.length >= 19
                          ? '${createdAt.substring(0, 10)} ${createdAt.substring(11, 19)}'
                          : createdAt;

                      return Card(
                        color: isFailed ? Colors.red.shade50 : Colors.white,
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: (isFailed ? AppColors.error : AppColors.warning)
                                      .withValues(alpha: 0.1),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Icon(
                                  _entityIcon(entityType),
                                  color: isFailed ? AppColors.error : AppColors.warning,
                                  size: 22,
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
                                          '${_entityLabel(entityType)} $entityId',
                                          style: const TextStyle(
                                              fontWeight: FontWeight.w600, fontSize: 14),
                                        ),
                                        const SizedBox(width: 8),
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 6, vertical: 1),
                                          decoration: BoxDecoration(
                                            color: isFailed
                                                ? AppColors.error.withValues(alpha: 0.1)
                                                : AppColors.warning.withValues(alpha: 0.1),
                                            borderRadius: BorderRadius.circular(6),
                                          ),
                                          child: Text(
                                            isFailed ? 'FALLIDO' : 'PENDIENTE',
                                            style: TextStyle(
                                              fontSize: 10,
                                              fontWeight: FontWeight.bold,
                                              color: isFailed
                                                  ? AppColors.error
                                                  : AppColors.warning,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      '${operation == 'CREATE' ? 'Crear' : operation == 'UPDATE' ? 'Actualizar' : operation == 'CLOSE' ? 'Cerrar' : operation} ${entityType == 'VOTO' ? 'voto' : 'mesa'}',
                                      style: const TextStyle(
                                          fontSize: 12, color: AppColors.gray),
                                    ),
                                    if (retryCount > 0)
                                      Text(
                                        'Reintentos: $retryCount',
                                        style: TextStyle(
                                            fontSize: 11,
                                            color: isFailed
                                                ? AppColors.error
                                                : AppColors.gray),
                                      ),
                                    if (lastError != null && lastError.isNotEmpty)
                                      Text(
                                        lastError,
                                        style: const TextStyle(
                                            fontSize: 11, color: AppColors.error),
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    Text(
                                      date,
                                      style: const TextStyle(
                                          fontSize: 10, color: AppColors.lightGray),
                                    ),
                                  ],
                                ),
                              ),
                              PopupMenuButton<String>(
                                icon: const Icon(Icons.more_vert, size: 20),
                                onSelected: (value) async {
                                  final provider = context.read<AppProvider>();
                                  if (value == 'retry') {
                                    await provider.retrySingleOp(id);
                                    await _load();
                                  } else if (value == 'delete') {
                                    final confirm = await showDialog<bool>(
                                      context: context,
                                      builder: (ctx) => AlertDialog(
                                        title: const Text('Eliminar'),
                                        content: Text(
                                            '¿Eliminar operación $entityType $entityId?'),
                                        actions: [
                                          TextButton(
                                              onPressed: () =>
                                                  Navigator.pop(ctx, false),
                                              child: const Text('Cancelar')),
                                          FilledButton(
                                              onPressed: () =>
                                                  Navigator.pop(ctx, true),
                                              child: const Text('Eliminar')),
                                        ],
                                      ),
                                    );
                                    if (confirm == true) {
                                      await provider.deleteSyncOp(id);
                                      await _load();
                                    }
                                  }
                                },
                                itemBuilder: (_) => [
                                  const PopupMenuItem(
                                      value: 'retry',
                                      child: ListTile(
                                          leading: Icon(Icons.refresh, size: 20),
                                          title: Text('Reintentar'))),
                                  const PopupMenuItem(
                                      value: 'delete',
                                      child: ListTile(
                                          leading: Icon(Icons.delete_outline, size: 20),
                                          title: Text('Eliminar'))),
                                ],
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
