/* Plenix tests · RichTextEditor inserts an image (issue 884).
   Summary: the editor's Insert image (toolbar Image, an address and a description, Add image or Enter) puts the picture in
     the text, in a left-to-right and in a right-to-left page, with no script error. Before #884 it threw a ReferenceError
     (SAFE_SRC was not defined in RichTextEditor.jsx after #178 moved it into utils/richTextClean.ts) and inserted nothing.
   Checks, in each direction:
     1. an https address with a description inserts one img with that src and alt;
     2. an address without a scheme (example.com/b.png) inserts it as https;
     3. a javascript: address inserts nothing (the cleaner's address check refuses it);
     4. no page error.
   And in the source: RichTextEditor takes the image address check from utils/richTextClean.ts (the cleaner's own export),
     with no copy of its own.
   The probe is proved able to see a failure: on the code before #884, check 1 finds no img and the page error list holds
     "SAFE_SRC is not defined".
   Usage: node tests/rte-insert-image-884.test.js   → RTE_INSERT_IMAGE_884_OK */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { serve, launch } = require('./lib');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ROOT = path.join(__dirname, '..');

// the source: the check is the cleaner's export, imported, not a regex of the editor's own
const editor = fs.readFileSync(path.join(ROOT, 'platform/components/RichTextEditor/RichTextEditor.jsx'), 'utf8');
const cleaner = fs.readFileSync(path.join(ROOT, 'platform/utils/richTextClean.ts'), 'utf8');
assert.ok(/export const SAFE_SRC\b/.test(cleaner), 'richTextClean.ts exports SAFE_SRC');
assert.ok(/import \{[^}]*\bSAFE_SRC\b[^}]*\} from '\.\.\/\.\.\/utils\/richTextClean\.ts'/.test(editor), 'RichTextEditor imports SAFE_SRC from the cleaner');
assert.ok(!/const SAFE_SRC\s*=/.test(editor), 'RichTextEditor has no SAFE_SRC of its own');

(async () => {
  const PORT = +process.env.TEST_PORT || 9684, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1300, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });

    const render = (dir) => page.evaluate(async (dir) => {
      document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      const h = React.createElement, P = window.Plenix;
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', { id: 'rte' }, h(P.RichTextEditor, { label: 'Notes', defaultValue: '<p>Text before the picture.</p>' })));
      await new Promise((r) => setTimeout(r, 2000));
    }, dir);
    // the toolbar's Image button, or the same item in its More formatting menu when the toolbar folds
    const openImage = async () => {
      const direct = await page.$('#rte [role="toolbar"] button[aria-label="Image"]');
      if (direct && await direct.boundingBox()) await direct.click();
      else {
        await page.click('#rte [role="toolbar"] button[aria-label="More formatting"]'); await sleep(300);
        const item = await page.evaluateHandle(() => [...document.querySelectorAll('[role="menuitem"]')].find((m) => m.textContent.trim() === 'Image'));
        await item.asElement().click();
      }
      await page.waitForSelector('#rte input[aria-label="Image address"]', { timeout: 5000 });
    };
    const insert = async (address, description) => {
      await page.click('#rte [role="textbox"]'); await page.keyboard.press('End');
      await openImage();
      await page.type('#rte input[aria-label="Image address"]', address);
      if (description) await page.type('#rte input[aria-label="Description"]', description);
      await page.keyboard.press('Enter'); await sleep(400);
    };
    const images = () => page.evaluate(() => [...document.querySelectorAll('#rte [role="textbox"] img')].map((i) => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt') })));

    for (const dir of ['ltr', 'rtl']) {
      await render(dir);
      await insert('https://example.com/a.png', 'A picture');
      assert.deepEqual(await images(), [{ src: 'https://example.com/a.png', alt: 'A picture' }], dir + ': an https address inserts the picture');
      await insert('example.com/b.png', '');
      const two = await images();
      assert.equal(two.length, 2, dir + ': a second picture is inserted: ' + JSON.stringify(two));
      assert.equal(two[1].src, 'https://example.com/b.png', dir + ': an address without a scheme is taken as https');
      await insert('javascript:alert(1)', 'bad');
      assert.equal((await images()).length, 2, dir + ': a javascript: address inserts nothing');
      assert.deepEqual(errors, [], dir + ': no page error');
    }
    console.log('RTE_INSERT_IMAGE_884_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
