-- Logos: imagen de lista electoral y foto de candidato individual (bytea en DB)
ALTER TABLE listas_electorales
    ADD COLUMN IF NOT EXISTS logo BYTEA;

ALTER TABLE candidatos
    ADD COLUMN IF NOT EXISTS foto BYTEA;
