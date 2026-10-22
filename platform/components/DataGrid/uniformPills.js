/* Plenix · UniformPills
   Summary: Equal natural pill widths per rendered column, rounded up to existing size tokens.
   Usage: useUniformPills(frame, enabled); standard cells opt in with data-plx-pill-field.
   Props: frame: grid root ref; enabled: true opts in (default false at the public grid).
   Behavior: Current rendered rows only; resizing, row changes and font loading remeasure. No style attributes.
   Notes: Custom renderers are unchanged; widths stay bounded by the pill's existing max-inline-size. */
import React from 'react';
import { SIZE_STEPS } from '../../utils/sizeSteps.js';

export function measurePills(root) {
  const widths = Object.create(null);
  for (const pill of root.querySelectorAll('[data-plx-pill-field]')) {
    if (pill.closest?.('[data-plx-engine]') !== root && pill.closest) continue;
    const text = pill.querySelector('.plx-data-pill__value');
    if (!text) continue;
    const css = pill.ownerDocument.defaultView.getComputedStyle(pill);
    const number = key => parseFloat(css[key]) || 0;
    const icon = pill.querySelector('.plx-data-pill__icon');
    const natural = text.scrollWidth + number('paddingInlineStart') + number('paddingInlineEnd')
      + number('borderInlineStartWidth') + number('borderInlineEndWidth')
      + (icon ? icon.getBoundingClientRect().width + number('columnGap') : 0);
    const step = SIZE_STEPS.find(size => size >= natural) || SIZE_STEPS[SIZE_STEPS.length - 1];
    const field = pill.dataset.plxPillField;
    widths[field] = Math.max(widths[field] || 0, step);
  }
  return widths;
}

export function useUniformPills(frame, enabled) {
  const [widths, setWidths] = React.useState({});
  React.useLayoutEffect(() => {
    const root = frame.current;
    if (!enabled || !root) return;
    let pending = 0, disposed = false;
    const measure = () => {
      pending = 0;
      if (disposed) return;
      const next = measurePills(root);
      setWidths(old => JSON.stringify(old) === JSON.stringify(next) ? old : next);
    };
    const schedule = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    root.ownerDocument.fonts?.addEventListener('loadingdone', schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(pending);
      observer.disconnect();
      root.ownerDocument.fonts?.removeEventListener('loadingdone', schedule);
    };
  });
  return enabled ? widths : {};
}
