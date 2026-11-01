/* Plenix tests · keyboard behavior of the interactive parts that had no keyboard test, by the WAI-ARIA Authoring Practices key patterns (issue 691, audit finding #684).
   Summary: tests/keyboard.test.js covers Toolbar, Rating, Tabs, SegmentedControl, Tree, the collapsible settings section, SearchField's recent searches, the command bar, the filter panel rows and the selection bar.
     Others have their own: data-grid-cell-187 (DataGrid cell navigation), focus-order (Dialog focus), chat-composer-s3 and chat-s4-637 (the Chat composer and the message actions), focus-group-6a (ToolRail, SecondaryPane).
     This file adds real key presses for the rest, each part drawn on the Platform's own fixture page (tests/fixtures/platform-host.html), in a left-to-right page and, where the arrows flip, in a right-to-left one:
       Menu (open on the first or last item, arrows wrap, Home and End, Escape returns focus to the trigger, Enter chooses, Tab closes), MenuSub (opens toward the reading end), MenuRadioGroup,
       SplitButton's menu, Combobox (typing opens, Down and Up move, Enter chooses, Escape closes without choosing, Tab leaves), Dialog (focus in, Tab stays inside both ways, Escape closes, focus returns, not
       dismissible), Drawer, Sheet, Popover (focus in, Escape returns, Tab out closes, not trapped), Popconfirm, Slider (arrows, Page keys, Home and End, onCommit), Checkbox and Switch (Space), RadioGroup (one Tab stop,
       the arrows move and choose), SplitView's divider (arrows step toward the reading direction, Home and End), Calendar (the grid: arrows by day and week, mirrored right to left, Page keys by month, Enter chooses), OtpInput
       (typing moves on, Backspace moves back, Home and End; the boxes stay left to right).
   The probe is proved able to see a failure first: a Menu that did not return focus on Escape, a Dialog without a focus trap, a Calendar whose arrows did not mirror and a RadioGroup with a Tab stop on every radio
     each fail one named check below.
   Not covered here, and why: Accordion (CollapsibleSection) is in keyboard.test.js (the settings section); Select is the browser's native select; DataGrid cells, the Chat composer and the message actions have the tests named above.
   Usage: node tests/keyboard-apg-691.test.js   (run by layout.test.js when one of these parts changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9691, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1300, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    // draw one element: src is the source of (h, P, React) => element; a fresh root each time
    const render = async (src, dir) => {
      await page.evaluate(async (src, dir) => {
        window.__root && window.__root.unmount();
        document.documentElement.setAttribute('dir', dir || 'ltr'); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        window.__log = []; document.querySelector('main').innerHTML = '<div id="c" style="padding:24px;min-block-size:520px"></div>';
        const el = (0, eval)('(' + src + ')')(React.createElement, Plenix, React);
        window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(el);
        await new Promise((r) => setTimeout(r, 700));
      }, src.toString(), dir);
    };
    const focus = (sel) => page.evaluate((s) => { const e = document.querySelector(s); if (e) e.focus(); return !!e; }, sel);
    const at = () => page.evaluate(() => { const a = document.activeElement; return a ? { tag: a.tagName.toLowerCase(), text: (a.textContent || '').trim().slice(0, 30), label: a.getAttribute('aria-label') || '', role: a.getAttribute('role') || '', id: a.id || '', value: a.value === undefined ? '' : a.value } : null; });
    const press = async (key, n) => {
      for (let i = 0; i < (n || 1); i++) {
        if (key === 'Shift+Tab') { await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift'); } else await page.keyboard.press(key);
        await wait(60);
      }
      await wait(120);
    };
    const inside = (sel) => page.evaluate((s) => { const root = document.querySelector(s), a = document.activeElement; return !!root && !!a && root.contains(a); }, sel);
    const count = (sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
    const log = () => page.evaluate(() => window.__log.slice());

    // ───────── Menu (WAI-ARIA menu button) ─────────
    const MENU = (h, P) => h(P.Menu, { trigger: h(P.Button, { id: 'trigger', caret: true }, 'Actions'), label: 'Actions' },
      h(P.MenuItem, { onSelect: () => window.__log.push('rename') }, 'Rename'), h(P.MenuItem, { onSelect: () => window.__log.push('duplicate') }, 'Duplicate'), h(P.MenuItem, { onSelect: () => window.__log.push('delete') }, 'Delete'));
    for (const dir of ['ltr', 'rtl']) {
      await render(MENU, dir); const d = 'menu ' + dir + ': ';
      await focus('#trigger'); await press('Enter');
      assert.equal(await count('[role=menu]'), 1, d + 'Enter on the trigger opens the menu');
      assert.equal((await at()).text, 'Rename', d + 'it opens on the first item');
      await press('ArrowDown'); assert.equal((await at()).text, 'Duplicate', d + 'Arrow Down moves to the next item');
      await press('ArrowDown', 2); assert.equal((await at()).text, 'Rename', d + 'Arrow Down wraps from the last item to the first');
      await press('ArrowUp'); assert.equal((await at()).text, 'Delete', d + 'Arrow Up wraps from the first item to the last');
      await press('Home'); assert.equal((await at()).text, 'Rename', d + 'Home goes to the first item');
      await press('End'); assert.equal((await at()).text, 'Delete', d + 'End goes to the last item');
      await press('Escape');
      assert.equal(await count('[role=menu]'), 0, d + 'Escape closes the menu');
      assert.equal((await at()).id, 'trigger', d + 'Escape returns the focus to the trigger');
      await press('ArrowUp'); assert.equal((await at()).text, 'Delete', d + 'Arrow Up on the trigger opens on the last item');
      await press('Escape'); await press('ArrowDown'); assert.equal((await at()).text, 'Rename', d + 'Arrow Down on the trigger opens on the first item');
      await press('ArrowDown'); await press('Enter');
      assert.deepEqual(await log(), ['duplicate'], d + 'Enter on an item chooses it');
      assert.equal((await at()).id, 'trigger', d + 'choosing returns the focus to the trigger');
      await press('Space'); assert.equal(await count('[role=menu]'), 1, d + 'Space on the trigger opens the menu');
      await press('Tab');
      assert.equal(await count('[role=menu]'), 0, d + 'Tab closes the menu');
      assert.notEqual((await at()).text, 'Rename', d + 'Tab leaves the menu');
    }
    // a sub menu opens toward the reading end: Arrow Right in left to right, Arrow Left in right to left
    const SUB = (h, P) => h(P.Menu, { trigger: h(P.Button, { id: 'trigger' }, 'Actions'), label: 'Actions' }, h(P.MenuItem, null, 'Rename'),
      h(P.MenuSub, { label: 'Move to' }, h(P.MenuItem, { onSelect: () => window.__log.push('brand') }, 'Brand kit'), h(P.MenuItem, null, 'Archive')));
    for (const [dir, forward, backward] of [['ltr', 'ArrowRight', 'ArrowLeft'], ['rtl', 'ArrowLeft', 'ArrowRight']]) {
      await render(SUB, dir); const d = 'sub menu ' + dir + ': ';
      await focus('#trigger'); await press('Enter'); await press('ArrowDown');
      assert.equal((await at()).text, 'Move to', d + 'the sub menu item is reachable');
      await press(backward); assert.equal(await count('[role=menu]'), 1, d + 'the key against the reading direction opens nothing');
      await press(forward);
      assert.equal(await count('[role=menu]'), 2, d + 'the key toward the reading end opens the sub menu');
      assert.equal((await at()).text, 'Brand kit', d + 'focus is on its first item');
      await press(backward); assert.equal((await at()).text, 'Move to', d + 'the key against the reading direction closes it and returns to its item');
      await press('Escape'); assert.equal((await at()).id, 'trigger', d + 'Escape closes the whole menu and returns to the trigger');
    }
    // a radio group in a menu
    const RADIO = (h, P, R) => { const App = () => { const v = R.useState('name'); return h(P.Menu, { trigger: h(P.Button, { id: 'trigger' }, 'Sort'), label: 'Sort' },
      h(P.MenuRadioGroup, { label: 'Sort by', value: v[0], onChange: (x) => { window.__log.push(x); v[1](x); } }, h(P.MenuItem, { value: 'name' }, 'Name'), h(P.MenuItem, { value: 'date' }, 'Date'))); }; return h(App); };
    await render(RADIO); await focus('#trigger'); await press('Enter'); await press('ArrowDown'); await press('Enter');
    assert.deepEqual(await log(), ['date'], 'menu radio group: Enter chooses the item');
    // SplitButton: the menu button
    const SPLIT = (h, P) => h(P.SplitButton, { label: 'Save', onClick: () => window.__log.push('save'), menuLabel: 'More save options' }, h(P.MenuItem, { onSelect: () => window.__log.push('draft') }, 'Save as draft'), h(P.MenuItem, null, 'Save a copy'));
    await render(SPLIT); await focus('[aria-label="More save options"]'); await press('ArrowDown');
    assert.equal((await at()).text, 'Save as draft', 'split button: Arrow Down on the menu button opens on the first item');
    await press('Escape'); assert.equal((await at()).label, 'More save options', 'split button: Escape returns the focus to the menu button');
    await press('ArrowUp'); assert.equal((await at()).text, 'Save a copy', 'split button: Arrow Up opens on the last item');
    await press('Escape');

    // ───────── Combobox ─────────
    const COMBO = (h, P, R) => { const App = () => { const v = R.useState(''); return h(P.Combobox, { label: 'Owner', value: v[0], onChange: (x) => { window.__log.push(x); v[1](x); },
      options: [{ value: 'mc', label: 'Maya Chen' }, { value: 'mw', label: 'Mark Wells' }, { value: 'ms', label: 'Maya Singh' }, { value: 'jd', label: 'Jo Dean' }] }); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(COMBO, dir); const d = 'combobox ' + dir + ': ';
      const exp = () => page.evaluate(() => document.querySelector('[role=combobox]').getAttribute('aria-expanded'));
      const activeOpt = () => page.evaluate(() => { const i = document.querySelector('[role=combobox]'), id = i.getAttribute('aria-activedescendant'), o = id && document.getElementById(id); return o ? o.textContent.trim() : ''; });
      await focus('[role=combobox]'); await page.keyboard.type('ma'); await wait(250);
      assert.equal(await exp(), 'true', d + 'typing opens the list');
      assert.equal(await activeOpt(), 'Maya Chen', d + 'the first match is the active option (aria-activedescendant)');
      await press('ArrowDown'); assert.equal(await activeOpt(), 'Mark Wells', d + 'Arrow Down moves the active option');
      await press('ArrowUp', 3); assert.equal(await activeOpt(), 'Maya Chen', d + 'Arrow Up stops at the first option');
      await press('ArrowDown'); await press('Enter');
      assert.deepEqual(await log(), ['mw'], d + 'Enter chooses the active option');
      assert.equal(await exp(), 'false', d + 'choosing closes the list');
      assert.equal((await at()).role, 'combobox', d + 'the focus stays in the field');
      await press('ArrowDown'); assert.equal(await exp(), 'true', d + 'Arrow Down opens the list again');
      await press('Escape'); assert.equal(await exp(), 'false', d + 'Escape closes the list');
      assert.deepEqual(await log(), ['mw'], d + 'Escape chooses nothing');
      await press('Tab'); assert.notEqual((await at()).role, 'combobox', d + 'Tab leaves the field');
    }

    // ───────── Dialog, Drawer, Sheet: focus in, a trap, Escape, focus back ─────────
    const LAYER = (kind, extra) => '(h, P, R) => { const App = () => { const o = R.useState(false); const C = P.' + kind + '; return h("div", null, h(P.Button, { id: "opener", onClick: () => o[1](true) }, "Open"),'
      + ' h(C, Object.assign({ open: o[0], onClose: () => { window.__log.push("closed"); o[1](false); }, title: "Rename" }, ' + (extra || '{}') + '), h(P.Input, { "aria-label": "First" }), h(P.Input, { "aria-label": "Second" }), h(P.Button, { id: "inner" }, "Inner"))); }; return h(App); }';
    for (const [kind, root] of [['Dialog', '[role=dialog]'], ['Drawer', '[role=dialog]'], ['Sheet', '[role=dialog]']]) {
      for (const dir of ['ltr', 'rtl']) {
        await render(LAYER(kind), dir); const d = kind.toLowerCase() + ' ' + dir + ': ';
        await focus('#opener'); await press('Enter');
        assert.ok(await inside(root), d + 'focus moves into the layer when it opens');
        for (let i = 0; i < 8; i++) { await press('Tab'); assert.ok(await inside(root), d + 'Tab stays inside the layer (press ' + (i + 1) + ')'); }
        for (let i = 0; i < 8; i++) { await press('Shift+Tab'); assert.ok(await inside(root), d + 'Shift+Tab stays inside the layer (press ' + (i + 1) + ')'); }
        await press('Escape');
        assert.equal(await count(root), 0, d + 'Escape closes it');
        assert.equal((await at()).id, 'opener', d + 'focus returns to the opener');
      }
    }
    await render(LAYER('Dialog', '{ dismissible: false }')); await focus('#opener'); await press('Enter'); await press('Escape');
    assert.equal(await count('[role=dialog]'), 1, 'dialog with dismissible false: Escape does not close it');

    // ───────── Popover (not modal: focus in, Escape returns, Tab out closes) ─────────
    const POP = (h, P) => h('div', null, h(P.Popover, { trigger: h(P.Button, { id: 'ptrigger' }, 'Filter'), title: 'Filter' }, h(P.Button, { id: 'pfirst' }, 'First'), h(P.Button, { id: 'psecond' }, 'Second')), h(P.Button, { id: 'after' }, 'After'));
    await render(POP); await focus('#ptrigger'); await press('Enter');
    assert.equal((await at()).id, 'pfirst', 'popover: focus moves to the first control when it opens');
    await press('Escape'); assert.equal(await count('[role=dialog], .plx-popover:popover-open'), 0, 'popover: Escape closes it');
    assert.equal((await at()).id, 'ptrigger', 'popover: Escape returns the focus to the trigger');
    await press('Enter'); await press('Tab'); await press('Tab'); await press('Tab');
    assert.equal(await count('.plx-popover:popover-open, [role=dialog]'), 0, 'popover: Tab out of it closes it (it is not a trap)');
    // Popconfirm
    const PC = (h, P) => h(P.Popconfirm, { trigger: h(P.Button, { id: 'pc' }, 'Delete'), title: 'Delete this?', confirmLabel: 'Delete', cancelLabel: 'Cancel', onConfirm: () => window.__log.push('yes'), onCancel: () => window.__log.push('no') });
    await render(PC); await focus('#pc'); await press('Enter');
    assert.ok(await inside('[role=alertdialog]'), 'popconfirm: focus moves into it when it opens');
    await press('Escape'); assert.equal((await at()).id, 'pc', 'popconfirm: Escape returns the focus to the trigger');

    // ───────── Slider (a native range input) ─────────
    const SLIDER = (h, P, R) => { const App = () => { const v = R.useState(50); return h(P.Slider, { label: 'Brightness', value: v[0], min: 0, max: 100, step: 5, onChange: v[1], onCommit: (x) => window.__log.push(x) }); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(SLIDER, dir); const d = 'slider ' + dir + ': ';
      const val = () => page.evaluate(() => +document.querySelector('input[type=range]').value);
      await focus('input[type=range]');
      await press('ArrowUp'); assert.equal(await val(), 55, d + 'Arrow Up adds one step');
      await press('ArrowDown', 2); assert.equal(await val(), 45, d + 'Arrow Down takes a step away');
      await press('Home'); assert.equal(await val(), 0, d + 'Home goes to the minimum');
      await press('End'); assert.equal(await val(), 100, d + 'End goes to the maximum');
      await press('PageDown'); assert.ok(await val() < 100, d + 'Page Down takes a larger step away');
      assert.ok((await log()).length >= 1, d + 'onCommit runs when the keys finish a change');
    }

    // ───────── Checkbox, Switch, RadioGroup ─────────
    const CHECKS = (h, P, R) => { const App = () => { const a = R.useState(false), b = R.useState(false); return h('div', null,
      h(P.Checkbox, { id: 'cb', checked: a[0], onChange: (e) => a[1](e.target.checked), label: 'Include subfolders' }), h(P.Switch, { id: 'sw', checked: b[0], onChange: (e) => b[1](e.target.checked), label: 'Notifications' })); }; return h(App); };
    await render(CHECKS); await focus('#cb'); await press('Space');
    assert.equal(await page.evaluate(() => document.getElementById('cb').checked), true, 'checkbox: Space checks it');
    await press('Space'); assert.equal(await page.evaluate(() => document.getElementById('cb').checked), false, 'checkbox: Space unchecks it');
    await press('Tab'); assert.equal((await at()).id, 'sw', 'switch: Tab moves from the checkbox to the switch');
    await press('Space'); assert.equal(await page.evaluate(() => document.getElementById('sw').checked), true, 'switch: Space turns it on');
    assert.equal(await page.evaluate(() => document.getElementById('sw').getAttribute('role')), 'switch', 'switch: it is a role=switch');
    const RADIOS = (h, P, R) => { const App = () => { const v = R.useState('pdf'); return h('div', null, h(P.RadioGroup, { label: 'Format', value: v[0], onChange: (x) => { window.__log.push(x); v[1](x); },
      options: [{ value: 'pdf', label: 'PDF' }, { value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }] }), h(P.Button, { id: 'after' }, 'After')); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(RADIOS, dir); const d = 'radio group ' + dir + ': ';
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('input[type=radio]')].filter((r) => r.tabIndex >= 0).length), 3, d + 'native radios: the group is one Tab stop through the browser (the checked one)');
      await focus('input[type=radio]:checked'); await press('ArrowDown');
      assert.deepEqual(await log(), ['png'], d + 'Arrow Down moves the choice to the next radio and chooses it');
      await press('ArrowUp'); assert.deepEqual(await log(), ['png', 'pdf'], d + 'Arrow Up moves it back');
      await press('Tab'); assert.equal((await at()).id, 'after', d + 'Tab leaves the group in one press');
    }

    // ───────── SplitView's divider ─────────
    const SPLITVIEW = (h, P) => h('div', { style: { inlineSize: 1200, blockSize: 480 } }, h(P.SplitView, { label: 'Panes', firstLabel: 'List', defaultSize: 480,   /* inside SplitView's 360 to 720 side-by-side limits, so it can narrow too (issue 777: 320 sat at the minimum) */ first: h('div', null, 'First panel'), second: h('div', null, 'Second panel') }));
    for (const [dir, grow, shrink] of [['ltr', 'ArrowRight', 'ArrowLeft'], ['rtl', 'ArrowLeft', 'ArrowRight']]) {
      await render(SPLITVIEW, dir); const d = 'split view ' + dir + ': ';
      const sep = () => page.evaluate(() => { const s = document.querySelector('[role=separator][aria-orientation=vertical]'); return s ? { now: +s.getAttribute('aria-valuenow'), min: +s.getAttribute('aria-valuemin'), max: +s.getAttribute('aria-valuemax') } : null; });
      assert.ok(await sep(), d + 'the divider is a separator with its values');
      await focus('[role=separator][aria-orientation=vertical]'); const start = (await sep()).now;
      await press(grow); assert.ok((await sep()).now > start, d + 'the arrow toward the end edge widens the first panel (mirrored right to left)');
      await press(shrink, 2); assert.ok((await sep()).now < start, d + 'the arrow toward the start edge narrows it');
      await press('Home'); assert.equal((await sep()).now, (await sep()).min, d + 'Home goes to the minimum size');
      await press('End'); assert.equal((await sep()).now, (await sep()).max, d + 'End goes to the maximum size');
    }

    // ───────── Calendar (a grid) ─────────
    const CAL = (h, P, R) => { const App = () => { const v = R.useState('2026-10-15'); return h(P.Calendar, { label: 'Due date', value: v[0], onChange: (x) => { window.__log.push('chose ' + x); v[1](x); }, onMonthChange: (m) => window.__log.push('month ' + m) }); }; return h(App); };
    for (const [dir, next, prev] of [['ltr', 'ArrowRight', 'ArrowLeft'], ['rtl', 'ArrowLeft', 'ArrowRight']]) {
      await render(CAL, dir); const d = 'calendar ' + dir + ': ';
      const day = () => page.evaluate(() => { const a = document.activeElement; return a ? (a.getAttribute('aria-label') || a.textContent || '').trim() : ''; });
      assert.equal(await count('[role=grid]'), 1, d + 'the days are a grid');
      assert.equal(await page.evaluate(() => document.querySelectorAll('[role=grid] [tabindex="0"]').length), 1, d + 'the grid is one Tab stop');
      await focus('[role=grid] [tabindex="0"]'); const start = await day();
      await press(next); const one = await day(); assert.notEqual(one, start, d + 'the arrow toward the reading end moves a day');
      await press(prev); assert.equal(await day(), start, d + 'the arrow against it moves back (mirrored right to left)');
      await press('ArrowDown'); const week = await day(); assert.notEqual(week, start, d + 'Arrow Down moves a week');
      await press('ArrowUp'); assert.equal(await day(), start, d + 'Arrow Up moves a week back');
      await press('PageDown'); assert.ok((await log()).includes('month 2026-11'), d + 'Page Down shows the next month');
      await press('PageUp'); await press('Enter');
      assert.ok((await log()).some((l) => /^chose 2026-10-/.test(l)), d + 'Enter chooses the day');
    }

    // ───────── OtpInput (boxes stay left to right in every direction) ─────────
    const OTP = (h, P) => h(P.OtpInput, { length: 4, label: 'Code' });
    for (const dir of ['ltr', 'rtl']) {
      await render(OTP, dir); const d = 'otp ' + dir + ': ';
      const which = () => page.evaluate(() => { const boxes = [...document.querySelectorAll('input')]; return boxes.indexOf(document.activeElement); });
      const vals = () => page.evaluate(() => [...document.querySelectorAll('input')].map((i) => i.value).join(''));
      await focus('input'); await page.keyboard.type('12'); await wait(150);
      assert.equal(await which(), 2, d + 'typing moves on to the next box');
      await press('Backspace'); assert.equal(await which(), 1, d + 'Backspace in an empty box moves back');
      assert.equal(await vals(), '1', d + 'and clears the box it moved to');
      await press('Home'); assert.equal(await which(), 0, d + 'Home goes to the first box');
      await press('End'); assert.equal(await which(), 3, d + 'End goes to the last box');
      await press('ArrowLeft'); assert.equal(await which(), 2, d + 'Arrow Left moves to the box on the left (the boxes are left to right in both directions)');
    }

    assert.deepEqual(errors, [], 'no script errors');
    console.log('keyboard-apg-691: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
