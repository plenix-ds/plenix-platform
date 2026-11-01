/* Plenix tests · DatePicker and TimePicker follow the app time zone (issue 813; Semi study #767, C): with LocaleProvider's
   timeZone, both pickers show the value in that zone and save the value chosen there; without one, they work as before.
   Summary:
     Node (utils/zone.ts, no browser): a wall-clock time to its moment and back, a time skipped when the clocks go forward
       (02:30 reads as 03:30), a time repeated when they go back (the earlier moment), midnight, today in a zone 25 hours
       from another, a zone the browser does not know
     the browser (the computer's zone emulated, never the app's):
       DatePicker date-time in Tokyo on a Los Angeles computer: the moment's date and time in Tokyo, the zone's name, a time
         and a day chosen saved as the moment in Tokyo (UTC); the calendar's today is Tokyo's (Pago Pago vs Kiritimati: their
         dates always differ); a preset takes the zone's today
       New York around its clock changes (on a Tokyo computer): EST/EDT named for the value, 02:30 on the spring day saves
         07:30Z, 01:30 on the autumn day saves the earlier moment
       TimePicker list and segments: a moment shows its time in the zone, a typed or stepped time saves the moment on the
         same day there; an "HH:MM" value stays "HH:MM"
       no time zone: DatePicker and TimePicker give exactly what they gave before (wall clock, "HH:MM")
       keyboard: Alt+Arrow Down opens the calendar, the arrows move, Enter chooses, in the zone
       Arabic (ar-EG, Cairo) right to left: Arabic-Indic digits, the month and zone names as the browser's Intl names them in ar-EG, the calendar button at the
         inline end; left to right the same at the other end
   Usage: node tests/picker-timezone-813.test.js   → PICKER_TIMEZONE_813_OK */
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const Babel = require('@babel/standalone');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.join(__dirname, '..');

// utils/zone.ts as CommonJS (it imports nothing)
function loadZone() {
  const file = path.join(ROOT, 'platform', 'utils', 'zone.ts');
  const code = Babel.transform(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['transform-modules-commonjs'], presets: ['typescript'], filename: file }).code;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', code)(mod, mod.exports, require);
  return mod.exports;
}

