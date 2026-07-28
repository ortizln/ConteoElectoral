@echo off
cd /d "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\backend"
start /B mvn.cmd spring-boot:run > backend6.log 2> backend6.err
echo Server started with PID: %ERRORLEVEL%
