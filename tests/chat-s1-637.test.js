/* Plenix tests · Chat slice 1: the owner's message colors, the card corner and the corner-overlap photo (issue 637).
   Summary: Chat.Thread with messages from two people, light and dark, left to right and right to left:
     light: theirs #F5F7F9 with a #A9B8C7 outline, yours #E6F0FC with a #B2CBE9 outline, the text #253442 (the owner's colors,
       the new steps gray-80, slate-375, blue-125, blue-275, slate-900); the thread white
     dark: the existing dark colors (gray-900 / gray-700, blue-900 / blue-650, text gray-200)
     every bubble: a 1px border and the card's 6px corner; every photo: the avatar standard 1px border, in its bubble's outline
     the photo crosses the bubble's top corner (theirs at the start, yours at the end; mirrored in right to left) and covers no
       text; a continued message lines up with the first bubble of its run
     chat.css styles no part from its parent (no ".plx-chat__message… .plx-chat__bubble" or "… .plx-chat__time" rule)
   Proof first: before #637 your message was the solid action blue with white text, the photo sat beside theirs only, and
     chat.css set the bubble from its parent: those lines fail there.
   Usage: node tests/chat-s1-637.test.js   → CHAT_S1_637_OK */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
const rgb = (h) => 'rgb(' + [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ') + ')';
(async () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'platform', 'components', 'Chat', 'chat.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/\.plx-chat__message[^{,]*\s+\.plx-chat__(bubble|time|avatar)/.test(css), 'chat.css styles no part from its parent');
  const PORT = +process.env.TEST_PORT || 9662, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 640, height: 720 });
    const look = async (mode, dir) => {
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      return page.evaluate(async (mode, dir) => {
        document.documentElement.setAttribute('data-plx-mode', mode); document.documentElement.setAttribute('dir', dir);
        const h = React.createElement, P = window.Plenix;
        document.getElementById('main').innerHTML = '<div id="c"></div>';
        ReactDOM.createRoot(document.getElementById('c')).render(h(P.Chat.Thread, { label: 'Conversation', follow: false },
          h(P.Chat.Message, { id: 'a', author: 'Maya Chen', time: '10:24', avatar: h(P.Avatar, { name: 'Maya Chen', size: 'sm' }) }, 'Are the renders ready?'),
          h(P.Chat.Message, { id: 'b', continued: true }, 'The meeting moved.'),
          h(P.Chat.Message, { id: 'c', mine: true, time: '10:26', avatar: h(P.Avatar, { name: 'John Doe', size: 'sm' }) }, 'Thank you! I will review the changes.')));
        await new Promise((r) => setTimeout(r, 800));
        const cs = (e) => getComputedStyle(e), box = (e) => e.getBoundingClientRect();
        const one = (id) => { const m = document.getElementById(id), b = m.querySelector('.plx-chat__bubble'), a = m.querySelector('.plx-chat__avatar'), av = a && a.querySelector('.plx-avatar');
          const bb = box(b), ab = a && box(a);
          const covers = !!a && [...b.children].some((t) => { const r = document.createRange(); r.selectNodeContents(t); return [...r.getClientRects()].some((x) => x.left < ab.right && x.right > ab.left && x.top < ab.bottom && x.bottom > ab.top); });
          return { bg: cs(b).backgroundColor, line: cs(b).borderTopColor, width: cs(b).borderTopWidth, radius: cs(b).borderTopLeftRadius, text: cs(b).color, left: bb.left, right: bb.right,
            avatar: av ? { line: cs(av).borderTopColor, width: cs(av).borderTopWidth, crossesTop: ab.top < bb.top && ab.bottom > bb.top, atLeft: Math.abs(ab.left + ab.width / 2 - bb.left) < Math.abs(ab.left + ab.width / 2 - bb.right) } : null, covers }; };
        return { a: one('a'), b: one('b'), c: one('c'), thread: cs(document.querySelector('.plx-chat__thread')).backgroundColor };
      }, mode, dir);
    };
    // light, left to right: the owner's exact colors
    let r = await look('light', 'ltr');
    assert.equal(r.thread, rgb('#FFFFFF'), 'the thread is white');
    assert.deepEqual([r.a.bg, r.a.line, r.a.text], [rgb('#F5F7F9'), rgb('#A9B8C7'), rgb('#253442')], 'theirs: the owner\'s incoming colors');
    assert.deepEqual([r.c.bg, r.c.line, r.c.text], [rgb('#E6F0FC'), rgb('#B2CBE9'), rgb('#253442')], 'yours: the owner\'s outgoing colors');
    for (const m of [r.a, r.b, r.c]) { assert.equal(m.width, '1px', 'a 1px bubble border'); assert.equal(m.radius, '6px', 'the card corner, 6px'); }
    assert.deepEqual([r.a.avatar.line, r.a.avatar.width], [rgb('#A9B8C7'), '1px'], 'their photo: 1px in their outline');
    assert.deepEqual([r.c.avatar.line, r.c.avatar.width], [rgb('#B2CBE9'), '1px'], 'your photo: 1px in your outline');
    assert.ok(r.a.avatar.crossesTop && r.a.avatar.atLeft, 'their photo crosses the top start corner');
    assert.ok(r.c.avatar.crossesTop && !r.c.avatar.atLeft, 'your photo crosses the top end corner');
    assert.ok(!r.a.covers && !r.c.covers, 'a photo covers no text');
    assert.ok(Math.abs(r.b.left - r.a.left) <= 1, 'a continued message lines up with the first of its run');
    // right to left: mirrored
    r = await look('light', 'rtl');
    assert.ok(!r.a.avatar.atLeft && r.c.avatar.atLeft, 'right to left: theirs at the right corner, yours at the left');
    assert.ok(Math.abs(r.b.right - r.a.right) <= 1, 'right to left: the continued message lines up');
    // dark: the existing dark colors
    r = await look('dark', 'ltr');
    assert.deepEqual([r.a.bg, r.a.line, r.a.text], [rgb('#34363B'), rgb('#56585E'), rgb('#E8E9EC')], 'dark theirs');
    assert.deepEqual([r.c.bg, r.c.line], [rgb('#1F2A3A'), rgb('#3D5A80')], 'dark yours');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('CHAT_S1_637_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
