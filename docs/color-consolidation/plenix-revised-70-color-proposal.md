# Plenix color palette — revised 70-color proposal

Status: proposal only. No repository changes have been applied.

## Core rules

- Higher numbers mean darker colors within each family, measured by Oklab lightness.
- Preserve the explicitly protected token names and hex values.
- Remove unwanted shades and merge specified pairs without inventing replacement hex values.
- Carry forward the earlier four-color Orange and five-color Brown consolidation.
- The final palette contains 70 reference colors, including Black and White and excluding unspecified Transparent tokens.

All abbreviated token names below use the prefix `--plx-ref-color-`.

## 1. Replace the three unwanted colors

“Nearest” is measured across the surviving palette using Delta E OK: Euclidean distance in Oklab, comparing lightness and color together.

| Remove | Nearest surviving color | Final destination |
|---|---|---|
| `green-150` — `#bfef45` | `#ffe119` | `yellow-150`, renamed from `yellow-175` |
| `yellow-600` — `#808000` | `#107c10` | `green-500` |
| `yellow-250` — `#d2cd9c` | `#f8d0ad` | `orange-200` |

These are the nearest matches across the whole retained palette, not necessarily within the original family. They are replacements, not visually identical colors.

- Do not introduce `green-400` for `#808000`.
- Remove `green-150: #bfef45`.
- Remove `yellow-250: #d2cd9c`.
- Preserve the five protected Green tokens exactly.

## 2. Merge Yellow 500 and 400

Proposed choice: retain the existing brighter yellow value `#d5a300`, then give it the highest number in the remaining Yellow family.

```text
Original yellow-500 #b88700 -> final yellow-500 #d5a300
Original yellow-400 #d5a300 -> final yellow-500 #d5a300
```

This retains one existing color; it does not average the colors or generate a new shade.

### Revised Yellow

| Final token | Value | Calculated Oklab lightness |
|---|---|---:|
| `yellow-500` | `#d5a300` | 0.7415 |
| `yellow-300` | `#e8c34a` | 0.8278 |
| `yellow-200` | `#f4dfa0` | 0.9062 |
| `yellow-150` | `#ffe119` | 0.9071 |
| `yellow-100` | `#fff8df` | 0.9780 |

Higher number -> lower lightness -> darker color.

`yellow-200` and `yellow-150` have almost equal lightness but different saturation. Their order follows calculated lightness. Renaming `yellow-175` to `yellow-150` is a naming cleanup; its hex stays unchanged.

## 3. Merge the two Cyan colors

Proposed choice: retain the softer existing `cyan-300`.

```text
cyan-500 #42d4f4 -> cyan-300 #6bddf8
```

### Revised Cyan

```css
--plx-ref-color-cyan-700: #045766;
--plx-ref-color-cyan-300: #6bddf8;
--plx-ref-color-cyan-100: #e2f8fe;
```

This preserves the existing soft pill-border color and removes the additional brighter cyan.

## 4. Apply the two Blue merges exactly

| Remove | Retain unchanged |
|---|---|
| `blue-800: #2d4498` | `blue-700: #005a9e` |
| `blue-500: #4363d8` | `blue-400: #2a6fdb` |

No other Blue values change.

### Revised Blue

```css
--plx-ref-color-blue-950: #000075;
--plx-ref-color-blue-900: #1f2a3a;
--plx-ref-color-blue-700: #005a9e;
--plx-ref-color-blue-650: #3d5a80;
--plx-ref-color-blue-600: #1f5bb8;
--plx-ref-color-blue-400: #2a6fdb;
--plx-ref-color-blue-300: #a2c0e3;
--plx-ref-color-blue-250: #c0ccda;
--plx-ref-color-blue-200: #c8dff7;
--plx-ref-color-blue-100: #ebf0f7;
--plx-ref-color-blue-50: #f8fafd;
```

The sequence has been checked: higher numbers are darker by Oklab lightness.

## 5. Preserve the protected colors

No names or hex values change in these groups:

