### Fixed
- Arabic: a dialog's close button is named إغلاق on Arabic pages (#427). Before, it was read aloud in English ("Close"). This was the last built-in word without Arabic.

### Removed
- Twelve built-in English words that no part shows: the `common` section (save, cancel, close, retry, next, back), `wizard.finish`, `wizard.step`, `wizard.error`, and `emptyState.title`, `emptyState.description` and `emptyState.action` (#427). An app that passed these keys in its own catalog is unaffected. No Plenix component reads them, and the spec's "Localized content" example now carries its own English word for its Save button (Arabic falls back to it).
