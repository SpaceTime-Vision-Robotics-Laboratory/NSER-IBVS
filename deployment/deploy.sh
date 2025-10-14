#!/bin/bash

# GitHub Pages Deployment Script
# This script provides local testing and deployment preparation

set -e

echo "🚀 GitHub Pages Deployment Script"
echo "=================================="

# Configuration
SITE_DIR="_site"
DEPLOYMENT_DIR="deployment/build"

# Function to clean build artifacts
clean_build() {
    echo "🧹 Cleaning previous build artifacts..."
    rm -rf "$SITE_DIR"
    rm -rf "$DEPLOYMENT_DIR"
    mkdir -p "$DEPLOYMENT_DIR"
}

# Function to install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    if [ ! -f "Gemfile.lock" ]; then
        bundle install
    else
        bundle update
    fi
}

# Function to build the site
build_site() {
    echo "🔨 Building Jekyll site..."
    bundle exec jekyll build --destination "$SITE_DIR"
    
    # Copy build artifacts to deployment directory
    echo "📁 Copying build artifacts to deployment directory..."
    cp -r "$SITE_DIR"/* "$DEPLOYMENT_DIR/"
}

# Function to serve locally
serve_local() {
    echo "🌐 Starting local development server..."
    echo "Site will be available at: http://localhost:4000/Vision-Language-UAV-Following-Control/"
    bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload
}

# Function to validate site
validate_site() {
    echo "✅ Validating site build..."
    
    # Check if essential files exist
    if [ ! -f "$SITE_DIR/index.html" ]; then
        echo "❌ Error: index.html not found in build output"
        exit 1
    fi
    
    # Check for broken internal links (basic check)
    if command -v htmlproofer >/dev/null 2>&1; then
        echo "🔍 Checking for broken links..."
        htmlproofer "$SITE_DIR" --disable-external --check-html
    else
        echo "⚠️  htmlproofer not installed - skipping link validation"
    fi
    
    echo "✅ Site validation completed"
}

# Function to show deployment status
show_status() {
    echo "📊 Deployment Status"
    echo "==================="
    echo "Site Directory: $SITE_DIR"
    echo "Deployment Directory: $DEPLOYMENT_DIR"
    
    if [ -d "$SITE_DIR" ]; then
        echo "Build Status: ✅ Built"
        echo "Build Size: $(du -sh $SITE_DIR | cut -f1)"
        echo "Files: $(find $SITE_DIR -type f | wc -l) files"
    else
        echo "Build Status: ❌ Not built"
    fi
}

# Main script logic
case "${1:-help}" in
    "clean")
        clean_build
        ;;
    "install")
        install_deps
        ;;
    "build")
        clean_build
        install_deps
        build_site
        validate_site
        ;;
    "serve")
        install_deps
        serve_local
        ;;
    "validate")
        validate_site
        ;;
    "status")
        show_status
        ;;
    "deploy-prep")
        clean_build
        install_deps
        build_site
        validate_site
        echo "🎉 Site ready for deployment!"
        ;;
    "help"|*)
        echo "Usage: $0 {clean|install|build|serve|validate|status|deploy-prep}"
        echo ""
        echo "Commands:"
        echo "  clean      - Clean build artifacts"
        echo "  install    - Install Jekyll dependencies"
        echo "  build      - Build the Jekyll site"
        echo "  serve      - Start local development server"
        echo "  validate   - Validate the built site"
        echo "  status     - Show deployment status"
        echo "  deploy-prep - Full build and validation for deployment"
        echo "  help       - Show this help message"
        ;;
esac