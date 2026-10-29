/* Plenix tests · a Select or Combobox that holds a number or a date shows it in the data font (owner, issue 252, choice A).
   Summary: with no data prop, a Select showing "10" or "Oct 25, 2026" computes to Reddit Mono, one showing "Compact" or "15 minutes" to DM Sans;
     data={true} forces Reddit Mono, data={false} keeps DM Sans on a number; a Combobox with a chosen "2026-10-25" shows Reddit Mono.
   Usage: node tests/select-data-font.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9619, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const got = await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix, noop = () => {};
      const sel = (id, label, props) => h('div', { id }, h(P.Select, Object.assign({ 'aria-label': id, value: 'a', onChange: noop, options: [{ value: 'a', label }] }, props)));
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, sel('num', '10'), sel('date', 'Oct 25, 2026'), sel('word', 'Compact'), sel('dur', '15 minutes'), sel('forced', 'Compact', { data: true }), sel('off', '10', { data: false }),
        h('div', { id: 'combo' }, h(P.Combobox, { label: 'Date', options: [{ value: 'a', label: '2026-10-25' }], value: 'a', onChange: noop }))));
      await new Promise((r) => setTimeout(r, 500));
      const fam = (s) => getComputedStyle(document.querySelector(s)).fontFamily.split(',')[0].replace(/"/g, '');
      return { num: fam('#num .plx-select__value'), date: fam('#date .plx-select__value'), word: fam('#word .plx-select__value'), dur: fam('#dur .plx-select__value'), forced: fam('#forced .plx-select__value'), off: fam('#off .plx-select__value'), combo: fam('#combo .plx-combobox__input') };
    });
    assert.deepEqual(errors, [], 'no script errors');
    assert.deepEqual(got, { num: 'Reddit Mono', date: 'Reddit Mono', word: 'DM Sans', dur: 'DM Sans', forced: 'Reddit Mono', off: 'DM Sans', combo: 'Reddit Mono' });
    console.log('select-data-font: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
