-- ============================================================
-- MIGRACIÓN V2 – MODELO CNE ECUADOR
-- ============================================================
-- Este script transforma el esquema actual al nuevo modelo
-- basado en Papeletas, Mantiene compatibilidad hacia atrás.
-- ============================================================

BEGIN;

-- ── 1. CATÁLOGO: TIPO_ELECCION ──────────────────────────────
CREATE TABLE tipo_eleccion (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO tipo_eleccion (nombre, descripcion) VALUES
    ('GENERALES', 'Elecciones generales: Presidente, Asambleístas, Parlamentarios'),
    ('SECCIONALES', 'Elecciones seccionales: Prefectos, Alcaldes, Concejales, Vocales');

ALTER TABLE elecciones ADD COLUMN tipo_eleccion_id BIGINT REFERENCES tipo_eleccion(id);

-- ── 2. TIPO_VOTACION: columna VARCHAR con Enum en Java ────
-- No se crea tabla separada. Se usa columna directa en cargos.

-- ── 3. CATÁLOGO: TIPO_CIRCUNSCRIPCION ──────────────────────
CREATE TABLE tipo_circunscripcion (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL
);

INSERT INTO tipo_circunscripcion (codigo, nombre) VALUES
    ('NACIONAL',    'Circunscripción Nacional'),
    ('PROVINCIAL',  'Circunscripción Provincial'),
    ('DISTRITAL',   'Circunscripción Distrital'),
    ('CANTONAL',    'Circunscripción Cantonal'),
    ('URBANA',      'Circunscripción Urbana'),
    ('RURAL',       'Circunscripción Rural'),
    ('PARROQUIAL',  'Circunscripción Parroquial'),
    ('EXTERIOR',    'Circunscripción Exterior');

-- ── 4. AMPLIACIÓN DE CARGO ─────────────────────────────────
ALTER TABLE cargos ADD COLUMN tipo_votacion VARCHAR(20);
ALTER TABLE cargos ADD COLUMN tipo_circunscripcion_id BIGINT REFERENCES tipo_circunscripcion(id);
ALTER TABLE cargos ADD COLUMN cantidad_dignidades INTEGER NOT NULL DEFAULT 1;
ALTER TABLE cargos ADD COLUMN max_candidatos_lista INTEGER;
ALTER TABLE cargos ADD COLUMN activo BOOLEAN NOT NULL DEFAULT TRUE;

-- Migrar cargos existentes (valores por defecto según nombre)
UPDATE cargos SET
    tipo_votacion = CASE
        WHEN nombre IN ('Presidente','Vicepresidente','Prefecto','Alcalde','Parlamentario Andino') THEN 'INDIVIDUAL'
        ELSE 'LISTA'
    END,
    tipo_circunscripcion_id = CASE
        WHEN nombre IN ('Presidente','Vicepresidente','Parlamentario Andino') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='NACIONAL')
        WHEN nombre IN ('Prefecto') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='PROVINCIAL')
        WHEN nombre IN ('Alcalde') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='CANTONAL')
        WHEN nombre IN ('Concejal Urbano') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='URBANA')
        WHEN nombre IN ('Concejal Rural') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='RURAL')
        WHEN nombre IN ('Asambleísta Nacional') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='NACIONAL')
        WHEN nombre IN ('Asambleísta Provincial') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='PROVINCIAL')
        WHEN nombre IN ('Asambleísta Distrital') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='DISTRITAL')
        WHEN nombre IN ('Asambleísta Exterior') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='EXTERIOR')
        WHEN nombre IN ('Vocal Junta Parroquial') THEN (SELECT id FROM tipo_circunscripcion WHERE codigo='PARROQUIAL')
        ELSE (SELECT id FROM tipo_circunscripcion WHERE codigo='NACIONAL')
    END,
    cantidad_dignidades = CASE
        WHEN nombre IN ('Presidente','Vicepresidente','Prefecto','Alcalde') THEN 1
        WHEN nombre IN ('Parlamentario Andino') THEN 5
        WHEN nombre IN ('Concejal Urbano') THEN 7
        WHEN nombre IN ('Concejal Rural') THEN 5
        WHEN nombre IN ('Vocal Junta Parroquial') THEN 5
        WHEN nombre IN ('Asambleísta Nacional') THEN 15
        WHEN nombre IN ('Asambleísta Provincial') THEN 5
        WHEN nombre IN ('Asambleísta Distrital') THEN 2
        WHEN nombre IN ('Asambleísta Exterior') THEN 6
        ELSE 1
    END,
    max_candidatos_lista = CASE
        WHEN nombre IN ('Concejal Urbano','Concejal Rural','Vocal Junta Parroquial') THEN 7
        WHEN nombre IN ('Asambleísta Nacional') THEN 15
        WHEN nombre IN ('Asambleísta Provincial') THEN 5
        WHEN nombre IN ('Asambleísta Distrital') THEN 2
        WHEN nombre IN ('Asambleísta Exterior') THEN 6
        ELSE NULL
    END;

