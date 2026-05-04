#!/bin/bash

# Script de despliegue para el backend (Docker)
# Uso: ./deploy-backend.sh [produccion|desarrollo]

ENVIRONMENT=${1:-produccion}
PROJECT_DIR="/root/ConteoElectoral"
cd "$PROJECT_DIR" || exit 1

echo "=== Iniciando despliegue del backend en modo: $ENVIRONMENT ==="

# Detener y eliminar contenedores existentes
echo "Deteniendo contenedores..."
docker-compose down

# Construir las imágenes
echo "Construyendo imágenes de Docker..."
docker-compose build --no-cache

# Iniciar los servicios
echo "Iniciando servicios..."
if [ "$ENVIRONMENT" = "produccion" ]; then
    docker-compose up -d
else
    docker-compose up -d
fi

# Mostrar estado
echo "=== Estado de los contenedores ==="
docker-compose ps

echo "=== Logs del backend (últimas 20 líneas) ==="
docker-compose logs --tail=20 backend

echo "=== Despliegue completado ==="
echo "Backend disponible en: http://localhost:8080"
echo "PostgreSQL disponible en: localhost:5432"
