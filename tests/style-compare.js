// Plenix tests · before/after computed-style comparison of two copies of the repository: every element of each page
// (every app page, and the chosen design system routes with their examples and forced-state samples), its computed
// values for the design properties. Proves a refactor (moving values into tokens) changes nothing, also where a change
// would be too small to see in pixels.
//   node tests/style-compare.js <before-root> [<after-root>=this repo] [--routes "#/a/b,#/c/d"] [--apps] [--scope ".ds-live"]
//   --scope: only the matching elements and the elements inside them (e.g. the live examples, without the documentation around them)
const fs = require('fs');
const path = require('path');
const http = require('http');
const { launch, sleep, ROOT } = require('./lib.js');
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const roots = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const BEFORE = path.resolve(roots[0]), AFTER = path.resolve(roots[1] || ROOT);
const ROUTES = (opt('--routes') || '').split(',').filter(Boolean);
const SCOPE = opt('--scope');
const APPS = args.includes('--apps') ? ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']) : [];
const PROPS = ['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'border-top-width', 'border-right-width',
  'border-bottom-width', 'border-left-width', 'border-top-style', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
  'box-shadow', 'outline-color', 'outline-style', 'outline-width', 'outline-offset', 'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
  'min-height', 'height', 'width', 'min-width', 'max-width', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-right',
  'margin-bottom', 'margin-left', 'column-gap', 'row-gap', 'opacity', 'transform', 'transition-duration', 'animation-duration', 'text-decoration-line', 'cursor', 'display'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.jsx': 'text/plain', '.md': 'text/plain' };
const serveRoot = (root, port) => new Promise((resolve) => {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    if (!rel.startsWith('/Plenix/')) { res.writeHead(404); res.end(); return; }
    let f = path.join(root, rel.slice(8));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res);
  });
  s.listen(port, '127.0.0.1', () => resolve(s));
});
const FREEZE = '*,*::before,*::after{animation-play-state:paused !important;caret-color:transparent !important}';
(async () => {
  const [a, b] = [await serveRoot(BEFORE, 8801), await serveRoot(AFTER, 8802)];
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const snap = async (port, pg) => {
    const url = 'http://127.0.0.1:' + port + '/Plenix/' + (pg.startsWith('#') ? 'platform/design-system/' + pg : pg);
    await page.goto('about:blank'); await page.goto(url, { waitUntil: 'networkidle0' });
    // the page has settled when its element count holds steady (the design system draws its examples after loading files)
    let last = -1, same = 0;
    for (let i = 0; i < 40 && same < 4; i++) { await sleep(300); const n = await page.evaluate(() => document.querySelectorAll('*').length); same = n === last ? same + 1 : 0; last = n; }
    await page.addStyleTag({ content: FREEZE }); await sleep(200);
    return page.evaluate((PROPS, SCOPE) => {
      const out = [], els = SCOPE ? [...new Set([...document.querySelectorAll(SCOPE)].flatMap((s) => [s, ...s.querySelectorAll('*')]))] : [...(document.querySelector('main') || document.body).querySelectorAll('*')];
      els.forEach((el, i) => {
        if (el.closest('svg') && el.tagName !== 'svg') return;
        const cs = getComputedStyle(el); const v = {};
        for (const p of PROPS) v[p] = cs.getPropertyValue(p);
        out.push([el.tagName + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '') + '#' + i, v]);
      });
      return out;
    }, PROPS, SCOPE);
  };
  let pagesDiff = 0, total = 0;
  for (const pg of APPS.concat(ROUTES)) {
    const x = await snap(8801, pg), y = await snap(8802, pg);
    const diffs = [];
    if (x.length !== y.length) diffs.push('element count ' + x.length + ' -> ' + y.length);
    else x.forEach(([k, v], i) => { const w = y[i][1]; total += PROPS.length; for (const p of PROPS) if (v[p] !== w[p]) diffs.push(k + ' ' + p + ': ' + v[p] + ' -> ' + w[p]); });
    if (diffs.length) pagesDiff++;
    console.log((diffs.length ? 'DIFF ' : 'SAME ') + pg + ' (' + x.length + ' elements)' + (diffs.length ? '\n     ' + diffs.slice(0, 6).join('\n     ') : ''));
  }
  await browser.close(); a.close(); b.close();
  console.log((pagesDiff ? 'STYLES_DIFF ' + pagesDiff + ' pages' : 'STYLES_SAME') + ' (' + total + ' values compared)');
  process.exit(pagesDiff ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
