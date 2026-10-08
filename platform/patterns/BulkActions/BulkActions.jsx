/* Plenix · SelectionSummary, BulkActions
   Summary: What is selected, and what can be done with it. SelectionSummary counts the selection; BulkActions is the bar
     shown while something is selected.
   Usage:
     <SelectionSummary count={3} total={120} noun="asset" plural="assets" onSelectAll={() => …} onClear={() => …} />
     <BulkActions count={3} total={120} noun="asset" onSelectAll={() => …} onClear={() => …}
       actions={[{ id: 'download', label: 'Download', icon: 'download', onSelect: () => … }]} />
   Props:
     SelectionSummary.count: how many are selected
     SelectionSummary.total: how many can be selected
     SelectionSummary.noun: the word for one item (default "item")
     SelectionSummary.plural: the word for several (default: noun + "s")
     SelectionSummary.onSelectAll(): runs from "Select all <total>"; without it (or without total) there is no Select all
     SelectionSummary.onClear(): runs from "Clear selection"; without it there is no Clear selection
     SelectionSummary.className: more classes
     BulkActions.count: how many are selected; nothing renders at 0
     BulkActions.total: as for SelectionSummary
     BulkActions.noun: as for SelectionSummary
     BulkActions.plural: as for SelectionSummary
     BulkActions.onSelectAll(): as for SelectionSummary
     BulkActions.onClear(): as for SelectionSummary
     BulkActions.actions: the actions, in order: [{ id, label, icon, danger, single, onSelect, items }]
     BulkActions.actions[].danger: a destructive action, drawn as such
     BulkActions.actions[].single: the action applies to one item only, so it is disabled while more than one is selected
     BulkActions.actions[].items: [{ id, label, danger, single, onSelect }]; makes the action a menu button (a group of related actions)
     BulkActions.label: the toolbar's accessible name (default "Selection actions")
     BulkActions.className: more classes
   Behavior:
     SelectionSummary reads "3 assets selected", announced politely.
     "Select all 120" shows when more can be selected.
     BulkActions shows a SelectionSummary, then the actions.
     Actions that do not fit move into a "More actions" menu; a menu button's items appear there as a group.
*/
const off = (a, count) => !!(a.single && count > 1);
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useOverflow, splitAt } from '../../utils/overflow.js';
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem, MenuGroup } from '../../components/Menu/Menu.jsx';

export function SelectionSummary({ count, total, noun = 'item', plural, onSelectAll, onClear, className }) {
  const words = count + ' ' + (count === 1 ? noun : (plural || noun + 's')) + ' selected';
  return (
    <div className={cx('plx-selection-summary', className)}>
      <span className="plx-selection-summary__count" aria-live="polite">{words}</span>
      {onSelectAll && total !== undefined && count < total ? <Button size="sm" variant="link" onClick={onSelectAll}>{'Select all ' + total}</Button> : null}
      {onClear ? <Button size="sm" variant="ghost" onClick={onClear}>Clear selection</Button> : null}
    </div>
  );
}

export function BulkActions({ count, total, noun, plural, onSelectAll, onClear, actions = [], label = 'Selection actions', className }) {
  const list = React.useRef(null);
  const fit = useOverflow(list, actions.length, actions.map((a) => a.label).join('|') + (count ? '' : '0'));
  if (!count) return null;
  const hidden = actions.slice(fit);
  return (
    <div role="toolbar" aria-label={label} className={cx('plx-bulk-actions', className)}>
      <SelectionSummary count={count} total={total} noun={noun} plural={plural} onSelectAll={onSelectAll} onClear={onClear} />
      <span className="plx-bulk-actions__divider" aria-hidden="true" />
      <div ref={list} className="plx-bulk-actions__list">
        {splitAt(actions.map((a) => (
          <span key={a.id} data-plx-overflow-item="" className="plx-bulk-actions__slot">
            {a.items ? (
              <Menu label={a.label} trigger={<Button size="sm" icon={a.icon} caret>{a.label}</Button>}>
                {a.items.map((it) => <MenuItem key={it.id} danger={it.danger} disabled={off(it, count)} onSelect={it.onSelect}>{it.label}</MenuItem>)}
              </Menu>
            ) : <Button size="sm" variant={a.danger ? 'danger-secondary' : 'secondary'} icon={a.icon} disabled={off(a, count)} onClick={a.onSelect}>{a.label}</Button>}
          </span>
        )), fit, hidden.length ? (
          <span key="plx-more" data-plx-overflow-more="" className="plx-bulk-actions__slot">
            <Menu label="More actions" placement="bottom-end" trigger={<Button size="sm" caret>More</Button>}>
              {hidden.map((a) => (a.items
                ? <MenuGroup key={a.id} label={a.label}>{a.items.map((it) => <MenuItem key={it.id} danger={it.danger} disabled={off(it, count)} onSelect={it.onSelect}>{it.label}</MenuItem>)}</MenuGroup>
                : <MenuItem key={a.id} icon={a.icon} danger={a.danger} disabled={off(a, count)} onSelect={a.onSelect}>{a.label}</MenuItem>))}
            </Menu>
          </span>
        ) : null)}
      </div>
    </div>
  );
}
