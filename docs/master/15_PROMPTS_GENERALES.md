# 15 — PROMPTS GENERALES PARA IA

> Prompts reutilizables para diferentes tareas de desarrollo asistido por IA en el ERP Electoral.

---

## 1. PROMPT: ANALIZAR ARQUITECTURA EXISTENTE

```
Eres un Arquitecto Senior de Software especializado en Spring Boot, Angular y Flutter.

Analiza la arquitectura del sistema electoral en los siguientes archivos:

[LISTA DE ARCHIVOS]

Por favor, responde en este orden:
1. Estructura general del módulo
2. Patrones utilizados
3. Problemas detectados (acoplamiento, violaciones SOLID, N+1, etc.)
4. Recomendaciones de mejora
5. Prioridad de cada recomendación (ALTA/MEDIA/BAJA)

NO escribas código. Solo análisis.
```

---

## 2. PROMPT: CREAR NUEVO MÓDULO CRUD

```
Eres un Arquitecto Senior de Software.

Necesito crear un nuevo módulo CRUD para [NOMBRE MÓDULO] en el ERP Electoral.

Requisitos:
- Entidad: [DESCRIPCIÓN]
- Campos: [LISTA DE CAMPOS]
- Relaciones: [RELACIONES CON OTRAS ENTIDADES]
- Roles permitidos: [LISTA DE ROLES]

Antes de escribir código:
1. Analiza la estructura de módulos existentes (ej: Candidatos, Partidos) como referencia
2. Identifica las entidades, relaciones y tabla correspondiente
3. Propón la estructura del DTO Request/Response
4. Diseña el service con operaciones CRUD + validaciones + auditoría
5. Diseña el controller con paginación, filtros, exportación PDF/Excel
6. Diseña el componente Angular (standalone) con tabla, modal, formulario reactivo
7. Diseña el modelo Flutter con fromJson/toJson/fromMap/toMap
8. Diseña la migración Flyway
9. Espera confirmación antes de implementar

Formato de respuesta:
1. Análisis del módulo existente
2. Problemas detectados
3. Propuesta de solución
4. Arquitectura
5. Cambios BD
6. Backend
7. Frontend
8. Flutter
9. Riesgos
10. Checklist
```

---

## 3. PROMPT: CORREGIR BUG

```
Eres un Arquitecto Senior de Software.

Reporto un bug en el ERP Electoral:

Descripción: [DESCRIPCIÓN DEL BUG]
Pasos para reproducir: [PASOS]
Comportamiento esperado: [QUÉ DEBERÍA PASAR]
Comportamiento actual: [QUÉ PASA]
Archivos relevantes: [ARCHIVOS]

Antes de proponer la solución:
1. Analiza el flujo completo del bug
2. Identifica la causa raíz
3. Propón 2-3 soluciones alternativas
4. Recomienda la mejor con justificación
5. Espera confirmación antes de implementar

NO modificues código hasta tener confirmación.
```

---

## 4. PROMPT: AGREGAR NUEVO ENDPOINT

```
Eres un Arquitecto Senior de Software.

Necesito agregar un nuevo endpoint en el ERP Electoral:

Módulo: [NOMBRE MÓDULO]
Método HTTP: [GET/POST/PUT/DELETE]
Ruta: /api/[ruta]
Descripción: [DESCRIPCIÓN]
Parámetros: [PARÁMETROS DE ENTRADA]
Respuesta esperada: [DESCRIPCIÓN DE RESPUESTA]
Rol requerido: [ROL]

Antes de implementar:
1. Revisa el controlador existente
2. Revisa el service existente
3. Determina si necesita nueva lógica de negocio o consulta
4. Considera auditoría si es una operación de escritura
5. Implementa con los estándares del proyecto

Sigue la estructura estándar del proyecto para endpoints.
```

---

## 5. PROMPT: CREAR PANTALLA FLUTTER

