-- Ausentes registrados manualmente por mesa y estado de aprobación del acta.
-- No modifica migraciones anteriores (V1.0.1 se deja intacta).

ALTER TABLE mesas
    ADD COLUMN IF NOT EXISTS ausentes INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS aprobada BOOLEAN DEFAULT FALSE;

UPDATE mesas SET ausentes = 0 WHERE ausentes IS NULL;
UPDATE mesas SET aprobada = FALSE WHERE aprobada IS NULL;
