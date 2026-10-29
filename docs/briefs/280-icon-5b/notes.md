# Icon stage 5b (#551): CSS-masked icons become Icon children

Part of #280. The icons that 10 component stylesheets drew with `mask-image` are now `<Icon>` children, imported from their icon modules. No test was run.

## What changed
- Each masked element keeps its class, its size tokens, its position and its turn. It now holds `<Icon icon={Module} filled={false} />` and sets these on itself:
  - `--plx-comp-icon-size`: its own size token, so the icon fills its box.
  - `--plx-comp-icon-context-show-20: block` and `--plx-comp-icon-context-show-24: none`: the mask always drew optical size 20, so Comfortable density keeps the 20 drawing.
  - `color`: its old `background-color` token. The mask painted with its background; the Icon paints with the text color.
- `filled={false}` on every one: the masks were always the outline, also inside a selected or pressed element.

| Component | Element | Icon module (symbol) |
|---|---|---|
| Button | `plx-button__caret` | chevron-down (expand_more) |
| Combobox, TimeZoneSelect | `plx-combobox__chevron` | select-chevron (keyboard_arrow_down) |
| Cascader | `plx-cascader__chevron` | select-chevron |
| TreeSelect | `plx-tree-select__chevron` | select-chevron |
| Input (Select, both kinds) | new `plx-select__chevron`, the wrapper's last child (was `.plx-select::after`) | select-chevron |
| Menu | `plx-menu__check` (the Icon only while checked) | check (check_small) |
| MillerColumns | `plx-miller-columns__chevron` | chevron-right |
| Tabs | `plx-tabs__more-caret` | caret (arrow_drop_down) |
| TimePicker | `plx-time-picker__icon` (both) | schedule |
| Tree, TreeSelect | `plx-tree__toggle` (the Icon only on a row with children; a leaf's toggle stays hidden and empty) | square-plus (add_box), square-minus (indeterminate_check_box) |

## Masks that stay
- `Brand/brand.css`, `.plx-brand-mark`: the brand mark (brand.json `files.mark`) is not an icon of the set. It is the site's own logo, drawn as a mask so the tokens color it.
- `Icon/icon.css`: the Icon component's own mask, used by a bare `plx-icon plx-icon--<name>` class. Stage 5c removes it.

## Tokens and classes
- Removed: `--plx-comp-tree-toggle-size`. Only the old `-webkit-mask-size` read it, and check-style refuses an unread token. `--plx-comp-tree-toggle-mask-size` (the same 16px) now sizes the icon.
- Kept as they are: the `*-background` and `*-after-*` token names (for example `--plx-comp-cascader-chevron-background`, `--plx-comp-select-after-width`). They are public settings, and they now set `color`. A rename would be its own change.
- New class: `plx-select__chevron`. Every other class name is unchanged.
- Removed rules: `.plx-button__caret--current` (the caret now inherits the label's color; the class stays on the element), `.plx-menu__check.is-checked`, `.plx-tree__toggle.is-open` and `.plx-select::after`.

## Differences to expect
- **MillerColumns, right to left:** the Plenix chevron-right mirrors in right to left (`icon.css`), so the chevron now points to the next column. The mask did not mirror. This is the one intended visual difference; the Lead decides whether it stays.
- **A page that writes a Select's markup by hand** (a `<span class="plx-select"><select>` without the React component) loses its chevron until it adds `<span class="plx-select__chevron"><span class="plx-icon plx-icon--select-chevron"></span></span>`. The spec's labs are updated (below). No application page or site in this repository writes it.

## Spec (lane 551-icon-5b)
- The labs that write these elements as HTML strings now put the icon inside, as a bare `plx-icon plx-icon--<name>` class: the Button caret (button-lab, more-labs, w05A, w05B, w06C, w07K), the Combobox, Cascader, TreeSelect, MillerColumns and TimePicker chevrons (more-labs, w06C, w07A, w07B, w07C), the Tree toggles (w07C, w12A) and the native Select (form-labs, w06A, w06C, w07B, w08B, w12A).
- The token labs measure the chevron and clock colors as `color` (they measured `background-color`). The native-select lab measures the chevron on `.plx-select__chevron` instead of `::after`.
- `spec-parts.js` was rebuilt by build-app after the overlay.

## Tests (not run)
- `tests/visual.test.js` measures the caret's `color` instead of `background-color`. In `tests/baselines/button.json`, the 210 caret entries are renamed to match, with the same values: the caret's paint moved from its background to its text color, so each computed value is unchanged.
- The computed-style hash baselines (`tests/baselines/computed.json`, `computed-ds.json`, `pilot-computed.json`) list these elements, which now have new children and different properties. They need a refresh (`--update`) when the owner runs the tests.

## Proof (prepared; it runs only when the owner starts it)
- `docs/briefs/280-icon-5b/pixel-pages.js` photographs the record pages of the changed components and the 10 application pages, before 5b (a7de2929) and after. It covers Compact and Comfortable density, left to right and right to left, and counts the pixels that differ. The script's header gives the steps.
- `tools/agent/datagrid/icon-compare.js` (the whole icon set) is unaffected: no icon drawing changed.

## Gates
- build-app OK, SYSTEM_OK (icon-imports OK, with no new exception), STYLE_OK, SPEC_OK, and lint:css on the changed stylesheets (0 errors; 6 duplicate-selector warnings, none on a changed line).
