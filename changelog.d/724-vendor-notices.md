### Added
- `THIRD-PARTY-NOTICES.md` gathers the licenses of the software Plenix copies or bundles: React and ReactDOM, TanStack Table and Virtual, Apache ECharts with ZRender and tslib, PDF.js, Tiptap and its 46 bundled packages, the four typefaces and Material Symbols (#724).
- `platform/vendor/package.json` records the version of each library copied into `platform/vendor/`. CI prints `npm outdated` for it as information only, so an outdated copy shows up without failing the build. It is never installed.
