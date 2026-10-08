/* Plenix · DropZone
   Summary: Where files are dropped (an upload area): a dashed region on the sunken surface.
   Usage:
     <DropZone as="button" active={dragging} onClick={openPicker} onDragOver={…} onDrop={…}>Drop files or click to choose</DropZone>
   Props:
     as: "div" (default) | "button" (opens the file picker on click)
     active: shows the highlight while files are dragged over it (default false)
     overlay: covers its positioned parent while files are dragged over a page (the asset browser), and lets the drop
       reach the page (default false)
     children: the zone's content
     className: more classes on the zone
   Behavior:
     The zone is highlighted while active.
   Notes:
     The page handles the drag and drop events; other props (onDragOver, onDrop, onClick, …) pass through to the element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function DropZone({ as: As = 'div', active = false, overlay = false, className, children, ...rest }) {
  return <As type={As === 'button' ? 'button' : undefined} className={cx('plx-drop-zone', active && 'is-active', overlay && 'plx-drop-zone--overlay', className)} {...rest}>{children}</As>;
}
