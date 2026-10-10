/* Plenix · DataTable strict mode (strict.js)
   Summary: Tabulator drawn by Plenix (Strict DS 6b, batch 285): Tabulator keeps its data, sorting, filtering, selection,
     editing, grouping and tree, but writes no style: every geometry write it makes is switched off here, once per window,
     and the Plenix stylesheet draws the grid from classes and tokens (data-table.css, table.css, system/steps.css).
   Usage:
     strictTabulator(Tabulator, win)   // loadTabulator does it before the first grid is built
   Props:
     none: strictTabulator(Tabulator, win) patches that window's Tabulator once
   Behavior:
     Off: cell and column widths, heights and alignment; row heights; header vertical alignment; the body's sizing and the
       virtual renderer's padding (DataTable renders rows with the basic renderer); the frozen-rows holder's width.
     Pinned (frozen) columns: classes only (tabulator-frozen, data-plx-sticky naming the widths before it); the stylesheet
       makes them sticky at that offset.
     Tree rows: no branch spacer and no indent written; the row's level is its tabulator-tree-level-N class and the tree
       cell (plx-data-table__tree-cell) is indented by the stylesheet.
     Popups (menus, the header filter): no coordinates. The popup opens in the top layer (popover) and is placed by CSS
       anchor positioning against the cell, header or button that opened it.
   Notes:
     The patches are found from a probe table built once (Tabulator's classes are not exported), then the probe is removed.
*/

const OFF = function () {};
const done = new WeakMap();   // Tabulator -> the promise of its patches

// the width token class a column carries (plx-data-table__w-<size> or the lead column), for a pinned column's offset
function widthName(column) {
  const css = String((column.definition && column.definition.cssClass) || '');
  if (/__cell--select|__cell--icon|__w-lead/.test(css)) return 'lead';
  const m = /__w-(\d+px)/.exec(css);
  return m ? m[1] : null;
}

export function strictTabulator(Tabulator, win) {
  if (!Tabulator) return Promise.resolve();
  if (done.has(Tabulator)) return done.get(Tabulator);
  let resolveDone; done.set(Tabulator, new Promise((r) => { resolveDone = r; }));
  const doc = win.document;
  const probeEl = doc.createElement('div');
  probeEl.className = 'plx-visually-hidden';
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
        ['setWidth', 'setMinWidth', 'setMaxWidth', 'setHeight', 'clearWidth'].forEach((n) => { if (typeof Cell[n] === 'function') Cell[n] = OFF; });
        // a cell's alignment is a class (DataTable maps hozAlign to plx-data-table__cell--align-*): nothing written
        const configure = Cell._configureCell;
        Cell._configureCell = function () { configure.apply(this, arguments); if (this.element) this.element.removeAttribute('style'); };
      }
      if (col) {
        const Col = Object.getPrototypeOf(col);
        Col.setWidthActual = function (w) { this.width = w; this.widthStyled = ''; };
        ['setMinWidth', 'setMaxWidth', 'setHeight', 'verticalAlign', 'clearVerticalAlign', 'matchChildWidths', 'checkCellHeights'].forEach((n) => { if (typeof Col[n] === 'function') Col[n] = OFF; });
      }
      if (row) ['setCellHeight', 'normalizeHeight', 'reinitializeHeight', 'calcHeight'].forEach((n) => { const R = Object.getPrototypeOf(row); if (typeof R[n] === 'function') R[n] = OFF; });
      const CM = Object.getPrototypeOf(probe.columnManager);
      ['verticalAlignHeaders'].forEach((n) => { if (typeof CM[n] === 'function') CM[n] = OFF; });
      const RM = Object.getPrototypeOf(probe.rowManager);
      ['normalizeHeight', 'adjustTableSize'].forEach((n) => { if (typeof RM[n] === 'function') RM[n] = OFF; });
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
        const DT = Object.getPrototypeOf(probe.modules.dataTree), init = DT.initialize;
        DT.initialize = function () { init.apply(this, arguments); this.branchEl = null; };
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
