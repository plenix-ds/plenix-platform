### Added
- New palette steps from the owner's chat colors (#637, his explicit OK for these five): gray 80 `#f5f7f9`, blue 125 `#e6f0fc`, blue 275 `#b2cbe9`, and a new **slate** family (a blue-gray) with slate 375 `#a9b8c7` and slate 900 `#253442`. Each number places the color by lightness between its neighbors.
- Message color roles, light and dark: `--plx-sys-message-incoming-background`, `-incoming-border`, `-outgoing-background`, `-outgoing-border` and `--plx-sys-message-text`.
- Avatar: the context hook `--plx-comp-avatar-context-border-color`, so a slot can color the photo's border while the avatar keeps its own rules.
- Chat.Message: `continued` for a following message of a run from the same sender. It has no photo, and its bubble lines up with the first one's.

### Changed
- Chat messages are outlined (#637). Theirs use the light gray fill and slate outline; yours use the light blue fill and blue outline instead of the solid action blue with white text. The text is slate 900. Every bubble has a 1px border and the card's 6px corner, and the thread is white (it was the sunken gray). Dark mode uses the existing dark grays and blues.
- Chat.Message's `avatar` crosses the bubble's top corner: at the start for theirs and, now also, at the end for yours. Its 1px border is in the bubble's outline color, it is mirrored in right to left, and it never covers the text. Before, the photo sat beside their messages only.