ALTER TABLE cargos ALTER COLUMN tipo_votacion SET NOT NULL;
ALTER TABLE cargos ALTER COLUMN tipo_circunscripcion_id SET NOT NULL;

-- ── 5. TABLA PUENTE: TIPO_ELECCION_CARGO ───────────────────
CREATE TABLE tipo_eleccion_cargo (
    id BIGSERIAL PRIMARY KEY,
    tipo_eleccion_id BIGINT NOT NULL REFERENCES tipo_eleccion(id),
    cargo_id BIGINT NOT NULL REFERENCES cargos(id),
    orden INTEGER NOT NULL DEFAULT 0,
    UNIQUE(tipo_eleccion_id, cargo_id)
);

-- Poblar según la realidad ecuatoriana
-- Elecciones Generales
INSERT INTO tipo_eleccion_cargo (tipo_eleccion_id, cargo_id, orden)
SELECT te.id, c.id, row_number() OVER (ORDER BY c.nombre)
FROM tipo_eleccion te, cargos c
WHERE te.nombre = 'GENERALES'
  AND c.nombre IN ('Presidente','Vicepresidente','Asambleísta Nacional','Asambleísta Provincial','Asambleísta Distrital','Asambleísta Exterior','Parlamentario Andino');

-- Elecciones Seccionales
INSERT INTO tipo_eleccion_cargo (tipo_eleccion_id, cargo_id, orden)
SELECT te.id, c.id, row_number() OVER (ORDER BY c.nombre)
FROM tipo_eleccion te, cargos c
WHERE te.nombre = 'SECCIONALES'
  AND c.nombre IN ('Prefecto','Alcalde','Concejal Urbano','Concejal Rural','Vocal Junta Parroquial');

-- ── 6. AMPLIACIÓN DE CANDIDATO ────────────────────────────
ALTER TABLE candidatos ADD COLUMN provincia_id BIGINT REFERENCES provincias(id);
ALTER TABLE candidatos ADD COLUMN canton_id BIGINT REFERENCES cantones(id);
ALTER TABLE candidatos ADD COLUMN parroquia_id BIGINT REFERENCES parroquias(id);
ALTER TABLE candidatos ADD COLUMN tipo_circunscripcion_id BIGINT REFERENCES tipo_circunscripcion(id);
ALTER TABLE candidatos ADD COLUMN posicion_lista INTEGER;
ALTER TABLE candidatos ADD COLUMN orden_aparicion INTEGER;
ALTER TABLE candidatos ADD COLUMN principal BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE candidatos ADD COLUMN activo BOOLEAN NOT NULL DEFAULT TRUE;

-- ── 7. TABLA: PAPELETA ─────────────────────────────────────
CREATE TABLE papeleta (
    id BIGSERIAL PRIMARY KEY,
    eleccion_id BIGINT NOT NULL REFERENCES elecciones(id),
    cargo_id BIGINT NOT NULL REFERENCES cargos(id),
    tipo_circunscripcion_id BIGINT NOT NULL REFERENCES tipo_circunscripcion(id),
    circunscripcion_id BIGINT,          -- ID de la entidad geográfica (provincia, canton, parroquia)
    titulo VARCHAR(300) NOT NULL,
    orden INTEGER NOT NULL DEFAULT 0,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(eleccion_id, cargo_id, circunscripcion_id)
);

