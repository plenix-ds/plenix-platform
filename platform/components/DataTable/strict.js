/* Plenix · DataTable strict mode (strict.js)
   Summary: Tabulator drawn by Plenix (Strict DS 6b, batch 285; geometry split, owner 2026-10-13): Tabulator keeps its
     data, sorting, filtering, selection, editing, grouping and tree, measures the columns' content and sizes and resizes
     the columns; Plenix owns everything else. Tabulator writes a column's width (width, min-width, max-width on its
     column, header and cell elements: a JavaScript adjustment from measured layout); every other geometry write it makes
     (row heights, padding, positions) is switched off here, once per window, and the Plenix stylesheet draws the grid from
     classes and tokens.
   Usage:
     strictTabulator(Tabulator, win)   // loadTabulator does it before the first grid is built
     virtualResync(table)              // a density or row height change: the virtual renderer takes the new heights
     virtualPrint(table, true|false)   // before / after printing: every row in the document, then the window again
     groupLayout(table)                // a grouped grid's rows: their flags and offsets (prefix sums of the tokens)
     groupAt(table, top)               // the display row at a scroll position, from the tokens' heights
     remeasure(table, columns)         // React filled these columns' cells, or the density changed: their content
                                       // widths are measured again
   Props:
     none: strictTabulator(Tabulator, win) patches that window's Tabulator once
   Behavior:
     Column widths (Tabulator's): the "plenix" layout mode measures each column's content once (Tabulator's fit to data;
       a width the column definition gives, or the person's, is kept), then shares the room left among the columns
       without a width, as the stylesheet's fill columns did; a window resize only shares the room again. A density
       change measures the columns' content once more (DataTable calls remeasure for every column, once per change;
       never a row), so a bigger density never cuts text off (owner, 2026-10-14). Every width
       Tabulator writes is a whole number of grid steps (utils/grid.js: measured, fitted and dragged widths round up),
       so what JavaScript writes inline stays on the Plenix grid (owner, 2026-10-13).
     Row height and cell padding (Plenix's): never measured, never written. A record row is the grid's row height step
       (--plx-comp-data-table-record-height: Short is the density's row height; Medium, Tall and Extra tall are fixed
       tokens) plus its line; the stylesheet draws it.
     Virtual rendering (renderVertical "virtual": a grid with a room, its height or the room fill and load-more measure):
       Tabulator renders the rows in view; every row counts as its kind's height, read from the tokens (the grid's hidden
       probe boxes, each sized by its token), never from the rows: a record row the row height step, a group row the
       group header height (the density row height + 16px), plus the gap band before it and the add row of the group
       above it when it has them. The room for the rows not drawn is two gaps of the system's virtualization
       (system/virtual.css: pieces of 1, 2, 4 … rows, data-plx-span; a grouped grid's gap has one part per row kind, each
       sized by its token), never padding. A grouped grid finds the row at a scroll position from those heights (prefix
       sums), so a jump, a kept position and a density change land on the right row.
     Group rows (groupBy): Tabulator's groups and their data; no group row is measured and no header margin is written.
       Each group row carries plxGap (a band before it: it is not the first row, nor the first group under its parent)
       and plxAddFor (the group whose add row it draws above its band), also as classes on its element; the grid's own
       callback (table.plxOnGroupLayout) fills the parts in.
       The grid carries aria-rowcount and each drawn row its aria-rowindex. A focused control whose row scrolls out parks
       the focus on the scrolling body and gets it back when the row is drawn again.
     Off: row and cell heights, header vertical alignment, the body's sizing, the virtual renderer's padding, the
       frozen-rows holder's width, a hidden column's display (a class, plx-data-table__hidden).
     Pinned (frozen) columns: classes only (tabulator-frozen, data-plx-sticky naming the widths before it); Tabulator's own
       pinning writes position and left/right inline, so it stays off. A pinned column's width is a whole size token
       (its own, or its content rounded up to the next one), so the offset classes stay exact.
     Tree rows: no branch spacer and no indent written; the row's level is its tabulator-tree-level-N class and the tree
       cell (plx-data-table__tree-cell) is indented by the stylesheet.
     Popups (menus, the header filter): no coordinates. The popup opens in the top layer (popover) and is placed by CSS
       anchor positioning against the cell, header or button that opened it.
   Notes:
     The patches are found from a probe table built once (Tabulator's classes are not exported), then the probe is removed.
*/

import { SIZE_STEPS } from '../../utils/sizeSteps.js';
import { gapPieces } from '../../hooks/useVirtualizer.js';
import { gridStep, snapToGrid } from '../../utils/grid.js';

const OFF = function () {};
const done = new WeakMap();   // Tabulator -> the promise of its patches
const WIDTHS = ['width', 'min-width', 'max-width'];   // the inline style a column, header or cell may carry
const HIDDEN = 'plx-data-table__hidden';

// an element keeps only its width (width, min-width, max-width): anything else Tabulator wrote is taken off again
function keepWidths(el) {
  if (!el || !el.hasAttribute || !el.hasAttribute('style')) return;
  const st = el.style;
  for (let i = st.length - 1; i >= 0; i--) if (WIDTHS.indexOf(st[i]) < 0) st.removeProperty(st[i]);
  if (!st.length) el.removeAttribute('style');
}

