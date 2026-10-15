// The use_figma script that built the Buttons comparison (the model). Copy its shape for your component.
// Variables already exist in the collections "Plenix Light" and "Plenix Dark" (same names in both): plx-sys/<role> colors
// (e.g. plx-sys/action-primary-background, plx-sys/surface-canvas, plx-sys/content-default, plx-sys/control-border),
// plx-radius/*, plx-space/*, plx-platform/* (control-target-min 44, text-label-size 15, text-body-size 17 ...), plus
// plx-comp/button-* and plx-ios/text-label-*. NEVER create variables, collections or pages (the Starter plan forbids
// pages and allows one mode per collection). SF Pro is unavailable: never set characters on kit text; to restyle a kit
// label, set fontName to DM Sans first (loadFontAsync), then size/lineHeight/fills. A failed call rolls back everything.
const hex = (h) => ({ r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 });
const load = async (name) => { const col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === name); const V = {}; for (const id of col.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); V[v.name] = v; } return { col, V }; };
const PL = await load('Plenix Light'), PD = await load('Plenix Dark');
const page = await figma.getNodeByIdAsync('507:24673');          // the kit page of the component (figma-map.json pages[..].id)
await figma.setCurrentPageAsync(page);
for (const old of page.children.filter(n => n.name === 'Plenix for iOS')) old.remove();   // re-runnable
let maxX = 0, minY = Infinity; for (const c of page.children) { maxX = Math.max(maxX, c.x + c.width); minY = Math.min(minY, c.y); }
await figma.loadFontAsync({ family: 'DM Sans', style: 'SemiBold' }); await figma.loadFontAsync({ family: 'DM Sans', style: 'Regular' });
const set = await figma.getNodeByIdAsync('40:58696');             // the kit component set
const appleColors = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Colors');   // Apple's own: modes Light 404:0, Dark 404:1
const VARS = [['Primary', 'Bordered - Prominent', 'False'], ['Secondary', 'Bordered', 'False'], ['Ghost', 'Borderless', 'False'], ['Danger', 'Bordered - Prominent', 'True'], ['Danger secondary', 'Bordered', 'True']];
const variant = (style, destr) => set.children.find(c => c.name === 'Size=Medium, Style=' + style + ', Label Style=Title only, Is Enabled=True, Destructive=' + destr);
const text = (s, size, style, color) => { const t = figma.createText(); t.fontName = { family: 'DM Sans', style }; t.fontSize = size; t.characters = s; t.fills = [{ type: 'SOLID', color: hex(color) }]; return t; };
const paint = (v) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const plenixStyle = (inst, name, V) => {
  const bg = { Primary: 'plx-sys/action-primary-background', Secondary: 'plx-sys/control-background', Danger: 'plx-sys/action-danger-background', 'Danger secondary': 'plx-sys/control-background' }[name];
  const fg = { Primary: 'plx-sys/action-primary-content', Secondary: 'plx-sys/content-default', Ghost: 'plx-sys/content-muted', Danger: 'plx-sys/action-danger-content', 'Danger secondary': 'plx-sys/feedback-danger-content' }[name];
  const br = { Secondary: 'plx-sys/control-border', 'Danger secondary': 'plx-sys/feedback-danger-content' }[name];
  inst.fills = bg ? [paint(V[bg])] : [];
  if (br) { inst.strokes = [paint(V[br])]; inst.strokeAlign = 'INSIDE'; inst.setBoundVariable('strokeWeight', V['plx-comp/button-border-width']); } else inst.strokes = [];
  ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'].forEach(k => inst.setBoundVariable(k, V['plx-comp/button-radius']));
  inst.setBoundVariable('paddingLeft', V['plx-comp/button-padding-inline']); inst.setBoundVariable('paddingRight', V['plx-comp/button-padding-inline']);
  inst.paddingTop = 0; inst.paddingBottom = 0; inst.counterAxisAlignItems = 'CENTER';
  inst.setBoundVariable('minHeight', V['plx-sys/control-height-standard']);
  const label = inst.findOne(n => n.type === 'TEXT');
  label.fontName = { family: 'DM Sans', style: 'SemiBold' }; label.letterSpacing = { unit: 'PERCENT', value: 0 };
  label.setBoundVariable('fontSize', V['plx-ios/text-label-size']); label.setBoundVariable('lineHeight', V['plx-ios/text-label-line-height']);
  label.fills = [paint(V[fg])];
};
const wrapper = figma.createAutoLayout('VERTICAL', { name: 'Plenix for iOS', itemSpacing: 0 });
wrapper.x = maxX + 400; wrapper.y = minY; wrapper.fills = [{ type: 'SOLID', color: hex('FFFFFF') }];
const tWrap = figma.createAutoLayout('VERTICAL', { name: 'Title', paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 16, itemSpacing: 4 }); tWrap.fills = [];
tWrap.appendChild(text('Buttons on iOS: Apple default and Plenix', 20, 'SemiBold', '000000'));
tWrap.appendChild(text('Each column is one Plenix variant. The Apple rows are the kit component as Apple ships it; the Plenix rows are the same component styled with the Plenix variables.', 13, 'Regular', '56585E'));
wrapper.appendChild(tWrap);
const ROWS = [['Apple default · Light', null, '404:0', 'FFFFFF', '000000'], ['Apple default · Dark', null, '404:1', '000000', 'FFFFFF'], ['Plenix · Light', PL, '404:0', null, '000000'], ['Plenix · Dark', PD, '404:1', null, 'FFFFFF']];
const rowIds = {};
for (const [label, P, appleMode, bg, ink] of ROWS) {
  const row = figma.createAutoLayout('HORIZONTAL', { name: label, itemSpacing: 24, paddingLeft: 24, paddingRight: 24, paddingTop: 20, paddingBottom: 20, counterAxisAlignItems: 'CENTER' });
  row.setExplicitVariableModeForCollection(appleColors, appleMode);
  row.fills = P ? [paint(P.V['plx-sys/surface-canvas'])] : [{ type: 'SOLID', color: hex(bg) }];
  const head = text(label, 13, 'SemiBold', ink); row.appendChild(head); head.resize(150, head.height); head.textAutoResize = 'HEIGHT';
  for (const [name, style, destr] of VARS) {
    const cell = figma.createAutoLayout('VERTICAL', { name, itemSpacing: 8, counterAxisAlignItems: 'CENTER' }); cell.fills = [];
    const inst = variant(style, destr).createInstance();
    if (P) plenixStyle(inst, name, P.V);
    cell.appendChild(inst); cell.appendChild(text(name, 11, 'Regular', ink));
    row.appendChild(cell); cell.resize(96, cell.height); cell.layoutSizingHorizontal = 'FIXED';
  }
  wrapper.appendChild(row); row.layoutSizingHorizontal = 'FILL'; rowIds[label] = row.id;
}
return { wrapperId: wrapper.id, rowIds };
// The anatomy frame (12899:523) was a plain frame beside it: one Plenix-styled instance (Plenix Light variables), red
// (C10000) lettered dots with lines to each part, a caption "A Container   B Label   C Symbol" and a title.
