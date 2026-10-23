# Plan: UX móvil — descarga automática, config solo ADMIN, login limpio

**Modo:** Plan Mode. Ejecución solo tras aprobación.
**Proyecto:** `conteo_electoral_app` (Flutter). Rama `feature/alantek-design-system`.
**Relación:** existe plan aprobado en contenido `.sisyphus/plans/mobile-nulos-blancos-filas-y-resumen-cierre.md` (nulos/blancos como filas + resumen al cerrar). Este plan es el lote siguiente (o anterior, según orden que se decida). No tocan los mismos archivos de lógica (votacion_screen solo se toca en el otro plan; aquí NO se modifica).

## Objetivo (requerimientos del usuario)

1. **Quitar el botón "Descargar datos"** del Home (AppBar) — la descarga pasa a ser automática.
2. **Descarga automática al abrir la app**, solo cuando **no hay cambios pendientes de sincronizar** (outbox vacío).
3. **Configuración solo para ADMIN**: opción "Configuración" del drawer y opción "Configurar servidor" del login deben restringirse al rol ADMIN.
4. **Login sin URL de API**: no mostrar a qué API se conecta; solo dejar que esté "conectada" y ya (sin exponer la URL).

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `lib/screens/home_screen.dart` | Quitar `IconButton` Descargar datos (l.127-131); gate de "Configuración" en drawer por rol ADMIN; auto-descarga en `_autoLoad()` |
| `lib/screens/login_screen.dart` | Eliminar texto de `provider.serverUrl` bajo el logo (l.182-190); eliminar botón "Configurar servidor" + `_showServerConfig()` + `_serverController` (l.62-125, 302-309) |
| `lib/screens/configuracion_screen.dart` | Guard de seguridad: si `usuario?.rol != 'ADMIN'`, pantalla de acceso denegado (defensa en profundidad; la navegación ya no llega aquí, pero rutas nombradas podrían invocarse) |

**NO se toca:** `app_provider.dart` (salvo si se necesita un getter auxiliar — ver Fase 2), sync (`sync_service.dart`), `database_helper.dart`, lógica electoral, `votacion_screen.dart`.

## Fase 1 — Home: quitar botón descarga + auto-descarga segura

1. **Eliminar** el `IconButton` de `Icons.download_outlined` (home_screen.dart l.127-131). El `RefreshIndicator` pull-to-refresh (l.149-150) se **conserva** como vía manual alternativa.
2. **Auto-descarga en apertura** — modificar `_autoLoad()` (l.28-34):

```dart
Future<void> _autoLoad() async {
  final provider = context.read<AppProvider>();
  final hasPending = provider.pendingSyncCount + provider.failedSyncCount > 0;
  if (provider.eleccionActual == null || (!hasPending && provider.isOnline)) {
    await provider.descargarDatos();
  }
  if (mounted) _checkUpdateDialog();
}
```

Rationale:
- Si no hay elección cargada → descargar siempre (comportamiento actual).
- Si ya hay datos locales pero **no hay ops PENDING ni FAILED** y hay conexión → refrescar datos del servidor al abrir (lo pedido).
- Si hay pendientes/fallidos → **NO descargar** (prioridad: no arriesgar los votos locales sin enviar; el sync push los vaciará y el próximo arranque refresca). `descargarDatos()` solo limpia votos *sincronizados* por mesa, pero se aplica la regla conservadora del usuario.

Nota: tras un login nuevo, `login_screen.dart` ya llama `descargarDatos()` explícitamente (l.51) — se mantiene; el gate de pendientes solo aplica al arranque con sesión existente.

## Fase 2 — Configuración solo ADMIN

1. **Drawer** (home_screen.dart l.630-637): envolver el `ListTile` de "Configuración" en `if (provider.usuario?.rol == 'ADMIN')` — mismo patrón del bloque ADMINISTRACIÓN existente (l.638). Los usuarios no-ADMIN simplemente no ven la opción.
2. **Login** (login_screen.dart): eliminar el botón "Configurar servidor" (l.302-309), el diálogo `_showServerConfig()` (l.62-125) y el campo `_serverController`. Justificación: en login **aún no se conoce el rol**, por lo que no puede haber config allí que sea "solo ADMIN"; la única config accesible es la pantalla Configuración tras login como ADMIN. La URL por defecto (`https://alan-tek.com/api`) queda embebida en el build; para cambiarla en desarrollo se usa `flutter run` con config o `adb shell` de SharedPreferences.
3. **Defensa en profundidad** en `configuracion_screen.dart`: al inicio de `build()`, si `provider.usuario?.rol != 'ADMIN'`, renderizar pantalla "Acceso restringido" (icono + mensaje + botón volver) en lugar del contenido. Cubre el caso de rutas invocadas directamente.

## Fase 3 — Login limpio (sin URL)

1. **Eliminar** el `Consumer` que muestra `provider.serverUrl` bajo "Conteo Electoral" (login_screen.dart l.181-190).
2. No se agrega indicador de conexión en el login (interpretación de "solo que esté conectada y ya": sin detalles técnicos; si no hay conexión, el botón Ingresar mostrará el error de conexión existente en la tarjeta — l.249-269).
3. Eliminar import/uso residual de `serverUrl` en el login (verificar con analyze).

## Verificación

1. `flutter analyze` — sin errores nuevos (baseline: 47 infos preexistentes).
2. `flutter test` — 11/11.
3. Prueba manual en device/emulador (dispositivo Infinix serial `1088670455061442`, usar `-s`):
   - **ADMIN:** login admin → drawer muestra Configuración → pantalla abre normal.
   - **No-ADMIN** (ej. `ortizln`): drawer NO muestra Configuración; login NO muestra URL ni botón "Configurar servidor"; Home NO muestra botón de descarga.
   - **Auto-descarga:** abrir app con sesión y pendientes en 0 → spinner de carga y mesas/candidatos refrescados. Con ops PENDING en outbox (registrar voto offline simulado) → NO dispara descarga automática.
   - Pull-to-refresh en Home sigue funcionando.
4. No se modifica sync ni lógica electoral — verificar `git diff` limitado a los 3 archivos + este plan.

## Fuera de alcance

- Plan anterior (nulos/blancos como filas + resumen de cierre en votacion) — se ejecuta como lote aparte; **no toca** los mismos archivos de este plan (solo `votacion_screen.dart` + `widgets.dart` + provider).
- Commit: solo si el usuario lo pide al final (incluye también el fix de `database_helper.dart`/`sync_service.dart` que sigue sin commitear).

## Orden de ejecución propuesto

1. Este plan (UX config/descarga/login) — 3 archivos pequeños, bajo riesgo.
2. Plan nulos/blancos + resumen de cierre — pantallas de votación.

¿Aprueba este plan y este orden, o prefiere invertirlo / combinar en un solo pase?
