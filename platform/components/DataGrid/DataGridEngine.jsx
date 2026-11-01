/* Plenix · DataGridEngine (TanStack)
   Summary: The React-owned renderer behind the public DataGrid and static Table.
   Usage: <DataGridEngine label="People" data={people} columns={columns} selectable />
   Props: label/data/columns/index, selection and view state, rowHeight/wrapHeaders, narrow layout, fill/pages/load-more,
     groupBy, tree/childrenField/treeColumn, editable columns, row menus, storageKey, fetchRows and loading/error state.
     onRowClick(record,event), onRowDoubleClick(record,event), onCellEdit(record,change) receive application records.
   Behavior: TanStack owns row models and column state; TanStack Virtual chooses the rendered window. Existing
     token-sized CSS gaps represent missing rows. An automatic viewport is bounded by its allocated pane as well as the browser. Opening saved state is supplied on the very first render. Search filtering is deferred so typing stays responsive;
     controlled sort state and the numeric text collator are reused across search updates.
   Notes: Own Plenix markup and stylesheet use the existing table tokens. Applications use the public DataGrid entry point.
     A part takes the grid's modes and its row's state as its own classes (zero overlap, data-grid.css): a record row
     __grid-row--narrow (the list) and --virtual (the drawn window); every cell of it __grid-cell--narrow, --sized (a row
     height step) and --lines (a step taller than short), the first after the checkbox --after-lead, a plain value
     directly inside --bare, a nested row's tree cell __tree-cell--level-N; a value __value--wrap, --sized and --lines;
     row actions sit in __portal--actions; the checkbox input is __check-input. The grid, the scroll body and the table
     take the fill and the drawn window as __grid--fill, __grid-tableholder--fill, __grid-table--virtual and --narrow.
     A group's head is __group-head--gap after a band (not in its sticky copy), its label __group-label--level-N, its
     cells --narrow in the list, the add row's cell __group-cell--add; the eyebrow is the grid's own span. A custom cell's
     own element takes __cell-content (a link alone in a cell fills it); a data cell (kind data, type bytes) is
     __grid-cell--data, the data role in Mono. Table (isStatic) marks its parts --static: the root, grid, header, headers, columns, their
     contents and titles, the body, the table, rows, cells, values and the placeholder. */
import React from 'react';
import { useUnread } from './unread.js';
import { GridPane } from './room.js';
import { flushSync } from 'react-dom';
import { Scrollbars } from './scrollbars.jsx';
import { useSortable } from '../../utils/dnd.ts';

import { cx } from '../../utils/cx.ts';
import { gridPx, snapToGrid, gridStep } from '../../utils/grid.ts';

import { tokenPixels } from './environment.js';

import { MenuItem, MenuDivider } from '../Menu/Menu.jsx';

import { opening, recordKey, valueAt } from './state.js';
import { createAdapter } from './adapter.js';
import { valueText } from './cells.jsx';
import { recordsOf } from './records.js';
import { useStrings } from '../../providers/LocaleProvider.tsx';
import { EMPTY_ROWS, GRID, kinds, lengthName, typeOf } from './engine/helpers.jsx';
import { pillFont, pillSheet } from './engine/pill.js';
import { useVirtualizer } from './engine/useVirtualizer.js';
import { useSelection, selectionActions } from './engine/useSelection.js';
import { useColumns } from './engine/useColumns.js';
import { useEditedRows, editActions, useEditEffect } from './engine/useEditing.js';
import { useSorting } from './engine/useSorting.js';
import { sortActions } from './engine/sortActions.js';
import { useGrouping } from './engine/useGrouping.js';
import { groupActions } from './engine/groupActions.js';
import { useRowModel } from './engine/useRowModel.js';
import { useViewSync } from './engine/useViewSync.js';
import { columnSizing } from './engine/columnSizing.js';
import { syncLive } from './engine/liveState.js';
import { useRemoteRows } from './engine/useRemoteRows.js';
import { useTableModel } from './engine/useTableModel.js';
import { bodyRows } from './engine/bodyRows.jsx';
import { headerRows } from './engine/headerRows.jsx';
import { manageDialog, failureState, viewMenu, emptyRow, moreRow, pagesFooter, loadMoreFooter } from './engine/chrome.jsx';
import { makeFocusCell, tableKeys } from './engine/keys.js';
import { Check, MemoGridRow, RowGap, Width, WidthPixels } from './engine/parts.jsx';

