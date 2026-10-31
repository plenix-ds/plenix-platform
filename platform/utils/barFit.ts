/* Plenix · barFit (platform/utils/barFit.ts). Internal; not part of the public API.
   The button rule of a command bar, measured (owner, 2026-10-14): useBarFit(ref, key, max, min, rows, hold) returns the bar's step.
   Step 0 draws every control with its icon and label; each later step makes the bar narrower (icons only with tooltips,
   the search as its icon, then one more action into More per step, from the end, Delete last: the bar decides what a
   step means). The rows measured are the elements in ref that match rows (default [data-plx-bar-row]): a row fits while every visible child of
   it lies inside it on one line (rows ':self': the element itself is the row). The step starts again from `min` whenever the bar's width or `key` (anything that changes
   the controls' widths: labels, a selection) changes, unless hold (the bar's search is open across it), and goes up one step at a time, before the browser paints,
   until every row fits or `max` is reached. It also starts again when the page's web fonts finish loading (a bar measured
   with the fallback font must not stay folded; issue 777). Nothing is written to the page: the bar draws each step from its classes. */
import React from 'react';

// a row is too narrow when a child of it ends past its edge (either edge: right to left mirrors it) or starts on a
// second line. Children are read, not scrollWidth: a tooltip's hidden bubble at the end may reach past the edge
const over = (row: Element): boolean => {
  // a wrapper the toolbar makes transparent (display: contents: Stack, Inline) has no box: its children are read in its place
  const flat = (el: Element): HTMLElement[] => Array.prototype.reduce.call(el.children, ((out: HTMLElement[], k: HTMLElement) => (getComputedStyle(k).display === 'contents' ? out.concat(flat(k)) : out.concat(k))) as (out: unknown, k: unknown) => unknown, []) as HTMLElement[];
  const kids = flat(row).filter((k) => k.offsetParent !== null && k.offsetWidth > 0);
  if (!kids.length) return false;
  const box = row.getBoundingClientRect();
  const top = Math.min.apply(null, kids.map((k) => k.offsetTop));
  const tall = Math.max.apply(null, kids.map((k) => k.offsetHeight));
  return kids.some((k) => { const r = k.getBoundingClientRect(); return r.right > box.right + 1 || r.left < box.left - 1 || k.offsetTop >= top + tall; });
};

export function useBarFit(ref: React.RefObject<HTMLElement | null>, key: unknown, max: number, min = 0, rows = '[data-plx-bar-row]', hold = false): number {
  const [step, setStep] = React.useState(min);
  const [width, setWidth] = React.useState(0);
  const measured = React.useRef<unknown[] | null>(null);
  // the page's web fonts: a bar first measured with the fallback font (often wider) would stay folded once the real font
  // arrives, since neither its width nor its key changes. The ladder starts again when fonts finish loading, and once on
  // fonts.ready in case they finished before this bar mounted (issue 777)
  const [fonts, setFonts] = React.useState(0);
  React.useEffect(() => {
    // document.fonts may be absent (an older browser, a server render, a test DOM): then the bar keeps its first measure
    const set: FontFaceSet | undefined = typeof document !== 'undefined' ? (document as Document & { fonts?: FontFaceSet }).fonts : undefined;
    if (!set || typeof set.addEventListener !== 'function') return undefined;
    let live = true;
    const again = (): void => { if (live) setFonts((n) => n + 1); };
    set.addEventListener('loadingdone', again);
    if (set.ready && typeof set.ready.then === 'function') set.ready.then(again, () => {});
    return () => { live = false; set.removeEventListener('loadingdone', again); };
  }, []);
  // a fonts refit never pulls the bar out from under the person: while one of its menus is open (a control with
  // aria-expanded="true": More, a View or Sort menu) or focus is inside it, the refit waits and tries again shortly after.
  // Opening a menu can itself load a font face (its words in another weight), and that "loadingdone" must not close it
  // (issue 777, QA on #781)
  const later = React.useRef<(() => void) | null>(null);
  React.useEffect(() => () => { if (later.current) later.current(); }, []);
  React.useLayoutEffect(() => { if (!hold) setStep(min); }, [width, key, min, hold]);   // eslint-disable-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (!fonts || hold) return;
    const el = ref.current;
    if (later.current) { later.current(); later.current = null; }
    const open = !!el && !!el.querySelector('[aria-expanded="true"]'), focused = !!el && el.contains(document.activeElement);
    if (el && (open || focused)) {
      // try again once focus leaves the bar, or (a menu open, its focus elsewhere) a moment later
      const again = (): void => { if (later.current) { later.current(); later.current = null; } setFonts((n) => n + 1); };
      const out = (e: FocusEvent): void => { if (!e.relatedTarget || !el.contains(e.relatedTarget as Node)) again(); };
      el.addEventListener('focusout', out);
      const timer = open ? setTimeout(again, 1000) : null;
      later.current = () => { el.removeEventListener('focusout', out); if (timer) clearTimeout(timer); };
      return;
    }
    setStep(min);
  }, [fonts]);   // eslint-disable-line react-hooks/exhaustive-deps
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
    const signature = [el, width, key, max, min, rows, step, el.textContent, fonts];
    if (measured.current && signature.every((value, i) => value === measured.current![i])) return;
    measured.current = signature;
    if (Array.prototype.some.call(rows === ':self' ? [el] : el.querySelectorAll(rows), over)) setStep(step + 1);
  });
  return Math.max(min, Math.min(step, max));
}
