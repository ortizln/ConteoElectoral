# RUNBOOK DE SINCRONIZACIÓN — Conteo Electoral

**Versión:** 1.0  
**Fecha:** 2026-10-13

---

## 1. Despliegue

### 1.1 Backend (Spring Boot)

**Prerrequisitos:**
- JDK 21
- PostgreSQL 14+ corriendo en `192.168.1.43:5432`
- Base de datos `conteo_electoral` creada

**Pasos:**
```bash
cd backend

# 1. Aplicar migraciones (Flyway automático al iniciar)
mvn clean package -DskipTests

# 2. Verificar migraciones pendientes
mvn flyway:info

# 3. Iniciar
java -jar target/*.jar --spring.profiles.active=production
```

**Verificación:**
```bash
# Health check
curl http://192.168.1.43:8081/actuator/health

# Sync push (requiere token)
curl -X POST http://192.168.1.43:8081/api/sync/push \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"operations":[]}'
```

### 1.2 Migraciones de Base de Datos

**PostgreSQL (automático con Flyway):**
- `V1.8.0__sync_idempotency.sql` — tabla `sync_operations_log` + constraint único

**Verificar migraciones aplicadas:**
```sql
SELECT version, description, success 
FROM flyway_schema_history 
ORDER BY installed_rank DESC 
LIMIT 5;
```

**SQLite Flutter (automático en app):**
- v7 → v8: agrega `operation_id`, `last_attempt_at`, `ack_at`, `server_cursor`
- Ejecuta al iniciar la app en dispositivo actualizado

### 1.3 Móvil (Flutter)

**Compilar APK:**
```bash
cd conteo_electoral_app

# Requiere JDK 21 (configurado en gradle.properties)
flutter clean
flutter pub get
flutter build apk --release
```

**Instalar:**
```bash
adb install -r build/app/outputs/flutter-apk/app-release.apk
```

---

## 2. Configuración de Red

### 2.1 Nginx (proxy reverso)

**Configuración requerida:**
```nginx
location /api/ {
    client_max_body_size 250m;
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Timeouts para sync batch grande
    proxy_read_timeout 600s;
    proxy_send_timeout 600s;
    proxy_request_buffering off;
}

# WebSocket para STOMP
location /ws {
    proxy_pass http://127.0.0.1:8081;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400;
}
```

**Aplicar cambios:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 2.2 Cloudflare Tunnel

**Verificar tunnel activo:**
```bash
# En el servidor
sudo cloudflared tunnel list
sudo systemctl status cloudflared
```

**Purgar caché Cloudflare (si hay problemas):**
```bash
# Via dashboard o API
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -d '{"purge_everything":true}'
```

### 2.3 Android Network Security

**Archivo:** `android/app/src/main/res/xml/network_security_config.xml`

Permitido HTTP en claro solo para:
- `192.168.1.43` (LAN servidor)
- `10.0.2.2` (emulador → host)
- `localhost`, `127.0.0.1`

---

## 3. Operación

### 3.1 Flujo de Sincronización

**Push (envío de votos):**
1. Móvil detecta red disponible
2. `SyncService.processPush()` carga hasta 50 ops de `sync_queue`
3. Envía batch a `POST /api/sync/push`
4. Backend procesa cada op con idempotencia
5. Respuesta incluye `results[]` con ACK individual
6. Móvil marca ops como `ACKNOWLEDGED`

**Pull (recepción de cambios):**
1. Móvil envía `GET /api/sync/pull?eleccionId=X&since=<timestamp>`
2. Backend retorna votos modificados + estado de mesas
3. Móvil aplica cambios con `_applyRemoteChange()`
4. Cursor avanza SOLO si todos los cambios se aplicaron sin error

**Notificación en tiempo real:**
1. Backend hace push a `/topic/sync` después de sync exitoso
2. Móvil recibe notificación via STOMP
3. Móvil dispara `pullChanges()` para obtener datos actualizados

### 3.2 Monitoreo

**Verificar estado de sync:**
```sql
-- Operaciones pendientes
SELECT status, COUNT(*) 
FROM sync_queue 
GROUP BY status;

-- Últimos errores
SELECT operation_id, entity_type, action, last_error, created_at
FROM sync_queue 
WHERE status = 'FAILED'
ORDER BY created_at DESC 
LIMIT 10;

-- Log de idempotencia
SELECT COUNT(*) as total, 
       COUNT(*) FILTER (WHERE result_success) as exitosas
FROM sync_operations_log
WHERE created_at > NOW() - INTERVAL '1 hour';
```

