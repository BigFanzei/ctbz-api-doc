# API Documentation Site - TODO

## Project Overview
Create an interactive API documentation website from OpenAPI YAML specifications that can be deployed to GitHub Pages.

## Features to Implement

### Phase 1: Setup & Structure
- [x] Install and configure API documentation rendering library (Swagger UI)
- [x] Merge all YAML spec files into a unified OpenAPI specification
- [x] Set up static site structure for GitHub Pages deployment

### Phase 2: Documentation UI
- [x] Create main documentation page with API spec renderer
- [x] Add responsive design for mobile devices
- [x] Implement search functionality (built-in Swagger UI)
- [x] Create beautiful landing page with API overview

### Phase 3: Enhancements
- [x] Add custom branding and styling
- [x] Create landing page with API overview
- [x] Add interactive API testing (Swagger UI Try It Out)
- [x] Custom dark theme styling for Swagger UI

### Phase 4: Deployment Preparation
- [x] Configure build process for static export
- [x] Test all API endpoints documentation
- [ ] Create README with deployment instructions
- [ ] Package for GitHub Pages deployment

## Technical Stack
- React 19 + Vite
- Swagger UI React for OpenAPI rendering
- Tailwind CSS for styling
- Static site generation for GitHub Pages

## Completed Features
- ✅ 14 YAML files merged into single OpenAPI spec
- ✅ 63 API endpoints documented
- ✅ 131 data models defined
- ✅ Beautiful landing page with feature cards
- ✅ Interactive Swagger UI documentation
- ✅ Custom dark theme styling
- ✅ Responsive design
- ✅ Navigation between home and docs


## New Request: GitHub Pages Deployment Setup
- [x] Create GitHub Actions workflow file
- [x] Configure vite.config.ts for GitHub Pages
- [x] Create step-by-step deployment guide
- [x] Test build process


## New Request: Add Module Navigation on Homepage
- [x] Analyze 14 YAML files to extract module information
- [x] Design module navigation cards with direct links
- [x] Update Home page with clickable module navigation
- [x] Test navigation links to specific API sections


## New Request: Publish to GitHub
- [x] Configure vite.config.ts base path for ctbz-api-doc
- [x] Initialize git repository
- [x] Push code to BigFanzei/ctbz-api-doc
- [x] Verify GitHub Actions deployment
- [x] Provide deployment URL to user


## Bug Fix: GitHub Actions pnpm version conflict
- [x] Fix pnpm version mismatch in deploy.yml
- [x] Push fix to GitHub
- [x] Verify deployment succeeds


## Bug Fix: GitHub Pages 404 error
- [x] Fix build output path in deploy.yml
- [x] Add .nojekyll file
- [x] Add 404.html for SPA routing
- [ ] Debug persistent 404 issue
- [ ] Check GitHub Pages settings


## Bug Fix: Sub-page 404 on GitHub Pages
- [ ] Fix 404.html redirect logic for hash-based routes
- [ ] Update index.html to handle SPA routing on load
- [ ] Test all routes including /docs and hash routes
- [ ] Push fix to GitHub
- [ ] Verify all pages accessible


## Bug Report: Hash routing /#/docs still showing homepage
- [x] Test /#/docs URL on GitHub Pages
- [x] Check if hash routing is actually working - WORKING!
- [x] Verify Swagger UI loads on docs page - LOADS BUT YAML 404
- [x] Fix openapi.yaml URL to use absolute path
- [x] Push fix and test - DEPLOYED
- [x] Issue persists - needs alternative solution (CORS or spec format issue)


## New Feature: Inline OpenAPI Spec Loading
- [x] Install js-yaml package to parse YAML in JavaScript
- [x] Create openapi-spec.ts to import and export YAML content
- [x] Update ApiDocs.tsx to use spec prop instead of url prop
- [x] Test on local dev server - SUCCESS!
- [ ] Push to GitHub and verify on GitHub Pages
