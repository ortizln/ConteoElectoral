# 02 — ARQUITECTURA DEL SISTEMA

> Documento de arquitectura del ERP Electoral, describiendo capas, patrones, flujos y decisiones técnicas.

---

## 1. VISIÓN GENERAL DE ARQUITECTURA

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ERP ELECTORAL                               │
├──────────────────────┬──────────────────────┬──────────────────────┤
│    FRONTEND WEB      │    API REST (8081)   │    APP MÓVIL         │
│    Angular 17+       │    Spring Boot 3.x   │    Flutter 3.x       │
│    Bootstrap 5       │    JPA/Hibernate     │    SQLite Offline    │
│    Chart.js          │    PostgreSQL 18     │    Provider          │
│    WebSocket Client  │    WebSocket         │    Sync Service      │
├──────────────────────┴──────────────────────┴──────────────────────┤
│                        SEGURIDAD                                   │
│            JWT · BCrypt · CORS · Roles · Permisos                  │
├─────────────────────────────────────────────────────────────────────┤
│                        AUDITORÍA                                   │
│            EntityListener · AuditoriaService · Tabla auditoria     │
├─────────────────────────────────────────────────────────────────────┤
│                        INFRAESTRUCTURA                             │
│            Docker · Nginx · PostgreSQL 18 · Redis (futuro)         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. ARQUITECTURA DEL BACKEND (SPRING BOOT)

### 2.1 Capas

```
┌────────────────────────────────────────────────────────────────┐
│                     CONTROLLER LAYER                           │
│  @RestController, manejo HTTP, validación de entrada, DTOs    │
├────────────────────────────────────────────────────────────────┤
│                     SERVICE LAYER                              │
│  Lógica de negocio, transacciones, coordinación               │
├────────────────────────────────────────────────────────────────┤
│                     REPOSITORY LAYER                           │
│  Spring Data JPA, @Query, Specifications, Pageable            │
├────────────────────────────────────────────────────────────────┤
│                     ENTITY LAYER                               │
│  Entidades JPA, relaciones, @EntityListeners                  │
├────────────────────────────────────────────────────────────────┤
│                     DATABASE                                   │
│  PostgreSQL 18 (principal) / SQLite (móvil offline)           │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Patrones Aplicados

| Patrón | Uso |
|--------|-----|
| **MVC** | Controller → Service → Repository |
| **DTO** | Separación entidad JPA de la representación API |
| **Repository** | Abstracción de acceso a datos |
| **Strategy** | Para diferentes tipos de votación/papeleta |
| **Observer** | WebSocket para actualizaciones en tiempo real |
| **Template Method** | Exportación PDF/Excel con estructura común |
| **Builder** | Construcción de consultas de dashboard |
| **Chain of Responsibility** | Filtros de seguridad JWT |
| **Entity Listener** | Auditoría automática en JPA |

### 2.3 Flujo de una Petición

```
Cliente → FilterChain (CORS → JWT Filter) → DispatcherServlet
  → Controller (@Valid) → Service (@Transactional)
  → Repository → Database
  → Service → DTO Response → Controller → JSON Response
```

### 2.4 Estructura de Paquetes

```
com.electoral
├── ElectroalApplication.java
│
├── config/
│   ├── SecurityConfig.java          ← Seguridad Spring + CORS
│   ├── WebSocketConfig.java         ← Config STOMP/SockJS
│   └── CorsConfig.java              ← CORS global
│
├── security/
│   ├── JwtService.java              ← Generar/validar JWT
│   ├── JwtAuthenticationFilter.java ← Filtro de peticiones
│   └── CustomUserDetailsService.java
│
├── entity/
│   ├── Eleccion.java
│   ├── Mesa.java
│   ├── Voto.java
│   └── ...                          ← 28 entidades
│
├── repository/
│   ├── EleccionRepository.java
│   └── ...                          ← 26 repositorios
│
├── service/
│   ├── EleccionService.java
│   └── ...                          ← 25 servicios
│
├── controller/
│   ├── EleccionController.java
│   └── ...                          ← 26 controladores
│
├── dto/
│   ├── request/
│   │   └── EleccionRequest.java
│   └── response/
│       └── EleccionResponse.java
│
├── mapper/
│   └── EleccionMapper.java          ← MapStruct (futuro)
│
├── exception/
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   ├── UnauthorizedException.java
│   └── GlobalExceptionHandler.java
│
├── util/
│   └── SecurityUtil.java            ← Usuario autenticado
│
└── audit/
    ├── AuditEntityListener.java     ← JPA Listener
    └── AuditoriaService.java        ← Registro de auditoría
