// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://geminialuminum.org',
	base: '/',
	integrations: [sitemap()],
	build: {
		assets: 'assets',
		inlineStylesheets: 'auto', // Inline small CSS files for performance
	},
	vite: {
		build: {
			minify: 'esbuild', // Minify JS/CSS
			cssMinify: true,
			rollupOptions: {
				output: {
					// Optimize chunk splitting
					manualChunks: undefined,
				}
			}
		}
	},
	compressHTML: true, // Minify HTML output
	image: {
		domains: [],
		remotePatterns: []
	}
});
