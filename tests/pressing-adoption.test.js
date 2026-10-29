/* Plenix tests · pressing through usePressable (issue 262, PR 4: the DataGrid header's menu trigger and filter trigger).
   Summary: the column menu's chevron is a span with role="button", so the browser sends it no click for Enter or Space: the menu could
     only be opened with the mouse or with Arrow Down. The trigger now takes its press from usePressable, so Enter and Space open it as on a button.
   The probe is proved able to see the unfixed behavior first: the same Menu around a bare span role="button" (what the header drew before) stays closed
     on Enter and on Space, so a trigger that went back to a bare span would fail the lines after it.
   Then, in a DataGrid: Enter opens the column menu, Space opens it, a mouse click opens it, and a key press on the chevron does not also sort the column
     (the header's own sort key only answers when the header itself has focus).
   Usage: node tests/pressing-adoption.test.js   (run by layout.test.js when DataGrid or usePressable changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9625, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1200, height: 800 });
    const fresh = async (mount) => {
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(async (m) => {
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement, P = window.Plenix;
        const node = m === 'bare'
          ? h(P.Menu, { label: 'Bare', trigger: h('span', { role: 'button', tabIndex: 0, id: 'trig', 'aria-label': 'Bare menu' }, 'x') }, h(P.MenuItem, null, 'One'))
          : h('div', { style: { height: 400 } }, h(P.DataGrid, { label: 'Probe', columns: [{ field: 'n', title: 'Name', type: 'text' }, { field: 'q', title: 'Qty', type: 'number' }], data: [{ id: 1, n: 'A', q: 3 }, { id: 2, n: 'B', q: 1 }] }));
        ReactDOM.createRoot(document.getElementById('c')).render(node);
        await new Promise((r) => setTimeout(r, 1200));
      }, mount);
    };
    const menus = () => page.$$eval('[role=menu]', (a) => a.length);
    const settle = () => new Promise((r) => setTimeout(r, 400));
    const res = {};
    // the control: a bare span role=button does not open on a key
    for (const key of ['Enter', 'Space']) {
      await fresh('bare'); await page.focus('#trig'); await page.keyboard.press(key); await settle();
      res['bare-' + key] = await menus();
    }
    // the header's chevron
    for (const key of ['Enter', 'Space']) {
      await fresh('grid');
      await page.evaluate(() => document.querySelector('.plx-data-grid__menu-chevron').focus());
      await page.keyboard.press(key); await settle();
      res['grid-' + key] = await menus();
      res['grid-' + key + '-sort'] = await page.$eval('[role=columnheader][data-plx-field="n"]', (e) => e.getAttribute('aria-sort'));
    }
    await fresh('grid'); await page.click('.plx-data-grid__menu-chevron'); await settle(); res['grid-click'] = await menus();
    assert.deepEqual([res['bare-Enter'], res['bare-Space']], [0, 0], 'the probe sees it: a bare span role=button stays closed on Enter and on Space');
    assert.equal(res['grid-Enter'], 1, 'Enter on the column menu chevron opens the menu');
    assert.equal(res['grid-Space'], 1, 'Space on the column menu chevron opens the menu');
    assert.equal(res['grid-click'], 1, 'a mouse click still opens the menu');
    assert.equal(res['grid-Enter-sort'], null, 'Enter on the chevron does not also sort the column');
    assert.equal(res['grid-Space-sort'], null, 'Space on the chevron does not also sort the column');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('pressing-adoption: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
