-- ============================================================
-- SCRIPT: CREACIÓN COMPLETA DE BASE DE DATOS - Conteo Electoral
-- SISTEMA: Conteo Electoral
-- MOTOR: PostgreSQL
-- ============================================================

-- ============================================================
-- 1. CREAR BASE DE DATOS
-- ============================================================
-- Ejecutar este bloque si la base de datos aún no existe
-- (debe ejecutarse desde otra base de datos, ej: postgres)
-- ============================================================
-- CREATE DATABASE conteo_electoral
--     WITH ENCODING 'UTF8'
--     LC_COLLATE = 'es_ES.UTF-8'
--     LC_CTYPE = 'es_ES.UTF-8'
--     TEMPLATE template0;
-- ============================================================

-- Conectarse a la base de datos
\c conteo_electoral;

-- ============================================================
-- 2. CREAR TIPOS ENUM (para compatibilidad con JPA)
-- ============================================================
CREATE TYPE sexo_mesa AS ENUM ('HOMBRES', 'MUJERES', 'MIXTA');
CREATE TYPE tipo_accion AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- ============================================================
-- 3. CREAR TABLAS (ordenadas por dependencias)
-- ============================================================

-- 3.1. ZONAS
CREATE TABLE IF NOT EXISTS zonas (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3.2. PROVINCIAS
CREATE TABLE IF NOT EXISTS provincias (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    zona_id BIGINT NOT NULL,
    descripcion VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_provincias_zona FOREIGN KEY (zona_id) REFERENCES zonas(id)
);

-- 3.3. CANTONES
CREATE TABLE IF NOT EXISTS cantones (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    provincia_id BIGINT NOT NULL,
    descripcion VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cantones_provincia FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

-- 3.4. PARROQUIAS
CREATE TABLE IF NOT EXISTS parroquias (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    canton_id BIGINT NOT NULL,
    descripcion VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_parroquias_canton FOREIGN KEY (canton_id) REFERENCES cantones(id)
);

-- 3.5. INSTITUCIONES EDUCATIVAS
CREATE TABLE IF NOT EXISTS instituciones_educativas (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(500),
    parroquia_id BIGINT NOT NULL,
    codigo VARCHAR(20),
    tipo VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_instituciones_parroquia FOREIGN KEY (parroquia_id) REFERENCES parroquias(id)
);

-- 3.6. ELECCIONES
CREATE TABLE IF NOT EXISTS elecciones (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3.7. ROLES
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3.8. USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    rol_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuarios_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- 3.9. PARTIDOS
CREATE TABLE IF NOT EXISTS partidos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    sigla VARCHAR(20),
    logo_url VARCHAR(500),
    elecciones_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_partidos_elecciones FOREIGN KEY (elecciones_id) REFERENCES elecciones(id)
);

-- 3.10. CARGOS
CREATE TABLE IF NOT EXISTS cargos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    elecciones_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cargos_elecciones FOREIGN KEY (elecciones_id) REFERENCES elecciones(id)
);

-- 3.11. CANDIDATOS
CREATE TABLE IF NOT EXISTS candidatos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    partido_id BIGINT,
    cargo_id BIGINT NOT NULL,
    foto_url VARCHAR(500),
    elecciones_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_candidatos_partido FOREIGN KEY (partido_id) REFERENCES partidos(id),
    CONSTRAINT fk_candidatos_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id),
    CONSTRAINT fk_candidatos_elecciones FOREIGN KEY (elecciones_id) REFERENCES elecciones(id)
);

-- 3.12. MESAS
CREATE TABLE IF NOT EXISTS mesas (
    id BIGSERIAL PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    sexo sexo_mesa NOT NULL,
    institucion_id BIGINT NOT NULL,
    elections_id BIGINT NOT NULL,
    cerrada BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mesas_institucion FOREIGN KEY (institucion_id) REFERENCES instituciones_educativas(id),
    CONSTRAINT fk_mesas_elecciones FOREIGN KEY (elections_id) REFERENCES elecciones(id)
);

