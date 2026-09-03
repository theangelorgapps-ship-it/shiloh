import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const app = read('src/App.tsx');
const builtPasses = read('dist/component2.html');
const vipOptions = app.slice(app.indexOf('const vipPassOptions'), app.indexOf('function VipFeatureText'));

const checks = [
  ['React VIP options exclude Prophetic Retreat', !vipOptions.includes("label: 'Prophetic Retreat'")],
  ['React VIP options exclude Shiloh Ultimate', !vipOptions.includes("label: 'VIP Ultimate Passes'")],
  ['Built passes page excludes Prophetic Retreat tab', !builtPasses.includes('data-pages="retreat"')],
  ['Built passes page excludes Shiloh Ultimate tab', !builtPasses.includes('data-pages="ultimate"')],
  ['Built passes page defaults to Shiloh VIP', builtPasses.includes("const state = { pages: 'shiloh', transport: 'free' }")],
  ['Shiloh VIP remains available', vipOptions.includes("label: 'Shiloh VIP'") && builtPasses.includes('data-pages="shiloh"')],
  ['Birthday VVIP remains available', vipOptions.includes("label: 'Birthday VVIP'") && builtPasses.includes('data-pages="birthday"')],
];

for (const [label, passed] of checks) {
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}`);
}

if (checks.some(([, passed]) => !passed)) {
  process.exitCode = 1;
}
