/* Plenix · DataTable engine integration
   Summary: Tabulator owns row measurement and virtual rendering; Plenix supplies token sizes and column layout.
   Usage: strictTabulator(Tabulator, win); syncGeometry(table); virtualPrint(table, on).
   Props: Table instances use token-derived rowHeight and viewport options.
   Behavior: Keeps grid-snapped column widths, frozen-column classes, tree semantics and accessible anchored menus.
   Notes: Group decoration preserves existing add rows/gaps; it does not replace the virtual renderer's measurements. */
import { SIZE_STEPS } from '../../utils/sizeSteps.js';
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
// Group flags decorate native display rows. No prefix sums or token-height renderer bookkeeping.
export function groupLayout(table) {
  const rm = table && table.rowManager; if (!rm || !table.options.groupBy) return;
  const rows = rm.getDisplayRows(), before = table.plxLayout;
  if (before && before.rows === rows && before.n === rows.length && before.last === rows[rows.length-1] && before.adds === !!table.plxAddRows) return;
  table.plxLayout = {rows,n:rows.length,last:rows[rows.length-1],adds:!!table.plxAddRows};
  rows.forEach((r,i) => {
    if (r.type !== 'group') return;
    const prev = rows[i-1];
    r.plxGap = !!prev && !(prev.type === 'group' && r.parent === prev);
    r.plxAddFor = table.plxAddRows && prev && prev.type === 'row' && prev.modules.group ? prev.modules.group : null;
    if (r.element) { r.element.classList.toggle('plx-data-table__group--gap',r.plxGap); r.element.classList.toggle('plx-data-table__group--add',!!r.plxAddFor); }
  });
  const last = rows[rows.length-1];table.plxTailFor = table.plxAddRows && last && last.type === 'row' && last.modules.group ? last.modules.group : null;
  if (table.plxOnGroupLayout) table.plxOnGroupLayout();
}
// Called once per frame after native rendering; use the native window and actual displayed offsets for sticky headings.
export function groupAt(table, top) {
  if (!table || !table.options.groupBy) return null;
  const rm=table.rowManager, r=rm.renderer, rows=rm.getDisplayRows();
  for (let i=r.vDomTop||0;i<=Math.min(rows.length-1,r.vDomBottom??rows.length-1);i++) {
    const row=rows[i], el=row.element;
    if (el && el.isConnected && el.offsetTop+el.offsetHeight>top) return {index:i,row,offset:el.offsetTop};
  }
  return null;
}
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

// A density/row-height change is passed to native row normalization, then redrawn once.
export function syncGeometry(table) {
  if (!table) return;
  const probe=table.plxProbe && table.plxProbe.querySelector('[data-plx-probe="record"]');
  const value=probe ? parseFloat(probe.ownerDocument.defaultView.getComputedStyle(probe).blockSize) : tokenPx('--plx-comp-data-table-record-height',table.element);
  if (table.options.rowHeight) table.options.rowHeight=snapToGrid(value,{el:table.element});
  table.blockRedraw();
  try { table.rowManager.rows.forEach(row=>row.reinitializeHeight()); table.rowManager.getDisplayRows().filter(row=>row.type==='group').forEach(group=>group.reinitialize()); } finally { table.restoreRedraw(); }
  table.redraw();
}
// Native rendering draws every loaded record for printing and restores its own virtual window afterward.
export function virtualPrint(table, on) {
  const rm=table && table.rowManager;if(!rm || rm.renderMode!=='virtual')return;
  if(on){table.plxPrint={fixed:rm.fixedHeight,top:rm.element.scrollTop,max:table.options.maxHeight,height:table.options.height};rm.fixedHeight=false;table.options.maxHeight=false;table.setHeight(false);}
  else if(table.plxPrint){rm.fixedHeight=table.plxPrint.fixed;table.options.maxHeight=table.plxPrint.max;table.setHeight(table.plxPrint.height);}
  table.redraw();
  if(!on && table.plxPrint){rm.element.scrollTop=table.plxPrint.top;delete table.plxPrint;}
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
      const CM = Object.getPrototypeOf(probe.columnManager);
      ['verticalAlignHeaders'].forEach((n) => { if (typeof CM[n] === 'function') CM[n] = OFF; });
      // every renderer styles a row before it draws it: a grouped grid lays its group rows out first (flags, classes), and
      // a group row's own measuring and header margin are switched off (its height is its kind's token)
      const renderer = probe.rowManager.renderer, RB = renderer && Object.getPrototypeOf(Object.getPrototypeOf(renderer));
      if (RB && typeof RB.styleRow === 'function') {
        const styleRow = RB.styleRow;
        RB.styleRow = function (row) {
          if (row && row.type === 'group') { groupLayout(this.table); if (this.table.plxOnGroupDraw) this.table.plxOnGroupDraw(row); }
          const result=styleRow.apply(this, arguments);
          row.getElement().setAttribute('aria-rowindex',String(arguments[1]+2));
          return result;
        };
      }
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
