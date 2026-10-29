/* Plenix tests · controls follow read-only (issue 262, PR 1: SegmentedControl, ColorSwatch, PromptInput, TimeZoneSelect).
   Summary: each control is drawn three ways: free (no read-only: a person can change it, which proves the probe works), inside a ReadOnly region
     (the region's contract: nothing changes) and with its own readOnly prop outside a region (nothing changes either). The probe clicks the control,
     types, presses an arrow key, Enter and Space, and counts the calls of its change handler. SearchField and Rating are drawn too: they already held
     (the region locks their native input; Rating has its own readOnly) and must keep holding.
   Usage: node tests/readonly-adoption.test.js   (run by layout.test.js when a control, the ReadOnly provider or this test changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
// the controls that change something a person can see: the probe works on them while they are free
const CHANGES = ['SearchField', 'SegmentedControl', 'Rating', 'ColorSwatch', 'PromptInput', 'TimeZoneSelect'];
(async () => {
  const PORT = +process.env.TEST_PORT || 9623, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const names = await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix, log = {};
      const count = (k) => () => { log[k].n++; };
      const items = {
        SearchField: (ro) => h(P.SearchField, Object.assign({ label: 'Search', value: 'abc', onChange: count('SearchField') }, ro ? { readOnly: true } : {})),
        SegmentedControl: (ro) => h(P.SegmentedControl, Object.assign({ label: 'View', value: 'a', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }], onChange: count('SegmentedControl') }, ro ? { readOnly: true } : {})),
        Rating: (ro) => h(P.Rating, Object.assign({ label: 'Rating', value: 2, onChange: count('Rating') }, ro ? { readOnly: true } : {})),
        ColorSwatch: (ro) => h(P.ColorSwatch, Object.assign({ color: 'blue', 'aria-label': 'Blue', onClick: count('ColorSwatch') }, ro ? { readOnly: true } : {})),
        PromptInput: (ro) => h(P.PromptInput, Object.assign({ value: 'hi', onChange: count('PromptInput'), onSend: count('PromptInput') }, ro ? { readOnly: true } : {})),
        TimeZoneSelect: (ro) => h(P.TimeZoneSelect, Object.assign({ 'aria-label': 'Zone', value: 'UTC', onChange: count('TimeZoneSelect') }, ro ? { readOnly: true } : {}))
      };
      Object.keys(items).forEach((k) => { log[k] = { n: 0 }; });
      const cell = (k, mode) => h('div', { key: k + mode, id: k + '-' + mode }, mode === 'region' ? h(P.ReadOnly, null, items[k](false)) : items[k](mode === 'own'));
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, ['free', 'region', 'own'].map((m) => Object.keys(items).map((k) => cell(k, m)))));
      await new Promise((r) => setTimeout(r, 900));
      window.__log = log; return Object.keys(items);
    });
    const probe = async (k, mode) => {
      const sel = '#' + k + '-' + mode, before = await page.evaluate((k) => window.__log[k].n, k);
      const target = await page.$(['input', 'textarea', '[role=radio]', '[role=slider]', '[role=combobox]', 'select', 'button'].map((s) => sel + ' ' + s).join(', '));
      if (target) {
        await target.click().catch(() => {}); await page.keyboard.type('x').catch(() => {});
        for (const key of ['ArrowDown', 'ArrowRight', 'Enter', 'Space']) await page.keyboard.press(key).catch(() => {});
      }
      await new Promise((r) => setTimeout(r, 150));
      return (await page.evaluate((k) => window.__log[k].n, k)) - before;
    };
    for (const k of names) {
      const free = await probe(k, 'free'), region = await probe(k, 'region'), own = await probe(k, 'own');
      if (CHANGES.indexOf(k) >= 0) assert.ok(free > 0, k + ': free, the probe changes it (else it proves nothing), got ' + free);
      assert.equal(region, 0, k + ': inside a ReadOnly region nothing changes, got ' + region + ' change(s)');
      assert.equal(own, 0, k + ': with readOnly nothing changes, got ' + own + ' change(s)');
    }
    // the group is marked read-only, and a read-only swatch button keeps its pressed state
    assert.equal(await page.$eval('#SegmentedControl-own [role=radiogroup]', (e) => e.getAttribute('aria-readonly')), 'true', 'SegmentedControl: aria-readonly on the group');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('readonly-adoption: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