// a token's value in pixels where el is (its density region): '--plx-sys-data-table-row-height' -> 32
function tokenPx(name, el) {
  const win = el.ownerDocument.defaultView;
  const v = win.getComputedStyle(el).getPropertyValue(name).trim();
  if (/rem$/.test(v)) return parseFloat(v) * (parseFloat(win.getComputedStyle(el.ownerDocument.documentElement).fontSize) || 16);
  return parseFloat(v) || 0;
}
// the heights of the grid's row kinds, read from its tokens where the grid is (its row height step, its density): rec
// (the row height step), grp (the group header), band (the gap between groups), add (a Short row: the add row, column
// calcs) and line. A token written as calc() is read from the grid's probe (a hidden box per kind sized by its token;
// DataTable draws it), else from the custom property.
function heights(table) {
  if (table.plxH) return table.plxH;
  const el = table.element, probe = table.plxProbe;
  const box = (kind, name) => {
    const p = probe && probe.isConnected && probe.querySelector('[data-plx-probe="' + kind + '"]');
    const v = p ? parseFloat(p.ownerDocument.defaultView.getComputedStyle(p).blockSize) : 0;
    return v > 0 ? v : tokenPx(name, el);
  };
  const H = { rec: box('record', '--plx-comp-data-table-record-height'), grp: box('group', '--plx-comp-data-table-group-header-height'),
    band: box('band', '--plx-comp-data-table-group-gap'), add: box('add', '--plx-sys-data-table-row-height'), line: tokenPx('--plx-comp-data-table-line-width', el) };
  if (!H.rec) H.rec = tokenPx('--plx-sys-data-table-row-height', el);
  if (!H.add) H.add = H.rec;
  table.plxH = H;
  return H;
}
// one record row's block size: the row height step and its line (read from the tokens, never from a row)
function rowPx(table) { const H = heights(table); return (H.rec + H.line) || 1; }
// a display row's block size by its kind (no row is measured)
function hOf(table, row) {
  const H = heights(table);
  if (row && row.type === 'group') return H.grp + H.line + (row.plxGap ? H.band + H.line : 0) + (row.plxAddFor ? H.add + H.line : 0);
  if (row && row.type === 'calc') return H.add + H.line;
  return H.rec + H.line;
}

// ---- group rows: flags and offsets (a grouped grid's rows have several heights, all known from the tokens) ----
const EMPTY = { mixed: false, n: 0 };
export function groupLayout(table, rowsIn) {
  const rm = table && table.rowManager; if (!rm) return EMPTY;
  const rows = rowsIn || rm.getDisplayRows(), n = rows.length, L0 = table.plxLayout, H = heights(table);
  if (L0 && L0.rows === rows && L0.n === n && L0.H === H && L0.first === rows[0] && L0.last === rows[n - 1] && L0.adds === !!table.plxAddRows) return L0;
  let mixed = false;
  for (let i = 0; i < n; i++) if (rows[i].type !== 'row') { mixed = true; break; }
  const adds = !!table.plxAddRows;
  const L = { rows, n, H, first: rows[0], last: rows[n - 1], mixed, adds };
  table.plxLayout = L;
  if (!mixed) { table.plxTailFor = null; return L; }
  // flags: a band before every group but the first row and the first group under its parent; the add row of the group
  // whose records end just above
  for (let i = 0; i < n; i++) {
    const r = rows[i]; if (r.type !== 'group') continue;
    const prev = i ? rows[i - 1] : null;
    r.plxGap = !!prev && !(prev.type === 'group' && r.parent === prev);
    r.plxAddFor = adds && prev && prev.type === 'row' && prev.modules.group ? prev.modules.group : null;
    if (r.element) { r.element.classList.toggle('plx-data-table__group--gap', r.plxGap); r.element.classList.toggle('plx-data-table__group--add', !!r.plxAddFor); }
  }
  const last = rows[n - 1];
  table.plxTailFor = adds && last && last.type === 'row' && last.modules.group ? last.modules.group : null;
  // prefix sums: the offset of row i and the count of each kind before it
  const off = new Float64Array(n + 1), rec = new Int32Array(n + 1), grp = new Int32Array(n + 1), band = new Int32Array(n + 1), add = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    const r = rows[i], g = r.type === 'group';
    off[i + 1] = off[i] + hOf(table, r);
    rec[i + 1] = rec[i] + (r.type === 'row' ? 1 : 0);
    grp[i + 1] = grp[i] + (g ? 1 : 0);
    band[i + 1] = band[i] + (g && r.plxGap ? 1 : 0);
    add[i + 1] = add[i] + (g && r.plxAddFor ? 1 : 0) + (r.type === 'calc' ? 1 : 0);
  }
  Object.assign(L, { off, rec, grp, band, add });
  if (table.plxOnGroupLayout) table.plxOnGroupLayout(null);
  return L;
}
// the display row at a scroll offset (a binary search in the offsets)
function indexIn(L, top) {
  let lo = 0, hi = L.n - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (L.off[mid] <= top) lo = mid; else hi = mid - 1; }
  return Math.max(0, lo);
}
export function groupAt(table, top) {
  const L = groupLayout(table); if (!L.mixed || !L.n) return null;
  const i = indexIn(L, top); return { index: i, row: L.rows[i], offset: L.off[i], layout: L };
}
// the heights changed (a density, a row height step): every height is read again
function forgetHeights(table) { table.plxH = null; table.plxLayout = null; }

