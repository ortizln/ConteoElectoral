-- =====================================================================
-- RESET PARCIAL DE RESULTADOS PARA PRÁCTICAS
-- =====================================================================
-- Objetivo:
--   Borrar únicamente los resultados registrados para poder repetir
--   prácticas, sin tocar catálogos, usuarios, configuración ni mesas.
--
-- Se BORRA (TRUNCATE con RESTART IDENTITY):
--   votos                 -> votos por candidato / lista
--   voto_papeleta         -> votos registrados desde papeletas
--   mesa_acta_fotos       -> fotos del acta subidas al cerrar mesa
--   mesa_nulos_blancos    -> nulos / blancos por cargo y mesa
--
-- Se RESETEA:
--   mesas.cerrada         -> false (REABRE todas las mesas que fueron cerradas)
--   mesas.votos_nulos     -> 0 (total global por mesa)
--   mesas.votos_blanco    -> 0 (total global por mesa)
--
-- Se CONSERVA (entre otros):
--   elecciones, zonas, provincias, cantones, parroquias,
--   instituciones_educativas, mesas, mesa_usuarios,
--   partidos, cargos, listas_electorales, candidatos,
--   papeleta, opcion_papeleta, circunscripciones,
--   usuarios, roles, rol_permisos, configuracion_sistema,
--   apk_versions, carousel_images, plantillas_papeleta,
--   reglas_negocio, auditoria, flyway_schema_history.
--
-- IMPORTANTE:
--   * Hacer backup antes:
--       sudo -u postgres pg_dump conteo_electoral -Fc -f /tmp/conteo_backup.dump
--   * Ejecutar en el servidor 192.168.1.43:
--       sudo -u postgres psql -d conteo_electoral -f reset-resultados-practicas.sql
--   * Después de ejecutar, recargar la web (Ctrl+F5) y, en la APK,
--     borrar datos de la app / reiniciar el conteo local si se desea
--     empezar completamente limpio.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1) Conteos previos (solo referencia; no modifica nada)
-- ---------------------------------------------------------------------
-- SELECT 'votos' AS tabla, count(*) AS filas FROM votos
-- UNION ALL SELECT 'voto_papeleta',       count(*) FROM voto_papeleta
-- UNION ALL SELECT 'mesa_acta_fotos',     count(*) FROM mesa_acta_fotos
-- UNION ALL SELECT 'mesa_nulos_blancos',  count(*) FROM mesa_nulos_blancos
-- UNION ALL SELECT 'mesas cerradas',      count(*) FROM mesas WHERE cerrada IS TRUE
-- ORDER BY 1;

-- ---------------------------------------------------------------------
-- 2) Borrar resultados
-- CASCADE es seguro: ninguna tabla conservada referencia a estas tablas.
-- RESTART IDENTITY reinicia sus secuencias (IDs vuelven a empezar en 1).
-- ---------------------------------------------------------------------
TRUNCATE TABLE
    votos,
    voto_papeleta,
    mesa_acta_fotos,
    mesa_nulos_blancos
RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------
-- 3) REABRIR todas las mesas cerradas
-- ---------------------------------------------------------------------
-- Sin WHERE para cubrir también posibles valores NULL.
UPDATE mesas
SET cerrada = false;

-- ---------------------------------------------------------------------
-- 4) Limpiar contadores globales de nulos/blancos por mesa
-- ---------------------------------------------------------------------
UPDATE mesas
SET votos_nulos  = 0,
    votos_blanco = 0;

-- ---------------------------------------------------------------------
-- 5) OPCIONAL: idempotencia de sincronización
-- Descomentar SOLO si se van a repetir prácticas con la misma APK y se
-- reenviarán operationId antiguos que deben volver a procesarse.
-- No truncar auditoria: es historial y no afecta los resultados.
-- ---------------------------------------------------------------------
-- TRUNCATE TABLE sync_operations_log RESTART IDENTITY;

COMMIT;

-- =====================================================================
-- VERIFICACIÓN (después de ejecutar)
-- =====================================================================

-- 1) Tablas de resultados -> deben dar 0
SELECT 'votos' AS tabla, count(*) AS filas FROM votos
UNION ALL SELECT 'voto_papeleta',      count(*) FROM voto_papeleta
UNION ALL SELECT 'mesa_acta_fotos',    count(*) FROM mesa_acta_fotos
UNION ALL SELECT 'mesa_nulos_blancos', count(*) FROM mesa_nulos_blancos
ORDER BY 1;

-- 2) Mesas -> todas abiertas y sin contadores globales
SELECT
    count(*) FILTER (WHERE cerrada IS TRUE)                         AS mesas_cerradas,
    count(*) FILTER (WHERE COALESCE(votos_nulos, 0) <> 0)           AS mesas_con_nulos,
    count(*) FILTER (WHERE COALESCE(votos_blanco, 0) <> 0)          AS mesas_con_blancos
FROM mesas;

-- 3) Tablas conservadas -> deben conservar sus filas
SELECT 'mesas' AS tabla, count(*) AS filas FROM mesas
UNION ALL SELECT 'mesa_usuarios',             count(*) FROM mesa_usuarios
UNION ALL SELECT 'elecciones',                count(*) FROM elecciones
UNION ALL SELECT 'instituciones_educativas',  count(*) FROM instituciones_educativas
UNION ALL SELECT 'candidatos',                count(*) FROM candidatos
UNION ALL SELECT 'listas_electorales',        count(*) FROM listas_electorales
UNION ALL SELECT 'partidos',                  count(*) FROM partidos
UNION ALL SELECT 'cargos',                    count(*) FROM cargos
UNION ALL SELECT 'usuarios',                  count(*) FROM usuarios
UNION ALL SELECT 'auditoria',                 count(*) FROM auditoria
ORDER BY 1;
