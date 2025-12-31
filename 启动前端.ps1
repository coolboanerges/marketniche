# MarketNiche 前端启动脚本
# 此脚本会自动刷新环境变量并启动前端服务

Write-Host "正在刷新环境变量..." -ForegroundColor Yellow

# 刷新PATH环境变量
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 检查Node.js和npm是否可用
Write-Host "`n检查Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js未找到，请先安装Node.js" -ForegroundColor Red
    Write-Host "访问: https://nodejs.org/" -ForegroundColor Cyan
    exit 1
}

# 进入前端目录
Write-Host "`n进入前端目录..." -ForegroundColor Yellow
Set-Location frontend

# 检查是否已安装依赖
if (-not (Test-Path "node_modules")) {
    Write-Host "检测到未安装依赖，正在安装..." -ForegroundColor Yellow
    npm install
}

# 启动开发服务器
Write-Host "`n正在启动前端开发服务器..." -ForegroundColor Green
Write-Host "前端将在 http://localhost:5173 启动" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止服务器`n" -ForegroundColor Yellow

npm run dev

