@echo off
echo Deploying Angular frontend to Nginx (without Docker)...

REM Build the frontend for production
echo Building Angular app...
cd frontend
call ng build --configuration=production

REM Update environment.prod.ts with your production server IP
REM Then copy the dist folder to Nginx
echo.
echo === INSTRUCCIONES ===
echo 1. Update frontend\src\environments\environment.prod.ts with your server IP
echo 2. Copy the contents of frontend\dist\conteo-electoral to C:\nginx\html\conteo-electoral
echo 3. Copy frontend\nginx.conf to C:\nginx\conf\conteo-electoral.conf
echo 4. Include the config in nginx.conf: include conteo-electoral.conf;
echo 5. Reload Nginx: nginx -s reload
echo.
echo Build output: frontend\dist\conteo-electoral
pause