| Family | Retained colors |
|---|---:|
| Gray, including Black and White | 15 |
| Red | 6 |
| Pink | 3 |
| Magenta | 4 |
| Green — the five explicitly protected colors | 5 |
| Teal | 4 |

Purple also remains unchanged because no further changes were specified.

The numeric ordering was checked across the complete proposed palette. All families follow higher number -> darker Oklab lightness; no additional renumbering is needed to satisfy that rule.

## 6. Final counts

These counts carry forward the previous four-color Orange and five-color Brown proposal.

| Family | Final count |
|---|---:|
| Gray | 15 |
| Red | 6 |
| Pink | 3 |
| Magenta | 4 |
| Orange | 4 |
| Brown | 5 |
| Yellow | 5 |
| Green | 5 |
| Teal | 4 |
| Cyan | 3 |
| Blue | 11 |
| Purple | 5 |
| Total | 70 |

## Complete token migration chart

Baseline: the original 83-color palette supplied in this conversation. This chart includes unchanged tokens as well as every rename, merge, and reused-name value change. It maps directly from original identities to final identities; do not apply it as sequential find-and-replace instructions.

| Original token | Original value | New token | New Value | Operation |
|---|---|---|---|---|
| `--plx-ref-color-black` | `#000000` | `--plx-ref-color-black` | `#000000` | Keep — unchanged |
| `--plx-ref-color-gray-950` | `#1e1f22` | `--plx-ref-color-gray-950` | `#1e1f22` | Keep — unchanged |
| `--plx-ref-color-gray-900` | `#34363b` | `--plx-ref-color-gray-900` | `#34363b` | Keep — unchanged |
| `--plx-ref-color-gray-800` | `#444444` | `--plx-ref-color-gray-800` | `#444444` | Keep — unchanged |
| `--plx-ref-color-gray-700` | `#56585e` | `--plx-ref-color-gray-700` | `#56585e` | Keep — unchanged |
| `--plx-ref-color-gray-600` | `#6e6e6e` | `--plx-ref-color-gray-600` | `#6e6e6e` | Keep — unchanged |
| `--plx-ref-color-gray-500` | `#8e9094` | `--plx-ref-color-gray-500` | `#8e9094` | Keep — unchanged |
| `--plx-ref-color-gray-400` | `#a3a6ad` | `--plx-ref-color-gray-400` | `#a3a6ad` | Keep — unchanged |
| `--plx-ref-color-gray-350` | `#c0c2c8` | `--plx-ref-color-gray-350` | `#c0c2c8` | Keep — unchanged |
| `--plx-ref-color-gray-300` | `#d0d0d0` | `--plx-ref-color-gray-300` | `#d0d0d0` | Keep — unchanged |
| `--plx-ref-color-gray-200` | `#e8e9ec` | `--plx-ref-color-gray-200` | `#e8e9ec` | Keep — unchanged |
| `--plx-ref-color-gray-100` | `#f3f3f3` | `--plx-ref-color-gray-100` | `#f3f3f3` | Keep — unchanged |
| `--plx-ref-color-gray-75` | `#f7f7f8` | `--plx-ref-color-gray-75` | `#f7f7f8` | Keep — unchanged |
| `--plx-ref-color-gray-50` | `#fcfcfc` | `--plx-ref-color-gray-50` | `#fcfcfc` | Keep — unchanged |
| `--plx-ref-color-white` | `#ffffff` | `--plx-ref-color-white` | `#ffffff` | Keep — unchanged |
| `--plx-ref-color-red-800` | `#990000` | `--plx-ref-color-red-800` | `#990000` | Keep — unchanged |
| `--plx-ref-color-red-700` | `#b70000` | `--plx-ref-color-red-700` | `#b70000` | Keep — unchanged |
| `--plx-ref-color-red-500` | `#f60000` | `--plx-ref-color-red-500` | `#f60000` | Keep — unchanged |
| `--plx-ref-color-red-300` | `#e96060` | `--plx-ref-color-red-300` | `#e96060` | Keep — unchanged |
| `--plx-ref-color-red-200` | `#f8aca2` | `--plx-ref-color-red-200` | `#f8aca2` | Keep — unchanged |
| `--plx-ref-color-red-100` | `#fde7e7` | `--plx-ref-color-red-100` | `#fde7e7` | Keep — unchanged |
| `--plx-ref-color-pink-700` | `#6c3b4f` | `--plx-ref-color-pink-700` | `#6c3b4f` | Keep — unchanged |
| `--plx-ref-color-pink-300` | `#f3b7cd` | `--plx-ref-color-pink-300` | `#f3b7cd` | Keep — unchanged |
| `--plx-ref-color-pink-100` | `#ffeef4` | `--plx-ref-color-pink-100` | `#ffeef4` | Keep — unchanged |
| `--plx-ref-color-magenta-700` | `#752870` | `--plx-ref-color-magenta-700` | `#752870` | Keep — unchanged |
| `--plx-ref-color-magenta-500` | `#f032e6` | `--plx-ref-color-magenta-500` | `#f032e6` | Keep — unchanged |
| `--plx-ref-color-magenta-300` | `#f4b0ec` | `--plx-ref-color-magenta-300` | `#f4b0ec` | Keep — unchanged |
| `--plx-ref-color-magenta-100` | `#ffedfc` | `--plx-ref-color-magenta-100` | `#ffedfc` | Keep — unchanged |
| `--plx-ref-color-orange-900` | `#5c2800` | `--plx-ref-color-brown-800` | `#4d3800` | Merge — value changes |
| `--plx-ref-color-orange-800` | `#7a3400` | `--plx-ref-color-brown-700` | `#7a3400` | Rename — same value |
| `--plx-ref-color-orange-700` | `#963f00` | `--plx-ref-color-brown-500` | `#963f00` | Rename — same value |
| `--plx-ref-color-orange-500` | `#d96800` | `--plx-ref-color-orange-500` | `#d96800` | Keep — unchanged |
| `--plx-ref-color-orange-300` | `#f2ad70` | `--plx-ref-color-orange-300` | `#f2ad70` | Keep — unchanged |
| `--plx-ref-color-orange-200` | `#f8d0ad` | `--plx-ref-color-orange-200` | `#f8d0ad` | Keep — unchanged |
| `--plx-ref-color-orange-100` | `#fff0e3` | `--plx-ref-color-orange-100` | `#fff0e3` | Keep — unchanged |
| `--plx-ref-color-brown-900` | `#3a2e22` | `--plx-ref-color-brown-900` | `#3a2e22` | Keep — unchanged |
| `--plx-ref-color-brown-800` | `#7d3c00` | `--plx-ref-color-brown-700` | `#7a3400` | Merge — value changes |
| `--plx-ref-color-brown-500` | `#c05a00` | `--plx-ref-color-orange-500` | `#d96800` | Merge — value changes |
| `--plx-ref-color-brown-300` | `#dfaa7c` | `--plx-ref-color-orange-300` | `#f2ad70` | Merge — value changes |
| `--plx-ref-color-brown-200` | `#eed2ba` | `--plx-ref-color-orange-200` | `#f8d0ad` | Merge — value changes |
| `--plx-ref-color-brown-100` | `#fef3e2` | `--plx-ref-color-orange-100` | `#fff0e3` | Merge — value changes |
| `--plx-ref-color-yellow-900` | `#4d3800` | `--plx-ref-color-brown-800` | `#4d3800` | Rename — same value |
| `--plx-ref-color-yellow-700` | `#765600` | `--plx-ref-color-brown-600` | `#765600` | Rename — same value |
| `--plx-ref-color-yellow-600` | `#808000` | `--plx-ref-color-green-500` | `#107c10` | Merge — value changes |
| `--plx-ref-color-yellow-500` | `#b88700` | `--plx-ref-color-yellow-500` | `#d5a300` | Revalue — same token name |
| `--plx-ref-color-yellow-400` | `#d5a300` | `--plx-ref-color-yellow-500` | `#d5a300` | Rename — same value |
| `--plx-ref-color-yellow-300` | `#e8c34a` | `--plx-ref-color-yellow-300` | `#e8c34a` | Keep — unchanged |
| `--plx-ref-color-yellow-250` | `#d2cd9c` | `--plx-ref-color-orange-200` | `#f8d0ad` | Merge — value changes |
| `--plx-ref-color-yellow-200` | `#f4dfa0` | `--plx-ref-color-yellow-200` | `#f4dfa0` | Keep — unchanged |
| `--plx-ref-color-yellow-175` | `#ffe119` | `--plx-ref-color-yellow-150` | `#ffe119` | Rename — same value |
| `--plx-ref-color-yellow-100` | `#fff8df` | `--plx-ref-color-yellow-100` | `#fff8df` | Keep — unchanged |
| `--plx-ref-color-green-700` | `#1b5e0c` | `--plx-ref-color-green-700` | `#1b5e0c` | Keep — unchanged |
| `--plx-ref-color-green-500` | `#107c10` | `--plx-ref-color-green-500` | `#107c10` | Keep — unchanged |
| `--plx-ref-color-green-300` | `#58ad58` | `--plx-ref-color-green-300` | `#58ad58` | Keep — unchanged |
| `--plx-ref-color-green-200` | `#9bd39b` | `--plx-ref-color-green-200` | `#9bd39b` | Keep — unchanged |
| `--plx-ref-color-green-150` | `#bfef45` | `--plx-ref-color-yellow-150` | `#ffe119` | Merge — value changes |
| `--plx-ref-color-green-100` | `#dff6dd` | `--plx-ref-color-green-100` | `#dff6dd` | Keep — unchanged |
| `--plx-ref-color-teal-700` | `#065a53` | `--plx-ref-color-teal-700` | `#065a53` | Keep — unchanged |
| `--plx-ref-color-teal-500` | `#469990` | `--plx-ref-color-teal-500` | `#469990` | Keep — unchanged |
| `--plx-ref-color-teal-300` | `#8adcd2` | `--plx-ref-color-teal-300` | `#8adcd2` | Keep — unchanged |
| `--plx-ref-color-teal-100` | `#dafcf7` | `--plx-ref-color-teal-100` | `#dafcf7` | Keep — unchanged |
| `--plx-ref-color-cyan-700` | `#045766` | `--plx-ref-color-cyan-700` | `#045766` | Keep — unchanged |
| `--plx-ref-color-cyan-500` | `#42d4f4` | `--plx-ref-color-cyan-300` | `#6bddf8` | Merge — value changes |
| `--plx-ref-color-cyan-300` | `#6bddf8` | `--plx-ref-color-cyan-300` | `#6bddf8` | Keep — unchanged |
| `--plx-ref-color-cyan-100` | `#e2f8fe` | `--plx-ref-color-cyan-100` | `#e2f8fe` | Keep — unchanged |
| `--plx-ref-color-blue-950` | `#000075` | `--plx-ref-color-blue-950` | `#000075` | Keep — unchanged |
| `--plx-ref-color-blue-900` | `#1f2a3a` | `--plx-ref-color-blue-900` | `#1f2a3a` | Keep — unchanged |
| `--plx-ref-color-blue-800` | `#2d4498` | `--plx-ref-color-blue-700` | `#005a9e` | Merge — value changes |
| `--plx-ref-color-blue-700` | `#005a9e` | `--plx-ref-color-blue-700` | `#005a9e` | Keep — unchanged |
| `--plx-ref-color-blue-650` | `#3d5a80` | `--plx-ref-color-blue-650` | `#3d5a80` | Keep — unchanged |
| `--plx-ref-color-blue-600` | `#1f5bb8` | `--plx-ref-color-blue-600` | `#1f5bb8` | Keep — unchanged |
| `--plx-ref-color-blue-500` | `#4363d8` | `--plx-ref-color-blue-400` | `#2a6fdb` | Merge — value changes |
| `--plx-ref-color-blue-400` | `#2a6fdb` | `--plx-ref-color-blue-400` | `#2a6fdb` | Keep — unchanged |
| `--plx-ref-color-blue-300` | `#a2c0e3` | `--plx-ref-color-blue-300` | `#a2c0e3` | Keep — unchanged |
| `--plx-ref-color-blue-250` | `#c0ccda` | `--plx-ref-color-blue-250` | `#c0ccda` | Keep — unchanged |
| `--plx-ref-color-blue-200` | `#c8dff7` | `--plx-ref-color-blue-200` | `#c8dff7` | Keep — unchanged |
| `--plx-ref-color-blue-100` | `#ebf0f7` | `--plx-ref-color-blue-100` | `#ebf0f7` | Keep — unchanged |
| `--plx-ref-color-blue-50` | `#f8fafd` | `--plx-ref-color-blue-50` | `#f8fafd` | Keep — unchanged |
| `--plx-ref-color-purple-900` | `#551a8b` | `--plx-ref-color-purple-900` | `#551a8b` | Keep — unchanged |
| `--plx-ref-color-purple-700` | `#6a2e7f` | `--plx-ref-color-purple-700` | `#6a2e7f` | Keep — unchanged |
| `--plx-ref-color-purple-500` | `#911eb4` | `--plx-ref-color-purple-500` | `#911eb4` | Keep — unchanged |
| `--plx-ref-color-purple-300` | `#d7aefb` | `--plx-ref-color-purple-300` | `#d7aefb` | Keep — unchanged |
| `--plx-ref-color-purple-100` | `#f6f0fe` | `--plx-ref-color-purple-100` | `#f6f0fe` | Keep — unchanged |

