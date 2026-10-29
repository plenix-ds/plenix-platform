/* Plenix tests · a project's notes show (issue 632).
   Summary: in the Projects application, a note belongs to the project whose name starts with its folder's first word
     ("Kitchen Reno" → Kitchen Renovation, "Apex Co" → Apex Co — Brand Refresh), the rule the tasks use:
       Kitchen Renovation's Notes panel shows its 2 notes as cards (Contractor comparison, Cabinet style decisions) and
       its Notes fact reads 2; Apex Co's shows its 2; the overview's Recent notes lists them (no "No notes yet.")
       a project with no notes (Home Purchase 2024) still shows its empty state
   Proof first: before #632 a note's whole folder ("Kitchen Reno") was compared with one word ("Kitchen"), so no project
     ever showed a note: the first lines fail there.
   Usage: node tests/project-notes-632.test.js   → PROJECT_NOTES_632_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9661, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1280, height: 860 });
    const open = async (hash) => { await page.goto('http://localhost:' + PORT + '/Plenix/projects/index.html' + hash, { waitUntil: 'networkidle0' }); await sleep(1200); };
    const look = () => page.evaluate(() => ({
      titles: [...document.querySelectorAll('.plx-content-grid .plx-card')].map((c) => (c.querySelector('.plx-card__title') || c).textContent.trim()),
      empty: !!document.querySelector('.plx-empty-state'), noNotes: /No notes yet/.test(document.querySelector('main') ? document.querySelector('main').textContent : document.body.textContent),
    }));
    await open('#/project/1/notes');
    let r = await look();
    assert.deepEqual(r.titles, ['Contractor comparison', 'Cabinet style decisions'], 'Kitchen Renovation shows its two notes: ' + JSON.stringify(r));
    assert.equal(r.empty, false, 'Kitchen Renovation: no empty state');
    await open('#/project/2/notes');
    r = await look();
    assert.equal(r.titles.length, 2, 'Apex Co shows its two notes: ' + JSON.stringify(r));
    await open('#/project/1');
    r = await look();
    assert.equal(r.noNotes, false, 'the overview\'s Recent notes lists them');
    await open('#/project/6/notes');
    r = await look();
    assert.ok(r.empty && r.titles.length === 0, 'a project with no notes shows its empty state: ' + JSON.stringify(r));
    assert.deepEqual(errors, [], 'no script errors');
    console.log('PROJECT_NOTES_632_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
