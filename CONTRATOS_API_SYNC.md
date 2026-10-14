# CONTRATOS API DE SINCRONIZACIÓN — Conteo Electoral

**Versión:** 1.0  
**Fecha:** 2026-10-13  
**Base URL:** `https://alan-tek.com/api` (público) / `http://192.168.1.43:8081/api` (LAN)

---

## Autenticación

Todos los endpoints requieren header:
```
Authorization: Bearer <JWT_TOKEN>
```

Roles aceptados: `MIEMBRO_MESA`, `ADMIN`, `SUPERVISOR`

---

## POST /sync/push

Envía un batch de operaciones de sincronización.

### Request
```json
{
  "operations": [
    {
      "operationId": "1760345678901-a3f2-b7c1",
      "entity": "voto",
      "entityId": 0,
      "action": "CREATE",
      "data": {
        "mesaId": 45,
        "candidatoId": 123,
        "listaId": 7,
        "cantidadVotos": 42,
        "eleccionesId": 1,
        "fechaRegistro": "2026-10-13T14:30:00.000"
      }
    },
    {
      "operationId": "1760345678902-c4d5-e6f7",
      "entity": "mesa",
      "entityId": 45,
      "action": "CERRAR",
      "data": {
        "id": 45,
        "cerrada": true
      }
    }
  ]
}
```

### Campos de operación

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `operationId` | string | Sí | UUID único — idempotencia |
| `entity` | string | Sí | `voto` \| `mesa` |
| `entityId` | long | No | ID de entidad (para UPDATE/DELETE) |
| `action` | string | Sí | Ver acciones válidas abajo |
| `data` | object | Sí | Payload de la operación |

### Acciones válidas

| Entity | Action | Data requerido |
|--------|--------|----------------|
| `voto` | `CREATE` | `mesaId`, `cantidadVotos`, (`candidatoId` \| `listaId`), `eleccionesId` |
| `voto` | `UPDATE` | `cantidadVotos`, `listaId` (opcional) |
| `voto` | `DELETE` | — (usa `entityId`) |
| `mesa` | `CERRAR` | `id`, `cerrada: true` |
| `mesa` | `NULOS` | `votosNulos` |
| `mesa` | `BLANCO` | `votosBlanco` |

### Response 200
```json
{
  "results": [
    {
      "operationId": "1760345678901-a3f2-b7c1",
      "success": true,
      "serverId": 890,
      "error": null
    },
    {
      "operationId": "1760345678902-c4d5-e6f7",
      "success": false,
      "serverId": null,
      "error": "Usuario no asignado a la mesa 45"
    }
  ]
}
```

### Campos de resultado

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `operationId` | string | Eco del ID enviado |
| `success` | boolean | `true` si se procesó correctamente |
| `serverId` | long | ID del servidor (para CREATE) |
| `error` | string | Mensaje de error si `success=false` |

### Errores posibles

| HTTP | Condición |
|------|-----------|
| 401 | Token inválido/expirado |
| 403 | Rol insuficiente |
| 200 + success=false | Operación rechazada (mesa cerrada, no asignado, datos inválidos) |

### Idempotencia
- Si `operationId` ya fue procesado, se retorna resultado cacheado
- No se re-procesa la operación
- El cliente puede reenviar el mismo batch sin riesgo de duplicación

---

## GET /sync/pull

Obtiene cambios desde el servidor.

### Query Parameters

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `eleccionId` | long | Sí | ID de la elección |
| `since` | string | No | ISO timestamp — cambios posteriores a esta fecha |

