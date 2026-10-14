# Sincronización Móvil ↔ Backend — Estado del Sistema

## Arquitectura General

La aplicación móvil funciona **offline-first**: los votos se registran localmente en SQLite y se sincronizan con el backend mediante una cola de salida (outbox pattern). La comunicación usa **HTTP REST** para el push/pull y **STOMP sobre WebSocket** para actualizaciones en tiempo real.

```
┌─────────────────────┐         POST /api/sync/push        ┌──────────────────┐
│                     │ ──────────────────────────────────► │                  │
│   App Móvil         │                                     │  Backend Spring  │
│   (Flutter + SQLite)│ ◄────────────────────────────────── │  Boot (8081)     │
│                     │   GET  /api/sync/pull               │                  │
│                     │ ◄────────────────────────────────── │                  │
│                     │   WS   /topic/sync                  │                  │
│                     │   WS   /topic/resultados/{id}       │  PostgreSQL      │
└─────────────────────┘                                     └──────────────────┘
```

---

## Conexión y Configuración del Servidor

| Parámetro | Valor actual |
|---|---|
| Backend URL (móvil) | `http://192.168.1.43:8081/api` |
| WebSocket | `ws://192.168.1.43:8081/ws` (deriva del strip `/api`) |
| Backend URL (frontend web) | `http://192.168.1.43:8081/api` |
| Base de datos | `jdbc:postgresql://192.168.1.43:5432/conteo_electoral` |
| Puerto backend | `8081` |
| Cloudflare Tunnel (producción) | `https://alan-tek.com/api` → nginx → `127.0.0.1:8081` |

**Normalización de URL** (`ServerUrl.normalizeApiUrl`):
- Agrega `http://` si falta el esquema
- Elimina barras finales
- Asegura que siempre termine en `/api` (una sola vez)

**WebSocket** se conecta a `ServerUrl.stripApiSuffix(serverUrl) + '/ws'` → ejemplo: `http://192.168.1.43:8081/ws`

---

## Cola de Sincronización Local (sync_queue)

Tabla SQLite `sync_queue` que almacena operaciones pendientes:

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT,
entity_type TEXT NOT NULL,        -- 'voto' | 'mesa'
entity_id INTEGER NOT NULL,
operation TEXT NOT NULL,          -- 'CREATE' | 'CERRAR' | 'NULOS' | 'BLANCO'
payload TEXT NOT NULL,            -- JSON con los datos
eleccion_id INTEGER,
status TEXT NOT NULL DEFAULT 'PENDING',   -- PENDING | FAILED
created_at TEXT NOT NULL,
retry_count INTEGER DEFAULT 0,
last_error TEXT
```

### Tipos de Operación

| entity_type | operation | Descripción | Payload | Dedupe |
|---|---|---|---|---|
| `voto` | `CREATE` | Registro de voto (candidato o lista) | `{candidatoId?, mesaId, cantidadVotos, eleccionesId, listaId?, fechaRegistro}` | Sí — sobrescribe si ya existe PENDING |
| `mesa` | `CERRAR` | Cierre de acta de mesa | `{id, cerrada: true}` | No — cada llamada inserta fila nueva |
| `mesa` | `NULOS` | Votos nulos de la mesa | `{votosNulos: N}` (valor absoluto) | Sí |
| `mesa` | `BLANCO` | Votos en blanco de la mesa | `{votosBlanco: N}` (valor absoluto) | Sí |

> **Clave**: los valores son **absolutos** (totales acumulados), no incrementos. Esto hace que el push sea **idempotente** — reintentar no duplica votos.

---

## Endpoints de Sincronización

### 1. Push — Enviar operaciones al backend

```
POST /api/sync/push
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "operations": [
    {
      "operationId": "op-1",
      "entity": "voto",
      "action": "CREATE",
      "entityId": 123,
      "data": {
        "mesaId": 45,
        "candidatoId": 67,
        "cantidadVotos": 150,
        "eleccionesId": 1,
        "listaId": null,
        "fechaRegistro": "2026-10-13T10:30:00"
      },
      "timestamp": "2026-10-13T10:30:00"
    },
    {
      "operationId": "op-2",
      "entity": "mesa",
      "action": "NULOS",
      "entityId": 45,
      "data": { "votosNulos": 12 }
    }
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "operationId": "op-1",
      "success": true,
      "serverId": 8901,
      "error": null
    }
  ]
}
```

**Efectos secundarios:**
- Publica respuesta completa en `/topic/sync` (broadcast)
- Publica `{tipo: "data-changed"}` en `/topic/resultados/{eleccionId}`

**Procesamiento en backend (`SyncService.processPush`):**

| Acción | Comportamiento |
|---|---|
| `voto/CREATE` (con `candidatoId`) | Upsert por (mesa, candidatoId). Si existe → **sobrescribe** `cantidadVotos`. Si no → crea nuevo registro |
| `voto/CREATE` (con `listaId`, sin candidatoId) | Upsert por (mesa, listaId). Mismo comportamiento de sobrescritura |
| `mesa/CERRAR` | `mesa.cerrada = true` |
| `mesa/NULOS` | `mesa.votosNulos = data.votosNulos` (sobrescribe) |
| `mesa/BLANCO` | `mesa.votosBlanco = data.votosBlanco` (sobrescribe) |

### 2. Pull — Obtener cambios del backend

```
GET /api/sync/pull?eleccionId={id}&since={timestamp}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "operations": [
    {
      "operationId": "srv-123",
      "entity": "voto",
      "action": "CREATE",
      "data": {
        "id": 123,
        "candidatoId": 67,
        "mesaId": 45,
        "cantidadVotos": 150,
        "eleccionesId": 1,
        "fechaRegistro": "2026-10-13T10:30:00"
      }
    },
    {
      "operationId": "mesa-45",
      "entity": "mesa",
      "action": "MESA_DATA",
      "data": {
        "id": 45,
        "votosNulos": 12,
        "votosBlanco": 8,
        "cerrada": false,
        "eleccionesId": 1
      }
    }
  ],
  "serverTimestamp": "2026-10-13T10:35:00"
}
```

**Filtrado:**
- **Votos**: solo los creados después de `since` (default: últimas 24h)
- **Mesas**: siempre se envían TODAS las mesas de la elección (sin filtro `since`)

### 3. Descarga Inicial / MVP — Datos de referencia

Usado por `descargarDatos()` al hacer login o actualizar datos:

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/auth/login` | Autenticación, obtiene JWT |
| `GET` | `/elecciones/activas` | Elecciones activas → primera es la actual |
| `GET` | `/partidos/eleccion/{eleccionId}` | Partidos de la elección |
| `GET` | `/cargos/eleccion/{eleccionId}` | Cargos (detecta tipo LISTA vs CANDIDATO) |
| `GET` | `/candidatos/eleccion/{eleccionId}` | Candidatos |
| `GET` | `/recintos/eleccion/{eleccionId}` | Recintos electorales |
| `GET` | `/mesas/usuario/actual/eleccion/{eleccionId}` | Mesas asignadas al usuario actual |
| `GET` | `/votos/mesa/{mesaId}` | Votos existentes del servidor por mesa |

