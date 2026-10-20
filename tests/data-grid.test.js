// Plenix tests · every Table and DataGrid in the apps: each page (and the tab or view that shows its tables) is opened, the tables are
// awaited until the bundled renderer is ready, and for each table: it is built, it has its rows or its empty
// message, axe finds no WCAG 2.2 A/AA problem in it, the style audit finds nothing written inline by Plenix, and its rows
// and header take the table tokens (row height, text size), and every piece of text in its rows has the table's own size and
// the typeface of its kind: Reddit Mono in a column of kind "data" and for code and the data role, DM Sans elsewhere
// (a grid in its error state counts as built: it shows what failed and Retry instead of its rows)
// The three modes (owner, 2026-10-14; the DataGrid record's variant pages): "fill" draws only the rows in view, "pages"
// and "load-more" have a footer whose controls (the rows-per-page Select, the page buttons, Load more) follow the grid
// body in the Tab order: Tab from the body reaches them, and none is out of the Tab order.
// (owner: one size in tables, batch 247; typefaces by kind, 2026-10-11; badges, tags, chips, buttons and keys keep their
// component sizes, and the design system's value previews (.ds-vis: an "Aa" at the size it documents) are specimens).
//   node tests/data-grid.test.js            (TEST_PORT: another port)
//   DT_ENGINE=next: the independent renderer; DT_ONLY selects individual views.
//   TEST_SCOPE=full: every view; by default (tests/changed.js) the views of the apps and design-system pages that changed,
//   and every view when the DataGrid or Table changed
const { serve, launch, sleep, at } = require('./lib.js');
const changed = require('./changed.js');
const NEXT = process.env.DT_ENGINE === 'next';
const PORT = +process.env.TEST_PORT || 8809, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
// [page, the steps first (a control's visible text to press, or #section to go to without reloading), the grids expected]
const ONLY = process.env.DT_ONLY ? new RegExp(process.env.DT_ONLY) : null;
const STATES = [
  ['files/index.html', [], 1],
  ['dashboard/index.html', ['enter:kitchen'], 1],
  ['files/index.html', ['enter:pdf'], 1],
  ['projects/index.html', ['Kitchen Renovation', 'Files'], 1],
  ['dam/index.html', ['Fields'], 1],
  // the list layout comes from the command bar's View menu (owner, 2026-10-14)
  ['dam/index.html', ['View', 'List'], 1],
  ['dam/index.html', ['Branding(326)', 'View', 'List'], 1],
  ['dam/settings-system.html#properties', ['open:Enabled for'], 1],
  ['dam/settings-system.html#properties', ['Actions'], 1],
  ['dam/settings-system.html#fields', [], 1],
  ['dam/settings-system.html#transcoding', [], 1],
  ['dam/settings-system.html#users', [], 1],
  ['dam/settings-system.html#email-templates', [], 1],
  ['dam/settings-system.html#database', [], 1],
  ['dam/settings-system.html#customizations', [], 1],
  ['dam/settings-system.html#scheduler', [], 1],
  // a grid built while its section was hidden is drawn when the section is shown
  ['dam/settings-system.html#fields', ['#users'], 1],
  ['dam/settings-system.html#fields', ['#scheduler'], 1],
  ['settings/index.html', ['Documentation', 'Product vision'], 1],
  ['settings/index.html', ['Documentation', 'Terminology', 'open:*'], 3],
  ['settings/index.html', ['Documentation', 'Data model', 'open:*'], 2],
  ['settings/index.html', ['Documentation', 'Capabilities', 'main:Notes'], 2],
  // the design system's reference tables (props, states, classes, tokens), where token and class names sit in cells
  ['platform/design-system/index.html#/data-display/data-grid', [], 1],
  // the modes: fill (the default; 5,000 rows, virtual), pages (rows from a server, fetchRows), load more
  ['platform/design-system/index.html#/data-display/data-grid/v/virtualized-table', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/paged-data-grid', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/load-more-table', [], 1],
  // the row height steps, grouping (Airtable style), the column headers and the column menu (owner, 2026-10-14)
  ['platform/design-system/index.html#/data-display/data-grid/v/short-rows', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/medium-rows', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/tall-rows', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/extra-tall-rows', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/grouped-table', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/nested-grouped-table', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/grouped-table-with-summaries', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/wrapped-headers', [], 1],
  ['platform/design-system/index.html#/data-display/data-grid/v/column-menu', [], 1],
  ['platform/design-system/index.html#/data-display/badge', [], 1],
  ['platform/design-system/index.html#/actions/button', [], 1],
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
// in scope: a view whose app or design-system page changed (the record's component too: #/sec/data-grid -> DataGrid)
const GRIDS = ['components/DataGrid', 'components/DataGridEngine', 'components/Table'];
const APP_URLS = changed.pages(STATES.map((s) => s[0]).filter((u) => u.indexOf('platform/') !== 0));
const inScope = (url) => {
  if (changed.wants({ units: GRIDS })) return true;
  const ds = /^platform\/design-system\/index\.html#\/[\w-]+\/([\w-]+)/.exec(url);
  if (ds) return changed.wants({ ids: [ds[1]], units: ['components/' + ds[1].replace(/(^|-)(\w)/g, (m, a, c) => c.toUpperCase())] });
  return APP_URLS.includes(url);
};
const VIEWS = STATES.filter((s) => inScope(s[0]) && (!ONLY || ONLY.test(s[0])));

if (!VIEWS.length) changed.none('DATA_GRIDS_OK 0/0 table views');
changed.report(VIEWS.length + ' of ' + STATES.length + ' table views');
if (!ONLY && changed.wants({ units: ['components/DataGrid'] })) {
  for (const regression of ['data-grid-search-149.test.js', 'data-grid-window-184.test.js', 'data-grid-sort-185.test.js', 'data-grid-cell-187.test.js', 'data-grid-select-167.test.js', 'data-grid-pane-150.test.js', 'data-grid-narrow-168.test.js', 'data-grid-state-169.test.js', 'data-grid-view-169.test.js', 'data-grid-group-165.test.js', 'data-grid-group-browser-165.test.js', 'data-grid-unread-164.test.js', 'bar-fit-149.test.js']) {
  const result = require('child_process').spawnSync(process.execPath, [require('path').join(__dirname, regression)], { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
  }
}

// Keep the horizontal header/frozen-column regression in the behavior CI group.
if (!ONLY && changed.wants({ units: ['components/DataGrid'] })) {
  const result = require('child_process').spawnSync(process.execPath, [require('path').join(__dirname, 'data-grid-scroll-147.test.js')], { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
}

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); page.setDefaultNavigationTimeout(60000); await page.setViewport({ width: 1440, height: 1000 });
  if (NEXT) await require('./next-engine')(page);
  const res = [];
  // the design system is a submodule (plenix-design-system): without it (CI without DS_TOKEN), its views are skipped
  const HAS_DS = require('fs').existsSync(require('path').join(__dirname, '..', 'platform', 'design-system', 'index.html'));
  if (HAS_DS && !NEXT) {
    // Each focused source bundle gets its own page; focused fixtures stay isolated from the app-view checks.
    for (const [label, file] of [['Faceted quick-filter counts', './collection-facets.test.js'], ['Canonical multi-value groups', './multi-groups.test.js'], ['Remaining DataGrid contracts', './data-grid-rest.test.js']]) {
      const focused = await browser.newPage();
      try { await focused.goto(BASE + 'platform/design-system/', { waitUntil: 'domcontentloaded' }); const count = await require(file)(focused); res.push([label + ' (' + count + ' checks)', true]); }
      catch (error) { res.push([label, false, error.message]); }
      finally { await focused.close(); }
    }
    await page.goto(BASE + 'platform/design-system/', { waitUntil: 'domcontentloaded' });
    const viewChecks = await page.evaluate(async () => {
      const h=React.createElement,host=document.createElement('div');document.body.appendChild(host);
      const root=ReactDOM.createRoot(host),key='dt126-saved-view',storage='plx-data-grid:'+key,wait=()=>new Promise(r=>setTimeout(r,100));let table,count=0;
      const check=(yes,message)=>{if(!yes)throw Error(message);count++;};
      const columns=['a','b','c','d'].map(field=>({field,title:field})),data=[{id:1,a:'Zulu'},{id:2,a:'Alpha'}];
      const initial=['c','a','b','d'];localStorage.setItem(storage,JSON.stringify({order:initial,hidden:['a','b'],widths:{a:'160px',b:'240px'},sort:[{column:'a',dir:'asc'}]}));
      let props={label:'Saved view regression',columns,data,storageKey:key,height:'--plx-ref-size-400px',narrow:'table',onReady:t=>{table=t;}};
      const render=patch=>{props={...props,...patch};ReactDOM.flushSync(()=>root.render(h(Plenix.DataGrid,props)));};
      const order=()=>table.getColumns().map(c=>c.getField()).filter(Boolean);
      try {
        render({});await wait();
        check(JSON.stringify(order())===JSON.stringify(initial),'saved order includes hidden columns on first draw');
        check(host.querySelector('.plx-data-grid__grid-tableholder').clientHeight<400,'few records preserve maximum-height sizing without an empty viewport');
        check(!table.getColumn('a').isVisible()&&!table.getColumn('b').isVisible(),'saved visibility on first draw');
        check(table.getColumn('a').getWidth()===160&&table.getColumn('b').getWidth()===240,'saved widths on first draw');
        check(table.getSorters()[0]?.field==='a'&&table.getSorters()[0]?.dir==='asc','saved initial sort');
        let moved=0;table.on('columnMoved',()=>moved++);
        render({columnOrder:initial,hiddenColumns:['a','b'],filter:()=>true});await wait();
        check(moved===0,'matching order with hidden columns is a no-op');
        const changed=['d','b','c','a'];render({columnOrder:changed});await wait();
        check(JSON.stringify(order())===JSON.stringify(changed),'later hidden-column order changes as requested');
        moved=0;render({filter:()=>true,columnOrder:changed.slice()});await wait();
        check(moved===0,'unrelated view changes do not repeat hidden column moves');
        const sameTable=table;
        render({columns:columns.concat({field:'e',title:'New column'}),columnOrder:changed.concat('e')});await wait();
        check(table===sameTable,'column-set change keeps the controller');
        check(JSON.stringify(order())===JSON.stringify(changed.concat('e')),'new column joins the controlled order');
        check(!table.getColumn('a').isVisible()&&!table.getColumn('b').isVisible(),'column-set change retains hidden state');
        check(table.getSorters()[0]?.field==='a'&&table.getRows('active')[0].getData().a==='Alpha','column-set change retains the active saved sort');
        const records=Array.from({length:600},(_,id)=>({id,a:'Record '+String(id).padStart(4,'0')}));
        render({data:records});await wait();await wait();
        const drawn=()=>host.querySelectorAll('.plx-data-grid__grid-row:not(.plx-data-grid__grid-group)').length;
        check(drawn()>0&&drawn()<600,'native renderer virtualizes 600 records');
        window.dispatchEvent(new Event('beforeprint'));await wait();
        check(drawn()===600,'native print includes every loaded record');
        window.dispatchEvent(new Event('afterprint'));await wait();
        check(drawn()>0&&drawn()<600,'native renderer restores its virtual window after print');
        // Reveal the fixture before measuring a scroll: native Tabulator redraws once on first visibility.
        host.scrollIntoView({block:'start'});await wait();await wait();
        const holder=host.querySelector('.plx-data-grid__grid-tableholder');holder.focus({preventScroll:true});holder.scrollTop=10000;await wait();await wait();
        check(document.activeElement===holder&&+host.querySelector('.plx-data-grid__grid-row').getAttribute('aria-rowindex')>2,'native scrolling retains focus and logical row positions '+JSON.stringify({active:document.activeElement?.className,scroll:holder.scrollTop,index:host.querySelector('.plx-data-grid__grid-row')?.getAttribute('aria-rowindex'),renderer:table.options.renderVertical}));
        host.style.inlineSize='320px';render({columns:[{field:'a',title:'First',width:240,frozen:true},{field:'b',title:'Second',width:240,frozen:true},{field:'c',title:'Third',width:240}],hiddenColumns:[],columnOrder:['a','b','c']});await wait();await wait();
        const scroller=host.querySelector('.plx-data-grid__grid-tableholder'),cell=()=>host.querySelector('.plx-data-grid__grid-row [data-plx-field="a"]'),left=cell().getBoundingClientRect().left;
        scroller.scrollLeft=200;await wait();check(Math.abs(cell().getBoundingClientRect().left-left)<1,'virtual rows clip content without trapping frozen columns');host.style.removeProperty('inline-size');
        ReactDOM.flushSync(()=>root.render(h(Plenix.Table,{label:'Natural wrapping reference',data:[{id:1,a:'A long reference description that wraps over several natural lines without an inline row height.'}],columns:[{field:'a',title:'Description',kind:'wrap',width:'--plx-ref-size-160px'}],onReady:t=>{table=t;}})));await wait();await wait();
        check([...host.querySelectorAll('.plx-data-grid__grid-cell')].every(cell=>!cell.style.height),'static wrapping Tables retain intrinsic CSS cell heights');
        return count;
      } finally {ReactDOM.flushSync(()=>root.unmount());host.remove();localStorage.removeItem(storage);}
    });
    res.push(['Saved and hidden-column views ('+viewChecks+' checks)',true]);
    const regressions = require('./data-grid-high.test.js');
    try {
      const checks = await regressions(page) + await regressions.warning(page, BASE);
      console.log('DT_HIGH_OK ' + checks + ' regression checks');
    } catch(error) {res.push(['Existing high-impact regressions',false,error.message]);}
  }
  if (!HAS_DS) console.log('NOTE: platform/design-system is not checked out; its table views are skipped');
  for (const [url, steps, want] of VIEWS) {
    if (ONLY && !ONLY.test(url)) continue;   // DT_ONLY=<pattern>: only the views whose address matches
    if (!HAS_DS && url.indexOf('platform/design-system/') === 0) continue;
    const name = url + (steps.length ? ' › ' + steps.join(' › ') : '');
    at(name);if(process.env.DT_PROGRESS)console.log('DT_VIEW '+name);
    // each view from a fresh start: the apps restore their last screen (plenix.<app>.view), which would change the steps
    await page.goto('about:blank'); await page.goto(BASE + url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* storage blocked */ } });
    await page.goto(BASE + url, { waitUntil: 'domcontentloaded' }); await sleep(400);
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
        // "open:Title" opens the collapsed settings card with that title; "open:*" opens every collapsed card on the page
        if (text.indexOf('open:') === 0) { const t = text.slice(5); const all = Array.from(document.querySelectorAll('.plx-settings__section-toggle')).filter((b) => b.offsetParent && (t === '*' || b.textContent.trim().indexOf(t) === 0));
          all.filter((b) => b.getAttribute('aria-expanded') === 'false').forEach((b) => b.click()); return all.length > 0; }
        // "main:Text": a control inside the page's main area only (the same name can also be in the navigation)
        const inMain = text.indexOf('main:') === 0, name = inMain ? text.slice(5) : text;
        const el = Array.from((inMain ? document.querySelector('main') : document).querySelectorAll('button, [role="tab"], [role="radio"], [role="menuitemradio"], [role="menuitem"], a, label')).find((e) => (e.textContent.trim() === name || e.getAttribute('aria-label') === name) && e.offsetParent);
        if (el) el.click(); return !!el;
      }, text);
      if (!ok) { missing = text; break; }
      await sleep(400);
    }
    if (missing) { res.push([name, false, 'no control "' + missing + '"']); continue; }
    try { await page.waitForFunction((n) => Array.from(document.querySelectorAll('.plx-data-grid')).filter((g) => g.offsetParent).length >= n
      && Array.from(document.querySelectorAll('.plx-data-grid')).filter((g) => g.offsetParent).every((g) => g.querySelector('.plx-data-grid__grid-row, .plx-data-grid__grid-placeholder, .plx-data-grid__error')), { timeout: 60000 }, want); }
    catch (e) { res.push([name, false, 'tables not built: ' + (await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-grid')).filter((g) => g.offsetParent && g.querySelector('.plx-data-grid__grid-row, .plx-data-grid__grid-placeholder')).length)) + ' of ' + want + '; unready: ' + (await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-grid')).filter(g => g.offsetParent && !g.querySelector('.plx-data-grid__grid-row, .plx-data-grid__grid-placeholder, .plx-data-grid__error')).map(g => g.querySelector('[aria-label]')?.getAttribute('aria-label') || g.className).join(', ')))]); continue; }
    await sleep(600);
    if (!(await page.evaluate(() => !!window.axe))) await page.addScriptTag({ url: BASE + 'node_modules/axe-core/axe.min.js' });
    if (!(await page.evaluate(() => !!window.PlenixStyleAudit))) await page.addScriptTag({ url: BASE + 'platform/dev/style-audit.js' });
    const r = await page.evaluate(async (TAGS) => {
      const grids = Array.from(document.querySelectorAll('.plx-data-grid')).filter((g) => g.offsetParent);
      const ax = await window.axe.run({ include: grids.map((g) => [g]) }, { runOnly: { type: 'tag', values: TAGS }, resultTypes: ['violations'] });
      const audit = (window.PlenixStyleAudit ? window.PlenixStyleAudit.audit() : []).filter((f) => f.element && grids.some((g) => g.querySelector('*') && document.querySelector(f.element) && g.contains(document.querySelector(f.element))));
      const root = getComputedStyle(document.documentElement);
      const sizes = grids.map((g) => {
        const row = g.querySelector('.plx-data-grid__grid-row:not(.plx-data-grid__grid-group)'), cs = getComputedStyle(g);
        const want = parseFloat(cs.getPropertyValue('--plx-sys-data-grid-row-height')) * (/rem/.test(cs.getPropertyValue('--plx-sys-data-grid-row-height')) ? parseFloat(root.fontSize) : 1);
        return { label: g.querySelector('.plx-data-grid__grid') && g.querySelector('.plx-data-grid__grid').getAttribute('aria-label'), rows: g.querySelectorAll('.plx-data-grid__grid-row').length,
          rowHeight: row ? Math.round(row.getBoundingClientRect().height) : null, want: Math.round(want) + 1,
          font: getComputedStyle(g.querySelector('.plx-data-grid__grid')).fontSize, wantFont: cs.getPropertyValue('--plx-comp-data-grid-font-size').trim() };
      });
      // typefaces by kind, one size (owner, 2026-10-11): each text in the body rows at the table's own size; in a column of
      // kind "data" in Reddit Mono, elsewhere in DM Sans, except code and the data role (code, Text "data", token and class
      // links), which are Reddit Mono wherever they are (component labels excepted)
      const type = [];
      const MARKED = 'code, samp, .plx-text--data, .plx-data-grid__group-count, .plx-data-grid__group-summary-value, [data-plx-kind="data"], .ds-code-link, .ds-mono, .ds-value, .ds-name';
      grids.forEach((g) => {
        if (!g.querySelector('.plx-data-grid__grid-row .plx-data-grid__grid-cell')) return;
        const size = getComputedStyle(g.querySelector('.plx-data-grid__grid')).fontSize;
        const w = document.createTreeWalker(g.querySelector('.plx-data-grid__grid-tableholder') || g, NodeFilter.SHOW_TEXT); let n;
        while ((n = w.nextNode()) && type.length < 3) {
          // (a group header's eyebrow and a summary's name are labels in the eyebrow style: the owner's group header, 2026-10-14)
          const el = n.parentElement; if (!n.textContent.trim() || el.closest('.plx-badge, .plx-tag, .plx-tag--chip, .plx-button, .plx-kbd, .plx-count, .plx-data-grid__grid-placeholder, .ds-vis, .plx-data-grid__group-eyebrow, .plx-data-grid__group-summary-name')) continue;
          const c = getComputedStyle(el), fam = c.fontFamily.split(',')[0].replace(/"/g, '');
          const mono = !!el.closest('[class*="__cell--data"]') || !!el.closest(MARKED), want = mono ? 'Reddit Mono' : 'DM Sans';
          if (fam !== want || c.fontSize !== size) type.push('"' + n.textContent.trim().slice(0, 20) + '" is ' + fam + ' ' + c.fontSize + ', want ' + want + ' ' + size + (mono ? ' (a data value)' : ''));
        }
      });
      // header weights (owner, batch 248): every header row title is 600 and every row-label cell's text 500
      grids.forEach((g) => {
        g.querySelectorAll('.plx-data-grid__grid-header .plx-data-grid__grid-col-title').forEach((t) => { const w = getComputedStyle(t).fontWeight; if (t.textContent.trim() && w !== '600' && type.length < 3) type.push('header "' + t.textContent.trim().slice(0, 16) + '" is ' + w + ', not 600'); });
        g.querySelectorAll('.plx-data-grid__grid-row [class*="__cell--row-label"]').forEach((c) => {
          const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let n;
          while ((n = w.nextNode())) { const el = n.parentElement; if (!n.textContent.trim() || el.closest('.plx-badge, .plx-tag, .plx-tag--chip, .plx-button, .plx-kbd, .plx-count, .ds-vis')) continue; const fw = getComputedStyle(el).fontWeight; if (fw !== '500' && type.length < 3) type.push('row label "' + n.textContent.trim().slice(0, 16) + '" is ' + fw + ', not 500'); }
        });
      });
      // vertical alignment: middle (owner, 2026-10-13): in every density, each cell's content (its text and
      // its boxes: avatars, badges, icons, checkboxes, buttons) has the same room above and below, within 1px, in the
      // header and the first rows, for every cell kind; in a Narrow list the key lines together, and the checkbox, the
      // handle and the actions each, sit in the middle of the row (horizontal alignment is not checked: it is unchanged)
      const kindOf = (c) => (c.classList.contains('tabulator-row-header') ? 'select' : (Array.from(c.classList).find((x) => /__cell--(?!key|align|row-label)/.test(x)) || 'plain').replace(/^.*__cell--/, ''));
      const contentBox = (els) => {
        let top = Infinity, bottom = -Infinity;
        const take = (r) => { if (r.width > 0 && r.height > 0) { top = Math.min(top, r.top); bottom = Math.max(bottom, r.bottom); } };
        // the innermost boxes: an element holding only text (its lines), a box with nothing inside (a picture, an icon, a
        // checkbox), a control; text beside elements by its own box; anything taken out of the flow (absolutely placed:
        // the resize handle, a column line) is not content
        const walk = (n) => {
          // (text by its line: its glyph box grown to the line height, the half-leading above it in whole pixels as the
          // browser lays it out (a leading of 1.2px goes below the glyphs), the rest below)
          if (n.nodeType === 3) { if (n.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); const lh = parseFloat(getComputedStyle(n.parentElement).lineHeight);
            Array.from(rg.getClientRects()).forEach((r) => { const lead = lh > r.height ? lh - r.height : 0, above = Math.floor(lead / 2); take({ width: r.width, height: r.height + lead, top: r.top - above, bottom: r.bottom + lead - above }); }); } return; }
          if (n.nodeType !== 1) return;
          const cs = getComputedStyle(n);
          if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') return;
          const kids = Array.from(n.childNodes);
          // (a block of text lines, links and code inside it included, counts as its lines: the glyphs inside a line are
          // the font's business)
          const lines = cs.display !== 'inline' && kids.every((k) => k.nodeType !== 1 || getComputedStyle(k).display === 'inline');
          if (/^(INPUT|IMG|SVG|BUTTON|SELECT)$/i.test(n.tagName) || lines) { if (cs.visibility !== 'hidden') take(n.getBoundingClientRect()); return; }
          kids.forEach(walk);
        };
        els.forEach((root) => Array.from(root.childNodes).forEach(walk));
        return top === Infinity ? null : { top, bottom };
      };
      const off = (box, area) => (box ? Math.abs((box.top - area.top) - (area.bottom - box.bottom)) : 0);
      const middle = (density) => {
        const bad = [];
        grids.forEach((g) => {
          const label = g.querySelector('.plx-data-grid__grid') && g.querySelector('.plx-data-grid__grid').getAttribute('aria-label');
          const list = g.classList.contains('plx-data-grid--list') && g.querySelector('.plx-data-grid__grid-header') && getComputedStyle(g.querySelector('.plx-data-grid__grid-header')).display === 'none';
          const head = list ? [] : Array.from(g.querySelectorAll('.plx-data-grid__grid-header .plx-data-grid__grid-col')).filter((c) => c.offsetWidth);
          head.forEach((c) => { const d = off(contentBox([c.querySelector('.plx-data-grid__grid-col-content') || c]), c.getBoundingClientRect()); if (d > 1.01) bad.push(label + ' header ' + kindOf(c) + ' "' + c.textContent.trim().slice(0, 12) + '" off by ' + d.toFixed(1) + 'px (' + density + ')'); });
          // (taller rows are top-aligned: the padding check below measures them)
          const step = g.getAttribute('data-plx-row-height');
          if (step && step !== 'short') return;
          Array.from(g.querySelectorAll('.plx-data-grid__grid-row:not(.plx-data-grid__grid-group):not(.plx-data-grid__grid-calcs)')).slice(0, 5).forEach((row) => {
            const cells = Array.from(row.querySelectorAll(':scope > .plx-data-grid__grid-cell')).filter((c) => c.offsetWidth && c.offsetHeight);
            const rr = row.getBoundingClientRect(), line = parseFloat(getComputedStyle(row).borderBottomWidth) || 0, rowArea = { top: rr.top, bottom: rr.bottom - line };
            if (list) {
              const keys = cells.filter((c) => c.classList.contains('plx-data-grid__cell--key'));
              const d = off(contentBox(keys), rowArea); if (keys.length && d > 1.01) bad.push(label + ' list key lines off by ' + d.toFixed(1) + 'px (' + density + ')');
              cells.filter((c) => keys.indexOf(c) < 0).forEach((c) => { const e = off(contentBox([c]), rowArea); if (e > 1.01) bad.push(label + ' list ' + kindOf(c) + ' off by ' + e.toFixed(1) + 'px (' + density + ')'); });
              return;
            }
            cells.forEach((c) => { const d = off(contentBox([c]), c.getBoundingClientRect()); if (d > 1.01) bad.push(label + ' ' + kindOf(c) + ' "' + c.textContent.trim().slice(0, 12) + '" off by ' + d.toFixed(1) + 'px (' + density + ')'); });
          });
        });
        return bad;
      };
      // the minimum padding (owner, 2026-10-14): P = a Short row's own padding, (the density row height − the text line
      // height) / 2. For every cell kind and every row height step, the content has at least P above and below it: text by
      // its lines (each line the text line height around its glyphs, only the lines shown), boxes by their own box. In a
      // Short row a box taller than a line (a 24px button) cannot have P: it is in the middle (the check above), and its
      // room is what the row leaves. Group rows have their own heights and are not record rows.
      const pads = (density, stepName) => {
        const bad = [];
        grids.forEach((g) => {
          if (!g.hasAttribute('data-plx-row-height')) return;
          const cs = getComputedStyle(g), px = (v) => parseFloat(v) * (/rem/.test(v) ? parseFloat(root.fontSize) : 1);
          const R = px(cs.getPropertyValue('--plx-sys-data-grid-row-height')), LH = px(cs.getPropertyValue('--plx-comp-data-grid-text-line-height'));
          if (!R || !LH) { bad.push('no row height or text line height token'); return; }
          const P = (R - LH) / 2, label = g.querySelector('.plx-data-grid__grid') && g.querySelector('.plx-data-grid__grid').getAttribute('aria-label');
          const boxes = (cell) => {
            const out = [];
            const walk = (n) => {
              if (n.nodeType === 3) {
                if (!n.textContent.trim()) return;
                const clip = n.parentElement.closest('.plx-data-grid__value') || n.parentElement, cr = clip.getBoundingClientRect();
                const rg = document.createRange(); rg.selectNodeContents(n);
                Array.from(rg.getClientRects()).forEach((r) => { if (r.width > 0 && r.top >= cr.top - 1 && r.bottom <= cr.bottom + 1) { const c = (r.top + r.bottom) / 2; out.push({ top: c - LH / 2, bottom: c + LH / 2, h: LH }); } });
                return;
              }
              if (n.nodeType !== 1) return;
              const s = getComputedStyle(n);
              if (s.display === 'none' || s.position === 'absolute' || s.position === 'fixed' || s.visibility === 'hidden') return;
              if (/^(INPUT|IMG|SVG|BUTTON|SELECT)$/i.test(n.tagName) || n.classList.contains('plx-badge') || n.classList.contains('plx-avatar') || n.classList.contains('plx-thumbnail')) { const r = n.getBoundingClientRect(); if (r.width && r.height) out.push({ top: r.top, bottom: r.bottom, h: r.height }); return; }
              Array.from(n.childNodes).forEach(walk);
            };
            Array.from(cell.childNodes).forEach(walk);
            return out;
          };
          Array.from(g.querySelectorAll('.plx-data-grid__grid-row:not(.plx-data-grid__grid-group):not(.plx-data-grid__grid-calcs)')).slice(0, 5).forEach((row) => {
            Array.from(row.querySelectorAll(':scope > .plx-data-grid__grid-cell')).filter((c) => c.offsetWidth && c.offsetHeight).forEach((c) => {
              const cr = c.getBoundingClientRect(), list = boxes(c);
              if (!list.length) return;
              const top = Math.min.apply(null, list.map((b) => b.top)) - cr.top, bottom = cr.bottom - Math.max.apply(null, list.map((b) => b.bottom));
              const tallest = Math.max.apply(null, list.map((b) => b.h));
              if (stepName === 'short' && tallest > LH + 1) return;   // a box taller than a line: in the middle (above)
              if (top < P - 1 || bottom < P - 1) bad.push(label + ' ' + kindOf(c) + ' "' + c.textContent.trim().slice(0, 12) + '" room ' + top.toFixed(1) + ' / ' + bottom.toFixed(1) + 'px, P ' + P + 'px (' + density + ', ' + stepName + ')');
            });
          });
        });
        return bad;
      };
      const mid = [], padBad = [], html = document.documentElement, was = html.getAttribute('data-plx-density');
      const stepped = grids.filter((g) => g.hasAttribute('data-plx-row-height')), steps0 = stepped.map((g) => g.getAttribute('data-plx-row-height'));
      const frames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 150))));
      for (const density of ['compact', 'standard', 'comfortable']) {
        html.setAttribute('data-plx-density', density);
        await frames();
        middle(density).forEach((x) => { if (mid.length < 4) mid.push(x); });
        // every row height step (the frame's attribute, as the view menu sets it)
        for (const s of ['short', 'medium', 'tall', 'extra-tall']) {
          stepped.forEach((g) => g.setAttribute('data-plx-row-height', s));
          await frames();
          pads(density, s).forEach((x) => { if (padBad.length < 4) padBad.push(x); });
        }
        stepped.forEach((g, i) => g.setAttribute('data-plx-row-height', steps0[i]));
      }
      if (was === null) html.removeAttribute('data-plx-density'); else html.setAttribute('data-plx-density', was);
      // the modes: a grid that fills its room draws only some of its rows
      const modes = grids.map((g) => (g.hasAttribute('data-plx-fit') ? 'fill' + (g.classList.contains('plx-data-grid--load-more') ? ' load-more' : '') : g.classList.contains('plx-data-grid--pages') ? 'pages' : '') + (g.getAttribute('data-plx-render') === 'virtual' ? ' virtual' : '')).filter(Boolean);
      return { type, mid, padBad, modes, violations: ax.violations.map((v) => v.id + ' (' + v.nodes.length + '): ' + v.nodes[0].target.join(' ')), audit: audit.map((f) => f.kind + ' ' + f.element + ' ' + f.detail), sizes };
    }, TAGS);
    const bad = [];
    // the footer's controls (pages, load-more) are keyboard reachable: Tab from the grid body lands in the footer, and
    // every control there is in the Tab order
    const footed = await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-grid')).filter((g) => g.offsetParent && g.querySelector('.plx-data-grid__footer')).length);
    for (let i = 0; i < footed; i++) {
      const from = await page.evaluate((i) => { const g = Array.from(document.querySelectorAll('.plx-data-grid')).filter((x) => x.offsetParent && x.querySelector('.plx-data-grid__footer'))[i];
        const h = g.querySelector('.plx-data-grid__grid-tableholder'); h.focus(); return document.activeElement === h; }, i);
      await page.keyboard.press('Tab');
      const kb = await page.evaluate((i) => { const g = Array.from(document.querySelectorAll('.plx-data-grid')).filter((x) => x.offsetParent && x.querySelector('.plx-data-grid__footer'))[i];
        const f = g.querySelector('.plx-data-grid__footer'), a = document.activeElement;
        const controls = Array.from(f.querySelectorAll('button, select, a[href], input')).filter((c) => !c.disabled && c.offsetParent);
        return { label: g.querySelector('.plx-data-grid__grid').getAttribute('aria-label'), inFooter: f.contains(a), at: a ? (a.getAttribute('aria-label') || a.textContent || a.tagName).trim().slice(0, 24) : '', controls: controls.length, out: controls.filter((c) => c.tabIndex < 0).length }; }, i);
      if (!from || !kb.inFooter || !kb.controls || kb.out) bad.push(kb.label + ': footer controls not keyboard reachable (' + JSON.stringify(kb) + ')');
      else r.modes.push('footer keyboard ok (' + kb.controls + ' controls)');
    }
    if (r.violations.length) bad.push('axe: ' + r.violations.join('; '));
    if (r.type.length) bad.push('typography: ' + r.type.join('; '));
    if (r.audit.length) bad.push('style audit: ' + r.audit.slice(0, 3).join('; '));
    if (r.mid.length) bad.push('vertical alignment not middle: ' + r.mid.join('; '));
    if (r.padBad.length) bad.push('less than P above or below: ' + r.padBad.join('; '));
    r.sizes.forEach((s) => { if (!s.label) bad.push('a table has no name'); if (s.rowHeight !== null && s.rowHeight < s.want - 1) bad.push(s.label + ': row ' + s.rowHeight + 'px, the role ' + (s.want - 1) + 'px + its line'); });
    res.push([name + ' (' + r.sizes.map((s) => s.label + ': ' + s.rows + ' rows').join(', ') + ')' + (r.modes.length ? ' [' + r.modes.join(', ') + ']' : ''), !bad.length, bad.join(' · ')]);
  }
  // the keyboard (owner, 2026-10-14): a group row opens and closes with Enter and the arrow keys (aria-expanded follows,
  // the change is announced), the table has no view button and its header chevron opens the column menu, the column menu opens with
  // Shift + F10 on a focused header, its items take the arrow keys, Escape gives the focus back to the header
  if (HAS_DS && !NEXT && (!ONLY || ONLY.test('grouped-table')) && changed.wants({ units: GRIDS })) {
    const name = 'keyboard: group rows, the header chevron, the column menu';
    at(name);
    const bad = [];
    await page.goto('about:blank');
    await page.goto(BASE + 'platform/design-system/index.html#/data-display/data-grid/v/grouped-table', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* storage blocked */ } });
    await page.reload({ waitUntil: 'domcontentloaded' });
    try { await page.waitForFunction(() => document.querySelector('main .plx-data-grid .plx-data-grid__grid-group'), { timeout: 15000 }); } catch (e) { bad.push('no group row'); }
    const state = () => page.evaluate(() => { const a = document.activeElement; return { role: a && a.getAttribute('role'), label: a && (a.getAttribute('aria-label') || a.textContent.trim().slice(0, 30)), expanded: a && a.getAttribute('aria-expanded'), live: Array.from(document.querySelectorAll('[aria-live]')).map((x) => x.textContent).join(' ') }; });
    const wait = () => new Promise((r) => setTimeout(r, 300));
    if (!bad.length) {
      await page.evaluate(() => document.querySelector('main .plx-data-grid .plx-data-grid__grid-group').focus()); await wait();
      const s0 = await state();
      if (s0.role !== 'row' || s0.expanded !== 'true') bad.push('a group row is a focusable row with aria-expanded="true" (' + JSON.stringify(s0) + ')');
      await page.keyboard.press('Enter'); await wait();
      const s1 = await state();
      if (s1.expanded !== 'false' || !/collapsed/.test(s1.live)) bad.push('Enter closes the group, keeps the focus and announces it (' + JSON.stringify(s1) + ')');
      await page.keyboard.press('ArrowRight'); await wait();
      if ((await state()).expanded !== 'true') bad.push('Arrow Right opens the group');
      await page.keyboard.press('ArrowLeft'); await wait();
      if ((await state()).expanded !== 'false') bad.push('Arrow Left closes the group');
      await page.keyboard.press('ArrowDown'); await wait();
      const s4 = await state();
      if (s4.role !== 'row' || s4.label === s1.label) bad.push('Arrow Down moves to the next group row (' + JSON.stringify(s4) + ')');
      // no view button of its own (owner, 2026-10-14: the row height lives in the command bar's View menu); the header's
      // chevron button opens the column menu
      if (await page.evaluate(() => !!document.querySelector('main .plx-data-grid .plx-data-grid__cell--view'))) bad.push('the table has no view button of its own');
      const chev = await page.evaluate(() => { const c = document.querySelector('main .plx-data-grid .plx-data-grid__grid-col[data-plx-field="qty"] .plx-data-grid__menu-chevron'); if (!c) return false; c.click(); return true; });
      await wait();
      if (!chev) bad.push('a column header has its menu chevron');
      else if (!(await page.evaluate(() => !!document.querySelector(':is(.plx-menu,.plx-data-grid__grid-menu)')))) bad.push('the header chevron opens the column menu');
      await page.keyboard.press('Escape'); await wait();
      // the column menu
      await page.evaluate(() => document.querySelector('main .plx-data-grid .plx-data-grid__grid-col[data-plx-field="qty"]').focus());
      await page.keyboard.down('Shift'); await page.keyboard.press('F10'); await page.keyboard.up('Shift'); await wait();
      const c0 = await state();
      if (c0.role !== 'menuitem') bad.push('Shift + F10 opens the column menu on its first item (' + JSON.stringify(c0) + ')');
      await page.keyboard.press('ArrowDown');
      const c1 = await state();
      if (c1.role !== 'menuitem' || c1.label === c0.label) bad.push('Arrow Down moves in the column menu');
      await page.keyboard.press('Escape'); await wait();
      const c2 = await state();
      if (c2.role !== 'columnheader' || await page.evaluate(() => !!document.querySelector(':is(.plx-menu,.plx-data-grid__grid-menu)'))) bad.push('Escape closes the column menu and gives the focus back to the header (' + JSON.stringify(c2) + ')');
    }
    res.push([name, !bad.length, bad.join(' · ')]);
  }
  await browser.close(); server.close();
  const failed = res.filter((x) => !x[1]);
  res.forEach(([n, ok, d]) => console.log((ok ? '  ok   ' : '  FAIL ') + n + (ok ? '' : ' · ' + d)));
  console.log((failed.length ? 'DATA_GRIDS_FAIL ' : 'DATA_GRIDS_OK ') + (res.length - failed.length) + '/' + res.length + ' table views');
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
