# 03 — MODELO DE BASE DE DATOS

> Documento completo del modelo de datos del ERP Electoral, incluyendo esquemas, relaciones, migraciones y estándares.

---

## 1. ESTÁNDARES DE BASE DE DATOS

### Naming Conventions
| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Tablas | snake_case, plural | `elecciones`, `tipos_eleccion`, `usuarios` | 
| Columnas | snake_case, singular | `nombre`, `fecha_inicio`, `es_activa` |
| PK | `id` | `id BIGSERIAL PRIMARY KEY` |
| FK | `{tabla}_id` | `eleccion_id`, `usuario_id` |
| Índices | `idx_{tabla}_{columna}` | `idx_elecciones_activa` |
| Unique | `uq_{tabla}_{columna}` | `uq_usuarios_email` |
| FK Constraint | `fk_{tabla_origen}_{tabla_destino}` | `fk_mesa_eleccion` |

### Tipos de Datos
| Uso | Tipo PostgreSQL | Tipo SQLite |
|-----|----------------|-------------|
| ID autogenerado | `BIGSERIAL` | `INTEGER PRIMARY KEY AUTOINCREMENT` |
| ID distribuido | `UUID` | `TEXT` |
| Texto corto | `VARCHAR(255)` | `TEXT` |
| Texto largo | `TEXT` | `TEXT` |
| Número entero | `INTEGER` / `BIGINT` | `INTEGER` |
| Decimal | `DECIMAL(10,2)` | `REAL` |
| Booleano | `BOOLEAN` | `INTEGER (0/1)` |
| Fecha | `DATE` | `TEXT (ISO 8601)` |
| Fecha+hora | `TIMESTAMP` | `TEXT (ISO 8601)` |
| JSON | `JSONB` | `TEXT (JSON string)` |
| Enumeración | `VARCHAR(50)` + check | `TEXT` |

### Columnas Auditables (Toda tabla)
```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
creado_por VARCHAR(100),
actualizado_por VARCHAR(100)
```

---

## 2. ESQUEMA POSTGRESQL (COMPLETO)

### 2.1 Geografía

#### `zonas`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre | VARCHAR(255) NOT NULL | Nombre de la zona |
| descripcion | TEXT | |

#### `provincias`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| zona_id | BIGINT FK → zonas | |
| nombre | VARCHAR(255) NOT NULL | |
| codigo | VARCHAR(10) | Código oficial |
| poblacion | INTEGER | |

#### `cantones`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| provincia_id | BIGINT FK → provincias | |
| nombre | VARCHAR(255) NOT NULL | |
| codigo | VARCHAR(10) | |

#### `parroquias`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| canton_id | BIGINT FK → cantones | |
| nombre | VARCHAR(255) NOT NULL | |
| codigo | VARCHAR(10) | |

#### `instituciones_educativas`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| parroquia_id | BIGINT FK → parroquias | |
| codigo_amie | VARCHAR(50) | Código AMIE |
| nombre | VARCHAR(255) NOT NULL | |
| direccion | TEXT | |
| zona | VARCHAR(50) | Rural/Urbana |

### 2.2 Configuración Electoral

#### `tipos_eleccion`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre | VARCHAR(255) NOT NULL | |
| descripcion | TEXT | |
| activo | BOOLEAN DEFAULT true | |

#### `tipos_circunscripcion`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre | VARCHAR(255) NOT NULL | Nacional, Provincial, etc. |
| descripcion | TEXT | |
| nivel | INTEGER | Orden jerárquico |

#### `cargos`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre | VARCHAR(255) NOT NULL | |
| descripcion | TEXT | |
| tipo_votacion | VARCHAR(50) | INDIVIDUAL, LISTA, PLURINOMINAL, PREFERENCIAL, MIXTO |
| tipo_circunscripcion_id | BIGINT FK → tipos_circunscripcion | |
| activo | BOOLEAN DEFAULT true | |

#### `tipo_eleccion_cargo`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| tipo_eleccion_id | BIGINT FK → tipos_eleccion | |
| cargo_id | BIGINT FK → cargos | |
| orden | INTEGER | Posición en papeleta |

#### `plantillas_papeleta`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre | VARCHAR(255) NOT NULL | |
| descripcion | TEXT | |
| tipo_votacion | VARCHAR(50) | |
| formato | TEXT | JSON con configuración |

### 2.3 Datos Electorales

#### `elecciones`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| tipo_eleccion_id | BIGINT FK → tipos_eleccion | |
| nombre | VARCHAR(255) NOT NULL | |
| descripcion | TEXT | |
| fecha | DATE NOT NULL | |
| activa | BOOLEAN DEFAULT true | |
| permite_blanco | BOOLEAN DEFAULT true | |
| estado | VARCHAR(50) | PREPARACION, VOTACION, ESCRUTINIO, FINALIZADA |

