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
const iframePosition = seedHtml.indexOf('src="https://donorbox.org/embed/shiloh2026-payments?"');
const widgetPosition = seedHtml.indexOf('src="https://donorbox.org/widget.js"');
const seedHeaders = vercel.headers?.find((rule) => rule.source === '/seed')?.headers ?? [];

const checks = [
  [
    seedHtml.includes('<meta name="robots" content="noindex, nofollow, noarchive"'),
    'SEED page must include a noindex robots directive',
  ],
  [
    seedHtml.includes('<script async src="https://donorbox.org/widget.js" paypalExpress="true">'),
    'SEED page must load the Donorbox widget asynchronously with PayPal Express enabled',
  ],
  [
    seedHtml.includes('src="https://donorbox.org/embed/shiloh2026-payments?"'),
    'SEED page must use the requested Donorbox campaign',
  ],
  [seedHtml.includes('allow="payment"'), 'SEED iframe must allow payment'],
  [
    iframePosition >= 0 && widgetPosition > iframePosition,
    'SEED iframe must be discovered before the Donorbox widget script',
  ],
  [
    seedHtml.includes('loading="eager"') && seedHtml.includes('fetchpriority="high"'),
    'SEED iframe must be loaded eagerly at high priority',
  ],
  [
    ['https://donorbox.org', 'https://js.stripe.com'].every((origin) =>
      seedHtml.includes(`<link rel="preconnect" href="${origin}" />`),
    ) && ['//www.paypal.com', '//www.recaptcha.net'].every((origin) =>
      seedHtml.includes(`<link rel="dns-prefetch" href="${origin}" />`),
    ),
    'SEED page must warm the critical checkout connections without excessive preconnects',
  ],
  [!sitemap.toLowerCase().includes('/seed'), 'SEED page must not appear in the public sitemap'],
  [!app.toLowerCase().includes('/seed'), 'SEED page must not appear in application navigation'],
  [
    seedHeaders.some(
      (header) => header.key.toLowerCase() === 'x-robots-tag' && header.value.toLowerCase().includes('noindex'),
    ),
    'Vercel must send an X-Robots-Tag noindex header for /seed',
  ],
  [
    seedHeaders.some(
      (header) => header.key.toLowerCase() === 'cache-control' && header.value.includes('max-age=300'),
    ),
    'Vercel must permit short browser caching for the static SEED shell',
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

console.log('SEED optimization checks passed');
