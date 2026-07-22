# 12 — ESTÁNDARES DE SQL

> Estándares de estilo, diseño y buenas prácticas para SQL en el ERP Electoral.

---

## 1. ESTÁNDARES GENERALES

### 1.1 Naming Conventions

| Objeto | Convención | Ejemplo |
|--------|-----------|---------|
| Base de datos | snake_case | `conteo_electoral` |
| Tablas | snake_case, plural | `candidatos`, `tipos_eleccion`, `instituciones_educativas` |
| Columnas | snake_case, singular | `nombre`, `fecha_inicio`, `es_activa`, `tipo_votacion` |
| Primary Keys | `id` | `id BIGSERIAL PRIMARY KEY` |
| Foreign Keys | `{tabla_origen}_id` | `eleccion_id`, `partido_id`, `cargo_id` |
| Índices | `idx_{tabla}_{columna}` | `idx_candidatos_eleccion_id` |
| Unique constraints | `uq_{tabla}_{columna}` | `uq_usuarios_email` |
| FK constraints | `fk_{origen}_{destino}` | `fk_mesa_eleccion` |
| Check constraints | `ck_{tabla}_{columna}` | `ck_usuarios_edad` |

### 1.2 Tipos de Datos

| Uso | Tipo | Razón |
|-----|------|-------|
| ID autogenerado | `BIGSERIAL` | Soporta hasta 9.2 quintillones |
| ID externo (distribuido) | `UUID` | Para sincronización distribuida |
| Texto corto (< 255) | `VARCHAR(N)` | Eficiente en índice |
| Texto largo | `TEXT` | Sin límite práctico |
| Número entero | `INTEGER` / `BIGINT` | Según rango esperado |
| Decimal exacto | `DECIMAL(10,2)` | Para porcentajes, montos |
| Booleano | `BOOLEAN` | SQL estándar |
| Fecha | `DATE` | Sin hora |
| Fecha+Hora | `TIMESTAMP` | Con zona horaria |
| JSON | `JSONB` | Indexable, eficiente |
| Enumeración | `VARCHAR(50)` + CHECK | Portable entre BD |

---

## 2. CREACIÓN DE TABLAS

### 2.1 Plantilla Base
```sql
CREATE TABLE candidatos (
    id              BIGSERIAL       PRIMARY KEY,
    eleccion_id     BIGINT          NOT NULL,
    partido_id      BIGINT          NOT NULL,
    cargo_id        BIGINT          NOT NULL,
    lista_id        BIGINT,
    nombres         VARCHAR(255)    NOT NULL,
    apellidos       VARCHAR(255)    NOT NULL,
    cedula          VARCHAR(20),
    tipo            VARCHAR(20)     NOT NULL DEFAULT 'PRINCIPAL',
    orden_en_lista  INTEGER         NOT NULL DEFAULT 0,
    foto_url        TEXT,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT fk_candidato_eleccion FOREIGN KEY (eleccion_id)
        REFERENCES elecciones(id) ON DELETE CASCADE,
    CONSTRAINT fk_candidato_partido FOREIGN KEY (partido_id)
        REFERENCES partidos(id),
    CONSTRAINT fk_candidato_cargo FOREIGN KEY (cargo_id)
        REFERENCES cargos(id),
    CONSTRAINT fk_candidato_lista FOREIGN KEY (lista_id)
        REFERENCES listas_electorales(id),
    CONSTRAINT ck_candidato_tipo CHECK (tipo IN ('PRINCIPAL', 'SUPLENTE'))
);

-- Índices
CREATE INDEX idx_candidatos_eleccion_id ON candidatos(eleccion_id);
CREATE INDEX idx_candidatos_cargo_id ON candidatos(cargo_id);
CREATE INDEX idx_candidatos_lista_id ON candidatos(lista_id);
CREATE INDEX idx_candidatos_activo ON candidatos(activo);
CREATE UNIQUE INDEX uq_candidatos_cedula_eleccion ON candidatos(cedula, eleccion_id)
    WHERE cedula IS NOT NULL;
```

---

## 3. MIGRACIONES FLYWAY

### 3.1 Convención de Archivos
```
src/main/resources/db/migration/
├── V1.0.0__schema_inicial.sql           ← Tablas iniciales
├── V1.0.1__seed_roles.sql               ← Datos semilla
├── V1.1.0__agregar_campo_permite_blanco.sql
├── V2.0.0__motor_reglas.sql
└── V2.0.1__circunscripciones.sql
```

