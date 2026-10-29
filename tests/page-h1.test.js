/* Plenix tests · every suite page has exactly one level-1 heading (issue 603).
   Summary: screen-reader users jump by headings, and the page title is their anchor. Each suite page, in its default view and with an item open, must
     show exactly one h1 that names the page or the open item. Where the design shows no title (the dashboard, and the Projects, Contacts and Notes lists
     before an item is chosen), the h1 is visually hidden (the standard plx-visually-hidden class), so nothing looks different.
   The probe is proved able to see the old shape first: the same empty state drawn without the hidden heading has no h1, and with VisuallyHidden as="h1" it has one,
     hidden. Then each page is loaded as a person opens it and its h1 elements are read (visible or not, outside any hidden part).
   Usage: node tests/page-h1.test.js   (run by layout.test.js when a suite page or the VisuallyHidden component changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
// [page, hash, the h1's text, hidden?]
const PAGES = [
  ['dashboard', '', 'Dashboard', true], ['projects', '', 'Projects', true], ['projects', '#/project/1/risks', 'Risks', true], ['projects', '#/project/1/home', 'Kitchen Renovation', false],
  ['contacts', '', 'Contacts', true], ['contacts', '#/contact/1', 'Maya Chen', false], ['notes', '', 'Notes', true], ['notes', '#/note/1', 'Contractor comparison', false],
  ['dashboard', '#/project/1/home', 'Kitchen Renovation', false], ['messages', '', 'Maya Chen', false], ['calendar', '', 'March 2026', false], ['tasks', '', 'Tasks', false],
  ['bookmarks', '', 'Bookmarks', false], ['files', '', 'Files', false], ['settings', '', 'General', false]
];
(async () => {
  const PORT = +process.env.TEST_PORT || 9627, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const open = async (url) => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(url + ': ' + e.message));
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto('http://localhost:' + PORT + '/Plenix/' + url, { waitUntil: 'load' }); await wait(2200);
      return page;
    };
    const h1s = (page) => page.evaluate(() => [...document.querySelectorAll('h1')].filter((e) => !e.closest('[hidden]')).map((e) => ({ text: e.textContent.trim(), hidden: e.classList.contains('plx-visually-hidden') })));
    // the probe sees the old shape: no h1 without the hidden heading, one with it
    const probe = await browser.newPage();
    await probe.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await probe.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const shapes = await probe.evaluate(async () => {
      const h = React.createElement, P = window.Plenix, out = {};
      document.querySelector('main').innerHTML = '<div id="a"></div><div id="b"></div>';
      ReactDOM.createRoot(document.getElementById('a')).render(h(P.EmptyState, { size: 'page', title: 'Select a note to read' }));
      ReactDOM.createRoot(document.getElementById('b')).render(h('div', null, h(P.VisuallyHidden, { as: 'h1' }, 'Notes'), h(P.EmptyState, { size: 'page', title: 'Select a note to read' })));
      await new Promise((r) => setTimeout(r, 600));
      out.without = document.querySelectorAll('#a h1').length; out.with = [...document.querySelectorAll('#b h1')].map((e) => e.classList.contains('plx-visually-hidden'));
      return out;
    });
    await probe.close();
    assert.equal(shapes.without, 0, 'the probe sees it: an empty state alone has no h1');
    assert.deepEqual(shapes.with, [true], 'with the hidden heading there is one h1, visually hidden');
    for (const [pg, hash, text, hidden] of PAGES) {
      const page = await open(pg + '/index.html' + hash); const found = await h1s(page); await page.close();
      const at = pg + hash;
      assert.equal(found.length, 1, at + ': exactly one h1, got ' + JSON.stringify(found));
      assert.ok(found[0].text.indexOf(text) === 0, at + ': the h1 names the page or the open item (' + text + '), got "' + found[0].text + '"');
      assert.equal(found[0].hidden, hidden, at + ': the h1 is ' + (hidden ? 'visually hidden (the design shows no title)' : 'the visible title'));
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('page-h1: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
