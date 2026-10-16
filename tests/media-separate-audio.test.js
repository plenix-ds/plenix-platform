// Real local WebM/WAV lab: native transport, seek/rate/volume, drift, failure and viewer navigation cleanup.
const assert = require('node:assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const port = +process.env.TEST_PORT || 9269, server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(), errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.setViewport({ width: 1280, height: 1000 });
    await page.goto('http://127.0.0.1:' + port + '/Plenix/platform/design-system/index.html#/specialized/media-player', { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.Plenix && window.DSInventory);
    await page.evaluate(() => {
      const list = Array.isArray(DSInventory) ? DSInventory : Object.values(DSInventory), player = list.find(record => record.id === 'media-player'), viewer = list.find(record => record.id === 'media-lightbox');
      if (!viewer.examples.some(group => group[0] === 'Video items')) throw Error('Missing video viewer example');
      const example = player.examples.find(group => group[0] === 'Separate sound'); if (!example) throw Error('Missing separate-audio lab');
      const host = document.createElement('main'); host.id = 'plx-media-test'; document.body.replaceChildren(host); window.mediaRoot = ReactDOM.createRoot(host); ReactDOM.flushSync(() => mediaRoot.render(example[1]()));
    });
    await page.click('#plx-media-test button');
    await page.waitForFunction(() => { const v = document.querySelector('#plx-media-test video'), a = document.querySelector('#plx-media-test audio'); return v && a && v.readyState >= 3 && a.readyState >= 2; }, { timeout: 30000 });
    const wait = () => new Promise(resolve => setTimeout(resolve, 150));
    let result = await page.evaluate(async () => {
      const v = document.querySelector('#plx-media-test video'), a = document.querySelector('#plx-media-test audio'); window.labVideo = v; window.labSound = a;
      const urls = await Promise.all([fetch(v.src).then(response => response.blob()), fetch(a.src).then(response => response.blob())]); window.viewerSources = urls.map(blob => URL.createObjectURL(blob));
      return { videoPaused: v.paused, audioPaused: a.paused, hidden: a.hidden, controls: v.controls && !a.controls };
    }); assert.deepEqual(result, { videoPaused: true, audioPaused: true, hidden: true, controls: true });
    await page.evaluate(() => labVideo.play()); await page.waitForFunction(() => !labSound.paused && labSound.currentTime > 0);
    await wait(); assert.ok(await page.evaluate(() => Math.abs(labVideo.currentTime - labSound.currentTime) < 0.25));
    await page.evaluate(() => labVideo.pause()); await wait(); assert.equal(await page.evaluate(() => labSound.paused), true);
    await page.focus('#plx-media-test input[type="range"]'); await page.keyboard.press('Home'); await wait(); assert.equal(await page.evaluate(() => labSound.volume), 0); await page.keyboard.press('ArrowRight'); await wait(); assert.equal(await page.evaluate(() => labSound.volume), 0.01);
    await page.evaluate(() => [...document.querySelectorAll('#plx-media-test button')].find(button => button.textContent === 'Mute').click()); await wait(); assert.equal(await page.evaluate(() => labSound.muted), true);
    await page.evaluate(() => [...document.querySelectorAll('#plx-media-test button')].find(button => button.textContent === 'Mute').click()); await wait(); assert.equal(await page.evaluate(() => labSound.muted), false);
    await page.select('#plx-media-test select', '1.5'); await wait(); assert.equal(await page.evaluate(() => labSound.playbackRate), 1.5);
    await page.evaluate(() => { labVideo.volume = 0.35; labVideo.muted = true; }); await wait(); assert.deepEqual(await page.evaluate(() => ({ volume: labSound.volume, muted: labSound.muted })), { volume: 0.35, muted: true });
    await page.evaluate(() => { labVideo.muted = false; labVideo.currentTime = 1; }); await page.waitForFunction(() => !labVideo.seeking && Math.abs(labSound.currentTime - 1) < 0.1);
    await page.evaluate(() => { labSound.currentTime = 1.1; }); await wait(); await page.evaluate(() => labVideo.dispatchEvent(new Event('timeupdate'))); assert.ok(await page.evaluate(() => Math.abs(labSound.currentTime - 1.1) < 0.02), 'small drift should not cause a seek');
    await page.evaluate(() => { labSound.currentTime = 1.6; }); await wait(); await page.evaluate(() => labVideo.dispatchEvent(new Event('timeupdate'))); assert.ok(await page.evaluate(() => Math.abs(labSound.currentTime - labVideo.currentTime) < 0.02), 'large drift should resync');
    await page.evaluate(() => { labSound.src = location.origin + '/Plenix/tests/no-such-audio.wav'; labSound.load(); });
    await page.waitForFunction(() => document.querySelector('#plx-media-test').textContent.includes('Video is playing muted.') && labVideo.muted);
    await page.evaluate(() => labVideo.play()); await wait(); assert.equal(await page.evaluate(() => !labVideo.paused && labSound.paused && labVideo.muted), true); await page.evaluate(() => labVideo.pause());
    await page.evaluate(() => {
      function Viewer() { const [open, setOpen] = React.useState(true); return React.createElement(Plenix.MediaViewer, { open, onClose: () => setOpen(false), defaultIndex: 1, items: [{ src: '/Plenix/dam/assets/thumb-10.svg', title: 'Image' }, { kind: 'video', src: viewerSources[0], audio: viewerSources[1], title: 'Video' }] }); }
      ReactDOM.flushSync(() => mediaRoot.render(React.createElement(Viewer)));
    });
    await page.waitForFunction(() => document.querySelector('.plx-media-viewer video')?.readyState >= 3);
    await page.evaluate(() => { window.oldVideo = document.querySelector('.plx-media-viewer video'); window.oldSound = document.querySelector('.plx-media-viewer audio'); return oldVideo.play(); }); await page.waitForFunction(() => !oldSound.paused);
    const geometry = await page.evaluate(() => { const video = document.querySelector('.plx-media-viewer video').getBoundingClientRect(), select = document.querySelector('.plx-media-viewer select').getBoundingClientRect(); return { width: video.width, height: video.height, bottom: video.bottom, controlsBottom: select.bottom, viewport: innerHeight }; });
    assert.ok(geometry.width > 0 && geometry.height > 0 && geometry.bottom <= geometry.viewport && geometry.controlsBottom <= geometry.viewport, JSON.stringify(geometry));
    if (process.env.MEDIA_REVIEW_FILE) await page.screenshot({ path: process.env.MEDIA_REVIEW_FILE });
    await page.click('[aria-label="Next"]'); await wait(); assert.equal(await page.evaluate(() => oldVideo.paused && oldSound.paused && !oldVideo.isConnected && !!document.querySelector('.plx-media-viewer__image')), true);
    await page.evaluate(() => document.querySelector('.plx-media-viewer').focus()); await page.keyboard.press('ArrowRight'); await page.waitForFunction(() => document.querySelector('.plx-media-viewer video')?.readyState >= 3);
    await page.evaluate(() => document.querySelector('.plx-media-viewer').focus()); await page.keyboard.press('ArrowLeft'); await wait();
    const box = await (await page.$('.plx-media-viewer__stage')).boundingBox(); assert.ok(box.width > 0 && box.height > 0, 'preview stage must have visible bounds'); await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.5); await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, { steps: 10 }); await page.mouse.up(); await wait(); await page.waitForFunction(() => document.querySelector('.plx-media-viewer video')?.readyState >= 3, { timeout: 5000 });
    await page.evaluate(() => { window.oldVideo = document.querySelector('.plx-media-viewer video'); window.oldSound = document.querySelector('.plx-media-viewer audio'); return oldVideo.play(); }); await page.waitForFunction(() => !oldSound.paused);
    await page.click('[aria-label="Close preview"]'); await wait(); assert.equal(await page.evaluate(() => oldVideo.paused && oldSound.paused && !document.querySelector('.plx-media-viewer')), true);
    await page.evaluate(() => { ReactDOM.flushSync(() => mediaRoot.unmount()); viewerSources.forEach(url => URL.revokeObjectURL(url)); });
    assert.deepEqual(errors, []); console.log('MEDIA_SEPARATE_AUDIO_OK real WebM/WAV: play/pause, rate, seek, volume/mute, drift threshold, muted audio failure, viewer arrows/swipe/navigation/close');
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
