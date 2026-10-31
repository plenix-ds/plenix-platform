/* Plenix · DataGrid engine · chrome (the parts around the rows)
   Summary: What the grid draws besides its header cells and rows: the manage-columns dialog, the failure state with Retry, the view
     menu at the end of the header (row height and wrapped headers), the empty and loading row, the "more rows are coming or failed"
     row of a fill grid, and the footers of the paged and load-more modes (range, page size, pagination, Load more). Render
     functions over the engine's state, not components: one element tree, no extra React layer.
   Usage:
     import { manageDialog, failureState, viewMenu, emptyRow, moreRow, pagesFooter, loadMoreFooter } from './engine/chrome.jsx';
     {viewMenu({ props, B, S, effectiveStep, effectiveWrap, setRowHeight, setWrapHeaders })}
   Props:
     Each function takes the engine's values it draws from (the block class B, the strings S, props, the table, the model, the paging
       and remote state, the handlers) and returns the element the engine used to write inline, or null.
   Notes:
     Moved out of DataGridEngine.jsx without any change to the code (issue 714, the toolbar and menus): each part is the same
     element as it was inline in the engine's return, in the same place.
*/
import { ManageColumnsDialog } from '../../../patterns/ColumnsMenu/ColumnsMenu.jsx';
import { EmptyState } from '../../EmptyState/EmptyState.jsx';
import { Button } from '../../Button/Button.jsx';
import SettingsCustomizeIcon from 'plenix-platform/icons/plenix/settings-customize';
import { Menu, MenuItem, MenuDivider } from '../../Menu/Menu.jsx';
import { cx } from '../../../utils/cx.js';
import { Inline } from '../../Stack/Stack.jsx';
import { words } from './helpers.jsx';
import { Text } from '../../Text/Text.jsx';
import { Select } from '../../Input/Input.jsx';
import { Pagination } from '../../Pagination/Pagination.jsx';

export function manageDialog({
  headerMenu,
  isStatic,
  managing,
  setManaging,
  chooserColumns,
  changeOrder,
  changeVisibility,
}) {
  return headerMenu && !isStatic && managing ? (
    <ManageColumnsDialog
      trigger={null}
      open={managing}
      onOpenChange={setManaging}
      fields={chooserColumns().map((col) => ({ value: col.id, label: col.columnDef.meta.title || col.id }))}
      value={{
        order: chooserColumns().map((col) => col.id),
        hidden: chooserColumns()
          .filter((col) => !col.getIsVisible())
          .map((col) => col.id),
      }}
      onChange={(next) => {
        changeOrder(next.order);
        changeVisibility(Object.fromEntries((next.hidden || []).map((field) => [field, false])));
      }}
    />
  ) : null;
}

export function failureState({ failed, B, S, onRetry, remoteError, setRetry }) {
  return failed ? (
    <EmptyState
      className={B + '__error'}
      tone="error"
      title={S.failed}
      action={
        onRetry || remoteError ? (
          <Button
            size="sm"
            onClick={() => {
              setRetry((n) => n + 1);
              onRetry?.();
            }}
          >
            {S.retry}
          </Button>
        ) : null
      }
    >
      {String(failed === true ? '' : failed.message || failed)}
    </EmptyState>
  ) : null;
}

export function viewMenu({ props, B, S, effectiveStep, setRowHeight, effectiveWrap, setWrapHeaders }) {
  return props.viewMenu ? (
    <div className={`${B}__grid-col ${B}__w-view`} role="columnheader">
      <Menu
        label={S.view}
        trigger={<Button variant="ghost" size="xs" iconOnly icon={SettingsCustomizeIcon} label={S.view} />}
      >
        {['short', 'medium', 'tall', 'extra-tall'].map((step) => (
          <MenuItem
            key={step}
            checked={effectiveStep === step}
            onSelect={() => {
              setRowHeight(step);
              props.onViewChange?.({ rowHeight: step });
            }}
          >
            {S[step]}
          </MenuItem>
        ))}
        <MenuDivider />
        <MenuItem
          checked={effectiveWrap}
          onSelect={() => {
            setWrapHeaders(!effectiveWrap);
            props.onViewChange?.({ wrapHeaders: !effectiveWrap });
          }}
        >
          {S.wrapHeaders}
        </MenuItem>
      </Menu>
    </div>
  ) : null;
}

