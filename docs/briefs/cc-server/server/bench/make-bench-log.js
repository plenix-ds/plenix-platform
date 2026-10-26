// Builds a realistic ~4,000-line Plenix test log with six planted details (the ground truth).
const fs = require('fs');
const out = process.argv[2] || 'test-run.log';
const comps = ['Button', 'DataGrid', 'Table', 'EntityHeader', 'MetricCard', 'NavPane', 'Tooltip', 'Select', 'Checkbox', 'Switch', 'Popover', 'CommandBar'];
const pages = n => `/Plenix/test-site/members/${n}`;
let seed = 7;
const rnd = m => (seed = (seed * 1103515245 + 12345) % 2147483648) % m;
const lines = [];
const t0 = Date.parse('2026-10-26T08:00:00Z');
const ts = i => new Date(t0 + i * 137).toISOString();
const planted = {
  550: 'FAIL tests/data-grid-next.test.js > row height at Compact: expected 28px, received 27px (row 1873)',
  551: '    at measureRow (platform/components/DataGrid/DataGrid.jsx:412:18)',
  940: 'WARN token --plx-sys-space-inset-xs resolved to 3px on /Plenix/test-site/members/412 (not on the 4px grid)',
  1320: 'RETRY 2/3 tests/labs.test.js timed out after 180000ms (Select lab, page 17)',
  1650: 'ERROR checksum 9f3c2a71 mismatch for release/cdn/0.72.0/platform.js (expected 4be0d915)',
};
for (let i = 0; i < 1990; i++) {
  if (planted[i]) { lines.push(`[${ts(i)}] ${planted[i]}`); continue; }
  const c = comps[rnd(comps.length)];
  const k = rnd(10);
  if (k < 6) lines.push(`[${ts(i)}] PASS tests/pages.test.js > ${c} renders on ${pages(rnd(900))} (${20 + rnd(400)}ms)`);
  else if (k < 8) lines.push(`[${ts(i)}] info  serve: GET ${pages(rnd(900))} 200 ${1 + rnd(40)}ms`);
  else if (k < 9) lines.push(`[${ts(i)}] PASS tests/clash-audit.js > ${c}: 0 overlaps, ${rnd(60)} rules checked`);
  else lines.push(`[${ts(i)}] debug chrome: ${c} layout ${rnd(1400)}x${rnd(900)} stable after ${rnd(4)} frames`);
}
lines.push(`[${ts(1991)}] Tests: 1 failed, 2 flaky (retried), 1451 passed, 1454 total`);
lines.push(`[${ts(1992)}] Time: 14m 52s`);
fs.writeFileSync(out, lines.join('\n') + '\n');
console.log('wrote', out, lines.length, 'lines', fs.statSync(out).size, 'bytes');
