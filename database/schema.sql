-- =====================================================
-- SISTEMA DE CONTROL ELECTORAL - PostgreSQL Schema
-- =====================================================

-- =====================================================
-- ENUMS
-- =====================================================
CREATE TYPE sexo_mesa AS ENUM ('MASCULINO', 'FEMENINO', 'MIXTA');
CREATE TYPE tipo_accion AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- =====================================================
-- USUARIOS Y AUTENTICACIÓN
-- =====================================================
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (nombre, descripcion) VALUES 
    ('ADMIN', 'Administrador del sistema'),
    ('SUPERVISOR', 'Supervisor de elecciones'),
    ('MIEMBRO_MESA', 'Miembro de mesa de votación');

CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    activo BOOLEAN DEFAULT true,
    rol_id BIGINT NOT NULL REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_usuarios_username ON usuarios(username);
CREATE INDEX idx_usuarios_rol ON usuarios(rol_id);

-- =====================================================
-- JERARQUÍA ELECTORAL (Zona → Provincia → Cantón → Parroquia → Institución)
-- =====================================================
CREATE TABLE zonas (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE provincias (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    zona_id BIGINT NOT NULL REFERENCES zonas(id),
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_provincias_zona ON provincias(zona_id);

CREATE TABLE cantones (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    provincia_id BIGINT NOT NULL REFERENCES provincias(id),
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cantones_provincia ON cantones(provincia_id);

CREATE TABLE parroquias (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    canton_id BIGINT NOT NULL REFERENCES cantones(id),
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_parroquias_canton ON parroquias(canton_id);

CREATE TABLE instituciones_educativas (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    parroquia_id BIGINT NOT NULL REFERENCES parroquias(id),
    direccion VARCHAR(500),
    codigo VARCHAR(50),
    tipo VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_instituciones_parroquia ON instituciones_educativas(parroquia_id);

-- =====================================================
-- GESTIÓN ELECTORAL
-- =====================================================
CREATE TABLE elecciones (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    activa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partidos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    sigla VARCHAR(20),
    logo_url VARCHAR(500),
    elecciones_id BIGINT NOT NULL REFERENCES elecciones(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(nombre, elecciones_id)
);

CREATE INDEX idx_partidos_eleccion ON partidos(elecciones_id);

CREATE TABLE cargos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    elecciones_id BIGINT NOT NULL REFERENCES elecciones(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(nombre, elecciones_id)
);

CREATE INDEX idx_cargos_eleccion ON cargos(elecciones_id);

CREATE TABLE candidatos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    partido_id BIGINT REFERENCES partidos(id),
    cargo_id BIGINT NOT NULL REFERENCES cargos(id),
    foto_url VARCHAR(500),
    elecciones_id BIGINT NOT NULL REFERENCES elecciones(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_candidatos_cargo ON candidatos(cargo_id);
CREATE INDEX idx_candidatos_partido ON candidatos(partido_id);
CREATE INDEX idx_candidatos_eleccion ON candidatos(elecciones_id);

-- =====================================================
-- RECINTOS Y MESAS
-- =====================================================
CREATE TABLE recintos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(500),
    institucion_id BIGINT NOT NULL REFERENCES instituciones_educativas(id),
    elecciones_id BIGINT NOT NULL REFERENCES elecciones(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_recintos_institucion ON recintos(institucion_id);
CREATE INDEX idx_recintos_eleccion ON recintos(elecciones_id);

CREATE TABLE mesas (
    id BIGSERIAL PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    sexo sexo_mesa NOT NULL,
    recinto_id BIGINT NOT NULL REFERENCES recintos(id),
    elecciones_id BIGINT NOT NULL REFERENCES elecciones(id),
    cerrada BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(numero, recinto_id)
);

CREATE INDEX idx_mesas_recinto ON mesas(recinto_id);
CREATE INDEX idx_mesas_cerrada ON mesas(cerrada);

-- =====================================================
-- ASIGNACIÓN DE USUARIOS A MESAS
-- =====================================================
CREATE TABLE mesa_usuarios (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT NOT NULL REFERENCES mesas(id),
    usuario_id BIGINT NOT NULL REFERENCES usuarios(id),
    UNIQUE(mesa_id, usuario_id)
);

CREATE INDEX idx_mesa_usuarios_mesa ON mesa_usuarios(mesa_id);
CREATE INDEX idx_mesa_usuarios_usuario ON mesa_usuarios(usuario_id);

-- =====================================================
-- REGISTRO DE VOTOS
-- =====================================================
CREATE TABLE votos (
    id BIGSERIAL PRIMARY KEY,
    candidato_id BIGINT NOT NULL REFERENCES candidatos(id),
    mesa_id BIGINT NOT NULL REFERENCES mesas(id),
    cantidad_votos INTEGER DEFAULT 1,
    elecciones_id BIGINT NOT NULL REFERENCES elecciones(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL REFERENCES usuarios(id),
    UNIQUE(candidato_id, mesa_id)
);

CREATE INDEX idx_votos_mesa ON votos(mesa_id);
CREATE INDEX idx_votos_candidato ON votos(candidato_id);
CREATE INDEX idx_votos_eleccion ON votos(elecciones_id);

-- =====================================================
-- AUDITORÍA
-- =====================================================
CREATE TABLE auditoria (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL REFERENCES usuarios(id),
    accion tipo_accion NOT NULL,
    entidad VARCHAR(100) NOT NULL,
    entidad_id BIGINT,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_fecha ON auditoria(created_at);
CREATE INDEX idx_auditoria_entidad ON auditoria(entidad, entidad_id);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para obtener resultados por elección
CREATE OR REPLACE FUNCTION fn_resultados_eleccion(p_eleccion_id BIGINT)
RETURNS TABLE (
    candidato_id BIGINT,
    nombre_completo VARCHAR,
    partido_nombre VARCHAR,
    cargo_nombre VARCHAR,
    total_votos BIGINT,
    porcentaje NUMERIC(5,2)
) AS $$
BEGIN
    RETURN QUERY
    WITH totales AS (
        SELECT 
            v.candidato_id,
            SUM(v.cantidad_votos) as total
        FROM votos v
        WHERE v.elecciones_id = p_eleccion_id
        GROUP BY v.candidato_id
    )
    SELECT 
        c.id as candidato_id,
        c.nombre || ' ' || c.apellido as nombre_completo,
        p.nombre as partido_nombre,
        cg.nombre as cargo_nombre,
        COALESCE(t.total, 0)::BIGINT as total_votos,
        CASE 
            WHEN (SELECT SUM(cantidad_votos) FROM votos WHERE elecciones_id = p_eleccion_id) > 0
            THEN ROUND((COALESCE(t.total, 0)::NUMERIC / 
                (SELECT SUM(cantidad_votos) FROM votos WHERE elecciones_id = p_eleccion_id)::NUMERIC) * 100, 2)
            ELSE 0
        END as porcentaje
    FROM candidatos c
    LEFT JOIN partidos p ON c.partido_id = p.id
    JOIN cargos cg ON c.cargo_id = cg.id
    LEFT JOIN totales t ON t.candidato_id = c.id
    WHERE c.elecciones_id = p_eleccion_id
    ORDER BY total_votos DESC;
END;
$$ LANGUAGE plpgsql;

-- Función para resultados por recinto
CREATE OR REPLACE FUNCTION fn_resultados_recinto(p_recinto_id BIGINT, p_eleccion_id BIGINT)
RETURNS TABLE (
    candidato_id BIGINT,
    total_votos BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.candidato_id,
        SUM(v.cantidad_votos)::BIGINT as total_votos
    FROM votos v
    JOIN mesas m ON v.mesa_id = m.id
    WHERE m.recinto_id = p_recinto_id AND v.elecciones_id = p_eleccion_id
    GROUP BY v.candidato_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VISTAS PARA DASHBOARD
-- =====================================================
CREATE VIEW vw_estadisticas_generales AS
SELECT 
    e.nombre as eleccion_nombre,
    COUNT(DISTINCT p.id) as total_partidos,
    COUNT(DISTINCT c.id) as total_candidatos,
    COUNT(DISTINCT r.id) as total_recintos,
    COUNT(DISTINCT m.id) as total_mesas,
    COALESCE(SUM(v.cantidad_votos), 0) as total_votos,
    COUNT(DISTINCT CASE WHEN m.cerrada THEN m.id END) as mesas_cerradas
FROM elecciones e
LEFT JOIN partidos p ON p.elecciones_id = e.id
LEFT JOIN candidatos c ON c.elecciones_id = e.id
LEFT JOIN recintos r ON r.elecciones_id = e.id
LEFT JOIN mesas m ON m.elecciones_id = e.id
LEFT JOIN votos v ON v.elecciones_id = e.id
WHERE e.activa = true
GROUP BY e.id, e.nombre;

-- =====================================================
-- USUARIO ADMINISTRADOR POR DEFECTO
-- Password: admin123 (BCrypt hash generado para "admin123")
-- =====================================================
INSERT INTO usuarios (username, password, nombre, apellido, email, rol_id, activo)
VALUES ('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 
        'Administrador', 'Sistema', 'admin@electoral.gob', 1, true);

-- =====================================================
-- TRIGGER PARA AUDITORÍA AUTOMÁTICA
-- =====================================================
CREATE OR REPLACE FUNCTION fn_auditoria_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria (usuario_id, accion, entidad, entidad_id, datos_anteriores, datos_nuevos)
    VALUES (
        COALESCE(current_setting('app.audit_user', true), '1')::BIGINT,
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'CREATE'
            WHEN TG_OP = 'UPDATE' THEN 'UPDATE'
            WHEN TG_OP = 'DELETE' THEN 'DELETE'
        END,
        TG_TABLE_NAME,
        NEW.id,
        CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN row_to_json(OLD)::JSONB ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW)::JSONB ELSE NULL END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auditoría automática
CREATE OR REPLACE FUNCTION fn_auditoria_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria (usuario_id, accion, entidad, entidad_id, datos_anteriores, datos_nuevos)
    VALUES (
        COALESCE(current_setting('app.audit_user', true), '1')::BIGINT,
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'CREATE'
            WHEN TG_OP = 'UPDATE' THEN 'UPDATE'
            WHEN TG_OP = 'DELETE' THEN 'DELETE'
        END,
        TG_TABLE_NAME,
        NEW.id,
        CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN row_to_json(OLD)::JSONB ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW)::JSONB ELSE NULL END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



INSERT INTO usuarios (username, password, nombre, apellido, email, rol_id, activo)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
        'Administrador', 'Sistema', 'admin@electoral.gob', 1, true);