# Script para construir APK de Conteo Electoral
# Ejecutar desde PowerShell: .\build_apk.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CONSTRUCCION APK - CONTEO ELECTORAL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
$projectPath = "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\conteo_electoral_app"
Set-Location $projectPath

Write-Host "[1/5] Verificando Flutter..." -ForegroundColor Yellow
flutter --version | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Flutter no está instalado o no está en PATH" -ForegroundColor Red
    Write-Host "Descarga Flutter desde: https://flutter.dev" -ForegroundColor Red
    exit 1
}

Write-Host "[2/5] Obteniendo dependencias..." -ForegroundColor Yellow
flutter pub get
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Falló flutter pub get" -ForegroundColor Red
    exit 1
}

Write-Host "[3/5] Limpiando build anterior..." -ForegroundColor Yellow
flutter clean | Out-Null

Write-Host "[4/5] Construyendo APK Debug..." -ForegroundColor Yellow
flutter build apk --debug
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Falló la construcción del APK" -ForegroundColor Red
    exit 1
}

Write-Host "[5/5] Verificando APK generado..." -ForegroundColor Yellow
$apkPath = "$projectPath\build\app\outputs\flutter-apk"
$apkFile = Get-ChildItem -Path $apkPath -Filter "*.apk" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($apkFile) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  APK GENERADO EXITOSAMENTE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ubicación: $($apkFile.FullName)" -ForegroundColor Cyan
    Write-Host "Tamaño: $([math]::Round($apkFile.Length / 1MB, 2)) MB" -ForegroundColor Cyan
    Write-Host "Fecha: $($apkFile.LastWriteTime)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para instalar en dispositivo conectado:" -ForegroundColor Yellow
    Write-Host "  flutter install" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para generar APK Release:" -ForegroundColor Yellow
    Write-Host "  flutter build apk --release" -ForegroundColor Cyan
} else {
    Write-Host "ERROR: No se encontró el APK generado" -ForegroundColor Red
    exit 1
}

# Copiar APK a carpeta principal
Copy-Item $apkFile.FullName -Destination "$projectPath\conteo-electoral-debug.apk"
Write-Host "APK copiado a: $projectPath\conteo-electoral-debug.apk" -ForegroundColor Cyan