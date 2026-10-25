/* Plenix tests · tokens.css and plenixTokens (#158)
   Summary: build-packages' tokens.css has every token without @import; plenixTokens() adopts it into a shadow root on a
     page with no Plenix stylesheet, where the host gets the tokens in light and dark.
   Usage: node build-packages.js && node tests/tokens-sheet.test.js */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { serve, launch } = require('./lib');
const VERSION = require('../package.json').version, FILE = path.join(__dirname, '..', 'release', 'cdn', VERSION, 'tokens.css');
if (!fs.existsSync(FILE)) { console.log('TOKENS_SHEET_SKIP run node build-packages.js first'); process.exit(0); }
const css = fs.readFileSync(FILE, 'utf8');
assert.ok(!/@import\s+url/.test(css), 'no @import');
assert.ok(/:root,:host\{/.test(css), ':root rules also on :host');
assert.ok(css.includes(':host([data-plx-mode="dark"]'), 'the dark theme on :host too');
(async () => {
  const PORT = +process.env.TEST_PORT || 9377, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    // a page Plenix does not own: no plenix.css, only the bundle (for plenixTokens) and a shadow root
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/', { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.setContent('<!doctype html><div id="host"></div>');
    await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/vendor/react.production.min.js' }).catch(() => {});
    await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/vendor/react-dom.production.min.js' }).catch(() => {});
    await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/dist/platform.js' });
    const out = await page.evaluate(async (css) => {
      const blob = URL.createObjectURL(new Blob([css], { type: 'text/css' }));
      const host = document.getElementById('host'), root = host.attachShadow({ mode: 'open' });
      root.innerHTML = '<span id="x">x</span>';
      const sheet = await Plenix.plenixTokens(blob), again = await Plenix.plenixTokens(blob);
      root.adoptedStyleSheets = [sheet];
      const read = (n) => getComputedStyle(host).getPropertyValue(n).trim();
      const light = read('--plx-sys-surface-canvas'), count = [...getComputedStyle(host)].filter((n) => n.startsWith('--plx-')).length;
      host.setAttribute('data-plx-mode', 'dark');
      const dark = read('--plx-sys-surface-canvas');
      const page = getComputedStyle(document.documentElement).getPropertyValue('--plx-sys-surface-canvas').trim();
      let rejected = false; try { await Plenix.plenixTokens('http://localhost:1/missing.css'); } catch { rejected = true; }
      return { same: sheet === again, light, dark, count, page, rejected };
    }, css);
    assert.ok(out.same, 'one sheet per address');
    assert.ok(out.light && out.dark && out.light !== out.dark, 'light and dark on the host: ' + out.light + ' / ' + out.dark);
    assert.equal(out.page, '', 'nothing leaks onto the page');
    assert.ok(out.count > 1000, 'the host carries the tokens (' + out.count + ')');
    assert.ok(out.rejected, 'a missing file rejects');
    console.log('TOKENS_SHEET_OK ' + out.count + ' tokens on the shadow host; light ' + out.light + ', dark ' + out.dark + '; ' + Math.round(css.length / 1024) + ' KB, no @import');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
