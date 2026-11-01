### Added
- EntityTitle (#803, idea 3 of the component study #767): a short title line for list rows and cards, where EntityHeader is too big.
  - An icon (plain, decorative), the title on one line cut with "…" (its whole text in a tooltip while it is cut), a subtitle under it and a tag after it. Each part but the title is optional.
  - `tag`: a string is a Tag; `{ label, tone, icon }` is a status Badge with its icon; `{ label, category }` is a category Tag; an element is drawn as given.
  - `level` (1 to 6) makes the title a heading, for a card.
  - `loading` shows bars in place of the text and marks the item `aria-busy`.
  - Its lines are 20px and 16px: one line is as tall as plain row text and two lines 36px, on the 4px grid, the same while loading. It adds no padding, so list rows and cards keep their height rules.
- The design spec has its page (03 Content › Identity › Entity title), with examples in a list row and a card.
