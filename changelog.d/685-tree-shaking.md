### Changed
- `@plenix-ds/react` ships its ES module as one file per part (#685, from the audit #684). An application that imports one part now bundles that part and what it uses, instead of the whole library. Measured with esbuild, minified, React external:

  | Import | Before | After |
  |---|---|---|
  | `{ Badge }` | 913.1 KB | 79.0 KB |
  | `{ Button }` | 913.1 KB | 317.5 KB |
  | `{ DataGrid }` | 913.1 KB | 645.0 KB |
  | `* as P` (everything) | 1,608.0 KB | 1,608.5 KB |

  - `dist/index.js` is still the entry, and re-exports every part from `dist/<folder>/<Part>.js`. Code that parts share is in `dist/chunks/`.
  - `sideEffects` lists only the CSS and the two scripts that act when loaded (`dist/plenix.global.js`, `dist/plenix-engines.js`).
  - Most of a one-part import is now the built-in word catalogs: Arabic 162 KB and English 53 KB, through `useStrings`. Making Arabic opt-in for npm users is #702.
- The CDN's `plenix.js` and `plenix.esm.js`, the CommonJS file (`dist/index.cjs`), the exports and the type declarations are unchanged.

### Added
- `check-bundle.js` measures one import from the package: `{ Button }` (limit 330 KB), `{ Badge }` (100 KB), `{ DataGrid }` (700 KB) and `* as P` (1,610 KB). It fails when one goes over its limit, so tree-shaking can't break again unseen. `tools/agent/one-part-sizes.js` prints the same numbers on its own.

### Upgrading from 0.78.0
Nothing to change. Imports from `@plenix-ds/react` work as before. The package's `exports` map is unchanged, so deep imports into `dist/` are still not part of the public API.
