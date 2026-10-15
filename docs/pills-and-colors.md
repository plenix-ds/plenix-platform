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

### New scales (owner's final values)

**Yellow: waiting / paused**

| Token | Value |
|---|---|
| `--plx-ref-color-yellow-100` | `#fff8df` |
| `--plx-ref-color-yellow-200` | `#f4dfa0` |
| `--plx-ref-color-yellow-300` | `#e8c34a` |
| `--plx-ref-color-yellow-400` | `#d5a300` |
| `--plx-ref-color-yellow-500` | `#b88700` |
| `--plx-ref-color-yellow-700` | `#765600` |
| `--plx-ref-color-yellow-900` | `#4d3800` |

**Orange: action / correction required**

| Token | Value |
|---|---|
| `--plx-ref-color-orange-100` | `#fff0e3` |
| `--plx-ref-color-orange-200` | `#f8d0ad` |
| `--plx-ref-color-orange-300` | `#f2ad70` |
| `--plx-ref-color-orange-500` | `#d96800` |
| `--plx-ref-color-orange-700` | `#963f00` |
| `--plx-ref-color-orange-800` | `#7a3400` |
| `--plx-ref-color-orange-900` | `#5c2800` |

### Existing scales (unchanged)

| Family | 50 / 75 | 100 | 200 | 250 / 350 | 300 | 400 | 500 | 600 / 650 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gray | 75 `#f7f7f8` | `#f3f3f3` | `#e8e9ec` | 350 `#c0c2c8` | `#d0d0d0` | `#a3a6ad` | `#8e9094` | 600 `#6e6e6e` | `#56585e` | `#444444` | `#34363b` | `#1e1f22` |
| Blue | 50 `#f8fafd` | `#ebf0f7` | `#c8dff7` | 250 `#c0ccda` | `#a2c0e3` | `#2a6fdb` | | 600 `#1f5bb8`, 650 `#3d5a80` | `#005a9e` | | `#1f2a3a` | |
| Red | | `#fde7e7` | `#f8aca2` | | `#e96060` | | `#f60000` | | `#b70000` | `#990000` | | |
| Brown | | `#fef3e2` | `#eed2ba` | | `#dfaa7c` | | `#c05a00` | | | `#7d3c00` | `#3a2e22` | `#4a2400` |
| Green | | `#dff6dd` | `#9bd39b` | | `#58ad58` | | `#107c10` | | `#1b5e0c` | | | |
| White / black | white `#ffffff` | | | | | | | | | | black `#000000` | |

## Status pills and category pills

Status pills and category pills use separate color systems.

Status pills use the six semantic variants to communicate workflow meaning: neutral, success, active, waiting, action required, and negative.

Tags and categories retain the 20-color category palette. Each category color uses a soft shade-100 background, a shade-300 border, dark text from the same family, and 4px corners. Category colors identify labels; they do not indicate workflow status.

Do not map tags or categories to the six semantic status variants. The two systems share a consistent pill appearance while preserving their separate purposes.

| Pill type | Color system | Purpose |
|---|---|---|
| Status | The six semantic variants | Communicate workflow meaning |
| Tag / category | The 20-color category palette, with soft shades for each color | Identify and distinguish labels without implying a workflow state |

Examples:

- Approved, when it is a workflow status: success (green).
- Draft, when it is a workflow status: neutral (gray), not waiting (yellow).
- Client, Internal, Print, Web and Hero are descriptive labels: category colors.
- Archive: neutral gray for an Archived workflow state; a category color when it is a user-defined tag.

Brown remains in the category palette. Orange replaces brown only in the semantic status system.

## Category palette: soft shades

Each category color keeps its hue; the shades were computed in OKLCH (lightness changed). Every text color passes WCAG AA on its background. Softened, a few pairs come out close (red and maroon, blue and navy, brown and apricot); their borders and text still differ.

| Category | Base (today) | 100 (background) | 300 (border) | 700 (text) | Text contrast |
|---|---|---|---|---|---|
| Red | `#e6194b` | `#ffefef` | `#ffb4b6` | `#891f31` | 8.18 |
| Green | `#3cb44b` | `#e6fae5` | `#9cde9e` | `#025e17` | 7.33 |
| Yellow | `#ffe119` | `#f9f4da` | `#dccc75` | `#594d02` | 7.63 |
| Blue | `#4363d8` | `#eff3fe` | `#b5c9fe` | `#2d4498` | 7.91 |
| Orange | `#f58231` | `#fff0e8` | `#ffb890` | `#793802` | 7.93 |
| Purple | `#911eb4` | `#faeffe` | `#e7b4fb` | `#6a2e7f` | 8.16 |
| Cyan | `#42d4f4` | `#e2f8fe` | `#6bddf8` | `#045766` | 7.46 |
| Magenta | `#f032e6` | `#ffedfc` | `#f4b0ec` | `#752870` | 8.18 |
| Lime | `#bfef45` | `#eef8df` | `#bbd786` | `#415601` | 7.48 |
| Pink | `#fabed4` | `#ffeef4` | `#f3b7cd` | `#6c3b4f` | 7.91 |
| Teal | `#469990` | `#dafcf7` | `#8adcd2` | `#065a53` | 7.42 |
| Lavender | `#dcbeff` | `#f6f0fe` | `#d9bbfc` | `#5a3e76` | 7.89 |
| Brown | `#9a6324` | `#fff1e4` | `#fabd80` | `#6f4102` | 7.79 |
| Beige | `#fffac8` | `#f7f5da` | `#d2cd9c` | `#544e22` | 7.64 |
| Maroon | `#800000` | `#fff0ed` | `#ffb5a9` | `#892219` | 8.21 |
| Mint | `#aaffc3` | `#e3fbe9` | `#91e0a8` | `#045d2f` | 7.37 |
| Olive | `#808000` | `#f4f6db` | `#cfd17a` | `#515102` | 7.54 |
| Apricot | `#ffd8b1` | `#fff1e4` | `#e9c39c` | `#664522` | 7.77 |
| Navy | `#000075` | `#eef4fe` | `#b1cbfe` | `#244698` | 7.90 |
| Grey | `#a9a9a9` | `#f3f3f3` | `#cacaca` | `#4d4d4d` | 7.62 |
