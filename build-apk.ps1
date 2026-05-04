# Script para construir APK de la aplicación móvil (PowerShell)
# Requiere: Flutter SDK instalado
# Uso: .\build-apk.ps1 [debug|release]

param(
    [string]$BuildType = "debug"
)

$ProjectDir = "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\conteo_electoral_app"
$ApkDir = "$ProjectDir\build\app\outputs\flutter-apk"

Write-Host "=== Iniciando construcción de APK ($BuildType) ===" -ForegroundColor Green

# Entrar al directorio de la app
Set-Location $ProjectDir

# Limpiar construcción anterior
Write-Host "Limpiando..." -ForegroundColor Yellow
flutter clean

# Obtener dependencias
Write-Host "Obteniendo dependencias..." -ForegroundColor Yellow
flutter pub get

# Construir APK
Write-Host "Construyendo APK..." -ForegroundColor Yellow
if ($BuildType -eq "release") {
    flutter build apk --release
    $ApkFile = "$ApkDir\app-release.apk"
} else {
    flutter build apk --debug
    $ApkFile = "$ApkDir\app-debug.apk"
}

# Verificar si se construyó correctamente
if (Test-Path $ApkFile) {
    Write-Host "=== APK construido exitosamente ===" -ForegroundColor Green
    Write-Host "Archivo: $ApkFile"
    $FileSize = (Get-Item $ApkFile).Length / 1MB
    Write-Host "Tamaño: $([math]::Round($FileSize, 2)) MB"
    
    # Copiar a directorio de despliegue
    $DeployDir = "$ProjectDir\deploy"
    if (!(Test-Path $DeployDir)) {
        New-Item -ItemType Directory -Path $DeployDir -Force | Out-Null
    }
    Copy-Item $ApkFile "$DeployDir\conteo-electoral.apk"
    Write-Host "APK copiado a: $DeployDir\conteo-electoral.apk" -ForegroundColor Cyan
} else {
    Write-Host "Error: No se pudo construir el APK" -ForegroundColor Red
    exit 1
}

Write-Host "=== Construcción completada ===" -ForegroundColor Green
