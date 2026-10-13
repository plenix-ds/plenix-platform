/* Plenix · Columns
   Summary: Equal columns side by side (a two- or three-column layout inside a dialog or a page), or a sidebar beside the
     main column; they collapse into one column below a window class.
   Usage:
     <Columns count={3} divided><Stack>…</Stack><Stack>…</Stack><Stack>…</Stack></Columns>
     <Columns ratio="sidebar-start" collapseBelow="wide"><Stack>Filters</Stack><Stack>Results</Stack></Columns>
   Props:
     count: 2 (default) | 3
     divided: a divider between the columns, each column padded (default false; the upload dialog's three steps)
     gap: "none" | "md" (default) | "lg", when not divided
     ratio: "equal" (default) | "sidebar-start" (a narrow first column, one third) | "sidebar-end" (a narrow last
       column); two columns only
     collapseBelow: none (default: always side by side) | "medium" (one column in a Narrow window, under 600px) | "wide"
       (one column in a Narrow or Medium window, under 840px)
     children: the columns; each child is one column (a Stack)
     className: more classes on the row
   Behavior:
     The window class is the main region's width (Platforms Standard 3.3), read by a container query on the shell's
       main region (.plx-shell-main), so a page with an inspector open collapses sooner than the window would say.
     Collapsed, the columns stack in their markup order with the layout gap between them; divided columns trade their
       vertical lines for a line above each column after the first.
     The reading and focus order are the markup order at every width.
   Notes:
     Outside the shell's main region nothing collapses (there is no window class to read).
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Columns({ count = 2, divided = false, gap = 'md', ratio = 'equal', collapseBelow, className, children, ...rest }) {
  return (
    <div className={cx('plx-columns', 'plx-columns--' + count, divided ? 'plx-columns--divided' : 'plx-columns--gap-' + gap,
      count === 2 && ratio !== 'equal' ? 'plx-columns--' + ratio : null, collapseBelow ? 'plx-columns--collapse-below-' + collapseBelow : null, className)} {...rest}>
      {children}
    </div>
  );
}
