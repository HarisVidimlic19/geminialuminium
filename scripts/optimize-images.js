import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

/**
 * Image Optimization Script
 * Converts images to WebP format and creates multiple sizes for responsive loading
 */

const IMAGE_DIRS = [
	'public/images/projects',
	'public/images/carousel',
	'public/images/services',
	'public/old_images'
];

const SIZES = {
	thumbnail: 400,
	small: 800,
	medium: 1200,
	large: 1920
};

const WEBP_QUALITY = 85;
const JPEG_QUALITY = 85;

async function optimizeImage(inputPath, outputDir, filename) {
	const name = basename(filename, extname(filename));
	const results = [];

	try {
		// Get image metadata
		const metadata = await sharp(inputPath).metadata();
		const originalWidth = metadata.width || 1920;

		console.log(`\n📸 Processing: ${filename}`);
		console.log(`   Original: ${originalWidth}x${metadata.height} (${Math.round(metadata.size / 1024)}KB)`);

		// Generate WebP versions at different sizes
		for (const [sizeName, width] of Object.entries(SIZES)) {
			// Skip if original is smaller than target size
			if (originalWidth < width) continue;

			const webpPath = join(outputDir, `${name}-${sizeName}.webp`);
			
			await sharp(inputPath)
				.resize(width, null, {
					fit: 'inside',
					withoutEnlargement: true
				})
				.webp({ quality: WEBP_QUALITY })
				.toFile(webpPath);

			const stats = await sharp(webpPath).metadata();
			console.log(`   ✓ ${sizeName}: ${stats.width}x${stats.height} WebP (${Math.round(stats.size / 1024)}KB)`);
			
			results.push({
				size: sizeName,
				path: webpPath,
				width: stats.width,
				height: stats.height
			});
		}

		// Create optimized original format version
		const optimizedPath = join(outputDir, `${name}-optimized${extname(filename)}`);
		
		if (extname(filename).toLowerCase() === '.jpg' || extname(filename).toLowerCase() === '.jpeg') {
			await sharp(inputPath)
				.jpeg({ quality: JPEG_QUALITY, progressive: true })
				.toFile(optimizedPath);
		} else if (extname(filename).toLowerCase() === '.png') {
			await sharp(inputPath)
				.png({ quality: JPEG_QUALITY, compressionLevel: 9 })
				.toFile(optimizedPath);
		}

		const optimizedStats = await sharp(optimizedPath).metadata();
		console.log(`   ✓ Optimized original: ${Math.round(optimizedStats.size / 1024)}KB`);

		return results;

	} catch (error) {
		console.error(`   ✗ Error processing ${filename}:`, error.message);
		return [];
	}
}

async function processDirectory(dir) {
	console.log(`\n${'='.repeat(60)}`);
	console.log(`📁 Processing directory: ${dir}`);
	console.log('='.repeat(60));

	if (!existsSync(dir)) {
		console.log(`⚠️  Directory not found: ${dir}`);
		return;
	}

	// Create optimized subdirectory
	const optimizedDir = join(dir, 'optimized');
	if (!existsSync(optimizedDir)) {
		await mkdir(optimizedDir, { recursive: true });
		console.log(`✓ Created output directory: ${optimizedDir}`);
	}

	// Get all image files
	const files = await readdir(dir);
	const imageFiles = files.filter(file => 
		/\.(jpg|jpeg|png)$/i.test(file) && !file.includes('optimized')
	);

	console.log(`Found ${imageFiles.length} images to process\n`);

	let totalOriginalSize = 0;
	let totalOptimizedSize = 0;

	// Process each image
	for (const file of imageFiles) {
		const inputPath = join(dir, file);
		const originalStats = await sharp(inputPath).metadata();
		totalOriginalSize += originalStats.size;

		const results = await optimizeImage(inputPath, optimizedDir, file);
		
		// Calculate savings
		for (const result of results) {
			const stats = await sharp(result.path).metadata();
			totalOptimizedSize += stats.size;
		}
	}

	// Summary
	console.log(`\n${'─'.repeat(60)}`);
	console.log(`📊 Summary for ${dir}:`);
	console.log(`   Images processed: ${imageFiles.length}`);
	console.log(`   Original total size: ${Math.round(totalOriginalSize / 1024)}KB`);
	console.log(`   Optimized total size: ${Math.round(totalOptimizedSize / 1024)}KB`);
	const savings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
	console.log(`   Space saved: ${savings}% (${Math.round((totalOriginalSize - totalOptimizedSize) / 1024)}KB)`);
	console.log('─'.repeat(60));
}

async function main() {
	console.log('\n🚀 Image Optimization Tool');
	console.log('Converting to WebP and creating responsive sizes...\n');

	for (const dir of IMAGE_DIRS) {
		await processDirectory(dir);
	}

	console.log('\n✅ Image optimization complete!');
	console.log('\n📝 Next steps:');
	console.log('1. Review optimized images in /optimized folders');
	console.log('2. Update image references in your pages to use WebP with fallbacks');
	console.log('3. Use <picture> tags for maximum compatibility');
	console.log('\nExample usage:');
	console.log(`
<picture>
  <source srcset="/images/projects/optimized/project-medium.webp" type="image/webp">
  <img src="/images/projects/optimized/project-optimized.jpg" alt="..." loading="lazy">
</picture>
	`);
}

main().catch(console.error);
