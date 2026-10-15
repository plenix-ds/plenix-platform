// Shared use_figma helpers for the Menus, Context menus, Edit menus, Toolbars and Notifications comparisons.
// Concatenated in front of each page script (CFG defined by the page part).
const hex = (h) => ({ r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 });
const load = async (name) => { const col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === name); const V = {}; for (const id of col.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); V[v.name] = v; } return { col, V }; };
const PL = await load('Plenix Light'), PD = await load('Plenix Dark');
const appleColors = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Colors');
for (const s of ['Regular', 'SemiBold', 'Bold', 'Medium']) await figma.loadFontAsync({ family: 'DM Sans', style: s });
const text = (s, size, style, color) => { const t = figma.createText(); t.fontName = { family: 'DM Sans', style }; t.fontSize = size; t.characters = s; t.fills = [{ type: 'SOLID', color: hex(color) }]; return t; };
const paint = (v) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const isGlyph = (t) => { const c = t.characters.codePointAt(0); return c >= 0xE000; };
const famStyle = (t) => { if (t.fontName === figma.mixed) return null; return t.fontName; };
const dmStyle = (fn) => { const s = (fn && fn.style || '').toLowerCase(); return /bold/.test(s) && !/semi/.test(s) ? 'Bold' : /semi|medium|heavy/.test(s) ? 'SemiBold' : 'Regular'; };
const radius = (n, v) => ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'].forEach(k => { try { n.setBoundVariable(k, v); } catch (e) {} });
const log = [];
// restyle every text in a node: DM Sans for words (weight kept), color from a function(textNode) -> variable
const retype = (root, colorFor, sizeFor) => {
  const texts = root.findAll(n => n.type === 'TEXT' && n.visible !== false);
  for (const t of texts) {
    try {
      const v = colorFor(t); if (v) t.fills = [paint(v)];
      if (isGlyph(t)) continue;
      const fn = famStyle(t); if (!fn || fn.family === 'DM Sans') continue;
      t.fontName = { family: 'DM Sans', style: dmStyle(fn) }; t.letterSpacing = { unit: 'PERCENT', value: 0 };
      const sz = sizeFor && sizeFor(t); if (sz) { t.setBoundVariable('fontSize', sz[0]); t.setBoundVariable('lineHeight', sz[1]); }
    } catch (e) { log.push('text ' + t.name + ': ' + e.message); }
  }
};
// replace a glass background: hide glass layers, give the root the Plenix surface, radius and border
const surface = (root, V, bg, rad, border) => {
  root.findAll(n => /Liquid Glass|Glass Effect|Fill \+ Shadow|^BG$|Background|Blur/.test(n.name)).forEach(n => { try { n.visible = false; } catch (e) {} });
  try { root.fills = bg ? [paint(V[bg])] : []; } catch (e) { log.push('fill ' + e.message); }
  if (rad) radius(root, V[rad]);
  if (border) { try { root.strokes = [paint(V[border])]; root.strokeAlign = 'INSIDE'; root.strokeWeight = 1; } catch (e) { log.push('stroke ' + e.message); } }
  try { root.clipsContent = true; } catch (e) {}
};
const findPlace = (page, names) => { let maxX = 0, minY = Infinity; for (const c of page.children) { if (names.includes(c.name)) continue; maxX = Math.max(maxX, c.x + c.width); minY = Math.min(minY, c.y); } return { maxX, minY }; };
// build the 4-row comparison; COLS = [{ name, light(): node, dark(): node, plenix(inst, V) }]
const buildCompare = (leaf, title, note, COLS, colW, x, y) => {
  const wrapper = figma.createAutoLayout('VERTICAL', { name: 'Plenix for iOS · ' + leaf, itemSpacing: 0 });
  wrapper.x = x; wrapper.y = y; wrapper.fills = [{ type: 'SOLID', color: hex('FFFFFF') }];
  const tWrap = figma.createAutoLayout('VERTICAL', { name: 'Title', paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 16, itemSpacing: 4 }); tWrap.fills = [];
  tWrap.appendChild(text(title, 20, 'SemiBold', '000000'));
  const n = text(note, 13, 'Regular', '56585E'); tWrap.appendChild(n);
  wrapper.appendChild(tWrap); n.layoutSizingHorizontal = 'FILL'; n.textAutoResize = 'HEIGHT';
  const ROWS = [['Apple default · Light', null, '404:0', 'FFFFFF', '000000', 'light'], ['Apple default · Dark', null, '404:1', '000000', 'FFFFFF', 'dark'], ['Plenix · Light', PL, '404:0', null, '000000', 'light'], ['Plenix · Dark', PD, '404:1', null, 'FFFFFF', 'dark']];
  const rowIds = {};
  for (const [label, P, appleMode, bg, ink, mode] of ROWS) {
    const row = figma.createAutoLayout('HORIZONTAL', { name: label, itemSpacing: 24, paddingLeft: 24, paddingRight: 24, paddingTop: 20, paddingBottom: 20, counterAxisAlignItems: 'MIN' });
    row.setExplicitVariableModeForCollection(appleColors, appleMode);
    row.fills = P ? [paint(P.V['plx-sys/surface-canvas'])] : [{ type: 'SOLID', color: hex(bg) }];
    const head = text(label, 13, 'SemiBold', ink); row.appendChild(head); head.resize(150, head.height); head.textAutoResize = 'HEIGHT';
    for (const col of COLS) {
      const cell = figma.createAutoLayout('VERTICAL', { name: col.name, itemSpacing: 8, counterAxisAlignItems: 'CENTER' }); cell.fills = [];
      const inst = col[mode]();
      if (P) { try { col.plenix(inst, P.V); } catch (e) { log.push(col.name + ' plenix: ' + e.message); } }
      cell.appendChild(inst); cell.appendChild(text(col.name, 11, 'Regular', ink));
      row.appendChild(cell); cell.resize(Math.max(colW, inst.width), cell.height); cell.layoutSizingHorizontal = 'FIXED';
    }
    wrapper.appendChild(row); row.layoutSizingHorizontal = 'FILL'; rowIds[label] = row.id;
  }
  return { wrapper, rowIds };
};
// the anatomy frame: one Plenix Light instance with red lettered markers; MARKS = [[letter, node, side]]
const buildAnatomy = (leaf, title, inst, marks, caption, x, y) => {
  const fr = figma.createFrame(); fr.name = 'Plenix for iOS · ' + leaf + ' · Anatomy'; fr.x = x; fr.y = y; fr.fills = [paint(PL.V['plx-sys/surface-canvas'])];
  const t = text(title, 20, 'SemiBold', '000000'); fr.appendChild(t); t.x = 24; t.y = 24;
  fr.appendChild(inst); inst.x = 200; inst.y = 90;
  const W = inst.width + 400, H = inst.height + 200; fr.resize(W, H);
  const red = hex('C10000');
  const abs = (n) => { const b = n.absoluteBoundingBox, f = fr.absoluteBoundingBox; return { x: b.x - f.x, y: b.y - f.y, w: b.width, h: b.height }; };
  marks.forEach(([letter, node, side], i) => {
    let b; try { b = abs(node); } catch (e) { log.push('mark ' + letter + ': ' + e.message); return; }
    const ty = b.y + b.h / 2; const left = side !== 'right';
    const tx = left ? b.x + Math.min(12, b.w / 2) : b.x + b.w - Math.min(12, b.w / 2);
    const dx = left ? 200 - 120 : inst.x + inst.width + 80;
    const line = figma.createLine(); fr.appendChild(line); line.strokes = [{ type: 'SOLID', color: red }]; line.strokeWeight = 1;
    line.x = Math.min(dx + 12, tx); line.y = ty; line.resize(Math.max(1, Math.abs(tx - (dx + 12))), 0);
    const dot = figma.createEllipse(); fr.appendChild(dot); dot.resize(24, 24); dot.x = dx - 12 + (left ? 0 : 12); dot.y = ty - 12; dot.fills = [{ type: 'SOLID', color: red }];
    const l = text(letter, 12, 'SemiBold', 'FFFFFF'); fr.appendChild(l); l.textAlignHorizontal = 'CENTER'; l.resize(24, l.height); l.x = dot.x; l.y = ty - l.height / 2;
  });
  const c = text(caption, 13, 'Regular', '000000'); fr.appendChild(c); c.x = 24; c.y = H - 44;
  return fr;
};
// swap every glass layer for the Plenix surface on its parent
const glassSwap = (root, V, bg, rad, border) => {
  const glass = root.findAll(n => /Liquid Glass|Glass Effect/.test(n.name) && n.visible !== false);
  const parents = new Set();
  glass.forEach(g => { try { g.visible = false; } catch (e) {} if (g.parent) parents.add(g.parent); });
  for (const p of parents) { try { p.fills = [paint(V[bg])]; if (rad) radius(p, V[rad]); if (border) { p.strokes = [paint(V[border])]; p.strokeAlign = 'INSIDE'; p.strokeWeight = 1; } } catch (e) { log.push('glass parent ' + p.name + ': ' + e.message); } }
  return parents.size;
};
const sizeByRole = (V) => (t) => { const fs = t.fontSize === figma.mixed ? 17 : t.fontSize; const p = 'plx-platform/text-'; const r = fs >= 28 ? 'title' : fs >= 16 ? (dmStyle(famStyle(t)) === 'Regular' ? 'body' : 'heading') : fs >= 14 ? 'label' : fs >= 13 ? 'secondary' : 'caption'; return [V[p + r + '-size'], V[p + r + '-line-height']]; };
