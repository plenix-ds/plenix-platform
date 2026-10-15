/* Plenix · CommandBar, CommandBarButton, CommandBarSearch, useCommandBar
   Summary: The bar over a collection (owner, 2026-10-14, the command bar study): one white framed bar, fixed at the top of
     the content while the content scrolls. A page with a few actions has one bar: the actions at the start, the find and
     view side at the end (1A). A page with many actions has an action bar over a separate find bar. A page with no actions
     has a view bar (1F). The selection bar (BulkActions) sits under it, always shown; the bar itself never changes on
     selection.
   Usage:
     <CommandBar label="Assets" count="24 assets"
       actions={[{ id: 'new', label: 'New', icon: 'plus', items: <><MenuItem icon="folder-add">Folder</MenuItem>…</> },
                 { id: 'upload', label: 'Upload', icon: 'upload', onSelect: upload }]}
       find={<><CommandBarSearch value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="Search assets" />
         <FilterPanel fields={fields} value={filter} onChange={setFilter} /></>}
       view={<><SortPanel fields={fields} value={sort} onChange={setSort} /><GroupPanel … /><ViewMenu … /></>}
       selection={<BulkActions count={sel.length} total={rows.length} noun="asset" actions={…} />} />
   Props:
     label: the bar's accessible name (the collection: "Assets")
     actions: the page's commands, in order: [{ id, label, icon, onSelect, items, danger, disabled, why, primary }]
     actions[].items: makes the command a menu: Menu children (MenuItem…) or [{ id, label, icon, danger, disabled, onSelect }]
     actions[].danger: a destructive command: in the danger color, after a divider, the last to fold into More
     actions[].disabled: the command is grayed, never hidden (owner, 2026-10-14)
     actions[].why: the tooltip of a disabled command, saying why
     actions[].primary: the page's one primary command (filled; it keeps its label); default none
     find: the find side, in order: CommandBarSearch first (owner, 2026-10-14), then FilterPanel and the app's quick
       filters (QuickFilter)
     view: the view side: SortPanel, GroupPanel, ColumnsMenu, ViewMenu
     count: the collection's count at the end ("24 assets"; a string or a number is drawn in the data font)
     end: more controls at the very end (Export)
     selection: the selection bar under the bar (BulkActions); it stays fixed with the bar
     layout: "auto" (default: "one" with actions, "view" without) | "one" (1A: one bar) | "split" (many actions: the action
       bar over the find bar) | "view" (1F: a view bar, no actions)
     sticky: the bars stay at the top of the scrolling content while it scrolls (default true)
     narrow: the bar starts at icons only with the search as its icon (a side panel's width); default false (the width
       decides)
     strings: { more: "More actions", actions: "{label} actions", find: "Find and view" }
     className: more classes
     CommandBarButton: a find-and-view button (the trigger of a panel or a menu): { icon, label, count, active, caret }; ghost;
       icon and label, or its icon only while the bar is narrow (give it a Tooltip); active or a count tints it and shows the
       count in a badge; other props reach the Button (ref too)
     CommandBarSearch: the bar's SearchField (width "bar"; collapsed to its icon while the bar is narrow); SearchField's props
     useCommandBar(): { iconOnly, collapsed, step, searchOpen, setSearchOpen } of the bar around a control
   Behavior:
     The button rule, measured (owner, 2026-10-14): every control shows its icon and label while every bar fits on one
       line; then icons only, each with its tooltip; then the search becomes its icon, which opens the field across the bar;
       then the actions fold into "More actions" (⋮) one per step from the end, the danger actions last. More shows only
       when something does not fit. A change of width, labels or counts starts again from icons and labels.
     Sort, Filter, Group, View and Columns are never merged: each keeps its own button at every width.
     Commands are never hidden by state: they are disabled, with a tooltip saying why.
     Every button is ghost (no outline). The bar is white and framed (3A), never tinted while rows are selected.
     Each bar is a Toolbar: one Tab stop, the arrow keys move between its controls.
   Notes:
     The count and the end controls sit at the end of the find bar. Pages with neither actions nor find and view have no
     bar: the plain table. */
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useBarFit } from '../../utils/barFit.js';
import { Button } from '../../components/Button/Button.jsx';
import { Badge } from '../../components/Badge/Badge.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { Toolbar } from '../../components/Toolbar/Toolbar.jsx';
import { SearchField } from '../../components/SearchField/SearchField.jsx';
import { BarActions, foldOrder } from './BarActions.jsx';

const STRINGS = { more: 'More actions', actions: '{label} actions', find: 'Find and view' };
// the steps of the button rule: 0 icon and label; 1 icons only; 2 the search as its icon; then one more action per step
// into More
const ICONS = 1, SEARCH = 2;

