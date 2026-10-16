# Task #124: palette to 70 colors, the owner's revised proposal (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/124 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

Apply the owner's revised palette: from today's 83 canonical colors to **70**, exactly as
`docs/color-consolidation/plenix-revised-70-color-proposal.md` says. Read it in full first; its "Complete token migration
chart" (83 rows) is the only source of truth for every destination and value. Then report back with the review below
before anything is final. **No new hex value may appear**; every final value is one of today's.

Today's state (0.31.73, the first consolidation, `tools/agent/color-migration.js` and `docs/color-consolidation/`):
`platform/tokens/reference.tokens.json` holds the 83 canonical colors and 83 retired tokens kept as `$deprecated`
aliases (`{plx-ref.color-<canonical>}`); the themes (`theme-default.light/dark.tokens.json`) map every role to canonical
tokens; categories (`--plx-sys-category-<name>`, `-soft`, `-soft-border`, `-on-soft`) point to canonical tokens.

### The danger: names that survive with a different color

Three names stay but change value: `brown-800` (#7d3c00 → #4d3800), `brown-500` (#c05a00 → #963f00), `yellow-500`
(#b88700 → #d5a300). Their current users must follow the chart by **identity**, not by name:

- today's `brown-800` users → `brown-700` (#7a3400); today's `brown-500` users → `orange-500` (#d96800)
- today's `yellow-900` users → the new `brown-800`; today's `orange-700` users → the new `brown-500`
- today's `yellow-500` users get #d5a300 (the chart's "Revalue"): list each role this changes

So: **never** run sequential find-and-replace, and never change a definition first and fix its users after. Do it in one
pass from a snapshot:

1. Write `docs/color-consolidation/plenix-70-migration.json` from the chart (83 rows: original token, original hex, new
   token, new hex, operation) and check it: 83 rows; 70 distinct new tokens; every new hex is an original hex; within each
   family a higher number is darker (Oklab L), as the proposal states.
2. Write `tools/agent/color-migration-70.js` (in the style of `tools/agent/color-migration.js`; `--apply` to write, a dry
   run without it). It reads the snapshot of today's reference and theme JSON, resolves every reference (a theme role,
   a component token, a deprecated alias) to the token it means **today**, maps that identity through the chart, and
   emits the final reference palette, themes and component tokens in one write.
3. The 83 deprecated aliases from the first consolidation: re-point each to the final destination of what it resolves to
   today (for example `category-brown` → today `brown-500` #c05a00 → final `orange-500`). A retired name that is not reused
   becomes a `$deprecated` alias of its final destination for one release. A reused name (`brown-800`, `brown-500`,
   `yellow-500`) carries only its new value: no alias can keep its old meaning, which is why every user in this repository
   is migrated in the same pass.
4. Grep every `--plx-ref-color-<changed name>` written directly in CSS, JSX or JSON outside the token files (platform/,
   the applications, docs/) and migrate those the same way. Report each.
5. Validate: no reference to a missing token, no circular alias, both themes, every category role; `node build-app.js`
   regenerates the CSS, `tokens.index.json` and the mobile token files.

### The review the owner must see (in the pull request, under "Needs the owner")

The proposal itself asks for a semantic-role review before the nearest-color replacements are final. For every
`--plx-sys-*` role whose resolved hex changes, list the role, light and dark, before → after, and its text-contrast pair
where `CONTRAST_PAIRS` has one (`node tests/run.js contrast` must still pass; never loosen a minimum to make it pass).

Categories need the owner's decision. Under the chart, these collide (today each is distinct; the owner chose the 20
categories to be told apart):

- **Brown** (base brown-500, soft brown-100/300) becomes **Orange**'s exact colors (orange-500, orange-100, orange-300)
- **Lime** (green-150) becomes **Yellow**'s base (yellow-150, formerly yellow-175)
- **Blue** (blue-500) becomes **blue-400**, the primary brand blue (buttons, focus ring, links)
- **Cyan**'s base (cyan-500) becomes cyan-300, the same as its own soft border (decided: see the rule above)
- **Olive** (yellow-600) becomes green-500; **Beige**'s border (yellow-250) becomes orange-200

**Decided by the owner (2026-10-16): a category's border is never its base color.** Wherever a category's
`-soft-border` resolves to the same color as its base (`--plx-sys-category-<name>`), the border takes the next darker
shade of the same family (higher number = darker, Oklab L), never a color from another family and never a new value.
After the chart this means at least:

| Category | Base | Border today → after |
|---|---|---|
| Cyan | cyan-300 | cyan-300 → **cyan-700** (the family is 700 / 300 / 100) |
| Pink | pink-300 | pink-300 → **pink-700** (700 / 300 / 100) |
| Lavender | purple-300 | purple-300 → **purple-500** (900 / 700 / 500 / 300 / 100) |

Check every category for it after the migration (the test should too), apply it, and list each change. Keep the text
(`-on-soft`) contrast on the soft background at 4.5 : 1 or more.

The other collisions are still the owner's to decide. Apply the chart as written, then list these collisions (and any other two categories that end up with the same base,
soft, border or text color) with a short table, so the owner can decide. Do not invent a different mapping.

### Files you own

- `platform/tokens/reference.tokens.json`, `platform/tokens/theme-default.light.tokens.json`,
  `platform/tokens/theme-default.dark.tokens.json`
- `platform/tokens/components/*.tokens.json` and `platform/tokens/components.tokens.json` (only references to changed
  reference colors)
- any CSS, JSX or JSON file that writes a changed `--plx-ref-color-*` name directly (report each)
- `tools/agent/color-migration-70.js` (new), `docs/color-consolidation/plenix-70-migration.json` (new)
- `docs/palette.md` and `docs/pills-and-colors.md` (regenerate: 70 colors, 12 families, the deprecated aliases listed)
- `tests/` (a test that the 70-color palette holds: count, no new hex, the order rule, no missing reference)

Never edit generated files. Do not edit the design system's code (it reads the palette from the tokens).

### Done means

- The quick gates pass: `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK);
  `node --check` on every JS file you wrote; `node tests/run.js contrast formats brand-rules` passes.
- `reference.tokens.json` has exactly 70 canonical colors (Black and White included, the transparent tokens apart) plus
  the deprecated aliases; every theme role and component token resolves.
- No generated file in the branch (CI: GENERATED_OK). If CI cannot start, say so in the pull request.
- One pull request from branch `codex/124-palette-70`, `Closes #124`, with the dry run's report, the role review, the
  category collisions table, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `docs/color-consolidation/plenix-revised-70-color-proposal.md` (the owner's proposal; the chart is authoritative)
3. `tools/agent/color-migration.js` and its report `tools/agent/color-migration.report.txt` (the first consolidation)
4. `docs/pills-and-colors.md` (what each category uses today)
