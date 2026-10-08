/* Plenix · Radius audit (platform/dev/radius-audit.js): checks a page against the Plenix radius system (platform/system/radius.css).
   Loaded by every Plenix page; it does nothing until asked:
     PlenixRadius.audit()      -> { findings: [...], stats: {...} } for the current page
     PlenixRadius.report()     -> the same, printed to the console
     add ?radius-audit to a page's address to print the report once the page has loaded.
   The master design spec (platform/design-system/, Radius) runs it on the live pages and lists the findings.
   What it checks:
   1. Tokens (stylesheets and inline styles): every corner uses a role token (--radius-control-4px), the pill
      (--radius-pill), --radius-0px, or the derived formula. A raw value or a bare value token (--radius-4px) is reported.
      A role used at several sizes (cards at 4px and 12px) is reported for review.
   2. Avatars ([data-plx-avatar], .avatar, .topnav-avatar, …) are rounded squares: never circles, and the corner follows the
      avatar's size (24px: 4px, up to 40px: 6px, up to 64px: 8px, larger: 12px).
   3. Nested surfaces: a rounded surface whose corner sits inside a rounded parent's corner should follow it:
      inner = max(0, outer − gap), gap = the real distance between the two curves. Buttons, menu items, form controls,
      toolbar actions, avatars and pills are never part of this check: they own their radius. Clipping, elliptical
      corners and other corner shapes are handled separately.
   4. Controls and density: a standard control (button, input, select, navigation or menu item) in the 4–6px family
      shows 4px in compact density and 6px otherwise (--radius-control).
   5. Menus: a menu or dropdown is a containment surface. A menu item is checked only where its outer corners meet the
      menu's rounded edge: there it must follow the menu (outer − border), or the menu must clip it.
   Each finding: { classification, severity, confidence, source, target, detail, expected, actual }. */
