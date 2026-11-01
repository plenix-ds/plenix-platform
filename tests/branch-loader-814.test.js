/* Plenix tests · a branch loads only when it is first opened (issue 814; Semi study #767, B and E): one mechanism,
   useBranchLoader, shared by Tree, TreeSelect and Cascader (through MillerColumns).
   Summary:
     Node: the "branch" words are in English (en.js and en.json) and in the Plenix Arabic catalog (ar.js), key for key
     the browser (every load answered by hand from the page, so nothing waits on a timer):
       Tree: the + box asks for Europe once; the item is aria-busy and a status announces "Loading Europe"; a failure says
         "Couldn’t load these items" with Try again and is announced; Arrow Right asks again; the children show; closing
         and opening it does not ask again; Arrow Right opens Africa from the keyboard
       a hierarchy without loadChildren works as before (no status rows, no busy state)
       TreeSelect: Arrow Right opens and loads a branch, Enter chooses a loaded child; search finds a loaded child and
         never loads a branch by itself; with multiple, checking a branch not loaded loads it and checks its leaves
       Cascader: choosing a parent loads its column (aria-busy, "Loading…"), a leaf of it is chosen with its path;
         search finds the loaded leaf
       right to left (ar-EG): Arrow Left opens a branch, the words are Arabic, the columns' chevrons point left (turned),
         the tree's status row sits at the children's inline start
   Usage: node tests/branch-loader-814.test.js   → BRANCH_LOADER_814_OK */
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.join(__dirname, '..');

