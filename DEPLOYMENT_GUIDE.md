# GitHub Pages Deployment Guide - Custom Domain

## Prerequisites Checklist
- ✅ Website fully functional locally
- ✅ All pages working correctly
- ✅ Images displaying properly
- ✅ Contact form tested
- ✅ Phone number updated (if real number added)
- ✅ Owner image added (pending)
- ✅ Custom domain purchased

---

## Step 1: Update Configuration for Custom Domain

### A. Update `astro.config.mjs`

**Current Configuration:**
```javascript
export default defineConfig({
	site: 'https://harisvidimlic19.github.io',
	base: '/GeminiHomeImprovements',
	integrations: [sitemap()],
});
```

**New Configuration for Custom Domain:**
```javascript
export default defineConfig({
	site: 'https://geminialuminum.org', // Your custom domain
	base: '/', // Change from /GeminiHomeImprovements to /
	integrations: [sitemap()],
	build: {
		assets: 'assets'
	},
	image: {
		domains: [],
		remotePatterns: []
	}
});
```

### B. Create CNAME File

**Create:** `public/CNAME` (no file extension)

**Content:**
```
geminialuminum.org
```

This tells GitHub Pages to use your custom domain.

### C. Update All baseUrl References (Optional - if issues occur)

Since we're changing from `/GeminiHomeImprovements` to `/`, all your existing code should work fine because `import.meta.env.BASE_URL` will automatically become `/`.

**No code changes needed** - Astro handles this automatically!

---

## Step 2: Configure Your Domain DNS

You need to configure DNS records at your domain registrar (wherever you bought geminialuminum.org).

### A. Add A Records for GitHub Pages

Add **4 A records** pointing to GitHub's IP addresses:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### B. Add CNAME Record for www Subdomain

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | harisvidimlic19.github.io | 3600 |

### Common Domain Registrars:

**GoDaddy:**
1. Go to My Products → Domain Manager
2. Click DNS next to your domain
3. Add Records → Select type A or CNAME
4. Enter values above

**Namecheap:**
1. Domain List → Manage → Advanced DNS
2. Add New Record
3. Enter values above

**Google Domains:**
1. My Domains → Manage → DNS
2. Custom resource records
3. Enter values above

**Cloudflare:**
1. DNS → Add record
2. Enter values above
3. **Important:** Turn off proxy (gray cloud) for initial setup

---

## Step 3: Create GitHub Actions Workflow

This automates deployment every time you push code.

**Create:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Step 4: GitHub Repository Settings

