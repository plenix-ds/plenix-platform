# Button elevation study (#610)

This folder holds the study of how Plenix action buttons look at rest, on hover and when pressed. It contains mocks only; nothing here is library code.

- `elevation-chooser.html`: an interactive chooser that opens by itself (no server, no network). It has light and dark, on the page or on a card, and four button kinds. Each option shows a live button, frozen hover and pressed copies and a disabled button.
  - Clicking a button fills "Your choice" with the option's name and code.
  - `#view=pick&theme=light` (or `dark`) shows only the owner's pick.
- `610-*.png`: the pictures of each round, in order.

## What was tried

- **Round 1** (`610-states-*`, `610-secondary-*`, `610-action-vs-bar-*`):
  - Hover and pressed drawn as solid palette colors instead of see-through layers.
  - A gray secondary button.
  - Action buttons set apart from bar buttons.
- **Round 2** (`610-r2-*`):
  - Three distinct steps for every variant; Danger needed a new red-900 for its third step.
  - The label-centering check: the capitals sat about 1px high because of DM Sans.
  - Three secondary options shown beside a disabled button.
- **Round 3** (`610-r3-*`): the round 2 secondary options, each with and without the faintest shadow (Halo).
- **Round 4** (`610-r4-*`):
  - Action buttons always slightly raised, using the Card builder's recipes: Glow surface with Halo at rest, Lifted on hover, flat when pressed.
  - Three levels compared.
- **Round 5** (`610-r5-standards-light.png`):
  - Round 4 next to Fluent 2 (shadow2, shadow4) and Material 3 (levels 1, 2).
  - Most enterprise systems keep normal buttons flat.
- **Round 6** (`610-r6-chooser-light.png`): the interactive chooser, cut down to the subtle options with "Today: no elevation" first.
- **Round 7** (`610-r7-pick-*`): the owner's pick for secondary, primary, danger and tertiary, in light and dark, on the page and on a card.

## The owner's choices, in order

1. **Round 1:**
   - Hover and pressed must be solid (never see-through).
   - No confirm step before Delete in the command bar.
   - Action buttons and bar buttons must look different; approved as drawn.
2. **Round 2:**
   - Every variant gets three distinct steps; red-900 approved for Danger pressed (built in #630).
   - The label-centering fix approved (built in #630).
   - A gray secondary button rejected: it reads as disabled.
3. **Round 3:** rejected. Action buttons must always be slightly elevated, using the Card builder's elevation craft.
4. **Round 4:**
   - Kept "One lower" and "Recommended".
   - Asked for standards-based choices.
5. **Round 5:** no Material or Fluent look.
6. **Round 6:**
   - Asked for one short list with "Today" first and only subtle options.
7. **Round 7:**
   - Picked G-R4-H: the Card builder's Glow (55%), Halo at rest, Lifted on hover.
   - Noted that Primary and Danger showed no shadow.

## The recipe picked (G-R4-H)

| Part | Rest | Hover | Pressed |
|---|---|---|---|
| Surface | Card builder Glow: `radial-gradient(ellipse at center, fill 55%, rim 100%)` | Glow on the hover fill | Flat (no glow) |
| Shadow | `--plx-sys-shadow-halo` | `--plx-sys-shadow-lifted` | None |
| Disabled | Flat, no glow, no shadow | | |

Fill and rim per kind (light):

| Kind | Rest fill / rim | Hover fill / rim | Pressed |
|---|---|---|---|
| Secondary | white / gray-100 | gray-200 / gray-250 | gray-250 |
| Tertiary | white / gray-100, blue border and text | gray-200 / gray-250 | gray-250 |
| Primary | blue-400 / blue-600 | blue-600 / blue-700 | blue-700 |
| Danger | red-700 / red-800 | red-800 / red-900 | red-900 |

- **Dark:** secondary and tertiary use gray-800 / gray-900 at rest, gray-700 / gray-800 on hover and gray-900 pressed.
- **Primary and Danger edge:** a soft black shadow is lighter than a blue or red fill, so next to it the shadow reads as a blurred edge, not as lift. In the mock their border takes the rim color (blue-600, red-800) and their bottom edge one step deeper (blue-700, red-900). The outermost line is then the darkest, and the Halo and Lifted shadows read as lift. These are existing colors.
- **See-through parts:** only the shadows in light mode (the existing black-alpha shadow roles). In dark mode they are solid black.

## Still to decide

- Whether the darker edge on Primary and Danger is accepted as drawn.
- Whether the glow on Primary and Danger fading to their own next shade is accepted. The Card builder fades to one gray rim.
- In dark mode on the black page, the shadows cannot show (black on black); only the glow shows the lift.
- The build: `button.css` needs per-state shadow and background-image hooks, and component tokens for the glow and the edges.
