const PAGE = 'notifications';
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
// Context menus (507:25994), Toolbars (507:25993) and Notifications (507:24678). PAGE is set by a one-line prefix.
const dumpS = (n, d) => ({ n: n.name, t: n.type.slice(0, 3), wh: Math.round(n.width) + 'x' + Math.round(n.height), txt: n.type === 'TEXT' ? n.characters.slice(0, 16) : undefined, c: 'children' in n && d < 2 ? n.children.slice(0, 8).map(c => dumpS(c, d + 1)) : undefined });
const byId = async (id) => figma.getNodeByIdAsync(id);
const setFind = async (setId, re) => (await byId(setId)).children.find(c => re.test(c.name));
const blueNodes = (inst) => inst.findAll(n => n.type !== 'TEXT' && n.visible !== false && 'fills' in n && n.fills !== figma.mixed && n.fills.some(f => f.type === 'SOLID' && f.visible !== false && f.color.b > 0.6 && f.color.r < 0.4));
const res = { log };
const run = async (leaf, pageId, title, note, COLS, colW, anat) => {
  const page = await byId(pageId); await figma.setCurrentPageAsync(page);
  const MINE = ['Plenix for iOS · ' + leaf, 'Plenix for iOS · ' + leaf + ' · Anatomy'];
  for (const old of page.children.filter(n => MINE.includes(n.name))) old.remove();
  const { maxX, minY } = findPlace(page, MINE);
  const c = buildCompare(leaf, title, note, COLS, colW, maxX + 400, minY);
  const a = await anat(c.wrapper.x, c.wrapper.y + c.wrapper.height + 200);
  res[leaf] = { compare: c.wrapper.id, anatomy: a.id, size: [Math.round(c.wrapper.width), Math.round(c.wrapper.height)] };
};
if (PAGE === 'context') {
  const v = async (re) => setFind('125:58750', re);
  const vert = await v(/Alignment=Vertical, Side=Leading/), hor = await v(/Alignment=Horizontal.*Side=Leading/);
  const plenixCM = (inst, V) => {
    const n = glassSwap(inst, V, 'plx-sys/surface-overlay', 'plx-radius/radius-menu8px', 'plx-sys/border-default'); if (!n) log.push('context: no glass');
    inst.findAll(n => n.type === 'INSTANCE' && /Item/.test(n.name)).forEach(it => { try { it.setBoundVariable('minHeight', V['plx-sys/control-height-standard']); } catch (e) {} });
    inst.findAll(n => n.name === 'Separator' && n.type !== 'INSTANCE').forEach(s => { try { s.fills = [paint(V['plx-sys/border-divider'])]; } catch (e) {} });
    retype(inst, (t) => /Delete|Destruct|Desctruct/i.test(t.characters) || (t.parent && /Destructive/.test(t.parent.name)) ? V['plx-sys/feedback-danger-content'] : V['plx-sys/content-default'], sizeByRole(V));
  };
  await run('Context menus', '507:25994', 'Context menus on iOS: Apple default and Plenix',
    'The system draws the context menu, its preview lift and the dimming, so a Plenix app keeps Apple’s menu and sets its commands, groups and roles. The Plenix rows show the same kit component with the Plenix menu variables (overlay surface, 8 pt radius, 1 pt border, 44 pt rows, DM Sans) for comparison and for menus Plenix draws itself.',
    [{ name: 'Context menu', light: () => vert.createInstance(), dark: () => vert.createInstance(), plenix: plenixCM },
     { name: 'Horizontal (iPad pointer)', light: () => hor.createInstance(), dark: () => hor.createInstance(), plenix: plenixCM }], 260,
    async (x, y) => {
      const i = vert.createInstance(); plenixCM(i, PL.V);
      const texts = i.findAll(n => n.type === 'TEXT' && n.visible !== false); const words = texts.filter(t => !isGlyph(t));
      const prev = i.findOne(n => /Preview|Image|Content|Photo/i.test(n.name) && n.visible !== false && n.type !== 'TEXT');
      const sep = i.findOne(n => /Separator/.test(n.name)); const dz = words.find(t => /Delete|Destruct|Desctruct/i.test(t.characters)) || words[words.length - 1];
      const menuBox = i.findAll(n => /Liquid Glass|Glass Effect/.test(n.name)).map(g => g.parent).find(Boolean) || i;
      res.contextDump = dumpS(vert, 0);
      return buildAnatomy('Context menus', 'Plenix context menu on iOS: anatomy', i,
        [['A', prev || i, 'left'], ['B', menuBox, 'right'], ['C', words[0] || i, 'left'], ['D', sep || i, 'right'], ['E', dz || i, 'right']],
        'A Preview   B Menu container   C Item   D Group separator   E Destructive item   (F Dimming overlay: drawn by the system behind both)', x, y);
    });
}
if (PAGE === 'toolbars') {
  const top = await setFind('1:54472', /Style=Default/), large = await setFind('1:54472', /Style=Large Title/);
  const bot = await setFind('4:55732', /Type=Buttons$/), search = await setFind('4:55732', /Type=Search$/);
  const plenixTB = (inst, V) => {
    blueNodes(inst).forEach(n => { try { n.fills = [paint(V['plx-sys/action-primary-background'])]; } catch (e) {} });
    retype(inst, (t) => { const p = t.parent; const onBlue = p && 'fills' in p && p.fills !== figma.mixed && p.fills.some(f => f.boundVariables && f.boundVariables.color && f.boundVariables.color.id === V['plx-sys/action-primary-background'].id); return onBlue ? V['plx-sys/action-primary-content'] : V['plx-sys/content-default']; }, sizeByRole(V));
  };
  const col = (name, comp) => ({ name, light: () => comp.createInstance(), dark: () => comp.createInstance(), plenix: plenixTB });
  await run('Toolbars', '507:25993', 'Toolbars on iOS: Apple default and Plenix',
    'Each column is one Plenix toolbar variant. Plenix keeps the system bar, its glass, standard radii and Back and Close symbols, and changes the type and item colors: DM Sans titles at the heading and title roles, items in the Plenix content color instead of the tint, and the one primary action in the Plenix primary color.',
    [col('Top bar', top), col('Large title', large), col('Bottom toolbar', bot), col('Bottom with search', search)], 402,
    async (x, y) => {
      const i = top.createInstance(); plenixTB(i, PL.V);
      const texts = i.findAll(n => n.type === 'TEXT' && n.visible !== false); const words = texts.filter(t => !isGlyph(t)); const glyphs = texts.filter(isGlyph);
      const title = words.sort((a, b) => (b.fontSize || 0) - (a.fontSize || 0))[0];
      const groups = i.findAll(n => /Liquid Glass|Glass Effect/.test(n.name)).map(g => g.parent);
      const prim = blueNodes(i)[0];
      res.toolbarDump = dumpS(top, 0);
      return buildAnatomy('Toolbars', 'Plenix toolbar on iOS: anatomy', i,
        [['A', i, 'left'], ['B', glyphs[0] || i, 'left'], ['C', title || i, 'right'], ['D', groups[groups.length - 1] || i, 'right'], ['E', prim || groups[groups.length - 1] || i, 'right']],
        'A Bar   B Leading item (Back)   C Title   D Item group   E Primary action', x, y);
    });
}
if (PAGE === 'notifications') {
  const one = await setFind('135:67787', /Stack=1/), three = await setFind('135:67787', /Stack=3/), exp = await byId('143:62847');
  const plenixN = (inst, V) => {
    const n = glassSwap(inst, V, 'plx-sys/toast-background', 'plx-radius/radius-surface4px', null); if (!n) log.push('notification: no glass');
    retype(inst, () => V['plx-sys/toast-content'], sizeByRole(V));
  };
  const col = (name, make, plenix) => ({ name, light: make, dark: make, plenix });
  await run('Notifications', '507:24678', 'Notifications on iOS: Apple default and Plenix',
    'The system draws every notification (banner, stack, expanded), so a Plenix app keeps Apple’s look and sets the title, body, actions and thread. The Plenix rows show what Plenix draws itself: the in-app banner shown while the app is in front, the Plenix toast (toast surface, 4 pt radius, DM Sans in the toast content color), on the same kit shapes. The tone edge and close button of the toast are in its code.',
    [col('Banner', () => one.createInstance(), plenixN), col('Stacked', () => three.createInstance(), plenixN), col('Expanded with actions', () => exp.createInstance(), plenixN)], 402,
    async (x, y) => {
      const i = one.createInstance(); plenixN(i, PL.V);
      const words = i.findAll(n => n.type === 'TEXT' && n.visible !== false && !isGlyph(n));
      const bold = words.find(t => famStyle(t) && famStyle(t).style !== 'Regular') || words[0];
      const body = words.find(t => t !== bold && t.characters.length > 12) || words[1];
      const time = words.find(t => /ago|now|AM|PM|\d:\d|m$/.test(t.characters) && t !== bold && t !== body);
      const icon = i.findOne(n => /Icon|App/i.test(n.name) && n.type !== 'TEXT');
      const box = i.findAll(n => /Liquid Glass|Glass Effect/.test(n.name)).map(g => g.parent).find(Boolean) || i;
      res.notifDump = dumpS(one, 0);
      return buildAnatomy('Notifications', 'Plenix in-app banner on iOS: anatomy', i,
        [['A', box, 'left'], ['B', icon || i, 'left'], ['C', bold || i, 'right'], ['D', body || i, 'right'], ['E', time || i, 'right']],
        'A Container   B App icon   C Title   D Body   E Time   (F Actions: in the expanded notification)', x, y);
    });
}
return res;
