# GitHub Actions Deployment

This directory contains GitHub Actions workflows for automated deployment.

## Deploy Workflow

**File**: `.github/workflows/deploy.yml`

### What it does:

Automatically deploys the demo site to GitHub Pages whenever you push to the `main` branch.

### Triggers:

- **Push to main branch**: Automatic deployment
- **Manual trigger**: Can be triggered manually from GitHub Actions tab

### Process:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run build`
5. Deploys the `dist/` folder to GitHub Pages

### Permissions:

The workflow has permissions to:
- Read repository contents
- Write to GitHub Pages
- Use OIDC token for deployment

## Enabling GitHub Pages

### First Time Setup:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Build and deployment** > **Source**, select **GitHub Actions**

5. Click **Save**

### Manual Deployment:

To trigger a deployment without pushing to main:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

## Monitoring Deployments

### View Deployment Status:

1. Go to the **Actions** tab
2. Click on the latest workflow run
3. View logs and status

### Deployment URL:

After successful deployment, your demo will be available at:
**https://opengspace.github.io/react-hover-panel/**

### Deployment History:

View all deployments at:
https://github.com/opengspace/react-hover-panel/deployments

## Troubleshooting

### Workflow Failed:

1. Check the Actions tab for error logs
2. Common issues:
   - Build errors (check for syntax errors)
   - Permission issues (verify workflow permissions)
   - Timeout (large builds may take longer)

### Pages Not Updating:

1. Check if workflow completed successfully
2. Clear browser cache
3. Wait a few minutes for GitHub Pages to update

### Build Errors:

Locally test the build first:
```bash
npm run build
npm run preview
```

## Customization

### Change Deployment Branch:

Edit `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches: [ main ]  # Change this
```

### Change Node Version:

Edit `.github/workflows/deploy.yml`:
```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change this
```

### Add Environment Variables:

Edit `.github/workflows/deploy.yml`:
```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_KEY: ${{ secrets.API_KEY }}
```

## Need Help?

- GitHub Actions Documentation: https://docs.github.com/en/actions
- GitHub Pages Documentation: https://docs.github.com/en/pages
- Open an issue: https://github.com/opengspace/react-hover-panel/issues
