# DataTableNext

An independent React renderer using TanStack Table and TanStack Virtual, bundled with Plenix.
Its own Plenix markup and stylesheet use the existing table tokens and established geometry.

Public event callbacks receive records: onRowClick(record,event), onRowDoubleClick(record,event),
onCellEdit(record,{field,value,previous,row}). Grouping uses groupBy; trees use tree, childrenField
(default _children) and treeColumn. Existing callers retain a private compatibility adapter.

Capabilities include virtual scrolling; saved sorting, column order, widths, visibility and collapsed groups;
canonical selection; nested and multi-value grouping with summaries; tree rows; input/number editing;
Platform drag-and-drop and move menus; local/remote pages and load-more; copy and print; floating scrollbars;
rich cell kinds; narrow lists; row/header menus; keyboard navigation and live announcements.

DataTable is the public renderer used by every application and static Table.
The public DataTable entry point retains its action/Undo provider. The private adapter covers existing
application row/cell/column calls; plug-in modules and imperative DOM formatting are not a public API.
Rows and rendered cells remain owned by React.

Validation:
- node tests/data-table.test.js: the common table-view assertions.
- node tests/data-table-rest.test.js: existing rich-cell and action contracts.
- node tests/data-table-next-capabilities.test.js: grouping, tree, editing, movement, copy and print.
- node tests/data-table-next-independent.test.js: standalone module graph and blocked legacy-engine access.
- node tests/data-table-next-perf.test.js: identical rich 600-row scenarios for both engines.
- node tests/phase7-review.js: paired application review captures.
