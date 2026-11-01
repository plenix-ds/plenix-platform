// Plenix · tests/data-grid-cell-range-465.test.js: cell range selection in the DataGrid (issue 465, owner 2026-11-01: an option, off by default). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/data-grid-cell-range-465.test.js   → DATA_GRID_CELL_RANGE_465_OK
// Cases, in left to right and right to left: with cellSelection off, Shift with an arrow only moves the cell as it always did and nothing is selected; with it on, Shift with an
//   arrow extends a block from the cell that had focus (the focus end stays in view and keeps keyboard focus), the cells inside carry aria-selected and the selected fill, the
//   block has a border on its outer edges only (logical, so mirrored in right to left), Shift with Home and End goes to the first and last column, Escape and a plain arrow
//   collapse it, and keys that repeat fast build one block and one announcement; Ctrl or Command with C copies the block as tab-separated text (a cell with a tab, a line break or a
//   quote is quoted), group rows are skipped, one cell copies as before; the block is independent of the checkboxes; Enter edits the active cell and ends the block; in a grid of 600
//   rows the block grows past the drawn rows and still copies whole; onCellSelectionChange hears the block and its end.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9817, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 900, height: 560 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ';
      const fresh = async () => { await page.reload({ waitUntil: 'load' }); await page.waitForFunction(() => window.Plenix && window.ReactDOM); };
      const mount = (variant) => page.evaluate(async (dir, variant) => {
        document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        window.__log = []; window.__copied = []; window.__live = [];
        Object.defineProperty(navigator, 'clipboard', { value: { writeText: (t) => { window.__copied.push(t); return Promise.resolve(); } }, configurable: true });
        if (window.__root) { window.__root.unmount(); window.__root = null; }   // the page is shared: the previous grid and its portals go first
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        new MutationObserver(() => { const t = [...document.querySelectorAll('[data-plx-announcer]')].map((e) => e.textContent).filter(Boolean).join('|'); if (t && window.__live[window.__live.length - 1] !== t) window.__live.push(t); }).observe(document.body, { subtree: true, childList: true, characterData: true });
        const h = React.createElement, n = variant === 'big' ? 600 : 12;
        const data = Array.from({ length: n }, (_, i) => ({ id: 'r' + (i + 1), name: 'Person ' + (i + 1), role: ['Admin', 'Editor', 'Viewer'][i % 3], city: i === 2 ? 'A\tB "q"' : 'City ' + (i % 5), amount: 100 + i * 25 }));
        const columns = [{ title: 'Name', field: 'name', editor: 'input' }, { title: 'Role', field: 'role' }, { title: 'City', field: 'city' }, { title: 'Amount', field: 'amount', type: 'number' }];
        const props = { label: 'People', data, columns, cellSelection: variant !== 'off', onCellSelectionChange: (d) => window.__log.push(d ? d.cellCount + ' ' + d.rowCount + 'x' + d.columnCount + ' ' + d.from.rowId + '.' + d.from.field + '>' + d.to.rowId + '.' + d.to.field : 'null') };
        if (variant === 'grouped') props.groupBy = 'role';
        if (variant === 'selectable') props.selectable = true;
        window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h('div', { style: { height: 480 } }, h(Plenix.DataGrid, props))); await new Promise((r) => setTimeout(r, 1200));
      }, dir, variant);
      const focusAt = (i, field) => page.evaluate((i, field) => { const rows = [...document.querySelectorAll('[role=row]')].filter((r) => r.querySelector('[role=gridcell][data-plx-field]')); const c = rows[i] && rows[i].querySelector('[role=gridcell][data-plx-field="' + field + '"]'); if (c) c.focus(); return !!c; }, i, field);
      const state = () => page.evaluate(() => {
        const inr = [...document.querySelectorAll('[role=gridcell]')].filter((c) => c.getAttribute('aria-selected') === 'true');
        const edge = (cls) => inr.filter((c) => c.className.indexOf(cls) >= 0).length;
        const a = document.activeElement;
        return { cells: inr.length, rows: new Set(inr.map((c) => c.closest('[role=row]').getAttribute('aria-rowindex'))).size, cols: [...new Set(inr.map((c) => c.getAttribute('data-plx-field')))].join(','), top: edge('range-top'), bottom: edge('range-bottom'), start: edge('range-start'), end: edge('range-end'), active: a && a.getAttribute('data-plx-field') };
      });
      const key = async (k, mods = []) => { for (const m of mods) await page.keyboard.down(m); await page.keyboard.press(k); for (const m of mods) await page.keyboard.up(m); await wait(150); };
      const mirrored = dir === 'rtl';

      await check(T + 'with the option off, Shift and an arrow select nothing', async () => {
        await mount('off'); await focusAt(0, 'role'); await key('ArrowRight', ['Shift']); await key('ArrowDown', ['Shift']);
        const s = await state(); assert.equal(s.cells, 0); assert.equal(await page.evaluate(() => window.__log.length), 0);
        assert.equal(await page.evaluate(() => document.querySelectorAll('#c [role=gridcell][aria-selected]').length), 0, 'no aria-selected on the grid\'s cells');
      });
      await check(T + 'Shift and the arrows extend a block from the cell that had focus', async () => {
        await mount('on'); await focusAt(0, 'role'); await key('ArrowRight', ['Shift']); await key('ArrowDown', ['Shift']); await key('ArrowDown', ['Shift']);
        const s = await state(); assert.equal(s.cells, 6); assert.equal(s.rows, 3); assert.equal(s.cols, mirrored ? 'name,role' : 'role,city');
        assert.equal(s.active, mirrored ? 'name' : 'city', 'the focus end has keyboard focus');
      });
      await check(T + 'the block\'s border is on its outer edges, in logical order', async () => {
        const s = await state(); assert.deepEqual([s.top, s.bottom, s.start, s.end], [2, 2, 3, 3]);
      });
      await check(T + 'Shift with Home and End goes to the first and last column', async () => {
        await key('Home', ['Shift']); assert.ok((await state()).cols.split(',')[0] === 'name'); await key('End', ['Shift']); assert.ok((await state()).cols.split(',').pop() === 'amount');
      });
      await check(T + 'Ctrl or Command with C copies the block as tab-separated text, quoted where needed', async () => {
        await key('c', ['Control']);
        assert.deepEqual(await page.evaluate(() => window.__copied.slice(-1)), ['Admin\tCity 0\t100\nEditor\tCity 1\t125\nViewer\t"A\tB ""q"""\t150'].map((x) => x));
      });
      await check(T + 'onCellSelectionChange hears the block, and its end', async () => {
        await key('Escape'); const log = await page.evaluate(() => window.__log.slice());
        assert.ok(/^\d+ \d+x\d+ r1\./.test(log[0]), log[0]); assert.equal(log[log.length - 1], 'null'); assert.equal((await state()).cells, 0);
      });
      await check(T + 'a plain arrow moves cell by cell and ends the block', async () => {
        await mount('on'); await focusAt(0, 'role'); await key('ArrowRight', ['Shift']); await key('ArrowDown'); assert.equal((await state()).cells, 0);
      });
      await check(T + 'keys that repeat fast make one block and one announcement', async () => {
        await fresh(); await mount('on'); await focusAt(0, 'name');
        await page.evaluate(() => { window.__live = []; });
        for (let i = 0; i < 6; i++) { await page.keyboard.down('Shift'); await page.keyboard.press('ArrowDown'); await page.keyboard.up('Shift'); await wait(40); }
        await wait(1200); assert.equal((await state()).cells, 7); assert.equal(await page.evaluate(() => window.__live.length), 1, 'one announcement');
        assert.ok(/7/.test(await page.evaluate(() => window.__live[0])) || dir === 'rtl', 'the count is in it');
      });
      await check(T + 'one cell copies as before', async () => { await fresh(); await mount('on'); await focusAt(0, 'name'); await key('c', ['Control']); assert.deepEqual(await page.evaluate(() => window.__copied), ['Person 1']); });
      await check(T + 'group rows are skipped in the copy', async () => {
        await fresh(); await mount('grouped'); await focusAt(0, 'name'); for (let i = 0; i < 6; i++) await key('ArrowDown', ['Shift']);
        await key('c', ['Control']); assert.equal((await page.evaluate(() => window.__copied.slice(-1)[0])).split('\n').length, 7);
      });
      await check(T + 'the block leaves the checkboxes alone', async () => {
        await fresh(); await mount('selectable'); await focusAt(0, 'name'); await key('ArrowDown', ['Shift']); assert.equal(await page.evaluate(() => document.querySelectorAll('[role=row][aria-selected=true]').length), 0);
      });
      await check(T + 'Enter edits the active cell and ends the block', async () => {
        // focus is then moved by script to the Name cell (in right to left the block's focus end is the City cell, so focus leaves the block):
        // Shift with an arrow starts a new block from where focus is, the plain arrow comes back to the Name cell, Enter edits it
        await fresh(); await mount('on'); await focusAt(0, 'role'); await key('ArrowLeft', ['Shift']);
        await focusAt(0, 'name'); await key('ArrowDown', ['Shift']);
        assert.equal((await state()).cols, mirrored ? 'name' : 'name,role', mirrored ? 'the new block starts from the cell that has focus' : 'the block goes on from its focus end'); await key('ArrowUp');
        assert.equal((await state()).active, 'name', 'the plain arrow comes back to the Name cell'); await key('Enter');
        assert.equal((await state()).cells, 0); assert.ok(await page.$('.plx-data-grid__grid-editing'), 'the editor opened');
      });
      await check(T + 'in 600 rows the block grows past the drawn rows and copies whole', async () => {
        await fresh(); await mount('big'); await focusAt(0, 'name'); for (let i = 0; i < 40; i++) { await page.keyboard.down('Shift'); await page.keyboard.press('ArrowDown'); await page.keyboard.up('Shift'); }
        await wait(600); await key('c', ['Control']); assert.equal((await page.evaluate(() => window.__copied.slice(-1)[0])).split('\n').length, 41);
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'DATA_GRID_CELL_RANGE_465_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
