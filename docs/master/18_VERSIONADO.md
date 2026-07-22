# 18 — VERSIONADO Y CHANGELOG

> Políticas de versionado, control de cambios y gestión de releases del ERP Electoral.

---

## 1. POLÍTICA DE VERSIONADO

### Esquema Semántico (SemVer)
```
v{major}.{minor}.{patch}  →  v1.2.3
```

| Componente | Cuándo incrementar | Ejemplo |
|-----------|-------------------|---------|
| **Major** | Cambio incompatible en API, BD o UI | v1.0.0 → v2.0.0 |
| **Minor** | Nueva funcionalidad backward compatible | v1.0.0 → v1.1.0 |
| **Patch** | Bug fix, mejoras menores | v1.0.0 → v1.0.1 |

### Etiquetas Adicionales
| Etiqueta | Significado | Ejemplo |
|----------|-------------|---------|
| `-alpha.N` | Desarrollo temprano | v2.0.0-alpha.1 |
| `-beta.N` | Funcional pero no probado completamente | v2.0.0-beta.1 |
| `-rc.N` | Release candidate | v2.0.0-rc.1 |

---

## 2. HISTORIAL DE VERSIONES

### v1.0.0 (Actual — Versión Base)
**Fecha**: Completado

**Backend:**
- 28 entidades JPA (Zona, Provincia, Canton, Parroquia, InstitucionEducativa, Eleccion, TipoEleccion, TipoCircunscripcion, TipoEleccionCargo, Cargo, Partido, ListaElectoral, Candidato, Papeleta, OpcionPapeleta, PlantillaPapeleta, Mesa, MesaUsuario, Voto, VotoPapeleta, Usuario, Rol, RolPermiso, ConfiguracionSistema, CarouselImages, Auditoria, Recinto (virtual))
- 26 controladores REST
- 25 servicios
- 26 repositorios Spring Data
- 48 DTOs (request + response + dashboard)
- Autenticación JWT con 4 roles (ADMIN, SUPERVISOR, MIEMBRO_MESA, OPERADOR)
- WebSocket (STOMP + SockJS)
- Exportación PDF (iText 7) y Excel (Apache POI)
- Dashboard con Chart.js y filtros geográficos
- Manual de usuario PDF (ManualService con iText 7)

**Frontend:**
- 21 componentes standalone (Angular 17.3)
- Login con carrusel de imágenes
- Admin layout con sidebar dinámico por rol
- 16 páginas de administración con CRUD completo
- Dashboard con WebSocket en tiempo real
- Módulo de votación por candidato y por papeleta
- Configuración del sistema (logo, APK, manual, usuarios, permisos, importación)

**App Móvil:**
- 8 pantallas (Login, Home, Votación, Zonas, Provincias, Cantones, Parroquias, Instituciones)
- 7 widgets reutilizables
- Offline-first con SQLite (8 tablas)
- Provider para estado global
- Sincronización REST con cola de votos pendientes

**Base de Datos:**
- PostgreSQL 18 (tablas principales)
- SQLite (app móvil, versión 3)
- Seed data (roles, admin user, tipos de circunscripción, plantillas)

---

### v1.1.0 (Planificada — Mejoras)
**Cambios propuestos:**
- [ ] Migrar de ddl-auto a Flyway
- [ ] Agregar MapStruct para mapeo DTO ↔ Entity
- [ ] Agregar pruebas unitarias (JUnit 5 + Mockito)
- [ ] Agregar entity auditing completo (AOP)
- [ ] Agregar filtros de auditoría (fecha, módulo, usuario)
- [ ] Mejorar manejo de errores en Flutter
- [ ] Agregar pull-to-refresh en todas las pantallas móviles
- [ ] Agregar confirmación de cierre de acta en móvil
- [ ] Optimizar consultas N+1 en dashboard

---

### v2.0.0 (Fase 2 — Configuración y Reglas)
**Cambios propuestos:**
- [ ] Motor de reglas de negocio parametrizables
- [ ] Modelo completo de circunscripciones electorales
- [ ] Configuración dinámica de cargos
- [ ] Calendario electoral con etapas y estados automáticos
- [ ] Migración completa a Flyway
- [ ] Pruebas de integración con Testcontainers
- [ ] Migrar a Java 21
- [ ] Caching con Redis (opcional)

---

### v3.0.0 (Fase 3 — Escrutinio y Auditoría)
**Cambios propuestos:**
- [ ] Escrutinio avanzado (reconteo, impugnaciones, resoluciones)
- [ ] Cadena de custodia (apertura, cierre, GPS, IP, dispositivo)
- [ ] Firma digital de actas (hash SHA-256)
- [ ] Auditoría completa con AOP
- [ ] Rate limiting en API
- [ ] MFA en autenticación (opcional)

---

### v4.0.0 (Fase 4 — Dashboard y Publicación)
**Cambios propuestos:**
- [ ] Dashboard geográfico con mapas interactivos
- [ ] Estadísticas avanzadas (histórico, tendencias, proyecciones)
- [ ] Publicación oficial de resultados (web pública)
- [ ] API pública de resultados
- [ ] Boletín electoral PDF
- [ ] Migrar Flutter a Riverpod/Bloc (opcional)

---

