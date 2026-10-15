### Changed
- Count: the pill is soft, as every pill (shade 100 background, shade 300 border, dark text, 4px corners). Its tones
  point to the status pill roles: neutral, info (active), success, warning (waiting) and danger (negative).
- Tabs `variant="segmented"` takes SegmentedControl look A: joined segments at the button control height, the selected
  tab in the selected-state blue tint with blue text. The gray track and the raised segment are gone.
  Tokens: `tabs-segmented-list-background`, `-list-radius`, `-list-padding-block`, `-list-padding-inline` and
  `-tab-selected-shadow` are removed; `tabs-segmented-tab-*` follow the `segmented-*` tokens.
