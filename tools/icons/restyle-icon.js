#!/usr/bin/env node
// The restyle step: turns an icon from another library into a Plenix drawing that follows the icon guidance
// (platform/standards/icons.md): the 0 -960 960 960 canvas, one filled path, the optical size's line weight, flat ends,
// sharp corners, the keylines and the edge grid. Writes four files like a Material symbol: <name>.svg, -fill, -24, -24-fill.
//
//   node tools/icons/restyle-icon.js <source.svg> --name <plenix-name> --out <dir>
//        [--fill-from <filled-source.svg>]   the library's own filled version (else the filled version is generated)
//        [--reference <circle.svg>]          the library's circle icon, to scale the set as a whole (default: circle.svg beside the source)
//        [--shape circle|square|portrait|landscape]
//
// Never use it on the Material Symbols files in platform/icons/: that set stays unedited. A restyled icon is a new
// Plenix icon (platform/icons/inventory/README.md).
'use strict';
const fs = require('fs');
const path = require('path');
const { paper, readSvg } = require('./lib/svg');
const { PaperOffset } = require('paperjs-offset');
const { OPTICAL } = require('./lib/guidance');

const CENTER = new paper.Point(480, -480);

// Source shapes in Plenix units (0 -960 960 960).
function toUnits(svg) {
  const [vx, vy, vw] = svg.viewBox;
  const k = 960 / vw;
  const m = new paper.Matrix(k, 0, 0, k, -vx * k, -vy * k - 960);
  return svg.shapes.map((s) => { const p = s.path.clone({ insert: false }); p.transform(m); return { ...s, path: p, strokeWidth: s.strokeWidth * k }; });
}

const subpaths = (p) => (p.children ? p.children.slice() : [p]);

// Sharp corners: a short curve between two straight segments becomes the corner where the two lines meet.
function sharpen(p, maxLen) {
  const out = [];
  for (const sp0 of subpaths(p)) {
    // an open path that ends where it starts is a closed shape
    const sp = sp0.clone({ insert: false });
    if (!sp.closed && sp.segments.length > 2 && sp.firstSegment.point.getDistance(sp.lastSegment.point) < 1) {
      sp.firstSegment.handleIn = sp.lastSegment.handleIn;
      sp.lastSegment.remove();
      sp.closed = true;
    }
    let curves = sp.curves.map((c) => ({ p1: c.point1.clone(), h1: c.handle1.clone(), h2: c.handle2.clone(), p2: c.point2.clone(), straight: c.isStraight() || c.length < 1e-6, len: c.length }));
    curves = curves.filter((c) => c.len > 1e-3);
    let changed = true;
    while (changed) {
      changed = false;
      const n = curves.length;
      for (let i = 0; i < n; i++) {
        const c = curves[i];
        if (c.straight || c.len > maxLen) continue;
        const pi = i - 1 >= 0 ? i - 1 : (sp.closed ? n - 1 : -1), ni = i + 1 < n ? i + 1 : (sp.closed ? 0 : -1);
        if (pi < 0 || ni < 0 || pi === ni) continue;
        const a = curves[pi], b = curves[ni];
        if (!a.straight || !b.straight) continue;
        const la = new paper.Line(a.p1, a.p2), lb = new paper.Line(b.p1, b.p2);
        const x = la.intersect(lb, true);
        if (!x) continue;
        // only a real corner: the lines turn 30–150°, and the corner lies within the curve's own box (never a far spike)
        const turn = Math.abs(a.p2.subtract(a.p1).getDirectedAngle(b.p2.subtract(b.p1)));
        if (turn < 30 || turn > 150) continue;
        const box = new paper.Rectangle(c.p1, c.p2).expand(2);
        if (!box.contains(x)) continue;
        a.p2 = x.clone(); b.p1 = x.clone();
        a.len = a.p1.getDistance(a.p2); b.len = b.p1.getDistance(b.p2);
        curves.splice(i, 1);
        changed = true;
        break;
      }
    }
    const segs = [];
    curves.forEach((c, i) => {
      if (i === 0) segs.push(new paper.Segment(c.p1, null, c.straight ? null : c.h1));
      else if (!c.straight) segs[segs.length - 1].handleOut = c.h1;
      const last = i === curves.length - 1 && sp.closed;
      if (last) { if (!c.straight) segs[0].handleIn = c.h2; }
      else segs.push(new paper.Segment(c.p2, c.straight ? null : c.h2, null));
    });
    if (segs.length) out.push(new paper.Path({ segments: segs, closed: sp.closed, insert: false }));
  }
  return out;
}

