### Changed (visual)
- Six parts show a plain icon instead of an icon in a box (#882):
  - Affected parts: EntityPicker, FeatureCard, MetricCard (icon-start and list rows), RoleManager, PeopleGroup and ConnectedAccounts.
  - Each icon keeps the box's icon size. A gray icon takes the muted content color, a data hue its data color, and a FeatureCard tone its feedback content color.
  - PeopleGroup keeps a 40px slot, so a group's name lines up with a team's.
  - New component tokens only; no new colors. IconTile itself is unchanged.
