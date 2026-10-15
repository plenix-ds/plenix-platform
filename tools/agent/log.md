## Batch 378 (2026-10-15): palette consolidation
- Applied the owner's consolidation plan (Perplexity, reconciled: lime -> green-150, yellow -> yellow-175; no green-400;
  yellow-400 unchanged) with tools/agent/color-migration.js: 27 added, 83 aliased (deprecated), 162 theme references
  moved; every old hex and every kept value verified against the plan before writing.
- Families by token name (the owner rejected the "dark warm = brown" grouping). Category role descriptions name their
  canonical token. Tag page reads the roles' declarations from the theme rules.
- Tests (changed mode): all 21 groups OK (PAGES 130/130, CONTRAST 158, LABS 8/8, DATA_TABLES 38/38, A11Y 0 on 41). Released as {V}.
