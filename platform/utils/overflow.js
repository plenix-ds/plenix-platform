/* Plenix · overflow (platform/utils/overflow.js). Internal; not part of the public API.
   A one-row list whose items move into a "More" menu when they do not fit. The list wraps (flex-wrap) inside a box one
   row high that clips the rest. Its children, in DOM order (which is also the focus order), are the shown items, the
   More control (data-plx-overflow-more) and then the hidden items (each item: data-plx-overflow-item; render them with
   splitAt). useOverflow(listRef, count, key)
   returns how many items are shown: it starts from all of them whenever the width, the count or `key` (anything that
   changes the items' widths, such as their labels) changes, and lowers the number, before the browser paints, until the
   shown items and the More control are all on the first row. Items past that number are made inert. */
import React from 'react';

const firstRowTop = (list) => Math.min.apply(null, Array.prototype.map.call(list.children, (el) => el.offsetTop));

export function useOverflow(listRef, count, key) {
  const [fit, setFit] = React.useState(count);
  const [width, setWidth] = React.useState(0);
  React.useLayoutEffect(() => { setFit(count); }, [count, key, width]);
  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(list.clientWidth));
    ro.observe(list);
    return () => ro.disconnect();
  }, []);
  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !list.children.length) return;
    const items = list.querySelectorAll(':scope > [data-plx-overflow-item]');
    const more = list.querySelector(':scope > [data-plx-overflow-more]');
    const top = firstRowTop(list);
    let fits = !(more && more.offsetTop !== top);
    for (let i = 0; i < Math.min(fit, items.length); i += 1) if (items[i].offsetTop !== top) fits = false;
    Array.prototype.forEach.call(items, (el, i) => {
      if (i >= fit) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
    if (!fits && fit > 0) setFit(fit - 1);
  });
  return Math.min(fit, count);
}

/* the list's children in DOM order: the first `fit` items, the More control, the rest */
export const splitAt = (items, fit, more) => items.slice(0, fit).concat(more ? [more] : [], items.slice(fit));
