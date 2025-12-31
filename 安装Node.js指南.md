# Node.js 安装指南

## 问题
系统无法识别 `npm` 命令，这是因为没有安装 Node.js。

## 解决方案

### 方法1：官方安装包（推荐，最简单）

1. **访问 Node.js 官网**
   - 打开浏览器，访问：https://nodejs.org/
   - 或直接下载：https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi

2. **下载 LTS 版本**（推荐）
   - 选择 "LTS" 版本（长期支持版本，更稳定）
   - 下载 Windows Installer (.msi) 文件

3. **安装**
   - 双击下载的 .msi 文件
   - 按照安装向导完成安装
   - **重要**：安装时确保勾选 "Add to PATH" 选项

4. **验证安装**
   - 关闭并重新打开 PowerShell 或终端
   - 运行以下命令验证：
   ```powershell
   node --version
   npm --version
   ```

### 方法2：使用 winget（Windows 包管理器）

如果你已经安装了 Windows 11 或 Windows 10 的最新版本，可以使用 winget：

```powershell
winget install OpenJS.NodeJS.LTS
```

安装后，**重新打开 PowerShell** 才能使用。

### 方法3：使用 Chocolatey（如果已安装）

如果你已经安装了 Chocolatey：

```powershell
choco install nodejs-lts
```

## 安装后验证

安装完成后，**必须重新打开 PowerShell 或终端**，然后运行：

```powershell
# 检查 Node.js 版本
node --version
# 应该显示类似：v20.10.0

# 检查 npm 版本
npm --version
# 应该显示类似：10.2.3
```

## 如果安装后仍然无法使用

1. **检查环境变量**
   - 按 `Win + R`，输入 `sysdm.cpl`，回车
   - 点击"高级"选项卡 → "环境变量"
   - 在"系统变量"中找到 `Path`
   - 确认包含 Node.js 的安装路径（通常是 `C:\Program Files\nodejs\`）

2. **重启终端**
   - 完全关闭 PowerShell/终端
   - 重新打开

3. **手动添加到 PATH**（如果上述方法无效）
   ```powershell
   # 查看当前 PATH
   $env:Path
   
   # 临时添加到当前会话（替换为你的实际安装路径）
   $env:Path += ";C:\Program Files\nodejs\"
   ```

## 安装完成后继续前端开发

安装好 Node.js 后，回到项目目录：

```powershell
cd frontend
npm install
npm run dev
```

---

**提示**：如果遇到权限问题，可以尝试以管理员身份运行 PowerShell。

