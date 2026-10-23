// Plenix tests · computed-style comparison of one component's elements between two copies of the repository (e.g. the
// last release in ../Plenix-rel and the working tree), on design-system routes or application pages: for a page whose
// documentation changes with the stylesheet (tests/clash-audit.js --check reports it as DIFFERS), this proves the
// component's own elements are unchanged.
//   node tests/compare-styles.js <before-root> "<selector>" <route-or-page> [<route-or-page>…]
//   e.g. node tests/compare-styles.js ../Plenix-rel ".plx-split-view" "#/layout/secondary-pane"
//   HOSTS=n compares only the first n elements the selector matches (a page whose later examples changed)
//   Elements with display: contents (slots that only pass context to what they hold) are left out on both sides.
//   WAIT=ms waits longer before reading (default 4000; a lab draws its cards in an iframe after the page)
//   Elements inside same-origin iframes (the design system's labs draw their cards in one) are read too.
// Every element matching the selector, and every element inside it, is compared property by property (custom
// properties and transitions left out), in document order. Prints SAME or the differences; STYLES_SAME or STYLES_DIFF.
process.env.TEST_TIMEOUT_MS = process.env.TEST_TIMEOUT_MS || '86400000';
const fs = require('fs');
const path = require('path');
const http = require('http');
const { launch, sleep, ROOT } = require('./lib.js');
const [beforeRoot, selector, ...targets] = process.argv.slice(2);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
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
const read = ([sel, n]) => {
  const out = [];
  const docs = [document].concat([...document.querySelectorAll('iframe')].map((f) => { try { return f.contentDocument; } catch (e) { return null; } }).filter(Boolean));
  for (const host of docs.flatMap((d) => [...d.querySelectorAll(sel)]).slice(0, n || Infinity)) for (const el of [host, ...host.querySelectorAll('*')]) {
    const cs = el.ownerDocument.defaultView.getComputedStyle(el), o = {};
    if (cs.display === 'contents') continue;   // a slot with no box of its own (it only passes context on): not drawn
    for (let i = 0; i < cs.length; i++) { const p = cs[i]; if (!p.startsWith('--') && !/^(transition|animation)/.test(p)) o[p] = cs.getPropertyValue(p); }
    out.push({ label: el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join(''), o });
  }
  return out;
};
(async () => {
  const [a, b] = [await serveRoot(path.resolve(beforeRoot), 8797), await serveRoot(ROOT, 8798)];
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const at = async (port, t) => {
    const url = 'http://127.0.0.1:' + port + '/Plenix/' + (t.startsWith('#') ? 'platform/design-system/index.html' + t : t);
    await page.goto('about:blank'); await page.goto(url, { waitUntil: 'load', timeout: 120000 }); await page.evaluate(() => document.fonts.ready); await sleep(+process.env.WAIT || 4000);
    return page.evaluate(read, [selector, +process.env.HOSTS || 0]);
  };
  let diffs = 0;
  for (const t of targets) {
    const x = await at(8797, t), y = await at(8798, t);
    if (x.length !== y.length) { diffs++; console.log('DIFF ' + t + ': ' + x.length + ' elements before, ' + y.length + ' now'); continue; }
    const lines = [];
    x.forEach((e, i) => { for (const p of Object.keys(e.o)) if (e.o[p] !== y[i].o[p]) lines.push('  #' + i + ' ' + e.label + ' ' + p + ': ' + e.o[p] + ' -> ' + y[i].o[p]); });
    if (lines.length) { diffs++; console.log('DIFF ' + t + ' (' + x.length + ' elements)\n' + lines.slice(0, 30).join('\n')); } else console.log('SAME ' + t + ' (' + x.length + ' elements)');
  }
  await browser.close(); a.close(); b.close();
  console.log(diffs ? 'STYLES_DIFF ' + diffs : 'STYLES_SAME');
  process.exit(diffs ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