// The scale of the whole library: its circle icon's centerline diameter maps to the Plenix circle keyline.
function libraryScale(refFile, G, wTarget) {
  if (!refFile || !fs.existsSync(refFile)) return null;
  const shapes = toUnits(readSvg(fs.readFileSync(refFile, 'utf8')));
  if (!shapes.length) return null;
  const b = shapes.reduce((acc, s) => (acc ? acc.unite(s.path.bounds) : s.path.bounds.clone()), null);
  const stroked = shapes.some((s) => s.stroke);
  const K = G.keylines.circle.x[1] - G.keylines.circle.x[0];
  return stroked ? (K - wTarget) / Math.max(b.width, b.height) : K / Math.max(b.width, b.height);
}

function classify(bounds, items) {
  const a = bounds.width / bounds.height;
  if (a < 0.85) return 'portrait';
  if (a > 1.18) return 'landscape';
  let best = null, area = 0;
  for (const it of items) for (const c of subpaths(it.path)) if (c.closed && c.bounds.area > area) { area = c.bounds.area; best = c; }
  let curved = 0, total = 0;
  if (best) for (const cv of best.curves) { total += cv.length; if (!cv.isStraight()) curved += cv.length; }
  return total && curved / total > 0.6 ? 'circle' : 'square';
}

// Snap axis-aligned straight segments so their edges land on the grid (24: 20 units, 20: 4 units).
function snap(paths, grid, half) {
  const s = (v) => Math.round((v - half) / grid) * grid + half;
  for (const p of paths) for (const sp of subpaths(p)) for (const c of sp.curves) {
    if (!c.isStraight()) continue;
    if (Math.abs(c.point1.x - c.point2.x) < 0.5) { const x = s(c.point1.x); c.segment1.point.x = x; c.segment2.point.x = x; }
    else if (Math.abs(c.point1.y - c.point2.y) < 0.5) { const y = s(c.point1.y + 960) - 960; c.segment1.point.y = y; c.segment2.point.y = y; }
  }
}

const fmt = (d) => d.replace(/-?\d*\.\d+(e-?\d+)?/g, (n) => String(Math.round(parseFloat(n) * 100) / 100));

function unite(items) {
  let acc = null;
  for (const it of items) {
    if (!it) continue;
    acc = acc ? acc.unite(it, { insert: false }) : it;
  }
  return acc;
}

