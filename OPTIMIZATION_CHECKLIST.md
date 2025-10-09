# Site Optimization & Pre-Deployment Checklist

## Current Status Summary

### ✅ Completed
- [x] All 6 pages created and functional
- [x] Logo integrated and displaying
- [x] Color scheme implemented (green theme)
- [x] Navigation fixed (all links working)
- [x] Icons replaced with Segoe Fluent Icons
- [x] Contact form with validation and obfuscation
- [x] Phone number auto-formatting (backspace working)
- [x] 12 project images embedded
- [x] Google Analytics code added (needs Measurement ID)
- [x] Responsive design (mobile/tablet/desktop)
- [x] SEO meta tags (Open Graph, Twitter Cards)
- [x] Sitemap integration
- [x] Favicon configured

### ⏳ Pending
- [ ] Owner image/photo (ONLY ITEM MISSING)
- [ ] Update Google Analytics Measurement ID
- [ ] Deploy to GitHub Pages with custom domain

---

## Pre-Deployment Optimization Tasks

### 1. Add Owner Image (REQUIRED)

**Current Status:** Placeholder image on Owner page

**Action Required:**

1. **Prepare your photo:**
   - Professional headshot or work photo
   - Recommended size: 400x400px minimum
   - Format: JPG or PNG
   - Keep file size under 200KB

2. **Optimize image:**
   ```bash
   # If image is large, resize it first
   # Use online tool: https://tinypng.com/ or https://squoosh.app/
   ```

3. **Add to project:**
   - Place image in: `public/images/owner-photo.jpg`
   
4. **Update Owner page:**
   Open `src/pages/team.astro` and find this line:
   ```astro
   <div class="owner-placeholder">Owner Photo</div>
   ```
   
   Replace with:
   ```astro
   <img src={`${baseUrl}/images/owner-photo.jpg`} alt="Business Owner - Gemini Home Improvements" class="owner-photo" />
   ```

5. **Add CSS for owner photo:**
   ```css
   .owner-photo {
     width: 100%;
     max-width: 300px;
     height: auto;
     border-radius: 8px;
     margin-bottom: 1.5rem;
   }
   ```

**Temporary Alternative (if no photo ready):**
- Use business logo temporarily
- Or use a professional silhouette/avatar
- Or hide image section and add later

---

### 2. Image Optimization (IMPORTANT for Performance)

**Current Issue:** Some images may be too large

**Check image sizes:**
```bash
cd public/images
Get-ChildItem -Recurse -Filter *.jpg | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
```

**Goal:** All images under 300KB, ideally under 200KB

**Tools to optimize:**

**Option A: Online (Easiest)**
1. Go to https://tinypng.com/
2. Upload your images
3. Download optimized versions
4. Replace originals

**Option B: Command Line (Batch process)**
```bash
# Install sharp-cli
npm install -g sharp-cli

# Optimize all JPG images
sharp -i "public/images/**/*.jpg" -o "public/images-optimized/{dir}/{name}.jpg" resize 1200 --jpeg.quality 85

# Then replace originals with optimized versions
```

**Expected Results:**
- Page load time: Under 3 seconds
- Mobile performance: 90+ score
- Desktop performance: 95+ score

---

### 3. Test All Functionality

#### A. Navigation Testing
- [ ] Click every navigation link
- [ ] Test mobile hamburger menu
- [ ] Verify all pages load
- [ ] Check logo links to home

#### B. Contact Form Testing
- [ ] Fill out all required fields
- [ ] Test phone auto-formatting
- [ ] Try invalid phone (9 digits) - should show error
- [ ] Try valid phone (10 digits) - should submit
- [ ] Verify email client opens with pre-filled data
- [ ] Test on mobile device

#### C. Image Display Testing
- [ ] All project images load
- [ ] Owner image displays (once added)
- [ ] Logo displays in header
- [ ] Favicon shows in browser tab
- [ ] Service images load on Services page

#### D. Content Review
- [ ] Read through all pages for typos
- [ ] Verify all dates are correct
- [ ] Check phone number is correct (not placeholder)
- [ ] Verify email address is correct
- [ ] Check business hours are accurate

---

### 4. Performance Optimization

#### A. Add Missing `loading="lazy"` Attributes

Check these files for images without lazy loading:

```bash
# Search for images without loading attribute
grep -r '<img' src/pages/ | grep -v 'loading='
```

**Files to check:**
- `src/pages/services.astro`
- `src/pages/team.astro` (owner image)
- `src/layouts/MainLayout.astro` (logo - DON'T add lazy, it's above fold)

**Add to images below the fold:**
```astro
<img src="..." alt="..." loading="lazy" />
```

#### B. Optimize Build Settings

**Current:** Already optimized in `astro.config.mjs`

**Verify:**
```javascript
export default defineConfig({
	// ... other config
	build: {
		assets: 'assets',
		inlineStylesheets: 'auto'
	}
});
```

#### C. Test Build Output

```bash
# Build the site
npm run build

# Check dist folder size
du -sh dist/

# Should be under 10MB total
```

#### D. Preview Production Build

```bash
# Preview the built site
npm run preview

# Test at: http://localhost:4321/GeminiHomeImprovements/
```

