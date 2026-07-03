import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SyncIndicator extends StatelessWidget {
  final bool isOnline;
  final int pendientes;

  const SyncIndicator({
    super.key,
    required this.isOnline,
    this.pendientes = 0,
  });

  @override
  Widget build(BuildContext context) {
    final color = isOnline ? AppColors.success : AppColors.warning;
    final status = isOnline ? 'En línea' : 'Sin conexión';
    final icon = isOnline ? Icons.wifi : Icons.wifi_off;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: color),
          const SizedBox(width: 6),
          Text(status, style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w500)),
          if (pendientes > 0) ...[
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: AppColors.warning,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text('$pendientes', style: const TextStyle(fontSize: 10, color: Colors.white)),
            ),
          ],
        ],
      ),
    );
  }
}
