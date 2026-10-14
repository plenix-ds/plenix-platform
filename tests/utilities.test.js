// Plenix · tests/utilities.test.js: the behavioral utilities work in Chrome, on their own design-system pages:
// virtualization (only the view rendered, true scroll length, positions, focus kept, grid columns, no style written),
// hotkeys (single key, sequence, scope, ignored in fields), live regions (announce), the clipboard (Copied, announced) and
// the style audit on user content (the person's own formatting allowed only inside .plx-user-content).
//   node tests/utilities.test.js       (UTILITIES_PORT or TEST_PORT picks the port; default 8831)   → UTILITIES_OK
//   TEST_SCOPE=full: always; by default (tests/changed.js) when a utility, its page, a global file or this test changed
const { serve, launch, sleep } = require('./lib.js');
const changed = require('./changed.js');

const PORT = Number(process.env.UTILITIES_PORT || process.env.TEST_PORT || 8831);
if (!changed.wants({ ids: ['virtualization', 'hotkey', 'live-regions', 'clipboard'], units: ['hooks/useVirtualizer.js', 'utils/hotkey.js', 'utils/announce.jsx', 'utils/clipboard.js', 'components/RichTextEditor', 'components/RichText'] })) changed.none('UTILITIES_OK (0 checks)');
changed.report('every utility');
const BASE = 'http://127.0.0.1:' + PORT + '/Plenix/platform/design-system/index.html';
let failed = 0, passed = 0;
const check = (name, ok, info) => { if (ok) passed++; else { failed++; console.log('FAIL ' + name + (info !== undefined ? ': ' + JSON.stringify(info) : '')); } };

