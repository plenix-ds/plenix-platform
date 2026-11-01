// Plenix · tests/data-grid-edit-keys-737.test.js: F2 and typing start editing in the DataGrid (issue 737). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/data-grid-edit-keys-737.test.js   → DATA_GRID_EDIT_KEYS_737_OK
// Written first (proof first): the cases fail on the code before the fix (F2 and a letter did nothing) and pass after it. In left to right and right to left, on a cell whose column has an editor:
//   F2 opens the editor with the value kept; a printable character opens it with that character in place of the value (Arabic letters too); Enter commits the typed text through onCellEdit and Escape
//   cancels; Space does not start editing; a number column starts only with a digit, a point or a minus; none of it starts in a cell without an editor or with editable=false, with Ctrl, Alt or Meta
//   held, or while an IME composes (a keydown that says so); Enter and double-click still work; Shift with an arrow still extends a cell block when cellSelection is on, and a typed character
//   ends that block as it starts editing.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9822, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 900, height: 560 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ';
      const mount = (extra) => page.evaluate(async (dir, extra) => {
        window.__root && window.__root.unmount(); document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en'); window.__edits = [];
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement;
        const data = Array.from({ length: 4 }, (_, i) => ({ id: 'r' + (i + 1), name: 'Person ' + (i + 1), age: 30 + i, role: 'Role ' + (i + 1), locked: 'Fixed ' + (i + 1) }));
        const columns = [{ title: 'Name', field: 'name', editor: 'input' }, { title: 'Age', field: 'age', editor: 'number' }, { title: 'Role', field: 'role' }, { title: 'Locked', field: 'locked', editor: 'input', editable: false }];
        window.__root = ReactDOM.createRoot(document.getElementById('c'));
        window.__root.render(h('div', { style: { height: 400 } }, h(Plenix.DataGrid, Object.assign({ label: 'People', data, columns, onCellEdit: (r, e) => window.__edits.push(r.id + '.' + e.field + '=' + e.value) }, extra))));
        await new Promise((r) => setTimeout(r, 1000));
      }, dir, extra);
      const focus = (r, f) => page.evaluate((r, f) => { const row = [...document.querySelectorAll('[role=row][data-plx-record]')][r]; row.querySelector('[data-plx-field="' + f + '"]').focus(); }, r, f);
      const editor = () => page.evaluate(() => { const e = document.querySelector('.plx-data-grid__editor'); return e ? e.value : null; });
      const key = async (k, mods = []) => { for (const m of mods) await page.keyboard.down(m); await page.keyboard.press(k); for (const m of mods) await page.keyboard.up(m); await wait(150); };
      const edits = () => page.evaluate(() => window.__edits.slice());

      await check(T + 'F2 opens the editor with the value kept', async () => {
        await mount(); await focus(0, 'name'); await key('F2'); assert.equal(await editor(), 'Person 1');
      });
      await check(T + 'a character opens the editor with that character in place of the value', async () => {
        await mount(); await focus(1, 'name'); await key('x'); assert.equal(await editor(), 'x');
        await mount(); await focus(1, 'name');
        await page.evaluate(() => document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: '\u0645', bubbles: true, cancelable: true })));   // the keyboard of the test browser has no Arabic keys
        await wait(150); assert.equal(await editor(), '\u0645', 'an Arabic letter too');
      });
      await check(T + 'Enter commits the typed text and Escape cancels', async () => {
        await mount(); await focus(0, 'name'); await key('q'); await page.keyboard.type('rs'); await key('Enter'); assert.deepEqual(await edits(), ['r1.name=qrs']);
        await focus(1, 'name'); await key('F2'); await page.keyboard.type('!'); await key('Escape'); assert.equal(await editor(), null); assert.deepEqual(await edits(), ['r1.name=qrs']);
      });
      await check(T + 'Space does not start editing', async () => {
        await mount(); await focus(0, 'name'); await key(' '); assert.equal(await editor(), null);
      });
      await check(T + 'a number column starts only with a digit, a point or a minus', async () => {
        await mount(); await focus(0, 'age'); await key('a'); assert.equal(await editor(), null); await key('7'); assert.equal(await editor(), '7');
        await key('Escape'); await focus(0, 'age'); await key('F2'); assert.equal(await editor(), '30');
      });
      await check(T + 'nothing starts in a cell without an editor or with editable false', async () => {
        await mount(); await focus(0, 'role'); await key('F2'); assert.equal(await editor(), null); await key('x'); assert.equal(await editor(), null);
        await focus(0, 'locked'); await key('F2'); assert.equal(await editor(), null); await key('x'); assert.equal(await editor(), null);
      });
      await check(T + 'nothing starts with Ctrl, Alt or Meta held', async () => {
        await mount(); await focus(0, 'name');
        await key('x', ['Control']); assert.equal(await editor(), null); await key('x', ['Alt']); assert.equal(await editor(), null); await key('x', ['Meta']); assert.equal(await editor(), null);
        await key('F2', ['Control']); assert.equal(await editor(), null);
      });
      await check(T + 'nothing starts while an IME composes', async () => {
        await mount(); await focus(0, 'name');
        await page.evaluate(() => { const c = document.activeElement; c.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', isComposing: true, bubbles: true, cancelable: true })); c.dispatchEvent(new KeyboardEvent('keydown', { key: 'Process', keyCode: 229, bubbles: true, cancelable: true })); });
        await wait(150); assert.equal(await editor(), null);
      });
      await check(T + 'Enter and a double click still start editing', async () => {
        await mount(); await focus(0, 'name'); await key('Enter'); assert.equal(await editor(), 'Person 1'); await key('Escape');
        const c = await page.evaluate(() => { const b = document.querySelectorAll('[role=row][data-plx-record]')[1].querySelector('[data-plx-field="name"]').getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
        await page.mouse.click(c.x, c.y, { clickCount: 2 }); await wait(250); assert.equal(await editor(), 'Person 2');
      });
      await check(T + 'with cellSelection Shift and an arrow still extend a block, and a typed character ends it and starts editing', async () => {
        await mount({ cellSelection: true }); await focus(0, 'name'); await key('ArrowDown', ['Shift']); await key('ArrowDown', ['Shift']);
        assert.equal(await page.evaluate(() => document.querySelectorAll('[role=gridcell][aria-selected=true]').length), 3);
        await key('z'); assert.equal(await page.evaluate(() => document.querySelectorAll('[role=gridcell][aria-selected=true]').length), 0); assert.equal(await editor(), 'z');
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'DATA_GRID_EDIT_KEYS_737_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
