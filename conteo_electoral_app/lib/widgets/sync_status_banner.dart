import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

/// Banner compacto de estado de sincronización (offline / pendientes /
/// fallidas / sincronizando / al día). No modifica datos: solo observa
/// AppProvider y dispara las acciones de reintento existentes.
class SyncStatusBanner extends StatelessWidget {
  const SyncStatusBanner({super.key});

  @override
  Widget build(BuildContext context) {
    final app = context.watch<AppProvider>();
    final offline = !app.isOnline;
    final pending = app.pendingSyncCount;
    final failed = app.failedSyncCount;

    if (app.isSyncing) {
      return _Banner(
        color: AppColors.info,
        icon: Icons.sync,
        message: 'Sincronizando…',
        trailing: const SizedBox(
          width: 16,
          height: 16,
          child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.info),
        ),
      );
    }

    if (offline) {
      return _Banner(
        color: AppColors.warning,
        icon: Icons.wifi_off,
        message: pending > 0
            ? 'Sin conexión · $pending voto${pending == 1 ? '' : 's'} guardado${pending == 1 ? '' : 's'} localmente'
            : 'Sin conexión · los votos se guardan localmente',
      );
    }

    if (failed > 0) {
      return _Banner(
        color: AppColors.error,
        icon: Icons.error_outline,
        message: '$failed operacione${failed == 1 ? '' : 's'} fallida${failed == 1 ? '' : 's'}',
        actionLabel: 'Reintentar',
        onAction: () => app.retryAllFailed(),
      );
    }

    if (pending > 0) {
      return _Banner(
        color: AppColors.warning,
        icon: Icons.cloud_upload_outlined,
        message: '$pending pendiente${pending == 1 ? '' : 's'} de sincronizar',
        actionLabel: 'Sincronizar',
        onAction: () => app.sincronizarVotos(),
      );
    }

    return _Banner(
      color: AppColors.success,
      icon: Icons.cloud_done,
      message: 'Sincronizado',
    );
  }
}

class _Banner extends StatelessWidget {
  final Color color;
  final IconData icon;
  final String message;
  final String? actionLabel;
  final VoidCallback? onAction;
  final Widget? trailing;

  const _Banner({
    required this.color,
    required this.icon,
    required this.message,
    this.actionLabel,
    this.onAction,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      label: message,
      child: Container(
        margin: const EdgeInsets.fromLTRB(16, 8, 16, 0),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.10),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: color.withValues(alpha: 0.35)),
        ),
        child: Row(
          children: [
            Icon(icon, size: 16, color: color),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                message,
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                  color: color,
                ),
              ),
            ),
            if (trailing != null) trailing!,
            if (actionLabel != null)
              TextButton(
                onPressed: onAction,
                style: TextButton.styleFrom(
                  foregroundColor: color,
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  minimumSize: const Size(0, 32),
                  textStyle: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                child: Text(actionLabel!),
              ),
          ],
        ),
      ),
    );
  }
}
