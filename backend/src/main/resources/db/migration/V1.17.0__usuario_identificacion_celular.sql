-- Datos de contacto del usuario para la recuperación de contraseña por WhatsApp
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS identificacion VARCHAR(20);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS celular VARCHAR(20);

CREATE UNIQUE INDEX IF NOT EXISTS uk_usuarios_identificacion
    ON usuarios (identificacion)
    WHERE identificacion IS NOT NULL;
