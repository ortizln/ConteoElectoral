# ARQUITECTURA DE SINCRONIZACIÓN — Conteo Electoral

**Versión:** 1.0  
**Fecha:** 2026-10-13  
**Estado:** Implementado

---

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                        MÓVIL FLUTTER                        │
│                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   UI     │───▶│ AppProvider  │───▶│   SyncService    │  │
│  └──────────┘    └──────┬───────┘    └────────┬─────────┘  │
│                         │                     │             │
│                  ┌──────▼───────┐    ┌────────▼─────────┐  │
│                  │  SQLite DB   │◀──▶│  Outbox Queue    │  │
│                  │  (v8 local)  │    │  (sync_queue)    │  │
│                  └──────────────┘    └──────────────────┘  │
│                                         │                   │
└─────────────────────────────────────────┼───────────────────┘
                                          │
                    ┌─────────────────────▼─────────────────────┐
                    │           HTTP Batch Push                 │
                    │   POST /api/sync/push                     │
                    │   { operations: [ {operationId, ...} ] }  │
                    └─────────────────────┬─────────────────────┘
                                          │
┌─────────────────────────────────────────▼───────────────────────┐
│                     BACKEND SPRING BOOT                         │
│                                                                 │
│  ┌─────────────────┐    ┌──────────────────────────────────┐   │
│  │ SyncController   │───▶│ SyncService                       │   │
│  │ @PreAuthorize    │    │                                    │   │
│  └─────────────────┘    │  1. Idempotency check (opId)      │   │
│                          │  2. Guard: mesa cerrada           │   │
│                          │  3. Guard: usuario asignado       │   │
│                          │  4. Process operation             │   │
│                          │  5. Audit log                     │   │
│                          │  6. Save to sync_operations_log   │   │
│                          └──────────────┬───────────────────┘   │
│                                         │                        │
│  ┌─────────────────┐    ┌──────────────▼───────────────────┐   │
│  │ STOMP Broker     │◀──│ WebSocket Push                    │   │
│  │ /topic/sync      │   │ (after successful push)           │   │
│  └─────────────────┘    └──────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PostgreSQL                           │   │
│  │  votos, mesas, candidatos, sync_operations_log          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Estados del Outbox (sync_queue)

| Estado | Descripción | Transiciones |
|--------|-------------|--------------|
| `PENDING` | Operación en cola, lista para enviar | → ACKNOWLEDGED, → FAILED |
| `FAILED` | Error en último intento (retry_count < max) | → PENDING (retry) |
| `ACKNOWLEDGED` | Servidor confirmó procesamiento | Estado final |

**Reglas:**
- `maxRetries = 5` — después de 5 fallos, se marca FAILED pero **no se purga**
- El usuario puede reintentar manualmente desde la UI de pendientes
- `retry_count` **no se resetea** en `markSyncFailed` (evita bucles infinitos)
- `cleanFailedSyncOps()` está **deshabilitado** — retención hasta confirmación del usuario

---

## Identificadores Únicos

### operationId (UUID)
- Generado en el dispositivo con `DateTime.now().millisecondsSinceEpoch` + hash
- Formato: `timestamp-rand1-rand2` (ej: `1760345678901-a3f2-b7c1`)
- Enviado en cada operación del batch
- Backend: constraint UNIQUE en `sync_operations_log.operation_id`
- Si se recibe duplicado, se retorna el resultado cacheado sin re-procesar

### IDs de Entidad
- **Local:** `AUTOINCREMENT` en SQLite (espacio local, positivo)
- **Servidor:** `BIGSERIAL` en PostgreSQL (espacio del servidor)
- **Colisión resuelta con:** `ConflictAlgorithm.ignore` en `guardarVotosSincronizados`
  - Votos locales pendientes **nunca se sobrescriben** con IDs del servidor

---

## Transacciones SQLite

