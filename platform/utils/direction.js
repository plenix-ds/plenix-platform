/* Plenix · Writing direction (platform/utils/direction.js)
   Summary: The arrow keys in reading order. In a right-to-left page Arrow Right moves back and Arrow Left forward, as the
     eye reads; Up and Down are the same in both directions.
   Usage:
     const step = arrowStep(e, e.currentTarget);   // +1, -1 or 0
     if (step) { e.preventDefault(); move(index + step); }
   Props:
     isRtl(el): true when the element is laid out right to left (its computed direction)
     arrowStep(event, el, { vertical }): +1 for the next item, -1 for the previous one, 0 for another key; with vertical:
       false, Up and Down are ignored (a horizontal-only control)
*/
export function isRtl(el) {
  return !!el && typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
}

export function arrowStep(event, el, opts) {
  const vertical = !opts || opts.vertical !== false;
  const rtl = isRtl(el);
  switch (event.key) {
    case 'ArrowRight': return rtl ? -1 : 1;
    case 'ArrowLeft': return rtl ? 1 : -1;
    case 'ArrowDown': return vertical ? 1 : 0;
    case 'ArrowUp': return vertical ? -1 : 0;
    default: return 0;
  }
}
