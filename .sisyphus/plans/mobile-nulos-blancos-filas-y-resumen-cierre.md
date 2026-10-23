# Plan: Nulos/Blancos como filas + Resumen de cierre de acta (móvil)

**Proyecto:** `conteo_electoral_app`. Rama `feature/alantek-design-system`.
**Decisiones confirmadas del usuario:**
1. Semántica **Absoluta** para nulos/blancos (stepper prellenado con el valor actual, Guardar = fija valor).
2. Resumen: **Totales + desglose completo** (candidatos/listas con votos, nulos, blancos, total general).
3. Resumen **re-accesible**: botón "Ver resumen" en la pantalla de Mesa Cerrada.

## Cambios

### 1. `lib/widgets/resumen_mesa_dialog.dart` (nuevo)
- `showResumenMesaDialog(context, {mesa, votos, candidatos, nulos, blanco})` → AlertDialog scrollable.
- Desglose: por candidato (nombre, partido·cargo, votos, orden desc) + por lista (listaNombre·partido) + Nulos + Blanco; bloque de totales (candidatos/listas, nulos, blanco, **Total general**).
- Exportado desde `lib/widgets/widgets.dart`.

### 2. `lib/screens/votacion_screen.dart`
- **Eliminar** controles horizontales de Nulos/Blanco (fila entre tarjeta de mesa y lista) — incluye `_nulosCtrl`/`_blancoCtrl`, helpers `_nulosBlancoControl`/`_nulosBlancoBadge` (rama cerrada era código muerto: la pantalla cerrada hace return antes).
- **Agregar 2 filas al final de ambos ListView** (individual y listas: `itemCount + 2`): tarjetas "Votos Nulos"/"Votos en Blanco" con badge de valor y `onTap → _editarNulosBlanco`.
- **`_editarNulosBlanco(bool esNulos)`**: bottom sheet con stepper absoluto prellenado (− / campo / +), botón Guardar → `provider.actualizarNulos/actualizarBlanco(valor)` (lógica sync intacta), snackbar de confirmación.
- **`_cerrar()`**: tras `cerrarActa()` → snackbar + `showResumenMesaDialog` (recibo de cierre).
- **Pantalla Mesa Cerrada**: botón "Ver resumen" → mismo diálogo.

### 3. `lib/screens/home_screen.dart`
- Mesas cerradas dejan de ser `onTap: null` → abren la pantalla (lock + Ver resumen) para hacer el resumen re-accesible.

## NO se toca
- Sync (`sync_service.dart`), BD (`database_helper.dart`), `cerrarActa()`, semántica MESA_DATA absoluta de nulos/blancos, `registrarVoto`/`registrarVotosLista`.

## Verificación
- `flutter analyze` (baseline 47 issues), `flutter test` 11/11, prueba manual en Infinix cuando esté conectado.