// the lead column (the checkbox column, a mark column): its width is the lead token, from its classes
const isLead = (c) => !!c.isRowHeader || /__cell--select|__cell--icon|__w-lead|__w-view/.test(String((c.definition && c.definition.cssClass) || ''));
// the next size token at or above px (a pinned column's width)
const stepUp = (px) => SIZE_STEPS.find((s) => s >= px) || SIZE_STEPS[SIZE_STEPS.length - 1];

// a pinned column's width as named by the steps stylesheet ("lead", "240px"), for the offset of the pinned column after it
function widthName(column) {
  if (isLead(column)) return 'lead';
  return SIZE_STEPS.indexOf(column.width) >= 0 ? column.width + 'px' : null;
}

// the "plenix" layout: Tabulator measures each column's content (once, or again when forced), then the room left is
// shared among the columns without a width (equal parts, the last takes the rounding); pinned columns take a size token
function plenixLayout(columns, forced) {
  const table = this.table;
  if (!table.element.offsetWidth) return;   // hidden: measured when it is shown (DataTable redraws it then)
  const vis = columns.filter((c) => c.visible && !c.isGroup);
  vis.forEach((c) => { if (!c.widthFixed && (forced || !c.plxContent)) { c.reinitializeWidth(); c.plxContent = c.getWidth(); } });
  share(table, vis);
}
function share(table, vis) {
  let pinned = false;
  vis.forEach((c) => {
    if (!c.modules.frozen || isLead(c)) return;
    const w = stepUp(c.widthFixed ? c.getWidth() : c.plxContent || c.getWidth());
    if (w !== c.getWidth()) { c.setWidthActual(w); pinned = true; }
  });
  const sharing = vis.filter((c) => !c.widthFixed && !c.modules.frozen && !isLead(c) && c.plxContent);
  const room = table.rowManager.element.clientWidth;
  const used = vis.reduce((s, c) => s + (sharing.indexOf(c) >= 0 ? c.plxContent : c.getWidth()), 0);
  // in whole grid steps (owner, 2026-10-13: every length written inline is on the grid; utils/grid.js); what is left
  // under one step per column stays at the end of the row
  const step = gridStep(table.element), units = Math.floor((room - used) / step);
  let widths;
  if (units >= 0) {
    // room left: equal parts to the sharing columns (the first ones take the steps that do not divide evenly)
    const each = sharing.length ? Math.floor(units / sharing.length) : 0, extra = units - each * sharing.length;
    widths = sharing.map((c, i) => c.plxContent + (each + (i < extra ? 1 : 0)) * step);
  } else {
    // too little room: the sharing columns give up what their content asks beyond their minimum, in proportion (a long
    // text then ends in its ellipsis, or wraps, instead of the grid scrolling sideways); below that, the grid scrolls
    const give = sharing.map((c) => Math.max(0, Math.floor((c.plxContent - (c.minWidth || 0)) / step))), total = give.reduce((s, g) => s + g, 0);
    const cut = Math.min(Math.ceil((used - room) / step), total);
    const per = give.map((g) => (total ? Math.floor(cut * g / total) : 0));
    for (let rest = cut - per.reduce((s, x) => s + x, 0), i = 0; rest > 0 && i < 4 * sharing.length; i++) { const k = i % sharing.length; if (per[k] < give[k]) { per[k]++; rest--; } }
    widths = sharing.map((c, i) => c.plxContent - per[i] * step);
  }
  sharing.forEach((c, i) => { if (widths[i] !== c.getWidth()) c.setWidthActual(widths[i]); });
  // the pinned offsets name the widths before each pinned column: laid out again once the layout is unblocked
  if (pinned && table.modules.frozenColumns) Promise.resolve().then(() => { if (!table.destroyed) table.modules.frozenColumns.layout(); });
}

// the grid's width changed: the room is shared again (nothing is measured; a grid not measured yet is measured now)
export function reshare(table) {
  const cm = table && table.columnManager; if (!cm || !table.element.offsetWidth || cm.table.modules.layout.getMode() !== 'plenix') return;
  const vis = cm.columnsByIndex.filter((c) => c.visible && !c.isGroup);
  if (vis.some((c) => !c.widthFixed && !c.plxContent)) { table.redraw(); return; }
  share(table, vis);
}

// React filled these columns' cells after Tabulator measured them empty, or the density changed (every column): their
// content is measured again (only theirs; a width the definition gives, or the person's, is kept), then the room is
// shared again. Nothing else is measured (no row, no other column). A hidden grid forgets their content widths, so its
// layout measures them when it is shown.
export function remeasure(table, columns) {
  const cm = table && table.columnManager; if (!cm) return;
  if (!table.element.offsetWidth) { (columns || []).forEach((col) => { const c = col && (col._column || col); if (c && !c.widthFixed) c.plxContent = 0; }); return; }
  const vis = cm.columnsByIndex.filter((c) => c.visible && !c.isGroup);
  let any = false;
  (columns || []).forEach((col) => { const c = col && (col._column || col); if (c && !c.widthFixed && vis.indexOf(c) >= 0) { c.reinitializeWidth(); c.plxContent = c.getWidth(); any = true; } });
  if (any && cm.table.modules.layout.getMode() === 'plenix') share(table, vis);
}

// ---- virtual rendering: the rows in view, gaps for the others ----

