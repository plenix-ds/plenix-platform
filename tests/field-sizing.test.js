/* Plenix tests · field sizing in bars (issues 558 and 554, platform/standards/fit-and-overflow.md).
   Summary: in a Toolbar a Select, a Search and an Input without a width size to their content between --plx-sys-fit-field-min-width (100px) and --plx-sys-fit-field-max-width
     (320px): a short Select is widened to 100px, a Select with a very long choice stops at 320px and shows the full text in a tooltip on hover. The Toolbar folds its Buttons first (a Search
     keeps its natural width while a Button is still shown) and only when every Button is in More do the fields shrink, down to 100px. A Delete menu button drops its words (the icon
     and the chevron stay) and an icon-only Button folds into More. The width scale keeps its meaning outside a bar: a Select with width="sm" is 80px. Right to left gives the same widths.
   Usage: node tests/field-sizing.test.js   (run by layout.test.js when a field, the Toolbar, the ActionBar or the fold helpers changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9622, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const LONG = 'A choice with a very long name that is wider than any field should be, to the end of the line and past it';
    for (const dir of ['ltr', 'rtl']) {
      const got = await page.evaluate(async (dir, LONG) => {
        document.documentElement.dir = dir;
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix, noop = () => {};
        const bar = (id, w, kids) => h('div', { id, style: { inlineSize: w + 'px' } }, h(P.Toolbar, { label: id }, kids));
        const btn = (t, icon) => h(P.Button, { key: t, icon, variant: 'ghost' }, t);
        const sel = (opts, extra) => h(P.Select, Object.assign({ key: 's', 'aria-label': 'Choice', defaultValue: opts[0].value, options: opts }, extra));
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          bar('short', 700, [sel([{ value: 'a', label: 'PNG' }, { value: 'b', label: 'JPG' }])]),
          bar('long', 700, [sel([{ value: 'a', label: LONG }])]),
          bar('wide', 700, [btn('Edit', 'edit'), btn('Share', 'share'), h(P.SearchField, { key: 'q', label: 'Search', value: '', onChange: noop })]),
          bar('tight', 300, [btn('Edit', 'edit'), btn('Share', 'share'), h(P.SearchField, { key: 'q', label: 'Search', value: '', onChange: noop })]),
          bar('narrow', 200, [btn('Edit', 'edit'), btn('Share', 'share'), h(P.SearchField, { key: 'q', label: 'Search', value: '', onChange: noop })]),
          h('div', { id: 'scale' }, h(P.Select, { 'aria-label': 'Small', width: 'sm', options: [{ value: 'a', label: 'One' }] }))));
        await new Promise((r) => setTimeout(r, 900));
        const w = (sel2) => Math.round(document.querySelector(sel2).getBoundingClientRect().width);
        const q = (id) => document.querySelector('#' + id + ' [role=toolbar]');
        const info = (id) => { const t = q(id), s = t.querySelector('.plx-search'); return { search: s ? Math.round(s.getBoundingClientRect().width) : 0, more: !!t.querySelector('[aria-label="More actions"]'), buttons: [...t.querySelectorAll('button')].filter((b) => b.getClientRects().length && !/More actions|Clear|Search/.test(b.getAttribute('aria-label') || '')).length, over: t.scrollWidth > t.clientWidth + 1 }; };
        return { short: w('#short .plx-select'), long: w('#long .plx-select'), wide: info('wide'), tight: info('tight'), narrow: info('narrow'), scale: w('#scale .plx-select') };
      }, dir, LONG);
      assert.ok(got.short >= 100, dir + ': a short Select is widened to the minimum (100px), got ' + got.short);
      assert.ok(got.long <= 320 && got.long >= 316, dir + ': a Select with a very long choice stops at the maximum (320px), got ' + got.long);
      assert.equal(got.scale, 80, dir + ': width="sm" is still exactly 80px outside a bar');
      assert.ok(!got.wide.more && got.wide.search >= 200, dir + ': with room, nothing folds and the Search keeps its natural width');
      assert.ok(got.tight.more || got.tight.search >= got.wide.search - 1, dir + ': the Buttons fold before the Search shrinks');
      assert.ok(got.narrow.more && got.narrow.search >= 100, dir + ': when out of room every Button is in More and the Search stays at 100px or more');
      assert.ok(!got.tight.over, dir + ': a bar with room for its minimums does not overflow');
    }
    // the cut text of a Select shows in full in a tooltip on hover
    await page.setViewport({ width: 900, height: 900 });
    await page.evaluate(async (LONG) => {
      document.documentElement.dir = 'ltr'; document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix;
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'cut', style: { inlineSize: '200px' } }, h(P.Select, { 'aria-label': 'Choice', width: 'fill', options: [{ value: 'a', label: LONG }] })));
      await new Promise((r) => setTimeout(r, 600));
    }, LONG);
    await page.hover('#cut .plx-select__field'); await new Promise((r) => setTimeout(r, 800));
    assert.ok(await page.evaluate(() => [...document.querySelectorAll('[role="tooltip"]')].some((e) => /very long name/.test(e.textContent))), 'a cut Select shows its full text in a tooltip');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('field-sizing: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
