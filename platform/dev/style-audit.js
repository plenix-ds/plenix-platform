/* Plenix · Style audit (platform/dev/style-audit.js): rejects styling that does not come from the design system.
   Loaded by every Plenix page (check-system.js, rule "audit", keeps it there). On a page served from this machine
   (localhost) it watches the whole document and reports, as a console error, every:
     1. inline style: an element's style attribute with anything but a custom property (--plx-…, a value only the
        data knows, read by a Platform stylesheet; the design system page's own --ds-… names on that page);
     2. style element: a style block written into the page (styles come from platform.css and the page's own
        stylesheet files only).
   The source check (node check-system.js: inline-style, palette, raw-value) rejects the same things before a page runs;
   this audit catches what only appears at run time (a script or a component writing a style).
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
  function inlineFinding(el) {
    var st = el.style, bad = [];
    for (var i = 0; i < st.length; i++) if (!allowedVar(st[i])) bad.push(st[i] + ': ' + st.getPropertyValue(st[i]));
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
