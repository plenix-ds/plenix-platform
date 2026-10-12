/* Plenix · Keylines overlay (platform/dev/keylines.js): shows where icons sit on the page, for checking alignment.
   Load it on any Plenix page (<script src="…/platform/dev/keylines.js"></script>, next to style-audit.js) and open the
   page with ?keylines in its address: data-plx-keylines="on" on <html> makes system/keylines.css outline every icon
   square, so icons that should share a keyline can be seen to line up (or not). Nothing is styled from here.
     PlenixKeylines.show()   PlenixKeylines.hide()   PlenixKeylines.toggle()
   Ctrl+Shift+K turns it on and off once the script is on the page. */
(function () {
  'use strict';
  var root = document.documentElement;
  function show() { root.setAttribute('data-plx-keylines', 'on'); }
  function hide() { root.removeAttribute('data-plx-keylines'); }
  function toggle() { if (root.getAttribute('data-plx-keylines') === 'on') hide(); else show(); }
  window.PlenixKeylines = { show: show, hide: hide, toggle: toggle };
  if (new URLSearchParams(location.search).get('keylines') !== null) show();
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k')) { e.preventDefault(); toggle(); }
  });
})();
