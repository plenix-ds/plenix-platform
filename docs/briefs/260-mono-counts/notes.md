# Counts inside phrases: the number in Mono, the words in Sans (#260)

The owner decided on 2026-10-24 (status page): the number goes in the technical font, the words in the normal font. EntityHeader facts and subtitles already did this (#328, #339, 0.72.0). This change covers the rest. No test was run.

## The helpers (`platform/utils/dataText.jsx`, public on `window.Plenix`)
- **`dataPhrase(text, values, options)`:** a template with `{name}` placeholders, or a finished phrase.
  - A number value is written with `formatNumber` and set in the data role (`<Text variant="data">`).
  - A text value, and the words around it, are searched for dates, times, sizes, money, percentages and numbers, and those are set in the data role too.
  - It returns one `<span class="plx-text">` (the Text component's base class), so each data span takes the phrase's own size (`.plx-text .plx-text--data` inherits). There is no new font token and no new class.
- **`dataNumber(value, options)`:** one formatted number in the data role.
- **`dataText(text)`:** `dataPhrase(text)` with no values.
- **Right to left and Arabic:**
  - Arabic-Indic digits (٠-٩), their separators and ٪ count as data.
  - A number formatted for an Arabic locale keeps its digits, and the Text component writes ASCII digits in the reader's numerals, as everywhere else.
  - The order of the words never changes.
- **`formatNumber` and the other `format*` functions still return strings,** because they feed aria labels, titles and announcements. The helpers wrap them for what is shown.
- **EntityHeader keeps its own `dataText`** (unchanged, released in 0.72.0). Its size rules differ, and moving it would change the header's pixels.

## Uses converted (found by the new rule, listed by file)
| Where | Phrase |
|---|---|
| Pagination | "{first}–{last} of {total}" (numbers now formatted with separators: "1,234") |
| LoadMore | "Load {n} more" button; "{shown} of {total}" count |
| CollapsibleSection | "Show {n} more" |
| CommandMenu | "{count} results" (empty state) |
| MetricCard | rank "#{n}" |
| Auth | the password rule ("At least {n} characters"), twice |
| DeleteFlow | "and {count} more" |
| UploadManager | headline and title ("Uploading {n} files"…), the counts line ("{done} of {total} uploaded · 60%") |
| VersionCompare | "Show {n} unchanged lines" |
| ProductCard, Storefront | reviews ("{n} reviews") |
| Storefront | category card meta ("{n} products"), low stock badge |
| Commerce shared | quantity "Qty {n}", order summary "× {n}" |
| Commerce Account | returning items |
| Settings app | 8 section descriptions (capabilities, areas and features, subcategories, "N of M tags", project types, types) |
| Asset Manager | the status bar ("4,546 assets \| 12.4 GB"), category and collection cards ("{n} assets"), the cart line in the bulk dialog |

- **A whole phrase that was in Mono now has only its numbers in Mono:** the review counts, the category meta, the quantities, the upload counts and the Account item.
  - The review counts and quantities moved from `Text variant="data"` to `Text variant="secondary"`: the same size (the data size is the secondary size), but the muted text color.
  - The upload counts line keeps its own class. Its font token `--plx-comp-upload-manager-counts-font-family` is now the body font, and its word spacing is normal (the text contract is updated: `secondary` role, `sans`).

## The rule (`check-system.rules/count-phrases.js`)
- **What it reads, with Babel:** the Platform (components, patterns, templates, charts), the suite, the 10 apps and the Asset Manager.
- **Findings:**
  - a visible JSX child or text prop (meta, subtitle, description, caption, summary, hint, helper, status, start, end, children) that joins a count to words: `count + ' files'`, `` `${n} items` ``
  - a template filled with a count and shown as a string: `fill(t.more, { n })`, `t.x.replace('{n}', n)`
  - JSX text or a summary/meta string that starts with a number and words ("12 files", "4,546 assets | 12.4 GB")
- **Not judged:** aria labels, titles, alt text, placeholders and labels (read aloud or shown as a tooltip), and anything inside the helpers.
- **Allow marker:** a line can carry `plx-allow-count` with a reason.
- **Fixtures:** 12, 6 that must fail and 6 that must pass. Run them with `node check-system.rules/count-phrases.js`.
- **What it knowingly misses:** a phrase filled into a variable and shown later, a count under another name, and a catalog string shown as it is. The typography test's phrase check covers these on the rendered page.

## The typography test (written, not run)
- **`tests/typography.test.js`** gains a sixth check, `phrase`: no DM Sans text may hold a number followed by words (Latin or Arabic-Indic digits). It leaves out the same places as `pattern` (badges, buttons, menus, navigation, tooltips, titles).
- **It is new, so its first run needs `--update`** (TEST_SCOPE=full) to record the pages' current findings. From then on, findings can only go down.

## Other
- **`TODO.md`:** the #260 row is ticked.
- **`tools/agent/proof-log.md`:** one entry.
- **Pictures** (headless, light, this branch):
  - `~/handoff/dashboard-v12/stamps/mono-counts-260-dam-status-bar.png`: "4,546" and "12.4 GB" in Reddit Mono, "assets" in DM Sans
  - `~/handoff/dashboard-v12/stamps/mono-counts-260-settings-header.png`: the settings categories card, "3" in Reddit Mono
