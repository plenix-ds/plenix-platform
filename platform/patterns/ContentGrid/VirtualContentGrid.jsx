/* Plenix · VirtualContentGrid
   Summary: ContentGrid's viewport draws only visible card rows and retains the focused row.
   Usage: ContentGrid delegates here when virtual is enabled.
   Props: items/renderItem/getKey or children; size, label, className and height/overscan options.
   Behavior: Measures responsive columns and the tallest mounted card; selection remains in the caller's whole-set model.
   Notes: Runtime dimensions become scoped token-ratio stylesheet rules, never inline styles. Cards should have equal heights.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { useVirtualizer, VirtualGap, VirtualProbe } from '../../hooks/useVirtualizer.js';

export function VirtualContentGrid({ size, label, className, options, items, renderItem, getKey, children }) {
  const cards = React.useMemo(() => items ? null : React.Children.toArray(children), [items, children]);
  const count = items ? items.length : cards.length;
  const v = useVirtualizer({ count, grid: true, overscan: options.overscan });
  const id = useUid('plx-content-grid');
  React.useLayoutEffect(() => {
    const el = v.viewportRef.current;
    if (!el) return undefined;
    const sheet = el.ownerDocument.createElement('style');
    sheet.setAttribute('data-plx-grid-rules', id);
    el.ownerDocument.head.appendChild(sheet);
    let height = 0, frame = 0;
    const measure = () => {
      frame = 0;
      const previous = sheet.textContent, offset = el.scrollTop;
      sheet.textContent = ''; // Measure intrinsic rows before applying their shared minimum.
      const next = Math.ceil(Math.max(0, ...Array.from(el.querySelectorAll(':scope > [data-plx-virtual-index]'), item => item.getBoundingClientRect().height)) / 4) * 4;
      if (!next) { sheet.textContent = previous; el.scrollTop = offset; return; }
      sheet.textContent = '[data-plx-grid-id="' + id + '"]{--plx-state-content-grid-row-height:calc(var(--plx-ref-size-4px) * ' + next / 4 + ');}';
      el.scrollTop = offset;
      if (next !== height) { height = next; el.dispatchEvent(new Event('scroll')); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    const watched = new Set();
    const watch = () => {
      for (const item of watched) if (!el.contains(item)) { observer.unobserve(item); watched.delete(item); }
      for (const item of el.querySelectorAll(':scope > [data-plx-virtual-index]')) if (!watched.has(item)) { watched.add(item); observer.observe(item); }
      schedule();
    };
    const children = new MutationObserver(watch);
    children.observe(el, { childList: true });
    watch();
    return () => { cancelAnimationFrame(frame); children.disconnect(); observer.disconnect(); sheet.remove(); };
  }, [id]);
  return <ul ref={v.viewportRef} data-plx-grid-id={id} data-plx-height={options.height || 'md'} aria-label={label}
    className={cx('plx-content-grid', 'plx-content-grid--' + size, 'plx-content-grid--virtual', className)}>
    <VirtualProbe />
    {v.segments.map(segment => {
      if (segment.gap) return <VirtualGap key={'gap:' + segment.key} count={segment.count} />;
      const i = segment.index, item = items ? items[i] : cards[i];
      const card = items ? renderItem(item, i) : item;
      const key = getKey ? getKey(item, i) : items ? (item.id ?? i) : card.key ?? i;
      return <li key={'item:' + key} className="plx-content-grid__item plx-content-grid__item--virtual" {...v.itemProps(i)}>{React.isValidElement(card)
        ? React.cloneElement(card, { className: cx(card.props.className, 'plx-content-grid__content') }) : card}</li>;
    })}
  </ul>;
}


