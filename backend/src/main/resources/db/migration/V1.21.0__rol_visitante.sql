-- Perfil VISITANTE: acceso exclusivo de solo lectura a /resultados.
INSERT INTO roles (nombre, descripcion)
SELECT 'VISITANTE', 'Visitante con acceso de solo lectura a los resultados'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'VISITANTE');
