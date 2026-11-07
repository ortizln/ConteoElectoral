-- Territorio del cargo: nivel geografico en el que se vota el cargo
-- (NACIONAL: presidente; PROVINCIA: prefecto; CANTON: alcalde/concejal; PARROQUIA: concejal parroquial)
-- Se usa para filtrar los candidatos que ve un miembro de mesa segun la mesa asignada.
ALTER TABLE cargos
    ADD COLUMN IF NOT EXISTS territorio VARCHAR(20) DEFAULT 'NACIONAL';

-- Compatibilidad: candidatos ya existentes sin territorio quedan como NACIONAL (se ven en todas las mesas)
UPDATE cargos SET territorio = 'NACIONAL' WHERE territorio IS NULL;
