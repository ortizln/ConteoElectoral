# 04 — REGLAS DE NEGOCIO ELECTORAL

> Documento de reglas de negocio del ERP Electoral, parametrizables y configurables.

---

## 1. INTRODUCCIÓN

El ERP Electoral debe ser configurable para adaptarse a diferentes normativas electorales.  
Las reglas de negocio deben estar centralizadas en un **Motor de Reglas** y no dispersas en el código.

---

## 2. TIPOS DE VOTACIÓN

| Tipo | Descripción | Comportamiento |
|------|-------------|----------------|
| **INDIVIDUAL** | Voto por un solo candidato | 1 voto por cargo, selección única |
| **LISTA** | Voto por una lista cerrada | Voto para toda la lista en orden |
| **LISTA_ABIERTA** | Voto por lista con preferencia | Voto a lista + preferencia por candidato |
| **PLURINOMINAL** | Voto por múltiples candidatos | N votos (cantidad_max_votos), puede ser entre o dentro de listas |
| **PREFERENCIAL** | Voto preferencial dentro de lista | Vota por lista pero ordena preferencias |
| **MIXTO** | Combinación de tipos | Parte individual + parte lista |

### Reglas por Tipo de Votación
```json
{
  "INDIVIDUAL": {
    "maxVotosPorCargo": 1,
    "permiteLista": false,
    "permitePreferencia": false,
    "validacion": "Un solo candidato seleccionado"
  },
  "LISTA": {
    "maxVotosPorCargo": 1,
    "permiteLista": true,
    "permitePreferencia": false,
    "validacion": "Selecciona una lista completa"
  },
  "PLURINOMINAL": {
    "maxVotosPorCargo": "configurable",
    "permiteLista": true,
    "permitePreferencia": true,
    "validacion": "Máximo N votos, puede combinar listas"
  },
  "PREFERENCIAL": {
    "maxVotosPorCargo": 1,
    "permiteLista": true,
    "permitePreferencia": true,
    "validacion": "Lista + orden de preferencia"
  }
}
```

---

## 3. TIPOS DE CIRCUNSCRIPCIÓN

| Circunscripción | Ámbito | Aplica a Cargos |
|----------------|--------|-----------------|
| NACIONAL | Todo el país | Presidencial, parlamentario nacional |
| PROVINCIAL | Provincia | Gobernador, diputado provincial |
| DISTRITAL | Distrito electoral | Diputado distrital |
| CANTONAL | Cantón | Alcalde, concejal |
| PARROQUIAL | Parroquia | Presidente de junta parroquial |
| ZONAL | Zona electoral | Representante zonal |
| EXTRANJERO | Voto en exterior | Representante de migrantes |
| RURAL | Zona rural | Representante rural |

### Reglas de Circunscripción
- Un cargo pertenece a UNA circunscripción
- Una circunscripción puede tener MÚLTIPLES cargos
- La asignación de escaños depende del tipo de circunscripción
- Cada circunscripción puede tener un umbral electoral diferente

---

## 4. ORGANIZACIONES POLÍTICAS

### 4.1 Tipos de Organización
| Tipo | Descripción |
|------|-------------|
| **PARTIDO** | Organización política permanente |
| **MOVIMIENTO** | Organización política en formación |
| **ALIANZA** | Coalición temporal de partidos/movimientos |
| **LISTA INDEPENDIENTE** | Candidatura sin afiliación partidista |

