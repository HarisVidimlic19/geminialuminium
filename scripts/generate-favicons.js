import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { copyFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const SOURCE_SVG = 'src/images/assets/favicon.svg';
const PUBLIC_DIR = 'public';

const PNG_TARGETS = [
  { file: 'favicon.png', size: 64 },
  { file: 'favicon-48x48.png', size: 48 },
  { file: 'favicon-192x192.png', size: 192 },
  { file: 'favicon-512x512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 }
];

async function generatePngIcons() {
  for (const target of PNG_TARGETS) {
    const output = join(PUBLIC_DIR, target.file);

    await sharp(SOURCE_SVG, { density: 300 })
      .resize(target.size, target.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100, compressionLevel: 9, adaptiveFiltering: true })
      .toFile(output);

    console.log(`✓ Generated ${target.file} (${target.size}x${target.size})`);
  }
}

async function copySvgSource() {
  const output = join(PUBLIC_DIR, 'favicon.svg');
  await copyFile(SOURCE_SVG, output);
  console.log('✓ Copied favicon.svg to public/');
}

async function generateIco() {
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of icoSizes) {
    const buffer = await sharp(SOURCE_SVG, { density: 300 })
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100, compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    pngBuffers.push(buffer);
  }

  const icoBuffer = await pngToIco(pngBuffers);
  await writeFile(join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log('✓ Generated favicon.ico (16x16, 32x32, 48x48)');
}

async function main() {
  if (!existsSync(SOURCE_SVG)) {
    throw new Error(`Source favicon not found: ${SOURCE_SVG}`);
  }

  console.log('\n🧩 Generating favicons from source SVG...\n');
  await copySvgSource();
  await generatePngIcons();
  await generateIco();

  console.log('\n✅ Favicon generation complete.');
  console.log('Generated: favicon.svg, favicon.png, favicon-48x48.png, favicon-192x192.png, favicon-512x512.png, apple-touch-icon.png, favicon.ico');
}

main().catch((err) => {
  console.error('✗ Favicon generation failed:', err.message);
  process.exit(1);
});
