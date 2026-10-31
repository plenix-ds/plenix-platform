/* Plenix tests · the Chat composer: one outlined box, attachments, emoji and dictation (issue 637, slice 3; owner 2026-10-29).
   Summary: the composer is one outlined box (the input's 1px border and radius, the focus turns the border) holding the files waiting, a text area with no border of its own
     (Input's context hooks) and a row of tools: Attach, Image and Emoji at the start; Listening, the microphone and Send (an arrow with its word) at the end, with the microphone
     right before Send. There is no "Enter to send" hint.
   The microphone is looked for each time the composer is drawn: hidden where the browser has no SpeechRecognition (Chrome has one itself, so the test removes it), shown when a stub is
     there. Dictation puts the spoken words into the box as they come, in the page's language (ar-EG for Arabic, en-US for English), with "Listening…" and a Stop.
   The probe is proved able to see the difference first: the same composer without a recognition has no microphone, and with a stub it has one.
   Cases: the microphone hidden and shown; Send disabled when empty and enabled with text; Enter sends; the box is the bordered one and the text area is not; the focus turns the box's
     border; right to left mirrors the tools (Send at the left, the microphone right before it); dictation (words, language, Listening, Stop); typing while dictating keeps the typed text and stops dictation; the emoji button opens a panel;
     files: previews on the card standard, progress, an error with Retry, Send off while one uploads, a pasted and a dropped file reach onAttach.
   Usage: node tests/chat-composer-s3.test.js   (run by layout.test.js when the Chat, the Input or the Popover changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9633, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const open = async (dir, stub, files) => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message)); await page.setViewport({ width: 900, height: 900 });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate((dir, stub, files) => {
        delete window.SpeechRecognition; delete window.webkitSpeechRecognition; window.__recs = [];
        if (stub) window.SpeechRecognition = function () { const r = this; window.__recs.push(r); r.start = () => { r.started = true; }; r.stop = () => { r.stopped = true; if (r.onend) r.onend(); }; r.abort = () => {}; };
        const d = document.documentElement; d.setAttribute('dir', dir); d.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        window.__sent = []; window.__attached = []; document.querySelector('main').innerHTML = '<div id="c" style="max-width:600px"></div>';
        const h = React.createElement, P = Plenix;
        function App() {
          const [v, setV] = React.useState(files ? 'hi' : '');
          return h(P.Chat.Composer, { value: v, onChange: setV, onSend: (t, f) => { window.__sent.push([t, f.length]); setV(''); }, attachments: files || [], onAttach: (list) => window.__attached.push(list.map((f) => f.name)),
            onRetryAttachment: () => {}, onRemoveAttachment: () => {}, onCancelAttachment: () => {} });
        }
        ReactDOM.createRoot(document.getElementById('c')).render(h(App));
      }, dir, stub, files || null);
      await wait(900); return page;
    };
    // the buttons by their names in the page's language: the right-to-left page is Arabic (lang="ar"), where they read
    // "إرفاق ملف" and "إضافة رمز تعبيري" (issue 777: the English names found nothing there)
    const tools = (p) => p.evaluate(() => {
      const ar = document.documentElement.getAttribute('lang') === 'ar';
      const x = (el) => el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2, q = (s) => document.querySelector(s);
      return { attach: x(q('[aria-label="' + (ar ? 'إرفاق ملف' : 'Attach a file') + '"]')), emoji: x(q('[aria-label="' + (ar ? 'إضافة رمز تعبيري' : 'Add an emoji') + '"]')),
        mic: x(q('.plx-chat__mic button')), send: x(q('button[type=submit]')) };
    });
    // the probe sees the microphone appear
    let page = await open('ltr', false);
    assert.equal(await page.$('.plx-chat__mic'), null, 'no recognition: no microphone');
    await page.close(); page = await open('ltr', true);
    assert.ok(await page.$('.plx-chat__mic'), 'the probe sees it: with a recognition the microphone is there');
    const text = await page.evaluate(() => document.querySelector('.plx-chat__composer').textContent);
    assert.ok(!/Enter to send/i.test(text), 'no "Enter to send" hint');
    // Send: off when empty, on with text; Enter sends
    const send = () => page.evaluate(() => document.querySelector('.plx-chat__tools-end button[type=submit]').disabled);
    assert.equal(await send(), true, 'Send is disabled when empty');
    await page.type('.plx-chat__field', 'hello');
    assert.equal(await send(), false, 'Send is on with text');
    await page.keyboard.press('Enter'); await wait(200);
    assert.deepEqual(await page.evaluate(() => window.__sent), [['hello', 0]], 'Enter sends');
    // the box and the field
    const look = await page.evaluate(() => {
      const b = getComputedStyle(document.querySelector('.plx-chat__box')), f = getComputedStyle(document.querySelector('.plx-chat__field'));
      return { box: b.borderTopWidth + ' ' + b.borderInlineStartWidth, field: [f.borderTopWidth, f.borderBottomWidth, f.borderInlineStartWidth, f.borderInlineEndWidth].join(' '), fieldBg: f.backgroundColor };
    });
    assert.equal(look.box, '1px 1px', 'the box has the 1px border');
    assert.equal(look.field, '0px 0px 0px 0px', 'the text area has no border of its own');
    assert.equal(look.fieldBg, 'rgba(0, 0, 0, 0)', 'the text area has no fill of its own');
    const unfocused = await page.evaluate(() => { document.activeElement.blur(); return getComputedStyle(document.querySelector('.plx-chat__box')).borderTopColor; });
    await page.focus('.plx-chat__field'); await wait(150);
    const focused = await page.evaluate(() => getComputedStyle(document.querySelector('.plx-chat__box')).borderTopColor);
    assert.notEqual(focused, unfocused, 'the focus turns the box\'s border');
    // the order of the tools, left to right
    const ltr = await tools(page);
    assert.ok(ltr.attach < ltr.emoji && ltr.emoji < ltr.mic && ltr.mic < ltr.send, 'ltr: Attach and Emoji at the start; the microphone, then Send, at the end');
    // dictation
    await page.click('.plx-chat__mic button'); await wait(300);
    await page.evaluate(() => {
      const r = window.__recs[0];
      r.onresult({ results: [Object.assign([{ transcript: 'hello there' }], { isFinal: true }), Object.assign([{ transcript: ' and more' }], { isFinal: false })] });
    });
    await wait(300);
    const listening = await page.evaluate(() => ({ lang: window.__recs[0].lang, started: window.__recs[0].started, value: document.querySelector('.plx-chat__field').value, label: (document.querySelector('.plx-chat__listening') || {}).textContent || '', stop: !!document.querySelector('.plx-chat__listening button') }));
    assert.equal(listening.started, true, 'dictation started');
    assert.equal(listening.lang, 'en-US', 'an English page dictates in en-US');
    assert.equal(listening.value, 'hello there and more', 'the words appear in the box as they are spoken');
    assert.ok(/Listening/.test(listening.label) && listening.stop, '"Listening…" and a Stop button show');
    await page.click('.plx-chat__listening button'); await wait(300);
    assert.equal(await page.evaluate(() => !!document.querySelector('.plx-chat__listening')), false, 'Stop ends it');
    // the emoji button opens a panel
    await page.click('[aria-label="Add an emoji"]'); await wait(400);
    assert.ok(await page.evaluate(() => /emoji picker is coming/i.test(document.body.textContent)), 'the emoji button opens the placeholder panel');
    await page.close();
    // right to left: mirrored, and dictation in ar-EG
    page = await open('rtl', true);
    const rtl = await tools(page);
    assert.ok(rtl.send < rtl.mic && rtl.mic < rtl.emoji && rtl.emoji < rtl.attach, 'rtl: mirrored: Send at the left, the microphone right before it, Emoji and Attach at the right');
    await page.click('.plx-chat__mic button'); await wait(300);
    assert.equal(await page.evaluate(() => window.__recs[0].lang), 'ar-EG', 'an Arabic page dictates in ar-EG');
    await page.close();
    // typing while dictating: the typed text is kept and dictation stops (a later result must not write the starting text plus the speech over it)
    page = await open('ltr', true);
    await page.click('.plx-chat__mic button'); await wait(300);
    await page.evaluate(() => window.__recs[0].onresult({ results: [Object.assign([{ transcript: 'hello' }], { isFinal: false })] }));
    await wait(200);
    assert.equal(await page.evaluate(() => document.querySelector('.plx-chat__field').value), 'hello', 'the probe sees the speech reach the box');
    await page.focus('.plx-chat__field'); await page.keyboard.press('End'); await page.keyboard.type('x'); await wait(200);
    await page.evaluate(() => { const r = window.__recs[0]; if (r.onresult) r.onresult({ results: [Object.assign([{ transcript: 'hello world' }], { isFinal: true })] }); });
    await wait(300);
    const typedWhile = await page.evaluate(() => ({ value: document.querySelector('.plx-chat__field').value, stopped: !!window.__recs[0].stopped, listening: !!document.querySelector('.plx-chat__listening') }));
    assert.equal(typedWhile.value, 'hellox', 'a character typed while dictating is kept; the next result does not overwrite it');
    assert.equal(typedWhile.stopped, true, 'typing stops the dictation');
    assert.equal(typedWhile.listening, false, '"Listening…" is gone once the person types');
    await page.close();
    // a dropped and a pasted file reach onAttach
    page = await open('ltr', true);
    await page.evaluate(() => {
      const dt = new DataTransfer(); dt.items.add(new File(['x'], 'dropped.txt', { type: 'text/plain' }));
      const box = document.querySelector('.plx-chat__box');
      box.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt }));
      box.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt }));
      const dp = new DataTransfer(); dp.items.add(new File(['y'], 'pasted.png', { type: 'image/png' }));
      const ev = new Event('paste', { bubbles: true, cancelable: true }); ev.clipboardData = dp;
      document.querySelector('.plx-chat__field').dispatchEvent(ev);
    });
    await wait(300);
    assert.deepEqual(await page.evaluate(() => window.__attached), [['dropped.txt'], ['pasted.png']], 'a dropped file and a pasted file reach onAttach');
    await page.close();
    // the files waiting
    page = await open('ltr', true, [{ id: 'a', name: 'cabinet-quotes.pdf', status: 'uploading', progress: 60 }, { id: 'b', name: 'pantry-wall.psd', status: 'error' }]);
    const files = await page.evaluate(() => {
      const a = document.querySelector('.plx-chat__attachment'), s = getComputedStyle(a);
      return { count: document.querySelectorAll('.plx-chat__attachment').length, border: s.borderTopWidth, radius: s.borderStartStartRadius, progress: !!a.querySelector('.plx-progress-bar'),
        retry: /Retry/.test(document.querySelector('.plx-chat__strip').textContent), sendOff: document.querySelector('button[type=submit]').disabled };
    });
    assert.equal(files.count, 2, 'two previews');
    assert.equal(files.border, '1px', 'a preview has the card standard\'s 1px border');
    assert.equal(files.radius, '6px', 'and the card radius (6px)');
    assert.ok(files.progress, 'an uploading file shows its progress');
    assert.ok(files.retry, 'a failed file offers Retry');
    assert.equal(files.sendOff, true, 'Send is off while a file uploads');
    await page.close();
    assert.deepEqual(errors, [], 'no script errors');
    console.log('chat-composer-s3: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
