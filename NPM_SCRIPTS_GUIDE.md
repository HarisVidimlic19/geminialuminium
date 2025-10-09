# NPM Scripts Guide

## Available Scripts

Your `package.json` contains the following scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

---

## Script Descriptions

### 1. `npm run dev`
**Purpose:** Start development server with hot reload

**What it does:**
- Starts local server at http://localhost:4321
- Watches for file changes
- Auto-reloads browser on save
- Shows build errors in terminal
- Uses base path: /GeminiHomeImprovements

**When to use:**
- During development
- Making changes to pages
- Testing functionality locally
- Debugging

**Command:**
```bash
npm run dev
```

**Output:**
```
astro  v5.14.1 ready in 819 ms

┃ Local    http://localhost:4321/GeminiHomeImprovements
┃ Network  use --host to expose

watching for file changes...
```

**To stop:** Press `Ctrl+C`

---

### 2. `npm run start`
**Purpose:** Alias for `npm run dev`

**What it does:**
- Same as `npm run dev`
- Alternative command name

**When to use:**
- If you prefer typing "start" instead of "dev"
- Both commands do exactly the same thing

**Command:**
```bash
npm run start
```

---

### 3. `npm run build`
**Purpose:** Build site for production deployment

**What it does:**
- Compiles Astro components to HTML
- Optimizes JavaScript and CSS
- Processes images
- Generates sitemap
- Creates production-ready files in `dist/` folder
- Minifies code
- Removes development features

**When to use:**
- Before deploying to production
- Testing production build locally
- Checking build errors
- Verifying optimizations

**Command:**
```bash
npm run build
```

**Output:**
```
21:20:50 [types] Generated 3ms
21:20:50 [content] Syncing content
21:20:50 [content] Synced content

 building client (vite)
 ✓ 42 modules transformed.
 rendering pages
 ▶ src/pages/index.astro
   └─ /index.html (+2.1ms)
 ▶ src/pages/services.astro
   └─ /services/index.html (+1ms)
 ... (all pages)
 
 ✓ Completed in 2.5s.

 dist/
 ├─ assets/
 │  └─ (optimized files)
 ├─ images/
 ├─ index.html
 ├─ services/index.html
 └─ ... (all pages)
```

**Output location:** `dist/` folder

---

### 4. `npm run preview`
**Purpose:** Preview production build locally

**What it does:**
- Serves the built site from `dist/` folder
- Simulates production environment
- No hot reload (static files)
- Uses production URLs and paths

**When to use:**
- After running `npm run build`
- Testing production build before deployment
- Verifying optimizations work
- Checking for build-specific issues

**Command:**
```bash
# First, build the site
npm run build

# Then preview it
npm run preview
```

**Output:**
```
astro  v5.14.1 preview server running on http://localhost:4321/GeminiHomeImprovements

Press Ctrl+C to stop the server
```

**Important:** Must run `npm run build` first!

---

### 5. `npm run astro`
**Purpose:** Run Astro CLI commands

**What it does:**
- Provides access to Astro CLI
- Used for advanced commands
- Check types, add integrations, etc.

**When to use:**
- Adding integrations
- Type checking
- Advanced debugging
- Custom commands

**Examples:**
```bash
# Check for TypeScript errors
npm run astro check

# Add integration
npm run astro add sitemap

# Show help
npm run astro --help
```

---

## Common Workflows

### Development Workflow
```bash
# 1. Start dev server
npm run dev

# 2. Make changes to files
# 3. Browser auto-reloads
# 4. Check for errors in terminal

# 5. When done, stop server
Ctrl+C
```

### Pre-Deployment Workflow
```bash
# 1. Build for production
npm run build

# 2. Check for build errors
# (Fix any errors that appear)

# 3. Preview production build
npm run preview

# 4. Test in browser
# Visit: http://localhost:4321/GeminiHomeImprovements/

# 5. If looks good, deploy!
```

