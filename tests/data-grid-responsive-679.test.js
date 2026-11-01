/* Plenix tests · the responsive DataGrid (issue 679, the owner's priority 1): a full table while its visible columns fit its
   measured width, the row cards when they do not, in a SplitView too, with nothing pinned by default and nothing to scroll sideways.
   Summary: a SplitView whose first panel holds a DataGrid (five 160px columns, selection, a row menu and an actions column), left to
   right and right to left:
     wide panel (the columns fit): a table; no column, selection cell or row menu cell is sticky (position: sticky) by default
     the divider dragged (keyboard) so the columns no longer fit: the row cards (plx-data-grid--narrow), no sideways overflow in the
       body (scrollWidth <= clientWidth), every card shows the key values first and the other fields as labeled details,
       its checkbox, its actions and its row menu button
     a card's checkbox selects the row (onSelectionChange); its row menu opens; the row opens with a click and with Enter
     the sort chosen in the table is kept in the cards (the same first row), and the selection is kept across the switch
     the divider dragged back: the table again
     narrow="table": stays a table in the narrow panel and may scroll sideways (the escape hatch)
     frozen: true on a column pins that column (and the selection beside it) in the table
   Proof first: before the fix the SplitView default was a table that scrolled sideways, its selection and row menu cells sticky, so
     "the cards in a narrow pane" and "nothing sticky by default" fail by name.
   Written, not run (the owner starts the tests). Usage: node tests/data-grid-responsive-679.test.js   (run by data-grid.test.js when
   the DataGrid, DataGridEngine or Table changed, or this file did) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9679, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const draw = (opts) => page.evaluate(async (opts) => {
      document.documentElement.setAttribute('dir', opts.dir); document.documentElement.setAttribute('lang', 'en');
      window.__log = []; window.__root && window.__root.unmount();
      document.getElementById('main').innerHTML = '<div id="host" style="display:grid;block-size:600px"></div>';
      const h = React.createElement, P = window.Plenix;
      const data = Array.from({ length: 12 }, (_, i) => ({ id: 'r' + i, name: 'Record ' + String(i).padStart(2, '0'), owner: 'Owner ' + (i % 3), status: i % 2 ? 'Open' : 'Closed', size: (i + 1) * 100, place: 'Shelf ' + (12 - i) }));
      const columns = [{ field: 'name', title: 'Name', width: 160, frozen: !!opts.frozen }, { field: 'owner', title: 'Owner', width: 160 }, { field: 'status', title: 'Status', width: 160 },
        { field: 'size', title: 'Size', width: 160 }, { field: 'place', title: 'Place', width: 160 },
        { field: 'act', title: 'Actions', kind: 'actions', width: 120, render: (r) => h(P.Button, { size: 'xs', onClick: () => window.__log.push('act ' + r.id) }, 'Act') }];
      function App() {
        const [sel, setSel] = React.useState([]), [open, setOpen] = React.useState(null);
        return h(P.SplitView, { label: 'Layout', firstLabel: 'List', defaultSize: opts.size, first: h(P.DataGrid, { label: 'Records', data, columns, index: 'id', selectable: true, selected: sel, narrow: opts.narrow,
          onSelectionChange: (keys) => { window.__log.push('select ' + keys.join(',')); setSel(keys); }, openKey: open, onRowClick: (r) => { window.__log.push('open ' + r.id); setOpen(r.id); },
          rowMenu: [{ label: 'Rename', onSelect: (r) => window.__log.push('rename ' + r.id) }] }), second: h('p', null, open || 'Nothing open') });
      }
      window.__root = ReactDOM.createRoot(document.getElementById('host')); window.__root.render(h(App));
      await new Promise((r) => setTimeout(r, 900));
    }, opts);
    const state = () => page.evaluate(() => {
      const g = document.querySelector('.plx-data-grid'), body = g.querySelector('.plx-data-grid__grid-tableholder');
      const sticky = [...g.querySelectorAll('.plx-data-grid__grid-row [role=gridcell], [role=columnheader]')].filter((c) => getComputedStyle(c).position === 'sticky').map((c) => c.getAttribute('data-plx-field') || c.className.split(' ').find((x) => /w-lead|row-menu/.test(x)) || '?');
      const row = g.querySelector('.plx-data-grid__grid-row');
      return { cards: g.classList.contains('plx-data-grid--narrow'), sideways: body.scrollWidth > body.clientWidth + 1, sticky: [...new Set(sticky)],
        details: row ? [...row.querySelectorAll('.plx-data-grid__cell--list-detail')].filter((c) => c.getClientRects().length).map((c) => c.getAttribute('data-plx-label')) : [],
        check: !!(row && row.querySelector('input[type=checkbox]') && row.querySelector('input[type=checkbox]').getClientRects().length),
        menu: !!(row && row.querySelector('button[aria-label="Row actions"]') && row.querySelector('button[aria-label="Row actions"]').getClientRects().length),
        act: !!(row && [...row.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Act' && b.getClientRects().length)),
        first: row ? row.getAttribute('data-plx-record') : null };
    });
    const log = () => page.evaluate(() => window.__log.slice());
    const press = async (key, n) => { for (let i = 0; i < (n || 1); i++) { await page.keyboard.press(key); await wait(40); } await wait(400); };
    const divider = '[role=separator][aria-orientation=vertical]';

    for (const dir of ['ltr', 'rtl']) {
      const d = dir + ': ';
      // wide: the columns (5 x 160 + 120 + the selection and row menu columns) fit a 1100px panel
      await draw({ dir, size: 1100 });
      let s = await state();
      assert.equal(s.cards, false, d + 'wide panel: a table');
      assert.deepEqual(s.sticky, [], d + 'nothing is pinned by default (no sticky selection, column or row menu cell): ' + JSON.stringify(s.sticky));
      // sort in the table: a click on the Name title sorts it; twice gives descending, so the first row changes
      const sortName = () => page.evaluate(() => { const hd = [...document.querySelectorAll('[role=columnheader]')].find((x) => /Name/.test(x.textContent)); hd.querySelector('.plx-data-grid__title-text').click(); });
      await sortName(); await wait(300); await sortName(); await wait(300);
      const sortedFirst = (await state()).first;
      await page.click('.plx-data-grid__grid-row input[type=checkbox]'); await wait(200);
      // the divider moved by the keyboard (Home: its minimum) so the columns no longer fit
      await page.focus(divider); await press('Home');
      s = await state();
      assert.equal(s.cards, true, d + 'a narrow pane (the columns do not fit): the row cards');
      assert.equal(s.sideways, false, d + 'the cards never scroll sideways');
      assert.ok(s.details.length >= 2, d + 'the other fields show as labeled details: ' + JSON.stringify(s.details));
      assert.ok(s.check && s.menu && s.act, d + 'a card keeps its checkbox, its row menu and its actions: ' + JSON.stringify(s));
      assert.equal(s.first, sortedFirst, d + 'the sort chosen in the table is kept in the cards');
      assert.ok(await page.evaluate(() => document.querySelector('.plx-data-grid__grid-row input[type=checkbox]').checked), d + 'the selection is kept across the switch');
      // a card: its checkbox, its row menu, a click and Enter open it
      await page.evaluate(() => { window.__log = []; });
      await page.click('.plx-data-grid__grid-row:nth-child(2) input[type=checkbox]'); await wait(200);
      assert.ok((await log()).some((l) => l.startsWith('select ')), d + 'a card\'s checkbox selects the row');
      await page.click('.plx-data-grid__grid-row button[aria-label="Row actions"]'); await wait(300);
      assert.equal(await page.evaluate(() => document.querySelectorAll('[role=menu]').length), 1, d + 'a card\'s row menu opens');
      await page.keyboard.press('Escape'); await wait(200);
      await page.evaluate(() => { window.__log = []; });
      await page.click('.plx-data-grid__grid-row .plx-data-grid__cell--key-first'); await wait(300);
      assert.ok((await log()).some((l) => l.startsWith('open ')), d + 'a click on a card opens the row');
      await page.evaluate(() => { window.__log = []; const r = document.querySelectorAll('.plx-data-grid__grid-row')[2]; r.focus(); });
      await press('Enter');
      assert.ok((await log()).some((l) => l.startsWith('open ')), d + 'Enter on a card opens the row');
      // back across the threshold
      await page.focus(divider); await press('End');
      s = await state();
      assert.equal(s.cards, false, d + 'the divider dragged back: the table again');
      // the escape hatch and the opt-in pin
      await draw({ dir, size: 360, narrow: 'table' });
      s = await state();
      assert.equal(s.cards, false, d + 'narrow="table": a fixed table in a narrow pane');
      assert.equal(s.sideways, true, d + 'narrow="table": it may scroll sideways');
      await draw({ dir, size: 1100, frozen: true });
      s = await state();
      assert.ok(s.sticky.includes('name'), d + 'frozen: true pins that column: ' + JSON.stringify(s.sticky));
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('DATA_GRID_RESPONSIVE_679_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
