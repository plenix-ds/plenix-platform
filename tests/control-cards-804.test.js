/* Plenix tests · control cards (issue 804; idea 4 of #767, owner yes in #769): ChoiceList with a radio, a checkbox or a
   switch inside each clickable card.
   Summary (the browser):
     each kind: a fieldset named by its legend; one native control per card (radio, checkbox, or a checkbox with
       role="switch"), named by its card's label alone and described by the card's description (never read twice)
     a click anywhere on a card (its description, its label) changes the control; a disabled card ignores it
     keys: Space toggles a checkbox or a switch card and the arrows do nothing there; in a radio group the arrows move the
       choice and skip a disabled card
     focus: the card shows the focus outline for every kind; inside a switch card the switch's own ring is off
     a disabled card is dimmed and has no hover fill
     right to left: the switch at the card's inline end (the left), the radio and the checkbox at its start (the right)
     no script errors
   Usage: node tests/control-cards-804.test.js   → CONTROL_CARDS_804_OK */
const assert = require('assert/strict');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

(async () => {
  const PORT = +process.env.TEST_PORT || 9685, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1100, height: 700 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const pause = (ms = 120) => new Promise((r) => setTimeout(r, ms));

    const draw = (dir) => page.evaluate(async (dir) => {
      const h = React.createElement, P = window.Plenix;
      document.documentElement.setAttribute('dir', dir);
      window.__root && window.__root.unmount();
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      window.__log = [];
      const opts = (a, b, c) => [{ value: 'a', label: a, description: a + ' detail' }, { value: 'b', label: b, description: b + ' detail' }, { value: 'c', label: c, description: c + ' detail', disabled: true }];
      function App() {
        const [r, setR] = React.useState('b'), [cb, setCb] = React.useState(['b']), [sw, setSw] = React.useState(['a']);
        const log = (k, set) => (v) => { window.__log.push([k, v]); set(v); };
        return h('div', { dir },
          h('div', { id: 'radio' }, h(P.ChoiceList, { legend: 'Plan', value: r, onChange: log('radio', setR), options: opts('Solo', 'Team', 'Parish') })),
          h('div', { id: 'checkbox' }, h(P.ChoiceList, { control: 'checkbox', legend: 'Days', values: cb, onChange: log('checkbox', setCb), options: opts('Saturday', 'Sunday', 'Wednesday') })),
          h('div', { id: 'switch' }, h(P.ChoiceList, { control: 'switch', legend: 'Notifications', values: sw, onChange: log('switch', setSw), options: opts('Email', 'Texts', 'Alerts') })));
      }
      window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(App));
      await new Promise((res) => setTimeout(res, 400));
    }, dir);
    const log = () => page.evaluate(() => window.__log.splice(0));
    const card = (kind, i) => '#' + kind + ' label.plx-choice:nth-of-type(' + i + ')';

    for (const dir of ['ltr', 'rtl']) {
      await draw(dir);
      // structure
      const s = await page.evaluate(() => ['radio', 'checkbox', 'switch'].map((k) => {
        const fs = document.querySelector('#' + k + ' fieldset'), inputs = [...fs.querySelectorAll('input')];
        return { legend: fs.querySelector('legend').textContent, roles: inputs.map((i) => i.getAttribute('role') || i.type), inCard: inputs.every((i) => i.closest('label.plx-choice')),
          perCard: [...fs.querySelectorAll('label.plx-choice')].map((l) => l.querySelectorAll('input').length),
          names: inputs.map((i) => { const l = document.getElementById(i.getAttribute('aria-labelledby')); return l && l.classList.contains('plx-choice__label') ? l.textContent : null; }),
          described: inputs.every((i) => { const d = document.getElementById(i.getAttribute('aria-describedby')); return d && d.textContent.endsWith(' detail'); }) };
      }));
      assert.deepEqual(s.map((x) => x.legend), ['Plan', 'Days', 'Notifications'], dir + ': each group is named by its legend');
      assert.deepEqual(s.map((x) => x.roles[0]), ['radio', 'checkbox', 'switch'], dir + ': the native control of each kind (a switch is a checkbox with role="switch")');
      assert.ok(s.every((x) => x.inCard && x.perCard.every((n) => n === 1)), dir + ': one control per card, inside the card\'s label');
      assert.ok(s.every((x) => x.described), dir + ': each control is described by its card\'s description');
      assert.deepEqual(s.map((x) => x.names), [['Solo', 'Team', 'Parish'], ['Saturday', 'Sunday', 'Wednesday'], ['Email', 'Texts', 'Alerts']],
        dir + ': each control is labelled by its card\'s label alone (the description is not part of the name)');
      // the accessibility tree: the name is the label, the description is the hint, and neither repeats the other
      const ax = [];
      for (const kind of ['radio', 'checkbox', 'switch']) {
        const node = await page.accessibility.snapshot({ root: await page.$(card(kind, 1) + ' input'), interestingOnly: false });
        ax.push({ role: node.role, name: node.name, description: node.description });
      }
      assert.deepEqual(ax, [{ role: 'radio', name: 'Solo', description: 'Solo detail' }, { role: 'checkbox', name: 'Saturday', description: 'Saturday detail' },
        { role: 'switch', name: 'Email', description: 'Email detail' }], dir + ': the accessible name excludes the description, which is read once, as the hint');

      // clicks anywhere on a card
      await page.click(card('checkbox', 1) + ' .plx-choice__description'); await pause();
      await page.click(card('switch', 2) + ' .plx-choice__label'); await pause();
      await page.click(card('radio', 1) + ' .plx-choice__description'); await pause();
      await page.click(card('switch', 3) + ' .plx-choice__label'); await pause();   // disabled: nothing
      assert.deepEqual(await log(), [['checkbox', ['b', 'a']], ['switch', ['a', 'b']], ['radio', 'a']], dir + ': a click on a card\'s text changes its control; a disabled card ignores it');

      // keys
      await page.focus(card('checkbox', 1) + ' input'); await page.keyboard.press('Space'); await pause();
      await page.keyboard.press('ArrowDown'); await pause();
      const stays = await page.evaluate(() => document.activeElement.closest('label').querySelector('.plx-choice__label').textContent);
      await page.focus(card('switch', 1) + ' input'); await page.keyboard.press('Space'); await pause();
      assert.deepEqual(await log(), [['checkbox', ['b']], ['switch', ['b']]], dir + ': Space toggles a checkbox card and a switch card');
      assert.equal(stays, 'Saturday', dir + ': the arrow keys do not move between checkbox cards');
      const switchState = await page.$eval(card('switch', 1) + ' input', (i) => [i.getAttribute('role'), i.checked]);
      assert.deepEqual(switchState, ['switch', false], dir + ': the switch is off after Space (its state is the native checked, announced on or off)');
      await page.focus('#radio input:checked'); await page.keyboard.press('ArrowDown'); await pause();
      await page.keyboard.press('ArrowDown'); await pause();   // past Team: Parish is disabled, so the choice wraps to Solo
      assert.deepEqual(await log(), [['radio', 'b'], ['radio', 'a']], dir + ': in a radio group the arrows move the choice and skip a disabled card');

      // focus: the card's outline for every kind, no second ring on the switch
      const rings = [];
      for (const kind of ['radio', 'checkbox', 'switch']) {
        const sel = kind === 'radio' ? '#radio input:checked' : card(kind, 1) + ' input';
        await page.focus(sel); await page.keyboard.press('Tab'); await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift'); await pause();
        rings.push(await page.evaluate(() => { const a = document.activeElement, c = a.closest('.plx-choice'), t = c.querySelector('.plx-switch__track');
          return { card: getComputedStyle(c).outlineStyle, track: t ? getComputedStyle(t).outlineWidth : null, visible: a.matches(':focus-visible') }; }));
      }
      assert.ok(rings.every((r) => r.visible && r.card === 'solid'), dir + ': the focused card shows the focus outline for every kind; got ' + JSON.stringify(rings));
      assert.equal(rings[2].track, '0px', dir + ': inside a switch card the switch\'s own ring is off (one focus mark)');

      // disabled: dimmed, no hover fill
      const dim = await page.evaluate(() => { const c = document.querySelector('#radio label.plx-choice.is-disabled'), n = document.querySelector('#radio label.plx-choice:not(.is-disabled):not(.is-selected)');
        return { dimmed: +getComputedStyle(c).opacity < 1, cursor: getComputedStyle(c).cursor, rest: getComputedStyle(n).backgroundColor }; });
      await page.hover(card('radio', 3)); await pause();
      const hovered = await page.$eval(card('radio', 3), (c) => getComputedStyle(c).backgroundColor);
      assert.ok(dim.dimmed && dim.cursor === 'not-allowed', dir + ': a disabled card is dimmed with the not-allowed cursor');
      assert.equal(hovered, dim.rest, dir + ': a disabled card has no hover fill');

      // sides
      const sides = await page.evaluate(() => {
        const sw = document.querySelector('#switch label.plx-choice'), swr = sw.getBoundingClientRect(), track = sw.querySelector('.plx-switch__track').getBoundingClientRect();
        const rd = document.querySelector('#radio label.plx-choice'), rdr = rd.getBoundingClientRect(), dot = rd.querySelector('input').getBoundingClientRect();
        return { switchNearLeft: track.left - swr.left < swr.right - track.right, radioNearLeft: dot.left - rdr.left < rdr.right - dot.right };
      });
      if (dir === 'ltr') assert.deepEqual(sides, { switchNearLeft: false, radioNearLeft: true }, 'left to right: the switch at the card\'s end (right), the radio at its start (left)');
      else assert.deepEqual(sides, { switchNearLeft: true, radioNearLeft: false }, 'right to left: the switch at the card\'s end (left), the radio at its start (right)');
    }

    assert.deepEqual(errors, [], 'no script errors');
    console.log('CONTROL_CARDS_804_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
