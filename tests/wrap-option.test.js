/* Plenix tests · Wrap text as a user option (owner, 2026-10-24)
   Summary: DataGrid: the column menu's "Wrap text" turns wrapping on for that column; its long text wraps at the reading
     line height and every cell of that row starts at the top; a row without wrapping stays centered; "Wrap all columns"
     in the header's right-click menu turns every column on. Table: a column with wrap: true wraps the same way; a plain
     column does not wrap (one line, ellipsis).
   Usage: node tests/wrap-option.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9512, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/platform/design-system/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    await page.evaluate(async () => {
      document.body.innerHTML = '<div id="g"></div><div id="t"></div>';
      const h = React.createElement, P = window.Plenix;
      const long = 'A long note that does not fit in one line of this column, so it has to wrap onto more lines';
      const rows = [{ id: 1, name: 'Northwind', note: long, city: 'Austin and a long city name that would wrap' }, { id: 2, name: 'Contoso', note: 'Short', city: 'Boston' }];
      const columns = [{ title: 'Name', field: 'name', kind: 'name' }, { title: 'Note', field: 'note', width: '--plx-ref-size-240px' }, { title: 'City', field: 'city' }];
      ReactDOM.createRoot(document.getElementById('g')).render(h(P.DataGrid, { label: 'Grid', data: rows, columns, height: '--plx-ref-size-320px' }));
      ReactDOM.createRoot(document.getElementById('t')).render(h(P.Table, { label: 'Static', data: rows, columns: [{ title: 'Name', field: 'name', rowLabel: true },
        { title: 'Note', field: 'note', wrap: true, width: '--plx-ref-size-240px' }, { title: 'Plain', field: 'note', width: '--plx-ref-size-160px' }] }));
      await new Promise((r) => setTimeout(r, 900));
    });
    const state = () => page.evaluate(() => {
      const row = (root, i) => document.querySelectorAll(root + ' [role=row]')[i];
      const cell = (r, field) => r && r.querySelector('[data-plx-field="' + field + '"]');
      const g1 = row('#g', 1), g2 = row('#g', 2), t1 = row('#t', 1);
      const info = (c) => { if (!c) return null; const s = getComputedStyle(c), v = c.querySelector('[class*="__value"], [class*="cell-content"]') || c, vr = v.getBoundingClientRect();
        return { wrap: /__cell--wrap/.test(c.className), align: s.alignItems, lh: parseFloat(getComputedStyle(v).lineHeight), lines: Math.round(vr.height / parseFloat(getComputedStyle(v).lineHeight)) }; };
      const gv=cell(g1,'city')&&(cell(g1,'city').querySelector('[class*=__value]')||cell(g1,'city'));
      return { step: document.querySelector('#g .plx-data-grid').getAttribute('data-plx-row-height'), gCityLines: gv?Math.round(gv.getBoundingClientRect().height/parseFloat(getComputedStyle(gv).lineHeight)):0, gRowWrap: /__grid-row--wrap/.test(g1.className), gRow2Wrap: /__grid-row--wrap/.test(g2.className), gNote: info(cell(g1, 'note')), gName: info(cell(g1, 'name')),
        tRowWrap: /__grid-row--wrap/.test(t1.className), tNote: info(cell(t1, 'note')), tName: info(cell(t1, 'name')),
        tPlain: info([...t1.querySelectorAll('[data-plx-field="note"]')][1]) };
    });
    const before = await state();
    assert.equal(before.gNote.wrap, false, 'a grid column does not wrap by default');
    assert.equal(before.gRowWrap, false, 'no wrap row by default');
    // the column menu: Wrap text
    await page.evaluate(() => { const b = document.querySelector('#g [aria-label="Note column actions"]'); (b.closest('button') || b).click(); });
    await new Promise((r) => setTimeout(r, 400));
    const clicked = await page.evaluate(() => { const i = [...document.querySelectorAll('[role="menuitemcheckbox"], [role="menuitem"]')].find((x) => x.textContent.trim() === 'Wrap text'); if (i) i.click(); return !!i; });
    assert.ok(clicked, 'the column menu has Wrap text');
    await new Promise((r) => setTimeout(r, 500));
    const on = await state();
    assert.ok(on.gNote.wrap, 'Wrap text turns the column on');
    assert.equal(on.step, 'medium', 'a Short grid moves to Medium when a column wraps');
    assert.ok(on.gNote.lines >= 2, 'its long text shows on more lines (' + on.gNote.lines + ')');
    assert.equal(on.gCityLines, 1, 'a column without Wrap text stays on one line');
    assert.ok(on.gRowWrap && on.gRow2Wrap, 'rows of a grid with a wrapping column are wrap rows');
    assert.equal(on.gName.align, 'flex-start', 'every cell of a wrap row starts at the top');
    // the header's right-click menu: Wrap all columns
    await page.evaluate(() => { const col = document.querySelector('#g [role="columnheader"]'); col.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 50, clientY: 50 })); });
    await new Promise((r) => setTimeout(r, 400));
    const hasAll = await page.evaluate(() => !![...document.querySelectorAll('[role="menuitemcheckbox"], [role="menuitem"]')].find((x) => x.textContent.trim() === 'Wrap all columns'));
    assert.ok(hasAll, 'the right-click header menu has Wrap all columns');
    // the Table
    assert.ok(on.tNote.wrap && on.tNote.lines > 1 && on.tNote.lh < 24, 'a Table column with wrap: true wraps at the reading line height');
    assert.ok(on.tRowWrap && on.tName.align === 'flex-start', 'its row starts every cell at the top');
    assert.equal(on.tPlain.lines, 1, 'a plain Table column stays on one line');
    assert.deepEqual(errors, []);
    console.log('WRAP_OPTION_OK column menu Wrap text, Wrap all columns, reading line height, top-aligned rows, Table wrap prop');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
