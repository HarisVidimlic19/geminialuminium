/**
 * IndexNow Submission Script
 * 
 * Pings Bing (and all IndexNow-participating search engines) whenever
 * you deploy updated content. Run after build:
 *   node scripts/indexnow.js
 * 
 * Docs: https://www.indexnow.org/documentation
 */

import https from 'https';

const CONFIG = {
    host: 'geminialuminum.org',
    key: '92b7b47fd15e438f882a05cc2a545788',
    keyLocation: 'https://geminialuminum.org/92b7b47fd15e438f882a05cc2a545788.txt',
    // IndexNow endpoint - Bing shares with Yandex, Seznam, Naver, etc.
    searchEngine: 'api.indexnow.org',
};

// All pages on the site
const URLS = [
    'https://geminialuminum.org/',
    'https://geminialuminum.org/services/',
    'https://geminialuminum.org/projects/',
    'https://geminialuminum.org/team/',
    'https://geminialuminum.org/about/',
    'https://geminialuminum.org/contact/',
    'https://geminialuminum.org/privacy/',
];

async function submitToIndexNow() {
    const payload = JSON.stringify({
        host: CONFIG.host,
        key: CONFIG.key,
        keyLocation: CONFIG.keyLocation,
        urlList: URLS,
    });

    return new Promise((resolve, reject) => {
        const options = {
            hostname: CONFIG.searchEngine,
            port: 443,
            path: '/IndexNow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(payload),
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const status = res.statusCode;
                if (status === 200) {
                    console.log('IndexNow: OK - All URLs submitted successfully');
                } else if (status === 202) {
                    console.log('IndexNow: Accepted - URLs received, key validation pending');
                } else if (status === 400) {
                    console.error('IndexNow: Bad Request - Invalid format');
                    console.error('Response:', data);
                } else if (status === 403) {
                    console.error('IndexNow: Forbidden - Key not valid or mismatched');
                } else if (status === 422) {
                    console.error('IndexNow: Unprocessable - URLs don\'t belong to the host');
                } else if (status === 429) {
                    console.error('IndexNow: Too Many Requests - Try again later');
                } else {
                    console.error(`IndexNow: Unexpected status ${status}`);
                    console.error('Response:', data);
                }
                resolve(status);
            });
        });

        req.on('error', (err) => {
            console.error('IndexNow: Network error -', err.message);
            reject(err);
        });

        req.write(payload);
        req.end();
    });
}

console.log(`Submitting ${URLS.length} URLs to IndexNow...`);
console.log('Endpoint:', `https://${CONFIG.searchEngine}/IndexNow`);
console.log('URLs:', URLS.join('\n       '));
console.log('');

submitToIndexNow()
    .then((status) => {
        if (status === 200 || status === 202) {
            console.log('\nDone! Bing, Yandex, Seznam, and Naver have been notified.');
        }
    })
    .catch(() => process.exit(1));
