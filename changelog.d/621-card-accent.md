### Breaking
- **Card `accent` is removed (#621).** Remove `accent` from your Cards. If the color carried meaning (a project's or a calendar's color), show it inside the card instead: a `ColorSwatch color={…}` beside the meta text, a `ProgressBar color={…}` when the card shows progress, or the color's name in a `Tag`. Never set a border color yourself; app CSS stays forbidden.
  - The `accent` prop, `.plx-card--accent` and the token `--plx-comp-card-accent-border-inline-start-width` are gone (the iOS, Android and Flutter token files lose it too, and the Android Card guidance has no accent edge).
  - An `accent` still passed to a Card is ignored: no edge draws, nothing breaks, and development warns once (`[Plenix] Card: the accent prop was removed`).
  - Why: an app could use the edge as decoration (one blue on every card) where it is meant for a color from the data, and no check could tell the difference (the owner's decision, 2026-10-29).

### Changed
- Our own pages show the color inside the card (#621): the dashboard's project cards a `ColorSwatch` of the project's color before the category, the calendar's event cards a `ColorSwatch` beside the calendar tag, and the Settings feature-area cards (documentation) the same colored progress bar as the Features page, which also drops its edge. The project notes' cards drop it (every note there belongs to the same project).
