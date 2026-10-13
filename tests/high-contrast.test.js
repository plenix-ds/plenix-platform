// Plenix tests · high contrast and loading motion (library wave 2, lane B): system/forced-colors.css and the loading
// classes of system/motion.css, in a real page (the Settings application) with Chrome's media emulation.
//   forced colors (forced-colors: active): a focused field takes a Highlight border; a selected, current or pressed item
//     Highlight with HighlightText, and its icon HighlightText; an icon elsewhere CanvasText (not the Canvas the browser
//     would give its mask); a disabled control GrayText; a card an outline; a progress fill Highlight
//   more contrast (prefers-contrast: more): the border roles resolve to the strong border and muted text to the default
//     text color, in light and in dark
//   reduced motion (prefers-reduced-motion: reduce): plx-motion-spin, -shimmer and -progress stand still (no animation)
//   node tests/high-contrast.test.js            HC_PORT=8851 by default
const { serve, launch, sleep } = require('./lib.js');
const PORT = +process.env.HC_PORT || 8851;

const res = [], check = (n, ok, d) => res.push([n, !!ok, d]);

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 900 });
  const cdp = await page.createCDPSession();
  const media = (features) => cdp.send('Emulation.setEmulatedMedia', { features });
  const open = async () => { await page.goto('http://127.0.0.1:' + PORT + '/Plenix/settings/index.html', { waitUntil: 'networkidle0' }); await sleep(800); };
  // specimens drawn with the Platform's classes (no style attribute), and the value a system color computes to
  const draw = () => page.evaluate(() => {
    const host = document.createElement('div'); host.id = 'hc-host'; document.body.appendChild(host);
    host.innerHTML = '<input class="plx-input" id="hc-input" aria-label="Name">'
      + '<button type="button" class="plx-nav-list__item is-current" aria-current="page" id="hc-current"><span class="plx-icon plx-icon--add" aria-hidden="true"></span>All assets</button>'
      + '<button type="button" class="plx-button plx-button--secondary" aria-pressed="true" id="hc-pressed">Grid</button>'
      + '<button type="button" class="plx-button plx-button--secondary" disabled id="hc-disabled">Delete</button>'
      + '<span id="hc-plain"><span class="plx-icon plx-icon--add" aria-hidden="true"></span></span>'
      + '<div class="plx-card" id="hc-card"></div>'
      + '<div class="plx-progress-bar"><div class="plx-progress-bar__track"><span class="plx-progress-bar__fill" id="hc-fill"></span></div></div>'
      + '<span class="plx-motion-spin" id="hc-spin"></span><span class="plx-motion-shimmer" id="hc-shimmer"></span><span class="plx-motion-progress" id="hc-run"></span>'
      + '<span id="hc-probe"></span>';
  });
  // a rule added for the probe only, as a constructed stylesheet (no style element, no style attribute)
  const sys = (name, prop) => page.evaluate((n, p) => { const e = document.getElementById('hc-probe'); const sh = new CSSStyleSheet(); sh.replaceSync('#hc-probe{' + p + ':' + n + '}'); document.adoptedStyleSheets = [...document.adoptedStyleSheets, sh]; const v = getComputedStyle(e)[p === 'color' ? 'color' : 'backgroundColor']; document.adoptedStyleSheets = document.adoptedStyleSheets.filter((x) => x !== sh); return v; }, name, prop);
  const css = (id, prop, pseudo) => page.evaluate((i, p, ps) => getComputedStyle(document.querySelector(i), ps || null)[p], id, prop, pseudo);

  // 1. forced colors
  await media([{ name: 'forced-colors', value: 'active' }]);
  await open(); await draw();
  check('forced colors: the media query matches', await page.evaluate(() => matchMedia('(forced-colors: active)').matches));
  const HL = await sys('Highlight', 'background-color'), HLT = await sys('HighlightText', 'color'), TXT = await sys('CanvasText', 'color'), GRAY = await sys('GrayText', 'color');
  await page.focus('#hc-input');
  check('forced colors: a focused field has a Highlight border', (await css('#hc-input', 'borderTopColor')) === HL, await css('#hc-input', 'borderTopColor') + ' vs ' + HL);
  for (const id of ['#hc-current', '#hc-pressed']) {
    check('forced colors: ' + id + ' (selected) is Highlight with HighlightText', (await css(id, 'backgroundColor')) === HL && (await css(id, 'color')) === HLT, (await css(id, 'backgroundColor')) + ' / ' + (await css(id, 'color')));
  }
  check('forced colors: the icon of a current item is HighlightText', (await css('#hc-current .plx-icon', 'backgroundColor')) === HLT, await css('#hc-current .plx-icon', 'backgroundColor'));
  check('forced colors: an icon elsewhere is CanvasText', (await css('#hc-plain .plx-icon', 'backgroundColor')) === TXT, await css('#hc-plain .plx-icon', 'backgroundColor'));
  check('forced colors: a disabled button is GrayText', (await css('#hc-disabled', 'color')) === GRAY, await css('#hc-disabled', 'color'));
  check('forced colors: a card has an outline', (await css('#hc-card', 'outlineStyle')) === 'solid', await css('#hc-card', 'outlineStyle'));
  check('forced colors: a progress fill is Highlight', (await css('#hc-fill', 'backgroundColor')) === HL, await css('#hc-fill', 'backgroundColor'));

  // 2. more contrast, light and dark
  await media([{ name: 'prefers-contrast', value: 'more' }]);
  for (const mode of ['light', 'dark']) {
    await open();
    const v = await page.evaluate((m) => {
      document.documentElement.setAttribute('data-plx-mode', m);
      const s = getComputedStyle(document.documentElement), g = (n) => s.getPropertyValue(n).trim();
      // each role, resolved: a probe whose color is the role
      const res = (n) => { const e = document.createElement('span'); document.body.appendChild(e); e.setAttribute('data-hc', n); const sh = new CSSStyleSheet(); sh.replaceSync('[data-hc="' + n + '"]{color:var(' + n + ')}'); document.adoptedStyleSheets = [...document.adoptedStyleSheets, sh]; const c = getComputedStyle(e).color; document.adoptedStyleSheets = document.adoptedStyleSheets.filter((x) => x !== sh); e.remove(); return c; };
      return { matches: matchMedia('(prefers-contrast: more)').matches, strong: res('--plx-sys-border-strong'), subtle: res('--plx-sys-border-subtle'), def: res('--plx-sys-border-default'), divider: res('--plx-sys-border-divider'), control: res('--plx-sys-control-border'),
        text: res('--plx-sys-content-default'), muted: res('--plx-sys-content-muted'), subtleText: res('--plx-sys-content-subtle'), raw: g('--plx-sys-border-subtle') };
    }, mode);
    check('more contrast (' + mode + '): the media query matches', v.matches);
    check('more contrast (' + mode + '): every border role is the strong border', [v.subtle, v.def, v.divider, v.control].every((c) => c === v.strong), JSON.stringify(v));
    check('more contrast (' + mode + '): muted and subtle text are the default text', v.muted === v.text && v.subtleText === v.text, JSON.stringify(v));
  }

  // 3. reduced motion: the loading classes stand still; with motion they run
  await media([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await open(); await draw();
  for (const id of ['#hc-spin', '#hc-shimmer', '#hc-run']) check('reduced motion: ' + id + ' has no animation', (await css(id, 'animationName')) === 'none', await css(id, 'animationName'));
  await media([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await open(); await draw();
  check('motion: the spinner turns', (await css('#hc-spin', 'animationName')) === 'motion-spin', await css('#hc-spin', 'animationName'));
  check('motion: the indeterminate fill runs', (await css('#hc-run', 'animationName')) === 'motion-progress-run', await css('#hc-run', 'animationName'));

  await browser.close(); server.close();
  let bad = 0;
  for (const [n, ok, d] of res) { if (!ok) bad++; console.log((ok ? '  ok   ' : '  FAIL ') + n + (ok || !d ? '' : '  (' + d + ')')); }
  console.log(bad ? 'HIGH_CONTRAST_FAIL ' + bad + ' of ' + res.length : 'HIGH_CONTRAST_OK ' + res.length + ' checks');
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
