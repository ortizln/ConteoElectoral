# Sistema de Conteo Electoral — Resumen Completo del Sistema

## Visión General

Sistema integral para la gestión de procesos electorales, registro de votos, y visualización de resultados en tiempo real.  
Desarrollado con **Spring Boot 3.2.1** (backend), **Angular 17.3** (frontend web), y **Flutter 3.x** (app móvil).  
Base de datos **PostgreSQL 18** en servidor `192.168.100.215:5432`, con réplica local **SQLite** en la app móvil para operación offline.

---

## 1. Autenticación y Roles

### 1.1 Módulo de Autenticación
- **Inicio de sesión**: `POST /api/auth/login` → retorna JWT (24h)
- **Verificación de sesión**: `GET /api/auth/me`
- **Verificación de contraseña**: `POST /api/auth/verify-password`
- **Seguridad**: JWT en header `Authorization: Bearer <token>`, BCrypt para passwords, CORS abierto

### 1.2 Roles del Sistema
| Rol | Acceso Web | Acceso Móvil | Descripción |
|-----|-----------|-------------|-------------|
| **ADMIN** | `/admin/*` | Admin CRUD + votación | Acceso total al sistema |
| **SUPERVISOR** | `/dashboard`, `/admin/*` (excepto Config) | Solo votación | Supervisión de resultados |
| **MIEMBRO_MESA** | `/mesa/*` | Solo votación | Registro de votos |
| **OPERADOR** | (solo backend) | - | Registro de votos por papeleta |

### 1.3 Menú por Rol (Web)
- **ADMIN**: Elecciones, Zonas, Provincias, Cantones, Parroquias, Instituciones, Partidos, Cargos, Candidatos, Mesas, Asignar Mesas, Listas Electorales, Config. Electoral, Papeletas, Configuración
- **SUPERVISOR**: Dashboard + (Elecciones, Instituciones, Partidos, Cargos, Candidatos, Mesas, Asignar Mesas, Papeletas)
- **MIEMBRO_MESA**: Módulo de Votación

---

## 2. Backend — Arquitectura

### 2.1 Tecnologías
- **Spring Boot 3.2.1** con Java 17
- **JPA/Hibernate** con PostgreSQL (ddl-auto: update)
- **Spring Security** con JWT (jjwt 0.12.3)
- **WebSocket** (STOMP sobre SockJS) para actualizaciones en tiempo real
- **iText 7.2.5** para generación de PDF
- **Apache POI 5.2.5** para generación de Excel
- **SpringDoc OpenAPI 2.3.0** para Swagger UI

### 2.2 Estructura del Backend
```
backend/
├── entities/       (28 entidades JPA)
├── controllers/    (26 controladores REST)
├── services/       (25 servicios)
├── repositories/   (26 repositorios Spring Data)
├── dto/            (48 DTOs: request + response + dashboard)
├── config/         (SecurityConfig, JwtService, WebSocketConfig)
├── security/       (JwtAuthenticationFilter, CustomUserDetails, CustomUserDetailsService)
├── exception/      (GlobalExceptionHandler + 6 excepciones personalizadas)
└── util/           (SecurityUtil)
```

### 2.3 Entidades Principales y Relaciones
```
Zona ──1:N── Provincia ──1:N── Canton ──1:N── Parroquia ──1:N── InstitucionEducativa
                                                                         │
Eleccion ──1:N── Mesa ──N:1── InstitucionEducativa                       │
    │            │                                                       │
    ├──1:N── Partido                                                     │
    ├──1:N── ListaElectoral ──1:N── Candidato                            │
    ├──1:N── Papeleta ──1:N── OpcionPapeleta                             │
    ├──1:N── Voto ──N:1── Candidato                                      │
    │         └──N:1── Mesa                                              │
    └──1:N── VotoPapeleta ──N:1── OpcionPapeleta
                         └──N:1── Mesa

Cargo ──N:N── TipoEleccion (vía TipoEleccionCargo)
Candidato ──N:1── Partido, Cargo, ListaElectoral
Usuario ──N:1── Rol ──1:N── RolPermiso
Mesa ──N:N── Usuario (vía MesaUsuario)
```

### 2.4 Endpoints por Módulo

#### Geografía
| Entidad | Endpoint Base | Operaciones |
|---------|--------------|-------------|
| **Zona** | `/api/zonas` | CRUD + Excel/PDF |
| **Provincia** | `/api/provincias` | CRUD + filtrar por zona + Excel/PDF |
| **Cantón** | `/api/cantones` | CRUD + filtrar por provincia + Excel/PDF |
| **Parroquia** | `/api/parroquias` | CRUD + filtrar por cantón + Excel/PDF |
| **Inst. Educativa** | `/api/instituciones` | CRUD + filtrar por parroquia + Excel/PDF |