| Método | Transacción | Protección |
|--------|-------------|------------|
| `guardarElecciones` | batch.commit | Atomicidad |
| `guardarMesas` | batch.commit + IGNORE | No sobrescribir pendientes |
| `guardarVotosSincronizados` | batch.commit + IGNORE | No destruir locales |
| `guardarSession` | delete + insert | Verificado en código |
| Migración v7 | `db.transaction()` | DROP TABLE seguro |

---

## Transacciones Backend (PostgreSQL)

```
processPush()                    @Transactional(NOT_SUPPORTED)
  └── processOperationWithIdempotency()   @Transactional(REQUIRES_NEW)
        ├── Check sync_operations_log for duplicate operationId
        ├── processOperation()            (same transaction)
        │     ├── Guard: mesa cerrada → MesaCerradaException
        │     ├── Guard: usuarioPerteneceAMesa
        │     ├── CRUD operation on votos/mesas
        │     └── auditoriaService.registrarAccion()
        └── Save to sync_operations_log
```

**Clave:** Cada operación se procesa en su propia transacción (`REQUIRES_NEW`). Si una falla, las demás se procesan igual. El batch completo **no se revierte** por un fallo individual.

---

## Pull Incremental

### Flujo actual
1. Móvil envía `GET /api/sync/pull?eleccionId=X&since=ISO_TIMESTAMP`
2. Backend retorna votos con `createdAt > since` + estado actual de mesas
3. Móvil aplica cambios con `_applyRemoteChange()`
4. **Cursor avanza SOLO si todos los cambios se aplicaron sin error**

### Cursor
- Guardado en `sync_meta.last_pull_at`
- **No avanza si hay fallo parcial** — evita pérdida de cambios
- Próximo pull re-intenta desde el mismo punto

---

## Seguridad

### HTTP Endpoints
```
POST /api/sync/push   @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN') or hasRole('SUPERVISOR')")
GET  /api/sync/pull   @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN') or hasRole('SUPERVISOR')")
```

### WebSocket (STOMP)
- **Conexión:** Requiere JWT válido en header `Authorization` del CONNECT frame
- **Interceptor:** `StompAuthInterceptor` valida token y setea `Authentication`
- **Suscripciones:** `/topic/sync`, `/topic/resultados/{eleccionId}`
- Sin JWT → conexión rechazada

### CORS
- `setAllowedOriginPatterns("*")` — permite orígenes LAN y dominio público
- Private Network Access header habilitado

---

## Network Security (Android)

`network_security_config.xml`:
- **Permitido HTTP en claro:** `192.168.1.43`, `10.0.2.2`, `localhost`, `127.0.0.1`
- **Resto:** HTTPS requerido
- `android:usesCleartextTraffic="true"` en manifest (compatibilidad)

---

## Migraciones

### SQLite (Flutter) — v8
```sql
-- sync_queue: columns added
ALTER TABLE sync_queue ADD COLUMN operation_id TEXT;
ALTER TABLE sync_queue ADD COLUMN last_attempt_at TEXT;
ALTER TABLE sync_queue ADD COLUMN ack_at TEXT;

-- sync_meta: cursor column
ALTER TABLE sync_meta ADD COLUMN server_cursor INTEGER DEFAULT 0;

-- Unique index on operation_id
CREATE UNIQUE INDEX idx_sync_queue_opid ON sync_queue(operation_id);
```

### PostgreSQL (Backend) — V1.8.0
```sql
-- Idempotency log table
CREATE TABLE sync_operations_log (
    id BIGSERIAL PRIMARY KEY,
    operation_id VARCHAR(100) NOT NULL UNIQUE,
    usuario_id BIGINT NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    action VARCHAR(20) NOT NULL,
    result_success BOOLEAN NOT NULL DEFAULT FALSE,
    result_error VARCHAR(500),
    server_entity_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Partial unique constraint on votos
ALTER TABLE votos ADD CONSTRAINT uk_voto_mesa_lista 
    UNIQUE (mesa_id, lista_id) WHERE lista_id IS NOT NULL AND candidato_id IS NULL;
```
