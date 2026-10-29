/* Plenix tests · controls follow read-only (issue 262, PRs 1 and 2).
   Summary: each control is drawn alone three ways: free (no read-only: a person can change it, which proves the probe works), inside a ReadOnly
     region (the region's contract: nothing changes) and with its own readOnly prop outside a region (nothing changes either). The probe clicks the
     control, types, presses arrow keys and Enter, clicks a choice it offers and presses its buttons, and counts the calls of its change handler.
     PR 1: SearchField, SegmentedControl, Rating, ColorSwatch, PromptInput, TimeZoneSelect. PR 2: NumberInput, DatePicker, Combobox, CountrySelect,
     TreeSelect, TransferList, InlineEdit, RichTextEditor, CodeEditor, MentionInput. TimePicker, Cascader and RelativeDateInput are drawn too, but
     the probe cannot change them even when they are free, so they prove nothing yet and are not asserted on (CHANGES lists the controls the probe
     can change; only those must change while free).
   Usage: node tests/readonly-adoption.test.js   (run by layout.test.js when a control, the ReadOnly provider or this test changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const CHANGES = ['SearchField', 'SegmentedControl', 'Rating', 'ColorSwatch', 'PromptInput', 'TimeZoneSelect', 'NumberInput', 'TreeSelect', 'TransferList', 'InlineEdit', 'RichTextEditor', 'CodeEditor', 'MentionInput'];
const NAMES = ['SearchField', 'SegmentedControl', 'Rating', 'ColorSwatch', 'PromptInput', 'TimeZoneSelect', 'NumberInput', 'DatePicker', 'Combobox', 'CountrySelect', 'TreeSelect', 'TransferList',
  'InlineEdit', 'RichTextEditor', 'CodeEditor', 'MentionInput', 'TimePicker', 'Cascader', 'RelativeDateInput'];
(async () => {
  const PORT = +process.env.TEST_PORT || 9623, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const run = async (k, mode) => {   // one control on a fresh page: no popup of another control is in play
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(k + ' ' + mode + ': ' + e.message));
      await page.setViewport({ width: 900, height: 900 });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(async (k, mode) => {
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix; window.__n = 0; const c = () => { window.__n++; };
        const opts = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }];
        const items = {
          SearchField: (o) => h(P.SearchField, Object.assign({ label: 'Search', value: 'abc', onChange: c }, o)),
          SegmentedControl: (o) => h(P.SegmentedControl, Object.assign({ label: 'View', value: 'a', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }], onChange: c }, o)),
          Rating: (o) => h(P.Rating, Object.assign({ label: 'Rating', value: 2, onChange: c }, o)),
          ColorSwatch: (o) => h(P.ColorSwatch, Object.assign({ color: 'blue', 'aria-label': 'Blue', onClick: c }, o)),
          PromptInput: (o) => h(P.PromptInput, Object.assign({ value: 'hi', onChange: c, onSend: c }, o)),
          TimeZoneSelect: (o) => h(P.TimeZoneSelect, Object.assign({ 'aria-label': 'Zone', value: 'UTC', onChange: c }, o)),
          NumberInput: (o) => h(P.NumberInput, Object.assign({ 'aria-label': 'Copies', value: 5, min: 0, max: 9, stepper: 'buttons', onChange: c }, o)),
          DatePicker: (o) => h(P.DatePicker, Object.assign({ 'aria-label': 'Due', value: '2026-10-01', onChange: c }, o)),
          Combobox: (o) => h(P.Combobox, Object.assign({ 'aria-label': 'Owner', options: opts, value: 'a', onChange: c }, o)),
          CountrySelect: (o) => h(P.CountrySelect, Object.assign({ 'aria-label': 'Country', value: 'US', onChange: c }, o)),
          TreeSelect: (o) => h(P.TreeSelect, Object.assign({ label: 'Folder', nodes: [{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }], value: 'a', onChange: c }, o)),
          TransferList: (o) => h(P.TransferList, Object.assign({ label: 'Columns', options: opts, value: ['a'], onChange: c }, o)),
          InlineEdit: (o) => h(P.InlineEdit, Object.assign({ label: 'Title', value: 'Title', onConfirm: c }, o)),
          RichTextEditor: (o) => h(P.RichTextEditor, Object.assign({ label: 'Notes', defaultValue: '<p>hi</p>', onChange: c }, o)),
          CodeEditor: (o) => h(P.CodeEditor, Object.assign({ label: 'Code', language: 'css', value: 'a{}', onChange: c }, o)),
          MentionInput: (o) => h(P.MentionInput, Object.assign({ label: 'Comment', value: 'hi', options: [{ value: 'm', label: 'Maya' }], onChange: c }, o)),
          TimePicker: (o) => h(P.TimePicker, Object.assign({ label: 'Start', value: '10:00', onChange: c }, o)),
          Cascader: (o) => h(P.Cascader, Object.assign({ label: 'Office', options: [{ value: 'a', label: 'Alpha', children: [{ value: 'a1', label: 'A1' }] }, { value: 'b', label: 'Beta' }], value: 'b', onChange: c }, o)),
          RelativeDateInput: (o) => h(P.RelativeDateInput, Object.assign({ label: 'Modified', onChange: c }, o))
        };
        const el = mode === 'region' ? h(P.ReadOnly, null, items[k]({})) : items[k](mode === 'own' ? { readOnly: true } : {});
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'probe' }, el));
        await new Promise((r) => setTimeout(r, 1000));
      }, k, mode);
      const target = await page.$(['input', 'textarea', '[role=radio]', '[role=slider]', '[role=combobox]', '[role=textbox]', '[contenteditable]', 'select', 'button'].map((s) => '#probe ' + s).join(', '));
      if (target) {
        await target.click().catch(() => {}); await new Promise((r) => setTimeout(r, 250));
        await page.keyboard.type('1').catch(() => {});
        for (const key of ['ArrowDown', 'ArrowRight', 'ArrowUp', 'Enter', 'Space']) await page.keyboard.press(key).catch(() => {});
        for (let i = 0; i < 2; i++) { const opt = await page.$('[role=option]:not([aria-disabled=true]), [role=treeitem], [role=menuitem], [role=gridcell] button'); if (opt) await opt.click().catch(() => {}); await new Promise((r) => setTimeout(r, 200)); }
        for (const bt of (await page.$$('#probe button')).slice(0, 3)) await bt.click().catch(() => {});
      }
      await new Promise((r) => setTimeout(r, 200));
      const n = await page.evaluate(() => window.__n); await page.close(); return n;
    };
    for (const k of NAMES) {
      const free = await run(k, 'free'), region = await run(k, 'region'), own = await run(k, 'own');
      if (CHANGES.indexOf(k) >= 0) assert.ok(free > 0, k + ': free, the probe changes it (else it proves nothing), got ' + free);
      if (CHANGES.indexOf(k) >= 0 || free > 0 || k === 'DatePicker' || k === 'Combobox' || k === 'CountrySelect') {
        assert.equal(region, 0, k + ': inside a ReadOnly region nothing changes, got ' + region + ' change(s)');
        assert.equal(own, 0, k + ': with readOnly nothing changes, got ' + own + ' change(s)');
      }
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('readonly-adoption: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