---

## Endpoints REST Directos (no usados por el móvil)

El móvil **NO** usa estos endpoints para registrar votos — van por `/sync/push`. Existen para el frontend web y uso administrativo:

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/votos` | Registrar voto directo (acumula, no sobrescribe) |
| `PUT` | `/api/votos/{id}` | Actualizar voto |
| `DELETE` | `/api/votos/{id}` | Eliminar voto |
| `PUT` | `/api/mesas/{id}/votos-nulos` | Actualizar nulos |
| `PUT` | `/api/mesas/{id}/votos-blanco` | Actualizar blancos |
| `POST` | `/api/mesas/{id}/cerrar` | Cerrar mesa |
| `POST` | `/api/mesas/{id}/reabrir` | Reabrir mesa |
| `GET` | `/api/mesas/{id}/exportar-acta` | Exportar acta PDF |

> **Diferencia importante**: el endpoint REST **acumula** votos (`cantidadVotos + cantidad`), mientras que `/sync/push` **sobrescribe** (`cantidadVotos = cantidad`). No se deben mezclar ambos caminos.

---

## WebSocket / STOMP

**Endpoint de conexión**: `ws://{host}:8081/ws` (SockJS fallback disponible)

**Topics suscritos por el móvil:**

| Topic | Evento | Acción del móvil |
|---|---|---|
| `/topic/sync` | Resultado de push de sincronización | Llama `sincronizarVotos()` (push pendientes + pull cambios) |
| `/topic/resultados/{eleccionId}` | Datos de resultados actualizados | Llama `sincronizarVotos()` |

**Topics publicados por el backend:**

| Topic | Payload | Publicado por |
|---|---|---|
| `/topic/sync` | `SyncPushResponse` completo | `SyncController.push` |
| `/topic/resultados/{eleccionId}` | `{tipo: "data-changed"}` | `SyncController.push`, rutas de mesa |
| `/topic/resultados/{eleccionId}` | `DashboardResponse` completo | `VotoService` (vía REST directo) |
| `/topic/mesa-estado/{eleccionId}` | `{tipo, mesaId, cerrada}` | `MesaService.cerrarMesa` |

**Configuración**: `heartbeatOutgoing` e `heartbeatIncoming` cada 10s, `reconnectDelay` cada 5s.

