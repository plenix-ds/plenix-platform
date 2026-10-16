// Render the actual design-system mixed-shape example and check all five ratios and aligned footers in both modes.
const assert = require('node:assert/strict'), fs = require('fs'), path = require('path'), os = require('os'), { serve, launch } = require('./lib');
(async () => {
  const port = +process.env.TEST_PORT || 9268, server = await serve(port), artifacts = process.env.TEST_ARTIFACT_DIR || path.join(os.tmpdir(), 'plenix-media-card-shapes'); fs.mkdirSync(artifacts, { recursive: true }); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(), errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.setViewport({ width: 1280, height: 1000 });
    await page.goto('http://127.0.0.1:' + port + '/Plenix/platform/design-system/index.html#/data-display/media-card', { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.DSInventory && window.Plenix && Plenix.MediaCard);
    for (const mode of ['light', 'dark']) {
      const result = await page.evaluate(async mode => {
        document.documentElement.setAttribute('data-plx-mode', mode);
        const records = Array.isArray(DSInventory) ? DSInventory : Object.values(DSInventory), record = records.find(record => record.id === 'media-card');
        if (!record) throw Error('Missing MediaCard record');
        const shapes = record.examples.find(group => group[0] === 'Portrait and landscape');
        if (!shapes || shapes[1].length !== 5) throw Error('Missing five shape cards');
        const example = record.examples.find(group => group[0] === 'Mixed shapes');
        const host = document.createElement('section'); host.id = 'plx-shape-review'; document.body.replaceChildren(host);
        const root = ReactDOM.createRoot(host); ReactDOM.flushSync(() => root.render(example[1]())); window.shapeRoot = root;
        await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return [...host.querySelectorAll('.plx-media-card')].map(card => {
          const media = card.querySelector('.plx-media-card__media'), info = card.querySelector('.plx-media-card__info'), box = media.getBoundingClientRect(), footer = info.getBoundingClientRect(), frame = card.getBoundingClientRect();
          return { shape: media.getAttribute('data-plx-aspect'), ratio: box.width / box.height, footerHeight: footer.height, footerBottom: footer.bottom, bottom: frame.bottom, inline: card.querySelector('[style]') !== null };
        });
      }, mode);
      assert.equal(result.length, 5);
      for (const row of result) { const [w, h] = row.shape.split('/').map(Number); assert.ok(Math.abs(row.ratio - w / h) < 0.01, row.shape + ' ratio: ' + row.ratio); assert.equal(row.inline, false); assert.ok(Math.abs(row.footerHeight - result[0].footerHeight) < 0.1); assert.ok(Math.abs(row.footerBottom - result[0].footerBottom) < 0.1); assert.ok(Math.abs(row.bottom - result[0].bottom) < 0.1); }
      await (await page.$('#plx-shape-review')).screenshot({ path: path.join(artifacts, 'media-card-shapes-' + mode + '.png') });
      await page.evaluate(() => ReactDOM.flushSync(() => shapeRoot.unmount()));
    }
    assert.deepEqual(errors, []); console.log('MEDIA_CARD_SHAPES_OK five DS shapes, exact ratios, equal footer heights and aligned rows in light/dark; ' + artifacts);
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
