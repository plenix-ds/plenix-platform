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

/* useTruncated(ref) (batch 270): true while the element's one line of text is cut short (shown with an ellipsis), so
   its full text can be offered in a Tooltip; checked again whenever the element's width changes. */
export function useTruncated(ref) {
  const [cut, setCut] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const check = () => setCut(el.scrollWidth > el.clientWidth + 1);
    check();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return cut;
}
/* Command-bar fitting: read each visible control once, then evaluate every folding step in memory. The caller marks
   removable controls with data-plx-fit-until and the action group with data-plx-fit-more (the first folded step).
   No DOM writes, measurement copies, repeated React commits or per-step layout reads. */
export function useBarFit(ref, key, max, min = 0, rows = '[data-plx-bar-row]', hold = false) {
  const [width, setWidth] = React.useState(0);
  const [fit, setFit] = React.useState({ key: null, width: -1, min, max, step: min });
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => setWidth(element.clientWidth));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  const fresh = fit.key === key && fit.width === width && fit.min === min && fit.max === max;
  // A changed collection renders its complete controls once, before paint, so hidden items are measured too.
  const step = hold ? fit.step : fresh ? fit.step : min;
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element || hold || fresh) return;
    const number = value => parseFloat(value) || 0;
    let iconWidth = 0;
    const read = node => {
      const style = getComputedStyle(node);
      if (style.display === 'none' || style.position === 'absolute' || style.position === 'fixed' || node.matches('[role="tooltip"]')) return [];
      const until = node.getAttribute('data-plx-fit-until');
      const active = value => until === null || value < Number(until);
      if (style.display === 'contents') {
        const children = [...node.children].flatMap(read);
        return children.map(child => value => active(value) ? child(value) : null);
      }
      if (node.matches('.plx-toolbar__spacer')) return [value => active(value) ? 0 : null];
      const box = node.getBoundingClientRect();
      const margin = number(style.marginInlineStart) + number(style.marginInlineEnd);
      if (node.matches('.plx-button')) {
        const square = number(style.minBlockSize) || box.height;
        iconWidth = iconWidth || square;
        const compact = !!node.querySelector('.plx-button__icon') && !node.matches('.plx-button--primary,.plx-command-bar__clear');
        const badge = node.querySelector('.plx-badge');
        const icon = node.querySelector('.plx-button__icon');
        const compactWidth = badge && icon ? icon.getBoundingClientRect().width + badge.getBoundingClientRect().width + number(style.columnGap)
          + number(style.paddingInlineStart) + number(style.paddingInlineEnd) + number(style.borderInlineStartWidth) + number(style.borderInlineEndWidth) : square;
        return [value => active(value) ? margin + (value >= 1 && compact ? compactWidth : box.width) : null];
      }
      if (node.matches('.plx-search')) {
        const input = node.querySelector('input');
        const square = input ? number(getComputedStyle(input).minBlockSize) : box.height;
        return [value => active(value) ? margin + (value >= 2 ? square : box.width) : null];
      }
      if (node.matches('.plx-command-bar__count,.plx-command-bar__status')) return [value => value >= 2 ? null : margin + box.width];
      const children = [...node.children].flatMap(read);
      const flex = style.display === 'flex' || style.display === 'inline-flex';
      const moreAt = node.getAttribute('data-plx-fit-more');
      if (flex || style.display === 'contents' || (children.length && node.matches('.plx-tooltip,.plx-menu,.plx-bar-actions__panel'))) {
        const gap = number(style.columnGap), padding = number(style.paddingInlineStart) + number(style.paddingInlineEnd) + number(style.borderInlineStartWidth) + number(style.borderInlineEndWidth);
        return [value => {
          if (!active(value)) return null;
          const widths = children.map(child => child(value)).filter(child => child !== null);
          if (moreAt !== null && value >= Number(moreAt)) widths.push(iconWidth);
          return margin + padding + (style.flexDirection === 'column' ? Math.max(0, ...widths) : widths.reduce((a, b) => a + b, 0) + Math.max(0, widths.length - 1) * gap);
        }];
      }
      return [value => active(value) ? margin + box.width : null];
    };
    const measured = [...element.querySelectorAll(rows)].map(row => {
      const available = row.getBoundingClientRect().width;
      const content = read(row)[0];
      return { content, available };
    });
    let next = min;
    while (next < max && measured.some(row => row.content && row.content(next) > row.available + 1)) next += 1;
    setFit({ key, width, min, max, step: next });
  }, [ref, key, width, max, min, rows, hold, fresh]);
  return Math.max(min, Math.min(step, max));
}
