/* Plenix tests · an empty Table or DataGrid is valid ARIA (#313)
   Summary: with no rows, the row group holds the empty message as a row with one cell, so axe's aria-required-children
     passes: on the spec's Icon page (which has an empty static Table) and on an empty DataGrid and Table mounted here.
   Usage: node tests/empty-table-a11y-313.test.js */
const assert = require('assert/strict'), path = require('path'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9313, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    const axeRun = async () => { await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      return page.evaluate(async () => (await axe.run(document, { runOnly: ['aria-required-children'] })).violations.map((v) => v.nodes.map((n) => n.html.slice(0, 120))).flat()); };
    await page.goto('http://localhost:' + PORT + '/Plenix/platform/design-system/index.html#/foundations/icon', { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 5000));
    const icon = await axeRun();
    assert.deepEqual(icon, [], 'the Icon page has no aria-required-children issue:\n' + icon.join('\n'));
    await page.evaluate(async () => {
      document.body.innerHTML = '<div id="g"></div><div id="t"></div>';
      const h = React.createElement, P = window.Plenix, columns = [{ title: 'Name', field: 'name' }, { title: 'City', field: 'city' }];
      ReactDOM.createRoot(document.getElementById('g')).render(h(P.DataGrid, { label: 'Empty grid', data: [], columns, height: '--plx-ref-size-240px' }));
      ReactDOM.createRoot(document.getElementById('t')).render(h(P.Table, { label: 'Empty table', data: [], columns }));
      await new Promise((r) => setTimeout(r, 800));
    });
    const mounted = await axeRun();
    assert.deepEqual(mounted, [], 'an empty DataGrid and Table have no aria-required-children issue:\n' + mounted.join('\n'));
    const empty = await page.evaluate(() => [...document.querySelectorAll('[role="row"] [class*="__empty"]')].map((e) => e.textContent.trim()));
    assert.equal(empty.length, 2, 'both show their empty message inside a row');
    console.log('EMPTY_TABLE_A11Y_313_OK Icon page, empty DataGrid and Table: the empty message is a row with one cell');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
