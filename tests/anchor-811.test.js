// Plenix · tests/anchor-811.test.js: the page jump list (platform/components/Anchor, issue 811). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/anchor-811.test.js   → ANCHOR_811_OK
// Cases, in left to right and right to left, with the sections in a scrolling region and in the page: the navigation is named (the catalog's
//   "On this page", Arabic في هذه الصفحة) and each section is a link to its id (a subsection is a nested list); the first section is current
//   at the top; scrolling a section to the top makes it current (one aria-current="location" at a time); at the end of a scrollable region the last section
//   is current and back at the top the first again; pressing a link scrolls to the section, moves focus to it (it takes tabindex -1), marks it
//   current, tells onChange, and leaves the page's address alone; Tab then Enter does the same; a section whose element is missing does nothing;
//   the target's scroll margin counts (a page section sits at its margin from the top); and the rows are NavList's: the current one has the selected fill.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };
const NAMES = { ltr: ['Before you upload', 'Uploading files', 'Tags and metadata', 'Sharing'], rtl: ['قبل الرفع', 'رفع الملفات', 'الوسوم والبيانات الوصفية', 'المشاركة'] };

(async () => {
  const PORT = +process.env.TEST_PORT || 9813, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 760, height: 420 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) for (const mode of ['region', 'page']) {
      const T = dir + ' ' + mode + ': ';
      const mount = async () => {
        await page.evaluate(async (dir, mode, names) => {
          document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en'); window.scrollTo(0, 0);
          window.__root && window.__root.unmount(); window.__log = []; document.querySelector('main').innerHTML = '<div id="c" style="padding:16px"></div>';
          const h = React.createElement, ids = ['s1', 's2', 's3', 's4'], body = [];
          ids.forEach((id, i) => { body.push(h('h3', { id, key: 'h' + i, style: { scrollMarginBlockStart: mode === 'page' ? '12px' : '0px' } }, names[i])); for (let j = 0; j < 6; j++) body.push(h('p', { key: 'p' + i + j }, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.')); });
          const App = () => {
            const area = React.useRef(null);
            const items = [{ id: 's1', label: names[0] }, { id: 's2', label: names[1], children: [{ id: 's3', label: names[2] }] }, { id: 's4', label: names[3] }, { id: 'missing', label: 'Not on the page' }];
            const anchor = h(Plenix.Anchor, Object.assign({ items, onChange: (id) => window.__log.push(id) }, mode === 'region' ? { scrollRef: area } : {}));
            return h('div', { style: { display: 'flex', gap: 24, alignItems: 'flex-start' } }, h('div', { style: { position: 'sticky', insetBlockStart: 8, inlineSize: 200 } }, anchor),
              mode === 'region' ? h('div', { ref: area, id: 'area', tabIndex: 0, style: { blockSize: 300, overflowY: 'auto', flex: 1, padding: 8 } }, body) : h('div', { style: { flex: 1 } }, body));
          };
          window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(App)); await new Promise((r) => setTimeout(r, 600));
        }, dir, mode, NAMES[dir]);
      };
      const current = () => page.evaluate(() => [...document.querySelectorAll('.plx-anchor__link[aria-current]')].map((a) => a.textContent + ':' + a.getAttribute('aria-current')));
      const bring = (id) => page.evaluate((id, mode) => { const el = document.getElementById(id), area = document.getElementById('area'); if (mode === 'region') area.scrollTop += el.getBoundingClientRect().top - area.getBoundingClientRect().top; else window.scrollBy(0, el.getBoundingClientRect().top - 12); }, id, mode);
      await mount();
      await check(T + 'the navigation is named and each section is a link to its id', async () => {
        const r = await page.evaluate(() => { const n = document.querySelector('nav.plx-anchor'); return { name: n.getAttribute('aria-label'), links: [...n.querySelectorAll('a')].map((a) => a.getAttribute('href')), nested: !!n.querySelector('li > ul') }; });
        assert.equal(r.name, dir === 'rtl' ? 'في هذه الصفحة' : 'On this page'); assert.deepEqual(r.links, ['#s1', '#s2', '#s3', '#s4', '#missing']); assert.ok(r.nested, 'a subsection is a nested list');
      });
      await check(T + 'the first section is current at the top', async () => assert.deepEqual(await current(), [NAMES[dir][0] + ':location']));
      await check(T + 'scrolling a section to the top makes it current, one at a time', async () => {
        await bring('s2'); await wait(300); assert.deepEqual(await current(), [NAMES[dir][1] + ':location']);
        await bring('s3'); await wait(300); const c = await current(); assert.equal(c.length, 1);
        if (mode === 'region') assert.deepEqual(c, [NAMES[dir][2] + ':location']);
      });
      if (mode === 'region') await check(T + 'at the end the last section is current, and back at the top the first', async () => {
        await page.evaluate(() => { const a = document.getElementById('area'); a.scrollTop = a.scrollHeight; }); await wait(300); assert.deepEqual(await current(), [NAMES[dir][3] + ':location']);
        await page.evaluate(() => { document.getElementById('area').scrollTop = 0; }); await wait(300); assert.deepEqual(await current(), [NAMES[dir][0] + ':location']);
      });
      await mount();
      await check(T + 'a press scrolls to the section, moves focus, marks it, tells onChange and leaves the address', async () => {
        await (await page.$$('.plx-anchor__link'))[1].click(); await wait(1400);
        const r = await page.evaluate((mode) => ({ focus: document.activeElement && document.activeElement.id, tabindex: document.getElementById('s2').getAttribute('tabindex'), log: window.__log.slice(), hash: location.hash, top: Math.round(document.getElementById('s2').getBoundingClientRect().top - (mode === 'region' ? document.getElementById('area').getBoundingClientRect().top : 0)) }), mode);
        assert.equal(r.focus, 's2'); assert.equal(r.tabindex, '-1'); assert.deepEqual(r.log, ['s2']); assert.equal(r.hash, '');
        assert.ok(Math.abs(r.top - (mode === 'page' ? 12 : 0)) <= 2, 'at the top, or at its scroll margin: ' + r.top);
        assert.deepEqual(await current(), [NAMES[dir][1] + ':location']);
      });
      await mount();
      await check(T + 'Tab then Enter does the same', async () => {
        await page.evaluate(() => document.querySelector('.plx-anchor__link').focus()); await page.keyboard.press('Tab'); await page.keyboard.press('Enter'); await wait(1400);
        assert.equal(await page.evaluate(() => document.activeElement && document.activeElement.id), 's2'); assert.deepEqual(await current(), [NAMES[dir][1] + ':location']);
      });
      await check(T + 'a section whose element is missing does nothing', async () => {
        await mount(); await (await page.$$('.plx-anchor__link'))[4].click(); await wait(300);
        assert.deepEqual(await page.evaluate(() => window.__log.slice()), []); assert.deepEqual(await current(), [NAMES[dir][0] + ':location']);
      });
      await check(T + 'the current row has the navigation row\'s selected fill', async () => {
        const r = await page.evaluate(() => { const on = document.querySelector('.plx-anchor__link.is-current'), off = document.querySelector('.plx-anchor__link:not(.is-current)'); return { on: getComputedStyle(on).backgroundColor, off: getComputedStyle(off).backgroundColor, weight: getComputedStyle(on).fontWeight, offWeight: getComputedStyle(off).fontWeight }; });
        assert.notEqual(r.on, r.off); assert.ok(+r.weight > +r.offWeight, 'heavier');
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'ANCHOR_811_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
