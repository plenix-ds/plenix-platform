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
// Menus kit page (507:24676): "Plenix for iOS · Menus" and "Plenix for iOS · Edit menus", each with its anatomy.
const page = await figma.getNodeByIdAsync('507:24676');
await figma.setCurrentPageAsync(page);
const MINE = ['Plenix for iOS · Menus', 'Plenix for iOS · Menus · Anatomy', 'Plenix for iOS · Edit menus', 'Plenix for iOS · Edit menus · Anatomy'];
for (const old of page.children.filter(n => MINE.includes(n.name))) old.remove();
const { maxX, minY } = findPlace(page, MINE);
const byId = async (id) => figma.getNodeByIdAsync(id);
const setFind = async (setId, re) => (await byId(setId)).children.find(c => re.test(c.name));
const C = {
  itemL: await byId('5714:7389'), itemD: await byId('5854:8792'),
  selL: await byId('5714:7339'), selD: await byId('5854:8781'),
  dangerL: await byId('5714:7375'), dangerD: await byId('5854:8786'),
  disL: await byId('5714:7382'), disD: await byId('5854:8789'),
  subL: await setFind('5848:33925', /Mode=Light, State=Default, Open=False, Menu has Selection=False/),
  subD: await setFind('5848:33925', /Mode=Dark, State=Default, Open=False, Menu has Selection=False/),
  secL: await setFind('5855:4981', /Mode=Light/), secD: await setFind('5855:4981', /Mode=Dark/),
  menuL: await byId('492:52296'),
  edit: await byId('5713:47505'), sel: await byId('5711:35414'),
};
const setProp = (inst, prefix, val) => { try { const k = Object.keys(inst.componentProperties).find(k => k.startsWith(prefix)); if (k) inst.setProperties({ [k]: val }); else log.push('no prop ' + prefix + ' on ' + inst.name); } catch (e) { log.push('prop ' + prefix + ': ' + e.message); } };
const bodySize = (V) => () => [V['plx-platform/text-body-size'], V['plx-platform/text-body-line-height']];
const plenixItem = (color) => (inst, V) => {
  try { inst.setBoundVariable('minHeight', V['plx-sys/control-height-standard']); } catch (e) { log.push('minH ' + e.message); }
  try { inst.setBoundVariable('paddingLeft', V['plx-space/space-inset-sm']); inst.setBoundVariable('paddingRight', V['plx-space/space-inset-sm']); } catch (e) { log.push('pad ' + e.message); }
  try { const lead = inst.findOne(n => n.name === 'Leading'); if (lead) lead.setBoundVariable('itemSpacing', V['plx-space/space-inline-sm']); } catch (e) {}
  retype(inst, () => V[color], bodySize(V));
};
const COLS = [
  { name: 'Item', light: () => C.itemL.createInstance(), dark: () => C.itemD.createInstance(), plenix: plenixItem('plx-sys/content-default') },
  { name: 'Checked item', light: () => { const i = C.selL.createInstance(); setProp(i, 'Show Checkmark', true); return i; }, dark: () => { const i = C.selD.createInstance(); setProp(i, 'Show Checkmark', true); return i; }, plenix: plenixItem('plx-sys/content-default') },
  { name: 'Danger item', light: () => C.dangerL.createInstance(), dark: () => C.dangerD.createInstance(), plenix: plenixItem('plx-sys/feedback-danger-content') },
  { name: 'Disabled item', light: () => C.disL.createInstance(), dark: () => C.disD.createInstance(), plenix: plenixItem('plx-sys/content-disabled') },
  { name: 'Submenu', light: () => C.subL.createInstance(), dark: () => C.subD.createInstance(), plenix: plenixItem('plx-sys/content-default') },
  { name: 'Section title', light: () => C.secL.createInstance(), dark: () => C.secD.createInstance(), plenix: (inst, V) => { try { inst.setBoundVariable('paddingLeft', V['plx-space/space-inset-sm']); } catch (e) {} retype(inst, () => V['plx-sys/content-muted'], () => [V['plx-platform/text-eyebrow-size'], V['plx-platform/text-eyebrow-line-height']]); } },
];
const m = buildCompare('Menus', 'Menus on iOS: Apple default and Plenix',
  'Each column is one Plenix menu item variant. The Apple rows are the kit items as Apple ships them; the Plenix rows are the same items styled with the Plenix variables: 44 pt rows, 8 pt inline padding, DM Sans at the body role and the Plenix content, danger, disabled and muted colors. The system menu keeps Apple’s look; these rows apply where Plenix draws a menu itself.',
  COLS, 220, maxX + 400, minY);
