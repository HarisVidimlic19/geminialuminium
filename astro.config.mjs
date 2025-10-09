// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://harisvidimlic19.github.io',
	base: '/GeminiHomeImprovements',
	integrations: [sitemap()],
	build: {
		assets: 'assets'
	},
	image: {
		domains: [],
		remotePatterns: []
	}
});
