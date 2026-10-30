// Plenix tests · focus order (library plan wave 2, the Focus order foundation; WCAG 2.4.3, 2.4.1): with the dev overlay's
// own check (platform/dev/focus-order.js, PlenixFocusOrder.check), on every application page and every page of the St.
// John the Beloved test site (LighthouseCollection/st-john-test-site, served at /Plenix/test-site/):
//   positive   no element has a positive tabindex (it would move ahead of the reading order)
//   order      the Tab stops follow the reading order: none sits above the stop before it, or behind it on its line
//   skip       on a page with a skip link, the skip link is the first stop
// then, on the test site's member page, focus moves into a dialog (Rename member) when it opens and back to its trigger
// when it closes; and on a fixture page, the overlay finds what it must (a positive tabindex, a row drawn in reverse,
// one stop per radio group) and draws one numbered badge per stop.
// Known findings are kept in tests/baselines/focus-order.json (page -> check -> number); the test fails only when a page
// has more findings than recorded, so they can only go down.
//   node tests/focus-order.test.js            compare
//   node tests/focus-order.test.js --update   record the current findings as the baseline (TEST_SCOPE=full only)
//   FOCUS_PORT=8834 (or TEST_PORT) node tests/focus-order.test.js   another port
//   TEST_SCOPE=full: every page; by default (tests/changed.js) the app pages that changed, the dialog when the Dialog or its
//   page changed, the fixture when the overlay (platform/dev, a global file) or this test changed
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep, APPS, at } = require('./lib.js');
const changed = require('./changed.js');
const PORT = +process.env.FOCUS_PORT || +process.env.TEST_PORT || 8798, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const BASELINE = path.join(__dirname, 'baselines', 'focus-order.json');
const UPDATE = process.argv.includes('--update');
const site = require('./site.js');
changed.noPartialUpdate();
const PAGES = changed.pages(APPS.map((a) => a + '/index.html').concat(site.urls()));
const FIXTURE = changed.wants({}), DIALOG = changed.wants({ units: ['components/Dialog'] }) || changed.pages([site.url('member')]).length > 0;
if (!PAGES.length && !FIXTURE && !DIALOG) changed.none('FOCUS_ORDER_OK (0 checks)');
changed.report(PAGES.length + ' app and test-site pages' + (DIALOG ? ', the dialog' : '') + (FIXTURE ? ', the fixture' : ''));

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const results = [];
  const check = (name, ok, detail) => { if (shared.check(name, ok, detail)) results.push([name, ok, detail]); };
  const overlay = async () => { if (!(await page.evaluate(() => !!window.PlenixFocusOrder))) await page.addScriptTag({ url: BASE + 'platform/dev/focus-order.js' }); };

  // ---- the fixture: what the overlay must find
  if (FIXTURE) {
  at('the fixture');
  await page.goto(BASE + 'platform/dev/', { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.setContent('<!doctype html><html lang="en"><body>'
    + '<a class="plx-app-shell__skip" href="#main">Skip to main content</a>'
    + '<div id="row"><button>One</button><button>Two</button></div>'
    + '<div id="rev"><button>Three</button><button>Four</button></div>'
    + '<fieldset><input type="radio" name="g" aria-label="A"><input type="radio" name="g" aria-label="B" checked><input type="radio" name="g" aria-label="C"></fieldset>'
    + '<button tabindex="3">Jumps ahead</button><button disabled>Off</button><span hidden><button>Hidden</button></span><button tabindex="-1">Script only</button>'
    + '<main id="main"><a href="#x">Last</a></main></body></html>');
  await page.addStyleTag({ content: '#rev{display:flex;flex-direction:row-reverse;justify-content:flex-end}' });   // the fixture's row, drawn in reverse
  await overlay();
  const fx = await page.evaluate(() => { const c = window.PlenixFocusOrder.check(); window.PlenixFocusOrder.show(); return { c, badges: document.querySelectorAll('.plx-focus-order circle').length }; });
  const names = fx.c.stops.map((s) => s.name);
  check('fixture: the positive tabindex comes first and is reported', names[0] === 'Jumps ahead' && fx.c.positiveTabindex.length === 1, names.join(' | '));
  check('fixture: disabled, hidden and tabindex="-1" are not stops; a radio group is one stop (the checked radio)', !names.includes('Off') && !names.includes('Hidden') && !names.includes('Script only') && names.filter((n) => /^[ABC]$/.test(n)).join() === 'B', names.join(' | '));
  check('fixture: a row drawn in reverse is out of reading order', fx.c.outOfOrder.length >= 1 && fx.c.stops.filter((s) => s.outOfOrder).some((s) => s.name === 'Four'), JSON.stringify(fx.c.outOfOrder));
  check('fixture: the skip link is not first (a positive tabindex goes ahead of it)', fx.c.skipLinkFirst === false, String(fx.c.skipLinkFirst));
  check('fixture: the overlay draws one numbered badge per stop', fx.badges === fx.c.stops.length, fx.badges + ' badges, ' + fx.c.stops.length + ' stops');
  }

  // ---- every application page
  const base = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {};
  const found = {};
  for (const url of PAGES) {
    at(url);
    await page.goto(BASE + url, { waitUntil: 'networkidle0' }).catch(() => {}); await sleep(800);
    await overlay();
    const c = await page.evaluate(() => window.PlenixFocusOrder.check());
    const f = { positive: c.positiveTabindex.length, order: c.outOfOrder.length, skip: c.skipLinkFirst === false ? 1 : 0 };
    found[url] = f;
    const known = base[url] || { positive: 0, order: 0, skip: 0 };
    for (const k of Object.keys(f)) {
      const ok = UPDATE || f[k] <= (known[k] || 0);
      check(url + ' ' + k + ': ' + f[k] + (known[k] ? ' (baseline ' + known[k] + ')' : ''), ok,
        k === 'order' ? c.stops.filter((s) => s.outOfOrder).map((s) => s.n + ' ' + s.name).slice(0, 6).join(' | ') : k === 'positive' ? c.stops.filter((s) => s.positive).map((s) => s.name).join(' | ') : '');
    }
  }

  // ---- focus moves into an overlay and back (the member page's Rename member dialog)
  if (DIALOG) {
    at('the dialog'); await page.goto(BASE + site.url('member'), { waitUntil: 'networkidle0' }); await sleep(1200);
    const opened = await page.evaluate(() => { const b = [...document.querySelectorAll('main button')].find((x) => x.textContent.trim() === 'Rename member'); if (!b) return false; b.focus(); b.click(); return true; });
    await sleep(400);
    const inside = await page.evaluate(() => !!document.activeElement && !!document.activeElement.closest('[role="dialog"],dialog'));
    await page.keyboard.press('Escape'); await sleep(400);
    const back = await page.evaluate(() => (document.activeElement && document.activeElement.textContent || '').trim());
    check('dialog: focus moves into it when it opens', opened && inside, 'opened ' + opened);
    check('dialog: focus returns to its trigger when it closes', back === 'Rename member', back);
  }

  if (UPDATE) { changed.shrinkOnly(BASELINE, found); fs.writeFileSync(BASELINE, JSON.stringify(found, null, 2) + '\n'); console.log('baseline written: ' + path.relative(process.cwd(), BASELINE)); }
  await browser.close(); server.close();
  const bad = results.filter((r) => !r[1]);
  results.forEach(([n, ok, d]) => console.log((ok ? 'ok   ' : 'FAIL ') + n + (d && !ok ? '  ' + d : '')));
  console.log(bad.length ? 'FOCUS_ORDER_FAIL (' + bad.length + ' of ' + results.length + ')' : 'FOCUS_ORDER_OK (' + results.length + ' checks)');
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