### Deployment Workflow
```bash
# 1. Build site
npm run build

# 2. Commit changes
git add .
git commit -m "Build for deployment"

# 3. Push to GitHub
git push origin main

# 4. GitHub Actions automatically deploys
# (Wait 2-5 minutes)

# 5. Check live site
# Visit: https://geminialuminum.org
```

---

## Recommended Additional Scripts

You can add these to your `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "clean": "rm -rf dist/ .astro/",
    "deploy": "npm run build && git add dist/ && git commit -m 'Deploy' && git push"
  }
}
```

### New Scripts Explained:

**`npm run check`** - Check for TypeScript errors
```bash
npm run check
```

**`npm run clean`** - Clear build cache
```bash
npm run clean
npm run build  # Fresh build
```

**`npm run deploy`** - Build and deploy in one command
```bash
npm run deploy  # Builds, commits, and pushes
```

---

## Troubleshooting Scripts

### Script Fails to Run

**Error:** `npm: command not found`
```bash
# Install Node.js from https://nodejs.org/
```

**Error:** `Module not found`
```bash
# Reinstall dependencies
npm install
```

**Error:** `Port already in use`
```bash
# Kill process using port 4321
# Windows:
netstat -ano | findstr :4321
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- --port 3000
```

### Build Errors

**Error in specific file:**
1. Check terminal for error message
2. Fix the error in that file
3. Run `npm run build` again

**TypeScript errors:**
```bash
npm run astro check
# Shows all type errors
```

**Memory errors:**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

---

## Development Tips

### Hot Reload Not Working?
1. Stop server (Ctrl+C)
2. Clear cache: `rm -rf .astro/`
3. Restart: `npm run dev`

### Changes Not Showing?
1. Check terminal for errors
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Restart dev server

### Slow Build Times?
1. Remove unused dependencies
2. Optimize images before adding
3. Use `npm run dev` during development
4. Only `npm run build` when deploying

### Testing Production Features?
1. Always use `npm run preview` not `npm run dev`
2. Production build may look different
3. Check browser console for errors

---

## Script Comparison

| Feature | `npm run dev` | `npm run build` | `npm run preview` |
|---------|--------------|-----------------|-------------------|
| **Speed** | Fast | Slow | Fast |
| **Hot Reload** | Yes | No | No |
| **Optimized** | No | Yes | Yes |
| **Source Maps** | Yes | No | No |
| **Minified** | No | Yes | Yes |
| **Use For** | Development | Deployment | Testing build |
| **Output** | Memory | dist/ folder | Serves dist/ |

---

## Performance Metrics

### Build Times (Approximate)
- **npm run dev:** 1-2 seconds to start
- **npm run build:** 3-10 seconds (depends on content)
- **npm run preview:** Instant (just serves files)

### File Sizes (Your Project)
- **Development:** Not applicable (in memory)
- **Production (dist/):** ~5-10MB total
  - HTML files: ~50-100KB
  - CSS: ~20KB
  - JS: ~50KB
  - Images: ~5-8MB

---

## Environment Variables

You can use different settings for dev vs production:

**Create `.env` file:**
```env
# Development
PUBLIC_SITE_URL=http://localhost:4321/GeminiHomeImprovements
PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Create `.env.production` file:**
```env
# Production
PUBLIC_SITE_URL=https://geminialuminum.org
PUBLIC_GA_ID=G-REAL_ID_HERE
```

**Use in code:**
```astro
---
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
---
```

---

## Quick Reference Card

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Check for errors
npm run astro check

# Clean cache
rm -rf .astro/ dist/

# Install dependencies
npm install

# Update dependencies
npm update

# View package versions
npm list

# Search for package
npm search <package-name>
```

---

## Next Steps

Now that you understand the NPM scripts:

1. **Use `npm run dev`** for all development work
2. **Run `npm run build`** before deploying
3. **Use `npm run preview`** to test production build
4. **Deploy** following DEPLOYMENT_GUIDE.md

---

**Pro Tip:** Bookmark this page or keep it open while developing!

**Last Updated:** January 2025
