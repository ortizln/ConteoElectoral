import 'package:flutter/material.dart';
import '../models/models.dart';
import '../theme/app_theme.dart';

Future<void> showResumenMesaDialog(
  BuildContext context, {
  required Mesa mesa,
  required List<Voto> votos,
  required List<Candidato> candidatos,
  required int nulos,
  required int blanco,
}) {
  final porCandidato = <int, int>{};
  final porLista = <int, int>{};
  for (final v in votos) {
    if (v.candidatoId != null) {
      porCandidato.update(v.candidatoId!, (x) => x + v.cantidadVotos,
          ifAbsent: () => v.cantidadVotos);
    } else if (v.listaId != null) {
      porLista.update(v.listaId!, (x) => x + v.cantidadVotos,
          ifAbsent: () => v.cantidadVotos);
    }
  }

  final porId = <int, Candidato>{for (final c in candidatos) c.id: c};

  final items = <({String nombre, String sub, int votos, Color color})>[];
  for (final e in porCandidato.entries) {
    final c = porId[e.key];
    items.add((
      nombre: c?.nombreCompleto ?? 'Candidato #${e.key}',
      sub: c == null
          ? ''
          : '${c.partidoNombre}${c.cargoNombre != null ? ' · ${c.cargoNombre}' : ''}',
      votos: e.value,
      color: AppColors.primary,
    ));
  }
  for (final e in porLista.entries) {
    Candidato? ejemplo;
    for (final c in candidatos) {
      if (c.listaId == e.key) {
        ejemplo = c;
        break;
      }
    }
    items.add((
      nombre: ejemplo?.listaNombre ??
          'Lista ${ejemplo?.numeroLista ?? e.key}',
      sub: ejemplo?.partidoNombre ?? '',
      votos: e.value,
      color: AppColors.secondary,
    ));
  }
  items.sort((a, b) => b.votos.compareTo(a.votos));

  final filas = <Widget>[];
  int totalCandidatos = 0;
  for (final it in items) {
    if (it.votos <= 0) continue;
    totalCandidatos += it.votos;
    filas.add(_filaResumen(it.nombre, it.sub, it.votos, it.color));
  }

  final totalGeneral = totalCandidatos + nulos + blanco;

  return showDialog<void>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: Text('Resumen de la Mesa', style: AppTextStyles.h3),
      content: SizedBox(
        width: double.maxFinite,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Icon(Icons.how_to_vote_outlined,
                        color: AppColors.primary, size: 16),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Mesa ${mesa.numero}',
                            style:
                                const TextStyle(fontWeight: FontWeight.w600)),
                        if (mesa.institucionNombre != null)
                          Text(mesa.institucionNombre!,
                              style: AppTextStyles.bodySmall),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              if (filas.isEmpty)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Text('Sin votos a candidatos',
                      style: TextStyle(color: AppColors.gray)),
                )
              else
                ...filas,
              const SizedBox(height: 4),
              _filaResumen(
                  'Nulos', '', nulos, AppColors.error),
              _filaResumen('Blanco', '', blanco, AppColors.gray),
              const Divider(height: 24),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    _filaTotales('Candidatos y listas', totalCandidatos),
                    _filaTotales('Nulos', nulos),
                    _filaTotales('Blanco', blanco),
                    const Divider(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Total general',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 15)),
                        Text('$totalGeneral',
                            style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                                color: AppColors.primary)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      actions: [
        FilledButton(
          onPressed: () => Navigator.pop(ctx),
          child: const Text('Aceptar'),
        ),
      ],
    ),
  );
}

Widget _filaResumen(String nombre, String sub, int votos, Color color) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(nombre,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      fontWeight: FontWeight.w600, fontSize: 13)),
              if (sub.isNotEmpty)
                Text(sub,
                    overflow: TextOverflow.ellipsis,
                    style: AppTextStyles.bodySmall),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text('$votos',
              style: TextStyle(
                  fontWeight: FontWeight.bold, fontSize: 14, color: color)),
        ),
      ],
    ),
  );
}

Widget _filaTotales(String label, int valor) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 2),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label,
            style: TextStyle(fontSize: 13, color: AppColors.gray)),
        Text('$valor',
            style: const TextStyle(
                fontWeight: FontWeight.w600, fontSize: 13)),
      ],
    ),
  );
}
