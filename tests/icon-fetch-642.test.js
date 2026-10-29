/* Plenix tests · a fetched icon asks for one file, and only a few at a time (issue 642).
   Summary: an icon Plenix loads at run time (a Material name no module or icon file registers) used to ask for both of its drawings, the 20px and the 24px, whichever the page
     shows, and a page of many icons asked for all the files at once: 150 icons were about 300 requests in flight together, and the live CDN refused about half. Now an icon asks for the
     one file it will show (its optical size: 24 for lg and xl or a comfortable density, else 20), and at most 6 icon files are in flight at a time.
   The page draws 40 library icons from the local server, each file answered after 60 ms so that how many are in flight at once can be seen.
   The probe is proved able to see concurrency first: more than one file is in flight at once (the old build had every file in flight together: 74 of 74).
   Cases: compact, no size (20px files); lg (24px files); comfortable density (24px files); compact, then the page switches to comfortable at run time (the 24px files are fetched
     and every icon shows). Each case: one request per icon name, no more than 6 in flight, every icon drawn.
   Usage: node tests/icon-fetch-642.test.js   (run by layout.test.js when the Icon component changed) */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ROOT = path.resolve(__dirname, '..');
const NAMES = (/export const LIBRARY = "([^"]*)"/.exec(fs.readFileSync(path.join(ROOT, 'platform', 'components', 'Icon', 'glyphs.js'), 'utf8'))[1]).split(' ').filter((_, i) => i % 90 === 0).slice(0, 40);
const UNIQUE = new Set(NAMES).size;
(async () => {
  const PORT = +process.env.TEST_PORT || 9632, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const run = async ({ size, density, thenDensity }) => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message)); const files = []; let inflight = 0, max = 0;
      await page.setRequestInterception(true);
      page.on('request', async (r) => {
        if (/\/icons\/library\/.*\.svg/.test(r.url())) { files.push(r.url().split('/').pop()); inflight++; max = Math.max(max, inflight); await wait(60); inflight--; }
        r.continue();
      });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate((names, size, density) => {
        document.documentElement.setAttribute('data-plx-density', density); document.querySelector('main').innerHTML = '<div id="c"></div>';
        ReactDOM.createRoot(document.getElementById('c')).render(React.createElement('div', null, names.map((n) => React.createElement(Plenix.Icon, { key: n, name: n, size }))));
      }, NAMES, size, density);
      await wait(3500);
      if (thenDensity) { await page.evaluate((d) => document.documentElement.setAttribute('data-plx-density', d), thenDensity); await wait(3000); }
      const shown = await page.evaluate(() => [...document.querySelectorAll('#c .plx-icon')].filter((e) => { const p = [...e.querySelectorAll('path')].find((x) => getComputedStyle(x).display !== 'none'); return !!p; }).length);
      await page.close();
      return { files, max, shown };
    };
    const compact = await run({ density: 'compact' });
    assert.ok(compact.max >= 2, 'the probe sees it: more than one file is in flight at once (the old build had all of them together), got ' + compact.max);
    assert.equal(compact.files.length, UNIQUE, 'compact: one file per icon name (' + compact.files.length + ' for ' + UNIQUE + ')');
    assert.ok(compact.files.every((f) => !/-24/.test(f)), 'compact: the 20px files');
    assert.ok(compact.max <= 6, 'compact: at most 6 in flight, got ' + compact.max);
    assert.equal(compact.shown, NAMES.length, 'compact: every icon is drawn');
    const lg = await run({ size: 'lg', density: 'compact' });
    assert.equal(lg.files.length, UNIQUE, 'lg: one file per icon name'); assert.ok(lg.files.every((f) => /-24\.svg$/.test(f)), 'lg: the 24px files'); assert.ok(lg.max <= 6, 'lg: at most 6 in flight'); assert.equal(lg.shown, NAMES.length, 'lg: every icon is drawn');
    const comfortable = await run({ density: 'comfortable' });
    assert.equal(comfortable.files.length, UNIQUE, 'comfortable: one file per icon name'); assert.ok(comfortable.files.every((f) => /-24\.svg$/.test(f)), 'comfortable: the 24px files'); assert.ok(comfortable.max <= 6, 'comfortable: at most 6 in flight'); assert.equal(comfortable.shown, NAMES.length, 'comfortable: every icon is drawn');
    const switched = await run({ density: 'compact', thenDensity: 'comfortable' });
    assert.equal(switched.files.length, UNIQUE * 2, 'a density switch at run time: the 24px files follow the 20px ones (' + switched.files.length + ' for ' + UNIQUE * 2 + ')');
    assert.ok(switched.max <= 6, 'a density switch: at most 6 in flight'); assert.equal(switched.shown, NAMES.length, 'a density switch: every icon shows its 24px drawing');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('icon-fetch-642: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