```

---

## 3. ARQUITECTURA DEL FRONTEND (ANGULAR)

### 3.1 Capas

```
┌──────────────────────────────────────────────────────────────┐
│                   COMPONENT LAYER                            │
│  Standalone Components, Templates, Styles                   │
├──────────────────────────────────────────────────────────────┤
│                   SERVICE LAYER                              │
│  HTTP Client, WebSocket, Shared State                       │
├──────────────────────────────────────────────────────────────┤
│                   ROUTING LAYER                              │
│  Rutas lazy-loaded, Guards (auth + role), Resolvers         │
├──────────────────────────────────────────────────────────────┤
│                   INTERCEPTOR LAYER                          │
│  Auth (JWT), Error handling, Loading indicator              │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Flujo de Navegación

```
/login → AuthGuard → /admin (AdminLayout con sidebar dinámico)
                       ├── /admin/zonas          ← lazy
                       ├── /admin/provincias     ← lazy
                       ├── /admin/cantones       ← lazy
                       ├── /admin/parroquias     ← lazy
                       ├── /admin/instituciones  ← lazy
                       ├── /admin/elecciones     ← lazy
                       ├── /admin/partidos       ← lazy
                       ├── /admin/cargos         ← lazy
                       ├── /admin/candidatos     ← lazy
                       ├── /admin/listas-electorales ← lazy
                       ├── /admin/papeletas      ← lazy
                       ├── /admin/mesas          ← lazy
                       ├── /admin/asignar-mesas  ← lazy
                       ├── /admin/tipos-eleccion ← lazy
                       └── /admin/configuracion  ← lazy
/dashboard             → DashboardComponent (resultados)
/mesa                  → MesaVotacionComponent
/mesa/papeletas        → MesaVotacionPapeletaComponent
```

---

## 4. ARQUITECTURA DE LA APP MÓVIL (FLUTTER)

### 4.1 Arquitectura Offline-First

```
┌──────────────────────────────────────────────────────────────┐
│                       UI LAYER                               │
│  Screens + Widgets + Navigation                             │
├──────────────────────────────────────────────────────────────┤
│                    PROVIDER LAYER                            │
│  AppProvider (ChangeNotifier) estado global                  │
├──────────────────────────────────────────────────────────────┤
│                    SERVICE LAYER                             │
│  ApiService (HTTP) · SyncService                            │
├──────────────────────────────────────────────────────────────┤
│                    DATABASE LAYER                            │
│  DatabaseHelper (SQLite) · Modelos                          │
├──────────────────────────────────────────────────────────────┤
│                    CONNECTIVITY                              │
│  connectivity_plus · Online/Offline detector                │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Flujo de Sincronización

```
App.init()
  ├── Restaurar sesión desde SQLite (session table)
  ├── Escuchar cambios de conectividad
  │
  ├── USUARIO: Login
  │   ├── POST /api/auth/login → JWT
  │   └── Guardar session en SQLite
  │
  ├── USUARIO: Descargar datos
  │   ├── GET /api/elecciones/activas
  │   ├── GET /api/partidos/eleccion/{id}
  │   ├── GET /api/cargos/eleccion/{id}
  │   ├── GET /api/candidatos/eleccion/{id}
  │   ├── GET /api/recintos/eleccion/{id}
  │   ├── GET /api/mesas/usuario/actual/eleccion/{id}
  │   ├── GET /api/votos/mesa/{mesaId} (cada mesa)
  │   └── Guardar todo en SQLite
  │
  ├── USUARIO: Registrar voto
  │   ├── Guardar en SQLite (sincronizado=0)
  │   ├── Si hay conexión: POST /api/votos
  │   └── Si offline: queda pendiente
  │
  └── AUTO: Sincronizar votos pendientes
      ├── Leer SQLite donde sincronizado=0
      ├── POST /api/votos (cada voto pendiente)
      └── Marcar como sincronizado=1
