# ERP Electoral — Biblioteca Maestra de Desarrollo

> Biblioteca completa de documentación técnica para el desarrollo del ERP Electoral asistido por IA.

---

## Estructura de la Biblioteca

```
docs/master/
│
├── 00_DESARROLLO.md          ← REGLAS MAESTRAS — Copiar antes de cada módulo
├── 01_ROADMAP_GENERAL.md     ← Roadmap y plan de evolución
├── 02_ARQUITECTURA.md        ← Arquitectura del sistema (capas, patrones, flujos)
├── 03_MODELO_BD.md           ← Modelo de base de datos completo (28 tablas)
├── 04_REGLAS_NEGOCIO.md      ← Reglas de negocio electoral parametrizables
├── 05_BACKEND_GUIDE.md       ← Guía de desarrollo backend (Spring Boot)
├── 06_FRONTEND_GUIDE.md      ← Guía de desarrollo frontend (Angular)
├── 07_FLUTTER_GUIDE.md       ← Guía de desarrollo móvil (Flutter)
├── 08_SEGURIDAD.md           ← Seguridad (JWT, roles, CORS, validaciones)
├── 09_AUDITORIA.md           ← Módulo de auditoría (trazabilidad completa)
├── 10_DEVOPS.md              ← DevOps, despliegue, Docker, CI/CD
├── 11_ESTANDARES_API.md      ← Estándares de API REST
├── 12_ESTANDARES_SQL.md      ← Estándares de SQL y migraciones
├── 13_ESTANDARES_UI.md       ← Estándares de UI/UX
├── 14_TESTING.md             ← Estrategia de pruebas
├── 15_PROMPTS_GENERALES.md   ← Prompts reutilizables para IA
├── 16_PROMPTS_MODULOS.md     ← Prompts específicos por módulo
├── 17_CHECKLISTS.md          ← Checklists de verificación
├── 18_VERSIONADO.md          ← Versionado, changelog y ADRs
└── README.md                 ← Este archivo
```

---

## Cómo usar esta biblioteca

### Antes de comenzar un nuevo módulo
1. Copiar `00_DESARROLLO.md` como contexto inicial de la IA
2. Leer `01_ROADMAP_GENERAL.md` para entender la fase actual
3. Leer `02_ARQUITECTURA.md` para conocer la arquitectura
4. Leer `16_PROMPTS_MODULOS.md` y elegir el prompt del módulo

### Durante el desarrollo
- Referencia rápida: `05_BACKEND_GUIDE.md`, `06_FRONTEND_GUIDE.md`, `07_FLUTTER_GUIDE.md`
- Estándares: `11_ESTANDARES_API.md`, `12_ESTANDARES_SQL.md`, `13_ESTANDARES_UI.md`
- Seguridad y auditoría: `08_SEGURIDAD.md`, `09_AUDITORIA.md`

### Al finalizar un módulo
- Verificar con `17_CHECKLISTS.md`
- Ejecutar pruebas según `14_TESTING.md`
- Actualizar `18_VERSIONADO.md` con los cambios

### Para debugging o mejoras
- Usar prompts de `15_PROMPTS_GENERALES.md`

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Spring Boot | 3.2.1+ |
| | Java | 17+ |
| | JPA / Hibernate | 6.x |
| | PostgreSQL | 18 |
| | Flyway | (planificado) |
| Frontend | Angular | 17.3+ |
| | Bootstrap | 5.2.3 |
| | Chart.js | 4.4.x |
| Mobile | Flutter | 3.x |
| | Provider | 6.x |
| | SQLite | 2.x |
| Infra | Docker | (planificado) |

---

## Estado del Proyecto

**Versión actual:** v1.0.0 (MVP funcional)

**Módulos completados:**
- ✅ Geografía (Zonas, Provincias, Cantones, Parroquias, Instituciones)
- ✅ Configuración Electoral (Tipos de Elección, Cargos, Circunscripciones)
- ✅ Partidos, Listas Electorales, Candidatos
- ✅ Papeletas (6 tipos de plantillas)
- ✅ Mesas, Asignación de Usuarios
- ✅ Votación (Candidato + Papeleta)
- ✅ Dashboard (gráficos, filtros, WebSocket)
- ✅ Exportación PDF/Excel
- ✅ Autenticación JWT (4 roles)
- ✅ App Móvil Flutter (offline-first)
- ✅ Manual de Usuario PDF
- ✅ Configuración del Sistema

**Próximos módulos (v1.1.0):**
- 🔄 Migración a Flyway
- 🔄 Pruebas unitarias
- 🔄 Auditoría automática
- 🔄 MapStruct

---

## Datos de Conexión

| Recurso | Valor |
|---------|-------|
| Backend | `http://localhost:8081` |
| Frontend (dev) | `http://localhost:4200` |
| Swagger | `http://localhost:8081/swagger-ui.html` |
| PostgreSQL | `192.168.100.215:5432` |
| BD name | `conteo_electoral` |
| Login admin | `admin / admin123` |

---

## Documentación Relacionada

| Archivo | Descripción |
|---------|-------------|
| `docs/resumen-sistema.md` | Resumen completo del sistema actual |
| `docs/manual-usuario.md` | Manual de usuario en formato markdown |
| `docs/ERP_Electoral_Roadmap_Maestro.md` | Roadmap maestro original |
| `docs/migration-v2.sql` | Migración a modelo v2 (lista_id en candidatos) |
| `docs/migration-v3.sql` | Migración a modelo v3 (papeletas, colores) |