(async () => {
  // ── Node: the zone helpers
  const Z = loadZone();
  const NY = 'America/New_York';
  assert.equal(Z.instantIso('2026-01-15', '09:00', NY), '2026-01-15T14:00:00.000Z', 'New York in winter is UTC-5');
  assert.equal(Z.instantIso('2026-07-15', '09:00', NY), '2026-07-15T13:00:00.000Z', 'New York in summer is UTC-4');
  assert.equal(Z.instantIso('2026-03-08', '02:30', NY), '2026-03-08T07:30:00.000Z', 'a skipped time (spring forward) takes the offset before the change');
  assert.deepEqual(Z.wallOf(Date.parse('2026-03-08T07:30:00.000Z'), NY).time, '03:30', 'and so reads 03:30 after the change');
  assert.equal(Z.instantIso('2026-11-01', '01:30', NY), '2026-11-01T05:30:00.000Z', 'a repeated time (fall back) is the earlier moment');
  assert.equal(Z.instantIso('2026-07-01', '00:00', NY), '2026-07-01T04:00:00.000Z', 'midnight lands on its own day');
  assert.deepEqual([Z.wallOf(Date.parse('2026-07-01T03:30:00Z'), NY).date, Z.wallOf(Date.parse('2026-07-01T03:30:00Z'), NY).time], ['2026-06-30', '23:30'], 'a moment after UTC midnight is still the evening before in New York');
  const at = Date.parse('2026-07-01T12:00:00Z');
  assert.notEqual(Z.todayIn('Pacific/Kiritimati', at), Z.todayIn('Pacific/Pago_Pago', at), 'today in two zones 25 hours apart is two dates');
  assert.equal(Z.validZone('Mars/Base'), undefined, 'a zone the browser does not know is no zone');
  assert.deepEqual([Z.isInstant('2026-03-08T07:30:00.000Z'), Z.isInstant('2026-03-08T09:30+02:00'), Z.isInstant('2026-03-08T09:30'), Z.isInstant('2026-03-08')], [true, true, false, false], 'a moment ends in Z or an offset');

  // ── the browser
  const PORT = +process.env.TEST_PORT || 9681, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1100, height: 900 });
    // draws the cases on a computer in `computer`; each case is a picker whose onChange values go to window.__log[id]
    const open = async (computer) => {
      await page.emulateTimezone(computer);
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    };
    const draw = (cases) => page.evaluate(async (cases) => {
      const h = React.createElement, P = window.Plenix;
      window.__log = {};
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      const Case = ({ c }) => {
        const [v, setV] = React.useState(c.value);
        const onChange = (x) => { (window.__log[c.id] = window.__log[c.id] || []).push(x); setV(x); };
        const Comp = c.kind === 'time' ? P.TimePicker : P.DatePicker;
        const pick = h(Comp, Object.assign({ value: v, onChange, label: c.id }, c.props || {}));
        const wrapped = c.locale || c.zone ? h(P.LocaleProvider, { locale: c.locale || 'en-US', timeZone: c.zone, dir: c.dir }, pick) : pick;
        return h('div', { id: c.id, dir: c.dir }, wrapped);
      };
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, cases.map((c) => h(Case, { key: c.id, c }))));
      await new Promise((r) => setTimeout(r, 800));
    }, cases);
    const read = (id) => page.evaluate((id) => {
      const root = document.getElementById(id);
      const date = root.querySelector('.plx-date-picker__input'), time = root.querySelector('input[type="time"]');
      const suffix = root.querySelector('.plx-date-picker__time') ? root.querySelector('.plx-date-picker__time').textContent.replace(time ? time.value : '', '').trim() : '';
      const tp = root.querySelector('.plx-time-picker__input');
      const segs = [...root.querySelectorAll('.plx-time-picker__segment')].map((s) => s.textContent);
      return { date: date ? date.value : '', time: time ? time.value : '', suffix, tp: tp ? tp.value : '', segs, log: window.__log[id] || [] };
    }, id);
    // sets an input's value the way a person's edit does (React reads the native setter and the input event)
    const setValue = (selector, v) => page.evaluate((selector, v) => {
      const el = document.querySelector(selector);
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, selector, v);
    // replace a time field's text: focus it, select its text with el.select() (a triple-click does not select in headless Chrome), then type
    const typeTime = async (id, text) => {
      const f = await page.$(id + ' .plx-time-picker__input');
      await f.click();
      await f.evaluate((x) => x.select());
      await page.keyboard.type(text);
    };
    const lastLog = async (id) => { const r = await read(id); return r.log[r.log.length - 1]; };

    // 1. Tokyo on a Los Angeles computer
    await open('America/Los_Angeles');
    const MOMENT = '2026-07-01T20:30:00.000Z';   // 13:30 in Los Angeles on July 1; 05:30 in Tokyo on July 2
    await draw([
      { id: 'dt', zone: 'Asia/Tokyo', value: MOMENT, props: { mode: 'date-time' } },
      { id: 'dtPlain', value: '2026-07-01T09:00', props: { mode: 'date-time' } },
      { id: 'tp', kind: 'time', zone: 'Asia/Tokyo', value: MOMENT, props: { hourCycle: '24' } },
      { id: 'tpSeg', kind: 'time', zone: 'Asia/Tokyo', value: MOMENT, props: { hourCycle: '24', variant: 'segments' } },
      { id: 'tpDay', kind: 'time', zone: 'Asia/Tokyo', value: '14:30', props: { hourCycle: '24' } },
      { id: 'tpPlain', kind: 'time', value: '14:30', props: { hourCycle: '24' } },
    ]);
    let r = await read('dt');
    assert.equal(r.date, '07/02/2026', 'the date-time shows the moment\'s date in Tokyo (July 2), not the computer\'s (July 1); got ' + r.date);
    assert.equal(r.time, '05:30', 'and its time in Tokyo; got ' + r.time);
    assert.ok(/GMT\+9|JST/.test(r.suffix), 'the zone shown is Tokyo\'s; got ' + r.suffix);
    await setValue('#dt input[type="time"]', '06:00');
    assert.equal(await lastLog('dt'), '2026-07-01T21:00:00.000Z', 'a time chosen saves the moment in Tokyo, in UTC');
    // a day chosen in the calendar keeps the time, in Tokyo
    await page.click('#dt .plx-date-picker__button');
    await page.waitForSelector('[data-plx-date="2026-07-10"]', { visible: true });
    await page.click('[data-plx-date="2026-07-10"]');
    assert.equal(await lastLog('dt'), '2026-07-09T21:00:00.000Z', 'July 10 at 06:00 in Tokyo is July 9, 21:00 UTC');
    r = await read('dt');
    assert.deepEqual([r.date, r.time], ['07/10/2026', '06:00'], 'and it shows July 10, 06:00');

    // no time zone: exactly as before (the wall clock)
    r = await read('dtPlain');
    assert.deepEqual([r.date, r.time], ['07/01/2026', '09:00'], 'without a zone the value shows as written');
    await setValue('#dtPlain input[type="time"]', '10:15');
    assert.equal(await lastLog('dtPlain'), '2026-07-01T10:15', 'without a zone the value stays a wall-clock time');

    // TimePicker, list: a moment shows its Tokyo time and saves the moment on the same Tokyo day
    r = await read('tp');
    assert.equal(r.tp, '05:30', 'the time picker shows the moment\'s time in Tokyo; got ' + r.tp);
    await typeTime('#tp', '06:15');
    await page.keyboard.press('Enter');
    assert.equal(await lastLog('tp'), '2026-07-01T21:15:00.000Z', 'a typed time saves the moment on July 2 in Tokyo');
    // the list's keys work as before: Arrow Down opens on the nearest time, Arrow Down moves, Enter chooses (06:30 in Tokyo)
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    assert.equal(await lastLog('tp'), '2026-07-01T21:30:00.000Z', 'Arrow Down and Enter choose the next time, in Tokyo');
    // segments: Arrow Up on the hour steps it, in Tokyo
    r = await read('tpSeg');
    assert.deepEqual(r.segs, ['05', '30'], 'the segments show the Tokyo time');
    await page.focus('#tpSeg .plx-time-picker__segment');
    await page.keyboard.press('ArrowUp');
    assert.equal(await lastLog('tpSeg'), '2026-07-01T21:30:00.000Z', 'Arrow Up on the hour saves 06:30 in Tokyo');
    // an "HH:MM" value is a time of day: no zone moves it
    r = await read('tpDay');
    assert.equal(r.tp, '14:30', 'an HH:MM value shows as written under a zone');
    await typeTime('#tpDay', '15:00');
    await page.keyboard.press('Enter');
    assert.equal(await lastLog('tpDay'), '15:00', 'and saves HH:MM');
    await typeTime('#tpPlain', '16:45');
    await page.keyboard.press('Enter');
    assert.equal(await lastLog('tpPlain'), '16:45', 'without a zone the time picker gives HH:MM, as before');

    // 2. today: the app's zone (Pago Pago, UTC-11) on a computer 25 hours ahead (Kiritimati, UTC+14): the dates always differ
    await open('Pacific/Kiritimati');
    await draw([{ id: 'today', zone: 'Pacific/Pago_Pago', value: null, props: { presets: true } }]);
    const want = await page.evaluate(() => new Intl.DateTimeFormat('en-CA', { timeZone: 'Pacific/Pago_Pago', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
    const device = await page.evaluate(() => new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));
    assert.notEqual(want, device, 'the probe zones give two dates');
    await page.click('#today .plx-date-picker__button');
    await page.waitForSelector('.plx-calendar__day.is-today', { visible: true });
    const marked = await page.$eval('.plx-calendar__day.is-today', (el) => el.getAttribute('data-plx-date'));
    assert.equal(marked, want, 'the calendar\'s today is the app zone\'s today; got ' + marked + ', the computer\'s is ' + device);
    await page.evaluate(() => [...document.querySelectorAll('#today .plx-date-picker__preset')][0].click());   // Today
    assert.equal(await lastLog('today'), want, 'the Today preset is the app zone\'s today');

    // 3. New York around its clock changes, on a Tokyo computer
    await open('Asia/Tokyo');
    await draw([
      { id: 'spring', zone: NY, value: '2026-03-08T07:30:00.000Z', props: { mode: 'date-time' } },
      { id: 'fall', zone: NY, value: '2026-11-01T05:30:00.000Z', props: { mode: 'date-time' } },
      { id: 'winter', zone: NY, value: '2026-01-15T14:00:00.000Z', props: { mode: 'date-time' } },
      { id: 'keys', zone: NY, value: '2026-07-01T03:30:00.000Z', props: { mode: 'date-time' } },
    ]);
    r = await read('spring');
    assert.deepEqual([r.date, r.time, r.suffix], ['03/08/2026', '03:30', 'EDT'], 'the spring day shows 03:30 EDT; got ' + JSON.stringify(r));
    await setValue('#spring input[type="time"]', '02:30');
    assert.equal(await lastLog('spring'), '2026-03-08T07:30:00.000Z', '02:30, skipped by the clocks, saves as 03:30 EDT');
    r = await read('fall');
    assert.deepEqual([r.date, r.time, r.suffix], ['11/01/2026', '01:30', 'EDT'], 'the autumn day shows the first 01:30 (EDT)');
    await setValue('#fall input[type="time"]', '01:45');
    assert.equal(await lastLog('fall'), '2026-11-01T05:45:00.000Z', 'a repeated time saves the earlier moment');
    r = await read('winter');
    assert.deepEqual([r.time, r.suffix], ['09:00', 'EST'], 'a winter value is named EST');
    // keyboard, around midnight: 03:30 UTC on July 1 is June 30, 23:30 in New York (July 1, 12:30 on this computer)
    r = await read('keys');
    assert.deepEqual([r.date, r.time], ['06/30/2026', '23:30'], 'the evening before in New York, not the computer\'s July 1');
    await page.focus('#keys .plx-date-picker__input');
    await page.keyboard.down('Alt'); await page.keyboard.press('ArrowDown'); await page.keyboard.up('Alt');
    await page.waitForFunction(() => document.activeElement && document.activeElement.getAttribute('data-plx-date') === '2026-06-30', { timeout: 5000 });
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    assert.equal(await lastLog('keys'), '2026-07-02T03:30:00.000Z', 'Alt+Arrow Down, Arrow Right and Enter choose July 1 at 23:30 in New York');

    // 4. Arabic (ar-EG) in Cairo, right to left; English left to right
    await open('America/Los_Angeles');
    // 22:30 UTC on July 1 is 15:30 on July 1 in Los Angeles and 01:30 on July 2 in Cairo (UTC+3 in summer)
    await draw([
      { id: 'ar', zone: 'Africa/Cairo', locale: 'ar-EG', dir: 'rtl', value: '2026-07-01T22:30:00.000Z', props: { mode: 'date-time', locale: 'ar-EG' } },   // the date's form and digits come from the picker's own locale; LocaleProvider gives the words and the zone
      { id: 'en', zone: 'Africa/Cairo', locale: 'en-US', dir: 'ltr', value: '2026-07-01T22:30:00.000Z', props: { mode: 'date-time' } },
    ]);
    // the Arabic picker's reading kept in its own variable (QA on bef84188: the zone check read the English picker)
    const ar = await read('ar');
    assert.ok(/[٠-٩]/.test(ar.date) && !/[0-9]/.test(ar.date), 'Arabic writes the date in Arabic-Indic digits; got ' + ar.date);
    assert.ok(/٠٢/.test(ar.date) && /٠٧/.test(ar.date), 'the date is July 2 in Cairo, not the computer\'s July 1; got ' + ar.date);
    assert.equal(ar.time, '01:30', 'the time is Cairo\'s');
    // the zone is named in the picker's locale for Cairo at that moment: exactly what this browser's Intl gives for ar-EG
    // (a full ICU says "غرينتش+٣"; a browser with fewer zone names may say "GMT+3"), never the computer's zone
    const arZone = await page.evaluate(() => { const p = new Intl.DateTimeFormat('ar-EG-u-nu-arab', { timeZone: 'Africa/Cairo', timeZoneName: 'short' }).formatToParts(new Date('2026-07-01T22:30:00.000Z')).find((x) => x.type === 'timeZoneName'); return p ? p.value : ''; });
    assert.equal(ar.suffix, arZone, 'the Arabic picker names Cairo\'s zone in ar-EG; got ' + ar.suffix + ', Intl gives ' + arZone);
    const en = await read('en');
    assert.deepEqual([en.date, en.time], ['07/02/2026', '01:30'], 'the same moment in English: July 2, 01:30 in Cairo');
    assert.ok(/GMT\+3/.test(en.suffix), 'the English picker names Cairo\'s zone GMT+3; got ' + en.suffix);
    const sides = await page.evaluate(() => ['ar', 'en'].map((id) => {
      const root = document.getElementById(id), input = root.querySelector('.plx-date-picker__input'), button = root.querySelector('.plx-date-picker__button');
      return { dir: getComputedStyle(input).direction, input: input.getBoundingClientRect().left, button: button.getBoundingClientRect().left };
    }));
    assert.equal(sides[0].dir, 'rtl', 'the Arabic field runs right to left');
    assert.ok(sides[0].button < sides[0].input, 'right to left, the calendar button is at the inline end (the left)');
    assert.ok(sides[1].button > sides[1].input, 'left to right, the calendar button is at the inline end (the right)');
    await page.click('#ar .plx-date-picker__button');
    await page.waitForSelector('.plx-calendar__day.is-selected', { visible: true });
    const arCal = await page.evaluate(() => ({ chosen: document.querySelector('.plx-calendar__day.is-selected').getAttribute('data-plx-date'), text: document.querySelector('.plx-calendar').textContent }));
    assert.equal(arCal.chosen, '2026-07-02', 'the chosen day in the calendar is the Cairo day');
    // the month as this browser's Intl names July in ar-EG (يوليو with a full ICU), and Arabic-Indic digits
    const arMonth = await page.evaluate(() => new Intl.DateTimeFormat('ar-EG-u-nu-arab', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 6, 15))));
    assert.ok(arCal.text.includes(arMonth) && /[٠-٩]/.test(arCal.text), 'the calendar shows the month in ar-EG (' + arMonth + ') and Arabic-Indic digits');
    await page.keyboard.press('Escape');

    assert.deepEqual(errors, [], 'no script errors');
    console.log('PICKER_TIMEZONE_813_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
