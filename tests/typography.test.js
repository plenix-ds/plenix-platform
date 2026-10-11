// Plenix tests · typography (owner, 2026-10-04, restored 2026-10-11; Platforms Standard 3.4): DM Sans for all interface
// text; DM Mono only for code (--plx-sys-font-code) and technical values (--plx-sys-font-data: IDs, file names and paths,
// versions, dates and times, sizes, counts, durations, measured percentages, coordinates), chosen by the value's kind, and
// always at its neighbors' size and line height so Mono and Sans share a baseline. On every app page and a sample of the
// design system's pages (the first of each group and the pages of tokens, tables and values), in light and dark, with the
// fonts loaded:
//   role      an element marked as code or data (code, kbd, pre, samp, Text "data", .plx-font-data/-code, a DataTable or
//             Table column of kind "data", a PropertyList value marked data) computes to DM Mono
//   prose     text in DM Mono is a code or data value, never a sentence (four or more plain words, no code characters)
//   pattern   visible text that is wholly a technical value (2026-10-11, Oct 11, 2026, 10:42 AM, 12 MB, 1.2 GB, 640×480,
//             v1.2.3, report.pdf, #1234, a UUID) is in DM Mono (badges, tags, chips, buttons, inputs, menus and navigation
//             keep their component's typography; a title or heading keeps the heading typography)
//   baseline  DM Mono and DM Sans text on the same line of the same row (a table row, a PropertyList item, a flex row,
//             a line of running text) sit on one baseline, within 0.5px
// Known findings are kept in tests/baselines/typography.json (page -> mode -> check -> number); the test fails only when
// a page and mode has more findings than recorded, so they can only go down (aim: none).
//   node tests/typography.test.js            compare
//   node tests/typography.test.js --update   record the current findings as the baseline
//   TYPO_VERBOSE=1 node tests/typography.test.js   list every finding
//   TYPO_ONLY=<pattern> node tests/typography.test.js   only the pages whose name matches
//   TYPO_PORT=8863 node tests/typography.test.js   another port
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep } = require('./lib.js');
const PORT = +process.env.TYPO_PORT || 8861, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const BASELINE = path.join(__dirname, 'baselines', 'typography.json');
const ONLY = process.env.TYPO_ONLY ? new RegExp(process.env.TYPO_ONLY) : null;
const APP_PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']);
// design-system pages: the first item of each group (section and subgroup), and these, where tables of tokens, sizes and
// values are
const DS_TITLES = ['Typography', 'Design tokens', 'Color', 'Spacing', 'Radius', 'Text', 'Table', 'Data table', 'Property list', 'Code block', 'Keyboard shortcut', 'Metric', 'Activity list', 'File list', 'Button', 'Badge'];
const CHECKS = ['role', 'prose', 'pattern', 'baseline'];

