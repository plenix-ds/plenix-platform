// Plenix · tokenMs: a duration token's value in milliseconds ("4s", "250ms"), read from the element (or the root), so
// behavior that waits (a toast leaving, a delay) takes its time from the tokens like the stylesheets do (batch 341).
// Returns the fallback when the token is not set (no document, or the token stylesheet not loaded).
export function tokenMs(name: string, fallback = 0, el?: Element | null): number {
  if (typeof document === 'undefined') return fallback;
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(name).trim();
  const m = /^(-?[\d.]+)(ms|s)$/.exec(v);
  return m ? parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1) : fallback;
}
