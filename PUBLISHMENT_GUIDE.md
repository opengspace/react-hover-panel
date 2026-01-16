# Publishing Guide for @opengspace/react-hover-panel

This guide will help you publish the package to npm.

## Prerequisites

1. **npm account**: If you don't have one, register at [npmjs.com](https://www.npmjs.com)
2. **GitHub repository**: Make sure your code is pushed to https://github.com/opengspace/react-hover-panel

## Before Publishing

### 1. Update Version

Update the version in `package.json`:

```bash
# For a new major version (breaking changes)
npm version major

# For a new minor version (new features, backward compatible)
npm version minor

# For a new patch version (bug fixes, backward compatible)
npm version patch
```

Or edit `package.json` manually:
```json
{
  "version": "1.0.0"  // Update this
}
```

### 2. Test the Build

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Or build in library mode
npm run build:lib
```

Verify that the `dist/` folder contains:
- `index.js` (CommonJS)
- `index.es.js` (ES Module)
- `index.d.ts` (TypeScript definitions, if applicable)

### 3. Test Locally

You can test the package locally before publishing:

```bash
# In the package directory
npm link

# In your test project
npm link @opengspace/react-hover-panel
```

### 4. Check Package Contents

See what will be published:

```bash
npm pack --dry-run
```

This will show you a list of files that will be included in the package without actually creating it.

## Publishing

### First Time Setup

If this is your first time publishing:

1. **Login to npm**:
```bash
npm login
```

2. **Create an organization** (if not already created):
- Go to https://www.npmjs.com/org/create
- Create organization: `opengspace`

### Publishing Steps

1. **Make sure you're on the main branch** and have the latest changes:
```bash
git checkout main
git pull origin main
```

2. **Build the package**:
```bash
npm run build
```

3. **Publish to npm**:
```bash
# For public scoped package (recommended)
npm publish --access public

# For first publication, you might need:
npm publish --access public --@opengspace:registry=https://registry.npmjs.org
```

4. **Verify publication**:
- Visit https://www.npmjs.com/package/@opengspace/react-hover-panel
- Check that the version is correct
- Verify the package information

5. **Create a Git tag** (recommended):
```bash
git tag v1.0.0
git push origin v1.0.0
```

6. **Create a GitHub Release** (optional but recommended):
- Go to https://github.com/opengspace/react-hover-panel/releases
- Click "Draft a new release"
- Tag: `v1.0.0`
- Title: `v1.0.0`
- Description: Add release notes
- Click "Publish release"

## Updating the Package

When you need to publish an update:

1. Make your changes
2. Update version in `package.json`
3. Test the build locally
4. Commit and push to GitHub
5. Run `npm publish --access public`
6. Create a GitHub release

## Common Issues

### "403 Forbidden" Error

If you get a 403 error when publishing:

```bash
# Make sure you're logged in
npm whoami

# If not logged in
npm login

# Try publishing with explicit access
npm publish --access public
```

### "E404" Error

If you get an E404 error:

- Make sure the package name doesn't already exist
- For scoped packages (@opengspace/...), make sure to use `--access public`

### "You do not have permission to publish"

- Make sure you're a member of the `opengspace` organization on npm
- Contact the organization owner if needed

## After Publishing

### Verify Installation

Test that users can install your package:

```bash
# In a new project
npm install @opengspace/react-hover-panel
```

### Monitor Downloads

Check your package statistics at:
- https://www.npmjs.com/package/@opengspace/react-hover-panel

### Update README

Make sure your README.md is up to date with:
- Installation instructions
- Usage examples
- API documentation
- Contributing guidelines

## Publishing Checklist

Before publishing, make sure:

- [ ] Version number is updated in `package.json`
- [ ] Build runs successfully (`npm run build`)
- [ ] Tested locally (`npm link` or in a test project)
- [ ] README.md is complete and accurate
- [ ] LICENSE file is included
- [ ] All necessary files are in the `dist/` folder
- [ ] `.npmignore` is configured correctly
- [ ] Git commits are pushed to GitHub
- [ ] You have proper npm permissions

## Useful Commands

```bash
# Check current version
npm version

# Check what files will be published
npm pack --dry-run

# Create a tarball without publishing
npm pack

# Login to npm
npm login

# Check who you're logged in as
npm whoami

# Logout
npm logout

# Unpublish a version (use with caution!)
npm unpublish @opengspace/react-hover-panel@1.0.0

# Deprecate a version
npm deprecate @opengspace/react-hover-panel@1.0.0 "Critical bug, please upgrade"
```

## Support

If you encounter issues:

1. Check npm status: https://status.npmjs.org/
2. Visit npm documentation: https://docs.npmjs.com/
3. Open an issue: https://github.com/opengspace/react-hover-panel/issues

Good luck with your publication! 🚀
