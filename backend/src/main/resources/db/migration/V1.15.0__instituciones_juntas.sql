-- Campos de juntas (mesas) por institución educativa.
-- JUNFEM/JUNMAS: cantidad de juntas femeninas/masculinas.
-- JUNINIF/JUNFINF: rango de números de mesa femeninas (desde/hasta).
-- JUNINIM/JUNFINM: rango de números de mesa masculinas (desde/hasta).
-- NUMJUN: total de juntas = JUNFEM + JUNMAS (calculado en backend al guardar).
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS junfem INTEGER;
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS junmas INTEGER;
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS juninif INTEGER;
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS junfinf INTEGER;
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS juninim INTEGER;
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS junfinm INTEGER;
ALTER TABLE instituciones_educativas ADD COLUMN IF NOT EXISTS numjun INTEGER;
