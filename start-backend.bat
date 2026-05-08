@echo off
REM Start backend in background
start /B "" java -jar "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\backend\target\conteo-electoral-1.0.0.jar" > "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\backend\app.log" 2>&1
echo Backend started with PID: %ERRORLEVEL%
exit 0