---

## Flujo de Sincronización (sincronizarVotos)

```
1. Verificar conexión (isOnline) y que no haya sync en curso
2. retryFailedOps()          → FAILED → PENDING
3. processPush()             → Hasta 50 ops PENDING → POST /sync/push (1 HTTP por op)
4. pullChanges(eleccionId)   → GET /sync/pull → Aplicar cambios locales
5. recargarVotos()           → Recargar votos y totales desde SQLite
6. refreshSyncCounts()       → Actualizar contadores pendientes/failed
7. Programar retry (15s)     → Si quedan pendientes y hay conexión
```

**Disparadores de sincronización:**
- Registro de voto (online)
- Actualización de nulos/blanco
- Cierre de acta
- Recuperación de conectividad (offline → online)
- Mensaje STOMP en `/topic/sync` o `/topic/resultados/{id}`
- Reintento manual desde pantalla de pendientes
- Timer automático de 15s mientras haya pendientes

---

## Acumulación de Votos (Offline)

Los votos se acumulan en **dos niveles**:

### 1. SQLite local (`votos` table)
- Cada registro de voto busca la fila existente para `(mesa, candidato)` o `(mesa, lista)`
- Si existe → `cantidadVotos = cantidadVotos + cantidad` (suma)
- Si no existe → crea fila nueva
- Resultado: un **total acumulado por candidato/lista en cada mesa**

### 2. Cola de sincronización
- `enqueueVoto()` con dedupe: si ya hay un `voto/CREATE` PENDING para ese candidato, **sobrescribe el payload** con el valor más reciente
- El push envía el **total acumulado**, no incrementos individuales
- Backend recibe y hace upsert con **sobrescritura** → idempotente

### Ejemplo del flujo:
```
1. Usuario registra 1 voto para candidato A en mesa 5
   → SQLite: votos[mesa=5, candidato=A] = 1
   → Queue: voto/CREATE {candidatoId:A, mesaId:5, cantidadVotos:1}

2. Usuario registra otro voto para candidato A en mesa 5
   → SQLite: votos[mesa=5, candidato=A] = 2 (suma local)
   → Queue: voto/CREATE {candidatoId:A, mesaId:5, cantidadVotos:2} (sobrescribe payload)

3. Sync push envía cantidadVotos=2 al backend
   → Backend: votos[mesa=5, candidato=A] = 2 (sobrescribe)
```

---

## Nulos y Blancos

- **Almacenamiento**: en la tabla `mesas` (columnas `votos_nulos`, `votos_blanco`), NO en la tabla `votos`
- **Sincronización**: operaciones `mesa/NULOS` y `mesa/BLANCO` con valor absoluto
- **Pull**: el backend envía TODAS las mesas con sus nulos/blancos en cada pull (sin filtro `since`)
- **Exclusión de cálculo**: nulos y blancos NO se incluyen en `totalVotos` para porcentajes de candidatos

---

## Cierre de Mesa (Acta)

### Flujo móvil:
1. `cerrarActa()` → encola `mesa/CERRAR` en `sync_queue`
2. Marca `mesas.cerrada = 1` en SQLite (optimista, UI se bloquea inmediatamente)
3. Si online → sincroniza inmediatamente; si offline → espera en cola
4. Backend recibe `mesa/CERRAR` → `mesa.cerrada = true`

### Protecciones en backend (solo vía REST directa):
- `MesaCerradaException` si se intenta registrar voto en mesa cerrada
- Audit logging en operaciones REST
- El path de sync **NO** valida mesa cerrada (intencional para catch-up offline)

---

## Tablas SQLite Locales

| Tabla | Rol en Sincronización |
|---|---|
| `sync_queue` | Cola de operaciones pendientes/failed |
| `sync_meta` | Cursor de pull incremental (`last_pull_at`) |
| `votos` | Votos locales con flag `sincronizado` |
| `mesas` | Estado de mesa, nulos, blancos, cerrada |
| `session` | Token JWT para autenticación |
| `elecciones`, `partidos`, `cargos`, `candidatos`, `recintos` | Datos de referencia descargados |

---

## Estado Actual y Notas

- **Idempotencia**: todas las operaciones de sync usan valores absolutos → seguro reintentar
- **1 HTTP por operación**: un batch de 50 ops = 50 peticiones secuenciales POST
- **Retry**: máximo 5 reintentos por operación; operaciones fallidas >24h se purgan al iniciar
- **Sync bypass guards**: el path de sync no valida mesa cerrada ni asignación de usuario (diferente al REST directo)
- **Nodos pendientes de mejorar**: `sync_meta.last_sync_at` y `votos.sincronizado` no están integrados activamente; el contador de pendientes usa exclusivamente `sync_queue`
