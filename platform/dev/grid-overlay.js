/* Plenix · Grid overlay (platform/dev/grid-overlay.js): the layout grid drawn over the page, for checking alignment.
   Load it on any Plenix page (<script src="…/platform/dev/grid-overlay.js"></script>, next to style-audit.js) and open
   the page with ?grid in its address (?grid=contained for the contained grid). The overlay is the layout grid itself
   (.plx-layout-grid in a .plx-layout-grid__overlay, system/layout-grid.css): the window class's columns, gutters and
   margins, translucent, above everything, and it never takes a click. Nothing is styled from here: classes only.
     PlenixGridOverlay.show('fluid' | 'contained')   PlenixGridOverlay.hide()   PlenixGridOverlay.toggle()
   Ctrl+Shift+G turns it on and off once the script is on the page. */
(function () {
  'use strict';
  var COLUMNS = 12;   // the most the layout grid has (Wide); the stylesheet shows as many as the window class has
  var node = null;
  function show(mode) {
    hide();
    node = document.createElement('div');
    node.className = 'plx-layout-grid__overlay';
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('data-plx-dev', 'grid-overlay');
    var grid = document.createElement('div');
    grid.className = 'plx-layout-grid plx-layout-grid--overlay' + (mode === 'contained' ? ' plx-layout-grid--contained' : '');
    for (var i = 0; i < COLUMNS; i++) { var c = document.createElement('div'); c.className = 'plx-layout-grid__column'; grid.appendChild(c); }
    node.appendChild(grid);
    document.body.appendChild(node);
  }
  function hide() { if (node && node.parentNode) node.parentNode.removeChild(node); node = null; }
  function toggle(mode) { if (node) hide(); else show(mode); }
  window.PlenixGridOverlay = { show: show, hide: hide, toggle: toggle };
  var param = new URLSearchParams(location.search).get('grid');
  var start = function () { if (param !== null) show(param); };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'G' || e.key === 'g')) { e.preventDefault(); toggle(param); }
  });
})();
