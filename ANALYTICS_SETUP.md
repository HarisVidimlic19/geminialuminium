# Google Analytics Setup Guide

## Overview

**Google Analytics 4 (GA4) is 100% FREE** with no hidden costs.

### What You Get for Free:
- ✅ Unlimited pageviews tracking
- ✅ Real-time visitor data
- ✅ User demographics and interests
- ✅ Traffic sources and campaigns
- ✅ Conversion tracking
- ✅ Mobile app tracking
- ✅ Custom reports and dashboards
- ✅ Data retention (2-14 months)
- ✅ Integration with Google tools

### Paid Version (GA 360):
- Costs $150,000+/year
- **You don't need this** - it's for enterprise companies with millions of visitors

---

## Step 1: Create Google Analytics Account

### A. Sign Up

1. Go to https://analytics.google.com/
2. Click **Start measuring** or **Sign in** (use your Google account)
3. Click **Admin** (gear icon in bottom left)
4. Click **Create Account**

### B. Account Setup

**Account Name:** Gemini Home Improvements  
**Data Sharing Settings:** (check all boxes for better insights)
- ☑ Google products & services
- ☑ Benchmarking
- ☑ Technical support
- ☑ Account specialists

Click **Next**

### C. Property Setup

**Property Name:** Gemini Home Improvements Website  
**Reporting Time Zone:** (GMT-05:00) Eastern Time  
**Currency:** Canadian Dollar (CAD)

Click **Next**

### D. Business Information

**Industry Category:** Home Improvement & Construction  
**Business Size:** Small (1-10 employees)

**Business Objectives:** (select all that apply)
- ☑ Get baseline reports
- ☑ Measure customer engagement
- ☑ Examine user behavior

Click **Create**

### E. Accept Terms

- Accept Google Analytics Terms of Service
- Accept Data Processing Terms
- Click **I Accept**

---

## Step 2: Set Up Data Stream

### A. Choose Platform

After creating property, you'll see "Choose a platform":

Click **Web**

### B. Data Stream Details

**Website URL:** `https://geminialuminum.org`  
**Stream Name:** Gemini Home Improvements Main Site

☑ **Enable Enhanced Measurement** (recommended - tracks scrolls, downloads, video plays)

Click **Create stream**

### C. Get Your Measurement ID

You'll see a screen with your **Measurement ID**:

```
G-XXXXXXXXXX
```

**Copy this ID** - you'll need it in Step 3.

---

## Step 3: Add Google Analytics to Your Website

### Option A: Already Done! (Update ID)

I've already added the code to `src/layouts/MainLayout.astro`. You just need to replace the placeholder.

**File:** `src/layouts/MainLayout.astro`

Find this code (around line 38-45):