```

---

## 5. ARQUITECTURA DE COMUNICACIONES

### 5.1 API REST
- **Formato**: JSON (application/json)
- **Autenticación**: JWT en header `Authorization: Bearer <token>`
- **Paginación**: Parámetros `page`, `size`, `sort` — respuesta `Page<T>`
- **Códigos de estado**: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error
- **Versionado**: URI prefix `/api/` (v2 planificado como `/api/v2/`)

### 5.2 WebSocket
- **Endpoint**: `/ws` (SockJS fallback)
- **Protocolo**: STOMP
- **Topics**: `/topic/resultados/{eleccionId}`, `/topic/mesa-estado/{eleccionId}`
- **Uso**: Actualización en tiempo real del dashboard

### 5.3 Sincronización Móvil
- **Estrategia**: Offline-first con sincronización diferida
- **Formato**: JSON (mismos DTOs que API web)
- **Conflicto**: Last-write-wins (prioriza servidor)
- **Pendientes**: Cola de votos no sincronizados en SQLite

---

## 6. DECISIONES ARQUITECTÓNICAS CLAVE

### ADR-01: DTOs vs Entidades Expuestas
- **Decisión**: Usar DTOs para toda comunicación API
- **Razón**: Evitar exponer relaciones JPA, prevenir serialización circular, desacoplar modelo interno de API pública
- **Consecuencia**: Mayor cantidad de clases, pero control total sobre la representación

### ADR-02: PostgreSQL + SQLite
- **Decisión**: PostgreSQL como BD principal, SQLite para offline móvil
- **Razón**: PostgreSQL ofrece robustez, índices avanzados, JSONB; SQLite permite operación offline sin servidor
- **Consecuencia**: Dos esquemas separados que deben mantenerse sincronizados

### ADR-03: Provider vs Riverpod/Bloc
- **Decisión**: Provider (actual), migración futura a Riverpod
- **Razón**: Provider es simple y suficiente para el alcance actual; Riverpod ofrece mejor testabilidad y rendimiento
- **Consecuencia**: Refactor planificado para Fase 3

### ADR-04: Flyway vs ddl-auto
- **Decisión**: Migrar de ddl-auto: update a Flyway
- **Razón**: ddl-auto es inseguro en producción, no versiona cambios, puede perder datos
- **Consecuencia**: Migración planificada para Fase 2

### ADR-05: MapStruct vs Mapper Manual
- **Decisión**: MapStruct para nuevas implementaciones, migrar las existentes gradualmente
- **Razón**: Reduce código boilerplate, genera mappers en tiempo de compilación, tipado seguro
- **Consecuencia**: Dependencia adicional en build, pero menos código manual

---

## 7. DIAGRAMA DE ENTIDADES PRINCIPALES

```
Zona (1) ──→ (N) Provincia (1) ──→ (N) Canton (1) ──→ (N) Parroquia (1) ──→ (N) InstitucionEducativa
                                                                                         │
Eleccion (1) ──→ (N) Mesa ──────────────────────────────────────────────────────────────┘
    │                      │
    │                      └── (N) Voto ──→ (1) Candidato
    │                      └── (N) VotoPapeleta ──→ (1) OpcionPapeleta
    │
    ├── (1) TipoEleccion ── (N:N) ── Cargo (via TipoEleccionCargo)
    │
    ├── (N) Partido (1) ──→ (N) ListaElectoral ──→ (N) Candidato
    │         │                                        │
    │         └────────────────────────────────────────┘
    │
    ├── (N) Papeleta ──→ (N) OpcionPapeleta
    │         │
    │         └── (1) PlantillaPapeleta
    │
    └── (N) Cargo

Usuario (N) ── (N:M) ── Mesa (via MesaUsuario)
Usuario (N) ──→ (1) Rol (1) ──→ (N) RolPermiso
```

---

## 8. PATRÓN DE RESPUESTA API

### Éxito
```json
{
  "id": 1,
  "nombre": "Elección 2026",
  "fecha": "2026-02-09",
  "activa": true,
  "totalVotos": 15000,
  "participacion": 68.5
}
```

### Error
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Elección no encontrada con id: 99",
  "timestamp": "2026-07-20T08:30:00"
}
```

### Paginación
```json
{
  "content": [...],
  "page": 0,
  "size": 20,
  "totalElements": 150,
  "totalPages": 8,
  "last": false,
  "first": true
}
```
