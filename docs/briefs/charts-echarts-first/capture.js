/* Pictures for the first four charts on ECharts (#353): each variant today and new (preview.html), and the keyboard on
   the new ones. Usage (repository root): node docs/briefs/charts-echarts-first/capture.js [only-this-id …] */
const path = require('path');
const { serve, launch } = require(path.join(__dirname, '..', '..', '..', 'tests', 'lib.js'));
const OUT = __dirname;
const PORT = 9584;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const VARIANTS = ['line-giving', 'line-step', 'line-time', 'area-none', 'area-stacked', 'area-percent', 'bar-grouped', 'bar-stacked', 'bar-percent', 'bar-histogram', 'pie-pie', 'pie-donut', 'pie-half'];
// the keyboard pictures: Tab to the new chart, then these keys
const KEYS = {
  'line-time': ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight'],
  'area-stacked': ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight'],
  'bar-stacked': ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowUp'],
  'pie-donut': ['ArrowRight', 'ArrowRight'],
};

(async () => {
  const only = process.argv.slice(2);
  const server = await serve(PORT);
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 });
    const open = async () => {
      await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/charts-echarts-first/preview.html', { waitUntil: 'networkidle0' });
      await page.waitForFunction((n) => document.querySelectorAll('.plx-chart__engine svg').length >= n, { timeout: 60000 }, VARIANTS.length);
      await wait(1200);
    };
    await open();
    for (const id of VARIANTS) {
      if (only.length && only.indexOf(id) < 0) continue;
      const el = await page.$('#' + id + ' .rv-pair');
      await el.screenshot({ path: path.join(OUT, id + '.png') });
      console.log('captured', id);
    }
    for (const id of Object.keys(KEYS)) {
      if (only.length && only.indexOf(id) < 0 && only.indexOf(id + '-keyboard') < 0) continue;
      await open();
      await page.focus('#' + id + '-new .plx-chart__plot');
      for (const k of KEYS[id]) { await page.keyboard.press(k); await wait(120); }
      await wait(500);
      const el = await page.$('#' + id + '-new');
      await el.screenshot({ path: path.join(OUT, id + '-keyboard.png') });
      console.log('captured', id + '-keyboard');
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
