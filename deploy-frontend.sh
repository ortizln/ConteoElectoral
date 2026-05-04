#!/bin/bash

# Script de despliegue para el frontend (Nginx sin Docker)
# Uso: ./deploy-frontend.sh

PROJECT_DIR="/root/ConteoElectoral"
FRONTEND_DIR="$PROJECT_DIR/frontend"
NGINX_DIR="/var/www/html"
NGINX_CONFIG="/etc/nginx/sites-available/default"

echo "=== Iniciando despliegue del frontend ==="

# Entrar al directorio del frontend
cd "$FRONTEND_DIR" || exit 1

# Instalar dependencias
echo "Instalando dependencias..."
npm install

# Construir para producción
echo "Construyendo frontend para producción..."
npm run build

# Verificar si la construcción fue exitosa
if [ ! -d "dist/frontend/browser" ]; then
    echo "Error: No se encontró el directorio de construcción"
    exit 1
fi

# Limpiar directorio de Nginx
echo "Limpiando directorio de Nginx..."
rm -rf "$NGINX_DIR"/*

# Copiar archivos construidos a Nginx
echo "Copiando archivos a Nginx..."
cp -r dist/frontend/browser/* "$NGINX_DIR"/

# Configurar Nginx
echo "Configurando Nginx..."
cp "$PROJECT_DIR/frontend/nginx.conf" "$NGINX_CONFIG"

# Reiniciar Nginx
echo "Reiniciando Nginx..."
systemctl restart nginx

# Verificar estado
echo "=== Estado de Nginx ==="
systemctl status nginx --no-pager

echo "=== Despliegue completado ==="
echo "Frontend disponible en: http://localhost"
