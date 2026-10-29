// the named check's page logic (#280), run as a proof script on this branch's build (not the test file)
const puppeteer = require(process.env.HOME + '/work/plenix-b1/node_modules/puppeteer-core');
(async () => { const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const p = await b.newPage();
  await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/dom-production.html', { waitUntil: 'networkidle2' });
  console.log(JSON.stringify(await p.evaluate(async () => {
    const h = React.createElement, P = window.Plenix, host = document.createElement('div'); document.body.appendChild(host);
    const root = ReactDOM.createRoot(host), html = (el) => { ReactDOM.flushSync(() => root.render(el)); return host.innerHTML; };
    html(h(P.Icon, { name: 'folder' }));
    const box = host.querySelector('svg').getAttribute('viewBox'), d = (n) => host.querySelector('.plx-icon__glyph--' + n).getAttribute('d');
    const draw = (n) => ({ outline: { viewBox: box, d: d(n) }, fill: { viewBox: box, d: d(n) } });
    const mod = { name: 'folder', set: 'plenix', symbol: 'folder', fillOutline: false, mirrored: false, drawings: { 20: draw(20), 24: draw(24) } };
    const make = { button: (i) => h(P.Button, { icon: i }, 'Add'), item: (i) => h('div', { role: 'menu' }, h(P.MenuItem, { icon: i }, 'Item')),
      tree: (i) => h(P.Tree, { nodes: [{ id: 'a', label: 'A', icon: i }] }), card: (i) => h(P.Card, { title: 'T', icon: i }, 'x'),
      nav: (i) => h(P.NavList, { items: [{ id: 'f', label: 'F', icon: i }], current: 'f' }), named: (i) => h(P.Icon, { name: i }) };
    const out = {}; for (const [k, f] of Object.entries(make)) { const a = html(f('folder')), c = html(f(mod)); out[k] = /plx-icon--folder/.test(a) && a === c; }
    root.unmount(); host.remove(); return out;
  }))); await b.close(); })();
