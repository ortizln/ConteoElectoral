import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../config/server_url.dart';
import '../theme/app_theme.dart';

class ConfiguracionScreen extends StatefulWidget {
  const ConfiguracionScreen({super.key});

  @override
  State<ConfiguracionScreen> createState() => _ConfiguracionScreenState();
}

class _ConfiguracionScreenState extends State<ConfiguracionScreen> {
  late TextEditingController _serverCtrl;
  bool _testing = false;
  String? _testResult;

  @override
  void initState() {
    super.initState();
    _serverCtrl = TextEditingController(
        text: ServerUrl.stripApiSuffix(context.read<AppProvider>().serverUrl));
  }

  @override
  void dispose() {
    _serverCtrl.dispose();
    super.dispose();
  }

  Future<void> _testConnection() async {
    setState(() {
      _testing = true;
      _testResult = null;
    });
    final provider = context.read<AppProvider>();
    try {
      final result = await provider.testServerConnection();
      if (result['success'] == true) {
        _testResult = 'Conexión exitosa';
      } else {
        _testResult = result['error'] ?? 'Error de conexión';
      }
    } catch (e) {
      _testResult = 'Error: $e';
    }
    setState(() {
      _testing = false;
    });
  }

  Future<void> _saveServer() async {
    final url = _serverCtrl.text.trim();
    if (url.isEmpty) return;
    await context.read<AppProvider>().setServerUrl(url);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Servidor actualizado')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, _) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Configuración'),
          ),
          body: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              // User section
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppColors.gradientStart, AppColors.gradientEnd],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: Colors.white.withValues(alpha: 0.2),
                      child: Text(
                        (provider.usuario?.nombreCompleto ?? 'U')[0],
                        style: const TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            provider.usuario?.nombreCompleto ?? 'Usuario',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              provider.usuario?.rol ?? '',
                              style: const TextStyle(
                                  color: Colors.white, fontSize: 11),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Server connection section
              const Text('Conexión al Servidor', style: AppTextStyles.h3),
              const SizedBox(height: 12),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: provider.isOnline
                                  ? AppColors.success
                                  : AppColors.error,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            provider.isOnline ? 'Conectado' : 'Desconectado',
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              color: provider.isOnline
                                  ? AppColors.success
                                  : AppColors.error,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _serverCtrl,
                        decoration: const InputDecoration(
                          labelText: 'URL del servidor',
                          hintText: 'http://192.168.1.100:8081',
                          contentPadding: EdgeInsets.symmetric(
                              horizontal: 12, vertical: 12),
                          border: OutlineInputBorder(),
                          isDense: true,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton(
                              onPressed: _testing ? null : _testConnection,
                              style: OutlinedButton.styleFrom(
                                  padding:
                                      const EdgeInsets.symmetric(vertical: 14)),
                              child: _testing
                                  ? const SizedBox(
                                      width: 20,
                                      height: 20,
                                      child: CircularProgressIndicator(
                                          strokeWidth: 2),
                                    )
                                  : const Icon(Icons.wifi_find, size: 20),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: FilledButton(
                              onPressed: _saveServer,
                              style: FilledButton.styleFrom(
                                  padding:
                                      const EdgeInsets.symmetric(vertical: 14)),
                              child: const Icon(Icons.save, size: 20),
                            ),
                          ),
                        ],
                      ),
                      if (_testResult != null) ...[
                        const SizedBox(height: 8),
                        Text(
                          _testResult!,
                          style: TextStyle(
                            color: _testResult == 'Conexión exitosa'
                                ? AppColors.success
                                : AppColors.error,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // App info
              const Text('Información', style: AppTextStyles.h3),
              const SizedBox(height: 12),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      _infoRow('Versión', 'v${provider.currentVersion}'),
                      const Divider(height: 16),
                      _infoRow('Servidor', provider.serverUrl),
                      const Divider(height: 16),
                      _infoRow('Usuario', provider.usuario?.username ?? ''),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        );
      },
    );
  }

  Widget _infoRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label,
            style: const TextStyle(color: AppColors.gray, fontSize: 13)),
        Text(value,
            style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
      ],
    );
  }
}
