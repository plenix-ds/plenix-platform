/* Plenix tests · TreeChart draws with ECharts' tree (owner, 2026-10-26, charts-tree-26: "I also need this in vertical
   and horizontal")
   Summary: the St. John ministries (the parish, its two priests, their areas, twelve ministries) as a TreeChart left to
     right and top to bottom, at a desktop width and a phone width. Each draws its tree with ECharts inside
     .plx-chart__engine and the engine loads once; no two labels overlap; the keyboard follows the orientation (left to
     right: → steps in, ← folds; top to bottom: ↓ steps in, ↑ folds) and the live region says each node; a click on a
     priest folds his branch and the chart gets shorter; the style audit reports nothing (font weights from the tokens).
   Usage: node tests/treechart-echarts.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
// in the automatic set with the other chart tests (owner, codex-q3-27): changed mode runs it when the charts, the engine, a
// global file or this test changed; TEST_SCOPE=full always
const changed = require('./changed');
if (!changed.wants({})) changed.none('TREECHART_ECHARTS_OK');
const CLERGY = [['c1', 'Fr. Daniel Boulos', 'Parish priest'], ['c2', 'Fr. Antony Wahba', 'Associate priest']];
const MINISTRIES = [['sunday-school', 'Sunday School', 'Marina Girgis', 'Education'], ['youth', 'Youth Meeting', 'Mina Habib', 'Education'],
  ['deacons', 'Deacons’ School', 'Kirollos Tadros', 'Worship'], ['choir', 'Hymns and Choir', 'Demiana Wassef', 'Worship'],
  ['bible-study', 'Bible Study', 'Fr. Antony Wahba', 'Education'], ['agape', 'Agape Kitchen', 'Nevine Mikhail', 'Fellowship'],
  ['visitation', 'Visitation', 'Hany Fahmy', 'Care'], ['food-pantry', 'Food Pantry', 'Sarah Ibrahim', 'Outreach'],
  ['media', 'Media and Sound', 'Fady Iskander', 'Worship'], ['ushers', 'Ushers', 'George Naguib', 'Worship'],
  ['library', 'Library and Bookstore', 'Monica Saad', 'Fellowship'], ['servants-prep', 'Servants’ Preparation', 'Fr. Daniel Boulos', 'Education']];
(async () => {
  const PORT = +process.env.TEST_PORT || 9614, server = await serve(PORT); let browser;
  try {
    browser = await launch();
    for (const [width, tag] of [[1280, 'desktop'], [400, 'phone']]) {
      const page = await browser.newPage(); const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.setViewport({ width, height: 1600 });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/dev/style-audit.js' });
      await page.evaluate((CLERGY, MINISTRIES) => {
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix;
        const reports = (m) => (m[3] === 'Education' || m[3] === 'Worship' ? 'c1' : 'c2');
        const root = { id: 'parish', label: 'St. John the Beloved', detail: 'The parish', children: CLERGY.map(([id, label, detail]) => {
          const areas = [...new Set(MINISTRIES.filter((m) => reports(m) === id).map((m) => m[3]))];
          return { id, label, detail, children: areas.map((a) => {
            const ms = MINISTRIES.filter((m) => m[3] === a && reports(m) === id);
            return { id: id + ':' + a, label: a, detail: ms.length + (ms.length === 1 ? ' ministry' : ' ministries'), children: ms.map((m) => ({ id: m[0], label: m[1], detail: 'Led by ' + m[2] })) };
          }) };
        }) };
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          h('div', { id: 'across' }, h(P.TreeChart, { title: 'How the ministries report to the clergy', data: root })),
          h('div', { id: 'down' }, h(P.TreeChart, { title: 'How the ministries report to the clergy', data: root, orientation: 'top-to-bottom' }))));
      }, CLERGY, MINISTRIES);
      await page.waitForFunction(() => document.querySelectorAll('.plx-tree-chart .plx-chart__engine svg text').length >= 2 * 17, { timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1500));   // past the drawing's animation and the label rooms' second pass
      const drawn = await page.evaluate(() => ({
        trees: ['across', 'down'].filter((id) => document.querySelector('#' + id + ' .plx-chart__engine svg path')).length,
        scripts: document.querySelectorAll('script[data-plx-vendor="echarts"]').length,
        // labels that overlap (their boxes intersect by more than a pixel), per chart
        overlaps: ['across', 'down'].map((id) => {
          const boxes = [...document.querySelectorAll('#' + id + ' .plx-chart__engine svg text')].map((t) => ({ t: t.textContent, r: t.getBoundingClientRect() })).filter((b) => b.r.width > 0);
          const hits = [];
          for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i].r, b = boxes[j].r;
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) hits.push(boxes[i].t + ' × ' + boxes[j].t);
          }
          return hits;
        }),
      }));
      assert.equal(drawn.trees, 2, tag + ': both trees draw with ECharts');
      assert.equal(drawn.scripts, 1, tag + ': the engine loads once');
      assert.deepEqual(drawn.overlaps, [[], []], tag + ': no labels overlap');
      // the keyboard follows the orientation; the live region says each node
      const say = async (id, keys) => {
        await page.focus('#' + id + ' .plx-chart__plot');
        const out = [];
        for (const k of keys) { await page.keyboard.press(k); await new Promise((r) => setTimeout(r, 250)); out.push(await page.evaluate(() => (document.querySelector('[data-plx-announcer="polite"]') || {}).textContent || '')); }
        return out;
      };
      const across = await say('across', ['ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowRight']);
      assert.match(across[0], /St\. John the Beloved, The parish, open/, tag + ': the first key goes to the root');
      assert.match(across[1], /Fr\. Daniel Boulos, Parish priest, open/, tag + ': → steps into the branch');
      assert.match(across[2], /Fr\. Daniel Boulos, Parish priest, folded/, tag + ': ← folds the branch');
      assert.match(across[3], /Fr\. Daniel Boulos, Parish priest, open/, tag + ': → opens it again');
      const down = await say('down', ['ArrowRight', 'ArrowDown', 'ArrowUp', 'ArrowUp']);
      assert.match(down[1], /Fr\. Daniel Boulos, Parish priest, open/, tag + ': top to bottom, ↓ steps into the branch');
      assert.match(down[2], /Fr\. Daniel Boulos, Parish priest, folded/, tag + ': ↑ folds the branch');
      assert.match(down[3], /St\. John the Beloved/, tag + ': ↑ again steps back to the parent');
      // a click on the associate priest folds his branch, and the left-to-right chart gets shorter (a row per leaf shown)
      await page.focus('body');
      const height = () => page.evaluate(() => Math.round(document.querySelector('#across .plx-chart__svg').getBoundingClientRect().height));
      const before = await height();
      const at = await page.evaluate(() => {
        const svg = document.querySelector('#across .plx-chart__engine svg');
        // left to right, the priests' dots share the second column; the associate priest is the lower one
        const dots = [...svg.querySelectorAll('path')].filter((p) => /A/.test(p.getAttribute('d') || '')).map((p) => p.getBoundingClientRect())
          .map((d) => ({ x: d.left + d.width / 2, y: d.top + d.height / 2 }));
        const columns = [...new Set(dots.map((d) => Math.round(d.x)))].sort((a, b) => a - b);
        const priests = dots.filter((d) => Math.round(d.x) === columns[1]).sort((a, b) => a.y - b.y);
        const dot = priests[priests.length - 1];
        return { x: dot.x, y: dot.y };
      });
      await page.mouse.move(at.x, at.y); await new Promise((r) => setTimeout(r, 150));
      await page.mouse.down(); await page.mouse.up(); await new Promise((r) => setTimeout(r, 900));
      const after = await height();
      const said = await page.evaluate(() => (document.querySelector('[data-plx-announcer="polite"]') || {}).textContent || '');
      assert.match(said, /Fr\. Antony Wahba, Associate priest, folded/, tag + ': the click folded Fr. Antony Wahba (said: ' + said + ')');
      assert.ok(after < before, tag + ': a click on Fr. Antony Wahba folds his branch (the chart was ' + before + 'px tall, is ' + after + 'px)');
      assert.deepEqual(await page.evaluate(() => window.PlenixStyleAudit.audit().map((f) => f.element + ' ' + f.detail)), [], tag + ': no style-audit finding');
      assert.deepEqual(errors, [], tag + ': no page error and no style-audit finding');
      console.log(tag + ': trees drawn, labels clear, keyboard both ways, a click folded (' + before + ' → ' + after + 'px)');
      await page.close();
    }
    console.log('TREECHART_ECHARTS_OK left to right and top to bottom, desktop and phone width: drawn, engine once, no overlapping labels, keyboard, folding, no style findings');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
