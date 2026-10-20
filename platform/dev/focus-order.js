/* Plenix · Focus order overlay (platform/dev/focus-order.js): numbers a page's Tab stops in the order the keyboard reaches
   them, for checking that the order follows the reading order. Load it on any Plenix page (<script src="…/platform/dev/
   focus-order.js"></script>, next to style-audit.js) and open the page with ?focus-order in its address: every Tab stop
   is outlined with its number at its start corner and a path joins them in order; a stop reached out of reading order
   (above the one before it, or behind it on the same line) or one with a positive tabindex is drawn in the warning color.
   The overlay follows scrolling, resizing and changes to the page, never takes a click and is hidden from assistive
   technology. Nothing is styled from here: classes only (system/focus-order.css); the geometry is SVG attributes.
     PlenixFocusOrder.show()   PlenixFocusOrder.hide()   PlenixFocusOrder.toggle()
     PlenixFocusOrder.stops(root)   the Tab stops in order: [{ n, el, name, rect, outOfOrder, positive }]
     PlenixFocusOrder.check(root)   { stops, outOfOrder: [n…], positiveTabindex: [n…], skipLinkFirst } (tests use it)
   Ctrl+Shift+F turns it on and off once the script is on the page.
   The rules it checks (the Focus order page): the Tab order is the reading order (DOM order = visual order, so no
   positive tabindex); focus moves into an overlay when it opens and back to its trigger when it closes; on a page with a
   skip link, the skip link is the first stop. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var FOCUSABLE = 'a[href],area[href],button,input,select,textarea,summary,iframe,audio[controls],video[controls],[contenteditable=""],[contenteditable="true"],[tabindex]';
  var svg = null, frame = 0, observer = null;

  // the element can take focus with Tab: enabled, rendered, not inert or hidden, not tabindex="-1"
  function tabbable(el) {
    if (el.closest('[data-plx-dev]')) return false;
    if (el.disabled || el.closest('[inert]') || el.closest('[hidden]')) return false;
    var t = el.getAttribute('tabindex');
    if (t !== null && +t < 0) return false;
    if (el.tagName === 'INPUT' && el.type === 'hidden') return false;
    if (el.tagName === 'SUMMARY' && !(el.parentElement && el.parentElement.tagName === 'DETAILS' && el.parentElement.firstElementChild === el)) return false;
    var d = el.closest('details:not([open])');
    if (d && el.tagName !== 'SUMMARY') return false;
    if (d && el.tagName === 'SUMMARY' && d.closest('details:not([open]) details')) return false;
    var cs = window.getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return false;
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height && cs.position !== 'fixed') return false;
    // a radio group is one stop: the checked radio, or the first one
    if (el.tagName === 'INPUT' && el.type === 'radio' && el.name) {
      var form = el.form || document, group = form.querySelectorAll('input[type="radio"][name="' + (window.CSS && CSS.escape ? CSS.escape(el.name) : el.name) + '"]');
      var checked = Array.prototype.filter.call(group, function (x) { return x.checked; })[0];
      if (checked ? checked !== el : group[0] !== el) return false;
    }
    return true;
  }
  function nameOf(el) {
    var n = el.getAttribute('aria-label') || (el.labels && el.labels[0] && el.labels[0].textContent) || el.getAttribute('title') || el.textContent || el.getAttribute('placeholder') || el.tagName.toLowerCase();
    return String(n).replace(/\s+/g, ' ').trim().slice(0, 60);
  }
  function stops(root) {
    var all = Array.prototype.filter.call((root || document).querySelectorAll(FOCUSABLE), tabbable);
    // positive tabindex first (ascending, then DOM order), then the rest in DOM order
    var pos = all.filter(function (el) { return +el.getAttribute('tabindex') > 0; }).sort(function (a, b) { return +a.getAttribute('tabindex') - +b.getAttribute('tabindex'); });
    var rest = all.filter(function (el) { return !(+el.getAttribute('tabindex') > 0); });
    var rtl = window.getComputedStyle(document.documentElement).direction === 'rtl';
    var prev = null;
    return pos.concat(rest).map(function (el, i) {
      var r = el.getBoundingClientRect(), out = false;
      if (prev) {
        var line = Math.min(r.height, prev.height) / 2 || 1;
        // above the stop before it, unless it starts a later column (wholly toward the end side): a new column of a
        // grid or a multi-column layout starts at its top
        var later = rtl ? r.right <= prev.left + 1 : r.left >= prev.right - 1;
        var above = r.bottom <= prev.top + line && r.top < prev.top - line && !later;
        var behind = Math.abs(r.top - prev.top) < line && (rtl ? r.left >= prev.right - 1 : r.right <= prev.left + 1);
        // a stop inside a different scroll area or fixed region starts its own reading order
        out = (above || behind) && !el.closest('[role="dialog"],dialog,[aria-modal="true"]');
      }
      prev = r;
      return { n: i + 1, el: el, name: nameOf(el), rect: r, outOfOrder: out, positive: +el.getAttribute('tabindex') > 0 };
    });
  }
  function check(root) {
    var list = stops(root);
    var first = list[0];
    var skip = (root || document).querySelector('.plx-app-shell__skip, a[href^="#"][class*="skip"]');
    return {
      stops: list.map(function (s) { return { n: s.n, name: s.name, tag: s.el.tagName.toLowerCase(), outOfOrder: s.outOfOrder, positive: s.positive }; }),
      outOfOrder: list.filter(function (s) { return s.outOfOrder; }).map(function (s) { return s.n; }),
      positiveTabindex: list.filter(function (s) { return s.positive; }).map(function (s) { return s.n; }),
      skipLinkFirst: skip ? !!first && first.el === skip : null
    };
  }

  function node(tag, attrs, cls, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (cls) e.setAttribute('class', cls);
    parent.appendChild(e);
    return e;
  }
  function draw() {
    frame = 0;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var list = stops(), rtl = window.getComputedStyle(document.documentElement).direction === 'rtl';
    var path = node('g', {}, 'plx-focus-order__path', svg), marks = node('g', {}, null, svg), points = [];
    list.forEach(function (s) {
      var r = s.rect, warn = s.outOfOrder || s.positive, x = rtl ? r.right : r.left, y = r.top;
      points.push(x + ',' + y);
      var g = node('g', {}, 'plx-focus-order__stop' + (warn ? ' plx-focus-order__stop--warning' : '') + (s.el === document.activeElement ? ' is-current' : ''), marks);
      // each part takes the warning and current marks as its own classes (system/focus-order.css)
      var mod = function (part, current) { return 'plx-focus-order__' + part + (warn ? ' plx-focus-order__' + part + '--warning' : '') + (current && s.el === document.activeElement ? ' plx-focus-order__' + part + '--current' : ''); };
      node('rect', { x: r.left, y: r.top, width: Math.max(r.width, 1), height: Math.max(r.height, 1) }, mod('outline', true), g);
      node('circle', { cx: x, cy: y }, mod('badge'), g);
      node('text', { x: x, y: y, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, mod('number'), g).textContent = String(s.n);
    });
    if (points.length > 1) node('polyline', { points: points.join(' ') }, 'plx-focus-order__line', path);
  }
  function schedule() { if (!frame) frame = window.requestAnimationFrame(draw); }
  function show() {
    if (svg) return;
    svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'plx-focus-order');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('data-plx-dev', 'focus-order');
    document.body.appendChild(svg);
    window.addEventListener('scroll', schedule, true);
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    observer = new MutationObserver(function (records) {
      if (records.every(function (m) { return svg && svg.contains(m.target); })) return;
      schedule();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'hidden', 'inert', 'disabled', 'tabindex', 'open', 'aria-expanded'] });
    draw();
  }
  function hide() {
    if (!svg) return;
    window.removeEventListener('scroll', schedule, true);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('focusin', schedule);
    if (observer) observer.disconnect();
    observer = null;
    if (svg.parentNode) svg.parentNode.removeChild(svg);
    svg = null;
  }
  function toggle() { if (svg) hide(); else show(); }
  window.PlenixFocusOrder = { show: show, hide: hide, toggle: toggle, stops: stops, check: check };
  var start = function () { if (new URLSearchParams(location.search).get('focus-order') !== null) show(); };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) { e.preventDefault(); toggle(); }
  });
})();