```astro
<!-- Google Analytics 4 - FREE -->
<!-- Replace G-XXXXXXXXXX with your actual Google Analytics Measurement ID -->
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Replace BOTH instances** of `G-XXXXXXXXXX` with your actual Measurement ID:

```astro
<!-- Google Analytics 4 - FREE -->
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script is:inline>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'G-ABC123XYZ');
</script>
```

### Option B: Manual Setup (if not already added)

If the code isn't there, add this to `<head>` section in `MainLayout.astro` before `</head>`:

```astro
<!-- Google Analytics 4 -->
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=YOUR-MEASUREMENT-ID"></script>
<script is:inline>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'YOUR-MEASUREMENT-ID');
</script>
```

---

## Step 4: Test Google Analytics

### A. Test Locally

1. **Update the code** with your Measurement ID
2. **Restart dev server:**
   ```bash
   npm run dev
   ```
3. **Open your site:** http://localhost:4323/GeminiHomeImprovements/
4. **Navigate through pages** (Home, Services, Projects, Contact, etc.)

### B. Check Real-Time Reports

1. Go to Google Analytics: https://analytics.google.com/
2. Click **Reports** → **Real-time**
3. You should see:
   - 1 user active (you!)
   - Page views updating
   - Your location
   - Browser/device info

**If you see yourself, it's working!** 🎉

### C. Test After Deployment

Once site is live on geminialuminum.org:

1. Visit your live site
2. Navigate through pages
3. Check Real-time reports
4. You should see traffic within 30 seconds

---

## Step 5: Configure Enhanced Tracking (Optional)

### A. Enable Enhanced Measurement (Already Enabled)

In GA4 → Admin → Data Streams → Your Stream:

Check these are enabled:
- ☑ Page views
- ☑ Scrolls (90% scroll depth)
- ☑ Outbound clicks
- ☑ Site search
- ☑ Video engagement
- ☑ File downloads

### B. Set Up Conversions (Goals)

**Important Conversions to Track:**

1. **Contact Form Submission**
2. **Phone Number Click**
3. **Email Click**

**To create a conversion:**

1. Go to **Admin** → **Events**
2. Click **Create event**
3. Add event names:
   - `contact_form_submit`
   - `phone_click`
   - `email_click`
4. Go to **Conversions** → Mark as conversions

### C. Add Event Tracking to Contact Form

Update `src/pages/contact.astro` to track form submissions:

```javascript
// Inside form submit handler, after opening mailto:
gtag('event', 'contact_form_submit', {
	'form_name': 'Contact Form',
	'service': data.service
});
```

Full example:

```javascript
form?.addEventListener('submit', async (e) => {
	e.preventDefault();
	
	// ... existing form validation code ...
	
	// Open email client
	window.location.href = `mailto:${obfuscatedEmail}?subject=${subject}&body=${body}`;
	
	// Track in Google Analytics
	if (typeof gtag !== 'undefined') {
		gtag('event', 'contact_form_submit', {
			'event_category': 'Form',
			'event_label': 'Contact Form',
			'service': data.service
		});
	}
	
	// ... rest of code ...
});
```

---

## Step 6: Understanding Your Reports

### Key Reports to Check Weekly:

#### 1. **Real-time Report**
- See current visitors
- What pages they're viewing
- Where they're from

**How to use:** Monitor during marketing campaigns

#### 2. **Acquisition Overview**
Reports → Acquisition → Overview
- Where visitors come from
- Google Search
- Direct traffic
- Social media
- Referrals

**How to use:** Understand which marketing works

#### 3. **Engagement Reports**
Reports → Engagement → Pages and screens
- Most viewed pages
- Average time on page
- Bounce rate

**How to use:** Identify popular content

#### 4. **Demographics**
Reports → User → Demographics
- Age ranges
- Gender
- Interests
- Location

**How to use:** Understand your audience

#### 5. **Conversions**
Reports → Engagement → Conversions
- Contact form submissions
- Phone clicks
- Email clicks

**How to use:** Measure business success

---

## Step 7: Connect to Google Search Console

This helps with SEO tracking.

### A. Set Up Search Console

1. Go to https://search.google.com/search-console
2. Click **Add property**
3. Enter: `https://geminialuminum.org`
4. Click **Continue**

### B. Verify Ownership

**Method 1: DNS Verification (Recommended)**
1. Copy the TXT record provided
2. Add to your domain registrar DNS settings
3. Click **Verify**

**Method 2: HTML File Upload**
1. Download verification file
2. Place in `public/` folder
3. Commit and push to deploy
4. Click **Verify**

### C. Submit Sitemap

1. In Search Console, go to **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**

Your sitemap URL will be: `https://geminialuminum.org/sitemap.xml`

### D. Link to Google Analytics

1. In Search Console, click **Settings** (gear icon)
2. Click **Associations**
3. Click **Associate** next to Google Analytics
4. Select your GA4 property
5. Click **Associate**

---

## Free Analytics Alternatives (If You Want Options)

### 1. **Plausible Analytics** (Privacy-Focused)
- **Cost:** $9/month (after trial)
- **Pros:** Simple, privacy-friendly, no cookies
- **Cons:** Not free

### 2. **Umami** (Self-Hosted, FREE)
- **Cost:** Free (you host it)
- **Pros:** Open-source, privacy-friendly
- **Cons:** Requires technical setup
- **Setup:** Deploy to Vercel/Railway for free

### 3. **Cloudflare Web Analytics** (100% FREE)
- **Cost:** Free forever
- **Pros:** Simple, privacy-friendly, no cookies
- **Cons:** Less detailed than GA4
- **Setup:** Add Cloudflare DNS, enable analytics

### 4. **Microsoft Clarity** (100% FREE)
- **Cost:** Free forever
- **Pros:** Heatmaps, session recordings
- **Cons:** Different focus than GA4
- **Great for:** Understanding user behavior visually

