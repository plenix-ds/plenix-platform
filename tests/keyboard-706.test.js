/* Plenix tests · keyboard behavior of the last interactive parts without a keyboard test, and the APG gaps closed in issue 706 (follow-up to issue 691).
   Summary: real key presses on the Platform's own fixture page (tests/fixtures/platform-host.html), in a left-to-right page and, where arrows flip, in a right-to-left one:
       CommandMenu (the combobox and listbox: arrows wrap, Enter runs, a disabled command does not, a page opens and Backspace or Escape goes back, Escape clears the text first),
       EntityPicker (opens on focus, typing filters, arrows, Enter chooses, Escape closes, Backspace removes the last tag), MillerColumns (one Tab stop per column, Up and Down choose, Home and End,
       the arrow toward the reading end moves into the children and the other back, type-ahead, Enter opens a leaf), RowButton (Enter and Space press it), AssignControl (Reassign puts focus in
       the picker, Escape puts the row back with focus on Reassign, choosing assigns and returns focus), ImageUpload (Choose is reachable, Remove moves focus to the next Remove, then to Choose),
       ImageCrop (the arrows move the picture, Home centers it), RenameAction (F2 and Enter open the field, Escape restores, Enter saves; the dialog variant opens, Escape closes, focus
       returns), SessionTimeout (focus starts on Stay signed in, Escape stays; the signed-out message cannot be dismissed), DeleteFlow (confirm: focus on Cancel, Escape deletes nothing, focus
       returns; type: focus in the field, a mismatch keeps focus there), DraftState (Discard draft asks first, focus on Keep draft, Escape keeps the draft), QueryBuilder (Add rule moves focus to the new
       rule's field, removing moves it to Add rule), FilterBar (a filter is a menu button: a multiple filter stays open while choosing, a single one closes), SearchWorkspace (typing searches,
       a chip's remove button removes its filter), ProductOptions (the sizes are one radio group: arrows choose and skip a sold-out size; a sold-out swatch does nothing).
     And the four APG gaps of issue 706: Combobox opens on Arrow Up at its last option, Alt+Arrow Down opens without moving, Escape on a closed list keeps the value (recorded as intentional in
       Combobox's header); Menu type-ahead (a letter moves to the next item that starts with it; in a sub menu, a letter no sub item starts with keeps focus there and the sub menu open).
   Proof first: each check is written so that the broken behavior fails it by name. A MillerColumns whose arrows did not swap right to left fails "miller rtl: the arrow toward the reading end
     moves into the children"; an AssignControl that dropped focus after Escape fails "assign: Escape puts the row back with focus on Reassign"; a DeleteFlow that opened on Delete fails "delete
     confirm: focus starts on Cancel"; a Menu without type-ahead fails "menu type-ahead ltr: a letter moves to the item that starts with it"; a Combobox that ignored Arrow Up on a closed list
     fails "combobox gaps ltr: Arrow Up on a closed list opens it on the last option".
   Written, not run here (the owner starts the tests). Usage: node tests/keyboard-706.test.js   (run by layout.test.js when one of these parts changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9706, server = await serve(PORT); let browser;
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
    // the first button (or other element matching sel) whose text or accessible name is text
    const focusNamed = (sel, text) => page.evaluate((s, t) => { const e = [...document.querySelectorAll(s)].find((x) => (x.getAttribute('aria-label') || x.textContent || '').trim() === t); if (e) e.focus(); return !!e; }, sel, text);
    const at = () => page.evaluate(() => { const a = document.activeElement; return a ? { tag: a.tagName.toLowerCase(), text: (a.textContent || '').trim().slice(0, 40), label: a.getAttribute('aria-label') || '', role: a.getAttribute('role') || '', id: a.id || '', value: a.value === undefined ? '' : a.value, type: a.type || '' } : null; });
    const press = async (key, n) => {
      for (let i = 0; i < (n || 1); i++) {
        const mods = key.split('+'), k = mods.pop();
        for (const m of mods) await page.keyboard.down(m);
        await page.keyboard.press(k);
        for (const m of mods.reverse()) await page.keyboard.up(m);
        await wait(60);
      }
      await wait(150);
    };
    const inside = (sel) => page.evaluate((s) => { const root = document.querySelector(s), a = document.activeElement; return !!root && !!a && root.contains(a); }, sel);
    const count = (sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
    const log = () => page.evaluate(() => window.__log.slice());
    // the text of the option a focused combobox or listbox points at (aria-activedescendant)
    const activeText = () => page.evaluate(() => { const a = document.activeElement, id = a && a.getAttribute('aria-activedescendant'), o = id && document.getElementById(id); return o ? o.textContent.trim() : ''; });
    const expanded = () => page.evaluate(() => { const a = document.activeElement; return a ? a.getAttribute('aria-expanded') : null; });

    // ───────── CommandMenu ─────────
    const CMD = (h, P) => h(P.CommandMenu, { label: 'Commands', items: [
      { id: 'new', label: 'Create collection', group: 'Create', onSelect: () => window.__log.push('new') },
      { id: 'up', label: 'Upload files', group: 'Create', onSelect: () => window.__log.push('upload') },
      { id: 'off', label: 'Export report', group: 'Create', disabled: true, onSelect: () => window.__log.push('export') },
      { id: 'theme', label: 'Change theme', group: 'Settings', items: [{ id: 'light', label: 'Light', onSelect: () => window.__log.push('light') }, { id: 'dark', label: 'Dark', onSelect: () => window.__log.push('dark') }] }] });
    for (const dir of ['ltr', 'rtl']) {
      await render(CMD, dir); const d = 'command menu ' + dir + ': ';
      await focus('[role=combobox]');
      assert.ok((await activeText()).startsWith('Create collection'), d + 'the first command is active');
      await press('ArrowUp'); assert.ok((await activeText()).startsWith('Change theme'), d + 'Arrow Up wraps from the first command to the last');
      await press('ArrowDown'); assert.ok((await activeText()).startsWith('Create collection'), d + 'Arrow Down wraps from the last command to the first');
      await press('ArrowDown'); await press('Enter');
      assert.deepEqual(await log(), ['upload'], d + 'Enter runs the active command');
      await press('ArrowDown'); assert.ok((await activeText()).startsWith('Export report'), d + 'a disabled command can be active');
      await press('Enter'); assert.deepEqual(await log(), ['upload'], d + 'Enter does not run a disabled command');
      await page.keyboard.type('the'); await wait(200);
      assert.ok((await activeText()).startsWith('Change theme'), d + 'typing filters to the matching command');
      await press('Escape'); assert.equal((await at()).value, '', d + 'Escape clears the typed text first');
      await page.keyboard.type('theme'); await wait(200); await press('Enter');
      assert.equal((await at()).value, '', d + 'a command with a page opens it: the field empties');
      assert.ok((await activeText()).startsWith('Light'), d + 'the page lists its commands');
      await press('Backspace'); assert.ok((await activeText()).startsWith('Create collection'), d + 'Backspace in the empty field goes back a page');
      await page.keyboard.type('theme'); await wait(200); await press('Enter'); await press('Escape');
      assert.ok((await activeText()).startsWith('Create collection'), d + 'Escape in the empty field goes back a page');
      assert.equal((await at()).role, 'combobox', d + 'the focus stays in the field');
    }

    // ───────── EntityPicker ─────────
    const PEOPLE = [{ value: 'mc', label: 'Maya Chen', description: 'maya@example.org' }, { value: 'mw', label: 'Mark Wells', description: 'mark@example.org' }, { value: 'jd', label: 'Jo Dean', description: 'jo@example.org' }];
    const PICK = (h, P, R) => { const App = () => { const v = R.useState(null); return h(P.EntityPicker, { kind: 'people', label: 'Owner', options: window.__people, value: v[0], onChange: (x) => { window.__log.push(x); v[1](x); } }); }; return h(App); };
    await page.evaluate((p) => { window.__people = p; }, PEOPLE);
    for (const dir of ['ltr', 'rtl']) {
      await render(PICK, dir); const d = 'entity picker ' + dir + ': ';
      await focus('[role=combobox]');
      assert.equal(await expanded(), 'true', d + 'the list opens on focus');
      await page.keyboard.type('ma'); await wait(250);
      assert.ok((await activeText()).includes('Maya Chen'), d + 'typing filters: the first match is active');
      await press('ArrowDown'); assert.ok((await activeText()).includes('Mark Wells'), d + 'Arrow Down moves the active option');
      await press('ArrowUp'); assert.ok((await activeText()).includes('Maya Chen'), d + 'Arrow Up moves it back');
      await press('Enter'); assert.deepEqual(await log(), ['mc'], d + 'Enter chooses the active option');
      assert.equal(await expanded(), 'false', d + 'a single choice closes the list');
      await press('ArrowDown'); assert.equal(await expanded(), 'true', d + 'Arrow Down opens it again');
      await press('Escape'); assert.equal(await expanded(), 'false', d + 'Escape closes it');
      assert.deepEqual(await log(), ['mc'], d + 'Escape chooses nothing');
    }
    const PICK_MANY = (h, P, R) => { const App = () => { const v = R.useState(['mc', 'mw']); return h(P.EntityPicker, { kind: 'people', multiple: true, label: 'Reviewers', options: window.__people, values: v[0], onChange: (x) => { window.__log.push(x.join(',')); v[1](x); } }); }; return h(App); };
    await render(PICK_MANY); await focus('[role=combobox]'); await press('Backspace');
    assert.deepEqual(await log(), ['mc'], 'entity picker multiple: Backspace in the empty field removes the last tag');

    // ───────── MillerColumns ─────────
    const TREE = [{ id: 'brand', label: 'Brand', children: [{ id: 'logos', label: 'Logos' }, { id: 'fonts', label: 'Fonts' }] },
      { id: 'events', label: 'Events', children: [{ id: 'easter', label: 'Easter' }] }, { id: 'archive', label: 'Archive' }];
    await page.evaluate((t) => { window.__tree = t; }, TREE);
    const MILLER = (h, P) => h(P.MillerColumns, { label: 'Assets', items: window.__tree, onOpen: (item) => window.__log.push('open ' + item.id) });
    for (const [dir, into, out] of [['ltr', 'ArrowRight', 'ArrowLeft'], ['rtl', 'ArrowLeft', 'ArrowRight']]) {
      await render(MILLER, dir); const d = 'miller ' + dir + ': ';
      assert.equal(await count('[role=listbox][tabindex="0"]'), 1, d + 'one column, one Tab stop');
      await focus('[role=listbox]');
      await press('ArrowDown'); assert.equal(await activeText(), 'Brand', d + 'Arrow Down chooses the first item');
      assert.equal(await count('[role=listbox]'), 2, d + 'choosing a parent lists its children in the next column');
      await press('End'); assert.equal(await activeText(), 'Archive', d + 'End chooses the last item');
      await press('Home'); assert.equal(await activeText(), 'Brand', d + 'Home chooses the first item');
      await press('e'); assert.equal(await activeText(), 'Events', d + 'typing a letter moves to the next item that starts with it');
      await press('Home'); await press(out); assert.equal(await activeText(), 'Brand', d + 'the arrow against the reading direction does nothing in the first column');
      await press(into);
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('[role=listbox]')].indexOf(document.activeElement)), 1, d + 'the arrow toward the reading end moves into the children');
      assert.equal(await activeText(), 'Logos', d + 'and chooses the first child');
      await press(out);
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('[role=listbox]')].indexOf(document.activeElement)), 0, d + 'the other arrow goes back to the parent column');
      await press('End'); await press('Enter');
      assert.deepEqual(await log(), ['open archive'], d + 'Enter opens a leaf');
    }

    // ───────── RowButton ─────────
    const ROW = (h, P) => h(P.RowButton, { id: 'row', onClick: () => window.__log.push('pressed') }, h('span', null, 'Easter collection'), h('span', null, '12 assets'));
    await render(ROW); await focus('#row');
    assert.equal((await at()).tag, 'button', 'row button: it is a native button with focus');
    await press('Enter'); await press('Space');
    assert.deepEqual(await log(), ['pressed', 'pressed'], 'row button: Enter and Space press it');

    // ───────── AssignControl ─────────
    const ASSIGN = (h, P, R) => { const App = () => { const v = R.useState('mc'); return h(P.AssignControl, { label: 'Assignee', people: window.__people, value: v[0], onChange: (x) => { window.__log.push(x); v[1](x); } }); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(ASSIGN, dir); const d = 'assign ' + dir + ': ';
      await focusNamed('button', 'Reassign'); await press('Enter');
      assert.equal((await at()).role, 'combobox', d + 'Reassign puts focus in the picker');
      await press('Escape'); await press('Escape');
      assert.equal((await at()).text, 'Reassign', d + 'Escape puts the row back with focus on Reassign');
      assert.deepEqual(await log(), [], d + 'Escape changes nothing');
      await press('Enter'); await page.keyboard.type('Mark'); await wait(250); await press('Enter');
      assert.deepEqual(await log(), ['mw'], d + 'choosing a person assigns them');
      assert.equal((await at()).text, 'Reassign', d + 'and focus returns to Reassign');
    }

    // ───────── ImageUpload and ImageCrop ─────────
    // a small two-color picture, so moving the crop changes the drawn result
    await page.evaluate(() => { const c = document.createElement('canvas'); c.width = 80; c.height = 40; const x = c.getContext('2d'); x.fillStyle = '#c00'; x.fillRect(0, 0, 40, 40); x.fillStyle = '#00c'; x.fillRect(40, 0, 40, 40); window.__pic = c.toDataURL('image/png'); });
    const UPLOAD = (h, P, R) => { const App = () => { const v = R.useState([{ id: 'a', url: window.__pic, name: 'a.png', size: 1200 }, { id: 'b', url: window.__pic, name: 'b.png', size: 1300 }]);
      return h(P.ImageUpload, { multiple: true, label: 'Photos', value: v[0], onChange: (x) => { window.__log.push(x.map((i) => i.id).join(',')); v[1](x); } }); }; return h(App); };
    await render(UPLOAD);
    await focusNamed('button', 'Remove a.png'); await press('Enter');
    assert.deepEqual(await log(), ['b'], 'image upload: Remove takes the image out');
    assert.equal((await at()).label, 'Remove b.png', 'image upload: focus moves to the next preview\'s Remove');
    await press('Enter');
    assert.equal((await at()).type, 'file', 'image upload: removing the last image moves focus to Choose (the file input)');
    const CROP = (h, P) => h(P.ImageCrop, { src: window.__pic, ratio: '1-1', onApply: () => window.__log.push('apply'), onCancel: () => window.__log.push('cancel') });
    for (const dir of ['ltr', 'rtl']) {
      await render(CROP, dir); const d = 'image crop ' + dir + ': ';
      const shown = () => page.evaluate(() => { const i = document.querySelector('.plx-image-crop__frame img'); return i ? i.getAttribute('src') : ''; });
      await focus('.plx-image-crop__frame'); await wait(300); const start = await shown();
      await press('Shift+ArrowLeft'); await wait(300);
      assert.notEqual(await shown(), start, d + 'an arrow key moves the picture in the frame');
      await press('Home'); await wait(300);
      assert.equal(await shown(), start, d + 'Home centers it again');
    }

    // ───────── RenameAction ─────────
    const RENAME = (h, P) => h(P.RenameAction, { label: 'Name', value: 'Easter.png', extension: true, names: ['Advent.png'], onRename: (n) => window.__log.push(n) });
    for (const dir of ['ltr', 'rtl']) {
      await render(RENAME, dir); const d = 'rename inline ' + dir + ': ';
      await focus('.plx-inline-edit__read'); await press('F2');
      assert.equal((await at()).tag, 'input', d + 'F2 opens the field');
      await page.keyboard.type('Pascha'); await press('Escape');
      assert.deepEqual(await log(), [], d + 'Escape saves nothing');
      assert.equal(await count('.plx-inline-edit__read'), 1, d + 'Escape puts the name back');
      await focus('.plx-inline-edit__read'); await press('Enter');
      assert.equal((await at()).tag, 'input', d + 'Enter opens the field too');
      await page.keyboard.type('Pascha'); await press('Enter');
      assert.deepEqual(await log(), ['Pascha.png'], d + 'Enter saves; the extension stays as it is');
    }
    const RENAME_DIALOG = (h, P) => h(P.RenameAction, { variant: 'dialog', value: 'Brand kit', onRename: (n) => window.__log.push(n) });
    await render(RENAME_DIALOG); await focusNamed('button', 'Rename…'); await press('Enter');
    assert.ok(await inside('[role=dialog]'), 'rename dialog: the button opens the dialog with focus inside');
    await press('Escape');
    assert.equal(await count('[role=dialog]'), 0, 'rename dialog: Escape closes it');
    assert.equal((await at()).text, 'Rename…', 'rename dialog: focus returns to the button');
    assert.deepEqual(await log(), [], 'rename dialog: Escape saves nothing');

    // ───────── SessionTimeout ─────────
    const WARN = (h, P) => h(P.SessionTimeout, { state: 'warning', remaining: 90, idleMinutes: 30, onStay: () => window.__log.push('stay'), onSignOut: () => window.__log.push('out') });
    await render(WARN);
    assert.equal((await at()).text, 'Stay signed in', 'session timeout: focus starts on Stay signed in');
    await press('Escape'); assert.deepEqual(await log(), ['stay'], 'session timeout: Escape stays signed in');
    const OUT = (h, P) => h(P.SessionTimeout, { state: 'signed-out', idleMinutes: 30, onSignIn: () => window.__log.push('in') });
    await render(OUT); await press('Escape');
    assert.equal(await count('[role=alertdialog], [role=dialog]'), 1, 'session timeout: the signed-out message cannot be dismissed with Escape');
    assert.ok(await focusNamed('button', 'Sign in again'), 'session timeout: Sign in again is there'); await press('Enter');
    assert.deepEqual(await log(), ['in'], 'session timeout: Enter on Sign in again signs in');

    // ───────── DeleteFlow ─────────
    const DEL = (variant) => '(h, P) => h(P.DeleteFlow, { variant: "' + variant + '", items: [{ id: "c1", label: "Easter" }], noun: "category", onDelete: (items) => window.__log.push("deleted " + items.length), trigger: h(P.Button, { id: "del" }, "Delete") })';
    for (const dir of ['ltr', 'rtl']) {
      await render(DEL('confirm'), dir); const d = 'delete confirm ' + dir + ': ';
      await focus('#del'); await press('Enter');
      assert.equal((await at()).text, 'Cancel', d + 'focus starts on Cancel');
      await press('Escape');
      assert.equal(await count('[role=alertdialog]'), 0, d + 'Escape closes the dialog');
      assert.deepEqual(await log(), [], d + 'Escape deletes nothing');
      assert.equal((await at()).id, 'del', d + 'focus returns to the trigger');
    }
    await render(DEL('type')); await focus('#del'); await press('Enter');
    assert.equal((await at()).tag, 'input', 'delete type: focus starts in the field');
    await page.keyboard.type('Eastr');
    await page.evaluate(() => { const b = [...document.querySelectorAll('[role=alertdialog] button')].find((x) => x.textContent.trim() === 'Delete'); b.focus(); }); await press('Enter');
    assert.equal((await at()).tag, 'input', 'delete type: a mismatch keeps the dialog open with focus in the field');
    assert.deepEqual(await log(), [], 'delete type: a mismatch deletes nothing');

    // ───────── DraftState ─────────
    const DRAFT = (h, P) => h(P.DraftState, { version: '3', onResume: () => window.__log.push('resume'), onDiscard: () => window.__log.push('discard') });
    await render(DRAFT); await focusNamed('button', 'Discard draft'); await press('Enter');
    assert.equal((await at()).text, 'Keep draft', 'draft: Discard draft asks first, with focus on Keep draft');
    await press('Escape');
    assert.deepEqual(await log(), [], 'draft: Escape keeps the draft');
    await focusNamed('button', 'Discard draft'); await press('Enter');
    await page.evaluate(() => { const b = [...document.querySelectorAll('[role=alertdialog] button')].find((x) => x.textContent.trim() === 'Discard draft'); b.focus(); }); await press('Enter');
    assert.deepEqual(await log(), ['discard'], 'draft: Discard draft in the question discards');

    // ───────── QueryBuilder ─────────
    const QUERY = (h, P, R) => { const App = () => { const v = R.useState({ join: 'and', items: [] }); return h(P.QueryBuilder, { label: 'Audience', fields: [{ value: 'name', label: 'Name', kind: 'text' }, { value: 'size', label: 'Size', kind: 'number' }], value: v[0], onChange: (x) => { window.__log.push(x.items.length); v[1](x); } }); }; return h(App); };
    await render(QUERY);
    await focus('[data-plx-add="root"] button'); await press('Enter');
    assert.equal((await at()).tag, 'select', 'query builder: Add rule moves focus to the new rule\'s field');
    assert.ok(await inside('[data-plx-rule]'), 'query builder: the field is the new rule\'s');
    await focusNamed('button', 'Rule 1: Remove rule'); await press('Enter');
    assert.equal(await count('[data-plx-rule]'), 0, 'query builder: Remove rule removes it');
    assert.ok(await inside('[data-plx-add="root"]'), 'query builder: removing moves focus to Add rule');

    // ───────── FilterBar ─────────
    const FILTERS = (h, P, R) => { const App = () => { const t = R.useState([]), s = R.useState(null);
      return h(P.FilterBar, { label: 'Filters', onChange: (id, v) => { window.__log.push(id + '=' + [].concat(v).join(',')); (id === 'type' ? t : s)[1](v); }, onClearAll: () => window.__log.push('clear'),
        filters: [{ id: 'type', label: 'Type', multiple: true, value: t[0], options: [{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }] },
          { id: 'status', label: 'Status', value: s[0], options: [{ value: 'draft', label: 'Draft' }, { value: 'live', label: 'Live' }] }] }); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(FILTERS, dir); const d = 'filter bar ' + dir + ': ';
      await focusNamed('button', 'Type'); await press('Enter');
      assert.equal(await count('[role=menu]'), 1, d + 'Enter on a filter opens its menu');
      await press('Enter');
      assert.deepEqual(await log(), ['type=png'], d + 'Enter on a choice sets it');
      assert.equal(await count('[role=menu]'), 1, d + 'a multiple filter stays open while choosing');
      await press('Escape'); assert.equal(await count('[role=menu]'), 0, d + 'Escape closes it');
      assert.ok((await at()).text.startsWith('Type'), d + 'focus returns to the filter');
      await focusNamed('button', 'Status'); await press('ArrowDown'); await press('ArrowDown'); await press('Enter');
      assert.deepEqual(await log(), ['type=png', 'status=live'], d + 'a single filter takes the choice');
      assert.equal(await count('[role=menu]'), 0, d + 'and closes');
      assert.ok(await focusNamed('button', 'Clear all'), d + 'Clear all appears when a filter is set'); await press('Enter');
      assert.equal((await log()).slice(-1)[0], 'clear', d + 'Enter on Clear all clears');
    }

    // ───────── SearchWorkspace ─────────
    const SEARCH = (h, P, R) => { const App = () => { const q = R.useState(''), f = R.useState(['png']);
      return h(P.SearchWorkspace, { title: 'Search', query: q[0], onQueryChange: (x) => { window.__log.push('q:' + x); q[1](x); }, count: 3, noun: 'asset',
        filters: [{ id: 'type', label: 'Type', multiple: true, value: f[0], options: [{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }] }],
        onFilterChange: (id, v) => { window.__log.push(id + '=' + v.join(',')); f[1](v); }, onClearAll: () => window.__log.push('clear') }, h('p', null, 'Results')); }; return h(App); };
    await render(SEARCH);
    await focus('input[type=search], [role=searchbox]'); await page.keyboard.type('ea'); await wait(200);
    assert.equal((await log()).slice(-1)[0], 'q:ea', 'search workspace: typing in the search field searches');
    await focusNamed('button', 'Remove Type: PNG'); await press('Enter');
    assert.equal((await log()).slice(-1)[0], 'type=', 'search workspace: Enter on a chip\'s remove button removes its filter');

    // ───────── ProductOptions ─────────
    const PRODUCT = (h, P, R) => { const App = () => { const v = R.useState({ size: 'M', color: 'navy' });
      return h(P.ProductOptions, { product: 'Choir robe', value: v[0], onChange: (next, name) => { window.__log.push(name + '=' + next[name]); v[1](next); },
        options: [{ name: 'size', label: 'Size', values: [{ value: 'S' }, { value: 'M' }, { value: 'L' }, { value: 'XL', available: false }] },
          { name: 'color', label: 'Color', kind: 'swatches', values: [{ value: 'navy', label: 'Navy', category: 'navy' }, { value: 'maroon', label: 'Maroon', category: 'maroon', available: false }, { value: 'olive', label: 'Olive', category: 'olive' }] }] }); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(PRODUCT, dir); const d = 'product options ' + dir + ': ';
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('input[type=radio]')].filter((r) => r.tabIndex >= 0 && !r.disabled).length > 0), true, d + 'the sizes are radios');
      await focus('input[type=radio]:checked');
      await press('ArrowDown'); assert.equal((await log()).slice(-1)[0], 'size=L', d + 'Arrow Down chooses the next size');
      await press('ArrowDown'); assert.equal((await log()).slice(-1)[0], 'size=S', d + 'it skips the sold-out size and wraps');
      await focusNamed('button', 'Maroon, out of stock'); await press('Enter');
      assert.ok(!(await log()).includes('color=maroon'), d + 'a sold-out swatch does nothing');
      assert.equal((await at()).label, 'Maroon, out of stock', d + 'it stays focusable and says it is sold out');
      await focusNamed('button', 'Olive'); await press('Enter');
      assert.equal((await log()).slice(-1)[0], 'color=olive', d + 'Enter on a swatch chooses its color');
    }

    // ───────── APG gaps closed in issue 706: Combobox and Menu ─────────
    const COMBO = (h, P, R) => { const App = () => { const v = R.useState(''); return h(P.Combobox, { label: 'Owner', value: v[0], onChange: (x) => { window.__log.push(x); v[1](x); },
      options: [{ value: 'mc', label: 'Maya Chen' }, { value: 'mw', label: 'Mark Wells' }, { value: 'jd', label: 'Jo Dean' }] }); }; return h(App); };
    for (const dir of ['ltr', 'rtl']) {
      await render(COMBO, dir); const d = 'combobox gaps ' + dir + ': ';
      await focus('[role=combobox]'); await press('Escape');
      assert.equal(await expanded(), 'false', d + 'the list is closed');
      await press('ArrowUp');
      assert.equal(await expanded(), 'true', d + 'Arrow Up on a closed list opens it');
      assert.equal(await activeText(), 'Jo Dean', d + 'Arrow Up on a closed list opens it on the last option');
      await press('Escape'); await press('Alt+ArrowDown');
      assert.equal(await expanded(), 'true', d + 'Alt+Arrow Down opens the list');
      assert.equal(await activeText(), 'Maya Chen', d + 'on the first option');
      await press('Alt+ArrowDown'); assert.equal(await activeText(), 'Maya Chen', d + 'Alt+Arrow Down on an open list moves nothing');
      await press('ArrowDown'); await press('Enter');
      assert.deepEqual(await log(), ['mw'], d + 'the choice is made');
      await press('Escape');
      assert.deepEqual(await log(), ['mw'], d + 'Escape on a closed list keeps the value (intentional, Combobox header)');
      assert.equal((await at()).value, 'Mark Wells', d + 'the field still shows it');
    }
    const MENU = (h, P) => h(P.Menu, { trigger: h(P.Button, { id: 'trigger' }, 'Actions'), label: 'Actions' },
      h(P.MenuItem, null, 'Rename'), h(P.MenuItem, null, 'Duplicate'), h(P.MenuItem, null, 'Delete'), h(P.MenuItem, null, 'Move to'));
    for (const dir of ['ltr', 'rtl']) {
      await render(MENU, dir); const d = 'menu type-ahead ' + dir + ': ';
      await focus('#trigger'); await press('Enter');
      await press('d'); assert.equal((await at()).text, 'Duplicate', d + 'a letter moves to the item that starts with it');
      await press('d'); assert.equal((await at()).text, 'Delete', d + 'the same letter again moves to the next one');
      await press('d'); assert.equal((await at()).text, 'Duplicate', d + 'and wraps');
      await press('m'); assert.equal((await at()).text, 'Move to', d + 'another letter moves to its item');
      await press('x'); assert.equal((await at()).text, 'Move to', d + 'a letter no item starts with moves nothing');
      await press('Escape');
    }
    // a sub menu: a letter no sub item starts with stays in the sub menu, even when a parent item starts with it
    const SUB = (h, P) => h(P.Menu, { trigger: h(P.Button, { id: 'trigger' }, 'Actions'), label: 'Actions' },
      h(P.MenuItem, null, 'Rename'), h(P.MenuSub, { label: 'Share' }, h(P.MenuItem, null, 'Email'), h(P.MenuItem, null, 'Link')), h(P.MenuItem, null, 'Delete'));
    for (const dir of ['ltr', 'rtl']) {
      await render(SUB, dir); const d = 'menu sub type-ahead ' + dir + ': ';
      await focus('#trigger'); await press('Enter');
      await press('s'); assert.equal((await at()).text, 'Share', d + 'a letter reaches the sub menu item');
      await press(dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
      assert.equal((await at()).text, 'Email', d + 'the arrow toward the reading end opens the sub menu on its first item');
      await press('l'); assert.equal((await at()).text, 'Link', d + 'type-ahead works inside the sub menu');
      await press('d'); assert.equal((await at()).text, 'Link', d + 'a letter no sub item starts with keeps focus in the sub menu');
      assert.equal(await inside('.plx-menu-sub__list'), true, d + 'focus stays inside the sub menu');
      assert.equal(await page.evaluate(() => document.querySelector('.plx-menu-sub__item').getAttribute('aria-expanded')), 'true', d + 'the sub menu stays open');
      await press('Escape'); await press('Escape');
    }

    assert.deepEqual(errors, [], 'no script errors');
    console.log('keyboard-706: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
