### Changed
- Action buttons are slightly raised (#610; the owner's pick G-R4-H): secondary, tertiary, primary and danger.
  - At rest they carry the Card builder's Glow (the fill to 55%, fading to its rim) and the Halo shadow.
  - On hover, the Glow sits on the hover fill with the Lifted shadow. Pressed and disabled are flat.
  - Ghost buttons, buttons in a bar (Toolbar, command bars, FilterBar, AppHeader) and the 2xs size stay flat.
- Primary and danger: the border is the glow's rim (blue 600, red 800) and the bottom edge one shade deeper (blue 700, red 900). Hovered, the border is one shade deeper.
- Secondary: the hover fill is gray 200 (dark gray 700) and the pressed fill gray 250 (dark gray 900).
- Tertiary sits on the control fill (white, dark gray 800) and hovers gray, as secondary does; it is still outlined in the action blue. Its words use the link blue (blue 600, dark blue 200), so they pass 4.5:1 on every fill.

### Added
- Button hooks for the raised look: per-state glow (background image), bottom edge and shadow. Bars set the context hooks `--plx-comp-button-context-glow` and `--plx-comp-button-context-elevation` to `none`.
- The tokens for the glows, the shadows and the bottom edges (`--plx-comp-button-*-glow-image`, `-raised-*-shadow`, `-border-end`), and the roles `--plx-sys-control-raised-hover-rim` and `--plx-sys-control-raised-pressed`, from existing colors.
