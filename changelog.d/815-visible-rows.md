### Added
- Tree and TreeSelect draw only the rows in view (#815 part 1, from the Semi study #767), with the existing `useVirtualizer`. Long folder lists open and scroll fast.
  - It switches on by itself above 200 visible rows (`TREE_AUTO_VIRTUAL`). Short trees are unchanged. `virtualized` (true or false) decides.
  - The rows are flat, each with its `aria-level` and its `aria-posinset` of `aria-setsize` among its siblings, so a screen reader says "12 of 5,000".
  - The keys move through every row, drawn or not. The active row scrolls into view only as far as needed. No row animates.
  - A virtualized Tree scrolls itself: give it a height (its container's block size). In TreeSelect it is the popover's scroll area.
  - The loading row of a branch that loads when opened (#814) works the same.
- `useVirtualizer`: `scrollToIndex(index, { align: 'nearest' })` scrolls only as far as brings the item into view.

### Fixed
- `useVirtualizer` no longer queues a state update when nothing moved. In a tree whose rows re-render on focus, that update never settled ("Maximum update depth exceeded") while the keys moved through rows not drawn yet.

### Upgrading from 0.79.0
- A Tree with over 200 visible rows now scrolls itself: give its container a height, or pass `virtualized={false}` to keep the old layout.
