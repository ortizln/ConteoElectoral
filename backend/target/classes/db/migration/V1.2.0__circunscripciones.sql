CREATE TABLE IF NOT EXISTS circunscripciones (
    id BIGSERIAL PRIMARY KEY,
    eleccion_id BIGINT NOT NULL REFERENCES elecciones(id),
    tipo_circunscripcion_id BIGINT REFERENCES tipo_circunscripcion(id),
    nombre VARCHAR(200) NOT NULL,
    codigo VARCHAR(30),
    escanos INT NOT NULL DEFAULT 1,
    umbral_electoral DECIMAL(5,2) DEFAULT 0,
    metodo_asignacion VARCHAR(20) DEFAULT 'D_HONDT',
    activa BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_circunscripciones_eleccion ON circunscripciones(eleccion_id);

CREATE TABLE IF NOT EXISTS asignacion_escanos (
    id BIGSERIAL PRIMARY KEY,
    circunscripcion_id BIGINT NOT NULL REFERENCES circunscripciones(id),
    partido_id BIGINT REFERENCES partidos(id),
    lista_id BIGINT REFERENCES listas_electorales(id),
    votos_validos INT NOT NULL DEFAULT 0,
    porcentaje_votos DECIMAL(5,2) DEFAULT 0,
    escanos_asignados INT NOT NULL DEFAULT 0,
    cocientes JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_asignacion_circunscripcion ON asignacion_escanos(circunscripcion_id);
CREATE INDEX IF NOT EXISTS idx_asignacion_partido ON asignacion_escanos(partido_id);
