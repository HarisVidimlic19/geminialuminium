# Gemini Home Improvements Website

A modern, SEO-optimized website built with [Astro](https://astro.build) for Gemini Home Improvements, a professional exterior renovation company.

## 🚀 Features

- **Static Site Generation (SSG)**: Pre-rendered HTML for lightning-fast page loads
- **SEO Optimized**: Meta tags, sitemap, and semantic HTML
- **Responsive Design**: Mobile-first approach works on all devices
- **Zero JavaScript by Default**: Only loads JS where needed (contact form, mobile menu)
- **GitHub Pages Ready**: Configured for easy deployment

## 📁 Project Structure

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── layouts/
│   │   └── MainLayout.astro    # Main page layout with header/footer
│   ├── pages/           # File-based routing (each .astro file = a page)
│   │   ├── index.astro         # Homepage
│   │   ├── services.astro      # Services page
│   │   ├── projects.astro      # Projects gallery
│   │   ├── team.astro          # Team page
│   │   ├── about.astro         # About page
│   │   └── contact.astro       # Contact form
│   └── styles/
│       └── global.css   # Global styles
├── astro.config.mjs     # Astro configuration
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm installed

### Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deployment to GitHub Pages

### Automatic Deployment with GitHub Actions

The `.github/workflows/deploy.yml` file is configured to automatically build and deploy your site when you push to the `main` branch.

**Setup Steps:**

1. Push this code to your GitHub repository
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. Push to `main` branch - deployment happens automatically!

### Canonical Domain Consistency (implemented)

This project is configured to use `https://geminialuminum.org` as the canonical domain:

- `astro.config.mjs` uses `site: 'https://geminialuminum.org'`
- `public/CNAME` is set to `geminialuminum.org`
- Canonical tags are generated from `Astro.site` in `MainLayout.astro`
- A client-side fallback redirects `www.geminialuminum.org` to non-www

For full server-level consistency on GitHub Pages, set DNS like this:

- Apex/root (`@`) A/ALIAS records to GitHub Pages
- `www` CNAME to `<your-github-username>.github.io`

GitHub Pages will then enforce the custom domain consistently.

### Manual Deployment

```bash
# Build the site
npm run build

# The dist/ folder contains your built site
```

## 📝 Customization Guide

### Update Site URL

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
});
```

### Add Your Images

1. Place images in the `public/` folder
2. Reference them: `<img src="/images/your-image.jpg" alt="Description" />`

### Customize Colors

Edit `src/styles/global.css`:

```css
:root {
  --primary-color: #2c5282;
  --secondary-color: #ed8936;
}
```

### Add More Pages

Create a new `.astro` file in `src/pages/`
Example: `src/pages/blog.astro` → Accessible at `/blog`

### Update Contact Form

Currently opens email client. To use a form service:
1. Sign up for [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/)
2. Update form in `src/pages/contact.astro`

## ✅ Next Steps

1. [ ] Add your business images to `/public/images/`
2. [ ] Update contact information (email, phone)
3. [ ] Customize colors to match your brand
4. [ ] Add real project photos
5. [ ] Set up contact form service
6. [ ] Test on mobile devices
7. [ ] Deploy to GitHub Pages

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [File-based Routing](https://docs.astro.build/en/core-concepts/routing/)
- [Astro Discord](https://astro.build/chat)

## 📄 License

MIT