### 4.2 Reglas
- Un partido puede participar en múltiples elecciones
- Una alianza agrupa múltiples partidos bajo una sola lista
- Los movimientos tienen requisitos diferentes (menos firmas, etc.)
- Cada organización tiene un color representativo (#RRGGBB)
- Las alianzas pueden tener un nombre y logo conjunto

---

## 5. CANDIDATURAS

### 5.1 Tipos de Candidato
| Tipo | Descripción |
|------|-------------|
| **PRINCIPAL** | Candidato titular |
| **SUPLENTE** | Reemplazo del principal |
| **BINOMIO** | Fórmula (presidente + vicepresidente) |

### 5.2 Reglas de Candidatura
- Todo candidato pertenece a un partido y cargo
- Todo candidato puede pertenecer a una lista electoral
- Un candidato no puede postularse a dos cargos en la misma elección
- Un candidato no puede estar en dos listas diferentes
- La cédula debe ser única por elección
- Edad mínima requerida varía por cargo (configurable)
- Cupo de género: mínimo 50% de candidaturas para cada género (configurable)
- Binomios: el principal y suplente forman una fórmula inseparable
- Orden en lista: determina la posición en la papeleta

### 5.3 Validaciones
```java
public interface CandidatoValidator {
  void validarEdad(Candidato candidato, Cargo cargo);
  void validarCupoGenero(List<Candidato> candidatos, Cargo cargo);
  void validarUnicidad(Candidato candidato, Eleccion eleccion);
  void validarBinomio(Candidato principal, Candidato suplente);
  void validarInhabilitaciones(Candidato candidato);
}
```

---

## 6. PAPELETAS

### 6.1 Tipos de Papeleta (según plantilla)
| Plantilla | Descripción |
|-----------|-------------|
| **Lista Cerrada** | Muestra partidos/logos, vota por lista completa |
| **Lista Abierta** | Muestra lista + candidatos, puede marcar preferencia |
| **Individual** | Lista de candidatos individuales, selecciona uno |
| **Plurinominal** | Lista de candidatos, selecciona N |
| **Preferencial** | Lista + orden de preferencia numérica |
| **Mixta** | Combinación de lista cerrada + individual |

### 6.2 Reglas de Papeleta
- Cada papeleta corresponde a un cargo
- Cada papeleta tiene una plantilla que define su comportamiento
- La papeleta se genera automáticamente al configurar la elección
- Las opciones de papeleta se derivan de candidatos/listas activas
- Color hexagonal configurable por papeleta
- Cantidad máxima de votos aplica solo a plurinominales
- Orden de papeletas determinado por orden de cargos

---

## 7. VOTACIÓN

### 7.1 Tipos de Voto
| Tipo | Descripción |
|------|-------------|
| **VÁLIDO** | Voto por un candidato/lista |
| **VOTO EN BLANCO** | Voto sin selección (válido pero sin candidato) |
| **VOTO NULO** | Voto inválido (múltiples marcas, papeleta dañada) |

### 7.2 Reglas de Votación
- Una mesa puede tener múltiples votos registrados
- Los votos se registran por candidato y por partido
- Voto en blanco: se registra a nivel de mesa (Mesa.votosBlanco)
- Voto nulo: se registra individualmente por voto
- No se puede votar en una mesa con acta cerrada
- Cierre de acta es irreversible (requiere reapertura autorizada)
- Reapertura requiere contraseña de administrador
- Votos en blanco + nulos no se asignan a ningún candidato

### 7.3 Modelo Unificado de Votación (Fase 2+)
```
Voto (único)
├── mesa_id
├── opcion_papeleta_id (reemplaza candidato_id)
├── cantidad
├── es_nulo
├── es_blanco
└── registrado_por
```

---

## 8. ESCRUTINIO

### 8.1 Etapas del Escrutinio
| Etapa | Descripción |
|-------|-------------|
| **CÓMPUTO PRELIMINAR** | Resultados inmediatos al cerrar mesas |
| **CÓMPUTO OFICIAL** | Resultados consolidados con verificación |
| **RECONTEO** | Nueva contabilización de votos |
| **IMPUGNACIÓN** | Reclamo formal sobre resultados |
| **RESOLUCIÓN** | Decisión del órgano electoral |
| **OFICIALIZACIÓN** | Resultados finales publicados |

### 8.2 Reglas de Escrutinio
- Acta de mesa es el documento fuente
- Reconteo: requiere autorización y registra auditoría
- Impugnación: requiere motivo, evidencia, y resolución
- Solo votos válidos cuentan para asignación de escaños
- Votos en blanco cuentan para participación pero no para candidatos
- Votos nulos no cuentan para participación ni candidatos

---

## 9. ASIGNACIÓN DE ESCAÑOS (Futuro)

### 9.1 Métodos de Asignación
| Método | Descripción |
|--------|-------------|
| **Cociente Natural** | Votos válidos / escaños disponibles |
| **Cociente Rectificado** | Votos válidos / (escaños + 1) — método Hare |
| **D'Hondt** | División sucesiva por 1, 2, 3... |
| **Webster** | División sucesiva por 1, 3, 5... (impares) |
| **Mayoría Simple** | El candidato con más votos gana |
| **Balotaje** | Segunda vuelta entre los dos más votados |

### 9.2 Umbral Electoral
- Porcentaje mínimo de votos para acceder a escaños
- Configurable por elección y circunscripción
- Ejemplo: 5% nacional o 3% provincial

---

## 10. CALENDARIO ELECTORAL (Futuro)

### Etapas de una Elección
| Etapa | Descripción | Estado Sistema |
|-------|-------------|----------------|
| **PREPARACIÓN** | Configuración del sistema | PREPARACION |
| **CONVOCATORIA** | Convocatoria oficial | CONVOCATORIA |
| **INSCRIPCIÓN** | Registro de candidaturas | INSCRIPCION |
| **CAMPAÑA** | Período de campaña electoral | CAMPANIA |
| **SILENCIO** | Prohibición de campaña | SILENCIO |
| **VOTACIÓN** | Día de votación | VOTACION |
| **ESCRUTINIO** | Conteo de votos | ESCRUTINIO |
| **PUBLICACIÓN** | Resultados oficiales | PUBLICACION |
| **FINALIZADA** | Proceso concluido | FINALIZADA |

---

## 11. PARÁMETROS CONFIGURABLES

### Configuración Global (Tabla `configuracion_sistema`)
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| nombre_partido | String | "" | Nombre de la organización |
| descripcion_partido | Text | "" | Descripción institucional |
| logo_url | Text | null | Logo de la organización |
| apk_url | Text | null | URL de descarga APK móvil |
| idioma | String | "es" | Idioma del sistema |
| zona_horaria | String | "America/Guayaquil" | Timezone |

### Configuración por Elección
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| permite_blanco | Boolean | true | Voto en blanco habilitado |
| umbral_electoral | Decimal | 0.0 | % mínimo para escaños |
| metodo_asignacion | String | "D_HONDT" | Método de asignación |
| segunda_vuelta | Boolean | false | Balotaje si aplica |
| porcentaje_segunda_vuelta | Decimal | 50.0 | % para ganar en primera |

### Configuración por Cargo
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| tipo_votacion | Enum | INDIVIDUAL | Cómo se vota este cargo |
| tipo_circunscripcion_id | FK | - | Ámbito geográfico |
| cantidad_max_votos | Integer | 1 | Para plurinominales |
| edad_minima | Integer | 18 | Edad mínima candidato |
| max_reeleccion | Integer | 0 | 0 = sin límite |
| cupo_genero | Boolean | false | Exige paridad de género |

---

## 12. MOTOR DE REGLAS (Futuro — Fase 2)

### Arquitectura Propuesta
```
ReglaNegocio
├── tipo: VALIDACION, CALCULO, COMPORTAMIENTO
├── modulo: CANDIDATOS, VOTOS, PAPELETAS, ESCRUTINIO
├── condicion: expresión SpEL/JSON
├── accion: qué hacer si se cumple
├── mensaje_error: texto para el usuario
├── activa: boolean
└── prioridad: int
```

### Ejemplos de Reglas Configurables
```json
[
  {
    "tipo": "VALIDACION",
    "modulo": "CANDIDATOS",
    "nombre": "Edad mínima presidente",
    "condicion": "cargo.nombre == 'PRESIDENTE' && candidato.edad < 30",
    "accion": "RECHAZAR",
    "mensaje_error": "El candidato a Presidente debe tener al menos 30 años",
    "activa": true
  },
  {
    "tipo": "VALIDACION",
    "modulo": "CANDIDATOS",
    "nombre": "Cupo de género 50%",
    "condicion": "cargo.requiere_paridad && lista.porcentaje_genero_femenino < 50",
    "accion": "RECHAZAR",
    "mensaje_error": "La lista debe tener al menos 50% de candidatas mujeres",
    "activa": true
  },
  {
    "tipo": "CALCULO",
    "modulo": "ESCRUTINIO",
    "nombre": "Umbral electoral 5%",
    "condicion": "partido.porcentaje_votos < 5",
    "accion": "EXCLUIR_ASIGNACION",
    "mensaje_error": "Partido no supera el umbral electoral del 5%",
    "activa": false
  }
]
```
