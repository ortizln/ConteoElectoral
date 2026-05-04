#!/bin/bash

# Script para construir APK de la aplicación móvil
# Requiere: Flutter SDK instalado
# Uso: ./build-apk.sh [debug|release]

BUILD_TYPE=${1:-debug}
PROJECT_DIR="/root/ConteoElectoral/conteo_electoral_app"
APK_DIR="$PROJECT_DIR/build/app/outputs/flutter-apk"

echo "=== Iniciando construcción de APK ($BUILD_TYPE) ==="

# Entrar al directorio de la app
cd "$PROJECT_DIR" || exit 1

# Limpiar construcción anterior
echo "Limpiando..."
flutter clean

# Obtener dependencias
echo "Obteniendo dependencias..."
flutter pub get

# Construir APK
echo "Construyendo APK..."
if [ "$BUILD_TYPE" = "release" ]; then
    flutter build apk --release
    APK_FILE="$APK_DIR/app-release.apk"
else
    flutter build apk --debug
    APK_FILE="$APK_DIR/app-debug.apk"
fi

# Verificar si se construyó correctamente
if [ -f "$APK_FILE" ]; then
    echo "=== APK construido exitosamente ==="
    echo "Archivo: $APK_FILE"
    echo "Tamaño: $(du -h "$APK_FILE" | cut -f1)"
    
    # Copiar a directorio de despliegue
    mkdir -p "$PROJECT_DIR/deploy"
    cp "$APK_FILE" "$PROJECT_DIR/deploy/conteo-electoral.apk"
    echo "APK copiado a: $PROJECT_DIR/deploy/conteo-electoral.apk"
else
    echo "Error: No se pudo construir el APK"
    exit 1
fi

echo "=== Construcción completada ==="
