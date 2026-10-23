-- Migración: Votos nulos y en blanco por cargo (detalle por mesa)
-- Los escalares mesas.votos_nulos / votos_blanco siguen existiendo como
-- TOTALES GLOBALES por mesa (suma de todos los cargos) para compatibilidad
-- con reportes, actas y la sincronización móvil.

CREATE TABLE IF NOT EXISTS mesa_nulos_blancos (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT NOT NULL REFERENCES mesas(id) ON DELETE CASCADE,
    cargo_id BIGINT NOT NULL REFERENCES cargos(id) ON DELETE CASCADE,
    tipo VARCHAR(10) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_mesa_nulos_cargo_tipo UNIQUE (mesa_id, cargo_id, tipo),
    CONSTRAINT chk_mesa_nulos_tipo CHECK (tipo IN ('NULO', 'BLANCO'))
);

CREATE INDEX IF NOT EXISTS idx_mesa_nulos_mesa ON mesa_nulos_blancos(mesa_id);