function NextEngine(props) {
  const inPane = React.useContext(GridPane);
  const {
    label,
    data = EMPTY_ROWS,
    columns,
    index = 'id',
    selectable = false,
    selected,
    keepHiddenSelection = true,
    onSelectionChange,
    options = {},
    mode = 'fill',
    height,
    narrow: requestedNarrow,
    narrowAt = '--plx-ref-size-600px',
    keyColumns,
    storageKey,
    isStatic = false,
    cells = 'text',
    headerMenu = true,
    typeIcons: typeIconsProp,
    density = 'compact',
    uniformPillWidths: _uniformPillWidths,
    rowMenu: suppliedRowMenu,
    rowMenuButton = true,
    columnMenu,
    onReady,
    on = {},
    className,
    empty,
    error,
    onRetry
  } = props;
  const showTypes = typeIconsProp ?? !isStatic; // the column type icons: a DataGrid's sort and filter cue, not a static Table's
  const narrow = requestedNarrow === undefined ? (inPane && !isStatic ? 'table' : 'list') : requestedNarrow;
  const B = isStatic ? 'plx-table' : GRID; // Table (static) and DataGrid: each its own block (owner, 2026-10-19)
  const S = useStrings('dataGrid', props.strings),
    initial = React.useMemo(() => opening(props), [storageKey]);
  const frame = React.useRef(null),
    holder = React.useRef(null),
    header = React.useRef(null),
    live = React.useRef({}),
    ready = React.useRef(false);
  const warnedActions = React.useRef(new Set()),
    viewportId = React.useId(),
    displayElements = React.useRef(new Map()),
    parkedFocus = React.useRef(null),
    printView = React.useRef(null);
  const deliveredReady = React.useRef(null);
  const listeners = React.useRef(new Map()),
    rowElements = React.useRef(new Map()),
    headerElements = React.useRef(new Map());

  const { setSorting, sortSignal, setSortOwner, sorting, sortingRef } = useSorting({ initial, props });
  const [rowHeight, setRowHeight] = React.useState(initial.rowHeight),
    [wrapHeaders, setWrapHeaders] = React.useState(initial.wrapHeaders);
  // Wrap text, per column (owner, 2026-10-24): the column's wrap prop or kind "wrap" is the default; the column menu turns it on or off
  // the cut cell under the pointer or focus ("rowId|field") and its popover (owner, 2026-10-24: a popover with the full text)
  const [cutAt, setCutAt] = React.useState(null),
    cutOpen = React.useRef(false);
  const [wrapColumns, setWrapColumns] = React.useState(() => props.wrapColumns || initial.wrapColumns || {});
  const wrapOf = (c) => (props.wrapColumns || wrapColumns)[c.field] ?? (c.wrap === true || kinds(c).includes('wrap'));
  const kindsOf = (c) => {
    const k = kinds(c).filter((x) => x !== 'wrap');
    return wrapOf(c) ? k.concat('wrap') : k;
  };
  const changeWrap = (next) => {
    setWrapColumns(next);
    props.onViewChange?.({ wrapColumns: next });
    props.onWrapColumnsChange?.(next);
    // wrapped text needs room: a Short grid moves to Medium (2 lines) when a column starts wrapping
    if (Object.values(next).some(Boolean) && !props.rowHeight && (effectiveStep || 'short') === 'short') {
      setRowHeight('medium');
      props.onViewChange?.({ rowHeight: 'medium' });
    }
  };
  const [filterField, setFilterField] = React.useState(null),
    [managing, setManaging] = React.useState(false);
  const [expanded, setExpanded] = React.useState(props.treeExpanded ?? false);

  const { setGroups, setGroupOwner, collapsed, setCollapsed, groupSignal, groupBy } = useGrouping({
    initial,
    props,
    options,
  });
  const [loaded, setLoaded] = React.useState(props.pageSize || 50),
    [printing, setPrinting] = React.useState(false);

  const childField = props.tree ? props.childrenField || 'children' : null;
  const [filters, setFilters] = React.useState([]),
    [page, setPage] = React.useState(0),
    [pageSize, setPageSize] = React.useState(props.pageSize || 50);

  // a sort, filter, search or page size change starts again from page 1 in the same render as the change (issue 614), so
  // no request for the old page number with the new search or filter goes out first
  const resetBy = [sortSignal, props.filter, JSON.stringify(filters), props.search, pageSize],
    [resetSeen, setResetSeen] = React.useState(resetBy);
  if (resetBy.some((value, i) => !Object.is(value, resetSeen[i]))) {
    setResetSeen(resetBy);
    if (page !== 0) setPage(0);
  }
  const [metrics, setMetrics] = React.useState({ row: 0, line: 0, lead: 0, menu: 0, min: 0, space: 0, room: 0 }),
    [isNarrow, setNarrow] = React.useState(false);
  // One conversion per distinct width and measured environment, shared by every visible cell.
  const widthPixels = React.useMemo(() => {
    const cache = new Map();
    return (value) => {
      if (!cache.has(value)) cache.set(value, gridPx(value, { el: frame.current || document.documentElement }));
      return cache.get(value);
    };
  }, [metrics]);
  const effectiveStep = props.rowHeight || rowHeight,
    effectiveWrap = props.wrapHeaders ?? wrapHeaders;

  const deferredFilter = React.useDeferredValue(props.filter);

  // rows from a server: a page at a time ("pages"), appended by Load more ("load-more"), or appended as the person scrolls
  // near the end ("fill", issue 522: one list, no page controls)
  const { fetching, remoteBusy, remote, remoteError, setRetry, remoteMode, scrollFill } = useRemoteRows({
    props,
    mode,
    page,
    pageSize,
    sorting,
    filters
  });
  const incoming = remoteMode ? remote?.rows || EMPTY_ROWS : data;
  const { setEdited, editing, setEditing, mutations, pendingEdit, source } = useEditedRows(incoming);
  const canonical = React.useMemo(() => recordsOf(source, index, childField), [source, index, childField]);
  // TanStack tries a global filter against columns; the public predicate describes a record, so evaluate it once.
  const unreadKey = React.useCallback((record) => record[index], [index]);
  const [ownOpen, setOwnOpen] = React.useState(null);
  const unread = useUnread(canonical, unreadKey, props),
    [localUnreadOnly, setUnreadOnly] = React.useState(false);
  const unreadOnly = props.unreadOnly ?? localUnreadOnly;
  const activeFilter = React.useMemo(
    () => (unreadOnly ? { keys: unread.keys, filter: deferredFilter } : deferredFilter),
    [unreadOnly, unread.keys, deferredFilter]
  );
  const rowMenu =
    unread.enabled && !isStatic
      ? (record) => [
          ...(typeof suppliedRowMenu === 'function' ? suppliedRowMenu(record) : suppliedRowMenu || []),
          {
            label: unread.has(record) ? S.markRead : S.markUnread,
            onSelect: () => unread.mark([record], !unread.has(record))
          }
        ]
      : suppliedRowMenu;
  const recordFilter = React.useMemo(() => {
    const results = new WeakMap();
    return (row) => {
      const record = row.original;
      if (unreadOnly && !unread.has(record)) return false;
      if (typeof deferredFilter !== 'function') return true;
      if (!results.has(record)) results.set(record, !!deferredFilter(record));
      return results.get(record);
    };
  }, [deferredFilter, source, unreadOnly, unread.keys]);
  const recordPositions = React.useMemo(() => new Map(canonical.map((record, i) => [record, i])), [canonical]);
  const recordsByKey = React.useMemo(
    () => new Map(canonical.map((record) => [recordKey(record[index]), record])),
    [canonical, index]
  );
  const { replaceData, updateRecord, commitEdit } = editActions({
    incoming,
    source,
    canonical,
    index,
    childField,
    props,
    setEdited,
    setEditing,
    mutations,
    pendingEdit
  });

  const { changeGroups, toggleGroup } = groupActions({
    setGroupOwner,
    groupSignal,
    setGroups,
    setCollapsed,
    props,
    live,
    S,
  });
  const emit = (name, ...args) => {
    live.current.props.on?.[name]?.(...args);
    listeners.current.get(name)?.forEach((fn) => fn(...args));
  };
  const api = React.useMemo(() => createAdapter(live), []);
  api.getUnreadCount = () => unread.count;
  api.markRead = (keys) =>
    unread.mark(
      canonical.filter((record) => [].concat(keys).includes(record[index])),
      false
    );
  api.markUnread = (keys) =>
    unread.mark(
      canonical.filter((record) => [].concat(keys).includes(record[index])),
      true
    );

  const {
    sizing,
    autoSizing,
    setAutoSizing,
    floors,
    setFloors,
    columnOrder,
    columnVisibility,
    resize,
    changeOrder,
    changeVisibility,
    move,
    pinnedAt,
    orderAt,
    columnPinning
  } = useColumns({ initial, props, columns, frame, live, emit, api });
  const { selection, notifySelection, pick, selectionInfo, selectionAnchor } = useSelection({
    selected,
    live,
    canonical,
    index,
    options,
    onSelectionChange,
    emit,
    api
  });

  const { changeSort } = sortActions({ sorting, setSortOwner, sortSignal, setSorting, setPage, props, emit });

  const { table } = useTableModel({
    columns,
    sortingRef,
    metrics,
    floors,
    autoSizing,
    frame,
    source,
    index,
    childField,
    setExpanded,
    printing,
    expanded,
    sorting,
    columnOrder,
    columnVisibility,
    sizing,
    filters,
    activeFilter,
    page,
    pageSize,
    selection,
    columnPinning,
    changeSort,
    options,
    notifySelection,
    live,
    changeVisibility,
    changeOrder,
    resize,
    setFilters,
    setPage,
    recordFilter,
    deferredFilter,
    remoteMode,
    remote,
    mode
  });
  const allRows = (printing ? table.getPrePaginationRowModel() : table.getRowModel()).rows;
  // uniform pill widths (CTM, 2026-10-22; always on, owner uniform-pills-always-35): every standard pill of a column as wide as the
  // column's widest pill in the current view (the filtered, sorted page, every row of it, not only the rows drawn), so scrolling
  // a long list never changes it. The uniformPillWidths prop is accepted and ignored (deprecated).
  // Measured like the column widths (the pill's font, weight, sides, border and icon), snapped up to the grid, the text centered in it so the leftover splits between the two sides (#649).
  const gridKey = React.useId(),
    [fontsReady, setFontsReady] = React.useState(0);
  React.useEffect(() => {
    const fonts = frame.current?.ownerDocument.fonts;
    if (fonts && fonts.ready) fonts.ready.then(() => setFontsReady((n) => n + 1));
  }, []);
  React.useLayoutEffect(() => {
    const at = frame.current;
    if (!at || typeof CSSStyleSheet === 'undefined' || !at.ownerDocument.defaultView) return undefined; // a closed document (its frame removed): nothing to measure
    const store = pillSheet(at.ownerDocument);
    if (cells !== 'pill' || !metrics.row) {
      if (store.rules.delete(gridKey)) store.flush();
      return undefined;
    }
    const ctx = at.ownerDocument.createElement('canvas').getContext('2d'),
      faces = { data: pillFont(at, ctx, true), text: pillFont(at, ctx, false) },
      px = (name) => tokenPixels(name, at),
      step = gridStep(at);
    const sides =
        px('--plx-comp-data-pill-md-padding-inline-start') +
        px('--plx-comp-data-pill-md-padding-inline-end') +
        2 * px('--plx-comp-data-pill-border-width'),
      glyph = px('--plx-comp-data-pill-icon-size') + px('--plx-comp-data-pill-gap');
    const key = CSS.escape(gridKey),
      rules = [];
    columns.forEach((c) => {
      const k = kinds(c);
      if (
        c.render ||
        c.pill === false ||
        k.includes('tags') ||
        k.includes('badge') ||
        k.includes('deleted') ||
        k.includes('icon')
      )
        return;
      const data = k.includes('data') || ['number', 'currency', 'date', 'bytes'].includes(c.type);
      const face = faces[data ? 'data' : 'text'],
        scale = face.scale;
      ctx.font = face.font;
      ctx.wordSpacing = face.wordSpacing;
      let widest = 0;
      allRows.forEach((r) => {
        if (!r.original) return;
        const v = valueAt(r.original, c.field);
        if (v == null || v === '') return;
        widest = Math.max(widest, ctx.measureText(valueText(v)).width * scale);
      });
      if (!widest) return;
      const icon = c.type === 'person' || k.includes('avatar-name') || (showTypes && typeOf(c) !== 'text');
      rules.push(
        '[data-plx-grid-key="' +
          key +
          '"] .plx-data-pill[data-plx-pill-field="' +
          CSS.escape(c.field) +
          '"]{inline-size:' +
          snapToGrid(widest + sides + (icon ? glyph : 0), { round: 'up', step }) +
          'px;justify-content:center;}'
      );
    });
    store.rules.set(gridKey, rules.join('\n'));
    store.flush();
    return undefined;
  }, [cells, columns, allRows, metrics.row, metrics.space, showTypes, fontsReady]);
  React.useEffect(
    () => () => {
      const doc = frame.current?.ownerDocument || (typeof document !== 'undefined' ? document : null);
      if (doc && doc.__plxPillWidths && doc.__plxPillWidths.rules.delete(gridKey)) doc.__plxPillWidths.flush();
    },
    []
  );

  const virtualized = !isStatic && mode !== 'pages' && !isNarrow && !printing;
  const { loadedRows, groups, model } = useRowModel({
    mode,
    remoteMode,
    allRows,
    loaded,
    groupBy,
    columns,
    printing,
    collapsed,
    props,
  });
  const estimate = (row) =>
    row?.__group
      ? metrics.group + metrics.line * (row.__group.separated ? 2 : 1)
      : row?.__gap
        ? metrics.groupGap
        : row?.__add
          ? metrics.add + metrics.line
          : metrics.row + metrics.line;
  const virtual = useVirtualizer({
    count: model.length,
    getScrollElement: () => holder.current,
    estimateSize: (i) => estimate(model[i]),
    getItemKey: (i) => model[i]?.displayKey || model[i]?.id,
    overscan: 4,
    enabled: virtualized && metrics.row > 0,
    initialRect: { width: 0, height: 0 },
    initialOffset: () => printView.current?.top ?? holder.current?.scrollTop ?? 0
  });
  const semanticRows = model.filter((row) => !row.__gap),
    semanticIndex = new Map(semanticRows.map((row, i) => [row.displayKey || row.id, i + 2]));
  const virtualItems = virtual.getVirtualItems(),
    first = virtualized ? virtualItems[0]?.index || 0 : 0,
    last = virtualized
      ? (virtualItems[virtualItems.length - 1]?.index ?? Math.min(model.length, 1) - 1) + 1
      : model.length;
  const shown = virtualized ? model.slice(first, last) : model;
  const frozen = new Set(columnPinning.left),
    ordered = table.getLeftVisibleLeafColumns().concat(table.getCenterVisibleLeafColumns());
  const pinStart = (column) => (selectable ? metrics.lead : 0) + column.getStart('left');
  const widths = Object.fromEntries(ordered.map((column) => [column.id, column.getSize()]));
  const listable = (column) => !column.rowHandle && !kinds(column).some((kind) => ['icon', 'actions'].includes(kind));
  const keys = keyColumns?.length
    ? keyColumns
    : columns
        .filter((c) => !kinds(c).some((k) => ['icon', 'actions'].includes(k)) && !c.rowHandle)
        .slice(0, 3)
        .map((c) => c.field);
  const listed =
    narrow === 'auto'
      ? columns.some(listable)
      : narrow === 'list' && columns.some((column) => listable(column) && !keys.includes(column.field));
  const columnDnd = useSortable({
    items: ordered,
    getId: (column) => column.id,
    getName: (column) => column.columnDef.meta.title || column.id,
    label: S.columnsLabel.replace('{label}', label),
    orientation: 'horizontal',
    disabled: !(props.movableColumns ?? options.movableColumns),
    onReorder: (next, { item }) => {
      changeOrder(next.map((column) => column.id));
      emit(
        'columnMoved',
        api.column(item.id),
        next.map((column) => api.column(column.id))
      );
    }
  });
  const rowDnd = useSortable({
    items: canonical,
    getId: (record) => recordKey(record[index]),
    getName: (record) => String(valueAt(record, columns[0]?.field) ?? record[index]),
    label: S.rowsLabel.replace('{label}', label),
    disabled: !(props.movableRows ?? options.movableRows) || !!groupBy || !!childField,
    onReorder: (rows, { item }) => {
      setEdited({ input: incoming, rows });
      props.onRowMove?.(rows);
      emit('rowMoved', api.row(recordKey(item[index])));
    }
  });

  syncLive({
    live,
    props,
    frame,
    index,
    canonical,
    source,
    recordsByKey,
    replaceData,
    model,
    groups,
    groupBy,
    changeGroups,
    toggleGroup,
    collapsed,
    updateRecord,
    commitEdit,
    editing,
    setEditing,
    childField,
    expanded,
    setExpanded,
    columns,
    table,
    selection,
    sorting,
    changeSort,
    resize,
    move,
    pick,
    setPage,
    page,
    pageSize,
    setPageSize,
    virtual,
    rowElements,
    headerElements,
    listeners
  });
  React.useLayoutEffect(() => {
    const at = frame.current;
    if (!at || !metrics.min) return;
    const ctx = at.ownerDocument.createElement('canvas').getContext('2d'),
      widths = {},
      free = [],
      floor = {};
    // the probe pills are the only writes: measured first, so the reads below find the styles already computed
    const scales = cells === 'pill' ? { data: pillFont(at, ctx, true), text: pillFont(at, ctx, false) } : null,
      cs = getComputedStyle(at),
      step = gridStep(at);
    const known = new Map(),
      tokenPx = (name) => {
        if (!known.has(name)) known.set(name, tokenPixels(name, at));
        return known.get(name);
      },
      snapUp = (px) => snapToGrid(px, { round: 'up', step });
    columns.forEach((c) => {
      if (kinds(c).includes('icon')) {
        widths[c.field] = metrics.lead;
        return;
      }
      // the header: its title in the header's own font, after the type icon and its gap (owner, 2026-10-22: a column that
      // gets no share of the room left must still show its whole title)
      ctx.font =
        (cs.getPropertyValue('--plx-comp-data-grid-header-font-weight').trim() || '600') +
        ' ' +
        cs.getPropertyValue('--plx-comp-data-grid-header-font-size').trim() +
        ' ' +
        (cs.getPropertyValue('--plx-comp-data-grid-font-family').trim() || cs.fontFamily);
      ctx.wordSpacing = '0px';
      // at rest the title follows the type icon; hovered, the icon steps aside and the menu button takes its room at the end:
      // the header needs the larger of the two (owner, 2026-10-22). Wrapped headers need their longest word on a line.
      const title = String(c.title || c.field),
        words = title.split(/\s+/);
      // wrapped headers show two lines: the narrowest width that holds the title in two (never a word broken)
      let text = ctx.measureText(title).width;
      if (effectiveWrap)
        for (let i = 1; i < words.length; i += 1)
          text = Math.min(
            text,
            Math.max(
              ctx.measureText(words.slice(0, i).join(' ')).width,
              ctx.measureText(words.slice(i).join(' ')).width
            )
          );
      // hovered, a header shows its type icon, its title and the options button at the edge: the floor holds them (owner, 2026-10-23: no sort arrow; a click on the title sorts, aria-sort tells assistive technology)
      const gap = tokenPx('--plx-comp-data-grid-header-type-icon-gap'),
        arrow = 0;
      const head =
        text +
        (showTypes ? tokenPx('--plx-comp-data-grid-header-type-icon-size') + gap : 0) +
        arrow +
        (!isStatic && headerMenu ? tokenPx('--plx-comp-data-grid-title-reserve') : 0);
      floor[c.field] = snapUp(Math.max(metrics.min, head + metrics.space * 2));
      const explicit = tokenPx(c.width);
      if (explicit) {
        widths[c.field] = Math.max(explicit, floor[c.field]);
        return;
      }
      const family =
        cs
          .getPropertyValue(
            kinds(c).includes('data') ? '--plx-comp-data-grid-data-font-family' : '--plx-comp-data-grid-font-family'
          )
          .trim() || cs.fontFamily;
      ctx.font = cs.getPropertyValue('--plx-comp-data-grid-font-size').trim() + ' ' + family;
      // a data column measures with the data font's word spacing (Reddit Mono fitted to DM Sans; normal for DM Sans)
      ctx.wordSpacing = kinds(c).includes('data')
        ? cs.getPropertyValue('--plx-sys-font-data-word-spacing').trim() || '0px'
        : '0px';
      let width = head;
      const k = kinds(c),
        pill =
          cells === 'pill' && c.pill !== false && !k.includes('tags') && !k.includes('badge') && !k.includes('deleted');
      const face = pill
          ? scales[k.includes('data') || ['number', 'currency', 'date', 'bytes'].includes(c.type) ? 'data' : 'text']
          : null,
        scale = face ? face.scale : 1; // a pill: its own font, as drawn
      if (face) {
        ctx.font = face.font;
        ctx.wordSpacing = face.wordSpacing;
      }
      const chrome = pill
        ? tokenPx('--plx-comp-data-pill-md-padding-inline-start') +
          tokenPx('--plx-comp-data-pill-md-padding-inline-end') +
          2 * tokenPx('--plx-comp-data-pill-border-width') +
          (c.type === 'person' || k.includes('avatar-name') || (showTypes && typeOf(c) !== 'text')
            ? tokenPx('--plx-comp-data-pill-icon-size') + tokenPx('--plx-comp-data-pill-gap')
            : 0)
        : 0; // the icon only where the pill has one
      source.forEach((record) => {
        const value = valueAt(record, c.field);
        width = Math.max(width, ctx.measureText(valueText(value)).width * scale + chrome);
      });
      widths[c.field] = snapUp(
        Math.max(
          metrics.min,
          Math.min(width + metrics.space * 2, tokenPx('--plx-comp-data-grid-auto-max-width') || Infinity)
        )
      );
      free.push(c.field);
    });
    const available =
        metrics.room -
        (selectable ? metrics.lead : 0) -
        (rowMenu && rowMenuButton ? metrics.menu : 0) -
        (props.viewMenu ? metrics.lead : 0),
      used = Object.values(widths).reduce((sum, width) => sum + width, 0);
    // the room that is left goes to the last column that sizes itself: it fills the grid (owner, 2026-10-22)
    const units = Math.max(0, Math.floor((available - used) / step));
    if (free.length) widths[free[free.length - 1]] += units * step;
    setAutoSizing((old) => (JSON.stringify(old) === JSON.stringify(widths) ? old : widths));
    setFloors((old) => (JSON.stringify(old) === JSON.stringify(floor) ? old : floor));
  }, [
    columns,
    source,
    metrics.room,
    metrics.min,
    metrics.space,
    metrics.row,
    selectable,
    isStatic,
    showTypes,
    headerMenu,
    cells,
    effectiveWrap
  ]);

  // the room under the table that the page keeps (#451): the grid's own part below it (its border, a footer) and the end
  // margin, padding and border of each container up to the page, so a table that fills the window ends at the page's
  // padding and only the table scrolls; content placed after the grid is not counted
  const trailing = (at, hold) => {
    let sum = Math.max(0, at.getBoundingClientRect().bottom - hold.getBoundingClientRect().bottom);
    for (let el = at; el; el = el.parentElement) {
      const cs = getComputedStyle(el);
      sum += parseFloat(cs.marginBlockEnd) || 0;
      if (el !== at) sum += (parseFloat(cs.paddingBlockEnd) || 0) + (parseFloat(cs.borderBlockEndWidth) || 0);
    }
    return sum;
  };
  React.useLayoutEffect(() => {
    const at = frame.current;
    if (!at) return;
    const doc = at.ownerDocument;
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (!doc.defaultView) return;
      const next = {
        step: gridStep(at),
        row: tokenPixels('--plx-comp-data-grid-record-height', at),
        line: tokenPixels('--plx-comp-data-grid-line-width', at),
        lead: tokenPixels('--plx-comp-data-grid-lead-column-width', at),
        menu: tokenPixels('--plx-comp-data-grid-row-menu-width', at),
        min: tokenPixels('--plx-ref-size-80px', at),
        space: tokenPixels('--plx-comp-data-grid-cell-padding-inline', at),
        room: at.clientWidth,
        add: tokenPixels('--plx-sys-data-grid-row-height', at),
        group: tokenPixels('--plx-comp-data-grid-group-header-height', at),
        groupGap: tokenPixels('--plx-comp-data-grid-group-gap', at)
      };
      setMetrics((old) => (Object.keys(next).every((k) => next[k] === old[k]) ? old : next));
      const threshold =
          narrow === 'auto'
            ? keys.reduce(
                (sum, field) => sum + (live.current.table?.getColumn(field)?.getSize() || next.min),
                selectable ? next.lead : 0
              )
            : tokenPixels(narrowAt, at),
        want = listed && at.clientWidth > 0 && at.clientWidth < threshold;
      setNarrow(want);
      if (!isStatic && !height && mode !== 'pages' && holder.current) {
        const top = holder.current.getBoundingClientRect().top,
          room = at.getBoundingClientRect().bottom - top;
        holder.current.style.maxBlockSize = gridPx(
          inPane
            ? Math.max(0, room)
            : Math.max(next.row * 8, doc.defaultView.innerHeight - top - trailing(at, holder.current)),
          { round: 'down', el: at }
        );
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(at);
    const mo = new MutationObserver(schedule);
    mo.observe(doc.documentElement, {
      attributes: true,
      attributeFilter: ['data-plx-density', 'data-plx-density-policy', 'data-plx-interaction', 'data-plx-mode']
    });
    const region = at.closest('[data-plx-density]');
    if (region && region !== doc.documentElement)
      mo.observe(region, { attributes: true, attributeFilter: ['data-plx-density'] });
    return () => {
      ro.disconnect();
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inPane, effectiveStep, effectiveWrap, height, narrow, narrowAt, mode, columns, keys.join('|')]);
  React.useLayoutEffect(() => {
    virtual.measure();
  }, [metrics.row, metrics.line, metrics.group, metrics.groupGap, model.length, collapsed]);

  useViewSync({
    metrics,
    autoSizing,
    ready,
    api,
    options,
    deliveredReady,
    onReady,
    emit,
    props,
    storageKey,
    sorting,
    columnOrder,
    columnVisibility,
    sizing,
    effectiveStep,
    effectiveWrap,
    wrapColumns,
    groupBy,
    collapsed,
    groupSignal,
    table,
    selection,
    canonical,
    index,
    keepHiddenSelection,
    notifySelection,
    selectionInfo,
    onSelectionChange,
    filters,
    deferredFilter,
    source
  });
  React.useEffect(() => {
    setLoaded(pageSize);
  }, [sortSignal, props.filter, JSON.stringify(filters), props.search, pageSize]);
  React.useEffect(() => {
    const before = () => {
        const el = holder.current;
        printView.current = el ? { top: el.scrollTop, left: el.scrollLeft, max: el.style.maxBlockSize } : null;
        if (el) el.style.removeProperty('max-block-size');
        flushSync(() => setPrinting(true));
      },
      after = () => {
        setPrinting(false);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const el = holder.current,
              saved = printView.current;
            if (el && saved) {
              if (saved.max) el.style.maxBlockSize = gridPx(parseFloat(saved.max), { el });
              else el.style.removeProperty('max-block-size');
              virtual.scrollToOffset(saved.top);
              el.scrollLeft = saved.left;
              printView.current = null;
            }
          })
        );
      };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  const displayedTotal = remoteMode ? remote?.total || 0 : table.getFilteredRowModel().rows.length;
  // fill with a server (issue 522): the next page is asked for when the scroll comes within 8 rows of the end, and again
  // while the rows do not yet fill the room; never while one is on its way, after a failure (Retry asks again) or at the total
  const nearEnd = React.useCallback(() => {
    const el = holder.current;
    if (!scrollFill || !el || fetching.current || remoteError || !remote) return;
    if ((remote.rows || []).length >= (remote.total || 0)) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight <= Math.max(1, metrics.row) * 8) {
      fetching.current = true;
      setPage((n) => n + 1);
    }
  }, [scrollFill, remote, remoteError, metrics.row]);
  React.useEffect(() => {
    const el = holder.current;
    if (!scrollFill || !el) return undefined;
    nearEnd();
    el.addEventListener('scroll', nearEnd, { passive: true });
    return () => el.removeEventListener('scroll', nearEnd);
  }, [scrollFill, nearEnd]);
  // the open row (#453): the record whose details show, the row last opened by a click or Enter, or openKey (null: none);
  // it is aria-current, and in a grid without selection it takes the selected look (with selection, opening selects it)
  const openId = props.openKey !== undefined ? (props.openKey == null ? null : recordKey(props.openKey)) : ownOpen;
  const isOpen = (id) => openId != null && String(id) === String(openId),
    marked = (id) => !!selection[id] || (!selectable && !options.selectableRows && isOpen(id));
  const { selectionRows, selectedVisible, allVisible, selectAll, pickCheckbox, chooseRow } = selectionActions({
    table,
    live,
    selection,
    selectionAnchor,
    pick,
    selectable,
    options
  });

  const { fit, startResize } = columnSizing({ columns, frame, source, resize, metrics, table, B });
  const menuItems = (items, row, extra) =>
    items.map((item, i) => {
      if (
        !item.separator &&
        !item.disabled &&
        typeof (item.onSelect || item.action) !== 'function' &&
        Object.prototype.hasOwnProperty.call(React.createElement('span'), '_store') &&
        !warnedActions.current.has(item.label)
      ) {
        warnedActions.current.add(item.label);
        console.warn('DataGrid: missing action handler for ' + item.label);
      }
      return item.separator ? (
        <MenuDivider key={i} />
      ) : (
        <MenuItem
          key={i}
          icon={item.icon}
          danger={item.danger}
          disabled={typeof item.disabled === 'function' ? item.disabled(row) : item.disabled}
          onSelect={() => {
            (item.onSelect || item.action)?.(row, extra);
          }}
        >
          {item.label}
        </MenuItem>
      );
    });

  const { chooserColumns, headerCell } = headerRows({
    groupBy,
    columnMenu,
    S,
    menuItems,
    api,
    props,
    setFilterField,
    changeGroups,
    wrapOf,
    changeWrap,
    wrapColumns,
    fit,
    table,
    frozen,
    setManaging,
    orderAt,
    filterField,
    pinStart,
    columnDnd,
    ordered,
    headerElements,
    widths,
    isStatic,
    B,
    selectable,
    effectiveWrap,
    options,
    showTypes,
    headerMenu,
    startResize,
    resize
  });
  const focusCell = makeFocusCell({ model, ordered, virtualized, virtual, displayElements });

  const rememberRow = (row, node) => {
    const displayKey = row.displayKey || row.id,
      previous = displayElements.current.get(displayKey),
      active = document.activeElement;
    if (node) {
      displayElements.current.set(displayKey, node);
      rowElements.current.set(row.id, node);
      if (parkedFocus.current?.key === displayKey && active === holder.current) {
        const saved = parkedFocus.current;
        parkedFocus.current = null;
        requestAnimationFrame(() => {
          if (document.activeElement === holder.current) {
            const cell = saved.field ? node.querySelector('[data-plx-field="' + CSS.escape(saved.field) + '"]') : node;
            const control =
              saved.control >= 0 ? cell?.querySelectorAll('input,button,a[href],select,textarea')[saved.control] : null;
            (control || cell || holder.current)?.focus({ preventScroll: true });
          }
        });
      }
    } else {
      if (previous?.contains(active)) {
        const cell = active.closest('[data-plx-field]'),
          controls = cell ? [...cell.querySelectorAll('input,button,a[href],select,textarea')] : [];
        parkedFocus.current = {
          key: displayKey,
          field: cell?.getAttribute('data-plx-field'),
          control: controls.indexOf(active)
        };
        holder.current?.focus({ preventScroll: true });
      }
      displayElements.current.delete(displayKey);
      if (rowElements.current.get(row.id) === previous) {
        const replacement = [...displayElements.current.values()].find((el) => el.dataset.plxRecord === row.id);
        if (replacement) rowElements.current.set(row.id, replacement);
        else rowElements.current.delete(row.id);
      }
    }
  };
  useEditEffect({ source, mutations, pendingEdit, emit, api });

  const { groupNode, rowNode } = bodyRows({
    B,
    semanticIndex,
    S,
    collapsed,
    toggleGroup,
    model,
    virtual,
    holder,
    ordered,
    widths,
    selectable,
    metrics,
    isNarrow,
    columns,
    cutOpen,
    setCutAt,
    table,
    wrapOf,
    props,
    api,
    isStatic,
    effectiveStep,
    options,
    recordPositions,
    rowDnd,
    unread,
    index,
    rememberRow,
    mode,
    page,
    pageSize,
    selection,
    isOpen,
    on,
    childField,
    marked,
    virtualized,
    chooseRow,
    emit,
    setOwnOpen,
    focusCell,
    pickCheckbox,
    kindsOf,
    pinStart,
    editing,
    cells,
    showTypes,
    setEditing,
    frame,
    pinnedAt,
    groupBy,
    keys,
    commitEdit,
    canonical,
    cutAt,
    rowMenu,
    rowMenuButton,
    menuItems
  });
  const rowVersion = React.useMemo(
    () => ({}),
    [
      cutAt,
      wrapColumns,
      unread.keys,
      unreadOnly,
      props,
      source,
      model,
      editing,
      metrics,
      autoSizing,
      sizing,
      columnOrder,
      columnVisibility,
      sorting,
      expanded,
      page,
      pageSize,
      isNarrow,
      collapsed,
      printing,
      filterField,
      groupBy,
      loaded
    ]
  );
  const renderRow = (row) =>
    row.original ? (
      <MemoGridRow
        key={row.displayKey || row.id}
        row={row}
        render={rowNode}
        selected={(selection[row.id] ? 1 : 0) + (isOpen(row.id) ? 2 : 0)}
        version={(props.movableRows ?? options.movableRows) ? {} : rowVersion}
      />
    ) : (
      rowNode(row)
    );
  const priorGroups = model
      .slice(0, first)
      .filter((row) => row.__group)
      .map((row) => row.__group),
    currentGroup = model[first]?.__group || priorGroups[priorGroups.length - 1];
  const stickyGroups = currentGroup
    ? priorGroups.filter(
        (group, i) =>
          group.path.every((part, depth) => JSON.stringify(part) === JSON.stringify(currentGroup.path[depth])) &&
          !priorGroups.slice(i + 1).some((next) => next.depth === group.depth)
      )
    : [];
  // a fill grid that already shows rows says a failed next page in its last row (with Retry), not over the table
  const moreFailed = scrollFill && remoteError && model.length > 0,
    failed = error || (moreFailed ? null : remoteError);
  return (
    <WidthPixels.Provider value={widthPixels}>
      {manageDialog({ headerMenu, isStatic, managing, setManaging, chooserColumns, changeOrder, changeVisibility })}
      <div
        ref={frame}
        className={cx(
          B,
          isStatic && B + '--static',
          pinnedAt >= 0 && B + '--row-header',
          listed && B + '--list',
          isNarrow && B + '--narrow',
          height === '100%' && B + '--fill',
          mode === 'pages' && B + '--pages',
          mode === 'load-more' && B + '--load-more',
          className
        )}
        data-plx-engine="next"
        data-plx-grid-key={cells === 'pill' ? gridKey : undefined}
        data-plx-density={density === 'page' ? undefined : density}
        data-plx-render={virtualized ? 'virtual' : undefined}
        data-plx-row-height={!isStatic && !isNarrow ? effectiveStep : undefined}
        data-plx-wrap-headers={effectiveWrap ? '' : undefined}
        data-plx-height={lengthName(height)}
        data-plx-fit={!isStatic && !height && mode !== 'pages' ? '' : undefined}
      >
        {failureState({ failed, B, S, onRetry, remoteError, setRetry })}

        <div
          className={cx(
            B + '__table',
            B + '__grid',
            height === '100%' && B + '__grid--fill',
            isStatic && B + '__grid--static'
          )}
          role={isStatic ? 'table' : groups.length || childField ? 'treegrid' : 'grid'}
          aria-label={label}
          aria-busy={remoteMode && remoteBusy ? true : undefined}
          aria-rowcount={
            groups.length || childField
              ? semanticRows.length + 1
              : (remoteMode ? remote?.total || 0 : table.getFilteredRowModel().rows.length) + 1
          }
          aria-colcount={
            ordered.length + (selectable ? 1 : 0) + (rowMenu && rowMenuButton ? 1 : 0) + (props.viewMenu ? 1 : 0)
          }
          hidden={!!failed}
        >
          <div
            className={cx(
              B + '__grid-header',
              isNarrow && B + '__grid-header--narrow',
              isStatic && B + '__grid-header--static'
            )}
            ref={header}
            hidden={isStatic && props.headerVisible === false}
          >
            <div className={`${B}__grid-header-contents`}>
              <div
                {...columnDnd.listProps}
                className={cx(`${B}__grid-headers`, isStatic && B + '__grid-headers--static')}
                role="row"
              >
                {selectable ? (
                  <div
                    className={`${B}__grid-col ${B}__grid-row-header ${B}__w-lead ${B}__grid-frozen`}
                    role="columnheader"
                  >
                    <div className={`${B}__grid-col-content ${B}__grid-col-content--row-header`}>
                      <Check
                        label={S.selectAll}
                        checked={allVisible}
                        mixed={selectedVisible.length > 0 && !allVisible}
                        onChange={(e) => selectAll(e.target.checked)}
                      />
                    </div>
                  </div>
                ) : null}
                {ordered.map(headerCell)}
                {viewMenu({ props, B, S, effectiveStep, setRowHeight, effectiveWrap, setWrapHeaders })}
                {rowMenu && rowMenuButton ? (
                  <Width
                    width={metrics.menu}
                    className={`${B}__grid-col`}
                    role="columnheader"
                    aria-label={S.rowActions}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div
            id={viewportId}
            ref={holder}
            className={cx(
              `${B}__grid-tableholder`,
              height === '100%' && B + '__grid-tableholder--fill',
              isStatic && B + '__grid-tableholder--static'
            )}
            data-plx-height={lengthName(height)}
            data-plx-fit={!isStatic && !height && mode !== 'pages' ? '' : undefined}
            role="rowgroup"
            tabIndex={isStatic ? undefined : 0}
            onKeyDown={tableKeys({ focusCell, first })}
            onScroll={(e) => {
              if (header.current) header.current.scrollLeft = e.currentTarget.scrollLeft;
              if (
                mode === 'load-more' &&
                e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight <
                  tokenPixels('--plx-ref-size-200px', frame.current)
              ) {
                if (remoteMode && !fetching.current && source.length < (remote?.total || 0)) {
                  fetching.current = true;
                  setPage((n) => n + 1);
                } else if (!remoteMode) setLoaded((n) => Math.min(allRows.length, n + pageSize));
              }
            }}
          >
            <div
              {...rowDnd.listProps}
              className={cx(
                `${B}__grid-table`,
                virtualized && B + '__grid-table--virtual',
                isNarrow && B + '__grid-table--narrow',
                isStatic && B + '__grid-table--static'
              )}
              role="presentation"
            >
              {stickyGroups.length ? (
                <div className={B + '__sticky-groups'} aria-hidden="true" inert="">
                  {stickyGroups.map((group) =>
                    React.cloneElement(groupNode(group, true), {
                      key: 'sticky:' + group.id,
                      className: B + '__sticky-group ' + B + '__grid-group-level-' + group.depth,
                      role: undefined,
                      tabIndex: -1,
                      'aria-expanded': undefined,
                      'aria-rowindex': undefined,
                      'aria-level': undefined,
                      onKeyDown: undefined
                    })
                  )}
                </div>
              ) : null}
              <RowGap rows={model.slice(0, first)} />
              {shown.map(renderRow)}
              <RowGap rows={model.slice(last)} />
            </div>
            {emptyRow({ model, B, isStatic, ordered, remoteMode, remoteBusy, S, empty })}
            {moreRow({ scrollFill, model, remoteBusy, moreFailed, B, semanticRows, ordered, S, setRetry })}
          </div>
        </div>
        {!isStatic ? <Scrollbars holder={holder} viewportId={viewportId} /> : null}
        {pagesFooter({ mode, failed, B, S, displayedTotal, page, pageSize, props, setPage, setPageSize, label })}
        {loadMoreFooter({
          mode,
          failed,
          B,
          S,
          loadedRows,
          displayedTotal,
          remoteMode,
          remoteBusy,
          fetching,
          setPage,
          setLoaded,
          allRows,
          pageSize
        })}
      </div>
    </WidthPixels.Provider>
  );
}

export function DataGridEngine(props) {
  return <NextEngine key={props.storageKey || ''} {...props} />;
}

DataGridEngine.preload = () => Promise.resolve();
