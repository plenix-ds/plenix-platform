// Builds "Plenix for iOS · <Leaf>" and "· Anatomy" frames for Alerts, Action sheets, Sheets, Popovers, Activity views.
// Each page in its own try/catch so one failure does not roll back the others.
const hex = (h) => ({ r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 });
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const load = async (name) => { const col = cols.find(c => c.name === name); const V = {}; for (const id of col.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); V[v.name] = v; } return { col, V }; };
const PL = await load('Plenix Light'), PD = await load('Plenix Dark');
const appleColors = cols.find(c => c.name === 'Colors');
await figma.loadFontAsync({ family: 'DM Sans', style: 'SemiBold' }); await figma.loadFontAsync({ family: 'DM Sans', style: 'Regular' });
const fv = (V, ...keys) => { for (const k of keys) { if (V[k]) return V[k]; const m = Object.keys(V).find(n => n.endsWith(k)); if (m) return V[m]; } return null; };
const paint = (v) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const fillVar = (n, v) => { if (v) n.fills = [paint(v)]; };
const bind = (n, field, v, raw) => { try { if (v) n.setBoundVariable(field, v); else if (raw !== undefined) n[field] = raw; } catch (e) {} };
const radius = (n, v, raw) => ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'].forEach(k => bind(n, k, v, raw));
const text = (s, size, style, color) => { const t = figma.createText(); t.fontName = { family: 'DM Sans', style }; t.fontSize = size; t.characters = s; t.fills = [{ type: 'SOLID', color: hex(color) }]; return t; };
const log = [];
// restyle every kit text inside n: DM Sans, Plenix color
const restyleText = (n, V, colorFor) => {
  for (const t of n.findAll(x => x.type === 'TEXT')) {
    try {
      const bold = /semi|bold|medium/i.test(t.fontName === figma.mixed ? '' : t.fontName.style);
      t.fontName = { family: 'DM Sans', style: bold ? 'SemiBold' : 'Regular' }; t.letterSpacing = { unit: 'PERCENT', value: 0 };
      const c = colorFor ? colorFor(t, bold) : fv(V, 'plx-sys/content-default'); if (c) t.fills = [paint(c)];
    } catch (e) { log.push('text ' + t.name + ': ' + e.message); }
  }
};
// hide Apple's glass background instances ("BG", "Material", "Fill + Shadow", "Glass Effect")
const killGlass = (n) => { for (const g of n.findAll(x => /^(BG|Material|Glass Effect|Fill \+ Shadow)$/.test(x.name))) { try { g.visible = false; } catch (e) {} } };
const surface = (n, V, rVar) => {
  killGlass(n); fillVar(n, fv(V, 'plx-sys/surface-overlay'));
  n.strokes = [paint(fv(V, 'plx-sys/border-default'))]; n.strokeAlign = 'INSIDE'; n.strokeWeight = 1;
  radius(n, rVar, 8); n.effects = []; n.clipsContent = true;
};
const plxButton = (b, V, kind) => {
  try {
    const bg = { primary: 'plx-sys/action-primary-background', secondary: 'plx-sys/control-background', danger: 'plx-sys/action-danger-background' }[kind];
    const fg = { primary: 'plx-sys/action-primary-content', secondary: 'plx-sys/content-default', danger: 'plx-sys/action-danger-content' }[kind];
    killGlass(b); b.fills = [paint(fv(V, bg))]; b.effects = [];
    if (kind === 'secondary') { b.strokes = [paint(fv(V, 'plx-sys/control-border'))]; b.strokeAlign = 'INSIDE'; b.strokeWeight = 1; } else b.strokes = [];
    radius(b, fv(V, 'plx-comp/button-radius'), 6);
    if (b.layoutMode && b.layoutMode !== 'NONE') { b.paddingTop = 0; b.paddingBottom = 0; bind(b, 'minHeight', fv(V, 'plx-sys/control-height-standard'), 44); bind(b, 'height', null); }
    for (const t of b.findAll(x => x.type === 'TEXT')) { t.fontName = { family: 'DM Sans', style: 'SemiBold' }; t.letterSpacing = { unit: 'PERCENT', value: 0 }; t.fills = [paint(fv(V, fg))]; bind(t, 'fontSize', fv(V, 'plx-ios/text-label-size'), 15); bind(t, 'lineHeight', fv(V, 'plx-ios/text-label-line-height')); }
    for (const v of b.findAll(x => x.type === 'VECTOR' || x.type === 'BOOLEAN_OPERATION')) { try { v.fills = [paint(fv(V, fg))]; } catch (e) {} }
  } catch (e) { log.push('button: ' + e.message); }
};
const setProp = (inst, re, val) => { try { const k = Object.keys(inst.componentProperties).find(p => re.test(p)); if (k) inst.setProperties({ [k]: val }); } catch (e) { log.push('prop ' + re + ': ' + e.message); } };

