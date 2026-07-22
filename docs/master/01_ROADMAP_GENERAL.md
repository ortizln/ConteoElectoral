# 01 — ROADMAP GENERAL DEL ERP ELECTORAL

> Plan maestro de evolución del Sistema de Conteo Electoral hacia un ERP Electoral completo.

---

## VISIÓN

Transformar el sistema actual en una plataforma capaz de administrar **todo el ciclo de un proceso electoral**, desde la configuración de la elección hasta la publicación oficial de resultados, con soporte para diferentes normativas y tipos de votación a nivel internacional.

---

## OBJETIVOS ESTRATÉGICOS

- Modelar correctamente cualquier tipo de elección (presidencial, legislativa, municipal, etc.)
- Centralizar la configuración mediante reglas de negocio parametrizables
- Soportar múltiples normativas electorales (Latinoamérica, Europa, etc.)
- Mantener compatibilidad total entre Web, API REST y Flutter Offline
- Garantizar auditoría completa y cadena de custodia
- Facilitar el desarrollo asistido por IA con documentación precisa

---

## ARQUITECTURA OBJETIVO

```
ERP Electoral
│
├── 01 Configuración Electoral    ← Tipos, reglas, plantillas, calendario
├── 02 Organizaciones Políticas   ← Partidos, movimientos, alianzas, listas
├── 03 Candidaturas               ← Binomios, principales, suplentes
├── 04 Circunscripciones          ← Nacional, provincial, cantonal, distrital
├── 05 Papeletas                  ← Núcleo del sistema (6 tipos)
├── 06 Mesas Electorales          ← Apertura, cierre, cadena de custodia
├── 07 Votación                   ← Modelo único Voto → OpciónPapeleta
├── 08 Escrutinio                 ← Reconteo, impugnaciones, resoluciones
├── 09 Dashboard                  ← Mapas, tendencias, tiempo real
├── 10 Auditoría                  ← Trazabilidad completa
├── 11 Seguridad                  ← MFA, políticas, bloqueos
├── 12 Aplicación Offline         ← Flutter offline-first
├── 13 API Pública                ← OpenAPI, rate limiting, webhooks
└── 14 Administración             ← Usuarios, roles, configuración global
```

---

## ROADMAP POR FASES

### FASE 1 — Fundación (Actual)
**Estado:** Completada parcialmente

Modelo electoral base funcional con:
- CRUD completo de geografía (zonas, provincias, cantones, parroquias, instituciones)
- CRUD de elecciones, tipos de elección, cargos, partidos
- CRUD de candidatos con lista electoral y tipo (principal/suplente)
- Generación de papeletas (6 tipos de plantillas)
- CRUD de mesas con asignación de usuarios
- Registro de votos por candidato y por papeleta
- Dashboard con gráficos Chart.js, filtros geográficos, WebSocket
- Exportación PDF y Excel
- Autenticación JWT con roles ADMIN/SUPERVISOR/MIEMBRO_MESA/OPERADOR
- App Flutter offline-first con SQLite y sincronización REST
- Votación en blanco, nulos, cierre/reapertura de mesas

**Pendientes Fase 1:**
- [ ] Reemplazar ddl-auto por Flyway
- [ ] Agregar pruebas unitarias e integración
- [ ] Agregar entity auditing completo
- [ ] Mejorar manejo de errores en Flutter

---

### FASE 2 — Configuración Electoral y Reglas
**Prioridad:** Alta

- **Motor de reglas de negocio** — sistema de reglas parametrizables para:
  - Número mínimo/máximo de candidatos por cargo
  - Validación de binomios
  - Restricciones de listas (cerradas/abiertas)
  - Cupo de género (paridad)
  - Edad mínima/máxima por cargo
  - Inhabilitaciones
- **Circunscripciones electorales** — modelo completo:
  - Asignación de cargos a circunscripciones
  - Distribución de escaños
  - Umbral electoral
- **Configuración dinámica de cargos**:
  - Cargos parametrizables por elección
  - Remuneración, período, límite de reelección
- **Calendario electoral**:
  - Etapas con fechas (inscripción, campaña, votación, escrutinio)
  - Estados automáticos según calendario
  - Alertas y notificaciones

---

### FASE 3 — Escrutinio Avanzado y Auditoría
**Prioridad:** Alta

- **Escrutinio avanzado**:
  - Reconteo de votos con registro de auditoría
  - Impugnaciones (motivo, evidencia, resolución)
  - Observaciones por mesa y por candidato
  - Resoluciones del órgano electoral
  - Acta de escrutinio oficial
- **Cadena de custodia**:
  - Registro de apertura/cierre de mesas con timestamp
  - Registro de dispositivos, IP, GPS
  - Firma digital de actas
  - Hash de integridad de datos
