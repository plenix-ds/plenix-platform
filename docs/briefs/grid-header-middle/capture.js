/* Capture the DataGrid's wrapped-headers example (the real spec page) at Compact and Standard, from one checkout.
   Usage: node docs/briefs/grid-header-middle/capture.js <checkout root> <port> <name>
   Writes <name>-compact.png and <name>-standard.png beside this script: the Stock grid's header and first rows, with
   the header measurements (each title's offset from the middle of its column) in <name>.json. */
const path = require('path'), fs = require('fs');
const [root, port, name] = process.argv.slice(2);
const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
const OUT = __dirname;
(async () => {
  const server = await serve(+port); let browser; const report = {};
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    for (const density of ['compact', 'standard']) {
      await page.goto('http://localhost:' + port + '/Plenix/platform/design-system/index.html#/data-display/data-grid/v/wrapped-headers', { waitUntil: 'networkidle0' });
      await page.evaluate((d) => document.documentElement.setAttribute('data-plx-density-policy', d), density);
      await page.waitForSelector('.plx-data-grid__grid-header');
      await new Promise((r) => setTimeout(r, 1200));
      const box = await page.evaluate(() => {
        const g = [...document.querySelectorAll('.plx-data-grid')].find((x) => x.querySelector('[aria-label="Stock"]') && x.offsetParent);
        g.scrollIntoView({ block: 'start' }); const r = g.getBoundingClientRect(), head = g.querySelector('.plx-data-grid__grid-header').getBoundingClientRect();
        const cols = [...g.querySelectorAll('.plx-data-grid__grid-header .plx-data-grid__grid-col')].filter((c) => c.offsetWidth).map((c) => {
          const cr = c.getBoundingClientRect(), t = (c.querySelector('.plx-data-grid__grid-col-title') || c).getBoundingClientRect();
          return { title: c.textContent.trim().slice(0, 24), offset: +(((t.top - cr.top) - (cr.bottom - t.bottom)) / 2).toFixed(1) };
        });
        return { x: r.left, y: r.top, width: Math.min(r.width, 1240), height: head.height + 3 * 37, cols, header: head.height };
      });
      await page.screenshot({ path: path.join(OUT, name + '-' + density + '.png'), clip: { x: box.x, y: box.y, width: box.width, height: box.height } });
      report[density] = { header: box.header, cols: box.cols };
    }
  } finally { if (browser) await browser.close(); server.close(); }
  fs.writeFileSync(path.join(OUT, name + '.json'), JSON.stringify(report, null, 1));
  console.log(name, JSON.stringify(Object.fromEntries(Object.entries(report).map(([d, r]) => [d, r.cols.filter((c) => Math.abs(c.offset) > 1).map((c) => c.title + ' ' + c.offset)]))));
})().catch((e) => { console.error(e); process.exit(1); });
