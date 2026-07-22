CREATE TABLE IF NOT EXISTS reconteos (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT NOT NULL REFERENCES mesas(id),
    motivo TEXT NOT NULL,
    solicitado_por VARCHAR(200) NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE','EN_PROCESO','COMPLETADO','RECHAZADO')),
    resultado TEXT,
    realizado_por VARCHAR(200),
    fecha_realizacion TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reconteos_mesa ON reconteos(mesa_id);
CREATE INDEX IF NOT EXISTS idx_reconteos_estado ON reconteos(estado);

CREATE TABLE IF NOT EXISTS impugnaciones (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT REFERENCES mesas(id),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('VOTO','ACTA','MESA','RESULTADO','CANDIDATO')),
    descripcion TEXT NOT NULL,
    solicitante VARCHAR(200) NOT NULL,
    fecha_impugnacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE','APROBADA','RECHAZADA','EN_REVISION')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_impugnaciones_mesa ON impugnaciones(mesa_id);
CREATE INDEX IF NOT EXISTS idx_impugnaciones_estado ON impugnaciones(estado);

CREATE TABLE IF NOT EXISTS observaciones (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT REFERENCES mesas(id),
    usuario_id BIGINT REFERENCES usuarios(id),
    tipo VARCHAR(20) NOT NULL DEFAULT 'OBSERVACION' CHECK (tipo IN ('INCIDENCIA','OBSERVACION','SUGERENCIA')),
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_observaciones_mesa ON observaciones(mesa_id);

CREATE TABLE IF NOT EXISTS resoluciones (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    impugnacion_id BIGINT REFERENCES impugnaciones(id),
    resuelto_por VARCHAR(200) NOT NULL,
    fecha_resolucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalle TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resoluciones_impugnacion ON resoluciones(impugnacion_id);
