-- ================================================================
-- V1.0.1: Datos semilla del ERP Electoral
-- Inserta datos base solo si no existen (con NOT EXISTS)
-- ================================================================

-- Roles
INSERT INTO roles (nombre, descripcion)
SELECT 'ADMIN', 'Administrador del sistema con acceso total'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'ADMIN');

INSERT INTO roles (nombre, descripcion)
SELECT 'SUPERVISOR', 'Supervisor de elecciones con acceso a dashboard y gestión'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'SUPERVISOR');

INSERT INTO roles (nombre, descripcion)
SELECT 'MIEMBRO_MESA', 'Miembro de mesa electoral encargado de la votación'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'MIEMBRO_MESA');

INSERT INTO roles (nombre, descripcion)
SELECT 'OPERADOR', 'Operador de registro de votos'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'OPERADOR');

-- Usuario admin por defecto (password: admin123 con BCrypt)
INSERT INTO usuarios (rol_id, username, password, nombre, apellido, activo)
SELECT r.id, 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'Sistema', TRUE
FROM roles r
WHERE r.nombre = 'ADMIN'
  AND NOT EXISTS (SELECT 1 FROM usuarios WHERE username = 'admin');

-- Tipos de circunscripción
INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'NACIONAL', 'Nacional'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'NACIONAL');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'PROVINCIAL', 'Provincial'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'PROVINCIAL');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'DISTRITAL', 'Distrital'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'DISTRITAL');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'CANTONAL', 'Cantonal'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'CANTONAL');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'PARROQUIAL', 'Parroquial'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'PARROQUIAL');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'ZONAL', 'Zonal'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'ZONAL');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'EXTRANJERO', 'Extranjero'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'EXTRANJERO');

INSERT INTO tipo_circunscripcion (codigo, nombre)
SELECT 'RURAL', 'Rural'
WHERE NOT EXISTS (SELECT 1 FROM tipo_circunscripcion WHERE codigo = 'RURAL');

-- Plantillas de papeleta
INSERT INTO plantillas_papeleta (nombre, tipo_diseno, cantidad_columnas, cantidad_filas, descripcion)
SELECT 'Lista Cerrada', 'LISTA_CERRADA', 1, 0, 'Voto por lista completa. Muestra partido/logotipo, selecciona uno.'
WHERE NOT EXISTS (SELECT 1 FROM plantillas_papeleta WHERE nombre = 'Lista Cerrada');

INSERT INTO plantillas_papeleta (nombre, tipo_diseno, cantidad_columnas, cantidad_filas, descripcion)
SELECT 'Lista Abierta', 'LISTA_ABIERTA', 1, 0, 'Voto por lista con preferencia de candidato.'
WHERE NOT EXISTS (SELECT 1 FROM plantillas_papeleta WHERE nombre = 'Lista Abierta');

INSERT INTO plantillas_papeleta (nombre, tipo_diseno, cantidad_columnas, cantidad_filas, descripcion)
SELECT 'Individual', 'INDIVIDUAL', 1, 0, 'Voto por un candidato individual. Lista de candidatos, selecciona uno.'
WHERE NOT EXISTS (SELECT 1 FROM plantillas_papeleta WHERE nombre = 'Individual');

INSERT INTO plantillas_papeleta (nombre, tipo_diseno, cantidad_columnas, cantidad_filas, descripcion)
SELECT 'Plurinominal', 'PLURINOMINAL', 0, 0, 'Voto por múltiples candidatos hasta un máximo configurable.'
WHERE NOT EXISTS (SELECT 1 FROM plantillas_papeleta WHERE nombre = 'Plurinominal');

INSERT INTO plantillas_papeleta (nombre, tipo_diseno, cantidad_columnas, cantidad_filas, descripcion)
SELECT 'Preferencial', 'PREFERENCIAL', 1, 0, 'Voto preferencial dentro de lista. Ordena candidatos por preferencia.'
WHERE NOT EXISTS (SELECT 1 FROM plantillas_papeleta WHERE nombre = 'Preferencial');

INSERT INTO plantillas_papeleta (nombre, tipo_diseno, cantidad_columnas, cantidad_filas, descripcion)
SELECT 'Mixta', 'MIXTA', 1, 0, 'Combinación de lista cerrada e individual.'
WHERE NOT EXISTS (SELECT 1 FROM plantillas_papeleta WHERE nombre = 'Mixta');
