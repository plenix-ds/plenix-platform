### Added
- `@plenix-ds/styles` also ships its rules per part (#710, option S1, owner's GO on #710). `foundations.css` holds the layer order, tokens, theme and base, and loads once. `parts/<part>.css` holds one part's rules, its component settings and its step rules, and imports the parts it needs. Together the files are exactly `plenix.css`: the same rules in the same order. Measured page sizes (foundations plus the part and the parts it imports):

  | A page uses | `plenix.css` | Per part |
  |---|---|---|
  | Badge | 2,092.7 KB (199.3 KB gzipped) | 171.8 KB (19.4 KB gzipped) |
  | Button | same | 273.6 KB (28.2 KB gzipped) |
  | DataGrid | same | 756.1 KB (75.5 KB gzipped) |

- `check-bundle.js` checks the per-part files against `plenix.css` (`tools/agent/style-parts-check.js`). No rule may be lost, doubled or out of order. Two parts whose rules can tie on one element must always load in `plenix.css`'s order.

### Unchanged
- The CDN, `platform.css`, `plenix.css` and `plenix.min.css`: the same rules in the same order. CDN apps change nothing.

### Upgrading from 0.78.0
- Nothing to change: `plenix.css` works as before. An npm app may switch to `foundations.css` plus the `parts/<part>.css` files it uses. It loads one or the other, never both.
