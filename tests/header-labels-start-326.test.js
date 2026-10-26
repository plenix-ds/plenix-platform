// Every column header label starts at the start edge in DataGrid and Table, whatever the column's align or headerAlign
// (owner rule): number headers ("Quantity on the shelf", "Price") sit left while their cell numbers stay right.
const assert = require('assert');
const { serve, launch } = require('./lib.js');
const PORT = +process.env.TEST_PORT || 8879;
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/header-labels-start/stage.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelectorAll('[role="columnheader"]').length >= 8, { timeout: 60000 });
    await new Promise((r) => setTimeout(r, 800));
    const out = await page.evaluate(() => ['grid', 'table'].map((id) => {
      const box = document.getElementById(id);
      return [...box.querySelectorAll('[role="columnheader"]')].map((th) => {
        const label = th.querySelector('[class*="title-text"]') || th.querySelector('[class*="__title"]') || th;
        const r = th.getBoundingClientRect(), t = label.getBoundingClientRect(), pad = parseFloat(getComputedStyle(th).paddingInlineStart) || 0;
        const field = th.getAttribute('data-plx-field');
        const cell = box.querySelector('[role="row"]:not(:first-child) [data-plx-field="' + field + '"], [role="cell"][data-plx-field="' + field + '"], [role="gridcell"][data-plx-field="' + field + '"]');
        const c = cell ? cell.getBoundingClientRect() : null, ct = cell ? (() => { const rg = document.createRange(); rg.selectNodeContents(cell); return rg.getBoundingClientRect(); })() : null;
        return { id, field, startGap: Math.round(t.left - r.left), endGap: Math.round(r.right - t.right), align: getComputedStyle(label).textAlign, cellEndGap: c ? Math.round(c.right - ct.right) : null, cellStartGap: c ? Math.round(ct.left - c.left) : null };
      });
    }));
    for (const list of out) for (const h of list) {
      assert.ok(h.startGap <= 24, h.id + ' ' + h.field + ': the label starts at the start edge ' + JSON.stringify(h));
      assert.ok(!/end|right|center/.test(h.align), h.id + ' ' + h.field + ': the label is not end- or center-aligned ' + JSON.stringify(h));
    }
    for (const list of out) for (const f of ['qty', 'price']) {
      const h = list.find((x) => x.field === f);
      assert.ok(h && h.cellEndGap !== null && h.cellEndGap < h.cellStartGap, list[0].id + ' ' + f + ': the cell numbers stay right ' + JSON.stringify(h));
    }
    console.log('HEADER_LABELS_START_326_OK every label at the start edge (DataGrid and Table), numbers still right');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
