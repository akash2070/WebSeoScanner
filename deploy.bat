@echo off
echo 🚀 WebSeoScanner Deployment Preparation
echo ========================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Initializing...
    git init
    git add .
    git commit -m "Initial commit"
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ Git remote 'origin' not found.
    echo Please add your GitHub repository as origin:
    echo git remote add origin https://github.com/akash2070/WebSeoScanner.git
    pause
    exit /b 1
)

REM Build the application
echo 🔨 Building application...
npm run build

if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
) else (
    echo ✅ Build successful
)

REM Check environment variables
echo 🔍 Checking environment variables...

if not exist ".env" (
    echo ⚠️  .env file not found. Creating from template...
    copy .env.example .env
    echo 📝 Please update .env with your actual values
)

REM Push to GitHub
echo 📤 Pushing to GitHub...
git add .
git commit -m "Prepare for deployment" 2>nul || echo No changes to commit
git push origin main 2>nul || git push origin master

echo.
echo ✅ Deployment preparation complete!
echo.
echo Next steps:
echo 1. Deploy backend to Railway:
echo    - Go to https://railway.app
echo    - Create new project from GitHub repo
echo    - Add environment variables from .env.example
echo.
echo 2. Deploy frontend to Vercel:
echo    - Go to https://vercel.com
echo    - Import GitHub repository
echo    - Set VITE_API_URL to your Railway URL
echo.
echo 3. Update CORS settings:
echo    - Add your Vercel URL to Railway's FRONTEND_URL env var
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions
pause
