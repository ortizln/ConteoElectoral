#!/usr/bin/env pwsh
# Simple HTTP server for Angular production build using PowerShell

$port = 4201
$webRoot = "C:\Users\Alexi\Documents\PROYECTOS\ConteoElectoral\frontend\dist\conteo-electoral\browser"

# Kill existing process on port
$conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($conn) {
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

Write-Host "Starting frontend server on http://localhost:$port"
Write-Host "Serving files from: $webRoot"
Write-Host ""

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Frontend server running. Press Ctrl+C to stop."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $filePath = Join-Path $webRoot $path.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = Get-Content $filePath -Raw -Encoding Byte
            $response.ContentType = Get-ContentType $filePath
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            # SPA fallback - serve index.html for client-side routing
            $indexPath = Join-Path $webRoot "index.html"
            if (Test-Path $indexPath) {
                $content = Get-Content $indexPath -Raw -Encoding Byte
                $response.ContentType = "text/html"
                $response.ContentLength64 = $content.Length
                $response.OutputStream.Write($content, 0, $content.Length)
            } else {
                $response.StatusCode = 404
            }
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}

function Get-ContentType($path) {
    switch ([System.IO.Path]::GetExtension($path)) {
        ".html" { return "text/html" }
        ".css"  { return "text/css" }
        ".js"   { return "application/javascript" }
        ".json" { return "application/json" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".svg"  { return "image/svg+xml" }
        ".ico"  { return "image/x-icon" }
        default { return "application/octet-stream" }
    }
}
