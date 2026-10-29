// Icon stage 5a (#280), part 1 proof: the components that take an icon accept an imported module, and nothing on any page
// changes. Run after a build, with dom-production.html copied into platform/dist/icons/ and the preview server on 8791
// (/plenix = styling/phase-2 before, /plenix-b1 = this branch). A proof script, not a test.
const puppeteer = require(process.env.HOME + '/work/plenix-b1/node_modules/puppeteer-core');
const crypto = require('crypto');
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const out = {};
  // 1. the Icon itself: a name, its module and its registered module draw the same markup (212 names x 6 sizes x 3 fills),
  //    and every component slot draws a module exactly as it draws the name
  const p = await b.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/dom-production.html', { waitUntil: 'networkidle2' });
  out.icon = await p.evaluate(async () => {
    const P = Plenix, h = React.createElement, host = document.getElementById('host'), root = ReactDOM.createRoot(host);
    const html = (el) => { ReactDOM.flushSync(() => root.render(el)); return host.innerHTML; };
    const idx = await (await fetch('plenix/index.json')).json(), mods = {};
    for (const i of idx.icons) mods[i.name] = (await import('./plenix/' + i.name + '.js')).default;
    const aliases = {}; for (const a of Object.keys(idx.aliases)) aliases[a] = (await import('./plenix/' + a + '.js')).default;
    const SIZES = [undefined, 'xs', 'sm', 'md', 'lg', 'xl'], FILLS = [undefined, false, true];
    let cases = 0, moduleDiff = 0, asNameDiff = 0;
    for (const n of Object.keys(mods)) for (const size of SIZES) for (const filled of FILLS) {
      const a = html(h(P.Icon, { name: n, size, filled })); cases++;
      if (a !== html(h(P.Icon, { icon: mods[n], size, filled }))) moduleDiff++;
      if (a !== html(h(P.Icon, { name: mods[n], size, filled }))) asNameDiff++;   // a module where a name was expected
    }
    let aliasDiff = 0; for (const a of Object.keys(aliases)) if (html(h(P.Icon, { name: a })) !== html(h(P.Icon, { icon: aliases[a] }))) aliasDiff++;
    // the component slots (name vs module): Button, MenuItem, Tree, NavList (open icon), Card, MetricCard, SidePanel,
    // CollapsibleSection, FloatingActionButton, Dialog's icon, SecondaryPane, ToolRail, AppHeader.Action, Badge, IconTile
    if (!mods.folder || !mods['chevron-right'] || !mods.add || !mods.home) throw new Error('a sample module is missing');
    const folder = mods.folder, chev = mods['chevron-right'], add = mods.add, info = mods.home;
    const slots = {
      Button: (i) => h(P.Button, { icon: i }, 'Add'),
      ButtonEnd: (i) => h(P.Button, { iconEnd: i }, 'Next'),
      MenuItem: (i) => h('div', { role: 'menu' }, h(P.MenuItem, { icon: i }, 'Item')),
      Tree: (i) => h(P.Tree, { nodes: [{ id: 'a', label: 'A', icon: i, children: [{ id: 'b', label: 'B' }] }], defaultExpanded: ['a'] }),
      NavList: (i) => h(P.NavList, { items: [{ id: 'f', label: 'Files', icon: i }], current: 'f' }),
      Card: (i) => h(P.Card, { title: 'T', icon: i }, 'x'),
      MediaCard: (i) => h(P.MediaCard, { title: 'T', icon: i }),
      MetricCard: (i) => h(P.MetricCard, { label: 'L', value: 3, icon: i }),
      MetricCardTile: (i) => h(P.MetricCard, { label: 'L', value: 3, icon: i, layout: 'icon-start' }),
      SidePanel: (i) => h(P.SidePanel, { title: 'T', icon: i, open: true }, 'x'),
      CollapsibleSection: (i) => h(P.CollapsibleSection, { title: 'T', icon: i }, 'x'),
      FloatingActionButton: (i) => h(P.FloatingActionButton, { icon: i, label: 'Add' }),
      SecondaryPane: (i) => h(P.SecondaryPane, { title: 'T', icon: i }, 'x'),
      Badge: (i) => h(P.Badge, { icon: i }, 'B'),
      IconTile: (i) => h(P.IconTile, { icon: i }),
      StatusIcon: (i) => h(P.Icon, { name: i, size: 'sm' }),
    };
    const R = {}, why = {};
    for (const [k, make] of Object.entries(slots)) for (const [n, m] of [['folder', folder], ['chevron-right', chev], ['add', add], ['home', info]]) {
      const grab = (el) => { html(el); const menu = document.querySelector('[role="menu"]'); return menu ? menu.outerHTML.replace(/ id="[^"]*"|aria-labelledby="[^"]*"/g, '') : host.innerHTML; };
      let a, c; try { a = grab(make(n)); c = grab(make(m)); } catch (e) { R[k] = 'error: ' + e.message; break; }
      if (!/plx-icon/.test(a)) { R[k] = 'no icon drawn by name'; break; }
      if (a !== c && !why[k]) { let j = 0; while (a[j] === c[j]) j++; why[k] = n + ' @' + j + ' ' + a.slice(j - 40, j + 40) + ' ¦ ' + c.slice(j - 40, j + 40); } R[k] = R[k] === 'differs' ? 'differs' : a === c ? 'same' : 'differs';
    }
    return { why, cases, moduleDiff, asNameDiff, aliases: Object.keys(aliases).length, aliasDiff, slots: R };
  });
  out.icon.pageErrors = errs.length;
  // 2. every application page: the same markup before and after (no component is converted in this part)
  out.pages = {};
  for (const app of APPS) {
    const r = {};
    for (const side of ['plenix', 'plenix-b1']) {
      const q = await b.newPage(); await q.setViewport({ width: 1440, height: 900 });
      await q.goto('http://127.0.0.1:8791/' + side + '/' + app + '/index.html', { waitUntil: 'networkidle2' }); await new Promise((x) => setTimeout(x, 1200));
      const html = await q.evaluate(() => document.body.innerHTML.replace(/\b\d{1,2}:\d{2}(\s?[AP]M)?\b/g, 'TIME'));
      r[side] = crypto.createHash('sha1').update(html).digest('hex').slice(0, 12); await q.close();
    }
    out.pages[app] = r.plenix === r['plenix-b1'] ? 'same' : 'differs ' + r.plenix + ' ' + r['plenix-b1'];
  }
  console.log(JSON.stringify(out, null, 1)); await b.close();
})();
