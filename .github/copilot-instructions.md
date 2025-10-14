# Vision-Language UAV Following Control - GitHub Pages Site

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

This repository hosts a Jekyll-based GitHub Pages site for academic research on "Learning Object Following for Small UAVs using Vision-Language and Efficient Visual Flight Control" by Sebastian-Ion Nae and Marius Leordeanu.

## Working Effectively

### Bootstrap and Build
Run these commands in exact order to set up the repository:

```bash
# Install Ruby dependencies (requires sudo)
sudo gem install bundler jekyll minima

# Build the site
cd /path/to/repository
jekyll build
```

**CRITICAL TIMING**: 
- Jekyll build takes < 2 seconds. NEVER CANCEL.
- Installation of gems takes 60-180 seconds. NEVER CANCEL.
- Set timeout to 300+ seconds for gem installation commands.

### Development Server
Start the development server to test changes:

```bash
# Start Jekyll server (runs in background)
jekyll serve --host 0.0.0.0 --port 4000

# Site accessible at: http://localhost:4000/Vision-Language-UAV-Following-Control/
```

**CRITICAL**: Server starts in 1-2 seconds. Site has baseurl `/Vision-Language-UAV-Following-Control/` - always include this in URLs.

### Build Validation
Always run these validation steps after making changes:

```bash
# Clean build test
jekyll build
echo "✓ Build completed in < 2 seconds"

# Test server startup
jekyll serve --detach
curl -f http://localhost:4000/Vision-Language-UAV-Following-Control/
pkill -f jekyll
echo "✓ Server validation passed"
```

## Repository Structure

```
├── README.md              # Main content page (primary)
├── index.html             # Alternative styled entry point
├── _config.yml            # Jekyll configuration
├── SETUP_SUMMARY.md       # GitHub Pages setup documentation
├── assets/
│   ├── demos/            # Demo files and examples
│   ├── images/           # Project images and figures
│   └── videos/           # Video demonstrations
├── _demos/
│   └── sample-demo.md    # Jekyll collection for demo pages
└── docs/
    └── setup.md          # Site maintenance documentation
```

## Content Management

### Adding Demos
Upload demo files to `assets/demos/` and create corresponding pages in `_demos/`:

```bash
# Add demo file
cp new-demo.mp4 assets/videos/
echo "Demo uploaded"

# Create demo page
cat > _demos/new-demo.md << 'EOF'
---
layout: default
title: "New Demo"
date: $(date +%Y-%m-%d)
---

# New Demo Description
[Demo content here]
EOF
```

### Adding Images
Place images in `assets/images/` and reference with relative paths:

```markdown
![Description]({{ "/assets/images/example.png" | relative_url }})
```

### Updating Content
Primary content is in `README.md`. Alternative styled version in `index.html`.

## Manual Validation

**CRITICAL**: Always perform these validation steps after making changes:

### 1. Build Verification
```bash
jekyll build
# Verify: Build completes in < 2 seconds with no errors
# Expected: Some Sass deprecation warnings (normal, ignore them)
```

### 2. Site Functionality Test
```bash
jekyll serve --host 0.0.0.0 --port 4000 &
SERVER_PID=$!
sleep 3

# Test main page loads
curl -f -s http://localhost:4000/Vision-Language-UAV-Following-Control/ | grep -q "Learning Object Following"
echo "✓ Main page loads correctly"

# Test resources are accessible
curl -f -s http://localhost:4000/Vision-Language-UAV-Following-Control/assets/main.css > /dev/null
echo "✓ CSS assets load correctly"

kill $SERVER_PID
```

### 3. Content Validation
Verify all sections display properly:
- Project title and authors
- Project overview and key contributions  
- Demo placeholders
- Resource links
- Footer information

### 4. Screenshot Validation
Always take a screenshot to verify visual rendering:
```bash
# Start server and navigate to site in browser
# Verify layout, styling, and content display correctly
# Check responsive design works on different screen sizes
```

## GitHub Pages Deployment

### Enable GitHub Pages
1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" branch and "/ (root)" folder
4. Save settings

Site will be available at: `https://sheepseb.github.io/Vision-Language-UAV-Following-Control/`

### Deployment Validation
After pushing changes, verify deployment:
```bash
# Wait 2-5 minutes for GitHub Pages build
curl -f https://sheepseb.github.io/Vision-Language-UAV-Following-Control/
echo "✓ Live site accessible"
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: "minima theme could not be found"
**Solution**: 
```bash
sudo gem install minima
jekyll build
```

**Issue**: Permission errors with gem install
**Solution**:
```bash
sudo gem install [package]
# Always use sudo for gem installations in this environment
```

**Issue**: Site loads without CSS/styling
**Solution**:
- Check baseurl is correct: `/Vision-Language-UAV-Following-Control/`
- Verify _config.yml baseurl setting
- Test with full URL including baseurl

**Issue**: Build warnings about Sass deprecation
**Solution**: 
- These are expected and safe to ignore
- Warnings do not prevent successful build or site function

## File Organization

### Key Files Location Reference
- Main content: `README.md`
- Site configuration: `_config.yml` 
- Alternative layout: `index.html`
- Demo content: `_demos/*.md`
- Media assets: `assets/{demos,images,videos}/`
- Documentation: `docs/*.md`

### Frequently Modified Files
When making typical changes, you will most often edit:
1. `README.md` - primary content updates
2. `assets/images/` - adding new images
3. `_demos/` - adding new demonstration content
4. `assets/videos/` - uploading video demonstrations

## Development Best Practices

### Before Making Changes
```bash
# Always start with a clean build
jekyll clean
jekyll build
jekyll serve --detach
# Test current state works before modifications
```

### After Making Changes
```bash
# Rebuild and test
jekyll build
jekyll serve --host 0.0.0.0 --port 4000 &
# Navigate to http://localhost:4000/Vision-Language-UAV-Following-Control/
# Verify changes display correctly
# Take screenshot for documentation
pkill -f jekyll
```

### Content Guidelines
- Keep academic tone and professional formatting
- Use relative URLs for internal links: `{{ "/path" | relative_url }}`
- Place media in appropriate assets subdirectories
- Update both README.md and index.html if making structural changes
- Test all links and media references after updates

## Common Tasks Quick Reference

```bash
# Full site rebuild
jekyll clean && jekyll build

# Start development server  
jekyll serve --host 0.0.0.0 --port 4000

# Add new demo
cp demo.mp4 assets/videos/
echo "---\nlayout: default\ntitle: Demo\n---\n# Demo" > _demos/demo.md

# Update main content
vim README.md

# Test build process
jekyll build && echo "Build successful"

# Validate site loads
curl -f http://localhost:4000/Vision-Language-UAV-Following-Control/ && echo "Site accessible"
```

Always ensure commands complete successfully before proceeding to the next step.