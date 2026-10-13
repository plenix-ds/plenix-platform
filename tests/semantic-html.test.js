// Plenix tests · semantic HTML (library plan wave 2; the Semantic HTML page): every application page has the landmarks
// of the application shell, one of each (a banner, a main region, navigation), every navigation region that is not
// alone has a name, there is at most one level 1 heading, and headings never skip a level going down. The static rule
// (clickable elements without a role) is check-system.rules/semantic-html.js; this test reads the rendered pages.
//   node tests/semantic-html.test.js                 SEMANTIC_HTML_PAGES_OK, or the findings and exit 1
//   SEMANTIC_PORT=8835 node tests/semantic-html.test.js   another port
const { serve, launch, sleep } = require('./lib.js');
const PORT = +process.env.SEMANTIC_PORT || 8798, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html']);
// known findings, each to be fixed in its application (then removed here): a page listed here fails only on another finding
const KNOWN = {
  'calendar/index.html': /^heading levels skipped: h1 → h3$/,
  'bookmarks/index.html': /^heading levels skipped: h1 → h3$/
};

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const found = [];
  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: 'networkidle0' }); await sleep(800);
    const r = await page.evaluate(() => {
      const visible = (el) => !el.closest('[hidden],[aria-hidden="true"],[inert]') && el.getClientRects().length > 0;
      const all = (sel) => Array.from(document.querySelectorAll(sel)).filter(visible);
      // landmarks at the top level (a header inside an article is not a banner)
      const mains = all('main, [role="main"]');
      const banners = all('header, [role="banner"]').filter((el) => el.getAttribute('role') === 'banner' || !el.closest('article, aside, main, nav, section, [role="dialog"]'));
      const navs = all('nav, [role="navigation"]');
      const unnamed = navs.length > 1 ? navs.filter((n) => !n.getAttribute('aria-label') && !n.getAttribute('aria-labelledby')).length : 0;
      const hs = all('h1, h2, h3, h4, h5, h6, [role="heading"]').map((el) => +(el.getAttribute('aria-level') || el.tagName.slice(1)) || 2);
      const skips = [];
      for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) skips.push('h' + hs[i - 1] + ' → h' + hs[i]);
      return { mains: mains.length, banners: banners.length, navs: navs.length, unnamed, h1: hs.filter((x) => x === 1).length, skips };
    });
    const bad = [];
    if (r.mains !== 1) bad.push(r.mains + ' main regions (one expected)');
    if (r.banners !== 1) bad.push(r.banners + ' banners (one expected)');
    if (!r.navs) bad.push('no navigation region');
    if (r.unnamed) bad.push(r.unnamed + ' of ' + r.navs + ' navigation regions without a name');
    if (r.h1 > 1) bad.push(r.h1 + ' level 1 headings');
    if (r.skips.length) bad.push('heading levels skipped: ' + r.skips.slice(0, 4).join(', '));
    const known = bad.filter((b) => KNOWN[p] && KNOWN[p].test(b));
    if (known.length) console.log('KNOWN ' + p + '  ' + known.join('; '));
    bad.splice(0, bad.length, ...bad.filter((b) => known.indexOf(b) < 0));
    console.log((bad.length ? 'FAIL ' : 'ok   ') + p + (bad.length ? '  ' + bad.join('; ') : ''));
    if (bad.length) found.push(p);
  }
  await browser.close(); server.close();
  console.log(found.length ? 'SEMANTIC_HTML_PAGES_FAIL (' + found.length + ' of ' + PAGES.length + ' pages)' : 'SEMANTIC_HTML_PAGES_OK (' + PAGES.length + ' pages)');
  process.exit(found.length ? 1 : 0);
})();