```
Eres un Arquitecto Senior de Software especializado en Flutter.

Necesito crear una nueva pantalla en la app Flutter del ERP Electoral:

Pantalla: [NOMBRE]
Funcionalidad: [DESCRIPCIÓN]
Datos requeridos: [QUÉ DATOS NECESITA]
API endpoints: [ENDPOINTS RELACIONADOS]
Estado offline: [SÍ/NO — cómo manejar sin conexión]

Antes de implementar:
1. Revisa el diseño de pantallas existentes (HomeScreen, VotacionScreen)
2. Identifica si necesita nuevo provider o estado local
3. Diseña el widget tree
4. Considera estados: loading, empty, error, success
5. Implementa con Provider + Material 3

Sigue la arquitectura offline-first: guardar en SQLite local primero.
```

---

## 6. PROMPT: REVISAR CÓDIGO

```
Eres un Arquitecto Senior de Software. Realiza una revisión de código (code review) de los siguientes archivos:

[ARCHIVOS]

Enfócate en:
1. Violaciones de principios SOLID
2. Problemas de rendimiento (N+1 queries, consultas innecesarias)
3. Vulnerabilidades de seguridad
4. Código duplicado
5. Falta de manejo de errores
6. Falta de auditoría en operaciones de escritura
7. Estilo y convenciones del proyecto
8. Testing: puntos difíciles de probar

Para cada issue identificado:
- Severidad: CRÍTICA/ALTA/MEDIA/BAJA
- Archivo y línea
- Descripción del problema
- Solución recomendada
```

---

## 7. PROMPT: GENERAR MIGRACIÓN FLYWAY

```
Eres un Arquitecto Senior de Software.

Necesito generar una migración Flyway para:

Cambio: [DESCRIPCIÓN DEL CAMBIO]
Tablas afectadas: [TABLAS]
Nuevas columnas: [COLUMNAS]
Nuevas tablas: [TABLAS]
Datos semilla: [DATOS A INSERTAR]

Requisitos:
1. Usar naming V{major}.{minor}.{patch}__{descripcion}.sql
2. Incluir IF NOT EXISTS para idempotencia
3. Incluir DOWN comentado para rollback
4. Incluir índices necesarios
5. Ser backward compatible (no eliminar columnas existentes)
6. Incluir constraints con nombres descriptivos

Sigue los estándares definidos en 12_ESTANDARES_SQL.md
```

---

## 8. PROMPT: EXPORTAR DATOS A PDF/EXCEL

```
Eres un Arquitecto Senior de Software.

Necesito agregar exportación a [PDF/EXCEL] para el módulo [NOMBRE]:

Datos a exportar: [CAMPOS]
Formato: [PDF/EXCEL/AMBOS]
Filtros aplicables: [FILTROS]
Encabezado del reporte: [TÍTULO, LOGO, FECHA]

Requisitos:
1. Usar iText 7 para PDF
2. Usar Apache POI para Excel
3. Seguir el patrón Template Method de ExportService existente
4. Incluir estilos: colores, bordes, encabezados
5. Response con Content-Disposition para descarga
```

---

## 9. PROMPT: SINCRONIZACIÓN MÓVIL

```
Eres un Arquitecto Senior de Software especializado en Flutter.

Necesito agregar un nuevo recurso a la sincronización offline de la app móvil:

Recurso: [NOMBRE]
Endpoint: GET /api/[endpoint]
Modelo: [CAMPOS]
Relación con otros datos: [RELACIONES]

Requisitos:
1. Agregar modelo Dart con fromJson/toJson/fromMap/toMap
2. Agregar tabla en SQLite (con migración si es necesario)
3. Agregar método en ApiService para GET
4. Agregar método en DatabaseHelper para save/get
5. Agregar paso en AppProvider.descargarDatos()
6. Manejar error si no hay conexión

Sigue la arquitectura offline-first existente.
```

---

## 10. PROMPT: MEJORAR RENDIMIENTO

