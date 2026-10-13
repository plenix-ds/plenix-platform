// Plenix tests · the layout standard (page kinds → the five layout modes; providers/pageLayouts.js): a real AppShell with a navigation, an inspector, paragraphs, a
// form and a wide block, drawn in each mode at 1440px, and measured:
//   fluid: the content uses the main region's full width
//   contained: one centered column at most 960px
//   hybrid: paragraphs at most 760px, forms at most 960px, other blocks full width
//   multi-pane: the main region does not scroll as a whole; each pane scrolls on its own
//   focus: the navigation and the inspector are hidden; the header and the footer stay
//   node tests/layout.test.js
const fs = require('fs');
const path = require('path');
const { ROOT, launch, sleep } = require('./lib.js');
const P = 'file://' + (ROOT.startsWith('/') ? '' : '/') + ROOT.replace(/\\/g, '/') + '/platform/';
// each mode through a kind of page that the standard gives it
const MODES = { fluid: 'workspace', contained: 'settings', hybrid: 'detail', 'multi-pane': 'master-detail', focus: 'editor' };
const html = '<!doctype html><html lang="en" data-plx-theme="plenix" data-plx-mode="light"><head><meta charset="utf-8">'
  + '<link rel="stylesheet" href="' + P + 'platform.css"><script src="' + P + 'vendor/react.production.min.js"></script>'
  + '<script src="' + P + 'vendor/react-dom.production.min.js"></script><script src="' + P + 'dist/platform.js"></script></head><body><div id="root"></div></body></html>';

(async () => {
  const file = path.join(__dirname, '.layout-test.html'); fs.writeFileSync(file, html);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file://' + (file.startsWith('/') ? '' : '/') + file.replace(/\\/g, '/'));
  const out = {};
  for (const mode of Object.keys(MODES)) {
    out[mode] = await page.evaluate(async (mode, kind) => {
      const P = window.Plenix, h = React.createElement, root = document.getElementById('root');
      root.innerHTML = ''; const r = ReactDOM.createRoot(root);
      r.render(h(P.AppShell, { page: kind, header: h('div', { id: 't-head' }, 'Header'), footer: h('div', { id: 't-foot' }, 'Footer'),
        sideNav: h('nav', { id: 't-nav' }, 'Navigation'), panel: h('aside', { id: 't-panel' }, 'Inspector') },
        h(P.PageContent, null, h('p', { id: 't-p' }, 'A paragraph. '.repeat(80)), h('form', { id: 't-form' }, h('input', { 'aria-label': 'Name' })),
          h('div', { id: 't-wide' }, 'A wide block'))));
      await new Promise((ok) => setTimeout(ok, 300));
      const box = (id) => { const e = document.getElementById(id); if (!e || !e.offsetParent) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.left), w: Math.round(b.width) }; };
      const main = document.querySelector('.plx-app-shell__main'), pc = document.querySelector('.plx-page-content');
      return { main: box('main') || { x: Math.round(main.getBoundingClientRect().left), w: Math.round(main.getBoundingClientRect().width) }, p: box('t-p'), form: box('t-form'), wide: box('t-wide'),
        nav: box('t-nav'), panel: box('t-panel'), head: !!box('t-head'), foot: !!box('t-foot'),
        mainOverflow: getComputedStyle(main).overflowY, pcOverflow: getComputedStyle(pc).overflowY, mode: document.querySelector('.plx-app-shell').getAttribute('data-plx-layout') };
    }, mode, MODES[mode]);
  }
  // a SettingsLayout page claims "settings" on a workspace shell: the standard makes it contained
  const claimed = await page.evaluate(async () => {
    const P = window.Plenix, h = React.createElement, root = document.getElementById('root');
    root.innerHTML = ''; ReactDOM.createRoot(root).render(h(P.AppShell, { page: 'workspace' }, h(P.SettingsLayout, null, h(P.SettingsSection, { title: 'Regional' }, h(P.SettingsRow, { label: 'Date format' }, 'MM/DD/YY')))));
    await new Promise((ok) => setTimeout(ok, 300));
    const c = document.querySelector('.plx-settings__content'), m = document.querySelector('.plx-app-shell__main'), r = c.getBoundingClientRect(), q = m.getBoundingClientRect();
    const st = getComputedStyle(c), inner = r.width - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight);
    const sec = getComputedStyle(document.querySelector('.plx-settings__section'));
    return { mode: document.querySelector('.plx-app-shell').getAttribute('data-plx-layout'), inner: Math.round(inner), center: Math.round(r.left + parseFloat(st.paddingLeft) + inner / 2), mainCenter: Math.round(q.left + q.width / 2),
      card: sec.borderTopStyle === 'solid' && parseFloat(sec.borderTopWidth) > 0 && parseFloat(sec.borderTopLeftRadius) > 0 };
  });
  {
  }
  await browser.close(); fs.unlinkSync(file);
  const res = [], check = (n, ok, d) => res.push([n, ok, d]);
  const f = out.fluid, c = out.contained, y = out.hybrid, m = out['multi-pane'], fo = out.focus;
  check('fluid: the wide block fills the content width', f.wide && f.wide.w > 960, JSON.stringify(f.wide));
  check('contained: the content is at most 960px wide', c.wide && c.wide.w <= 960 && c.p.w <= 960, JSON.stringify([c.p, c.wide]));
  const mainCenter = c.main.x + c.main.w / 2, colCenter = c.wide.x + c.wide.w / 2;
  check('contained: the column is centered in the main region', Math.abs(mainCenter - colCenter) <= 1, mainCenter + ' vs ' + colCenter);
  check('hybrid: the paragraph is at most 760px', y.p && y.p.w <= 760, JSON.stringify(y.p));
  check('hybrid: the form is at most 960px', y.form && y.form.w <= 960, JSON.stringify(y.form));
  check('hybrid: other blocks keep the full width', y.wide && y.wide.w > 960, JSON.stringify(y.wide));
  check('multi-pane: the main region does not scroll as a whole', m.mainOverflow === 'hidden', m.mainOverflow);
  check('multi-pane: its panes scroll on their own', m.pcOverflow === 'auto', m.pcOverflow);
  check('focus: the navigation and the inspector are hidden', fo.nav === null && fo.panel === null, JSON.stringify([fo.nav, fo.panel]));
  check('focus: the header and the footer stay', fo.head && fo.foot, '');
  check('focus: the main region gets the freed width', fo.main.w > f.main.w, fo.main.w + ' vs ' + f.main.w);
  check('fluid: the navigation and the inspector are shown', !!f.nav && !!f.panel, '');
  check('standard: each page kind gets its mode', Object.keys(MODES).every((m) => out[m].mode === m), JSON.stringify(Object.keys(MODES).map((m) => out[m].mode)));
  check('standard: a SettingsLayout page is contained without saying so', claimed.mode === 'contained', claimed.mode);
  check('standard: its settings column is at most 960px and centered', claimed.inner <= 960 && Math.abs(claimed.center - claimed.mainCenter) <= 1, JSON.stringify(claimed));
  check('settings: every section is a card (owner, 2026-10-13: the cards view)', claimed.card, JSON.stringify(claimed));
  const bad = res.filter((x) => !x[1]);
  res.forEach(([n, ok, d]) => console.log((ok ? '  ok   ' : '  FAIL ') + n + (ok ? '' : ' · ' + d)));
  console.log((bad.length ? 'LAYOUT_FAIL ' : 'LAYOUT_OK ') + (res.length - bad.length) + '/' + res.length);
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