-- ── 8. TABLA: OPCION_PAPELETA ──────────────────────────────
CREATE TABLE opcion_papeleta (
    id BIGSERIAL PRIMARY KEY,
    papeleta_id BIGINT NOT NULL REFERENCES papeleta(id) ON DELETE CASCADE,
    tipo_opcion VARCHAR(20) NOT NULL CHECK (tipo_opcion IN ('CANDIDATO','PARTIDO','NULO','BLANCO')),
    candidato_id BIGINT REFERENCES candidatos(id) ON DELETE SET NULL,
    partido_id BIGINT REFERENCES partidos_politicos(id) ON DELETE SET NULL,
    partido_sigla VARCHAR(20),
    etiqueta VARCHAR(200),              -- Texto visible en la papeleta
    orden INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_opcion_papeleta_papeleta ON opcion_papeleta(papeleta_id);

-- ── 9. TABLA: VOTO (nueva estructura) ──────────────────────
-- La tabla voto actual se conserva para compatibilidad.
-- Se crea una nueva tabla voto_papeleta para el nuevo modelo.

CREATE TABLE voto_papeleta (
    id BIGSERIAL PRIMARY KEY,
    opcion_papeleta_id BIGINT NOT NULL REFERENCES opcion_papeleta(id),
    mesa_id BIGINT NOT NULL REFERENCES mesas(id),
    eleccion_id BIGINT NOT NULL REFERENCES elecciones(id),
    cantidad_votos INTEGER NOT NULL CHECK (cantidad_votos > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(opcion_papeleta_id, mesa_id)
);

CREATE INDEX idx_voto_papeleta_mesa ON voto_papeleta(mesa_id);
CREATE INDEX idx_voto_papeleta_eleccion ON voto_papeleta(eleccion_id);
CREATE INDEX idx_voto_papeleta_opcion ON voto_papeleta(opcion_papeleta_id);

-- ── 10. FUNCIÓN: GENERAR PAPELETAS PARA UNA ELECCIÓN ──────
CREATE OR REPLACE FUNCTION generar_papeletas_eleccion(p_eleccion_id BIGINT)
RETURNS void AS $$
DECLARE
    v_tipo_eleccion_id BIGINT;
    v_cargo RECORD;
    v_circunscripciones RECORD;
    v_papeleta_id BIGINT;
    v_partido RECORD;
    v_candidato RECORD;
BEGIN
    -- Obtener tipo de elección
    SELECT tipo_eleccion_id INTO v_tipo_eleccion_id FROM elecciones WHERE id = p_eleccion_id;

    -- Por cada cargo asociado al tipo de elección
    FOR v_cargo IN
        SELECT c.id, c.nombre, c.tipo_circunscripcion_id, tc.codigo as circ_codigo
        FROM tipo_eleccion_cargo tec
        JOIN cargos c ON c.id = tec.cargo_id
        JOIN tipo_circunscripcion tc ON tc.id = c.tipo_circunscripcion_id
        WHERE tec.tipo_eleccion_id = v_tipo_eleccion_id
        ORDER BY tec.orden
    LOOP
        -- Generar papeletas según tipo de circunscripción
        CASE v_cargo.circ_codigo
            WHEN 'NACIONAL' THEN
                INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, NULL, v_cargo.nombre, v_cargo.id)
                RETURNING id INTO v_papeleta_id;
                -- Generar opciones: partidos + nulo + blanco
                FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                    INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                    VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre,
                            (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                END LOOP;

            WHEN 'PROVINCIAL' THEN
                FOR v_circunscripciones IN SELECT id, nombre FROM provincias ORDER BY nombre LOOP
                    INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                    VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, v_circunscripciones.id,
                            v_cargo.nombre || ' - ' || v_circunscripciones.nombre, v_cargo.id)
                    RETURNING id INTO v_papeleta_id;
                    FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                        VALUES (v_papeleta_id, CASE WHEN v_cargo.tipo_votacion_id = (SELECT id FROM tipo_votacion WHERE codigo='INDIVIDUAL') THEN 'CANDIDATO' ELSE 'PARTIDO' END,
                                v_partido.id, v_partido.sigla, v_partido.nombre,
                                (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                    END LOOP;
                END LOOP;

            WHEN 'CANTONAL' THEN
                FOR v_circunscripciones IN SELECT id, nombre FROM cantones ORDER BY nombre LOOP
                    INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                    VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, v_circunscripciones.id,
                            v_cargo.nombre || ' - ' || v_circunscripciones.nombre, v_cargo.id)
                    RETURNING id INTO v_papeleta_id;
                    FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                        VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre,
                                (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                    END LOOP;
                END LOOP;

            WHEN 'URBANA' THEN
                FOR v_circunscripciones IN SELECT id, nombre FROM cantones ORDER BY nombre LOOP
                    INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                    VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, v_circunscripciones.id,
                            'Concejales Urbanos - ' || v_circunscripciones.nombre, v_cargo.id)
                    RETURNING id INTO v_papeleta_id;
                    FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                        VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre || ' (Lista ' || v_partido.sigla || ')',
                                (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                    END LOOP;
                END LOOP;

            WHEN 'RURAL' THEN
                FOR v_circunscripciones IN SELECT id, nombre FROM cantones ORDER BY nombre LOOP
                    INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                    VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, v_circunscripciones.id,
                            'Concejales Rurales - ' || v_circunscripciones.nombre, v_cargo.id)
                    RETURNING id INTO v_papeleta_id;
                    FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                        VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre || ' (Lista ' || v_partido.sigla || ')',
                                (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                    END LOOP;
                END LOOP;

            WHEN 'PARROQUIAL' THEN
                FOR v_circunscripciones IN SELECT id, nombre FROM parroquias ORDER BY nombre LOOP
                    INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                    VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, v_circunscripciones.id,
                            'Vocales - ' || v_circunscripciones.nombre, v_cargo.id)
                    RETURNING id INTO v_papeleta_id;
                    FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                        VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre || ' (Lista ' || v_partido.sigla || ')',
                                (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                    END LOOP;
                END LOOP;

            WHEN 'DISTRITAL' THEN
                INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, NULL, v_cargo.nombre, v_cargo.id)
                RETURNING id INTO v_papeleta_id;
                FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                    INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                    VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre,
                            (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                END LOOP;

            WHEN 'EXTERIOR' THEN
                INSERT INTO papeleta (eleccion_id, cargo_id, tipo_circunscripcion_id, circunscripcion_id, titulo, orden)
                VALUES (p_eleccion_id, v_cargo.id, v_cargo.tipo_circunscripcion_id, NULL, v_cargo.nombre, v_cargo.id)
                RETURNING id INTO v_papeleta_id;
                FOR v_partido IN SELECT id, nombre, sigla FROM partidos_politicos WHERE elecciones_id = p_eleccion_id ORDER BY sigla LOOP
                    INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, partido_id, partido_sigla, etiqueta, orden)
                    VALUES (v_papeleta_id, 'PARTIDO', v_partido.id, v_partido.sigla, v_partido.nombre,
                            (SELECT COALESCE(MAX(orden),0)+1 FROM opcion_papeleta WHERE papeleta_id = v_papeleta_id));
                END LOOP;
        END CASE;
    END LOOP;

    -- Agregar opciones NULO y BLANCO a cada papeleta
    FOR v_papeleta_id IN SELECT id FROM papeleta WHERE eleccion_id = p_eleccion_id LOOP
        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, etiqueta, orden)
        VALUES (v_papeleta_id, 'NULO',   'Voto Nulo',   998);
        INSERT INTO opcion_papeleta (papeleta_id, tipo_opcion, etiqueta, orden)
        VALUES (v_papeleta_id, 'BLANCO', 'Voto Blanco', 999);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ── 11. VISTA: RESULTADOS POR PAPELETA ─────────────────────
CREATE VIEW resultados_papeleta AS
SELECT
    p.id AS papeleta_id,
    p.titulo AS papeleta_titulo,
    c.nombre AS cargo_nombre,
    tc.codigo AS tipo_votacion,
    op.tipo_opcion,
    op.etiqueta,
    op.partido_sigla,
    COALESCE(SUM(vp.cantidad_votos), 0) AS total_votos
FROM papeleta p
JOIN cargos c ON c.id = p.cargo_id
JOIN tipo_votacion tc ON tc.id = c.tipo_votacion_id
JOIN opcion_papeleta op ON op.papeleta_id = p.id
LEFT JOIN voto_papeleta vp ON vp.opcion_papeleta_id = op.id
GROUP BY p.id, p.titulo, c.nombre, tc.codigo, op.tipo_opcion, op.etiqueta, op.partido_sigla
ORDER BY p.id, op.orden;

-- ── 12. ACTUALIZAR ELECCIÓN EXISTENTE ──────────────────────
UPDATE elecciones SET tipo_eleccion_id = (SELECT id FROM tipo_eleccion WHERE nombre = 'GENERALES')
WHERE tipo_eleccion_id IS NULL;

COMMIT;
