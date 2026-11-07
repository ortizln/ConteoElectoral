-- Recinto (institución educativa): geolocalización + padrón de electores
ALTER TABLE instituciones_educativas
    ADD COLUMN IF NOT EXISTS latitud DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS longitud DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS electores_registrados INTEGER;
