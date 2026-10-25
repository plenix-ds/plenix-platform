#!/usr/bin/env node
// The restyle check: reads an SVG icon and reports how it is built against the Plenix icon guidance
// (platform/standards/icons.md, numbers in lib/guidance.js).
//
//   node tools/icons/check-icon.js <file.svg> [more.svg …] [--optical 20|24] [--json]
//
// --optical: which optical size to judge against. Default: 24 for a "-24" file name or a 24-unit canvas, else 20 for a
// Plenix canvas (0 -960 960 960), else 24 (most libraries draw on a 24 grid).
// Exit code 1 when any file fails a rule (warnings do not fail).
'use strict';
const fs = require('fs');
const path = require('path');
const { readSvg, rasterize, lineWeight, cornerStats } = require('./lib/svg');
const { OPTICAL, RULES } = require('./lib/guidance');

const r2 = (n) => Math.round(n * 100) / 100;

function classify(w, h) {
  const a = w / h;
  if (a < 0.85) return 'portrait';
  if (a > 1.18) return 'landscape';
  return null; // square or circle: decided by roundness
}

function checkIcon(text, opts = {}) {
  const svg = readSvg(text);
  const [vx, vy, vw, vh] = svg.viewBox;
  const plenixCanvas = vx === 0 && vy === -960 && vw === 960 && vh === 960;
  const optical = Number(opts.optical) || (opts.file && /-24(-fill)?\.svg$/.test(opts.file) ? 24 : plenixCanvas ? 20 : 24);
  const G = OPTICAL[optical];
  const k = 960 / vw; // source units → Plenix units
  const toU = (x, y) => [(x - vx) * k, (y - vy) * k - 960];

  const strokes = svg.shapes.filter((s) => s.stroke);
  const fills = svg.shapes.filter((s) => s.fill);
  const colors = new Set();
  for (const s of svg.shapes) for (const c of [s.fill, s.stroke]) if (c && !/^(currentColor|black|#000|#000000)$/i.test(c)) colors.add(c);
  const caps = [...new Set(strokes.map((s) => s.linecap))];
  const joins = [...new Set(strokes.map((s) => s.linejoin))];
  const widths = [...new Set(strokes.map((s) => r2(s.strokeWidth * k)))];

  // Live area in Plenix units: shape bounds, widened by half the stroke for stroked shapes.
  let L = Infinity, T = Infinity, R = -Infinity, B = -Infinity;
  for (const s of svg.shapes) {
    const b = s.path.bounds, half = s.stroke ? s.strokeWidth / 2 : 0;
    const [x0, y0] = toU(b.left - half, b.top - half), [x1, y1] = toU(b.right + half, b.bottom + half);
    L = Math.min(L, x0); T = Math.min(T, y0); R = Math.max(R, x1); B = Math.max(B, y1);
  }
  const live = { left: r2(L), top: r2(T + 960), right: r2(R), bottom: r2(B + 960), width: r2(R - L), height: r2(B - T) };
  const padding = r2(Math.min(L, T + 960, 960 - R, 960 - (B + 960)));

  // Rounded corners: short curves between two straight segments, plus round ends and joins on strokes.
  let rounded = 0, curves = 0, lines = 0; const roundedAt = [];
  for (const s of svg.shapes) { const c = cornerStats(s.path, vw / G.px); for (const p of c.where) { const [ux, uy] = toU(p.x, p.y); roundedAt.push(`${r2(ux / G.unitsPerPx)},${r2((uy + 960) / G.unitsPerPx)}`); } rounded += c.rounded; curves += c.curves; lines += c.lines; }
  const roundEnds = strokes.filter((s) => s.linecap === 'round').length;
  const roundJoins = strokes.filter((s) => s.linejoin === 'round').length;

  // Line weight: the stroke widths, or measured from the filled outline.
  let weight = null;
  if (strokes.length && !fills.length) weight = widths.length === 1 ? widths[0] : null;
  if (weight == null && svg.shapes.length) {
    const size = 480;
    const grid = rasterize(svg.shapes.filter((s) => s.fill).map((s) => ({ path: s.path, rule: s.fillRule })), svg.viewBox, size);
    weight = r2(lineWeight(grid, size, vw / size) * k);
  }

  // Keyline: which shape the live area is, and how far it is from that keyline.
  let shape = classify(live.width, live.height);
  if (!shape) {
    // the largest closed outline: mostly curved = circle
    let best = null, area = 0;
    for (const s of svg.shapes) for (const c of s.path.children || [s.path]) if (c.closed && c.bounds.area > area) { area = c.bounds.area; best = c; }
    let curvedLen = 0, total = 0;
    if (best) for (const cv of best.curves) { total += cv.length; if (!cv.isStraight()) curvedLen += cv.length; }
    shape = total && curvedLen / total > 0.6 ? 'circle' : 'square';
  }
  const kl = G.keylines[shape];
  const keylineOff = r2(Math.max(Math.abs((kl.x[1] - kl.x[0]) - live.width), Math.abs((kl.y[1] - kl.y[0]) - live.height)));

  // Edges on the half-pixel grid (24 only): axis-aligned straight edges of filled outlines, stroke edges of strokes.
  let axis = 0, onGrid = 0;
  const step = OPTICAL[24].edgeGrid;
  const test = (u) => { axis++; if (Math.abs(u / step - Math.round(u / step)) * step < 1) onGrid++; };
  for (const s of svg.shapes) for (const c of s.path.children || [s.path]) for (const cv of c.curves) {
    if (!cv.isStraight() || cv.length < 1e-6) continue;
    const [ax, ay] = toU(cv.point1.x, cv.point1.y), [bx, by] = toU(cv.point2.x, cv.point2.y);
    const half = s.stroke ? s.strokeWidth * k / 2 : 0;
    if (Math.abs(ax - bx) < 0.5) { if (half) { test(ax - half); test(ax + half); } else test(ax); }
    else if (Math.abs(ay - by) < 0.5) { if (half) { test(ay - half + 960); test(ay + half + 960); } else test(ay + 960); }
  }

  const rules = [];
  const add = (id, ok, detail, level = 'fail') => rules.push({ id, result: ok ? 'pass' : level, detail });
  add('canvas', plenixCanvas, plenixCanvas ? '0 -960 960 960' : `viewBox ${svg.viewBox.join(' ')} (Plenix: 0 -960 960 960)`);
  add('construction', !strokes.length && svg.shapes.length >= 1 && svg.shapes.every((s) => s.tag === 'path') && !svg.notes.length,
    `${svg.shapes.length} shape(s): ${fills.length} filled, ${strokes.length} stroked${svg.notes.length ? '; ' + svg.notes.join(', ') : ''} (Plenix: filled paths only, no strokes, masks or definitions)`);
  add('one-color', !colors.size, colors.size ? 'colors: ' + [...colors].join(', ') : 'one color (current text color)');
  const filled = opts.filled ?? (opts.file && /-fill.svg$/.test(opts.file));
  add('line-weight', weight != null && Math.abs(weight - G.lineWeight) <= RULES.lineWeightTolerance,
    `${weight == null ? 'mixed: ' + widths.join(', ') : weight} units = ${weight == null ? '?' : r2(weight / G.unitsPerPx)}px at ${optical} (Plenix: ${G.lineWeight} units = ${r2(G.lineWeight / G.unitsPerPx)}px)${filled ? '; filled: solid areas widen the measure' : ''}`, filled || !(strokes.length && !fills.length) && !opts.strict ? 'warn' : 'fail');
  add('line-ends', !strokes.length || caps.every((c) => c === 'butt' || c === 'square'), strokes.length ? 'stroke ends: ' + caps.join(', ') + ' (Plenix: flat)' : 'no strokes');
  add('sharp-corners', rounded + roundJoins === 0, `${rounded} rounded corner(s)${roundedAt.length ? ' at ' + roundedAt.slice(0, 6).join(' ') + 'px' : ''}${roundJoins ? `, round joins on ${roundJoins} stroke(s)` : ''}${roundEnds ? `, round ends on ${roundEnds} stroke(s)` : ''} (Plenix: 0)`);
  add('padding', padding >= RULES.padding - 0.5, `${padding} units = ${r2(padding / G.unitsPerPx)}px (Plenix: at least ${RULES.padding} units = ${r2(RULES.padding / G.unitsPerPx)}px)`);
  const outer = G.keylines.circle.x[1] - G.keylines.circle.x[0];
  add('keyline', Math.max(live.width, live.height) <= outer + RULES.keylineTolerance, `${shape}: live area ${live.width}×${live.height} units; the ${shape} keyline is ${kl.x[1] - kl.x[0]}×${kl.y[1] - kl.y[0]} (${keylineOff} off), the largest keyline ${outer}`, 'warn');
  if (optical === 24) add('edge-grid', !axis || onGrid / axis >= RULES.edgesOnGrid, `${onGrid} of ${axis} straight edges on the half-pixel grid`, 'warn');

  return {
    optical, viewBox: svg.viewBox, plenixCanvas,
    construction: { shapes: svg.shapes.length, filled: fills.length, stroked: strokes.length, tags: [...new Set(svg.shapes.map((s) => s.tag))], notes: svg.notes, colors: [...colors] },
    stroke: { widths, caps, joins }, weight, live, padding, shape, keylineOff, corners: { rounded, curves, lines, roundEnds, roundJoins },
    edges: { axis, onGrid }, rules, pass: rules.every((r) => r.result !== 'fail'),
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const optical = opt('--optical');
  const json = args.includes('--json');
  const files = args.filter((a) => !a.startsWith('--'));
  if (!files.length) { console.error('usage: node tools/icons/check-icon.js <file.svg> … [--optical 20|24] [--json]'); process.exit(2); }
  let failed = 0;
  const all = [];
  for (const f of files) {
    const r = checkIcon(fs.readFileSync(f, 'utf8'), { optical, file: f });
    all.push({ file: f, ...r });
    if (!r.pass) failed++;
    if (!json) {
      console.log(`${path.basename(f)}  (judged at ${r.optical})  ${r.pass ? 'PASS' : 'FAIL'}`);
      for (const x of r.rules) console.log(`  ${x.result.toUpperCase().padEnd(4)} ${x.id.padEnd(13)} ${x.detail}`);
    }
  }
  if (json) console.log(JSON.stringify(all, null, 1));
  process.exit(failed ? 1 : 0);
}
module.exports = { checkIcon };
