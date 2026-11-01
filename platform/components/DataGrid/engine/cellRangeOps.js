/* Plenix · DataGrid engine · cell range operations (loaded when first used)
   Summary: The heavy half of cell range selection (issue 465): where a Shift and arrow press moves the end of the block, the block as
     tab-separated text, the counts, what onCellSelectionChange is told, and the words a screen reader hears. useCellRange.js keeps the
     range and its rectangle (what every cell draws from) and loads this file with one dynamic import the first time a person extends a
     block, so a grid that never uses the option, and the npm package's first load, do not carry it.
   Usage:
     import('./cellRangeOps.js').then((ops) => { ops.use({ cellText, announce, formatNumber }); ... });   // the grid's helpers, handed in
     import('./cellRangeOps.js').then((ops) => ops.extendTo({ range, row, c, key, rtl, rowAt, model, ordered }));
     ops.textOf(rect, model, ordered); ops.countOf(rect, model); ops.detailsOf({ rect, model, ordered, index }); ops.said(loc, key, n)
   Props:
     range: { anchor, focus }, each { key: the row's id, field: the column's id }; rect: { r0, r1, c0, c1 } in model and column order;
     rowAt: Map from a row's id to its place in model; model: the rows the grid shows; ordered: the visible columns, in order; index: the records' key field;
     rtl: the grid's direction; loc: the locale (t); key: the pressed key; n: a count.
   Behavior:
     The rules are the ones documented in useCellRange.js: the arrows are mirrored in right to left, group rows have no cells and are skipped, a block
       never leaves the grid, and the copy is every record between the block's first and last row (a cell with a tab, a line break or a quote is quoted).
   Notes:
     In the iife builds (the CDN script, the applications) the dynamic import is inlined by the bundler (inlineDynamicImports), so the pages that open from
       file:// need no second file; the npm package splits it into a chunk.
*/
// The grid's own helpers (a cell's text, a count in words, the polite announcement) are handed in by useCellRange.js, not imported here: this file
// stays a leaf, so the chunk the npm package splits it into does not point back into the engine's.
let helpers = null;
export const use = (given) => { helpers = given; };

// a spreadsheet's text: cells by tab, rows by line break; a cell with a tab, a line break or a quote is quoted, its quotes doubled
const quoted = (text) => (/[\t\n\r"]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text);

export const textOf = (r, rows, cols) => {
  if (!r) return '';
  const lines = [];
  for (let i = r.r0; i <= r.r1; i += 1) {
    const row = rows[i];
    if (!row || !row.original) continue;
    lines.push(cols.slice(r.c0, r.c1 + 1).map((c) => quoted(helpers.cellText(row.original, c.id))).join('\t'));
  }
  return lines.join('\n');
};
// the records between the first and last row of the block (group rows have none)
export const rowsIn = (r, rows) => {
  let n = 0;
  if (r) for (let i = r.r0; i <= r.r1; i += 1) if (rows[i] && rows[i].original) n += 1;
  return n;
};
export const countOf = (r, rows) => (r ? rowsIn(r, rows) * (r.c1 - r.c0 + 1) : 0);
export const detailsOf = ({ rect, model, ordered, index }) => ({
  from: { rowId: model[rect.r0].original[index], field: ordered[rect.c0].id },
  to: { rowId: model[rect.r1].original[index], field: ordered[rect.c1].id },
  cellCount: countOf(rect, model), rowCount: rowsIn(rect, model), columnCount: rect.c1 - rect.c0 + 1, fields: ordered.slice(rect.c0, rect.c1 + 1).map((c) => c.id)
});
export const said = (loc, key, n) => helpers.announce(loc.t(key, { count: n, n: helpers.formatNumber(n) }));

// Shift with an arrow, Home or End: the focus end of the block moves, the anchor stays where the block began. The focus end is the block's own
// (not the cell that has DOM focus): focus follows a frame later, and keys that repeat must not start from where it still is. When keyboard focus is on
// a cell the block never reached (moved there by script, or by any means other than these keys: trail is the cells its focus end has been on), the block's
// focus end and the DOM focus disagree, so the old block ends and a new one starts from the cell that has focus.
// Returns { range, nr, nc, step, trail } (the new range, the cell to focus, the cells reached), { collapse: true } when nothing moves and an old block
// elsewhere ends, or null when nothing moves.
export const extendTo = ({ range, trail, row, c, key, rtl, rowAt, model, ordered }) => {
  const here = { key: row.id, field: c.field };
  const cont = range && trail && trail.has(here.key + '|' + here.field) ? range : null;
  const from = cont ? cont.focus : here;
  const r = rowAt.get(from.key), at = ordered.findIndex((x) => x.id === from.field);
  if (r === undefined || at < 0) return null;
  let nr = r, nc = at;
  if (key === 'ArrowDown') nr = r + 1;
  else if (key === 'ArrowUp') nr = r - 1;
  else if (key === 'ArrowLeft') nc = at + (rtl ? 1 : -1);
  else if (key === 'ArrowRight') nc = at + (rtl ? -1 : 1);
  else if (key === 'Home') nc = 0;
  else if (key === 'End') nc = ordered.length - 1;
  else return null;
  const step = nr < r ? -1 : 1;
  while (model[nr] && !model[nr].original) nr += step;   // a group row has no cells: skip it
  nc = Math.max(0, Math.min(ordered.length - 1, nc));
  if (!model[nr] || !model[nr].original || (nr === r && nc === at)) return range && !cont ? { collapse: true } : null;   // the edge: nothing moves (an old block elsewhere ends)
  const reached = cont ? trail : new Set([here.key + '|' + here.field]);
  reached.add(model[nr].id + '|' + ordered[nc].id);
  return { range: { anchor: cont ? cont.anchor : here, focus: { key: model[nr].id, field: ordered[nc].id } }, nr, nc, step, trail: reached };
};
