/* Plenix tests · SplitWorkspace passes the list's DataGrid options through (issue 681; RedSave P-61).
   Summary: a SplitWorkspace with rows, columns and grid = { index, onRowClick, openKey, selectable, selected, onSelectionChange, rowMenu },
     left to right and right to left:
     a click on a row calls onRowClick with that record, and the app's openKey marks it open (aria-current="true") while the
       detail side shows it
     a plain click selects only that row (the other ticks clear); a tick adds a row
     the row menu shows the app's items and runs them
     grid.label renames the list; without it the list is named by paneTitle
   Proof first: before 681 the template drew <DataGrid label data columns /> and dropped every other option: no row is ever
     open, no checkbox column, no row menu, so these lines fail.
   Usage: node tests/splitworkspace-grid-681.test.js   → SPLITWORKSPACE_GRID_681_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
(async () => {
  const PORT = +process.env.TEST_PORT || 9681, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1280, height: 800 });
    for (const dir of ['ltr', 'rtl']) {
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(async (dir) => {
        document.documentElement.setAttribute('dir', dir);
        const h = React.createElement, P = window.Plenix; window.__calls = [];
        const docs = [{ id: 'one', name: 'Brand guidelines' }, { id: 'two', name: 'Project brief' }, { id: 'three', name: 'Launch checklist' }];
        function App(props) {
          const [open, setOpen] = React.useState(null), [sel, setSel] = React.useState(['one', 'three']);
          const chosen = docs.filter((d) => d.id === open)[0];
          return h(P.SplitWorkspace, { paneTitle: 'Documents', rows: docs, columns: [{ title: 'Name', field: 'name' }], detailOpen: !!chosen, title: chosen ? chosen.name : undefined,
            grid: Object.assign({ index: 'id', selectable: true, selected: sel, onSelectionChange: (keys) => { window.__calls.push(['select', keys]); setSel(keys); }, openKey: open,
              onRowClick: (r) => { window.__calls.push(['click', r.id]); setOpen(r.id); },
              rowMenu: [{ label: 'Rename', icon: 'pencil', onSelect: (r) => window.__calls.push(['rename', r.id]) }] }, props.label ? { label: props.label } : {}) },
            chosen ? h(P.Text, { as: 'p', id: 'detail' }, chosen.name) : null);
        }
        document.getElementById('main').innerHTML = '<div id="a" style="block-size:600px;display:flex"></div><div id="b" style="block-size:300px;display:flex"></div>';
        ReactDOM.createRoot(document.getElementById('a')).render(h(App));
        ReactDOM.createRoot(document.getElementById('b')).render(h(App, { label: 'My files' }));
        await new Promise((r) => setTimeout(r, 900));
      }, dir);
      const row = (id) => '#a [role="row"][data-plx-record="string:' + id + '"]';
      const names = await page.evaluate(() => [...document.querySelectorAll('#a [role="grid"], #a [role="treegrid"], #b [role="grid"], #b [role="treegrid"]')].map((g) => g.getAttribute('aria-label')));
      assert.deepEqual(names, ['Documents', 'My files'], dir + ': the list is named by paneTitle, or by grid.label');
      assert.ok(await page.evaluate(() => !!document.querySelector('#a [role="columnheader"] input[type="checkbox"], #a input[type="checkbox"]')), dir + ': selectable reaches the grid (the checkbox column)');
      // a plain click opens the row, marks it open and selects only it
      // the name cell (the last cell holds the row menu's button)
      const nameCell = await page.evaluateHandle((sel) => [...document.querySelectorAll(sel + ' [role="gridcell"]')].find((c) => /Project brief/.test(c.textContent)), row('two'));
      await nameCell.asElement().click(); await new Promise((r) => setTimeout(r, 400));
      const after = await page.evaluate((sel) => ({ current: document.querySelector(sel).getAttribute('aria-current'), detail: (document.getElementById('detail') || {}).textContent || '',
        calls: window.__calls.slice() }), row('two'));
      assert.deepEqual(after.calls.filter((c) => c[0] === 'click'), [['click', 'two']], dir + ': onRowClick gets the clicked record');
      assert.equal(after.current, 'true', dir + ': openKey marks the open row (aria-current)');
      assert.equal(after.detail, 'Project brief', dir + ': the detail side shows it');
      const lastSel = after.calls.filter((c) => c[0] === 'select').pop();
      assert.deepEqual(lastSel && lastSel[1], ['two'], dir + ': a plain click selects only that row');
      // a tick adds a row
      await page.click(row('one') + ' input[type="checkbox"]'); await new Promise((r) => setTimeout(r, 300));
      const tick = await page.evaluate(() => window.__calls.filter((c) => c[0] === 'select').pop()[1].slice().sort());
      assert.deepEqual(tick, ['one', 'two'], dir + ': a tick adds a row to the selection');
      // the row menu runs the app's item
      await page.click(row('three'), { button: 'right' }); await new Promise((r) => setTimeout(r, 400));
      const items = await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].filter((e) => e.getClientRects().length).map((e) => e.textContent.trim()));
      assert.ok(items.includes('Rename'), dir + ': rowMenu reaches the grid, got ' + items.join(', '));
      await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].find((e) => e.textContent.trim() === 'Rename').click()); await new Promise((r) => setTimeout(r, 200));
      assert.deepEqual(await page.evaluate(() => window.__calls.filter((c) => c[0] === 'rename').pop()), ['rename', 'three'], dir + ': the row menu item runs with its record');
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('SPLITWORKSPACE_GRID_681_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
