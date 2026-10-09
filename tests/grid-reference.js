// Plenix tests · the DataGrid against the owner's reference (docs/datagrid-tabulator-demo.html, "Tabulator in Plenix"):
// the same grid is drawn twice, once by the reference page and once by the Platform DataGrid, and every part's computed
// style is compared: the frame, header, titles, column lines, rows, cells (name, technical values), the checkbox and
// icon columns, hover, selected, selected + hover, the sort arrow and filter button on hover, the header menu, the row
// menu, the filter popup, group rows and tree controls; in light and dark, at Compact, Standard and Comfortable.
// The reference loads its fonts and Tabulator from the network, so this is a check to run by hand, not part of npm test.
//   node tests/grid-reference.js [--all] [--shots <folder>]
const fs = require('fs');
const path = require('path');
const { ROOT, serve, launch, sleep } = require('./lib.js');

// the reference's rows (the same data the reference page builds)
const PAGE_JS = `(function () {
  var P = window.Plenix, h = React.createElement, id = 0;
  function f(name, type, kb, status, owner, date) { return { id: ++id, name: name, type: type, size: kb, status: status, owner: owner, modified: date }; }
  var data = [
    Object.assign(f('Crosses', 'Collection', 0, 'Active', 'R. Maher', '2026-10-02'), { _children: [
      f('Cross 014.png', 'PNG', 1240, 'Active', 'R. Maher', '2026-10-02'), f('Cross 015.png', 'PNG', 980, 'Active', 'R. Maher', '2026-10-01'),
      f('Coptic cross outline.svg', 'SVG', 14, 'Draft', 'M. Saad', '2026-09-28')] }),
    Object.assign(f('Feast banners', 'Collection', 0, 'Active', 'M. Saad', '2026-09-30'), { _children: [
      f('Nativity banner.jpg', 'JPG', 3420, 'Active', 'M. Saad', '2026-09-30'), f('Resurrection banner.jpg', 'JPG', 3610, 'Review', 'M. Saad', '2026-09-29')] }),
    f('Logo primary.svg', 'SVG', 22, 'Active', 'R. Maher', '2026-09-12'), f('Logo mono.svg', 'SVG', 18, 'Active', 'R. Maher', '2026-09-12'),
    f('Letterhead.pdf', 'PDF', 412, 'Review', 'A. Hanna', '2026-09-20'), f('Bulletin October.pdf', 'PDF', 2210, 'Draft', 'A. Hanna', '2026-10-04'),
    f('Choir rehearsal.mp4', 'MP4', 184320, 'Active', 'P. Gerges', '2026-09-27'), f('Hymn Tenen Theno.mp3', 'MP3', 6120, 'Active', 'P. Gerges', '2026-09-18'),
    f('Icon St Mark.jpg', 'JPG', 2870, 'Archived', 'M. Saad', '2026-06-03'), f('Icon St George.jpg', 'JPG', 2540, 'Active', 'M. Saad', '2026-08-15'),
    f('Map parish hall.png', 'PNG', 760, 'Draft', 'A. Hanna', '2026-10-05'), f('Volunteer list.xlsx', 'XLSX', 88, 'Review', 'A. Hanna', '2026-10-06')
  ];
  var ATT = { 'Letterhead.pdf': 1, 'Bulletin October.pdf': 3, 'Volunteer list.xlsx': 2, 'Nativity banner.jpg': 1, 'Choir rehearsal.mp4': 1, 'Logo primary.svg': 2 };
  var DIM = { PNG: '2400 × 2400', JPG: '3000 × 1000', SVG: 'vector', MP4: '1920 × 1080' };
  var LOC = { Collection: 'Library', PNG: 'Library / Crosses', SVG: 'Library / Brand', JPG: 'Library / Icons', PDF: 'Documents / Print', MP4: 'Media / Video', MP3: 'Media / Audio', XLSX: 'Documents / Admin' };
  var TAG = { PNG: 'cross, symbol', JPG: 'icon, feast', SVG: 'logo, brand', PDF: 'print', MP4: 'choir, video', MP3: 'hymn, audio', XLSX: 'volunteers', Collection: 'set' };
  var TONE = { Active: 'success', Review: 'warning', Draft: 'neutral', Archived: 'neutral' };
  (function walk(rows) { rows.forEach(function (r) { r.attach = ATT[r.name] || 0; r.dims = DIM[r.type] || ''; r.location = LOC[r.type] || 'Library'; r.tags = TAG[r.type] || ''; r.created = r.modified.slice(0, 8) + '01'; if (r._children) walk(r._children); }); })(data);
  function kb(v) { if (!v) return '\\u2014'; return v >= 1024 ? (v / 1024).toFixed(1) + ' MB' : v + ' KB'; }
  var columns = [
    { title: 'Attachments', field: 'attach', kind: 'icon', icon: 'attachment', sorter: 'number', render: function (r) { return r.attach ? h(P.Icon, { name: 'attachment', label: r.attach + ' attachments' }) : null; } },
    { title: 'Name', field: 'name', kind: 'name', filter: true, minWidth: 220, width: 240, editor: 'input' },
    { title: 'Type', field: 'type', kind: 'data', filter: 'list', width: 110 },
    { title: 'Status', field: 'status', kind: 'center', filter: 'list', width: 120, render: function (r) { return h(P.Badge, { tone: TONE[r.status], size: 'sm' }, r.status); } },
    { title: 'Owner', field: 'owner', filter: true, width: 130 },
    { title: 'Size', field: 'size', kind: 'data', width: 110, hozAlign: 'right', headerHozAlign: 'right', sorter: 'number', formatter: function (c) { return kb(c.getValue()); } },
    { title: 'Modified', field: 'modified', kind: 'data', width: 120 },
    { title: 'Dimensions', field: 'dims', kind: 'data', width: 120, formatter: function (c) { return c.getValue() || '—'; } },
    { title: 'Location', field: 'location', filter: true, width: 170 },
    { title: 'Tags', field: 'tags', filter: true, width: 200 },
    { title: 'Created', field: 'created', kind: 'data', width: 120 },
    { title: '', field: '_act', kind: 'actions', width: 76, render: function () { return h(P.Inline, { gap: 'xs' }, h(P.Button, { variant: 'ghost', size: 'sm', iconOnly: true, icon: 'pencil', label: 'Rename' }), h(P.Button, { variant: 'ghost', size: 'sm', iconOnly: true, icon: 'more', label: 'More actions' })); } }
  ];
  var rowMenu = [{ label: 'Open', icon: 'open', onSelect: function () {} }, { label: 'Rename', icon: 'pencil', onSelect: function () {} }, { separator: true },
    { label: 'Delete', icon: 'trash', danger: true, onSelect: function () {} }];
  ReactDOM.createRoot(document.getElementById('app')).render(h(P.DataGrid, { label: 'Assets', data: data, columns: columns, selectable: true, rowMenu: rowMenu, height: '520px',
    options: { dataTree: true, dataTreeElementColumn: 'name', dataTreeStartExpanded: [true, false], movableColumns: true },
    onReady: function (t) { window.__grid = t; } }));
})();`;

