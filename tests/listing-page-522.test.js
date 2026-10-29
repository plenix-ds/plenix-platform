/* Plenix tests · the canonical full-room list (issue 522, step 2): ListingPage with a toolbar, 500 records and a detail.
   Summary: the grid fills the room left below the toolbar and scrolls inside: its bottom meets the window's (within one
     grid gap), the page itself does not scroll, only the rows in view are drawn (virtual rows), there are no page
     controls; the toolbar sits above the grid; the chosen record's detail is a SidePanel beside the list (to its end),
     and the grid is named (label, default the title).
   Proof first: before this step ListingPage drew no toolbar, no detail and an unnamed grid, so the toolbar, detail and
     label lines fail there.
   Usage: node tests/listing-page-522.test.js   → LISTING_PAGE_522_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
(async () => {
  const PORT = +process.env.TEST_PORT || 9659, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const r = await page.evaluate(async () => {
      const h = React.createElement, P = window.Plenix;
      document.body.innerHTML = '<div id="c"></div>';
      const rows = Array.from({ length: 500 }, (_, i) => ({ id: i + 1, name: 'Record ' + (i + 1), owner: ['Ana', 'Ben', 'Chen'][i % 3] }));
      ReactDOM.createRoot(document.getElementById('c')).render(h(P.ListingPage, { title: 'Records',
        toolbar: h(P.CommandBar, { label: 'Record tools', actions: [{ id: 'new', label: 'New', icon: 'add' }] }),
        rows, columns: [{ field: 'name', title: 'Name', kind: 'name' }, { field: 'owner', title: 'Owner' }],
        grid: { selected: [3] }, detail: h('p', { id: 'detail' }, 'Record 3'), detailTitle: 'Record 3' }));
      await new Promise((res) => setTimeout(res, 2000));
      const holder = document.querySelector('.plx-data-grid__grid-tableholder'), hb = holder.getBoundingClientRect();
      const bar = document.querySelector('[role="toolbar"][aria-label="Record tools"]'), side = document.getElementById('detail')?.closest('.plx-side-panel');
      const grid = document.querySelector('.plx-data-grid [role="grid"], .plx-data-grid [role="treegrid"]');
      return {
        gap: innerHeight - hb.bottom, pageScroll: document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight,
        scrolls: holder.scrollHeight > holder.clientHeight, drawn: document.querySelectorAll('.plx-data-grid [role="row"]').length,
        pagination: document.querySelectorAll('.plx-data-grid .plx-pagination, .plx-data-grid nav[aria-label*="age"]').length,
        barAbove: !!bar && bar.getBoundingClientRect().bottom <= hb.top,
        sideBeside: !!side && side.getBoundingClientRect().left >= hb.right,
        label: grid ? grid.getAttribute('aria-label') : null,
      };
    });
    assert.ok(r.gap >= 0 && r.gap <= 24, 'the grid fills the room to the window bottom (within one gap): ' + JSON.stringify(r));
    assert.equal(r.pageScroll, 0, 'the page itself does not scroll');
    assert.ok(r.scrolls, 'the grid scrolls inside');
    assert.ok(r.drawn > 5 && r.drawn < 60, 'only the rows in view are drawn (virtual rows): ' + r.drawn);
    assert.equal(r.pagination, 0, 'no page controls');
    assert.ok(r.barAbove, 'the toolbar sits above the grid');
    assert.ok(r.sideBeside, 'the detail is a SidePanel beside the list');
    assert.equal(r.label, 'Records', 'the grid is named by the title');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('LISTING_PAGE_522_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
