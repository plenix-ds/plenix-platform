// Icon compare: node tools/agent/datagrid/icon-compare.js
// Photographs every Plenix icon (icon-compare.html) in the baseline build (../Plenix-b0: masks) and this checkout (inline
// SVG), at each size, outline and filled, Compact and Comfortable, and counts the pixels that differ (any channel by more
// than the threshold) and the largest difference.
const fs = require('fs'), path = require('path'), http = require('http');
const { launch } = require('../../../tests/lib.js');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const serve = (root, port) => new Promise((res) => { const s = http.createServer((q, r) => { const rel = decodeURIComponent(q.url.split('?')[0]); const f = path.join(root, rel.slice(8)); if (!rel.startsWith('/Plenix/') || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }); s.listen(port, '127.0.0.1', () => res(s)); });
const NOW = path.resolve(__dirname, '../../..'), BASE = path.resolve(NOW, '../Plenix-b0'), THRESHOLD = Number(process.env.THRESHOLD || 24);
(async () => {
  fs.mkdirSync(path.join(BASE, 'tools/agent/datagrid'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'icon-compare.html'), path.join(BASE, 'tools/agent/datagrid/icon-compare.html'));
  const a = await serve(BASE, 8861), b = await serve(NOW, 8862), browser = await launch();
  const shot = async (port, qs) => {
    const page = await browser.newPage(); await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://127.0.0.1:' + port + '/Plenix/tools/agent/datagrid/icon-compare.html?' + qs, { waitUntil: 'load' });
    await page.waitForFunction('window.__ready'); await new Promise((r) => setTimeout(r, 500));
    const png = await (await page.$('#wall')).screenshot({ encoding: 'base64' });
    await page.close(); return png;
  };
  const cmp = await browser.newPage();
  let total = 0, worst = 0, cases = 0;
  for (const size of ['auto', 'xs', 'sm', 'md', 'lg', 'xl']) for (const filled of ['0', '1']) for (const density of ['compact', 'comfortable']) for (const part of ['0', '1', '2']) {
    if (size === 'xl' && part !== '0') continue;
    const qs = 'size=' + size + '&filled=' + filled + '&density=' + density + '&part=' + part;
    const [x, y] = [await shot(8861, qs), await shot(8862, qs)];
    const r = await cmp.evaluate(async (x, y, t) => {
      const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + s; });
      const [i, j] = [await load(x), await load(y)];
      if (i.width !== j.width || i.height !== j.height) return { size: i.width + 'x' + i.height + ' vs ' + j.width + 'x' + j.height };
      const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d');
      g.drawImage(i, 0, 0); const p = g.getImageData(0, 0, c.width, c.height).data; g.drawImage(j, 0, 0); const q = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0, m = 0; for (let k = 0; k < p.length; k += 4) { const d = Math.max(Math.abs(p[k] - q[k]), Math.abs(p[k + 1] - q[k + 1]), Math.abs(p[k + 2] - q[k + 2])); if (d > m) m = d; if (d > t) n += 1; }
      return { n, m, px: p.length / 4 };
    }, x, y, THRESHOLD);
    cases += 1;
    if (r.size) { console.log('SIZE ' + qs + ': ' + r.size); total += 1; continue; }
    total += r.n; worst = Math.max(worst, r.m);
    if (r.n) console.log((r.n ? 'DIFF ' : 'SAME ') + qs + ': ' + r.n + ' of ' + r.px + ' pixels over ' + THRESHOLD + ', largest ' + r.m);
  }
  console.log('cases ' + cases + ', pixels over ' + THRESHOLD + ': ' + total + ', largest difference ' + worst);
  await browser.close(); a.close(); b.close(); process.exit(0);
})();
