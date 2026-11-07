-- Fotos del acta como respaldo al cerrar la mesa (obligatorio antes de cerrar)
CREATE TABLE IF NOT EXISTS mesa_acta_fotos (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT NOT NULL REFERENCES mesas(id) ON DELETE CASCADE,
    foto BYTEA NOT NULL,
    content_type VARCHAR(50),
    nombre_archivo VARCHAR(255),
    subido_por BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mesa_acta_fotos_mesa ON mesa_acta_fotos(mesa_id);
