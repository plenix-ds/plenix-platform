## Batch 388 (2026-10-16): the card builder
- Built in the design system from DS components, every value a token (the experiment on the desktop server had raw
  rgba values, fixed widths and leftovers; none of that came over): shadow geometry in the three theme roles (as the
  approved shadow-lifted), the glow gradient and inset as card-surface tokens, sample widths on the grid.
- Dark rim: the owner said gray-800, but the dark card surface is gray-800, so Glow and Inset were invisible; set to
  gray-900 (one step off the surface, the experiment's own rule) and flagged for the owner.
- Codex now owns every remaining library lane (owner, 2026-10-16): briefs #39 (14 A) and #42 (15 A) pushed.
- Checked: SYSTEM_OK, SPEC_OK; 24 sample cards render with the right values, light and dark. Released as {V}.
