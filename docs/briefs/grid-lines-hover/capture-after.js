/* Before/after of the built change (owner answers, 2026-10-24) from two checkouts: the grid and the Table (frame,
   heading line, frozen edge, Table header height) and the hovered menu part.
   Usage: node docs/briefs/grid-lines-hover/capture-after.js <before root> <after root> */
const path = require('path');
const [beforeRoot, afterRoot] = process.argv.slice(2);
const shoot = async (root, port, name) => {
  const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
  const server = await serve(port); let browser; let facts;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1300, height: 1000, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + port + '/Plenix/docs/briefs/grid-and-table/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-table [role=row]', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    const clip = (sel) => page.evaluate((sel) => { const e = document.querySelector(sel).getBoundingClientRect(); return { x: e.left - 8, y: e.top - 8, width: Math.min(e.width + 16, 720), height: 200 }; }, sel);
    facts = await page.evaluate(() => ({ gridFrame: getComputedStyle(document.querySelector('.plx-data-grid')).borderTopColor, tableHeader: Math.round(document.querySelector('.plx-table__grid-header').getBoundingClientRect().height), gridHeader: Math.round(document.querySelector('.plx-data-grid__grid-header').getBoundingClientRect().height) }));
    await page.screenshot({ path: path.join(__dirname, name + '-grid.png'), clip: await clip('.plx-data-grid') });
    await page.screenshot({ path: path.join(__dirname, name + '-table.png'), clip: await clip('.plx-table') });
    const btn = await page.$('.plx-data-grid [aria-label="Kind column actions"]'); await btn.hover(); await new Promise((r) => setTimeout(r, 400));
    const hc = await page.evaluate(() => { const c = document.querySelector('.plx-data-grid [aria-label="Kind column actions"]').closest('.plx-data-grid__grid-col').getBoundingClientRect(); return { x: c.left - 30, y: c.top - 6, width: c.width + 60, height: c.height + 12 }; });
    await page.screenshot({ path: path.join(__dirname, name + '-hover.png'), clip: hc });
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(name, JSON.stringify(facts));
};
(async () => { await shoot(beforeRoot, 9551, 'built-before'); await shoot(afterRoot, 9552, 'built-after'); })().catch((e) => { console.error(e); process.exit(1); });
