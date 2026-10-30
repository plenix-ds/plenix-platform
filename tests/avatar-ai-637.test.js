/* Plenix tests · Avatar AI logos (issue 637; owner, 2026-10-29: "use the known SVG logos, keep it simple").
   Summary: Avatar ai="<provider>" shows the brand's built-in single-color mark through the icon path, for every provider in
     platform/icons/custom/BRANDS.md; logo={icon} shows any other logo; the order is the logo, then the picture, then the
     initials; an unknown provider keeps the initials; the mark is three quarters of the square, in the avatar's text color,
     and the avatar keeps its label. No logo is markup: each is an svg path the Icon component draws.
   Proof first: before this change Avatar has no ai or logo prop, so every line below the first render fails.
   Usage: node tests/avatar-ai-637.test.js   → AVATAR_AI_637_OK */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
const AIS = ['claude', 'anthropic', 'gemini', 'perplexity', 'meta', 'mistral', 'deepseek'];
(async () => {
  // every built-in logo has its four files, one path each, and a row in BRANDS.md
  const custom = path.join(__dirname, '..', 'platform', 'icons', 'custom'), brands = fs.readFileSync(path.join(custom, 'BRANDS.md'), 'utf8');
  for (const a of AIS) {
    for (const v of ['', '-fill', '-24', '-24-fill']) assert.equal((fs.readFileSync(path.join(custom, 'ai_' + a + v + '.svg'), 'utf8').match(/<path/g) || []).length, 1, a + v + ': one path');
    assert.ok(brands.includes('`' + a + '`'), a + ': listed with its source in BRANDS.md');
  }
  const PORT = +process.env.TEST_PORT || 9664, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const r = await page.evaluate(async (AIS) => {
      const h = React.createElement, P = window.Plenix;
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
        ...AIS.map((a) => h(P.Avatar, { key: a, id: 'ai-' + a, ai: a, label: a, size: 'xl' })),
        h(P.Avatar, { id: 'over-picture', ai: 'claude', src: 'missing.jpg', name: 'Claude' }),
        h(P.Avatar, { id: 'given', logo: 'sparkle', name: 'Acme Assistant' }),
        h(P.Avatar, { id: 'unknown', ai: 'nobody', name: 'Acme Assistant' }),
        h(P.Avatar, { id: 'person', name: 'Maya Chen' })));
      await new Promise((r) => setTimeout(r, 800));
      const one = (id) => { const e = document.getElementById(id), logo = e.querySelector('.plx-avatar__logo'), svg = logo && logo.querySelector('svg path');
        return { logo: !!logo, path: svg ? svg.getAttribute('d').length : 0, img: !!e.querySelector('img'), text: logo ? '' : e.textContent, role: e.getAttribute('role'), name: e.ariaLabel,
          ratio: logo ? Math.round(logo.getBoundingClientRect().width / e.getBoundingClientRect().width * 100) : 0, color: logo ? getComputedStyle(logo).color : '', own: getComputedStyle(e).color,
          markup: logo ? logo.querySelectorAll('svg *:not(path)').length : 0 }; };
      const out = {}; for (const a of AIS) out[a] = one('ai-' + a);
      return Object.assign(out, { overPicture: one('over-picture'), given: one('given'), unknown: one('unknown'), person: one('person') });
    }, AIS);
    for (const a of AIS) {
      const m = r[a];
      assert.ok(m.logo && m.path > 0, a + ': its logo is drawn');
      assert.equal(m.markup, 0, a + ': nothing but svg paths');
      assert.deepEqual([m.role, m.name], ['img', a], a + ': the avatar keeps its label');
      assert.ok(m.ratio >= 70 && m.ratio <= 80, a + ': three quarters of the square (' + m.ratio + '%)');
      assert.equal(m.color, m.own, a + ': in the avatar\'s own text color');
    }
    assert.ok(r.claude.path !== r.gemini.path, 'each provider has its own mark');
    assert.ok(r.overPicture.logo && !r.overPicture.img, 'a logo comes before the picture');
    assert.ok(r.given.logo, 'logo= shows another logo through the icon path');
    assert.deepEqual([r.unknown.logo, r.unknown.text], [false, 'AA'], 'an unknown provider keeps the initials');
    assert.deepEqual([r.person.logo, r.person.text], [false, 'MC'], 'a person keeps the initials');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('AVATAR_AI_637_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
