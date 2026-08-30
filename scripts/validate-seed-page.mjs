import fs from 'node:fs';
import path from 'node:path';

const seedPath = path.resolve('public/seed/index.html');
const sitemapPath = path.resolve('public/sitemap.xml');
const appPath = path.resolve('src/App.tsx');
const vercelPath = path.resolve('vercel.json');

const seedHtml = fs.readFileSync(seedPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

const checks = [
  [
    seedHtml.includes('<meta name="robots" content="noindex, nofollow, noarchive"'),
    'SEED page must include a noindex robots directive',
  ],
  [
    seedHtml.includes('src="https://donorbox.org/widget.js"') && seedHtml.includes('paypalExpress="true"'),
    'SEED page must load the Donorbox widget with PayPal Express enabled',
  ],
  [
    seedHtml.includes('src="https://donorbox.org/embed/shiloh2026-payments?"'),
    'SEED page must use the requested Donorbox campaign',
  ],
  [seedHtml.includes('allow="payment"'), 'SEED iframe must allow payment'],
  [!sitemap.toLowerCase().includes('/seed'), 'SEED page must not appear in the public sitemap'],
  [!app.toLowerCase().includes('/seed'), 'SEED page must not appear in application navigation'],
  [
    vercel.headers?.some(
      (rule) =>
        rule.source === '/seed' &&
        rule.headers?.some(
          (header) => header.key.toLowerCase() === 'x-robots-tag' && header.value.toLowerCase().includes('noindex'),
        ),
    ),
    'Vercel must send an X-Robots-Tag noindex header for /seed',
  ],
  [
    vercel.headers?.some((rule) =>
      rule.headers?.some(
        (header) =>
          header.key.toLowerCase() === 'permissions-policy' &&
          header.value.includes('payment=(self "https://donorbox.org")'),
      ),
    ),
    'Vercel Permissions-Policy must permit payments for the Donorbox iframe',
  ],
  [
    vercel.redirects?.some(
      (rule) => rule.source === '/SEED' && rule.destination === '/seed' && rule.permanent === true,
    ),
    'Uppercase /SEED must redirect permanently to lowercase /seed',
  ],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`FAIL: ${failure}`);
  }
  process.exit(1);
}

console.log('SEED privacy checks passed');
