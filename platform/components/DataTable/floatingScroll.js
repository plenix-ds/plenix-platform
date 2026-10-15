/* Plenix · DataTable floating scrollbars (platform/components/DataTable/floatingScroll.js; internal to the DataTable)
   Summary: The table body's scrollbars float over the rows and take no room (owner, 2026-10-15: "for the scroll bar,
     solution is floating"). A classic scrollbar takes width, so Tabulator pushed the header aside with a margin written
     on the header row (10px, off the grid); a floating bar needs no room, so the header stays put and nothing is written.
   Usage:
     const unfloat = floatingScroll(tabulatorRoot, tabulatorRoot.querySelector('.tabulator-tableholder'));   // on tableBuilt
     unfloat();                                                                                                 // on unmount
   Props:
     root: the Tabulator root (.tabulator); the tracks are added to it
     holder: the scrolling body (.tabulator-tableholder)
     returns: a function that removes the tracks and stops watching
   Behavior:
     The body hides its own bars (data-table.css, where the browser has scroll-driven animations and anchor positioning;
       elsewhere the thin native bars stay, as on every other scroll area).
     A track per axis is anchored to the body's edges (CSS anchor positioning); its thumb moves with the body's scroll
       position (a scroll-driven animation on the body's scroll timeline). No style is written by script.
     The thumb's length is the visible share of the content, a step (data-plx-thumb: 10, 15 … 95) with one rule per step;
       no step means nothing to scroll on that axis, and no track.
     Dragging a thumb, or pressing its track, scrolls the body (scrollTop / scrollLeft only).
     Like every Plenix scrollbar the thumbs show while the pointer is over the table or focus is in it; reduced motion
       keeps the thumb following the scroll (it is feedback, not motion).
   Notes:
     The keyboard, the wheel and touch scroll the body as before: the tracks are pointer helpers (aria-hidden). */
const STEPS = 5;   // the thumb's length in steps of 5% of its track (10% at least)
const stepOf = (view, whole) => {
  if (!whole || whole - view < 1) return null;
  return String(Math.max(10, Math.min(95, Math.round((view / whole) * 100 / STEPS) * STEPS)));
};

export function floatingScroll(root, holder) {
  if (!root || !holder) return () => {};
  const doc = root.ownerDocument;
  const axes = [['y', 'clientHeight', 'scrollHeight', 'scrollTop', 'clientY'], ['x', 'clientWidth', 'scrollWidth', 'scrollLeft', 'clientX']];
  const tracks = axes.map(([axis, view, whole, pos, coord]) => {
    const track = doc.createElement('div');
    track.className = 'plx-data-table__scroll plx-data-table__scroll--' + axis;
    track.setAttribute('aria-hidden', 'true');
    const thumb = doc.createElement('div');
    thumb.className = 'plx-data-table__thumb';
    track.appendChild(thumb);
    root.appendChild(track);
    // drag: the thumb follows the pointer; the body moves by the content's share of each pixel
    let from = null;
    const move = (e) => {
      if (!from) return;
      const room = track[view === 'clientHeight' ? 'clientHeight' : 'clientWidth'] - thumb[view === 'clientHeight' ? 'offsetHeight' : 'offsetWidth'];
      if (room > 0) holder[pos] = from.at + ((e[coord] - from.p) / room) * (holder[whole] - holder[view]);
    };
    const up = (e) => { from = null; track.removeAttribute('data-plx-dragging'); try { thumb.releasePointerCapture(e.pointerId); } catch (x) { /* gone */ } };
    thumb.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault(); e.stopPropagation();
      from = { p: e[coord], at: holder[pos] };
      track.setAttribute('data-plx-dragging', '');
      thumb.setPointerCapture(e.pointerId);
    });
    thumb.addEventListener('pointermove', move);
    thumb.addEventListener('pointerup', up);
    thumb.addEventListener('pointercancel', up);
    // a press on the track pages toward it, as a native track does
    track.addEventListener('pointerdown', (e) => {
      if (e.target !== track || e.button !== 0) return;
      e.preventDefault();
      const r = thumb.getBoundingClientRect(), before = axis === 'y' ? e.clientY < r.top : (e.clientX < r.left) !== (getComputedStyle(holder).direction === 'rtl');
      holder[pos] += (before ? -1 : 1) * holder[view] * 0.9 * (axis === 'x' && getComputedStyle(holder).direction === 'rtl' ? -1 : 1);
    });
    return { track, view, whole };
  });
  // the thumb's length, whenever the body or its content changes size
  const size = () => tracks.forEach((t) => {
    const s = stepOf(holder[t.view], holder[t.whole]);
    if (s === null) t.track.removeAttribute('data-plx-thumb'); else if (t.track.getAttribute('data-plx-thumb') !== s) t.track.setAttribute('data-plx-thumb', s);
  });
  const win = doc.defaultView;
  const ro = win && win.ResizeObserver ? new win.ResizeObserver(size) : null;
  if (ro) { ro.observe(holder); Array.from(holder.children).forEach((c) => ro.observe(c)); }
  const mo = win && win.MutationObserver ? new win.MutationObserver(() => {
    if (ro) Array.from(holder.children).forEach((c) => ro.observe(c));
    size();
  }) : null;
  if (mo) mo.observe(holder, { childList: true });
  size();
  return () => { if (ro) ro.disconnect(); if (mo) mo.disconnect(); tracks.forEach((t) => t.track.remove()); };
}
