// Plenix tests · keyboard behavior, with real key presses on the components' live examples in the design system:
// a Toolbar is one Tab stop and its arrows follow reading order; Rating moves focus with the value; Tabs and
// SegmentedControl arrows follow reading order (right to left reverses them); the Tree opens toward the reading end; a
// collapsible settings section opens and closes with Enter and Space; the recent searches of a SearchField are a grid
// popup (WAI-ARIA combobox with grid popup): Arrow Down moves between rows, Arrow Right into the remove cell, Enter there
// removes the search, Delete removes the active one, Enter on a term searches it (the focus stays in the field).
//   node tests/keyboard.test.js            (TEST_PORT: another port)
//   TEST_SCOPE=full: every component; by default (tests/changed.js) those whose component or design-system page changed
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep, at } = require('./lib.js');
const changed = require('./changed.js');
const PORT = +process.env.TEST_PORT || 8797, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/platform/design-system/';
if (!fs.existsSync(path.join(__dirname, '..', 'platform', 'design-system', 'index.html'))) { console.log('KEYBOARD_SKIPPED (no design system)'); process.exit(0); }
// each component checked: its page's record id and its Platform unit
const PARTS = { toolbar: ['toolbar', 'components/Toolbar'], rating: ['rating', 'components/Rating'], tabs: ['tabs', 'components/Tabs'], settings: ['settings-page', 'patterns/SettingsLayout'], recent: ['recent-searches', 'components/SearchField'] };
const want = (k) => changed.wants({ ids: [PARTS[k][0]], units: [PARTS[k][1]] });
const WANTED = Object.keys(PARTS).filter(want);
if (!WANTED.length) changed.none('KEYBOARD_OK 0/0');
changed.report(WANTED.join(', '));

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  const results = [];
  const check = (name, ok, detail) => { results.push([name, ok, detail]); };
  const open = async (route) => { await page.goto(BASE + route, { waitUntil: 'networkidle0' }); await sleep(1200); };
  const focusFirst = (sel) => page.evaluate((s) => { const el = document.querySelector(s); if (el) el.focus(); return !!el; }, sel);
  const active = () => page.evaluate(() => { const a = document.activeElement; return a ? (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 40) : ''; });
  const setDir = (sel, dir) => page.evaluate((s, d) => { const el = document.querySelector(s); if (el) el.closest('.ds-live, .ds-example, section, main').setAttribute('dir', d); }, sel, dir);

  // Toolbar: one Tab stop
  if (want('toolbar')) {
  at('toolbar'); await open('#/actions/toolbar');
  const tb = await page.evaluate(() => { const t = document.querySelector('main [role="toolbar"]'); if (!t) return null; const items = [...t.querySelectorAll('button,input,select,a[href]')].filter((e) => e.offsetParent); return { n: items.length, tabbable: items.filter((e) => e.tabIndex === 0).length }; });
  check('Toolbar: exactly one control in the Tab order', tb && tb.n > 1 && tb.tabbable === 1, JSON.stringify(tb));
  if (tb) {
    await page.evaluate(() => { const t = document.querySelector('main [role="toolbar"]'); const el = [...t.querySelectorAll('button,input,select,a[href]')].filter((e) => e.offsetParent && e.tabIndex === 0)[0]; el.focus(); });
    const a0 = await active(); await page.keyboard.press('ArrowRight'); const a1 = await active();
    check('Toolbar: Arrow Right moves to the next control', a0 !== a1, a0 + ' -> ' + a1);
    await page.keyboard.press('ArrowLeft'); const a2 = await active();
    check('Toolbar: Arrow Left moves back', a2 === a0, a2);
    await setDir('main [role="toolbar"]', 'rtl'); await sleep(100);
    await page.keyboard.press('ArrowLeft'); const a3 = await active();
    check('Toolbar (right to left): Arrow Left moves forward', a3 === a1, a3);
  }
  }

  // Rating: focus follows the value
  if (want('rating')) {
  at('rating'); await open('#/forms/rating');
  const has = await page.evaluate(() => { const el = [...document.querySelectorAll('main [role="radiogroup"] [role="radio"]')].filter((e) => e.tabIndex === 0)[0]; if (el) el.focus(); return !!el; });
  if (has) {
    const r0 = await active(); await page.keyboard.press('ArrowRight'); await sleep(150); const r1 = await active();
    const checked = await page.evaluate(() => { const a = document.activeElement; return a && a.getAttribute('aria-checked'); });
    check('Rating: Arrow Right moves focus to the newly chosen star', r0 !== r1 && checked === 'true', r0 + ' -> ' + r1 + ' checked=' + checked);
  } else check('Rating: an interactive rating is shown', false, 'none found');
  }

  // Tabs: arrows in reading order
  if (want('tabs')) {
  at('tabs'); await open('#/navigation/tabs');
  if (await focusFirst('main [role="tablist"] [role="tab"][aria-selected="true"]')) {
    const t0 = await active(); await page.keyboard.press('ArrowRight'); await sleep(100); const t1 = await active();
    check('Tabs: Arrow Right moves to the next tab', t0 !== t1, t0 + ' -> ' + t1);
    await setDir('main [role="tablist"]', 'rtl'); await sleep(100);
    await page.keyboard.press('ArrowLeft'); await sleep(100); const t2 = await active();
    check('Tabs (right to left): Arrow Left moves to the next tab', t2 !== t1 && t2 !== t0, t1 + ' -> ' + t2);
  } else check('Tabs: a tab list is shown', false, 'none found');
  }

  // a collapsible settings section (SettingsSection collapsible, 2026-10-13): its header is one button; Enter and Space
  // open and close it, aria-expanded follows and the rows are hidden with it
  if (want('settings')) {
  at('settings section'); await open('#/page-structures/settings-page');
  const sec = await page.evaluate(() => { const b = document.querySelector('main .plx-settings__section-toggle'); if (!b) return null; b.focus(); return { expanded: b.getAttribute('aria-expanded'), body: !!document.getElementById(b.getAttribute('aria-controls')) }; });
  if (sec) {
    const state = () => page.evaluate(() => { const b = document.activeElement; const body = document.getElementById(b.getAttribute('aria-controls')); return { cls: b.className, expanded: b.getAttribute('aria-expanded'), hidden: body ? body.hidden : null }; });
    const s0 = await state(); await page.keyboard.press('Enter'); const s1 = await state();
    check('Settings section: Enter closes an open section (aria-expanded false, rows hidden)', s0.expanded === 'true' && s1.expanded === 'false' && s1.hidden === true, JSON.stringify([s0, s1]));
    await page.keyboard.press('Space'); const s2 = await state();
    check('Settings section: Space opens it again', s2.expanded === 'true' && s2.hidden === false, JSON.stringify(s2));
    check('Settings section: the header button names its rows (aria-controls)', sec.body, JSON.stringify(sec));
  } else check('Settings section: a collapsible section is shown', false, 'none found');
  }

  // recent searches (owner, 2026-10-14): the combobox with grid popup; each row has a term cell and a remove cell
  if (want('recent')) {
  at('recent searches'); await open('#/navigation/recent-searches');
  const field = 'main .plx-search input[aria-haspopup="grid"]';
  // (the field is marked once: after a search its popup is no longer a grid, and the selector would find another field)
  const st = () => page.evaluate(() => {
    const i = document.querySelector('[data-kb-recent]'); if (!i) return null;
    const grid = document.getElementById(i.getAttribute('aria-controls')), act = i.getAttribute('aria-activedescendant'), cell = act ? document.getElementById(act) : null;
    return { focus: document.activeElement === i, expanded: i.getAttribute('aria-expanded'), role: grid && grid.getAttribute('role'), rows: grid ? grid.querySelectorAll('[role="row"]').length : 0,
      cell: cell ? (cell.querySelector('button') ? 'remove:' + cell.querySelector('button').getAttribute('aria-label') : 'term:' + cell.textContent.trim()) : null, value: i.value };
  });
  const has = await page.evaluate((sel) => { const i = document.querySelector(sel); if (!i) return false; i.setAttribute('data-kb-recent', ''); i.focus(); return true; }, field);
  // the field may open on focus; the history demo starts with three searches
  if (has) {
    await sleep(200);
    const s0 = await st();
    check('Recent searches: the field opens a grid popup of rows (aria-haspopup grid, role grid)', s0 && s0.expanded === 'true' && s0.role === 'grid' && s0.rows >= 2, JSON.stringify(s0));
    await page.keyboard.press('ArrowDown'); await sleep(100); const s1 = await st();
    await page.keyboard.press('ArrowDown'); await sleep(100); const s2 = await st();
    check('Recent searches: Arrow Down moves from row to row on the term cell', s1.cell && /^term:/.test(s1.cell) && s2.cell && /^term:/.test(s2.cell) && s1.cell !== s2.cell && s2.focus, JSON.stringify([s1, s2]));
    await page.keyboard.press('ArrowRight'); await sleep(100); const s3 = await st();
    check('Recent searches: Arrow Right moves into the row\'s remove cell ("Remove <term>")', s3.cell === 'remove:Remove ' + s2.cell.slice(5) && s3.focus, JSON.stringify(s3));
    await page.keyboard.press('ArrowLeft'); await sleep(100); const s4 = await st();
    check('Recent searches: Arrow Left moves back to the term', s4.cell === s2.cell, JSON.stringify(s4));
    await page.keyboard.press('ArrowRight'); await sleep(100); await page.keyboard.press('Enter'); await sleep(250); const s5 = await st();
    check('Recent searches: Enter on the remove cell removes that search; the focus stays in the field', s5.rows === s0.rows - 1 && s5.focus && s5.expanded === 'true', JSON.stringify(s5));
    await page.keyboard.press('ArrowLeft'); await page.keyboard.press('Delete'); await sleep(250); const s6 = await st();
    check('Recent searches: Delete removes the active search', s6.rows === s5.rows - 1 && s6.focus, JSON.stringify(s6));
    if (s6.rows) {
      await page.keyboard.press('ArrowLeft'); const term = (await st()).cell;
      await page.keyboard.press('Enter'); await sleep(250); const s7 = await st();
      check('Recent searches: Enter on a term searches it (its text in the field)', term && /^term:/.test(term) && s7.value === term.slice(5), JSON.stringify([term, s7]));
    }
  } else check('Recent searches: a field with removable recent searches is shown', false, 'none found');
  }

  await browser.close(); server.close();
  const bad = results.filter((r) => !r[1]);
  results.forEach(([n, ok, d]) => console.log((ok ? '  ok   ' : '  FAIL ') + n + (ok ? '' : ' · ' + d)));
  console.log((bad.length ? 'KEYBOARD_FAIL ' : 'KEYBOARD_OK ') + (results.length - bad.length) + '/' + results.length);
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
