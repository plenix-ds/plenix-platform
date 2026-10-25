/* Wrap pictures: before (main checkout), the column menu with Wrap text and the wrapped column (the wrap worktree), and
   the two ways to see cut text: (a) the row expands in place (one row opened for the picture), (b) a popover.
   Usage: node docs/briefs/grid-wrap/capture.js <before root> <after root> */
const path = require('path');
const [beforeRoot, afterRoot] = process.argv.slice(2);
const OUT = __dirname;
const shotFrom = async (root, port, jobs) => {
  const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
  const server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 800, deviceScaleFactor: 2 });
    for (const job of jobs) {
      await page.goto('http://localhost:' + port + '/Plenix/docs/briefs/grid-wrap/stage.html' + job.q, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.plx-data-grid__grid-row', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
      if (job.before) await job.before(page);
      await new Promise((r) => setTimeout(r, 500));
      const clip = await page.evaluate(() => { const s = document.getElementById('stage').getBoundingClientRect(); const m = document.querySelector('[role="menu"], .plx-popover'); const mb = m ? m.getBoundingClientRect().bottom : 0;
        return { x: s.left, y: s.top, width: s.width, height: Math.max(Math.min(s.height, 330), mb - s.top + 12) }; });
      await page.screenshot({ path: path.join(OUT, job.name + '.png'), clip });
    }
  } finally { if (browser) await browser.close(); server.close(); }
};
(async () => {
  // the stage file lives in the main checkout; the worktree gets a copy
  const fs = require('fs');
  for (const f of ['stage.html']) fs.copyFileSync(path.join(OUT, f), path.join(path.resolve(afterRoot), 'docs/briefs/grid-wrap', f));
  fs.copyFileSync(path.join(OUT, '..', 'review.css'), path.join(path.resolve(afterRoot), 'docs/briefs/review.css'));
  await shotFrom(beforeRoot, 9531, [{ name: 'before', q: '' }]);
  await shotFrom(afterRoot, 9532, [
    { name: 'menu', q: '', before: async (page) => { await page.evaluate(() => { const b = document.querySelector('[aria-label="Notes column actions"]'); (b.closest('button') || b).click(); }); } },
    { name: 'after', q: '?wrap=1' },
    { name: 'option-a', q: '?wrap=1&mock=a', before: async (page) => page.addStyleTag({ content: '.plx-data-grid__grid-row:nth-child(2){block-size:auto;} .plx-data-grid__grid-row:nth-child(2) .rv-cut__text{-webkit-line-clamp:unset;}' }) },
    { name: 'option-b', q: '?wrap=1&mock=b' },
  ]);
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
