/* Plenix · barFit (platform/utils/barFit.js). Internal; not part of the public API.
   The button rule of a command bar, measured (owner, 2026-10-14): useBarFit(ref, key, max, min, rows, hold) returns the bar's step.
   Step 0 draws every control with its icon and label; each later step makes the bar narrower (icons only with tooltips,
   the search as its icon, then one more action into More per step, from the end, Delete last: the bar decides what a
   step means). The rows measured are the elements in ref that match rows (default [data-plx-bar-row]): a row fits while every visible child of
   it lies inside it on one line (rows ':self': the element itself is the row). The step starts again from `min` whenever the bar's width or `key` (anything that changes
   the controls' widths: labels, a selection) changes, unless hold (the bar's search is open across it), and goes up one step at a time, before the browser paints,
   until every row fits or `max` is reached. Nothing is written to the page: the bar draws each step from its classes. */
import React from 'react';

// a row is too narrow when a child of it ends past its edge (either edge: right to left mirrors it) or starts on a
// second line. Children are read, not scrollWidth: a tooltip's hidden bubble at the end may reach past the edge
const over = (row) => {
  // a wrapper the toolbar makes transparent (display: contents: Stack, Inline) has no box: its children are read in its place
  const flat = (el) => Array.prototype.reduce.call(el.children, (out, k) => (getComputedStyle(k).display === 'contents' ? out.concat(flat(k)) : out.concat(k)), []);
  const kids = flat(row).filter((k) => k.offsetParent !== null && k.offsetWidth > 0);
  if (!kids.length) return false;
  const box = row.getBoundingClientRect();
  const top = Math.min.apply(null, kids.map((k) => k.offsetTop));
  const tall = Math.max.apply(null, kids.map((k) => k.offsetHeight));
  return kids.some((k) => { const r = k.getBoundingClientRect(); return r.right > box.right + 1 || r.left < box.left - 1 || k.offsetTop >= top + tall; });
};

export function useBarFit(ref, key, max, min = 0, rows = '[data-plx-bar-row]', hold = false) {
  const [step, setStep] = React.useState(min);
  const [width, setWidth] = React.useState(0);
  const measured = React.useRef(null);
  React.useLayoutEffect(() => { if (!hold) setStep(min); }, [width, key, min, hold]);   // eslint-disable-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || step >= max || hold) return;
    // Text covers count/custom-slot changes not represented by the caller's key. Reading it does not force layout.
    // Keep this check after the commit: a render-time dependency would still see the previous DOM text.
    const signature = [el, width, key, max, min, rows, step, el.textContent];
    if (measured.current && signature.every((value, i) => value === measured.current[i])) return;
    measured.current = signature;
    if (Array.prototype.some.call(rows === ':self' ? [el] : el.querySelectorAll(rows), over)) setStep(step + 1);
  });
  return Math.max(min, Math.min(step, max));
}
