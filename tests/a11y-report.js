// Plenix tests · accessibility report (a work list, not a test): every axe-core violation grouped by rule and by the
// element it hits (its classes), with the colors and ratio for contrast, across the app pages and the design system.
//   node tests/a11y-report.js [rule]      e.g. node tests/a11y-report.js color-contrast
const { serve, launch, sleep } = require('./lib.js');
const PORT = 8793, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const ONLY = process.argv[2];
const APP_PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']);
(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const groups = {};
  const run = async (where) => {
    if (!(await page.evaluate(() => !!window.axe))) await page.addScriptTag({ url: BASE + 'node_modules/axe-core/axe.min.js' });
    const v = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] });
      return r.violations.map((x) => ({ id: x.id, impact: x.impact, nodes: x.nodes.map((n) => {
        const el = document.querySelector(n.target[0]);
        const cls = el ? [...el.classList].filter((c) => /^plx-|^ds-/.test(c)).slice(0, 3).join('.') || el.tagName.toLowerCase() : String(n.target);
        const d = (n.any[0] || n.all[0] || n.none[0] || {}).data || {};
        return { cls, text: el ? (el.textContent || '').trim().slice(0, 30) : '', fg: d.fgColor, bg: d.bgColor, ratio: d.contrastRatio, size: d.fontSize, msg: (n.failureSummary || '').split('\n').slice(1, 2).join(' ').trim().slice(0, 140) };
      }) }));
    });
    v.forEach((x) => { if (ONLY && x.id !== ONLY) return; x.nodes.forEach((n) => {
      const key = x.id + ' | ' + n.cls + (n.fg ? ' | ' + n.fg + ' on ' + n.bg + ' = ' + n.ratio + ' (' + n.size + ')' : '');
      const g = groups[key] = groups[key] || { n: 0, pages: new Set(), impact: x.impact, ex: n.text, msg: n.msg }; g.n++; g.pages.add(where);
    }); });
  };
  for (const a of APP_PAGES) { await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(800); await run(a); }
  await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500); await run('ds home');
  const routes = await page.evaluate(() => window.DSInventory.map((r) => '#/' + r.sec + '/' + r.id));
  for (const r of routes) { await page.evaluate((h) => { location.hash = h; }, r); await sleep(500); await run('ds ' + r); }
  await browser.close(); server.close();
  Object.entries(groups).sort((a, b) => b[1].n - a[1].n).forEach(([k, g]) => console.log(g.n + '× ' + k + ' · "' + g.ex + '" · ' + g.pages.size + ' pages, e.g. ' + [...g.pages][0] + (g.msg && !/contrast/.test(k) ? ' · ' + g.msg : '')));
})().catch((e) => { console.error(e); process.exit(1); });
