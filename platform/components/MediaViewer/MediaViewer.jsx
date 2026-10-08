/* Plenix · MediaViewer
   Summary: A full-screen preview of images, one at a time (the lightbox).
   Usage:
     <MediaViewer open={open} onClose={close} items={[{ src, alt, title, meta: ['JPG', '2.4 MB'] }]}
       index={at} onIndexChange={(next) => …} actions={<…/>} />
   Props:
     open: whether the viewer is shown
     onClose(): runs from the close button and Escape
     items: the images: [{ src, alt, title, meta }]
     items[].meta: an array of short technical values shown under the title
     index: the shown item, when controlled
     defaultIndex: the first shown item, when uncontrolled (default 0)
     onIndexChange(next): runs with the new index when the item changes
     label: the accessible name of the viewer (default "Preview")
     actions: extra controls under the image (give them the class plx-media-viewer__control)
     className: more classes on the viewer
   Behavior:
     Arrow Left / Right go to the previous / next item; with more than one item there are also Previous and Next buttons.
     Going past the last item wraps to the first, and back.
     Escape closes.
     Focus stays inside and returns to the opener.
     A counter ("2 of 5") describes the viewer.
     With no items nothing renders.
   Notes:
     The viewer renders in a portal on document.body.
*/
import React from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { useLayer, useUid } from '../../utils/layer.js';
import { Icon } from '../Icon/Icon.jsx';

export function MediaViewer({ open, onClose, items, index, defaultIndex = 0, onIndexChange, label = 'Preview', actions, className }) {
  const ref = React.useRef(null);
  const id = useUid('plx-mv');
  const [own, setOwn] = React.useState(defaultIndex);
  const at = index !== undefined ? index : own;
  useLayer(ref, open, { modal: true, onEscape: onClose });
  if (!open || !items.length) return null;
  const go = (n) => { const next = (n + items.length) % items.length; if (index === undefined) setOwn(next); if (onIndexChange) onIndexChange(next); };
  const item = items[at] || items[0];
  const many = items.length > 1;
  const onKeyDown = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1); }
  };
  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label={label} aria-describedby={id + 'c'} tabIndex={-1}
      className={cx('plx-media-viewer', className)} onKeyDown={onKeyDown}>
      <div id={id + 'c'} className="plx-media-viewer__counter">{(at + 1) + ' of ' + items.length}</div>
      <button type="button" className="plx-media-viewer__control plx-media-viewer__close" aria-label="Close preview" onClick={onClose}><Icon name="close" size="md" /></button>
      {many ? <button type="button" className="plx-media-viewer__control plx-media-viewer__nav plx-media-viewer__nav--previous" aria-label="Previous" onClick={() => go(at - 1)}><Icon name="chevron-down" size="md" /></button> : null}
      <figure className="plx-media-viewer__figure">
        <div className="plx-media-viewer__stage"><img src={item.src} alt={item.alt || ''} className="plx-media-viewer__image" /></div>
        {item.title || item.meta ? (
          <figcaption className="plx-media-viewer__info">
            {item.title ? <div className="plx-media-viewer__title">{item.title}</div> : null}
            {item.meta ? <div className="plx-media-viewer__meta">{item.meta.map((m, i) => <span key={i}>{m}</span>)}</div> : null}
          </figcaption>
        ) : null}
        {actions ? <div className="plx-media-viewer__actions">{actions}</div> : null}
      </figure>
      {many ? <button type="button" className="plx-media-viewer__control plx-media-viewer__nav plx-media-viewer__nav--next" aria-label="Next" onClick={() => go(at + 1)}><Icon name="chevron-down" size="md" /></button> : null}
    </div>,
    document.body,
  );
}
