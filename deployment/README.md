# Deployment Configuration

This folder contains the configuration files and workflows needed to deploy the GitHub Pages site for the Vision-Language UAV Following Control research project.

## Contents

- `github-pages.yml` - GitHub Actions workflow for automated deployment
- `deploy-config.yml` - Deployment configuration settings
- `build/` - Directory for build artifacts (generated during deployment)

## Automated Deployment

The site is automatically deployed using GitHub Actions whenever changes are pushed to the main branch. The workflow:

1. Checks out the repository
2. Sets up Ruby and Jekyll
3. Builds the Jekyll site
4. Deploys to GitHub Pages

## Manual Deployment

If needed, you can manually trigger deployment:

1. Go to the repository's Actions tab
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and choose the main branch

## Configuration

The deployment uses the following configuration:

- **Source**: Main branch, root directory
- **Build tool**: Jekyll
- **Theme**: Minima with custom styling
- **Base URL**: `/Vision-Language-UAV-Following-Control`

## Site Structure

The deployed site includes:

- Landing page with project overview (`index.html`)
- Research documentation (`README.md` rendered as homepage)
- Demo files and examples (`assets/demos/`)
- Images and videos (`assets/images/`, `assets/videos/`)
- Additional documentation (`docs/`)

## Troubleshooting

If deployment fails:

1. Check the Actions tab for error details
2. Verify Jekyll configuration in `_config.yml`
3. Ensure all relative links are correct
4. Check that all assets are properly referenced

## Local Development

To test the site locally before deployment:

```bash
cd /home/runner/work/Vision-Language-UAV-Following-Control/Vision-Language-UAV-Following-Control
gem install bundler jekyll
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000/Vision-Language-UAV-Following-Control/`