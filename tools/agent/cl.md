### Added
- By Codex (PRs #113–#116; CI blocked by billing, checked by the integrator):
  - Wave 15 B: content lint, browser support, implementation records, the ActionBar extension; packages
    `@plenix-ds/vue` (typed bridges) and `@plenix-ds/lint` (ESLint and Stylelint adapters with the Plenix rules).
  - Wave 15 C: i18n (LocaleProvider, useLocale, createTranslator; dates no longer read as UTC), content guides,
    performance budgets; packages `@plenix-ds/web-components` (custom elements) and `@plenix-ds/mcp` (a read-only MCP
    server over the tokens and records).
  - Command bar (RedSave #20, #21, #23, #24): `actions[].loading`, `actions[].tooltip`, `sticky="auto"` by default (sticky
    only as a direct child of the page content), `actions[].panel` (a small form in a popover).
  - Developer experience (RedSave #13, #17, #18, #19): a development warning for unknown variant, tone and size values;
    the changelog, per-record docs and tokens.json on the CDN; platform/dev/token-check.js.
### Changed
- CommandBar: `sticky` defaults to "auto". A bar inside a card no longer sticks to the page; a page-level bar still does.
