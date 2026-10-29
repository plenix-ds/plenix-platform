/* Plenix · dataValue (platform/utils/dataValue.js)
   Summary: Is a text wholly a technical value: a number, a date, a time, a size, a version, a file name or an ID? Such a value is shown in
     the data font (--plx-sys-font-data), beside the numbers and dates around it (owner, issue 252: a Select or Combobox that holds one shows it so).
   Usage: isDataValue('Oct 25, 2026')   // true;   isDataValue('Compact')   // false;   isDataValue('15 minutes')   // false
   Behavior: The whole text must be one value, or values joined by a comma, a dot, a dash or an en dash ("10", "2026-10-25", "12 MB",
     "Oct 25, 2026", "v1.2.3", "report.pdf", an issue number). A word, a sentence, or a value followed by a word ("15 minutes") is not data.
     The list is the typography test's (tests/typography.test.js), plus plain numbers with thousands separators and decimals.
   Notes: Internal; not part of the public API. Used by Select and Combobox when their data prop is not set. */
const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';
const ONE = [
  '\\d{4}-\\d{2}-\\d{2}(?:[ T]\\d{1,2}:\\d{2}(?::\\d{2})?)?',
  MONTH + ' \\d{1,2}(?:, \\d{4})?(?:,? \\d{1,2}:\\d{2}(?:\\s?[AP]M)?)?',
  '\\d{1,2} ' + MONTH + '(?: \\d{4})?',
  '\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\s?[AP]M)?',
  '\\d+(?:[.,]\\d+)?\\s?(?:B|KB|MB|GB|TB|kB)',
  '\\d+\\s?[×x]\\s?\\d+(?:\\s?px)?',
  'v\\d+(?:\\.\\d+){1,3}(?:-[\\w.]+)?|\\d+\\.\\d+\\.\\d+(?:-[\\w.]+)?',
  '[\\w-][\\w .()-]*\\.(?:pdf|png|jpe?g|gif|svg|webp|avif|heic|tiff?|psd|ai|eps|indd|mp4|mov|webm|mp3|wav|docx?|xlsx?|pptx?|csv|txt|md|json|jsx?|css|html|zip)',
  '#\\d{2,}',
  '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
  '\\d+(?:[.,]\\d+)*%?',   // a plain number, with thousands separators or decimals, or a percentage
];
const DATA = new RegExp('^(?:' + ONE.join('|') + ')(?:\\s*[·,–-]\\s*(?:' + ONE.join('|') + '))*$', 'i');
export const isDataValue = (text) => typeof text === 'string' && text.trim() !== '' && DATA.test(text.trim());
