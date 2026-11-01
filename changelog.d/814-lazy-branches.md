### Added
- A branch loads only when it is first opened (#814, from the Semi study #767): `useBranchLoader`, one mechanism shared by Tree, TreeSelect and Cascader (through MillerColumns). Big hierarchies open at once.
  - Mark a branch with `hasChildren: true` and no `children` array, and pass `loadChildren(node)` (it returns an array or a promise of one). It is asked for once, the first time the branch opens.
  - While the children load, the row shows a spinner and "Loading…", the item (or column) is `aria-busy`, and "Loading {label}" is announced. A failure shows "Couldn’t load these items" with Try again and is announced. Arrow Right on the branch, or closing and opening it, also asks again.
  - Choosing, searching and the keys work the same on loaded and not-yet-loaded branches. Search finds the items loaded so far and never loads a branch by itself. With TreeSelect `multiple`, checking a branch that has not loaded loads it, then checks everything under it.
  - The words are in the catalog's new `branch` section, in English and Arabic.
  - `useBranchLoader` and `BranchStatus` are exported for other hierarchies. MillerColumns takes `loadChildren` too, or a shared `loader`.

### Fixed
- MillerColumns (and so Cascader): right to left, a parent's chevron points left, toward its children.

### Upgrading from 0.79.0
- Nothing to change: a hierarchy without `hasChildren` and `loadChildren` works as before.
