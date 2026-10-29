/* Plenix tests · CTM's question block in a page of the other direction (issue 413, rtl-413-d; owner, ctm-needs-34).
   Summary: tests/fixtures/rtl-ctm-question.html draws CTM's report questions (a NavList of categories, a Fieldset of
   Checkboxes with a description) with the Platform alone, without CTM's own direction rules (ctm.css 295 to 304):
     Arabic in an English page   as CTM writes it today (dir="rtl" on a wrapper) and the supported way (dir and lang on the
                                 Fieldset): the legend, the question text and the category list start at the right; each
                                 box is right of its question; the supported way carries lang="ar"
     English in an Arabic page   the reverse: everything starts at the left; each box is left of its question
     around the block            the page around it keeps its own direction; nothing scrolls sideways
   Usage: node tests/rtl-ctm-question.test.js   → RTL_CTM_QUESTION_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9655, server = await serve(PORT); let browser;
  const URL = 'http://localhost:' + PORT + '/Plenix/tests/fixtures/rtl-ctm-question.html?page=';
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1100, height: 900 });
    // what one block shows: where its legend, rows and category items sit, and the direction and language they carry
    const read = (id) => page.evaluate((id) => {
      const set = document.querySelector('#' + id + ' .plx-fieldset'), leg = set.querySelector('legend'), s = set.getBoundingClientRect(), l = leg.getBoundingClientRect();
      const rows = [...set.querySelectorAll('.plx-check')].map((row) => {
        const box = row.querySelector('input').getBoundingClientRect(), text = row.querySelector('.plx-check__text'), t = text.getBoundingClientRect();
        return { side: box.left >= t.right - 1 ? 'right' : box.right <= t.left + 1 ? 'left' : 'over', dir: getComputedStyle(text).direction };
      });
      // the category's words (not its row, which fills the list's width)
      const nav = document.querySelector('#' + id + '-nav'), item = nav.querySelector('[aria-current], a, button'), n = item.getBoundingClientRect();
      const words = document.createTreeWalker(item, NodeFilter.SHOW_TEXT, { acceptNode: (t) => (t.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP) }).nextNode();
      const range = document.createRange(); range.selectNodeContents(words); const i = range.getBoundingClientRect();
      return {
        legend: { side: Math.abs(l.right - s.right) < Math.abs(l.left - s.left) ? 'right' : 'left', dir: getComputedStyle(leg).direction },
        rows, nav: { dir: getComputedStyle(item).direction, side: Math.abs(i.right - n.right) <= Math.abs(i.left - n.left) ? 'right' : 'left' },
        lang: set.closest('[lang]').getAttribute('lang'),
        // the Platform answers to the dir attribute; no CSS direction is set on the block's own elements
        inline: [...document.querySelectorAll('#' + id + ' [style*="direction"]')].length,
      };
    }, id);
    const open = async (dir) => { await page.goto(URL + dir, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('html[data-fixture-ready] .plx-fieldset', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 800)); };
    const sideways = () => page.evaluate(() => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth);

    // Arabic in an English page
    await open('ltr');
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.plx-form-section__title, h2, h3') || document.body).direction), 'ltr', 'the English page around the block stays left to right');
    for (const id of ['ar', 'ar-set']) {
      const b = await read(id);
      assert.deepEqual(b.legend, { side: 'right', dir: 'rtl' }, id + ': the legend starts at the right: ' + JSON.stringify(b));
      assert.ok(b.rows.length === 3 && b.rows.every((r) => r.side === 'right' && r.dir === 'rtl'), id + ': each box is right of its question, read right to left: ' + JSON.stringify(b.rows));
      assert.deepEqual(b.nav, { dir: 'rtl', side: 'right' }, id + ': the categories start at the right: ' + JSON.stringify(b.nav));
      assert.equal(b.inline, 0, id + ': no CSS direction on the block');
    }
    assert.equal((await read('ar-set')).lang, 'ar', 'ar-set: the supported way carries lang="ar" to the questions');
    assert.equal(await sideways(), 0, 'English page: no sideways scroll');

    // English in an Arabic page
    await open('rtl');
    const en = await read('en');
    assert.deepEqual(en.legend, { side: 'left', dir: 'ltr' }, 'en: the legend starts at the left: ' + JSON.stringify(en));
    assert.ok(en.rows.length === 3 && en.rows.every((r) => r.side === 'left' && r.dir === 'ltr'), 'en: each box is left of its question: ' + JSON.stringify(en.rows));
    assert.deepEqual(en.nav, { dir: 'ltr', side: 'left' }, 'en: the categories start at the left: ' + JSON.stringify(en.nav));
    assert.equal(en.lang, 'en', 'en: lang="en" reaches the questions');
    assert.equal(await sideways(), 0, 'Arabic page: no sideways scroll');

    assert.deepEqual(errors, [], 'no script errors');
    console.log('RTL_CTM_QUESTION_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
