import { readFileSync } from 'node:fs';
import { readdirSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const analytics = read('src/analytics.ts');
const app = read('src/App.tsx');
const html = read('index.html');
const vercel = read('vercel.json');
const builtAssets = readdirSync(new URL('../dist/assets/', import.meta.url))
  .filter((name) => name.endsWith('.js'))
  .map((name) => read(`dist/assets/${name}`))
  .join('\n');

const assertions = [
  ['Google Ads base tag', html.includes('gtag/js?id=AW-994462220')],
  ['Consent Mode default', html.includes("window.gtag('consent', 'default'")],
  ['Registration conversion label', analytics.includes('-_kFCMmqqtkcEIyUmdoD')],
  ['Sponsor lead conversion label', analytics.includes('914TCPSns9kcEIyUmdoD')],
  ['Sponsor purchase conversion label', analytics.includes('3_G6CO-ErNEcEIyUmdoD')],
  ['Registration success wiring', app.includes('trackRegistrationLead(registrationType)')],
  ['Sponsor lead success wiring', app.includes('trackSponsorLead()')],
  ['Sponsor purchase wiring', app.includes('trackSponsorPurchase(payment.transactionId')],
  ['GHL attribution decoration', app.includes("appendCampaignAttribution('https://crm.goodnewsworld.com/widget/form/WBglmsiMfAfsGPSlyekb')")],
  ['Zoho attribution decoration', app.includes('appendCampaignAttribution(registrationUrl)')],
  ['Registration modal remains scrollable', app.includes('min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white p-2')],
  ['Direct Baptism registration route', app.includes("normalizedPathname !== '/baptism'") && app.includes("href: '/baptism'")],
  ['Merch checkout event', app.includes('trackMerchCheckout(subtotal, itemCount)')],
  ['Google Ads CSP support', vercel.includes('https://www.googleadservices.com') && vercel.includes('https://stats.g.doubleclick.net')],
  ['Production bundle contains registration label', builtAssets.includes('-_kFCMmqqtkcEIyUmdoD')],
  ['Production bundle contains sponsor lead label', builtAssets.includes('914TCPSns9kcEIyUmdoD')],
  ['Production bundle contains sponsor purchase label', builtAssets.includes('3_G6CO-ErNEcEIyUmdoD')],
];

const failed = assertions.filter(([, passed]) => !passed);
for (const [name, passed] of assertions) console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`);
if (failed.length) process.exitCode = 1;
