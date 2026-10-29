// Icon stage 5b (#551) proof: the record pages of the 12 changed components and the 10 application pages, photographed in
// the build before 5b and in this checkout, and the pixels that differ counted. A proof script, not a test: it is run
// only when the owner starts it.
//   1. The build before 5b, beside this checkout:
//        git worktree add ../plenix-5b-before a7de2929 && cd ../plenix-5b-before && git submodule update --init
//        cp -r ../plenix-b1/node_modules . && node tools/agent/lane-overlay.js && node build-app.js
//   2. node docs/briefs/280-icon-5b/pixel-pages.js [<before root>=../plenix-5b-before]
//      THRESHOLD (default 24): a pixel differs when any channel differs by more than this.
// Each page is photographed in light mode at Compact and Comfortable density, left to right and right to left (dir="rtl"
// on the root), at 1440 x 900, the whole main region. Expected (docs/briefs/280-icon-5b/notes.md): no difference apart
// from MillerColumns' chevron in right to left, which now points along the reading direction.
const fs = require('fs'), path = require('path'), http = require('http');
const { launch } = require('../../../tests/lib.js');
const NOW = path.resolve(__dirname, '../../..'), BASE = path.resolve(process.argv[2] || path.join(NOW, '../plenix-5b-before'));
const THRESHOLD = Number(process.env.THRESHOLD || 24);
const COMPONENTS = ['Button', 'Cascader', 'Combobox', 'Input', 'Menu', 'MillerColumns', 'Tabs', 'TimePicker', 'TimeZoneSelect', 'Tree', 'TreeSelect'];
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg' };
// both copies are served at /Plenix/, as the pages expect
const serve = (root, port) => new Promise((ok) => {
  const s = http.createServer((q, r) => {
    const rel = decodeURIComponent(q.url.split('?')[0]);
    const f = path.join(root, rel.replace(/^\/Plenix\//, '/'));
    if (!rel.startsWith('/Plenix/') || !f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
    r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
  }).listen(port, '127.0.0.1', () => ok(s));
});
(async () => {
  if (!fs.existsSync(path.join(BASE, 'platform/dist/platform.js'))) { console.error('No build before 5b at ' + BASE + ' (see step 1)'); process.exit(2); }
  const a = await serve(BASE, 8871), b = await serve(NOW, 8872), browser = await launch();
  // the record pages: every inventory record whose source is one of the changed components
  const probe = await browser.newPage();
  await probe.goto('http://127.0.0.1:8872/Plenix/platform/design-system/index.html?plenix=local#/', { waitUntil: 'networkidle2' });
  const hashes = await probe.evaluate((names) => window.DSInventory.filter((r) => r.src && names.some((n) => r.src.startsWith('components/' + n + '/'))).map((r) => '#/' + r.sec + '/' + r.id), COMPONENTS);
  await probe.close();
  const urls = hashes.map((h) => ['spec ' + h, '/Plenix/platform/design-system/index.html?plenix=local' + h, 'main'])
    .concat(APPS.map((app) => ['app ' + app, '/Plenix/' + app + '/index.html', 'body']));
  const shot = async (port, url, where, density, dir) => {
    const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://127.0.0.1:' + port + url, { waitUntil: 'networkidle2' });
    await page.evaluate((density, dir) => { document.documentElement.setAttribute('data-plx-density', density); document.documentElement.setAttribute('data-plx-mode', 'light'); document.documentElement.dir = dir; }, density, dir);
    await new Promise((r) => setTimeout(r, 600));
    const el = await page.$(where); const png = el ? await el.screenshot({ encoding: 'base64' }) : null;
    await page.close(); return png;
  };
  const cmp = await browser.newPage();
  let cases = 0, differ = 0, worst = 0;
  for (const [name, url, where] of urls) for (const density of ['compact', 'comfortable']) for (const dir of ['ltr', 'rtl']) {
    const [x, y] = [await shot(8871, url, where, density, dir), await shot(8872, url, where, density, dir)];
    cases += 1;
    const label = name + ' ' + density + ' ' + dir;
    if (!x || !y) { console.log('MISSING ' + label); differ += 1; continue; }
    const r = await cmp.evaluate(async (x, y, t) => {
      const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + s; });
      const [i, j] = [await load(x), await load(y)];
      if (i.width !== j.width || i.height !== j.height) return { size: i.width + 'x' + i.height + ' vs ' + j.width + 'x' + j.height };
      const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d');
      g.drawImage(i, 0, 0); const p = g.getImageData(0, 0, c.width, c.height).data; g.clearRect(0, 0, c.width, c.height); g.drawImage(j, 0, 0); const q = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0, m = 0; for (let k = 0; k < p.length; k += 4) { const d = Math.max(Math.abs(p[k] - q[k]), Math.abs(p[k + 1] - q[k + 1]), Math.abs(p[k + 2] - q[k + 2])); if (d > m) m = d; if (d > t) n += 1; }
      return { n, m, px: p.length / 4 };
    }, x, y, THRESHOLD);
    if (r.size) { console.log('SIZE ' + label + ': ' + r.size); differ += 1; continue; }
    worst = Math.max(worst, r.m);
    if (r.n) { differ += 1; console.log('DIFF ' + label + ': ' + r.n + ' of ' + r.px + ' pixels over ' + THRESHOLD + ', largest ' + r.m); }
  }
  console.log('cases ' + cases + ', the same ' + (cases - differ) + ', differ ' + differ + ', largest difference ' + worst);
  await browser.close(); a.close(); b.close(); process.exit(0);
})();