// a gap's pieces for n rows (system/virtual.css sizes each piece from --plx-sys-virtual-item-size, set by data-table.css)
const pieceEls = (parent, n) => gapPieces(n).forEach((p) => { const d = parent.ownerDocument.createElement('div'); d.className = 'plx-virtual-gap__piece'; d.setAttribute('data-plx-span', String(p)); parent.appendChild(d); });
function fillGap(box, n) {
  const key = String(n);
  if (box.plxHave === key) return;
  box.plxHave = key; box.textContent = '';
  pieceEls(box, n);
}
// a grouped grid's gap: one part per row kind (records, group headers, gap bands, add rows), each part's item size its
// kind's token (data-table.css: plx-data-table__gap-part--*)
const KINDS = ['rec', 'grp', 'band', 'add'];
function fillGapParts(box, L, from, to) {
  const c = KINDS.map((k) => (to > from ? L[k][to] - L[k][from] : 0)), key = 'g' + c.join();
  if (box.plxHave === key) return;
  box.plxHave = key; box.textContent = '';
  KINDS.forEach((k, i) => {
    if (!c[i]) return;
    const part = box.ownerDocument.createElement('div'); part.className = 'plx-data-table__gap-part plx-data-table__gap-part--' + k;
    pieceEls(part, c[i]); box.appendChild(part);
  });
}
// the focus inside a row that is about to leave the document waits on the scrolling body
function park(r, leaving) {
  const doc = r.tableElement.ownerDocument, a = doc.activeElement;
  if (!a || a === r.tableElement || !r.tableElement.contains(a)) return;
  if (leaving && !leaving.some((row) => row.getElement().contains(a))) return;
  r.plxFocus = a;
  try { r.elementVertical.focus({ preventScroll: true }); } catch (e) { /* not focusable */ }
}
// the gaps, the ARIA positions and a parked focus, after every change of the rows drawn
function sync(r) {
  const te = r.tableElement, rows = r.rows(), total = rows.length, table = r.table;
  const drawn = total && r.vDomBottom >= r.vDomTop;
  const L = groupLayout(table, rows);
  // the add row at the end of the last group (a grouped grid with add rows) follows the bottom gap
  const tail = table.plxTailEl && table.plxTailFor ? table.plxTailEl : null;
  if (te.firstChild !== r.plxTop) te.insertBefore(r.plxTop, te.firstChild);
  if (tail) { if (tail.parentNode !== te || tail.previousSibling !== r.plxBottom || te.lastChild !== tail) { te.appendChild(r.plxBottom); te.appendChild(tail); } }
  else {
    if (table.plxTailEl && table.plxTailEl.parentNode === te) te.removeChild(table.plxTailEl);
    if (te.lastChild !== r.plxBottom) te.appendChild(r.plxBottom);
  }
  if (L.mixed) {
    fillGapParts(r.plxTop, L, 0, drawn ? r.vDomTop : 0);
    fillGapParts(r.plxBottom, L, drawn ? r.vDomBottom + 1 : 0, total);
  } else {
    fillGap(r.plxTop, drawn ? r.vDomTop : 0);
    fillGap(r.plxBottom, drawn ? Math.max(0, total - 1 - r.vDomBottom) : total);
  }
  table.element.setAttribute('aria-rowcount', String(total + 1));
  const head = table.columnManager && table.columnManager.headersElement;
  if (head && head.getAttribute('role') === 'row') head.setAttribute('aria-rowindex', '1');
  if (drawn) for (let i = r.vDomTop; i <= r.vDomBottom; i++) { const row = rows[i]; if (row && row.element) row.element.setAttribute('aria-rowindex', String(i + 2)); }
  const f = r.plxFocus;
  if (f) {
    const doc = te.ownerDocument, at = doc.activeElement;
    if (at !== r.elementVertical && at !== doc.body && at !== f) r.plxFocus = null;   // the person moved on
    else if (f.isConnected && te.contains(f)) { r.plxFocus = null; try { f.focus({ preventScroll: true }); } catch (e) { /* gone */ } }
  }
}

