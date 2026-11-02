// Plenix · tokenMs: a duration token's value in milliseconds ("4s", "250ms"), read from the element (or the root), so
// behavior that waits (a toast leaving, a delay) takes its time from the tokens like the stylesheets do (batch 341).
// Returns the fallback when the token is not set (no document, or the token stylesheet not loaded).
// the reader asked for less motion (prefers-reduced-motion): a scroll or a slide jumps instead of moving (Anchor,
// BackToTop, Carousel, the drag-and-drop of utils/dnd.ts; one copy, issue 882)
export const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// a duration token ("0.5s", "500ms", or a bare number of seconds) read from one element's computed style, in
// milliseconds; 0 with no element or no number (Popover's hover delays, Tooltip's press and close delays; one copy, issue 882)
export const elementMs = (el: Element | null, name: string): number => {
  const v = el ? getComputedStyle(el).getPropertyValue(name).trim() : '';
  const n = parseFloat(v);
  return isNaN(n) ? 0 : /ms$/.test(v) ? n : n * 1000;
};
export function tokenMs(name: string, fallback = 0, el?: Element | null): number {
  if (typeof document === 'undefined') return fallback;
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(name).trim();
  const m = /^(-?[\d.]+)(ms|s)$/.exec(v);
  return m ? parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1) : fallback;
}
