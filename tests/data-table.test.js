// Plenix tests · every Table and DataTable in the apps: each page (and the tab or view that shows its tables) is opened, the tables are
// awaited (Tabulator loads the first time a table renders), and for each table: it is built, it has its rows or its empty
// message, axe finds no WCAG 2.2 A/AA problem in it, the style audit finds nothing written inline by Plenix, and its rows
// and header take the table tokens (row height, text size), and every piece of text in its rows has the table's own font and size
// (a grid in its error state counts as built: it shows what failed and Retry instead of its rows)
// (owner: one typography in tables, batch 247; badges, tags, chips, buttons and keys keep their component sizes, and the design
// system's value previews (.ds-vis: an "Aa" at the size it documents) are specimens).
//   node tests/data-table.test.js
const { serve, launch, sleep } = require('./lib.js');
const PORT = 8809, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
// [page, the steps first (a control's visible text to press, or #section to go to without reloading), the grids expected]
const ONLY = process.env.DT_ONLY ? new RegExp(process.env.DT_ONLY) : null;
const STATES = [
  ['files/index.html', [], 1],
  ['dashboard/index.html', ['enter:kitchen'], 1],
  ['files/index.html', ['enter:pdf'], 1],
  ['projects/index.html', ['Kitchen Renovation', 'Files'], 1],
  ['dam/index.html', ['Fields'], 1],
  ['dam/index.html', ['Table'], 1],
  ['dam/index.html', ['Branding(326)', 'Table'], 1],
  ['dam/settings-system.html#properties', ['Enabled for'], 1],
  ['dam/settings-system.html#properties', ['Actions'], 1],
  ['dam/settings-system.html#fields', [], 1],
  ['dam/settings-system.html#transcoding', ['Preset configuration'], 1],
  ['dam/settings-system.html#users', [], 1],
  ['dam/settings-system.html#email-templates', [], 1],
  ['dam/settings-system.html#database', [], 1],
  ['dam/settings-system.html#customizations', [], 1],
  ['dam/settings-system.html#scheduler', [], 1],
  // a grid built while its section was hidden is drawn when the section is shown
  ['dam/settings-system.html#fields', ['#users'], 1],
  ['dam/settings-system.html#fields', ['#scheduler'], 1],
  ['settings/index.html', ['Documentation', 'Product vision'], 1],
  ['settings/index.html', ['Documentation', 'Terminology'], 3],
  ['settings/index.html', ['Documentation', 'Data model'], 2],
  ['settings/index.html', ['Documentation', 'Capabilities', 'main:Notes'], 2],
  // the design system's reference tables (props, states, classes, tokens), where token and class names sit in cells
  ['platform/design-system/index.html#/data-display/data-table', [], 1],
  ['platform/design-system/index.html#/data-display/badge', [], 1],
  ['platform/design-system/index.html#/actions/button', [], 1],
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const res = [];
  // the design system is a submodule (plenix-design-system): without it (CI without DS_TOKEN), its views are skipped
  const HAS_DS = require('fs').existsSync(require('path').join(__dirname, '..', 'platform', 'design-system', 'index.html'));
  if (!HAS_DS) console.log('NOTE: platform/design-system is not checked out; its table views are skipped');
  for (const [url, steps, want] of STATES) {
    if (ONLY && !ONLY.test(url)) continue;   // DT_ONLY=<pattern>: only the views whose address matches
    if (!HAS_DS && url.indexOf('platform/design-system/') === 0) continue;
    const name = url + (steps.length ? ' › ' + steps.join(' › ') : '');
    // each view from a fresh start: the apps restore their last screen (plenix.<app>.view), which would change the steps
    await page.goto('about:blank'); await page.goto(BASE + url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* storage blocked */ } });
    await page.goto(BASE + url, { waitUntil: 'networkidle0' }); await sleep(400);
    let missing = null;
    for (const text of steps) {
      // "enter:words": the words typed in the header search, then Enter (the Search workspace)
      if (text.indexOf('enter:') === 0) {
        // the header search: its field, opened with its shortcut (Ctrl K) where it is folded away
        const visible = () => page.evaluate(() => { const i = Array.from(document.querySelectorAll('input[type="search"], [role="searchbox"]')).find((x) => x.offsetParent); if (i) i.focus(); return !!i; });
        if (!(await visible())) { await page.keyboard.down('Control'); await page.keyboard.press('KeyK'); await page.keyboard.up('Control'); await sleep(300); }
        if (!(await visible())) { missing = text; break; }
        await page.keyboard.type(text.slice(6)); await page.keyboard.press('Enter'); await sleep(600); continue;
      }
      const ok = await page.evaluate((text) => {
        if (text.charAt(0) === '#') { location.hash = text.slice(1); return true; }
        // "main:Text": a control inside the page's main area only (the same name can also be in the navigation)
        const inMain = text.indexOf('main:') === 0, name = inMain ? text.slice(5) : text;
        const el = Array.from((inMain ? document.querySelector('main') : document).querySelectorAll('button, [role="tab"], [role="radio"], a, label')).find((e) => (e.textContent.trim() === name || e.getAttribute('aria-label') === name) && e.offsetParent);
        if (el) el.click(); return !!el;
      }, text);
      if (!ok) { missing = text; break; }
      await sleep(400);
    }
    if (missing) { res.push([name, false, 'no control "' + missing + '"']); continue; }
    try { await page.waitForFunction((n) => Array.from(document.querySelectorAll('.plx-data-table, .plx-table')).filter((g) => g.offsetParent).length >= n
      && Array.from(document.querySelectorAll('.plx-data-table, .plx-table')).filter((g) => g.offsetParent).every((g) => g.querySelector('.tabulator-row, .tabulator-placeholder, .plx-data-table__error')), { timeout: 15000 }, want); }
    catch (e) { res.push([name, false, 'tables not built: ' + (await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-table, .plx-table')).filter((g) => g.offsetParent && g.querySelector('.tabulator-row, .tabulator-placeholder')).length)) + ' of ' + want]); continue; }
    await sleep(600);
    if (!(await page.evaluate(() => !!window.axe))) await page.addScriptTag({ url: BASE + 'node_modules/axe-core/axe.min.js' });
    if (!(await page.evaluate(() => !!window.PlenixStyleAudit))) await page.addScriptTag({ url: BASE + 'platform/dev/style-audit.js' });
    const r = await page.evaluate(async (TAGS) => {
      const grids = Array.from(document.querySelectorAll('.plx-data-table, .plx-table')).filter((g) => g.offsetParent);
      const ax = await window.axe.run({ include: grids.map((g) => [g]) }, { runOnly: { type: 'tag', values: TAGS }, resultTypes: ['violations'] });
      const audit = (window.PlenixStyleAudit ? window.PlenixStyleAudit.audit() : []).filter((f) => f.element && grids.some((g) => g.querySelector('*') && document.querySelector(f.element) && g.contains(document.querySelector(f.element))));
      const root = getComputedStyle(document.documentElement);
      const sizes = grids.map((g) => {
        const row = g.querySelector('.tabulator-row:not(.tabulator-group)'), cs = getComputedStyle(g);
        const want = parseFloat(cs.getPropertyValue('--plx-sys-data-table-row-height')) * (/rem/.test(cs.getPropertyValue('--plx-sys-data-table-row-height')) ? parseFloat(root.fontSize) : 1);
        return { label: g.querySelector('.tabulator') && g.querySelector('.tabulator').getAttribute('aria-label'), rows: g.querySelectorAll('.tabulator-row').length,
          rowHeight: row ? Math.round(row.getBoundingClientRect().height) : null, want: Math.round(want) + 1,
          font: getComputedStyle(g.querySelector('.tabulator')).fontSize, wantFont: cs.getPropertyValue('--plx-comp-data-table-font-size').trim() };
      });
      // one typography: each text in the body rows in the table's font family and size (component labels excepted)
      const type = [];
      grids.forEach((g) => {
        const first = g.querySelector('.tabulator-row .tabulator-cell'); if (!first) return;
        const base = getComputedStyle(first), fam = base.fontFamily.split(',')[0], size = base.fontSize;
        const w = document.createTreeWalker(g.querySelector('.tabulator-tableholder') || g, NodeFilter.SHOW_TEXT); let n;
        while ((n = w.nextNode()) && type.length < 3) {
          const el = n.parentElement; if (!n.textContent.trim() || el.closest('.plx-badge, .plx-tag, .plx-chip, .plx-button, .plx-kbd, .plx-count, .tabulator-placeholder, .ds-vis')) continue;
          const c = getComputedStyle(el);
          if (c.fontFamily.split(',')[0] !== fam || c.fontSize !== size) type.push('"' + n.textContent.trim().slice(0, 20) + '" is ' + c.fontFamily.split(',')[0] + ' ' + c.fontSize + ', the table ' + fam + ' ' + size);
        }
      });
      // header weights (owner, batch 248): every header row title is 600 and every row-label cell's text 500
      grids.forEach((g) => {
        g.querySelectorAll('.tabulator-header .tabulator-col-title').forEach((t) => { const w = getComputedStyle(t).fontWeight; if (t.textContent.trim() && w !== '600' && type.length < 3) type.push('header "' + t.textContent.trim().slice(0, 16) + '" is ' + w + ', not 600'); });
        g.querySelectorAll('.tabulator-row [class*="__cell--row-label"]').forEach((c) => {
          const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let n;
          while ((n = w.nextNode())) { const el = n.parentElement; if (!n.textContent.trim() || el.closest('.plx-badge, .plx-tag, .plx-chip, .plx-button, .plx-kbd, .plx-count, .ds-vis')) continue; const fw = getComputedStyle(el).fontWeight; if (fw !== '500' && type.length < 3) type.push('row label "' + n.textContent.trim().slice(0, 16) + '" is ' + fw + ', not 500'); }
        });
      });
      return { type, violations: ax.violations.map((v) => v.id + ' (' + v.nodes.length + '): ' + v.nodes[0].target.join(' ')), audit: audit.map((f) => f.kind + ' ' + f.element + ' ' + f.detail), sizes };
    }, TAGS);
    const bad = [];
    if (r.violations.length) bad.push('axe: ' + r.violations.join('; '));
    if (r.type.length) bad.push('typography: ' + r.type.join('; '));
    if (r.audit.length) bad.push('style audit: ' + r.audit.slice(0, 3).join('; '));
    r.sizes.forEach((s) => { if (!s.label) bad.push('a table has no name'); if (s.rowHeight !== null && s.rowHeight < s.want - 1) bad.push(s.label + ': row ' + s.rowHeight + 'px, the role ' + (s.want - 1) + 'px + its line'); });
    res.push([name + ' (' + r.sizes.map((s) => s.label + ': ' + s.rows + ' rows').join(', ') + ')', !bad.length, bad.join(' · ')]);
  }
  await browser.close(); server.close();
  const failed = res.filter((x) => !x[1]);
  res.forEach(([n, ok, d]) => console.log((ok ? '  ok   ' : '  FAIL ') + n + (ok ? '' : ' · ' + d)));
  console.log((failed.length ? 'DATA_TABLES_FAIL ' : 'DATA_TABLES_OK ') + (res.length - failed.length) + '/' + res.length + ' table views');
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
