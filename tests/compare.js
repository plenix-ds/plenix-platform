// Plenix tests · before/after pixel comparison of two copies of the repository (e.g. the last commit built in a worktree,
// and the working tree): every app page and the chosen design system routes, animations frozen, full page.
//   node tests/compare.js <before-root> [<after-root>=this repo] [--routes "#/a/b,#/c/d"] [--out <dir>]
// Prints SAME or DIFF (pixel count and the box) per page; with --out, saves both shots of each page that differs.
const fs = require('fs');
const path = require('path');
const http = require('http');
const { launch, sleep, ROOT } = require('./lib.js');
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const roots = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const BEFORE = path.resolve(roots[0]), AFTER = path.resolve(roots[1] || ROOT);
const OUT = opt('--out');
const ROUTES = (opt('--routes') || '').split(',').filter(Boolean);
const APP_PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.jsx': 'text/plain', '.md': 'text/plain' };
const serveRoot = (root, port) => new Promise((resolve) => {
  const s = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (!rel.startsWith('/Plenix/')) { res.writeHead(404); res.end(); return; }
    let f = path.join(root, rel.slice(8));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res);
  });
  s.listen(port, '127.0.0.1', () => resolve(s));
});
const FREEZE = '*,*::before,*::after{animation:none !important;transition:none !important;caret-color:transparent !important}';
(async () => {
  const [a, b] = [await serveRoot(BEFORE, 8795), await serveRoot(AFTER, 8796)];
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const shot = async (port, pg) => {
    const url = 'http://127.0.0.1:' + port + '/Plenix/' + (pg.startsWith('#') ? 'platform/design-system/' + pg : pg);
    await page.goto('about:blank'); await page.goto(url, { waitUntil: 'networkidle0' }); await page.evaluate(() => document.fonts.ready); await sleep(1500);
    await page.addStyleTag({ content: FREEZE }); await sleep(300);
    return Buffer.from(await page.screenshot({ fullPage: true, captureBeyondViewport: true }));
  };
  let diffs = 0;
  for (const pg of APP_PAGES.concat(ROUTES)) {
    const x = await shot(8795, pg), y = await shot(8796, pg);
    // identical files are the same page: only pages that differ are compared pixel by pixel (slow on a long page)
    const r = x.equals(y) ? 0 : await page.evaluate(async (s1, s2) => {
      const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + s; });
      const [p, q] = await Promise.all([load(s1), load(s2)]);
      if (p.width !== q.width || p.height !== q.height) return 'size ' + p.width + 'x' + p.height + ' -> ' + q.width + 'x' + q.height;
      const c = document.createElement('canvas'); c.width = p.width; c.height = p.height; const g = c.getContext('2d');
      g.drawImage(p, 0, 0); const d1 = g.getImageData(0, 0, c.width, c.height).data; g.clearRect(0, 0, c.width, c.height); g.drawImage(q, 0, 0); const d2 = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      for (let k = 0; k < d1.length; k += 4) if (d1[k] !== d2[k] || d1[k + 1] !== d2[k + 1] || d1[k + 2] !== d2[k + 2]) { n++; const t = k / 4, xx = t % c.width, yy = Math.floor(t / c.width); x0 = Math.min(x0, xx); y0 = Math.min(y0, yy); x1 = Math.max(x1, xx); y1 = Math.max(y1, yy); }
      return n ? n + ' px in ' + [x0, y0, x1, y1].join(',') : 0;
    }, x.toString('base64'), y.toString('base64'));
    if (r) { diffs++; if (OUT) { fs.mkdirSync(OUT, { recursive: true }); const n = pg.replace(/[^\w.-]+/g, '_'); fs.writeFileSync(path.join(OUT, n + '.before.png'), x); fs.writeFileSync(path.join(OUT, n + '.after.png'), y); } }
    console.log((r ? 'DIFF ' : 'SAME ') + pg + (r ? ' (' + r + ')' : ''));
  }
  await browser.close(); a.close(); b.close();
  console.log(diffs ? 'COMPARE_DIFF ' + diffs : 'COMPARE_SAME');
})().catch((e) => { console.error(e); process.exit(1); });
