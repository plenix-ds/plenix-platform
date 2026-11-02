### Changed
- Generated files are no longer kept in git (#692): `npm ci` builds them (the `prepare` script runs `node build-app.js`), in this repository and in the design spec's. A fresh checkout opened without `npm ci` stops `check-system` with "run npm ci first". Spec lanes carry sources only, plus a `lanes/<task>/BASE` file naming the spec commit they were built on.
- Pages that load Plenix from the CDN through the page loader get the minified stylesheet, `plenix.min.css` (about 270 KB less per page; no visible change) (#882).
- ESLint is adopted with one rule, `import/no-unresolved` (`npm run lint:js`, in CI), so an import of a renamed or deleted file fails (#904).
- More of the Platform is TypeScript: slice 5, the field parts (20 files); no behavior change (#708).
- Clean-up with no visible change (#882): unused application data and design-spec styles, unused `headerAlign` props, American English spellings, 18 one-time scripts removed, and the design spec's index built for loading its parts on demand.
