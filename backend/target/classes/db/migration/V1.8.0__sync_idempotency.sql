-- Migración: Tabla de idempotencia para sync push
-- Previene procesamiento duplicado de operaciones con mismo operationId

CREATE TABLE IF NOT EXISTS sync_operations_log (
    id BIGSERIAL PRIMARY KEY,
    operation_id VARCHAR(100) NOT NULL UNIQUE,
    usuario_id BIGINT NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    action VARCHAR(20) NOT NULL,
    result_success BOOLEAN NOT NULL DEFAULT FALSE,
    result_error VARCHAR(500),
    server_entity_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sync_op_log_usuario ON sync_operations_log(usuario_id);
CREATE INDEX IF NOT EXISTS idx_sync_op_log_entity ON sync_operations_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_sync_op_log_created ON sync_operations_log(created_at);

-- Constraint única en votos para prevenir duplicados por mesa+lista
-- (Solo si no existe ya - protege contra races en CREATE)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'uk_voto_mesa_lista'
    ) THEN
        ALTER TABLE votos ADD CONSTRAINT uk_voto_mesa_lista UNIQUE (mesa_id, lista_id)
        WHERE lista_id IS NOT NULL AND candidato_id IS NULL;
    END IF;
END $$;
