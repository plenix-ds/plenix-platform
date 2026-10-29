### Changed
- A computed identifier reads `01-20261020` on a right-to-left page, as the owner decided (#606, from #590: "01-20261020 everywhere"). Before, Plenix kept identifiers left to right (`20261020-01`) in Arabic text. Each number keeps its own order and the two follow the page, so the text itself, copy, search and screen readers still get `20261020-01`. Left-to-right pages are unchanged.
  - New `kind="id"` on `Isolate` (it follows the direction around it, in a span), on `DataPill` and on `PropertyList.Item`.
  - A DataGrid column of kind `id` now follows the table's direction.
  - Emails, web addresses, phone numbers and code stay left to right, and `Isolate`'s default is still left to right, so existing uses keep their order; a use for an identifier moves to `kind="id"`. Arabic-Indic digits apply where they are on. The editor needs no change.
  - The docs say the rule: Isolate's header, EntityHeader's notes, the PropertyList and DataPill headers, and the mixed-direction integration note. CTM is told before it moves to the release that has this.
