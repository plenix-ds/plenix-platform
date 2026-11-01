/* Plenix tests · Tree and TreeSelect draw only the rows in view (issue 815, part 1; Semi study #767, D and E): above 200
   visible rows they use useVirtualizer, with flat rows that keep their level and their place among their siblings.
   Summary (the browser):
     Tree of 5,000 rows: virtualized (a few dozen rows drawn); each row has aria-level, aria-posinset and aria-setsize among
       its siblings ("4,999 of 5,000"); End, Arrow Up, Home and 30 × Arrow Down reach rows not drawn, the active row is
       focused and in view; one Arrow Down past the bottom scrolls exactly one row (align "nearest")
     a tree of 50 rows is unchanged (nested groups, not virtualized); virtualized={false} and {true} decide
     a branch loading in a virtualized tree shows its status row (issue 814) without a position of its own
     TreeSelect of 5,000: virtualized in the popover; End and Enter choose the last item; a search with over 200 matches
       stays virtualized and Arrow Down from the search field moves into it
     right to left (ar-EG): Arrow Left opens a branch, a child row's label is indented from the right
     no script errors
   Usage: node tests/tree-virtual-815.test.js   → TREE_VIRTUAL_815_OK */
const assert = require('assert/strict');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

(async () => {
  const PORT = +process.env.TEST_PORT || 9683, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1000, height: 800 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const pause = (ms = 150) => new Promise((r) => setTimeout(r, ms));

    // draws a Tree or a TreeSelect of n files in one open folder (plus a folder "Small"); window.__changes records onChange
    const draw = (kind, n, opts = {}) => page.evaluate(async (kind, n, opts) => {
      const h = React.createElement, P = window.Plenix, ar = opts.dir === 'rtl';
      document.documentElement.setAttribute('dir', opts.dir || 'ltr');
      window.__root && window.__root.unmount();
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      window.__changes = []; window.__asks = 0;
      const files = Array.from({ length: n }, (_, i) => ({ id: 'f' + (i + 1), label: (ar ? 'ملف ' : 'File ') + (i + 1) }));
      const nodes = opts.lazy
        ? Array.from({ length: n }, (_, i) => ({ id: 'd' + i, label: 'Folder ' + (i + 1), hasChildren: true }))
        : [{ id: 'big', label: ar ? 'الأرشيف' : 'Archive', children: files }, { id: 'small', label: 'Small', children: [{ id: 's1', label: 'Inside' }] }];
      const loadChildren = opts.lazy ? () => { window.__asks++; return new Promise(() => {}); } : undefined;   // never answers: stays loading
      function App() {
        const [v, setV] = React.useState(null);
        const onChange = (x) => { window.__changes.push(x); setV(x); };
        const common = { label: 'Files', nodes, loadChildren, defaultExpanded: opts.lazy ? [] : ['big'], virtualized: opts.virtualized };
        const part = kind === 'tree' ? h(P.Tree, Object.assign({ selected: v, onSelect: onChange }, common)) : h(P.TreeSelect, Object.assign({ value: v, onChange, search: !!opts.search }, common));
        return h(P.LocaleProvider, { locale: ar ? 'ar-EG' : 'en-US', dir: opts.dir || 'ltr' }, h('div', { id: 'part', dir: opts.dir || 'ltr' }, part));
      }
      // the Tree scrolls itself in its container's height: a 420px box (the fixture's sample class sets it)
      const host = document.getElementById('c');
      host.setAttribute('data-test-box', '');
      const sheet = document.getElementById('t815') || Object.assign(document.head.appendChild(document.createElement('style')), { id: 't815' });
      sheet.textContent = '[data-test-box] #part{block-size:420px;}';
      window.__root = ReactDOM.createRoot(host); window.__root.render(h(App));
      await new Promise((r) => setTimeout(r, 400));
    }, kind, n, opts);
    const tree = '#part .plx-tree';
    const state = () => page.evaluate((sel) => {
      const t = document.querySelector(sel), a = document.activeElement, tr = t.getBoundingClientRect(), ar = a.getBoundingClientRect();
      return { virtual: t.classList.contains('plx-tree--virtual'), drawn: t.querySelectorAll('[role="treeitem"]').length, label: a.textContent.trim(),
        level: a.getAttribute('aria-level'), pos: a.getAttribute('aria-posinset'), size: a.getAttribute('aria-setsize'), inView: ar.top >= tr.top - 1 && ar.bottom <= tr.bottom + 1, top: t.scrollTop };
    }, tree);

    // 1. Tree of 5,000
    await draw('tree', 5000);
    let s = await page.evaluate((sel) => { const t = document.querySelector(sel); const row = t.querySelector('[role="treeitem"][aria-level="2"]');
      return { virtual: t.classList.contains('plx-tree--virtual'), drawn: t.querySelectorAll('[role="treeitem"]').length, groups: t.querySelectorAll('[role="group"]').length,
        level: row.getAttribute('aria-level'), pos: row.getAttribute('aria-posinset'), size: row.getAttribute('aria-setsize') }; }, tree);
    assert.equal(s.virtual, true, '5,000 rows: the tree is virtualized');
    assert.ok(s.drawn < 60, 'only the rows in view are drawn; got ' + s.drawn);
    assert.equal(s.groups, 0, 'the rows are flat (no nested groups)');
    assert.deepEqual([s.level, s.pos, s.size], ['2', '1', '5000'], 'a file row: level 2, 1 of 5,000 among its siblings');
    await page.focus(tree + ' [role="treeitem"]');
    await page.keyboard.press('End'); await pause();
    s = await state();
    assert.deepEqual([s.label, s.pos, s.size, s.inView], ['Small', '2', '2', true], 'End: the last item (Small, 2 of 2) is focused and in view; got ' + JSON.stringify(s));
    await page.keyboard.press('ArrowUp'); await pause();
    s = await state();
    assert.deepEqual([s.label, s.pos, s.size, s.inView], ['File 5000', '5000', '5000', true], 'Arrow Up: File 5000, 5,000 of 5,000, in view');
    await page.keyboard.press('Home'); await pause();
    s = await state();
    assert.deepEqual([s.label, s.top], ['Archive', 0], 'Home: the first item, the list at its top');
    for (let i = 0; i < 30; i++) await page.keyboard.press('ArrowDown');
    await pause();
    s = await state();
    assert.deepEqual([s.label, s.inView], ['File 30', true], '30 × Arrow Down through rows not drawn yet: File 30, in view');
    // one more Arrow Down past the bottom scrolls exactly one row
    const pitch = await page.$eval(tree + ' [data-plx-virtual-probe]', (e) => e.offsetHeight);
    const before = s.top;
    await page.keyboard.press('ArrowDown'); await pause();
    s = await state();
    assert.equal(s.top - before, pitch, 'the active row scrolls into view by one row only (align "nearest")');
    await page.keyboard.press('Enter'); await pause();
    assert.deepEqual(await page.evaluate(() => window.__changes), ['f31'], 'Enter selects the row reached by the keys');

    // 2. short trees are unchanged; virtualized decides
    await draw('tree', 50);
    s = await page.evaluate((sel) => { const t = document.querySelector(sel); return { virtual: t.classList.contains('plx-tree--virtual'), groups: t.querySelectorAll('[role="group"]').length, drawn: t.querySelectorAll('[role="treeitem"]').length }; }, tree);
    assert.deepEqual(s, { virtual: false, groups: 1, drawn: 52 }, '50 rows: nested and drawn whole, as before');
    await draw('tree', 50, { virtualized: true });
    assert.equal(await page.$eval(tree, (t) => t.classList.contains('plx-tree--virtual')), true, 'virtualized={true} virtualizes a short tree');
    await draw('tree', 5000, { virtualized: false });
    assert.equal(await page.$eval(tree, (t) => t.classList.contains('plx-tree--virtual')), false, 'virtualized={false} draws every row');

    // 3. a branch loading in a virtualized tree (issue 814)
    await draw('tree', 300, { lazy: true });
    await page.focus(tree + ' [role="treeitem"]');
    await page.keyboard.press('ArrowRight'); await pause();
    const status = await page.evaluate((sel) => { const li = document.querySelector(sel + ' .plx-tree__row--status').closest('li'); return { role: li.getAttribute('role'), pos: li.getAttribute('aria-posinset'), text: li.textContent }; }, tree);
    assert.equal(await page.evaluate(() => window.__asks), 1, 'opening a lazy branch asks once');
    assert.deepEqual([status.role, status.pos], ['none', null], 'the status row has no position of its own');
    assert.ok(/Loading…/.test(status.text), 'and says Loading…');

    // 4. TreeSelect of 5,000
    await draw('treeselect', 5000, { search: true });
    await page.click('#part button[role="combobox"]'); await pause(400);
    assert.equal(await page.$eval('.plx-tree-select__tree', (t) => t.classList.contains('plx-tree--virtual')), true, 'the popover tree is virtualized');
    await page.keyboard.press('ArrowDown'); await pause();   // from the search field into the tree
    await page.keyboard.press('End'); await pause();
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Small', 'End reaches the last item');
    await page.keyboard.press('Enter'); await pause();
    assert.deepEqual(await page.evaluate(() => window.__changes), ['small'], 'Enter chooses it');
    await page.click('#part button[role="combobox"]'); await pause(400);
    await page.keyboard.type('File 1'); await pause(300);   // File 1, 10–19, 100–199, 1000–1999: 1,111 matches
    s = await page.evaluate(() => { const t = document.querySelector('.plx-tree-select__tree'); return { virtual: t.classList.contains('plx-tree--virtual'), drawn: t.querySelectorAll('[role="treeitem"]').length }; });
    assert.ok(s.virtual && s.drawn < 60, 'a search with 1,111 matches stays virtualized; got ' + JSON.stringify(s));
    await page.keyboard.press('ArrowDown'); await pause();
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('role')), 'treeitem', 'Arrow Down from the search field moves into the tree');
    await page.keyboard.press('Escape'); await pause();

    // 5. right to left
    await draw('tree', 5000, { dir: 'rtl' });
    const indent = await page.evaluate((sel) => { const t = document.querySelector(sel);
      const l1 = t.querySelector('[aria-level="1"] .plx-tree__label').getBoundingClientRect(), l2 = t.querySelector('[aria-level="2"] .plx-tree__label').getBoundingClientRect();
      return { l1: l1.right, l2: l2.right }; }, tree);
    assert.ok(indent.l2 < indent.l1, 'right to left, a child row is indented from the right');
    await page.focus(tree + ' [role="treeitem"]');
    await page.keyboard.press('End'); await pause();             // Small, closed
    await page.keyboard.press('ArrowLeft'); await pause();       // opens it (right to left)
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-expanded')), 'true', 'right to left, Arrow Left opens a branch');

    assert.deepEqual(errors, [], 'no script errors (no update loop while the keys move through undrawn rows)');
    console.log('TREE_VIRTUAL_815_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
