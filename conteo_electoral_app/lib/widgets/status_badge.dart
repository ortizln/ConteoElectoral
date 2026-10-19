import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

enum StatusBadgeKind { ok, warning, error, info, neutral }

class StatusBadge extends StatelessWidget {
  final String label;
  final StatusBadgeKind kind;
  final IconData? icon;

  const StatusBadge({
    super.key,
    required this.label,
    this.kind = StatusBadgeKind.neutral,
    this.icon,
  });

  Color _color() {
    switch (kind) {
      case StatusBadgeKind.ok:
        return AppColors.success;
      case StatusBadgeKind.warning:
        return AppColors.warning;
      case StatusBadgeKind.error:
        return AppColors.error;
      case StatusBadgeKind.info:
        return AppColors.info;
      case StatusBadgeKind.neutral:
        return AppColors.gray;
    }
  }

  String get _semanticLabel {
    switch (kind) {
      case StatusBadgeKind.ok:
        return 'Estado correcto: $label';
      case StatusBadgeKind.warning:
        return 'Advertencia: $label';
      case StatusBadgeKind.error:
        return 'Error: $label';
      case StatusBadgeKind.info:
        return 'Información: $label';
      case StatusBadgeKind.neutral:
        return 'Estado: $label';
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color();
    return Semantics(
      label: _semanticLabel,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.12),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 13, color: color),
              const SizedBox(width: 4),
            ],
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