// the renderer's own add and remove steps, at each row kind's height from the tokens (no row is measured, no padding is
// written)
function addTop(rows, room) {
  const te = this.tableElement, t = this.table;
  let n = this.vDomTop - 1, chain = 0, added = 0;
  while (this.vDomTop && rows[n] && chain < this.vDomMaxRenderChain && room >= hOf(t, rows[n])) {
    const row = rows[n], h = hOf(t, row);
    this.styleRow(row, n);
    te.insertBefore(row.getElement(), this.plxTop.parentNode === te ? this.plxTop.nextSibling : te.firstChild);
    row.initialize();
    room -= h; added += h; this.vDomTop--; n--; chain++;
  }
  if (added) { this.vDomTopPad = Math.max(0, this.vDomTopPad - added); this.vDomScrollPosTop -= added; }
  sync(this);
}
function removeTop(rows, room) {
  const t = this.table, out = [];
  let chain = 0, gone = 0;
  while (rows[this.vDomTop] && this.vDomTop < this.vDomBottom && chain < this.vDomMaxRenderChain && room >= hOf(t, rows[this.vDomTop])) {
    const h = hOf(t, rows[this.vDomTop]);
    out.push(rows[this.vDomTop]); this.vDomTop++; room -= h; gone += h; chain++;
  }
  park(this, out);
  out.forEach((row) => row.detachElement());
  if (gone) { this.vDomTopPad += gone; this.vDomScrollPosTop += this.vDomTop ? gone : gone + this.vDomWindowBuffer; }
  sync(this);
}
function addBottom(rows, room) {
  const te = this.tableElement, t = this.table;
  let n = this.vDomBottom + 1, chain = 0, added = 0;
  while (rows[n] && chain < this.vDomMaxRenderChain && room >= hOf(t, rows[n])) {
    const row = rows[n], h = hOf(t, row);
    this.styleRow(row, n);
    te.insertBefore(row.getElement(), this.plxBottom.parentNode === te ? this.plxBottom : null);
    row.initialize();
    room -= h; added += h; this.vDomBottom++; n++; chain++;
  }
  if (added) { this.vDomBottomPad = Math.max(0, this.vDomBottomPad - added); this.vDomScrollPosBottom += added; }
  sync(this);
}
function removeBottom(rows, room) {
  const t = this.table, out = [];
  let chain = 0, gone = 0;
  while (rows[this.vDomBottom] && this.vDomBottom > this.vDomTop && chain < this.vDomMaxRenderChain && room >= hOf(t, rows[this.vDomBottom])) {
    const h = hOf(t, rows[this.vDomBottom]);
    out.push(rows[this.vDomBottom]); this.vDomBottom--; room -= h; gone += h; chain++;
  }
  park(this, out);
  out.forEach((row) => row.detachElement());
  if (gone) { this.vDomBottomPad += gone; this.vDomScrollPosBottom -= gone; }
  sync(this);
}
// a grouped grid scrolls by its rows' heights: a jump finds the row at the scroll position from the offsets (Tabulator's
// own estimate assumes one row height) and draws from it in place
function scrollRowsMixed(own) {
  return function (top, up) {
    const L = this.plxTop ? groupLayout(this.table, this.rows()) : EMPTY;
    if (!L.mixed) return own.apply(this, arguments);
    const i = top - this.vDomScrollPosTop, s = top - this.vDomScrollPosBottom, far = 2 * this.vDomWindowBuffer, rows = this.rows();
    this.scrollTop = top;
    if (-i > far || s > far) {
      const left = this.table.rowManager.scrollLeft, at = this.elementVertical.scrollTop, k = indexIn(L, at);
      this._virtualRenderFill(k, true, at - L.off[k]);
      this.scrollColumns(left);
    } else if (up) {
      if (i < 0) this._addTopRow(rows, -i);
      if (s < 0) { if (this.vDomScrollHeight - this.scrollTop > this.vDomWindowBuffer) this._removeBottomRow(rows, -s); else this.vDomScrollPosBottom = this.scrollTop; }
    } else {
      if (s >= 0) this._addBottomRow(rows, s);
      if (i >= 0) { if (this.scrollTop > this.vDomWindowBuffer) this._removeTopRow(rows, i); else this.vDomScrollPosTop = this.scrollTop; }
    }
    return undefined;
  };
}

// a group row (Tabulator's group): its height is its kind's token (never measured), and no margin is written to keep its
// toggle in view when the grid scrolls sideways (the first group cell is sticky: data-table.css)
const patchedGroups = new WeakSet();
function patchGroup(group) {
  const G = Object.getPrototypeOf(group);
  if (patchedGroups.has(G)) return;
  patchedGroups.add(G);
  G.getHeight = function () { return hOf(this.groupManager.table, this); };
  ['normalizeHeight', 'calcHeight', 'scrollHeader'].forEach((n) => { if (typeof G[n] === 'function') G[n] = OFF; });
  G.setHeight = function () { this.height = this.outerHeight = hOf(this.groupManager.table, this); };
}
const patchedRenderers = new WeakSet();
function patchVirtualClass(V) {
  if (patchedRenderers.has(V)) return;
  patchedRenderers.add(V);
  const fill = V._virtualRenderFill, clear = V.clearRows, rerender = V.rerenderRows;
  V._virtualRenderFill = function (at, keep, into) {
    if (this.plxTop) park(this);
    this.vDomRowHeight = rowPx(this.table);
    fill.apply(this, arguments);
    if (!this.plxTop) return;
    // a grouped grid: the place Tabulator kept (with one row height) is the row's own offset (the tokens' heights)
    const L = groupLayout(this.table, this.rows());
    if (L.mixed && L.n) {
      const E = this.elementVertical.clientHeight, total = L.off[L.n];
      this.vDomScrollHeight = Math.max(0, total - E);
      if (at && keep) {
        const want = Math.max(0, Math.min(L.off[Math.min(at, L.n)] + (into || 0), Math.max(0, total - E)));
        this.scrollTop = want; this.vDomScrollPosTop = want; this.vDomScrollPosBottom = want; this.elementVertical.scrollTop = want;
      }
    }
    sync(this);
  };
  V.scrollRows = scrollRowsMixed(V.scrollRows);
  V.clearRows = function () { if (this.plxTop) park(this); clear.apply(this, arguments); if (this.plxTop) sync(this); };
  V.rerenderRows = function () { rerender.apply(this, arguments); if (this.plxTop) sync(this); };
  V._addTopRow = addTop; V._removeTopRow = removeTop; V._addBottomRow = addBottom; V._removeBottomRow = removeBottom;
  V._quickNormalizeRowHeight = OFF;
}
// one virtual renderer: its two gaps, and the body's padding and sizing writes switched off on its element
function hookVirtual(r) {
  if (r.plxTop) return;
  patchVirtualClass(Object.getPrototypeOf(r));
  const te = r.tableElement, doc = te.ownerDocument;
  const gap = () => { const g = doc.createElement('div'); g.className = 'plx-virtual-gap plx-data-table__gap'; g.setAttribute('aria-hidden', 'true'); return g; };
  r.plxTop = gap(); r.plxBottom = gap();
  // where Tabulator would write the padding, the gaps are drawn instead (at once: it reads the scroll height next)
  ['paddingTop', 'paddingBottom'].forEach((p) => Object.defineProperty(te.style, p, { configurable: true, get: () => '', set() { sync(r); } }));
  ['minHeight', 'minWidth', 'display', 'visibility'].forEach((p) => Object.defineProperty(te.style, p, { configurable: true, get: () => '', set: OFF }));
  r.vDomRowHeight = rowPx(r.table);
  te.insertBefore(r.plxTop, te.firstChild); te.appendChild(r.plxBottom);
}

