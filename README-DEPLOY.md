# Guía de Despliegue - Conteo Electoral

## Requisitos previos

### Servidor (Linux recomendado)
- Docker y Docker Compose instalados
- Nginx instalado (para el frontend)
- Java 17 (solo si construyes localmente)
- Node.js 18+ (para construir el frontend)
- Flutter SDK (para construir la APK)

## Estructura de despliegue

```
ConteoElectoral/
├── backend/              # Spring Boot (Docker)
├── frontend/            # Angular (Nginx)
├── conteo_electoral_app/ # Flutter (APK)
├── docker-compose.yml    # Orquestación backend + DB
├── deploy-backend.sh     # Script despliegue backend
├── deploy-frontend.sh    # Script despliegue frontend
├── build-apk.sh         # Script construcción APK (Linux)
└── build-apk.ps1        # Script construcción APK (Windows)
```

## Pasos para el despliegue

### 1. Backend (Docker)

```bash
# Clonar el repositorio en el servidor
git clone <repo-url> /root/ConteoElectoral
cd /root/ConteoElectoral

# Dar permisos de ejecución a los scripts
chmod +x deploy-backend.sh deploy-frontend.sh build-apk.sh

# Desplegar backend (construye Docker y inicia servicios)
./deploy-backend.sh produccion
```

El backend estará disponible en: `http://servidor:8080`

### 2. Frontend (Nginx sin Docker)

```bash
# En el servidor, después de desplegar el backend
cd /root/ConteoElectoral

# Desplegar frontend
./deploy-frontend.sh
```

El frontend estará disponible en: `http://servidor`

### 3. APK (Aplicación móvil)

#### En Linux:
```bash
cd /root/ConteoElectoral
./build-apk.sh release  # o debug para versión de desarrollo
```

#### En Windows (PowerShell):
```powershell
cd C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral
.\build-apk.ps1 release
```

El APK se generará en: `conteo_electoral_app/deploy/conteo-electoral.apk`

## Configuración importante

### Backend (.env o variables de entorno)
Editar `docker-compose.yml` y ajustar:
- `SPRING_DATASOURCE_PASSWORD`: Contraseña de PostgreSQL
- `SPRING_JPA_HIBERNATE_DDL_AUTO`: `update` para producción, `create-drop` para desarrollo

### Frontend (environment.ts)
Asegurar que `frontend/src/environments/environment.prod.ts` tenga:
```typescript
export const environment = {
  production: true,
  apiUrl: 'http://servidor:8080/api',
  wsUrl: 'http://servidor:8080/ws'
};
```

### Base de datos
- PostgreSQL se inicia automáticamente con Docker
- Base de datos: `conteo_electoral`
- Usuario: `postgres`
- Contraseña: `postgres123` (cambiar en producción)

## Comandos útiles

### Backend (Docker)
```bash
# Ver logs
docker-compose logs -f backend

# Reiniciar solo el backend
docker-compose restart backend

# Detener todos los servicios
docker-compose down

# Iniciar servicios
docker-compose up -d
```

### Frontend (Nginx)
```bash
# Verificar configuración
nginx -t

# Reiniciar Nginx
systemctl restart nginx

# Ver logs
tail -f /var/log/nginx/error.log
```

## Notas de seguridad

1. **Cambiar contraseñas** en `docker-compose.yml` antes de producción
2. **Configurar HTTPS** en Nginx (usar Let's Encrypt)
3. **Firewall**: Abrir solo puertos 80, 443 (Nginx) y opcionalmente 8080 si accedes directamente al backend
4. **JWT Secret**: Cambiar en el código fuente antes de compilar

## Solución de problemas

### El backend no inicia
```bash
docker-compose logs postgres  # Verificar si la BD inició
docker-compose logs backend  # Ver errores del backend
```

### El frontend no carga
```bash
systemctl status nginx
curl http://localhost  # Probar localmente
```

### Error al construir APK
```bash
flutter doctor  # Verificar instalación de Flutter
flutter pub get  # Obtener dependencias
```
