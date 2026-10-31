/* Plenix tests · Chat slice 5: pictures, files and voice messages inside a bubble (issue 637).
   Summary: Chat.Attachment shows a picture (a button that opens the MediaViewer), a file card (bordered icon, name, size, Download) or, when a picture does not load, a card
     that says so; Chat.Voice is the voice-message player (Play and Pause, bars, time, speed, a keyboard seek); the composer's record control is a disabled placeholder with a tooltip,
     and every icon-only control is a bordered button.
   The probe is proved able to see the old failure first: the old build has no Chat.Attachment or Chat.Voice, so every case below fails on it; and its composer icon buttons were ghost
     buttons (border width 0), so the border cases fail on it too.
   Cases: a picture opens the viewer; a broken picture becomes the "could not be loaded" card; a file card has a bordered icon and a Download link; Play turns into Pause and one voice
     message plays at a time; End on the seek slider moves to the end (aria-valuetext "23 seconds of 23 seconds"); the speed button cycles 1×, 1.5×, 2×; the waveform stays left to right in an
     Arabic page, and there the time, the speed and the spoken time use Arabic-Indic digits (8848087d wrote Latin ones, so that case fails on it); the record control is disabled, does nothing and has the tooltip; the composer's icon buttons and the Download button have a 1px border.
   Usage: node tests/chat-media-s5.test.js   (run by layout.test.js when the Chat, the MediaViewer or the Button changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9637, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await page.evaluate(async () => {
      const h = React.createElement, C = Plenix.Chat, tiny = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4"><rect width="4" height="4" fill="gray"/></svg>');
      const rate = 8000, n = rate * 23, buf = new Uint8Array(44 + n), dv = new DataView(buf.buffer), w = (o, s) => { for (let i = 0; i < s.length; i++) buf[o + i] = s.charCodeAt(i); };
      w(0, 'RIFF'); dv.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true); dv.setUint32(24, rate, true); dv.setUint32(28, rate, true); dv.setUint16(32, 1, true); dv.setUint16(34, 8, true); w(36, 'data'); dv.setUint32(40, n, true); buf.fill(128, 44);
      let s = ''; for (let i = 0; i < buf.length; i += 4096) s += String.fromCharCode.apply(null, buf.subarray(i, i + 4096)); const wav = 'data:audio/wav;base64,' + btoa(s);
      document.querySelector('main').innerHTML = '<div id="c" style="max-width:640px"></div><div id="d" style="max-width:560px"></div>';
      ReactDOM.createRoot(document.getElementById('c')).render(h(C.Thread, { label: 'Conversation' },
        h(C.Message, { author: 'Maya', time: '10:24' }, h(C.Attachments, null, h(C.Attachment, { src: tiny, name: 'one.png' }), h(C.Attachment, { src: tiny, name: 'two.png' }), h(C.Attachment, { src: 'data:image/png;base64,broken', name: 'three.png' }))),
        h(C.Message, { mine: true, time: '10:26' }, h(C.Attachment, { type: 'file', name: 'cabinet-quotes.pdf', size: 2400000, href: '#quotes' })),
        h(C.Message, { author: 'Maya', time: '10:28' }, h(C.Voice, { src: wav, duration: 23, id: 'v1' })),
        h(C.Message, { mine: true, time: '10:29' }, h(C.Voice, { src: wav, duration: 23, id: 'v2' }))));
      ReactDOM.createRoot(document.getElementById('d')).render(h(C.Composer, { value: '', onChange() {}, onSend() {}, onAttach() {} }));
      await new Promise((r) => setTimeout(r, 1500));
    });
    // a picture that does not load is a card that says so; the others are buttons
    const pics = await page.evaluate(() => ({ all: document.querySelectorAll('.plx-chat__image').length, broken: document.querySelectorAll('.plx-chat__image--broken').length, label: (document.querySelector('.plx-chat__image--broken') || {}).ariaLabel }));
    assert.equal(pics.all, 3, 'three pictures'); assert.equal(pics.broken, 1, 'the one that does not load is the broken card');
    assert.match(pics.label, /could not be loaded/, 'the broken card names the problem');
    // a picture opens the viewer (the message's pictures go in one viewer)
    await page.click('.plx-chat__image'); await sleep(500);
    assert.ok(await page.evaluate(() => !!document.querySelector('[role=dialog]')), 'a picture opens the viewer');
    await page.keyboard.press('Escape'); await sleep(300);
    assert.ok(await page.evaluate(() => !document.querySelector('[role=dialog]')), 'Escape closes it');
    // the file card: a bordered icon and a bordered Download link
    const file = await page.evaluate(() => { const a = document.querySelector('.plx-chat__file a'); return { thumb: getComputedStyle(document.querySelector('.plx-chat__file .plx-chat__attachment-thumb')).borderTopWidth, border: getComputedStyle(a).borderTopWidth, href: a.getAttribute('href'), label: a.getAttribute('aria-label') }; });
    assert.equal(file.thumb, '1px', 'the file icon has a 1px border'); assert.equal(file.border, '1px', 'Download has a 1px border'); assert.equal(file.href, '#quotes'); assert.match(file.label, /Download: cabinet-quotes\.pdf/);
    // the voice player: Play becomes Pause; one plays at a time; the seek slider takes the keys
    // the play button by its name ("… voice message"): an icon-only Button sits inside its Tooltip, so "#v1 > button" is the
    // speed button, the player's only direct button (issue 777)
    const play = (id) => id + ' button[aria-label$="voice message"]';
    const label = (id) => page.evaluate((sel) => document.querySelector(sel).getAttribute('aria-label'), play(id));
    assert.equal(await label('#v1'), 'Play voice message'); await page.click(play('#v1')); await sleep(900);
    assert.equal(await label('#v1'), 'Pause voice message', 'Play turns into Pause');
    await page.click(play('#v2')); await sleep(500);
    assert.equal(await label('#v1'), 'Play voice message', 'starting the second pauses the first'); assert.equal(await label('#v2'), 'Pause voice message');
    await page.focus('#v1 .plx-chat__voice-seek'); await page.keyboard.press('End'); await sleep(300);
    assert.equal(await page.evaluate(() => document.querySelector('#v1 .plx-chat__voice-seek').getAttribute('aria-valuetext')), '23 seconds of 23 seconds', 'End seeks to the end; the slider reads the time as words');
    assert.equal(await page.evaluate(() => document.querySelectorAll('#v1 .plx-chat__bar--played').length), 24, 'every bar is played at the end');
    await page.click('#v1 > button:last-of-type');
    assert.equal(await page.evaluate(() => document.querySelector('#v1 audio').playbackRate), 1.5, 'the speed button goes to 1.5×');
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('#v1 button[aria-label$="voice message"]')).borderTopWidth), '1px', 'Play has a 1px border');
    // the composer: the record control is a disabled placeholder with the tooltip; its icon buttons have a border
    const rec = await page.evaluate(() => { const s = document.querySelector('.plx-chat__record'); return { disabled: s.querySelector('button').disabled, aria: s.getAttribute('aria-disabled'), attach: getComputedStyle(document.querySelector('[aria-label="Attach a file"]')).borderTopWidth }; });
    assert.equal(rec.disabled, true, 'the record control is disabled'); assert.equal(rec.aria, 'true'); assert.equal(rec.attach, '1px', 'Attach has a 1px border (the old build: 0px)');
    await page.hover('.plx-chat__record'); await sleep(900);
    assert.ok(await page.evaluate(() => [...document.querySelectorAll('[role=tooltip]')].some((t) => /Voice messages coming soon/.test(t.textContent))), 'the tooltip says voice messages are coming');
    // an Arabic page: the waveform stays left to right
    await page.evaluate(() => { document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'ar'); }); await sleep(300);
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('#v1 .plx-chat__voice-wave')).direction), 'ltr', 'the waveform stays left to right');
    // an Arabic page: the time, the speed and the spoken time use Arabic-Indic digits, like the file size (8848087d wrote Latin ones); the speed click re-renders the player
    await page.click('#v1 > button:last-of-type'); await sleep(300);
    const ar = await page.evaluate(() => ({ time: document.querySelector('#v1 .plx-chat__voice-time').textContent, speed: document.querySelector('#v1 > button:last-of-type').textContent, spoken: document.querySelector('#v1 .plx-chat__voice-seek').getAttribute('aria-valuetext') }));
    for (const [what, text] of Object.entries(ar)) { assert.match(text, /[٠-٩]/, 'the ' + what + ' has Arabic-Indic digits: ' + text); assert.doesNotMatch(text, /[0-9]/, 'the ' + what + ' has no Latin digits: ' + text); }
    assert.match(ar.spoken, / من /, 'the spoken time uses the catalog\'s Arabic "of"');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('chat-media-s5: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
