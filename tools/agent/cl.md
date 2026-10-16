### Added
- Library wave 10, lane A (drag and drop): the dnd engine (`useSortable`, `useDraggable`, `useDropTarget`,
  `useReposition`; pointer, pen, touch and keyboard: Space/Enter picks up, arrows move, Space/Enter drops, Escape
  cancels; every move announced; auto-scroll near edges), DragHandle, SortableList (vertical, grid, handles, move
  buttons, between lists), DropZone data drops (`onDropItem`, `accepts`, a refusing state), Resizable (with a size menu
  for resizing without dragging; PanelSplitter moved here, still exported from AppShell), RenameAction (inline and
  dialog; F2; selects the name before the extension).
- Library wave 10, lane B (record flows): DeleteFlow (confirm, type to confirm, undo, move to trash), DuplicateAction
  (copy at once with Undo, then rename), Publish (draft, scheduled, published; schedule; unpublish with Undo),
  ReviewFlow and ReviewQueue (approve, request changes, reject with a reason; human review), AssignControl (assign,
  reassign, delegate with dates), WorkflowStatus.
- Native designs: iOS Drag and drop, iOS Undo and redo, Android Gestures (drag), Android Confirmation.
### Changed
- Versions follow semver from this release on (owner, 2026-10-15, RedSave #27): new or rewritten components raise the
  minor version, fixes the patch version; a rewrite is listed here under "Changed" with what an application must check.
- Agents find their task briefs in tools/agent/tasks/ (AGENTS.md › Finding your work); the plan of record is pinned
  issue #3 on GitHub, one issue per task.
