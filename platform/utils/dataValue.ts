/* Plenix · dataValue (platform/utils/dataValue.ts)
   Summary: Is a text wholly a technical value: a number, a date, a time, a size, a version, a file name or an ID? Such a value is shown in
     the data font (--plx-sys-font-data), beside the numbers and dates around it (owner, issue 252: a Select or Combobox that holds one shows it so).
   Usage: isDataValue('Oct 25, 2026')   // true;   isDataValue('Compact')   // false;   isDataValue('15 minutes')   // false
   Behavior: The whole text must be one value, or values joined by a comma, a dot, a dash or an en dash ("10", "2026-10-25", "12 MB",
     "Oct 25, 2026", "v1.2.3", "report.csv", an issue number). A word, a sentence, or a value followed by a word ("15 minutes") is not data.
     Months are exact names (Jan or January, Sept or September) followed by a word boundary: "Mark 5", "Market 3", "Junior 2" and "3 Decisions"
     are not dates. Units are case-exact (kB, KB, MB, GB, TB): "5 b" is not a size.
     A file name has no spaces, a known extension, and a stem that starts with a lowercase letter or contains a digit, an underscore or a hyphen:
     "report.csv", "IMG_2041.jpg" and "plenix-0.73.0.zip" are data; "Node.js", "Vue.js", "Character.ai", "Read me.md" and "Export as report.csv"
     are not (a product or a sentence, not a file).
     The list follows the typography test's (tests/typography.test.js), plus plain numbers with thousands separators, decimals and percentages.
   Notes: Internal; not part of the public API. Used by Select and Combobox when their data prop is not set. */
const MONTH = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\\.|\\b)';
const ONE = [
  '\\d{4}-\\d{2}-\\d{2}(?:[ T]\\d{1,2}:\\d{2}(?::\\d{2})?)?',
  MONTH + ' \\d{1,2}(?:, \\d{4})?(?:,? \\d{1,2}:\\d{2}(?:\\s?[AP]M)?)?',
  '\\d{1,2} ' + MONTH + '(?: \\d{4})?',
  '\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\s?[AP]M)?',
  '\\d+(?:[.,]\\d+)?\\s?(?:B|KB|MB|GB|TB|kB)',
  '\\d+\\s?[×x]\\s?\\d+(?:\\s?px)?',
  'v\\d+(?:\\.\\d+){1,3}(?:-[\\w.]+)?|\\d+\\.\\d+\\.\\d+(?:-[\\w.]+)?',
  '#\\d{2,}',
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
  '\\d+(?:[.,]\\d+)*%?',   // a plain number, with thousands separators or decimals, or a percentage
];
// case-exact: no "i" flag (a unit, a month and a version letter are written one way)
const DATA = new RegExp('^(?:' + ONE.join('|') + ')(?:\\s*[·,–-]\\s*(?:' + ONE.join('|') + '))*$');
const EXTENSIONS = new Set('pdf png jpg jpeg gif svg webp avif heic tif tiff psd ai eps indd mp4 mov webm mp3 wav doc docx xls xlsx ppt pptx csv txt md json js jsx css html zip'.split(' '));
function isFileName(text: string): boolean {
  const m = /^(\S+)\.([A-Za-z0-9]+)$/.exec(text);   // no spaces
  return !!m && EXTENSIONS.has(m[2].toLowerCase()) && (/^[a-z]/.test(m[1]) || /[\d_-]/.test(m[1]));   // report.csv, IMG_2041.jpg: yes; Node.js, Character.ai: no
}
export const isDataValue = (text: unknown): boolean => { const t = typeof text === 'string' ? text.trim() : ''; return t !== '' && (DATA.test(t) || isFileName(t)); };
