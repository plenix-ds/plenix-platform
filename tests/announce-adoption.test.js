/* Plenix tests · hand-made live regions through LiveRegion (issue 262, PR 7: WidgetGrid, CodeBlock, Resizable, ColumnsMenu, CommandBar panels).
   Summary: the screen-reader messages of a reorder, a copy and a resize limit were spoken from a visually hidden element each component made itself
     (role="status" on a VisuallyHidden). They now use LiveRegion, which marks its region data-plx-live="status", so the region is the system's own.
   The probe is proved able to see the old shape first: a hand-made VisuallyHidden role="status" has no data-plx-live, so the same query that finds the
     LiveRegion regions does not find it. Then each control is driven the way a person does it, and the test reads the hidden region that speaks:
     WidgetGrid: Arrow Right on a widget's handle says "Alpha, position 2 of 2"; CodeBlock: Copy says "Copied"; Resizable: Arrow Left on its handle
     past the smallest width says the limit. Each region must be a LiveRegion (data-plx-live="status", role="status", aria-live="polite") and say that text.
   ColumnsMenu and the CommandBar panels (Sort, Filter) draw the same region inside a popup; they are held by the hook-adoption rule (LiveRegion is imported and drawn).
   Usage: node tests/announce-adoption.test.js   (run by layout.test.js when one of these units or utils/announce.jsx changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9626, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [], got = {};
    const run = async (k) => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(k + ': ' + e.message));
      await page.setViewport({ width: 1000, height: 800 });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(async (k) => {
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement, P = window.Plenix;
        const el = k === 'WidgetGrid' ? h(P.WidgetGrid, { label: 'Dash', items: [{ id: 'a', title: 'Alpha' }, { id: 'b', title: 'Beta' }], onReorder: () => {}, renderItem: (w) => h('p', null, w.title) })
          : k === 'CodeBlock' ? h(P.CodeBlock, { title: 'x.js' }, 'const a = 1;')
          : k === 'Resizable' ? h(P.Resizable, { label: 'Preview', axis: 'horizontal', defaultWidth: 320, minWidth: 200, maxWidth: 560 }, h('p', null, 'body'))
          // the control: a region made by hand, as the components were
          : h(P.VisuallyHidden, { role: 'status' }, 'by hand');
        ReactDOM.createRoot(document.getElementById('c')).render(el); await new Promise((r) => setTimeout(r, 900));
      }, k);
      if (k === 'WidgetGrid') { await page.evaluate(() => document.querySelector('.plx-widget-grid__item button').focus()); await page.keyboard.press('ArrowRight'); }
      if (k === 'CodeBlock') { const bt = await page.$('button[aria-label*="opy"], .plx-code-block button'); if (bt) await bt.click(); }
      if (k === 'Resizable') { const hd = await page.$('[role=separator]'); if (hd) { await hd.focus(); for (let i = 0; i < 40; i++) await page.keyboard.press('ArrowLeft'); } }
      await wait(500);
      got[k] = await page.evaluate(() => ({
        live: [...document.querySelectorAll('[data-plx-live="status"]')].map((e) => ({ role: e.getAttribute('role'), live: e.getAttribute('aria-live'), text: e.textContent.trim() })),
        hand: [...document.querySelectorAll('.plx-visually-hidden[role=status]')].filter((e) => !e.hasAttribute('data-plx-live')).map((e) => e.textContent.trim())
      }));
      await page.close();
    };
    for (const k of ['hand', 'WidgetGrid', 'CodeBlock', 'Resizable']) await run(k);
    // the probe sees the old shape: a hand-made region is not found by the LiveRegion query
    assert.deepEqual(got.hand.live, [], 'the probe sees it: a hand-made status region is not a LiveRegion');
    assert.deepEqual(got.hand.hand, ['by hand'], 'the probe sees the hand-made region by role');
    const want = { WidgetGrid: /^Alpha, position 2 of 2$/, CodeBlock: /^Copied$/, Resizable: /^Smallest width for Preview \(200px\)$/ };
    for (const k of Object.keys(want)) {
      assert.equal(got[k].live.length, 1, k + ': one LiveRegion speaks');
      assert.equal(got[k].live[0].role, 'status', k + ': role status');
      assert.equal(got[k].live[0].live, 'polite', k + ': polite');
      assert.match(got[k].live[0].text, want[k], k + ': what it says');
      assert.deepEqual(got[k].hand, [], k + ': no hand-made status region is left');
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('announce-adoption: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
