import { rm } from 'fs/promises';
import { existsSync } from 'fs';

/**
 * Asset Cleanup Script
 * Removes optimized assets to force regeneration
 */

const CLEANUP_PATHS = [
	'public/images/',
	'dist',
	'.astro'
];

async function cleanupAssets() {
	console.log('\n🧹 Cleaning up generated assets...\n');

	for (const path of CLEANUP_PATHS) {
		if (existsSync(path)) {
			try {
				await rm(path, { recursive: true, force: true });
				console.log(`✓ Removed: ${path}`);
			} catch (error) {
				console.log(`⚠️  Could not remove ${path}: ${error.message}`);
			}
		} else {
			console.log(`ℹ️  Not found: ${path}`);
		}
	}

	console.log('\n✅ Cleanup complete! Run `npm run optimize:images` to regenerate.\n');
}

cleanupAssets().catch(console.error);