#### `partidos`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| eleccion_id | BIGINT FK → elecciones | |
| nombre | VARCHAR(255) NOT NULL | |
| siglas | VARCHAR(50) | |
| color_hex | VARCHAR(7) | Código color #RRGGBB |
| logo_url | TEXT | |
| activo | BOOLEAN DEFAULT true | |

#### `listas_electorales`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| eleccion_id | BIGINT FK → elecciones | |
| partido_id | BIGINT FK → partidos | |
| cargo_id | BIGINT FK → cargos | |
| tipo_circunscripcion_id | BIGINT FK → tipos_circunscripcion | |
| nombre | VARCHAR(255) | |
| numero_lista | VARCHAR(10) | Número de lista |
| activa | BOOLEAN DEFAULT true | |

#### `candidatos`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| eleccion_id | BIGINT FK → elecciones | |
| partido_id | BIGINT FK → partidos | |
| cargo_id | BIGINT FK → cargos | |
| lista_id | BIGINT FK → listas_electorales | |
| nombres | VARCHAR(255) NOT NULL | |
| apellidos | VARCHAR(255) NOT NULL | |
| cedula | VARCHAR(20) | |
| tipo | VARCHAR(20) | PRINCIPAL, SUPLENTE |
| orden_en_lista | INTEGER | |
| foto_url | TEXT | |
| activo | BOOLEAN DEFAULT true | |

#### `papeletas`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| eleccion_id | BIGINT FK → elecciones | |
| cargo_id | BIGINT FK → cargos | |
| plantilla_id | BIGINT FK → plantillas_papeleta | |
| titulo | VARCHAR(255) | |
| color_hex | VARCHAR(7) | |
| cantidad_max_votos | INTEGER | Para plurinominales |
| orden | INTEGER | |

#### `opciones_papeleta`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| papeleta_id | BIGINT FK → papeletas | |
| lista_electoral_id | BIGINT FK → listas_electorales | |
| candidato_id | BIGINT FK → candidatos | |
| partido_id | BIGINT FK → partidos | |
| orden | INTEGER | |
| valor | VARCHAR(100) | Texto mostrado |

### 2.4 Mesas

#### `mesas`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| eleccion_id | BIGINT FK → elecciones | |
| institucion_id | BIGINT FK → instituciones_educativas | |
| numero_mesa | VARCHAR(20) NOT NULL | |
| codigo_mesa | VARCHAR(50) | Código único |
| numero_votantes | INTEGER | |
| votos_blanco | INTEGER DEFAULT 0 | |
| acta_cerrada | BOOLEAN DEFAULT false | |
| cerrada_en | TIMESTAMP | |
| reabierta | BOOLEAN DEFAULT false | |
| observaciones | TEXT | |

#### `mesas_usuarios`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| mesa_id | BIGINT FK → mesas | |
| usuario_id | BIGINT FK → usuarios | |
| rol_en_mesa | VARCHAR(50) | Presidente, Secretario, Vocal |

### 2.5 Votación

#### `votos`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| mesa_id | BIGINT FK → mesas | |
| eleccion_id | BIGINT FK → elecciones | |
| candidato_id | BIGINT FK → candidatos | |
| partido_id | BIGINT FK → partidos | |
| cantidad | INTEGER DEFAULT 1 | |
| es_nulo | BOOLEAN DEFAULT false | |
| es_blanco | BOOLEAN DEFAULT false | |
| registrado_por | BIGINT FK → usuarios | |
| registrado_en | TIMESTAMP | |
| sincronizado | BOOLEAN DEFAULT true | Para mobile |

#### `votos_papeleta`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| mesa_id | BIGINT FK → mesas | |
| eleccion_id | BIGINT FK → elecciones | |
| opcion_papeleta_id | BIGINT FK → opciones_papeleta | |
| cantidad | INTEGER DEFAULT 1 | |
| es_nulo | BOOLEAN DEFAULT false | |
| es_blanco | BOOLEAN DEFAULT false | |
| registrado_por | BIGINT FK → usuarios | |
| registrado_en | TIMESTAMP | |

### 2.6 Usuarios y Seguridad

#### `usuarios`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| rol_id | BIGINT FK → roles | |
| username | VARCHAR(50) NOT NULL UNIQUE | |
| password_hash | VARCHAR(255) NOT NULL | BCrypt |
| nombres | VARCHAR(255) | |
| apellidos | VARCHAR(255) | |
| email | VARCHAR(255) UNIQUE | |
| cedula | VARCHAR(20) UNIQUE | |
| activo | BOOLEAN DEFAULT true | |
| ultimo_acceso | TIMESTAMP | |

