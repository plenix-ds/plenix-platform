/* Plenix · SelectionSummary, BulkActions
   Summary: What is selected, and what can be done with it. SelectionSummary counts the selection; BulkActions is the bar
     of actions on the selection, always shown: its actions are disabled until something is selected.
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
     SelectionSummary.strings: the words it shows, for other languages: { selected: (n, word) => n + " " + word + " selected",
       none: (word) => "No " + word + " selected" (word is the plural),
       selectAll: (n) => "Select all " + n, clear: "Clear selection" } (word is the noun or plural, chosen by count)
     BulkActions.count: how many are selected; at 0 the bar stays, grayed, with its actions disabled (owner, batch 277:
       "always visible but grayed out until selection happens")
     BulkActions.total: as for SelectionSummary
     BulkActions.noun: as for SelectionSummary
     BulkActions.plural: as for SelectionSummary
     BulkActions.onSelectAll(): as for SelectionSummary
     BulkActions.onClear(): as for SelectionSummary
     BulkActions.actions: the actions, in order: [{ id, label, icon, danger, single, onSelect, items }]
     BulkActions.actions[].danger: a destructive action, drawn as such
     BulkActions.actions[].single: the action applies to one item only, so it is disabled while more than one is selected
     BulkActions.actions[].items: [{ id, label, danger, single, onSelect }]; makes the action a menu button (a group of related actions)
     BulkActions.label: the toolbar's accessible name (default strings.label: "Selection actions")
     BulkActions.className: more classes
     BulkActions.strings: as for SelectionSummary, plus { label: "Selection actions", more: "More", moreLabel: "More actions" }
   Behavior:
     SelectionSummary reads "3 assets selected", announced politely.
     "Select all 120" shows when more can be selected.
     BulkActions shows a SelectionSummary, then the actions.
     With nothing selected the bar is neutral (no selection color), reads "No assets selected", offers Select all, and
       every action (and More) is disabled; selecting enables them.
     Actions that do not fit move into a "More actions" menu; a menu button's items appear there as a group.
*/
const off = (a, count) => !count || !!(a.single && count > 1);
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useOverflow, splitAt } from '../../utils/overflow.js';
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem, MenuGroup } from '../../components/Menu/Menu.jsx';

const STRINGS = {
  selected: (n, word) => n + ' ' + word + ' selected',
  none: (word) => 'No ' + word + ' selected',
  selectAll: (n) => 'Select all ' + n,
  clear: 'Clear selection',
  label: 'Selection actions',
  more: 'More',
  moreLabel: 'More actions',
};

export function SelectionSummary({ count, total, noun = 'item', plural, onSelectAll, onClear, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const words = count ? t.selected(count, count === 1 ? noun : (plural || noun + 's')) : t.none(plural || noun + 's');
  return (
    <div className={cx('plx-selection-summary', className)}>
      <span className="plx-selection-summary__count" aria-live="polite">{words}</span>
      {onSelectAll && total !== undefined && count < total ? <Button size="sm" variant="ghost" onClick={onSelectAll}>{t.selectAll(total)}</Button> : null}
      {onClear && count ? <Button size="sm" variant="ghost" onClick={onClear}>{t.clear}</Button> : null}
    </div>
  );
}

export function BulkActions({ count, total, noun, plural, onSelectAll, onClear, actions = [], label, strings, className }) {
  const t = Object.assign({}, STRINGS, strings);
  const list = React.useRef(null);
  const fit = useOverflow(list, actions.length, actions.map((a) => a.label).join('|') + (count ? '' : '0'));
  const hidden = actions.slice(fit);
  return (
    <div role="toolbar" aria-label={label || t.label} className={cx('plx-bulk-actions', !count && 'plx-bulk-actions--empty', className)}>
      <SelectionSummary count={count} total={total} noun={noun} plural={plural} onSelectAll={onSelectAll} onClear={onClear} strings={strings} />
      <span className="plx-bulk-actions__divider" aria-hidden="true" />
      <div ref={list} className="plx-bulk-actions__list">
        {splitAt(actions.map((a) => (
          <span key={a.id} data-plx-overflow-item="" className="plx-bulk-actions__slot">
            {a.items ? (
              <Menu label={a.label} trigger={<Button size="sm" icon={a.icon} caret disabled={!count}>{a.label}</Button>}>
                {a.items.map((it) => <MenuItem key={it.id} danger={it.danger} disabled={off(it, count)} onSelect={it.onSelect}>{it.label}</MenuItem>)}
              </Menu>
            ) : <Button size="sm" variant={a.danger ? 'danger-secondary' : 'secondary'} icon={a.icon} disabled={off(a, count)} onClick={a.onSelect}>{a.label}</Button>}
          </span>
        )), fit, hidden.length ? (
          <span key="plx-more" data-plx-overflow-more="" className="plx-bulk-actions__slot">
            <Menu label={t.moreLabel} placement="bottom-end" trigger={<Button size="sm" caret disabled={!count}>{t.more}</Button>}>
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
