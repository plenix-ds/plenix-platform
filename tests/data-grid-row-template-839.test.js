// Plenix · tests/data-grid-row-template-839.test.js: the DataGrid row template (issue 839, owner 2026-11-01: A, B and wide as options). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/data-grid-row-template-839.test.js   → DATA_GRID_ROW_TEMPLATE_839_OK
// Cases, in left to right and right to left: with neither layout nor template the grid draws no template class (nothing changes for an existing grid); layout A in a narrow
//   grid: three lines (title | date, subtitle | primary, secondary | tertiary), the vertical line on the cells of the second column, the checkbox and row menu on the first line,
//   a column that fills no slot is not drawn; layout B: the primary value on the title's line, the subtitle alone, secondary | tertiary | date on the third line, lines only there;
//   wide: a table at a narrow width too, its columns the slots in order title, subtitle, date, primary, secondary, tertiary; the defaults from the column order (the first date
//   column is the date, the first number column the primary value, the rest in order) and an explicit template that wins; selection, Shift + F10 (row menu) and the arrow keys
//   (the next drawn cell, never a hidden one) work in a card; A and B keep the measured switch (a table while the columns fit, a card when they do not).
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9818, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ';
      const mount = async (width, extra) => {
        await page.setViewport({ width: width + 40, height: 600 });
        await page.evaluate(async (dir, width, extra) => {
          window.__root && window.__root.unmount(); document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
          document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement;
          const data = [1, 2, 3].map((i) => ({ id: 'r' + i, name: 'Person ' + i, role: 'Role ' + i, notes: 'Note ' + i, seen: '2026-10-0' + i, amount: i * 100, email: 'p' + i + '@x.org', phone: '555-010' + i }));
          const cols = [{ title: 'Name', field: 'name' }, { title: 'Role', field: 'role' }, { title: 'Notes', field: 'notes' }, { title: 'Last seen', field: 'seen', type: 'date' }, { title: 'Amount', field: 'amount', type: 'number' }, { title: 'Email', field: 'email' }, { title: 'Phone', field: 'phone' }];
          window.__root = ReactDOM.createRoot(document.getElementById('c'));
          window.__root.render(h('div', { style: { width, height: 480 } }, h(Plenix.DataGrid, Object.assign({ label: 'People', data, columns: cols, selectable: true, rowMenu: [{ label: 'Open', onSelect() {} }] }, extra))));
          await new Promise((r) => setTimeout(r, 1200));
        }, dir, width, extra);
      };
      const TEMPLATE = { title: 'name', subtitle: 'role', date: 'seen', primary: 'amount', secondary: 'email', tertiary: 'phone' };
      // where each slot's cell of the first record sits: its top, its start edge (from the row's start, so the same in both directions), and which fields are drawn
      const layoutOf = () => page.evaluate(() => {
        const row = document.querySelector('[role=row][data-plx-record]'), r = row.getBoundingClientRect(), rtl = document.documentElement.dir === 'rtl';
        const at = (el) => { const b = el.getBoundingClientRect(); return { top: Math.round(b.top - r.top), start: Math.round(rtl ? r.right - b.right : b.left - r.left), width: Math.round(b.width) }; };
        const slot = {}; for (const el of row.querySelectorAll('[role=gridcell][data-plx-field]')) { const m = /cell--slot-(\w+)/.exec(el.className); slot[m ? m[1] : 'none:' + el.getAttribute('data-plx-field')] = at(el); }
        const menu = row.querySelector('.plx-data-grid__cell--row-menu'), check = row.querySelector('.plx-data-grid__grid-row-header');
        return { slot, menu: menu && at(menu), check: check && at(check), cls: row.className, fields: [...row.querySelectorAll('[role=gridcell][data-plx-field]')].map((e) => e.getAttribute('data-plx-field')) };
      });
      const hasLine = (cls) => page.evaluate((cls) => { const el = document.querySelector('[role=row][data-plx-record] .' + cls); return !!el && getComputedStyle(el, '::before').content !== 'none'; }, cls);

      await check(T + 'without layout or template no template class is drawn', async () => {
        await mount(460, { narrow: 'list' }); const l = await layoutOf();
        assert.ok(!/template/.test(l.cls)); assert.equal(Object.keys(l.slot).filter((k) => !k.startsWith('none:')).length, 0);
      });
      await check(T + 'layout A: three lines, title | date, subtitle | primary, secondary | tertiary', async () => {
        await mount(460, { narrow: 'list', layout: 'A', template: TEMPLATE }); const s = (await layoutOf()).slot;
        assert.equal(s.title.top, s.date.top); assert.equal(s.subtitle.top, s.primary.top); assert.equal(s.secondary.top, s.tertiary.top);
        assert.ok(s.title.top < s.subtitle.top && s.subtitle.top < s.secondary.top, 'three lines, top to bottom');
        assert.ok(s.date.start > s.title.start, 'the second column is after the first');
        assert.equal(s.date.start, s.primary.start); assert.equal(s.primary.start, s.tertiary.start);
      });
      await check(T + 'layout A: the checkbox and the row menu are on the first line, a column in no slot is not drawn', async () => {
        const l = await layoutOf(); assert.equal(l.check.top, l.slot.title.top); assert.equal(l.menu.top, l.slot.title.top);
        assert.ok(l.check.start < l.slot.title.start && l.menu.start > l.slot.date.start);
        assert.ok(!l.fields.includes('notes'), 'the Notes column is not in the card');
      });
      await check(T + 'layout A: the vertical line is on the second column\'s cells', async () => {
        assert.ok(await hasLine('plx-data-grid__cell--slot-date')); assert.ok(await hasLine('plx-data-grid__cell--slot-primary')); assert.ok(await hasLine('plx-data-grid__cell--slot-tertiary'));
        assert.ok(!(await hasLine('plx-data-grid__cell--slot-title')));
      });
      await check(T + 'layout B: the primary value on the title\'s line, secondary | tertiary | date on the third, lines only there', async () => {
        await mount(460, { narrow: 'list', layout: 'B', template: TEMPLATE }); const s = (await layoutOf()).slot;
        assert.equal(s.title.top, s.primary.top); assert.ok(s.subtitle.top > s.title.top);
        assert.equal(s.secondary.top, s.tertiary.top); assert.equal(s.tertiary.top, s.date.top); assert.ok(s.secondary.top > s.subtitle.top);
        assert.ok(s.tertiary.start > s.secondary.start && s.date.start > s.tertiary.start);
        assert.ok(await hasLine('plx-data-grid__cell--slot-tertiary')); assert.ok(await hasLine('plx-data-grid__cell--slot-date')); assert.ok(!(await hasLine('plx-data-grid__cell--slot-primary')));
      });
      await check(T + 'wide: a table at a narrow width, the slots as columns in order', async () => {
        await mount(460, { layout: 'wide', template: TEMPLATE });
        const heads = await page.evaluate(() => [...document.querySelectorAll('[role=columnheader]')].map((e) => (e.textContent || '').trim()).filter(Boolean));
        assert.deepEqual(heads, ['Name', 'Role', 'Last seen', 'Amount', 'Email', 'Phone']);
        assert.ok(!/template-(a|b)\b/.test((await layoutOf()).cls), 'no card');
      });
      await check(T + 'the defaults from the column order: the first date is the date, the first number the primary, the rest in order', async () => {
        await mount(460, { narrow: 'list', layout: 'A' }); const l = await layoutOf();
        // columns in order: name, role, notes, seen (date), amount (number), email, phone: date = seen, primary = amount, title = name, subtitle = role, secondary = notes, tertiary = email
        assert.deepEqual(l.fields.slice().sort(), ['amount', 'email', 'name', 'notes', 'role', 'seen']);
        assert.ok(!l.fields.includes('phone'), 'the seventh column fills no slot');
      });
      await check(T + 'an explicit template wins over the defaults', async () => {
        await mount(460, { narrow: 'list', layout: 'A', template: { title: 'email', primary: 'phone' } });
        const slots = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll('[role=row][data-plx-record]')[0].querySelectorAll('[role=gridcell][data-plx-field]')].map((e) => [/cell--slot-(\w+)/.exec(e.className)[1], e.getAttribute('data-plx-field')])));
        assert.equal(slots.title, 'email'); assert.equal(slots.primary, 'phone'); assert.equal(slots.date, 'seen');
      });
      await check(T + 'a card: a click selects, arrows go to the next drawn cell, Shift + F10 opens the row menu', async () => {
        await mount(460, { narrow: 'list', layout: 'A', template: TEMPLATE });
        await page.evaluate(() => document.querySelector('[role=row][data-plx-record] input[type=checkbox], [role=row][data-plx-record] [role=checkbox]').click()); await wait(200);
        assert.equal(await page.evaluate(() => document.querySelector('[role=row][data-plx-record]').getAttribute('aria-selected')), 'true');
        await page.evaluate(() => document.querySelector('[role=row][data-plx-record] [data-plx-field="role"]').focus());
        await page.keyboard.press(dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'); await wait(250);
        assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-plx-field')), 'seen', 'the Notes column is skipped (not drawn)');
        await page.keyboard.down('Shift'); await page.keyboard.press('F10'); await page.keyboard.up('Shift'); await wait(300);
        assert.ok(await page.$('[role=menu]'), 'the row menu opened');
      });
      await check(T + 'A keeps the measured switch: a table while the columns fit, a card when they do not', async () => {
        await mount(1400, { layout: 'A', template: TEMPLATE }); assert.ok(!/template-a/.test((await layoutOf()).cls), 'a table when wide');
        await mount(420, { layout: 'A', template: TEMPLATE }); assert.ok(/template-a/.test((await layoutOf()).cls), 'a card when narrow');
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'DATA_GRID_ROW_TEMPLATE_839_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
