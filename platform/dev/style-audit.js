/* Plenix · Style audit (platform/dev/style-audit.js): rejects styling that does not come from the design system.
   Loaded by every Plenix page (check-system.js, rule "audit", keeps it there). On a page served from this machine
   (localhost) it watches the whole document and reports, as a console error, every:
     1. style element: a style block written into the page (styles come from platform.css and the page's own
        stylesheet files only);
     2. undefined custom property: a style attribute that sets a custom property other than a Platform one (--plx-…;
        the design system page's own --ds-… names on that page);
     3. font written inline: a font family that is not a Platform token reference (a font is never computed on the spot);
     4. DataTable density: an inline height, min-height, max-height, line-height or padding on a DataTable row or cell
        (the row height and the cell padding are the density's: data-table.css and the tokens; owner, 2026-10-13);
     User content (an element inside .plx-user-content: the RichTextEditor's area and RichText showing saved HTML) may carry
     the person's own formatting, as Tiptap stores it: color, background-color, font-family, font-size and text-align
     only (owner, 2026-10-14: "the colors and fonts rule is limited to just the UI, not the user in Tiptap"); any other
     property there is checked as everywhere else.
     5. off the grid: an inline length that is neither a Platform token reference (var) nor a whole number of grid steps (the base
        spacing token, --plx-ref-space-4px; utils/grid.js): "has to conform to fit into the grid system!!! important"
        (owner, 2026-10-13). A length in another unit than px (rem, em, vw…) is reported too; a percentage is a
        proportion, not a length, and 0 is on every grid.
   Inline styles written by JavaScript are otherwise allowed (owner, 2026-10-13): "sometimes we have situations in which
   JavaScript is needed to make adjustments on the spot. And these adjustments make inline styles. However these
   adjustments are based on tokens and defined styles to make inline adjustments for that moment." Whether a written value
   comes from a token or is a hard-coded literal is a question of the source: check-system.js (rule inline-style) rejects
   style written in markup and literal values written by code before a page runs; this audit catches what only appears at
   run time.
     PlenixStyleAudit.audit()   -> [{ kind, element, detail }] for the current document
     PlenixStyleAudit.report()  -> the same, printed to the console
   Findings also go to document.documentElement's data-plx-style-findings (a count), which the page checks read. */
(function () {
  'use strict';
  var ON_THIS_MACHINE = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var SPEC = /\/platform\/design-system\//.test(location.pathname);
  var allowedVar = function (name) { return /^--plx-/.test(name) || (SPEC && /^--ds-/.test(name)); };
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  var total = 0;

  function describe(el) {
    var s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    var cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\s+/).filter(Boolean).slice(0, 3);
    return cls.length ? s + '.' + cls.join('.') : s;
  }
  // the engine's probe (DataTable strict.js): a hidden Tabulator built once, before its patches, and removed at once
  function probe(el) { return !!(el.closest && el.closest('[data-plx-probe="tabulator"]')); }
  // the grid step: the base spacing token in pixels (utils/grid.js reads the same token)
  function gridStep(el) {
    var at = el && el.ownerDocument ? el : document.documentElement, v = getComputedStyle(at).getPropertyValue('--plx-ref-space-4px').trim();
    var px = /rem$/.test(v) ? parseFloat(v) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) : parseFloat(v);
    return px > 0 ? px : 4;
  }
  // the first length in a value that is not on the grid (var(…) references are tokens; a percentage is a proportion)
  function offGrid(value, el) {
    var v = String(value).replace(/var\([^()]*(\([^()]*\)[^()]*)*\)/g, ' '), step = gridStep(el), m, re = /(-?\d*\.?\d+)(px|rem|em|pt|pc|vh|vw|vmin|vmax|ch|ex|cm|mm|in)(?![\w-])/gi;
    while ((m = re.exec(v))) {
      var n = parseFloat(m[1]);
      if (!n) continue;
      if (m[2].toLowerCase() !== 'px') return m[0];
      var q = Math.abs(n) / step; if (Math.abs(q - Math.round(q)) * step > 0.5) return m[0];
    }
    return null;
  }
  // the person's own formatting on user content (the editor's area and saved rich text): these properties only
  var USER_FORMAT = /^(color|background-color|font-family|font-size|text-align)$/;
  function userContent(el) { return !!(el.closest && el.closest('.plx-user-content')); }
  var DENSITY = /^(height|min-height|max-height|line-height|padding(-(top|right|bottom|left|block|inline)(-(start|end))?)?)$/;
  function inlineFinding(el) {
    if (probe(el) || el.isConnected === false) return null;   // the probe, or an element already gone from the page
    var st = el.style, bad = [], table = !!(el.matches && el.matches('.plx-data-table .tabulator-row, .plx-data-table .tabulator-cell')), user = userContent(el);
    for (var i = 0; i < st.length; i++) {
      var p = st[i], v = st.getPropertyValue(p);
      if (user && USER_FORMAT.test(p)) continue;
      if (/^--/.test(p) ? !allowedVar(p) : (p === 'font-family' && !/^\s*var\(--plx-/.test(v)) || (table && DENSITY.test(p))) bad.push(p + ': ' + v);
      else { var off = offGrid(v, el); if (off) bad.push(p + ': ' + v + ' (' + off + ' is off the grid)'); }
    }
    return bad.length ? { kind: 'inline style', element: describe(el), detail: bad.join('; ') } : null;
  }
  function audit(root) {
    var out = [], scope = root || document;
    var styled = scope.querySelectorAll ? scope.querySelectorAll('[style]') : [];
    if (root && root.nodeType === 1 && root.hasAttribute('style')) styled = [root].concat([].slice.call(styled));
    [].forEach.call(styled, function (el) { var f = inlineFinding(el); if (f) out.push(f); });
    var blocks = scope.querySelectorAll ? scope.querySelectorAll('style') : [];
    if (root && root.tagName === 'STYLE') blocks = [root];
    [].forEach.call(blocks, function (el) { out.push({ kind: 'style element', element: describe(el.parentNode || el), detail: (el.textContent || '').trim().slice(0, 120) }); });
    return out;
  }
  function flag(findings, el) {
    findings.forEach(function (f) {
      if (seen && el && seen.has(el)) return;
      total++;
      console.error('[Plenix style audit] ' + f.kind + ' on ' + f.element + ': ' + f.detail + ' — style it with Platform classes and tokens');
    });
    if (seen && el && findings.length) seen.add(el);
    document.documentElement.setAttribute('data-plx-style-findings', String(total));
  }
  function report() { var f = audit(); f.forEach(function (x) { console.error('[Plenix style audit] ' + x.kind + ' on ' + x.element + ': ' + x.detail); }); return f; }
  window.PlenixStyleAudit = Object.freeze({ audit: function () { return audit(); }, report: report });

  if (!ON_THIS_MACHINE) return;
  function start() {
    audit().forEach(function (f) { flag([f]); });
    document.documentElement.setAttribute('data-plx-style-findings', String(total));
    new MutationObserver(function (records) {
      records.forEach(function (r) {
        if (r.type === 'attributes') { var f = inlineFinding(r.target); if (f) flag([f], r.target); }
        else [].forEach.call(r.addedNodes, function (n) { if (n.nodeType === 1) [].forEach.call(audit(n), function (f) { flag([f]); }); });
      });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['style'], childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
