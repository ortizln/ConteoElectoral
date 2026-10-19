# Instrucciones de Despliegue

## Backend (Docker)

1. **Construir la imagen:**
   ```bash
   cd backend
   docker build -t conteo-electoral-backend .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -d \
     --name backend \
     -p 8081:8081 \
     -e SPRING_DATASOURCE_URL=jdbc:postgresql://YOUR_DB_HOST:5432/conteo_electoral \
     -e SPRING_DATASOURCE_USERNAME=postgres \
     -e SPRING_DATASOURCE_PASSWORD=086411421 \
     conteo-electoral-backend
   ```

3. **O usar docker-compose:**
   ```bash
   docker-compose up -d backend
   ```

## Frontend (Nginx sin Docker)

1. **URL de producción (relativa, mismo origen):**
   Editar `frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: '/api'
   };
   ```
   > ⚠️ No usar `http://IP:8081/api` en producción HTTPS: el navegador lo bloquea
   > por *mixed content* y por el permiso de acceso a la red local. Nginx debe
   > hacer proxy de `/api/` y `/ws/` hacia `127.0.0.1:8081` (ver `frontend/nginx.conf`).

2. **Construir para producción:**
   ```bash
   cd frontend
   ng build --configuration=production
   ```

3. **Copiar archivos a Nginx:**
   - Copiar contenido de `frontend/dist/conteo-electoral` a `C:\nginx\html\conteo-electoral`
   - Copiar `frontend/nginx.conf` a `C:\nginx\conf\conteo-electoral.conf`
   - Editar `nginx.conf` principal y agregar: `include conteo-electoral.conf;`
   - Recargar Nginx: `nginx -s reload`

## Docker Compose (Todo el stack)

```bash
docker-compose up -d
```

Esto levantará:
- Backend en `http://localhost:8081`
- Base de datos PostgreSQL en `localhost:5432`
- Frontend en `http://localhost:80` (vía Nginx)

## Notas

- Asegurarse de que el puerto 8081 esté disponible para el backend
- La base de datos se inicializa automáticamente con el usuario admin (password: admin123)
- Para producción, cambiar las contraseñas y configurar HTTPS
