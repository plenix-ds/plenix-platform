### Changed
- `@plenix-ds/react`'s ES modules load Plenix's Arabic words only when the app asks, and the full icon name list only when a name needs it (#702, owner's OK on #702). Measured as in #685 (esbuild, minified, React external), counting what loads at the start:

  | Import | Before | After |
  |---|---|---|
  | `{ Badge }` | 79.0 KB | 25.0 KB |
  | `{ Button }` | 317.5 KB | 101.4 KB |
  | `{ DataGrid }` | 645.0 KB | 428.9 KB |
  | `* as P` (everything) | 1,608.5 KB | 1,392.4 KB |

  - Arabic: an app imports `@plenix-ds/react/i18n/ar` to turn it on. Its Arabic pages then show Plenix's words exactly as before.
  - Icons: the Material library's names (54 KB) are a chunk of their own. Icon loads it the first time a name is not a Plenix icon or a registered module. Until it arrives (one short request) that icon draws nothing; then it draws as before. A name that is still unknown warns after the list arrives.
  - Button's start is now mostly the English words (53 KB) and Icon (24 KB).
- Unchanged: the CDN's `plenix.js` and `plenix.esm.js`, `dist/plenix.global.js`, the CommonJS file (`dist/index.cjs`) and the suite's pages keep Arabic and the icon names built in and behave exactly as before. Only Icon's code in them differs (a few lines that do nothing when the names are built in).

### Added
- `@plenix-ds/react/i18n/ar`: Plenix's own words in Arabic, for an npm app (an import for its effect; it exports nothing).
- `check-bundle.js`'s one-part limits are lowered to match: `{ Button }` 105 KB, `{ Badge }` 30 KB, `{ DataGrid }` 440 KB, `* as P` 1,400 KB. The measure counts what loads at the start; a chunk only a dynamic `import()` reaches is not counted.

### Upgrading from 0.78.0
- An npm app turns Arabic on with one line at its start: `import '@plenix-ds/react/i18n/ar';`. Without it, an Arabic page falls back to English for Plenix's own words. The CDN keeps Arabic built in.
