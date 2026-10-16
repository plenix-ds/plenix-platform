/* Plenix · opt-in token check
   Summary: Reports unresolved Plenix CSS token names in accessible page stylesheets during development.
   Usage: <script src="/cdn/<version>/token-check.js" data-mode="development" defer></script>
     On localhost the script enables itself when explicitly loaded. data-tokens may override the versioned tokens URL.
     PlenixTokenCheck.ready resolves after the initial audit; .audit() inspects again and .report() warns once per name.
   Props: Script attributes: data-mode="development" enables remote development pages; data-tokens is an optional URL.
   Behavior: Production hosts stay inert unless explicitly marked development. Inaccessible stylesheets are skipped,
     with their URLs returned in skipped. Names declared in CSS also exist, including private computed properties.
     A failed token-index request reports the failure without falsely labeling every token unknown.
   Notes: Opt in only in development. This script never edits styles, fetches cross-origin CSS or reads private data.
*/
(function (global) {
  'use strict';
  var document = global.document, script = document && document.currentScript;
  if (!document || !script) return;
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(global.location.hostname);
  if (!local && script.getAttribute('data-mode') !== 'development') return;
  var source = new URL(script.src, document.baseURI);
  var indexPath = /\/platform\/dev\/[^/]+$/.test(source.pathname) ? '../tokens/tokens.index.json' : 'tokens.json';
  var address = new URL(script.getAttribute('data-tokens') || indexPath, source).href;
  var known = null, warned = new Set();
  function audit() {
    var references = new Set(), declared = new Set(), skipped = new Set(), visited = new Set();
    var withoutStrings = function (value) { return value.replace(/\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, ''); };
    function walkSheet(sheet) {
      if (!sheet || visited.has(sheet)) return;
      visited.add(sheet);
      var rules; try { rules = sheet.cssRules; } catch (error) { skipped.add(sheet.href || '(unavailable stylesheet)'); return; }
      if (rules) walkRules(rules);
    }
    function walkRules(rules) {
      Array.prototype.forEach.call(rules, function (rule) {
        if (rule.styleSheet) walkSheet(rule.styleSheet);
        if (rule.cssRules) walkRules(rule.cssRules);
        if (!rule.style) return;
        Array.prototype.forEach.call(rule.style, function (property) {
          if (/^--plx-/.test(property)) declared.add(property);
        });
        // CSSOM may expose only empty longhands for a shorthand that contains var(). Its serialized declaration retains it.
        var text = withoutStrings(rule.style.cssText || Array.prototype.map.call(rule.style, function (property) { return rule.style.getPropertyValue(property); }).join(';')), match;
        var pattern = /var\(\s*(--plx-[\w-]+)/g;
        while ((match = pattern.exec(text))) references.add(match[1]);
      });
    }
    Array.prototype.forEach.call(document.styleSheets || [], walkSheet);
    Array.prototype.forEach.call(document.adoptedStyleSheets || [], walkSheet);
    return { unknown: known ? Array.from(references).filter(function (name) { return !known.has(name) && !declared.has(name); }).sort() : [], skipped: Array.from(skipped).sort() };
  }
  function report() {
    var result = audit(), fresh = result.unknown.filter(function (name) { return !warned.has(name); });
    if (fresh.length) { fresh.forEach(function (name) { warned.add(name); }); global.console.warn('[Plenix] Unknown CSS tokens: ' + fresh.join(', ')); }
    return result;
  }
  var api = { audit: audit, report: report, ready: null };
  global.PlenixTokenCheck = api;
  api.ready = Promise.resolve().then(function () { return global.fetch(address); }).then(function (response) {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  }).then(function (index) {
    if (!index || !Array.isArray(index.tokens) || index.tokens.some(function (token) { return !token || typeof token.name !== 'string'; })) throw new Error('Invalid token index');
    known = new Set(index.tokens.map(function (token) { return token.name; }));
    if (document.readyState === 'loading') return new Promise(function (resolve) { document.addEventListener('DOMContentLoaded', function () { resolve(report()); }, { once: true }); });
    return report();
  }).catch(function (error) {
    global.console.warn('[Plenix] Token check could not load ' + address + ': ' + error.message);
    return { unknown: [], skipped: [], error: error.message };
  });
})(window);