(async () => {
  // ── Node: the words in both catalogs
  const section = (file) => {
    const text = fs.readFileSync(path.join(ROOT, 'platform', 'i18n', file), 'utf8');
    // the section runs to its own closing brace at its indent; the words hold braces ("Loading {label}")
    const m = /^(\s*)"branch": \{\n([^]*?)\n\1\}/m.exec(text);
    assert.ok(m, file + ' has the "branch" section');
    return Object.fromEntries([...m[2].matchAll(/"(\w+)": "([^"]*)"/g)].map((x) => [x[1], x[2]]));
  };
  const en = section('en.js'), enJson = section('en.json'), ar = section('ar.js');
  assert.deepEqual(Object.keys(en).sort(), ['failed', 'failedName', 'loading', 'loadingName', 'retry'], 'the English words');
  assert.deepEqual(enJson, en, 'en.json mirrors en.js');
  assert.deepEqual(Object.keys(ar).sort(), Object.keys(en).sort(), 'Arabic has every word');
  Object.entries(ar).forEach(([k, v]) => assert.ok(/[؀-ۿ]/.test(v) && v !== en[k], 'the Arabic "' + k + '" is Arabic'));

  // ── the browser
  const PORT = +process.env.TEST_PORT || 9682, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1100, height: 800 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });

    // draws one part; window.__asks counts each branch's loads, window.__settle(id, ok) answers the oldest open one
    const draw = (kind, opts = {}) => page.evaluate(async (kind, opts) => {
      const h = React.createElement, P = window.Plenix, ar = opts.dir === 'rtl';
      document.documentElement.setAttribute('dir', opts.dir || 'ltr');
      window.__root && window.__root.unmount();
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      window.__asks = {}; window.__open = {}; window.__changes = [];
      window.__settle = (id, ok) => { const q = window.__open[id] || []; const p = q.shift(); if (p) (ok ? p.ok : p.no)(); };
      const L = (en, a) => (ar ? a : en);
      const kids = (n) => [{ id: n.id + '-1', label: L(n.id === 'eu' ? 'Paris' : 'Cairo', n.id === 'eu' ? 'باريس' : 'القاهرة') }, { id: n.id + '-2', label: L(n.id === 'eu' ? 'Rome' : 'Lagos', n.id === 'eu' ? 'روما' : 'لاغوس') }];
      const loadChildren = opts.plain ? undefined : (n) => {
        window.__asks[n.id] = (window.__asks[n.id] || 0) + 1;
        return new Promise((ok, no) => { (window.__open[n.id] = window.__open[n.id] || []).push({ ok: () => ok(kids(n)), no: () => no(new Error('offline')) }); });
      };
      const nodes = opts.plain
        ? [{ id: 'eu', label: 'Europe', children: [{ id: 'eu-1', label: 'Paris' }] }, { id: 'af', label: 'Africa', children: [{ id: 'af-1', label: 'Cairo' }] }]
        : [{ id: 'eu', label: L('Europe', 'أوروبا'), hasChildren: true }, { id: 'af', label: L('Africa', 'أفريقيا'), hasChildren: true }, { id: 'nt', label: L('Notes', 'ملاحظات') }];
      function App() {
        const [v, setV] = React.useState(opts.multiple ? [] : null);
        const onChange = (x) => { window.__changes.push(x); setV(x); };
        const part = kind === 'tree' ? h(P.Tree, { label: 'Places', nodes, loadChildren, selected: v, onSelect: onChange })
          : kind === 'treeselect' ? h(P.TreeSelect, Object.assign({ label: 'Place', nodes, loadChildren, onChange, search: !!opts.search, multiple: !!opts.multiple }, opts.multiple ? { values: v } : { value: v }))
          : h(P.Cascader, { label: 'Place', options: nodes, loadChildren, value: v, onChange, searchable: !!opts.search });
        return h(P.LocaleProvider, { locale: ar ? 'ar-EG' : 'en-US', dir: opts.dir || 'ltr' }, h('div', { id: 'part', dir: opts.dir || 'ltr' }, part));
      }
      window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(App));
      await new Promise((r) => setTimeout(r, 300));
    }, kind, opts);
    const settle = async (id, ok) => { await page.evaluate((id, ok) => window.__settle(id, ok), id, ok); await new Promise((r) => setTimeout(r, 150)); };
    const asks = () => page.evaluate(() => window.__asks);
    const text = (sel) => page.evaluate((sel) => { const el = document.querySelector(sel); return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }, sel);
    const live = () => page.evaluate(() => [...document.querySelectorAll('[aria-live]')].map((e) => e.textContent).join(' | '));
    const pause = (ms = 150) => new Promise((r) => setTimeout(r, ms));
    const item = (i) => '#part > .plx-tree > [role="treeitem"]:nth-child(' + i + ')';   // a top-level item of the Tree

    // 1. Tree
    await draw('tree');
    assert.deepEqual(await asks(), {}, 'nothing loads before a branch is opened');
    await page.click(item(1) + ' > .plx-tree__row .plx-tree__toggle'); await pause();
    assert.deepEqual(await asks(), { eu: 1 }, 'opening Europe asks for its children once');
    const loading = await page.evaluate((sel) => { const li = document.querySelector(sel); const s = li.querySelector('.plx-tree__row--status [role="status"]');
      return { busy: li.getAttribute('aria-busy'), expanded: li.getAttribute('aria-expanded'), status: s ? s.textContent : '', shown: li.querySelector('.plx-tree__status').textContent }; }, item(1));
    assert.equal(loading.busy, 'true', 'the item is aria-busy while it loads');
    assert.equal(loading.expanded, 'true', 'and open');
    assert.ok(/Loading Europe/.test(loading.status), 'the spinner announces "Loading Europe"; got ' + loading.status);
    assert.ok(/Loading…/.test(loading.shown), 'the row shows "Loading…"');
    await settle('eu', false);
    assert.ok(/Couldn’t load these items/.test(await text(item(1) + ' .plx-tree__status')), 'a failure says so');
    assert.ok(await page.$(item(1) + ' .plx-tree__status button'), 'with a Try again button');
    await pause(400);
    assert.ok(/Couldn’t load Europe/.test(await live()), 'the failure is announced; got ' + await live());
    await page.focus(item(1)); await page.keyboard.press('ArrowRight'); await pause();
    assert.deepEqual(await asks(), { eu: 2 }, 'Arrow Right on the failed branch asks again');
    await settle('eu', true);
    assert.deepEqual(await page.$$eval(item(1) + ' [role="group"] [role="treeitem"]', (els) => els.map((e) => e.textContent.trim())), ['Paris', 'Rome'], 'the children show');
    assert.equal(await page.$eval(item(1), (e) => e.getAttribute('aria-busy')), null, 'no longer busy');
    await page.keyboard.press('ArrowRight'); await pause();
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Paris', 'Arrow Right moves to the first loaded child');
    await page.click(item(1) + ' > .plx-tree__row .plx-tree__toggle'); await page.click(item(1) + ' > .plx-tree__row .plx-tree__toggle'); await pause();
    assert.deepEqual(await asks(), { eu: 2 }, 'closing and opening a loaded branch does not ask again');
    await page.focus(item(2)); await page.keyboard.press('ArrowRight'); await pause();
    assert.equal((await asks()).af, 1, 'Arrow Right opens and loads Africa from the keyboard');

    // 2. a hierarchy without loadChildren, as before
    await draw('tree', { plain: true });
    await page.click(item(1) + ' > .plx-tree__row .plx-tree__toggle'); await pause();
    assert.equal(await page.$$eval('.plx-tree__row--status', (els) => els.length), 0, 'no status rows without loadChildren');
    assert.deepEqual(await page.$$eval(item(1) + ' [role="group"] [role="treeitem"]', (els) => els.map((e) => e.textContent.trim())), ['Paris'], 'the children show as before');

    // 3. TreeSelect: one choice, with search
    await draw('treeselect', { search: true });
    await page.click('#part button[role="combobox"]'); await pause(300);
    await page.keyboard.press('ArrowDown'); await pause();            // from the search field into the tree (Europe)
    await page.keyboard.press('ArrowDown'); await pause();            // Africa
    await page.keyboard.press('ArrowRight'); await pause();           // opens it
    assert.deepEqual(await asks(), { af: 1 }, 'Arrow Right opens and loads Africa');
    await settle('af', true);
    await page.keyboard.press('ArrowRight'); await pause();           // to Cairo
    await page.keyboard.press('Enter'); await pause();
    assert.deepEqual(await page.evaluate(() => window.__changes), ['af-1'], 'Enter chooses the loaded child');
    await page.click('#part button[role="combobox"]'); await pause(300);
    await page.keyboard.type('Cai'); await pause();
    assert.ok(/Cairo/.test(await text('.plx-tree-select__tree')), 'search finds the loaded child');
    await page.evaluate(() => { const s = document.querySelector('.plx-tree-select__panel input'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(s, 'Eur'); s.dispatchEvent(new Event('input', { bubbles: true })); });
    await pause();
    assert.ok(/Europe/.test(await text('.plx-tree-select__tree')), 'search finds a branch not loaded by its own label');
    assert.equal((await asks()).eu, undefined, 'search never loads a branch by itself');
    await page.keyboard.press('Escape'); await pause();

    // TreeSelect: several choices, a branch checked before it loaded
    await draw('treeselect', { multiple: true });
    await page.click('#part button[role="combobox"]'); await pause(300);
    await page.evaluate(() => document.querySelector('.plx-tree-select__tree [role="treeitem"]').click()); await pause();
    assert.deepEqual(await asks(), { eu: 1 }, 'checking Europe loads it');
    await settle('eu', true);
    assert.deepEqual(await page.evaluate(() => window.__changes[window.__changes.length - 1]), ['eu-1', 'eu-2'], 'then checks every leaf under it');
    await page.keyboard.press('Escape'); await pause();

    // 4. Cascader
    await draw('cascader', { search: true });
    await page.click('#part .plx-cascader__trigger'); await pause(300);
    await page.evaluate(() => [...document.querySelectorAll('.plx-cascader__popup .plx-miller-columns__item')][1].click()); await pause();
    assert.equal((await asks()).af, 1, 'choosing Africa loads its column');
    const col = await page.evaluate(() => { const lists = document.querySelectorAll('.plx-cascader__popup .plx-miller-columns__list'); const l = lists[lists.length - 1]; return { busy: l.getAttribute('aria-busy'), text: l.textContent }; });
    assert.equal(col.busy, 'true', 'the loading column is aria-busy');
    assert.ok(/Loading…/.test(col.text), 'and shows "Loading…"');
    await settle('af', true);
    await page.evaluate(() => [...document.querySelectorAll('.plx-cascader__popup .plx-miller-columns__item')].find((e) => e.textContent.trim() === 'Lagos').click()); await pause();
    assert.deepEqual(await page.evaluate(() => window.__changes), ['af-2'], 'a loaded leaf is chosen');
    assert.equal(await text('#part .plx-cascader__value'), 'Africa / Lagos', 'the field shows its path');
    await page.click('#part .plx-cascader__trigger'); await pause(300);
    await page.keyboard.type('Lag'); await pause();
    assert.ok(/Lagos/.test(await text('.plx-cascader__matches')), 'search finds the loaded leaf');
    await page.keyboard.press('Escape'); await pause();

    // 5. right to left, Arabic
    await draw('tree', { dir: 'rtl' });
    await page.focus(item(1)); await page.keyboard.press('ArrowLeft'); await pause();
    assert.deepEqual(await asks(), { eu: 1 }, 'right to left, Arrow Left opens and loads a branch');
    assert.ok(/جارٍ التحميل…/.test(await text(item(1) + ' .plx-tree__status')), 'the loading word is Arabic');
    const side = await page.evaluate((sel) => { const row = document.querySelector(sel + ' > .plx-tree__row'), st = document.querySelector(sel + ' .plx-tree__status');
      return { row: row.getBoundingClientRect().right, status: st.getBoundingClientRect().right }; }, item(1));
    assert.ok(side.status < side.row, 'the status row is indented from the right, at the children\'s inline start');
    await settle('eu', false);
    assert.ok(/تعذّر تحميل هذه العناصر/.test(await text(item(1) + ' .plx-tree__status')), 'the failure is Arabic');
    assert.ok(/إعادة المحاولة/.test(await text(item(1) + ' .plx-tree__status button')), 'and Try again');
    for (const dir of ['ltr', 'rtl']) {
      await draw('cascader', { dir });
      await page.click('#part .plx-cascader__trigger'); await pause(300);
      const turn = await page.$eval('.plx-cascader__popup .plx-miller-columns__chevron .plx-icon', (e) => getComputedStyle(e).transform);
      if (dir === 'ltr') assert.equal(turn, 'none', 'left to right the chevron points right');
      else assert.ok(/^matrix\(-1, ?[-0-9.e]+, ?[-0-9.e]+, ?-1/.test(turn), 'right to left the chevron is turned to point left; got ' + turn);
      await page.keyboard.press('Escape'); await pause();
    }

    assert.deepEqual(errors, [], 'no script errors');
    console.log('BRANCH_LOADER_814_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
