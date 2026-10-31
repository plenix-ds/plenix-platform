# arabic-catalog-427

This test makes sure every word Plenix writes on its own (buttons, labels, messages) has an Arabic translation, so Arabic pages do not show stray English.

- File: `tests/arabic-catalog-427.test.js`

## What it checks
- Every key in the English word list (`platform/i18n/en.js`) has an Arabic entry in `ar.js`. A plural counts when Arabic has any of its forms.
- "Close" in dialogs (dialog.close) is إغلاق.
- The unused English entries removed in #427 stay gone: the "common" section, wizard.finish, wizard.step, wizard.error, emptyState.title, emptyState.description and emptyState.action.
- Every word a design spec example looks up (in `platform/design-system/parts/*.js`, or a task lane's copy in `lanes/*/design-system/parts/`) exists in `en.js` or in that example's own English list.

## Why it exists
- Issue #427: on an Arabic page, the words Plenix writes itself (Next, Previous, Cancel, Close, "of" in pagination, empty states, screen-reader labels) still showed in English. Part of the right-to-left and Arabic work in #413.
- dialog.close = إغلاق is the owner's choice (2026-10-29, in the file header and the commit message).
- The spec-example check comes from QA on #629: the spec's "Localized content" example read common.save after it was removed (comment in the file).
- Added in commit 9769e2ca "#427: dialog.close in Arabic (إغلاق), the 12 unread English keys removed, the Arabic language standard".

## How it checks
- No browser. Loads the English and Arabic word lists as modules, flattens their keys and compares them.
- Reads the spec's example files as text and looks for word lookups (l.t('key') or t('section.key')).

## What a failure means
- An Arabic-speaking person would see English words, such as a "Close" button or an empty-state message, in the middle of an Arabic page, and a screen reader would speak them in English.
- A spec example could show a raw key instead of a word.

## When it runs
- AUTOMATIC in `tests/run.js` since issue #756 (before, it was started by hand only), so `npm test` and `npm run test:full` run it. It has no changed mode: it runs all its checks every time.
- CI (`ci.yml`): the "Build and checks" job, in the step "Tests without a browser", on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the same step of its build job.
- By hand: `node tests/arabic-catalog-427.test.js`.

## What it needs
- Node only. No browser, no server.
- `platform/i18n/en.js` and `ar.js`; the design spec submodule `platform/design-system` (its parts are skipped if the folder is missing).
