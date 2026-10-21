// Plenix tests · the clash audit and the computed-style baseline (the Plenix Styling Standard,
// platform/standards/styling.md, section 13: the runtime audit and the proof that the UI is unchanged).
// On every application page (the suite's ten and the Asset Manager's four, 1440 × 1000, light) it:
//   1. matches every rule of every stylesheet against every element and lists each clash: a property that two or more
//      rules set on one element (a pair of rules and the property, merged across pages), classified as
//        state-variant      a state or variant of the element's own block over its base, with a different value
//        variant-repeat     the same, repeating the base's value (redundant)
//        cross-component    a rule of another block setting the element's property
//        order-decided      two rules of the same owner with different values: specificity or file order decides
//        redundant          two rules with the same value
//        vendor             a rule from the vendored Tabulator stylesheet (legacy table)
//   2. records every element's computed style (a hash per element, in document order), so a repair can prove no
//      element changed.
//   node tests/clash-audit.js            writes tests/baselines/clashes.json and tests/baselines/computed.json
//   node tests/clash-audit.js --check    compares with them: CLASH_AUDIT_OK, or the new unapproved clashes and every
//                                        element whose computed style changed (CLASH_AUDIT_FAIL); repaired clashes are
//                                        listed as gone. A new state-variant overlap (an owner's own variant or state over
//                                        its base, with a different value) is approved by the standard: listed, not failed
//   --pages dashboard,dam                only the pages whose path contains one of the names
//   --strict                             zero overlap (Styling Standard 3.5): custom properties count, the reset (*),
//                                        :root, html and body count, pseudo-elements count (::before and ::after only
//                                        where they are drawn); every overlap is reported, and each element's
//                                        dependencies (inherited variables it reads) are listed apart. Writes or checks
//                                        tests/baselines/overlap-strict.json (the runtime rollout backlog: --check fails on
//                                        any overlap not in it and lists the repaired ones). Prints its coverage: the
//                                        pages and the conditions they ran in.
// The page function is exported (require('./clash-audit.js').audit) for tests/zero-overlap.test.js and its fixtures.
const fs = require('fs');
const path = require('path');
// a full run takes longer than a test's default limit (tests/limit.js)
process.env.TEST_TIMEOUT_MS = process.env.TEST_TIMEOUT_MS || '86400000';
const { serve, launch, sleep, ROOT } = require('./lib.js');

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const only = (() => { const i = args.indexOf('--pages'); return i >= 0 ? args[i + 1].split(',') : null; })();
// --ds: design-system pages full of tables (computed styles only: the pages are long), baselines *-ds.json
const DS = args.includes('--ds');
const STRICT = args.includes('--strict');
const DS_ROUTES = ['data-display/table', 'data-display/data-grid', 'actions/button', 'data-display/badge', 'specialized/audit-log', 'data-display/comparison-view', 'specialized/file-list', 'patterns/permissions-editor', 'specialized/rendition-list', 'patterns/review-flow', 'implementation/css-architecture', 'foundations/color', 'layout/secondary-pane', 'patterns/resizable', 'overlays/teaching-bubble', 'navigation/application-header', 'forms/field', 'forms/input-group', 'forms/number-input', 'actions/copy-button', 'data-display/card', 'data-display/media-card', 'data-display/feature-card', 'content/user-card', 'overlays/media-lightbox', 'specialized/document-viewer', 'data-display/tag', 'data-display/chip', 'navigation/tree-view', 'forms/search-input', 'actions/toolbar', 'overlays/dialog', 'navigation/navigation-menu', 'overlays/expandable-section', 'navigation/progress-steps', 'forms/file-input', 'specialized/product-options', 'content/property-list', 'data-display/resource-list', 'data-display/activity-stream', 'forms/error-summary', 'content/swatch', 'forms/date-picker', 'forms/tree-select', 'forms/inline-edit', 'actions/rename-action', 'data-display/metric', 'navigation/search-result', 'specialized/suggested-action', 'forms/rich-text-editor', 'specialized/file-row', 'forms/avatar-upload', 'forms/image-upload', 'actions/command-palette', 'feedback/empty-state', 'navigation/filter-bar', 'data-display/geo-map', 'data-display/diagram', 'data-display/network-graph', 'actions/button-group', 'layout/panel', 'overlays/side-drawer', 'specialized/media-player', 'content/link', 'foundations/type-styles'];
const PAGES = DS ? DS_ROUTES.map((x) => 'platform/design-system/index.html#/' + x).filter((p) => !only || only.some((n) => p.includes(n))) : ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html'])
  .filter((p) => !only || only.some((n) => p.includes(n)));
