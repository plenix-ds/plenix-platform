// Computed values of every element inside a DataGrid or Table, before (Plenix-b0) and now (Plenix), by position.
process.env.TEST_TIMEOUT_MS = '86400000';
const fs = require('fs'), path = require('path'), http = require('http');
const { launch, sleep } = require('C:/Users/Administrator/Documents/Plenix/tests/lib.js');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const serve = (root, port) => new Promise((res) => { const s = http.createServer((q, r) => { const rel = decodeURIComponent(q.url.split('?')[0]); let f = path.join(root, rel.slice(8)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); if (!rel.startsWith('/Plenix/') || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(r); }); s.listen(port, '127.0.0.1', () => res(s)); });
const PAGES = ['files/index.html', 'dam/index.html', 'dam/settings-system.html#fields', 'dam/settings-system.html#users', 'platform/design-system/index.html#/data-display/data-grid', 'platform/design-system/index.html#/data-display/data-grid/v/grouped-table', 'platform/design-system/index.html#/data-display/data-grid/v/virtualized-table', 'platform/design-system/index.html#/data-display/table', 'platform/design-system/index.html#/data-display/badge'];
const PROPS = ['position', 'left', 'right', 'top', 'max-height', 'height', 'overflow-x', 'overflow-y', 'z-index', 'background-color', 'width'];
const read = (PROPS) => { const out = []; for (const e of document.querySelectorAll('.plx-data-grid *, .plx-table *, .plx-data-grid, .plx-table')) { const c = getComputedStyle(e); out.push((e.className && e.className.baseVal === undefined ? String(e.className).split(' ')[0] : e.tagName) + (String(e.className).indexOf('plx-list__text') === 0 ? ' [' + e.textContent.slice(0, 60) + ']' : '') + ' ' + PROPS.map((p) => c.getPropertyValue(p)).join('|')); } return out; };
(async () => {
  const [a, b] = [await serve('C:/Users/Administrator/Documents/Plenix-b0', 9301), await serve('C:/Users/Administrator/Documents/Plenix', 9302)];
  const browser = await launch(); const pa = await browser.newPage(), pb = await browser.newPage();
  for (const p of [pa, pb]) await p.setViewport({ width: 1440, height: 1000 });
  let diffs = 0, total = 0;
  for (const url of PAGES) {
    const get = async (p, port) => { await p.bringToFront(); await p.goto('about:blank'); await p.goto('http://127.0.0.1:' + port + '/Plenix/' + url, { waitUntil: 'load' }); await sleep(3500); return p.evaluate(read, PROPS); };
    const x = await get(pa, 9301), y = await get(pb, 9302);
    let d = 0; const n = Math.min(x.length, y.length);
    for (let i = 0; i < n; i++) if (x[i] !== y[i]) { if (d < 3) console.log('  DIFF ' + url + ' #' + i + '\n    ' + x[i].slice(0, 200) + '\n    ' + y[i].slice(0, 200)); d++; }
    total += n; diffs += d;
    console.log((d || x.length !== y.length ? 'DIFF ' : 'SAME ') + url + ' ' + x.length + '/' + y.length + ' elements, ' + d + ' differ');
  }
  console.log('total ' + total + ' elements, ' + diffs + ' differ');
  await browser.close(); a.close(); b.close();
})().catch((e) => { console.error(e); process.exit(1); });
