// The DataGrid and Table header, before (Plenix-b0) and now (Plenix): every header element's computed values at rest,
// after sorting the first sortable column ascending and then descending, and while each column is hovered.
process.env.TEST_TIMEOUT_MS = '86400000';
const fs = require('fs'), path = require('path'), http = require('http');
const { launch, sleep } = require('C:/Users/Administrator/Documents/Plenix/tests/lib.js');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const serve = (root, port) => new Promise((res) => { const s = http.createServer((q, r) => { const rel = decodeURIComponent(q.url.split('?')[0]); let f = path.join(root, rel.slice(8)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); if (!rel.startsWith('/Plenix/') || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(r); }); s.listen(port, '127.0.0.1', () => res(s)); });
const DS = 'platform/design-system/index.html#/';
const PAGES = ['files/index.html', 'dam/index.html', 'dam/settings-system.html#fields', 'dam/settings-system.html#users', 'settings/index.html',
  DS + 'data-display/data-grid', DS + 'data-display/data-grid/v/virtualized-table', DS + 'data-display/data-grid/v/grouped-table', DS + 'data-display/data-grid/v/column-menu',
  DS + 'data-display/data-grid/v/wrapped-headers', DS + 'data-display/data-grid/v/paged-data-grid', DS + 'data-display/data-sortable-table', DS + 'data-display/data-display-filterable-table',
  DS + 'data-display/data-display-selectable-table', DS + 'data-display/table', DS + 'data-display/badge'];
const PROPS = ['display', 'position', 'opacity', 'color', 'background-color', 'padding-inline-start', 'padding-inline-end', 'justify-content', 'align-items', 'height', 'width', 'right', 'left', 'top',
  'white-space', 'line-height', 'text-align', 'z-index', 'cursor', 'overflow-x', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color', 'border-right-style', 'transition-property', 'font-size', 'font-weight', 'box-shadow', 'flex-grow'];
const SEL = '[class*="__grid-header"], [class*="__grid-header"] *';
const read = (a) => { const [SEL, PROPS] = a; const out = []; for (const e of document.querySelectorAll(SEL)) { if (!e.offsetParent && getComputedStyle(e).position !== 'fixed') continue; const c = getComputedStyle(e), b = getComputedStyle(e, '::before'), f = getComputedStyle(e, '::after');
  out.push((typeof e.className === 'string' ? e.className.split(' ').filter((x) => !/--|^is-/.test(x)).join('.') : e.tagName) + ' ' + PROPS.map((p) => c.getPropertyValue(p)).join('|') + ' ::before ' + b.content + '|' + b.backgroundColor + ' ::after ' + f.content + '|' + f.backgroundColor); } return out; };
(async () => {
  const [a, b] = [await serve('C:/Users/Administrator/Documents/Plenix-b0', 9321), await serve('C:/Users/Administrator/Documents/Plenix', 9322)];
  const browser = await launch(); const pa = await browser.newPage(), pb = await browser.newPage();
  for (const p of [pa, pb]) await p.setViewport({ width: 1440, height: 1000 });
  let diffs = 0, total = 0;
  const cmp = (label, x, y) => { let d = 0; const n = Math.max(x.length, y.length); for (let i = 0; i < n; i++) if (x[i] !== y[i]) { if (d < 3) console.log('  DIFF ' + label + ' #' + i + '\n    ' + String(x[i]).slice(0, 400) + '\n    ' + String(y[i]).slice(0, 400)); d++; } total += n; diffs += d; return d; };
  for (const url of PAGES) {
    const open = async (p, port) => { await p.bringToFront(); await p.goto('about:blank'); await p.goto('http://127.0.0.1:' + port + '/Plenix/' + url, { waitUntil: 'load' }); await sleep(3500); };
    await open(pa, 9321); await open(pb, 9322);
    let d = 0;
    const both = async (fn) => { await pa.bringToFront(); const r1 = await fn(pa); await pb.bringToFront(); const r2 = await fn(pb); return [r1, r2]; };
    let [x, y] = await both((p) => p.evaluate(read, [SEL, PROPS])); d += cmp(url + ' rest', x, y);
    // hover each column (up to 12)
    const n = Math.min(12, await pb.evaluate(() => [...document.querySelectorAll('[class*="__grid-header"] [role="columnheader"]')].filter((e) => e.offsetParent).length));
    for (let i = 0; i < n; i++) {
      [x, y] = await both(async (p) => { const h = (await p.$$('[class*="__grid-header"] [role="columnheader"]'))[i]; try { await h.hover(); } catch (e) { return ['no hover']; } await sleep(250); return p.evaluate(read, [SEL, PROPS]); });
      d += cmp(url + ' hover ' + i, x, y);
    }
    // sort the first sortable column: ascending, then descending
    for (const step of ['asc', 'desc']) {
      [x, y] = await both(async (p) => { await p.mouse.move(0, 0); const ok = await p.evaluate(() => { const c = [...document.querySelectorAll('[class*="__grid-sortable"]')].find((e) => e.offsetParent); if (c) c.click(); return !!c; }); await sleep(400); return ok ? p.evaluate(read, [SEL, PROPS]) : ['none']; });
      d += cmp(url + ' sorted ' + step, x, y);
    }
    console.log((d ? 'DIFF ' : 'SAME ') + url + ' (' + x.length + ' elements, ' + n + ' columns hovered)');
  }
  console.log('total ' + total + ' readings, ' + diffs + ' differ');
  await browser.close(); a.close(); b.close();
})().catch((e) => { console.error(e); process.exit(1); });
