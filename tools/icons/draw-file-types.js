#!/usr/bin/env node
// Draws Plenix's lettered file-type icons (owner, 2026-10-24: "draw lettered icons", squared letters in the sharp
// style). Each is a page with a folded corner above, and the format's letters below, as centerlines on the 24px grid
// with 1.5px lines. restyle-icon.js (through build-inventory.js) turns each into the four Plenix files.
//
//   node tools/icons/draw-file-types.js     writes platform/icons/inventory/source/file-<ext>.svg
//
// Geometry (24px grid, centerlines; outer edges are 0.75px further out):
//   page: x 4.25–19.75, y 4.25–10.5, fold 5.25px    letters: y 13.75–19.75 (middle bar 16.75)
//   three letter columns: 4.25–7.25, 10.25–13.75, 16.75–19.75 (1.5px gaps); two letters: 6.25–10.25, 13.75–17.75
// Every axis-aligned centerline sits on a quarter pixel (x.25 / x.75), so both edges land on the half-pixel grid.
'use strict';
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', '..', 'platform/icons/inventory/source');
const Y0 = 13.75, Y1 = 19.75, YM = 16.75;
const COLS3 = [[4.25, 7.25], [10.25, 13.75], [16.75, 19.75]];
const COLS2 = [[6.25, 10.25], [13.75, 17.75]];

// Squared letters: straight strokes only, chamfers where a round letter would bend.
const LETTER = {
  A: (a, b) => `M${a} ${Y1}V${Y0}H${b}V${Y1}M${a} ${YM}H${b}`,
  D: (a, b) => `M${a} ${Y0}V${Y1}H${b - 1}L${b} ${Y1 - 1}V${Y0 + 1}L${b - 1} ${Y0}Z`,
  F: (a, b) => `M${b} ${Y0}H${a}V${Y1}M${a} ${YM}H${b - 0.5}`,
  G: (a, b) => `M${b} ${Y0}H${a}V${Y1}H${b}V${YM}H${(a + b) / 2}`,
  I: (a, b) => `M${(a + b) / 2} ${Y0}V${Y1}`,
  J: (a, b) => `M${b} ${Y0}V${Y1}H${a}V${Y1 - 2}`,
  N: (a, b) => `M${a} ${Y1}V${Y0}L${b} ${Y1}V${Y0}`,
  P: (a, b) => `M${a} ${Y1}V${Y0}H${b}V${YM}H${a}`,
  S: (a, b) => `M${b} ${Y0}H${a}V${YM}H${b}V${Y1}H${a}`,
  V: (a, b) => `M${a} ${Y0}L${(a + b) / 2} ${Y1}L${b} ${Y0}`,
};
const PAGE = 'M4.25 10.5V4.25H14.5L19.75 9.5V10.5M14.5 4.25V9.5H19.75';

const TYPES = ['jpg', 'png', 'svg', 'pdf', 'psd', 'ai'];
fs.mkdirSync(OUT, { recursive: true });
for (const ext of TYPES) {
  const letters = ext.toUpperCase().split('');
  const cols = letters.length === 3 ? COLS3 : COLS2;
  const d = [PAGE, ...letters.map((ch, i) => LETTER[ch](cols[i][0], cols[i][1]))].join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter"/></svg>\n`;
  fs.writeFileSync(path.join(OUT, `file-${ext}.svg`), svg);
  console.log('wrote', `file-${ext}.svg`);
}
