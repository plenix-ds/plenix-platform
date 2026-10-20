// row moves without drag, column moves from the header menu, kept view (storageKey)
const path = require('path');
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix';
const { serve, launch, sleep } = require(path.join(ROOT, 'tests/lib.js'));
const PORT = 8874, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const OUT = __dirname;
const mount = () => {
  const P = window.Plenix, R = window.React, RD = window.ReactDOM;
  let host = document.getElementById('dt-probe');
  if (!host) { host = document.createElement('div'); host.id = 'dt-probe'; (document.querySelector('.plx-data-grid') ? document.querySelector('.plx-data-grid').parentNode : document.body).prepend(host); }
  const rows = [1, 2, 3, 4].map((n) => ({ id: n, handle: '', name: 'Row ' + n, type: 'T' + n, size: n * 10, owner: 'O' + n }));
  window.__moved = [];
  const el = R.createElement(P.DataGrid, { label: 'Probe', data: rows, storageKey: 'probe', options: { movableRows: true, movableColumns: true },
    on: { rowMoved: (r) => window.__moved.push(r.getData().name) },
    columns: [{ title: 'Order', field: 'handle', kind: 'icon', icon: 'menu-lines', rowHandle: true, headerSort: false },
      { title: 'Name', field: 'name', kind: 'name' }, { title: 'Type', field: 'type' }, { title: 'Size', field: 'size', sorter: 'number' }, { title: 'Owner', field: 'owner' }] });
  if (RD.createRoot) { window.__root = window.__root || RD.createRoot(host); window.__root.render(el); } else RD.render(el, host);
  return !!P.DataGrid;
};
(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage();
  const log = (...a) => console.log(...a);
  page.on('pageerror', (e) => log('PAGEERROR', e.message));
  page.on('console', (m) => { if (m.type() === 'error') log('CONSOLE', m.text()); });
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(600);
    await page.evaluate(() => localStorage.removeItem('plx-data-grid:probe'));
    log('globals', await page.evaluate(() => ({ P: !!window.Plenix, R: !!window.React, RD: !!window.ReactDOM })));
    log('mounted', await page.evaluate(mount)); await sleep(1500);
    const names = () => page.evaluate(() => Array.from(document.querySelectorAll('#dt-probe .tabulator-row')).map((r) => r.querySelector('[tabulator-field="name"]').textContent.trim()).join(','));
    const heads = () => page.evaluate(() => Array.from(document.querySelectorAll('#dt-probe .tabulator-col')).map((c) => c.getAttribute('tabulator-field')).join(','));
    log('rows', await names(), 'cols', await heads(), await page.evaluate(() => document.querySelector('#dt-probe').innerText.slice(0,300)));
    log('handle attrs', await page.evaluate(() => { const h = document.querySelector('#dt-probe .tabulator-row .plx-data-grid__cell--handle'); return h && [h.tabIndex, h.getAttribute('aria-label'), h.getAttribute('aria-haspopup')].join('/'); }));
    // click the first handle: the move menu
    await page.click('#dt-probe .tabulator-row .plx-data-grid__cell--handle'); await sleep(300);
    log('handle menu', await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).map((x) => x.textContent.trim() + (x.classList.contains('tabulator-menu-item-disabled') ? '(off)' : '')).join(' | ')));
    await page.screenshot({ path: path.join(OUT, 'dt-row-menu.png') });
    await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).find((x) => x.textContent.trim() === 'Move to bottom').click()); await sleep(300);
    log('after Move to bottom', await names(), 'moved', await page.evaluate(() => window.__moved.join(',')));
    // keyboard: focus the handle of row 3 (index 1 now), Alt+ArrowUp
    await page.evaluate(() => document.querySelectorAll('#dt-probe .tabulator-row .plx-data-grid__cell--handle')[1].focus());
    await page.keyboard.down('Alt'); await page.keyboard.press('ArrowUp'); await page.keyboard.up('Alt'); await sleep(200);
    log('after Alt+Up', await names(), 'focus on handle of', await page.evaluate(() => { const a = document.activeElement; const r = a && a.closest('.tabulator-row'); return r && r.querySelector('[tabulator-field="name"]').textContent; }));
    // row context menu has the moves
    const row = await page.$('#dt-probe .tabulator-row [tabulator-field="type"]');
    await row.click({ button: 'right' }); await sleep(300);
    log('row menu', await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).map((x) => x.textContent.trim()).join(' | ')));
    await page.mouse.click(5, 5); await sleep(200);
    // header menu: Move right on Type
    const th = await page.$('#dt-probe .tabulator-col[tabulator-field="type"] .tabulator-col-title');
    await th.click({ button: 'right' }); await sleep(300);
    log('header menu', await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).map((x) => x.textContent.trim()).join(' | ')));
    await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).find((x) => x.textContent.trim() === 'Move right').click()); await sleep(300);
    log('cols after Move right', await heads());
    // width via header menu: Wider on Name
    const thn = await page.$('#dt-probe .tabulator-col[tabulator-field="name"] .tabulator-col-title');
    await thn.click({ button: 'right' }); await sleep(300);
    await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).find((x) => x.textContent.trim() === 'Wider').click()); await sleep(300);
    // sort by size desc, hide owner
    await page.evaluate(() => { const t = document.querySelector('#dt-probe .tabulator'); });
    const tho = await page.$('#dt-probe .tabulator-col[tabulator-field="owner"] .tabulator-col-title');
    await tho.click({ button: 'right' }); await sleep(300);
    await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).find((x) => x.textContent.trim() === 'Hide column').click()); await sleep(300);
    const ths = await page.$('#dt-probe .tabulator-col[tabulator-field="size"] .tabulator-col-title');
    await ths.click({ button: 'right' }); await sleep(300);
    await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).find((x) => x.textContent.trim() === 'Sort Z to A').click()); await sleep(300);
    log('stored', await page.evaluate(() => localStorage.getItem('plx-data-grid:probe')));
    // reload and mount again: the view comes back
    await page.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(600);
    await page.evaluate(mount); await sleep(1500);
    log('restored rows', await names(), 'cols', await heads(), 'owner visible', await page.evaluate(() => { const c = document.querySelector('#dt-probe .tabulator-col[tabulator-field="owner"]'); return c ? getComputedStyle(c).display : 'gone'; }),
      'name class', await page.evaluate(() => (document.querySelector('#dt-probe .tabulator-col[tabulator-field="name"]').className.match(/__w-\S+/) || [''])[0]));
    await page.evaluate(() => localStorage.removeItem('plx-data-grid:probe'));
  } catch (e) { log('ERR', e); }
  await browser.close(); server.close();
})();
