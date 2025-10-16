# Bukadita Frontend - Vercel Deployment Guide

## 📋 Prerequisites

- Vercel Account
- Backend API deployed (see backend DEPLOYMENT.md)
- Supabase Project configured

## 🚀 Deployment Steps

### 1. Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

#### Required Variables:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **Important**: All environment variables starting with `NEXT_PUBLIC_` are exposed to the browser.

### 2. Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub/GitLab repository
4. Select **"fe-bukadita-web-posyandu"** folder as root directory
5. **Framework Preset**: Next.js (should auto-detect)
6. **Build Command**: `npm run build`
7. **Output Directory**: `.next`
8. **Install Command**: `npm install`
9. Add all environment variables
10. Click **"Deploy"**

### 3. Deploy via CLI

```bash
cd fe-bukadita-web-posyandu
vercel
# Follow prompts
# Add environment variables when prompted
```

### 4. Update Backend CORS

After deployment, update backend environment variable:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

Redeploy backend to apply CORS changes.

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `posyandu.yourdomain.com`)
3. Configure DNS:
   - Type: CNAME
   - Name: posyandu (or @)
   - Value: cname.vercel-dns.com

## 🔒 Security Checklist

- [x] Environment variables not committed to Git
- [x] API calls use HTTPS
- [x] Authentication tokens in httpOnly cookies (if applicable)
- [x] CSP headers configured (Next.js default)
- [x] XSS protection enabled
- [x] CORS properly configured on backend
- [x] Image optimization via Next.js
- [x] PWA manifest for secure contexts

## 📱 PWA Configuration

The app includes PWA support:

- Service worker for offline support
- Manifest.json for installability
- Icons for all platforms
- Works on mobile and desktop

After deployment, users can install the app:

- **Chrome**: Three dots → Install app
- **Safari iOS**: Share → Add to Home Screen

## 🧪 Testing Deployment

After deployment, verify:

1. **Homepage loads**: `https://your-frontend.vercel.app`
2. **Login works**: Check authentication flow
3. **API connection**: Test any API-dependent features
4. **Images load**: Check Supabase Storage images
5. **PWA install**: Try installing app
6. **Mobile responsive**: Test on different devices

## 🐛 Troubleshooting

### Build Errors

```bash
# Check build locally first
npm run build

# If it works locally but fails on Vercel:
# - Check Node.js version in package.json
# - Verify all dependencies in package.json
# - Check for missing environment variables
```

### API Connection Issues

- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check backend CORS configuration
- Test API endpoint directly in browser
- Check browser console for CORS errors

### Image Loading Issues

- Verify `next.config.ts` has Supabase domain in `remotePatterns`
- Check Supabase Storage bucket is public or using signed URLs
- Test image URL directly in browser

### Environment Variables Not Working

- Variables must start with `NEXT_PUBLIC_` to be available in browser
- Redeploy after adding/changing variables
- Check variable names (case-sensitive)
- Clear browser cache

### PWA Not Installing

- Ensure site is served over HTTPS
- Check manifest.json is accessible
- Verify service worker is registered
- Test in incognito/private mode

## 📊 Performance Optimization

### Image Optimization

- Next.js automatically optimizes images
- Use Next/Image component for all images
- Lazy loading enabled by default

### Code Splitting

- Automatic with Next.js
- Dynamic imports for large components
- Route-based splitting

### Caching

- Static assets cached via Vercel CDN
- API responses can use SWR for client-side caching
- Service worker caches for offline support

## 🔄 Auto-Deploy

Vercel automatically deploys on:

- Push to `main` branch → Production
- Push to other branches → Preview
- Pull requests → Preview with unique URL

### Deploy Settings

Configure in Vercel Dashboard → Settings → Git:

- Production branch: `main`
- Preview branches: All branches
- Build & development settings
- Deploy hooks (for manual triggers)

## 📈 Analytics & Monitoring

### Vercel Analytics (Built-in)

Enable in Vercel Dashboard → Analytics:

- Page views
- Performance metrics (Core Web Vitals)
- Visitor insights

### Custom Analytics (Optional)

Add to `.env.production`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

## 💰 Pricing Notes

Vercel Free Tier (Hobby):

- 100GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Perfect for personal projects

Vercel Pro (Recommended for production):

- $20/month per user
- 1TB bandwidth
- Better performance
- Team collaboration
- Advanced analytics
- Priority support

## 🌍 Multiple Environments

### Setup Staging Environment

1. Create new Vercel project for staging
2. Connect to `staging` branch
3. Use different environment variables:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://staging-backend.vercel.app
   ```

### Branch Strategy

```
main → Production (posyandu.yourdomain.com)
staging → Staging (staging.posyandu.yourdomain.com)
develop → Development previews
feature/* → Feature previews
```

## 🔐 Environment Variable Security

### What to NEVER commit:

- ❌ API keys
- ❌ Database credentials
- ❌ Service role keys
- ❌ Private keys

### What's safe to commit:

- ✅ Public Supabase anon key (with RLS enabled)
- ✅ Public API URLs
- ✅ Analytics IDs

### Best Practices:

1. Use `.env.example` for documentation
2. Add `.env*` to `.gitignore`
3. Rotate keys if accidentally exposed
4. Use Vercel's encrypted environment variables

## 🆘 Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js Discord](https://discord.gg/nextjs)

## 📞 Common Commands

```bash
# Local development
npm run dev

# Build for production (test locally)
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

## ✅ Pre-Deployment Checklist

- [ ] All environment variables documented in `.env.example`
- [ ] Backend API deployed and tested
- [ ] CORS configured on backend
- [ ] Local build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] All features tested locally
- [ ] Image loading works
- [ ] Authentication works
- [ ] API calls work
- [ ] Mobile responsive
- [ ] PWA manifest correct
- [ ] Icons and favicons in place
- [ ] Meta tags for SEO
- [ ] Error boundaries in place
- [ ] Loading states implemented
