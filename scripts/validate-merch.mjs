import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = new URL('../dist/', import.meta.url);
const assetsDir = new URL('./assets/', distDir);
const merchPage = new URL('./merch/index.html', distDir);
const baptismPage = new URL('./merch/baptism-gown/index.html', distDir);
const baptismRegistrationPage = new URL('./baptism/index.html', distDir);

const javascriptAssets = readdirSync(assetsDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(join(fileURLToPath(assetsDir), file), 'utf8'))
  .join('\n');

const checks = [
  ['Merch collection page is pre-rendered', existsSync(merchPage)],
  ['Baptism product page is pre-rendered', existsSync(baptismPage)],
  ['Baptism registration route is pre-rendered', existsSync(baptismRegistrationPage)],
  ['Baptism product is included in the client bundle', javascriptAssets.includes('baptism-gown')],
  ['Baptism collection is included in the client bundle', javascriptAssets.includes('BAPTISM')],
  ['Baptism Set label is included in the client bundle', javascriptAssets.includes('Baptism Set')],
];

for (const [label, passed] of checks) {
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}`);
}

if (checks.some(([, passed]) => !passed)) {
  process.exitCode = 1;
}
