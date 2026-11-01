/* Plenix · DataGrid engine · the rarely drawn chrome (loaded on first use)
   Summary: The two parts of the grid a person meets seldom: the manage-columns dialog (the list of columns to show, hide and reorder) and the failure state with
     Retry. They are plain functions over the engine's values, as chrome.jsx's are; rare.jsx draws them once this file has loaded, so the npm package does not
     carry the dialog (its list, search and sheet, about 23 KB) in every grid's first load (issue 807).
   Usage:
     <Rare part="manageDialog" args={{ headerMenu, isStatic, managing, setManaging, chooserColumns, changeOrder, changeVisibility }} />
     <Rare part="failureState" args={{ failed, B, S, onRetry, remoteError, setRetry }} />
   Props:
     manageDialog({ headerMenu, isStatic, managing, setManaging, chooserColumns, changeOrder, changeVisibility }): the dialog, or null unless it is open;
     failureState({ failed, B, S, onRetry, remoteError, setRetry }): the error state with Retry, or null.
   Notes:
     Moved out of chrome.jsx without any change to the code. In the iife builds (the CDN script, the applications, pages opened from file://) the dynamic
       import is inlined by the bundler, so nothing is fetched.
*/
import React from 'react';
import { ManageColumnsDialog } from '../../../patterns/ColumnsMenu/ColumnsMenu.jsx';
import { EmptyState } from '../../EmptyState/EmptyState.tsx';
import { Button } from '../../Button/Button.tsx';

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
