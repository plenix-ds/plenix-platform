#!/usr/bin/env node
// tools/build-test-parts.js: writes tests/parts.json, the parts (components) of each test that uses the shared check helper
// (tests/check.js). It reads the test files only; it runs no test.
//   node tools/build-test-parts.js            writes tests/parts.json
//   node tools/build-test-parts.js --check    exits 1 when tests/parts.json is not what the test files say now
// A part is the text before the first ": " of a check's name, when the name starts with a string literal that holds it
// (check('Toolbar: Arrow Right moves …', …)). Names built at run time ('…' + x + ': …') are counted as "named at run time".
// The parts are what `node tests/run.js <test>:<Part>,<Part>` accepts (TEST_ONLY).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tests', 'parts.json');
const files = fs.readdirSync(path.join(ROOT, 'tests')).filter((f) => f.endsWith('.test.js')).sort()
  .filter((f) => /require\('\.\/check\.js'\)/.test(fs.readFileSync(path.join(ROOT, 'tests', f), 'utf8')));

const tests = {};
for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, 'tests', f), 'utf8');
  const counts = new Map(); let unparted = 0, runtime = 0;
  // every call of the test's own check(…): its first argument, when it starts with a string literal
  for (const m of src.matchAll(/(?<![\w.])check\(\s*(['"`])((?:\\.|(?!\1).)*)\1(\s*\+)?/g)) {
    const lit = m[2], joined = !!m[3], i = lit.indexOf(': ');
    if (i > 0) { const part = lit.slice(0, i).trim(); counts.set(part, (counts.get(part) || 0) + 1); }
    else if (joined) runtime++;
    else unparted++;
  }
  for (const m of src.matchAll(/(?<![\w.])check\(\s*[A-Za-z_$(]/g)) runtime++;   // a name that starts with a variable
  tests[f.replace(/\.test\.js$/, '')] = {
    parts: [...counts].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([part, checks]) => ({ part, checks })),
    checksWithoutPart: unparted,
    checksNamedAtRunTime: runtime,
  };
}
const json = JSON.stringify({ $description: 'The parts (components) of each test, read from its check names by tools/build-test-parts.js (no test runs). node tests/run.js <test>:<Part>,<Part> runs only those parts. The dashboard\'s Run tests window will offer them.', tests }, null, 1) + '\n';
if (process.argv.includes('--check')) {
  const now = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (now !== json) { console.log('PARTS_STALE: run node tools/build-test-parts.js'); process.exit(1); }
  console.log('PARTS_OK'); process.exit(0);
}
fs.writeFileSync(OUT, json);
console.log('tests/parts.json: ' + Object.keys(tests).map((t) => t + ' ' + tests[t].parts.length).join(', '));
