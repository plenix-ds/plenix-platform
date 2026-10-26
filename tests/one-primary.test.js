// Plenix tests · one primary button per view (owner, 2026-10-24, the buttons study #298; Polaris, Carbon, Fluent): a
// page shows at most one primary button, so the main path is clear. A dialog, a drawer, a popover or a menu is a view of
// its own: its primary is counted there, not with the page under it (a static check cannot tell them apart, so this one
// reads the pages as drawn).
//   For each application page: the visible primary buttons (.plx-button--primary) outside [role=dialog],
//   [role=alertdialog], [popover], .plx-popover, .plx-menu and anything hidden or inert (a split button counts once).
//   More than one is a finding.
//   node tests/one-primary.test.js           run
//   TEST_PORT=8861 node tests/one-primary.test.js   another port
//   TEST_SCOPE=full: always; by default (tests/changed.js) the pages whose sources changed
const { serve, launch, sleep, APPS } = require('./lib.js');
const changed = require('./changed.js');
const PORT = +process.env.TEST_PORT || 8861, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const PAGES = changed.pages(APPS.map((a) => a + '/index.html'));
if (!PAGES.length) changed.none('ONE_PRIMARY_OK 0 pages');
changed.report(PAGES.length + ' application pages');

// in the page: the primary buttons a person sees on the page itself (not in an overlay of its own)
const primaries = () => {
  const OVERLAY = '[role="dialog"], [role="alertdialog"], [popover], .plx-popover, .plx-menu, [inert], [aria-hidden="true"]';
  // a split button is one control: its main button and its menu half count once
  const seen = new Set();
  return [...document.querySelectorAll('.plx-button--primary')].filter((b) => {
    if (b.closest(OVERLAY)) return false;
    const r = b.getBoundingClientRect(), c = getComputedStyle(b);
    if (!(r.width > 0 && r.height > 0 && c.visibility !== 'hidden' && b.offsetParent !== null)) return false;
    const control = b.closest('.plx-split-button') || b;
    if (seen.has(control)) return false;
    seen.add(control); return true;
  }).map((b) => (b.getAttribute('aria-label') || b.textContent || '').trim() || '(no name)');
};

(async () => {
  const server = await serve(PORT); let browser, failed = 0;
  try {
    browser = await launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.plx-button', { timeout: 30000 }).catch(() => null);
      await sleep(800);
      const found = await page.evaluate(primaries);
      const ok = found.length <= 1;
      console.log((ok ? 'ok   ' : 'FAIL ') + p + ': ' + found.length + ' primary' + (found.length ? ' (' + found.join(', ') + ')' : ''));
      if (!ok) failed++;
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? 'ONE_PRIMARY_FAIL ' + failed + ' of ' + PAGES.length + ' pages' : 'ONE_PRIMARY_OK ' + PAGES.length + ' pages');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
