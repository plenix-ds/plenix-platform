/* #287 built (the Fluent way): today (the row above the headers) from one checkout, and the new build's stage
   (?v=fluent): nothing above the headers, the Show filter open, and the selection commands with a row ticked.
   Usage: node docs/briefs/grid-unread/capture-built.js <before root> <after root> */
const path = require('path');
const [beforeRoot, afterRoot] = process.argv.slice(2);
const shoot = async (root, port, jobs) => {
  const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
  const server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 700, deviceScaleFactor: 2 });
    for (const job of jobs) {
      await page.goto('http://localhost:' + port + '/Plenix/docs/briefs/grid-unread/stage.html?v=' + job.v, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.plx-data-grid__grid-row', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1200));
      if (job.act) await job.act(page);
      await new Promise((r) => setTimeout(r, 500));
      const clip = await page.evaluate(() => { const s = document.getElementById('stage').getBoundingClientRect(); const m = document.querySelector('[role="menu"], .plx-popover, [role="dialog"]'); const mb = m ? m.getBoundingClientRect().bottom : 0; return { x: s.left, y: s.top, width: s.width, height: Math.max(Math.min(s.height, 360), mb - s.top + 12) }; });
      await page.screenshot({ path: path.join(__dirname, job.name + '.png'), clip });
    }
  } finally { if (browser) await browser.close(); server.close(); }
};
(async () => {
  await shoot(beforeRoot, 9611, [{ name: 'built-before', v: 'today' }]);
  await shoot(afterRoot, 9612, [
    { name: 'built-after', v: 'fluent' },
    { name: 'built-after-filter', v: 'fluent', act: async (p) => { const b = await p.$$('button'); for (const x of b) { const t = await (await x.getProperty('textContent')).jsonValue(); if (/^Unread/.test(t.trim())) { await x.click(); break; } } } },
    { name: 'built-after-selected', v: 'fluent', act: async (p) => { const c = await p.$$('.plx-data-grid__grid-row input[type=checkbox]'); if (c[1]) await c[1].click(); } },
  ]);
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
