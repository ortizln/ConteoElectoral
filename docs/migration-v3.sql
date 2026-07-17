-- V3: Modelo ListaElectoral + PlantillaPapeleta + Papeleta extendida
BEGIN;

CREATE TABLE IF NOT EXISTS listas_electorales (
    id BIGSERIAL PRIMARY KEY,
    eleccion_id BIGINT NOT NULL REFERENCES elecciones(id),
    cargo_id BIGINT NOT NULL REFERENCES cargos(id),
    partido_id BIGINT REFERENCES partidos(id),
    circunscripcion_tipo VARCHAR(30),
    circunscripcion_id BIGINT,
    numero_lista INTEGER NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(eleccion_id, cargo_id, partido_id, circunscripcion_tipo, circunscripcion_id)
);

CREATE TABLE IF NOT EXISTS plantillas_papeleta (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo_diseno VARCHAR(50),
    cantidad_columnas INTEGER DEFAULT 1,
    cantidad_filas INTEGER DEFAULT 1,
    posicion_logo VARCHAR(20),
    posicion_numero VARCHAR(20),
    posicion_candidatos VARCHAR(20),
    color_fondo VARCHAR(7),
    descripcion TEXT
);

ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS lista_id BIGINT REFERENCES listas_electorales(id);
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS orden_en_lista INTEGER;
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS tipo VARCHAR(20) DEFAULT 'PRINCIPAL';
ALTER TABLE candidatos ALTER COLUMN cargo_id DROP NOT NULL;
ALTER TABLE candidatos ALTER COLUMN elecciones_id DROP NOT NULL;

ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS color_hex VARCHAR(7);
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS color_nombre VARCHAR(50);
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS plantilla_id BIGINT REFERENCES plantillas_papeleta(id);
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS imagen_fondo_url VARCHAR(500);
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS cantidad_max_votos INTEGER;
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS permite_voto_cruzado BOOLEAN DEFAULT FALSE;
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS permite_voto_lista_completa BOOLEAN DEFAULT TRUE;
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS numero_listas_visibles INTEGER;
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS cantidad_candidatos_por_lista INTEGER;
ALTER TABLE papeleta ADD COLUMN IF NOT EXISTS orden_impresion INTEGER;

ALTER TABLE opcion_papeleta ADD COLUMN IF NOT EXISTS lista_id BIGINT REFERENCES listas_electorales(id);

COMMIT;
