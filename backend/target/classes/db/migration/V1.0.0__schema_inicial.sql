-- ================================================================
-- V1.0.0: Esquema inicial del ERP Electoral
-- Crea todas las tablas del sistema si no existen
-- Orden correcto respetando dependencias de FK
-- ================================================================

-- ================================================================
-- 1. Tablas sin dependencias
-- ================================================================

CREATE TABLE IF NOT EXISTS zonas (
    id              BIGSERIAL       PRIMARY KEY,
    nombre          VARCHAR(100)    NOT NULL,
    descripcion     VARCHAR(500),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tipo_eleccion (
    id              BIGSERIAL       PRIMARY KEY,
    nombre          VARCHAR(100)    NOT NULL UNIQUE,
    descripcion     TEXT,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tipo_circunscripcion (
    id              BIGSERIAL       PRIMARY KEY,
    codigo          VARCHAR(30)     NOT NULL UNIQUE,
    nombre          VARCHAR(100)    NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id              BIGSERIAL       PRIMARY KEY,
    nombre          VARCHAR(50)     NOT NULL UNIQUE,
    descripcion     VARCHAR(255),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plantillas_papeleta (
    id                      BIGSERIAL   PRIMARY KEY,
    nombre                  VARCHAR(100) NOT NULL,
    tipo_diseno             VARCHAR(50),
    cantidad_columnas       INTEGER     DEFAULT 1,
    cantidad_filas          INTEGER     DEFAULT 1,
    posicion_logo           VARCHAR(20),
    posicion_numero         VARCHAR(20),
    posicion_candidatos     VARCHAR(20),
    color_fondo             VARCHAR(7),
    descripcion             TEXT
);

CREATE TABLE IF NOT EXISTS configuracion_sistema (
    id                  BIGINT          PRIMARY KEY,
    nombre_partido      VARCHAR(200)    NOT NULL,
    descripcion         TEXT,
    logo                BYTEA,
    apk_data            BYTEA,
    apk_nombre          VARCHAR(255),
    updated_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carousel_images (
    id              BIGSERIAL       PRIMARY KEY,
    caption         VARCHAR(2000)   NOT NULL,
    image_data      BYTEA           NOT NULL,
    orden           INTEGER         NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- 2. Geografía (jerárquica)
-- ================================================================

CREATE TABLE IF NOT EXISTS provincias (
    id              BIGSERIAL       PRIMARY KEY,
    zona_id         BIGINT          NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    descripcion     VARCHAR(500),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_provincia_zona FOREIGN KEY (zona_id) REFERENCES zonas(id)
);

CREATE TABLE IF NOT EXISTS cantones (
    id              BIGSERIAL       PRIMARY KEY,
    provincia_id    BIGINT          NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    descripcion     VARCHAR(500),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_canton_provincia FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

CREATE TABLE IF NOT EXISTS parroquias (
    id              BIGSERIAL       PRIMARY KEY,
    canton_id       BIGINT          NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    descripcion     VARCHAR(500),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_parroquia_canton FOREIGN KEY (canton_id) REFERENCES cantones(id)
);

CREATE TABLE IF NOT EXISTS instituciones_educativas (
    id              BIGSERIAL       PRIMARY KEY,
    parroquia_id    BIGINT          NOT NULL,
    nombre          VARCHAR(200)    NOT NULL,
    direccion       VARCHAR(500),
    codigo          VARCHAR(20),
    tipo            VARCHAR(50),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_institucion_parroquia FOREIGN KEY (parroquia_id) REFERENCES parroquias(id)
);

-- ================================================================
-- 3. Elecciones (depende de tipo_eleccion)
-- ================================================================

CREATE TABLE IF NOT EXISTS elecciones (
    id              BIGSERIAL       PRIMARY KEY,
    nombre          VARCHAR(200)    NOT NULL,
    descripcion     TEXT,
    fecha_inicio    TIMESTAMP       NOT NULL,
    fecha_fin       TIMESTAMP       NOT NULL,
    tipo_eleccion_id BIGINT,
    activa          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_eleccion_tipo FOREIGN KEY (tipo_eleccion_id) REFERENCES tipo_eleccion(id)
);

-- ================================================================
-- 4. Cargos y partidos (dependen de elecciones)
-- ================================================================

CREATE TABLE IF NOT EXISTS cargos (
    id                          BIGSERIAL       PRIMARY KEY,
    elecciones_id               BIGINT          NOT NULL,
    nombre                      VARCHAR(100)    NOT NULL,
    descripcion                 VARCHAR(255),
    tipo_votacion               VARCHAR(20),
    tipo_circunscripcion_id     BIGINT,
    cantidad_dignidades         INTEGER         DEFAULT 1,
    max_candidatos_lista        INTEGER,
    activo                      BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at                  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cargo_eleccion FOREIGN KEY (elecciones_id) REFERENCES elecciones(id),
    CONSTRAINT fk_cargo_circunscripcion FOREIGN KEY (tipo_circunscripcion_id) REFERENCES tipo_circunscripcion(id)
);

CREATE TABLE IF NOT EXISTS partidos (
    id              BIGSERIAL       PRIMARY KEY,
    elecciones_id   BIGINT          NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    sigla           VARCHAR(20),
    logo_url        VARCHAR(500),
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_partido_eleccion FOREIGN KEY (elecciones_id) REFERENCES elecciones(id)
);

-- ================================================================
-- 5. Tipo Elección Cargo (depende de tipo_eleccion y cargos)
-- ================================================================

CREATE TABLE IF NOT EXISTS tipo_eleccion_cargo (
    id                  BIGSERIAL   PRIMARY KEY,
    tipo_eleccion_id    BIGINT      NOT NULL,
    cargo_id            BIGINT      NOT NULL,
    orden               INTEGER     NOT NULL DEFAULT 0,
    CONSTRAINT fk_tec_tipo_eleccion FOREIGN KEY (tipo_eleccion_id) REFERENCES tipo_eleccion(id),
    CONSTRAINT fk_tec_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id),
    CONSTRAINT uq_tec_tipo_cargo UNIQUE (tipo_eleccion_id, cargo_id)
);

-- ================================================================
-- 6. Listas electorales (depende de elecciones, cargos, partidos)
-- ================================================================

CREATE TABLE IF NOT EXISTS listas_electorales (
    id                  BIGSERIAL   PRIMARY KEY,
    eleccion_id         BIGINT      NOT NULL,
    cargo_id            BIGINT      NOT NULL,
    partido_id          BIGINT,
    circunscripcion_tipo VARCHAR(30),
    circunscripcion_id  BIGINT,
    numero_lista        INTEGER     NOT NULL,
    nombre              VARCHAR(200) NOT NULL,
    estado              VARCHAR(20) DEFAULT 'ACTIVA',
    created_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lista_eleccion FOREIGN KEY (eleccion_id) REFERENCES elecciones(id),
    CONSTRAINT fk_lista_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id),
    CONSTRAINT fk_lista_partido FOREIGN KEY (partido_id) REFERENCES partidos(id),
    CONSTRAINT uq_lista_eleccion_cargo_partido_circ UNIQUE (eleccion_id, cargo_id, partido_id, circunscripcion_tipo, circunscripcion_id)
);

-- ================================================================
-- 7. Candidatos (depende de partidos, cargos, listas, elecciones, geografía)
-- ================================================================

CREATE TABLE IF NOT EXISTS candidatos (
    id                      BIGSERIAL       PRIMARY KEY,
    nombre                  VARCHAR(100)    NOT NULL,
    apellido                VARCHAR(100)    NOT NULL,
    partido_id              BIGINT,
    cargo_id                BIGINT,
    lista_id                BIGINT,
    foto_url                VARCHAR(500),
    elecciones_id           BIGINT,
    provincia_id            BIGINT,
    canton_id               BIGINT,
    parroquia_id            BIGINT,
    tipo_circunscripcion_id BIGINT,
    posicion_lista          INTEGER,
    orden_aparicion         INTEGER,
    orden_en_lista          INTEGER,
    tipo                    VARCHAR(20)     DEFAULT 'PRINCIPAL',
    principal               BOOLEAN         NOT NULL DEFAULT TRUE,
    activo                  BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_candidato_partido FOREIGN KEY (partido_id) REFERENCES partidos(id),
    CONSTRAINT fk_candidato_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id),
    CONSTRAINT fk_candidato_lista FOREIGN KEY (lista_id) REFERENCES listas_electorales(id),
    CONSTRAINT fk_candidato_eleccion FOREIGN KEY (elecciones_id) REFERENCES elecciones(id),
    CONSTRAINT fk_candidato_provincia FOREIGN KEY (provincia_id) REFERENCES provincias(id),
    CONSTRAINT fk_candidato_canton FOREIGN KEY (canton_id) REFERENCES cantones(id),
    CONSTRAINT fk_candidato_parroquia FOREIGN KEY (parroquia_id) REFERENCES parroquias(id),
    CONSTRAINT fk_candidato_circunscripcion FOREIGN KEY (tipo_circunscripcion_id) REFERENCES tipo_circunscripcion(id)
);

-- ================================================================
-- 8. Papeletas (depende de elecciones, cargos, tipo_circunscripcion, plantillas)
-- ================================================================

CREATE TABLE IF NOT EXISTS papeleta (
    id                          BIGSERIAL   PRIMARY KEY,
    eleccion_id                 BIGINT      NOT NULL,
    cargo_id                    BIGINT      NOT NULL,
    tipo_circunscripcion_id     BIGINT      NOT NULL,
    circunscripcion_id          BIGINT,
    titulo                      VARCHAR(300) NOT NULL,
    orden                       INTEGER     NOT NULL DEFAULT 0,
    color_hex                   VARCHAR(7),
    color_nombre                VARCHAR(50),
    plantilla_id                BIGINT,
    imagen_fondo_url            VARCHAR(500),
    cantidad_max_votos          INTEGER,
    permite_voto_cruzado        BOOLEAN     DEFAULT FALSE,
    permite_voto_lista_completa BOOLEAN     DEFAULT TRUE,
    numero_listas_visibles      INTEGER,
    cantidad_candidatos_por_lista INTEGER,
    orden_impresion             INTEGER,
    activa                      BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at                  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_papeleta_eleccion FOREIGN KEY (eleccion_id) REFERENCES elecciones(id),
    CONSTRAINT fk_papeleta_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id),
    CONSTRAINT fk_papeleta_circunscripcion FOREIGN KEY (tipo_circunscripcion_id) REFERENCES tipo_circunscripcion(id),
    CONSTRAINT fk_papeleta_plantilla FOREIGN KEY (plantilla_id) REFERENCES plantillas_papeleta(id),
    CONSTRAINT uq_papeleta_eleccion_cargo_circ UNIQUE (eleccion_id, cargo_id, tipo_circunscripcion_id)
);

CREATE TABLE IF NOT EXISTS opcion_papeleta (
    id              BIGSERIAL       PRIMARY KEY,
    papeleta_id     BIGINT          NOT NULL,
    tipo_opcion     VARCHAR(20)     NOT NULL,
    candidato_id    BIGINT,
    lista_id        BIGINT,
    partido_id      BIGINT,
    partido_sigla   VARCHAR(20),
    etiqueta        VARCHAR(200),
    orden           INTEGER         NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_opcion_papeleta FOREIGN KEY (papeleta_id) REFERENCES papeleta(id),
    CONSTRAINT fk_opcion_candidato FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
    CONSTRAINT fk_opcion_lista FOREIGN KEY (lista_id) REFERENCES listas_electorales(id),
    CONSTRAINT fk_opcion_partido FOREIGN KEY (partido_id) REFERENCES partidos(id)
);

-- ================================================================
-- 9. Usuarios (depende de roles)
-- ================================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id              BIGSERIAL       PRIMARY KEY,
    rol_id          BIGINT          NOT NULL,
    username        VARCHAR(50)     NOT NULL UNIQUE,
    password        VARCHAR(255)    NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    apellido        VARCHAR(100)    NOT NULL,
    email           VARCHAR(100)    UNIQUE,
    activo          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- ================================================================
-- 10. Mesas (depende de instituciones, elecciones)
-- ================================================================

CREATE TABLE IF NOT EXISTS mesas (
    id              BIGSERIAL       PRIMARY KEY,
    numero          VARCHAR(20)     NOT NULL,
    sexo            VARCHAR(10)     NOT NULL,
    institucion_id  BIGINT          NOT NULL,
    elections_id    BIGINT          NOT NULL,
    cerrada         BOOLEAN         NOT NULL DEFAULT FALSE,
    votos_nulos     INTEGER         DEFAULT 0,
    votos_blanco    INTEGER         DEFAULT 0,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mesa_institucion FOREIGN KEY (institucion_id) REFERENCES instituciones_educativas(id),
    CONSTRAINT fk_mesa_eleccion FOREIGN KEY (elections_id) REFERENCES elecciones(id)
);

CREATE TABLE IF NOT EXISTS mesa_usuarios (
    id          BIGSERIAL   PRIMARY KEY,
    mesa_id     BIGINT      NOT NULL,
    usuario_id  BIGINT      NOT NULL,
    CONSTRAINT fk_mu_mesa FOREIGN KEY (mesa_id) REFERENCES mesas(id),
    CONSTRAINT fk_mu_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ================================================================
-- 11. Votación (depende de candidatos, mesas, elecciones, usuarios, opciones)
-- ================================================================

CREATE TABLE IF NOT EXISTS votos (
    id              BIGSERIAL       PRIMARY KEY,
    candidato_id    BIGINT          NOT NULL,
    mesa_id         BIGINT          NOT NULL,
    cantidad_votos  INTEGER         NOT NULL DEFAULT 1,
    elecciones_id   BIGINT          NOT NULL,
    created_by      BIGINT          NOT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_voto_candidato FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
    CONSTRAINT fk_voto_mesa FOREIGN KEY (mesa_id) REFERENCES mesas(id),
    CONSTRAINT fk_voto_eleccion FOREIGN KEY (elecciones_id) REFERENCES elecciones(id),
    CONSTRAINT fk_voto_usuario FOREIGN KEY (created_by) REFERENCES usuarios(id),
    CONSTRAINT uq_voto_candidato_mesa UNIQUE (candidato_id, mesa_id)
);

CREATE TABLE IF NOT EXISTS voto_papeleta (
    id                  BIGSERIAL   PRIMARY KEY,
    opcion_papeleta_id  BIGINT      NOT NULL,
    mesa_id             BIGINT      NOT NULL,
    elecciones_id       BIGINT      NOT NULL,
    cantidad_votos      INTEGER     NOT NULL,
    created_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vp_opcion FOREIGN KEY (opcion_papeleta_id) REFERENCES opcion_papeleta(id),
    CONSTRAINT fk_vp_mesa FOREIGN KEY (mesa_id) REFERENCES mesas(id),
    CONSTRAINT fk_vp_eleccion FOREIGN KEY (elecciones_id) REFERENCES elecciones(id),
    CONSTRAINT uq_vp_opcion_mesa UNIQUE (opcion_papeleta_id, mesa_id)
);

-- ================================================================
-- 12. Permisos y auditoría (depende de roles, usuarios)
-- ================================================================

CREATE TABLE IF NOT EXISTS rol_permisos (
    id              BIGSERIAL   PRIMARY KEY,
    rol_id          BIGINT      NOT NULL,
    modulo          VARCHAR(50) NOT NULL,
    puede_ver       BOOLEAN     NOT NULL DEFAULT TRUE,
    puede_crear     BOOLEAN     NOT NULL DEFAULT FALSE,
    puede_editar    BOOLEAN     NOT NULL DEFAULT FALSE,
    puede_eliminar  BOOLEAN     NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_rp_rol FOREIGN KEY (rol_id) REFERENCES roles(id),
    CONSTRAINT uq_rp_rol_modulo UNIQUE (rol_id, modulo)
);

CREATE TABLE IF NOT EXISTS auditoria (
    id                  BIGSERIAL   PRIMARY KEY,
    usuario_id          BIGINT      NOT NULL,
    accion              VARCHAR(20) NOT NULL,
    entidad             VARCHAR(100) NOT NULL,
    entidad_id          BIGINT,
    datos_anteriores    JSONB,
    datos_nuevos        JSONB,
    ip_address          VARCHAR(45),
    created_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ================================================================
-- 13. Índices (después de todas las tablas)
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_provincias_zona_id ON provincias(zona_id);
CREATE INDEX IF NOT EXISTS idx_cantones_provincia_id ON cantones(provincia_id);
CREATE INDEX IF NOT EXISTS idx_parroquias_canton_id ON parroquias(canton_id);
CREATE INDEX IF NOT EXISTS idx_instituciones_parroquia_id ON instituciones_educativas(parroquia_id);
CREATE INDEX IF NOT EXISTS idx_elecciones_activa ON elecciones(activa);
CREATE INDEX IF NOT EXISTS idx_partidos_elecciones_id ON partidos(elecciones_id);
CREATE INDEX IF NOT EXISTS idx_candidatos_elecciones_id ON candidatos(elecciones_id);
CREATE INDEX IF NOT EXISTS idx_candidatos_cargo_id ON candidatos(cargo_id);
CREATE INDEX IF NOT EXISTS idx_candidatos_lista_id ON candidatos(lista_id);
CREATE INDEX IF NOT EXISTS idx_mesas_elections_id ON mesas(elections_id);
CREATE INDEX IF NOT EXISTS idx_mesas_institucion_id ON mesas(institucion_id);
CREATE INDEX IF NOT EXISTS idx_votos_mesa_id ON votos(mesa_id);
CREATE INDEX IF NOT EXISTS idx_votos_elecciones_id ON votos(elecciones_id);
CREATE INDEX IF NOT EXISTS idx_votos_candidato_id ON votos(candidato_id);
CREATE INDEX IF NOT EXISTS idx_auditoria_entidad ON auditoria(entidad);
CREATE INDEX IF NOT EXISTS idx_auditoria_created_at ON auditoria(created_at);