(async () => {
  // the design system is a submodule (plenix-design-system): without it (CI) there are no pages to test the utilities on
  if (!require('fs').existsSync(require('path').join(__dirname, '..', 'platform', 'design-system', 'index.html'))) { console.log('NOTE: platform/design-system is not checked out; UTILITIES_SKIP'); return; }
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
    const open = async (hash, sel) => { await page.goto(BASE + hash, { waitUntil: 'networkidle0' }); await page.waitForSelector(sel, { timeout: 15000 }); await sleep(400); };

    /* virtualization */
    await open('#/interaction/virtualization', '.ds-virtual-demo');
    const list = await page.evaluate(() => {
      const el = document.querySelector('.ds-virtual-demo');
      const items = el.querySelectorAll('[data-plx-virtual-index]');
      return { rendered: items.length, setsize: items[0].getAttribute('aria-setsize'), scroll: el.scrollHeight, row: items[0].offsetHeight, styled: el.querySelectorAll('[style]').length };
    });
    check('a list of 10,000 renders only its view', list.rendered > 0 && list.rendered < 60, list);
    check('items carry their place in the whole', list.setsize === '10000', list);
    check('the scroll length is the whole list', Math.abs(list.scroll - list.row * 10000) <= list.row, list);
    check('no style is written', list.styled === 0, list);
    await page.evaluate(() => { const el = document.querySelector('.ds-virtual-demo'); el.scrollTop = el.scrollHeight / 2; });
    await sleep(300);
    const mid = await page.evaluate(() => {
      const el = document.querySelector('.ds-virtual-demo');
      const box = el.getBoundingClientRect();
      const seen = [...el.querySelectorAll('[data-plx-virtual-index]')].filter((it) => { const r = it.getBoundingClientRect(); return r.bottom > box.top && r.top < box.bottom; }).map((it) => Number(it.getAttribute('data-plx-virtual-index')));
      return { first: Math.min(...seen), count: seen.length };
    });
    check('scrolled to the middle, the middle items are in view', mid.first > 4900 && mid.first < 5100 && mid.count >= 5, mid);
    // focus an item, scroll away: it stays rendered
    const kept = await page.evaluate(async () => {
      const el = document.querySelector('.ds-virtual-demo');
      const it = el.querySelector('[data-plx-virtual-index]');
      const i = it.getAttribute('data-plx-virtual-index');
      it.focus();
      el.scrollTop = 0;
      await new Promise((r) => setTimeout(r, 300));
      return { i, there: !!el.querySelector('[data-plx-virtual-index="' + i + '"]'), focused: document.activeElement.getAttribute('data-plx-virtual-index') };
    });
    check('the focused item stays rendered', kept.there && kept.focused === kept.i, kept);
    const grid = await page.evaluate(() => {
      const el = document.querySelector('.ds-virtual-demo--grid');
      const items = [...el.querySelectorAll('[data-plx-virtual-index]')];
      const top = items[0].offsetTop;
      return { cols: items.filter((x) => x.offsetTop === top).length, rendered: items.length };
    });
    // measured items: scrolling down only ever moves down (scroll anchoring absorbs the size differences, no back-and-forth)
    const measured = await page.evaluate(async () => {
      const el = document.querySelector('.ds-virtual-demo--measured');
      const steps = [];
      for (let i = 0; i < 60; i++) { const before = el.scrollTop; el.scrollTop = before + 40; await new Promise((r) => setTimeout(r, 30)); steps.push(Math.round(el.scrollTop - before)); }
      return { steps: steps.join(','), rendered: el.querySelectorAll('[data-plx-virtual-index]').length, connected: el.isConnected };
    });
    check('measured rows scroll steadily', measured.connected && measured.rendered > 0 && measured.steps.split(',').every((s) => Number(s) > 0), measured);
    check('a grid renders whole rows of several columns', grid.cols > 1 && grid.rendered % grid.cols === 0 && grid.rendered < 400, grid);

    /* hotkeys */
    await open('#/interaction/hotkey', '.ds-hotkey-demo');
    const demos = await page.$$('.ds-hotkey-demo');
    const logOf = (i) => page.evaluate((n) => document.querySelectorAll('.ds-hotkey-demo')[n].querySelector('[data-plx-live="log"]').textContent, i);
    await demos[0].focus(); await page.keyboard.press('n'); await sleep(100);
    check('a single key runs its command in its region', /New note/.test(await logOf(0)));
    await demos[2].focus(); await page.keyboard.press('g'); await page.keyboard.press('i'); await sleep(100);
    check('a sequence (G then I) runs its command', /Go to inbox/.test(await logOf(2)));
    await page.evaluate(() => document.activeElement.blur()); await page.keyboard.press('Delete'); await sleep(100);
    check('a scoped key does nothing outside its region', !/Delete/.test(await logOf(3)));
    await demos[4].evaluate((el) => el.querySelector('input').focus()); await page.keyboard.press('n'); await sleep(100);
    check('a shortcut is ignored while typing in a field', !/New note/.test(await logOf(4)));
    const reg = await page.evaluate(() => window.Plenix.hotkeyList().length);
    check('labeled shortcuts are in the registry', reg >= 6, reg);

    /* live regions */
    await open('#/interaction/live-regions', 'button');
    await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Save').click());
    await sleep(400);
    const said = await page.evaluate(() => { const r = document.querySelector('[data-plx-announcer="polite"]'); return r ? { text: r.textContent, live: r.getAttribute('aria-live'), hidden: r.classList.contains('plx-visually-hidden') } : null; });
    check('announce writes into the polite region', !!said && said.text === 'Saved (1)' && said.live === 'polite' && said.hidden, said);

    /* clipboard */
    await open('#/interaction/clipboard', 'button');
    await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Copy asset ID').click());
    await sleep(300);
    const copied = await page.evaluate(async () => ({ button: [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Copied'), clip: await navigator.clipboard.readText().catch((e) => 'unreadable: ' + e.message), said: (document.querySelector('[data-plx-announcer="polite"]') || {}).textContent }));
    check('copying shows Copied, announces it and fills the clipboard', copied.button && copied.clip === 'ASSET-0142' && copied.said === 'Copied', copied);

    /* the style audit on user content (owner, 2026-10-14: the colors and fonts rule is the interface's, not the person's
       content in the editor): inside .plx-user-content the person's color, background-color, font-family, font-size and
       text-align pass; any other inline property there, and the same properties on the interface, are still checked */
    const audit = await page.evaluate(() => {
      const box = document.createElement('div');
      box.innerHTML = '<div class="plx-user-content"><p style="text-align: center"><span style="color: rgb(230, 25, 75); background-color: rgb(255, 225, 25); font-family: Georgia, serif; font-size: 15px">user</span></p></div>'
        + '<div class="plx-user-content"><span style="margin-top: 3px">stray</span></div><span style="font-family: Georgia, serif">interface font</span><span style="font-size: 15px">interface size</span>';
      document.body.appendChild(box);
      const found = window.PlenixStyleAudit.audit(box).map((f) => f.detail);
      box.remove();
      return found;
    });
    check('style audit: user formatting passes in user content; a stray style there and a font or off-grid size on the interface are caught',
      audit.length === 3 && audit.some((d) => /margin-top/.test(d)) && audit.some((d) => /font-family/.test(d)) && audit.some((d) => /font-size/.test(d)), audit);

    check('no page errors', errors.length === 0, errors.slice(0, 5));
  } finally {
    await browser.close();
    server.close();
  }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'UTILITIES_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