---

## Recommended Setup: Google Analytics + Microsoft Clarity

**Both are 100% free and complement each other:**

### Google Analytics 4:
- Traffic sources
- Conversions
- Demographics
- Quantitative data

### Microsoft Clarity:
- Heatmaps (where users click)
- Session recordings (watch user sessions)
- Scroll depth
- Qualitative insights

### Add Microsoft Clarity:

1. Sign up: https://clarity.microsoft.com/
2. Create project
3. Copy tracking code
4. Add to `MainLayout.astro` after Google Analytics:

```astro
<!-- Microsoft Clarity - FREE -->
<script is:inline type="text/javascript">
	(function(c,l,a,r,i,t,y){
		c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
		t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
		y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
	})(window, document, "clarity", "script", "YOUR-CLARITY-ID");
</script>
```

---

## Privacy & GDPR Compliance

### Google Analytics is GDPR Compliant IF:

1. **Add Privacy Policy page** (see PRIVACY_POLICY_TEMPLATE.md)
2. **Anonymize IP addresses** (GA4 does this by default)
3. **Add cookie notice** (optional, but recommended)

### Simple Cookie Notice (Optional):

Add to bottom of `MainLayout.astro` before `</body>`:

```astro
<div id="cookie-notice" style="position: fixed; bottom: 0; left: 0; right: 0; background: #1e4d2b; color: white; padding: 1rem; text-align: center; display: none; z-index: 9999;">
	<p style="margin: 0 0 0.5rem 0;">
		This site uses cookies to improve your experience and analyze traffic. 
		<a href={`${baseUrl}/privacy/`} style="color: #7cb342; text-decoration: underline;">Learn more</a>
	</p>
	<button onclick="document.getElementById('cookie-notice').style.display='none'; localStorage.setItem('cookieAccepted', 'true');" style="background: #7cb342; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 4px; cursor: pointer;">
		Accept
	</button>
</div>

<script is:inline>
	if (!localStorage.getItem('cookieAccepted')) {
		document.getElementById('cookie-notice').style.display = 'block';
	}
</script>
```

---

## Monitoring Checklist

### Daily (First Week):
- [ ] Check real-time visitors
- [ ] Verify tracking works on all pages
- [ ] Check for errors in browser console

### Weekly:
- [ ] Review traffic sources
- [ ] Check most popular pages
- [ ] Review conversion events
- [ ] Check Search Console for errors

### Monthly:
- [ ] Analyze trends
- [ ] Compare to previous month
- [ ] Adjust marketing based on data
- [ ] Review and optimize underperforming pages

---

## Troubleshooting

### "No data showing in Google Analytics"

**Check:**
1. Measurement ID is correct in code
2. Code is in `<head>` section
3. `is:inline` attribute is present (prevents Astro from processing)
4. Ad blocker is disabled (blocks GA)
5. Wait 24-48 hours for data to process

### "Real-time shows data but reports are empty"

**Normal!** Historical reports take 24-48 hours to populate.

### "Tracking not working on localhost"

This is normal. GA4 tracks localhost by default, but some browsers block it.

**Solution:** Test on live site after deployment.

---

## Summary: What to Do Right Now

1. ✅ **Sign up for Google Analytics** (5 minutes)
2. ✅ **Get your Measurement ID** (copy it)
3. ✅ **Update MainLayout.astro** with your ID (already added, just replace placeholder)
4. ✅ **Test in dev environment** (check real-time reports)
5. ✅ **Deploy to production** (see DEPLOYMENT_GUIDE.md)
6. ✅ **Set up Google Search Console** (link to GA4)
7. ✅ **(Optional) Add Microsoft Clarity** for heatmaps

**Total Time:** 15-20 minutes  
**Total Cost:** $0.00 ✅

---

## Support Resources

- **GA4 Help Center:** https://support.google.com/analytics
- **GA4 Setup Guide:** https://support.google.com/analytics/answer/9304153
- **Astro Analytics Guide:** https://docs.astro.build/en/guides/integrations-guide/

---

**Last Updated:** January 2025  
**Cost:** 100% FREE Forever  
**Status:** Code added to MainLayout.astro - just add your Measurement ID