const build = async (cfg) => {
  const page = await figma.getNodeByIdAsync(cfg.page); await figma.setCurrentPageAsync(page);
  const W = 'Plenix for iOS · ' + cfg.leaf, A = W + ' · Anatomy';
  for (const old of page.children.filter(n => n.name === W || n.name === A)) old.remove();
  let maxX = 0, minY = Infinity; for (const c of page.children) { maxX = Math.max(maxX, c.x + c.width); minY = Math.min(minY, c.y); }
  const wrapper = figma.createAutoLayout('VERTICAL', { name: W, itemSpacing: 0 });
  wrapper.x = maxX + 400; wrapper.y = minY; wrapper.fills = [{ type: 'SOLID', color: hex('FFFFFF') }];
  const tWrap = figma.createAutoLayout('VERTICAL', { name: 'Title', paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 16, itemSpacing: 4 }); tWrap.fills = [];
  tWrap.appendChild(text(cfg.leaf + ' on iOS: Apple default and Plenix', 20, 'SemiBold', '000000'));
  tWrap.appendChild(text(cfg.note, 13, 'Regular', '56585E'));
  wrapper.appendChild(tWrap);
  const ROWS = [['Apple default · Light', null, '404:0', 'F2F2F7', '000000', 'Light'], ['Apple default · Dark', null, '404:1', '000000', 'FFFFFF', 'Dark'], ['Plenix · Light', PL, '404:0', null, '000000', 'Light'], ['Plenix · Dark', PD, '404:1', null, 'FFFFFF', 'Dark']];
  for (const [label, P, mode, bg, ink, md] of ROWS) {
    const row = figma.createAutoLayout('HORIZONTAL', { name: label, itemSpacing: 32, paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24, counterAxisAlignItems: 'CENTER' });
    row.setExplicitVariableModeForCollection(appleColors, mode);
    row.fills = P ? [paint(P.V['plx-sys/surface-canvas'])] : [{ type: 'SOLID', color: hex(bg) }];
    const head = text(label, 13, 'SemiBold', ink); row.appendChild(head); head.resize(150, head.height); head.textAutoResize = 'HEIGHT';
    for (const v of cfg.variants) {
      const cell = figma.createAutoLayout('VERTICAL', { name: v.name, itemSpacing: 8, counterAxisAlignItems: 'CENTER' }); cell.fills = [];
      const inst = v.make(md);
      if (P) { try { cfg.style(inst, P.V, v); } catch (e) { log.push(cfg.leaf + ' style ' + v.name + ': ' + e.message); } }
      cell.appendChild(inst); cell.appendChild(text(v.name, 11, 'Regular', ink));
      row.appendChild(cell);
    }
    wrapper.appendChild(row); row.layoutSizingHorizontal = 'FILL';
  }
  // anatomy
  const an = figma.createFrame(); an.name = A; an.fills = [{ type: 'SOLID', color: hex('FFFFFF') }];
  page.appendChild(an); an.x = wrapper.x; an.y = wrapper.y + wrapper.height + 120;
  const at = text(cfg.leaf + ' on iOS: anatomy (Plenix, light)', 20, 'SemiBold', '000000'); an.appendChild(at); at.x = 24; at.y = 24;
  const holder = figma.createFrame(); holder.name = 'Plenix · Light'; holder.fills = [paint(PL.V['plx-sys/surface-canvas'])]; holder.setExplicitVariableModeForCollection(appleColors, '404:0');
  an.appendChild(holder);
  const av = cfg.variants[cfg.anatomyVariant || 0]; const ai = av.make('Light'); cfg.style(ai, PL.V, av); holder.appendChild(ai);
  ai.x = 160; ai.y = 40; holder.resize(ai.width + 320, ai.height + 80); holder.x = 24; holder.y = 72;
  const red = hex('C10000');
  cfg.parts.forEach(([letter, find, side], i) => {
    let node = null; try { node = find(ai); } catch (e) {}
    if (!node) { log.push(cfg.leaf + ' anatomy part ' + letter + ' not found'); return; }
    const b = node.absoluteBoundingBox, hb = holder.absoluteBoundingBox;
    const tx = b.x - hb.x + (side === 'L' ? 0 : b.width), ty = b.y - hb.y + b.height / 2;
    const mx = side === 'L' ? 40 : holder.width - 40;
    const line = figma.createLine(); holder.appendChild(line); line.strokes = [{ type: 'SOLID', color: red }]; line.strokeWeight = 1;
    const x1 = Math.min(mx, tx), len = Math.abs(tx - mx); line.x = x1; line.y = ty; line.resize(Math.max(len, 0.01), 0);
    const dot = figma.createEllipse(); holder.appendChild(dot); dot.resize(24, 24); dot.x = mx - 12; dot.y = ty - 12; dot.fills = [{ type: 'SOLID', color: red }];
    const l = text(letter, 12, 'SemiBold', 'FFFFFF'); holder.appendChild(l); l.textAlignHorizontal = 'CENTER'; l.resize(24, l.height); l.x = mx - 12; l.y = ty - l.height / 2;
  });
  const cap = text(cfg.parts.map(p => p[0] + '  ' + p[3]).join('     '), 13, 'Regular', '000000'); an.appendChild(cap); cap.x = 24; cap.y = holder.y + holder.height + 16;
  an.resize(Math.max(holder.width + 48, cap.width + 48, at.width + 48), cap.y + cap.height + 24);
  return { compare: wrapper.id, anatomy: an.id };
};

