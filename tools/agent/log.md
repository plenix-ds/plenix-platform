## Batch 387 (2026-10-15): nine Codex PRs and wave 13 A
- take-pr.js on #102, #104, #103, #106, #105, #109, #110, #111, #112 (no file changed by two PRs); take-lane.js on wave
  13 A (22 files). Natives merged additively (89 pages). Quick gates: SYSTEM_OK, SPEC_OK (743 records). GitHub CI
  cannot start (billing); Codex ran each lane's checks locally. The big test suite waits for the very end (owner).
- AI parts checked: ai.tokens.json holds one spacing role; no color added.
- Needs the owner (13 A): sale/out-of-stock/low-stock tones; order status tones; missing cart, card, truck and receipt
  icons (substitutes used); semibold line totals; product swatches named with category colors. Known: a selectable
  off-screen DataTable given sort/groupBy/columnOrder loses its checkbox labels (13 A avoided it; a DataTable task).
  Released as {V}.
