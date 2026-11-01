/* Plenix · DataGrid engine · the rarely drawn chrome (loaded on first use)
   Summary: The part of the grid a person meets seldom: the manage-columns dialog (the list of columns to show, hide and reorder). It is a
     plain function over the engine's values, as chrome.jsx's are; rare.jsx draws it once this file has loaded, so the npm package does not
     carry the dialog (its list, search and sheet, about 23 KB) in every grid's first load (issue 807).
   Usage:
     <Rare part="manageDialog" args={{ headerMenu, isStatic, managing, setManaging, chooserColumns, changeOrder, changeVisibility }} fallback={(retry) => …} />
   Props:
     manageDialog({ headerMenu, isStatic, managing, setManaging, chooserColumns, changeOrder, changeVisibility }): the dialog, or null unless it is open.
   Notes:
     Moved out of chrome.jsx without any change to the code. The failure state with Retry stays in chrome.jsx: it is small, and it must
       draw even when this file cannot load. In the iife builds (the CDN script, the applications, pages opened from file://) the dynamic
       import is inlined by the bundler, so nothing is fetched.
*/
import React from 'react';
import { ManageColumnsDialog } from '../../../patterns/ColumnsMenu/ColumnsMenu.jsx';

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