// the parts compared: [name, reference selector, DataGrid selector, properties, pseudo-element]
const COLORS = ['background-color', 'color'];
const PARTS = [
  ['frame', '.frame', '.plx-data-grid', ['background-color', 'border-top-color', 'border-top-width', 'border-top-left-radius']],
  ['grid', '#grid', '.plx-data-grid__grid', ['background-color', 'color', 'font-size', 'font-family']],
  ['header', '#grid .tabulator-header', '.plx-data-grid .tabulator-header', ['background-color', 'color', 'font-weight', 'border-bottom-color', 'border-bottom-width']],
  ['header cell', '#grid .tabulator-col[tabulator-field="name"] .tabulator-col-content', '.plx-data-grid .tabulator-col[tabulator-field="name"] .tabulator-col-content', ['height', 'padding-left', 'padding-right']],
  ['column title', '#grid .tabulator-col[tabulator-field="name"] .tabulator-col-title', '.plx-data-grid .tabulator-col[tabulator-field="name"] .tabulator-col-title', ['font-size', 'font-weight', 'color']],
  ['header column line', '#grid .tabulator-col[tabulator-field="type"]', '.plx-data-grid .tabulator-col[tabulator-field="type"]', ['background-color', 'top', 'bottom', 'width'], '::before'],
  ['row', '#grid .tabulator-row:nth-child(7)', '.plx-data-grid .tabulator-row:nth-child(7)', ['background-color', 'border-bottom-color', 'border-bottom-width', 'height']],
  ['cell', '#grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="owner"]', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="owner"]', ['padding-left', 'padding-right', 'height', 'line-height', 'font-size', 'color']],
  ['column line', '#grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="owner"]', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="owner"]', ['background-color', 'top', 'bottom', 'width'], '::before'],
  ['name cell', '#grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="name"] .name', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="name"]', ['font-weight', 'color']],
  ['technical value', '#grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="type"] .mono', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="type"]', ['font-size', 'color', 'font-family']],
  ['checkbox', '#grid .tabulator-row:nth-child(7) .tabulator-row-header input', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-row-header input', ['width', 'height', 'accent-color']],
  ['checkbox column', '#grid .tabulator-row:nth-child(7) .tabulator-row-header', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-row-header', ['width', 'padding-left']],
  ['icon column', '#grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="attach"]', '.plx-data-grid .tabulator-row:nth-child(7) .tabulator-cell[tabulator-field="attach"]', ['width', 'color']],
  ['tree control', '#grid .tabulator-data-tree-control', '.plx-data-grid .tabulator-data-tree-control', ['width', 'height', 'border-top-color', 'border-top-left-radius', 'margin-right']],
];
const first = (v) => v.split(',')[0].replace(/["']/g, '').trim();
const SHOTS = process.argv.includes('--shots') ? path.resolve(process.argv[process.argv.indexOf('--shots') + 1]) : null;

async function read(page, sel, props, pseudo) {
  return page.evaluate((sel, props, pseudo) => {
    const e = document.querySelector(sel); if (!e) return null;
    const cs = getComputedStyle(e, pseudo || null), out = {};
    props.forEach((p) => { out[p] = cs.getPropertyValue(p); });
    return out;
  }, sel, props, pseudo || null);
}

(async () => {
  const pageFile = path.join(__dirname, '.grid-page.html'), jsFile = path.join(__dirname, '.grid-page.js');
  fs.writeFileSync(jsFile, PAGE_JS);
  fs.writeFileSync(pageFile, '<!doctype html><html lang="en" data-plx-density="standard"><head><meta charset="utf-8"><title>Grid</title><link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Mono:wght@400;500&display=swap\">'
    + '<script src="../platform/providers/theme-boot.js"></script><link rel="stylesheet" href="../platform/platform.css"></head><body>'
    + '<main id="app" class="plx-u-p-md"></main><script src="../platform/vendor/react-loader.js"></script><script src="../platform/dist/platform.js"></script>'
    + '<script src=".grid-page.js"></script></body></html>');
  const server = await serve(8806);
  // two browsers, so each page is in front (a page behind another one skips its animation frames)
  const browsers = [await launch(), await launch()];
  const ref = await browsers[0].newPage(), ours = await browsers[1].newPage();
  for (const p of [ref, ours]) await p.setViewport({ width: 1240, height: 900 });
  const res = [];
  const compare = async (label, a, b, props, pseudo, rs, os) => {
    const x = await read(ref, rs || a, props, pseudo), y = await read(ours, os || b, props, pseudo);
    if (!x || !y) { res.push([label, false, (x ? '' : 'reference has no ' + a) + (y ? '' : ' grid has no ' + b)]); return; }
    const bad = props.filter((p) => (p === 'font-family' ? first(x[p]) !== first(y[p]) : x[p] !== y[p]));
    res.push([label, !bad.length, bad.map((p) => p + ': ' + x[p] + ' / ' + y[p]).join('; ')]);
  };
  for (const mode of ['light', 'dark']) {
    for (const density of ['compact', 'standard', 'comfortable']) {
      const tag = mode + ' ' + density + ' · ';
      await ref.goto('http://127.0.0.1:8806/Plenix/docs/datagrid-tabulator-demo.html', { waitUntil: 'networkidle0' });
      await ref.evaluate((m, d) => { document.documentElement.setAttribute('data-theme', m); document.querySelector('#den [data-d="' + d + '"]').click(); }, mode, density);
      await ours.goto('http://127.0.0.1:8806/Plenix/tests/.grid-page.html', { waitUntil: 'networkidle0' });
      await ours.evaluate((m, d) => { document.documentElement.setAttribute('data-plx-mode', m); document.documentElement.setAttribute('data-plx-density', d); }, mode, density);
      await ours.waitForFunction(() => window.__grid && document.querySelectorAll('.plx-data-grid .tabulator-row').length > 8, { timeout: 15000 });
      await sleep(600);
      for (const [name, a, b, props, pseudo] of PARTS) await compare(tag + name, a, b, props, pseudo);

      // hover, selected, selected + hover (the same row in both)
      const row = (p, s) => p.$(s + ' .tabulator-row:nth-child(9)');
      await (await row(ref, '#grid')).hover(); await (await row(ours, '.plx-data-grid')).hover(); await sleep(250);
      await compare(tag + 'row hover', '#grid .tabulator-row:nth-child(9)', '.plx-data-grid .tabulator-row:nth-child(9)', COLORS.slice(0, 1));
      await compare(tag + 'header hover: sort arrow', '#grid .tabulator-col[tabulator-field="owner"] .tabulator-col-sorter', '.plx-data-grid .tabulator-col[tabulator-field="owner"] .tabulator-col-sorter', ['opacity']);
      for (const [p, s] of [[ref, '#grid'], [ours, '.plx-data-grid']]) await (await p.$(s + ' .tabulator-col[tabulator-field="owner"]')).hover();
      await sleep(250);
      await compare(tag + 'header hover: filter button', '#grid .tabulator-col[tabulator-field="owner"] .tabulator-header-popup-button', '.plx-data-grid .tabulator-col[tabulator-field="owner"] .tabulator-header-popup-button', ['opacity', 'color', 'right', 'border-top-left-radius', 'padding-top', 'padding-left', 'padding-right']);
      await compare(tag + 'header hover: title room', '#grid .tabulator-col[tabulator-field="owner"] .tabulator-col-title', '.plx-data-grid .tabulator-col[tabulator-field="owner"] .tabulator-col-title', ['padding-right']);
      for (const [p, s] of [[ref, '#grid'], [ours, '.plx-data-grid']]) await (await p.$(s + ' .tabulator-row:nth-child(9) .tabulator-row-header input')).click();
      await ref.mouse.move(5, 5); await ours.mouse.move(5, 5); await sleep(250);
      await compare(tag + 'row selected', '#grid .tabulator-row:nth-child(9)', '.plx-data-grid .tabulator-row:nth-child(9)', COLORS.slice(0, 1));
      await (await row(ref, '#grid')).hover(); await (await row(ours, '.plx-data-grid')).hover(); await sleep(250);
      await compare(tag + 'row selected + hover', '#grid .tabulator-row:nth-child(9)', '.plx-data-grid .tabulator-row:nth-child(9)', COLORS.slice(0, 1));
      // --shots <folder>: pictures of both grids (a selected row, another row hovered), side by side for a person to see
      if (SHOTS) {
        await (await ref.$('#grid .tabulator-row:nth-child(5)')).hover(); await (await ours.$('.plx-data-grid .tabulator-row:nth-child(5)')).hover(); await sleep(250);
        await (await ref.$('.frame')).screenshot({ path: path.join(SHOTS, 'reference-' + mode + '-' + density + '.png') });
        await (await ours.$('.plx-data-grid')).screenshot({ path: path.join(SHOTS, 'datagrid-' + mode + '-' + density + '.png') });
      }

      // the header menu and the row menu
      for (const [p, s] of [[ref, '#grid'], [ours, '.plx-data-grid']]) { const e = await p.$(s + ' .tabulator-col[tabulator-field="owner"]'); const bx = await e.boundingBox(); await p.mouse.click(bx.x + 10, bx.y + 10, { button: 'right' }); }
      await sleep(300);
      await compare(tag + 'header menu', '.tabulator-menu', '.tabulator-menu', ['background-color', 'border-top-color', 'border-top-left-radius', 'box-shadow', 'font-size', 'padding-top', 'color']);
      await compare(tag + 'menu item', '.tabulator-menu .tabulator-menu-item', '.tabulator-menu .tabulator-menu-item', ['padding-top', 'padding-left', 'padding-right', 'border-top-left-radius']);
      await compare(tag + 'menu separator', '.tabulator-menu .tabulator-menu-separator', '.tabulator-menu .tabulator-menu-separator', ['border-top-color', 'margin-top']);
      await compare(tag + 'menu icon gap', '.tabulator-menu .tabulator-menu-item', '.tabulator-menu .plx-data-grid__menu-item', ['column-gap'], null, null, null);
      await ref.keyboard.press('Escape'); await ours.keyboard.press('Escape'); await ref.mouse.click(5, 5); await ours.mouse.click(5, 5); await sleep(200);

      // the filter popup
      for (const [p, s] of [[ref, '#grid'], [ours, '.plx-data-grid']]) { await (await p.$(s + ' .tabulator-col[tabulator-field="owner"]')).hover(); await sleep(150); await (await p.$(s + ' .tabulator-col[tabulator-field="owner"] .tabulator-header-popup-button')).click(); }
      await sleep(300);
      await compare(tag + 'filter popup', '.tabulator-popup-container', '.tabulator-popup-container', ['background-color', 'border-top-color', 'border-top-left-radius', 'box-shadow']);
      await compare(tag + 'filter label', '.fp label', '.plx-data-grid__filter-label', ['font-size', 'font-weight', 'letter-spacing', 'text-transform', 'color']);
      await compare(tag + 'filter body', '.fp', '.plx-data-grid__filter', ['padding-top', 'row-gap', 'min-width']);
      await ref.mouse.click(5, 5); await ours.mouse.click(5, 5); await sleep(200);

      // group rows
      await ref.evaluate(() => document.querySelector('#grp [data-g="type"]').click());
      await ours.evaluate(() => { window.__grid.setGroupBy('type'); });
      await sleep(500);
      await compare(tag + 'group row', '#grid .tabulator-group', '.plx-data-grid .tabulator-group', ['background-color', 'color', 'font-weight', 'height', 'padding-left', 'border-bottom-color']);
      await compare(tag + 'group count', '#grid .tabulator-group span', '.plx-data-grid .tabulator-group .plx-data-grid__group-count', ['color', 'font-size', 'font-family', 'margin-left', 'font-weight']);
    }
  }
  for (const b of browsers) await b.close();
  server.close();
  fs.unlinkSync(pageFile); fs.unlinkSync(jsFile);
  const bad = res.filter((r) => !r[1]);
  res.forEach(([n, ok, d]) => { if (!ok || process.argv.includes('--all')) console.log((ok ? '  ok   ' : '  DIFF ') + n + (ok ? '' : ' · ' + d)); });
  console.log((bad.length ? 'GRID_DIFF ' : 'GRID_SAME ') + (res.length - bad.length) + '/' + res.length + ' parts match the reference');
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
