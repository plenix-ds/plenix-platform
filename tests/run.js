// Plenix tests · runs the tests one after another and times each (owner, 2026-10-13): by default in changed mode, only
// the checks for what changed (tests/changed.js); --full runs every page, the final gate when everything is marked complete.
// Every test runs even after one fails; the exit code is 1 when any failed.
//   node tests/run.js                      every test, changed mode (npm test)
//   node tests/run.js --full               every test, every page (npm run test:full)
//   node tests/run.js pages a11y           only these tests (the CI matrix groups)
const path = require('path');
const { spawnSync } = require('child_process');

const ALL = ['visual', 'density', 'layout', 'theme', 'pages', 'keyboard', 'a11y', 'data-grid', 'typography', 'labs', 'reflow', 'targets',
  'contrast', 'formats', 'utilities', 'high-contrast', 'focus-order', 'semantic-html', 'navigation', 'brand-rules', 'login', 'selector-kinds', 'zero-overlap', 'types'];
const args = process.argv.slice(2);
const full = args.includes('--full');
const names = args.filter((a) => !/^--/.test(a));
const bad = names.filter((n) => ALL.indexOf(n) < 0);
if (bad.length) { console.error('No such test: ' + bad.join(', ') + ' (tests: ' + ALL.join(', ') + ')'); process.exit(2); }
const env = Object.assign({}, process.env, full ? { TEST_SCOPE: 'full' } : {});
const failed = [], times = [];
const t0 = Date.now();
for (const n of names.length ? names : ALL) {
  const t = Date.now();
  console.log('\n── ' + n + (full ? ' (full)' : ''));
  const r = spawnSync(process.execPath, [path.join(__dirname, n + '.test.js')], { stdio: 'inherit', env });
  const s = ((Date.now() - t) / 1000).toFixed(1);
  times.push(n + ' ' + s + 's');
  if (r.status !== 0) failed.push(n);
}
console.log('\nTIMES ' + times.join(' · ') + ' · total ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');
console.log(failed.length ? 'TESTS_FAIL ' + failed.join(', ') : 'TESTS_OK ' + (names.length || ALL.length) + ' tests');
process.exit(failed.length ? 1 : 0);