### v5.0.0 (Fase 5 — ERP Nacional)
**Cambios propuestos:**
- [ ] Soporte multi-elección simultánea
- [ ] Módulo financiero (gastos de campaña)
- [ ] Módulo de personal (capacitación, miembros de mesa)
- [ ] Módulo de logística (material electoral)
- [ ] Módulo jurídico (reclamos, apelaciones)
- [ ] Internacionalización (multi-idioma)
- [ ] Soporte para normativas de otros países

---

## 3. CHANGELOG

### [1.0.0] — 2026-07-20
#### Added
- Sistema base de conteo electoral funcional
- CRUD completo de geografía (zonas, provincias, cantones, parroquias, instituciones)
- CRUD de elecciones, tipos de elección, cargos, partidos
- CRUD de candidatos con lista electoral y tipo (principal/suplente)
- CRUD de mesas con asignación de usuarios
- Generación de papeletas (6 tipos de plantillas)
- Registro de votos por candidato y por papeleta
- Dashboard con gráficos Chart.js, filtros geográficos, WebSocket
- Exportación PDF y Excel
- Autenticación JWT con roles ADMIN/SUPERVISOR/MIEMBRO_MESA/OPERADOR
- App Flutter offline-first con SQLite y sincronización REST
- Votación en blanco, nulos, cierre/reapertura de mesas
- Manual de usuario PDF descargable
- Configuración del sistema (logo, APK, carrusel, permisos)
- Importación de datos desde Excel

#### Known Issues
- ddl-auto: update en lugar de Flyway (planificado para v1.1.0)
- Sin pruebas unitarias (planificado para v1.1.0)
- Auditoría manual (planificado para v1.1.0)
- Posibles N+1 queries en dashboard (requiere optimización)

---

## 4. RAMAS Y GIT FLOW

### Estructura de Ramas
```
main            → Producción (estable)
├── develop     → Integración
│   ├── feature/modulo-*     → Nuevas funcionalidades
│   ├── fix/*                → Corrección de bugs
│   └── refactor/*           → Refactorización
├── release/*   → Preparación de release
└── hotfix/*    → Corrección urgente en producción
```

### Convención de Commits
```
tipo(alcance): descripción breve

Tipos:
  feat     → Nueva funcionalidad
  fix      → Corrección de bug
  refactor → Refactorización
  test     → Pruebas
  docs     → Documentación
  style    → Formato, estilo (sin cambio lógico)
  perf     → Mejora de rendimiento
  chore    → Mantenimiento, build, dependencias

Ejemplos:
  feat(candidatos): agregar filtro por cargo
  fix(mesas): corregir cierre de acta sin votos
  refactor(votacion): unificar Voto y VotoPapeleta
  test(backend): agregar pruebas de CandidatoService
  docs(api): documentar endpoint de dashboard
```

### Política de Merge
- `feature/*` → `develop`: Pull Request con revisión
- `develop` → `release/*`: Cuando está listo para release
- `release/*` → `main`: Release final
- `hotfix/*` → `main` + `develop`: Corrección urgente
- Nunca hacer push directo a `main` o `develop`

---

## 5. DEPENDENCIAS ACTUALES

### Backend (pom.xml)
| Dependencia | Versión Actual | Propuesta | Razón |
|------------|---------------|-----------|-------|
| Java | 17 | 21 | LTS, nuevas features |
| Spring Boot | 3.2.1 | 3.3.x | Mantenimiento |
| jjwt | 0.12.3 | 0.12.x | — |
| iText | 7.2.5 | 8.x | Versión más reciente |
| Apache POI | 5.2.5 | 5.3.x | — |
| MapStruct | — | 1.5.x | Nuevo |
| Flyway | — | 9.x | Nuevo |

### Frontend (package.json)
| Dependencia | Versión Actual | Propuesta |
|------------|---------------|-----------|
| Angular | 17.3 | 18/19 |
| Bootstrap | 5.2.3 | 5.3.x |
| Chart.js | 4.4.1 | 4.x |

### Flutter (pubspec.yaml)
| Dependencia | Versión | Nota |
|------------|---------|------|
| provider | 6.x | Actual |
| sqflite | 2.x | Actual |
| connectivity_plus | 5.x | Actual |
| flutter_secure_storage | 9.x | Actual |

---

## 6. REGISTRO DE DECISIONES TÉCNICAS (ADR)

| ADR | Fecha | Decisión | Justificación |
|-----|-------|----------|---------------|
| ADR-001 | 2026-01 | DTOs separados de entidades | Evitar exponer relaciones JPA |
| ADR-002 | 2026-01 | PostgreSQL + SQLite | Offline-first + robustez |
| ADR-003 | 2026-01 | Provider en Flutter | Simple y suficiente |
| ADR-004 | 2026-01 | ddl-auto:update (temporal) | Agilidad en desarrollo |
| ADR-005 | 2026-01 | Sin MapStruct (temporal) | Simplicidad inicial |

### Nuevos ADR Propuestos
| ADR | Fecha | Decisión | Estado |
|-----|-------|----------|--------|
| ADR-006 | Pendiente | Migrar a Flyway | Planificado v1.1 |
| ADR-007 | Pendiente | Agregar MapStruct | Planificado v1.1 |
| ADR-008 | Pendiente | Migrar a Java 21 | Planificado v2.0 |
| ADR-009 | Pendiente | Migrar a Riverpod | Planificado v4.0 |
