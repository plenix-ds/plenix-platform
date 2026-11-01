// Plenix · DataGrid high-impact regressions: default sorts, storage, menus, bidi, selection and nested controls.
const assert = require('assert');
const { serve, launch } = require('./lib.js');
module.exports = async function regressions(page) {
  return page.evaluate(async () => {
    const P = window.Plenix, R = window.React, D = window.ReactDOM, h = R.createElement;
    const host = document.createElement('div'); document.body.appendChild(host);
    let root = D.createRoot(host), count = 0, table, v, selected;
    const wait = (n = 150) => new Promise((r) => setTimeout(r, n));
    const check = (yes, text) => { if (!yes) throw new Error(text); count++; };
    const mount = async (node) => { D.flushSync(() => root.render(node)); await wait(650); };
    const reset = async () => { D.flushSync(() => root.unmount()); root = D.createRoot(host); table = null; await wait(); };
    const rows = [{ id: 1, name: 'Zulu' }, { id: 2, name: 'Alpha' }, { id: 3, name: 'تقرير' }];
    const columns = [{ title: 'Name', field: 'name' }];
    const ready = (t) => { table = t; };
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [], options: { initialSort: [{ column: 'name', dir: 'desc' }] }, onReady: ready }));
    check(table.getSorters()[0].dir === 'desc', 'DT-1: an empty view leaves options.initialSort intact');
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [{ field: 'name', dir: 'desc' }], onReady: ready }));
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [], onReady: ready }));
    check(table.getSorters()[0].dir === 'desc', 'DT-1: a view matching the initial sort does not claim ownership of it');
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [{ field: 'name', dir: 'asc' }], onReady: ready }));
    check(table.getSorters()[0].dir === 'asc', 'DT-1: view applies its own sort');
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [], onReady: ready }));
    check(table.getSorters().length === 0, 'DT-1: view clears a sort it applied');
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [{ field: 'name', dir: 'asc' }], onReady: ready }));
    table.setSort('name', 'desc'); await wait();
    await mount(h(P.DataGrid, { label: 'Default sort', data: rows, columns, sort: [], onReady: ready }));
    check(table.getSorters()[0].dir === 'desc', 'DT-1: empty view preserves a later table-owned header sort');
    check(host.querySelector('.plx-data-grid__value').closest('.plx-data-grid__grid-cell').dir === 'auto', 'DT-9: plain table values use automatic text direction');
    check(getComputedStyle(table.getRow(3).getCell('name').getElement()).direction === 'rtl', 'DT-9: an Arabic text cell aligns in its own direction');
    await reset();
    let calls = 0;
    const menus = [{ label: 'Open record', action: () => calls++ }, { label: 'Disabled', disabled: true }, { separator: true }];
    await mount(h(P.DataGrid, { label: 'Row commands', data: rows, columns, rowMenu: menus, onReady: ready }));
    const button = host.querySelector('button[aria-label="Row actions"]');
    check(button && button.tabIndex === 0 && button.getAttribute('aria-haspopup') === 'menu', 'DT-2: row menu button is a named Tab stop');
    check(getComputedStyle(button.closest('.plx-data-grid__cell--row-menu')).position!=='sticky', 'DT-2: the row command column is not pinned by default (issue 679)');
    button.focus(); button.click(); await wait();
    const item = [...document.querySelectorAll('[role=menuitem]')].find((e) => e.textContent.includes('Open record'));
    check(item, 'DT-2: row action button opens the shared menu');
    item.click(); await wait(); check(calls === 1, 'DT-3: action alias receives menu activation');
    await mount(h(P.DataGrid, { label: 'Row commands', data: rows, columns, rowMenu: menus, rowMenuButton: false, onReady: ready }));
    check(!host.querySelector('button[aria-label="Row actions"]'), 'DT-2: rowMenuButton=false hides only the button');
    table.getRows()[0].getElement().dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true })); await wait();
    check(document.querySelector('[role=menu]'), 'DT-2: right-click remains available');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); await reset();
    const fields = [{ value: 'name', label: 'Name' }];
    const Hook = () => { v = P.useCollectionView(fields, { storageKey: 'dt-high-test', sort: [{ field: 'name', dir: 'desc' }] }); return h(P.ViewMenu, v.viewProps); };
    localStorage.removeItem('dt-high-test.collection');
    await mount(h(Hook));
    check(v.sort[0].dir === 'desc', 'DT-1: hook starts with configured sort');
    D.flushSync(() => { v.setSearch('Alpha'); v.setFilter({ join: 'or', items: [] }); v.setQuick('name', ['Alpha']); v.setSort([{ field: 'name', dir: 'asc' }]); v.setGroup([{ field: 'name' }]); v.setColumns({ order: ['name'], hidden: ['name'] }); v.setView({ layout: 'gallery', size: 'l', height: 'tall' }); }); await wait();
    await reset(); await mount(h(Hook));
    check(v.search === 'Alpha' && v.filter.join === 'or' && v.quick.name[0] === 'Alpha' && v.sort[0].dir === 'asc' && v.group[0].field === 'name' && v.columns.hidden[0] === 'name' && v.view.height === 'tall', 'DT-4: every collection setting survives remount');
    host.querySelector('button').click(); await wait();
    const resetItem = [...document.querySelectorAll('[role=menuitem]')].find((e) => e.textContent === 'Reset view');
    check(resetItem, 'DT-4: View menu exposes Reset view'); resetItem.click(); await wait();
    check(v.search === '' && v.sort[0].dir === 'desc' && !v.group.length && !v.columns.hidden.length && v.view.height === 'short', 'DT-4: reset restores initial values and default sort');
    check(localStorage.getItem('dt-high-test.collection') === null, 'DT-4: Reset view removes persisted collection state');
    await reset();
    localStorage.setItem('dt-high-test.collection', JSON.stringify({ search: 'kept', filter: { join: 'and', items: [{ field: 'removed', op: 'is', value: 'old' }] }, quick: { removed: ['old'] }, sort: [{ field: 'removed', dir: 'asc' }], group: [{ field: 'removed' }], columns: { order: ['removed'], hidden: ['removed'] }, view: { layout: 'list', size: 'm', height: 'short' } }));
    await mount(h(Hook));
    check(v.search === 'kept' && !v.sort.length && !v.group.length && !v.filter.items.length && !Object.keys(v.quick).length && v.columns.order[0] === 'name' && !v.columns.hidden.length, 'DT-4: stale persisted fields are removed while useful state remains');
    await reset(); localStorage.setItem('dt-high-test.collection', '{broken'); await mount(h(Hook));
    check(v.search === '' && v.sort[0].dir === 'desc', 'DT-4: malformed storage starts fresh'); await reset();
    const originalGet = Storage.prototype.getItem, originalSet = Storage.prototype.setItem;
    Storage.prototype.getItem = () => { throw new Error('blocked'); }; Storage.prototype.setItem = () => { throw new Error('blocked'); };
    await mount(h(Hook)); check(v.search === '', 'DT-4: unavailable storage does not prevent mounting'); await reset();
    Storage.prototype.getItem = originalGet; Storage.prototype.setItem = originalSet;
    let opens = 0, clicks = 0;
    const controls = [{ title: 'Name', field: 'name' }, { title: 'Actions', field: 'actions', render: () => h('div', null,
      h(P.Button, { onClick: () => clicks++ }, 'Nested button'), h('a', { href: '#nested', onClick: (e) => e.preventDefault() }, 'Link'),
      h('input', { 'aria-label': 'Nested input' }), h('span', { 'data-plx-no-row-click': '' }, 'Custom control')) }];
    await mount(h(P.DataGrid, { label: 'Interactive cells', data: rows, columns: controls, selectable: true, onReady: ready, on: { rowClick: () => opens++ } }));
    for (const selector of ['button', 'a', 'input:not([type=checkbox])', '[data-plx-no-row-click]']) host.querySelector('.plx-data-grid__grid-row ' + selector).click();
    await wait();
    check(clicks === 1 && opens === 0 && !table.getSelectedRows().length, 'DT-17: nested controls act without opening or selecting the row');
    table.getRows()[0].getElement().click(); await wait(); check(opens === 1 && table.getSelectedRows().length === 1, 'DT-17: ordinary row clicks still open and select');
    await reset();
    let opened = null;
    await mount(h(P.DataGrid, { label: 'People', data: rows, columns, onRowClick: (r) => { opened = r.id; } }));
    host.querySelectorAll('.plx-data-grid__grid-row')[1].querySelector('[role="gridcell"]').click(); await wait();
    const openRow = host.querySelectorAll('.plx-data-grid__grid-row')[1];
    check(opened !== null && openRow.getAttribute('aria-current') === 'true' && openRow.classList.contains('plx-data-grid__grid-selected')
      && host.querySelectorAll('[aria-current="true"].plx-data-grid__grid-row').length === 1, 'DataGrid: the open row is marked (aria-current and the selected look) #453');
    await reset(); await mount(h(P.DataGrid, { label: 'People', data: rows, columns, onRowClick: () => {}, openKey: null }));
    host.querySelectorAll('.plx-data-grid__grid-row')[0].querySelector('[role="gridcell"]').click(); await wait();
    check(!host.querySelector('.plx-data-grid__grid-row[aria-current]') && !host.querySelector('.plx-data-grid__grid-selected'), 'DataGrid: with openKey null, a clicked row stays unmarked #453');
    await reset(); await mount(h(P.DataGrid, { label: 'People', data: rows, columns, onRowClick: () => {}, openKey: rows[2].id }));
    const keyed = host.querySelectorAll('.plx-data-grid__grid-row[aria-current="true"]');
    check(keyed.length === 1 && keyed[0].textContent.includes(rows[2].name) && keyed[0].classList.contains('plx-data-grid__grid-selected'), 'DataGrid: openKey marks its row without a click #453');
    await reset();
    const selectionChange = (keys, info) => { selected = { keys, info }; };
    await mount(h(P.DataGrid, { label: 'Hidden selection', data: rows, columns, selectable: true, onReady: ready, onSelectionChange: selectionChange }));
    table.selectRow([1, 2]); table.setFilter('name', '=', 'Alpha'); await wait();
    check(selected.info.count === 2 && selected.info.hidden === 1, 'DT-11: kept hidden selection reports its count');
    await reset();
    await mount(h(P.DataGrid, { label: 'Drop hidden', data: rows, columns, selectable: true, keepHiddenSelection: false, onReady: ready, onSelectionChange: selectionChange }));
    table.selectRow([1, 2]); table.setFilter('name', '=', 'Alpha'); await wait();
    check(table.getSelectedRows().length === 1 && selected.info.hidden === 0 && selected.keys[0] === 2, 'DT-11: keepHiddenSelection=false drops filtered rows');
    await reset();
    await mount(h(P.CommandBar, { label: 'Records', selection: { count: 2, hidden: 1 } }));
    check(host.textContent.includes('2 selected (1 hidden by filters)'), 'DT-11: command bar explains hidden selected rows');
    await reset(); await mount(h(P.Text, { truncate: true }, 'تقرير'));
    check(host.querySelector('.plx-text').dir === 'auto', 'DT-9: Text has automatic direction');
    await mount(h(P.Text, { dir: 'ltr' }, 'تقرير'));
    check(host.querySelector('.plx-text').dir === 'ltr', 'DT-9: callers can explicitly override Text direction');
    D.flushSync(() => root.unmount()); host.remove(); localStorage.removeItem('dt-high-test.collection');
    return count;
  });
};
module.exports.warning = async function warning(page, base) {
  await page.setViewport({ width: 390, height: 800 });
  await page.goto(base + 'tests/fixtures/platform-host.html?react=dev', { waitUntil: 'networkidle0' });
  const result = await page.evaluate(async () => {
    const P = window.Plenix, R = window.React, D = window.ReactDOM, h = R.createElement;
    const host = document.createElement('div'); document.body.appendChild(host); const root = D.createRoot(host);
    let table; const original = console.warn, warnings = []; console.warn = (...args) => warnings.push(args.join(' '));
    try {
      D.flushSync(() => root.render(h(P.DataGrid, { label: 'Invalid menu', data: [{ id: 1, name: 'Example' }], columns: [{ field: 'name', title: 'Name' }],
        rowMenu: () => [{ label: 'Missing action regression' }], onReady: (t) => { table = t; } })));
      for (let i = 0; !table && i < 60; i++) await new Promise((r) => setTimeout(r, 100));
      for (let i = 0; i < 2; i++) { table.getRow(1).getElement().dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true })); await new Promise((r) => setTimeout(r, 100)); }
      const cell = host.querySelector('.plx-data-grid__cell--row-menu'), button = host.querySelector('button[aria-label="Row actions"]');
      const visible = getComputedStyle(cell).display !== 'none' && getComputedStyle(button).opacity === '1';
      return { visible, dev: !!R.createElement('span')._store, warnings: warnings.filter((text) => text.includes('Missing action regression')).length };
    } finally { console.warn = original; D.flushSync(() => root.unmount()); host.remove(); }
  });
  assert(result.dev && result.warnings === 1, 'DT-3: missing handlers warn once in development, including recreated menu items');
  assert(result.visible, 'DT-2: row menu remains visible in narrow list layout');
  await page.setViewport({ width: 1440, height: 1000 });
  return 3;
};
if (require.main === module) (async () => {
  const port = +process.env.TEST_PORT || 9021, server = await serve(port); let browser;
  try { browser = await launch(); const page = await browser.newPage(); await page.goto('http://127.0.0.1:' + port + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'networkidle0' });
    let count = await module.exports(page); count += await module.exports.warning(page, 'http://127.0.0.1:' + port + '/Plenix/'); assert(count >= 20); console.log('DT_HIGH_OK ' + count + ' regression checks');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exitCode = 1; });