// a density or row height change: the rows are already their new height (CSS); the renderer takes it, and the row that
// was at the top of the view stays there
export function virtualResync(table) {
  if (!table) return;
  const r = table.rowManager && table.rowManager.renderer;
  if (!r || !r.plxTop) { forgetHeights(table); return; }
  const top = r.elementVertical.scrollTop, L0 = groupLayout(table, r.rows()), H0 = heights(table), before = rowPx(table);
  const was = L0.mixed && L0.n ? indexIn(L0, top) : -1, wasH = was >= 0 ? L0.off[was + 1] - L0.off[was] : 0, wasOff = was >= 0 ? L0.off[was] : 0;
  forgetHeights(table);
  const now = rowPx(table), H1 = heights(table);
  r.vDomRowHeight = now;
  if (['rec', 'grp', 'band', 'add', 'line'].every((k) => H0[k] === H1[k]) || !r.rows().length) { sync(r); return; }
  if (was >= 0) {
    const L1 = groupLayout(table, r.rows()), nowH = L1.off[was + 1] - L1.off[was];
    r._virtualRenderFill(was, true, wasH ? (top - wasOff) * nowH / wasH : 0);
    return;
  }
  const index = Math.floor(top / before), into = (top - index * before) * now / before;
  r._virtualRenderFill(index, true, into);
}
// printing: every row in the document while the page prints, then the rows in view again
export function virtualPrint(table, on) {
  const rm = table && table.rowManager, r = rm && rm.renderer;
  if (!r || !r.plxTop) return;
  if (on) { const g = groupAt(table, r.elementVertical.scrollTop); r.plxPrintTop = g ? g.index : Math.floor(r.elementVertical.scrollTop / rowPx(table)); rm.fixedHeight = false; r._virtualRenderFill(); }
  else { rm.fixedHeight = true; r._virtualRenderFill(r.plxPrintTop || 0, true); }
}

// a Tabulator menu (the column menu, the row menu, a handle's moves) as an ARIA menu the keyboard works: its items are
// menu items, the first enabled one takes the focus, Arrow Down / Up (Home, End) move between them, Enter or Space
// chooses one, Escape and Tab close the menu and the focus goes back to what opened it
function menuKeys(popup, doc) {
  const m = popup.element;
  popup.plxReturn = doc.activeElement && doc.activeElement !== doc.body ? doc.activeElement : null;
  m.setAttribute('role', 'menu');
  const items = Array.from(m.children).filter((x) => x.classList.contains('tabulator-menu-item'));
  Array.from(m.children).forEach((x) => { if (x.classList.contains('tabulator-menu-separator')) x.setAttribute('role', 'separator'); });
  items.forEach((x) => { x.setAttribute('role', 'menuitem'); x.tabIndex = -1; if (x.classList.contains('tabulator-menu-item-disabled')) x.setAttribute('aria-disabled', 'true'); });
  const live = () => items.filter((x) => !x.classList.contains('tabulator-menu-item-disabled'));
  const go = (x) => { if (x) x.focus({ preventScroll: true }); };
  if (!m.plxKeys) {
    m.plxKeys = true;
    m.addEventListener('keydown', (e) => {
      const list = live(), i = list.indexOf(doc.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); go(list[(i + 1) % list.length]); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); go(list[(i - 1 + list.length) % list.length]); }
      else if (e.key === 'Home') { e.preventDefault(); e.stopPropagation(); go(list[0]); }
      else if (e.key === 'End') { e.preventDefault(); e.stopPropagation(); go(list[list.length - 1]); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (i >= 0) list[i].click(); }
      else if (e.key === 'Escape' || e.key === 'Tab') { if (e.key === 'Escape') e.preventDefault(); e.stopPropagation(); if (popup.visible) popup.hide(); }
    });
  }
  // only a menu opened from the keyboard (its opener has the focus) moves the focus into it
  if (popup.plxReturn && !m.contains(popup.plxReturn)) requestAnimationFrame(() => go(live()[0]));
}

