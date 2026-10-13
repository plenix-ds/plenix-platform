// Plenix tests · regional density: a component inside a region with its own density (data-plx-density on a region, e.g.
// a compact table on a standard page) takes that region's sizes, not the page's. Component tokens declared on :root
// would freeze the page's value (a custom property is computed where it is declared), so this guards every component
// that has been moved to component tokens.
//   node tests/density.test.js
//   TEST_SCOPE=full: always; by default (tests/changed.js) only when a sample's component, a global file or this test changed
const fs = require('fs');
const path = require('path');
const { ROOT, launch, sleep } = require('./lib.js');
const changed = require('./changed.js');
if (!changed.wants({ units: ['components/Button', 'components/Input', 'components/Checkbox'] })) changed.none('DENSITY_OK 0/0');
changed.report('every sample');
const P = 'file://' + (ROOT.startsWith('/') ? '' : '/') + ROOT.replace(/\\/g, '/') + '/platform/';
// the samples: each drawn once per density region; the expected height is the density's control role ('min': at least
// the role, for a sample whose content may be taller)
const SAMPLES = [
  ['Button', '<button class="plx-button">Save</button>', 'control-height-standard'],
  ['Button sm', '<button class="plx-button plx-button--size-sm">Save</button>', 'control-height-toolbar'],
  ['Input', '<input class="plx-input" aria-label="Name">', 'control-height-standard'],
  ['Select', '<span class="plx-select"><select class="plx-input plx-select__control" aria-label="Status"><option>Open</option></select></span>', 'control-height-standard'],
  ['Checkbox', '<label class="plx-check"><input type="checkbox" class="plx-check__input"><span class="plx-check__label">Done</span></label>', 'control-height-inline'],
  ['Switch', '<label class="plx-switch"><input type="checkbox" role="switch" class="plx-switch__input"><span class="plx-switch__track"></span><span class="plx-switch__label">On</span></label>', 'control-height-inline'],
];
(async () => {
  const regions = ['compact', 'standard', 'comfortable'].map((d) => '<div data-plx-density="' + d + '" data-region="' + d + '">' + SAMPLES.map((s, i) => '<span data-s="' + i + '">' + s[1] + '</span>').join('') + '</div>').join('');
  const file = path.join(__dirname, '.density-test.html');
  fs.writeFileSync(file, '<!doctype html><html lang="en" data-plx-density="standard"><head><meta charset="utf-8"><link rel="stylesheet" href="' + P + 'platform.css"></head><body>' + regions + '</body></html>');
  const browser = await launch(); const page = await browser.newPage();
  await page.goto('file://' + (file.startsWith('/') ? '' : '/') + file.replace(/\\/g, '/')); await sleep(300);
  const rows = await page.evaluate((SAMPLES) => {
    const out = [];
    document.querySelectorAll('[data-region]').forEach((r) => {
      SAMPLES.forEach((s, i) => {
        const el = r.querySelector('[data-s="' + i + '"]').firstElementChild;
        const probe = document.createElement('div'); probe.setAttribute('class', 'plx-u-h-0'); r.appendChild(probe);
        const want = parseFloat(getComputedStyle(r).getPropertyValue('--plx-sys-' + s[2])) * parseFloat(getComputedStyle(document.documentElement).fontSize);
        out.push({ region: r.dataset.region, name: s[0], got: Math.round(el.getBoundingClientRect().height), want: Math.round(want), min: s[3] === 'min' });
      });
    });
    return out;
  }, SAMPLES);
  await browser.close(); fs.unlinkSync(file);
  const fine = (r) => (r.min ? r.got >= r.want : r.got === r.want);
  const bad = rows.filter((r) => !fine(r));
  rows.forEach((r) => console.log((fine(r) ? '  ok   ' : '  FAIL ') + r.name + ' in a ' + r.region + ' region: ' + r.got + 'px (its role: ' + (r.min ? 'at least ' : '') + r.want + 'px)'));
  console.log((bad.length ? 'DENSITY_FAIL ' : 'DENSITY_OK ') + (rows.length - bad.length) + '/' + rows.length);
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
