# GitHub 上传指南

## ✅ 已完成

- ✅ Git 仓库已初始化
- ✅ 代码已提交到本地仓库
- ✅ .gitignore 已配置（排除数据库、node_modules等）

## 📋 下一步：上传到 GitHub

### 方法1：使用 GitHub CLI（如果已安装）

```powershell
# 创建GitHub仓库（需要先登录）
gh repo create marketniche --public --source=. --remote=origin --push
```

### 方法2：手动操作（推荐）

#### 步骤1：在 GitHub 上创建新仓库

1. **访问 GitHub**：https://github.com/new
2. **填写仓库信息**：
   - Repository name: `marketniche` （或你喜欢的名称）
   - Description: `小语种市场选品专家 - 专注于欧洲小语种市场的亚马逊选品工具`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
3. **点击 "Create repository"**

#### 步骤2：添加远程仓库并推送

在项目目录下运行以下命令（替换 `YOUR_USERNAME` 为你的GitHub用户名）：

```powershell
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/marketniche.git

# 或者使用SSH（如果你配置了SSH密钥）
# git remote add origin git@github.com:YOUR_USERNAME/marketniche.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

#### 步骤3：验证

访问你的GitHub仓库页面，应该能看到所有代码文件。

## 🔐 身份验证

如果推送时要求输入用户名和密码：

### 选项1：使用 Personal Access Token（推荐）

1. **生成Token**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 设置名称和过期时间
   - 勾选 `repo` 权限
   - 点击 "Generate token"
   - **复制生成的token**（只显示一次）

2. **使用Token**：
   - 用户名：你的GitHub用户名
   - 密码：粘贴刚才复制的token

### 选项2：使用 GitHub Desktop

如果你安装了 GitHub Desktop，可以使用图形界面操作。

### 选项3：配置SSH密钥

```powershell
# 生成SSH密钥（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 复制公钥
cat ~/.ssh/id_ed25519.pub

# 将公钥添加到GitHub: https://github.com/settings/keys
```

然后使用SSH URL添加远程仓库。

## 📝 完整命令示例

假设你的GitHub用户名是 `yourusername`，仓库名是 `marketniche`：

```powershell
# 1. 添加远程仓库
git remote add origin https://github.com/yourusername/marketniche.git

# 2. 重命名分支为main（如果还没有）
git branch -M main

# 3. 推送代码
git push -u origin main
```

## 🔄 后续更新代码

以后每次修改代码后，使用以下命令更新GitHub：

```powershell
# 添加所有更改
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到GitHub
git push
```

## ⚠️ 注意事项

1. **不要上传敏感信息**：
   - `.env` 文件已在 `.gitignore` 中
   - 数据库文件（`.db`）已排除
   - 确保没有硬编码的API密钥

2. **检查 .gitignore**：
   - 确保 `node_modules/`、`*.db`、`.env` 等已排除

3. **README.md**：
   - 已创建项目README，你可以根据需要修改

## 🎉 完成

上传成功后，你的代码将在GitHub上可见，可以：
- 分享给其他人
- 在不同设备上克隆
- 使用GitHub Actions进行CI/CD
- 接收Issues和Pull Requests

---

**需要帮助？** 如果遇到问题，请检查：
- GitHub账户是否已登录
- 仓库名称是否正确
- 网络连接是否正常
- 是否有推送权限

