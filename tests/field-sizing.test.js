/* Plenix tests · field sizing in bars (issues 558 and 554, platform/standards/fit-and-overflow.md).
   Summary: in a Toolbar a Select, a Search and an Input without a width size to their content between --plx-sys-fit-field-min-width (100px) and --plx-sys-fit-field-max-width
     (320px): a short Select is widened to 100px, a Select with a very long choice stops at 320px and shows the full text in a tooltip on hover and on keyboard focus (#577). The width scale keeps its meaning
     outside a bar: a Select with width="sm" is 80px.
     Order (a sweep of one bar from 700px down to 200px): while any Button is still shown, the Search keeps its natural width and the bar has no data-plx-fit-shrink; the Search
     narrows only once every Button is in More, and never below 100px.
     The Asset Manager's System settings > Database > Records toolbar (#554; the same parts: Buttons with an icon, a group, an icon-only Button, a Delete menu button with an icon,
     a Search in a Stack) does not overflow, and the page does not scroll sideways, at 480px, 360px and 320px. At the icon-only step the Delete menu button drops its words (its
     name stays as aria-label); with every word shown it keeps them. At 320px the icon-only Button (Reset settings) is in More, and its menu lists it.
     Cut text shows in full in a tooltip, only while it is cut: a Combobox on keyboard focus (a short one gets none), an Input in a bar on focus, a Search in a bar on hover, a
     DatePicker and a TimePicker on focus. Every case runs left to right and right to left.
     An overlay opened from a bar (#669): a field in a Popover inside a Toolbar does not take the bar's content sizing, a field in the bar does.
   Usage: node tests/field-sizing.test.js   (run by layout.test.js when a field, the Toolbar, the ActionBar or the fold helpers changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const LONG = 'A choice with a very long name that is wider than any field should be, to the end of the line and past it';
const FOLDABLE = ['Add new', 'Reindex', 'Import', 'Export', 'Export text', 'Reset settings', 'Expand'];
(async () => {
  const PORT = +process.env.TEST_PORT || 9622, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    // the state of the bar inside `sel`: what it shows, the Search's width, the shrink switch and whether it overflows
    const read = (sel) => page.evaluate((sel, FOLDABLE) => {
      const box = document.querySelector(sel), t = box.querySelector('[role=toolbar]');
      const name = (b) => b.getAttribute('aria-label') || b.textContent.trim();
      const shown = [...t.querySelectorAll('button')].filter((b) => b.getClientRects().length && !b.closest('[inert]'));
      const del = shown.find((b) => name(b) === 'Delete'), s = t.querySelector('.plx-search');
      const r = t.getBoundingClientRect(), c = box.getBoundingClientRect();
      return { names: shown.map(name), buttons: shown.filter((b) => FOLDABLE.includes(name(b))).length,
        // Buttons written with words that show only their icon now (Reset settings is icon-only as written, so it does not count)
        dropped: shown.filter((b) => FOLDABLE.includes(name(b)) && name(b) !== 'Reset settings' && !b.textContent.trim()).length,
        more: shown.some((b) => name(b) === 'More actions'),
        del: del ? { words: del.textContent.trim(), label: del.getAttribute('aria-label') } : null,
        search: s ? Math.round(s.getBoundingClientRect().width) : 0, shrink: t.hasAttribute('data-plx-fit-shrink'),
        over: t.scrollWidth > t.clientWidth + 1 || r.left < c.left - 1 || r.right > c.right + 1,
        page: document.documentElement.scrollWidth > window.innerWidth + 1 };
    }, sel, FOLDABLE);
    for (const dir of ['ltr', 'rtl']) {
      // 1. sizes between the two tokens, and the width scale outside a bar
      await page.setViewport({ width: 900, height: 900 });
      const got = await page.evaluate(async (dir, LONG) => {
        document.documentElement.dir = dir;
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix;
        const bar = (id, w, kids) => h('div', { id, style: { inlineSize: w + 'px' } }, h(P.Toolbar, { label: id }, kids));
        const sel = (opts, extra) => h(P.Select, Object.assign({ key: 's', 'aria-label': 'Choice', defaultValue: opts[0].value, options: opts }, extra));
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          bar('short', 700, [sel([{ value: 'a', label: 'PNG' }, { value: 'b', label: 'JPG' }])]),
          bar('long', 700, [sel([{ value: 'a', label: LONG }])]),
          h('div', { id: 'scale' }, h(P.Select, { 'aria-label': 'Small', width: 'sm', options: [{ value: 'a', label: 'One' }] }))));
        await new Promise((r) => setTimeout(r, 900));
        const w = (s) => Math.round(document.querySelector(s).getBoundingClientRect().width);
        return { short: w('#short .plx-select'), long: w('#long .plx-select'), scale: w('#scale .plx-select') };
      }, dir, LONG);
      assert.ok(got.short >= 100, dir + ': a short Select is widened to the minimum (100px), got ' + got.short);
      assert.ok(got.long <= 320 && got.long >= 316, dir + ': a Select with a very long choice stops at the maximum (320px), got ' + got.long);
      assert.equal(got.scale, 80, dir + ': width="sm" is still exactly 80px outside a bar');

      // 2. the order: Buttons fold first, then fields shrink (one bar, narrowed step by step)
      await page.evaluate(async (dir) => {
        document.documentElement.dir = dir;
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix, noop = () => {};
        const btn = (t, icon) => h(P.Button, { key: t, icon, variant: 'ghost' }, t);
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'sweep', style: { inlineSize: '700px' } }, h(P.Toolbar, { label: 'Sweep' },
          [btn('Add new', 'add'), btn('Expand', 'expand'), h(P.SearchField, { key: 'q', label: 'Search', value: '', onChange: noop })])));
        await new Promise((r) => setTimeout(r, 900));
      }, dir);
      const natural = (await read('#sweep')).search;
      assert.ok(natural > 100, dir + ': with room the Search is wider than the minimum, got ' + natural);
      let narrowed = 0;
      for (let w = 700; w >= 200; w -= 20) {
        await page.evaluate((w) => { document.getElementById('sweep').style.inlineSize = w + 'px'; }, w);
        await wait(250);
        const s = await read('#sweep');
        if (s.buttons > 0) assert.ok(s.search >= natural - 1, dir + ' ' + w + 'px: a Button is still shown, so the Search keeps its natural width (' + natural + '), got ' + s.search);
        assert.equal(s.shrink, s.buttons === 0, dir + ' ' + w + 'px: the bar lets its fields shrink exactly when every Button is in More');
        if (s.search < natural - 1) { narrowed += 1; assert.equal(s.buttons, 0, dir + ' ' + w + 'px: the Search narrowed only after every Button folded'); }
        assert.ok(s.search >= 100, dir + ' ' + w + 'px: the Search never goes below 100px, got ' + s.search);
      }
      assert.ok(narrowed > 0, dir + ': at the narrow end of the sweep the Search does narrow (the second half of the order is exercised)');

      // 3. the Records toolbar (#554): no overflow at 480, 360 and 320px; the Delete menu button and the icon-only Button
      for (const w of [1400, 480, 360, 320]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(async (dir) => {
          document.documentElement.dir = dir;
          document.querySelector('main').innerHTML = '<div id="c"></div>';
          const h = React.createElement, P = window.Plenix, noop = () => {};
          const bt = (label, icon) => h(P.Button, { key: label, size: 'sm', icon, onClick: noop }, label);
          ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'records' }, h(P.Toolbar, { label: 'Record actions' },
            bt('Add new', 'add'),
            h(P.Toolbar.Group, { role: 'group', 'aria-label': 'Transfer' }, bt('Reindex', 'refresh'), bt('Import', 'import'), bt('Export', 'export')),
            bt('Export text', 'doc-text'),
            h(P.Button, { size: 'sm', iconOnly: true, icon: 'close', label: 'Reset settings', onClick: noop }),
            h(P.Menu, { label: 'Delete', trigger: h(P.Button, { size: 'sm', variant: 'danger-secondary', icon: 'trash', caret: true }, 'Delete') },
              h(P.MenuItem, { icon: 'trash', danger: true, onSelect: noop }, 'Delete 120 records'), h(P.MenuItem, { icon: 'trash', danger: true, onSelect: noop }, 'Delete table')),
            h(P.Button, { size: 'sm', icon: 'expand', onClick: noop }, 'Expand'),
            h(P.Stack, { width: 'lg', push: true }, h(P.SearchField, { value: '', onChange: noop, onClear: noop, label: 'Search', placeholder: 'Search...' })))));
          await new Promise((r) => setTimeout(r, 900));
        }, dir);
        const r = await read('#records');
        assert.ok(r.del, dir + ' ' + w + 'px: the Delete menu button stays in the bar');
        assert.equal(r.del.label === 'Delete' || r.del.words === 'Delete', true, dir + ' ' + w + 'px: the Delete menu button keeps its name');
        const iconStep = r.dropped > 0 || r.more;   // step 1 (words dropped) or past it (Buttons in More)
        if (iconStep) assert.equal(r.del.words, '', dir + ' ' + w + 'px: at the icon-only step the Delete menu button drops its words too');
        if (iconStep) assert.equal(r.del.label, 'Delete', dir + ' ' + w + 'px: its name stays as its aria-label');
        if (!iconStep) assert.equal(r.del.words, 'Delete', dir + ' ' + w + 'px: while every Button keeps its words, so does Delete');
        if (w === 1400) { assert.ok(!iconStep, dir + ': at 1400px every Button keeps its words'); continue; }
        assert.ok(!r.over, dir + ' ' + w + 'px: the Records toolbar does not overflow (' + r.names.join(', ') + ')');
        assert.ok(!r.page, dir + ' ' + w + 'px: the page does not scroll sideways');
        if (w === 320) {
          assert.ok(iconStep, dir + ': at 320px the bar has reached the icon-only step');
          assert.equal(r.del.words, '', dir + ': at 320px the Delete menu button is an icon');
          assert.ok(!r.names.includes('Reset settings'), dir + ': at 320px the icon-only Reset settings Button is not in the bar');
          assert.ok(r.more, dir + ': at 320px the bar has More');
          await page.click('#records [aria-label="More actions"]'); await wait(400);
          const items = await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].filter((e) => e.getClientRects().length).map((e) => e.textContent.trim()));
          assert.ok(items.includes('Reset settings'), dir + ': the icon-only Button is in More with its label as the menu text, got ' + items.join(', '));
          await page.keyboard.press('Escape'); await wait(200);
        }
      }

      // 4. the full text in a tooltip, only while it is cut
      await page.setViewport({ width: 900, height: 900 });
      await page.evaluate(async (dir, LONG) => {
        document.documentElement.dir = dir;
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix, noop = () => {};
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          h('div', { id: 'cb' }, h(P.Combobox, { label: 'Owner', width: 'sm', options: [{ value: 'a', label: LONG }], value: 'a', onChange: noop })),
          h('div', { id: 'cbshort' }, h(P.Combobox, { label: 'Format', width: 'lg', options: [{ value: 'a', label: 'PNG' }], value: 'a', onChange: noop })),
          h('div', { id: 'ib', style: { inlineSize: '200px' } }, h(P.Toolbar, { label: 'Input bar' }, h(P.Input, { 'aria-label': 'Name', value: LONG, onChange: noop }))),
          h('div', { id: 'sb', style: { inlineSize: '200px' } }, h(P.Toolbar, { label: 'Search bar' }, h(P.SearchField, { label: 'Search', value: LONG, onChange: noop }))),
          h('div', { id: 'dp' }, h(P.DatePicker, { mode: 'range', width: 'xs', value: { start: '2026-10-01', end: '2026-10-31' }, onChange: noop })),
          h('div', { id: 'tp' }, h(P.TimePicker, { label: 'Start', width: 'xs', value: '09:00', onChange: noop }))));
        await new Promise((r) => setTimeout(r, 900));
      }, dir, LONG);
      const tip = (sel) => page.evaluate((sel) => {
        const w = document.querySelector(sel).closest('.plx-tooltip'), b = w && w.querySelector('.plx-tooltip__bubble');
        return b ? { open: b.classList.contains('is-open') && !!b.getClientRects().length, text: b.textContent } : { open: false, text: '' };
      }, sel);
      assert.equal((await tip('#cb .plx-combobox__input')).open, false, dir + ': no tooltip before focus');
      await page.focus('#cb .plx-combobox__input'); await wait(400);
      const cb = await tip('#cb .plx-combobox__input');
      assert.ok(cb.open && /very long name/.test(cb.text), dir + ': a cut Combobox value shows its full text in a tooltip on keyboard focus');
      await page.focus('#cbshort .plx-combobox__input'); await wait(400);
      assert.equal((await tip('#cbshort .plx-combobox__input')).open, false, dir + ': a Combobox value that fits gets no tooltip');
      await page.focus('#ib .plx-input'); await wait(400);
      const ib = await tip('#ib .plx-input');
      assert.ok(ib.open && /very long name/.test(ib.text), dir + ': a cut Input in a bar shows its full value in a tooltip on focus');
      await page.evaluate(() => document.activeElement.blur()); await wait(200);
      await page.hover('#sb .plx-search__input'); await wait(400);
      const sb = await tip('#sb .plx-search__input');
      assert.ok(sb.open && /very long name/.test(sb.text), dir + ': a cut Search in a bar shows its full text in a tooltip on hover');
      await page.mouse.move(0, 0);
      await page.focus('#dp .plx-date-picker__input'); await wait(400);
      const dp = await tip('#dp .plx-date-picker__input');
      assert.ok(dp.open && /2026/.test(dp.text), dir + ': a cut DatePicker range shows in full in a tooltip on focus, got ' + dp.text);
      await page.focus('#tp .plx-time-picker__input'); await wait(400);
      const tp = await tip('#tp .plx-time-picker__input');
      assert.ok(tp.open && /9/.test(tp.text), dir + ': a cut TimePicker time shows in full in a tooltip on focus, got ' + tp.text);
    }
    // the cut text of a Select shows in full in a tooltip on hover
    await page.setViewport({ width: 900, height: 900 });
    await page.evaluate(async (LONG) => {
      document.documentElement.dir = 'ltr'; document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix;
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'cut', style: { inlineSize: '200px' } }, h(P.Select, { 'aria-label': 'Choice', width: 'fill', options: [{ value: 'a', label: LONG }] })));
      await new Promise((r) => setTimeout(r, 600));
    }, LONG);
    await page.hover('#cut .plx-select__field'); await new Promise((r) => setTimeout(r, 800));
    assert.ok(await page.evaluate(() => [...document.querySelectorAll('[role="tooltip"]')].some((e) => /very long name/.test(e.textContent))), 'a cut Select shows its full text in a tooltip');
    // #577: the cut text of a Select shows in full on keyboard focus too (the field that takes focus is inside the tooltip's
    // wrapper), only while it is cut, left to right and right to left
    for (const dir of ['ltr', 'rtl']) {
      await page.mouse.move(0, 0);
      await page.evaluate(async (LONG, dir) => {
        document.documentElement.dir = dir; document.querySelector('main').innerHTML = '<div id="c"></div>';
        const h = React.createElement, P = window.Plenix;
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          h('div', { id: 'cutk', style: { inlineSize: '200px' } }, h(P.Select, { 'aria-label': 'Choice', width: 'fill', options: [{ value: 'a', label: LONG }] })),
          h('div', { id: 'shortk', style: { inlineSize: '200px' } }, h(P.Select, { 'aria-label': 'Short', width: 'fill', options: [{ value: 'a', label: 'One' }] }))));
        await new Promise((r) => setTimeout(r, 600));
      }, LONG, dir);
      const bubble = (sel) => page.evaluate((sel) => { const f = document.querySelector(sel), w = f && f.closest('.plx-tooltip'), b = w && w.querySelector('.plx-tooltip__bubble'); return { wrapped: !!w, open: !!(b && b.classList.contains('is-open')), text: b ? b.textContent : '' }; }, sel);
      await page.keyboard.press('Tab'); await page.focus('#cutk [role="combobox"]'); await new Promise((r) => setTimeout(r, 500));
      const cut = await bubble('#cutk [role="combobox"]');
      assert.ok(cut.wrapped && cut.open && /very long name/.test(cut.text), dir + ': a cut Select shows its full text on keyboard focus, got ' + JSON.stringify(cut));
      await page.focus('#shortk [role="combobox"]'); await new Promise((r) => setTimeout(r, 500));
      const short = await bubble('#shortk [role="combobox"]');
      assert.ok(short.wrapped && !short.open, dir + ': a Select whose text fits shows no tooltip on focus, got ' + JSON.stringify(short));
    }
    await page.evaluate(() => { document.documentElement.dir = 'ltr'; });
    // #669: an overlay opened from a bar is its own layout (layout.json › fields › overlay): a field in a Popover inside a Toolbar does not take the bar's
    // content sizing (and is not wrapped in the bar's cut-text Tooltip), while a field in the bar itself does
    const overlay = await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix, noop = () => {};
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'ov', style: { inlineSize: '700px' } }, h(P.Toolbar, { label: 'Overlay bar' },
        h(P.Input, { key: 'i', 'aria-label': 'In the bar', value: 'Bar', onChange: noop }),
        h(P.Popover, { key: 'p', trigger: h(P.Button, null, 'Open'), open: true, title: 'Panel' }, h(P.Input, { 'aria-label': 'In the popover', value: 'Panel', onChange: noop })))));
      await new Promise((r) => setTimeout(r, 700));
      const hook = (sel) => { const e = document.querySelector(sel); return e ? getComputedStyle(e).getPropertyValue('--plx-comp-field-context-content-max-inline-size').trim() : null; };
      const pop = document.querySelector('[aria-label="In the popover"]');
      return { bar: hook('[aria-label="In the bar"]'), popover: hook('[aria-label="In the popover"]'), popoverWrapped: !!(pop && pop.closest('.plx-input__tip')) };
    });
    assert.ok(overlay.bar, 'a field in the bar takes the bar\'s content sizing, got ' + JSON.stringify(overlay));
    assert.deepEqual([overlay.popover, overlay.popoverWrapped], ['', false], 'a field in a Popover inside the bar does not (the overlay clears it, #669), got ' + JSON.stringify(overlay));
    assert.deepEqual(errors, [], 'no script errors');
    console.log('field-sizing: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
