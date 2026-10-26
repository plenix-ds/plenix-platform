/* #256 dashboard pictures: the To do panel before (the date and priority sit below the task's text) and after (one
   baseline). Usage: node docs/briefs/checkbox-baseline/capture.js <before root> <after root> */
const path = require('path');
const [beforeRoot, afterRoot] = process.argv.slice(2);
const shoot = async (root, port, name) => {
  const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
  const server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 3 });
    await page.goto('http://localhost:' + port + '/Plenix/dashboard/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-check__label'); await new Promise((r) => setTimeout(r, 2500));
    const clip = await page.evaluate(() => { const lab = [...document.querySelectorAll('.plx-check__label')].find((e) => /plumbing quote/.test(e.textContent));
      const row = lab.closest('.plx-inline').parentElement.closest('.plx-inline'); const list = row.parentElement.getBoundingClientRect(); return { x: list.left - 8, y: list.top - 8, width: list.width + 16, height: Math.min(list.height, 120) + 16 }; });
    await page.screenshot({ path: path.join(__dirname, name + '.png'), clip });
  } finally { if (browser) await browser.close(); server.close(); }
};
(async () => { await shoot(beforeRoot, 9641, 'before'); await shoot(afterRoot, 9642, 'after'); console.log('captured'); })().catch((e) => { console.error(e); process.exit(1); });