// One optical size of one drawing. Returns { item, report }.
function draw(shapes, optical, opts, transform) {
  const G = OPTICAL[optical];
  const w = G.lineWeight;
  const report = { notes: [] };
  // 1. sharp corners (curves up to 4.5 source px long that join two straight lines)
  const items = [];
  for (const s of shapes) {
    const sharp = sharpen(s.path, 4.5 * 40); // radius up to ~2.5 source px
    if (s.stroke) for (const p of sharp) items.push({ path: p, stroke: true, fill: !!s.fill, srcWidth: s.strokeWidth });
    // a filled shape keeps its subpaths together, so its holes stay holes
    else if (sharp.length) items.push({ path: new paper.CompoundPath({ children: sharp.map((p) => { p.closed = true; return p; }), fillRule: s.fillRule, insert: false }), stroke: false, fill: !!s.fill });
  }
  // 2. the fit: one transform for the outline and the filled version (computed once, from the outline)
  if (!transform) {
    const cb = items.reduce((acc, it) => (acc ? acc.unite(it.path.bounds) : it.path.bounds.clone()), null);
    const shape = opts.shape || classify(cb, items);
    const kl = G.keylines[shape];
    const stroked = items.some((it) => it.stroke);
    const inset = stroked ? w : 0;
    const sFit = Math.min((kl.x[1] - kl.x[0] - inset) / cb.width, (kl.y[1] - kl.y[0] - inset) / cb.height);
    const sLib = libraryScale(opts.reference, G, w);
    const s = sLib ? Math.min(sFit, sLib) : sFit;
    // scale about the canvas center when the library scale wins (keeps the library's own placement), else center the box
    const origin = s === sFit ? cb.center : CENTER;
    const m = new paper.Matrix().translate(CENTER).scale(s).translate(origin.multiply(-1));
    transform = { m, shape, scale: s, by: s === sFit ? 'keyline' : 'library' };
  }
  report.shape = transform.shape; report.scale = Math.round(transform.scale * 1000) / 1000; report.fitBy = transform.by;
  for (const it of items) it.path.transform(transform.m);
  // keep the drawing inside the padding (80 units) by moving it, never by scaling it again
  // 3. the edge grid
  const grid = optical === 24 ? 20 : 4;
  snap(items.filter((it) => it.stroke).map((it) => it.path), grid, grid / 2);
  snap(items.filter((it) => !it.stroke).map((it) => it.path), grid, 0);
  // 4. strokes to outlines: flat ends, mitered corners, the optical size's weight; tiny open strokes become square dots
  const outlines = [];
  for (const it of items) {
    if (!it.stroke) { if (it.fill) { const f = it.path.clone({ insert: false }); f.closed = true; outlines.push(f); } continue; }
    if (!it.path.closed && it.path.length < w) {
      const c = it.path.getPointAt(it.path.length / 2) || it.path.firstSegment.point;
      outlines.push(new paper.Path.Rectangle({ point: [c.x - w / 2, c.y - w / 2], size: [w, w], insert: false }));
      report.notes.push('a dot drawn as a square');
      continue;
    }
    outlines.push(PaperOffset.offsetStroke(it.path, w / 2, { cap: 'butt', join: 'miter', limit: 4, insert: false }));
    if (it.fill) { const f = it.path.clone({ insert: false }); f.closed = true; outlines.push(f); }
  }
  const item = unite(outlines);
  return { item, items, report, transform };
}

// The filled version, generated from the outline: large closed outer shapes become solid and the lines inside them
// are cut out; round closed shapes (dots, rings) become solid; every other line stays as drawn. Without such a shape
// there is no filled version to make, and the outline is used.
function generateFill(drawn, optical) {
  const w = OPTICAL[optical].lineWeight;
  const stroke = (p) => PaperOffset.offsetStroke(p, w / 2, { cap: 'butt', join: 'miter', limit: 4, insert: false });
  const all = drawn.items.reduce((acc, it) => (acc ? acc.unite(it.path.bounds) : it.path.bounds.clone()), null);
  const closed = drawn.items.filter((it) => it.stroke && it.path.closed);
  const round = (p) => { let c = 0, t = 0; for (const cv of p.curves) { t += cv.length; if (!cv.isStraight()) c += cv.length; } return t && c / t > 0.6; };
  const top = closed.filter((a) => (a.path.bounds.area >= all.area / 4 || round(a.path)) && !closed.some((b) => b !== a && b.path.bounds.contains(a.path.bounds) && b.path.contains(a.path.interiorPoint)));
  if (!top.length) return null;
  let solid = unite(top.map((it) => it.path.clone({ insert: false }).unite(stroke(it.path), { insert: false })));
  const inner = unite(top.map((it) => PaperOffset.offset(it.path.clone({ insert: false }), -w / 2, { join: 'miter', limit: 4, insert: false })));
  for (const it of drawn.items) {
    if (top.includes(it)) continue;
    let line;
    if (it.stroke) line = !it.path.closed && it.path.length < w ? new paper.Path.Rectangle({ point: it.path.bounds.center.subtract(w / 2), size: [w, w], insert: false }) : stroke(it.path);
    else if (it.fill) { line = it.path.clone({ insert: false }); line.closed = true; }
    if (!line) continue;
    const inside = inner ? line.intersect(inner, { insert: false }) : null;
    const outside = inner ? line.subtract(inner, { insert: false }) : line;
    if (inside && !inside.isEmpty()) solid = solid.subtract(inside, { insert: false });
    if (outside && !outside.isEmpty()) solid = solid.unite(outside, { insert: false });
  }
  return solid;
}

