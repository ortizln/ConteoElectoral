# 17 — CHECKLISTS

> Checklists para verificar la completitud y calidad de cada módulo del ERP Electoral.

---

## 1. CHECKLIST GENERAL DE MÓDULO

### Arquitectura
- [ ] Sigue Clean Architecture (capas separadas)
- [ ] Sigue principios SOLID
- [ ] No hay dependencias circulares
- [ ] Los módulos están desacoplados
- [ ] Patrones consistentes con el resto del proyecto

### Base de Datos
- [ ] Migración Flyway creada (o planificada)
- [ ] Tablas con nombres snake_case plural
- [ ] Columnas con nombres snake_case singular
- [ ] PK definida (BIGSERIAL)
- [ ] FK con constraint nombrado
- [ ] Índices creados para columnas de filtro
- [ ] Columna created_at/updated_at incluidas
- [ ] Sin columnas nullable innecesarias
- [ ] Valores default correctos
- [ ] Backward compatible (no elimina tablas/columnas)

### Backend
- [ ] Entidad JPA con anotaciones correctas
- [ ] Repository con Spring Data JPA
- [ ] Service con @Transactional
- [ ] Controller con @RestController y @RequestMapping
- [ ] DTO Request con validaciones (@NotBlank, @NotNull, etc.)
- [ ] DTO Response sin datos sensibles
- [ ] Mapeo Entity ↔ DTO correcto
- [ ] Auditoría en métodos de escritura
- [ ] Excepciones personalizadas lanzadas correctamente
- [ ] GlobalExceptionHandler cubre los errores
- [ ] @PreAuthorize configurado según roles
- [ ] Endpoints con paginación (Pageable + Page)
- [ ] Exportación PDF/Excel implementada (si aplica)
- [ ] Códigos HTTP correctos (200, 201, 204, 400, 404, 500)
- [ ] Logging agregado (info en operaciones, warn en errores)
- [ ] Sin N+1 queries (JOIN FETCH verificado)
- [ ] Sin código duplicado

### Frontend (Angular)
- [ ] Componente standalone (sin NgModule)
- [ ] Ruta configurada con lazy loading
- [ ] Guard de autenticación y rol
- [ ] Formulario reactivo con validaciones
- [ ] Tabla responsive con trackBy
- [ ] Paginación funcionando
- [ ] Búsqueda/filtros implementados
- [ ] Modal para crear/editar
- [ ] Confirmación antes de eliminar
- [ ] Estados: loading, empty, error
- [ ] Exportación (PDF/Excel) si aplica
- [ ] Toast/notificaciones después de acciones
- [ ] Errores mostrados en lenguaje humano
- [ ] OnPush change detection
- [ ] Desuscripción de observables
- [ ] Sidebar actualizado si es nuevo módulo

### Flutter
- [ ] Modelo creado (fromJson/toJson + fromMap/toMap)
- [ ] Tabla SQLite creada con migración
- [ ] ApiService con endpoints
- [ ] DatabaseHelper con métodos save/get
- [ ] Provider actualizado (descargarDatos)
- [ ] Pantalla creada con Material 3
- [ ] Estados: loading, empty, error
- [ ] Offline-first: SQLite local primero
- [ ] Sincronización de datos pendientes
- [ ] Pull-to-refresh en listados
- [ ] Confirmación en acciones destructivas
- [ ] Widgets reutilizables utilizados

### Seguridad
- [ ] @PreAuthorize en controller
- [ ] Validaciones server-side (no confiar en frontend)
- [ ] SQL Injection prevenido (parámetros, no concatenación)
- [ ] Datos sensibles no expuestos en DTOs
- [ ] CORS configurado
- [ ] Rate limiting considerado

### Auditoría
- [ ] Operaciones CREATE auditadas
- [ ] Operaciones UPDATE auditadas
- [ ] Operaciones DELETE auditadas
- [ ] Valores anterior/nuevo registrados
- [ ] Usuario, IP, fecha/hora registrados

### Pruebas
- [ ] Pruebas unitarias de service
- [ ] Pruebas unitarias de controller
- [ ] Pruebas de repository (integración)
- [ ] Pruebas de componente Angular
- [ ] Pruebas de modelo/servicio Flutter
- [ ] Cobertura mínima 80%

