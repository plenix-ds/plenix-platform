# Paired typography proof for #181

All 16 previously unmatched page/theme cases have identical findings on the exact base and head. No added or removed role, prose, pattern, or baseline finding. No production regression was found, so no production fix was needed.

- Base: `45e88fd2f3d58e693d3bef1284d403770a16a4c4`
- Compared source head: `e85388eda21bdf6acaa0aaa3e8be29fbf2f276f5`
- Shared design-system commit: `75ba231bfc277c48addb7a134504d5f72849c89c`
- Browser: `Chrome/155.0.8059.80`
- Both: Node 22, 1440 × 1000 viewport, identical media settings; fresh browser context per origin/case; fonts loaded and findings stable.
- Original typography inspector is unchanged and byte-identical in both checkouts. SHA-256: `411b59d3624906809b3a1fa9e3471ff03f9a72a779a72fb34e65d02169f3abc3`.

| Route | Theme | Base findings | Head findings | Added | Removed |
|---|---|---:|---:|---:|---:|
| foundations/color | dark | 0 | 0 | 0 | 0 |
| layout/dashboard-grid | light | 3 | 3 | 0 | 0 |
| layout/dashboard-grid | dark | 3 | 3 | 0 | 0 |
| content/text | light | 1 | 1 | 0 | 0 |
| content/text | dark | 1 | 1 | 0 | 0 |
| content/code-block | dark | 1 | 1 | 0 | 0 |
| actions/toolbar | dark | 1 | 1 | 0 | 0 |
| forms/text-field | light | 3 | 3 | 0 | 0 |
| forms/text-field | dark | 3 | 3 | 0 | 0 |
| data-display/badge | dark | 4 | 4 | 0 | 0 |
| overlays/side-drawer | light | 1 | 1 | 0 | 0 |
| overlays/media-lightbox | light | 2 | 2 | 0 | 0 |
| page-structures/application-shell | dark | 5 | 5 | 0 | 0 |
| specialized/typing-indicator | dark | 2 | 2 | 0 | 0 |
| interaction/focus-ring | light | 2 | 2 | 0 | 0 |
| interaction/focus-ring | dark | 2 | 2 | 0 | 0 |

Result: `TYPO_COMPARE_OK 16`. Raw observations and loaded-font metadata: [typography.json](typography.json).

Reproduce after building both checkouts:

```powershell
$env:TYPO_COMPARE_OUTPUT='typography-comparison.json'
node tests/typography-181-compare.js <exact-base-checkout>
```

This compares findings directly; it does not update, suppress or loosen the shared baseline. The original CI jobs remain non-green for their documented base/fixture/infrastructure issues. The separately demonstrated component `STYLES_SAME` results remain valid. Whole-page styling differences are in generated documentation.
