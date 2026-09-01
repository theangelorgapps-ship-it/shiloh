import fs from 'node:fs';

const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const headersFile = fs.readFileSync('public/_headers', 'utf8');

const rootHeaders = vercel.headers?.find((rule) => rule.source === '/(.*)')?.headers ?? [];
const vercelCsp = rootHeaders.find((header) => header.key.toLowerCase() === 'content-security-policy')?.value;
const permissionsPolicy = rootHeaders.find((header) => header.key.toLowerCase() === 'permissions-policy')?.value;
const staticCsp = headersFile.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1];
const staticPermissionsPolicy = headersFile.match(/^\s*Permissions-Policy:\s*(.+)$/m)?.[1];

const requiredSources = {
  'script-src': [
    'https://donorbox.org',
    'https://js.stripe.com',
    'https://*.js.stripe.com',
    'https://jspm.dev',
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://*.venmo.com',
  ],
  'style-src': ['https://*.paypal.com', 'https://*.paypalobjects.com', 'https://*.venmo.com'],
  'img-src': ['https://*.stripe.com', 'https://*.link.com', 'https://*.paypal.com', 'https://*.paypalobjects.com'],
  'frame-src': [
    'https://js.stripe.com',
    'https://*.js.stripe.com',
    'https://hooks.stripe.com',
    'https://link.com',
    'https://*.link.com',
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://*.venmo.com',
  ],
  'connect-src': [
    'https://api.stripe.com',
    'https://*.stripe.com',
    'https://*.stripe.network',
    'https://link.com',
    'https://*.link.com',
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://*.venmo.com',
  ],
};

function parseCsp(value, label) {
  if (!value) {
    throw new Error(`${label} is missing`);
  }

  return new Map(
    value.split(';').map((directive) => {
      const [name, ...sources] = directive.trim().split(/\s+/);
      return [name, new Set(sources)];
    }),
  );
}

function validateCsp(value, label) {
  const directives = parseCsp(value, label);

  for (const [directive, required] of Object.entries(requiredSources)) {
    const configured = directives.get(directive) ?? new Set();
    for (const source of required) {
      if (!configured.has(source)) {
        throw new Error(`${label}: ${directive} must allow ${source}`);
      }
    }
  }
}

function validatePermissionsPolicy(value, label) {
  if (!value?.includes('payment=(')) {
    throw new Error(`${label} must define the payment permission`);
  }

  for (const origin of ['https://donorbox.org', 'https://js.stripe.com', 'https://www.paypal.com']) {
    if (!value.includes(`"${origin}"`)) {
      throw new Error(`${label}: payment must allow ${origin}`);
    }
  }
}

validateCsp(vercelCsp, 'vercel.json CSP');
validateCsp(staticCsp, 'public/_headers CSP');
validatePermissionsPolicy(permissionsPolicy, 'vercel.json Permissions-Policy');
validatePermissionsPolicy(staticPermissionsPolicy, 'public/_headers Permissions-Policy');

console.log('Donorbox payment CSP checks passed');
