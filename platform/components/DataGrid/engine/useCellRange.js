/* Plenix · DataGrid engine · cell range selection
   Summary: The block of cells a person selects with Shift and the arrow keys (issue 465, owner, 2026-11-01: an option, off by default):
     the range itself (an anchor cell and the cell that has focus, each a row and a column), the rectangle it covers in the order the
     grid shows rows and columns, what Ctrl or Command with C copies (the block as tab-separated text that Excel and Google Sheets paste as
     rows and columns), and what a screen reader hears (how many cells are selected, how many were copied).
   Usage:
     import { useCellRange } from './engine/useCellRange.js';
     const cellRange = useCellRange({ enabled: !!props.cellSelection && !isStatic, model, ordered, index, onChange: props.onCellSelectionChange });
     cellRange.rect                      // { r0, r1, c0, c1 } in model and column order, or null (no range, or one cell)
     cellRange.cellClasses(rowIndex, columnIndex)   // { inside, top, bottom, start, end } for one cell
     cellRange.extend({ row, c, key, rtl, focusCell })   // Shift + an arrow, Home or End on a cell
     cellRange.collapse(); cellRange.copy(); cellRange.read()
   Props:
     enabled: the grid's cellSelection option; false makes every method do nothing and the grid behave as it did before.
     model: the rows the grid shows (group rows included; they have no record and no cells); ordered: the visible columns, in order;
     index: the records' key field; onChange(details): the grid's onCellSelectionChange ({ from, to, cellCount, rowCount, columnCount, fields }, or null when the block ends).
   Behavior:
     The range is kept as keys (a row's id and a column's id), so it survives scrolling and virtualization; the copy reads the grid's data, not
     the page, so a block of any size copies at once. One cell is not a range: with the anchor and the focus on the same cell there is no
     rectangle. Shift with an arrow moves the focus end one cell (the focus cell scrolls into view and keeps keyboard focus); Shift with Home
     or End goes to the first or last column of the row; when focus is on a cell the block never reached (moved there by script), Shift
     with an arrow starts a new block from that cell; Escape, a plain arrow or a mouse press on a cell collapses the block to the active cell. In right to
     left the arrows are mirrored, and so are the block's start and end edges (they are logical).
     The count is announced politely once the arrow keys pause (400 ms), never once per key press while Shift and an arrow repeat.
   Notes:
     Moved to its own file with the other concerns of the engine (issue 714); the rule that nothing changes for a grid without the option is
     proved by the engine's differential probe, run with the option off.
*/
import React from 'react';
import { announce } from '../../../utils/announce.tsx';
import { formatNumber } from '../../../utils/format.ts';
import { useLocale } from '../../../providers/LocaleProvider.tsx';
import { valueAt } from '../state.js';
import { valueText } from '../cells.jsx';

