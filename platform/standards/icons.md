# Plenix icon guidance

The rules every Plenix icon follows. The numbers are measured from the working set (Material Symbols Sharp, weight 300,
178 symbols in `platform/icons/`) by `tools/icons/measure-material.js`; the results are in
`platform/icons/inventory/material-measure.json`. `tools/icons/check-icon.js` tests a file against these rules and
`tools/icons/restyle-icon.js` makes a file follow them. The numbers live in `tools/icons/lib/guidance.js`: change a rule
there and here together, and only after measuring again.

Units: every drawing uses the canvas `viewBox="0 -960 960 960"`. A "unit" is 1/960 of the square.

## 1. Canvas and optical sizes

- Every drawing is a square canvas `0 -960 960 960`.
- Each icon has two optical sizes, drawn separately:
  - **20**: 48 units = 1px. Used at sizes `xs` (12px), `sm` (16px) and `md` (20px).
  - **24**: 40 units = 1px. Used at sizes `lg` (24px) and `xl` (48px), in Comfortable regions and in 24px containers.
- Each optical size has an outline and a filled version: four files per icon (`<name>.svg`, `-fill`, `-24`, `-24-fill`).
- The icon square includes the padding; the system adds none around it.

| Size | Square | Optical drawing | Line on screen |
|---|---:|---:|---:|
| `xs` | 12px | 20 | 0.65px |
| `sm` | 16px | 20 | 0.87px |
| `md` | 20px | 20 | 1.08px |
| `lg` | 24px | 24 | 1.5px |
| `xl` | 48px | 24 | 3px |

## 2. Line weight

- Optical size 20: lines are **52 units** wide (1.08px at 20px). Measured median 1.10px, 10th percentile 1.08px.
- Optical size 24: lines are **60 units** wide (1.5px at 24px). Measured median 1.53px, 10th percentile 1.50px.
- One weight per drawing: every line, curve and outline edge has the same width.
- Tolerance in the check: 4 units either way.
- Diagonal lines keep the same width measured across the line (a run across a 45° line reads about 1.41 times wider).

## 3. Line ends and corners (straight edges)

- Line ends are flat: cut square across the line, never rounded.
- Straight segments meet at a sharp corner: corner radius 0. The working set has no rounded corner on any rectangle,
  frame or bend.
- A curve appears only where the shape itself is round (a circle, an arc, a paperclip's bend). The check counts a
  "rounded corner" when curves shorter than 3px together join two straight segments that turn more than 20°.
- 15 Material symbols at 20 and 11 at 24 have such short curves on purpose (`attach_file`, `settings`, `share`, `mic_off` and
  others: round by nature). The check reports them; new icons do not add any.
- Sharp joins use a miter limit of 4: an angle sharper than about 29° is cut flat (beveled) instead of drawn as a
  long spike.

## 4. Keylines and live area

The outline of an icon's main shape follows one of four keyline shapes (outer edges, stroke included):

| Keyline | Optical 24 (units) | Optical 24 (px) | Optical 20 (units) | Optical 20 (px) |
|---|---|---|---|---|
| Circle | 100–860 square | 19 × 19 | 116–844 square | 15.17 × 15.17 |
| Square | 140–820 square | 17 × 17 | 164–796 square | 13.17 × 13.17 |
| Portrait | 180–780 × 100–860 | 15 × 19 | 212–748 × 116–844 | 11.17 × 15.17 |
| Landscape | 100–860 × 180–780 | 19 × 15 | 116–844 × 212–748 | 15.17 × 11.17 |

- Measured examples: `save`, `image` = square; `account_circle`, `settings` = circle; `description`, `delete`, `home` =
  portrait; `folder`, `mail` = landscape.
- An icon is no larger than the circle keyline. Smaller marks (`add`, `close`, `check`) keep their own size,
  centered.
- The 20 drawing keeps almost the same padding in pixels as the 24 drawing (2.42 instead of 2.5px) and shrinks the
  live area: it is drawn again for its size, not scaled down.

## 5. Padding

- Nothing comes nearer the edge than **80 units**: 1/12 of the square (2px at 24, 1.67px at 20).
- Measured: 10% of the working set comes closer than 1.72px at 20; 16 symbols use the padding for wide shapes
  (`visibility`, `group`, `folder_open`, `warning`, `crop` and others). New icons do not.

## 6. The grid

- Optical size 24: straight horizontal and vertical edges sit on the half-pixel grid, multiples of 20 units. With
  60-unit lines, a line's center sits at 20k + 10 units and both of its edges land on the grid.
- Optical size 20: edges sit on multiples of 4 units (the keylines 116, 164 and 212 are on it); a line's center sits at
  4k + 2.
- Curves and diagonals are not snapped.
- The check warns, and does not fail, when fewer than 90% of straight edges are on the grid: the working set itself
  has 56% at 24, because its small details are placed freely.

## 7. Construction

- One `<path>` with a filled outline, nonzero fill. No strokes, masks, clip paths, definitions, transforms or
  `<use>`.
- One color: no `fill` attribute, so the icon takes the current text color.
- Coordinates rounded to 2 decimals.
- 5 working-set symbols (`auto_awesome`, `drive_file_rename_outline`, `photo_filter`, `push_pin`, `smart_button`) still
  use Google's older pixel canvas (`0 0 20 20` / `0 0 24 24`); 416 files of the full library do. They draw the same;
  new icons use the `0 -960 960 960` canvas.

## 8. Outline and filled

- Outline is the default. The filled version marks the current or selected state, owned by the component that has
  that state (Icon `filled`).
- Filled: the main closed shape is solid; the lines inside it are cut out of it; round marks (dots, rings) are solid.
  The outer edge stays where the outline's edge is, so outline and filled have the same size.
- An icon with no closed shape (a flip arrow, a plain line) has no different filled drawing: the filled file is the
  outline.

## 9. Sources

- The working set is Material Symbols Sharp, used exactly as published: never edit, redraw, re-pad or re-weight those
  files (`platform/icons/README.md`).
- Icons from other libraries enter through the inventory (`platform/icons/inventory/`): they are restyled to these
  rules, checked, and shown to the owner. Only an approved icon joins the working set; replacing an icon the apps
  draw today is a pixel change and waits for the owner.
- Logos and flags (Devicon, Simple Icons, Flagpack) are never restyled: a brand's mark stays as the brand draws it.
