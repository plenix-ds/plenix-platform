/* Plenix · RowButton
   Summary: A whole row or tile that is one button, holding any layout (an avatar, two lines of text, a time).
   Usage:
     <RowButton selected onClick={open}>…</RowButton>
   Props:
     selected: marks the row whose details are shown (aria-current="true"); default false
     current: an aria-current value instead, e.g. "date" for today in a calendar
     pressed: makes it a toggle (aria-pressed)
     expanded: a row that opens a panel below it (aria-expanded)
     hover: false: no hover fill (for tiles that draw their own surface); default true
     className: more classes on the button
     style: lays out the content
     children: the content, in any layout
     ...rest: other attributes go on the button (onClick)
   Behavior:
     It is a native button with no look of its own beyond the states: a hover fill, a selected fill and the focus ring.
     A pressed button shows the selected fill too.
   Notes:
     Use it when a Button's single centered label cannot hold the content: list rows that open a record, calendar day cells, compact project tiles.
     Lay out the content with the style prop or children; the button is a block that fills its column and aligns to the start.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export const RowButton = React.forwardRef(function RowButton({ selected = false, current, pressed, expanded, hover = true,
  className, children, ...rest }, ref) {
  return (
    <button ref={ref} type="button"
      aria-current={current || (selected ? 'true' : undefined)} aria-pressed={pressed} aria-expanded={expanded} {...rest}
      className={cx('plx-row-button', hover && 'plx-row-button--hover', (selected || pressed) && 'is-selected', className)}>
      {children}
    </button>
  );
});
