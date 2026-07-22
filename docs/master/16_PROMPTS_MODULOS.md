# 16 — PROMPTS POR MÓDULO

> Prompts específicos para cada módulo del ERP Electoral, listos para copiar y pegar.

---

## MÓDULO 01 — CONFIGURACIÓN ELECTORAL

```
Desarrolla el módulo Configuración Electoral usando Spring Boot, Angular, Flutter y PostgreSQL aplicando Clean Architecture, DDD y SOLID.

Debe permitir administrar:
- Tipos de elección (CRUD)
- Tipos de votación (configurables)
- Reglas de negocio (motor de reglas básico)
- Plantillas de papeleta (6 tipos)
- Estados de elección con calendario
- Validaciones de configuración

Consideraciones:
- Una elección tiene un tipo, fecha, estado, y múltiples cargos
- Los cargos se asignan a tipos de elección con orden
- Cada cargo tiene un tipo de votación
- El motor de reglas debe validar la consistencia de la configuración

Antes de implementar, analiza:
1. Módulo TipoEleccion existente (entidad, service, controller)
2. Módulo Cargo existente
3. Relación TipoEleccionCargo existente
4. Sistema de roles y permisos
```

---

## MÓDULO 02 — ORGANIZACIONES POLÍTICAS

```
Crear módulo completo CRUD de organizaciones políticas con auditoría y API REST.

Debe manejar:
- Partidos políticos (con logo, color, siglas)
- Movimientos políticos
- Alianzas y coaliciones
- Listas electorales (vinculadas a partido + cargo + circunscripción)
- Historial de cambios con auditoría

Consideraciones:
- Un partido pertenece a una elección
- Una alianza agrupa múltiples partidos
- Las listas electorales vinculan partido, cargo y circunscripción
- Los candidatos se agrupan en listas

Analiza primero la entidad Partido, ListaElectoral y sus relaciones.
```

---

## MÓDULO 03 — CANDIDATURAS

```
Mejorar el módulo de candidaturas para soportar:

- Binomios (principal + suplente como fórmula)
- Principales y suplentes por cargo
- Orden en lista (arrastre)
- Fotografía de candidato
- Validaciones de negocio:
  * Edad mínima por cargo
  * Cupo de género (paridad 50/50)
  * Unicidad de cédula por elección
  * No duplicidad de cargos

Requisitos técnicos:
- CRUD completo con paginación, búsqueda, filtros
- Exportación PDF y Excel
- Auditoría de cambios
- Sincronización con app móvil (offline)

Analiza la entidad Candidato actual y su relación con Partido, Cargo, ListaElectoral.
```

---

## MÓDULO 04 — PAPELETAS

```
Rediseñar el módulo de papeletas como núcleo del sistema electoral.

Debe soportar 6 tipos de papeleta:
1. Lista Cerrada — vota por una lista completa
2. Lista Abierta — vota por lista + candidato preferido
3. Individual — vota por un candidato específico
4. Plurinominal — vota por N candidatos (máximo configurable)
5. Preferencial — ordena candidatos por preferencia
6. Mixta — combinación de lista cerrada + individual

Cada papeleta debe tener:
- Título
- Color (#RRGGBB) para identificación visual
- Cantidad máxima de votos (plurinominal)
- Opciones derivadas de listas/candidatos activos
- Orden de aparición

Funcionalidades:
- Generación automática de papeletas por elección
- Regeneración al cambiar candidatos
- Visualización previa (preview)
- Exportación a PDF

Analiza las entidades Papeleta, OpcionPapeleta, PlantillaPapeleta existentes.
```

---

## MÓDULO 05 — MESAS

```
Mejorar el módulo de mesas electorales con:

Funcionalidades actuales a mantener:
- CRUD completo
- Asignación de usuarios a mesas
- Cierre y reapertura de actas
- Exportación PDF/Excel

Nuevas funcionalidades:
- Apertura de mesa con timestamp y registro
- Cadena de custodia (registro de cada manipulación)
- GPS de ubicación de la mesa
- IP y dispositivo de registro
- Firma digital de actas (hash SHA-256)
- Historial de estado (abierta, cerrada, reabierta, finalizada)

Consideraciones:
- Una mesa pertenece a una elección y una institución educativa
- Una mesa puede tener múltiples usuarios asignados
- El cierre de acta bloquea el registro de votos
- La reapertura requiere autorización de ADMIN

Analiza la entidad Mesa, MesaUsuario y los endpoints actuales.
```

---

## MÓDULO 06 — VOTACIÓN

```
Refactorizar el sistema de votación para unificar Voto y VotoPapeleta.

Modelo objetivo único:
Voto → OpcionPapeleta (eliminar distinción entre voto por candidato y voto por papeleta)

Una vez unificado, soportar:
- Voto por candidato individual
- Voto por lista completa
- Voto plurinominal (múltiples candidatos)
- Voto nulo
- Voto en blanco (a nivel de mesa)
- Registro offline-first (app móvil)

Requisitos:
- Los votos se registran contra opciones de papeleta
- La mesa debe estar abierta para registrar votos
- Una vez cerrada el acta, no se pueden registrar más votos
- Los votos nulos y en blanco no se asignan a ningún candidato
- Sincronización bidireccional con app móvil

Analiza las entidades Voto, VotoPapeleta, OpcionPapeleta actuales.
```

---

