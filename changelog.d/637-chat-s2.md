### Added
- Chat.Group: one sender's run of messages, with the photo and the name on the first message only and the messages closer together (#637).
- Chat.Divider: a date line across the thread. With `unread`, it is the "New messages" line.
- Chat.Message: `status` (sending, sent, delivered, read), plus `readTime` and `readDateTime`. The marks are a clock (sending), one gray check (sent), two gray checks (delivered) and two green checks (read). The word "Read" is always written, so green is never the only sign.
- The `--plx-sys-message-read` role for the green read checks, from existing colors: green 500 in light, green 200 in dark (the success roles are too pale or too dark on a dark message).
- Chat strings in English and Arabic: Sent, Read, Delivered, Sending, New messages.

### Changed
- A message's time moved from the line above the text to a footer line at the bottom of the bubble: "Sent <time>", then "| Read <time>" once read. The footer is 10px, smaller than the caption, in the secondary gray, and uses the regular font.
- Dark mode: your messages are gray 700 with a gray 500 outline instead of blue, so both kinds of message are grays.

### Removed
- The `--plx-comp-chat-time-font-family` token (the time now uses the regular font).
