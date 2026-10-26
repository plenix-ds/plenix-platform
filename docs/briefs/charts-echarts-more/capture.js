/* Pictures for Sparkline and WordCloud on ECharts (#353): today and new (preview.html), and the keyboard on the new word
   cloud. Usage (repository root): node docs/briefs/charts-echarts-more/capture.js */
const path = require('path');
const { serve, launch } = require(path.join(__dirname, '..', '..', '..', 'tests', 'lib.js'));
const OUT = __dirname;
const PORT = 9585;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = await serve(PORT);
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 2 });
    const open = async () => {
      await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/charts-echarts-more/preview.html', { waitUntil: 'load' });
      // every new sparkline drawn, and words placed in both new clouds
      await page.waitForFunction(() => document.querySelectorAll('[id$="-new"] .plx-sparkline__engine svg').length >= 4
        && document.querySelectorAll('#cloud-spiral-new .plx-chart__engine text').length > 10
        && document.querySelectorAll('#cloud-rect-new .plx-chart__engine text').length > 10, { timeout: 60000 });
      await wait(2000);
    };
    await open();
    console.log('words placed', await page.evaluate(() => ['spiral', 'rect'].map((k) => document.querySelectorAll('#cloud-' + k + '-new .plx-chart__engine text').length + ' of 25 (today: '
      + document.querySelectorAll('#cloud-' + k + '-today .plx-word-cloud__word:not(.plx-word-cloud__word--measure)').length + ')').join(', ')));
    for (const id of ['spark-inline', 'spark-card', 'cloud-spiral', 'cloud-rect']) {
      const el = await page.$('#' + id + ' .rv-pair');
      // scrolled into view first: the drawing repaints there before the picture
      await el.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await wait(800);
      await el.screenshot({ path: path.join(OUT, id + '.png') });
      console.log('captured', id);
    }
    await page.focus('#cloud-spiral-new .plx-chart__plot');
    for (const k of ['ArrowRight', 'ArrowRight', 'ArrowDown']) { await page.keyboard.press(k); await wait(200); }
    await wait(600);
    await (await page.$('#cloud-spiral-new')).screenshot({ path: path.join(OUT, 'cloud-keyboard.png') });
    console.log('captured cloud-keyboard', await page.evaluate(() => (document.querySelector('#cloud-spiral-new .plx-chart-tooltip') || {}).innerText));
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch((e) => { console.error(e); process.exit(1); });
