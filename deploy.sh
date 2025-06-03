#!/bin/bash

# Deployment script for WebSeoScanner
# This script helps prepare the application for deployment

echo "🚀 WebSeoScanner Deployment Preparation"
echo "========================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Git remote 'origin' not found."
    echo "Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/akash2070/WebSeoScanner.git"
    exit 1
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check environment variables
echo "🔍 Checking environment variables..."

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please update .env with your actual values"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Prepare for deployment" || echo "No changes to commit"
git push origin main || git push origin master

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub repo"
echo "   - Add environment variables from .env.example"
echo ""
echo "2. Deploy frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import GitHub repository"
echo "   - Set VITE_API_URL to your Railway URL"
echo ""
echo "3. Update CORS settings:"
echo "   - Add your Vercel URL to Railway's FRONTEND_URL env var"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