- **Auditoría completa** (JPA EntityListener + tabla de auditoría):
  - Cada CREATE/UPDATE/DELETE registrado
  - Valores anteriores y nuevos en JSON
  - Usuario, IP, equipo, módulo, timestamp
  - Endpoint de consulta de auditoría con filtros

---

### FASE 4 — Dashboard y Publicación
**Prioridad:** Media

- **Dashboard geográfico**:
  - Mapas interactivos (Leaflet/Mapbox)
  - Resultados por circunscripción en mapa
  - Calor de mapas por tendencia de voto
  - Zoom desde nacional hasta mesa
- **Estadísticas avanzadas**:
  - Histórico de elecciones
  - Comparativas entre elecciones
  - Tendencias por período
  - Abstención, votos válidos, nulos, blancos
  - Proyecciones y estimaciones
- **Publicación oficial de resultados**:
  - Generación de actas oficiales en PDF
  - Boletín electoral oficial (PDF/HTML)
  - API pública de resultados
  - Web de publicación (pública, sin autenticación)

---

### FASE 5 — ERP Electoral Nacional
**Prioridad:** Baja

- **Soporte multi-elección simultánea**:
  - Elecciones nacionales + locales combinadas
  - Papeletas múltiples por votante
- **Sistema de votación electrónica** (opcional):
  - Voto electrónico presencial
  - Voto electrónico remoto
  - Integración con hardware (máquinas de votación)
- **ERP completo**:
  - Módulo financiero (gastos de campaña, multas)
  - Módulo de personal (miembros de mesa, capacitación)
  - Módulo de logística (material electoral, distribución)
  - Módulo jurídico (reclamos, apelaciones)
- **Internacionalización**:
  - Soporte multi-idioma (inglés, portugués)
  - Adaptación a normativas de otros países

---

## STACK TECNOLÓGICO OBJETIVO

### Backend (Actual → Objetivo)
| Tecnología | Actual | Objetivo |
|-----------|--------|----------|
| Java | 17 | 21 |
| Spring Boot | 3.2.1 | 3.4.x |
| Spring Security | 6.x | 6.x |
| JWT | jjwt 0.12.3 | jjwt 0.12.x |
| Migraciones | ddl-auto: update | Flyway |
| MapStruct | ❌ | ✅ |
| Caching | ❌ | Redis |
| Event Bus | ❌ | RabbitMQ |
| Testing | ❌ | JUnit 5 + Testcontainers |
| CI/CD | ❌ | GitHub Actions |

### Frontend
| Tecnología | Actual | Objetivo |
|-----------|--------|----------|
| Angular | 17.3 | 18/19 |
| Signals | ❌ | ✅ (reemplazar Zone.js gradualmente) |
| State Management | servicios | Signals + NGXS/NgRx |
| SSR | ❌ | Angular Universal |
| PWA | ❌ | Service Worker |
| Testing | ❌ | Jest + Cypress |

### Móvil
| Tecnología | Actual | Objetivo |
|-----------|--------|----------|
| Flutter | 3.x | 3.x+ |
| Estado | Provider | Riverpod / Bloc |
| Local DB | sqflite | drift / ObjectBox |
| Sync | Manual | Event-driven |
| Testing | ❌ | flutter_test + integration_test |

---

## DEPENDENCIAS ENTRE MÓDULOS

```
01 Configuración ──► 02 Organizaciones ──► 03 Candidaturas
       │                    │
       ▼                    ▼
04 Circunscripciones    05 Papeletas
       │                    │
       ▼                    ▼
06 Mesas ◄──────── 07 Votación
       │                    │
       ▼                    ▼
08 Escrutinio ──► 09 Dashboard ──► Publicación
       │
       ▼
10 Auditoría ◄── 11 Seguridad
```

---

## HITOS Y VERSIONES

| Versión | Fase | Hito | Fecha Estimada |
|---------|------|------|---------------|
| v1.0 | Fase 1 | MVP funcional (completado) | — |
| v2.0 | Fase 2 | Configuración + Reglas | TBD |
| v3.0 | Fase 3 | Escrutinio + Auditoría | TBD |
| v4.0 | Fase 4 | Dashboard + Publicación | TBD |
| v5.0 | Fase 5 | ERP Electoral Nacional | TBD |

---

## MÉTRICAS DE ÉXITO

- **Cobertura de pruebas** > 80%
- **Tiempo de respuesta API** < 200ms (p95)
- **Sincronización offline** < 5 segundos
- **Auditoría** 100% de operaciones críticas registradas
- **Disponibilidad** 99.9%
- **Usuarios concurrentes** soporte para > 10,000