#### `roles`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre | VARCHAR(50) NOT NULL UNIQUE | ADMIN, SUPERVISOR, etc. |
| descripcion | TEXT | |

#### `roles_permisos`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| rol_id | BIGINT FK → roles | |
| modulo | VARCHAR(100) | |
| puede_crear | BOOLEAN DEFAULT false | |
| puede_ver | BOOLEAN DEFAULT false | |
| puede_editar | BOOLEAN DEFAULT false | |
| puede_eliminar | BOOLEAN DEFAULT false | |

### 2.7 Configuración y Auditoría

#### `configuracion_sistema`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| nombre_partido | VARCHAR(255) | |
| descripcion_partido | TEXT | |
| logo_url | TEXT | |
| apk_url | TEXT | URL de descarga APK |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

#### `carousel_images`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| titulo | VARCHAR(255) | |
| imagen_url | TEXT | |
| orden | INTEGER | |
| activo | BOOLEAN DEFAULT true | |

#### `auditoria`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL PK | |
| usuario | VARCHAR(100) | |
| fecha | DATE | |
| hora | TIME | |
| equipo | VARCHAR(255) | |
| ip | VARCHAR(50) | |
| modulo | VARCHAR(100) | |
| accion | VARCHAR(20) | CREATE, UPDATE, DELETE |
| registro_id | BIGINT | |
| valor_anterior | JSONB | |
| valor_nuevo | JSONB | |

---

## 3. ESQUEMA SQLITE (MÓVIL OFFLINE)

### 3.1 Tablas (versión 3)

```sql
CREATE TABLE elecciones (
  id INTEGER PRIMARY KEY,
  tipo_eleccion_id INTEGER,
  nombre TEXT, fecha TEXT,
  activa INTEGER DEFAULT 1,
  permite_blanco INTEGER DEFAULT 1,
  estado TEXT
);

CREATE TABLE partidos (
  id INTEGER PRIMARY KEY,
  eleccion_id INTEGER,
  nombre TEXT, siglas TEXT,
  color_hex TEXT, logo_url TEXT,
  activo INTEGER DEFAULT 1
);

CREATE TABLE cargos (
  id INTEGER PRIMARY KEY,
  nombre TEXT,
  tipo_votacion TEXT,
  tipo_circunscripcion_id INTEGER,
  descripcion TEXT
);

CREATE TABLE candidatos (
  id INTEGER PRIMARY KEY,
  eleccion_id INTEGER,
  partido_id INTEGER,
  cargo_id INTEGER,
  lista_id INTEGER,
  nombres TEXT, apellidos TEXT,
  cedula TEXT, tipo TEXT,
  orden_en_lista INTEGER,
  foto_url TEXT, activo INTEGER DEFAULT 1
);

CREATE TABLE recintos (
  id INTEGER PRIMARY KEY,
  institucion_id INTEGER,
  nombre TEXT, direccion TEXT,
  parroquia_id INTEGER,
  canton_id INTEGER,
  provincia_id INTEGER,
  zona_id INTEGER
);

CREATE TABLE mesas (
  id INTEGER PRIMARY KEY,
  eleccion_id INTEGER,
  institucion_id INTEGER,
  numero_mesa TEXT, codigo_mesa TEXT,
  numero_votantes INTEGER,
  votos_blanco INTEGER DEFAULT 0,
  acta_cerrada INTEGER DEFAULT 0,
  cerrada_en TEXT
);

CREATE TABLE votos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mesa_id INTEGER, eleccion_id INTEGER,
  candidato_id INTEGER, partido_id INTEGER,
  cantidad INTEGER DEFAULT 1,
  es_nulo INTEGER DEFAULT 0,
  es_blanco INTEGER DEFAULT 0,
  registrado_en TEXT,
  sincronizado INTEGER DEFAULT 0
);

CREATE TABLE session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT, username TEXT,
  rol TEXT, user_id INTEGER,
  login_at TEXT
);
```

### 3.2 Migraciones SQLite Versionadas
En `DatabaseHelper.java`, método `_onUpgrade`:
- v1 → v2: agrega columna `lista_id` a candidatos
- v2 → v3: agrega columna `permite_blanco` a elecciones
- v3 → v4: futura migración

---

## 4. MIGRACIONES FLYWAY (PLANIFICADAS)

### Convención de Nombres
```
V{major}.{minor}.{patch}__{descripcion}.sql
Ejemplo: V2.0.0__motor_reglas.sql
```

