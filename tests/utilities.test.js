// Plenix · tests/utilities.test.js: the behavioral utilities work in Chrome, on the St. John the Beloved test site (test-site/;
// owner, 2026-10-25: the tests run on the site, not on the design spec):
// virtualization (only the view rendered, true scroll length, positions, focus kept, grid columns, no style written),
// hotkeys (single key, sequence, scope, ignored in fields), live regions (announce) and the clipboard (Copied, announced).
// (reset, owner 2026-10-26: the style audit is checked once, by Pages: pages.test.js)
//   node tests/utilities.test.js       (UTILITIES_PORT or TEST_PORT picks the port; default 8831)   → UTILITIES_OK
//   TEST_SCOPE=full: always; by default (tests/changed.js) when a utility, its page, a global file or this test changed
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const { serve, launch, sleep } = require('./lib.js');
const changed = require('./changed.js');

const PORT = Number(process.env.UTILITIES_PORT || process.env.TEST_PORT || 8831);
if (!changed.wants({ ids: ['virtualization', 'hotkey', 'live-regions', 'clipboard'], units: ['hooks/useVirtualizer.js', 'utils/hotkey.js', 'utils/announce.jsx', 'utils/clipboard.js', 'components/RichTextEditor', 'components/RichText'] })) changed.none('UTILITIES_OK (0 checks)');
changed.report('every utility');
const BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const site = require('./site.js');
let failed = 0, passed = 0;
const check = (name, ok, info) => { if (!shared.check(name, ok, info)) return; if (ok) passed++; else { failed++; console.log('FAIL ' + name + (info !== undefined ? ': ' + JSON.stringify(info) : '')); } };

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  try {
    const ctx = browser.defaultBrowserContext();
    await ctx.overridePermissions('http://127.0.0.1:' + PORT, ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    const open = async (id, sel) => { await page.goto('about:blank'); await page.goto(BASE + site.url(id), { waitUntil: 'networkidle0' }); await page.waitForSelector(sel, { timeout: 15000 }); await sleep(400); };
    // the giving history's list of all 10,000 gifts (a VirtualList): the scroller whose items carry aria-setsize 10000
    const markVirtual = () => page.evaluate(() => { const it = [...document.querySelectorAll('[data-plx-virtual-index]')].find((x) => x.getAttribute('aria-setsize') === '10000'); if (!it) return false;
      let el = it.parentElement; while (el && !(el.scrollHeight > el.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(el).overflowY))) el = el.parentElement; if (el) el.setAttribute('data-test-virtual', ''); return !!el; });

    /* virtualization */
    await open('gifts', '[data-plx-virtual-index]');
    check('the giving history has a list of all 10,000 gifts', await markVirtual());
    const list = await page.evaluate(() => {
      const el = document.querySelector('[data-test-virtual]');
      const items = el.querySelectorAll('[data-plx-virtual-index]');
      return { rendered: items.length, setsize: items[0].getAttribute('aria-setsize'), scroll: el.scrollHeight, row: items[0].offsetHeight, styled: el.querySelectorAll('[style]').length };
    });
    check('a list of 10,000 renders only its view', list.rendered > 0 && list.rendered < 60, list);
    check('items carry their place in the whole', list.setsize === '10000', list);
    check('the scroll length is the whole list', Math.abs(list.scroll - list.row * 10000) <= list.row, list);
    check('no style is written', list.styled === 0, list);
    await page.evaluate(() => { const el = document.querySelector('[data-test-virtual]'); el.scrollTop = el.scrollHeight / 2; });
    await sleep(300);
    const mid = await page.evaluate(() => {
      const el = document.querySelector('[data-test-virtual]');
      const box = el.getBoundingClientRect();
      const seen = [...el.querySelectorAll('[data-plx-virtual-index]')].filter((it) => { const r = it.getBoundingClientRect(); return r.bottom > box.top && r.top < box.bottom; }).map((it) => Number(it.getAttribute('data-plx-virtual-index')));
      return { first: Math.min(...seen), count: seen.length };
    });
    check('scrolled to the middle, the middle items are in view', mid.first > 4900 && mid.first < 5100 && mid.count >= 5, mid);
    // focus an item, scroll away: it stays rendered
    const kept = await page.evaluate(async () => {
      const el = document.querySelector('[data-test-virtual]');
      const it = el.querySelector('[data-plx-virtual-index]');
      const i = it.getAttribute('data-plx-virtual-index');
      it.focus();
      el.scrollTop = 0;
      await new Promise((r) => setTimeout(r, 300));
      return { i, there: !!el.querySelector('[data-plx-virtual-index="' + i + '"]'), focused: document.activeElement.getAttribute('data-plx-virtual-index') };
    });
    check('the focused item stays rendered', kept.there && kept.focused === kept.i, kept);
    // measured items: scrolling down only ever moves down (scroll anchoring absorbs the size differences, no back-and-forth)
    const measured = await page.evaluate(async () => {
      const it = [...document.querySelectorAll('[data-plx-virtual-index]')].find((x) => x.getAttribute('aria-setsize') === '2000'); let el = it && it.parentElement;
      while (el && !(el.scrollHeight > el.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(el).overflowY))) el = el.parentElement;
      const steps = [];
      for (let i = 0; i < 60; i++) { const before = el.scrollTop; el.scrollTop = before + 40; await new Promise((r) => setTimeout(r, 30)); steps.push(Math.round(el.scrollTop - before)); }
      return { steps: steps.join(','), rendered: el.querySelectorAll('[data-plx-virtual-index]').length, connected: el.isConnected };
    });
    check('measured rows scroll steadily', measured.connected && measured.rendered > 0 && measured.steps.split(',').every((s) => Number(s) > 0), measured);

    /* hotkeys: the site's shortcuts */
    await open('home', 'main');
    const hash = () => page.evaluate(() => location.hash);
    await page.evaluate(() => document.activeElement && document.activeElement.blur()); await page.keyboard.press('n'); await sleep(300);
    check('a single key runs its command (N opens New member)', /#\/members\/new/.test(await hash()), await hash());
    await open('home', 'main');
    await page.evaluate(() => document.activeElement && document.activeElement.blur()); await page.keyboard.press('g'); await page.keyboard.press('m'); await sleep(300);
    check('a sequence (G then M) runs its command', /#\/members$/.test(await hash()), await hash());
    await open('home', 'main');
    // the header's search opens from its Search button, then its field takes the focus
    await page.evaluate(() => { const b = document.querySelector('.plx-app-header button[aria-label="Search"]'); if (b) b.click(); });
    await sleep(300);
    await page.evaluate(() => { const i = document.querySelector('.plx-app-header input'); if (i) i.focus(); });
    await page.keyboard.press('n'); await sleep(300);
    check('a shortcut is ignored while typing in a field', !/members\/new/.test(await hash()), await hash());
    await open('home', 'main');
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.keyboard.down('Control'); await page.keyboard.down('Shift'); await page.keyboard.press('P'); await page.keyboard.up('Shift'); await page.keyboard.up('Control'); await sleep(400);
    const palette = await page.evaluate(() => !!document.querySelector('[role="dialog"]') && !!(document.activeElement && document.activeElement.closest('[role="dialog"]')));
    check('a chord (Ctrl Shift P) opens the command palette with the focus inside', palette);
    await page.keyboard.press('Escape'); await sleep(300);
    const reg = await page.evaluate(() => window.Plenix.hotkeyList().length);
    check('labeled shortcuts are in the registry', reg >= 6, reg);

    /* the clipboard and the live region: copying the announcement ID shows it is copied, announces it in the polite
       region (hidden from sight) and fills the clipboard */
    await open('announcement-edit', 'button[aria-label="Copy announcement ID"]');
    await page.click('button[aria-label="Copy announcement ID"]');
    await sleep(300);
    const copied = await page.evaluate(async () => { const r = document.querySelector('[data-plx-announcer="polite"]'); const b = document.querySelector('button[aria-label="Copy announcement ID"], button[aria-label="Copied"]');
      return { clip: await navigator.clipboard.readText().catch((e) => 'unreadable: ' + e.message), said: r ? r.textContent : null, live: r && r.getAttribute('aria-live'), hidden: !!r && r.classList.contains('plx-visually-hidden'),
        shown: !!b && (/Copied/.test(b.getAttribute('aria-label') || '') || !!b.querySelector('.plx-icon--check')) }; });
    check('copying fills the clipboard and shows it is copied', copied.clip === 'ANN-2026-104' && copied.shown, copied);
    check('announce writes into the polite region, hidden from sight', copied.said === 'Copied' && copied.live === 'polite' && copied.hidden, copied);

    check('no page errors', errors.length === 0, errors.slice(0, 5));
  } finally {
    await browser.close();
    server.close();
  }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'UTILITIES_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
