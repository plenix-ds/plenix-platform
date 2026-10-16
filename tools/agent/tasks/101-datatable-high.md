# Task #101: DataTable fixes for RedSave, high impact (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/101 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

RedSave (a Chrome extension built on Plenix, 16 tables) reported the DataTable issues in
`Redsave-v1/docs/plenix-datatable-issues.md`. The issue text of each is on GitHub (#72–#89); the essentials are below.
Fix these seven, the high-impact ones, in the DataTable and `useCollectionView`. Each keeps today's behavior when the new
option is not used.

| # | Issue | The fix |
|---|---|---|
| DT-1 (#72) | No default sort; a built-in starting sort (`options.initialSort`) is cleared when the view has none | `useCollectionView(fields, { sort: [{ field, dir }] })` is the starting value and what Reset view returns to; the DataTable clears only sorts the view itself set |
| DT-2 (#73) | `rowMenu` opens only on right-click; `kind: "actions"` draws nothing | With `rowMenu` set, draw a ⋯ icon button (ghost, `more` icon, a 44px target with touch) in a sticky last column that opens the same Menu; `rowMenuButton={false}` turns it off. Keyboard: the button is in the row's Tab order |
| DT-3 (#74) | Row-menu items use `onSelect`, which is not documented; an item without it does nothing, silently | Document the item shape in the header comment (`label`, `icon`, `danger`, `disabled`, `separator`, `onSelect`); accept `action` as an alias; in development, `console.warn` once for an item with neither |
| DT-4 (#75) | Search, filters, quick filters, sort, group and view reset on every visit | `useCollectionView(fields, { storageKey })` keeps them in localStorage (wrapped in try/catch; a missing or broken store starts fresh), next to the DataTable's own `storageKey`; a "Reset view" item in the ViewMenu clears it |
| DT-9 (#80) | No text direction per cell: Arabic in a left-to-right cell aligns wrongly and `truncate` cuts the wrong end | `dir="auto"` on text cells (and on `Text`), so alignment and the ellipsis follow the text's own direction |
| DT-11 (#82) | Ticked rows stay selected when a filter or search hides them; the count and the selection actions include them | The command bar's selection count says "N selected (M hidden by filters)" when some are hidden (`selection.hidden` from the DataTable); a DataTable option `keepHiddenSelection` (default true, today's behavior) — false drops hidden rows from the selection when the filters change |
| DT-17 (#88) | A click on a button, link, input or checkbox inside a cell also opens the row and changes the selection | Ignore row clicks and selection clicks that start on an interactive element (`button`, `a`, `input`, `select`, `textarea`, `[role=button]`, `[data-plx-no-row-click]`), the way the built-in row checkbox already does |

Write each fix where the code already lives; keep the style of the file. New tokens (DT-2's button column) go in a new
`platform/tokens/components/data-table-row-menu.tokens.json`. New words go in the component's `strings`.

### Files you own

- `platform/components/DataTable/DataTable.jsx`, `data-table.css`, `tabulator.js`, `strict.js`
- `platform/hooks/useCollectionView.js`
- `platform/components/Text/Text.jsx` (only `dir="auto"` for DT-9)
- `platform/patterns/CommandBar/CommandBar.jsx` (only the hidden count of DT-11) and `platform/patterns/ViewMenu/` (only
  the Reset view item of DT-4)
- `platform/tokens/components/data-table-row-menu.tokens.json` (new)
- `tests/data-table.test.js` (add cases for each fix) and new tests of your own under `tests/`
- Design system (under `lanes/dt-high/design-system/`, see AGENTS.md): only new example cards for the DataTable record,
  in a new part file `lanes/dt-high/design-system/parts/wDTH.records.js` that adds variant pages or examples to the
  existing record through `H.record('data-table')` (look at how parts extend existing records); do not edit
  inventory.js

Never edit generated files, and nothing in `dam/` or the other applications.

### Done means

- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK),
  `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- `node tests/data-table.test.js` passes with your new cases (every existing table view still passes).
- No generated file in the branch (CI: GENERATED_OK). The browser tests pass in CI on the pull request.
- One pull request from branch `codex/101-datatable-high`, `Closes #101`, listing per DT number what changed and how an
  app uses it, anything left undone, and **Needs the owner** (for example the ⋯ column's look).

### Read first

1. `AGENTS.md`
2. `tools/agent/web/BRIEF-web.md` (house rules)
3. `Redsave-v1/docs/plenix-datatable-issues.md` text as quoted in issues #72–#89
4. The header comments of `DataTable.jsx` and `useCollectionView.js`, and `tests/data-table.test.js`