// runs in the page: the findings of each check
async function inspect() {
  await document.fonts.ready;
  const MONO = /^"?DM Mono/i;
  const fam = (el) => getComputedStyle(el).fontFamily;
  const isMono = (el) => MONO.test(fam(el));
  // marked as code or data: the elements and classes of the code and data roles
  const ROLE = 'code, kbd, pre, samp, .plx-text--data, .plx-font-data, .plx-font-code, .plx-u-font-data, [class*="__cell--data"], .plx-property-list__value--data';
  // components that keep their own typography (a label inside a control or a pill), and specimens
  const OWN = '.plx-badge, .plx-tag, .plx-chip, .plx-button, .plx-count, .plx-avatar, .plx-status-dot, input, textarea, select, option, button, [role="menuitem"], [role="option"], [role="tab"], .tabulator-header, .ds-vis, .ds-specimens, .ds-type, svg';
  // titles and headings
  const TITLE = 'h1, h2, h3, h4, h5, h6, [class*="__title"], .plx-text--title, .plx-text--heading, .plx-text--eyebrow';
  const shown = (el) => { if (!el.getClientRects().length) return false; const c = getComputedStyle(el); return c.visibility !== 'hidden' && !el.closest('[hidden], [aria-hidden="true"], .plx-visually-hidden, .plx-u-sr-only'); };
  const say = (el, t) => { const c = typeof el.className === 'string' ? el.className.split(' ').filter((x) => /^(plx|ds|tabulator)-/.test(x)).slice(0, 2).join('.') : ''; return '"' + t.slice(0, 28) + '" (' + el.tagName.toLowerCase() + (c ? '.' + c : '') + ', ' + fam(el).split(',')[0] + ' ' + getComputedStyle(el).fontSize + ')'; };
  const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';
  const ONE = [
    '\\d{4}-\\d{2}-\\d{2}(?:[ T]\\d{1,2}:\\d{2}(?::\\d{2})?)?',               // 2026-10-11, 2026-10-11 10:42
    MONTH + ' \\d{1,2}(?:, \\d{4})?(?:,? \\d{1,2}:\\d{2}(?:\\s?[AP]M)?)?',     // Oct 11, Oct 11, 2026
    '\\d{1,2} ' + MONTH + '(?: \\d{4})?',                                      // 11 Oct 2026
    '\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\s?[AP]M)?',                                // 10:42, 10:42 AM
    '\\d+(?:[.,]\\d+)?\\s?(?:B|KB|MB|GB|TB|kB)',                               // 12 MB, 1.2 GB
    '\\d+\\s?[×x]\\s?\\d+(?:\\s?px)?',                                         // 640×480
    'v\\d+(?:\\.\\d+){1,3}(?:-[\\w.]+)?|\\d+\\.\\d+\\.\\d+(?:-[\\w.]+)?',      // v1.2.3, 0.31.39
    '[\\w-][\\w .()-]*\\.(?:pdf|png|jpe?g|gif|svg|webp|avif|heic|tiff?|psd|ai|eps|indd|mp4|mov|webm|mp3|wav|docx?|xlsx?|pptx?|csv|txt|md|json|jsx?|css|html|zip)', // report.pdf
    '#\\d{2,}',                                                                 // #1234
    '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',            // a UUID
  ];
  const TECH = new RegExp('^(?:' + ONE.join('|') + ')(?:\\s*[·,–-]\\s*(?:' + ONE.join('|') + '))*$', 'i');
  // a sentence: four or more words of letters (with ordinary punctuation), none of the characters of code or values
  const prose = (t) => { const w = t.split(/\s+/).filter(Boolean); return w.length >= 4 && !/[=<>{}()[\]\/\\_#@$`|*+~^"]|--|\d/.test(t) && w.every((x) => /^[A-Za-z][a-z'’]*[,.!?:;]?$/.test(x)); };
  const out = { role: [], prose: [], pattern: [], baseline: [] };
  const texts = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walk.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue;
    const el = n.parentElement; if (!el || el.closest('script, style, noscript, template, title') || !shown(el)) continue;
    texts.push({ n, t, el, mono: isMono(el) });
  }
  for (const x of texts) {
    const own = x.el.closest(OWN);
    const role = x.el.closest(ROLE);
    // role: marked as code or data, set in DM Mono
    if (role && !own && !x.mono) out.role.push(say(x.el, x.t));
    // prose: DM Mono is never used for a sentence (a code block is code, comments and all)
    if (x.mono && !x.el.closest('pre, .ds-type, .ds-vis, .ds-specimens') && prose(x.t)) out.prose.push(say(x.el, x.t));
    // pattern: a technical value on its own is in DM Mono (a title or heading that names a thing by its date
    // or file name is a title: it keeps the heading typography)
    if (!x.mono && !own && !x.el.closest('[role="menu"], [role="listbox"], nav, .plx-tooltip, [role="tooltip"], ' + TITLE) && TECH.test(x.t)) out.pattern.push(say(x.el, x.t));
  }
  // baseline: each Mono text against the Sans texts on its line in the same row
  const ROW = '.tabulator-row, .plx-property-list__item, tr, li, [role="row"], p, dd, dt, label';
  // a text's baseline: the top of its first line box plus its font's ascent (canvas metrics, fonts loaded), centered in the
  // box as the browser lays the content area out; nothing is added to the page
  const ctx = document.createElement('canvas').getContext('2d');
  const base = (x) => {
    const c = getComputedStyle(x.el); ctx.font = c.fontStyle + ' ' + c.fontWeight + ' ' + c.fontSize + ' ' + c.fontFamily;
    const m = ctx.measureText('Hg'), r = line(x);
    return r.top + (r.height - m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2 + m.fontBoundingBoxAscent;
  };
  const line = (x) => { const r = document.createRange(); r.selectNodeContents(x.n); const rs = r.getClientRects(); return rs.length ? rs[0] : null; };
  const rowOf = (x) => x.el.closest(ROW) || (() => { let p = x.el.parentElement; for (let i = 0; p && i < 3; i++, p = p.parentElement) { const d = getComputedStyle(p).display; if (/flex|grid/.test(d) && getComputedStyle(p).flexDirection !== 'column') return p; } return null; })();
  const monos = texts.filter((x) => x.mono && !x.el.closest('pre, ' + OWN));
  const seen = new Set();
  for (const m of monos) {
    const row = rowOf(m); if (!row || seen.has(row)) continue;
    const lm = line(m); if (!lm) continue;
    const sans = texts.filter((s) => !s.mono && row.contains(s.n) && !s.el.closest(OWN));
    for (const s of sans) {
      const ls = line(s); if (!ls) continue;
      // the same line: the two first line boxes overlap by more than half the shorter
      if (Math.min(lm.bottom, ls.bottom) - Math.max(lm.top, ls.top) < Math.min(lm.height, ls.height) / 2) continue;
      // a value under a label in its own line box (a stacked layout) is not beside it
      const d = Math.abs(base(m) - base(s));
      if (d > 0.5) { out.baseline.push(say(m.el, m.t) + ' vs ' + say(s.el, s.t) + ': ' + d.toFixed(2) + 'px'); seen.add(row); break; }
    }
  }
  return out;
}

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const found = {};
  const MODES = ['light', 'dark'];
  for (const mode of MODES) {
    const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: mode }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
    const take = async (key) => {
      if (ONLY && !ONLY.test(key)) return;
      const got = await page.evaluate(() => document.documentElement.getAttribute('data-plx-mode'));
      if (got && got !== mode) await page.evaluate((m) => document.documentElement.setAttribute('data-plx-mode', m), mode);
      (found[key] = found[key] || {})[mode] = await page.evaluate(inspect);
    };
    for (const a of APP_PAGES) {
      if (ONLY && !ONLY.test(a)) continue;
      await page.goto(BASE + a, { waitUntil: 'networkidle0' });
      await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* storage blocked */ } });
      await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(900); await take(a);
    }
    const HAS_DS = fs.existsSync(path.join(__dirname, '..', 'platform', 'design-system', 'index.html'));
    if (!HAS_DS && mode === 'light') console.log('NOTE: platform/design-system is not checked out; its pages are skipped');
    if (HAS_DS && (!ONLY || ONLY.test('design-system'))) {
      await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500); await take('design-system home');
      const routes = await page.evaluate((TITLES) => { const seen = {}; return window.DSInventory.filter((r) => { const k = r.sec + '/' + (r.sub || ''); return (!seen[k] && (seen[k] = true)) || TITLES.indexOf(r.title) >= 0; }).map((r) => '#/' + r.sec + '/' + r.id); }, DS_TITLES);
      for (const r of routes) { await page.evaluate((h) => { location.hash = h; }, r); await sleep(1000); await take('design-system ' + r); }
    }
    await page.close();
  }
  await browser.close(); server.close();

  const total = (c) => Object.keys(found).reduce((s, p) => s + MODES.reduce((t, m) => t + ((found[p][m] || {})[c] || []).length, 0), 0);
  const summary = CHECKS.map((c) => c + ' ' + total(c)).join(', ');
  const list = (p, m, c) => ((found[p][m] || {})[c] || []);
  if (process.env.TYPO_VERBOSE || process.argv.includes('--update')) Object.keys(found).forEach((p) => MODES.forEach((m) => CHECKS.forEach((c) => { const l = list(p, m, c); if (l.length) console.log('  ' + p + ' · ' + m + ' · ' + c + ': ' + l.length + ' · ' + l.slice(0, process.env.TYPO_VERBOSE ? 99 : 3).join(' | ')); })));
  if (process.argv.includes('--update')) {
    const base = {}; Object.keys(found).forEach((p) => MODES.forEach((m) => CHECKS.forEach((c) => { const k = list(p, m, c).length; if (k) ((base[p] = base[p] || {})[m] = base[p][m] || {})[c] = k; })));
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true }); fs.writeFileSync(BASELINE, JSON.stringify(base, null, 1) + '\n');
    console.log('TYPOGRAPHY_BASELINE written: ' + summary + ' on ' + Object.keys(found).length + ' pages');
    return;
  }
  const base = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {};
  const worse = []; let better = 0;
  Object.keys(found).forEach((p) => MODES.forEach((m) => CHECKS.forEach((c) => { const was = ((base[p] || {})[m] || {})[c] || 0, now = list(p, m, c).length; if (now > was) worse.push(p + ' · ' + m + ' · ' + c + ': ' + was + ' -> ' + now + ' · e.g. ' + list(p, m, c).slice(0, 3).join(' | ')); else if (now < was) better++; })));
  worse.forEach((w) => console.log('  NEW ' + w));
  if (better) console.log('  ' + better + ' page checks have fewer findings: run with --update to lower the baseline');
  console.log((worse.length ? 'TYPOGRAPHY_FAIL ' + worse.length + ' page checks got worse; ' : 'TYPOGRAPHY_OK ') + summary + ' on ' + Object.keys(found).length + ' pages');
  process.exit(worse.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