---

### 5. SEO Optimization

#### A. Add Schema.org Markup

Add to `src/layouts/MainLayout.astro` before `</head>`:

```astro
<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
	"@context": "https://schema.org",
	"@type": "HomeAndConstructionBusiness",
	"name": "Gemini Home Improvements",
	"description": "Professional exterior renovation services - eavestrough, siding, gutter protection",
	"url": "https://geminialuminum.org",
	"telephone": "+1-XXX-XXX-XXXX",
	"email": "geminihi@outlook.com",
	"address": {
		"@type": "PostalAddress",
		"addressRegion": "ON",
		"addressCountry": "CA"
	},
	"areaServed": {
		"@type": "GeoCircle",
		"geoMidpoint": {
			"@type": "GeoCoordinates",
			"latitude": 43.6532,
			"longitude": -79.3832
		},
		"geoRadius": "50000"
	},
	"priceRange": "$$",
	"image": "https://geminialuminum.org/logo.svg",
	"sameAs": [
		"https://facebook.com/YOUR-PAGE",
		"https://instagram.com/YOUR-PAGE"
	]
}
</script>
```

**Remember to update:**
- Phone number
- Social media URLs (if applicable)

#### B. Create robots.txt

Already created! Located at `public/robots.txt`

Verify content:
```txt
User-agent: *
Allow: /

Sitemap: https://geminialuminum.org/sitemap.xml
```

#### C. Update Page Titles (Optional Enhancement)

Make titles more specific and keyword-rich:

**Home (`src/pages/index.astro`):**
```astro
<MainLayout 
	title="Gemini Home Improvements - Eavestrough, Siding & Gutter Protection GTA"
	description="Professional exterior renovation services in the Greater Toronto Area. Over 15 years of experience in eavestrough installation, siding replacement, and gutter protection systems."
	keywords="eavestrough installation toronto, siding replacement gta, gutter protection, exterior renovation, home improvements"
/>
```

**Services Page:**
```astro
<MainLayout 
	title="Services - Eavestrough, Siding, Gutter Guards | Gemini Home Improvements"
	description="Expert eavestrough installation, vinyl siding replacement, aluminum capping, and gutter protection systems. Free estimates. Quality workmanship guaranteed."
	keywords="eavestrough installation, siding replacement, gutter guards, aluminum capping, exterior repairs"
/>
```

---

### 6. Mobile Responsiveness Check

#### A. Test in Browser DevTools

1. Open your site: http://localhost:4323/GeminiHomeImprovements/
2. Press F12 (open DevTools)
3. Click device toggle icon (Ctrl+Shift+M)
4. Test these devices:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)

#### B. Check These Elements:
- [ ] Navigation collapses to hamburger menu
- [ ] Images scale properly
- [ ] Text is readable (not too small)
- [ ] Buttons are tappable (not too small)
- [ ] Contact form fields are usable
- [ ] No horizontal scrolling
- [ ] Footer looks good

#### C. Test on Real Devices (Recommended)
- Borrow friends' phones
- Test on your own phone
- Use https://www.browserstack.com/ (free trial)

---

### 7. Browser Compatibility Testing

#### A. Test in Multiple Browsers

