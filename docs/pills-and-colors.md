# Plenix pills and color values

Status: owner decisions of 2026-10-14, for review before implementation. Contrast validation remains a release check.

## The pill rule

Pills in filter values, tables, tags and statuses use a soft background from their assigned color family:

- **Background:** shade 100.
- **Border:** shade 300, 1px.
- **Text:** a dark shade from the same family (700, or 800 for red).
- **Radius:** 4px on every pill.

"Two shades darker" follows the sequence 100 → 200 → 300. The fill color is never used as the border fallback; missing shades are defined instead.

## What each color means

- **Yellow:** waiting or paused.
- **Orange:** action or correction required. Orange replaces brown for semantic statuses such as "Changes requested" and "Needs attention".
- **Red:** blocked or unsuccessful.
- **Brown:** kept only for non-semantic reference and category colors; never for a status.

## Pill variants

| Variant | Meaning | Background | Border | Text | Text contrast on background |
|---|---|---|---|---|---|
| Neutral (default) | no particular state | gray-100 `#f3f3f3` | gray-300 `#d0d0d0` | gray-700 `#56585e` | 6.41 : 1 |
| Success | done, approved, healthy | green-100 `#dff6dd` | green-300 `#58ad58` | green-700 `#1b5e0c` | 6.92 : 1 |
| Active | in progress, current, information | blue-100 `#ebf0f7` | blue-300 `#a2c0e3` | blue-700 `#005a9e` | 6.20 : 1 |
| Waiting | waiting, paused | yellow-100 `#fff8df` | yellow-300 `#e8c34a` | yellow-700 `#765600` | 6.37 : 1 |
| Action required | action or correction required | orange-100 `#fff0e3` | orange-300 `#f2ad70` | orange-700 `#963f00` | 6.26 : 1 |
| Negative | failed, error, rejected | red-100 `#fde7e7` | red-300 `#e96060` | red-800 `#990000` | 7.54 : 1 |

All text pairs pass WCAG AA for normal text (4.5 : 1). The borders are decorative: the text carries the meaning, so the 3 : 1 non-text rule does not apply to them.

The variants as CSS (owner's proposal; in Plenix they become the Badge component's tokens and tones):

```css
.pill                   { --pill-bg: var(--plx-ref-color-gray-100);   --pill-border: var(--plx-ref-color-gray-300);   --pill-text: var(--plx-ref-color-gray-700); }
.pill--success          { --pill-bg: var(--plx-ref-color-green-100);  --pill-border: var(--plx-ref-color-green-300);  --pill-text: var(--plx-ref-color-green-700); }
.pill--active           { --pill-bg: var(--plx-ref-color-blue-100);   --pill-border: var(--plx-ref-color-blue-300);   --pill-text: var(--plx-ref-color-blue-700); }
.pill--waiting          { --pill-bg: var(--plx-ref-color-yellow-100); --pill-border: var(--plx-ref-color-yellow-300); --pill-text: var(--plx-ref-color-yellow-700); }
.pill--action-required  { --pill-bg: var(--plx-ref-color-orange-100); --pill-border: var(--plx-ref-color-orange-300); --pill-text: var(--plx-ref-color-orange-700); }
.pill--negative         { --pill-bg: var(--plx-ref-color-red-100);    --pill-border: var(--plx-ref-color-red-300);    --pill-text: var(--plx-ref-color-red-800); }
.pill--neutral          { --pill-bg: var(--plx-ref-color-gray-100);   --pill-border: var(--plx-ref-color-gray-300);   --pill-text: var(--plx-ref-color-gray-700); }
```

Mapping from today's Badge tones: neutral → Neutral, success → Success, info → Active, warning → Waiting, danger → Negative. Action required is new.

## Reference palette

The whole canonical palette, 83 colors in 12 families, is in [palette.md](palette.md), generated from the tokens. Pills take every color from it by token name.

## Status pills and category pills

Status pills and category pills use separate color systems.

Status pills use the six semantic variants to communicate workflow meaning: neutral, success, active, waiting, action required, and negative.

Tags and categories keep their 20 categories, each mapped to canonical palette tokens. Each category color uses a soft shade-100 background, a shade-300 border, dark text from the same family, and 4px corners. Category colors identify labels; they do not indicate workflow status.

Do not map tags or categories to the six semantic status variants. The two systems share a consistent pill appearance while preserving their separate purposes.

| Pill type | Color system | Purpose |
|---|---|---|
| Status | The six semantic variants | Communicate workflow meaning |
| Tag / category | The 20 categories, each mapped to canonical palette tokens | Identify and distinguish labels without implying a workflow state |

