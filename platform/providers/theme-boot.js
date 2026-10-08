/* Plenix · Workspace (theme-boot.js)
   Summary: Sets the theme mode, the display density and the interaction environment before the page draws, and labels
     the main region's size. Every page loads it in <head>.
   Usage:
     <html lang="en" data-plx-density-policy="compact">
       <head> … <script src="…/platform/providers/theme-boot.js"></script> … </head>
   Props:
     data-plx-mode: on <html>: "light" (default) | "dark" | "system" (follows the system setting live)
     data-plx-density-policy: on <html> or a region: the density a page or region asks for when the user has not chosen
     data-plx-density-view: on <html>: the name of a workspace or view whose density is saved on its own ("audit-log")
     data-plx-theme: on <html>: the theme (default "default"; the themes are in platform/standards/themes.json)
     PlenixWorkspace.setTheme(name), clearTheme(), theme(): the person's theme, kept for every page
     PlenixWorkspace.setDensity(d): the user's choice, kept for every page
     PlenixWorkspace.setViewDensity(view, d): a saved density for one workspace or view
     PlenixWorkspace.clearDensity(): forget the user's choice (back to view, policy, standard)
     PlenixWorkspace.densities(): the choices to offer (compact is left out on a phone); the ChoiceList with useDensity draws the "Display density" control
     PlenixWorkspace.setPanelWidth(panel, px): keeps a resized panel's width ("inspector" | "filter"; 4px steps, within the panel's limits) and remembers it
   Behavior:
     Density (density.css), the first that applies: the user's explicit choice; the saved density of this workspace or view; the page or region policy; the system default (standard).
     Touch and mobile override target sizes in CSS whatever the density.
     A density change keeps the task context: focus, selection and every other state stay (nothing is re-rendered).
     The scroll position is kept on the item at the top of each scrolled region, and transitions are off for that frame.
     The change is announced to assistive technology, and a "plenix:densitychange" event lets virtualized lists re-measure.
     On a phone (mobile) compact is not offered and resolves to standard.
     Interaction (interaction.css): "pointer" (mouse, trackpad), "touch" (a coarse pointer) or "mobile" (a coarse pointer on a viewport under 768px); it follows the device live (a laptop folded into a tablet).
     Every .plx-shell-main gets data-plx-main-size = mobile (< 600px) | tablet (< 1024px) | desktop (< 1440px) | wide (< 1920px) | ultraWide, from its own width, for behavior that needs it in script (an inspector docked or as an overlay).
   Notes:
     Layout itself uses container queries in grid.css, not data-plx-main-size.
     It is a plain script (not React) so it runs before the page draws.
*/
(function () {
  'use strict';
  var root = document.documentElement;
  // the theme (batch 219): the person's choice, kept for every page (PlenixWorkspace.setTheme), else the default theme; the
  // themes are defined in the design system (platform/standards/themes.json). A page that sets data-plx-theme keeps it.
  var THEME_KEY = 'plenix.theme', THEME_NAME = /^[a-z][a-z0-9-]*$/, chosenTheme = null;
  try { chosenTheme = localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
  if (!root.hasAttribute('data-plx-theme')) root.setAttribute('data-plx-theme', chosenTheme && THEME_NAME.test(chosenTheme) ? chosenTheme : 'default');

  // mode: <html data-plx-mode="system"> follows the system setting live (light or dark; data-plx-mode-auto marks it);
  // "light" or "dark" fixes it. (Moved here from the asset app's include.js.)
  var sysDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (root.getAttribute('data-plx-mode') === 'system') root.setAttribute('data-plx-mode-auto', '');
  function followSystem() {
    if (!root.hasAttribute('data-plx-mode-auto')) return;
    root.setAttribute('data-plx-mode', sysDark && sysDark.matches ? 'dark' : 'light');
  }
  followSystem();
  if (sysDark && sysDark.addEventListener) sysDark.addEventListener('change', followSystem);
  // the web-font stylesheet (<link id="fontCss" media="print">) never delays the first paint; switch it on now
  var fontCss = document.getElementById('fontCss');
  if (fontCss) fontCss.media = 'all';
  // the three levels, densest first; standard is the system default (a name, never "Default")
  var DENSITIES = ['compact', 'standard', 'comfortable'];
  var LABELS = { compact: 'Compact', standard: 'Standard', comfortable: 'Comfortable' };
  var DESCRIPTIONS = { compact: 'Show more rows and controls for dense desktop work', standard: 'Balance information density and readability', comfortable: 'Add space for easier scanning and interaction' };
  var KEY = 'plenix.density', VIEW_KEY = 'plenix.density.view.';
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  // a choice saved under the old name of standard ("default") still counts
  var renamed = function (d) { return d === 'default' ? 'standard' : d; };
  var valid = function (d) { return DENSITIES.indexOf(d) >= 0; };

  // touch: a coarse pointer; mobile: a coarse pointer on a phone-sized viewport (under 768px); otherwise pointer
  var coarse = window.matchMedia ? window.matchMedia('(pointer: coarse)') : null, phone = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;
  function interaction() { return coarse && coarse.matches ? (phone && phone.matches ? 'mobile' : 'touch') : 'pointer'; }
  var onMobile = function () { return root.getAttribute('data-plx-interaction') === 'mobile'; };
  var fit = function (d) { return d === 'compact' && onMobile() ? 'standard' : d; };

  // the density a scope resolves to, without the interaction environment (CSS applies that)
  function chosen() {
    var user = renamed(store.get(KEY)); if (valid(user)) return { density: user, source: 'user' };
    var view = root.getAttribute('data-plx-density-view'), saved = view && renamed(store.get(VIEW_KEY + view));
    if (valid(saved)) return { density: saved, source: 'view' };
    return null;
  }
  function resolve(el) {
    var c = chosen(); if (c) return c.density;
    var policy = renamed(el.getAttribute('data-plx-density-policy')); if (valid(policy)) return policy;
    return el === root ? 'standard' : null;   // a region without policy follows the page
  }
  function applyAll() {
    root.setAttribute('data-plx-density', fit(resolve(root)));
    document.querySelectorAll('[data-plx-density-policy]').forEach(function (el) {
      if (el === root) return;
      var d = resolve(el);
      if (chosen() || !d) el.removeAttribute('data-plx-density'); else el.setAttribute('data-plx-density', fit(d));
    });
  }

  // keep the reader in place: per scrolled region, the item at its top stays at the same distance from the top
  function anchors() {
    var list = [], seen = [];
    var scrollers = [document.scrollingElement || root].concat(Array.prototype.filter.call(document.querySelectorAll('*'), function (el) {
      return el.scrollTop > 0 && el.scrollHeight > el.clientHeight;
    }));
    scrollers.forEach(function (sc) {
      if (!sc || seen.indexOf(sc) >= 0 || sc.scrollTop <= 0) return; seen.push(sc);
      var top = sc === document.scrollingElement || sc === root ? 0 : sc.getBoundingClientRect().top;
      var left = sc === document.scrollingElement || sc === root ? 8 : sc.getBoundingClientRect().left + 8;
      var el = document.elementFromPoint(left, top + 2);
      if (el && (sc === document.scrollingElement || sc === root || sc.contains(el))) list.push({ sc: sc, el: el, y: el.getBoundingClientRect().top });
    });
    return list;
  }
  var live;
  function announce(text) {
    if (!document.body) return;
    if (!live) { live = document.createElement('div'); live.className = 'plx-visually-hidden'; live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite'); document.body.appendChild(live); }
    live.textContent = ''; setTimeout(function () { live.textContent = text; }, 50);
  }
  function change(update) {
    var before = root.getAttribute('data-plx-density'), keep = anchors();
    root.setAttribute('data-plx-density-changing', '');
    update(); applyAll();
    keep.forEach(function (a) { var dy = a.el.getBoundingClientRect().top - a.y; if (dy) a.sc.scrollTop += dy; });
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.removeAttribute('data-plx-density-changing'); }); });
    var now = root.getAttribute('data-plx-density');
    if (now !== before) {
      announce('Display density: ' + LABELS[now]);
      window.dispatchEvent(new CustomEvent('plenix:densitychange', { detail: { density: now, previous: before } }));
    }
  }
  function setDensity(d) { if (valid(d)) change(function () { store.set(KEY, d); }); }
  function setViewDensity(view, d) { if (view && valid(d)) change(function () { store.set(VIEW_KEY + view, d); }); }
  function clearDensity() { change(function () { store.set(KEY, null); }); }

  var setInteraction = function () {
    var next = interaction();
    if (root.getAttribute('data-plx-interaction') === next) return;
    root.setAttribute('data-plx-interaction', next);
    if (root.hasAttribute('data-plx-density')) change(function () {}); else applyAll();
  };
  setInteraction();
  root.setAttribute('data-plx-density', fit(resolve(root)));
  [coarse, phone].forEach(function (m) { if (m && m.addEventListener) m.addEventListener('change', setInteraction); });
  var ready = function () { applyAll(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();

  function classify(w) { return w < 600 ? 'mobile' : w < 1024 ? 'tablet' : w < 1440 ? 'desktop' : w < 1920 ? 'wide' : 'ultraWide'; }
  function watchMain() {
    if (!window.ResizeObserver) return;
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (e) {
        var size = classify(e.contentRect.width);
        if (e.target.getAttribute('data-plx-main-size') !== size) e.target.setAttribute('data-plx-main-size', size);
      });
    });
    var seen = [];
    var scan = function () { document.querySelectorAll('.plx-shell-main').forEach(function (el) { if (seen.indexOf(el) < 0) { seen.push(el); ro.observe(el); } }); };
    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) watchMain(); else document.addEventListener('DOMContentLoaded', watchMain);

  var LIMITS = { inspector: [320, 480], filter: [280, 400] };
  function setPanelWidth(panel, px) {
    var l = LIMITS[panel]; if (!l) return;
    var w = Math.min(l[1], Math.max(l[0], Math.round(px / 4) * 4));
    root.style.setProperty('--plx-sys-panel-' + panel + '-width', w + 'px'); store.set('plenix.panel.' + panel, String(w));
  }
  Object.keys(LIMITS).forEach(function (p) { var v = parseInt(store.get('plenix.panel.' + p), 10); if (v) setPanelWidth(p, v); });

  // the theme: set it now and remember it for every page; clearTheme goes back to the default theme
  function setTheme(name) { if (!THEME_NAME.test(String(name))) return; store.set(THEME_KEY, name); root.setAttribute('data-plx-theme', name); }
  function clearTheme() { store.set(THEME_KEY, null); root.setAttribute('data-plx-theme', 'default'); }
  window.PlenixWorkspace = {
    setTheme: setTheme, clearTheme: clearTheme, theme: function () { return root.getAttribute('data-plx-theme'); },
    setDensity: setDensity, setViewDensity: setViewDensity, clearDensity: clearDensity,
    density: function () { return root.getAttribute('data-plx-density'); },
    densitySource: function () { var c = chosen(); return c ? c.source : root.hasAttribute('data-plx-density-policy') ? 'policy' : 'system'; },
    densities: function () { return DENSITIES.filter(function (d) { return !(d === 'compact' && onMobile()); }).map(function (d) { return { value: d, label: LABELS[d], description: DESCRIPTIONS[d] }; }); },
    setPanelWidth: setPanelWidth, classify: classify
  };
})();
