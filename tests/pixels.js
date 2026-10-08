// Plenix tests · pixel snapshots of chosen pages (a before/after proof for a change meant to be invisible).
//   node tests/pixels.js save <dir> <page> [<page> …]      pages: an app path (calendar/index.html) or a design system route (#/forms/switch)
//   node tests/pixels.js compare <dir> <page> [<page> …]   compares with the saved shots; animations are frozen
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep } = require('./lib.js');
const PORT = 8794, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const [mode, dir, ...pages] = process.argv.slice(2);
const FREEZE = '*,*::before,*::after{animation:none !important;transition:none !important;caret-color:transparent !important}';
(async () => {
  fs.mkdirSync(dir, { recursive: true });
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  let bad = 0;
  for (const pg of pages) {
    const url = pg.startsWith('#') ? BASE + 'platform/design-system/' + pg : BASE + pg;
    await page.goto('about:blank'); await page.goto(url, { waitUntil: 'networkidle0' }); await page.evaluate(() => document.fonts.ready); await sleep(1500);
    await page.addStyleTag({ content: FREEZE }); await sleep(300);
    const shot = await page.screenshot({ fullPage: true, captureBeyondViewport: true });
    const file = path.join(dir, pg.replace(/[^\w.-]+/g, '_') + '.png');
    if (mode === 'save') { fs.writeFileSync(file, shot); continue; }
    const before = fs.readFileSync(file).toString('base64');
    const diff = await page.evaluate(async (x, y) => {
      const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
      const [a, b] = await Promise.all([load(x), load(y)]);
      if (a.width !== b.width || a.height !== b.height) return 'size ' + a.width + 'x' + a.height + ' -> ' + b.width + 'x' + b.height;
      const c = document.createElement('canvas'); c.width = a.width; c.height = a.height; const g = c.getContext('2d');
      g.drawImage(a, 0, 0); const d1 = g.getImageData(0, 0, c.width, c.height).data; g.clearRect(0, 0, c.width, c.height); g.drawImage(b, 0, 0); const d2 = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      for (let k = 0; k < d1.length; k += 4) if (d1[k] !== d2[k] || d1[k + 1] !== d2[k + 1] || d1[k + 2] !== d2[k + 2]) { n++; const q = k / 4, x = q % c.width, y = Math.floor(q / c.width); x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
      return n ? n + ' px in ' + [x0, y0, x1, y1].join(',') : 0;
    }, before, shot.toString('base64'));
    if (diff) bad++;
    console.log((diff ? 'DIFF ' : 'SAME ') + pg + (diff ? ' (' + diff + ')' : ''));
  }
  await browser.close(); server.close();
  if (mode === 'compare') { console.log(bad ? 'PIXELS_DIFF ' + bad : 'PIXELS_SAME ' + pages.length); process.exit(bad ? 1 : 0); }
})().catch((e) => { console.error(e); process.exit(1); });