// Removes the slivers a merge leaves where shapes meet: points closer than 6 units (0.15px at 24) to the next one,
// and curves that are straight lines in all but name.
function clean(item) {
  for (const sp of subpaths(item)) {
    let changed = true;
    while (changed && sp.segments.length > 3) {
      changed = false;
      for (let i = 0; i < sp.segments.length; i++) {
        const a = sp.segments[i], b = sp.segments[(i + 1) % sp.segments.length];
        if (a === b || a.point.getDistance(b.point) >= 6) continue;
        a.handleOut = b.handleOut.add(b.point.subtract(a.point));
        b.remove();
        changed = true;
        break;
      }
    }
    // a curve that strays less than 1 unit from its chord is a straight line
    for (const c of sp.curves) {
      if (c.isStraight()) continue;
      const chord = new paper.Line(c.point1, c.point2);
      const h1 = c.point1.add(c.handle1), h2 = c.point2.add(c.handle2);
      if (c.point1.getDistance(c.point2) > 1 && chord.getDistance(h1) < 1 && chord.getDistance(h2) < 1) { c.segment1.handleOut = [0, 0]; c.segment2.handleIn = [0, 0]; }
    }
  }
  return item;
}

function svgFile(item, px) {
  const d = fmt(clean(item).pathData);
  return `<svg xmlns="http://www.w3.org/2000/svg" height="${px}" viewBox="0 -960 960 960" width="${px}"><path d="${d}"/></svg>\n`;
}

function restyle(sourceText, opts = {}) {
  const shapes = toUnits(readSvg(sourceText));
  const fillShapes = opts.fillText ? toUnits(readSvg(opts.fillText)) : null;
  const files = {}, report = {};
  for (const optical of [20, 24]) {
    const out = draw(shapes, optical, opts);
    const suffix = optical === 24 ? '-24' : '';
    files[suffix] = svgFile(out.item, optical);
    let fillItem, fillMethod;
    if (fillShapes) { fillItem = draw(fillShapes, optical, opts, out.transform).item; fillMethod = 'from the library\'s filled version'; }
    else { fillItem = generateFill(out, optical); fillMethod = fillItem ? 'generated: outer shapes solid, inner lines cut out' : 'none: no closed outer shape (the outline is used)'; }
    files[suffix + '-fill'] = svgFile(fillItem || out.item, optical);
    report[optical] = { ...out.report, fill: fillMethod };
  }
  return { files, report };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const name = opt('--name'), outDir = opt('--out'), fillFrom = opt('--fill-from'), shape = opt('--shape');
  let reference = opt('--reference');
  const src = args.find((a) => !a.startsWith('--'));
  if (!src || !name || !outDir) { console.error('usage: node tools/icons/restyle-icon.js <source.svg> --name <name> --out <dir> [--fill-from f.svg] [--reference circle.svg] [--shape …]'); process.exit(2); }
  if (/platform[\\/]icons[\\/](library[\\/])?[^\\/]+\.svg$/.test(path.resolve(src).replace(/\\/g, '/')) && !/inventory/.test(src)) { console.error('Refusing: the Material Symbols files stay unedited.'); process.exit(2); }
  if (!reference) { const c = path.join(path.dirname(src), 'circle.svg'); if (fs.existsSync(c)) reference = c; }
  const r = restyle(fs.readFileSync(src, 'utf8'), { fillText: fillFrom ? fs.readFileSync(fillFrom, 'utf8') : null, reference, shape });
  fs.mkdirSync(outDir, { recursive: true });
  for (const [suffix, text] of Object.entries(r.files)) fs.writeFileSync(path.join(outDir, name + suffix + '.svg'), text);
  console.log(JSON.stringify({ name, source: src, reference: reference || null, report: r.report }, null, 1));
}
module.exports = { restyle };