### Migraciones Pendientes
| Archivo | Descripción |
|---------|-------------|
| V2.0.0__motor_reglas.sql | Tabla reglas_negocio, configuraciones |
| V2.0.1__circunscripciones.sql | Ampliar modelo circunscripciones |
| V2.0.2__calendario_electoral.sql | Tabla etapas_eleccion, calendario |
| V3.0.0__escrutinio.sql | Tablas reconteo, impugnaciones |
| V3.0.1__auditoria_completa.sql | Índices y triggers de auditoría |

---

## 5. ÍNDICES RECOMENDADOS

```sql
-- Geografía (para filtros jerárquicos)
CREATE INDEX idx_provincias_zona_id ON provincias(zona_id);
CREATE INDEX idx_cantones_provincia_id ON cantones(provincia_id);
CREATE INDEX idx_parroquias_canton_id ON parroquias(canton_id);
CREATE INDEX idx_instituciones_parroquia_id ON instituciones_educativas(parroquia_id);

-- Elecciones
CREATE INDEX idx_elecciones_activa ON elecciones(activa);
CREATE INDEX idx_elecciones_tipo ON elecciones(tipo_eleccion_id);

-- Partidos y candidatos
CREATE INDEX idx_partidos_eleccion_id ON partidos(eleccion_id);
CREATE INDEX idx_candidatos_eleccion_id ON candidatos(eleccion_id);
CREATE INDEX idx_candidatos_cargo_id ON candidatos(cargo_id);
CREATE INDEX idx_candidatos_lista_id ON candidatos(lista_id);

-- Mesas
CREATE INDEX idx_mesas_eleccion_id ON mesas(eleccion_id);
CREATE INDEX idx_mesas_institucion_id ON mesas(institucion_id);
CREATE INDEX idx_mesas_acta_cerrada ON mesas(acta_cerrada);

-- Votos
CREATE INDEX idx_votos_mesa_id ON votos(mesa_id);
CREATE INDEX idx_votos_eleccion_id ON votos(eleccion_id);
CREATE INDEX idx_votos_candidato_id ON votos(candidato_id);
CREATE INDEX idx_votos_partido_id ON votos(partido_id);

-- Auditoría
CREATE INDEX idx_auditoria_modulo ON auditoria(modulo);
CREATE INDEX idx_auditoria_fecha ON auditoria(fecha);
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario);
```

---

## 6. REGLAS DE INTEGRIDAD

### Constraints de Negocio (implementar en aplicación + BD)
1. **Unicidad de mesa por elección**: UNIQUE(eleccion_id, numero_mesa)
2. **Unicidad de candidato por cargo/lista**: UNIQUE(eleccion_id, cargo_id, lista_id, cedula)
3. **Unicidad de usuario por email**: UNIQUE(email)
4. **Unicidad de usuario por cédula**: UNIQUE(cedula)
5. **Unicidad de opción papeleta**: UNIQUE(papeleta_id, opcion_papeleta_id)
6. **Acta cerrada no permite votos**: CHECK en aplicación
7. **Voto nulo y blanco mutuamente excluyentes**: CHECK(es_nulo + es_blanco <= 1)

### Seed Data Base
```sql
-- Roles
INSERT INTO roles (nombre, descripcion) VALUES
  ('ADMIN', 'Administrador del sistema'),
  ('SUPERVISOR', 'Supervisor de elecciones'),
  ('MIEMBRO_MESA', 'Miembro de mesa electoral'),
  ('OPERADOR', 'Operador de registro');

-- Admin user (password: admin123 con BCrypt)
INSERT INTO usuarios (rol_id, username, password_hash, nombres, apellidos, activo)
VALUES (1, 'admin', '$2a$10$..., 'Admin', 'Sistema', true);

-- Tipos de circunscripción
INSERT INTO tipos_circunscripcion (nombre, nivel) VALUES
  ('NACIONAL', 1), ('PROVINCIAL', 2), ('DISTRITAL', 3),
  ('CANTONAL', 4), ('PARROQUIAL', 5), ('ZONAL', 6),
  ('EXTRANJERO', 7), ('RURAL', 8);

-- Plantillas de papeleta
INSERT INTO plantillas_papeleta (nombre, tipo_votacion) VALUES
  ('Lista Cerrada', 'LISTA'), ('Lista Abierta', 'LISTA'),
  ('Individual', 'INDIVIDUAL'), ('Plurinominal', 'PLURINOMINAL'),
  ('Preferencial', 'PREFERENCIAL'), ('Mixta', 'MIXTO');
```