const BarContext = React.createContext({ iconOnly: false, collapsed: false, step: 0, searchOpen: false, setSearchOpen: () => {} });
export const useCommandBar = () => React.useContext(BarContext);

export const CommandBarButton = React.forwardRef(function CommandBarButton({ icon, label, count = 0, active = false, caret = false, iconOnly, className, children, ...rest }, ref) {
  const ctx = useCommandBar();
  const only = iconOnly === undefined ? ctx.iconOnly : iconOnly;
  const n = Number(count) || 0;
  const badge = n ? <Badge size="sm" tone="info">{n}</Badge> : null;
  const name = n ? label + ', ' + n : label;
  // icons only: no caret (the tooltip names it); with a count: the icon and the count, named "Filter, 2"
  return (
    <Button ref={ref} size="sm" variant="ghost" icon={icon} caret={caret && !only} selected={active || n > 0} iconOnly={only && !n} label={only ? name : undefined}
      className={cx('plx-command-bar__button', className)} {...rest}>
      {only ? (n ? badge : label) : <>{children || label}{badge ? <>{' '}{badge}</> : null}</>}
    </Button>
  );
});

export const CommandBarSearch = React.forwardRef(function CommandBarSearch(props, ref) {
  const { collapsed, searchOpen, setSearchOpen } = useCommandBar();
  return <SearchField ref={ref} width="bar" collapsed={collapsed} open={collapsed ? searchOpen : undefined} onOpenChange={collapsed ? setSearchOpen : undefined} {...props} />;
});

export function CommandBar({ label, actions = [], find, view, count, end, selection, layout = 'auto', sticky = true, narrow = false, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const root = React.useRef(null);
  const shape = layout === 'auto' ? (actions.length ? 'one' : 'view') : layout;
  const folds = foldOrder(actions).length;
  // the bar's search, opened across the bar: the bar holds its step while it is open
  const [searchOpen, setSearchOpen] = React.useState(false);
  const key = [shape, narrow, actions.map((a) => a.label + (a.disabled ? '0' : '')).join('|')].join('§');
  const step = useBarFit(root, key, SEARCH + folds, narrow ? SEARCH : 0, ':scope > .plx-command-bar__bar > [data-plx-bar-row]', searchOpen);
  const ctx = React.useMemo(() => ({ iconOnly: step >= ICONS, collapsed: step >= SEARCH, step, searchOpen: searchOpen && step >= SEARCH, setSearchOpen }), [step, searchOpen]);
  const fold = Math.max(0, step - SEARCH);
  const acts = shape !== 'view' && actions.length ? (
    <Toolbar.Group className="plx-command-bar__actions">
      <BarActions actions={actions} iconOnly={ctx.iconOnly} fold={fold} moreLabel={t.more} dangerClass="plx-command-bar__danger" />
    </Toolbar.Group>
  ) : null;
  const findEl = find ? <Toolbar.Group className="plx-command-bar__find">{find}</Toolbar.Group> : null;
  const viewEl = view ? <Toolbar.Group className="plx-command-bar__view">{view}</Toolbar.Group> : null;
  const countEl = count === undefined || count === null || ctx.collapsed ? null
    : typeof count === 'string' || typeof count === 'number' ? <Text variant="data" className="plx-command-bar__count">{count}</Text> : count;
  const tail = countEl || end ? <Toolbar.Group className="plx-command-bar__end">{countEl}{end}</Toolbar.Group> : null;
  const bar = (name, parts, k) => (
    <div key={k} className="plx-command-bar__bar">
      <Toolbar label={name} className="plx-command-bar__row" data-plx-bar-row="">{parts}</Toolbar>
    </div>
  );
  let bars;
  if (shape === 'split') {
    bars = [acts ? bar(t.actions.replace('{label}', label || ''), acts, 'a') : null,
      findEl || viewEl || tail ? bar(t.find, <>{findEl}<Toolbar.Spacer />{viewEl}{tail}</>, 'f') : null];
  } else if (shape === 'view') {
    bars = bar(label, <>{findEl}{viewEl}<Toolbar.Spacer />{tail}</>, 'v');
  } else {
    bars = bar(label, <>{acts}<Toolbar.Spacer />{findEl}{viewEl}{tail}</>, 'o');
  }
  return (
    <BarContext.Provider value={ctx}>
      <div ref={root} className={cx('plx-command-bar', ctx.iconOnly && 'plx-command-bar--icons', className)} data-plx-layout={shape} data-plx-position={sticky ? undefined : 'static'}>
        {bars}
        {selection}
      </div>
    </BarContext.Provider>
  );
}
