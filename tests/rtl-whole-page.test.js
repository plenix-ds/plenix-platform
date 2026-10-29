/* Plenix tests · every application page in right to left (issue 413, rtl-413-d): the guard against regressions.
   Summary: each suite application and the Asset Manager, opened with dir="rtl" lang="ar" on the page:
     no sideways scroll      the page is never wider than the window
     text at the start edge  every visible heading and title reads right to left and starts at the right of its box
                             (left-to-right islands, dir="auto" text, centered text and the drawn charts excepted)
     mirrored icons          every icon the Platform marks as directional (plx-icon--mirrored) is drawn mirrored, and
                             the same icons are not mirrored when the page is left to right
     no script errors
   Usage: node tests/rtl-whole-page.test.js   → RTL_WHOLE_PAGE_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'dam'];
(async () => {
  const PORT = +process.env.TEST_PORT || 9656, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1280, height: 800 });
    const look = () => page.evaluate(() => {
      const visible = (e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
      // a left-to-right island, text that takes its direction from its own words (dir="auto": the sample data's English
      // month and folder names), a drawn chart or code keeps its own direction
      const island = (e) => e.closest('[dir="ltr"], [dir="auto"], .plx-isolate, .plx-chart__engine, .plx-chart__svg, code, pre, [contenteditable]');
      const off = [];
      for (const e of document.querySelectorAll('h1, h2, h3, [class*="__title"]')) {
        if (!visible(e) || island(e) || !e.textContent.trim()) continue;
        const cs = getComputedStyle(e);
        if (cs.textAlign === 'center' || cs.display.includes('flex') || cs.display.includes('grid')) continue;
        const box = e.getBoundingClientRect(), r = document.createRange(); r.selectNodeContents(e); const t = r.getBoundingClientRect();
        const startsRight = box.width - t.width < 8 || Math.abs(box.right - t.right) <= Math.abs(t.left - box.left);
        if (cs.direction !== 'rtl' || !startsRight) off.push({ text: e.textContent.trim().slice(0, 40), cls: e.className, dir: cs.direction, align: cs.textAlign });
      }
      const mirrored = [...document.querySelectorAll('.plx-icon--mirrored')].filter(visible);
      return { sideways: document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth, off, icons: mirrored.length, unmirrored: mirrored.filter((i) => getComputedStyle(i).scale !== '-1 1').map((i) => i.className) };
    });
    const mirroredInLtr = () => page.evaluate(() => [...document.querySelectorAll('.plx-icon--mirrored')].filter((i) => i.getClientRects().length && getComputedStyle(i).scale === '-1 1').map((i) => i.className));
    const setDir = (dir) => page.evaluate((dir) => { document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en'); }, dir);
    let icons = 0;
    for (const app of PAGES) {
      await page.goto('http://localhost:' + PORT + '/Plenix/' + app + '/index.html', { waitUntil: 'networkidle0' }); await sleep(1200);
      assert.deepEqual(await mirroredInLtr(), [], app + ': left to right, no directional icon is mirrored');
      await setDir('rtl'); await sleep(1000);
      const r = await look();
      assert.equal(r.sideways, 0, app + ': no sideways scroll in right to left');
      assert.deepEqual(r.off, [], app + ': every heading and title reads right to left from the right edge');
      assert.deepEqual(r.unmirrored, [], app + ': every directional icon is mirrored');
      icons += r.icons;
    }
    assert.ok(icons > 0, 'the pages show at least one directional icon (the navigation pane arrow)');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('RTL_WHOLE_PAGE_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
