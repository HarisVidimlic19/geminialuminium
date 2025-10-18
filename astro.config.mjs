// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://geminialuminum.org',
	base: '/',
	integrations: [
		sitemap({
			customPages: [
				'https://geminialuminum.org/',
				'https://geminialuminum.org/services/',
				'https://geminialuminum.org/projects/',
				'https://geminialuminum.org/team/',
				'https://geminialuminum.org/about/',
				'https://geminialuminum.org/contact/',
				'https://geminialuminum.org/privacy/',
			],
			serialize: (item) => {
				// Set custom priority based on page importance
					if (item.url === 'https://geminialuminum.org/') {
						item.priority = 1.0;
					} else if (item.url.includes('/services/') || item.url.includes('/contact/')) {
						item.priority = 0.9;
					} else if (item.url.includes('/team/')) {
						item.priority = 0.8;
					} else if (item.url.includes('/projects/') || item.url.includes('/about/')) {
						item.priority = 0.8;
				} else if (item.url.includes('/privacy/')) {
					item.priority = 0.3;
				} else {
					item.priority = 0.7;
				}
				return item;
			},
		}),
	],
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