Examples:

- Approved, when it is a workflow status: success (green).
- Draft, when it is a workflow status: neutral (gray), not waiting (yellow).
- Client, Internal, Print, Web and Hero are descriptive labels: category colors.
- Archive: neutral gray for an Archived workflow state; a category color when it is a user-defined tag.

Brown remains a category. Orange replaces brown only in the semantic status system.

## Category palette

Categories keep their names and roles (`--plx-sys-category-<name>`, `-soft`, `-soft-border`, `-on-soft`), but every role points to a token of the canonical palette (owner, 2026-10-15, the palette consolidation; `docs/color-consolidation/`). The category primitives (`--plx-ref-color-category-*`) are retired: they remain one release as deprecated aliases.

- A component that needs a category color reads the role, never a value; the role names its canonical token.
- Several categories now share soft shades (Green, Lime and Mint; Blue and Navy; Red and Maroon); their base colors and names still tell them apart.
- Every text color passes WCAG AA (4.5 : 1) on its background.

| Category | Base | Background (soft) | Border (soft-border) | Text (on-soft) | Text contrast |
|---|---|---|---|---|---|
| Red | red-500 `#f60000` | red-100 `#fde7e7` | red-200 `#f8aca2` | red-800 `#990000` | 7.54 |
| Green | green-300 `#58ad58` | green-100 `#dff6dd` | green-200 `#9bd39b` | green-700 `#1b5e0c` | 6.92 |
| Yellow | yellow-175 `#ffe119` | yellow-100 `#fff8df` | yellow-300 `#e8c34a` | yellow-700 `#765600` | 6.37 |
| Blue | blue-500 `#4363d8` | blue-100 `#ebf0f7` | blue-300 `#a2c0e3` | blue-800 `#2d4498` | 7.67 |
| Orange | orange-500 `#d96800` | orange-100 `#fff0e3` | orange-300 `#f2ad70` | orange-800 `#7a3400` | 8.12 |
| Purple | purple-500 `#911eb4` | purple-100 `#f6f0fe` | purple-300 `#d7aefb` | purple-700 `#6a2e7f` | 8.14 |
| Cyan | cyan-500 `#42d4f4` | cyan-100 `#e2f8fe` | cyan-300 `#6bddf8` | cyan-700 `#045766` | 7.46 |
| Magenta | magenta-500 `#f032e6` | magenta-100 `#ffedfc` | magenta-300 `#f4b0ec` | magenta-700 `#752870` | 8.18 |
| Lime | green-150 `#bfef45` | green-100 `#dff6dd` | green-200 `#9bd39b` | green-700 `#1b5e0c` | 6.92 |
| Pink | pink-300 `#f3b7cd` | pink-100 `#ffeef4` | pink-300 `#f3b7cd` | pink-700 `#6c3b4f` | 7.91 |
| Teal | teal-500 `#469990` | teal-100 `#dafcf7` | teal-300 `#8adcd2` | teal-700 `#065a53` | 7.42 |
| Lavender | purple-300 `#d7aefb` | purple-100 `#f6f0fe` | purple-300 `#d7aefb` | purple-700 `#6a2e7f` | 8.14 |
| Brown | brown-500 `#c05a00` | brown-100 `#fef3e2` | brown-300 `#dfaa7c` | brown-800 `#7d3c00` | 7.60 |
| Beige | yellow-100 `#fff8df` | yellow-100 `#fff8df` | yellow-250 `#d2cd9c` | yellow-700 `#765600` | 6.37 |
| Maroon | red-800 `#990000` | red-100 `#fde7e7` | red-200 `#f8aca2` | red-800 `#990000` | 7.54 |
| Mint | green-100 `#dff6dd` | green-100 `#dff6dd` | green-200 `#9bd39b` | green-700 `#1b5e0c` | 6.92 |
| Olive | yellow-600 `#808000` | yellow-100 `#fff8df` | yellow-250 `#d2cd9c` | yellow-700 `#765600` | 6.37 |
| Apricot | orange-200 `#f8d0ad` | orange-100 `#fff0e3` | orange-300 `#f2ad70` | brown-800 `#7d3c00` | 7.48 |
| Navy | blue-950 `#000075` | blue-100 `#ebf0f7` | blue-300 `#a2c0e3` | blue-800 `#2d4498` | 7.67 |
| Grey | gray-400 `#a3a6ad` | gray-100 `#f3f3f3` | gray-300 `#d0d0d0` | gray-700 `#56585e` | 6.41 |
