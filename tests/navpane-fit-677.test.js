/* Plenix tests · controls in a pane's header fit the pane (issue 677: "Why are components going outside?").
   Summary: AITEAM's left pane, as it mounts it: AppShell's sideNav is a 240px NavPane with no title, a Select (size sm, a long option among its
     choices) in actions and a Button (an arrow and words) in header. Left to right and right to left:
     the Select's edges stay inside the pane, beside the Collapse button; it is never narrower than the fit-field minimum (100px)
     the Collapse button keeps its size (an icon button never shrinks)
     the second row's Button stays inside; with a long label its words end in an ellipsis
     a SidePanel header with a Select and a Button with words in its actions stays inside the panel too
   Proof first: before 677 the actions holder never shrank (flex-shrink: 0) and Buttons never shrank: the Select drew at its longest option (286px in
     a 240px pane) and stuck out past the pane's edge, so these lines fail.
   Usage: node tests/navpane-fit-677.test.js   → NAVPANE_FIT_677_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
(async () => {
  const PORT = +process.env.TEST_PORT || 9677, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1100, height: 700 });
    for (const dir of ['ltr', 'rtl']) {
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      const r = await page.evaluate(async (dir) => {
        document.documentElement.setAttribute('dir', dir);
        const h = React.createElement, P = window.Plenix, noop = () => {};
        const opts = [{ value: '', label: 'All projects' }, { value: 'aiteam', label: 'AITEAM' }, { value: 'ctm', label: 'CTM 2.0 customer onboarding and records' }];
        const nav = h(P.NavPane, { label: 'Navigation', as: 'div', width: 240,
          actions: h(P.Select, { 'aria-label': 'Project', size: 'sm', value: 'aiteam', options: opts, onChange: noop }),
          header: h(P.Button, { href: '#projects', icon: 'arrow_back' }, 'All projects in this workspace and the archive') },
          h(P.NavList, { label: 'Nav', groups: [{ heading: 'Project', items: [{ id: 'o', label: 'Overview', icon: 'home' }] }], value: 'o', onSelect: noop }));
        const panel = h(P.SidePanel, { title: 'Details', open: true, actions: h(React.Fragment, null, h(P.Select, { 'aria-label': 'Scope', size: 'sm', value: 'ctm', options: opts, onChange: noop }), h(P.Button, { size: 'sm' }, 'Open in a new window')) }, 'Body');
        document.getElementById('main').innerHTML = '<div id="c" style="block-size:600px;display:flex"></div>';
        ReactDOM.createRoot(document.getElementById('c')).render(h(P.AppShell, { page: 'master-detail', sideNav: nav, panel }, h(P.PageContent, null, h(P.Text, null, 'Content'))));
        await new Promise((r) => setTimeout(r, 900));
        const inside = (el, box) => { const x = el.getBoundingClientRect(), b = box.getBoundingClientRect(); return x.left >= b.left - 0.5 && x.right <= b.right + 0.5; };
        const pane = document.querySelector('.plx-nav-pane'), sel = pane.querySelector('.plx-nav-pane__actions .plx-select'), col = pane.querySelector('.plx-nav-pane__collapse button, .plx-nav-pane__collapse .plx-button');
        const btn = pane.querySelector('.plx-nav-pane__subheader .plx-button'), label = btn.querySelector('.plx-button__label');
        const side = document.querySelector('.plx-side-panel'), sideParts = [...side.querySelectorAll('.plx-side-panel__header .plx-select, .plx-side-panel__header .plx-button')];
        return { pane: Math.round(pane.getBoundingClientRect().width), selectInside: inside(sel, pane), selectWidth: Math.round(sel.getBoundingClientRect().width),
          collapse: col ? Math.round(col.getBoundingClientRect().width) : 0, collapseHeight: col ? Math.round(col.getBoundingClientRect().height) : 0, collapseInside: !!col && inside(col, pane),
          buttonInside: inside(btn, pane), ellipsis: label.scrollWidth > label.clientWidth, sideInside: sideParts.length > 0 && sideParts.every((e) => inside(e, side)) };
      }, dir);
      assert.equal(r.pane, 240, dir + ': the pane is 240px, as AITEAM\'s');
      assert.ok(r.selectInside, dir + ': the Select stays inside the pane (it drew 286px in a 240px pane before 677), got ' + JSON.stringify(r));
      assert.ok(r.selectWidth >= 100, dir + ': the Select never shrinks below the fit-field minimum (100px), got ' + r.selectWidth);
      assert.ok(r.collapseInside && r.collapse === r.collapseHeight, dir + ': the Collapse button keeps its square size, inside the pane, got ' + JSON.stringify(r));
      assert.ok(r.buttonInside && r.ellipsis, dir + ': the second row\'s Button stays inside and its long words end in an ellipsis, got ' + JSON.stringify(r));
      assert.ok(r.sideInside, dir + ': a SidePanel header\'s Select and worded Button stay inside the panel');
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('NAVPANE_FIT_677_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
