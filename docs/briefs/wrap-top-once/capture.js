/* Wrap-row pictures: the stage's Table, and the spec's Color swatch States row, before (plain wrap text a line low)
   and after (every cell at the top). Usage: node docs/briefs/wrap-top-once/capture.js <before root> <after root> */
const path = require('path'), fs = require('fs');
const [beforeRoot, afterRoot] = process.argv.slice(2);
const shoot = async (root, port, tag) => {
  const stage = path.join(path.resolve(root), 'docs/briefs/wrap-top-once');
  if (path.resolve(stage) !== path.resolve(__dirname)) { fs.mkdirSync(stage, { recursive: true }); fs.copyFileSync(path.join(__dirname, 'stage.html'), path.join(stage, 'stage.html')); }
  const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
  const server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1000, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + port + '/Plenix/docs/briefs/wrap-top-once/stage.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#table [role="row"]'); await new Promise((r) => setTimeout(r, 1500));
    let clip = await page.evaluate(() => { const r = document.getElementById('table').getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });
    await page.screenshot({ path: path.join(__dirname, tag + '-table.png'), clip });
    await page.goto('http://localhost:' + port + '/Plenix/platform/design-system/index.html#/forms/color-swatch', { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 5000));
    clip = await page.evaluate(() => { const v = [...document.querySelectorAll('.plx-table__value--static')].find((e) => e.textContent.trim() === 'Drawn above'); const row = v.closest('[role="row"]'); row.scrollIntoView(); const r = row.getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: 100 }; });
    await page.screenshot({ path: path.join(__dirname, tag + '-spec.png'), clip });
  } finally { if (browser) await browser.close(); server.close(); }
};
(async () => { await shoot(beforeRoot, 9651, 'before'); await shoot(afterRoot, 9652, 'after'); console.log('captured'); })().catch((e) => { console.error(e); process.exit(1); });
