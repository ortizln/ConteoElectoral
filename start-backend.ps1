#!/usr/bin/env pwsh
# Start backend Spring Boot application

$backendDir = "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\backend"

# Kill any existing process on port 8081
$port = 8081
$conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($conn) {
    $procId = $conn.OwningProcess
    Write-Host "Killing process $procId on port $port"
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Start backend in background
Write-Host "Starting backend on port 8081..."
Set-Location $backendDir
Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run" -NoNewWindow -RedirectStandardOutput "backend.log" -RedirectStandardError "backend-error.log"

Write-Host "Backend starting... Check backend.log for progress"
Start-Sleep -Seconds 10

# Check if port is listening
$conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($conn) {
    Write-Host "Backend is running on port $port"
} else {
    Write-Host "Backend may not have started. Check backend-error.log"
    Get-Content "backend-error.log" -Tail 20
}
