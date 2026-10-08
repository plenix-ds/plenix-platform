/* Plenix · Roving focus (platform/utils/roving.js)
   Summary: One Tab stop for a group of controls (a toolbar, a rail): only the current control is in the Tab order
     (tabindex 0), the others are reached with the arrow keys (tabindex -1). The current control is the one last focused,
     else the first. This is the WAI-ARIA toolbar pattern: Tab enters and leaves the group in one step.
   Usage:
     const ref = React.useRef(null);
     useRovingFocus(ref, () => items());          // after every render
     <div ref={ref} onFocus={(e) => roveTo(ref, items(), e.target)}>
   Props:
     useRovingFocus(ref, getItems): keeps exactly one item at tabindex 0 after every render
     roveTo(ref, items, el): makes el the current item (call when focus enters an item)
*/
import React from 'react';

function apply(items, current) {
  items.forEach((el) => {
    const on = el === current;
    if (el.tabIndex !== (on ? 0 : -1)) el.tabIndex = on ? 0 : -1;
    el.setAttribute('data-plx-roving', on ? 'current' : '');
  });
}

export function roveTo(ref, items, el) {
  if (!ref.current || items.indexOf(el) < 0) return;
  apply(items, el);
}

export function useRovingFocus(ref, getItems) {
  React.useEffect(() => {
    if (!ref.current) return;
    const items = getItems();
    if (!items.length) return;
    const current = items.filter((el) => el.getAttribute('data-plx-roving') === 'current')[0] || items[0];
    apply(items, current);
  });
}