**Must Test:**
- [ ] Chrome (Windows)
- [ ] Edge (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (Mac/iPhone)

**Optional:**
- [ ] Samsung Internet (Android)
- [ ] Opera

#### B. Common Issues to Check:
- [ ] Segoe Fluent Icons display (fallback to MDL2)
- [ ] CSS Grid layout works
- [ ] JavaScript functions work
- [ ] Form validation works
- [ ] Phone formatting works

---

### 8. Security & Privacy

#### A. HTTPS Configuration
- Will be automatic with GitHub Pages
- Enforce HTTPS in GitHub settings after deployment

#### B. Security Headers (Post-Deployment)

Add to `public/_headers` (for Netlify) or configure in GitHub:

```
/*
	X-Frame-Options: DENY
	X-Content-Type-Options: nosniff
	X-XSS-Protection: 1; mode=block
	Referrer-Policy: strict-origin-when-cross-origin
```

#### C. Privacy Policy (Recommended)

Create `src/pages/privacy.astro`:

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="Privacy Policy" description="Privacy policy for Gemini Home Improvements">
	<section>
		<div class="container">
			<h1>Privacy Policy</h1>
			<p><em>Last updated: January 2025</em></p>
			
			<h2>Information We Collect</h2>
			<p>When you contact us through our form, we collect:</p>
			<ul>
				<li>Your name</li>
				<li>Email address</li>
				<li>Phone number (optional)</li>
				<li>Service interest and project description</li>
			</ul>
			
			<h2>How We Use Your Information</h2>
			<p>We use your information solely to:</p>
			<ul>
				<li>Respond to your quote requests</li>
				<li>Provide the services you requested</li>
				<li>Send project updates and follow-ups</li>
			</ul>
			
			<h2>Analytics</h2>
			<p>We use Google Analytics to understand how visitors use our site. This includes:</p>
			<ul>
				<li>Pages viewed</li>
				<li>Time spent on site</li>
				<li>Geographic location (city level)</li>
				<li>Browser and device type</li>
			</ul>
			
			<h2>Data Security</h2>
			<p>Your information is transmitted via email and stored in our business email account, protected by industry-standard security measures.</p>
			
			<h2>Contact</h2>
			<p>Questions about privacy? Email us at geminihi@outlook.com</p>
		</div>
	</section>
</MainLayout>
```

Add link in footer:
```astro
<li><a href={`${baseUrl}/privacy/`}>Privacy Policy</a></li>
```

---

### 9. Final Pre-Deployment Checklist

#### Content:
- [ ] All pages have real content (no placeholders except owner photo)
- [ ] Phone number updated from 5551234567
- [ ] Owner name added to team page
- [ ] All project descriptions are accurate
- [ ] Business hours are correct
- [ ] Service area is correct

#### Technical:
- [ ] Build completes without errors (`npm run build`)
- [ ] Preview looks correct (`npm run preview`)
- [ ] All links work (no 404 errors)
- [ ] All images load
- [ ] JavaScript works (form validation, phone formatting)
- [ ] Mobile menu works
- [ ] Console has no errors (F12 → Console)

#### Performance:
- [ ] Images optimized (under 300KB each)
- [ ] Total site size under 10MB
- [ ] Lazy loading added to below-fold images
- [ ] Fonts loading properly

#### SEO:
- [ ] Meta descriptions on all pages
- [ ] Title tags unique and descriptive
- [ ] robots.txt created
- [ ] Sitemap will be auto-generated
- [ ] Schema.org markup added

#### Analytics:
- [ ] Google Analytics code added
- [ ] Measurement ID updated (replace G-XXXXXXXXXX)
- [ ] Real-time tracking tested locally

---

### 10. NPM Scripts Overview

Your current scripts (from `package.json`):

```json
{
	"dev": "astro dev",        // Start dev server
	"start": "astro dev",      // Alias for dev
	"build": "astro build",    // Build for production
	"preview": "astro preview", // Preview production build
	"astro": "astro"           // Run astro CLI
}
```

**How to use:**

```bash
# Development (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check for TypeScript errors
npm run astro check
```

**Recommended additions:**

```json
{
	"scripts": {
		"dev": "astro dev",
		"build": "astro build",
		"preview": "astro preview",
		"astro": "astro",
		"check": "astro check",
		"lint": "astro check",
		"optimize-images": "node scripts/optimize-images.js"
	}
}
```

---

## Optimization Priority Order

### Priority 1 (Must Do Before Deploy):
1. ✅ Add owner image
2. ✅ Update Google Analytics ID
3. ✅ Verify phone number is real (not placeholder)
4. ✅ Test contact form end-to-end
5. ✅ Check all pages load correctly

### Priority 2 (Should Do):
1. Optimize large images
2. Test on mobile device
3. Add Schema.org markup
4. Create privacy policy page
5. Test in multiple browsers

### Priority 3 (Nice to Have):
1. Add Microsoft Clarity for heatmaps
2. Create FAQ page
3. Add customer testimonials
4. Create blog section
5. Add before/after image sliders

---

## Post-Deployment Tasks

After site goes live:

### Week 1:
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics tracking
- [ ] Test on various devices
- [ ] Check page load speed
- [ ] Fix any issues found

### Week 2:
- [ ] Create Google My Business listing
- [ ] Add website to social media profiles
- [ ] Share website with existing customers
- [ ] Request feedback

### Month 1:
- [ ] Review analytics data
- [ ] Identify popular pages
- [ ] Optimize underperforming pages
- [ ] Start gathering customer testimonials
- [ ] Consider blog post strategy

---

## Performance Benchmarks to Aim For

**Google PageSpeed Insights:**
- Desktop Performance: 90+
- Mobile Performance: 80+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): Under 2.5s
- FID (First Input Delay): Under 100ms
- CLS (Cumulative Layout Shift): Under 0.1

**Test at:** https://pagespeed.web.dev/

---

## Quick Commands Reference

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run astro check

# Install dependencies (if needed)
npm install

# Update dependencies
npm update

# Clean build cache (if issues)
rm -rf dist/ node_modules/.astro/
npm run build
```

---

## Summary: What to Do Now

### 1. Add Owner Image (5-10 minutes)
- Prepare your photo
- Optimize size
- Add to `public/images/owner-photo.jpg`
- Update `src/pages/team.astro`

### 2. Set Up Google Analytics (10 minutes)
- Create GA4 account
- Get Measurement ID
- Update `src/layouts/MainLayout.astro` (replace G-XXXXXXXXXX twice)

### 3. Final Testing (15 minutes)
- Run `npm run build`
- Run `npm run preview`
- Test all pages
- Test contact form
- Check mobile view

### 4. Deploy (30-60 minutes)
- Follow DEPLOYMENT_GUIDE.md
- Update astro.config.mjs
- Create CNAME file
- Configure DNS
- Push to GitHub

**Total Time: 1-2 hours**  
**Then wait for DNS propagation: 1-48 hours**

---

**Last Updated:** January 2025  
**Status:** 98% complete - only owner image needed