### Response 200
```json
{
  "operations": [
    {
      "operationId": "srv-890",
      "entity": "voto",
      "action": "CREATE",
      "entityId": 890,
      "data": {
        "id": 890,
        "candidatoId": 123,
        "mesaId": 45,
        "cantidadVotos": 42,
        "eleccionesId": 1,
        "listaId": 7,
        "fechaRegistro": "2026-10-13T14:30:00"
      },
      "timestamp": "2026-10-13T14:30:00"
    },
    {
      "operationId": "mesa-45",
      "entity": "mesa",
      "action": "MESA_DATA",
      "entityId": 45,
      "data": {
        "id": 45,
        "votosNulos": 3,
        "votosBlanco": 1,
        "cerrada": false,
        "eleccionesId": 1
      },
      "timestamp": "2026-10-13T14:31:00"
    }
  ],
  "serverTimestamp": "2026-10-13T14:31:00.123"
}
```

### Campos de operación pull

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `operationId` | string | ID único del servidor |
| `entity` | string | `voto` \| `mesa` |
| `action` | string | `CREATE` \| `UPDATE` \| `DELETE` \| `MESA_DATA` |
| `entityId` | long | ID de la entidad |
| `data` | object | Estado actual de la entidad |
| `timestamp` | string | ISO timestamp del cambio |

---

## WebSocket (STOMP)

### Conexión
```
ws://192.168.1.43:8081/ws  (LAN)
wss://alan-tek.com/ws       (público — requiere proxy nginx)
```

**Header requerido en CONNECT:**
```
Authorization: Bearer <JWT_TOKEN>
```

### Suscripciones

| Destino | Trigger | Payload |
|---------|---------|---------|
| `/topic/sync` | Push exitoso desde cualquier dispositivo | `SyncPushResponse` completo |
| `/topic/resultados/{eleccionId}` | Voto creado/modificado | `{"tipo": "data-changed"}` |

### Ejemplo de frames

**CONNECT:**
```
CONNECT
accept-version:1.2,1.1,1.0
heart-beat:10000,10000
Authorization:Bearer eyJhbGciOiJIUzI1NiIs...

^@
```

**SUBSCRIBE:**
```
SUBSCRIBE
id:sub-1
destination:/topic/sync

^@
```

---

## Endpoints Relacionados

### POST /votos (REST — para comparación con sync)

Mismos guards que sync:
- `@PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN')")`
- Mesa cerrada → `MesaCerradaException`
- Asignación usuario → `usuarioPerteneceAMesa()`
- Audit logging automático

### GET /mesas/current-user

Retorna mesas asignadas al usuario autenticado. Usado por `descargarDatos()`.

---

## Ejemplo de Flujo Completo

### 1. Login
```
POST /auth/login
{ "username": "miembro1", "password": "..." }
→ { "token": "eyJ...", "usuario": {...} }
```

### 2. Descarga inicial
```
GET /mesas/current-user
→ [{ "id": 45, "numero": "12", ... }]

GET /partidos/by-eleccion/1
GET /candidatos/by-eleccion/1
GET /recintos/by-eleccion/1
```

### 3. Registro de voto (offline-first)
```dart
// Local: guardar en SQLite
db.guardarVoto(voto);  // sincronizado=0
db.enqueueSync('voto', voto.id, 'CREATE', voto.toJson());

// Cuando hay red: processPush()
POST /sync/push
{
  "operations": [{
    "operationId": "1760345678901-a3f2-b7c1",
    "entity": "voto",
    "action": "CREATE",
    "data": {...}
  }]
}
← { "results": [{ "operationId": "...", "success": true, "serverId": 890 }] }

// Local: marcar como sincronizado
db.markSyncDone(id);  // status = ACKNOWLEDGED
db.marcarVotoSincronizado(votoId);
```

### 4. Recepción de cambios remotos
```
GET /sync/pull?eleccionId=1&since=2026-10-13T10:00:00
← { "operations": [...], "serverTimestamp": "..." }

// Aplicar cambios localmente
// Solo avanzar cursor si todos se aplicaron sin error
```

### 5. Notificación en tiempo real
```
WS: CONNECT con JWT
WS: SUBSCRIBE /topic/sync
WS: ← frame de SyncPushResponse cuando otro dispositivo sincroniza
WS: → trigger pullChanges()
```
