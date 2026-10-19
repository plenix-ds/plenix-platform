/* Plenix · SplitView, ReadingPane
   Summary: Two panels that share their room (02 Page structures › Workspace structures › Split workspace): a list or
     table and the item chosen in it, side by side or stacked, both the full height (or width) of their room, each
     scrolling on its own, with a divider between them to resize (owner, 2026-10-16: the Outlook-style layout).
     ReadingPane is the second panel's surface: the table's frame, an actions row with a thin line under it that stops
     short of the edges, and the item below.
   Usage:
     <AppShell page="master-detail" …>
       <SplitView label="Inbox" orientation="side-by-side" firstLabel="Message list" defaultSize={560}
         first={<DataTable label="Inbox" … />}
         second={<ReadingPane label={item.subject} actions={<Toolbar …/>}>…</ReadingPane>} />
     </AppShell>
     <SplitView orientation="stacked" defaultSize={320} first={…} second={…} />
   Props:
     orientation: "side-by-side" (default; the first panel at the start, the divider between, the second fills the rest)
       | "stacked" (the first on top; both the full width)
     first, second: the two panels' content (the first is usually a DataTable, which brings its own frame; the second a
       ReadingPane)
     label: the split view's accessible name (a group); firstLabel: what the divider resizes ("Message list"; default
       "First panel"), its name is "{firstLabel} width" or "… height"
     defaultSize: the first panel's starting width (side by side) or height (stacked), a size token in pixels; size /
       onSizeChange(px): the parent keeps it (keep it in the view to remember it per person)
     minSize, maxSize: its limits in pixels (defaults: 360–720 side by side, 200–500 stacked)
     steps: the only sizes allowed, smallest first (size tokens); the divider snaps to them on release
     className: more classes on the split view
     ReadingPane.label: its region's name (the item's title); actions: the actions row (a Toolbar); empty: what shows
       when nothing is chosen (an EmptyState); children: the item; className
   Behavior:
     Each panel scrolls on its own; the page never scrolls as a whole (the multi-pane page kind). The divider is the whole
       gap between the panels: the resize pointer anywhere along it, a thin line down its middle and a small pill
       centered on the line; the pill darkens on hover, line and pill take the focus color while focused or dragged.
     Keyboard: the divider is a separator in the Tab order; the arrow keys step to the next size, Home and End to the
       limits. There is no size menu (owner, 2026-10-16).
     Stacked when there is no room side by side: under 900px of the split view's own width the panels stack (container
       query), whatever the orientation.
   Notes:
     Built on Resizable (the first panel); the divider's look is SplitView's (split-view.css). Colors, sizes and spacing
     are --plx-comp-split-view-* and --plx-comp-reading-pane-* tokens on existing roles; the reading pane's frame is the
     data table's (data-table-border, shape-md, border-width-thin).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Resizable } from '../../components/Resizable/Resizable.jsx';

const LIMITS = { 'side-by-side': [360, 720, 560], stacked: [200, 500, 320] };

export function SplitView({ orientation = 'side-by-side', first, second, label, firstLabel = 'First panel', defaultSize, size, onSizeChange,
  minSize, maxSize, steps, className, ...rest }) {
  const side = orientation !== 'stacked';
  const [lo, hi, start] = LIMITS[side ? 'side-by-side' : 'stacked'];
  const box = side
    ? { axis: 'horizontal', defaultWidth: defaultSize != null ? defaultSize : start, width: size, minWidth: minSize || lo, maxWidth: maxSize || hi, onResize: onSizeChange ? (s) => onSizeChange(s.width) : undefined }
    : { axis: 'vertical', defaultHeight: defaultSize != null ? defaultSize : start, height: size, minHeight: minSize || lo, maxHeight: maxSize || hi, onResize: onSizeChange ? (s) => onSizeChange(s.height) : undefined };
  return (
    <div role="group" aria-label={label} className={cx('plx-split-view', 'plx-split-view--' + (side ? 'side-by-side' : 'stacked'), className)} {...rest}>
      <div className="plx-split-view__panels">
        <Resizable label={firstLabel} steps={steps} variant="divider" fill className="plx-split-view__first" {...box}>{first}</Resizable>
        <div className="plx-split-view__second">{second}</div>
      </div>
    </div>
  );
}

export function ReadingPane({ label, actions, empty, className, children }) {
  return (
    <section aria-label={label} className={cx('plx-reading-pane', className)}>
      {actions ? <div className="plx-reading-pane__actions">{actions}</div> : null}
      <div className="plx-reading-pane__body">{children || (empty ? <div className="plx-reading-pane__empty">{empty}</div> : null)}</div>
    </section>
  );
}
