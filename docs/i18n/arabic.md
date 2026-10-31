# Arabic in Plenix: the language standard

The owner's standard for every Arabic word Plenix shows (2026-10-29, issue 427). It applies to the built-in words (`platform/i18n/ar.js`), the spec, the suite and every app built on Plenix.

## The words

- Interface labels are in Modern Standard Arabic (الفصحى), never a dialect or colloquial Arabic.
- The terms follow Microsoft's Arabic terminology (the Microsoft Language Portal and its style guide), so a label reads as it does in Windows and Office: إغلاق for Close, حفظ for Save, إلغاء for Cancel.
- One English word has one Arabic word across Plenix. Before adding a word, look for the same English word in `ar.js` and reuse its Arabic.
- Labels are short and direct, as in English: a verb for an action (حفظ), a noun for a place or a thing (الإعدادات).

## Dates, numbers and currency

- Dates, times, numbers, percentages and currency follow the Unicode CLDR profile for Egypt, `ar-EG`, through the browser's `Intl` formatters (`utils/format.ts`).
- That profile writes Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) and Arabic month and day names.
- Values that are identifiers stay in their own characters, as decided for #421 and #606: emails, web addresses, codes and computed IDs.

## How a new Arabic word ships

1. A Developer adds the English word to `platform/i18n/en.json` and `en.js` (they mirror each other; check-system checks it).
2. The Arabic proposal goes to the owner as a file under `~/handoff/i18n/`. The file gives the key, where the word shows, the English, and the Arabic already used for the same English elsewhere.
3. Only the owner's answer is written into `ar.js`. No Arabic ships without it.
4. A part's own `strings` prop still wins over the catalog, so an app can always pass its own words.

## Where things are

- **The catalogs:** `platform/i18n/en.json` (the source), `en.js` (its browser mirror) and `ar.js`.
- **The lookup:** `LocaleProvider` and `useStrings(section, strings)` (`platform/providers/LocaleProvider.jsx`). For an Arabic locale it uses the app's catalog, then `ar.js`, then English.
- **Right-to-left layout and mixed-direction blocks:** `docs/integration/mixed-direction.md` and #413.
