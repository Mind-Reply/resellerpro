const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

describe('repository integrity', () => {
  test('keeps the canonical source and lockfile present', () => {
    expect(fs.existsSync(path.join(root, 'src/app/page.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'package-lock.json'))).toBe(true);
  });

  test('does not embed credential-like literals in the public entrypoint', () => {
    const source = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8');
    expect(source).not.toMatch(/sk_(live|test)_|whsec_|password\s*[:=]/i);
  });
});