### Documentación
- [ ] README del módulo actualizado
- [ ] Endpoints documentados (OpenAPI/Swagger)
- [ ] Cambios BD documentados
- [ ] Flujo de operación documentado
- [ ] Pendientes registrados

### Rendimiento
- [ ] Sin N+1 queries
- [ ] Índices en columnas de filtro
- [ ] Paginación en listados grandes
- [ ] FetchType LAZY en relaciones
- [ ] Sin código muerto o imports innecesarios
- [ ] Consultas optimizadas (EXPLAIN ANALYZE)

---

## 2. CHECKLIST DE DESPLIEGUE

### Pre-despliegue
- [ ] Pruebas unitarias pasan
- [ ] Pruebas de integración pasan
- [ ] Build de producción exitoso
- [ ] Migraciones Flyway aplicadas en staging
- [ ] Base de datos respaldada
- [ ] Variables de entorno configuradas
- [ ] CORS configurado para origen de producción
- [ ] JWT secret cambiado (no default)
- [ ] Logging configurado (INFO, no DEBUG)
- [ ] ddl-auto = validate (no update)

### Despliegue Backend
- [ ] JAR construido (mvn clean package)
- [ ] JAR transferido al servidor
- [ ] Servicio systemd detenido
- [ ] Backup BD realizado
- [ ] Nuevo JAR desplegado
- [ ] Servicio iniciado
- [ ] Logs verificados (sin errores)
- [ ] Health endpoint responde 200
- [ ] Swagger UI accesible
- [ ] Smoke test de endpoints principales

### Despliegue Frontend
- [ ] Build producción (ng build --prod)
- [ ] Archivos transferidos al servidor
- [ ] Nginx recargado
- [ ] Página carga correctamente
- [ ] Login funciona
- [ ] Navegación funciona
- [ ] API calls funcionan

### Post-despliegue
- [ ] Monitoreo activo (logs, métricas)
- [ ] Backup verificado
- [ ] Usuarios notificados
- [ ] Documentación actualizada

---

## 3. CHECKLIST DE REVISIÓN DE SEGURIDAD

- [ ] Autenticación JWT configurada
- [ ] Contraseñas con BCrypt (strength 10+)
- [ ] Autorización por rol verificada
- [ ] Validaciones server-side activas
- [ ] SQL Injection prevenido
- [ ] XSS prevenido (escaping de salida)
- [ ] CORS restringido en producción
- [ ] CSRF deshabilitado (API stateless)
- [ ] Headers de seguridad configurados
- [ ] Datos sensibles no en logs
- [ ] Tokens no expuestos en URLs
- [ ] Session timeout configurado
- [ ] Tamaño máximo de request configurado
- [ ] Rate limiting en endpoints críticos
- [ ] Auditoría de accesos denegados

---

## 4. CHECKLIST DE ACEPTACIÓN DE MÓDULO

- [ ] Funcionalidad completa según especificación
- [ ] CRUD operativo (Crear, Leer, Actualizar, Eliminar)
- [ ] Búsqueda y filtros funcionando
- [ ] Paginación correcta
- [ ] Exportación PDF/Excel (si aplica)
- [ ] Responsive (móvil, tablet, desktop)
- [ ] Mensajes de error claros
- [ ] Confirmación de acciones destructivas
- [ ] Auditoría de cambios verificada
- [ ] Roles y permisos correctos
- [ ] Datos semilla cargados (si aplica)
- [ ] Pruebas pasan
- [ ] Documentación actualizada

---

## 5. CHECKLIST DE SINCRONIZACIÓN MÓVIL

- [ ] Descarga inicial de datos funciona
- [ ] Datos se almacenan en SQLite local
- [ ] Visualización offline funciona
- [ ] Registro de votos offline funciona
- [ ] Cola de sincronización (sincronizado=0)
- [ ] Sincronización automática al reconectar
- [ ] Sincronización manual (botón sincronizar)
- [ ] Indicador de estado online/offline
- [ ] Contador de votos pendientes
- [ ] Resolución de conflictos
- [ ] Pull-to-refresh para actualizar datos
- [ ] Migraciones SQLite versionadas
