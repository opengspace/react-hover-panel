# GitHub Pages Deployment Guide

This guide explains how to deploy the demo to GitHub Pages.

## Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to https://github.com/opengspace/react-hover-panel
2. **gh-pages package**: Install the deployment tool

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

This will install `gh-pages` which is needed for deployment.

### 2. Build and Deploy

```bash
npm run deploy
```

This command will:
1. Build the demo site (`npm run build`)
2. Deploy to the `gh-pages` branch using `gh-pages`

### 3. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/opengspace/react-hover-panel
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **gh-pages** branch
5. Click **Save**

Your demo will be live at: **https://opengspace.github.io/react-hover-panel/**

## Deployment Commands

### Full Deployment (Build + Deploy)

```bash
npm run deploy
```

Builds the project and deploys to GitHub Pages.

### Deploy Only (Skip Build)

```bash
npm run deploy:only
```

Deploys the already-built `dist/` folder to GitHub Pages.

### Local Build Test

```bash
npm run build
npm run preview
```

Builds and serves the production build locally for testing.

## Configuration

The GitHub Pages deployment is configured in `vite.config.js`:

```javascript
export default defineConfig({
  base: '/react-hover-panel/',  // Repository name
  // ...
});
```

This ensures all assets are loaded with the correct path when deployed to GitHub Pages.

## Automatic Deployment (Optional)

You can set up automatic deployment using GitHub Actions:

### Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

With this workflow, every push to the `main` branch will automatically deploy to GitHub Pages.

## Troubleshooting

### Page not found

- Make sure GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists
- Verify the `base` path in `vite.config.js` matches your repository name

### Assets not loading

- Check browser console for 404 errors
- Verify the `base` path is correct (should be `/react-hover-panel/`)
- Make sure you're building with `npm run build` before deploying

### White screen after deployment

- Check the browser console for errors
- Verify all paths are relative (using `/react-hover-panel/` prefix)
- Test locally with `npm run preview` before deploying

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the root directory:
   ```
   yourdomain.com
   ```

2. Configure DNS settings at your domain registrar

3. Update GitHub Pages settings to use the custom domain

## Update Deployment

To update the deployed site:

1. Make your changes
2. Commit and push to GitHub
3. Run `npm run deploy`

The changes will be live in a few seconds.

## View Deployment

After successful deployment, visit:
- **Demo**: https://opengspace.github.io/react-hover-panel/
- **GitHub**: https://github.com/opengspace/react-hover-panel/deployments

## Need Help?

- Check GitHub Actions logs (if using automatic deployment)
- Review the `gh-pages` branch for deployed files
- Open an issue: https://github.com/opengspace/react-hover-panel/issues
