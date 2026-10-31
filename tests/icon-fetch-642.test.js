/* Plenix tests · a fetched icon asks for one file, and only a few at a time (issue 642).
   Summary: an icon Plenix loads at run time (a Material name no module or icon file registers) used to ask for both of its drawings, the 20px and the 24px, whichever the page
     shows, and a page of many icons asked for all the files at once: 150 icons were about 300 requests in flight together, and the live CDN refused about half. Now an icon asks for the
     one file it will show (its optical size: 24 for lg and xl or a comfortable density, else 20), and at most 6 icon files are in flight at a time.
   The page draws 40 library icons from the local server, each file answered after 60 ms so that how many are in flight at once can be seen.
   The probe is proved able to see concurrency first: more than one file is in flight at once (the old build had every file in flight together: 74 of 74).
   Cases: compact, no size (20px files); lg (24px files); comfortable density (24px files); compact, then the page switches to comfortable at run time (the 24px files are fetched
     and every icon shows). Each case: one request per icon name, no more than 6 in flight, every icon drawn.
   First, the optical observer's lifetime: module icons attach no observer, fetched icons attach one, and unmounting the last fetched icon disconnects it.
   Usage: node tests/icon-fetch-642.test.js   (run by layout.test.js when the Icon component changed) */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ROOT = path.resolve(__dirname, '..');
// library names only: a name that is also a Plenix icon (library_add, open_in_full, redo among every 90th) draws from the
// Plenix set, not the library, so it would never ask for a library file (issue 777: 37 files for 40 names)
const GLYPHS = fs.readFileSync(path.join(ROOT, 'platform', 'components', 'Icon', 'glyphs.js'), 'utf8');
const PLENIX = new Set(/export const SYMBOLS = "([^"]*)"/.exec(GLYPHS)[1].split(' ').concat(Object.keys(JSON.parse(/export const NAMES = (\{.*\});/.exec(GLYPHS)[1]))));
const NAMES = (/export const LIBRARY = "([^"]*)"/.exec(GLYPHS)[1]).split(' ').filter((n) => !PLENIX.has(n) && !PLENIX.has(n.replace(/_/g, '-'))).filter((_, i) => i % 90 === 0).slice(0, 40);
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
    // The optical-size observer exists only for fetched icons (QA on 79b0fe5f): window.MutationObserver is wrapped to count the page-wide observer Icon attaches (the one
    // that filters on data-plx-icon-optical) and its disconnects. Module icons (registered from the Plenix icon file, and StatusIcon's imported ones) attach none; fetched
    // icons attach exactly one; unmounting the last fetched icon disconnects it, while the module icons stay mounted.
    const observerLife = async () => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/dist/plenix-icons-plenix.js' });
      const kinds = await page.evaluate(() => {
        const Native = window.MutationObserver, count = window.__opticalCount = { observe: 0, disconnect: 0 };
        window.MutationObserver = class extends Native {
          observe(target, options) { if (options && options.attributeFilter && options.attributeFilter.includes('data-plx-icon-optical')) { this.__optical = true; count.observe++; } return super.observe(target, options); }
          disconnect() { if (this.__optical) count.disconnect++; return super.disconnect(); }
        };
        document.documentElement.setAttribute('data-plx-density', 'compact');
        document.querySelector('main').innerHTML = '<div id="m"></div><div id="f"></div>';
        return ['add', 'close', 'folder', 'home'].map((n) => (Plenix.resolveIcon(n) || {}).kind);
      });
      assert.deepEqual(kinds, ['module', 'module', 'module', 'module'], 'the Plenix icon file registers the module icons');
      await page.evaluate(() => {
        const names = ['add', 'close', 'folder', 'home'], el = React.createElement;
        window.__modules = ReactDOM.createRoot(document.getElementById('m'));
        window.__modules.render(el('div', null, [].concat(...[undefined, 'sm', 'md', 'xs'].map((size) => names.map((n) => el(Plenix.Icon, { key: n + size, name: n, size })))),
          ['info', 'success', 'warning', 'danger'].map((t) => el(Plenix.StatusIcon, { key: t, tone: t }))));
      });
      await wait(500);
      const modulesOnly = await page.evaluate(() => ({ ...window.__opticalCount }));
      await page.evaluate((names) => {
        window.__fetched = ReactDOM.createRoot(document.getElementById('f'));
        window.__fetched.render(React.createElement('div', null, names.map((n) => React.createElement(Plenix.Icon, { key: n, name: n }))));
      }, NAMES.slice(0, 8));
      await wait(500);
      const withFetched = await page.evaluate(() => ({ ...window.__opticalCount }));
      await page.evaluate(() => window.__fetched.unmount());
      await wait(200);
      const afterUnmount = await page.evaluate(() => ({ ...window.__opticalCount }));
      await page.close();
      return { modulesOnly, withFetched, afterUnmount };
    };
    const life = await observerLife();
    assert.equal(life.modulesOnly.observe, 0, 'module icons only: no optical observer, got ' + life.modulesOnly.observe);
    assert.equal(life.withFetched.observe, 1, 'fetched icons: exactly one optical observer, got ' + life.withFetched.observe);
    assert.equal(life.withFetched.disconnect, 0, 'fetched icons mounted: the observer stays connected');
    assert.equal(life.afterUnmount.disconnect, 1, 'the last fetched icon unmounted: the observer is disconnected, got ' + life.afterUnmount.disconnect);
    assert.equal(life.afterUnmount.observe, 1, 'module icons left mounted attach no new observer');
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
