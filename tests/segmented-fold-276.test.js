// SegmentedControl folds into a Select when its options do not fit their room, and comes back when they do; the value
// and onChange stay the same (RedSave: the side panel's Show control).
const assert = require('assert');
const { serve, launch } = require('./lib.js');
const PORT = +process.env.TEST_PORT || 8876;
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    const state = () => page.evaluate(() => ['alone', 'row'].map((id) => { const b = document.getElementById(id);
      const card = document.querySelector('.plx-card').getBoundingClientRect();
      const out = [...b.querySelectorAll('*')].some((el) => el.getBoundingClientRect().right > card.right + 0.5);
      return { seg: !!b.querySelector('[role="radiogroup"]'), select: !!b.querySelector('select'), out }; }));
    await page.setViewport({ width: 900, height: 500 });
    await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/segmented-fold/stage.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#alone > *'); await new Promise((r) => setTimeout(r, 400));
    let s = await state();
    assert.deepEqual(s.map((x) => x.seg), [true, true], 'wide: segments'); assert.ok(!s[0].out && !s[1].out);
    await page.evaluate(() => document.getElementById('stage').classList.add('rv-narrow')); await page.waitForFunction(() => document.querySelectorAll('#stage select').length === 2, { timeout: 10000 }).catch(() => {});
    s = await state();
    assert.deepEqual(s.map((x) => x.select), [true, true], 'narrow: a drop-down list ' + JSON.stringify(s)); assert.ok(!s[0].out && !s[1].out, 'nothing past the card');
    const sel = await page.$('#alone select');
    assert.equal(await page.evaluate((e) => e.options[e.selectedIndex].textContent, sel), 'Not saved yet', 'same value');
    // the name is on the drawn field (role="combobox"); the native <select> under it is hidden and aria-hidden (dropdown-look-36, #423)
    assert.equal(await page.$eval('#alone [role="combobox"]', (e) => e.getAttribute('aria-label')), 'Show', 'same name');
    await page.select('#alone select', '2'); await new Promise((r) => setTimeout(r, 200));
    assert.equal(await page.evaluate(() => window.__seg276), 'saved', 'same onChange');
    await page.evaluate(() => document.getElementById('stage').classList.remove('rv-narrow')); await page.waitForFunction(() => document.querySelectorAll('#stage [role=radiogroup]').length === 2, { timeout: 10000 }).catch(() => {});
    s = await state();
    assert.deepEqual(s.map((x) => x.seg), [true, true], 'wide again: segments come back');
    assert.equal(await page.evaluate(() => document.querySelector('#alone [aria-checked="true"]').textContent), 'Already saved');
    console.log('SEGMENTED_FOLD_276_OK fold, no overflow, value, name, onChange, unfold');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
