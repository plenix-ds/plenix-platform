/* Plenix tests · the toolbar and footer ladder (issue 477, stage 4 of platform/standards/fit-and-overflow.md): real parts, measured.
   Summary: a Toolbar never wraps. At 520px its five Buttons keep their words; at 360px the ones with an icon drop their words (icon only, name in the
     accessible name); at 240px the primary keeps its words and Delete stays (danger folds last), the others are in More and in its menu with their words.
     An ActionBar is one row at 520px, 360px and 240px (Cancel, More and Save at 240px; the danger action first in the menu's divided end). In a window under 400px the
     primary button is first, full width, and More sits on Cancel's row. Growing the window back unfolds everything again. Right to left gives the same rows, mirrored.
   Usage: node tests/toolbar-ladder.test.js   (run by layout.test.js when the Toolbar, the ActionBar or the fold helpers changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9621, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const draw = (dir) => page.evaluate(async (dir) => {
      document.documentElement.dir = dir;
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix;
      const tb = (w) => h('div', { id: 't' + w, style: { inlineSize: w + 'px' } }, h(P.Toolbar, { label: 'Actions ' + w },
        h(P.Button, { icon: 'add', variant: 'primary' }, 'New'), h(P.Button, { icon: 'edit', variant: 'ghost' }, 'Edit'), h(P.Button, { icon: 'share', variant: 'ghost' }, 'Share'),
        h(P.Button, { icon: 'download', variant: 'ghost' }, 'Export'), h(P.Button, { icon: 'delete', variant: 'danger-secondary' }, 'Delete')));
      const ab = (w) => h('div', { id: 'a' + w, style: { inlineSize: w + 'px' } }, h(P.ActionBar, { sticky: false, label: 'Footer ' + w },
        h(P.Button, { variant: 'danger-secondary' }, 'Delete'), h(P.Button, { variant: 'ghost' }, 'Another choice'), h(P.Button, { variant: 'ghost', priority: 'high' }, 'Cancel'), h(P.Button, { variant: 'primary' }, 'Save changes')));
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, tb(520), tb(360), tb(240), ab(520), ab(360), ab(240)));
      await new Promise((r) => setTimeout(r, 800));
    }, dir);
    const read = (id, sel) => page.evaluate((id, sel) => {
      const bar = document.querySelector('#' + id + ' ' + sel);
      const btns = [...bar.querySelectorAll('button')].filter((b) => b.getClientRects().length);
      return { names: btns.map((b) => b.getAttribute('aria-label') || b.textContent.trim()), words: btns.map((b) => b.textContent.trim()),
        rows: new Set(btns.map((b) => Math.round(b.getBoundingClientRect().top))).size, over: bar.scrollWidth > bar.clientWidth + 1 };
    }, id, sel);
    for (const dir of ['ltr', 'rtl']) {
      await draw(dir);
      const t520 = await read('t520', '[role=toolbar]'), t360 = await read('t360', '[role=toolbar]'), t240 = await read('t240', '[role=toolbar]');
      for (const t of [t520, t360, t240]) { assert.equal(t.rows, 1, dir + ': a toolbar is one row'); assert.ok(!t.over, dir + ': a toolbar does not overflow'); }
      assert.equal(t520.words.filter(Boolean).length, 5, dir + ': 520px keeps every word and no More');
      assert.ok(!t520.names.includes('More actions'), dir + ': no More at 520px');
      assert.equal(t360.names.length, 5, dir + ': 360px keeps five Buttons'); assert.ok(t360.words.slice(1, 4).every((w) => !w), dir + ': 360px: the Buttons with an icon drop their words');
      assert.ok(t360.words[0], dir + ': 360px: the primary keeps its words');
      assert.equal(t240.names.length, 4, dir + ': 240px: New, Edit, Delete and More'); assert.ok(t240.words[0], dir + ': 240px: the primary keeps its words');
      assert.ok(t240.names.includes('Delete'), dir + ': 240px: Delete stays');
      const a520 = await read('a520', '.plx-action-bar'), a360 = await read('a360', '.plx-action-bar'), a240 = await read('a240', '.plx-action-bar');
      for (const a of [a520, a360, a240]) { assert.equal(a.rows, 1, dir + ': a footer is one row'); assert.ok(!a.over, dir + ': a footer does not overflow'); assert.ok(a.words.filter(Boolean).length >= 2, dir + ': a footer never hides words'); }
      assert.equal(a520.names.length, 4, dir + ': 520px footer keeps four buttons'); assert.equal(a240.names.length, 3, dir + ': 240px footer: Cancel, More, Save changes');
      assert.ok(a240.words.includes('Cancel') && a240.words.includes('Save changes') && a240.names.includes('More actions'), dir + ': 240px footer names');
      // the menu: the folded actions with their words, the danger one last
      await page.click('#a240 .plx-action-bar__more button, #a240 [aria-label="More actions"]'); await new Promise((r) => setTimeout(r, 400));
      const items = await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].map((e) => e.textContent.trim()));
      assert.deepEqual(items, ['Another choice', 'Delete'], dir + ': More holds Another choice, then Delete');
      await page.keyboard.press('Escape');
    }
    // a window under 400px: the primary first and full width, More on Cancel's row; growing back unfolds
    await page.setViewport({ width: 360, height: 900 }); await new Promise((r) => setTimeout(r, 600));
    const phone = await page.evaluate(() => {
      const bar = document.querySelector('#a520 .plx-action-bar'), bx = bar.getBoundingClientRect();
      const save = [...bar.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Save changes'), cancel = [...bar.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Cancel');
      const more = bar.querySelector('[aria-label="More actions"]');
      const s = save.getBoundingClientRect(), c = cancel.getBoundingClientRect(), m = more.getBoundingClientRect();
      return { saveFirst: s.top < c.top, full: Math.abs(s.width - (bx.width - 2 * (s.left - bx.left))) <= 2, sameRow: Math.abs(m.top + m.height / 2 - (c.top + c.height / 2)) <= 4 };
    });
    assert.ok(phone.saveFirst, 'phone: the primary button is first'); assert.ok(phone.full, 'phone: the primary button is full width'); assert.ok(phone.sameRow, "phone: More is on Cancel's row");
    await page.setViewport({ width: 900, height: 900 }); await new Promise((r) => setTimeout(r, 800));
    assert.equal((await read('a520', '.plx-action-bar')).names.length, 4, 'back in a wide window the footer shows every button again');
    // a font that arrives late (issue 777): a bar first measured with wider text (as with the fallback font before the web font
    // has loaded) folds; when the fonts finish loading it measures again and shows its words. Proof first: the old build kept
    // it folded, since neither its width nor its labels changed. The wider text is a letter spacing taken off before the
    // fonts' "loadingdone" event, which the page sends here as the browser would
    await page.evaluate(() => { const s = document.createElement('style'); s.id = 'wide-text'; s.textContent = '.plx-button{letter-spacing:6px}'; document.head.appendChild(s); });
    await draw('ltr');
    const late = await read('t520', '[role=toolbar]');
    assert.ok(late.words.filter(Boolean).length < 5, 'late font: the probe sees it: with the wider text the 520px toolbar folds');
    await page.evaluate(() => { document.getElementById('wide-text').remove(); document.fonts.dispatchEvent(new Event('loadingdone')); });
    await new Promise((r) => setTimeout(r, 600));
    assert.equal((await read('t520', '[role=toolbar]')).words.filter(Boolean).length, 5, 'late font: when the fonts finish loading the 520px toolbar shows every word again');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('toolbar-ladder: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
