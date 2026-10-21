#!/bin/bash

# Script de despliegue para el backend (Linux/WSL)
# Uso: ./deploy-backend.sh

set -e

: "${SPRING_DATASOURCE_URL:?Define SPRING_DATASOURCE_URL antes del despliegue}"
: "${SPRING_DATASOURCE_USERNAME:?Define SPRING_DATASOURCE_USERNAME antes del despliegue}"
: "${SPRING_DATASOURCE_PASSWORD:?Define SPRING_DATASOURCE_PASSWORD antes del despliegue}"

echo "=== Desplegando backend ==="

# Detectar ruta del script (funciona en WSL y Linux)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "Directorio del proyecto: $PROJECT_DIR"

# Verificar que existe el Dockerfile
if [ ! -f "$PROJECT_DIR/backend/Dockerfile" ]; then
    echo "ERROR: No se encuentra backend/Dockerfile en $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR"

# Construir la imagen Docker
echo "Construyendo imagen Docker..."
docker build -t conteo-electoral-backend:latest ./backend

# Detener y eliminar contenedor anterior si existe
echo "Deteniendo contenedor anterior..."
docker stop conteo-backend 2>/dev/null || true
docker rm conteo-backend 2>/dev/null || true

# Ejecutar el nuevo contenedor
echo "Iniciando nuevo contenedor..."
docker run -d \
  --name conteo-backend \
  --restart unless-stopped \
  -p 8081:8081 \
  -e SPRING_DATASOURCE_URL \
  -e SPRING_DATASOURCE_USERNAME \
  -e SPRING_DATASOURCE_PASSWORD \
  conteo-electoral-backend:latest

echo ""
echo "=== Backend desplegado exitosamente ==="
echo "Contenedor: conteo-backend"
echo "Puerto: 8081"
echo ""
echo "Ver logs: docker logs -f conteo-backend"