export function strictTabulator(Tabulator, win) {
  if (!Tabulator) return Promise.resolve();
  if (done.has(Tabulator)) return done.get(Tabulator);
  let resolveDone; done.set(Tabulator, new Promise((r) => { resolveDone = r; }));
  if (typeof Tabulator.extendModule === 'function') Tabulator.extendModule('layout', 'modes', { plenix: plenixLayout });
  const doc = win.document;
  const probeEl = doc.createElement('div');
  probeEl.className = 'plx-visually-hidden';
  probeEl.setAttribute('data-plx-probe', 'tabulator');   // the style audit leaves the unpatched probe alone while it lives
  doc.body.appendChild(probeEl);
  const probe = new Tabulator(probeEl, {
    data: [{ id: 1, a: 'x', kids: [{ id: 2, a: 'y' }] }], index: 'id', renderVertical: 'basic',
    dataTree: true, dataTreeChildField: 'kids', columns: [{ field: 'a', frozen: true }, { field: 'b' }],
    rowContextMenu: [{ label: 'x', action: OFF }], frozenRows: 0,
  });
  const finish = () => {
    try {
      const row = probe.rowManager.rows[0], cell = row && row.cells[0], col = cell && cell.column;
      if (cell) {
        const Cell = Object.getPrototypeOf(cell);
        // a cell's width is Tabulator's (setWidth, setMinWidth, setMaxWidth, clearWidth stay); its height is the row's (CSS)
        ['setHeight'].forEach((n) => { if (typeof Cell[n] === 'function') Cell[n] = OFF; });
        // a cell's alignment is a class (DataTable maps hozAlign to plx-data-table__cell--align-*): only its width stays
        const configure = Cell._configureCell;
        Cell._configureCell = function () { configure.apply(this, arguments); keepWidths(this.element); };
        // a hidden column's cells: a class, not display
        Cell.hide = function () { if (this.element) this.element.classList.add(HIDDEN); };
        Cell.show = function () { if (this.element) this.element.classList.remove(HIDDEN); };
      }
      if (col) {
        const Col = Object.getPrototypeOf(col);
        // every width Tabulator writes (measured, fitted, dragged, given) is rounded up to the grid (utils/grid.js)
        const setActual = Col.setWidthActual;
        // and a changed width tells the grid's group rows (their cells follow the columns; table.plxOnColumns, once a frame)
        Col.setWidthActual = function (w) {
          const out = setActual.call(this, typeof w === 'number' && w > 0 ? snapToGrid(w, { round: 'up', el: this.table.element }) : w);
          const t = this.table;
          t.plxColsVer = (t.plxColsVer || 0) + 1;
          if (t.plxOnColumns && !t.plxColsFrame) t.plxColsFrame = requestAnimationFrame(() => { t.plxColsFrame = 0; if (!t.destroyed && t.plxOnColumns) t.plxOnColumns(); });
          return out;
        };
        // a column's width, minimum and maximum are Tabulator's (setWidthActual, setMinWidth, setMaxWidth stay)
        ['setHeight', 'verticalAlign', 'clearVerticalAlign', 'matchChildWidths', 'checkCellHeights'].forEach((n) => { if (typeof Col[n] === 'function') Col[n] = OFF; });
        const hide = Col.hide, show = Col.show;
        Col.hide = function () { hide.apply(this, arguments); if (this.element) { this.element.classList.add(HIDDEN); keepWidths(this.element); } };
        Col.show = function () { show.apply(this, arguments); if (this.element) { this.element.classList.remove(HIDDEN); keepWidths(this.element); } };
      }
      if (row) {
        const R = Object.getPrototypeOf(row);
        ['setCellHeight', 'normalizeHeight', 'reinitializeHeight', 'calcHeight'].forEach((n) => { if (typeof R[n] === 'function') R[n] = OFF; });
        // a row's height is its row height step's (the virtual renderer counts with it); a basic grid never asks
        const height = R.getHeight;
        R.getHeight = function () { return this.table.rowManager.renderMode === 'virtual' ? hOf(this.table, this) : height.call(this); };
      }
      const CM = Object.getPrototypeOf(probe.columnManager);
      ['verticalAlignHeaders'].forEach((n) => { if (typeof CM[n] === 'function') CM[n] = OFF; });
      // every renderer styles a row before it draws it: a grouped grid lays its group rows out first (flags, classes), and
      // a group row's own measuring and header margin are switched off (its height is its kind's token)
      const renderer = probe.rowManager.renderer, RB = renderer && Object.getPrototypeOf(Object.getPrototypeOf(renderer));
      if (RB && typeof RB.styleRow === 'function') {
        const styleRow = RB.styleRow;
        RB.styleRow = function (row) {
          if (row && row.type === 'group') { patchGroup(row); groupLayout(this.table, this.rows()); if (this.table.plxOnGroupDraw) this.table.plxOnGroupDraw(row); }
          return styleRow.apply(this, arguments);
        };
      }
      const RM = Object.getPrototypeOf(probe.rowManager);
      ['normalizeHeight'].forEach((n) => { if (typeof RM[n] === 'function') RM[n] = OFF; });
      // the body's size is the stylesheet's: nothing is written; the renderer still learns how tall its view is
      RM.adjustTableSize = function () { if (this.renderer && typeof this.renderer.resize === 'function') this.renderer.resize(); return false; };
      // the virtual renderer: a grid with a room (its tableholder has a maximum block size: data-plx-height, or the room
      // fill and load-more measure) counts as one
      const init = RM.initializeRenderer;
      RM.initializeRenderer = function () {
        init.apply(this, arguments);
        if (this.renderMode === 'virtual' && this.renderer && 'vDomTopPad' in this.renderer) { this.fixedHeight = true; hookVirtual(this.renderer); }
        // the basic renderer's width for a body of group rows only: the stylesheet's (the body is as wide as its rows)
        else if (this.tableElement && !this.tableElement.plxStrict) { this.tableElement.plxStrict = true; Object.defineProperty(this.tableElement.style, 'minWidth', { configurable: true, get: () => '', set: OFF }); }
      };
      // a column's resize handle (Tabulator's) sits inside its header, at its end edge: a header row holds only column
      // headers (ARIA), and the handle is a separator that names its column
      if (probe.modules.resizeColumns) {
        const RC = Object.getPrototypeOf(probe.modules.resizeColumns), initCol = RC.initializeColumn, reinitCol = RC.reinitializeColumn;
        const inside = (column) => { const h = column && column.modules.resize && column.modules.resize.handleEl; if (h && column.element && h.parentNode !== column.element) column.element.appendChild(h); };
        RC.initializeColumn = function (type, component, column) { initCol.apply(this, arguments); if (type === 'header') inside(column); };
        RC.reinitializeColumn = function (column) { reinitCol.apply(this, arguments); inside(column); };
      }
      if (probe.modules.frozenRows) { const FR = Object.getPrototypeOf(probe.modules.frozenRows); FR.resizeHolderWidth = OFF; }
      // pinned columns: classes, and the widths before it as data-plx-sticky
      if (probe.modules.frozenColumns) {
        const FC = Object.getPrototypeOf(probe.modules.frozenColumns);
        FC.layoutElement = function (el, column) {
          if (!column.modules.frozen || !el) return;
          const left = this.leftColumns.filter((c) => c.visible !== false), at = left.indexOf(column);
          const before = at > 0 ? left.slice(0, at).map(widthName) : [];
          el.classList.add('tabulator-frozen');
          el.classList.toggle('tabulator-frozen-left', at === left.length - 1);
          if (before.length && before.every(Boolean)) el.setAttribute('data-plx-sticky', before.join('+')); else el.removeAttribute('data-plx-sticky');
        };
        FC.adjustForScrollbar = OFF;
      }
      // tree rows: no spacer, no indent written; the level is a class and the tree cell is marked
      if (probe.modules.dataTree) {
        const DT = Object.getPrototypeOf(probe.modules.dataTree), dtInit = DT.initialize;
        DT.initialize = function () { dtInit.apply(this, arguments); this.branchEl = null; };
        DT.layoutRow = function (r) {
          const cfg = r.modules.dataTree; if (!cfg) return;
          const target = this.elementField ? r.getCell(this.elementField) : r.getCells()[0];
          if (!target) return;
          const cellEl = target.getElement();
          if (cfg.branchEl) { if (cfg.branchEl.parentNode) cfg.branchEl.parentNode.removeChild(cfg.branchEl); cfg.branchEl = false; }
          if (cfg.controlEl) { if (cfg.controlEl.parentNode) cfg.controlEl.parentNode.removeChild(cfg.controlEl); cfg.controlEl = false; }
          this.generateControlElement(r, cellEl);
          cellEl.classList.add('plx-data-table__tree-cell');
          const el = r.getElement();
          Array.from(el.classList).filter((c) => /^tabulator-tree-level-\d+$/.test(c)).forEach((c) => el.classList.remove(c));
          el.classList.add('tabulator-tree-level-' + cfg.index);
        };
      }
      // popups: the top layer and CSS anchor positioning against what opened them
      const menu = probe.modules.menu;
      const sample = menu && typeof menu.popup === 'function' ? menu.popup(doc.createElement('div')) : null;
      if (sample) {
        const P = Object.getPrototypeOf(sample), hide = P.hide;
        P.show = function (origin) {
          if (this.destroyed || this.table.destroyed) return this;
          let anchor = origin instanceof win.HTMLElement ? origin : null;
          if (!anchor && origin && origin.target && origin.target.closest) anchor = origin.target.closest('.tabulator-cell, .tabulator-col, .tabulator-group, .tabulator-row');
          if (!anchor && this.parent && this.parent.element) anchor = this.parent.element;
          doc.querySelectorAll('.plx-data-table__popup-anchor').forEach((a) => a.classList.remove('plx-data-table__popup-anchor'));
          if (anchor) anchor.classList.add('plx-data-table__popup-anchor');
          this.anchorEl = anchor;
          this.element.classList.add('plx-data-table__popup');
          if (typeof this.element.showPopover === 'function') this.element.setAttribute('popover', 'manual');
          this.container.appendChild(this.element);
          if (typeof this.element.showPopover === 'function') { try { this.element.showPopover(); } catch (e) { /* already shown */ } }
          if (typeof this.renderedCallback === 'function') this.renderedCallback();
          this.visible = true;
          this.subscribe('table-destroy', this.destroyBinding);
          this.element.addEventListener('mousedown', (e) => { e.stopPropagation(); });
          if (this.element.classList.contains('tabulator-menu')) menuKeys(this, doc);
          return this;
        };
        P.hide = function () {
          if (this.anchorEl) this.anchorEl.classList.remove('plx-data-table__popup-anchor');
          // a menu gives the focus back to what opened it (a header opened from the keyboard, a row handle)
          const back = this.plxReturn, inside = this.element && this.element.contains(doc.activeElement);
          this.plxReturn = null;
          if (back && inside && back.isConnected) { try { back.focus({ preventScroll: true }); } catch (e) { /* gone */ } }
          if (typeof this.element.hidePopover === 'function') { try { this.element.hidePopover(); } catch (e) { /* not shown */ } }
          return hide.apply(this, arguments);
        };
        P._fitToScreen = OFF; P.applyOffset = OFF;
      }
    } finally {
      try { probe.destroy(); } catch (e) { /* gone */ }
      if (probeEl.parentNode) probeEl.parentNode.removeChild(probeEl);
    }
  };
  // the probe builds synchronously in Tabulator 6 when its element is in the page; tableBuilt follows
  probe.on('tableBuilt', () => { finish(); resolveDone(); });
  return done.get(Tabulator);
}
