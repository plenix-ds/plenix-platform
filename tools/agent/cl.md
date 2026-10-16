### Added
- Card and Panel: `surface` ("flat" default, "glow", "inset") and `elevation` ("outline" default, "halo", "lifted",
  "floating"), in any combination (owner, 2026-10-15, the card builder). Halo, Lifted and Floating have no visible
  border and an even shadow with no offset; Glow fades the surface to a rim one step off it; Inset draws a soft 12px
  inner edge. New theme roles: shadow-halo, shadow-floating, card-surface-rim (gray-100; dark gray-900).
- Design system: the card builder on the Card page (choose a surface and an elevation; the card states its makeup,
  "Surface: Glow, Elevation: Halo"), every surface, every elevation, and all twelve combinations; Panel shows its
  surfaces and elevations.
