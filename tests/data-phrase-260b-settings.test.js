/* Plenix tests · a count in a settings section or row description is in the data font (issue 260, owner 2026-10-30).
   Summary: SettingsSection's description and SettingsRow's description take a plain string through dataWhenText, so "up to 3 lines" is "up to " + [3 in Reddit Mono] + " lines" in the
     normal font, in the phrase's own size.
   The probe is proved able to see the old failure first: the old build wrote these strings as one DM Sans text, so no Reddit Mono text was found inside them and every case below
     fails on it (the typography check's "phrase" finding on the settings page).
   Cases: each description, in an English page and an Arabic one (Arabic-Indic digits): a number is in a Mono element, the words are not, the text reads the same as the string, and the
     data text keeps the phrase's size.
   Usage: node tests/data-phrase-260b-settings.test.js   (run by layout.test.js when the SettingsLayout changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9642, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const CASES = {
      en: { lang: 'en', dir: 'ltr', section: '469 members in 120 families', row: 'Beside the date, up to 3 lines' },
      ar: { lang: 'ar', dir: 'rtl', section: '٤٦٩ عضوا في ١٢٠ عائلة', row: 'بجانب التاريخ، حتى ٣ أسطر' } };
    for (const key of Object.keys(CASES)) {
      const c = CASES[key];
      const found = await page.evaluate(async (c) => {
        document.documentElement.setAttribute('lang', c.lang); document.documentElement.setAttribute('dir', c.dir);
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement, P = Plenix;
        ReactDOM.createRoot(document.getElementById('c')).render(h(P.SettingsSection, { title: 'Calendar', description: c.section }, h(P.SettingsRow, { label: 'Week start', description: c.row }, h('span', null, 'x'))));
        await new Promise((r) => setTimeout(r, 800));
        const parts = { section: '.plx-settings__section-description', row: '.plx-settings__row-description' }, out = {};
        for (const k of Object.keys(parts)) {
          const el = document.querySelector(parts[k]), monos = [...el.querySelectorAll('*')].filter((e) => !e.children.length && /Mono/i.test(getComputedStyle(e).fontFamily));
          const inner = el.querySelector('.plx-text');
          out[k] = { text: el.textContent, monos: monos.map((e) => e.textContent), wordsMono: /Mono/i.test(getComputedStyle(inner || el).fontFamily), phraseSize: getComputedStyle(inner || el).fontSize, monoSize: monos[0] ? getComputedStyle(monos[0]).fontSize : null };
        }
        return out;
      }, c);
      for (const k of ['section', 'row']) {
        assert.equal(found[k].text, c[k], key + ' ' + k + ': the text reads exactly as the string');
        assert.ok(found[k].monos.length >= 1, key + ' ' + k + ': a number is in Reddit Mono (the old build: none)');
        assert.equal(found[k].wordsMono, false, key + ' ' + k + ': the words are not in Reddit Mono');
        assert.equal(found[k].monoSize, found[k].phraseSize, key + ' ' + k + ': the data text keeps the phrase\'s size');
      }
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('data-phrase-260b-settings: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
