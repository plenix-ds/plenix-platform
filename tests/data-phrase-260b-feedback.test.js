/* Plenix tests · a count in a banner, a field hint or a check description is in the data font (issue 260, owner 2026-10-30).
   Summary: Banner's text, Field's description and Checkbox's description take a plain string through dataWhenText, so "40 days" is [40 in Reddit Mono] + " days" in the normal font,
     the phrase keeps its own size, and a node given instead of a string is drawn as it was given.
   The probe is proved able to see the old failure first: the old build wrote these strings as one DM Sans text, so no Reddit Mono text was found inside them and every case
     below fails on it (the typography check's "phrase" finding: 18 on 9 pages).
   Cases: each part, in an English page and an Arabic one (Arabic-Indic digits): the number is in a Mono element, the words are not, the text reads the same as the string
     (the words never move), the data text has the font size of the phrase around it, and an element child stays as given (no data span added).
   Usage: node tests/data-phrase-260b-feedback.test.js   (run by layout.test.js when Banner, Field or Checkbox changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9640, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const CASES = {
      en: { lang: 'en', dir: 'ltr', banner: 'The fast runs 40 days, with 3 services a week.', field: 'PDF, up to 50 MB', check: '120 copies for the booklets', numbers: ['40', '3', '50 MB', '120'] },
      ar: { lang: 'ar', dir: 'rtl', banner: 'يستمر الصوم ٤٠ يوما مع ٣ خدمات', field: 'ملف PDF حتى ٥٠ ميغابايت', check: '١٢٠ نسخة للكتيبات', numbers: ['٤٠', '٣', '٥٠', '١٢٠'] } };
    for (const key of Object.keys(CASES)) {
      const c = CASES[key];
      const found = await page.evaluate(async (c) => {
        document.documentElement.setAttribute('lang', c.lang); document.documentElement.setAttribute('dir', c.dir);
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement, P = Plenix;
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          h(P.Banner, { tone: 'info' }, c.banner),
          h(P.Field, { label: 'Upload', description: c.field }, h(P.Input, {})),
          h(P.Checkbox, { label: 'Print', description: c.check }),
          h(P.Banner, { tone: 'info', id: 'node' }, h('em', { id: 'own' }, '7 files'))));
        await new Promise((r) => setTimeout(r, 800));
        const parts = { banner: '.plx-banner__text', field: '.plx-field__description', check: '.plx-check__description' }, out = {};
        for (const k of Object.keys(parts)) {
          const el = document.querySelector(parts[k]), monos = [...el.querySelectorAll('*')].filter((e) => !e.children.length && /Mono/i.test(getComputedStyle(e).fontFamily));
          const inner = el.querySelector('.plx-text');
          out[k] = { text: el.textContent, monos: monos.map((e) => e.textContent), wordsMono: /Mono/i.test(getComputedStyle(inner || el).fontFamily), phraseSize: getComputedStyle(inner || el).fontSize, monoSize: monos[0] ? getComputedStyle(monos[0]).fontSize : null };
        }
        const own = document.getElementById('own');
        out.node = { text: own.textContent, spans: own.querySelectorAll('.plx-text').length, parentSpans: document.querySelector('#node .plx-banner__text').querySelectorAll('.plx-text').length };
        return out;
      }, c);
      for (const [k, expected] of [['banner', c.banner], ['field', c.field], ['check', c.check]]) {
        assert.equal(found[k].text, expected, key + ' ' + k + ': the text reads exactly as the string (the words never move)');
        assert.ok(found[k].monos.length >= 1, key + ' ' + k + ': a number is in Reddit Mono (the old build: none)');
        assert.equal(found[k].wordsMono, false, key + ' ' + k + ': the words are not in Reddit Mono');
        assert.equal(found[k].monoSize, found[k].phraseSize, key + ' ' + k + ': the data text keeps the phrase\'s size');
      }
      assert.ok(c.numbers.some((n) => found.banner.monos.includes(n)), key + ': the banner count itself is the Mono text');
      assert.equal(found.node.text, '7 files', key + ': a node child keeps its own text');
      assert.equal(found.node.parentSpans, 0, key + ': a node child gets no data span added');
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('data-phrase-260b-feedback: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
