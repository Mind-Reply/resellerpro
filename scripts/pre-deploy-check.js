#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const failures = [];

for (const file of ['package.json', 'package-lock.json', 'next.config.ts', 'tsconfig.json', 'src/app/page.tsx']) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing required file: ${file}`);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!packageJson.private) failures.push('package must remain private');
if (packageJson.scripts?.build !== 'next build') {
  failures.push('build script must run the canonical Next.js build');
}

const source = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8');
if (/sk_(live|test)_|whsec_|password\s*[:=]/i.test(source)) {
  failures.push('source contains a credential-like literal');
}

if (failures.length) {
  console.error('pre-deploy check: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('pre-deploy check: PASS');
