/* Plenix · DataGrid engine · row template
   Summary: Which column fills which slot of a row template (issue 839, owner 2026-11-01: A, B and wide as options). The six slots are
     title, subtitle, date, primary, secondary and tertiary. The app maps columns to slots with `template`; slots it leaves out are
     filled from the column order by one fixed rule. The result tells the grid how to draw a record as a card (layout A or B, in the
     narrow view) or as one aligned row (layout wide, at any width).
   Usage:
     import { useRowTemplate } from './engine/rowTemplate.js';
     const resolved = useRowTemplate(props);   // the grid's props, with columns, narrow and rowTemplate set for a layout; the props as given when no layout or template is set
     resolveRowTemplate({ columns, layout, template })   // { layout, slots, slotOf, keep } or null
   Props:
     layout: "A" | "B" | "wide". A and B are for the narrow view: the grid is a table while its visible columns fit its width, else every
       record is a card of three rows (the #679 switch is unchanged). "wide" draws the same slots as one aligned row, with a divider between
       columns, at any width. Default "A" when only `template` is set. Neither prop set: the grid is exactly as before.
     template: { title, subtitle, date, primary, secondary, tertiary }, each the `field` of a column; every slot is optional.
   Behavior:
     Slots the app does not name are filled in this fixed order from the columns that can be shown (not a row handle, icon or actions column),
       in the order of the `columns` prop (never the person's view order), skipping columns the app already named:
       1. date: the first column of type date or datetime; primary: the first column of type number, currency or percent;
       2. title, subtitle, primary, secondary, tertiary, date: each still empty slot takes the next remaining column, in that order.
     A column that fills no slot is not drawn in a card (less to scan); the record's other fields show when the row is opened. In wide,
       the columns are the slots, in the order title, subtitle, date, primary, secondary, tertiary (the row handle and icon columns first,
       the actions last).
     A template field that is not a column, or named twice, is ignored (the first slot that names it keeps it).
   Notes:
     The slot of a cell is its class (plx-data-grid__cell--slot-<name>); every other behavior (selection, the open row, the keyboard, the row
     menu, editing) is the grid's own, because a card is the same row with its cells placed in a grid.
*/
import React from 'react';
import { kinds } from './helpers.jsx';

export const SLOTS = ['title', 'subtitle', 'date', 'primary', 'secondary', 'tertiary'];
const FILL = ['title', 'subtitle', 'primary', 'secondary', 'tertiary', 'date'];
const LAYOUTS = { A: 'A', B: 'B', WIDE: 'wide' };
const DATES = ['date', 'datetime'], NUMBERS = ['number', 'currency', 'percent'];
const showable = (c) => !c.rowHandle && !kinds(c).some((k) => k === 'icon' || k === 'actions');
const typed = (c) => c.type || (c.sorter === 'number' ? 'number' : c.sorter === 'date' ? 'date' : 'text');

export function resolveRowTemplate({ columns, layout, template }) {
  if (layout === undefined && !template) return null;
  const kind = LAYOUTS[String(layout === undefined ? 'A' : layout).toUpperCase()];
  if (!kind) return null;
  const list = columns.filter(showable), known = new Set(list.map((c) => c.field));
  const slots = {}, used = new Set();
  for (const slot of SLOTS) {
    const field = template && template[slot];
    if (field !== undefined && known.has(field) && !used.has(field)) { slots[slot] = field; used.add(field); }
  }
  const take = (slot, test) => {
    if (slots[slot] !== undefined) return;
    const column = list.find((c) => !used.has(c.field) && test(c));
    if (column) { slots[slot] = column.field; used.add(column.field); }
  };
  take('date', (c) => DATES.includes(typed(c)));
  take('primary', (c) => NUMBERS.includes(typed(c)));
  for (const slot of FILL) take(slot, () => true);
  const slotOf = {};
  for (const slot of SLOTS) if (slots[slot] !== undefined) slotOf[slots[slot]] = slot;
  const keep = new Set(columns.filter((c) => !showable(c) || slotOf[c.field]).map((c) => c.field));
  return { layout: kind, slots, slotOf, keep };
}

// wide: the slots as columns in slot order, the handle and icon columns first, the actions last
const wideColumns = (columns, resolved) => {
  const first = columns.filter((c) => !showable(c) && !kinds(c).includes('actions')),
    last = columns.filter((c) => kinds(c).includes('actions')),
    byField = new Map(columns.map((c) => [c.field, c]));
  return first.concat(SLOTS.filter((s) => resolved.slots[s] !== undefined).map((s) => byField.get(resolved.slots[s])), last);
};

export function useRowTemplate(props) {
  const { columns, layout, template, narrow } = props;
  const signal = JSON.stringify(template || null);
  return React.useMemo(() => {
    const resolved = resolveRowTemplate({ columns, layout, template });
    if (!resolved) return props;
    return Object.assign({}, props, { rowTemplate: resolved }, resolved.layout === 'wide' ? { columns: wideColumns(columns, resolved), narrow: 'table' } : null);
  }, [props, columns, layout, signal, narrow]);   // eslint-disable-line react-hooks/exhaustive-deps
}
