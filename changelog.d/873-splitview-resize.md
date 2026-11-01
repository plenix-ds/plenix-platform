### Changed
- SplitView resizes as far as its room allows (#873, P1; the owner: "I need to be able to resize any split view screen"). Side by side, the first panel drags until the second panel keeps only its minimum width, and never past 90% of the window (`--plx-sys-shell-pane-window-share`, as Resizable's side panels read it). The fixed 720px ceiling is gone.
  - `defaultSize` stays the starting width, and a remembered `size` comes back up to the new ceiling. `minSize` stays a floor, capped at the ceiling so both panels stay usable.
  - The keyboard's End, the separator's `aria-valuemax` and the words at the limit follow the same ceiling. A smaller window lowers it at once, and under 900px the panels still stack.
  - In Arabic, the "other pane needs at least …" words write their number in Arabic-Indic digits.
- Side panels (Resizable detail drawers) are unchanged (the owner, 2026-11-01).

### Deprecated
- SplitView `maxSize` side by side: it no longer caps the drag (a larger one is the room anyway; a smaller one is ignored, with no error). Stacked, `maxSize` is still the first panel's ceiling.

### Upgrading from 0.81.0
- Nothing to change. An app that passed `maxSize` to widen a split view can drop it.
