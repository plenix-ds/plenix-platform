// Plenix · tests/formats.test.js: the Formats standard (platform/standards/formats.json) and utils/format.js agree, and the
// formatters write what the standard says, in two locales. Node only (Intl with full ICU), no browser.
//   node tests/formats.test.js   → FORMATS_OK
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Babel = require('@babel/standalone');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'platform', 'utils', 'format.js'), 'utf8');
const code = Babel.transform(src, { sourceType: 'module', plugins: ['transform-modules-commonjs'] }).code;
const mod = { exports: {} };
new Function('module', 'exports', 'require', code)(mod, mod.exports, require);
const F = mod.exports;

const std = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform', 'standards', 'formats.json'), 'utf8'));
const strip = (o) => (Array.isArray(o) ? o.map(strip) : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).filter(([k]) => k !== '$description').map(([k, v]) => [k, strip(v)])) : o);
let failed = 0, passed = 0;
const check = (name, fn) => { if (!shared.wanted(name)) return; try { fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };
const nb = (s) => s.replace(/[\u00a0\u202f\u2009]/g, ' ');   // Intl writes narrow, thin and non-breaking spaces
const eq = (got, want) => assert.strictEqual(nb(got), want);

check('formats.json equals FORMATS', () => assert.deepStrictEqual(strip(std), JSON.parse(JSON.stringify(F.FORMATS))));
const us = { locale: 'en-US' }, de = { locale: 'de-DE' };
check('number', () => { eq(F.formatNumber(1234567.891, us), '1,234,567.891'); eq(F.formatNumber(1234567.891, de), '1.234.567,891'); eq(F.formatNumber(0.5, { ...us, decimals: 2 }), '0.50'); eq(F.formatNumber(12, { ...us, signed: true }), '+12'); });
check('not a number', () => { eq(F.formatNumber(NaN, us), ''); eq(F.formatDate('nope', us), ''); eq(F.formatCurrency(Infinity, 'USD', us), ''); });
check('bytes', () => { eq(F.formatBytes(1234567, us), '1.2 MB'); eq(F.formatBytes(24000, us), '24 kB'); eq(F.formatBytes(512, us), '512 byte'); eq(F.formatBytes(1234567, de), '1,2 MB'); });
check('duration', () => { eq(F.formatDuration(3900, us), '1 hr, 5 min'); eq(F.formatDuration(3900, { ...us, display: 'clock' }), '1:05:00'); eq(F.formatDuration(42, { ...us, display: 'clock' }), '0:42'); eq(F.formatDuration(0, us), '0 sec'); });
check('compact', () => { eq(F.formatCompact(1234, us), '1.2K'); eq(F.formatCompact(3456789, us), '3.5M'); });
const d = new Date(2026, 2, 4, 14, 5);
check('date', () => { eq(F.formatDate(d, us), 'Mar 4, 2026'); eq(F.formatDate(d, { ...us, dateStyle: 'long' }), 'March 4, 2026'); eq(F.formatDate(d, { ...de, dateStyle: 'long' }), '4. März 2026'); });
check('time', () => { eq(F.formatTime(d, us), '2:05 PM'); eq(F.formatTime(d, de), '14:05'); });
check('relative', () => {
  const now = new Date(2026, 2, 6, 9, 30);
  eq(F.formatRelative(new Date(now - 5 * 60000), { ...us, now }), '5 minutes ago');
  eq(F.formatRelative(new Date(now - 86400000), { ...us, now }), 'yesterday');
  eq(F.formatRelative(new Date(now - 10 * 86400000), { ...us, now }), 'Feb 24, 2026');   // past the standard's 7 days: the date
});
check('range', () => { eq(F.formatRange(d, new Date(2026, 2, 6), us), 'Mar 4 – 6, 2026'); eq(F.formatRange(3, 5, { ...us, kind: 'number' }), '3–5'); });
check('currency', () => { eq(F.formatCurrency(1234.5, 'USD', us), '$1,234.50'); eq(F.formatCurrency(1234.5, 'EUR', de), '1.234,50 €'); eq(F.formatCurrency(1234.5, 'EUR', { ...us, display: 'code' }), 'EUR 1,234.50'); });
check('percent', () => { eq(F.formatPercent(0.256, us), '26%'); eq(F.formatPercent(0.256, de), '26 %'); eq(F.formatPercent(0.03, { ...us, signed: true }), '+3%'); });
check('names', () => { eq(F.formatPersonName('Maya Chen'), 'Maya Chen'); eq(F.formatPersonName({ full: 'María José García', preferred: 'Majo' }, { display: 'preferred' }), 'Majo'); eq(F.formatPersonName('Maya Chen', { display: 'initials' }), 'MC'); eq(F.formatList(['A', 'B', 'C'], us), 'A, B, and C'); });
check('address', () => {
  assert.deepStrictEqual(F.formatAddress({ name: 'Maya Chen', street: '500 Market Street', locality: 'San Francisco', region: 'CA', postalCode: '94105', country: 'US' }, us), ['Maya Chen', '500 Market Street', 'San Francisco, CA 94105']);
  assert.deepStrictEqual(F.formatAddress({ name: 'Ana Weber', street: 'Torstraße 12', locality: 'Berlin', postalCode: '10119', country: 'DE' }, us), ['Ana Weber', 'Torstraße 12', '10119 Berlin', 'Germany']);
  assert.deepStrictEqual(F.formatAddress({ street: ['Flat 4', '10 Downing Road'], locality: 'London', postalCode: 'SW1A 2AA', country: 'GB' }, de), ['Flat 4', '10 Downing Road', 'London', 'SW1A 2AA', 'Vereinigtes Königreich']);
});
check('phone', () => { eq(F.formatPhone('+14155550123'), '+1 415 555 0123'); eq(F.formatPhone('+14155550123', { display: 'national' }), '(415) 555-0123'); eq(F.formatPhone('+33612345678'), '+33 6 12 34 56 78'); eq(F.formatPhone('+4930123456'), '+49 301 234 56'); eq(F.formatPhone('0123'), '0123'); });

// #342: a date-only value is that calendar day where the reader is, in a US zone too (UTC midnight is the day before there)
check('parseDate: a date-only value stays its calendar day in a US time zone #342', () => {
  const zone = process.env.TZ; process.env.TZ = 'America/Los_Angeles';
  try {
    const x = F.parseDate('2026-10-18');
    assert.ok(x && x.getFullYear() === 2026 && x.getMonth() === 9 && x.getDate() === 18, 'parseDate gave ' + (x && x.toString()));
    eq(F.formatDate('2026-10-18', us), 'Oct 18, 2026');
  } finally { if (zone === undefined) delete process.env.TZ; else process.env.TZ = zone; }
});
check('parseDate: Time and the file and account parts read dates through it, never on their own #342', () => {
  for (const f of ['components/Time/Time.jsx', 'components/File/File.jsx', 'components/FileRow/FileRow.jsx', 'patterns/ConnectedAccounts/ConnectedAccounts.jsx']) {
    const text = fs.readFileSync(path.join(ROOT, 'platform', f), 'utf8');
    assert.ok(!/new Date\((v|value|modified|connectedAt)\)|new Date\(\+v\.slice/.test(text), f + ' parses a date itself');
  }
  assert.ok(/parseDate\(/.test(fs.readFileSync(path.join(ROOT, 'platform', 'components/Time/Time.jsx'), 'utf8')), 'Time does not use parseDate');
});

console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'FORMATS_OK (' + passed + ' checks)');
process.exit(failed ? 1 : 0);