export function emptyRow({ model, B, isStatic, ordered, remoteMode, remoteBusy, S, empty }) {
  return !model.length ? (
    <div className={cx(`${B}__grid-placeholder`, isStatic && B + '__grid-placeholder--static')} role="row">
      <div
        className={`${B}__grid-placeholder-contents`}
        role={isStatic ? 'cell' : 'gridcell'}
        aria-colspan={Math.max(1, ordered.length)}
      >
        <span className={B + '__empty'}>{remoteMode && remoteBusy ? S.loading : empty || S.empty}</span>
      </div>
    </div>
  ) : null;
}

export function moreRow({ scrollFill, model, remoteBusy, moreFailed, B, semanticRows, ordered, S, setRetry }) {
  return scrollFill && model.length && (remoteBusy || moreFailed) ? (
    <div className={`${B}__grid-placeholder`} role="row" aria-rowindex={semanticRows.length + 2}>
      <div className={`${B}__grid-placeholder-contents`} role="gridcell" aria-colspan={Math.max(1, ordered.length)}>
        {moreFailed ? (
          <Inline gap="sm" align="center">
            <span className={B + '__empty'}>{S.failed}</span>
            <Button size="sm" onClick={() => setRetry((n) => n + 1)}>
              {S.retry}
            </Button>
          </Inline>
        ) : (
          <span className={B + '__empty'} role="status">
            {S.loading}
          </span>
        )}
      </div>
    </div>
  ) : null;
}

export function pagesFooter({
  mode,
  failed,
  B,
  S,
  displayedTotal,
  page,
  pageSize,
  props,
  setPage,
  setPageSize,
  label,
}) {
  return mode === 'pages' && !failed ? (
    <div className={B + '__footer'}>
      <Text variant="data" className={B + '__range'}>
        {words(S.range, {
          first: displayedTotal ? Math.min(page * pageSize + 1, displayedTotal) : 0,
          last: Math.min((page + 1) * pageSize, displayedTotal),
          total: displayedTotal,
        })}
      </Text>
      <label className={B + '__page-size'}>
        <span>{S.perPage}</span>
        <Select
          value={String(pageSize)}
          options={(props.pageSizes || [25, 50, 100]).map((n) => ({ value: String(n), label: String(n) }))}
          onChange={(e) => {
            setPage(0);
            setPageSize(+e.target.value);
          }}
        />
      </label>
      <Pagination
        className={B + '__pages'}
        label={words(S.pages, { label })}
        page={page + 1}
        pageCount={Math.max(1, Math.ceil(displayedTotal / pageSize))}
        onPageChange={(n) => setPage(n - 1)}
      />
    </div>
  ) : null;
}

export function loadMoreFooter({
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
  pageSize,
}) {
  return mode === 'load-more' && !failed ? (
    <div className={B + '__footer'}>
      <Text variant="data" className={B + '__range'}>
        {words(S.count, { shown: Math.min(loadedRows.length, displayedTotal), total: displayedTotal })}
      </Text>
      {loadedRows.length < displayedTotal ? (
        <Button
          size="sm"
          loading={remoteMode && remoteBusy}
          className={B + '__more'}
          onClick={() => {
            if (remoteMode) {
              if (!fetching.current) {
                fetching.current = true;
                setPage((n) => n + 1);
              }
            } else setLoaded((n) => Math.min(allRows.length, n + pageSize));
          }}
        >
          {S.loadMore}
        </Button>
      ) : null}
    </div>
  ) : null;
}