**Logs backend:**
```bash
# Errores de sync
tail -f logs/application.log | grep -E "sync|SyncService|operationId"

# Auditoría
tail -f logs/application.log | grep "registrarAccion"
```

### 3.3 Métricas Clave

| Métrica | Umbral | Acción |
|---------|--------|--------|
| Operaciones PENDING > 100 | Alerta | Verificar conectividad |
| Operaciones FAILED > 10 | Crítico | Revisar logs backend |
| Tiempo push > 5s | Alerta | Revisar carga servidor |
| Errores idempotencia | Info | Log normal (reintentos) |

---

## 4. Troubleshooting

### 4.1 Push falla con 401

**Causa:** Token JWT expirado  
**Solución:**
1. Verificar fecha/hora del dispositivo
2. Re-login en la app
3. Verificar `JwtService` config en backend

### 4.2 Push falla con 403

**Causa:** Rol insuficiente o usuario no asignado  
**Solución:**
1. Verificar rol en tabla `usuarios` → `roles`
2. Verificar asignación en `mesa_usuarios`
3. Log backend muestra "Usuario no asignado a la mesa X"

### 4.3 Operaciones stuck en PENDING

**Causa:** Error de red o servidor caído  
**Solución:**
```sql
-- Reset manual (solo si se confirma que no se procesaron)
UPDATE sync_queue 
SET status = 'PENDING', retry_count = 0, last_error = NULL
WHERE status = 'FAILED' AND created_at > '2026-10-13';
```

O desde la app: botón "Reintentar fallidas" en pantalla de pendientes.

### 4.4 Duplicados en base de datos

**Causa:** Procesamiento anterior sin idempotencia  
**Solución:**
```sql
-- Detectar duplicados
SELECT mesa_id, lista_id, candidato_id, COUNT(*)
FROM votos
GROUP BY mesa_id, lista_id, candidato_id
HAVING COUNT(*) > 1;

-- Consolidar (mantener el más reciente)
DELETE FROM votos a USING votos b
WHERE a.mesa_id = b.mesa_id
  AND a.lista_id = b.lista_id
  AND a.candidato_id = b.candidato_id
  AND a.id < b.id;
```

### 4.5 WebSocket no conecta

**Causa:** Proxy nginx no configurado para `/ws` o JWT inválido  
**Solución:**
1. Verificar config nginx (sección 2.1)
2. Verificar header `Authorization` en CONNECT frame
3. Logs backend: "WebSocket STOMP authentication failed"

### 4.6 Migración SQLite falla

**Causa:** Base de datos corrupta o versión inconsistente  
**Solución:**
```bash
# Backup
adb shell
cd /data/data/com.example.conteo_electoral/databases
cp conteo_electoral.db conteo_electoral.db.backup

# Forzar re-migración (solo desarrollo)
adb shell pm clear com.example.conteo_electoral
```

---

## 5. Rollback

### 5.1 Backend

```bash
# Detener servicio
sudo systemctl stop conteo-electoral

# Restaurar JAR anterior
sudo cp /backup/conteo-electoral-<version-anterior>.jar /opt/conteo-electoral/

# Restaurar migración (si es necesario)
psql -U postgres -d conteo_electoral -c "DROP TABLE IF EXISTS sync_operations_log;"

# Iniciar
sudo systemctl start conteo-electoral
```

### 5.2 Móvil

```bash
# Instalar versión anterior
adb install -r /backup/app-release-anterior.apk

# Datos locales se preservan (no se hace clear)
```

---

## 6. Checklist de Validación Post-Deploy

- [ ] Backend compila sin errores: `mvn compile`
- [ ] Flutter compila sin errores: `flutter analyze`
- [ ] Migración PostgreSQL aplicada: `SELECT * FROM flyway_schema_history`
- [ ] Migración SQLite aplicada (app abre sin crash)
- [ ] Push funciona: registrar voto → verificar en BD
- [ ] Pull funciona: modificar en BD → verificar en app
- [ ] Idempotencia: reenviar mismo batch → sin duplicados
- [ ] Guards activos: intentar voto en mesa ajena → rechazado
- [ ] Audit logging: verificar registros en tabla `auditoria`
- [ ] WebSocket: verificar conexión con JWT
- [ ] STOMP: verificar recepción de notificaciones
