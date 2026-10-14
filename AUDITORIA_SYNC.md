# AUDITORÍA DE SINCRONIZACIÓN — Conteo Electoral

**Fecha:** 2026-10-13  
**Alcance:** Flutter (SQLite + outbox), Spring Boot (SyncController/SyncService), WebSocket/STOMP, infraestructura  
**Estado:** Fase 0 — Auditoría completa

---

## Topología Verificada

| Componente | Configuración actual |
|---|---|
| API LAN | `http://192.168.1.43:8081/api` |
| WebSocket LAN | `ws://192.168.1.43:8081/ws` |
| API pública | `https://alan-tek.com/api` → Cloudflare Tunnel → Nginx → Spring Boot |
| Backend | Spring Boot, puerto 8081, CORS `*` |
| BD | PostgreSQL `conteo_electoral` en `192.168.1.43:5432` |
| Móvil | Flutter, SQLite local (`conteo_electoral.db` v7), offline-first |
| LAN y dominio | **Mismo backend y BD** (diseño A confirmado) |

---

## Hallazgos Críticos

### Flutter — Riesgo de Pérdida de Datos

| # | Severidad | Archivo | Problema |
|---|---|---|---|
| F1 | **CRÍTICO** | `database_helper.dart:695` | `guardarVotosSincronizados` usa `INSERT OR REPLACE` con IDs del servidor en el espacio AUTOINCREMENT local — **destruye votos locales pendientes** por colisión de ID durante `descargarDatos()` |
| F2 | **CRÍTICO** | `sync_service.dart:218-220` | `voto/DELETE` remoto ejecuta `eliminarVoto(id)` sin verificar `sincronizado` — puede borrar un **voto local pendiente** |
| F3 | **CRÍTICO** | `sync_service.dart:206` | `setLastPullTimestamp(now)` se ejecuta aunque `_applyRemoteChange` falle (errores silenciados en L203) — los cambios fallidos se **pierden permanentemente** |
| F4 | **ALTO** | `database_helper.dart:881` | `cleanFailedSyncOps` purga operaciones FALLIDAS >24h **silenciosamente al iniciar** — pérdida lenta de votos |
| F5 | **ALTO** | `database_helper.dart:803` | `markSyncDone` **borra físicamente** la fila — sin historial de qué se envió |
| F6 | **ALTO** | `database_helper.dart:812` | `markSyncFailed` resetea `retry_count=0` — anula el `maxRetries=5`, causando **bucle de reintentos infinito** hasta la purga de 24h |
| F7 | **ALTO** | `database_helper.dart:506` | `guardarMesas` con `REPLACE` sobrescribe `cerrada`/`votosNulos`/`votosBlanco` — **revierte** cambios locales no sincronizados |
| F8 | **ALTO** | `database_helper.dart:238-259` | Migración v7 con `DROP TABLE votos` **sin transacción** — crash destruye la tabla completa |
| F9 | **MEDIO** | `app_provider.dart:236-300` | `descargarDatos()` sin guard `_isSyncing` y sin transacción — puede intercalarse con push/pull en vuelo |
| F10 | **MEDIO** | `sync_service.dart:112-174` | **1 HTTP por operación** — 50 votos = 50 peticiones secuenciales |
| F11 | **MEDIO** | `app_provider.dart:432` | Triggers de sync que llegan durante un sync activo se **descartan** (no se encolan) |
| F12 | **MEDIO** | `sync_service.dart:227-231` | `MESA_DATA` con keys faltantes pone `votosNulos`/`votosBlanco` en **0** |
| F13 | **MEDIO** | `AndroidManifest.xml` | Sin `network_security_config.xml` — HTTP en claro **bloqueado por defecto en Android 9+** |
| F14 | **BAJO** | `pendientes_screen.dart:243` | Usuario puede borrar una operación de la cola — voto queda **huérfano** |
| F15 | **BAJO** | `database_helper.dart:733` | `guardarSession` delete+insert **sin transacción** |
| F16 | **BAJO** | `app_config.dart:17-22` | `production` = `local` (IP LAN hardcoded) — build release incluiría dirección de desarrollo |

