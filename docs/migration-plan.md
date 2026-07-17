# Plan de Migración al Modelo CNE (V2)

## Resumen

Migración del modelo electoral actual al estándar del Consejo Nacional Electoral (CNE) de Ecuador, introduciendo el concepto de **Papeletas** y **circunscripciones**.

## Cambios en el Modelo de Datos

### Nuevas Entidades
| Entidad | Descripción |
|---|---|
| `tipo_eleccion` | Catálogo: GENERALES, SECCIONALES, etc. |
| `tipo_circunscripcion` | Catálogo: NACIONAL, PROVINCIAL, CANTONAL, URBANA, RURAL, PARROQUIAL, DISTRITAL, EXTERIOR |
| `tipo_eleccion_cargo` | Puente: qué cargos aplican a cada tipo de elección |
| `papeleta` | Una papeleta por cargo × circunscripción |
| `opcion_papeleta` | Opción en la papeleta (candidato, partido, nulo, blanco) |
| `voto_papeleta` | Voto registrado sobre una opción de papeleta |

### Entidades Modificadas
| Entidad | Campos Nuevos |
|---|---|
| `elecciones` | `tipo_eleccion_id` |
| `cargos` | `tipo_votacion` (enum INDIVIDUAL/LISTA), `tipo_circunscripcion_id`, `cantidad_dignidades`, `max_candidatos_lista`, `activo` |
| `candidatos` | `provincia_id`, `canton_id`, `parroquia_id`, `tipo_circunscripcion_id`, `posicion_lista`, `orden_aparicion`, `principal`, `activo` |

### Entidades No Modificadas
- `mesas`, `instituciones_educativas`, `zonas`, `provincias`, `cantones`, `parroquias`
- `partidos_politicos`, `usuarios`, `roles`, `auditoria`

## Flujo de Migración

### Fase 1: Estructura (ejecutar migration-v2.sql)
1. Crear tablas catálogo (`tipo_eleccion`, `tipo_circunscripcion`)
2. Poblar catálogos con datos del CNE
3. Agregar columnas a `cargos`, `candidatos`, `elecciones`
4. Migrar datos existentes según reglas de negocio
5. Crear tablas nuevas (`papeleta`, `opcion_papeleta`, `voto_papeleta`)
6. Asignar `tipo_eleccion` a elecciones existentes

### Fase 2: Generación de Papeletas (ejecutar después de Fase 1)
1. Llamar `POST /api/papeletas/generar/{eleccionId}` para cada elección
2. Verificar que se generaron las papeletas correctas
3. Las papeletas existentes ya usan el nuevo modelo

### Fase 3: Migración de Votos (opcional, si se requieren datos históricos)
- Los votos en tabla `votos` se mantienen como histórico
- Nuevos votos se registran en `voto_papeleta`
- Opcionalmente, se puede migrar votos existentes mediante script

## Conservación de Datos Existentes

- La tabla `votos` actual **NO se elimina** — sigue funcionando para el dashboard legacy
- Todos los endpoints actuales (`/api/votos/*`) permanecen intactos
- Nuevos endpoints bajo `/api/voto-papeleta/*` para el nuevo modelo
- El dashboard puede mostrar datos de ambos modelos o migrarse incrementalmente

## API Endpoints Nuevos

```
POST   /api/papeletas/generar/{eleccionId}   → Generar papeletas automáticamente
POST   /api/papeletas/regenerar/{eleccionId} → Regenerar (borrar y crear)
GET    /api/papeletas/eleccion/{eleccionId}  → Listar papeletas de una elección
GET    /api/papeletas/{id}                    → Obtener papeleta con opciones
POST   /api/voto-papeleta                     → Registrar voto en papeleta
GET    /api/voto-papeleta/mesa/{mesaId}       → Votos de una mesa (nuevo modelo)
```

## Rollback

Si algo falla:
1. Ejecutar `ROLLBACK` en la transacción SQL (todo está en `BEGIN...COMMIT`)
2. Revertir cambios en entidades Java
3. Eliminar tablas nuevas si es necesario

## Verificación

1. `GET /api/elecciones` → debe incluir `tipoEleccionId`
2. `GET /api/cargos/por-eleccion/{id}` → debe incluir `tipoVotacion`, `tipoCircunscripcion`
3. `POST /api/papeletas/generar/{id}` → debe crear N papeletas según configuración
4. `GET /api/papeletas/eleccion/{id}` → debe devolver papeletas con opciones
