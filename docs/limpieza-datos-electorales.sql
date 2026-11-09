-- =====================================================================
-- LIMPIEZA DE DATOS ELECTIONALES (TRUNCATE)
-- =====================================================================
-- Descripción:
--   Vacía todas las tablas de datos electorales (partidos, cargos,
--   listas, candidatos, mesas, asignaciones de mesas, votos,
--   papeletas, circunscripciones, escanos, reconteos/impugnaciones,
--   logs de sincronización y auditoría), manteniendo intactos:
--
--   CATÁLOGO / ELECCIONES (lo pedido):
--     zonas, provincias, cantones, parroquias,
--     instituciones_educativas, elecciones
--
--   DEPENDENCIAS OBLIGATORIAS (si se truncan, se rompe lo anterior):
--     tipo_eleccion        -> FK de elecciones
--     tipo_circunscripcion -> catálogo usado por cargos/candidatos
--
--   SISTEMA / LOGIN / CONFIGURACIÓN:
--     usuarios, roles, rol_permisos   (login admin/admin123)
--     configuracion_sistema           (logo y APK del sistema)
--     apk_versions                    (versión APK publicada)
--     carousel_images                 (imágenes del login)
--     plantillas_papeleta             (plantillas de diseño de papeleta)
--     reglas_negocio                  (reglas de negocio sembradas)
--     flyway_schema_history           (integridad de migraciones - NUNCA tocar)
--
-- Efectos:
--   * RESTART IDENTITY: los IDs de las tablas limpiadas vuelven a 1.
--   * La elección, su territorio y los usuarios quedan tal cual.
--   * Después de ejecutar hay que volver a crear partidos, cargos,
--     candidatos, listas y mesas desde la UI o con sus seeds.
--
-- IMPORTANTE: hacer backup previo:
--   sudo -u postgres pg_dump conteo_electoral -Fc -f /tmp/conteo_backup.dump
--
-- Ejecución (en el servidor 192.168.1.43):
--   sudo -u postgres psql -d conteo_electoral -f limpieza-datos-electorales.sql
-- o desde fuera:
--   psql -h <host> -U postgres -d conteo_electoral -f limpieza-datos-electorales.sql
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- Conteos previos (referencia - no modifica nada)
-- ---------------------------------------------------------------------
-- SELECT 'partidos' AS tabla, count(*) AS filas FROM partidos
-- UNION ALL SELECT 'cargos',            count(*) FROM cargos
-- UNION ALL SELECT 'candidatos',        count(*) FROM candidatos
-- UNION ALL SELECT 'listas_electorales',count(*) FROM listas_electorales
-- UNION ALL SELECT 'mesas',             count(*) FROM mesas
-- UNION ALL SELECT 'mesa_usuarios',     count(*) FROM mesa_usuarios
-- UNION ALL SELECT 'votos',             count(*) FROM votos
-- ORDER BY 1;

-- ---------------------------------------------------------------------
-- TRUNCATE de tablas de datos electorales
-- (lista completa y explícita; RESTART IDENTITY reinicia sus secuencias)
-- CASCADE cubre cualquier tabla dependiente que no esté listada;
-- ninguna tabla conservada referencia a estas, así que es seguro.
-- ---------------------------------------------------------------------
TRUNCATE TABLE
    -- Votos y votación
    votos,
    voto_papeleta,

    -- Mesas, asignaciones y actas
    mesas,
    mesa_usuarios,          -- asignación de mesas a usuarios
    mesa_nulos_blancos,
    mesa_acta_fotos,

    -- Estructura electoral
    candidatos,
    listas_electorales,
    partidos,
    cargos,
    tipo_eleccion_cargo,    -- mapeo tipo elección <-> cargo (los cargos se limpian)

    -- Papeletas
    papeleta,
    opcion_papeleta,

    -- Circunscripciones y escaños
    circunscripciones,
    asignacion_escanos,

    -- Escrutinio / controles
    reconteos,
    impugnaciones,
    observaciones,
    resoluciones,

    -- Logs
    sync_operations_log,    -- idempotencia de sincronización móvil
    auditoria              -- historial de auditoría
RESTART IDENTITY CASCADE;

COMMIT;

-- =====================================================================
-- VERIFICACIÓN (ejecutar después)
-- =====================================================================
-- 1) Tablas limpiadas -> deben dar 0
SELECT 'votos'                AS tabla, count(*) AS filas FROM votos
UNION ALL SELECT 'voto_papeleta',       count(*) FROM voto_papeleta
UNION ALL SELECT 'mesas',               count(*) FROM mesas
UNION ALL SELECT 'mesa_usuarios',       count(*) FROM mesa_usuarios
UNION ALL SELECT 'mesa_nulos_blancos',  count(*) FROM mesa_nulos_blancos
UNION ALL SELECT 'mesa_acta_fotos',     count(*) FROM mesa_acta_fotos
UNION ALL SELECT 'candidatos',          count(*) FROM candidatos
UNION ALL SELECT 'listas_electorales',  count(*) FROM listas_electorales
UNION ALL SELECT 'partidos',            count(*) FROM partidos
UNION ALL SELECT 'cargos',              count(*) FROM cargos
UNION ALL SELECT 'tipo_eleccion_cargo', count(*) FROM tipo_eleccion_cargo
UNION ALL SELECT 'papeleta',            count(*) FROM papeleta
UNION ALL SELECT 'opcion_papeleta',     count(*) FROM opcion_papeleta
UNION ALL SELECT 'circunscripciones',   count(*) FROM circunscripciones
UNION ALL SELECT 'asignacion_escanos',  count(*) FROM asignacion_escanos
UNION ALL SELECT 'reconteos',           count(*) FROM reconteos
UNION ALL SELECT 'impugnaciones',       count(*) FROM impugnaciones
UNION ALL SELECT 'observaciones',       count(*) FROM observaciones
UNION ALL SELECT 'resoluciones',        count(*) FROM resoluciones
UNION ALL SELECT 'sync_operations_log', count(*) FROM sync_operations_log
UNION ALL SELECT 'auditoria',           count(*) FROM auditoria
ORDER BY 1;

-- 2) Tablas conservadas -> deben conservar sus filas
SELECT 'elecciones'                AS tabla, count(*) AS filas FROM elecciones
UNION ALL SELECT 'zonas',                   count(*) FROM zonas
UNION ALL SELECT 'provincias',              count(*) FROM provincias
UNION ALL SELECT 'cantones',                count(*) FROM cantones
UNION ALL SELECT 'parroquias',              count(*) FROM parroquias
UNION ALL SELECT 'instituciones_educativas',count(*) FROM instituciones_educativas
UNION ALL SELECT 'tipo_eleccion',           count(*) FROM tipo_eleccion
UNION ALL SELECT 'tipo_circunscripcion',    count(*) FROM tipo_circunscripcion
UNION ALL SELECT 'usuarios',                count(*) FROM usuarios
UNION ALL SELECT 'roles',                   count(*) FROM roles
UNION ALL SELECT 'rol_permisos',            count(*) FROM rol_permisos
UNION ALL SELECT 'apk_versions',            count(*) FROM apk_versions
UNION ALL SELECT 'carousel_images',         count(*) FROM carousel_images
UNION ALL SELECT 'reglas_negocio',          count(*) FROM reglas_negocio
UNION ALL SELECT 'plantillas_papeleta',     count(*) FROM plantillas_papeleta
ORDER BY 1;
