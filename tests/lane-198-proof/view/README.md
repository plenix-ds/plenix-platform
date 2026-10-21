# One collection view store (169)

useCollectionView now supplies onViewChange and controlled view props. With this controller present, DataGrid ignores its own storageKey for restoration and writing. Header sorting, column visibility/order, grouping, row height, wrap and resizing write back to the collection state. Widths and collapsed groups persist in the collection view and reset with it. Standalone grids retain their own storage behavior.

The unit regression rejects stale saved sort/group fields, duplicate column entries and obsolete widths; an explicit empty sort wins over a saved sort. It fails on exact lane base 61577d19 and passes head.

The light-mode browser regression seeds conflicting collection and legacy grid entries. It checks that collection state wins, header sorting/hiding updates the collection store, the old grid entry remains untouched, and remount restores the collection. It also groups/collapses, remounts to verify collapse persistence, resizes a column, and resets sort/visibility/width to defaults. Both tests run in DataGrid CI. All other focused lane regressions and SYSTEM_OK / SPEC_OK pass. No intended appearance change.