Chart verification: 83 original tokens map to 70 final token identities. Tokens marked Keep remain unchanged. No new hex values are introduced.

## 7. Migration safeguards

### Critical migration requirement

Two Brown names are being reused with different values:

| Token name | Before | After |
|---|---|---|
| `--plx-ref-color-brown-800` | `#7d3c00` | `#4d3800` |
| `--plx-ref-color-brown-500` | `#c05a00` | `#963f00` |

Therefore, Claude must migrate references from a snapshot of the original definitions. It must not change these definitions first and then try to infer where their original consumers belong.

The same applies to temporary aliases: an alias resolves through its destination, so aliasing an old name to a destination that is later reassigned can silently change its result. See [Design Tokens Format Module — Aliases / References](https://www.designtokens.org/TR/2025.10/format/#aliases-references).

In particular:

- Original consumers of `brown-800: #7d3c00` migrate to `brown-700: #7a3400`; they must not accidentally inherit the new `brown-800: #4d3800`.
- Original consumers of `brown-500: #c05a00` migrate to `orange-500: #d96800`; they must not accidentally inherit the new `brown-500: #963f00`.
- Original `yellow-900: #4d3800` consumers migrate to the final `brown-800`.
- Original `orange-700: #963f00` consumers migrate to the final `brown-500`.
- `yellow-500` is also reused: its original value `#b88700` becomes `#d5a300`. Track this explicitly rather than treating the unchanged name as an unchanged color.

Use an atomic migration from the original reference graph, or a separately namespaced staging map. A deprecated alias cannot safely retain its old meaning under a name that is simultaneously reused for a different canonical value. Validate alias resolution, missing references, circular references, all themes, and affected semantic roles before removing compatibility entries.


The synchronized proposal comprises the plan, JSON manifest, and CSV change log covering every token in the supplied 83-color baseline.

An important collision is `yellow-500`: its name survives, but its value changes from `#b88700` to `#d5a300`. The previously identified Brown name collisions also remain.
One recommendation before finalizing, I would retain all 70 selected colors and their token names. However, I would require semantic-role review before applying the three nearest-color replacements.
Claude must:

1. Snapshot the original definitions and their consumers.
2. Resolve each original token to its final destination using the change log.
3. Emit the final definitions, rather than running sequential global replacements.
4. Preserve system-role names and category identities.
5. Review changed colors, validate references, and regenerate CSS and documentation.

No repository changes have been applied. This remains a revised proposal.

## Color-difference method

W3C CSS Color Module Level 4 — Delta E OK:
https://www.w3.org/TR/css-color-4/#color-difference-OK
