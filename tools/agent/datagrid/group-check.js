// DataGrid grouping check: node tools/agent/datagrid/group-check.js
// Renders group-check.html in the baseline (../Plenix-b0) and this checkout for each grouping case and compares, line by
// line, the group headers (level, text, count, summaries) and the records listed under each group, in order.
const fs = require('fs'), path = require('path'), http = require('http');
const { launch } = require('../../../tests/lib.js');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const serve = (root, port) => new Promise((res) => { const s = http.createServer((q, r) => { const rel = decodeURIComponent(q.url.split('?')[0]); const f = path.join(root, rel.slice(8)); if (!rel.startsWith('/Plenix/') || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }); s.listen(port, '127.0.0.1', () => res(s)); });
const NOW = path.resolve(__dirname, '../../..'), BASE = path.resolve(NOW, '../Plenix-b0');
(async () => {
  fs.mkdirSync(path.join(BASE, 'tools/agent/datagrid'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'group-check.html'), path.join(BASE, 'tools/agent/datagrid/group-check.html'));
  const a = await serve(BASE, 8851), b = await serve(NOW, 8852), browser = await launch();
  let failed = 0;
  for (const c of ['multi', 'status', 'month', 'range', 'nested', 'bool']) {
    const lists = [];
    for (const port of [8851, 8852]) {
      const page = await browser.newPage(); await page.setViewport({ width: 1400, height: 1000 });
      await page.goto('http://127.0.0.1:' + port + '/Plenix/tools/agent/datagrid/group-check.html?case=' + c, { waitUntil: 'load' });
      await page.waitForSelector('.plx-data-grid__grid-row'); await new Promise((r) => setTimeout(r, 600));
      lists.push(await page.evaluate(() => [...document.querySelectorAll('.plx-data-grid__grid-table > .plx-data-grid__grid-row, .plx-data-grid__grid-table > div > .plx-data-grid__grid-row')].map((r) => r.classList.contains('plx-data-grid__grid-group')
        ? 'G' + [...r.classList].find((x) => /group-level-/.test(x)) + ' ' + r.textContent.replace(/\s+/g, ' ').trim()
        : '  ' + (r.querySelector('[data-plx-field="name"]') || r).textContent.trim())));
      await page.close();
    }
    const [before, now] = lists, n = Math.max(before.length, now.length); let diff = 0;
    for (let i = 0; i < n; i += 1) if (before[i] !== now[i]) { if (diff < 6) console.log('  ' + c + ' #' + i + ': ' + before[i] + '  ->  ' + now[i]); diff += 1; }
    console.log((diff ? 'DIFF ' : 'SAME ') + c + ' (' + before.length + ' / ' + now.length + ' lines)' + (diff ? ', ' + diff + ' differ' : ''));
    failed += diff ? 1 : 0;
  }
  console.log(failed ? 'GROUPING_DIFF' : 'GROUPING_SAME');
  await browser.close(); a.close(); b.close(); process.exit(0);
})();
