### Added
- New palette steps from the owner's chat colors (#637, his explicit OK for these four): blue 125 `#e6f0fc`, blue 275 `#b2cbe9`, and a new **slate** family (a blue-gray) with slate 375 `#a9b8c7` and slate 900 `#253442`. Each number places the color by lightness between its neighbors. His #F5F7F9 reuses gray 75.
- Message color roles, light and dark: `--plx-sys-message-incoming-background`, `-incoming-border`, `-outgoing-background`, `-outgoing-border` and `--plx-sys-message-text`.
- Avatar: the context hooks `--plx-comp-avatar-context-background`, `-content` and `-border-color`, so a slot can color the photo while the avatar keeps its own rules.

### Changed
- Chat messages are outlined (#637). Theirs use the light gray fill and slate outline; yours use the light blue fill and blue outline instead of the solid action blue with white text. The text is slate 900. Every bubble has a 1px border and the card's 6px corner, and the thread is white (it was the sunken gray). Dark mode uses the existing dark grays and blues.
- Chat.Message's `avatar` sits on the bubble's top edge (the owner's mockup): 8px in from the start edge for theirs and, now also, from the end edge for yours. It sits half above the bubble and takes its bubble's fill, text color and outline. It is mirrored in right to left and never covers the text: a bubble with a photo has 24px of top padding. Before, the photo sat beside their messages only. The bubble's left and right padding are equal (12px).
