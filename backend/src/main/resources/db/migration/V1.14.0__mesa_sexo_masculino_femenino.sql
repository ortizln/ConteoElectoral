-- Renombra los valores del sexo de la mesa:
--   HOMBRES -> MASCULINO
--   MUJERES -> FEMENINO
-- (MIXTA permanece igual)
-- Se ejecuta antes de que el enum Java pase a MASCULINO/FEMENINO,
-- para que las filas existentes sigan siendo leibles con valueOf().

UPDATE mesas SET sexo = 'MASCULINO' WHERE sexo = 'HOMBRES';
UPDATE mesas SET sexo = 'FEMENINO'  WHERE sexo = 'MUJERES';
