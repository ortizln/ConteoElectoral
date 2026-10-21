# Despliegue

## Backend con Docker Compose

1. Copia `.env.example` como `.env` y configura la URL, el usuario y la contraseña de PostgreSQL. El `.env` está excluido de Git.
2. Desde la raíz del proyecto ejecuta:

   ```bash
   docker compose up -d --build backend
   ```

3. Revisa el arranque con `docker compose logs -f backend`.

Para desplegar con `deploy-backend.sh`, exporta las mismas tres variables en la sesión antes de ejecutarlo. El script falla claramente si falta alguna.

## Frontend

El frontend de producción usa `apiUrl: '/api'`. Nginx debe servir la aplicación bajo `/conteo-electoral/` y reenviar `/api/` y `/ws/` al backend en `127.0.0.1:8081`. Construye y copia los archivos con:

```bash
cd frontend
npm ci
npm run build -- --configuration production
```

El resultado Angular actual está en `frontend/dist/conteo-electoral/browser`. Copia ese contenido a `/var/www/conteo-electoral/browser/` y carga `frontend/nginx.conf` desde la configuración principal de Nginx. Si el sitio también usa HTTPS, incluye los mismos bloques `location` dentro del servidor TLS.

## Diagnóstico

- `docker compose ps` muestra el estado del contenedor.
- `docker compose logs --tail=200 backend` muestra errores de conexión o arranque.
- Desde el servidor, confirma que PostgreSQL escucha en la dirección y puerto configurados y que acepta conexiones desde Docker.
- Comprueba la configuración de Nginx con `nginx -t` antes de recargarla.

No guardes credenciales en `application.yml`, scripts versionados o el repositorio. Si una contraseña real se compartió o subió al repositorio, cámbiala en PostgreSQL y actualiza el `.env` del servidor.
