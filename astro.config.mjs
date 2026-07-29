// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://geminialuminum.org',
    base: '/',
    integrations: [sitemap({
            // Include only canonical pages that we want search engines to index.
            filter: (page) => {
                const pathname = new URL(page).pathname;
                return !['/404/', '/privacy/', '/service-areas/'].includes(pathname);
            },
		}), partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		})],
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
                        // Extract extension from the source or fallback
                        let extType = '';
                        if (assetInfo.names && assetInfo.names.length > 0) {
                            extType = assetInfo.names[0].split('.').pop() || '';
                        }
                        
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
