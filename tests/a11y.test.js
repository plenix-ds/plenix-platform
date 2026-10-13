// Plenix tests · accessibility: axe-core (WCAG 2.2 A and AA rules) on every app page and on the design system's pages
// for the built components. Known issues are kept in tests/baselines/a11y.json (page → rule → number of elements); the
// test fails only on a rule that is new on a page or affects more elements than recorded, so issues can only go down.
//   node tests/a11y.test.js            compare
//   node tests/a11y.test.js --update   record the current issues as the baseline (after fixing some, to lower it)
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep } = require('./lib.js');
const PORT = 8791, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const BASELINE = path.join(__dirname, 'baselines', 'a11y.json');

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const APP_PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html'])
  // the settings screens beyond each page's first (owner, 2026-10-13: every settings page is cards of rows; the settings-cards rule)
  .concat(['settings/index.html#/account', 'settings/index.html#/appearance', 'settings/index.html#/categories', 'settings/index.html#/docs/data-model',
    'dam/settings-system.html#/users', 'dam/settings-system.html#/permissions', 'dam/settings-myaccount.html#/preferences']);

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const run = async () => {
    // axe in its own scope: the pages' own module setup must not capture it
    // axe loaded as a file from the test server (inline, the design system's page fails to parse it)
    if (!(await page.evaluate(() => !!window.axe))) await page.addScriptTag({ url: BASE + 'node_modules/axe-core/axe.min.js' });
    return page.evaluate(async (tags) => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] });
      const out = {}; r.violations.forEach((v) => { out[v.id] = { n: v.nodes.length, impact: v.impact, help: v.help, target: v.nodes[0] && String(v.nodes[0].target) }; });
      return out;
    }, TAGS);
  };
  const found = {};
  for (const a of APP_PAGES) { await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(800); found[a] = await run(); }
  // the design system is a submodule (plenix-design-system): without it, only the apps are tested
  const HAS_DS = require('fs').existsSync(require('path').join(__dirname, '..', 'platform', 'design-system', 'index.html'));
  if (!HAS_DS) console.log('NOTE: platform/design-system is not checked out; its pages are skipped');
  if (HAS_DS) await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); if (HAS_DS) await sleep(1500);
  if (HAS_DS) found['design-system home'] = await run();
  const routes = !HAS_DS ? [] : await page.evaluate(() => window.DSInventory.map((r) => '#/' + r.sec + '/' + r.id));
  for (const r of routes) { await page.evaluate((h) => { location.hash = h; }, r); await sleep(500); found['design-system ' + r] = await run(); }
  await browser.close(); server.close();

  const total = Object.values(found).reduce((n, p) => n + Object.values(p).reduce((m, v) => m + v.n, 0), 0);
  if (process.argv.includes('--update')) {
    const base = {}; Object.keys(found).forEach((p) => { if (Object.keys(found[p]).length) base[p] = Object.fromEntries(Object.entries(found[p]).map(([k, v]) => [k, v.n])); });
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true }); fs.writeFileSync(BASELINE, JSON.stringify(base, null, 1) + '\n');
    const rules = {}; Object.values(found).forEach((p) => Object.entries(p).forEach(([k, v]) => { rules[k] = rules[k] || { n: 0, pages: 0, impact: v.impact, help: v.help }; rules[k].n += v.n; rules[k].pages++; }));
    Object.entries(rules).sort((a, b) => b[1].n - a[1].n).forEach(([k, v]) => console.log('  ' + k + ' (' + v.impact + '): ' + v.n + ' elements on ' + v.pages + ' pages · ' + v.help));
    console.log('A11Y_BASELINE written: ' + total + ' elements in ' + Object.keys(base).length + ' of ' + Object.keys(found).length + ' pages');
    return;
  }
  const base = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
  const worse = []; let better = 0;
  Object.keys(found).forEach((p) => Object.entries(found[p]).forEach(([k, v]) => { const was = (base[p] || {})[k] || 0; if (v.n > was) worse.push(p + ': ' + k + ' (' + v.impact + ') ' + was + ' -> ' + v.n + ' · ' + v.help + ' · e.g. ' + v.target); }));
  Object.keys(base).filter((p) => found[p]).forEach((p) => Object.entries(base[p]).forEach(([k, n]) => { if ((found[p][k] || { n: 0 }).n < n) better++; }));
  worse.forEach((w) => console.log('  NEW ' + w));
  if (better) console.log('  ' + better + ' known issues went down: run with --update to lower the baseline');
  console.log((worse.length ? 'A11Y_FAIL ' + worse.length + ' new issues; ' : 'A11Y_OK ') + total + ' known elements on ' + Object.keys(found).length + ' pages');
  process.exit(worse.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
