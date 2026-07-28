ALTER TABLE votos ALTER COLUMN candidato_id DROP NOT NULL;
ALTER TABLE votos DROP CONSTRAINT IF EXISTS uk_votos_candidato_mesa;
ALTER TABLE votos DROP CONSTRAINT IF EXISTS votos_candidato_id_mesa_id_key;