### 3.2 Reglas para Migraciones
1. **Inmutables** — una vez aplicadas, no se modifican
2. **Idempotentes** — usar `IF NOT EXISTS` cuando sea posible
3. **Backward compatible** — no eliminar columnas sin deprecación
4. **Pequeñas** — una migración por cambio conceptual
5. **Reversibles** — incluir `-- DOWN` comentado (para desarrollo)

### 3.3 Ejemplo de Migración
```sql
-- V1.1.0__agregar_campo_votos_blanco.sql
-- Agrega campo votos_blanco a la tabla mesas

ALTER TABLE mesas
    ADD COLUMN IF NOT EXISTS votos_blanco INTEGER NOT NULL DEFAULT 0;

ALTER TABLE mesas
    ADD COLUMN IF NOT EXISTS votos_nulos INTEGER NOT NULL DEFAULT 0;

-- Crear índice para consultas de dashboard
CREATE INDEX IF NOT EXISTS idx_mesas_acta_cerrada ON mesas(acta_cerrada)
    WHERE acta_cerrada = true;

-- DOWN:
-- DROP INDEX IF EXISTS idx_mesas_acta_cerrada;
-- ALTER TABLE mesas DROP COLUMN IF EXISTS votos_blanco;
-- ALTER TABLE mesas DROP COLUMN IF EXISTS votos_nulos;
```

---

## 4. CONSULTAS — BUENAS PRÁCTICAS

### 4.1 Estilo de Escritura
```sql
-- ✅ Correcto: mayúsculas para palabras clave, indentación clara
SELECT
    c.id,
    c.nombres || ' ' || c.apellidos AS nombre_completo,
    p.nombre AS partido,
    c.orden_en_lista
FROM candidatos c
INNER JOIN partidos p ON p.id = c.partido_id
WHERE c.eleccion_id = :eleccionId
  AND c.activo = TRUE
ORDER BY c.orden_en_lista;

-- ❌ Incorrecto: todo en minúsculas, sin indentación
select c.id, c.nombres, c.apellidos, p.nombre from candidatos c join partidos p on c.partido_id = p.id where c.eleccion_id = 1;
```

### 4.2 Reglas de Estilo
| Regla | Ejemplo |
|-------|---------|
| SQL keywords en MAYÚSCULAS | `SELECT`, `FROM`, `WHERE`, `JOIN` |
| Nombres en minúsculas | `candidatos`, `partidos` |
| Alias cortos descriptivos | `c`, `p`, `m` |
| JOIN explícito | `INNER JOIN` no `FROM a, b WHERE a.x = b.x` |
| Parámetros nombrados | `:eleccionId` no `?1` |
| Una cláusula por línea | `WHERE`, `AND`, `ORDER BY` |
| Identación consistente | 4 espacios |

### 4.3 JOIN FETCH para N+1
```sql
-- ✅ Evita N+1: carga candidatos con sus relaciones en 1 consulta
SELECT c FROM Candidato c
JOIN FETCH c.partido
JOIN FETCH c.cargo
LEFT JOIN FETCH c.listaElectoral
WHERE c.eleccion.id = :eleccionId
ORDER BY c.ordenEnLista
```

### 4.4 Paginación Eficiente
```sql
-- Paginación con keyset (recomendado para grandes volúmenes)
SELECT * FROM votos
WHERE eleccion_id = :eleccionId
  AND id > :lastId  -- cursor
ORDER BY id
LIMIT 100;
```

---

## 5. CONSULTAS PARA DASHBOARD

### 5.1 Totales por Elección
```sql
SELECT
    e.id,
    e.nombre,
    COUNT(DISTINCT m.id) AS total_mesas,
    COUNT(DISTINCT CASE WHEN m.acta_cerrada THEN m.id END) AS mesas_cerradas,
    COALESCE(SUM(v.cantidad), 0) AS total_votos,
    COALESCE(SUM(CASE WHEN v.es_nulo THEN v.cantidad END), 0) AS votos_nulos
FROM elecciones e
LEFT JOIN mesas m ON m.eleccion_id = e.id
LEFT JOIN votos v ON v.mesa_id = m.id
WHERE e.id = :eleccionId
GROUP BY e.id, e.nombre;
```

