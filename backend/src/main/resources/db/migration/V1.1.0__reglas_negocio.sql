CREATE TABLE IF NOT EXISTS reglas_negocio (
    id BIGSERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('VALIDACION', 'CALCULO', 'COMPORTAMIENTO')),
    modulo VARCHAR(30) NOT NULL CHECK (modulo IN ('CANDIDATOS', 'VOTOS', 'PAPELETAS', 'MESAS', 'ESCRUTINIO', 'PARTIDOS', 'LISTAS')),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    condicion JSONB NOT NULL DEFAULT '{}',
    mensaje_error VARCHAR(500),
    accion VARCHAR(50),
    activa BOOLEAN NOT NULL DEFAULT true,
    prioridad INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reglas_negocio_modulo ON reglas_negocio(modulo);
CREATE INDEX IF NOT EXISTS idx_reglas_negocio_tipo ON reglas_negocio(tipo);
CREATE INDEX IF NOT EXISTS idx_reglas_negocio_activa ON reglas_negocio(activa);

INSERT INTO reglas_negocio (tipo, modulo, nombre, descripcion, condicion, mensaje_error, accion, prioridad)
SELECT v.tipo, v.modulo, v.nombre, v.descripcion, v.condicion::jsonb, v.mensaje_error, v.accion, v.prioridad FROM (VALUES
    ('VALIDACION'::VARCHAR, 'CANDIDATOS'::VARCHAR, 'Edad mínima candidato',
     'Valida que el candidato tenga al menos 18 años',
     '{"condition": "AND", "rules": [{"field": "edad", "operator": "GREATER_THAN_OR_EQUAL", "value": 18}]}',
     'El candidato debe tener al menos 18 años', 'RECHAZAR', 1),
    ('VALIDACION', 'CANDIDATOS', 'Nombre obligatorio',
     'Valida que el nombre del candidato no esté vacío',
     '{"condition": "AND", "rules": [{"field": "nombre", "operator": "NOT_NULL"}, {"field": "nombre", "operator": "NOT_EMPTY"}]}',
     'El nombre del candidato es obligatorio', 'RECHAZAR', 0),
    ('VALIDACION', 'CANDIDATOS', 'Candidato único por partido y cargo',
     'Valida que no existan dos candidatos del mismo partido para el mismo cargo en la misma elección',
     '{"condition": "AND", "rules": [{"field": "partidoId", "operator": "NOT_NULL"}, {"field": "cargoId", "operator": "NOT_NULL"}]}',
     'Ya existe un candidato de este partido para este cargo en la elección seleccionada', 'RECHAZAR', 2),
    ('VALIDACION', 'MESAS', 'Mesa requiere institución',
     'Valida que la mesa tenga una institución educativa asignada',
     '{"condition": "AND", "rules": [{"field": "institucionId", "operator": "NOT_NULL"}]}',
     'La mesa debe tener una institución educativa asignada', 'RECHAZAR', 0),
    ('VALIDACION', 'VOTOS', 'Voto no nulo sin candidato',
     'Si el voto no es nulo o blanco, debe tener un candidato asignado',
     '{"condition": "AND", "rules": [{"field": "candidatoId", "operator": "NOT_NULL"}]}',
     'El candidato debe tener un candidato asignado o marcarse como nulo/blanco', 'RECHAZAR', 0)
) AS v (tipo, modulo, nombre, descripcion, condicion, mensaje_error, accion, prioridad)
WHERE NOT EXISTS (SELECT 1 FROM reglas_negocio r WHERE r.nombre = v.nombre AND r.modulo = v.modulo);
