### Changed
- TypeScript: @plenix-ds/react's `index.d.ts` types far more props (#687, from the audit #684). Props typed `any` went from 1147 to 398. The most-used parts are typed first: Button, Input, Textarea, Select, Combobox, SearchField, NumberInput, DataGrid, Dialog, Menu, Tabs, AppShell, Field, Popover, Tooltip and every Chat part (`Chat.Message`, `Chat.Group`, `Chat.Typing` and the rest now have their own Props). Types only: nothing changes at run time.
- A wrongly typed prop on these parts can now fail your TypeScript build where it passed before, for example `<Input size="xl" />` or `<NumberInput min="zero" />`.
- The count of `any` props never goes up: CI checks it against `types-any.baseline.json` (`node tools/agent/types-any.js --check`).