### Spring Backend — Seguridad e Idempotencia

| # | Severidad | Archivo | Problema |
|---|---|---|---|
| B1 | **CRÍTICO** | `SyncController.java:23-47` | `/api/sync/push` sin `@PreAuthorize` — **cualquier usuario autenticado** puede cerrar mesas, escribir/borrar votos |
| B2 | **CRÍTICO** | `SyncService.java:63-203` | Sync **omite**: check mesa cerrada, asignación de usuario, audit logging — todo lo que `/api/votos` sí valida |
| B3 | **CRÍTICO** | `SyncService.java` | **Sin idempotencia por operationId** — sin tabla de dedupe, sin constraint unique, sin tracking |
| B4 | **CRÍTICO** | `backend/src` | **Cero control de concurrencia** — sin `@Version`, sin `@Lock`, sin `FOR UPDATE` |
| B5 | **ALTO** | `V1.6.0`/`V1.7.0` | **Sin unique constraint en `(mesa_id, lista_id)`** — CREATEs concurrentes de lista duplican votos |
| B6 | **ALTO** | `SyncService.java:28-45` | **Una transacción para todo el batch** — fallo en commit revierte todo, resultados `success=true` son poco confiables |
| B7 | **ALTO** | `WebSocketConfig.java` | `/ws` es `permitAll` **sin STOMP auth interceptor** — cualquiera recibe resultados electorales en tiempo real |
| B8 | **ALTO** | `SyncService.java:212-271` | Pull es **snapshot con filtro de timestamp** — actualizaciones invisibles, deletes nunca propagados, mesas reenviadas completas |
| B9 | **MEDIO** | `SyncService.java:173-179` | `mesa/CERRAR` sin guard "ya cerrada" y sin check de rol |
| B10 | **MEDIO** | `SyncService.java:138-159` | `voto/UPDATE` y `DELETE` aceptan **cualquier entityId** sin ownership/election scoping |
| B11 | **MEDIO** | `SyncService.java:217-223` | `since` malformado → fallback silencioso a 24h; sin manejo de timezone |

---

## Operaciones Destructivas Detectadas

### Flutter — Puntos donde se borran datos

| Método | Línea | Qué borra | Protegido |
|---|---|---|---|
| `markSyncDone` | `database_helper.dart:803` | Fila de `sync_queue` | No — borrado físico |
| `cleanFailedSyncOps` | `database_helper.dart:881` | `sync_queue` FAILED >24h | No — purga silenciosa |
| `limpiarVotosSincronizadosByMesa` | `database_helper.dart:701` | `votos` WHERE `sincronizado=1` | Parcial — protege pendientes, pero colisión ID con REPLACE |
| `eliminarVoto` | `database_helper.dart:706` | `votos` por ID | No — puede borrar pendiente por colisión |
| `guardarVotosSincronizados` | `database_helper.dart:695` | `votos` con `REPLACE` | **NO** — destruye pendientes por colisión ID |
| `guardarMesas` | `database_helper.dart:506` | `mesas` con `REPLACE` | **NO** — sobrescribe estado pendiente |
| `limpiarSession` | `database_helper.dart:757` | `session` | Sí — logout explícito |
| `deleteSyncOp` | `app_provider.dart:524` | `sync_queue` por ID | UI tiene confirm, pero voto queda huérfano |
| Migración v7 | `database_helper.dart:257` | `DROP TABLE votos` | **NO** — sin transacción |

### Backend — Puntos donde se sobrescriben datos

