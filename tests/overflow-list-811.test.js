// Plenix · tests/overflow-list-811.test.js: the overflow list (platform/components/OverflowList, issue 811). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/overflow-list-811.test.js   → OVERFLOW_LIST_811_OK
// Cases, in left to right and right to left: at a wide width every item is shown and there is no "…" button; narrower, items fold from the end
//   and the "…" button (named from the catalog: More items, Arabic عناصر أخرى) is the last thing in the row, inside the row's box, whatever the width; the
//   menu lists the folded items in their order; choosing from the menu (arrow keys, Enter) and pressing a shown item both run onSelect with the id;
//   an item with its own content draws it in the row; widening the row brings the items back; narrowing the row while an item has focus moves focus to the "…"
//   button; the row is one fit with the command bar's (no hidden copy), a named group when it has a label.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };
const NAMES = { ltr: ['Share', 'Export', 'Duplicate', 'Move to folder', 'Archive', 'Delete'], rtl: ['مشاركة', 'تصدير', 'تكرار', 'نقل إلى مجلد', 'أرشفة', 'حذف'] };

(async () => {
  const PORT = +process.env.TEST_PORT || 9814, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 760, height: 480 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ', names = NAMES[dir];
      await page.evaluate(async (dir, names) => {
        document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        window.__root && window.__root.unmount(); window.__log = []; document.querySelector('main').innerHTML = '<div id="c" style="padding:16px"></div>';
        const h = React.createElement, items = names.map((n, i) => ({ id: 'i' + i, label: n, icon: 'folder', onSelect: (id) => window.__log.push(id) }));
        const App = () => h('div', { style: { display: 'grid', gap: 14 } },
          [700, 300, 150].map((x) => h('div', { key: x, 'data-w': x, style: { inlineSize: x } }, h(Plenix.OverflowList, { label: 'Page actions', items }))),
          h('div', { 'data-w': 'tags', style: { inlineSize: 300 } }, h(Plenix.OverflowList, { items: names.map((n, i) => ({ id: 't' + i, label: n, content: h(Plenix.Tag, null, n) })) })));
        window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(App)); await new Promise((r) => setTimeout(r, 900));
      }, dir, names);
      const rowOf = (w) => page.evaluate((w) => [...document.querySelectorAll('[data-w="' + w + '"] .plx-overflow-list > *')].filter((e) => !e.matches('.plx-menu-anchor')).map((e) => (e.getAttribute('aria-label') || e.textContent).trim()), w);
      const moreOf = (w) => page.$('[data-w="' + w + '"] [aria-haspopup]');
      await check(T + 'wide (wider than the items): every item is shown, no "…" button', async () => { assert.deepEqual((await rowOf(700)).slice(0, 6), names); assert.equal(await moreOf(700), null); });
      await check(T + 'narrower: items fold from the end, the "…" button is last and inside the box', async () => {
        const r = await page.evaluate(() => [300, 150].map((w) => { const row = document.querySelector('[data-w="' + w + '"] .plx-overflow-list'), kids = [...row.children], last = kids[kids.length - 1].getBoundingClientRect(), box = row.getBoundingClientRect(), more = row.querySelector('[aria-haspopup]'); return { w, shown: kids.length, inside: last.right <= box.right + 1 && last.left >= box.left - 1, moreIsLast: kids[kids.length - 1].contains(more), name: more && more.getAttribute('aria-label') }; }));
        assert.ok(r[0].shown < 7 && r[0].shown >= 2, '300 folds some'); assert.ok(r[1].shown < r[0].shown, '150 folds more');
        r.forEach((x) => { assert.ok(x.inside, x.w + ' inside'); assert.ok(x.moreIsLast, x.w + ' last'); assert.equal(x.name, dir === 'rtl' ? 'عناصر أخرى' : 'More items'); });
      });
      await check(T + 'the menu lists the folded items in order; arrow keys and Enter choose', async () => {
        const shown = (await rowOf(300)).filter((x) => names.includes(x)).length; await (await moreOf(300)).click(); await page.waitForSelector('[role=menuitem]');
        assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('[role=menuitem]')].map((e) => e.textContent.trim())), names.slice(shown));
        await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await wait(250);
        assert.deepEqual(await page.evaluate(() => window.__log.slice()), ['i' + (shown + 1)]);
      });
      await check(T + 'pressing a shown item runs onSelect', async () => { await page.evaluate(() => { window.__log = []; }); await (await page.$('[data-w="700"] .plx-overflow-list > button')).click(); await wait(150); assert.deepEqual(await page.evaluate(() => window.__log.slice()), ['i0']); });
      await check(T + 'an item with its own content draws it in the row', async () => assert.ok(await page.evaluate(() => !!document.querySelector('[data-w="tags"] .plx-overflow-list > .plx-tag'))));
      await check(T + 'one Tab stop for the item that fits and one for the "…" button, nothing hidden', async () => {
        const r = await page.evaluate(() => ({ stops: [...document.querySelectorAll('[data-w="150"] button')].filter((e) => !e.disabled).length, copy: !!document.querySelector('.plx-overflow-list__meter') }));
        assert.equal(r.stops, 2, 'one item and the "…" button'); assert.equal(r.copy, false, 'no measuring copy');
      });
      await check(T + 'when the focused item folds, focus moves to the "…" button', async () => {
        await page.evaluate(() => { document.querySelector('[data-w="300"]').style.inlineSize = '700px'; }); await wait(400);
        await page.evaluate(() => { const b = [...document.querySelectorAll('[data-w="300"] .plx-overflow-list > button')].pop(); b.focus(); });
        await page.evaluate(() => { document.querySelector('[data-w="300"]').style.inlineSize = '150px'; }); await wait(500);
        assert.equal(await page.evaluate(() => document.activeElement && document.activeElement.getAttribute('aria-haspopup') ? 'more' : document.activeElement && document.activeElement.tagName), 'more');
      });
      await check(T + 'the row is a named group with a label', async () => assert.equal(await page.evaluate(() => document.querySelector('[data-w="700"] .plx-overflow-list').getAttribute('role') + ':' + document.querySelector('[data-w="700"] .plx-overflow-list').getAttribute('aria-label')), 'group:Page actions'));
      await check(T + 'widening the row brings the items back', async () => {
        await page.evaluate(() => { document.querySelector('[data-w="150"]').style.inlineSize = '700px'; }); await wait(400);
        assert.equal(await moreOf(150), null); assert.deepEqual((await rowOf(150)).slice(0, 6), names);
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'OVERFLOW_LIST_811_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
