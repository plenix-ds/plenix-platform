// DataTable / WidgetGrid / PanelSplitter / EmptyState checks for the drag-alternative work
const path = require('path');
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix';
const { serve, launch, sleep } = require(path.join(ROOT, 'tests/lib.js'));
const PORT = 8873, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const OUT = __dirname;
(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage();
  const log = (...a) => console.log(...a);
  page.on('pageerror', (e) => log('PAGEERROR', e.message));
  try {
    // 1. Files app table at 1440: header menu items, grip keyboard
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(800);
    log('grips:', await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-table__resize')).map((g) => g.getAttribute('role') + ':' + g.getAttribute('aria-label') + ':' + g.getAttribute('aria-valuenow')).slice(0, 4)));
    const w0 = await page.evaluate(() => { const g = document.querySelector('.plx-data-table__resize'); g.focus(); return g.closest('.tabulator-col').getBoundingClientRect().width; });
    await page.keyboard.press('ArrowRight'); await sleep(100); await page.keyboard.press('ArrowRight'); await sleep(100);
    const w1 = await page.evaluate(() => document.querySelector('.plx-data-table__resize').closest('.tabulator-col').getBoundingClientRect().width);
    log('grip keyboard width', w0, '->', w1);
    // the header menu
    const col = await page.$('.tabulator-col:not(.tabulator-row-header) .tabulator-col-title');
    await col.click({ button: 'right' }); await sleep(300);
    log('header menu:', await page.evaluate(() => Array.from(document.querySelectorAll('.tabulator-menu .tabulator-menu-item')).map((x) => x.textContent.trim()).join(' | ')));
    await page.screenshot({ path: path.join(OUT, 'dt-header-menu.png') });
    await page.keyboard.press('Escape'); await page.mouse.click(5, 5); await sleep(200);
    // 2. Files at 400px: Narrow list
    await page.setViewport({ width: 400, height: 800 });
    await page.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(1000);
    log('narrow:', await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-table')).map((g) => ({ list: g.classList.contains('plx-data-table--list'), w: Math.round(g.getBoundingClientRect().width), header: getComputedStyle(g.querySelector('.tabulator-header')).display, row: (() => { const r = g.querySelector('.tabulator-row'); return r ? getComputedStyle(r).display + ' ' + Math.round(r.getBoundingClientRect().height) : null; })(), visibleCells: (() => { const r = g.querySelector('.tabulator-row'); return r ? Array.from(r.querySelectorAll('.tabulator-cell')).filter((c) => getComputedStyle(c).display !== 'none').map((c) => c.textContent.trim().slice(0, 20)) : null; })() }))));
    await page.screenshot({ path: path.join(OUT, 'dt-narrow.png') });
    // 3. engine failure: error state and Retry
    await page.setViewport({ width: 1200, height: 800 });
    const p2 = await browser.newPage();
    p2.on('pageerror', (e) => log('PAGEERROR2', e.message));
    let block = true;
    await p2.setRequestInterception(true);
    p2.on('request', (r) => { if (block && /tabulator\.min\.js/.test(r.url())) r.abort(); else r.continue(); });
    await p2.setViewport({ width: 1200, height: 800 });
    await p2.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(800);
    log('error state:', await p2.evaluate(() => { const e = document.querySelector('.plx-data-table .plx-empty-state'); return e ? e.getAttribute('role') + ' | ' + e.textContent.trim() : 'none'; }));
    await p2.screenshot({ path: path.join(OUT, 'dt-error.png') });
    block = false;
    await p2.evaluate(() => { const b = Array.from(document.querySelectorAll('.plx-data-table .plx-empty-state button')).find((x) => /Retry/.test(x.textContent)); if (b) b.click(); });
    await sleep(2000);
    log('after retry:', await p2.evaluate(() => ({ rows: document.querySelectorAll('.plx-data-table .tabulator-row').length, err: !!document.querySelector('.plx-data-table .plx-empty-state--error') })));
    await p2.close();
    // 4. dashboard: widget handle menu
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + 'dashboard/index.html', { waitUntil: 'networkidle0' }); await sleep(800);
    const before = await page.evaluate(() => Array.from(document.querySelectorAll('.plx-widget-grid__handle')).map((h) => h.getAttribute('aria-label')).slice(0, 3));
    await page.click('.plx-widget-grid__handle'); await sleep(300);
    log('widget menu:', await page.evaluate(() => Array.from(document.querySelectorAll('.plx-menu [role="menuitem"]')).map((x) => x.textContent.trim() + (x.getAttribute('aria-disabled') ? '(off)' : '')).join(' | ')));
    await page.screenshot({ path: path.join(OUT, 'wg-menu.png') });
    await page.evaluate(() => Array.from(document.querySelectorAll('.plx-menu [role="menuitem"]')).find((x) => x.textContent.trim() === 'Move later').click());
    await sleep(300);
    const after = await page.evaluate(() => Array.from(document.querySelectorAll('.plx-widget-grid__handle')).map((h) => h.getAttribute('aria-label')).slice(0, 3));
    log('order', before, '->', after, 'focus:', await page.evaluate(() => document.activeElement && document.activeElement.getAttribute('aria-label')));
    // arrow keys still move without opening the menu
    await page.keyboard.press('ArrowUp'); await sleep(300);
    log('after ArrowUp:', await page.evaluate(() => Array.from(document.querySelectorAll('.plx-widget-grid__handle')).map((h) => h.getAttribute('aria-label')).slice(0, 3)), 'menu open:', await page.evaluate(() => !!document.querySelector('.plx-menu')));
    // 5. nav splitter menu
    await page.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(600);
    const sp = await page.$('.plx-panel-splitter');
    if (sp) {
      const box = await sp.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await sleep(200);
      log('splitter menu visible on hover:', await page.evaluate(() => { const m = document.querySelector('.plx-panel-splitter__menu'); return m && getComputedStyle(m).visibility; }));
      const btn = await page.$('.plx-panel-splitter__menu button');
      const bb = await btn.boundingBox(); log('button box', bb);
      await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await sleep(50);
      await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await sleep(300);
      log('splitter items:', await page.evaluate(() => Array.from(document.querySelectorAll('.plx-menu [role="menuitem"]')).map((x) => x.textContent.trim() + (x.getAttribute('aria-disabled') ? '(off)' : '')).join(' | ')));
      await page.screenshot({ path: path.join(OUT, 'split-menu.png') });
      const v0 = await page.evaluate(() => document.querySelector('.plx-panel-splitter').getAttribute('aria-valuenow'));
      await page.evaluate(() => Array.from(document.querySelectorAll('.plx-menu [role="menuitem"]')).find((x) => x.textContent.trim() === 'Wider').click()); await sleep(300);
      log('width', v0, '->', await page.evaluate(() => document.querySelector('.plx-panel-splitter').getAttribute('aria-valuenow')));
    } else log('no splitter');
  } catch (e) { log('ERR', e); }
  await browser.close(); server.close();
})();