#### Configuración Electoral
| Entidad | Endpoint Base | Operaciones |
|---------|--------------|-------------|
| **Tipo Elección** | `/api/tipos-eleccion` | CRUD |
| **Tipo Circunscripción** | `/api/tipos-circunscripcion` | Listar |
| **Tipo Elección Cargo** | `/api/tipo-eleccion-cargo` | CRUD asignación cargo + orden |
| **Plantilla Papeleta** | `/api/plantillas-papeleta` | Listar |
| **Recinto (virtual)** | `/api/recintos/eleccion/{id}` | Listar recintos por elección |

#### Datos Electorales
| Entidad | Endpoint Base | Operaciones |
|---------|--------------|-------------|
| **Elección** | `/api/elecciones` | CRUD + activas + Excel/PDF |
| **Partido** | `/api/partidos` | CRUD + filtrar por elección + Excel/PDF |
| **Cargo** | `/api/cargos` | CRUD + filtrar por elección + Excel/PDF |
| **Candidato** | `/api/candidatos` | CRUD + filtrar por elección + orden por cargo + Excel/PDF |
| **Lista Electoral** | `/api/listas-electorales` | CRUD + detalle con candidatos |
| **Mesa** | `/api/mesas` | CRUD + usuario actual + cerrar/reabrir + asignar usuario + Excel/PDF/Acta |
| **Papeleta** | `/api/papeletas` | Listar + generar/regenerar por elección |

#### Votación
| Entidad | Endpoint Base | Operaciones |
|---------|--------------|-------------|
| **Voto** | `/api/votos` | CRUD + filtrar por mesa/elección + detalle candidato |
| **Voto Papeleta** | `/api/voto-papeleta` | CRUD + filtrar por mesa/elección |

#### Dashboard y Reportes
| Entidad | Endpoint Base | Operaciones |
|---------|--------------|-------------|
| **Dashboard** | `/api/dashboard/eleccion/{id}` | Datos generales + filtros + resultados detallados + PDF/Excel |

#### Administración
| Entidad | Endpoint Base | Operaciones |
|---------|--------------|-------------|
| **Usuario** | `/api/usuarios` | CRUD + reset password + filtrar por rol + Excel/PDF |
| **Permiso** | `/api/permisos` | CRUD roles y permisos por módulo |
| **Configuración** | `/api/configuracion` | Logo, APK, datos del partido, manual PDF |
| **Carrusel** | `/api/carousel` | CRUD imágenes de login |
| **Importación** | `/api/import/excel` | Importar datos desde Excel |
| **Auditoría** | (vía entidad Auditoria) | Log de todas las operaciones CRUD |

---

## 3. Frontend Web — Angular

### 3.1 Tecnologías
- **Angular 17.3** (componentes standalone, sin NgModules)
- **Chart.js 4.4.1** para gráficos del dashboard
- **STOMP + SockJS** para WebSocket en tiempo real
- **Bootstrap 5.2.3** + **Bootstrap Icons** (vía CDN)
- **xlsx** para importación de Excel

### 3.2 Estructura de Rutas
```
/login                          → LoginComponent
/admin                          → AdminLayoutComponent (sidebar, role-filtered)
  /admin/elecciones             → EleccionesComponent
  /admin/zonas                  → ZonasComponent
  /admin/provincias             → ProvinciasComponent
  /admin/cantones               → CantonesComponent
  /admin/parroquias             → ParroquiasComponent
  /admin/instituciones          → InstitucionesComponent
  /admin/partidos               → PartidosComponent
  /admin/cargos                 → CargosComponent
  /admin/candidatos             → CandidatosComponent
  /admin/mesas                  → MesasComponent
  /admin/asignar-mesas          → AsignarMesasComponent
  /admin/configuracion          → ConfiguracionComponent (usuarios, import, carrusel, permisos embebidos)
  /admin/tipos-eleccion         → TiposEleccionComponent
  /admin/listas-electorales     → ListasElectoralesComponent
  /admin/papeletas              → PapeletasComponent
/dashboard                      → DashboardComponent (resultados en tiempo real)
/mesa                           → MesaVotacionComponent (votación por candidato)
/mesa/papeletas                 → MesaVotacionPapeletaComponent (votación por papeleta)
```

### 3.3 Funcionalidades por Módulo Web

#### Módulo de Administración
Cada página de administración (Zonas, Provincias, Cantones, Parroquias, Instituciones, Partidos, Cargos, Candidatos, Mesas) ofrece:
- **Listado** con tabla responsive, búsqueda, paginación
- **Crear/Editar/Eliminar** mediante modal
- **Exportación** a Excel y PDF

