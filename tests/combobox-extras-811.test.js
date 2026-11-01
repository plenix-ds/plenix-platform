// Plenix · tests/combobox-extras-811.test.js: the Combobox's Clear button, option icon and description, and the action under "No matches" (issue 811).
//   node tests/combobox-extras-811.test.js   → COMBOBOX_EXTRAS_811_OK       (opens a headless browser; run by the owner's test run, never by an agent)
// Cases, in left to right and right to left: clearable shows the button only while there is text or a chosen value; it empties the text and
//   the value (onChange '' for one choice, [] for several) and returns focus to the field; it is not there when disabled or read-only; an
//   option with an icon and a description draws both (the icon hidden from assistive technology; the description is read with the label)
//   and the description is searched; emptyAction shows under "No matches" as an option the arrow keys reach, Enter runs onSelect with the typed
//   text and closes the list, a click does the same; with options that match, there is no action; the words are the catalog's (Clear, Arabic مسح).
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9811, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 900, height: 700 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const mount = async (props) => {
        await page.evaluate(async (dir, props) => {
          document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
          window.__root && window.__root.unmount(); window.__log = []; document.querySelector('main').innerHTML = '<div id="c" style="padding:20px"></div>';
          const h = React.createElement, opts = [
            { value: 'a', label: 'Jordan Avery', description: 'Design lead', icon: 'settings-users' }, { value: 'b', label: 'Rachel Ng', description: 'Treasurer', icon: 'settings-users' }, { value: 'c', label: 'Ravi Anand' }];
          const App = () => {
            const [val, setVal] = React.useState(props.multiple ? ['a'] : (props.start || ''));
            return h(Plenix.Combobox, Object.assign({ label: 'Owner', options: opts }, props.rest || {}, props.multiple ? { multiple: true, values: val, onChange: (v) => { window.__log.push('change ' + JSON.stringify(v)); setVal(v); } } : { value: val, onChange: (v) => { window.__log.push('change ' + JSON.stringify(v)); setVal(v); } },
              props.action ? { emptyAction: { label: 'Add new person', onSelect: (t) => window.__log.push('action ' + t) } } : {}));
          };
          window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(App)); await new Promise((r) => setTimeout(r, 500));
        }, dir, props);
      };
      const T = dir + ': ';
      const clearBtn = () => page.$('.plx-combobox__clear');
      await check(T + 'no Clear button unless clearable', async () => { await mount({}); assert.equal(await clearBtn(), null); });
      await check(T + 'clearable shows the button only with text or a value', async () => {
        await mount({ rest: { clearable: true } }); assert.equal(await clearBtn(), null, 'empty'); await page.focus('.plx-combobox__input'); await page.keyboard.type('Ra'); await wait(150);
        assert.ok(await clearBtn(), 'with text');
        await mount({ rest: { clearable: true }, start: 'a' }); assert.ok(await clearBtn(), 'with a value');
      });
      await check(T + 'Clear empties a single value and returns focus to the field', async () => {
        await mount({ rest: { clearable: true }, start: 'a' }); await (await clearBtn()).click(); await wait(200);
        assert.deepEqual(await page.evaluate(() => window.__log), ['change ""']);
        assert.ok(await page.evaluate(() => document.activeElement === document.querySelector('.plx-combobox__input')), 'focus');
        assert.equal(await clearBtn(), null, 'the button leaves with nothing to clear');
      });
      await check(T + 'Clear empties several values and the typed text', async () => {
        await mount({ multiple: true, rest: { clearable: true } }); await page.focus('.plx-combobox__input'); await page.keyboard.type('Ra'); await wait(150); await (await clearBtn()).click(); await wait(200);
        assert.deepEqual(await page.evaluate(() => window.__log), ['change []']); assert.equal(await page.evaluate(() => document.querySelector('.plx-combobox__input').value), '');
      });
      await check(T + 'Clear is not in a disabled or read-only field', async () => {
        await mount({ rest: { clearable: true, disabled: true }, start: 'a' }); assert.equal(await clearBtn(), null, 'disabled');
        await mount({ rest: { clearable: true, readOnly: true }, start: 'a' }); assert.equal(await clearBtn(), null, 'read-only');
      });
      await check(T + 'Clear is named from the catalog', async () => {
        await mount({ rest: { clearable: true }, start: 'a' }); const name = await page.evaluate(() => document.querySelector('.plx-combobox__clear').getAttribute('aria-label'));
        assert.equal(name, dir === 'rtl' ? 'مسح' : 'Clear');
      });
      await check(T + 'an option draws its icon and description', async () => {
        await mount({}); await page.focus('.plx-combobox__input'); await wait(300);
        const r = await page.evaluate(() => { const o = document.querySelector('.plx-combobox__option'); return { icon: !!o.querySelector('.plx-combobox__option-icon svg, .plx-combobox__option-icon [class*=icon]'), hidden: o.querySelector('.plx-combobox__option-icon').getAttribute('aria-hidden'), desc: o.querySelector('.plx-combobox__option-description').textContent, text: o.textContent, plain: [...document.querySelectorAll('.plx-combobox__option')][2].querySelector('.plx-combobox__option-icon') }; });
        assert.ok(r.icon, 'icon'); assert.equal(r.hidden, 'true'); assert.equal(r.desc, 'Design lead'); assert.ok(/Jordan Avery/.test(r.text) && /Design lead/.test(r.text)); assert.equal(r.plain, null, 'an option without them is as before');
      });
      await check(T + 'the description is searched', async () => {
        await mount({}); await page.focus('.plx-combobox__input'); await page.keyboard.type('Treasurer'); await wait(200);
        assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('.plx-combobox__option-label')].map((e) => e.textContent)), ['Rachel Ng']);
      });
      await check(T + 'with no match the action shows under the empty text, reached by the keys', async () => {
        await mount({ action: true }); await page.focus('.plx-combobox__input'); await page.keyboard.type('Zed'); await wait(200);
        const r = await page.evaluate(() => ({ empty: document.querySelector('.plx-combobox__empty').textContent, opts: [...document.querySelectorAll('[role=option]')].map((e) => e.textContent), active: document.querySelector('.plx-combobox__input').getAttribute('aria-activedescendant') === document.querySelector('.plx-combobox__action').id }));
        assert.ok(r.empty.length > 0); assert.deepEqual(r.opts, ['Add new person']); assert.ok(r.active, 'the action is the active option');
        await page.keyboard.press('Enter'); await wait(200);
        assert.deepEqual(await page.evaluate(() => window.__log), ['action Zed']); assert.equal(await page.$('.plx-combobox__list'), null, 'the list closes');
      });
      await check(T + 'a click on the action runs it too', async () => {
        await mount({ action: true }); await page.focus('.plx-combobox__input'); await page.keyboard.type('Zed'); await wait(200); await page.click('.plx-combobox__action'); await wait(200);
        assert.deepEqual(await page.evaluate(() => window.__log), ['action Zed']);
      });
      await check(T + 'with matches there is no action', async () => {
        await mount({ action: true }); await page.focus('.plx-combobox__input'); await page.keyboard.type('Ra'); await wait(200); assert.equal(await page.$('.plx-combobox__action'), null);
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'COMBOBOX_EXTRAS_811_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
