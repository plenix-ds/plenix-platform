/* Plenix tests · Chat slice 4: message actions and reactions (issue 637; the owner's go: "ready to slice 4!!!", built as drawn in 637-s4).
   Summary: Chat.Thread with theirs and yours, light and dark, left to right and right to left, English and Arabic:
     the action bar (React, Reply, More) is hidden until hover, keyboard focus (a Tab into it reveals it) or a long press; then it sits beside the
       bubble (theirs at its end side, yours at its start side, mirrored in right to left) and covers no text
     More: Reply, Quote, Copy text, Forward, then Edit and Delete (danger) on your own messages only; theirs has no Edit or Delete
     reactions: pills under the text named "<name>: <count>", yours aria-pressed and outlined in the action color; Add reaction; React opens the six
       quick reactions and More reactions
     quote inside the bubble; the composer's "Replying to <name>" with Cancel; "· Edited" in the footer; a deleted message says so, with no bar,
       reactions or quote
     every icon-only control is a bordered button (no ghost icon-only button in the chat); Arabic names come from the catalog
   Proof first: before slice 4 a message has no action bar, reactions, quote, edited or deleted, and the composer no replyTo: every line fails.
   Usage: node tests/chat-s4-637.test.js   → CHAT_S4_637_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
(async () => {
  const PORT = +process.env.TEST_PORT || 9666, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    const draw = async (mode, dir, lang) => {
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(async (mode, dir, lang) => {
        document.documentElement.setAttribute('data-plx-mode', mode); document.documentElement.setAttribute('dir', dir);
        const h = React.createElement, P = window.Plenix; window.__calls = [];
        const log = (n) => (...a) => window.__calls.push([n].concat(a));
        const acts = { onReact: log('react'), onReply: log('reply'), onQuote: log('quote'), onForward: log('forward'), onEdit: log('edit'), onDelete: log('delete') };
        const tree = h('div', null,
          h(P.Chat.Thread, { label: 'Conversation', follow: false },
            h(P.Chat.Message, Object.assign({ id: 'theirs', author: 'Maya Chen', time: '9:01 AM', reactions: [{ emoji: '👍', count: 2, mine: true }, { emoji: '❤️', count: 1 }] }, acts), 'The PDF is fine.'),
            h(P.Chat.Message, Object.assign({ id: 'mine', mine: true, time: '9:03 AM', edited: true, quote: { author: 'Maya Chen', text: 'The PDF is fine.' } }, acts), 'Both floors in one file.'),
            h(P.Chat.Message, Object.assign({ id: 'gone', mine: true, time: '9:05 AM', deleted: true, reactions: [{ emoji: '👍', count: 1 }], quote: { author: 'x', text: 'y' } }, acts), 'secret')),
          h(P.Chat.Composer, { value: '', onChange: () => {}, onSend: () => {}, replyTo: { author: 'Maya Chen', text: 'The PDF is fine.' }, onCancelReply: log('cancel') }));
        document.getElementById('main').innerHTML = '<div id="c"></div>';
        ReactDOM.createRoot(document.getElementById('c')).render(lang === 'ar' ? h(P.LocaleProvider, { locale: 'ar' }, tree) : tree);
        await new Promise((r) => setTimeout(r, 800));
      }, mode, dir, lang);
    };
    const state = (id) => page.evaluate((id) => {
      const m = document.getElementById(id), a = m.querySelector('.plx-chat__actions'), b = m.querySelector('.plx-chat__bubble').getBoundingClientRect();
      if (!a) return { bar: false };
      const r = a.getBoundingClientRect();
      return { bar: true, hidden: a.classList.contains('plx-visually-hidden'), covers: r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top,
        side: r.left >= b.right ? 'right' : r.right <= b.left ? 'left' : 'over', labels: [...a.querySelectorAll('button')].map((x) => x.getAttribute('aria-label')) };
    }, id);
    const menuItems = async (id, more) => {
      await page.hover('#' + id + ' .plx-chat__bubble'); await new Promise((r) => setTimeout(r, 200));
      await page.click('#' + id + ' .plx-chat__actions button[aria-label="' + more + '"]'); await new Promise((r) => setTimeout(r, 400));
      const items = await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"]')].filter((e) => e.getClientRects().length).map((e) => ({ text: e.textContent.trim(), danger: /danger/.test(e.className) })));
      await page.keyboard.press('Escape'); await page.mouse.move(1, 1); await new Promise((r) => setTimeout(r, 200));
      return items;
    };
    for (const [mode, dir, lang] of [['light', 'ltr', 'en'], ['dark', 'ltr', 'en'], ['light', 'rtl', 'ar'], ['dark', 'rtl', 'ar']]) {
      await draw(mode, dir, lang);
      const AR = lang === 'ar', say = (en, ar) => (AR ? ar : en), at = mode + ' ' + dir + ': ';
      // the bar: hidden until hover, then beside the bubble, covering no text; none on a deleted message
      assert.deepEqual([(await state('theirs')).hidden, (await state('mine')).hidden], [true, true], at + 'the action bars are hidden at rest');
      assert.equal((await state('gone')).bar, false, at + 'a deleted message has no action bar');
      await page.hover('#theirs .plx-chat__bubble'); await new Promise((r) => setTimeout(r, 200));
      let s = await state('theirs');
      assert.deepEqual([s.hidden, s.covers, s.side], [false, false, dir === 'ltr' ? 'right' : 'left'], at + 'hovered, theirs shows its bar at the bubble\'s end side, covering nothing');
      assert.deepEqual(s.labels, [say('React', 'تفاعل'), say('Reply', 'رد'), say('More actions', 'مزيد من الإجراءات')], at + 'React, Reply, More, named');
      await page.mouse.move(1, 1); await new Promise((r) => setTimeout(r, 200));
      // the keyboard: a Tab into the bar reveals it
      await page.focus('#mine .plx-chat__actions button'); await new Promise((r) => setTimeout(r, 200));
      s = await state('mine');
      assert.deepEqual([s.hidden, s.covers, s.side], [false, false, dir === 'ltr' ? 'left' : 'right'], at + 'focused, yours shows its bar at the bubble\'s start side');
      await page.evaluate(() => document.activeElement.blur()); await new Promise((r) => setTimeout(r, 200));
      // More: Edit and Delete on yours only, Delete in red
      const mineItems = await menuItems('mine', say('More actions', 'مزيد من الإجراءات'));
      assert.deepEqual(mineItems.map((i) => i.text), [say('Reply', 'رد'), say('Quote', 'اقتباس'), say('Copy text', 'نسخ النص'), say('Forward', 'إعادة توجيه'), say('Edit', 'تحرير'), say('Delete', 'حذف')], at + 'yours: the whole menu');
      assert.ok(mineItems[5].danger && !mineItems[4].danger, at + 'Delete is the danger item');
      const theirItems = await menuItems('theirs', say('More actions', 'مزيد من الإجراءات'));
      assert.deepEqual(theirItems.map((i) => i.text), [say('Reply', 'رد'), say('Quote', 'اقتباس'), say('Copy text', 'نسخ النص'), say('Forward', 'إعادة توجيه')], at + 'theirs: no Edit or Delete');
      // reactions: named pills, yours pressed and outlined in the action color; React opens the six and More reactions
      const pills = await page.evaluate(() => [...document.querySelectorAll('#theirs .plx-chat__reaction')].map((e) => ({ name: e.getAttribute('aria-label'), pressed: e.getAttribute('aria-pressed'), line: getComputedStyle(e).borderTopColor })));
      assert.deepEqual(pills.map((p) => [p.name, p.pressed]), [[say('Thumbs up: 2', 'إعجاب: 2'), 'true'], [say('Heart: 1', 'قلب: 1'), 'false']], at + 'the pills are named and yours is pressed');
      const accent = await page.evaluate(() => { const i = document.createElement('i'); i.style.setProperty('color', 'var(--plx-sys-accent-border)'); document.body.appendChild(i); const c = getComputedStyle(i).color; i.remove(); return c; });
      assert.ok(pills[0].line === accent && pills[1].line !== accent, at + 'yours is outlined in the action color');
      await page.hover('#theirs .plx-chat__bubble'); await new Promise((r) => setTimeout(r, 200));
      await page.click('#theirs .plx-chat__actions button[aria-label="' + say('React', 'تفاعل') + '"]'); await new Promise((r) => setTimeout(r, 400));
      const quick = await page.evaluate(() => [...document.querySelectorAll('.plx-chat__quick button')].filter((e) => e.getClientRects().length).map((e) => e.getAttribute('aria-label')));
      assert.deepEqual(quick, AR ? ['إعجاب', 'قلب', 'ضحك', 'دهشة', 'حزن', 'شكرًا', 'مزيد من التفاعلات'] : ['Thumbs up', 'Heart', 'Laughing', 'Surprised', 'Sad', 'Thank you', 'More reactions'], at + 'the six quick reactions and More');
      await page.click('.plx-chat__quick button[aria-label="' + say('Heart', 'قلب') + '"]'); await new Promise((r) => setTimeout(r, 200));
      assert.deepEqual(await page.evaluate(() => window.__calls.filter((c) => c[0] === 'react').pop()), ['react', '❤️'], at + 'a quick reaction calls onReact with its emoji');
      await page.keyboard.press('Escape'); await page.mouse.move(1, 1); await new Promise((r) => setTimeout(r, 200));
      // quote, edited, deleted, Replying to
      const rest = await page.evaluate(() => ({
        quote: (document.querySelector('#mine .plx-chat__quote') || {}).textContent || '', edited: document.querySelector('#mine .plx-chat__footer').textContent,
        gone: document.querySelector('#gone .plx-chat__body').textContent, goneExtras: document.querySelectorAll('#gone .plx-chat__quote, #gone .plx-chat__reactions').length,
        replying: (document.querySelector('.plx-chat__replying') || {}).textContent || '', cancel: !!document.querySelector('.plx-chat__replying button[aria-label]'),
        ghostIconOnly: [...document.querySelectorAll('#c .plx-button')].filter((b) => !b.textContent.trim() && /plx-button--ghost/.test(b.className)).length }));
      assert.match(rest.quote, /Maya Chen.*The PDF is fine\./, at + 'the quote inside the bubble: author and text');
      assert.match(rest.edited, AR ? /تم التحرير/ : /· ?Edited/, at + '"Edited" in the footer');
      assert.equal(rest.gone, say('This message was deleted', 'تم حذف هذه الرسالة'), at + 'a deleted message says so, its text is gone');
      assert.equal(rest.goneExtras, 0, at + 'a deleted message has no quote or reactions');
      assert.match(rest.replying, AR ? /الرد على Maya Chen/ : /Replying to Maya Chen/, at + 'the composer\'s Replying to line');
      assert.ok(rest.cancel, at + 'with a Cancel button');
      assert.equal(rest.ghostIconOnly, 0, at + 'every icon-only control is a bordered button');
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('CHAT_S4_637_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
