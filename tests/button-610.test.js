/* Plenix tests · button label centering and the Danger pressed step (issue 610, owner 2026-10-29).
   Summary: two things the owner asked for in the button build.
     1. The label is centered in the button by its capital letters: the label box is trimmed to the letters (text-box: trim-both cap alphabetic), so the
        capitals sit within half a pixel of the button's middle at 32px and at 28px. Before, the capitals sat about 1.1px high at 28px.
     2. Danger and Danger secondary have a pressed color of their own, red-900 (#7a0000, the one new color the owner approved): Danger steps rest red-700, hover
        red-800, pressed red-900 (three distinct steps), and Danger secondary's pressed is red-900, not its hover, in the light and in the dark theme.
   The probe is proved able to see the old values first: before the build, 28px read 1.13px high and Danger's pressed was its hover color (red-800), so the limits
     below fail on the old code.
   Centering is measured on the picture: the button is photographed at four times the pixels with the text "HEH" (capitals only) and the first and last rows of dark ink
     give the capitals' middle.
   Usage: node tests/button-610.test.js   (run by layout.test.js when the Button changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT0 = +process.env.TEST_PORT || 9630;
(async () => {
  const server = await serve(PORT0); let browser;
  try {
    browser = await launch(); const errors = [];
    const fresh = async (mode, scale) => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
      await page.setViewport({ width: 900, height: 400, deviceScaleFactor: scale || 1 });
      await page.goto('http://localhost:' + PORT0 + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      if (mode) await page.evaluate((m) => document.documentElement.setAttribute('data-plx-mode', m), mode);
      return page;
    };
    // 1. the capitals' middle against the button's middle, in px (+ is low)
    const page = await fresh(null, 4);
    await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c" style="padding:24px"></div>'; const h = React.createElement, P = Plenix;
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', { style: { display: 'flex', gap: 16, alignItems: 'center' } }, ['md', 'sm'].map((s) => h(P.Button, { key: s, size: s, id: 'b-' + s }, 'HEH'))));
      await new Promise((r) => setTimeout(r, 1200));
    });
    const offsets = {};
    for (const s of ['md', 'sm']) {
      const el = await page.$('#b-' + s), box = await el.boundingBox(), png = await el.screenshot({ encoding: 'base64' });
      offsets[s] = await page.evaluate(async (png, height) => {
        const img = await createImageBitmap(await (await fetch('data:image/png;base64,' + png)).blob()), c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data, k = img.height / height, m = Math.round(2 * k);
        let top = -1, bot = -1;
        for (let y = m; y < c.height - m; y++) { let dark = 0; for (let xx = Math.round(8 * k); xx < c.width - Math.round(8 * k); xx++) { const i = (y * c.width + xx) * 4; if (d[i] + d[i + 1] + d[i + 2] < 300) dark++; } if (dark) { if (top < 0) top = y; bot = y; } }
        return ((top + bot + 1) / 2) / k - height / 2;
      }, png, box.height);
    }
    await page.close();
    assert.ok(Math.abs(offsets.md) <= 0.5, '32px: the capitals are within half a pixel of the middle, got ' + offsets.md.toFixed(2));
    assert.ok(Math.abs(offsets.sm) <= 0.5, '28px: the capitals are within half a pixel of the middle (the old build: 1.13 high), got ' + offsets.sm.toFixed(2));
    // 2. the Danger pressed steps, in both themes
    const read = async (mode) => {
      const p = await fresh(mode);
      await p.evaluate(async () => {
        document.querySelector('main').innerHTML = '<div id="c" style="display:flex;gap:12px;padding:16px"></div>'; const h = React.createElement;
        ReactDOM.createRoot(document.getElementById('c')).render(React.createElement(React.Fragment, null, ['danger', 'danger-secondary'].map((v) => h(Plenix.Button, { key: v, variant: v, id: 'b-' + v }, v))));
        await new Promise((r) => setTimeout(r, 900));
      });
      const out = {};
      for (const v of ['danger', 'danger-secondary']) {
        const col = () => p.evaluate((id) => getComputedStyle(document.getElementById(id)).backgroundColor, 'b-' + v);
        const rest = await col(); await p.hover('#b-' + v); await wait(250); const hover = await col(); await p.mouse.down(); await wait(250); const pressed = await col(); await p.mouse.up(); await p.mouse.move(2, 2);
        out[v] = { rest, hover, pressed };
      }
      await p.close(); return out;
    };
    for (const mode of ['light', 'dark']) {
      const c = await read(mode), d = c.danger, s = c['danger-secondary'];
      assert.deepEqual([d.rest, d.hover, d.pressed], ['rgb(183, 0, 0)', 'rgb(153, 0, 0)', 'rgb(122, 0, 0)'], mode + ': Danger steps red-700, red-800, red-900');
      assert.equal(new Set([d.rest, d.hover, d.pressed]).size, 3, mode + ': Danger has three distinct steps');
      assert.equal(s.pressed, 'rgb(122, 0, 0)', mode + ': Danger secondary pressed is red-900');
      assert.notEqual(s.pressed, s.hover, mode + ': Danger secondary pressed is not its hover color');
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('button-610: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
