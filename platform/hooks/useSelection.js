/* Plenix · useSelection
   Summary: The selection of a collection (a list, a grid of tiles, a table's rows) as one model: single selection (one
     item, choosing another replaces it) or multiple selection (toggle items, extend a range from the anchor, select all),
     with the counts a select-all checkbox and a selection summary need.
   Usage:
     const sel = useSelection({ items: files.map((f) => f.id), mode: 'multiple' });
     <Checkbox label="Select all" checked={sel.allSelected} indeterminate={sel.someSelected} onChange={sel.toggleAll} />
     {files.map((f) => <Checkbox key={f.id} label={f.name} checked={sel.isSelected(f.id)} onChange={() => sel.toggle(f.id)} />)}
     <RowButton selected={sel.isSelected(id)} onClick={(e) => sel.choose(id, e)}>…</RowButton>     // click, Shift, Ctrl or ⌘
   Props:
     options.items ([]): the keys of the items, in their order (the order a range follows)
     options.mode ("multiple"): "single" | "multiple"
     options.selected: the selected keys (controlled); with onChange
     options.defaultSelected ([]): the keys selected at first (uncontrolled)
     options.onChange(keys): the selection changes; keys in the items' order
     options.disallowEmpty (false): single mode: choosing the selected item again keeps it (a radio group's rule)
     options.behavior ("toggle"): multiple mode, what a plain choose(key) does: "toggle" adds or removes the item (a list
       with checkboxes); "replace" selects only it, as a file manager does (Ctrl or ⌘ toggles, Shift extends)
     options.disabledKeys ([]): keys that cannot be selected (select all skips them)
     returns { selected (keys, in order), count, isSelected(key), select(key), deselect(key), toggle(key), extendTo(key),
       choose(key, event), selectAll(), clear(), toggleAll(), setSelected(keys), allSelected, someSelected, anchor }
   Behavior:
     single: select, toggle and choose make the item the only one; toggle on the selected item clears it unless
       disallowEmpty. selectAll and extendTo do nothing.
     multiple: toggle adds or removes; extendTo selects every item from the anchor (the item chosen last without Shift)
       to the key, keeping what was selected before the anchor's range; choose reads the event: Shift extends, Ctrl or ⌘
       toggles, a plain choose follows behavior.
     allSelected is true when every selectable item is selected; someSelected when some but not all are (the mixed state
       of a select-all checkbox). Keys that leave items stay selected until the selection changes; then they are dropped.
   Notes:
     It holds the model, not the look or the keys: show selection with the selected treatment and a check (never color
       alone), expose it with aria-selected (options, rows, tiles) or aria-checked (checkboxes), and move focus with
       useFocusGroup. Space toggles the focused item; Shift with an arrow extends: call toggle and extendTo from the keys.
     Announce bulk changes ("12 selected") with announce() from the live region utility.
*/
import React from 'react';

const ordered = (items, set) => items.filter((k) => set.has(k));

export function useSelection(options = {}) {
  const { items = [], mode = 'multiple', selected: controlled, defaultSelected = [], onChange, disallowEmpty = false,
    behavior = 'toggle', disabledKeys = [] } = options;
  const [own, setOwn] = React.useState(() => new Set(defaultSelected));
  const anchor = React.useRef(null);
  const current = controlled ? new Set(controlled) : own;
  const blocked = new Set(disabledKeys);
  const selectable = items.filter((k) => !blocked.has(k));

  const commit = (next) => {
    const keys = ordered(items, next);
    if (!controlled) setOwn(new Set(keys));
    if (onChange) onChange(keys);
  };
  const single = mode === 'single';
  const isSelected = (key) => current.has(key);
  const select = (key) => {
    if (blocked.has(key)) return;
    anchor.current = key;
    if (single) { if (!(current.size === 1 && current.has(key))) commit(new Set([key])); return; }
    if (!current.has(key)) commit(new Set(current).add(key));
  };
  const deselect = (key) => {
    if (!current.has(key) || (single && disallowEmpty)) return;
    const next = new Set(current); next.delete(key); commit(next);
  };
  const toggle = (key) => {
    if (blocked.has(key)) return;
    if (current.has(key)) { anchor.current = key; deselect(key); } else select(key);
  };
  const extendTo = (key) => {
    if (single || blocked.has(key)) return;
    const from = anchor.current != null && items.indexOf(anchor.current) >= 0 ? items.indexOf(anchor.current) : items.indexOf(key);
    const to = items.indexOf(key);
    if (to < 0) return;
    const next = new Set(current);
    items.slice(Math.min(from, to), Math.max(from, to) + 1).forEach((k) => { if (!blocked.has(k)) next.add(k); });
    commit(next);
  };
  const choose = (key, e) => {
    if (single) { if (current.has(key) && !disallowEmpty && e && (e.ctrlKey || e.metaKey)) deselect(key); else select(key); return; }
    if (e && e.shiftKey) { extendTo(key); return; }
    if ((e && (e.ctrlKey || e.metaKey)) || behavior === 'toggle') { toggle(key); return; }
    anchor.current = key;
    if (!(current.size === 1 && current.has(key))) commit(new Set([key]));
  };
  const selectAll = () => { if (!single) commit(new Set(selectable)); };
  const clear = () => { if (current.size && !(single && disallowEmpty)) commit(new Set()); };
  const count = ordered(items, current).length;
  const allSelected = selectable.length > 0 && selectable.every((k) => current.has(k));
  const someSelected = count > 0 && !allSelected;
  const toggleAll = () => { if (allSelected) clear(); else selectAll(); };
  const setSelected = (keys) => commit(new Set(single ? [].concat(keys).slice(0, 1) : keys));
  return { selected: ordered(items, current), count, isSelected, select, deselect, toggle, extendTo, choose, selectAll, clear,
    toggleAll, setSelected, allSelected, someSelected, anchor: anchor.current };
}