const out = {};
const pages = [];
// ---------- Alerts ----------
{
  const set = await figma.getNodeByIdAsync('63:57121');
  const v = (layout) => set.children.find(c => c.name === 'Button Layout=' + layout);
  const mk = (layout, field, destr) => () => { const i = v(layout).createInstance(); setProp(i, /^Show Text Field/, field); return i; };
  const style = (inst, V, vv) => {
    surface(inst, V, fv(V, 'plx-sys/radius-dialog-8px', 'radius-dialog-8px'));
    inst.paddingTop = inst.paddingBottom = inst.paddingLeft = inst.paddingRight = 16;
    restyleText(inst, V, (t, bold) => bold ? fv(V, 'plx-sys/content-default') : fv(V, 'plx-sys/content-muted'));
    const btns = inst.findAll(x => x.type === 'INSTANCE' && /^(Button|Action)/.test(x.name) && x.parent && /Buttons|Actions/.test(x.parent.name));
    const box = btns[0] && btns[0].parent; if (box && box.layoutMode) bind(box, 'itemSpacing', null, 12);
    const stacked = /Stacked/.test(vv.name);
    btns.forEach((b, i) => plxButton(b, V, (stacked ? i === 0 : i === btns.length - 1) ? (vv.destr ? 'danger' : 'primary') : 'secondary'));
    for (const f of inst.findAll(x => x.name === '_Background')) { try { f.fills = [paint(fv(V, 'plx-sys/control-background'))]; f.strokes = [paint(fv(V, 'plx-sys/control-border'))]; f.strokeWeight = 1; radius(f, fv(V, 'plx-comp/button-radius'), 6); } catch (e) {} }
  };
  pages.push({ key: 'alerts', page: '507:24668', leaf: 'Alerts', note: 'Each column is one Plenix alert variant. The Apple rows are the kit Alert as Apple ships it; the Plenix rows are the same component drawn with the Plenix dialog tokens (overlay surface, 8 pt dialog radius, DM Sans, Plenix buttons 44 pt with a 12 pt gap).',
    variants: [{ name: 'Confirmation', make: mk('Side-by-Side', false) }, { name: 'Destructive confirmation', destr: true, make: mk('Side-by-Side', false) }, { name: 'Prompt', make: mk('Side-by-Side', true) }, { name: 'Stacked actions', make: mk('Stacked', false) }],
    style, parts: [['A', n => n, 'L', 'Container'], ['B', n => n.findAll(x => x.type === 'TEXT')[0], 'R', 'Title'], ['C', n => n.findAll(x => x.type === 'TEXT')[1], 'L', 'Message'], ['E', n => n.findOne(x => x.name === 'Buttons'), 'R', 'Actions']] });
}
// ---------- Action sheets ----------
{
  const comp = await figma.getNodeByIdAsync('5446:10266');
  const mk = (msg) => () => { const i = comp.createInstance(); setProp(i, /^Show message/, msg); return i; };
  const style = (inst, V, vv) => {
    surface(inst, V, fv(V, 'plx-sys/radius-menu-8px', 'radius-menu-8px'));
    inst.paddingTop = inst.paddingBottom = inst.paddingLeft = inst.paddingRight = 8;
    restyleText(inst, V, () => fv(V, 'plx-sys/content-muted'));
    const acts = inst.findAll(x => x.type === 'INSTANCE' && x.name === 'Action');
    const slot = acts[0] && acts[0].parent; if (slot) bind(slot, 'itemSpacing', null, 0);
    acts.forEach((a, i) => {
      killGlass(a); a.fills = []; a.effects = []; radius(a, null, 0);
      a.strokes = [paint(fv(V, 'plx-sys/border-divider'))]; a.strokeAlign = 'INSIDE'; a.strokeTopWeight = i === 0 ? 1 : 0; a.strokeBottomWeight = 0; a.strokeLeftWeight = 0; a.strokeRightWeight = 0; a.strokeTopWeight = 1;
      if (a.layoutMode && a.layoutMode !== 'NONE') { a.paddingTop = 0; a.paddingBottom = 0; bind(a, 'minHeight', fv(V, 'plx-sys/control-height-standard'), 44); }
      for (const t of a.findAll(x => x.type === 'TEXT')) { t.fontName = { family: 'DM Sans', style: 'Regular' }; t.letterSpacing = { unit: 'PERCENT', value: 0 }; t.fills = [paint(fv(V, vv.destr && i === 0 ? 'plx-sys/feedback-danger-content' : 'plx-sys/content-default'))]; bind(t, 'fontSize', fv(V, 'plx-ios/text-body-size'), 17); }
    });
    if (vv.destr && acts[0]) { for (const t of acts[0].findAll(x => x.type === 'TEXT')) { try { t.characters = 'Discard'; } catch (e) {} } }
  };
  pages.push({ key: 'action-sheets', page: '507:24669', leaf: 'Action sheets', note: 'Each column is one Plenix action sheet variant. The Apple rows are the kit Action Sheet; the Plenix rows are the same component drawn with the Plenix menu tokens (overlay surface, 8 pt menu radius, 44 pt rows with hairline dividers, DM Sans, the danger color for a destructive choice).',
    variants: [{ name: 'Choices', make: mk(false) }, { name: 'With title and message', make: mk(true) }, { name: 'Destructive choice', destr: true, make: mk(false) }],
    style, anatomyVariant: 1, parts: [['A', n => n, 'L', 'Container'], ['B', n => n.findAll(x => x.type === 'TEXT')[0], 'R', 'Title'], ['C', n => n.findAll(x => x.type === 'TEXT')[1], 'L', 'Message'], ['D', n => n.findAll(x => x.name === 'Action')[0], 'R', 'Action'], ['E', n => { const a = n.findAll(x => x.name === 'Action'); return a[a.length - 1]; }, 'L', 'Cancel']] });
}
// ---------- Sheets ----------
{
  const set = await figma.getNodeByIdAsync('10525:1632');
  const mk = (d) => () => set.children.find(c => c.name === 'Detent=' + d).createInstance();
  const style = (inst, V) => {
    const sheet = inst.findOne(x => x.name === 'Sheet'); const bgI = sheet && sheet.findOne(x => x.name === 'BG');
    if (bgI) bgI.visible = false;
    if (sheet) { fillVar(sheet, fv(V, 'plx-sys/surface-overlay')); const r = fv(V, 'plx-sys/radius-dialog-8px', 'radius-dialog-8px'); bind(sheet, 'topLeftRadius', r, 8); bind(sheet, 'topRightRadius', r, 8); sheet.clipsContent = true; }
    const ov = inst.findOne(x => x.name === 'Overlay'); if (ov) { try { ov.fills = [Object.assign(paint(fv(V, 'plx-sys/scrim')), { opacity: 0.5 })]; } catch (e) {} }
    const gr = inst.findOne(x => x.type === 'INSTANCE' && x.name === 'Grabber' && x.width < 100); if (gr) { try { gr.fills = [paint(fv(V, 'plx-sys/border-strong'))]; } catch (e) {} }
    restyleText(inst, V);
    for (const b of inst.findAll(x => x.type === 'INSTANCE' && /button/i.test(x.name) && x.width <= 120 && x.height <= 60)) { try { killGlass(b); b.effects = []; } catch (e) {} }
  };
  pages.push({ key: 'sheets', page: '507:24684', leaf: 'Sheets', note: 'Each column is one Plenix sheet detent. The Apple rows are the kit iPhone sheet; the Plenix rows are the same component with the Plenix overlay surface, 8 pt top radius, Plenix grabber and scrim, and DM Sans.',
    variants: [{ name: 'Medium', make: mk('Medium') }, { name: 'Large', make: mk('Large') }, { name: 'Stacked', make: mk('Large (Stacked)') }],
    style, parts: [['A', n => n.findOne(x => x.name === 'Sheet'), 'L', 'Container'], ['B', n => n.findOne(x => x.name === 'Grabber' && x.type === 'FRAME'), 'R', 'Grabber'], ['C', n => n.findOne(x => /^Toolbar/.test(x.name)), 'L', 'Top bar'], ['D', n => n.findOne(x => x.name === 'Content'), 'R', 'Content'], ['E', n => n.findOne(x => x.name === 'Overlay'), 'L', 'Dimming']] });
}
// ---------- Popovers ----------
{
  const set = await figma.getNodeByIdAsync('61:65421');
  const mk = (e) => () => set.children.find(c => c.name === 'Edge=' + e).createInstance();
  const style = (inst, V) => {
    inst.effects = [];
    for (const m of inst.findAll(x => x.name === 'Material')) { try { m.visible = false; } catch (e) {} }
    const bg = inst.findOne(x => x.name === 'Background'); if (bg) { fillVar(bg, fv(V, 'plx-sys/surface-overlay')); bg.strokes = [paint(fv(V, 'plx-sys/border-default'))]; bg.strokeWeight = 1; bg.strokeAlign = 'INSIDE'; radius(bg, fv(V, 'plx-sys/radius-surface-8px', 'radius-surface-8px'), 8); }
    const ar = inst.findOne(x => x.name === 'Arrow'); if (ar) { try { ar.fills = [paint(fv(V, 'plx-sys/surface-overlay'))]; ar.effects = []; } catch (e) {} }
  };
  pages.push({ key: 'popovers', page: '507:24681', leaf: 'Popovers', note: 'Each column is one arrow edge. The Apple rows are the kit iPad popover; the Plenix rows are the same component with the Plenix overlay surface, a 1 pt border and the 8 pt surface radius.',
    variants: [{ name: 'Arrow top', make: mk('Top (Center)') }, { name: 'Arrow bottom', make: mk('Bottom (Center)') }, { name: 'Arrow leading', make: mk('Leading (Middle)') }, { name: 'Arrow trailing', make: mk('Trailing (Middle)') }],
    style, parts: [['A', n => n.findOne(x => x.name === 'Background'), 'L', 'Container'], ['B', n => n.findOne(x => x.name === 'Arrow'), 'R', 'Arrow'], ['C', n => n.findOne(x => x.name === 'Background'), 'R', 'Content']] });
}
// ---------- Activity views ----------
{
  const ph = await figma.getNodeByIdAsync('5908:2105'), pad = await figma.getNodeByIdAsync('5908:1783');
  const mk = (set) => (md) => set.children.find(c => c.name === 'Mode=' + md).createInstance();
  const style = () => {};   // a system surface: not restyled
  pages.push({ key: 'activity-views', page: '507:24670', leaf: 'Activity views', note: 'The activity view is a system surface that iOS draws the same in every app, so the Plenix rows match the Apple rows inside the sheet; Plenix styles the Share button that opens it and supplies the items, exclusions and custom activities.',
    variants: [{ name: 'iPhone', make: mk(ph) }, { name: 'iPad', make: mk(pad) }],
    style, parts: [['B', n => n.findOne(x => x.name === '_Header'), 'L', 'Header'], ['C', n => n.findOne(x => x.name === 'Contacts Row'), 'R', 'People and apps'], ['D', n => n.findOne(x => x.name === 'Actions (List)'), 'L', 'Actions']] });
}
const only = typeof ONLY !== 'undefined' ? ONLY : null;
for (const cfg of pages) {
  if (only && !only.includes(cfg.key)) continue;
  try { out[cfg.key] = await build(cfg); } catch (e) { out[cfg.key] = 'ERROR ' + e.message; }
}
return { out, log: log.slice(0, 40) };
