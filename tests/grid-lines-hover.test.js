/* Plenix tests · grid and table lines, menu hover, resize cursor (owner, 2026-10-24)
   Summary: the DataGrid's and the Table's outer frame and the edge after a frozen first column use the heading line's
     color; the Table's header is as tall as the grid's; the hovered menu part takes a shade (an image), not a flat fill;
     a resize drag puts one cover with the resize cursor in place until the pointer is let go.
   Usage: node tests/grid-lines-hover.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9561, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/grid-and-table/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-table [role=row]', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    const r = await page.evaluate(() => {
      const edge = getComputedStyle(document.querySelector('.plx-data-grid__grid-header')).borderBottomColor;
      const g = document.querySelector('.plx-data-grid'), t = document.querySelector('.plx-table');
      const afterFrozen = (root, b) => { const c = root.querySelector('.' + b + '__grid-cell--after-frozen'); return c ? getComputedStyle(c, '::before').borderInlineStartColor : null; };
      return { edge, gridFrame: getComputedStyle(g).borderTopColor, tableFrame: getComputedStyle(t).borderTopColor,
        gridFrozen: afterFrozen(g, 'plx-data-grid'), tableFrozen: afterFrozen(t, 'plx-table'),
        gridHeader: Math.round(g.querySelector('.plx-data-grid__grid-header').getBoundingClientRect().height),
        tableHeader: Math.round(t.querySelector('.plx-table__grid-header').getBoundingClientRect().height) };
    });
    assert.equal(r.gridFrame, r.edge, 'the grid frame uses the heading line color');
    assert.equal(r.tableFrame, r.edge, 'the Table frame uses the heading line color');
    assert.equal(r.gridFrozen, r.edge, 'the grid edge after the frozen column uses it too');
    assert.equal(r.tableFrozen, r.edge, 'the Table edge after the frozen column uses it too');
    assert.equal(r.tableHeader, r.gridHeader, 'the Table header is as tall as the grid header (' + r.tableHeader + ' / ' + r.gridHeader + ')');
    // the hovered menu part
    const btn = await page.$('.plx-data-grid [aria-label="Kind column actions"]'); await btn.hover(); await new Promise((x) => setTimeout(x, 300));
    const image = await page.evaluate(() => getComputedStyle(document.querySelector('.plx-data-grid [aria-label="Kind column actions"]').closest('.plx-data-grid__grid-header-popup-button')).backgroundImage);
    assert.ok(/gradient/.test(image), 'the hovered menu part takes a shade (' + image.slice(0, 40) + ')');
    // the resize cover
    const h = await page.$('[aria-label="Resize Kind"]'); const box = await h.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
    await page.mouse.move(box.x + 60, box.y + box.height / 2, { steps: 4 });
    const during = await page.evaluate(() => { const c = document.querySelector('.plx-data-grid__resize-cover'); return c ? getComputedStyle(c).cursor : null; });
    await page.mouse.up(); await new Promise((x) => setTimeout(x, 100));
    const after = await page.evaluate(() => document.querySelectorAll('.plx-data-grid__resize-cover').length);
    assert.equal(during, 'col-resize', 'during the drag the cover shows the resize cursor');
    assert.equal(after, 0, 'letting go removes the cover');
    assert.deepEqual(errors, []);
    console.log('GRID_LINES_HOVER_OK frame and frozen edge in the heading color, Table header ' + r.tableHeader + 'px, shaded menu hover, resize cover');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