| Operación | Línea | Qué hace | Guards |
|---|---|---|---|
| `voto/CREATE` (lista) | `SyncService.java:83` | Sobrescribe `cantidadVotos` | Solo existencia mesa/eleccion |
| `voto/CREATE` (candidato) | `SyncService.java:116` | Sobrescribe `cantidadVotos` | Solo existencia |
| `voto/UPDATE` | `SyncService.java:142` | Sobrescribe `cantidadVotos` | **Ninguno** |
| `voto/DELETE` | `SyncService.java:155` | `deleteById` | **Ninguno** |
| `mesa/CERRAR` | `SyncService.java:174` | `cerrada=true` | **Ninguno** |
| `mesa/NULOS` | `SyncService.java:183` | Sobrescribe `votosNulos` | **Ninguno** |
| `mesa/BLANCO` | `SyncService.java:192` | Sobrescribe `votosBlanco` | **Ninguno** |

---

## Comparativa de Guards: REST vs Sync

| Guard | `/api/votos` (REST) | `/api/sync/push` |
|---|---|---|
| `@PreAuthorize` rol | ✅ MIEMBRO_MESA, ADMIN | ❌ Cualquier autenticado |
| Mesa cerrada | ✅ `MesaCerradaException` | ❌ Sin check |
| Asignación usuario | ✅ `usuarioPerteneceAMesa` | ❌ Sin check |
| Audit logging | ✅ `auditoriaService` | ❌ Sin audit |
| Scoping elección | ✅ Validado | ❌ `entityId` arbitrario |
| Input validation | ✅ `@Valid` | ❌ Sin constraints |

---

## Modelo de Concurrencia Actual

- **Sin `@Version`** en ninguna entidad
- **Sin `@Lock` / `FOR UPDATE`** en ningún query
- **Sin unique constraint** en `(mesa_id, lista_id)` para votos de lista
- **Sin operationId dedup** en backend
- **Last-writer-wins** en todas las operaciones de sync
- **Sin cursor monotónico** — pull usa timestamp del cliente

---

## Decisión de Modelo de Votos (Pendiente)

**Opción A — Una terminal escritora por mesa:** Validación de exclusividad + optimistic locking (`baseVersion`). Adecuada solo si la regla operativa garantiza exclusividad real.

**Opción B — Varias terminales por mesa:** Eventos de incremento con UUID único, totales consolidados en servidor. Requiere migración y conciliación del estado previo.

**Situación actual:** sin mecanismo de control — el sistema funciona porque en la práctica hay un solo escritor por mesa, pero **no está garantizado**.

---

## Estado de Infraestructura

| Aspecto | Estado | Riesgo |
|---|---|---|
| Nginx `/api/` → `127.0.0.1:8081` | ✅ Configurado | Verificar `proxy_read_timeout` para uploads grandes |
| Cloudflare Tunnel | ✅ Activo | FortiGuard bloquea desde red local del usuario |
| WebSocket `/ws` | ⚠️ `permitAll` | Sin autenticación STOMP — resultados expuestos |
| `network_security_config.xml` | ❌ No existe | HTTP bloqueado en Android 9+ |
| iOS ATS | ❌ No existe directorio `ios/` | Target iOS no configurado |
| PostgreSQL expuesto | ✅ Solo LAN `5432` | Correcto — no publicar |
| Firewall 8081 | ⚠️ Verificar | Debería restringir acceso |

---

## Próximos Pasos (Fase 1+)

1. **Decisión del usuario**: Modelo de votos (A o B), purga de fallidos, batch push
2. **Outbox seguro**: UUID, estados nuevos, transacciones, sin purga
3. **Backend idempotencia**: Tabla de operaciones, ACK persistente
4. **Push batch**: 1 HTTP por lote, ACK individual
5. **Pull incremental**: Cursor, change log, merge seguro
6. **Guards en sync**: mesa cerrada, asignación, audit
7. **STOMP auth**: Interceptor, no broadcast global
8. **Network security**: `network_security_config.xml` para LAN HTTP
