# Deployment Checklist ✅

## Pre-Deployment
- [ ] Code is committed and pushed to GitHub
- [ ] Environment variables are configured
- [ ] Application builds successfully (`npm run build`)
- [ ] All tests pass (if any)

## Railway Backend Deployment
- [ ] Railway account created
- [ ] New project created from GitHub repo
- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `PAGESPEED_API_KEY=your_api_key`
  - [ ] `FRONTEND_URL=https://your-vercel-app.vercel.app`
- [ ] PostgreSQL database added
- [ ] `DATABASE_URL` automatically generated
- [ ] Deployment successful
- [ ] Health check endpoint working (`/api/health`)
- [ ] Railway URL noted for frontend configuration

## Vercel Frontend Deployment
- [ ] Vercel account created
- [ ] New project imported from GitHub
- [ ] Build settings configured:
  - [ ] Framework: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist/public`
- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `VITE_API_URL=https://your-railway-app.railway.app`
- [ ] Deployment successful
- [ ] Frontend loads correctly
- [ ] Vercel URL noted for CORS configuration

## Post-Deployment Configuration
- [ ] Update Railway `FRONTEND_URL` with actual Vercel URL
- [ ] Redeploy Railway backend
- [ ] Test CORS - frontend can communicate with backend
- [ ] Test all API endpoints
- [ ] Test SEO audit functionality
- [ ] Verify PageSpeed API integration works

## Testing
- [ ] Frontend loads without errors
- [ ] Backend health check returns 200
- [ ] SEO audit completes successfully
- [ ] All features work as expected
- [ ] No CORS errors in browser console
- [ ] Database connections working

## Optional Enhancements
- [ ] Custom domain setup (Vercel)
- [ ] SSL certificate configured
- [ ] Monitoring setup (Railway)
- [ ] Error tracking (Sentry, etc.)
- [ ] Analytics integration
- [ ] Performance monitoring

## URLs to Save
- **Frontend URL**: `https://your-app.vercel.app`
- **Backend URL**: `https://your-app.railway.app`
- **GitHub Repo**: `https://github.com/akash2070/WebSeoScanner`

## Troubleshooting
If you encounter issues, check:
1. Browser console for errors
2. Railway deployment logs
3. Vercel function logs
4. Environment variables are correctly set
5. CORS configuration matches URLs

## Support
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- Project Issues: https://github.com/akash2070/WebSeoScanner/issues
