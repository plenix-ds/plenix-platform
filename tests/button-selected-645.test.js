/* Plenix tests · a selected button is readable in the dark theme (issue 645).
   Summary: a selected Button (a toggle that is on) took its fill from the palette color gray-200 directly, which does not change with the theme, while its text and icon take the
     content role, light in the dark theme: in dark the fill was rgb(232, 233, 236) with text and icon of the same color (contrast 1.0). The fill is now a themed role
     (--plx-sys-fill-neutral-hover: gray-200 in light, gray-700 in dark), so light is unchanged and dark reads at 5.9.
   The probe is proved able to see the old failure first: the old build's dark ghost, secondary, tertiary and primary buttons read a contrast of 1.00 between the fill and the text, so
     the limits below (4.5 for the text, 3 for the icon) fail on it.
   Cases: each variant (ghost, secondary, tertiary, primary), selected, in the light and the dark theme: the text against the fill at least 4.5, the icon against the fill at least 3.
   Usage: node tests/button-selected-645.test.js   (run by layout.test.js when the Button or the theme tokens changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9635, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    for (const mode of ['light', 'dark']) {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      const rows = await page.evaluate(async (mode) => {
        document.documentElement.setAttribute('data-plx-mode', mode);
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement, P = Plenix, V = ['ghost', 'secondary', 'tertiary', 'primary'];
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, V.map((v) => h(P.Button, { key: v, variant: v, icon: 'mic', pressed: true, id: v }, v))));
        await new Promise((r) => setTimeout(r, 900));
        const lum = (c) => { const m = c.match(/[\d.]+/g).map(Number).slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]; };
        const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        return V.map((v) => { const e = document.getElementById(v), s = getComputedStyle(e), path = e.querySelector('svg path'), fill = path ? getComputedStyle(path).fill : 'none';
          return { v, text: ratio(s.color, s.backgroundColor), icon: ratio(fill === 'none' ? s.color : fill, s.backgroundColor) }; });
      }, mode);
      for (const r of rows) {
        assert.ok(r.text >= 4.5, mode + ' ' + r.v + ' selected: the text against the fill is at least 4.5 (the old dark build: 1.00), got ' + r.text.toFixed(2));
        assert.ok(r.icon >= 3, mode + ' ' + r.v + ' selected: the icon against the fill is at least 3, got ' + r.icon.toFixed(2));
      }
      await page.close();
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('button-selected-645: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
