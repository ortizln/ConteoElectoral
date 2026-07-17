-- Ejecutar en PostgreSQL para conteo_electoral
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS activo BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS provincia_id BIGINT REFERENCES provincias(id);
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS canton_id BIGINT REFERENCES cantones(id);
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS parroquia_id BIGINT REFERENCES parroquias(id);
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS tipo_circunscripcion_id BIGINT REFERENCES tipo_circunscripcion(id);
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS posicion_lista INTEGER;
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS orden_aparicion INTEGER;
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS principal BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE cargos ADD COLUMN IF NOT EXISTS activo BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE cargos ADD COLUMN IF NOT EXISTS tipo_votacion VARCHAR(20);
ALTER TABLE cargos ADD COLUMN IF NOT EXISTS tipo_circunscripcion_id BIGINT REFERENCES tipo_circunscripcion(id);
ALTER TABLE cargos ADD COLUMN IF NOT EXISTS cantidad_dignidades INTEGER NOT NULL DEFAULT 1;
ALTER TABLE cargos ADD COLUMN IF NOT EXISTS max_candidatos_lista INTEGER;

ALTER TABLE elecciones ADD COLUMN IF NOT EXISTS tipo_eleccion_id BIGINT REFERENCES tipo_eleccion(id);
