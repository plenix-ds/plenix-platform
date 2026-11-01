// Plenix · tests/menubar-805.test.js: the MenuBar (issue 805, owner build 2026-11-02). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/menubar-805.test.js   → MENUBAR_805_OK
// Cases, in left to right and right to left (the arrow keys are mirrored): the bar is one Tab stop (one button has tabindex 0; Tab enters on the first and leaves again); Left and Right move
//   between the buttons and wrap; Home and End go to the ends; Down opens a menu on its first item, Up on its last; Enter and Space open it; with a menu open Left and Right switch to the
//   neighboring menu and focus lands on its first item, Escape closes it and returns focus to its button, Tab closes it and leaves the bar; a sub menu takes Right (Left in right to
//   left) before the bar does; hovering a button does nothing until a menu is open, then opens that one; typing a letter moves to the next button that starts with it; check items and
//   sub menus behave as in the Menu; a narrow bar folds the last menus into More menus (never wraps, one row) and More lists them as labeled groups; Menu without open keeps its own state.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9820, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 720, height: 480 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ', next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight', prev = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
      const mount = (width) => page.evaluate(async (dir, width) => {
        window.__root && window.__root.unmount(); document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en'); window.__log = [];
        document.querySelector('main').innerHTML = '<div id="c" style="padding:16px"><button id="before">before</button> <div id="w"></div> <button id="after">after</button></div>';
        const h = React.createElement, P = Plenix, noop = () => {};
        window.__root = ReactDOM.createRoot(document.getElementById('w'));
        window.__root.render(h('div', { style: { width } }, h(P.MenuBar, { label: 'Application' },
          h(P.MenuBarMenu, { label: 'File' }, h(P.MenuItem, { onSelect: () => window.__log.push('new') }, 'New'), h(P.MenuItem, { onSelect: noop }, 'Open'), h(P.MenuSub, { label: 'Recent' }, h(P.MenuItem, { onSelect: noop }, 'Report'), h(P.MenuItem, { onSelect: noop }, 'Budget')), h(P.MenuDivider), h(P.MenuItem, { checked: true, onSelect: noop }, 'Ruler')),
          h(P.MenuBarMenu, { label: 'Edit' }, h(P.MenuItem, { onSelect: noop }, 'Undo'), h(P.MenuItem, { onSelect: noop }, 'Redo')),
          h(P.MenuBarMenu, { label: 'View' }, h(P.MenuItem, { onSelect: noop }, 'Zoom in'), h(P.MenuItem, { onSelect: noop }, 'Zoom out')),
          h(P.MenuBarMenu, { label: 'Help' }, h(P.MenuItem, { onSelect: noop }, 'About')))));
        await new Promise((r) => setTimeout(r, 900));
      }, dir, width);
      // open: the bar's menus that are open (its menu buttons with aria-expanded), not a sub menu inside one
      const state = () => page.evaluate(() => { const a = document.activeElement; return { focus: a && (a.getAttribute('data-plx-menubar-item') !== null ? 'top:' + a.textContent.trim() : a.id || (a.textContent || '').trim().slice(0, 14)), open: [...document.querySelectorAll('[data-plx-menubar-item][aria-expanded=true]')].map((e) => e.textContent.trim()).join(','), stops: [...document.querySelectorAll('[data-plx-menubar-item]')].filter((e) => e.tabIndex === 0).length, buttons: [...document.querySelectorAll('[data-plx-menubar-item]')].map((e) => e.textContent.trim() || 'more') }; });
      const key = async (k) => { await page.keyboard.press(k); await wait(250); };
      const box = (i) => page.evaluate((i) => { const r = document.querySelectorAll('[data-plx-menubar-item]')[i].getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, i);
      const enter = async () => { await mount(600); await page.focus('#before'); await key('Tab'); };

      await check(T + 'one Tab stop: Tab enters on the first button and leaves again', async () => {
        await enter(); let s = await state(); assert.equal(s.focus, 'top:File'); assert.equal(s.stops, 1);
        await key('Tab'); assert.equal((await state()).focus, 'after');
      });
      await check(T + 'Left and Right move between buttons and wrap, Home and End go to the ends', async () => {
        await enter(); await key(next); assert.equal((await state()).focus, 'top:Edit'); await key('End'); assert.equal((await state()).focus, 'top:Help');
        await key(next); assert.equal((await state()).focus, 'top:File', 'wraps'); await key(prev); assert.equal((await state()).focus, 'top:Help'); await key('Home'); assert.equal((await state()).focus, 'top:File');
        assert.equal((await state()).stops, 1, 'still one Tab stop');
      });
      await check(T + 'Down opens on the first item, Up on the last, Enter and Space open', async () => {
        await enter(); await key('ArrowDown'); let s = await state(); assert.equal(s.open, 'File'); assert.equal(s.focus, 'New');
        await key('Escape'); await key('ArrowUp'); assert.equal((await state()).focus, 'Ruler');
        await key('Escape'); await key('Enter'); assert.equal((await state()).focus, 'New'); await key('Escape'); await key(' '); assert.equal((await state()).focus, 'New');
      });
      await check(T + 'with a menu open Left and Right switch menus, Escape returns to the button, Tab leaves', async () => {
        await enter(); await key('ArrowDown'); await key(next); let s = await state(); assert.equal(s.open, 'Edit'); assert.equal(s.focus, 'Undo');
        await key(prev); s = await state(); assert.equal(s.open, 'File'); assert.equal(s.focus, 'New');
        await key('Escape'); s = await state(); assert.equal(s.open, ''); assert.equal(s.focus, 'top:File');
        await key('ArrowDown'); await key('Tab'); s = await state(); assert.equal(s.open, ''); assert.notEqual(s.focus, 'New');
      });
      await check(T + 'a sub menu takes Right (Left in right to left) before the bar does', async () => {
        await enter(); await key('ArrowDown'); await key('ArrowDown'); await key('ArrowDown'); assert.equal((await state()).focus, 'Recent');
        await key(next); let s = await state(); assert.equal(s.focus, 'Report'); assert.equal(s.open, 'File');
        await key(prev); s = await state(); assert.equal(s.focus, 'Recent'); assert.equal(s.open, 'File');
      });
      await check(T + 'hover does nothing until a menu is open, then opens the one pointed at', async () => {
        await enter(); let c = await box(1); await page.mouse.move(c.x, c.y); await wait(300); assert.equal((await state()).open, '');
        c = await box(0); await page.mouse.click(c.x, c.y); await wait(300); assert.equal((await state()).open, 'File');
        c = await box(2); await page.mouse.move(c.x, c.y); await wait(400); assert.equal((await state()).open, 'View');
      });
      await check(T + 'typing a letter moves to the next button that starts with it', async () => {
        await enter(); await key('v'); assert.equal((await state()).focus, 'top:View'); await key('h'); assert.equal((await state()).focus, 'top:Help'); await key('f'); assert.equal((await state()).focus, 'top:File');
      });
      await check(T + 'a check item and a plain item behave as in the Menu: choosing runs onSelect and closes the menu', async () => {
        await enter(); await key('ArrowDown'); await key('Enter'); assert.deepEqual(await page.evaluate(() => window.__log), ['new']); const s = await state(); assert.equal(s.open, ''); assert.equal(s.focus, 'top:File');
        // React draws the opened menu after the click's task (a microtask later), so the check waits before it reads the item
        assert.equal(await page.evaluate(async () => { document.querySelector('[data-plx-menubar-item]').click(); await new Promise((r) => setTimeout(r, 250)); const c = document.querySelector('[role=menu] [role=menuitemcheckbox]'); return c ? c.getAttribute('aria-checked') : 'no check item; menus open: ' + document.querySelectorAll('[role=menu]').length; }), 'true');
      });
      await check(T + 'a narrow bar folds the last menus into More menus on one row, listed as groups', async () => {
        await mount(190); let s = await state(); assert.deepEqual(s.buttons, ['File', 'Edit', 'more']);
        const rows = await page.evaluate(() => new Set([...document.querySelectorAll('[data-plx-menubar-item]')].map((e) => e.getBoundingClientRect().top)).size); assert.equal(rows, 1, 'one row');
        await page.focus('#before'); await key('Tab'); await key('End'); await key('ArrowDown');
        assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('[role=menu] [role=group] > div:first-child')].map((e) => e.textContent)), ['View', 'Help']);
      });
      await check(T + 'a Menu without open keeps its own state', async () => {
        await mount(600); await page.evaluate(async () => {
          document.querySelector('main').innerHTML = '<div id="w2"></div>'; const h = React.createElement, P = Plenix; ReactDOM.createRoot(document.getElementById('w2')).render(h(P.Menu, { label: 'm', trigger: h(P.Button, null, 'Open') }, h(P.MenuItem, null, 'One')));
          await new Promise((r) => setTimeout(r, 500)); document.querySelector('#w2 button').click(); await new Promise((r) => setTimeout(r, 300));
        });
        assert.ok(await page.$('[role=menu]'), 'opened by its trigger');
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'MENUBAR_805_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