#### Configuración Electoral
- **Tipos de Elección**: Crear/editar tipos, asignar cargos con orden, editar orden inline, eliminar asignaciones, info tooltip del cargo
- **Listas Electorales**: Crear listas con partido + cargo + circunscripción, detalle con candidatos
- **Papeletas**: Visualizar, generar y regenerar papeletas por elección

#### Módulo de Votación (Web)
- **Votación por candidato** (`/mesa`): Seleccionar mesa, buscar/filtrar candidatos, registrar/actualizar/eliminar votos, manejar votos nulos y en blanco, cerrar acta, imprimir acta
- **Votación por papeleta** (`/mesa/papeletas`): Sistema de papeletas con pestañas, opciones de lista/partido/candidato, colores, cierre de acta

#### Dashboard
- Visualización de resultados con gráficos (Chart.js)
- Filtros jerárquicos: Zona → Provincia → Cantón → Parroquia → Institución → Mesa
- Filtros adicionales: Cargo, Partido
- Modal de detalle por candidato (desglose geográfico)
- Modal de mesas cerradas con reapertura (requiere contraseña)
- WebSocket para actualizaciones en tiempo real
- Exportación a PDF y Excel

#### Configuración del Sistema
- Datos del partido (nombre, descripción)
- Logo del partido (subir/eliminar)
- App Móvil APK (subir/descargar/eliminar)
- **Manual de Usuario** (descargar PDF generado dinámicamente)
- Gestión de Usuarios (CRUD + reset password)
- Importación de datos desde Excel
- Carrusel de imágenes de login
- Permisos por rol (matriz V/C/E/D por módulo)

### 3.4 WebSockets
- Conexión STOMP sobre SockJS en `/ws`
- Suscripciones: `/topic/resultados/{eleccionId}`, `/topic/mesa-estado/{eleccionId}`
- Actualización automática del dashboard y estado de mesas

---

## 4. App Móvil — Flutter

### 4.1 Tecnologías
- **Flutter 3.x** (Dart SDK >=3.0.0)
- **sqflite** para base de datos SQLite local
- **Provider** para gestión de estado
- **connectivity_plus** para detección de conexión
- **http** para comunicación REST
- **flutter_secure_storage** para almacenamiento seguro del token

### 4.2 Estructura de la App
```
lib/
├── main.dart                          → Punto de entrada, Provider + MaterialApp + rutas
├── config/app_config.dart             → URL del servidor
├── theme/app_theme.dart               → Tema Material 3
├── providers/app_provider.dart        → Estado central (ChangeNotifier)
├── services/api_service.dart          → Cliente REST (670 líneas, 37 endpoints)
├── database/database_helper.dart      → SQLite singleton (653 líneas, 8 tablas)
├── models/                            → 13 modelos + barrel
│   ├── usuario.dart, eleccion.dart, partido.dart
│   ├── cargo.dart, candidato.dart, recinto.dart
│   ├── mesa.dart, voto.dart
│   └── zona.dart, provincia.dart, canton.dart, parroquia.dart, institucion_educativa.dart
├── screens/                           → 8 pantallas
│   ├── login_screen.dart              → Login con gradiente + configuración servidor
│   ├── home_screen.dart               → Dashboard + mesas asignadas + admin CRUD
│   ├── votacion_screen.dart           → Registro de votos (449 líneas)
│   ├── zonas_screen.dart              → CRUD Zonas
│   ├── provincias_screen.dart         → CRUD Provincias
│   ├── cantones_screen.dart           → CRUD Cantones
│   ├── parroquias_screen.dart         → CRUD Parroquias
│   └── instituciones_screen.dart      → CRUD Instituciones
└── widgets/                           → 7 widgets reutilizables
    ├── stat_card.dart, loading_overlay.dart, empty_state.dart
    ├── gradient_app_bar.dart, sync_indicator.dart
    ├── crud_list_tile.dart, confirm_dialog.dart
```

### 4.3 Funcionalidades Offline

#### Arquitectura Offline-First
1. **Sincronización inicial** (`descargarDatos`): Descarga elecciones → partidos → cargos → candidatos → recintos → mesas → votos del servidor y los almacena en SQLite
2. **Registro local**: Los votos se guardan primero en SQLite con `sincronizado = 0`
3. **Sincronización automática**: Al recuperar conexión, envía votos pendientes al servidor
4. **Base de datos local** (8 tablas):
   - `elecciones`, `partidos`, `cargos`, `candidatos`, `recintos`, `mesas`, `votos`, `session`

#### Pantalla de Votación (Móvil)
- **Lista de candidatos** con filtro por partido político
- **Badges informativos**: Tipo de votación (INDIVIDUAL, LISTA, PLURINOMINAL, PREFERENCIAL, MIXTO) + Tipo de circunscripción
- **Selector de cantidad** con botones -/+/input
- **Cierre de acta** con confirmación
- **Indicador de sincronización** (online/offline + votos pendientes)
- **Bloqueo** si el acta ya está cerrada

