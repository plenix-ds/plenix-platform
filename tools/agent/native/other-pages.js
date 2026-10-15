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
