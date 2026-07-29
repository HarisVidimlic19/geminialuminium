import { access, readFile, readdir } from 'fs/promises';
import path from 'path';

const failures = [];

function expect(condition, message) {
	if (!condition) failures.push(message);
}

async function read(path) {
	return readFile(path, 'utf8');
}

async function listHtmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(entries.map(async (entry) => {
		const entryPath = path.join(directory, entry.name);
		return entry.isDirectory() ? listHtmlFiles(entryPath) : [entryPath];
	}));
	return files.flat().filter((file) => file.endsWith('.html'));
}

async function exists(pathname) {
	try {
		await access(pathname);
		return true;
	} catch {
		return false;
	}
}

const [home, contact, privacy, notFound, sitemap, robots] = await Promise.all([
	read('dist/index.html'),
	read('dist/contact/index.html'),
	read('dist/privacy/index.html'),
	read('dist/404.html'),
	read('dist/sitemap-0.xml'),
	read('dist/robots.txt')
]);

expect(
	home.includes('<link rel="canonical" href="https://geminialuminum.org/">'),
	'Homepage canonical URL is missing or incorrect.'
);
expect(
	contact.includes('<link rel="canonical" href="https://geminialuminum.org/contact/">'),
	'Contact canonical URL is missing or incorrect.'
);
expect(contact.includes('content="index, follow'), 'Contact page must remain indexable.');
expect(!contact.includes('Loading...'), 'Contact page contains JavaScript-only placeholder content.');
expect(privacy.includes('content="noindex, follow'), 'Privacy page should remain intentionally noindexed.');
expect(notFound.includes('content="noindex, follow'), '404 page must be noindexed.');

for (const excludedPath of ['/privacy/', '/service-areas/', '/404/']) {
	expect(
		!sitemap.includes(`https://geminialuminum.org${excludedPath}`),
		`Sitemap contains excluded URL: ${excludedPath}`
	);
}

for (const requiredPath of ['/', '/about/', '/contact/', '/projects/', '/services/', '/team/']) {
	expect(
		sitemap.includes(`<loc>https://geminialuminum.org${requiredPath}</loc>`),
		`Sitemap is missing canonical URL: ${requiredPath}`
	);
}

expect(!robots.includes('Disallow: /assets/'), 'robots.txt blocks built CSS and JavaScript.');
expect(!robots.includes('Disallow: /_astro/'), 'robots.txt blocks Astro assets.');
expect(!robots.includes('Disallow: /service-areas/'), 'robots.txt blocks redirect discovery.');
expect(
	robots.includes('Sitemap: https://geminialuminum.org/sitemap-index.xml'),
	'robots.txt does not advertise the sitemap index.'
);

for (const htmlPath of await listHtmlFiles('dist')) {
	const markup = await read(htmlPath);
	for (const match of markup.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
		const href = match[1];
		if (href.startsWith('//')) {
			failures.push(`${htmlPath} contains a protocol-relative link: ${href}`);
			continue;
		}
		if (!href.startsWith('/')) continue;

		const pathname = href.split(/[?#]/, 1)[0];
		if (pathname !== '/' && !pathname.endsWith('/') && !path.extname(pathname)) {
			failures.push(`${htmlPath} links through an avoidable trailing-slash redirect: ${href}`);
		}
		const relativePath = pathname.replace(/^\/+/, '');
		const target = pathname === '/'
			? path.join('dist', 'index.html')
			: pathname.endsWith('/')
				? path.join('dist', relativePath, 'index.html')
				: path.join('dist', relativePath);

		expect(await exists(target), `${htmlPath} links to missing build output: ${href}`);
	}
}

if (failures.length > 0) {
	console.error('\nSEO validation failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log('SEO validation passed: canonical, robots, noindex, and sitemap signals are consistent.');
