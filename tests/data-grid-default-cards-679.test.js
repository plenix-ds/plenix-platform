// Plenix · tests/data-grid-default-cards-679.test.js: every DataGrid's narrow cards are the row template by default (issue 679, reopened by the owner: "every grid, by default"). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/data-grid-default-cards-679.test.js   → DATA_GRID_DEFAULT_CARDS_679_OK
// Written first (proof first): on the code before the change a grid without `layout` drew the old plain cards (label and value stacked), so the template lines below fail there and pass after it.
// The owner's two choices are constants here, so the test follows his answer: DEFAULT_LAYOUT ("A" or "B": the layout of a grid that names none) and EXTRA ("details": a column no slot
// takes stays as a labeled detail under the card's last line; "hidden": it is not drawn in the card, as with an explicit layout).
// Cases, in left to right and right to left: a narrow grid with no layout (narrow "auto") draws template cards in the default layout with the slots filled by the fixed rule; a wide grid is the
//   table it was (no template class on any row, and the key classes of the old cards still on its cells); keyColumns become title, subtitle and primary; layout "B" and layout "A" override the
//   default; layout "plain" is the old plain card (every other field a labeled detail); narrow="table" keeps a table at a narrow width; a grid whose fields all fit the slots draws no extra cell;
//   a grid of more than six columns follows EXTRA; the static Table keeps its own plain list; selection, the keyboard and the row menu still work in the default card.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const DEFAULT_LAYOUT = 'A', EXTRA = 'details';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9823, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ';
      // six columns that fill the slots (name, role, date, amount, email, phone), or eight (notes and team are the extras)
      const mount = async (width, extra, wide8, table) => {
        await page.setViewport({ width: width + 40, height: 600 });
        await page.evaluate(async (dir, width, extra, wide8, table) => {
          window.__root && window.__root.unmount(); document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
          document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement;
          const data = [1, 2, 3].map((i) => ({ id: 'r' + i, name: 'Person ' + i, role: 'Role ' + i, seen: '2026-10-0' + i, amount: i * 100, email: 'p' + i + '@x.org', phone: '555-010' + i, notes: 'Note ' + i, team: 'Team ' + i }));
          const six = [{ title: 'Name', field: 'name' }, { title: 'Role', field: 'role' }, { title: 'Last seen', field: 'seen', type: 'date' }, { title: 'Amount', field: 'amount', type: 'number' }, { title: 'Email', field: 'email' }, { title: 'Phone', field: 'phone' }];
          const columns = wide8 ? six.concat([{ title: 'Notes', field: 'notes' }, { title: 'Team', field: 'team' }]) : six;
          const Grid = table ? Plenix.Table : Plenix.DataGrid;
          window.__root = ReactDOM.createRoot(document.getElementById('c'));
          window.__root.render(h('div', { style: { width, height: 480 } }, h(Grid, Object.assign({ label: 'People', data, columns, selectable: !table, rowMenu: table ? undefined : [{ label: 'Open', onSelect() {} }] }, extra))));
          await new Promise((r) => setTimeout(r, 1200));
        }, dir, width, extra, wide8, table);
      };
      // the slot of each drawn cell of the first record, its line (top) and which fields are drawn; plus the row's classes and the labeled details
      const shape = () => page.evaluate(() => {
        const row = document.querySelector('[role=row][data-plx-record]'), r = row.getBoundingClientRect(), slot = {}, fields = [];
        for (const el of row.querySelectorAll('[role=gridcell][data-plx-field]')) { const m = /cell--slot-(\w+)/.exec(el.className); fields.push(el.getAttribute('data-plx-field')); slot[m ? m[1] : 'none:' + el.getAttribute('data-plx-field')] = { top: Math.round(el.getBoundingClientRect().top - r.top), field: el.getAttribute('data-plx-field') }; }
        return { cls: row.className, slot, fields, details: [...row.querySelectorAll('.plx-data-grid__cell--list-detail')].map((e) => e.getAttribute('data-plx-field')), key: row.querySelectorAll('.plx-data-grid__cell--key').length };
      });
      const NARROW = 460, WIDE = 1500;

      await check(T + 'a narrow grid with no layout draws template cards in the default layout, the slots by the fixed rule', async () => {
        await mount(NARROW, {}); const s = await shape();
        assert.ok(new RegExp('template-' + DEFAULT_LAYOUT.toLowerCase() + '\\b').test(s.cls), s.cls);
        assert.equal(s.slot.title.field, 'name'); assert.equal(s.slot.date.field, 'seen'); assert.equal(s.slot.primary.field, 'amount'); assert.equal(s.slot.subtitle.field, 'role');
        assert.equal(s.details.length, 0, 'no plain detail cells when every field has a slot');
      });
      await check(T + 'a grid whose fields all fit the slots draws no extra cell', async () => {
        await mount(NARROW, {}); const s = await shape(); assert.deepEqual(s.fields.slice().sort(), ['amount', 'email', 'name', 'phone', 'role', 'seen']);
      });
      await check(T + 'a wide grid is the table it was: no template class on a row, the key classes still on its cells', async () => {
        await mount(WIDE, {}); const s = await shape(); assert.ok(!/template/.test(s.cls), s.cls); assert.ok(s.key > 0, 'the old key classes stay on the table cells'); assert.ok(!Object.keys(s.slot).some((k) => !k.startsWith('none:')));
      });
      await check(T + 'keyColumns become title, subtitle and primary', async () => {
        await mount(NARROW, { keyColumns: ['email', 'name', 'phone'] }); const s = await shape();
        assert.equal(s.slot.title.field, 'email'); assert.equal(s.slot.subtitle.field, 'name'); assert.equal(s.slot.primary.field, 'phone');
      });
      await check(T + 'layout overrides the default, and "plain" is the old plain card', async () => {
        await mount(NARROW, { layout: DEFAULT_LAYOUT === 'A' ? 'B' : 'A' }); let s = await shape(); assert.ok(new RegExp('template-' + (DEFAULT_LAYOUT === 'A' ? 'b' : 'a') + '\\b').test(s.cls), s.cls);
        await mount(NARROW, { layout: 'plain' }); s = await shape(); assert.ok(!/template/.test(s.cls), s.cls); assert.ok(s.details.length >= 3, 'every other field is a labeled detail'); assert.ok(s.key >= 1);
      });
      await check(T + 'narrow="table" keeps a table at a narrow width', async () => {
        await mount(NARROW, { narrow: 'table' }); const s = await shape(); assert.ok(!/template|grid-row--narrow/.test(s.cls), s.cls);
      });
      await check(T + 'more than six columns: the extra ones follow the owner\'s rule', async () => {
        await mount(NARROW, {}, true); const s = await shape();
        if (EXTRA === 'details') { assert.deepEqual(s.details.slice().sort(), ['notes', 'team']); assert.ok(Object.keys(s.slot).filter((k) => !k.startsWith('none:')).length === 6); }
        else { assert.deepEqual(s.details, []); assert.ok(!s.fields.includes('notes') && !s.fields.includes('team')); }
      });
      await check(T + 'the static Table keeps its own plain list', async () => {
        await mount(NARROW, {}, false, true); const s = await shape(); assert.ok(!/template/.test(s.cls), s.cls);
      });
      await check(T + 'in the default card a click selects, an arrow moves, Shift + F10 opens the row menu', async () => {
        await mount(NARROW, {});
        await page.evaluate(() => document.querySelector('[role=row][data-plx-record] input[type=checkbox], [role=row][data-plx-record] [role=checkbox]').click()); await wait(200);
        assert.equal(await page.evaluate(() => document.querySelector('[role=row][data-plx-record]').getAttribute('aria-selected')), 'true');
        await page.evaluate(() => document.querySelector('[role=row][data-plx-record] [data-plx-field="name"]').focus()); await page.keyboard.press('ArrowDown'); await wait(250);
        assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-plx-field')), 'name');
        await page.keyboard.down('Shift'); await page.keyboard.press('F10'); await page.keyboard.up('Shift'); await wait(300);
        assert.ok(await page.$('[role=menu]'), 'the row menu opened');
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'DATA_GRID_DEFAULT_CARDS_679_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
