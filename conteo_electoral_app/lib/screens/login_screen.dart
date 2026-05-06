import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  final _serverController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _serverController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    final provider = context.read<AppProvider>();
    final success = await provider.login(
      _usernameController.text,
      _passwordController.text,
    );

    if (success && mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const HomeScreen()),
      );
    }
  }

  Future<void> _showServerConfigDialog() async {
    final provider = context.read<AppProvider>();
    _serverController.text = provider.serverUrl.replaceAll('/api', '');

    if (!mounted) return;

    return showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Configuración del Servidor'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _serverController,
              decoration: const InputDecoration(
                labelText: 'URL del Servidor',
                hintText: 'http://192.168.1.100:8080',
                prefixIcon: Icon(Icons.language),
                border: OutlineInputBorder(),
              ),
              autofocus: true,
            ),
            const SizedBox(height: 12),
            const Text(
              'Ingrese la dirección IP o dominio del servidor',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final url = _serverController.text.trim();
              if (url.isNotEmpty) {
                await provider.setServerUrl(url);
                if (mounted) Navigator.pop(context);
              }
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Conteo Electoral'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            tooltip: 'Configurar Servidor',
            onPressed: _showServerConfigDialog,
          ),
        ],
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Icon(
                    Icons.how_to_vote,
                    size: 80,
                    color: Colors.blue,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Conteo Electoral',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Consumer<AppProvider>(
                    builder: (context, provider, _) => Text(
                      'Servidor: ${provider.serverUrl.replaceAll('/api', '')}',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[600],
                      ),
                      overflow: TextOverflow.ellipsis,
                      softWrap: false,
                    ),
                  ),
                  const SizedBox(height: 32),
                  TextFormField(
                    controller: _usernameController,
                    decoration: const InputDecoration(
                      labelText: 'Usuario',
                      prefixIcon: Icon(Icons.person),
                      border: OutlineInputBorder(),
                    ),
                    textInputAction: TextInputAction.next,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Ingrese su usuario';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      labelText: 'Contraseña',
                      prefixIcon: const Icon(Icons.lock),
                      border: const OutlineInputBorder(),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility
                              : Icons.visibility_off,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscurePassword = !_obscurePassword;
                          });
                        },
                      ),
                    ),
                    obscureText: _obscurePassword,
                    textInputAction: TextInputAction.done,
                    onFieldSubmitted: (_) => _login(),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Ingrese su contraseña';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                  Consumer<AppProvider>(
                    builder: (context, provider, _) {
                      return OutlinedButton.icon(
                        onPressed: provider.isLoading
                            ? null
                            : () async {
                                final messenger = ScaffoldMessenger.of(context);
                                final result = await provider.testServerConnection();
                                if (!mounted) return;
                                messenger.showSnackBar(
                                  SnackBar(
                                    content: Text(result['message']?.toString() ?? 'Error'),
                                    backgroundColor: result['success'] == true
                                        ? Colors.green
                                        : Colors.red,
                                  ),
                                );
                              },
                        icon: const Icon(Icons.wifi_tethering),
                        label: const Text('Probar Conexión'),
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          minimumSize: const Size(double.infinity, 0),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 24),
                  Consumer<AppProvider>(
                    builder: (context, provider, _) {
                      if (provider.error != null) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 16),
                          child: Text(
                            provider.error!,
                            style: const TextStyle(
                              color: Colors.red,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        );
                      }
                      return const SizedBox.shrink();
                    },
                  ),
                  Consumer<AppProvider>(
                    builder: (context, provider, _) {
                      return ElevatedButton(
                        onPressed: provider.isLoading ? null : _login,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                        ),
                        child: provider.isLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : const Text(
                                'Iniciar Sesión',
                                style: TextStyle(fontSize: 16),
                              ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}