#### CRUD Administrativo (Móvil)
- Las pantallas de Zonas, Provincias, Cantones, Parroquias e Instituciones ofrecen:
  - Listado con búsqueda
  - Crear/Editar mediante modal bottom sheet
  - Eliminar con confirmación
  - Pull-to-refresh
  - Solo visibles para rol ADMIN

### 4.4 Flujo de Datos
```
AppProvider (ChangeNotifier)
  ├── init() → restaurar sesión, escuchar conectividad
  ├── login() → API /auth/login → guardar session en SQLite
  ├── descargarDatos() → API secuencial:
  │     GET /elecciones/activas
  │     GET /partidos/eleccion/{id}
  │     GET /cargos/eleccion/{id}
  │     GET /candidatos/eleccion/{id}
  │     GET /recintos/eleccion/{id}
  │     GET /mesas/usuario/actual/eleccion/{id}
  │     GET /votos/mesa/{mesaId}  (por cada mesa)
  │     → guardarTodoEnSQLite
  ├── registrarVoto() → SQLite local → si online, POST /api/votos
  ├── sincronizarVotos() → SQLite.getVotosPendientes → POST /api/votos (cada uno)
  └── cerrarActa() → POST /api/mesas/{id}/cerrar + SQLite.cerrarMesaLocal
```

---

## 5. Base de Datos

### 5.1 Esquema PostgreSQL (servidor: 192.168.100.215)
```
Tablas principales (28):
zonas, provincias, cantones, parroquias, instituciones_educativas
elecciones, tipos_eleccion, tipos_circunscripcion, tipo_eleccion_cargo
cargos, partidos, listas_electorales, candidatos
plantillas_papeleta, papeletas, opciones_papeleta
mesas, mesas_usuarios
votos, votos_papeleta
usuarios, roles, roles_permisos
configuracion_sistema, carousel_images
auditoria
```

### 5.2 Esquema SQLite (local en el móvil, versión 3)
```
elecciones, partidos, cargos, candidatos, recintos, mesas, votos, session
```

### 5.3 Seed Data
- Roles: ADMIN, SUPERVISOR, MIEMBRO_MESA, OPERADOR
- Usuario admin: `admin` / `admin123`
- Tipos de circunscripción (8): NACIONAL, PROVINCIAL, DISTRITAL, CANTONAL, PARROQUIAL, ZONAL, EXTRANJERO, RURAL
- Plantillas de papeleta (6): Lista Cerrada, Lista Abierta, Individual, Plurinominal, Preferencial, Mixta

---

## 6. Despliegue

### 6.1 Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/conteo-electoral-1.0.0.jar
```
- Puerto: `8081`
- Swagger: `http://localhost:8081/swagger-ui.html`

### 6.2 Frontend Web
```bash
cd frontend
ng serve    # Desarrollo en http://localhost:4200
ng build    # Producción en dist/
```

### 6.3 App Móvil
```bash
cd conteo_electoral_app
flutter build apk --debug    # APK de depuración
flutter build apk --release  # APK de producción
```

### 6.4 Configuración de Red
- **Web** (dev): `http://localhost:8081/api`
- **Web** (prod): `http://192.168.100.215:8081/api`
- **Móvil** (emulador): `http://10.0.2.2:8081/api`
- **Móvil** (producción): URL configurable desde la app

---

## 7. Seguridad

- **Autenticación**: JWT con expiración de 24 horas
- **Almacenamiento de tokens**: localStorage (web) / flutter_secure_storage (móvil)
- **Autorización**: `@PreAuthorize("hasRole('ADMIN')")` en métodos del controlador
- **Contraseñas**: BCrypt
- **CORS**: Permitido todos los orígenes
- **CSRF**: Deshabilitado (API stateless)
- **Endpoints públicos**:
  - `/api/auth/**` — login
  - `/api/carousel/**` — imágenes del carrusel
  - `/api/configuracion/logo`, `/apk`, `/manual` — recursos públicos
  - Swagger UI, WebSocket, OPTIONS

---

## 8. Módulos Exportables (PDF/Excel)

| Módulo | PDF | Excel |
|--------|-----|-------|
| Zonas | ✔ | ✔ |
| Provincias | ✔ | ✔ |
| Cantones | ✔ | ✔ |
| Parroquias | ✔ | ✔ |
| Instituciones Educativas | ✔ | ✔ |
| Elecciones | ✔ | ✔ |
| Partidos | ✔ | ✔ |
| Cargos | ✔ | ✔ |
| Candidatos | ✔ | ✔ |
| Mesas | ✔ | ✔ |
| Usuarios | ✔ | ✔ |
| Dashboard | ✔ (con filtros) | ✔ (con filtros) |
| Acta de Mesa | ✔ | - |
