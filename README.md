# API Documentation Site

A beautiful, interactive API documentation website built from OpenAPI 3.0 specifications. Features a modern landing page and comprehensive Swagger UI documentation.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📦 What's Included

- **14 API Modules**: Customer, Transfer, Wallet, Card, External Accounts, Virtual Accounts, Batch Settlement, Liquidation Address, Prefunded Accounts, KYC Links, Developer Tools, Webhooks, FX Rates, Transaction Status
- **63 API Endpoints**: Complete CRUD operations with detailed documentation
- **131 Data Models**: Well-defined schemas with type definitions
- **Interactive Testing**: Try API calls directly from the documentation
- **Search & Filter**: Quickly find endpoints and models
- **Dark Theme**: Custom-styled Swagger UI with modern design

## 🌐 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `api-docs` (this will be part of your URL)
3. **Do not** initialize with README, .gitignore, or license (we already have these)

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd /path/to/api-docs-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: API documentation site"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically run and deploy your site

### Step 4: Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

For example, if your username is `johndoe` and repository is `api-docs`:
```
https://johndoe.github.io/api-docs/
```

## 🔧 Configuration

### For Subdirectory Deployment

If your site is at `https://username.github.io/repo-name/` (not root), you need to configure the base path:

1. Open `vite.config.ts`
2. Add or update the `base` option:

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',  // Replace with your actual repo name
  // ... other config
});
```

3. Commit and push:

```bash
git add vite.config.ts
git commit -m "Configure base path for GitHub Pages"
git push
```

### For Root Domain Deployment

If using a custom domain (e.g., `docs.yourdomain.com`):

1. Create a file named `CNAME` in `client/public/`:

```bash
echo "docs.yourdomain.com" > client/public/CNAME
```

2. Configure your DNS:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or add A records pointing to GitHub Pages IPs

3. In GitHub repository settings → Pages, enter your custom domain

4. Enable "Enforce HTTPS"

## 📝 Updating Documentation

### Update API Specifications

1. Edit YAML files in `client/public/specs/`
2. Run the merge script:

```bash
node merge-specs.mjs
```

3. Test locally:

```bash
pnpm dev
```

4. Commit and push:

```bash
git add .
git commit -m "Update API specifications"
git push
```

The GitHub Action will automatically rebuild and redeploy your site.

## 🎨 Customization

### Change Site Title

Edit `client/src/const.ts`:

```typescript
export const APP_TITLE = "Your API Documentation";
```

### Modify Landing Page

Edit `client/src/pages/Home.tsx` to customize:
- Hero section text
- Feature cards
- API modules list
- Call-to-action sections

### Customize Swagger UI Theme

Edit `client/src/index.css` to modify Swagger UI styling:
- Colors
- Fonts
- Spacing
- Component styles

## 📂 Project Structure

```
api-docs-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── client/
│   ├── public/
│   │   ├── specs/              # Individual YAML specification files
│   │   └── openapi.yaml        # Merged OpenAPI specification
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx        # Landing page
│       │   └── ApiDocs.tsx     # Documentation page with Swagger UI
│       ├── App.tsx             # Main app with routing
│       └── index.css           # Global styles and Swagger UI customization
├── merge-specs.mjs             # Script to merge YAML files
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🛠️ Troubleshooting

### Site Shows 404 Error

- Check that GitHub Pages is enabled in repository settings
- Verify the `base` path in `vite.config.ts` matches your repo name
- Wait a few minutes for the deployment to complete

### Styles Not Loading

- Ensure all assets are in `client/public/`
- Check browser console for errors
- Verify the base path configuration

### API Spec Not Loading

- Confirm `openapi.yaml` exists in `client/public/`
- Run `node merge-specs.mjs` to regenerate
- Check for YAML syntax errors

### Build Fails on GitHub Actions

- Check the Actions tab for error details
- Ensure `pnpm-lock.yaml` is committed
- Verify all dependencies are listed in `package.json`

## 📄 License

This project is generated from OpenAPI 3.0 specifications.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