-- 3.13. MESA-USUARIOS (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS mesa_usuarios (
    id BIGSERIAL PRIMARY KEY,
    mesa_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    CONSTRAINT fk_mesa_usuarios_mesa FOREIGN KEY (mesa_id) REFERENCES mesas(id),
    CONSTRAINT fk_mesa_usuarios_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT uq_mesa_usuario UNIQUE (mesa_id, usuario_id)
);

-- 3.14. VOTOS
CREATE TABLE IF NOT EXISTS votos (
    id BIGSERIAL PRIMARY KEY,
    candidato_id BIGINT NOT NULL,
    mesa_id BIGINT NOT NULL,
    cantidad_votos INTEGER NOT NULL DEFAULT 1,
    elecciones_id BIGINT NOT NULL,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_votos_candidato FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
    CONSTRAINT fk_votos_mesa FOREIGN KEY (mesa_id) REFERENCES mesas(id),
    CONSTRAINT fk_votos_elecciones FOREIGN KEY (elecciones_id) REFERENCES elecciones(id),
    CONSTRAINT fk_votos_created_by FOREIGN KEY (created_by) REFERENCES usuarios(id),
    CONSTRAINT uq_votos_candidato_mesa UNIQUE (candidato_id, mesa_id)
);

-- 3.15. AUDITORIA
CREATE TABLE IF NOT EXISTS auditoria (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    accion tipo_accion NOT NULL,
    entidad VARCHAR(100) NOT NULL,
    entidad_id BIGINT,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ============================================================
-- 4. ÍNDICES ADICIONALES (para rendimiento)
-- ============================================================

-- Provincias
CREATE INDEX idx_provincias_zona_id ON provincias(zona_id);

-- Cantones
CREATE INDEX idx_cantones_provincia_id ON cantones(provincia_id);

-- Parroquias
CREATE INDEX idx_parroquias_canton_id ON parroquias(canton_id);

-- Instituciones Educativas
CREATE INDEX idx_instituciones_parroquia_id ON instituciones_educativas(parroquia_id);

-- Mesas
CREATE INDEX idx_mesas_institucion_id ON mesas(institucion_id);
CREATE INDEX idx_mesas_elections_id ON mesas(elections_id);
CREATE INDEX idx_mesas_numero ON mesas(numero);
CREATE INDEX idx_mesas_sexo ON mesas(sexo);

-- Mesa-Usuarios
CREATE INDEX idx_mesa_usuarios_mesa_id ON mesa_usuarios(mesa_id);
CREATE INDEX idx_mesa_usuarios_usuario_id ON mesa_usuarios(usuario_id);

-- Votos
CREATE INDEX idx_votos_mesa_id ON votos(mesa_id);
CREATE INDEX idx_votos_candidato_id ON votos(candidato_id);
CREATE INDEX idx_votos_elecciones_id ON votos(elecciones_id);

-- Auditoría
CREATE INDEX idx_auditoria_usuario_id ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_entidad ON auditoria(entidad);
CREATE INDEX idx_auditoria_created_at ON auditoria(created_at);

-- ============================================================
-- 5. DATOS INICIALES (SEED)
-- ============================================================

-- 5.1. Roles
INSERT INTO roles (nombre, descripcion) VALUES
    ('ADMIN', 'Administrador del sistema con acceso completo'),
    ('SUPERVISOR', 'Supervisor que gestiona mesas y usuarios'),
    ('MIEMBRO_MESA', 'Miembro de mesa que registra votos')
ON CONFLICT (nombre) DO NOTHING;

-- 5.2. Usuario administrador por defecto
-- Password: admin123 (BCrypt hashed)
INSERT INTO usuarios (username, password, nombre, apellido, email, activo, rol_id)
SELECT 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
       'Administrador', 'Sistema', 'admin@sistema.com', TRUE, id
FROM roles WHERE nombre = 'ADMIN'
ON CONFLICT (username) DO NOTHING;

-- 5.3. Ejemplo de elección (opcional, descomentar para usar)
-- INSERT INTO elecciones (nombre, descripcion, fecha_inicio, fecha_fin, activa) VALUES
--     ('Elecciones Generales 2025', 'Elecciones generales para dignidades provinciales y cantonales',
--      '2025-02-01 07:00:00', '2025-02-28 17:00:00', TRUE);

-- ============================================================
-- 6. CONFIGURACIÓN FINAL
-- ============================================================

-- Comentarios en tablas
COMMENT ON TABLE zonas IS 'Zonas geográficas';
COMMENT ON TABLE provincias IS 'Provincias asociadas a una zona';
COMMENT ON TABLE cantones IS 'Cantones asociados a una provincia';
COMMENT ON TABLE parroquias IS 'Parroquias asociadas a un cantón';
COMMENT ON TABLE instituciones_educativas IS 'Instituciones educativas (recintos electorales)';
COMMENT ON TABLE elecciones IS 'Procesos electorales';
COMMENT ON TABLE roles IS 'Roles del sistema (ADMIN, SUPERVISOR, MIEMBRO_MESA)';
COMMENT ON TABLE usuarios IS 'Usuarios del sistema';
COMMENT ON TABLE partidos IS 'Partidos políticos por elección';
COMMENT ON TABLE cargos IS 'Cargos de elección popular';
COMMENT ON TABLE candidatos IS 'Candidatos por partido y cargo';
COMMENT ON TABLE mesas IS 'Mesas electorales';
COMMENT ON TABLE mesa_usuarios IS 'Asignación de usuarios a mesas';
COMMENT ON TABLE votos IS 'Registro de votos por candidato y mesa';
COMMENT ON TABLE auditoria IS 'Auditoría de cambios en el sistema';

COMMENT ON COLUMN mesas.numero IS 'Número de la mesa electoral';
COMMENT ON COLUMN mesas.sexo IS 'Sexo de la mesa: HOMBRES, MUJERES, MIXTA';
COMMENT ON COLUMN mesas.cerrada IS 'Indica si la mesa está cerrada (no acepta más votos)';
COMMENT ON COLUMN votos.cantidad_votos IS 'Cantidad de votos registrados para el candidato en esa mesa';

-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================
