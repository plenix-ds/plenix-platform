### Added
- Keyboard tests for the last interactive parts without one (#706, follow-up to #691): `tests/keyboard-706.test.js` presses real keys on CommandMenu, EntityPicker, MillerColumns, RowButton, AssignControl, ImageUpload and ImageCrop, RenameAction, SessionTimeout, DeleteFlow, DraftState, QueryBuilder, FilterBar, SearchWorkspace and ProductOptions. It runs in a left-to-right and a right-to-left page where arrows flip. Written, not run here.
- Menu type-ahead (#706): in an open menu, typing a letter moves to the next item whose label starts with it, wrapping. It works in Menu, its sub menus and ContextMenu.
- Combobox (#706): on a closed list, Arrow Up opens it on the last option, and Alt+Arrow Down opens it on the first without moving. On an open list, Alt+Arrow Down moves nothing.

### Unchanged, by choice
- Combobox: Escape on a closed list keeps the value. The WAI-ARIA pattern makes clearing optional, and one key should never lose a chosen value. The choice is recorded in Combobox's header.
