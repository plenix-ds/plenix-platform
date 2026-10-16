# Task #118: RedSave general fixes (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/118 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

Five items from RedSave's general list (`Redsave-v1/docs/plenix-issues.md` #2, #4, #5, #9, #16; GitHub #59–#64). Each
keeps today's behavior when the new option is not used.

| GitHub | Issue | The fix |
|---|---|---|
| #59 (RS 2) | An extension must bundle Plenix; CDN updates can't reach it | build-packages.js writes `/cdn/<version>/plenix-<version>.zip` (or .tgz): the ESM build, CSS, fonts, vendor files and a manifest of every file with its hash; index.json links it |
| #60 (RS 4) | No compact size for narrow panels (Combobox, Select, Input, SearchField) | `size="sm"` on the four, from the existing small control height role (`--plx-sys-control-height-*`), the same way Button's sizes work; nothing else changes |
| #61 (RS 5) | Toolbar spacing and roving focus break when a child wraps its content in a Stack | Toolbar finds its focusable items inside wrapped children for roving focus, and its spacing applies to the items, not the wrapper; document which children it expects |
| #62 (RS 9) | Muted nav items render red | Recheck first. If they are red, muted NavList items take the muted content role (`--plx-sys-content-muted`), never a feedback color |
| #64 (RS 16) | Combobox "select or create" is hard to find | A docs example on the Combobox record for `creatable` with `onCreate`, single and `multiple`, through a part file (`lanes/redsave-misc/design-system/parts/wRSM.records.js`, adding examples to the existing record through `H.record`) |

Note: field widths (RedSave #3, `.plx-select` at 100%) are NOT in this task: they belong to the composition work (the
pattern sizes its fields), which Claude does later.

### Files you own

- `build-packages.js` (the bundle only)
- `platform/components/Input/` and `platform/components/Combobox/` (only `size="sm"`), `platform/components/SearchField/`
  if it lives apart (only `size="sm"`)
- `platform/components/Toolbar/` (RS 5)
- `platform/patterns/NavPane/` or `platform/components/NavList/` (only the muted color, RS 9)
- new tokens in `platform/tokens/components/field-small.tokens.json` (new) if `size="sm"` needs any
- `tests/` (new cases or tests of your own)
- `lanes/redsave-misc/design-system/parts/wRSM.records.js` (new)

Never edit generated files, CommandBar, the DataTable, or anything in the applications.

### Done means

- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK),
  `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote; `node build-packages.js` writes the bundle.
- `node tests/keyboard.test.js` passes (Toolbar's roving focus).
- No generated file in the branch (CI: GENERATED_OK). If CI cannot start, say so in the pull request.
- One pull request from branch `codex/118-redsave-misc`, `Closes #118`, with what changed per item, anything left undone,
  and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `tools/agent/web/BRIEF-web.md` (house rules)
3. The header comments of the files you edit
