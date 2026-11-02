### Changed
- The npm package loads the icon name tables only when an icon is drawn by name (#882):
  - The Plenix names, symbols and mirrored symbols now load with the Material library's names, the first time an Icon meets a name. An icon drawn from an imported or registered module never loads them.
  - One import costs about 10 KB less: `{ Button }` 103.2 to 93.2 KB, `{ Badge }` 26.5 to 16.5 KB (Vite, minified).
  - Until the tables arrive, `resolveIcon(name)` answers `null` and a named icon draws nothing, as Material names already did; it draws when they arrive.
  - The browser global, the CDN's `plenix.esm.js` and the CommonJS build keep the tables built in, unchanged.
