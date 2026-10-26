/* Pictures for the charts-on-ECharts review, taken from the live preview (preview.html) with the test browser.
   Usage: node docs/briefs/charts-echarts/capture.js   (from the repository root) */
const path = require('path');
const { serve, launch } = require(path.join(__dirname, '..', '..', '..', 'tests', 'lib.js'));
const OUT = __dirname;
const PORT = 9583;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const JOBS = [
  { name: 'line', el: '#line .rv-pair' },
  { name: 'bar', el: '#bar .rv-pair' },
  { name: 'line-keyboard', el: '#line-echarts', plot: '#line-echarts', keys: ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight'] },
  { name: 'bar-keyboard', el: '#bar-echarts', plot: '#bar-echarts', keys: ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowRight'] },
  { name: 'line-data', el: '#line-echarts', open: '#line-echarts summary' },
];

(async () => {
  const server = await serve(PORT);
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 });
    for (const job of JOBS) {
      await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/charts-echarts/preview.html', { waitUntil: 'networkidle0' });
      await page.waitForSelector('#bar-echarts .rv-ec-host svg', { timeout: 60000 });
      await wait(1500);
      if (job.plot) {
        await page.focus(job.plot + ' .plx-chart__plot');
        for (const k of job.keys) { await page.keyboard.press(k); await wait(150); }
        await wait(400);
      }
      if (job.open) { await page.click(job.open); await wait(500); }
      const el = await page.$(job.el);
      await el.screenshot({ path: path.join(OUT, job.name + '.png') });
      console.log('captured', job.name);
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
