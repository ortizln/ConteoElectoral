-- Observaciones opcionales de la mesa, registradas por el miembro de mesa y sincronizadas desde la APK.

ALTER TABLE mesas
    ADD COLUMN IF NOT EXISTS observaciones TEXT;

COMMENT ON COLUMN mesas.observaciones IS 'Observaciones opcionales de la mesa ( UTF-8 ).';
