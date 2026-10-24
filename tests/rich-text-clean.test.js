/* Plenix tests · RichText cleans its html (#178)
   Summary: RichText's html prop goes through cleanRichText: no scripts, event attributes, unsafe addresses or frames;
     the documented elements (figure, figcaption, thead, tables) and the person's text formatting stay.
   Usage: node tests/rich-text-clean.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9373, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.goto('http://localhost:' + PORT + '/Plenix/platform/design-system/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.Plenix.RichText && window.ReactDOM, { timeout: 60000 });
    const out = await page.evaluate(async () => {
      const host = document.createElement('div'); document.body.append(host);
      const bad = '<h2 onclick="window.pwn=1">Title</h2><script>window.pwn=2<\/script>'
        + '<p style="position:fixed"><span style="color: red; position: fixed">x</span> <a href="javascript:window.pwn=3">bad</a> <a href="https://ok.example">ok</a></p>'
        + '<img src=x onerror="window.pwn=4"><figure><img src="a.png" alt="A"><figcaption>Cap</figcaption></figure>'
        + '<table><thead><tr><th>H</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table><iframe src="https://evil.example"></iframe>';
      ReactDOM.createRoot(host).render(React.createElement(Plenix.RichText, { html: bad }));
      await new Promise((r) => setTimeout(r, 300));
      return { html: host.innerHTML, pwn: window.pwn || null };
    });
    const h = out.html;
    assert.equal(out.pwn, null, 'no script ran');
    for (const no of ['onclick', '<script', 'javascript:', 'onerror', '<iframe', 'position']) assert.ok(!h.includes(no), 'removed: ' + no + '\n' + h);
    for (const yes of ['<h2>Title</h2>', 'href="https://ok.example"', '<figure>', '<figcaption>Cap</figcaption>', '<thead>', 'color: red', 'src="a.png"']) assert.ok(h.includes(yes), 'kept: ' + yes + '\n' + h);
    console.log('RICH_TEXT_CLEAN_OK scripts, events, unsafe links and frames removed; prose, figures, tables and text color kept');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
