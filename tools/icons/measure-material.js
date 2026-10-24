#!/usr/bin/env node
// Measures the Plenix working set (Material Symbols Sharp, weight 300; platform/icons/map.json) so the icon guidance
// (platform/standards/icons.md) states numbers, not impressions. Reads the files; never changes them.
//
//   node tools/icons/measure-material.js [--all]      (--all: the whole library/, slower)
//
// Writes platform/icons/inventory/material-measure.json and prints the summary.
'use strict';
const fs = require('fs');
const path = require('path');
const { readSvg, rasterize, lineWeight, cornerStats } = require('./lib/svg');

const ROOT = path.resolve(__dirname, '..', '..');
const ICONS = path.join(ROOT, 'platform/icons');
const map = JSON.parse(fs.readFileSync(path.join(ICONS, 'map.json'), 'utf8')).map;
const ALL = process.argv.includes('--all');
let symbols = [...new Set(Object.values(map).map((s) => String(s).replace(/#fill$/, '')))];
if (ALL) symbols = JSON.parse(fs.readFileSync(path.join(ICONS, 'library/index.json'), 'utf8')).symbols || symbols;
const file = (sym, suffix) => [path.join(ICONS, sym + suffix + '.svg'), path.join(ICONS, 'custom', sym + suffix + '.svg'), path.join(ICONS, 'library', sym + suffix + '.svg')].find((f) => fs.existsSync(f));

const VARIANTS = [['20', ''], ['20-fill', '-fill'], ['24', '-24'], ['24-fill', '-24-fill']];
const out = { _about: 'Measured by tools/icons/measure-material.js from the Plenix working set (Material Symbols Sharp, weight 300). Units: px at the variant\'s own size.', variants: {} };
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * (s.length - 1)))]; };
const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

for (const [key, suffix] of VARIANTS) {
  const px = key.startsWith('20') ? 20 : 24;
  const rows = [];
  for (const sym of symbols) {
    const f = file(sym, suffix);
    if (!f) continue;
    const svg = readSvg(fs.readFileSync(f, 'utf8'));
    const upx = svg.viewBox[2] / px; // viewBox units per screen pixel (48 at 20, 40 at 24)
    const items = svg.shapes.map((s) => ({ path: s.path, rule: s.fillRule }));
    const b = svg.shapes.reduce((acc, s) => (acc ? acc.unite(s.path.bounds) : s.path.bounds.clone()), null);
    const size = ALL ? 240 : 960;
    const grid = rasterize(items, svg.viewBox, size);
    const weight = lineWeight(grid, size, svg.viewBox[2] / size) / upx;
    let rounded = 0, curves = 0, lines = 0, half = 0, edges = 0;
    for (const s of svg.shapes) {
      const c = cornerStats(s.path, upx);
      rounded += c.rounded; curves += c.curves; lines += c.lines;
      for (const k of s.path.children || [s.path]) for (const cv of k.curves) {
        if (!cv.isStraight()) continue;
        const p1 = cv.point1, p2 = cv.point2;
        const axis = Math.abs(p1.x - p2.x) < 0.01 ? (p1.x - svg.viewBox[0]) : Math.abs(p1.y - p2.y) < 0.01 ? (p1.y - svg.viewBox[1]) : null;
        if (axis == null) continue;
        edges++;
        const v = axis / upx * 2; // in half pixels
        if (Math.abs(v - Math.round(v)) < 0.05) half++;
      }
    }
    rows.push({
      sym, weight: round(weight),
      left: round((b.left - svg.viewBox[0]) / upx), top: round((b.top - svg.viewBox[1]) / upx),
      right: round((svg.viewBox[0] + svg.viewBox[2] - b.right) / upx), bottom: round((svg.viewBox[1] + svg.viewBox[3] - b.bottom) / upx),
      w: round(b.width / upx), h: round(b.height / upx), rounded, curves, lines, edges, half,
    });
  }
  const w = rows.map((r) => r.weight).filter((x) => x > 0);
  const pad = rows.map((r) => Math.min(r.left, r.top, r.right, r.bottom));
  const live = rows.map((r) => Math.max(r.w, r.h));
  const summary = {
    files: rows.length, viewBox: '0 -960 960 960', unitsPerPx: 960 / px,
    lineWeight: { median: pct(w, 0.5), p10: pct(w, 0.1), p90: pct(w, 0.9) },
    smallestPadding: { min: pct(pad, 0), p10: pct(pad, 0.1), median: pct(pad, 0.5) },
    liveArea: { median: pct(live, 0.5), p90: pct(live, 0.9), max: pct(live, 1) },
    roundedCorners: rows.reduce((s, r) => s + r.rounded, 0),
    filesWithRoundedCorners: rows.filter((r) => r.rounded).map((r) => r.sym),
    straightSegments: rows.reduce((s, r) => s + r.lines, 0), curveSegments: rows.reduce((s, r) => s + r.curves, 0),
    axisEdges: rows.reduce((s, r) => s + r.edges, 0), axisEdgesOnHalfPixel: rows.reduce((s, r) => s + r.half, 0),
  };
  out.variants[key] = { summary, icons: rows };
  console.log(key, JSON.stringify(summary, (k, v) => (k === 'filesWithRoundedCorners' ? (v.length > 12 ? v.slice(0, 12).concat('…' + v.length) : v) : v)));
}
fs.writeFileSync(path.join(ICONS, 'inventory', 'material-measure.json'), JSON.stringify(out, null, 1) + '\n');
