#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const production = process.env.NODE_ENV === 'production';
const failures = [];
const warnings = [];

const requiredFiles = ['package.json', 'next.config.ts', 'src/app/page.tsx', '.env.example'];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing required file: ${file}`);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
for (const script of ['build', 'type-check', 'validate', 'check:production-config']) {
  if (!packageJson.scripts?.[script]) failures.push(`missing package script: ${script}`);
}

const envExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
const placeholderPatterns = [/your_.*(key|secret|token|password)/i, /change_in_production/i, /^sk_test_your_/m, /^whsec_your_/m];
if (production && placeholderPatterns.some((pattern) => pattern.test(envExample))) {
  warnings.push('placeholders remain in .env.example; verify the runtime environment does not use them');
}

const productionSecrets = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
if (production) {
  for (const name of productionSecrets) {
    const value = process.env[name];
    if (!value) failures.push(`missing production environment variable: ${name}`);
    if (value && /your_|change_in_production|localhost/i.test(value)) failures.push(`unsafe production value for: ${name}`);
  }
}

if (failures.length) {
  console.error('production config check: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`production config check: PASS (${production ? 'production' : 'static'} mode)`);
for (const warning of warnings) console.warn(`- warning: ${warning}`);
