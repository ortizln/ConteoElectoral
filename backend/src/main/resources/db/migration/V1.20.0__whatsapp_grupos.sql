-- Configuracion de WhatsApp (OpenWA) y bandeja de envios de fotos del acta.

CREATE TABLE IF NOT EXISTS whatsapp_config (
    id          INTEGER PRIMARY KEY DEFAULT 1,
    session_id  VARCHAR(100),
    activo      BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at  TIMESTAMP,
    CONSTRAINT ck_whatsapp_config_id CHECK (id = 1)
);

INSERT INTO whatsapp_config (id, session_id, activo, updated_at)
VALUES (1, NULL, TRUE, NOW())
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS whatsapp_grupos (
    id          BIGSERIAL PRIMARY KEY,
    chat_id     VARCHAR(100) NOT NULL UNIQUE,
    nombre      VARCHAR(255) NOT NULL,
    activo      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whatsapp_envios (
    id          BIGSERIAL PRIMARY KEY,
    foto_id     BIGINT NOT NULL REFERENCES mesa_acta_fotos(id) ON DELETE CASCADE,
    mesa_id     BIGINT NOT NULL REFERENCES mesas(id) ON DELETE CASCADE,
    grupo_id    BIGINT NOT NULL REFERENCES whatsapp_grupos(id) ON DELETE CASCADE,
    estado      VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    message_id  VARCHAR(100),
    error       TEXT,
    intentos    INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMP,
    enviado_at  TIMESTAMP,
    CONSTRAINT uq_whatsapp_envio UNIQUE (foto_id, grupo_id)
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_envios_estado ON whatsapp_envios (estado);
CREATE INDEX IF NOT EXISTS idx_whatsapp_envios_mesa ON whatsapp_envios (mesa_id);
