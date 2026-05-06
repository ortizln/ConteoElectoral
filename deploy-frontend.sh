#!/bin/bash

# Script de despliegue para el frontend Angular + Nginx (Linux/WSL)
# Uso: ./deploy-frontend.sh

set -e

echo "=== Desplegando frontend ==="

# Detectar ruta del script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "Directorio del proyecto: $PROJECT_DIR"

# Verificar que existe el directorio frontend
if [ ! -d "$PROJECT_DIR/frontend" ]; then
    echo "ERROR: No se encuentra el directorio frontend en $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR/frontend"

# Verificar que existe el archivo de entorno de producción
if [ ! -f "src/environments/environment.prod.ts" ]; then
    echo "ADVERTENCIA: No se encuentra environment.prod.ts"
    echo "Asegúrese de configurar la URL de la API correctamente"
fi

# Construir la aplicación para producción
echo "Construyendo Angular app (producción)..."
npm install
ng build --configuration=production

# Verificar que se generó la carpeta dist
if [ ! -d "dist/conteo-electoral" ]; then
    echo "ERROR: No se generó la carpeta dist/conteo-electoral"
    exit 1
fi

echo "Build completado: frontend/dist/conteo-electoral"

# Ruta de Nginx (ajustar según tu instalación)
NGINX_HTML="/var/www/html"
NGINX_CONF="/etc/nginx/sites-available"

# Copiar archivos a Nginx
echo "Copiando archivos a Nginx..."
sudo mkdir -p /var/www/conteo-electoral
sudo cp -r dist/conteo-electoral/* /var/www/conteo-electoral/

# Copiar configuración de Nginx
if [ -f "../frontend/nginx.conf" ]; then
    echo "Configurando Nginx..."
    sudo cp "../frontend/nginx.conf" "/etc/nginx/sites-available/conteo-electoral"
    sudo ln -sf "/etc/nginx/sites-available/conteo-electoral" "/etc/nginx/sites-enabled/" 2>/dev/null || true
    sudo nginx -t && sudo nginx -s reload
fi

echo ""
echo "=== Frontend desplegado exitosamente ==="
echo "Archivos en: /var/www/conteo-electoral"
echo "Configuración Nginx: /etc/nginx/sites-available/conteo-electoral"
echo ""
echo "IMPORTANTE: Actualizar environment.prod.ts con la IP correcta del servidor"
