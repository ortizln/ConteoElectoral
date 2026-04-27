@echo off
REM Script para construir APK de Conteo Electoral
REM Ejecutar desde CMD o PowerShell

echo ========================================
echo   CONSTRUCCION APK - CONTEO ELECTORAL
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Verificando Flutter...
flutter --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Flutter no esta instalado o no esta en PATH
    echo Descarga Flutter desde: https://flutter.dev
    pause
    exit /b 1
)

echo [2/5] Obteniendo dependencias...
call flutter pub get
if errorlevel 1 (
    echo ERROR: Fallo flutter pub get
    pause
    exit /b 1
)

echo [3/5] Limpiando build anterior...
call flutter clean >nul 2>&1

echo [4/5] Construyendo APK Debug...
call flutter build apk --debug
if errorlevel 1 (
    echo ERROR: Fallo la construccion del APK
    pause
    exit /b 1
)

echo [5/5] Verificando APK generado...
if exist "build\app\outputs\flutter-apk\*.apk" (
    echo.
    echo ========================================
    echo   APK GENERADO EXITOSAMENTE!
    echo ========================================
    echo.
    for %%f in ("build\app\outputs\flutter-apk\*.apk") do (
        echo Ubicacion: %%~ff
        echo Tamano: %%~zf bytes
    )
    echo.
    echo Copiando APK a la carpeta del proyecto...
    copy "build\app\outputs\flutter-apk\app-debug.apk" "conteo-electoral-debug.apk" >nul
    echo APK copiado como: conteo-electoral-debug.apk
    echo.
    echo Para instalar en dispositivo conectado:
    echo   flutter install
    echo.
) else (
    echo ERROR: No se encontro el APK generado
    pause
    exit /b 1
)

echo.
pause