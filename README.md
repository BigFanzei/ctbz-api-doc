# CTBZ API Documentation

Complete API documentation for CTBZ services.

## 📚 View Documentation

🔗 **Live Documentation**: https://bigfanzei.github.io/ctbz-api-doc/

## 📦 What's Included

- **13 API Modules**:
  - Batch Settlement
  - Card
  - Customer
  - Developer
  - External Account
  - FX Rate
  - KYC Link
  - Liquidation Address
  - Prefunded Account
  - Transfer
  - Virtual Account
  - Wallet
  - Webhook

- **63 API Endpoints**: Complete CRUD operations with detailed documentation
- **131 Data Models**: Well-defined schemas with type definitions

## 🔧 Local Development

### Update API Specifications

1. Edit YAML files in `specs/` directory
2. Run the merge script:
   ```bash
   npm run build
   ```
3. Open `index.html` in your browser to preview

### Deploy to GitHub Pages

Simply commit and push your changes:
```bash
git add .
git commit -m "Update API documentation"
git push
```

GitHub Actions will automatically deploy to GitHub Pages.

## 📂 Project Structure

```
ctbz-api-doc/
├── specs/              # Individual YAML specification files
├── openapi.yaml        # Merged OpenAPI specification
├── index.html          # Swagger UI page
├── merge-specs.js      # Script to merge YAML files
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment workflow
```

## 🛠️ How It Works

1. Individual API specifications are stored in `specs/` directory
2. `merge-specs.js` combines all YAML files into a single `openapi.yaml`
3. Each file automatically becomes a tag (e.g., `card.yaml` → `card` tag)
4. `index.html` displays the merged specification using Swagger UI
5. GitHub Actions deploys everything to GitHub Pages

## 📝 Adding New APIs

1. Create a new YAML file in `specs/` directory (e.g., `payment.yaml`)
2. Define your API endpoints and schemas
3. Run `npm run build` to regenerate `openapi.yaml`
4. Commit and push

The new API will automatically appear as a new tag in the documentation!
