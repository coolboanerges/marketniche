# 刷新环境变量脚本
# 在PowerShell中运行此脚本可以刷新当前会话的环境变量

# 刷新PATH环境变量
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 验证Node.js是否可用
Write-Host "正在检查Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js 版本: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm 版本: $npmVersion" -ForegroundColor Green
    Write-Host "`n环境变量已刷新！现在可以使用 node 和 npm 命令了。" -ForegroundColor Green
} catch {
    Write-Host "❌ 仍然无法识别 node 命令" -ForegroundColor Red
    Write-Host "`n请尝试以下方法：" -ForegroundColor Yellow
    Write-Host "1. 完全关闭并重新打开 PowerShell" -ForegroundColor Cyan
    Write-Host "2. 检查Node.js是否正确安装" -ForegroundColor Cyan
    Write-Host "3. 手动检查环境变量PATH中是否包含Node.js安装路径" -ForegroundColor Cyan
}

