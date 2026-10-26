/* Cut text, built (option B): the wrap stage at Medium with the pointer on a cut Notes cell, before (no button) and after
   (the expand button, and its popover open). Usage: node docs/briefs/grid-wrap/capture-cut.js <before root> <after root> */
const path = require('path'), fs = require('fs');
const [beforeRoot, afterRoot] = process.argv.slice(2);
const shoot = async (root, port, jobs) => {
  for (const f of ['stage.html']) fs.copyFileSync(path.join(__dirname, f), path.join(path.resolve(root), 'docs/briefs/grid-wrap', f));
  fs.copyFileSync(path.join(__dirname, '..', 'review.css'), path.join(path.resolve(root), 'docs/briefs/review.css'));
  const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
  const server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 800, deviceScaleFactor: 2 });
    for (const job of jobs) {
      await page.goto('http://localhost:' + port + '/Plenix/docs/briefs/grid-wrap/stage.html?wrap=1', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.plx-data-grid__grid-row', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
      const cell = (await (await page.$$('.plx-data-grid [role=row]'))[1].$('[data-plx-field="note"]')); await cell.hover(); await new Promise((r) => setTimeout(r, 400));
      if (job.open) { const b = await page.$('[aria-label="Show the full text"]'); if (b) { await b.click(); await new Promise((r) => setTimeout(r, 500)); } }
      const clip = await page.evaluate(() => { const s = document.getElementById('stage').getBoundingClientRect(); const p = document.querySelector('.plx-popover'); const pb = p ? p.getBoundingClientRect().bottom : 0; return { x: s.left, y: s.top, width: s.width, height: Math.max(Math.min(s.height, 330), pb - s.top + 12) }; });
      await page.screenshot({ path: path.join(__dirname, job.name + '.png'), clip });
    }
  } finally { if (browser) await browser.close(); server.close(); }
};
(async () => {
  await shoot(beforeRoot, 9591, [{ name: 'built-cut-before' }]);
  await shoot(afterRoot, 9592, [{ name: 'built-cut-hover' }, { name: 'built-cut-open', open: true }]);
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
