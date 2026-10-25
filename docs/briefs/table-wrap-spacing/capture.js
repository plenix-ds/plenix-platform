/* Table wrap spacing pictures: a small Table (stage.html), today and
   with each option applied for the picture only. Usage: node docs/briefs/table-wrap-spacing/capture.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const PORT = 9499;
// A: a static cell that wraps reads like a wrap column: the reading line height and the wrap padding (one-line rows keep their height)
const A = '.plx-table__grid-cell--static{--plx-state-data-grid-cell-line-height:var(--plx-comp-data-grid-wrap-line-height);--plx-state-data-grid-cell-pad-start:var(--plx-comp-data-grid-cell-wrap-padding-top);--plx-state-data-grid-cell-pad-end:var(--plx-comp-data-grid-cell-wrap-padding-bottom);}';
// A with #256 (tall rows start at the top)
const A256 = A + '.plx-table__grid-cell--static{align-items:flex-start;}';
// B: static cells never wrap; long text ends in an ellipsis (as a DataGrid cell)
const B = '.plx-table__grid-cell--static:not(.plx-table__cell--wrap), .plx-table__grid-cell--static:not(.plx-table__cell--wrap) *{white-space:nowrap!important;overflow:hidden;text-overflow:ellipsis;}';
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
    const run = async (url, find, prefix) => {
      for (const [name, css] of [['today', ''], ['a', A], ['a-256', A256], ['b', B]]) {
        await page.goto(url, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('.plx-table [role=row]', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1800));
        if (css) await page.addStyleTag({ content: css });
        await new Promise((r) => setTimeout(r, 400));
        const clip = await page.evaluate(find);
        await page.screenshot({ path: path.join(__dirname, prefix + '-' + name + '.png'), clip });
      }
    };
    await run('http://localhost:' + PORT + '/Plenix/docs/briefs/table-wrap-spacing/stage.html',
      () => { const t = document.querySelector('.plx-table').getBoundingClientRect(); return { x: t.left, y: t.top, width: t.width, height: t.height }; }, 'stage');
  } finally { if (browser) await browser.close(); server.close(); }
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
