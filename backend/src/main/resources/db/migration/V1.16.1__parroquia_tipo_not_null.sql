-- Cierre de la clasificacion URBANA/RURAL de parroquias.
-- Por decision administrativa se clasifican RURAL las 3 parroquias que no
-- pudieron contrastarse contra el "Distributivo Nacional de Recintos
-- Electorales" del CNE (08-08-2022):
--   ID 539 SOSOTE (Rocafuerte)
--   ID 190 LA PRIMAVERA (Shushufindi)
--   ID 191 LA MAGDALENA (Shushufindi)
-- El NOT NULL solo se activa despues de completar el backfill.

UPDATE parroquias
SET tipo_parroquia = 'RURAL'
WHERE id IN (539, 190, 191)
  AND tipo_parroquia IS NULL;

ALTER TABLE parroquias
    ALTER COLUMN tipo_parroquia SET NOT NULL;
