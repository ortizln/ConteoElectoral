import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';

/// Diálogo de recuperación de contraseña por WhatsApp.
/// El backend valida usuario + cédula; el celular es solo el destino del
/// mensaje (no se valida contra la BD y se guarda en el usuario).
class RecuperarPasswordDialog extends StatefulWidget {
  final ApiService api;
  final String usuarioInicial;

  const RecuperarPasswordDialog({
    super.key,
    required this.api,
    required this.usuarioInicial,
  });

  @override
  State<RecuperarPasswordDialog> createState() =>
      _RecuperarPasswordDialogState();
}

class _RecuperarPasswordDialogState extends State<RecuperarPasswordDialog> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _identificacionController = TextEditingController();
  final _celularController = TextEditingController();

  bool _enviando = false;
  String? _error;
  String? _success;

  @override
  void initState() {
    super.initState();
    _usernameController.text = widget.usuarioInicial;
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _identificacionController.dispose();
    _celularController.dispose();
    super.dispose();
  }

  Future<void> _enviar() async {
    if (_enviando || !_formKey.currentState!.validate()) return;
    setState(() {
      _enviando = true;
      _error = null;
      _success = null;
    });

    final result = await widget.api.recuperarPassword(
      username: _usernameController.text,
      identificacion: _identificacionController.text,
      celular: _celularController.text,
    );

    if (!mounted) return;
    setState(() {
      _enviando = false;
      if (result.success) {
        _success = result.mensajeParaMostrar;
      } else {
        _error = result.error ?? 'No se pudo recuperar la contraseña.';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: !_enviando,
      child: AlertDialog(
        title: Row(
          children: [
            const Icon(Icons.lock_reset, color: AppColors.primary),
            const SizedBox(width: 10),
            Expanded(
              child: Text('Recuperar contraseña', style: AppTextStyles.h3),
            ),
          ],
        ),
        content: SingleChildScrollView(
          child: SizedBox(
            width: double.maxFinite,
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Ingrese su usuario y cédula. Enviaremos una contraseña temporal por WhatsApp al celular que indique. Si ya tiene un celular registrado, debe ingresar ese mismo número.',
                    style: AppTextStyles.bodySmall,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: _usernameController,
                    decoration: const InputDecoration(
                      labelText: 'Usuario',
                      prefixIcon: Icon(Icons.person_outline),
                    ),
                    textInputAction: TextInputAction.next,
                    validator: (v) => (v == null || v.trim().isEmpty)
                        ? 'Ingrese su usuario'
                        : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _identificacionController,
                    decoration: const InputDecoration(
                      labelText: 'Identificación (cédula)',
                      prefixIcon: Icon(Icons.badge_outlined),
                    ),
                    textInputAction: TextInputAction.next,
                    validator: (v) => (v == null || v.trim().isEmpty)
                        ? 'Ingrese su cédula'
                        : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _celularController,
                    decoration: const InputDecoration(
                      labelText: 'Celular de WhatsApp (destino del mensaje)',
                      prefixIcon: Icon(Icons.phone_android_outlined),
                      hintText: 'Ej. 0987269948',
                    ),
                    keyboardType: TextInputType.phone,
                    textInputAction: TextInputAction.done,
                    onFieldSubmitted: (_) => _enviar(),
                    validator: (v) => (v == null || v.trim().isEmpty)
                        ? 'Ingrese el celular de WhatsApp'
                        : null,
                  ),
                  if (_error != null) ...[
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.error.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        _error!,
                        style: const TextStyle(
                          color: AppColors.error,
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                  if (_success != null) ...[
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.success.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        _success!,
                        style: const TextStyle(
                          color: AppColors.success,
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: _enviando ? null : () => Navigator.pop(context),
            child: const Text('Cerrar'),
          ),
          ElevatedButton(
            onPressed: _enviando ? null : _enviar,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
            ),
            child: _enviando
                ? const SizedBox(
                    height: 18,
                    width: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Text('Enviar por WhatsApp'),
          ),
        ],
      ),
    );
  }
}
