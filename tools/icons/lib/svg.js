// Shared SVG geometry for the icon tools (check-icon.js, restyle-icon.js, measure-material.js).
// Reads an icon's SVG text as data (no scripts, no external references), turns its shapes into paper.js paths with
// their resolved paint (fill, stroke, stroke width, ends, joins), rasterizes filled outlines, and measures them.
'use strict';
const paper = require('paper');
paper.setup(new paper.Size(1024, 1024));

const SHAPES = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon']);
const INHERITED = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill-rule', 'opacity', 'fill-opacity', 'stroke-opacity'];

// ---- a small XML reader (elements and attributes only; text, comments, CDATA and doctype are skipped)
function parseXml(text) {
  const root = { name: '#root', attrs: {}, children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<![^>]*>|<\?[\s\S]*?\?>|<\/\s*([\w:.-]+)\s*>|<([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>/g;
  let m;
  while ((m = re.exec(text))) {
    if (m[1]) { if (stack.length > 1) stack.pop(); continue; }
    if (!m[2]) continue;
    const attrs = {};
    for (const a of m[3].matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) attrs[a[1]] = a[2] ?? a[3];
    if (attrs.style) for (const decl of attrs.style.split(';')) { const [k, v] = decl.split(':').map((s) => s && s.trim()); if (k && v) attrs[k] = v; }
    const el = { name: m[2].replace(/^svg:/, ''), attrs, children: [] };
    stack[stack.length - 1].children.push(el);
    if (!m[4]) stack.push(el);
  }
  return root;
}

const num = (v, d = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };

function parseTransform(t) {
  let mtx = new paper.Matrix();
  if (!t) return mtx;
  for (const m of t.matchAll(/(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^)]*)\)/g)) {
    const a = m[2].split(/[\s,]+/).filter(Boolean).map(Number);
    let n;
    if (m[1] === 'matrix') n = new paper.Matrix(a[0], a[1], a[2], a[3], a[4], a[5]);
    else if (m[1] === 'translate') n = new paper.Matrix().translate(a[0], a[1] || 0);
    else if (m[1] === 'scale') n = new paper.Matrix().scale(a[0], a[1] ?? a[0]);
    else if (m[1] === 'rotate') n = new paper.Matrix().rotate(a[0], a[1] || 0, a[2] || 0);
    else if (m[1] === 'skewX') n = new paper.Matrix().skew(a[0], 0);
    else n = new paper.Matrix().skew(0, a[0]);
    mtx = mtx.append(n);
  }
  return mtx;
}

function shapePath(el) {
  const a = el.attrs;
  switch (el.name) {
    case 'path': return a.d ? new paper.CompoundPath({ pathData: a.d, insert: false }) : null;
    case 'rect': {
      const w = num(a.width), h = num(a.height);
      if (!(w > 0 && h > 0)) return null;
      let rx = a.rx != null ? num(a.rx) : (a.ry != null ? num(a.ry) : 0), ry = a.ry != null ? num(a.ry) : rx;
      rx = Math.min(rx, w / 2); ry = Math.min(ry, h / 2);
      return new paper.Path.Rectangle({ rectangle: new paper.Rectangle(num(a.x), num(a.y), w, h), radius: new paper.Size(rx, ry), insert: false });
    }
    case 'circle': return num(a.r) > 0 ? new paper.Path.Circle({ center: [num(a.cx), num(a.cy)], radius: num(a.r), insert: false }) : null;
    case 'ellipse': return num(a.rx) > 0 && num(a.ry) > 0 ? new paper.Path.Ellipse({ center: [num(a.cx), num(a.cy)], radius: [num(a.rx), num(a.ry)], insert: false }) : null;
    case 'line': return new paper.Path({ segments: [[num(a.x1), num(a.y1)], [num(a.x2), num(a.y2)]], insert: false });
    case 'polyline':
    case 'polygon': {
      const p = (a.points || '').split(/[\s,]+/).filter(Boolean).map(Number);
      const segs = [];
      for (let i = 0; i + 1 < p.length; i += 2) segs.push([p[i], p[i + 1]]);
      return segs.length > 1 ? new paper.Path({ segments: segs, closed: el.name === 'polygon', insert: false }) : null;
    }
  }
  return null;
}

// Every drawn shape with its resolved paint. viewBox gives the canvas.
function readSvg(text) {
  const root = parseXml(text);
  const svg = root.children.find((c) => c.name === 'svg');
  if (!svg) throw new Error('no <svg> element');
  const vb = (svg.attrs.viewBox || `0 0 ${num(svg.attrs.width, 24)} ${num(svg.attrs.height, 24)}`).split(/[\s,]+/).map(Number);
  const shapes = [];
  const notes = new Set();
  const defs = new Map();
  const walk = (el, inherited, mtx) => {
    if (['defs', 'clipPath', 'mask', 'symbol', 'title', 'desc', 'metadata', 'style', 'linearGradient', 'radialGradient', 'pattern', 'filter'].includes(el.name)) {
      if (el.name !== 'title' && el.name !== 'desc' && el.name !== 'metadata') notes.add('has <' + el.name + '>');
      return;
    }
    if (el.name === 'script' || el.name === 'foreignObject' || el.name === 'image') { notes.add('rejected <' + el.name + '>'); return; }
    const own = { ...inherited };
    for (const k of INHERITED) if (el.attrs[k] != null) own[k] = el.attrs[k];
    const m = mtx.clone().append(parseTransform(el.attrs.transform));
    if (el.attrs.mask || el.attrs['clip-path']) notes.add('uses mask/clip-path');
    if (el.name === 'use') notes.add('has <use>');
    if (SHAPES.has(el.name)) {
      const p = shapePath(el);
      if (p) {
        if (!m.isIdentity()) p.transform(m);
        const fill = own.fill ?? 'black';
        const stroke = own.stroke ?? 'none';
        const scale = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1;
        shapes.push({
          tag: el.name, path: p,
          fill: fill !== 'none' && fill !== 'transparent' && own['fill-opacity'] !== '0' ? fill : null,
          stroke: stroke !== 'none' && stroke !== 'transparent' && own['stroke-opacity'] !== '0' ? stroke : null,
          strokeWidth: num(own['stroke-width'], 1) * scale,
          linecap: own['stroke-linecap'] || 'butt', linejoin: own['stroke-linejoin'] || 'miter',
          fillRule: own['fill-rule'] || 'nonzero', opacity: num(own.opacity, 1),
        });
      }
    }
    for (const c of el.children) walk(c, own, m);
  };
  for (const c of svg.children) walk(c, { fill: svg.attrs.fill, stroke: svg.attrs.stroke, 'stroke-width': svg.attrs['stroke-width'], 'stroke-linecap': svg.attrs['stroke-linecap'], 'stroke-linejoin': svg.attrs['stroke-linejoin'] }, new paper.Matrix());
  return { viewBox: vb, shapes, notes: [...notes], defs };
}

