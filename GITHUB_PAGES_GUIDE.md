# 🚀 GitHub Pages 部署指南

本指南将帮助您将API文档网站部署到GitHub Pages,整个过程只需5个步骤。

## 📋 前提条件

- 拥有GitHub账号
- 已安装Git (检查: `git --version`)
- 项目文件已准备好

## 🔧 部署步骤

### 步骤 1: 创建GitHub仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 **+** 按钮,选择 **New repository**
3. 填写仓库信息:
   - **Repository name**: 例如 `api-docs` (这将成为URL的一部分)
   - **Description**: "API Documentation Site" (可选)
   - **Public** 或 **Private**: 选择 Public (GitHub Pages免费版需要公开仓库)
   - **不要勾选** "Initialize this repository with a README" (我们已经有了)
4. 点击 **Create repository**

### 步骤 2: 配置项目基础路径

如果您的仓库名不是您的用户名(例如仓库名是`api-docs`而不是`username.github.io`),需要配置基础路径:

1. 打开项目中的 `vite.config.ts` 文件
2. 找到 `defineConfig` 部分,添加或修改 `base` 选项:

```typescript
export default defineConfig({
  base: '/api-docs/',  // 替换为您的实际仓库名,注意前后的斜杠
  plugins: [
    // ... 其他配置保持不变
  ],
});
```

3. 保存文件

> **重要**: 如果您的仓库名是 `api-docs`,那么 `base` 就是 `/api-docs/`

### 步骤 3: 推送代码到GitHub

在项目根目录打开终端,执行以下命令:

```bash
# 1. 初始化Git仓库 (如果还没有)
git init

# 2. 添加所有文件
git add .

# 3. 创建第一次提交
git commit -m "Initial commit: API documentation site"

# 4. 设置主分支名称为main
git branch -M main

# 5. 添加远程仓库地址 (替换YOUR_USERNAME和YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. 推送到GitHub
git push -u origin main
```

**示例** (假设用户名是 `johndoe`,仓库名是 `api-docs`):
```bash
git remote add origin https://github.com/johndoe/api-docs.git
git push -u origin main
```

> **提示**: 如果推送时要求输入用户名和密码,建议使用Personal Access Token而不是密码。

### 步骤 4: 启用GitHub Pages

1. 在GitHub上打开您的仓库页面
2. 点击顶部的 **Settings** (设置) 标签
3. 在左侧边栏中,点击 **Pages**
4. 在 **Source** (来源) 部分:
   - 选择 **GitHub Actions** (而不是 Deploy from a branch)
5. 页面会自动刷新,显示"GitHub Pages source saved"

### 步骤 5: 等待部署完成

1. 点击仓库顶部的 **Actions** 标签
2. 您会看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行
3. 等待几分钟,直到显示绿色的 ✓ (表示成功)
4. 返回 **Settings → Pages**,您会看到网站地址

## 🎉 访问您的网站

您的API文档网站现在可以通过以下地址访问:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**示例**:
- 用户名: `johndoe`
- 仓库名: `api-docs`
- 网站地址: `https://johndoe.github.io/api-docs/`

## 🔄 更新文档

当您需要更新API文档时:

1. **修改YAML文件**: 编辑 `client/public/specs/` 目录下的文件
2. **重新合并**: 运行 `node merge-specs.mjs`
3. **提交更改**:
   ```bash
   git add .
   git commit -m "Update API specifications"
   git push
   ```
4. **自动部署**: GitHub Actions会自动重新构建和部署

## 🎨 自定义域名 (可选)

如果您想使用自己的域名(如 `docs.yourdomain.com`):

### 1. 添加CNAME文件

在 `client/public/` 目录下创建名为 `CNAME` 的文件(无扩展名):

```bash
echo "docs.yourdomain.com" > client/public/CNAME
```

### 2. 配置DNS

在您的域名提供商处添加DNS记录:

**选项A: 使用CNAME记录** (推荐用于子域名)
```
Type: CNAME
Name: docs
Value: YOUR_USERNAME.github.io
```

**选项B: 使用A记录** (用于根域名)
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. 在GitHub中配置

1. 进入 **Settings → Pages**
2. 在 **Custom domain** 输入框中输入您的域名
3. 点击 **Save**
4. 等待DNS检查完成
5. 勾选 **Enforce HTTPS**

### 4. 提交CNAME文件

```bash
git add client/public/CNAME
git commit -m "Add custom domain"
git push
```

## ❓ 常见问题

### Q: 网站显示404错误

**A**: 检查以下几点:
- 确认 `vite.config.ts` 中的 `base` 路径与仓库名匹配
- 确认GitHub Pages已在Settings中启用
- 等待几分钟让部署完成
- 清除浏览器缓存后重试

### Q: 样式没有加载

**A**: 这通常是base路径配置问题:
- 检查 `vite.config.ts` 中的 `base` 是否正确
- 确保base路径前后都有斜杠,如 `/api-docs/`
- 重新构建并推送

### Q: GitHub Actions构建失败

**A**: 查看错误信息:
1. 进入 **Actions** 标签
2. 点击失败的工作流
3. 查看详细错误日志
4. 常见问题:
   - 依赖安装失败: 确保 `pnpm-lock.yaml` 已提交
   - 构建错误: 在本地运行 `pnpm build` 检查

### Q: 如何更改网站标题?

**A**: 编辑 `client/src/const.ts`:
```typescript
export const APP_TITLE = "您的API文档标题";
```

### Q: 能否使用根域名?

**A**: 可以,但需要:
1. 仓库名必须是 `YOUR_USERNAME.github.io`
2. 或者按照上面的"自定义域名"步骤配置

## 📞 获取帮助

如果遇到问题:
- 查看GitHub Actions的构建日志
- 检查浏览器开发者工具的Console
- 参考 [GitHub Pages文档](https://docs.github.com/en/pages)
- 参考 [Vite部署文档](https://vitejs.dev/guide/static-deploy.html)

## 🎊 完成!

恭喜!您的API文档网站现在已经成功部署到GitHub Pages了。您可以将网站链接分享给团队成员或客户。
