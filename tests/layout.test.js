// Plenix tests · the layout standard (page kinds → the five layout modes; providers/pageLayouts.js): a real AppShell with a navigation, an inspector, paragraphs, a
// form and a wide block, drawn in each mode at 1440px, and measured:
//   fluid: the content uses the main region's full width
//   contained: one centered column at most 960px
//   hybrid: paragraphs at most 760px, forms at most 960px, other blocks full width
//   multi-pane: the main region does not scroll as a whole; each pane scrolls on its own
//   focus: the navigation and the inspector are hidden; the header and the footer stay
//   node tests/layout.test.js
//   TEST_SCOPE=full: always; by default (tests/changed.js) only when the AppShell, the SettingsLayout, a global file or this test changed
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const fs = require('fs');
const path = require('path');
const { ROOT, launch, sleep } = require('./lib.js');
const changed = require('./changed.js');
// sizes past the generated grid lines land on the caps, never on the default size (#375 review): its own test, when
// Resizable, SplitView or a pane of the shell changed
if (changed.wants({ units: ['components/Resizable', 'patterns/SplitView', 'patterns/AppShell', 'patterns/NavPane', 'patterns/SecondaryPane', 'patterns/SidePanel'] })) {
  const result = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'resize-caps.test.js')], { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
}
if (!changed.wants({ units: ['patterns/AppShell', 'patterns/SettingsLayout', 'patterns/SplitView', 'components/VisuallyHidden', 'providers/DirectionProvider', 'components/Checkbox'] })) changed.none('LAYOUT_OK 0/0');
changed.report('every mode');
const P = 'file://' + (ROOT.startsWith('/') ? '' : '/') + ROOT.replace(/\\/g, '/') + '/platform/';
// each mode through a kind of page that the standard gives it
const MODES = { fluid: 'workspace', contained: 'settings', hybrid: 'detail', 'multi-pane': 'master-detail', focus: 'editor' };
const html = '<!doctype html><html lang="en" data-plx-theme="default" data-plx-mode="light"><head><meta charset="utf-8">'
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
  // SplitView stacks under 900px of its own border-box width and sits side by side from 900px (#410; its container query
  // measures inside its 16px room, so the query is 868px): one split view drawn at 899px and at 900px
  const split = await page.evaluate(async () => {
    const R = window.React, D = window.ReactDOM, PX = window.Plenix, h = R.createElement, out = {};
    const host = document.createElement('div'); document.body.appendChild(host);
    for (const w of [899, 900]) {
      host.style.cssText = 'display:flex;inline-size:' + w + 'px;block-size:400px';
      const root = D.createRoot(host);
      root.render(h(PX.SplitView, { label: 'Split', firstLabel: 'List', first: h('div', null, 'List'), second: h(PX.ReadingPane, { label: 'Item' }, 'Item') }));
      await new Promise((r) => setTimeout(r, 300));
      const sv = host.querySelector('.plx-split-view'), panels = sv && sv.querySelector('.plx-split-view__panels');
      out[w] = sv ? { width: Math.round(sv.getBoundingClientRect().width), direction: getComputedStyle(panels).flexDirection } : null;
      root.unmount();
    }
    host.remove();
    return out;
  });
  const res = [], check = (n, ok, d) => { if (shared.check(n, ok, d)) res.push([n, ok, d]); };
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
  // #262: an application root follows the page's direction: it reads <html dir> as it is and as it changes, writes nothing
  const follow = await page.evaluate(async () => {
    const h = React.createElement, P = window.Plenix, html = document.documentElement, wait = (n) => new Promise((r) => setTimeout(r, n));
    const before = [html.getAttribute('dir'), html.getAttribute('lang')];
    const host = document.createElement('div'); document.body.appendChild(host);
    function Show() { const d = P.useDirection(); return h('span', { 'data-dir': d.dir }, d.dir); }
    const root = ReactDOM.createRoot(host); ReactDOM.flushSync(() => root.render(h(P.DirectionProvider, { follow: true }, h(Show))));
    const first = host.querySelector('[data-dir]').getAttribute('data-dir'), wrapped = !!host.querySelector('.plx-direction'), untouched = html.getAttribute('dir') === before[0] && html.getAttribute('lang') === before[1];
    html.setAttribute('dir', 'rtl'); await wait(100); const turned = host.querySelector('[data-dir]').getAttribute('data-dir');
    if (before[0] == null) html.removeAttribute('dir'); else html.setAttribute('dir', before[0]); await wait(100);
    const back = host.querySelector('[data-dir]').getAttribute('data-dir'); root.unmount(); host.remove();
    return { first, wrapped, untouched, turned, back };
  });
  check('DirectionProvider: follow gives the page\'s own direction, follows it, and writes nothing #262', follow.first === 'ltr' && !follow.wrapped && follow.untouched && follow.turned === 'rtl' && follow.back === 'ltr', JSON.stringify(follow));
  // #420 (owner, ctm-needs-34): dir and lang on a Checkbox, Radio or Switch go on its row, so the box and its text change sides
  const rowDir = await page.evaluate(async () => {
    const h = React.createElement, P = window.Plenix, host = document.createElement('div'); host.style.cssText = 'inline-size:600px'; document.body.appendChild(host);
    const root = ReactDOM.createRoot(host);
    ReactDOM.flushSync(() => root.render(h('div', null, h(P.Checkbox, { dir: 'rtl', lang: 'ar', label: 'مربع', 'data-k': 'c' }), h(P.Radio, { dir: 'rtl', lang: 'ar', label: 'خيار', name: 'r', 'data-k': 'r' }), h(P.Switch, { dir: 'rtl', lang: 'ar', label: 'مفتاح', 'data-k': 's' }))));
    await new Promise((r) => setTimeout(r, 200));
    const out = {};
    for (const k of ['c', 'r', 's']) {
      const input = host.querySelector('[data-k="' + k + '"]'), row = input.closest('label'), box = (k === 's' ? row.querySelector('.plx-switch__track') : input).getBoundingClientRect(), text = row.querySelector('.plx-check__label, .plx-switch__label').getBoundingClientRect();
      out[k] = { inputDir: input.getAttribute('dir'), rowDir: row.getAttribute('dir'), rowLang: row.getAttribute('lang'), rtl: row.matches(':dir(rtl)'), boxRight: box.left > text.left };
    }
    root.unmount(); host.remove(); return out;
  });
  check('Checkbox: dir and lang go on the row of a Checkbox, Radio and Switch, so the box sits on the reading start #420',
    ['c', 'r', 's'].every((k) => rowDir[k].inputDir === null && rowDir[k].rowDir === 'rtl' && rowDir[k].rowLang === 'ar' && rowDir[k].rtl && rowDir[k].boxRight), JSON.stringify(rowDir));
  check('SplitView: stacks under 900px of its own width, side by side from 900px #410', !!split[899] && !!split[900] && split[899].width === 899 && split[899].direction === 'column' && split[900].width === 900 && split[900].direction === 'row', JSON.stringify(split));
  // issue 237: stacked by its room, the divider is the stacked one (horizontal, the height), the same focused separator
  const turned = await page.evaluate(async () => {
    const R = window.React, D = window.ReactDOM, PX = window.Plenix, h = R.createElement, wait = (n) => new Promise((r) => setTimeout(r, n));
    const host = document.createElement('div'); host.style.cssText = 'display:flex;flex-direction:column;inline-size:1000px;block-size:640px'; document.body.appendChild(host);
    const root = D.createRoot(host); root.render(h(PX.SplitView, { label: 'Split', firstLabel: 'List', first: h('div', null, 'List'), second: h('div', null, 'Item') })); await wait(300);
    const sep = host.querySelector('[role="separator"]'); sep.focus(); const wide = sep.getAttribute('aria-orientation');
    host.style.inlineSize = '700px'; await wait(400);
    const now = host.querySelector('[role="separator"]'), first = host.querySelector('.plx-split-view__first').getBoundingClientRect().height;
    const out = { wide, narrow: now.getAttribute('aria-orientation'), same: now === sep, focused: document.activeElement === now, first: Math.round(first) };
    root.unmount(); host.remove(); return out;
  });
  check('SplitView: stacked by its room, the divider turns horizontal and drags the first panel\'s height, keeping its focus #237', turned.wide === 'vertical' && turned.narrow === 'horizontal' && turned.same && turned.focused && turned.first >= 200 && turned.first <= 500, JSON.stringify(turned));
  const firstFrame = await page.evaluate(() => {
    const h = React.createElement, P = window.Plenix, host = document.createElement('div'); host.style.cssText = 'display:flex;flex-direction:column;inline-size:700px;block-size:500px'; document.body.appendChild(host);
    const root = ReactDOM.createRoot(host); ReactDOM.flushSync(() => root.render(h(P.SplitView, { label: 'Split', first: h('div', null, 'List'), second: h('div', null, 'Item') })));
    const o = host.querySelector('[role="separator"]').getAttribute('aria-orientation'); root.unmount(); host.remove(); return o;
  });
  check('SplitView: a narrow split view has the stacked divider from its first frame #237', firstFrame === 'horizontal', firstFrame);
  // #288: screen-reader texts at the end of the page (the announcer, a VisuallyHidden text) take no room, so a page that
  // fits the window does not scroll
  const quiet = await page.evaluate(async () => {
    const P = window.Plenix, h = React.createElement, root = document.getElementById('root');
    root.innerHTML = ''; ReactDOM.flushSync(() => ReactDOM.createRoot(root).render(h(P.AppShell, { page: 'workspace', header: h('div', null, 'Header') }, h('p', null, 'Content'))));
    P.announce('Selection cleared.'); const extra = document.createElement('div'); extra.className = 'plx-visually-hidden';
    extra.textContent = 'Press Space or Enter to pick it up. The arrow keys move it, Space or Enter drops it, Escape puts it back.'; document.body.appendChild(extra);
    await new Promise((r) => setTimeout(r, 600));
    const se = document.scrollingElement, box = extra.getBoundingClientRect(), out = { scroll: se.scrollHeight - se.clientHeight, box: [box.width, box.height] };
    extra.remove(); return out;
  });
  check('VisuallyHidden: screen-reader texts at the page end take no room, so the page does not scroll #288', quiet.scroll <= 0 && quiet.box[0] <= 1 && quiet.box[1] <= 1, JSON.stringify(quiet));
  check('standard: a SettingsLayout page is contained without saying so', claimed.mode === 'contained', claimed.mode);
  check('standard: its settings column is at most 960px and centered', claimed.inner <= 960 && Math.abs(claimed.center - claimed.mainCenter) <= 1, JSON.stringify(claimed));
  check('settings: every section is a card (owner, 2026-10-13: the cards view)', claimed.card, JSON.stringify(claimed));
  const bad = res.filter((x) => !x[1]);
  res.forEach(([n, ok, d]) => console.log((ok ? '  ok   ' : '  FAIL ') + n + (ok ? '' : ' · ' + d)));
  console.log((bad.length ? 'LAYOUT_FAIL ' : 'LAYOUT_OK ') + (res.length - bad.length) + '/' + res.length);
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
