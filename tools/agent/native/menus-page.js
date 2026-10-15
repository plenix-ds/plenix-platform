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
