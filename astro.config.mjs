// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://geminialuminum.org',
	base: '/',
	integrations: [sitemap()],
	build: {
		assets: 'assets', // Cleaner asset organization
		inlineStylesheets: 'auto',
		format: 'directory', // Clean URLs
	},
	vite: {
		build: {
			minify: 'esbuild',
			cssMinify: true,
			rollupOptions: {
				output: {
					// Organize assets by type
					assetFileNames: (assetInfo) => {
						const name = assetInfo.name || 'unknown';
						const extType = name.split('.').pop() || '';
						if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
							return `assets/images/[name]-[hash][extname]`;
						}
						if (/css/i.test(extType)) {
							return `assets/css/[name]-[hash][extname]`;
						}
						return `assets/[name]-[hash][extname]`;
					},
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js'
				}
			}
		}
	},
	compressHTML: true,
	image: {
		// Configure image optimization
		service: {
			entrypoint: 'astro/assets/services/sharp'
		},
		domains: [],
		remotePatterns: []
	}
});
