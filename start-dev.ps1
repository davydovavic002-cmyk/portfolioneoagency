$env:NPM_CONFIG_CACHE = "$PSScriptRoot\.npm-cache"
$env:TEMP = "$PSScriptRoot\.tmp"
$env:TMP = "$PSScriptRoot\.tmp"

New-Item -ItemType Directory -Force -Path $env:NPM_CONFIG_CACHE, $env:TEMP | Out-Null

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
  npm install --legacy-peer-deps
}

Write-Host "Starting NEO STUDIO SPACE dev server..." -ForegroundColor Green
npm run dev -- --host 127.0.0.1 --port 5173
