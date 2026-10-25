// In a row with a wrapping column, every cell starts at the same top: a plain wrap value takes its top padding once,
// like the row label and drawn cells (owner, 2026-10-25: rows with a wrap start at the top). Table and DataGrid.
const assert = require('assert');
const { serve, launch } = require('./lib.js');
const PORT = +process.env.TEST_PORT || 8880;
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1000 });
    await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/wrap-top-once/stage.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelectorAll('#table [role="row"], #grid [role="row"]').length >= 4, { timeout: 60000 });
    await page.evaluate(() => document.fonts.ready); await new Promise((r) => setTimeout(r, 800));
    const tops = await page.evaluate(() => ['table', 'grid'].map((id) => {
      const row = [...document.querySelectorAll('#' + id + ' [role="row"]')].find((r) => /Focus/.test(r.textContent) && !r.querySelector('[role="columnheader"]'));
      const first = (el) => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (n.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); return rg.getClientRects()[0].top; } return null; };
      return { id, tops: [...row.querySelectorAll('[role="rowheader"], [role="cell"], [role="gridcell"]')].map(first).filter((t) => t !== null).map((t) => Math.round(t * 10) / 10) };
    }));
    for (const t of tops) {
      assert.ok(t.tops.length >= 4, t.id + ': four cells read ' + JSON.stringify(t));
      const spread = Math.max(...t.tops) - Math.min(...t.tops);
      assert.ok(spread <= 1, t.id + ': every cell starts at the same top ' + JSON.stringify(t));
    }
    console.log('WRAP_TOP_ONCE_OK every cell of a wrap row at the same top (Table and DataGrid) ' + JSON.stringify(tops));
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
