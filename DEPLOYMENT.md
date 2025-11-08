# API Documentation Site - GitHub Pages Deployment Guide

This guide explains how to deploy your API documentation site to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js and pnpm installed (for local development)

## Deployment Steps

### Option 1: Deploy via GitHub Actions (Recommended)

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

#### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: API documentation site"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The site will automatically build and deploy

#### Step 3: Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### Option 2: Manual Build and Deploy

If you prefer to build locally and deploy manually:

#### Step 1: Build the Project

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build
```

This creates a `dist` folder with your static site.

#### Step 2: Deploy to GitHub Pages

```bash
# Install gh-pages package
pnpm add -D gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Deploy
pnpm deploy
```

## Configuration

### Base URL Configuration

If your site is hosted at a subpath (e.g., `https://username.github.io/repo-name/`), update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // ... other config
});
```

### Custom Domain (Optional)

To use a custom domain:

1. Create a file named `CNAME` in the `client/public` directory
2. Add your custom domain to the file:
   ```
   docs.yourdomain.com
   ```
3. Configure your DNS settings to point to GitHub Pages
4. Enable HTTPS in GitHub Pages settings

## Project Structure

```
api-docs-site/
├── client/
│   ├── public/
│   │   ├── specs/           # Individual YAML files
│   │   └── openapi.yaml     # Merged OpenAPI specification
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx     # Landing page
│       │   └── ApiDocs.tsx  # API documentation page
│       └── App.tsx          # Main app component
├── merge-specs.mjs          # Script to merge YAML files
└── package.json
```

## Updating API Documentation

To update the API documentation:

1. **Update YAML files**: Modify files in `client/public/specs/`
2. **Merge specifications**: Run `node merge-specs.mjs`
3. **Test locally**: Run `pnpm dev` and verify changes
4. **Deploy**: Push to GitHub or run `pnpm deploy`

## Local Development

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

## Features

### Landing Page
- Beautiful hero section with API overview
- Feature cards highlighting key capabilities
- List of all 14 API modules
- Call-to-action sections
- Responsive design

### Documentation Page
- Interactive Swagger UI
- Try API calls directly from the browser
- Search functionality
- Request/response examples
- Data model schemas
- Custom dark theme

### API Coverage
- **14 API Modules**: Customer, Transfer, Wallet, Card, External Accounts, Virtual Accounts, Batch Settlement, Liquidation Address, Prefunded Accounts, KYC Links, Developer Tools, Webhooks, FX Rates, Transaction Status
- **63 Endpoints**: Complete CRUD operations
- **131 Data Models**: Well-defined schemas

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### 404 Errors on GitHub Pages

- Ensure `base` in `vite.config.ts` matches your repository name
- Check that GitHub Pages is enabled in repository settings
- Verify the deployment branch is correct

### OpenAPI Spec Not Loading

- Ensure `openapi.yaml` exists in `client/public/`
- Run `node merge-specs.mjs` to regenerate the merged spec
- Check browser console for CORS or loading errors

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/issues)
- Review the [Swagger UI documentation](https://swagger.io/docs/open-source-tools/swagger-ui/)
- Consult the [Vite documentation](https://vitejs.dev/)

## License

This project is generated from OpenAPI 3.0 specifications.