```
Eres un Arquitecto Senior de Software. Necesito optimizar el rendimiento de:

Módulo: [NOMBRE]
Síntoma: [DESCRIPCIÓN DEL PROBLEMA DE RENDIMIENTO]
Endpoints lentos: [ENDPOINTS]
Consultas lentas: [QUERIES]

Antes de implementar cambios:
1. Analiza las consultas actuales (explica plan)
2. Identifica N+1 queries
3. Identifica índices faltantes
4. Propone soluciones (JOIN FETCH, índices, caching, paginación)
5. Mide el impacto esperado

Prioriza soluciones por impacto/ esfuerzo.
```

---

## 11. PROMPT: CONFIGURAR SEGURIDAD

```
Eres un Arquitecto Senior de Software especializado en seguridad.

Necesito configurar seguridad para:

Nuevo endpoint: [MÉTODO] /api/[ruta]
Rol requerido: [ROL]
Tipo de operación: [LECTURA/ESCRITURA/ADMIN]

Verifica:
1. @PreAuthorize correcto en controller
2. JwtAuthenticationFilter procesa el token
3. SecurityConfig tiene la ruta en la config de authorizeHttpRequests
4. CORS configurado
5. Validaciones de entrada en backend
6. Auditoría si es escritura
```

---

## 12. PROMPT: ACTUALIZAR DOCUMENTACIÓN

```
Eres un Arquitecto Senior de Software.

Actualiza la documentación del módulo [NOMBRE] después de los siguientes cambios:

[DESCRIPCIÓN DE CAMBIOS REALIZADOS]

Genera o actualiza:
1. README del módulo con cambios realizados
2. Tablas nuevas/modificadas
3. Endpoints nuevos/modificados
4. Flujo de operación
5. Pendientes conocidos
```

---

## 13. PROMPT: REFACTORIZAR MÓDULO

```
Eres un Arquitecto Senior de Software.

Necesito refactorizar el módulo [NOMBRE] por las siguientes razones:

[PROBLEMAS DETECTADOS]

Restricciones:
- No romper compatibilidad con frontend
- No cambiar endpoints existentes
- Auditoría debe mantenerse
- Pruebas deben seguir funcionando

Propuesta de refactorización:
1. Análisis del código actual
2. Problemas identificados
3. Arquitectura objetivo
4. Plan de migración (pasos)
5. Riesgos y mitigación
6. Impacto en otros módulos

NO implementes hasta recibir confirmación.
```

---

## 14. PROMPT: PREPARAR DEMO

```
Eres un Arquitecto Senior de Software.

Necesito preparar datos de demostración para el ERP Electoral:

Cantidad de registros por tabla:
- Elecciones: 2
- Partidos: 5 por elección
- Cargos: 4 por elección
- Candidatos: 8 por partido
- Mesas: 10 por elección
- Votos: aleatorio por mesa

Genera un script SQL con datos de prueba realistas:
- Nombres de personas reales (ficticios)
- Partidos con colores representativos
- Cargos típicos: Presidente, Vicepresidente, Alcalde, Concejal
- Votos con distribución variada
- Al menos 1 mesa con acta cerrada
- Al menos 1 mesa con algunos votos
```

---

## 15. PROMPT: DIAGNÓSTICO DE ERROR

```
Eres un Arquitecto Senior de Software. Ayúdame a diagnosticar el siguiente error:

Error: [MENSAJE DE ERROR]
Stack trace: [STACK TRACE]
Contexto: [QUÉ ESTABA HACIENDO EL USUARIO]
Endpoints involucrados: [ENDPOINTS]
Archivos relacionados: [ARCHIVOS]

Por favor:
1. Analiza la causa raíz probable
2. Propón 3 posibles causas ordenadas por probabilidad
3. Para cada causa, sugiere cómo verificarla
4. Una vez identificada la causa, propón la solución
5. Sugiere cómo prevenir este error en el futuro
```
