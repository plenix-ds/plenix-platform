## Batch 426 (2026-10-18): Reddit Mono replaces DM Mono
- platform/fonts: reddit-mono-variable-latin(-ext).woff2 (Google Fonts v5), OFL-RedditMono.txt, README. fonts.css:
  Reddit Mono 200–900 with size-adjust 97.1% (12.625/13 from the playground fit at DPR 1.5).
- Tokens: ref font-mono → "Reddit Mono", …; ref word-spacing-mono-fit −0.279em (−0.287em at 12.625px restated at
  13px); sys font-data-word-spacing. check-system.rules/mono-spacing.js (word-spacing on every monospace rule; --fix
  added 130 declarations; 80 files differ by that line only).
- "DM Mono" → "Reddit Mono" in 124 files (comments, docs, standards, native design JSON, tests); history kept
  (CHANGELOG, logs, the font study). Playground: Reddit Mono = the Platform face (no Google copy).
- Checked: build, SYSTEM_OK, SPEC_OK, build-docs; playground at the same 13px: heights 99–100%, stroke 99.8% (400),
  92.1% (500), 93.8% (600), Fit word spacing → −0.279em exactly, match 99%; Files: Reddit Mono 13px, word-spacing
  −3.627px. Released as {V}.
