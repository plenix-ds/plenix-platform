// Before/after captures for the dark-mode color shades (owner, 2026-10-19). Serves the working tree on 8799, opens each view in
// dark mode, and writes PNGs of the named elements to docs/dark-shades/<tag>/. Usage: node tests/dark-shades-shots.js <tag>
const http = require('http'); const fs = require('fs'); const path = require('path');
const { launch, sleep, ROOT } = require('./lib.js');
const tag = process.argv[2] || 'before';
const OUT = path.join(ROOT, 'docs', 'dark-shades', tag);
fs.mkdirSync(OUT, { recursive: true });
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  if (!rel.startsWith('/Plenix/')) { res.writeHead(404); res.end(); return; }
  let f = path.join(ROOT, rel.slice(8));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res);
});
// each view: [file name, page, how to find the element to capture]
const VIEWS = [
  ['metric-soft', 'platform/design-system/index.html#/data-display/metric-card', () => [...document.querySelectorAll('.plx-metric-card--soft')].slice(0, 1)],
  ['metric-colors', 'platform/design-system/index.html#/data-display/metric-card', () => [...document.querySelectorAll('.plx-metric-card--soft')].slice(1, 7)],
  ['metric-donut-legend', 'platform/design-system/index.html#/data-display/metric-card', () => [...document.querySelectorAll('.plx-metric-card')].filter((c) => /Applicants by gender/.test(c.textContent)).slice(0, 1)],
  ['gender-pills', 'platform/design-system/index.html#/data-display/data-pill', () => [...document.querySelectorAll('.plx-data-pill')].slice(0, 7)],
  ['pill-table', 'platform/design-system/index.html#/data-display/data-pill', () => [...document.querySelectorAll('.plx-table')].filter((t) => /Applicant/.test(t.textContent)).slice(0, 1)],
  ['contacts-list', 'contacts/index.html#/contact/1', () => [document.querySelector('.plx-app-shell__secondary, .plx-secondary-pane') || document.body]],
  ['entity-header', 'contacts/index.html#/contact/1', () => [document.querySelector('.plx-entity-header')].filter(Boolean)],
];
(async () => {
  await new Promise((r) => server.listen(8799, '127.0.0.1', r));
  const browser = await launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  for (const [name, url, find] of VIEWS) {
    await page.goto('about:blank');
    await page.goto('http://127.0.0.1:8799/Plenix/' + url, { waitUntil: 'load', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready); await sleep(5000);
    const handles = await page.evaluateHandle(find);
    const els = await handles.getProperties();
    let i = 0;
    for (const el of els.values()) {
      const e = el.asElement(); if (!e) continue;
      await e.evaluate((x) => x.scrollIntoView({ block: 'center' })); await sleep(300);
      await e.screenshot({ path: path.join(OUT, name + (i ? '-' + i : '') + '.png') }); i++;
    }
    console.log(name, i);
  }
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