### 5.2 Resultados por Candidato
```sql
SELECT
    c.id AS candidato_id,
    c.nombres || ' ' || c.apellidos AS candidato,
    p.nombre AS partido,
    p.color_hex,
    COALESCE(SUM(v.cantidad), 0) AS total_votos
FROM candidatos c
INNER JOIN partidos p ON p.id = c.partido_id
LEFT JOIN votos v ON v.candidato_id = c.id
WHERE c.eleccion_id = :eleccionId
  AND c.activo = TRUE
GROUP BY c.id, c.nombres, c.apellidos, p.nombre, p.color_hex
ORDER BY total_votos DESC;
```

### 5.3 Resultados Geográficos
```sql
SELECT
    z.nombre AS zona,
    SUM(v.cantidad) AS total_votos
FROM votos v
INNER JOIN mesas m ON m.id = v.mesa_id
INNER JOIN instituciones_educativas ie ON ie.id = m.institucion_id
INNER JOIN parroquias pa ON pa.id = ie.parroquia_id
INNER JOIN cantones ca ON ca.id = pa.canton_id
INNER JOIN provincias pr ON pr.id = ca.provincia_id
INNER JOIN zonas z ON z.id = pr.zona_id
WHERE v.eleccion_id = :eleccionId
  AND v.es_nulo = FALSE
  AND v.es_blanco = FALSE
GROUP BY z.nombre
ORDER BY z.nombre;
```

---

## 6. ÍNDICES — RECOMENDACIONES

### 6.1 Cuándo Indexar
- Columnas en cláusulas WHERE frecuentes
- Columnas JOIN (FK)
- Columnas ORDER BY
- Columnas GROUP BY
- Columnas con alta cardinalidad (muchos valores distintos)

### 6.2 Cuándo NO Indexar
- Tablas pequeñas (< 1000 registros)
- Columnas con baja cardinalidad (booleanos) — índices bitmap si la BD lo soporta
- Columnas que raramente se consultan
- Columnas con muchas escrituras y pocas lecturas

### 6.3 Tipos de Índices
```sql
-- B-tree (default, para =, >, <, BETWEEN, LIKE 'abc%')
CREATE INDEX idx_candidatos_nombres ON candidatos(nombres);

-- Partial index (solo filas que cumplen condición, más pequeño)
CREATE INDEX idx_candidatos_activos ON candidatos(eleccion_id) WHERE activo = TRUE;

-- Composite index (múltiples columnas, orden importa)
CREATE INDEX idx_votos_eleccion_mesa ON votos(eleccion_id, mesa_id);

-- Unique index (unicidad)
CREATE UNIQUE INDEX uq_partidos_eleccion_nombre ON partidos(eleccion_id, nombre);
```

---

## 7. TRANSACCIONES

```sql
-- En PostgreSQL, las transacciones se manejan desde la aplicación
-- Pero en scripts SQL:

BEGIN;
    INSERT INTO elecciones (nombre, fecha) VALUES ('Elección 2026', '2026-02-09');
    INSERT INTO partidos (eleccion_id, nombre) VALUES (LASTVAL(), 'Partido Azul');
    INSERT INTO candidatos (eleccion_id, partido_id, nombres, apellidos) VALUES (1, 1, 'Juan', 'Pérez');
COMMIT;
-- ROLLBACK si algo falla
```

---

## 8. SEGURIDAD SQL

### 8.1 Inyección SQL — Prevención
```java
// ✅ SEGURO — Parámetros nombrados
@Query("SELECT c FROM Candidato c WHERE c.cedula = :cedula")
List<Candidato> findByCedula(@Param("cedula") String cedula);

// ✅ SEGURO — Native query con parámetros
@Query(value = "SELECT * FROM candidatos WHERE cedula = ?1", nativeQuery = true)
List<Candidato> findByCedulaNative(String cedula);

// ❌ INSEGURO — Concatenación
@Query(value = "SELECT * FROM candidatos WHERE cedula = '" + cedula + "'", nativeQuery = true)
List<Candidato> findByCedulaInseguro(String cedula);
```

### 8.2 Permisos de Base de Datos
```sql
-- Crear usuario de aplicación (solo CRUD necesario)
CREATE USER electoral_app WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE conteo_electoral TO electoral_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO electoral_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO electoral_app;

-- Usuario de backup (solo lectura)
CREATE USER electoral_backup WITH PASSWORD 'backup_password';
GRANT CONNECT ON DATABASE conteo_electoral TO electoral_backup;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO electoral_backup;
```