const OUT_CLASH = path.join(ROOT, 'tests', 'baselines', STRICT ? 'overlap-strict' + (DS ? '-ds' : '') + '.json' : DS ? 'clashes-ds.json' : 'clashes.json');
const OUT_COMPUTED = path.join(ROOT, 'tests', 'baselines', DS ? 'computed-ds.json' : 'computed.json');

// runs in the page: the clashes and the computed styles
function audit(noClash, from, to, opts) {
  const strict = !!(opts && opts.strict);
  const registered = {};
  // the pseudo-element a selector ends in (counted on its element, as el::name), and the selector without it
  const PE = /::?(before|after|placeholder|marker|selection|backdrop|first-line|first-letter|file-selector-button|-webkit-[a-z-]+|-moz-[a-z-]+)$/;
  const blockOf = (c) => c.replace(/(__|--).*$/, '');
  const splitSel = (t) => { const out = []; let d = 0, cur = ''; for (const ch of t) { if (ch === '(' || ch === '[') d++; else if (ch === ')' || ch === ']') d--; if (ch === ',' && !d) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
  const sels = [];
  const visit = (rules, file) => { for (const r of rules) {
    if (r instanceof CSSImportRule) { try { visit(r.styleSheet.cssRules, (r.href || '').replace(/^.*\/Plenix\//, '')); } catch (e) { /* cross-origin */ } }
    else if (r instanceof CSSMediaRule || r instanceof CSSSupportsRule || (window.CSSContainerRule && r instanceof CSSContainerRule) || (window.CSSLayerBlockRule && r instanceof CSSLayerBlockRule)) {
      // only the rules whose condition holds here: a media query that matches, a @supports the browser supports
      if (r instanceof CSSMediaRule ? matchMedia(r.conditionText || r.media.mediaText).matches : r instanceof CSSSupportsRule ? CSS.supports(r.conditionText) : true) visit(r.cssRules, file);
    } else if (window.CSSPropertyRule && r instanceof CSSPropertyRule) {
      registered[r.name] = { inherits: r.inherits };
    } else if (r instanceof CSSStyleRule) {
      const decl = {}; for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; if (p.startsWith('--') && !strict) continue; decl[p] = r.style.getPropertyValue(p).trim() + (r.style.getPropertyPriority(p) ? ' !important' : ''); }
      if (!Object.keys(decl).length) continue;
      const rid = sels.length + 1;
      for (const s0 of splitSel(r.selectorText)) {
        const pm = strict ? s0.match(PE) : null, pe = pm ? pm[1] : '', s = pm ? (s0.slice(0, pm.index).trim() || '*') : s0;
        const m = s.match(/\.([a-zA-Z0-9_-]+)(?=[^ >+~]*$)/); sels.push({ s, pe, label: s0, key: m ? m[1] : null, decl, file, rid });
      }
    }
  } };
  for (const sh of document.styleSheets) { try { visit(sh.cssRules, (sh.href || 'inline').replace(/^.*\/Plenix\//, '')); } catch (e) { /* cross-origin */ } }
  const byKey = {}, noKey = []; for (const x of sels) { if (x.key) (byKey[x.key] = byKey[x.key] || []).push(x); else noKey.push(x); }
  const pairs = {}; let elements = 0, clashed = 0; const computed = [];
  const SKIP_PROPS = /^(transition|animation)/;
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
  const all = strict ? [document.documentElement, document.body, ...document.querySelectorAll('body *')] : [...document.querySelectorAll('body *')];
  // logical longhands are counted under the physical property they set on this element (horizontal writing), so
  // border-inline-start-width and border-left-width meet: inline start is left in left-to-right, right in right-to-left
  const LOGICAL = /^(margin|padding|inset|border)-(inline|block)-(start|end)(-(width|style|color))?$|^border-(start|end)-(start|end)-radius$|^(min-|max-)?(inline|block)-size$/;
  const phys = (p, rtl) => {
    if (!LOGICAL.test(p)) return p;
    const side = (axis, edge) => (axis === 'block' ? (edge === 'start' ? 'top' : 'bottom') : (edge === 'start') !== rtl ? 'left' : 'right');
    let m = p.match(/^(margin|padding|inset|border)-(inline|block)-(start|end)(-(width|style|color))?$/);
    if (m) return (m[1] === 'inset' ? '' : m[1] + '-') + side(m[2], m[3]) + (m[4] || '');
    m = p.match(/^border-(start|end)-(start|end)-radius$/);
    if (m) return 'border-' + side('block', m[1]) + '-' + side('inline', m[2]) + '-radius';
    m = p.match(/^(min-|max-)?(inline|block)-size$/);
    return (m[1] || '') + (m[2] === 'inline' ? 'width' : 'height');
  };
  const marks = [], deps = {}, drawn = (el, pe) => !/^(before|after)$/.test(pe) || getComputedStyle(el, '::' + pe).content !== 'none';
  for (const el of all.slice(from || 0, to == null ? all.length : to)) {
    if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
    elements++;
    // every standard property, by name (the browser lists them, custom properties included, in no fixed order)
    const cs = getComputedStyle(el), names = [];
    for (let i = 0; i < cs.length; i++) { const p = cs[i]; if (!p.startsWith('--') && !SKIP_PROPS.test(p)) names.push(p); }
    const all = names.sort().map((p) => p + ':' + cs.getPropertyValue(p)).join(';');
    const label = el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join('');
    computed.push([label, hash(all)]);
    if (noClash) continue;
    const own = blockOf([...el.classList].find((c) => c.startsWith('plx-')) || '');
    const cand = [...new Set([...el.classList].flatMap((c) => byKey[c] || []))].concat(strict ? noKey : noKey.filter((x) => !/^(\*|html|body|:root)/.test(x.s)));
    const props = {}, rtl = strict && getComputedStyle(el).direction === 'rtl';
    for (const x of cand) {
      let ok = false; try { ok = el.matches(x.s) && (!x.pe || drawn(el, x.pe)); } catch (e) { /* unsupported */ } if (!ok) continue;
      for (const p0 of Object.keys(x.decl)) { const p = strict ? phys(p0, rtl) : p0, k = x.pe ? p + '::' + x.pe : p; (props[k] = props[k] || []).push({ s: x.label || x.s, v: x.decl[p0], file: x.file, rid: x.rid }); }
    }
    // dependencies: the variables its declarations read that no rule declares on it (inherited, or a registered
    // non-inheriting variable falling back to its default)
    if (strict) for (const k of Object.keys(props)) for (const l of props[k]) for (const m of l.v.matchAll(/var\(\s*(--[\w-]+)/g)) {
      if (props[m[1]]) continue;
      const reg = registered[m[1]], d = deps[m[1]] = deps[m[1]] || { n: 0, fallback: !!(reg && !reg.inherits) }; d.n++;
      (el.__deps = el.__deps || new Set()).add(m[1]);
    }
    // marks are written after the loop: an attribute written now would make every later read restyle the page
    if (strict && opts.mark) marks.push([el, Object.keys(props).filter((k) => new Set(props[k].map((l) => l.rid)).size > 1).sort().join(','), [...(el.__deps || [])].sort().join(',')]);
    let hit = false;
    for (const p of Object.keys(props)) {
      const uniq = [...new Map(props[p].map((l) => [strict ? l.rid : l.s, l])).values()]; if (uniq.length < 2) continue; hit = true;
      for (let i = 0; i < uniq.length; i++) for (let j = i + 1; j < uniq.length; j++) {
        const a = uniq[i], b = uniq[j], k = p + ' | ' + a.s + ' || ' + b.s;
        const blocksOf = (s) => (s.match(/\.plx-[a-z0-9_-]+/g) || []).map((c) => blockOf(c.slice(1)));
        const cross = [a.s, b.s].some((s) => blocksOf(s).some((bk) => bk && own && bk !== own && bk !== 'plx-u'));
        const stateOf = (base, x) => x.s !== base.s && x.s.startsWith(base.s.replace(/\s+$/, '')) || /--|:(hover|active|focus|focus-visible|disabled|checked)|\.is-|\[aria-|\[data-/.test(x.s.replace(base.s, ''));
        pairs[k] = pairs[k] || { p, a: a.s, b: b.s, va: a.v, vb: b.v, files: a.file + ' / ' + b.file, same: a.v === b.v, cross, variant: !cross && (stateOf(a, b) || stateOf(b, a)), n: 0 };
        pairs[k].n++;
      }
    }
    if (hit) clashed++;
  }
  marks.forEach(([el, o, d]) => { el.setAttribute('data-audit-overlap', o); el.setAttribute('data-audit-deps', d); });
  const de = document.documentElement, mq = (q) => matchMedia(q).matches;
  return { elements, clashed, pairs: Object.values(pairs), computed, total: all.length, deps,
    conditions: strict ? { page: location.pathname.replace(/^.*\/Plenix\//, '') + location.hash, width: innerWidth, reducedMotion: mq('(prefers-reduced-motion: reduce)'), forcedColors: mq('(forced-colors: active)'), print: mq('print'),
      theme: de.getAttribute('data-plx-theme') || 'default', mode: de.getAttribute('data-plx-mode') || 'light', density: de.getAttribute('data-plx-density') || 'standard', interaction: de.getAttribute('data-plx-interaction') || 'default',
      forced: [...new Set([...document.querySelectorAll('[data-force]')].map((e) => e.getAttribute('data-force')))] } : null };
}
const kindOf = (x) => (/tabulator/i.test(x.files) ? 'vendor' : x.cross ? 'cross-component' : x.variant ? (x.same ? 'variant-repeat' : 'state-variant') : x.same ? 'redundant' : 'order-decided');

module.exports = { audit };
if (require.main === module) (async () => {
  const PORT = +process.env.TEST_PORT || 8857, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
  const server = await serve(PORT);
  const browser = await launch();
  const clashes = {}, computed = {}, perPage = {}, coverage = [], deps = {};
  // design-system pages are read in four tabs at once; application pages one by one
  const TABS = DS ? 4 : 1;
  const one = async (page, pg) => {
    // every route loads afresh: a route reached from another one keeps some of its state (measured column widths)
    await page.goto('about:blank'); await page.goto(BASE + pg, DS ? { waitUntil: 'load', timeout: 120000 } : { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready); await sleep(DS ? 4000 : 1500);
    // a route that left the site blank (a demo that threw on the way in) is loaded afresh
    if (DS && await page.evaluate(() => document.querySelectorAll('body *').length < 200)) { console.log('RELOAD ' + pg); await page.goto('about:blank'); await page.goto(BASE + pg, { waitUntil: 'load', timeout: 120000 }); await page.evaluate(() => document.fonts.ready); await sleep(4000); }
    // design-system pages are long: their computed styles are read in chunks, so no single call times out
    let r;
    if (DS) { r = { elements: 0, clashed: 0, pairs: [], computed: [] }; let from = 0, total = Infinity; while (from < total) { const c = await page.evaluate(audit, true, from, from + 1500); total = c.total; r.elements += c.elements; r.computed.push(...c.computed); from += 1500; } }
    else r = await page.evaluate(audit, false, 0, null, { strict: STRICT });
    if (STRICT) { coverage.push(r.conditions); for (const [k, d] of Object.entries(r.deps || {})) { const t = deps[k] = deps[k] || { n: 0, fallback: d.fallback }; t.n += d.n; } }
    perPage[pg] = { elements: r.elements, clashed: r.clashed };
    computed[pg] = r.computed;
    for (const x of r.pairs) { const k = x.p + ' | ' + x.a + ' || ' + x.b; const c = clashes[k] = clashes[k] || Object.assign({ kind: kindOf(x), pages: [] }, x); c.pages.push(pg.replace('/index.html', '')); delete c.n; delete c.cross; delete c.variant; }
    console.log(pg + ': ' + r.elements + ' elements, ' + r.clashed + ' with a clash');
  };
  await Promise.all(Array.from({ length: TABS }, async (_, t) => {
    const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
    for (let i = t; i < PAGES.length; i += TABS) await one(page, PAGES[i]);
  }));
  // --check: a design-system page whose computed styles differ from the baseline is read once more on its own (four
  // busy tabs can catch a page before its fonts or measured widths settle); the second reading counts
  if (CHECK && DS) {
    const base = JSON.parse(fs.readFileSync(OUT_COMPUTED, 'utf8')).pages;
    const same = (pg) => { const a = base[pg] || [], b = computed[pg] || []; return a.length === b.length && a.every((x, i) => x[1] === b[i][1]); };
    const again = PAGES.filter((pg) => !same(pg));
    if (again.length) { const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 }); for (const pg of again) { console.log('AGAIN ' + pg); await one(page, pg); } }
  }
  await browser.close(); server.close();
  const list = Object.values(clashes).sort((a, b) => (a.kind + a.p + a.a).localeCompare(b.kind + b.p + b.a));
  const kinds = {}; list.forEach((x) => { kinds[x.kind] = (kinds[x.kind] || 0) + 1; });
  const total = Object.values(perPage).reduce((s, x) => ({ elements: s.elements + x.elements, clashed: s.clashed + x.clashed }), { elements: 0, clashed: 0 });
  console.log(total.elements + ' elements, ' + total.clashed + ' with a clash; ' + list.length + ' distinct clashes: ' + Object.keys(kinds).sort().map((k) => k + ' ' + kinds[k]).join(', '));
  if (STRICT) {
    // coverage: what the audit exercised (a zero here is zero in these cases only)
    console.log('COVERAGE ' + coverage.length + ' pages: ' + [...new Set(coverage.map((c) => c.width + 'px ' + c.theme + '/' + c.mode + ' ' + c.density + ' ' + c.interaction + (c.reducedMotion ? ' reduced-motion' : '') + (c.forcedColors ? ' forced-colors' : '')))].join('; '));
    const topDeps = Object.entries(deps).sort((a, b) => b[1].n - a[1].n);
    console.log('DEPENDENCIES ' + topDeps.length + ' variables read by inheritance (top 10): ' + topDeps.slice(0, 10).map(([k, d]) => k + ' ' + d.n + (d.fallback ? ' (non-inheriting: its fallback)' : '')).join(', '));
  }
  if (!CHECK) {
    fs.mkdirSync(path.dirname(OUT_CLASH), { recursive: true });
    fs.writeFileSync(OUT_CLASH, JSON.stringify({ $description: 'The clash inventory of the Plenix Styling Standard (tests/clash-audit.js): every pair of rules setting one property on one element, on the application pages, classified.', pages: perPage, kinds, clashes: list }, null, 1) + '\n');
    if (STRICT) { fs.writeFileSync(OUT_CLASH, JSON.stringify({ $description: 'The runtime rollout backlog of zero overlap (the Plenix Styling Standard 3.5; tests/clash-audit.js --strict): every pair of Plenix declarations assigning one property, custom properties included, on one element, with the pages and conditions it was found in. It only shrinks; the rollout ends when it is empty.', pages: perPage, kinds, coverage, dependencies: Object.fromEntries(Object.entries(deps).sort((a, b) => b[1].n - a[1].n)), clashes: list }, null, 1) + '\n'); console.log('Wrote ' + path.relative(ROOT, OUT_CLASH)); return; }
    fs.writeFileSync(OUT_COMPUTED, JSON.stringify({ $description: 'Every element\'s computed style on the application pages, as a hash in document order (tests/clash-audit.js).', pages: computed }) + '\n');
    console.log('Wrote tests/baselines/clashes.json and tests/baselines/computed.json');
    return;
  }
  // --check: new clashes, repaired clashes, and every element whose computed style changed
  const before = JSON.parse(fs.readFileSync(OUT_CLASH, 'utf8')), bc = STRICT ? null : JSON.parse(fs.readFileSync(OUT_COMPUTED, 'utf8'));
  const key = (x) => x.p + ' | ' + x.a + ' || ' + x.b;
  const had = new Set(before.clashes.filter((x) => x.pages.some((p) => PAGES.some((q) => q.startsWith(p)))).map(key)), now = new Set(list.map(key));
  // strict: there is no approved overlap; otherwise an owner's own state over its base is approved by the standard
  const approved = (x) => !STRICT && x.kind === 'state-variant';
  const added = list.filter((x) => !had.has(key(x)) && !approved(x)), allowed = list.filter((x) => !had.has(key(x)) && approved(x)), gone = before.clashes.filter((x) => had.has(key(x)) && !now.has(key(x)));
  gone.forEach((x) => console.log('GONE  ' + x.kind + '  ' + key(x)));
  allowed.forEach((x) => console.log('OWN   ' + x.kind + '  ' + key(x)));
  added.forEach((x) => console.log('NEW   ' + x.kind + '  ' + key(x) + '  (' + x.va + ' / ' + x.vb + ')'));
  if (STRICT) { console.log(added.length ? 'ZERO_OVERLAP_FAIL (' + added.length + ' new overlaps, ' + gone.length + ' gone)' : 'ZERO_OVERLAP_OK (' + gone.length + ' overlaps gone; ' + list.length + ' left in the backlog)'); process.exit(added.length ? 1 : 0); }
  let changed = 0;
  for (const pg of PAGES) {
    const a = bc.pages[pg] || [], b = computed[pg];
    if (a.length !== b.length) {
      // elements added or removed (a documentation page lists what a stylesheet has): the elements before and after the
      // differing stretch are compared one by one; the stretch itself is listed for review
      let p = 0; while (p < a.length && p < b.length && a[p][0] === b[p][0]) p++;
      let q = 0; while (q < a.length - p && q < b.length - p && a[a.length - 1 - q][0] === b[b.length - 1 - q][0]) q++;
      console.log('DIFFERS ' + pg + ': ' + a.length + ' elements before, ' + b.length + ' now; elements ' + p + ' to ' + (b.length - q - 1) + ' differ: ' + b.slice(p, b.length - q).slice(0, 8).map((x) => x[0]).join(' ') + (b.length - q - p > 8 ? ' …' : '') + ' (was ' + a.slice(p, a.length - q).slice(0, 8).map((x) => x[0]).join(' ') + ')');
      for (let i = 0; i < p; i++) if (a[i][1] !== b[i][1]) { changed++; if (changed <= 40) console.log('CHANGED ' + pg + ' #' + i + ' ' + a[i][0]); }
      for (let i = 1; i <= q; i++) if (a[a.length - i][1] !== b[b.length - i][1]) { changed++; if (changed <= 40) console.log('CHANGED ' + pg + ' #-' + i + ' ' + a[a.length - i][0]); }
      continue;
    }
    a.forEach((x, i) => { if (x[1] !== b[i][1]) { changed++; if (changed <= 40) console.log('CHANGED ' + pg + ' #' + i + ' ' + x[0] + (x[0] !== b[i][0] ? ' -> ' + b[i][0] : '')); } });
  }
  console.log(added.length || changed ? 'CLASH_AUDIT_FAIL (' + added.length + ' new clashes, ' + changed + ' changed elements, ' + gone.length + ' gone)' : 'CLASH_AUDIT_OK (' + gone.length + ' clashes gone, no element changed)');
  process.exit(added.length || changed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
