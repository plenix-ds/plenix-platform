// Plenix tests · runs the tests one after another and times each (owner, 2026-10-13): by default in changed mode, only
// the checks for what changed (tests/changed.js); --full runs every page, the final gate when everything is marked complete.
// Every test runs even after one fails; the exit code is 1 when any failed.
//   node tests/run.js                      every automatic test, changed mode (npm test)
//   node tests/run.js --full               every automatic test, every page (npm run test:full)
//   node tests/run.js pages typography     only these tests (the CI matrix groups)
//   node tests/run.js keyboard:Toolbar,Tabs pages   only some parts of a test: the checks whose name starts with "Toolbar:" or
//                                          "Tabs:" (tests/check.js, TEST_ONLY); the test still runs once. tests/parts.json lists each
//                                          test's parts. TEST_RESULTS=<file> collects every counted check (tools/file-failures.js)
//   node tests/run.js --on-demand          the on-demand tests only (npm run test:on-demand; add --full for every page)
// Where (owner, 2026-10-25: "make the test site ... no longer using the design spec for testing"): the browser tests open the
// St. John the Beloved test site (test-site/, tests/site.js) and the suite applications, never the design spec.
// On demand (owner, 2026-10-25: "Reserve only for as on demand test by owner and take out from the tests"):
// accessibility, high contrast, color contrast, themes and density run only when the owner asks for them, never in
// the automatic runs (npm test, the per-push CI, the full suite). Each still runs by name: node tests/run.js a11y
const path = require('path');
const { spawnSync } = require('child_process');

const AUTOMATIC = ['site-coverage', 'visual', 'layout', 'pages', 'keyboard', 'data-grid', 'typography', 'component-tokens', 'reflow',
  'formats', 'icon-safety', 'utilities', 'focus-order', 'semantic-html', 'navigation', 'one-primary', 'brand-rules', 'login', 'selector-kinds', 'zero-overlap', 'types', 'fill-693',
  // the ECharts charts and sparklines (owner, codex-q3-27: they join the automatic check; #382 F9)
  'charts-echarts-353', 'sparkline-echarts-353', 'treechart-echarts'];
const ON_DEMAND = ['a11y', 'high-contrast', 'contrast', 'theme', 'density'];
// the design spec's own checks, by name only: the spec's component labs (its Edit dialog's tokens) belong to the spec
// (platform/design-system), which loads Plenix from the CDN; the automatic runs never open the spec (owner, 2026-10-25)
const SPEC_ONLY = ['labs'];
const ALL = AUTOMATIC.concat(ON_DEMAND, SPEC_ONLY);
const args = process.argv.slice(2);
const full = args.includes('--full');
const onDemand = args.includes('--on-demand');
// a name may carry its parts: keyboard:Toolbar,Tabs (the parts are passed to that test only, as TEST_ONLY)
const parts = {};
const names = args.filter((a) => !/^--/.test(a)).map((a) => {
  const i = a.indexOf(':'); if (i < 0) return a;
  const n = a.slice(0, i); parts[n] = a.slice(i + 1).split(',').map((x) => x.trim()).filter(Boolean); return n;
});
const bad = names.filter((n) => ALL.indexOf(n) < 0);
if (bad.length) { console.error('No such test: ' + bad.join(', ') + ' (tests: ' + ALL.join(', ') + ')'); process.exit(2); }
const env = Object.assign({}, process.env, full ? { TEST_SCOPE: 'full' } : {});
const list = names.length ? names : onDemand ? ON_DEMAND : AUTOMATIC;
const failed = [], times = [];
const t0 = Date.now();
for (const n of list) {
  const t = Date.now();
  console.log('\n── ' + n + (full ? ' (full)' : ''));
  const only = parts[n] && parts[n].length ? parts[n].join(',') : '';
  if (only) console.log('   parts: ' + only);
  const r = spawnSync(process.execPath, [path.join(__dirname, n + '.test.js')], { stdio: 'inherit', env: Object.assign({}, env, { TEST_ONLY: only }) });
  const s = ((Date.now() - t) / 1000).toFixed(1);
  times.push(n + ' ' + s + 's');
  if (r.status !== 0) failed.push(n);
}
console.log('\nTIMES ' + times.join(' · ') + ' · total ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');
console.log(failed.length ? 'TESTS_FAIL ' + failed.join(', ') : 'TESTS_OK ' + list.length + ' tests');
process.exit(failed.length ? 1 : 0);