// Menus anatomy: the whole kit menu, Plenix Light
const plenixMenu = (inst, V) => {
  surface(inst, V, 'plx-sys/surface-overlay', 'plx-radius/radius-menu8px', 'plx-sys/border-default');
  try { inst.setBoundVariable('paddingTop', V['plx-space/space-inset-xs']); inst.setBoundVariable('paddingBottom', V['plx-space/space-inset-xs']); } catch (e) {}
  inst.findAll(n => n.type === 'INSTANCE' && n.name === 'Item').forEach(it => plenixItem('plx-sys/content-default')(it, V));
  inst.findAll(n => n.type === 'INSTANCE' && n.name === 'Section Title').forEach(it => retype(it, () => V['plx-sys/content-muted'], () => [V['plx-platform/text-eyebrow-size'], V['plx-platform/text-eyebrow-line-height']]));
  inst.findAll(n => n.name === 'Separator' && n.type !== 'INSTANCE').forEach(s => { try { s.fills = [paint(V['plx-sys/border-divider'])]; } catch (e) {} });
  retype(inst.findOne(n => n.name === 'Control Group') || inst, (t) => /Desctructive|Destructive/.test(t.characters) ? V['plx-sys/feedback-danger-content'] : V['plx-sys/content-default'], () => [V['plx-platform/text-caption-size'], V['plx-platform/text-caption-line-height']]);
};
const mi = C.menuL.createInstance(); plenixMenu(mi, PL.V);
const firstItem = mi.findOne(n => n.type === 'INSTANCE' && n.name === 'Item');
const lbl = firstItem && firstItem.findOne(n => n.type === 'TEXT' && !isGlyph(n) && n.visible !== false);
const sym = firstItem && firstItem.findOne(n => n.type === 'TEXT' && isGlyph(n));
const sep = mi.findOne(n => n.type === 'INSTANCE' && n.name === 'Separator');
const sec = mi.findOne(n => n.type === 'INSTANCE' && n.name === 'Section Title');
const chev = mi.findAll(n => n.type === 'INSTANCE' && n.name === 'Item').map(i => i.findOne(n => n.type === 'TEXT' && n.name === '􀆊')).find(Boolean);
const ma = buildAnatomy('Menus', 'Plenix menu on iOS: anatomy', mi,
  [['A', mi, 'left'], ['B', lbl, 'right'], ['C', sym, 'left'], ['D', chev || firstItem, 'right'], ['E', sep, 'right'], ['F', sec, 'left']],
  'A Container   B Item label   C Symbol   D Submenu chevron (a checkmark sits in the same column)   E Separator   F Section title',
  m.wrapper.x, m.wrapper.y + m.wrapper.height + 200);
// Edit menus
const plenixEdit = (inst, V) => { surface(inst, V, 'plx-sys/surface-overlay', 'plx-radius/radius-menu8px', 'plx-sys/border-default'); retype(inst, () => V['plx-sys/content-default'], () => [V['plx-platform/text-label-size'], V['plx-platform/text-label-line-height']]); };
const selNodes = (inst) => inst.findAll(n => n.type !== 'TEXT' && 'fills' in n && n.fills !== figma.mixed && n.fills.some(f => f.type === 'SOLID' && f.visible !== false && f.color.b > 0.6 && f.color.r < 0.4));
const plenixSel = (inst, V) => { selNodes(inst).forEach(n => { try { const big = n.width > 30 && n.height > 10; n.fills = [paint(V[big ? 'plx-sys/state-selected' : 'plx-sys/action-primary-background'])]; } catch (e) {} }); retype(inst, () => V['plx-sys/content-default'], () => [V['plx-platform/text-body-size'], V['plx-platform/text-body-line-height']]); };
const ECOLS = [
  { name: 'Horizontal (touch)', light: () => C.edit.createInstance(), dark: () => C.edit.createInstance(), plenix: plenixEdit },
  { name: 'Text selection', light: () => C.sel.createInstance(), dark: () => C.sel.createInstance(), plenix: plenixSel },
];
const e = buildCompare('Edit menus', 'Edit menus on iOS: Apple default and Plenix',
  'The system draws the edit menu, so a Plenix app keeps Apple’s menu and sets only its commands and the selection tint. The Plenix rows show the same kit components with the Plenix variables, for comparison and for a Plenix-drawn selection bar. The vertical pointer layout has no kit component; the system draws it.',
  ECOLS, 240, m.wrapper.x + m.wrapper.width + 200, minY);
const stack = figma.createAutoLayout('VERTICAL', { name: 'Edit menu over a selection', itemSpacing: 12, counterAxisAlignItems: 'CENTER' }); stack.fills = [];
const ei = C.edit.createInstance(); plenixEdit(ei, PL.V); const si = C.sel.createInstance(); plenixSel(si, PL.V);
stack.appendChild(ei); stack.appendChild(si);
const eTexts = ei.findAll(n => n.type === 'TEXT' && n.visible !== false);
const eWords = eTexts.filter(t => !isGlyph(t)); const eGlyph = eTexts.filter(isGlyph);
const ea = buildAnatomy('Edit menus', 'Plenix edit menu on iOS: anatomy', stack,
  [['A', ei, 'left'], ['B', eWords[0] || ei, 'left'], ['C', eWords[eWords.length - 1] || ei, 'right'], ['D', eGlyph[eGlyph.length - 1] || ei, 'right'], ['E', si, 'left']],
  'A Container   B System command   C Custom command   D More arrow   E Selection',
  e.wrapper.x, e.wrapper.y + e.wrapper.height + 200);
const dumpS = (n, d) => ({ n: n.name, t: n.type.slice(0, 3), wh: Math.round(n.width) + 'x' + Math.round(n.height), txt: n.type === 'TEXT' ? n.characters.slice(0, 16) : undefined, c: 'children' in n && d < 3 ? n.children.slice(0, 8).map(c => dumpS(c, d + 1)) : undefined });
return { menus: { compare: m.wrapper.id, anatomy: ma.id, rows: m.rowIds, size: [m.wrapper.width, m.wrapper.height] }, edit: { compare: e.wrapper.id, anatomy: ea.id, size: [e.wrapper.width, e.wrapper.height] }, editWords: eWords.map(t => t.characters), sel: dumpS(C.sel, 0), editDump: dumpS(C.edit, 0), log };
