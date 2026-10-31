/* Plenix tests · descriptions through useDescribedBy (issue 262, PR 3: Cascader, CodeEditor, FileInput, InputGroup, RelativeDateInput, AvatarUpload).
   Summary: each control is drawn in a Field with a help text and an error (and, where it has them of its own, alone), and the test reads the aria-describedby of its
     element and the TEXT of every element that names, in order. The expected lists below are what the controls described before they moved onto useDescribedBy
     (measured on styling/phase-2 at 5a620b5c): the order matters, because a screen reader reads the descriptions in it (the Cascader's chosen value first, then the Field's
     help and error; a FileInput's help, error and then the chosen file). The move must change none of them, and must leave no empty aria-describedby behind.
   The probe is proved able to see a difference first: the same FileInput drawn with an owner's own description reads that text before its own line, so a control that
     dropped the owner's ids, or put its own first, would show.
   Usage: node tests/describedby-adoption.test.js   (run by layout.test.js when one of these controls or utils/describedBy.ts changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const EXPECTED = {
  Cascader: ['Choose', 'Help text for Cascader', 'Error text for Cascader'],
  CodeEditor: ['Help text for CodeEditor', 'Error text for CodeEditor', 'Tab indents. Press Escape, then Tab, to leave the editor.'],
  FileInput: ['Help text for FileInput', 'Error text for FileInput', 'No file chosen'],
  InputGroup: ['Help text for InputGroup', 'Error text for InputGroup', '$', 'USD'],
  RelativeDateInput: ['Help text for RelativeDateInput', 'Error text for RelativeDateInput'],
  AvatarUpload: ['At least 200 pixels', 'No file chosen'],
  'alone-InputGroup': ['$', 'USD'],
  'alone-Cascader': ['Choose'],
  'alone-FileInput': ['No file chosen'],
  'alone-CodeEditor': ['Tab indents. Press Escape, then Tab, to leave the editor.']
};
(async () => {
  const PORT = +process.env.TEST_PORT || 9624, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const got = await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix, noop = () => {};
      const items = {
        Cascader: (f) => h(P.Cascader, Object.assign({ label: 'Office', options: [{ value: 'a', label: 'Alpha' }], value: 'a', onChange: noop }, f)),
        CodeEditor: (f) => h(P.CodeEditor, Object.assign({ label: 'Code', language: 'css', value: 'a{}', onChange: noop }, f)),
        FileInput: (f) => h(P.FileInput, Object.assign({ label: 'File' }, f)),
        InputGroup: (f) => h(P.InputGroup, Object.assign({ prefix: '$', suffix: 'USD' }, f), h(P.Input, { 'aria-label': 'Amount', defaultValue: '5' })),
        RelativeDateInput: (f) => h(P.RelativeDateInput, Object.assign({ label: 'Modified', onChange: noop }, f)),
        AvatarUpload: (f) => h(P.AvatarUpload, Object.assign({ name: 'Maya Chen', description: 'At least 200 pixels', onChange: noop }, f))
      };
      const inField = new Set(['Cascader', 'CodeEditor', 'FileInput', 'InputGroup', 'RelativeDateInput']);
      const rows = Object.keys(items).map((k) => h('div', { key: k, id: 'x-' + k }, inField.has(k) ? h(P.Field, { label: k, description: 'Help text for ' + k, error: 'Error text for ' + k }, items[k]()) : items[k]()))
        .concat(['InputGroup', 'Cascader', 'FileInput', 'CodeEditor'].map((k) => h('div', { key: 'a' + k, id: 'x-alone-' + k }, items[k]())))
        // the probe's control: an owner's own description on a bare FileInput comes before the control's own line
        .concat([h('div', { key: 'own', id: 'x-owner-FileInput' }, h('p', { id: 'owner-note' }, 'Owner note'), items.FileInput({ 'aria-describedby': 'owner-note' }))]);
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, rows));
      await new Promise((r) => setTimeout(r, 1000));
      const texts = (el) => { const v = el && el.getAttribute('aria-describedby'); return v === null ? null : v.split(/\s+/).filter(Boolean).map((i) => { const t = document.getElementById(i); return t ? t.textContent.trim().replace(/\s+/g, ' ') : '<no element>'; }); };
      const res = { empty: [] };
      document.querySelectorAll('[aria-describedby]').forEach((e) => { if (e.getAttribute('aria-describedby') === '') res.empty.push(e.tagName); });
      ['Cascader', 'CodeEditor', 'FileInput', 'InputGroup', 'RelativeDateInput', 'AvatarUpload', 'alone-InputGroup', 'alone-Cascader', 'alone-FileInput', 'alone-CodeEditor', 'owner-FileInput'].forEach((k) => { res[k] = texts(document.querySelector('#x-' + k + ' [aria-describedby]')); });
      res['alone-RelativeDateInput-has-none'] = document.querySelectorAll('#c [aria-describedby]').length;
      return res;
    });
    // the probe can see a difference: the owner's note leads, the control's own line follows
    assert.deepEqual(got['owner-FileInput'], ['Owner note', 'No file chosen'], 'the probe sees the owner\'s own description first, then the control\'s own');
    for (const k of Object.keys(EXPECTED)) assert.deepEqual(got[k], EXPECTED[k], k + ': what it describes, in order');
    assert.deepEqual(got.empty, [], 'no empty aria-describedby');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('describedby-adoption: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