// ---- rasterizing filled outlines (nonzero or even-odd), size×size cells over the viewBox
function rasterize(items, viewBox, size) {
  const [vx, vy, vw, vh] = viewBox;
  const sx = size / vw, sy = size / vh;
  const grid = new Uint8Array(size * size);
  for (const { path, rule } of items) {
    const polys = [];
    const kids = path.children ? path.children : [path];
    for (const k of kids) {
      const c = k.clone({ insert: false });
      c.flatten(Math.max(vw / size / 4, 0.01));
      const pts = c.segments.map((s) => [(s.point.x - vx) * sx, (s.point.y - vy) * sy]);
      if (pts.length > 2) polys.push(pts);
    }
    const local = new Int16Array(size * size);
    for (const pts of polys) {
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % pts.length];
        if (y0 === y1) continue;
        const dir = y1 > y0 ? 1 : -1;
        const ya = Math.min(y0, y1), yb = Math.max(y0, y1);
        for (let row = Math.max(0, Math.ceil(ya - 0.5)); row < size && row + 0.5 < yb; row++) {
          const y = row + 0.5;
          const x = x0 + (y - y0) * (x1 - x0) / (y1 - y0);
          const col = Math.max(0, Math.min(size, Math.ceil(x - 0.5)));
          if (col < size) local[row * size + col] += dir;
        }
      }
    }
    for (let row = 0; row < size; row++) {
      let w = 0;
      for (let col = 0; col < size; col++) {
        w += local[row * size + col];
        if (rule === 'evenodd' ? (w & 1) : w !== 0) grid[row * size + col] = 1;
      }
    }
  }
  return grid;
}

// The typical line weight: the most common length of filled runs across rows and columns (in viewBox units).
function lineWeight(grid, size, unit) {
  const hist = new Map();
  const add = (n) => { if (n >= 2) hist.set(n, (hist.get(n) || 0) + 1); };
  for (let r = 0; r < size; r++) { let n = 0; for (let c = 0; c < size; c++) { if (grid[r * size + c]) n++; else { add(n); n = 0; } } add(n); }
  for (let c = 0; c < size; c++) { let n = 0; for (let r = 0; r < size; r++) { if (grid[r * size + c]) n++; else { add(n); n = 0; } } add(n); }
  let best = 0, bestN = 0;
  // smooth over ±1 cell so a weight that falls between two cells still wins
  for (const [k] of hist) { const s = (hist.get(k - 1) || 0) + hist.get(k) + (hist.get(k + 1) || 0); if (s > bestN && k < size / 3) { best = k; bestN = s; } }
  return best * unit;
}

// Rounded corners: a run of curves, together shorter than 3px, between two straight segments that turn more than 20°
// (a rounded rectangle's corner, a round join or a round end). Also counts the curve segments overall.
function cornerStats(path, unitsPerPx) {
  let lines = 0, curves = 0, rounded = 0, joints = 0; const where = [];
  for (const k of path.children ? path.children : [path]) {
    const cs = k.curves.filter((c) => c.length > 0.15 * unitsPerPx); // slivers under 0.15px do not break a run
    const n = cs.length;
    const straight = cs.map((c) => c.isStraight());
    straight.forEach((s) => (s ? lines++ : curves++));
    joints += n;
    if (!straight.some(Boolean)) continue;
    for (let i = 0; i < n; i++) {
      if (!straight[i]) continue;
      // walk the curves after this straight segment up to the next straight one
      let j = i + 1, len = 0, steps = 0;
      while (steps < n && !straight[((j % n) + n) % n]) { len += cs[((j % n) + n) % n].length; j++; steps++; if (!k.closed && j >= n) break; }
      const nj = ((j % n) + n) % n;
      if (!steps || (!k.closed && j >= n) || nj === i && steps >= n - 1) continue;
      if (len >= 3 * unitsPerPx) continue;
      const t0 = cs[i].getTangentAtTime(1), t1 = cs[nj].getTangentAtTime(0);
      if (Math.abs(t0.getDirectedAngle(t1)) > 20) { rounded++; where.push(cs[(i + 1) % n].point1); }
    }
  }
  return { lines, curves, rounded, joints, where };
}

module.exports = { paper, parseXml, readSvg, rasterize, lineWeight, cornerStats, num };
