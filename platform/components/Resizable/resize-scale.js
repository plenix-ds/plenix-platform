/* Plenix · resizeScale
   Summary: Pointer values stay continuous; settled values use the 4px grid or caller steps.
   Usage: resizeScale(steps, min, max, keyboardSteps) returns clamp, snap, step and limits.
   Props: steps: allowed settled values; min/max: bounds; keyboardSteps: existing token steps.
   Behavior: Sorts and deduplicates explicit steps, clamps live values and supports limits beyond the token scale.
   Notes: No DOM or side effects. */
export function resizeScale(steps, min, max, keyboardSteps = []) {
  const clamp = value => Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
  const values = Array.isArray(steps) ? [...new Set(steps.filter(Number.isFinite).filter(value => value >= min && value <= max))].sort((a, b) => a - b) : [];
  const snap = value => values.length ? values.reduce((a, b) => Math.abs(b - value) < Math.abs(a - value) ? b : a) : clamp(Math.round(clamp(value) / 4) * 4);
  const step = (value, dir) => {
    if (values.length) return values[Math.max(0, Math.min(values.length - 1, values.indexOf(snap(value)) + (dir > 0 ? 1 : -1)))];
    const keys = keyboardSteps.filter(size => size >= min && size <= max);
    const last = keyboardSteps.length ? Math.max(...keyboardSteps) : min;
    if (value > last || (value === last && dir > 0) || !keys.length) return snap(value + (dir > 0 ? 4 : -4));
    const candidates = keys.filter(size => dir > 0 ? size > value : size < value);
    return candidates.length ? (dir > 0 ? Math.min(...candidates) : Math.max(...candidates)) : (dir > 0 ? max : min);
  };
  return { clamp, snap, step, lo: values.length ? values[0] : min, hi: values.length ? values[values.length - 1] : max };
}
