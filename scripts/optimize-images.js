import sharp from 'sharp';
import { readdir, mkdir, copyFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

/**
 * Optimized Image Processing for Astro Cards
 * Generates card-specific sizes for 1920x1080 viewports
 * Focuses on WebP-first with optimized dimensions
 */

const IMAGE_DIRS = [
	'src/images/projects',
	'src/images/carousel', 
	'src/images/services'
];

// Card-optimized sizes for responsive grid layouts
const CARD_SIZES = {
	small: 400,    // Mobile cards
	medium: 600,   // Tablet cards  
	large: 800,    // Desktop cards
	xl: 1200       // High-DPI desktop
};

const WEBP_QUALITY = 85;
const JPEG_QUALITY = 82;
const OUTPUT_DIR = 'public/images'; // Output to public so images are accessible after build

/**
 * Process individual image with card-optimized sizes
 */
async function optimizeForCards(inputPath, outputDir, filename) {
	const name = basename(filename, extname(filename));
	const results = [];

	try {
		const metadata = await sharp(inputPath).metadata();
		const originalWidth = metadata.width || 1200;

		console.log(`\n📸 Processing: ${filename}`);
		console.log(`   Original: ${originalWidth}x${metadata.height} (${Math.round(metadata.size / 1024)}KB)`);

		// Generate WebP versions optimized for card containers
		for (const [sizeName, width] of Object.entries(CARD_SIZES)) {
			if (originalWidth < width) continue;

			const webpPath = join(outputDir, `${name}-${sizeName}.webp`);
			
			await sharp(inputPath)
				.rotate() // Auto-rotate based on EXIF orientation
				.resize(width, null, {
					fit: 'cover',
					position: 'center',
					withoutEnlargement: true
				})
				.webp({ 
					quality: WEBP_QUALITY,
					effort: 6,
					lossless: false
				})
				.toFile(webpPath);

			const stats = await sharp(webpPath).metadata();
			console.log(`   ✓ ${sizeName}: ${stats.width}x${stats.height} WebP (${Math.round(stats.size / 1024)}KB)`);
			
			results.push({
				size: sizeName,
				path: webpPath,
				width: stats.width,
				height: stats.height,
				format: 'webp'
			});
		}

		// Create one optimized JPEG fallback at medium size
		const fallbackPath = join(outputDir, `${name}-fallback.jpg`);
		await sharp(inputPath)
			.rotate() // Auto-rotate based on EXIF orientation
			.resize(800, null, {
				fit: 'cover',
				position: 'center',
				withoutEnlargement: true
			})
			.jpeg({ 
				quality: JPEG_QUALITY, 
				progressive: true,
				mozjpeg: true 
			})
			.toFile(fallbackPath);

		const fallbackStats = await sharp(fallbackPath).metadata();
		console.log(`   ✓ Fallback JPEG: ${fallbackStats.width}x${fallbackStats.height} (${Math.round(fallbackStats.size / 1024)}KB)`);

		results.push({
			size: 'fallback',
			path: fallbackPath,
			width: fallbackStats.width,
			height: fallbackStats.height,
			format: 'jpeg'
		});

		return results;

	} catch (error) {
		console.error(`   ✗ Error processing ${filename}:`, error.message);
		return [];
	}
}

/**
 * Process directory with card optimization focus
 */
async function processDirectory(inputDir) {
	console.log(`\n${'='.repeat(60)}`);
	console.log(`📁 Processing: ${inputDir}`);
	console.log('='.repeat(60));

	if (!existsSync(inputDir)) {
		console.log(`⚠️  Directory not found: ${inputDir}`);
		return { processed: 0, originalSize: 0, optimizedSize: 0 };
	}

	// Create category-specific output directory
	const category = inputDir.split('/').pop();
	const outputDir = join(OUTPUT_DIR, category);
	
	if (!existsSync(outputDir)) {
		await mkdir(outputDir, { recursive: true });
		console.log(`✓ Created output: ${outputDir}`);
	}

	const files = await readdir(inputDir);
	const imageFiles = files.filter(file => {
		// Only process original source images (jpg, jpeg, png)
		// Skip any already-optimized variants that might exist
		const isImageFile = /\.(jpg|jpeg|png)$/i.test(file);
		const isOriginal = !file.includes('-small') &&
						  !file.includes('-medium') &&
						  !file.includes('-large') &&
						  !file.includes('-xl') &&
						  !file.includes('-fallback') &&
						  !file.includes('optimized');
		return isImageFile && isOriginal;
	});

	console.log(`Found ${imageFiles.length} images to optimize for cards`);

	let totalOriginal = 0;
	let totalOptimized = 0;
	let processedCount = 0;

	for (const file of imageFiles) {
		const inputPath = join(inputDir, file);
		const originalStats = await sharp(inputPath).metadata();
		totalOriginal += originalStats.size;

		const results = await optimizeForCards(inputPath, outputDir, file);
		
		if (results.length > 0) {
			processedCount++;
			for (const result of results) {
				const stats = await sharp(result.path).metadata();
				totalOptimized += stats.size;
			}
		}
	}

	const savings = totalOriginal > 0 ? 
		((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1) : 0;

	console.log(`\n📊 ${category.toUpperCase()} Summary:`);
	console.log(`   Images: ${processedCount}/${imageFiles.length}`);
	console.log(`   Original: ${Math.round(totalOriginal / 1024)}KB`);
	console.log(`   Optimized: ${Math.round(totalOptimized / 1024)}KB`);
	console.log(`   Saved: ${savings}% (${Math.round((totalOriginal - totalOptimized) / 1024)}KB)`);

	return { 
		processed: processedCount, 
		originalSize: totalOriginal, 
		optimizedSize: totalOptimized 
	};
}

/**
 * Copy and optimize other assets (logos, favicons)
 */
async function processAssets() {
	console.log(`\n${'='.repeat(60)}`);
	console.log('� Processing Assets (logos, favicons)');
	console.log('='.repeat(60));

	const assetsOutputDir = join(OUTPUT_DIR, 'assets');
	if (!existsSync(assetsOutputDir)) {
		await mkdir(assetsOutputDir, { recursive: true });
	}

	// Copy and optimize logo
	if (existsSync('public/logo.svg')) {
		await copyFile('public/logo.svg', join(assetsOutputDir, 'logo.svg'));
		console.log('✓ Logo copied: logo.svg');
	}

	// Copy favicons
	if (existsSync('public/favicon.png')) {
		await copyFile('public/favicon.png', join(assetsOutputDir, 'favicon.png'));
		console.log('✓ Favicon copied: favicon.png');
	}

	if (existsSync('public/favicon.svg')) {
		await copyFile('public/favicon.svg', join(assetsOutputDir, 'favicon.svg'));
		console.log('✓ Favicon copied: favicon.svg');
	}
}

/**
 * Main execution function
 */
async function main() {
	console.log('\n🚀 Card-Optimized Image Processing');
	console.log('📱 Optimizing for responsive cards on 1920x1080 viewports\n');

	// Create main output directory
	if (!existsSync(OUTPUT_DIR)) {
		await mkdir(OUTPUT_DIR, { recursive: true });
	}

	let totalStats = {
		processed: 0,
		originalSize: 0,
		optimizedSize: 0
	};

	// Process each image directory
	for (const dir of IMAGE_DIRS) {
		const stats = await processDirectory(dir);
		totalStats.processed += stats.processed;
		totalStats.originalSize += stats.originalSize;
		totalStats.optimizedSize += stats.optimizedSize;
	}

	// Process other assets
	await processAssets();

	// Final summary
	const totalSavings = totalStats.originalSize > 0 ? 
		((totalStats.originalSize - totalStats.optimizedSize) / totalStats.originalSize * 100).toFixed(1) : 0;

	console.log(`\n${'='.repeat(60)}`);
	console.log('🎉 OPTIMIZATION COMPLETE');
	console.log('='.repeat(60));
	console.log(`� Total Images Processed: ${totalStats.processed}`);
	console.log(`📈 Total Space Saved: ${totalSavings}% (${Math.round((totalStats.originalSize - totalStats.optimizedSize) / 1024)}KB)`);
	console.log(`📁 Output Location: ${OUTPUT_DIR}`);
	
	console.log('\n✅ Next Steps:');
	console.log('1. Images optimized for card layouts (400-1200px)');
	console.log('2. WebP format with JPEG fallbacks generated');
	console.log('3. Assets organized in public/images/');
	console.log('4. Update components to use responsive images');
	
	console.log('\n🔧 Usage in Astro components:');
	console.log(`
import { Image } from 'astro:assets';
import heroImage from '../images/carousel/slide1-large.webp';

<Image 
  src={heroImage} 
  alt="Description" 
  width={800} 
  height={600}
  loading="lazy"
/>
	`);
}

main().catch(console.error);
