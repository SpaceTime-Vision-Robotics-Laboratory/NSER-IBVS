#!/bin/bash

# Deployment Verification Script
# Verifies that all deployment components are properly configured

echo "🔍 GitHub Pages Deployment Verification"
echo "======================================"

# Track verification status
VERIFICATION_PASSED=true

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1 exists"
    else
        echo "❌ $1 missing"
        VERIFICATION_PASSED=false
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/ directory exists"
    else
        echo "❌ $1/ directory missing"
        VERIFICATION_PASSED=false
    fi
}

echo ""
echo "📁 Checking deployment folder structure..."
check_dir "deployment"
check_dir "deployment/build"
check_file "deployment/README.md"
check_file "deployment/deploy.sh"
check_file "deployment/deploy-config.yml"
check_file "deployment/STATUS.md"

echo ""
echo "🔧 Checking GitHub Actions workflow..."
check_dir ".github"
check_dir ".github/workflows"
check_file ".github/workflows/github-pages.yml"

echo ""
echo "📋 Checking Jekyll configuration..."
check_file "_config.yml"
check_file "Gemfile"
check_file ".gitignore"

echo ""
echo "🌐 Checking site content..."
check_file "index.html"
check_file "README.md"
check_dir "assets"
check_dir "docs"

echo ""
echo "🔍 Validating YAML syntax..."
python3 -c "
import yaml
import sys

files = ['.github/workflows/github-pages.yml', '_config.yml', 'deployment/deploy-config.yml']
all_valid = True

for file in files:
    try:
        with open(file, 'r') as f:
            yaml.safe_load(f)
        print(f'✅ {file} - Valid YAML')
    except yaml.YAMLError as e:
        print(f'❌ {file} - Invalid YAML: {e}')
        all_valid = False
    except FileNotFoundError:
        print(f'❌ {file} - File not found')
        all_valid = False

sys.exit(0 if all_valid else 1)
"

if [ $? -ne 0 ]; then
    VERIFICATION_PASSED=false
fi

echo ""
echo "🔐 Checking file permissions..."
if [ -x "deployment/deploy.sh" ]; then
    echo "✅ deployment/deploy.sh is executable"
else
    echo "❌ deployment/deploy.sh is not executable"
    VERIFICATION_PASSED=false
fi

echo ""
echo "📊 Deployment Configuration Summary"
echo "=================================="
echo "Repository: SheepSeb/Vision-Language-UAV-Following-Control"
echo "Site URL: https://sheepseb.github.io/Vision-Language-UAV-Following-Control/"
echo "Build Tool: Jekyll"
echo "Theme: minima"
echo "Deployment Method: GitHub Actions"

echo ""
echo "🚀 Next Steps"
echo "============"
echo "1. Push changes to main branch to trigger automatic deployment"
echo "2. Or manually trigger deployment from GitHub Actions tab"
echo "3. Site will be live at the URL above once deployment completes"

echo ""
if [ "$VERIFICATION_PASSED" = true ]; then
    echo "🎉 Verification PASSED - Deployment setup is complete!"
    exit 0
else
    echo "❌ Verification FAILED - Please fix the issues above"
    exit 1
fi