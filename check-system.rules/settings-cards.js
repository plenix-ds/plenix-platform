// Plenix · check-system rule "settings-cards" (owner, 2026-10-13: "I need all the settings pages to have the cards view…
// everything in the plenix settings needs to be updated to match the DS… many things not matching such as the form
// fields"). On a settings page (the Plenix Settings app, the Asset Manager's System settings and My account):
//   a section is a SettingsSection card (static or collapsible), never drawn another way:
//     <Panel title="Regional">            finding (a Panel used as a settings section)
//     <SectionHeading level={2}>Display   finding (a heading drawn without its card)
//     <section> <h2> <h3> <Text as="h3">  finding (a hand-made section or heading)
//     <SettingsSection title="Regional">  ok
//   a field is a Platform control (Field, Input, Textarea, Select, Combobox, SearchField, Switch, Checkbox, …) with an
//   accessible label: inside a Field (its visible label), or with label / legend / aria-label / aria-labelledby, or an id
//   that a SettingsRow htmlFor (or a <label htmlFor>) names:
//     <input …> <select …> <textarea …>   finding (a native field: use the Platform control)
//     <Input value={v} />                 finding (no label)
//     <Field label="Name"><Input …/></Field>                              ok
//     <SettingsRow label="Name" htmlFor="x"><Input id="x" …/></SettingsRow>   ok
//     <Switch label="Animations" labelHidden …/>                          ok
// Comments are not read. The rule is a module check-system.js runs (it loads every file in check-system.rules/):
//   require('./check-system.rules/settings-cards.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/settings-cards.js     -> SETTINGS_CARDS_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'settings-cards';
// the settings pages: their screens are built in these files
const PAGES = ['settings/settings.jsx', 'dam/app/pages/SystemSettingsPage.jsx', 'dam/app/pages/MyAccountPage.jsx'];
// a section drawn without SettingsSection
const SECTION = /<(Panel|SectionHeading|section|h[1-6])\b|<Text\b[^>]*\bas=["']h[1-6]["']/g;
// a native field in place of the Platform control
const NATIVE = /<(input|select|textarea)\b/g;
// the Platform controls that need an accessible label
const CONTROLS = /<(Input|Textarea|Select|Combobox|SearchField|Switch|Checkbox|SegmentedControl|ColorPicker|ChoiceList|RadioTiles|RadioGroup|Slider|TagInput)\b/g;
const NAMED = /\b(aria-label|aria-labelledby|label|legend)=/;

function lineOf(text, i) { return text.slice(0, i).split('\n').length; }

// the source with its comments blanked (line breaks kept), so a comment that names <Panel> is not read
function blankComments(src) {
  let out = '', q = null;
  for (let i = 0; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (q) { out += c; if (c === q && src[i - 1] !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; out += c; continue; }
    if (c === '/' && n === '/' && src[i - 1] !== ':') { while (i < src.length && src[i] !== '\n') { out += ' '; i++; } out += i < src.length ? '\n' : ''; continue; }
    if (c === '/' && n === '*') { const end = src.indexOf('*/', i + 2); const stop = end < 0 ? src.length : end + 2; out += src.slice(i, stop).replace(/[^\n]/g, ' '); i = stop - 1; continue; }
    // a JSX comment {/* … */} is blanked by the branch above
    out += c;
  }
  return out;
}

// the opening tag that starts at i ("<Input"), to its closing ">" (braces and quotes skipped)
function tagAt(text, i) {
  let depth = 0, q = null;
  for (let j = i + 1; j < text.length; j++) {
    const c = text[j];
    if (q) { if (c === q && text[j - 1] !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (c === '>' && depth <= 0) return text.slice(i, j + 1);
  }
  return text.slice(i);
}
// the tag's own attributes: brace contents blanked, so a prop of a nested element ({…label=…}) is not read as its own
function ownAttrs(tag) {
  let out = '', depth = 0;
  for (const c of tag) { if (c === '{') { depth++; out += c; continue; } if (c === '}') { depth--; out += c; continue; } out += depth ? ' ' : c; }
  return out;
}

// the ranges of the source inside a <Field …>…</Field> (a control there is labeled by the Field)
function fieldRanges(text) {
  const ranges = [], stack = [], re = /<Field\b|<\/Field>/g;
  let m;
  while ((m = re.exec(text))) {
    if (m[0] === '</Field>') { const s = stack.pop(); if (s !== undefined) ranges.push([s, m.index]); continue; }
    const tag = tagAt(text, m.index);
    if (/\/>$/.test(tag)) continue;
    stack.push(m.index);
  }
  return ranges;
}

// the findings of one source: [{ line, text }]
function scan(src) {
  const text = blankComments(src);
  const found = [];
  let m;
  SECTION.lastIndex = 0;
  while ((m = SECTION.exec(text))) found.push({ line: lineOf(text, m.index), text: 'a settings section drawn without SettingsSection (' + m[0].trim() + '): use <SettingsSection title=…> (static or collapsible)' });
  NATIVE.lastIndex = 0;
  while ((m = NATIVE.exec(text))) found.push({ line: lineOf(text, m.index), text: 'a native <' + m[1] + '> on a settings page: use the Platform control (Input, Select, Textarea) in a Field or a SettingsRow' });
  const fields = fieldRanges(text);
  const htmlFor = new Set();
  const forRe = /htmlFor=["']([^"']+)["']/g;
  while ((m = forRe.exec(text))) htmlFor.add(m[1]);
  CONTROLS.lastIndex = 0;
  while ((m = CONTROLS.exec(text))) {
    const at = m.index;
    if (fields.some(([s, e]) => at > s && at < e)) continue;
    const own = ownAttrs(tagAt(text, at));
    if (NAMED.test(own)) continue;
    const id = /\bid=["']([^"']+)["']/.exec(own);
    if (id && htmlFor.has(id[1])) continue;
    if (/\bid=\{/.test(own)) continue;   // an id from a value: the row that passes it names it (htmlFor={id})
    found.push({ line: lineOf(text, at), text: '<' + m[1] + '> has no accessible label: put it in a Field, give it label / aria-label, or an id that a SettingsRow htmlFor names' });
  }
  return found;
}

function check({ files, add }) {
  for (const p of PAGES) {
    const hit = files.find((f) => f.file.split(path.sep).join('/').endsWith('/' + p));
    if (!hit) continue;
    for (const f of scan(fs.readFileSync(hit.file, 'utf8'))) add(NAME, hit.file, f.line, f.text);
  }
}

module.exports = { name: NAME, check, scan, PAGES };

if (require.main === module) {
  const ROOT = path.join(__dirname, '..');
  const files = PAGES.map((p) => ({ file: path.join(ROOT, p) })).filter((f) => fs.existsSync(f.file));
  const found = [];
  check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file).split(path.sep).join('/') + ':' + line + '  ' + text) });
  // the rule's own fixtures: [source, findings expected]
  const fx = [
    ['<Panel title="Regional"><Row/></Panel>', 1],
    ['<SectionHeading level={2}>Display</SectionHeading>', 1],
    ['<section><h2>Profile</h2></section>', 2],
    ['<Text as="h3" variant="heading">Properties</Text>', 1],
    ['<SettingsSection title="Regional" collapsible><Row/></SettingsSection>', 0],
    ['// a <Panel> in a comment\n<SettingsSection title="A"/>', 0],
    ['<input type="text" />', 1],
    ['<select value={v}></select>', 1],
    ['<Input value={v} onChange={f} />', 1],
    ['<Field label="Name" layout="inline"><Input value={v} /></Field>', 0],
    ['<Field label="Name"><Input {...text(\'name\')} /></Field>', 0],
    ['<SettingsRow label="Name" htmlFor="n"><Input id="n" value={v} /></SettingsRow>', 0],
    ['<Input id="n" value={v} />', 1],
    ['<Switch checked={on} label="Animations" labelHidden />', 0],
    ['<Switch checked={on} onChange={(e) => set({ label: 1 })} />', 1],
    ['<ChoiceList legend="Display density" value={d} />', 0],
    ['<Select aria-label="Theme" value={t} />', 0],
    ['<Combobox options={o} value={v} />', 1]];
  fx.forEach(([src, n]) => { const got = scan(src).length; if (got !== n) found.push('fixture: ' + src + ' gives ' + got + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'SETTINGS_CARDS_OK (' + files.length + ' pages, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