## MÓDULO 07 — ESCRUTINIO

```
Desarrollar el módulo de escrutinio avanzado con:

- Reconteo de votos:
  * Solicitud de reconteo con motivo
  * Aprobación por supervisor
  * Registro de nuevo conteo
  * Comparación con conteo original
  * Acta de reconteo

- Impugnaciones:
  * Registro de impugnación (candidato, mesa, motivo)
  * Evidencia adjunta (imagen, documento)
  * Resolución (aprobada/rechazada)
  * Impacto en resultados

- Observaciones:
  * Por mesa (incidencias durante la votación)
  * Por candidato (objeciones)
  * Registro cronológico

- Resoluciones:
  * Del órgano electoral
  * Modificación de resultados si aplica
  * Respaldo legal

Consideraciones de seguridad:
- Solo ADMIN y SUPERVISOR pueden gestionar escrutinio
- Cada operación queda registrada en auditoría
- Los cambios en resultados requieren justificación
```

---

## MÓDULO 08 — DASHBOARD

```
Mejorar el dashboard de resultados con:

Funcionalidades actuales a mantener:
- Gráficos Chart.js
- Filtros geográficos (Zona → Provincia → Cantón → Parroquia → Institución → Mesa)
- Filtros por cargo y partido
- WebSocket en tiempo real
- Exportación PDF/Excel
- Modal de detalle por candidato
- Reapertura de mesas

Nuevas funcionalidades:
- Mapa geográfico interactivo (Leaflet/Mapbox)
- Calor de mapas por tendencia de voto
- Comparativas entre elecciones (histórico)
- Tendencias por hora/día
- Estadísticas avanzadas:
  * Participación por circunscripción
  * Votos válidos, nulos, blancos
  * Abstencionismo
  * Proyecciones basadas en datos parciales
- Publicación oficial de resultados:
  * Boletín electoral PDF
  * Web pública sin autenticación
  * API pública de consulta

Analiza el DashboardComponent actual y el endpoint /api/dashboard/eleccion/{id}.
```

---

## MÓDULO 09 — AUDITORÍA

```
Implementar auditoría completa del sistema.

Debe registrar automáticamente:
- Toda creación, modificación y eliminación de datos
- Inicios de sesión exitosos y fallidos
- Intentos de acceso no autorizado
- Cierre y reapertura de actas
- Cambios en configuración del sistema
- Exportación de datos

Cada registro debe incluir:
- Usuario
- Fecha y hora
- IP y equipo
- Módulo
- Acción (CREATE, UPDATE, DELETE, LOGIN, EXPORT)
- ID del registro afectado
- Valor anterior (JSON)
- Valor nuevo (JSON)
- Hash de integridad (SHA-256)

Implementación:
- JPA EntityListener automático
- AOP con anotación @Auditable
- Endpoint de consulta con filtros
- Retención configurable (30 días por defecto)
- Exportación de auditoría

Analiza la entidad Auditoria existente y los servicios actuales.
```

---

## MÓDULO 10 — SEGURIDAD

```
Mejorar la seguridad del sistema con:

- Autenticación:
  * MFA (código SMS o email)
  * Caducidad de sesión configurable
  * Políticas de contraseña (complejidad, caducidad, historial)
  * Bloqueo por intentos fallidos

- Autorización:
  * Permisos dinámicos por rol (tabla roles_permisos)
  * Matriz de permisos por módulo (V/C/E/D)
  * Auditoría de acceso

- API Security:
  * Rate limiting por IP
  * Headers de seguridad (CSP, HSTS, X-Frame-Options)
  * Validación de Content-Type
  * Tamaño máximo de request

- Frontend:
  * Timeout de sesión inactiva
  * Confirmación de acciones sensibles
  * Protección de rutas por rol

Analiza la configuración de seguridad actual (SecurityConfig, JwtService, Roles).
```

---

## MÓDULO 11 — ADMINISTRACIÓN

```
Centralizar la administración del sistema en un solo módulo:

- Usuarios:
  * CRUD completo
  * Asignación de rol
  * Reset de contraseña
  * Auditoría de actividad

- Roles y permisos:
  * CRUD de roles
  * Matriz de permisos (V/C/E/D por módulo)
  * Asignación a usuarios

- Configuración global:
  * Datos de la organización
  * Logo institucional
  * APK de la app móvil
  * Manual de usuario PDF

- Importación de datos:
  * Desde Excel con validación
  * Mapeo de columnas
  * Reporte de errores

- Carrusel de login:
  * CRUD de imágenes
  * Orden y estado activo

Analiza los componentes existentes en la página de Configuración.
```

---

## MÓDULO 12 — SINCRONIZACIÓN MÓVIL

```
Mejorar la sincronización offline de la app Flutter:

Funcionalidades actuales:
- Descarga inicial de datos (elecciones, partidos, cargos, candidatos, recintos, mesas)
- Registro de votos offline con cola de sincronización
- Sincronización automática al recuperar conexión

Mejoras necesarias:
- Sincronización bidireccional (subir votos + bajar actualizaciones)
- Resolución de conflictos (last-write-wins)
- Estado de sincronización por registro
- Indicador de progreso
- Reintento con backoff exponencial
- Sincronización selectiva (solo datos modificados)
- Compresión de datos para reducir transferencia

Analiza AppProvider, ApiService, DatabaseHelper actuales.
```
