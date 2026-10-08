/* Plenix · Columns
   Summary: Equal columns side by side (a two- or three-column layout inside a dialog or a page).
   Usage:
     <Columns count={3} divided><Stack>…</Stack><Stack>…</Stack><Stack>…</Stack></Columns>
   Props:
     count: 2 (default) | 3
     divided: a divider between the columns, each column padded (default false; the upload dialog's three steps)
     gap: "none" | "md" (default) | "lg", when not divided
     children: the columns; each child is one column (a Stack)
     className: more classes on the row
   Notes:
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Columns({ count = 2, divided = false, gap = 'md', className, children, ...rest }) {
  return <div className={cx('plx-columns', 'plx-columns--' + count, divided ? 'plx-columns--divided' : 'plx-columns--gap-' + gap, className)} {...rest}>{children}</div>;
}