### A. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/harisvidimlic19/GeminiHomeImprovements`
2. Click **Settings** tab
3. Scroll to **Pages** (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions** (not "Deploy from a branch")
5. Click **Save**

### B. Configure Custom Domain in GitHub

1. Still in Settings → Pages
2. Under **Custom domain**, enter: `geminialuminum.org`
3. Click **Save**
4. Check **Enforce HTTPS** (may need to wait for DNS propagation)

---

## Step 5: Deploy Your Site

### Method A: Using Git Commands (Recommended)

```bash
# 1. Make sure all changes are committed
git status

# 2. If you have uncommitted changes, add them
git add .
git commit -m "Prepare for deployment with custom domain"

# 3. Push to GitHub
git push origin main

# 4. GitHub Actions will automatically build and deploy
```

### Method B: Using VS Code

1. Open Source Control panel (Ctrl+Shift+G)
2. Stage all changes (+ icon)
3. Enter commit message: "Prepare for deployment with custom domain"
4. Click ✓ Commit
5. Click "Sync Changes" or "Push"

---

## Step 6: Verify Deployment

### A. Check GitHub Actions

1. Go to your repository on GitHub
2. Click **Actions** tab
3. You should see a workflow running
4. Wait for it to complete (green checkmark)

### B. Check DNS Propagation

Visit: https://www.whatsmydns.net/
- Enter: `geminialuminum.org`
- Type: `A`
- Check that it shows GitHub's IP addresses globally

**Note:** DNS propagation can take 1-48 hours (usually 1-2 hours)

### C. Test Your Site

1. Wait 5-10 minutes after deployment completes
2. Visit: `https://geminialuminum.org`
3. Test all pages:
   - Home
   - Services
   - Projects
   - Owner
   - About
   - Contact (submit test form)

---

## Step 7: Force HTTPS

Once DNS propagates and site loads:

1. Go to GitHub Settings → Pages
2. Check **Enforce HTTPS**
3. This ensures all traffic uses secure connection

---

## Troubleshooting

### Issue: "404 - There isn't a GitHub Pages site here"

**Solutions:**
- Wait longer (DNS propagation)
- Check CNAME file exists in `public/CNAME`
- Verify custom domain in GitHub settings
- Check GitHub Actions completed successfully

### Issue: "This site can't be reached"

**Solutions:**
- Verify A records are correct at your registrar
- Wait for DNS propagation (up to 48 hours)
- Try accessing via `www.geminialuminum.org`
- Clear browser cache

### Issue: Pages load but images/links broken

**Solutions:**
- Verify `base: '/'` in `astro.config.mjs`
- Check `site: 'https://geminialuminum.org'` is correct
- Rebuild: `npm run build`
- Push changes again

### Issue: "Mixed Content" warnings

**Solutions:**
- Enforce HTTPS in GitHub settings
- Check all resources use `https://` or relative paths

### Issue: Styles not loading

**Solutions:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for 404 errors
- Verify build completed successfully
- Check assets folder in dist after build

---

## Alternative: Deploy to Netlify (Recommended Alternative)

If GitHub Pages gives you issues, Netlify is often easier:

### Advantages:
- Automatic HTTPS
- Faster builds
- Better analytics
- Form handling built-in
- No base path issues
- Instant deploys

### Steps:
1. Sign up at https://netlify.com (free)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add custom domain in Netlify settings
5. Update DNS to Netlify's nameservers (they provide them)

**Netlify Configuration for Custom Domain:**

Update `astro.config.mjs`:
```javascript
export default defineConfig({
	site: 'https://geminialuminum.org',
	base: '/',
	integrations: [sitemap()],
});
```

No CNAME file needed - Netlify handles it automatically.

---

## Post-Deployment Checklist

After site is live:

- [ ] Test all pages load correctly
- [ ] Test all navigation links work
- [ ] Test contact form submission
- [ ] Test mobile responsiveness
- [ ] Check browser console for errors
- [ ] Verify images display properly
- [ ] Test email/phone obfuscation displays
- [ ] Verify favicon shows in browser tab
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different devices (phone, tablet, desktop)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (see ANALYTICS_SETUP.md)
- [ ] Update Google My Business with website URL
- [ ] Update social media profiles with website URL
- [ ] Test page load speed (Google PageSpeed Insights)

---

## Maintenance & Updates

### To Update Your Site:

```bash
# 1. Make changes locally
# 2. Test in dev environment
npm run dev

# 3. Build locally to verify
npm run build

# 4. Commit and push
git add .
git commit -m "Update [description of changes]"
git push origin main

# 5. GitHub Actions deploys automatically
```

### Monitoring:

- Check GitHub Actions regularly for failed builds
- Monitor Google Analytics for traffic
- Check Google Search Console for SEO issues
- Monitor site uptime (free tools: UptimeRobot, StatusCake)

---

## Important Files Summary

**Before Deployment:**
- `astro.config.mjs` - Update site URL and base path
- `public/CNAME` - Create with your domain name
- `.github/workflows/deploy.yml` - Create for auto-deployment

**DNS Records:**
- 4 A records pointing to GitHub IPs
- 1 CNAME record for www subdomain

**Commit Message:**
```
Prepare for deployment with custom domain geminialuminum.org
```

---

## Timeline Expectations

| Step | Time Required |
|------|---------------|
| Update config files | 5 minutes |
| Configure DNS | 10 minutes |
| Push to GitHub | 2 minutes |
| GitHub Actions build | 2-5 minutes |
| DNS propagation | 1-48 hours |
| **Total (typical)** | **1-2 hours** |

---

## Support Resources

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Astro Deployment Guide:** https://docs.astro.build/en/guides/deploy/github/
- **DNS Checker:** https://www.whatsmydns.net/
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html

---

**Last Updated:** January 2025  
**Status:** Ready for deployment after owner image added