// a spreadsheet's text: cells by tab, rows by line break; a cell with a tab, a line break or a quote is quoted, its quotes doubled
const quoted = (text) => (/[\t\n\r"]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text);

export function useCellRange({ enabled, model, ordered, index, onChange }) {
  const loc = useLocale();
  const [range, setRange] = React.useState(null);
  const told = React.useRef(false);   // onChange has been given a range: it is told when the range ends too
  const latest = React.useRef({});
  const trail = React.useRef(null);   // the cells the block's focus end has been on ('rowId|field'), anchor included

  // the position of each record row in the model (group rows have no cells)
  const rowAt = React.useMemo(() => {
    const at = new Map();
    if (enabled) model.forEach((row, i) => { if (row.original) at.set(row.id, i); });
    return at;
  }, [enabled, model]);
  const rect = React.useMemo(() => {
    if (!enabled || !range) return null;
    const a = rowAt.get(range.anchor.key), f = rowAt.get(range.focus.key);
    const ca = ordered.findIndex((c) => c.id === range.anchor.field), cf = ordered.findIndex((c) => c.id === range.focus.field);
    if (a === undefined || f === undefined || ca < 0 || cf < 0) return null;
    const r = { r0: Math.min(a, f), r1: Math.max(a, f), c0: Math.min(ca, cf), c1: Math.max(ca, cf) };
    return r.r0 === r.r1 && r.c0 === r.c1 ? null : r;
  }, [enabled, range, rowAt, ordered]);
  latest.current = { range, rect, model, ordered, index, onChange };

  // the block as tab-separated text; the records between the first and last row (group rows skipped), the columns between the first and last
  const text = () => {
    const { rect: r, model: rows, ordered: cols } = latest.current;
    if (!r) return '';
    const lines = [];
    for (let i = r.r0; i <= r.r1; i += 1) {
      const row = rows[i];
      if (!row || !row.original) continue;
      lines.push(cols.slice(r.c0, r.c1 + 1).map((c) => quoted(valueText(valueAt(row.original, c.id)))).join('\t'));
    }
    return lines.join('\n');
  };
  const count = () => {
    const { rect: r, model: rows } = latest.current;
    if (!r) return 0;
    let rowsIn = 0;
    for (let i = r.r0; i <= r.r1; i += 1) if (rows[i] && rows[i].original) rowsIn += 1;
    return rowsIn * (r.c1 - r.c0 + 1);
  };
  // the records between the first and last row of the block (group rows have none)
  const rowsOf = () => {
    const { rect: r, model: rows } = latest.current;
    let n = 0;
    if (r) for (let i = r.r0; i <= r.r1; i += 1) if (rows[i] && rows[i].original) n += 1;
    return n;
  };
  const said = (key, n) => announce(loc.t(key, { count: n, n: formatNumber(n) }));

  // how many cells are selected, once the keys pause (Shift and an arrow repeat: one announcement, not one per press)
  React.useEffect(() => {
    if (!enabled) return undefined;
    const { onChange: tell } = latest.current;
    if (tell) {
      if (!rect) { if (told.current) { told.current = false; tell(null); } }
      else { told.current = true; tell({
        from: { rowId: model[rect.r0].original[index], field: ordered[rect.c0].id },
        to: { rowId: model[rect.r1].original[index], field: ordered[rect.c1].id },
        cellCount: count(), rowCount: rowsOf(), columnCount: rect.c1 - rect.c0 + 1, fields: ordered.slice(rect.c0, rect.c1 + 1).map((c) => c.id)
      }); }
    }
    if (!rect) return undefined;
    const timer = setTimeout(() => said('dataGrid.cellsSelected', count()), 400);
    return () => clearTimeout(timer);
  }, [rect]);   // eslint-disable-line react-hooks/exhaustive-deps

  const none = { rect: null, enabled: false, range: null, cellClasses: () => null, extend: () => false, collapse: () => {}, copy: () => false, read: () => null };
  if (!enabled) return none;

  const collapse = () => setRange((old) => (old ? null : old));
  const copy = () => {
    const t = text();
    if (!t) return false;
    try { if (navigator.clipboard) navigator.clipboard.writeText(t); } catch (e) { /* the browser refused the clipboard: nothing to say */ }
    said('dataGrid.cellsCopied', count());
    return true;
  };
  // Shift with an arrow, Home or End: the focus end of the block moves, the anchor stays where the block began. The focus end is the block's own
  // (not the cell that has DOM focus): focus follows a frame later, and keys that repeat must not start from where it still is
  // When keyboard focus is on a cell the block never reached (moved there by script or by any means other than these keys), the block's
  // focus end and the DOM focus disagree: the old block ends and a new one starts from the cell that has focus
  const extend = ({ row, c, key, rtl, focusCell }) => {
    const here = { key: row.id, field: c.field };
    const cont = range && trail.current && trail.current.has(here.key + '|' + here.field) ? range : null;
    const from = cont ? cont.focus : here;
    const r = rowAt.get(from.key), at = ordered.findIndex((x) => x.id === from.field);
    if (r === undefined || at < 0) return false;
    let nr = r, nc = at;
    if (key === 'ArrowDown') nr = r + 1;
    else if (key === 'ArrowUp') nr = r - 1;
    else if (key === 'ArrowLeft') nc = at + (rtl ? 1 : -1);
    else if (key === 'ArrowRight') nc = at + (rtl ? -1 : 1);
    else if (key === 'Home') nc = 0;
    else if (key === 'End') nc = ordered.length - 1;
    else return false;
    const step = nr < r ? -1 : 1;
    while (model[nr] && !model[nr].original) nr += step;   // a group row has no cells: skip it
    nc = Math.max(0, Math.min(ordered.length - 1, nc));
    if (!model[nr] || !model[nr].original || (nr === r && nc === at)) { if (range && !cont) collapse(); return true; }   // the edge: nothing moves (an old block elsewhere ends)
    const anchor = cont ? cont.anchor : here;
    if (!cont) trail.current = new Set([here.key + '|' + here.field]);
    trail.current.add(model[nr].id + '|' + ordered[nc].id);
    setRange({ anchor, focus: { key: model[nr].id, field: ordered[nc].id } });
    focusCell(nr, nc, step);
    return true;
  };
  const cellClasses = (rowIndex, columnIndex) => {
    if (!rect || rowIndex < rect.r0 || rowIndex > rect.r1 || columnIndex < rect.c0 || columnIndex > rect.c1) return null;
    return { inside: true, top: rowIndex === rect.r0, bottom: rowIndex === rect.r1, start: columnIndex === rect.c0, end: columnIndex === rect.c1 };
  };
  // what the adapter reads: the block as rows and columns of records and fields
  const read = () => {
    if (!rect) return null;
    const rows = [];
    for (let i = rect.r0; i <= rect.r1; i += 1) if (model[i] && model[i].original) rows.push(model[i].original);
    return { rows, fields: ordered.slice(rect.c0, rect.c1 + 1).map((c) => c.id), text: text() };
  };
  return { enabled: true, rect, range, rowAt, cellClasses, extend, collapse, copy, read };
}