(function () {
  'use strict';
  var CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
  var ROLE_OK = /^var\(--(?:plx-sys-)?radius-(?:[a-z]+-\d+px|pill|0px|control)\)$|^var\(--plx-ref-radius-(?:0px|pill)\)$|^var\(--plx-comp-[a-z-]+-radius\)$/;
  var MENU_ITEM_SEL = '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"],[class*="menu-item"],[class*="dropdown-item"],[class*="-option"]';
  var CONTROL_SEL = 'button,input:not([type=checkbox]):not([type=radio]):not([type=color]):not([type=range]),select,textarea,.btn,[role="button"],[role="menuitem"],[class*="menu-item"],.sidebar-item,.lni';
  var DERIVED_OK = /^max\(0px,\s*calc\(var\(--plx-sys-radius-outer\)\s*-\s*var\(--plx-sys-radius-inset\)\)\)$/;
  var VALUE_TOKEN = /^var\(--radius-(\d+)px\)$/;
  var AVATAR_SEL = '[data-plx-avatar],.avatar,.user-avatar,.profile-avatar,.person-avatar,.topnav-avatar,.ba-avatar';
  var INTERACTIVE_SEL = 'button,input,select,textarea,a[href],[role="button"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"],[role="tab"],[role="switch"],[role="checkbox"],[role="radio"],label,summary,.btn,[class*="menu-item"],[class*="-option"],[class*="toggle"],[class*="-check"]';
  var expectedAvatar = function (size) { return size <= 24 ? 4 : size <= 40 ? 6 : size <= 64 ? 8 : 12; };

  // ---- small helpers
  function describe(el) {
    if (!el || !el.tagName) return '?';
    var s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    var cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (cls.length) s += '.' + cls.join('.');
    if (!cls.length && !el.id && el.parentElement) s = describe(el.parentElement) + ' > ' + s;
    return s;
  }
  // a computed corner: "12px" or "12px 16px" (elliptical) or "50%"; -> {x, y} in px for this element
  function cornerPx(cs, corner, w, h) {
    var v = cs.getPropertyValue('border-' + corner + '-radius').trim().split(/\s+/);
    var conv = function (s, dim) { return /%$/.test(s) ? parseFloat(s) / 100 * dim : parseFloat(s) || 0; };
    var x = conv(v[0], w), y = conv(v[1] || v[0], h);
    var lim = Math.min(w, h) / 2;     // the browser shrinks corners that cannot fit (a pill ends up at half the height)
    return { x: Math.min(x, lim), y: Math.min(y, lim) };
  }
  function isSurface(cs) {
    var bg = cs.backgroundColor, hasBg = bg && bg !== 'transparent' && !/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(bg);
    var hasBorder = ['Top', 'Right', 'Bottom', 'Left'].some(function (s) { return parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none'; });
    return hasBg || hasBorder || (cs.boxShadow && cs.boxShadow !== 'none') || (cs.backgroundImage && cs.backgroundImage !== 'none');
  }
  function visible(el, cs) {
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0;
  }
  function isAvatar(el) { return el.matches && el.matches(AVATAR_SEL); }
  function isPill(el, cs, w, h) {
    var c = cornerPx(cs, 'top-left', w, h); return Math.min(w, h) > 0 && c.x >= Math.min(w, h) / 2 - 0.5 && !isAvatar(el);
  }
  function excludedFromConcentric(el, cs, w, h) {
    return el.matches(INTERACTIVE_SEL) || isAvatar(el) || isPill(el, cs, w, h);
  }

  // ---- 1. tokens: walk every readable stylesheet rule, and inline styles
  function eachRule(list, fn) {
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      if (r.styleSheet) { try { eachRule(r.styleSheet.cssRules, fn); } catch (e) { /* another origin */ } continue; }
      if (r.cssRules && !r.selectorText) { try { eachRule(r.cssRules, fn); } catch (e) { /* unreadable */ } continue; }
      if (r.selectorText && r.style) fn(r);
    }
  }
  function tokenAudit(doc, out, stats) {
    var roleSizes = {}, inline = {};
    var check = function (value, where, source) {
      value = value.trim();
      if (!value || value === 'inherit' || value === 'initial') return;
      stats.cornersChecked++;
      var m = /^var\(--radius-([a-z]+)-(\d+)px\)$/.exec(value);
      if (m) { (roleSizes[m[1]] = roleSizes[m[1]] || {})[m[2]] = (roleSizes[m[1]][m[2]] || 0) + 1; return; }
      if (ROLE_OK.test(value) || DERIVED_OK.test(value)) return;
      var vt = VALUE_TOKEN.exec(value);
      var f = vt
        ? { classification: 'Token bypass', severity: 'warning', confidence: 'high', detail: 'Uses the value token directly; use the role that fits (e.g. --radius-control-' + vt[1] + 'px).', expected: 'a role token (--radius-<role>-' + vt[1] + 'px)', actual: value }
        : { classification: 'Raw radius value', severity: 'error', confidence: 'high', detail: 'A corner written as a raw value instead of a radius token.', expected: 'a radius token', actual: value };
      if (source === 'inline') {   // inline styles repeat, so they are grouped by value
        var k = f.classification + '|' + value; if (!inline[k]) inline[k] = Object.assign({ source: 'inline', target: '', count: 0, examples: [] }, f);
        inline[k].count++; if (inline[k].examples.length < 3) inline[k].examples.push(where);
      } else out.push(Object.assign({ source: 'css', target: where }, f));
    };
    Array.prototype.forEach.call(doc.styleSheets, function (sheet) {
      var file = (sheet.href || '').split('/').pop() || 'a style element';
      try {
        eachRule(sheet.cssRules, function (r) {
          var seen = {};
          CORNERS.forEach(function (c) { var v = r.style.getPropertyValue('border-' + c + '-radius'); if (v && !seen[v]) { seen[v] = 1; check(v, r.selectorText + '  (' + (r.parentStyleSheet && r.parentStyleSheet.href ? r.parentStyleSheet.href.split('/').pop() : file) + ')', 'css'); } });
        });
      } catch (e) { /* a stylesheet from another origin (fonts) */ }
    });
    doc.querySelectorAll('[style]').forEach(function (el) {
      var seen = {};
      CORNERS.forEach(function (c) { var v = el.style.getPropertyValue('border-' + c + '-radius'); if (v && !seen[v]) { seen[v] = 1; check(v, describe(el), 'inline'); } });
    });
    Object.keys(inline).forEach(function (k) { var f = inline[k]; f.target = f.count + ' inline style' + (f.count === 1 ? '' : 's') + ', e.g. ' + f.examples.join(', '); out.push(f); });
    Object.keys(roleSizes).forEach(function (role) {
      var sizes = Object.keys(roleSizes[role]).map(Number).sort(function (a, b) { return a - b; });
      if (sizes.length > 1 && role !== 'avatar') out.push({ classification: 'Variant inconsistency', severity: 'info', confidence: 'medium', source: 'css', target: '--radius-' + role + '-*',
        detail: 'The ' + role + ' role is used at ' + sizes.length + ' sizes (' + sizes.map(function (s) { return s + 'px'; }).join(', ') + '). Merge them if they should look the same.', expected: 'one size per role, unless the difference is intended', actual: sizes.join('px, ') + 'px' });
    });
    stats.roles = roleSizes;
  }

  // ---- 2 and 3. what is drawn: avatars, nested surfaces
  function renderAudit(doc, out, stats) {
    var win = doc.defaultView;
    var els = doc.body ? doc.body.querySelectorAll('*') : [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i], cs = win.getComputedStyle(el);
      if (!visible(el, cs)) continue;
      var rect = el.getBoundingClientRect(), w = rect.width, h = rect.height;
      if (isAvatar(el)) {
        stats.avatars++;
        var c = cornerPx(cs, 'top-left', w, h), half = Math.min(w, h) / 2;
        if (Math.abs(w - h) <= 1 && c.x >= half * 0.95 && c.y >= half * 0.95) {
          out.push({ classification: 'Avatar Shape Inconsistency', severity: 'error', confidence: 'high', source: 'render', target: describe(el),
            detail: 'A circular avatar. Plenix avatars are rounded squares.', expected: expectedAvatar(Math.round(w)) + 'px corner (--radius-avatar-' + expectedAvatar(Math.round(w)) + 'px)', actual: Math.round(w) + '×' + Math.round(h) + 'px, corner ' + Math.round(c.x) + 'px' });
        } else if (Math.abs(c.x - expectedAvatar(Math.round(w))) > 0.5) {
          out.push({ classification: 'Avatar Radius Inconsistency', severity: 'warning', confidence: 'high', source: 'render', target: describe(el),
            detail: 'The avatar corner does not follow the avatar size scale.', expected: expectedAvatar(Math.round(w)) + 'px for a ' + Math.round(w) + 'px avatar', actual: Math.round(c.x) + 'px' });
        }
        continue;   // avatars never take part in the nested-surface check
      }
      var any = CORNERS.some(function (k) { return cornerPx(cs, k, w, h).x > 0; });
      // a standard control's corner follows density: 4px in compact, 6px otherwise (only checked where it uses the 4–6px family)
      if (any && el.matches(CONTROL_SEL) && !isPill(el, cs, w, h)) {
        stats.controls = (stats.controls || 0) + 1;
        var cr = cornerPx(cs, 'top-left', w, h).x, dz = el.closest('[data-plx-density]'), dens = dz ? dz.getAttribute('data-plx-density') : 'standard', want = dens === 'compact' ? 4 : 6;
        if ((cr === 4 || cr === 6) && cr !== want) out.push({ classification: 'Control radius vs density', severity: 'warning', confidence: 'high', source: 'render', target: describe(el),
          detail: 'A standard control in ' + dens + ' density takes --radius-control (' + want + 'px).', expected: want + 'px (--radius-control)', actual: cr + 'px' });
      }
      // a menu item meeting its menu's rounded edge: its outer corners must follow the menu (or the menu clips them)
      if (el.matches(MENU_ITEM_SEL)) {
        var mp = el.parentElement, mcs = null;
        while (mp && mp !== doc.body) { mcs = win.getComputedStyle(mp); if (isSurface(mcs) && parseFloat(mcs.borderTopLeftRadius) > 0) break; mp = mp.parentElement; }
        if (mp && mp !== doc.body && isSurface(cs)) {
          var mr = mp.getBoundingClientRect(), mclips = /hidden|clip/.test(mcs.overflowX + mcs.overflowY);
          var bw = { 'top-left': [parseFloat(mcs.borderLeftWidth), parseFloat(mcs.borderTopWidth)], 'top-right': [parseFloat(mcs.borderRightWidth), parseFloat(mcs.borderTopWidth)], 'bottom-right': [parseFloat(mcs.borderRightWidth), parseFloat(mcs.borderBottomWidth)], 'bottom-left': [parseFloat(mcs.borderLeftWidth), parseFloat(mcs.borderBottomWidth)] };
          var mg = { 'top-left': [rect.left - mr.left, rect.top - mr.top], 'top-right': [mr.right - rect.right, rect.top - mr.top], 'bottom-right': [mr.right - rect.right, mr.bottom - rect.bottom], 'bottom-left': [rect.left - mr.left, mr.bottom - rect.bottom] };
          CORNERS.forEach(function (k) {
            if (mg[k][0] - bw[k][0] > 0.5 || mg[k][1] - bw[k][1] > 0.5) return;     // not at the menu's edge: the item owns its corner
            stats.menuCorners = (stats.menuCorners || 0) + 1;
            var o = cornerPx(mcs, k, mr.width, mr.height).x, want2 = Math.max(0, o - Math.max(bw[k][0], bw[k][1])), have = cornerPx(cs, k, w, h).x;
            if (!mclips && Math.abs(have - want2) > 1) out.push({ classification: 'Menu corner correspondence', severity: 'warning', confidence: 'high', source: 'render', target: describe(el) + ' in ' + describe(mp) + ' (' + k + ')',
              detail: 'This item\'s corner meets the menu\'s rounded edge, so it must follow the menu (or the menu clips it).', expected: Math.round(want2) + 'px (or overflow: clip on the menu)', actual: Math.round(have) + 'px' });
          });
        }
      }
      if (!any || !isSurface(cs) || excludedFromConcentric(el, cs, w, h)) continue;
      if ('cornerShape' in cs && cs.cornerShape && !/^(round|superellipse\(1\))$/.test(cs.cornerShape)) {   // round corners report as round or superellipse(1)
        out.push({ classification: 'Radius Geometry Review', severity: 'info', confidence: 'low', source: 'render', target: describe(el), detail: 'A corner shape other than round (' + cs.cornerShape + '): the outer − gap rule may not apply.', expected: '', actual: cs.cornerShape });
        continue;
      }
      // the nearest rounded surface it sits in
      var p = el.parentElement, pcs = null;
      while (p && p !== doc.body) { pcs = win.getComputedStyle(p); if (isSurface(pcs) && CORNERS.some(function (k) { return parseFloat(pcs.getPropertyValue('border-' + k + '-radius')) > 0; })) break; p = p.parentElement; }
      if (!p || p === doc.body) continue;
      stats.nestedPairs++;
      var pr = p.getBoundingClientRect(), pw = pr.width, ph = pr.height;
      var clips = /hidden|clip/.test(pcs.overflowX + pcs.overflowY) || (pcs.clipPath && pcs.clipPath !== 'none') || (pcs.maskImage && pcs.maskImage !== 'none') || (pcs.webkitMaskImage && pcs.webkitMaskImage !== 'none');
      var gaps = { 'top-left': [rect.left - pr.left, rect.top - pr.top], 'top-right': [pr.right - rect.right, rect.top - pr.top], 'bottom-right': [pr.right - rect.right, pr.bottom - rect.bottom], 'bottom-left': [rect.left - pr.left, pr.bottom - rect.bottom] };
      CORNERS.forEach(function (k) {
        var outer = cornerPx(pcs, k, pw, ph), inner = cornerPx(cs, k, w, h), gx = gaps[k][0], gy = gaps[k][1];
        if (outer.x <= 0 || gx < -0.5 || gy < -0.5) return;
        // the corner follows the parent only when it sits inside the parent's curve and is inset evenly
        if (gx >= outer.x || gy >= outer.y || Math.abs(gx - gy) > 1.5) return;
        stats.cornersCompared++;
        var ex = Math.max(0, outer.x - gx), ey = Math.max(0, outer.y - gy);
        var target = describe(el) + ' in ' + describe(p) + ' (' + k + ')';
        if (gx < 0.5 && gy < 0.5 && clips) {
          if (Math.abs(inner.x - outer.x) > 1) out.push({ classification: 'Parent-clipped surface', severity: 'info', confidence: 'medium', source: 'render', target: target,
            detail: 'Flush with a parent that clips, so the visible corner already follows the parent; its own radius is hidden.', expected: 'no own radius needed (' + Math.round(outer.x) + 'px shown)', actual: Math.round(inner.x) + 'px' });
          return;
        }
        var off = Math.max(Math.abs(inner.x - ex), Math.abs(inner.y - ey));
        if (off <= 1) return;
        var elliptical = Math.abs(ex - ey) > 0.5 || Math.abs(inner.x - inner.y) > 0.5;
        var equalNested = Math.abs(inner.x - outer.x) <= 0.5 && gx >= 1;
        out.push({ classification: elliptical ? 'Elliptical Radius Mismatch' : equalNested || off >= 3 ? 'Likely Concentric Radius Mismatch' : 'Radius Geometry Review',
          severity: equalNested || off >= 3 ? 'warning' : 'info', confidence: equalNested ? 'high' : off >= 3 ? 'medium' : 'low', source: 'render', target: target,
          detail: (equalNested ? 'Same radius as its parent although it is inset: nested corners look uneven. ' : '') + 'Outer ' + Math.round(outer.x) + 'px − gap ' + Math.round(gx) + 'px = ' + Math.round(ex) + 'px. If the difference is intended (optical correction), document it.',
          expected: Math.round(ex) + (elliptical ? '×' + Math.round(ey) : '') + 'px (derived: .plx-radius-concentric)', actual: Math.round(inner.x) + (elliptical ? '×' + Math.round(inner.y) : '') + 'px' });
      });
    }
  }

  function audit(opts) {
    var doc = (opts && opts.document) || document, out = [], stats = { cornersChecked: 0, avatars: 0, nestedPairs: 0, cornersCompared: 0 };
    tokenAudit(doc, out, stats);
    renderAudit(doc, out, stats);
    var order = { error: 0, warning: 1, info: 2 };
    out.sort(function (a, b) { return order[a.severity] - order[b.severity] || a.classification.localeCompare(b.classification); });
    stats.findings = out.length;
    return { page: doc.location ? doc.location.pathname.split('/').pop() : '', findings: out, stats: stats };
  }
  function report(opts) {
    var r = audit(opts);
    if (window.console) {
      console.log('Plenix radius audit · ' + r.page + ': ' + r.findings.length + ' findings', r.stats);
      if (console.table) console.table(r.findings.map(function (f) { return { classification: f.classification, severity: f.severity, confidence: f.confidence, target: f.target, expected: f.expected, actual: f.actual }; }));
    }
    return r;
  }
  window.PlenixRadius = { audit: audit, report: report, expectedAvatarRadius: expectedAvatar };
  if (/[?&#]radius-audit\b/.test(location.search + location.hash)) window.addEventListener('load', function () { setTimeout(report, 800); });
})();
