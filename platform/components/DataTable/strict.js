/* Plenix · DataTable strict mode (strict.js)
   Summary: Tabulator drawn by Plenix (Strict DS 6b, batch 285; geometry split, owner 2026-10-13): Tabulator keeps its
     data, sorting, filtering, selection, editing, grouping and tree, measures the columns' content and sizes and resizes
     the columns; Plenix owns everything else. Tabulator writes a column's width (width, min-width, max-width on its
     column, header and cell elements: a JavaScript adjustment from measured layout); every other geometry write it makes
     (row heights, padding, positions) is switched off here, once per window, and the Plenix stylesheet draws the grid from
     classes and tokens.
   Usage:
     strictTabulator(Tabulator, win)   // loadTabulator does it before the first grid is built
     virtualResync(table)              // a density change: the virtual renderer takes the new row height
     virtualPrint(table, true|false)   // before / after printing: every row in the document, then the window again
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
     Row height and cell padding (Plenix's): never measured, never written. A row is the density's row height
       (--plx-sys-data-table-row-height plus its line); the stylesheet draws it.
     Virtual rendering (renderVertical "virtual": a grid with a room, its height or the room fill and load-more measure):
       Tabulator renders the rows in view; every row counts as the density row height (read from the tokens, not from the
       rows); the room for the rows not drawn is two
       gaps of the system's virtualization (system/virtual.css: pieces of 1, 2, 4 … rows, data-plx-span), never padding.
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
// one row's block size: the density's row height and its line (read from the tokens, never from a row)
function rowPx(table) {
  if (!table.plxRowPx) table.plxRowPx = tokenPx('--plx-sys-data-table-row-height', table.element) + tokenPx('--plx-comp-data-table-line-width', table.element);
  return table.plxRowPx || 1;
}

// the lead column (the checkbox column, a mark column): its width is the lead token, from its classes
const isLead = (c) => !!c.isRowHeader || /__cell--select|__cell--icon|__w-lead/.test(String((c.definition && c.definition.cssClass) || ''));
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
function fillGap(box, n) {
  const pieces = gapPieces(n), key = pieces.join();
  if (box.plxHave === key) return;
  box.plxHave = key; box.textContent = '';
  pieces.forEach((p) => { const d = box.ownerDocument.createElement('div'); d.className = 'plx-virtual-gap__piece'; d.setAttribute('data-plx-span', String(p)); box.appendChild(d); });
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
  if (te.firstChild !== r.plxTop) te.insertBefore(r.plxTop, te.firstChild);
  if (te.lastChild !== r.plxBottom) te.appendChild(r.plxBottom);
  fillGap(r.plxTop, drawn ? r.vDomTop : 0);
  fillGap(r.plxBottom, drawn ? Math.max(0, total - 1 - r.vDomBottom) : total);
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

// the renderer's own add and remove steps, at the density row height (no row is measured, no padding is written)
function addTop(rows, room) {
  const te = this.tableElement, h = rowPx(this.table);
  let n = this.vDomTop - 1, chain = 0, added = 0;
  while (this.vDomTop && rows[n] && chain < this.vDomMaxRenderChain && room >= h) {
    const row = rows[n];
    this.styleRow(row, n);
    te.insertBefore(row.getElement(), this.plxTop.parentNode === te ? this.plxTop.nextSibling : te.firstChild);
    row.initialize();
    room -= h; added += h; this.vDomTop--; n--; chain++;
  }
  if (added) { this.vDomTopPad = this.vDomTop * h; this.vDomScrollPosTop -= added; }
  sync(this);
}
function removeTop(rows, room) {
  const h = rowPx(this.table), out = [];
  let chain = 0, gone = 0;
  while (rows[this.vDomTop] && this.vDomTop < this.vDomBottom && chain < this.vDomMaxRenderChain && room >= h) {
    out.push(rows[this.vDomTop]); this.vDomTop++; room -= h; gone += h; chain++;
  }
  park(this, out);
  out.forEach((row) => row.detachElement());
  if (gone) { this.vDomTopPad = this.vDomTop * h; this.vDomScrollPosTop += this.vDomTop ? gone : gone + this.vDomWindowBuffer; }
  sync(this);
}
function addBottom(rows, room) {
  const te = this.tableElement, h = rowPx(this.table);
  let n = this.vDomBottom + 1, chain = 0, added = 0;
  while (rows[n] && chain < this.vDomMaxRenderChain && room >= h) {
    const row = rows[n];
    this.styleRow(row, n);
    te.insertBefore(row.getElement(), this.plxBottom.parentNode === te ? this.plxBottom : null);
    row.initialize();
    room -= h; added += h; this.vDomBottom++; n++; chain++;
  }
  if (added) { this.vDomBottomPad = Math.max(0, (rows.length - 1 - this.vDomBottom) * h); this.vDomScrollPosBottom += added; }
  sync(this);
}
function removeBottom(rows, room) {
  const h = rowPx(this.table), out = [];
  let chain = 0, gone = 0;
  while (rows[this.vDomBottom] && this.vDomBottom > this.vDomTop && chain < this.vDomMaxRenderChain && room >= h) {
    out.push(rows[this.vDomBottom]); this.vDomBottom--; room -= h; gone += h; chain++;
  }
  park(this, out);
  out.forEach((row) => row.detachElement());
  if (gone) { this.vDomBottomPad = (rows.length - 1 - this.vDomBottom) * h; this.vDomScrollPosBottom -= gone; }
  sync(this);
}

const patchedRenderers = new WeakSet();
function patchVirtualClass(V) {
  if (patchedRenderers.has(V)) return;
  patchedRenderers.add(V);
  const fill = V._virtualRenderFill, clear = V.clearRows, rerender = V.rerenderRows;
  V._virtualRenderFill = function () { if (this.plxTop) park(this); this.vDomRowHeight = rowPx(this.table); fill.apply(this, arguments); if (this.plxTop) sync(this); };
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

// a density change: the rows are already their new height (CSS); the renderer takes it, and the row that was at the top
// of the view stays there
export function virtualResync(table) {
  const r = table && table.rowManager && table.rowManager.renderer;
  if (!r || !r.plxTop) return;
  const before = table.plxRowPx || rowPx(table), top = r.elementVertical.scrollTop;
  table.plxRowPx = 0;
  const now = rowPx(table);
  r.vDomRowHeight = now;
  if (now === before) { sync(r); return; }
  const index = Math.floor(top / before), into = (top - index * before) * now / before;
  if (r.rows().length) r._virtualRenderFill(index, true, into); else sync(r);
}
// printing: every row in the document while the page prints, then the rows in view again
export function virtualPrint(table, on) {
  const rm = table && table.rowManager, r = rm && rm.renderer;
  if (!r || !r.plxTop) return;
  if (on) { r.plxPrintTop = Math.floor(r.elementVertical.scrollTop / rowPx(table)); rm.fixedHeight = false; r._virtualRenderFill(); }
  else { rm.fixedHeight = true; r._virtualRenderFill(r.plxPrintTop || 0, true); }
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
        Col.setWidthActual = function (w) { return setActual.call(this, typeof w === 'number' && w > 0 ? snapToGrid(w, { round: 'up', el: this.table.element }) : w); };
        // a column's width, minimum and maximum are Tabulator's (setWidthActual, setMinWidth, setMaxWidth stay)
        ['setHeight', 'verticalAlign', 'clearVerticalAlign', 'matchChildWidths', 'checkCellHeights'].forEach((n) => { if (typeof Col[n] === 'function') Col[n] = OFF; });
        const hide = Col.hide, show = Col.show;
        Col.hide = function () { hide.apply(this, arguments); if (this.element) { this.element.classList.add(HIDDEN); keepWidths(this.element); } };
        Col.show = function () { show.apply(this, arguments); if (this.element) { this.element.classList.remove(HIDDEN); keepWidths(this.element); } };
      }
      if (row) {
        const R = Object.getPrototypeOf(row);
        ['setCellHeight', 'normalizeHeight', 'reinitializeHeight', 'calcHeight'].forEach((n) => { if (typeof R[n] === 'function') R[n] = OFF; });
        // a row's height is the density's (the virtual renderer counts with it); a basic grid never asks
        const height = R.getHeight;
        R.getHeight = function () { return this.table.rowManager.renderMode === 'virtual' ? rowPx(this.table) : height.call(this); };
      }
      const CM = Object.getPrototypeOf(probe.columnManager);
      ['verticalAlignHeaders'].forEach((n) => { if (typeof CM[n] === 'function') CM[n] = OFF; });
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
          return this;
        };
        P.hide = function () {
          if (this.anchorEl) this.anchorEl.classList.remove('plx-data-table__popup-anchor');
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
