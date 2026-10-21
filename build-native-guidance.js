// Plenix · build-native-guidance.js (batch 330): Plenix's own guidance for every page of the Apple Human Interface
// Guidelines (platform/standards/native-guidance.json: rules in Plenix's words, each citing the HIG section it follows,
// a property table across iOS, Android and Web, and the Web and Android pages it maps to) becomes the design system's
// data: platform/design-system/native-guidance.js (window.DSNativeGuidance), with the reverse index, so a Web or Android
// page lists the iOS guidance mapped to it. Every mapped page must exist in the taxonomy; a missing one stops the build.
// The web side is web-native-map.json plus the library lanes' web-native-map.d/*.json; the web records include the library
// parts (spec-parts.js).
// Run by build-app.js; alone: node build-native-guidance.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

module.exports = function buildNativeGuidance(root) {
  const src = path.join(root, 'platform', 'standards', 'native-guidance.json');
  const out = path.join(root, 'platform', 'design-system', 'native-guidance.js');
  // without the design system checked out (CI: it is a private submodule) there is nothing to write into
  if (!fs.existsSync(src) || !fs.existsSync(path.join(path.dirname(out), 'spec.js'))) return { changed: false, pages: 0, rules: 0 };
  const data = JSON.parse(fs.readFileSync(src, 'utf8'));
  const ctx = { window: {} };
  const tax = path.join(root, 'platform', 'design-system', 'inventory-taxonomy.js');
  const leaves = new Set();
  if (fs.existsSync(tax)) {
    vm.runInNewContext(fs.readFileSync(tax, 'utf8'), ctx);
    ctx.window.DSTaxonomy.forEach((s) => s.subs.forEach((x) => x[1].split('|').forEach((l) => leaves.add(s.id + '|' + l))));
  }
  const pages = data.pages || {}, byWeb = {}, byAndroid = {}, bad = [];
  let rules = 0;
  for (const [key, g] of Object.entries(pages)) {
    if (leaves.size && !leaves.has(key)) bad.push(key + ': not an iOS page');
    rules += (g.rules || []).length;
    (g.web || []).forEach((w) => { if (leaves.size && !leaves.has(w)) bad.push(key + ': web page ' + w + ' does not exist'); (byWeb[w] = byWeb[w] || []).push(key); });
    (g.android || []).forEach((a) => { if (leaves.size && !leaves.has(a)) bad.push(key + ': Android page ' + a + ' does not exist'); (byAndroid[a] = byAndroid[a] || []).push(key); });
  }
  // the web side (web-native-map.json): web pages that no iOS guidance page names, mapped straight to iOS and Android
  // plus the library lanes' own maps (web-native-map.d/wNNL.json, same shape, read in name order): a page mapped twice stops the build
  const mapFile = path.join(root, 'platform', 'standards', 'web-native-map.json');
  const direct = fs.existsSync(mapFile) ? Object.assign({}, JSON.parse(fs.readFileSync(mapFile, 'utf8')).map) : {};
  const mapDir = path.join(root, 'platform', 'standards', 'web-native-map.d');
  if (fs.existsSync(mapDir)) for (const f of fs.readdirSync(mapDir).filter((x) => x.endsWith('.json')).sort()) {
    const part = JSON.parse(fs.readFileSync(path.join(mapDir, f), 'utf8')).map || {};
    for (const [w, d] of Object.entries(part)) { if (direct[w]) bad.push('web-native-map.d/' + f + ': ' + w + ' is already mapped'); else direct[w] = d; }
  }
  const uniq = (a) => [...new Set(a)];
  const webMap = {}, iosWeb = {}, androidWeb = {};
  Object.keys(byWeb).concat(Object.keys(direct)).forEach((w) => {
    const d = direct[w] || {}, ios = uniq((byWeb[w] || []).concat(d.ios || []));
    // a direct mapping names its Android pages itself; otherwise they come from the iOS guidance pages that name this page
    const android = (d.android || []).length ? uniq(d.android) : uniq(ios.reduce((a, k) => a.concat((pages[k] && pages[k].android) || []), []));
    webMap[w] = { ios, android };
    if (leaves.size && !leaves.has(w)) bad.push('web-native-map.json: web page ' + w + ' does not exist');
    (d.ios || []).concat(d.android || []).forEach((k) => { if (leaves.size && !leaves.has(k)) bad.push('web-native-map.json: ' + w + ' -> ' + k + ' does not exist'); });
    ios.forEach((k) => { (iosWeb[k] = iosWeb[k] || []).push(w); });
    android.forEach((k) => { (androidWeb[k] = androidWeb[k] || []).push(w); });
  });
  // every built web item (inventory.js) has an iOS and an Android counterpart
  const inv = path.join(root, 'platform', 'design-system', 'inventory.js');
  if (fs.existsSync(inv)) {
    const c2 = { window: {}, React: { createElement: () => null } }; c2.window.React = c2.React; c2.window.Plenix = new Proxy({}, { get: (t, k) => k });
    vm.createContext(c2);
    // the library parts' records first (spec-parts.js, build-spec-parts.js), then inventory.js pushes them
    const parts = path.join(path.dirname(inv), 'spec-parts.js');
    if (fs.existsSync(parts)) vm.runInContext(fs.readFileSync(parts, 'utf8'), c2);
    vm.runInContext(fs.readFileSync(inv, 'utf8'), c2);
    let recs = c2.window.DSInventory; if (typeof recs === 'function') recs = recs();
    recs.forEach((r) => { const m = webMap[r.sec + '|' + r.leaf]; if (!m || !m.ios.length || !m.android.length) bad.push('web item ' + r.id + ' (' + r.sec + '|' + r.leaf + ') has no ' + (!m || !m.ios.length ? 'iOS' : 'Android') + ' counterpart'); });
  }
  // the Figma kit (figma-map.json, batch 334): each public component of Apple's iOS and iPadOS 27 kit, under the iOS page it
  // draws (its kit page's, or its own), so an iOS page lists its Figma components and a Web or Android page those of its iOS pages
  const figFile = path.join(root, 'platform', 'standards', 'figma-map.json');
  let figma = null;
  if (fs.existsSync(figFile)) {
    const fm = JSON.parse(fs.readFileSync(figFile, 'utf8')), byIos = {};
    Object.entries(fm.pages).forEach(([name, pg]) => {
      if (leaves.size && !leaves.has(pg.ios)) bad.push('figma-map.json: kit page ' + name + ' -> ' + pg.ios + ' does not exist');
      (byIos[pg.ios] = byIos[pg.ios] || []);
      pg.components.forEach((c) => { const k = c.ios || pg.ios; if (leaves.size && !leaves.has(k)) bad.push('figma-map.json: ' + c.name + ' -> ' + k + ' does not exist');
        (byIos[k] = byIos[k] || []).push(Object.assign({ page: name }, c, { ios: undefined })); });
    });
    figma = { file: fm.file, byIos, count: Object.values(fm.pages).reduce((m, p) => m + p.components.length, 0) };
  }
  // the Plenix design of each native component (native-design.json, batch 336): its page, its rules (follows), its images
  // and every token it names must exist
  const desFile = path.join(root, 'platform', 'standards', 'native-design.json');
  let design = null;
  if (fs.existsSync(desFile)) {
    design = JSON.parse(fs.readFileSync(desFile, 'utf8')).pages;
    const tokFile = path.join(root, 'platform', 'tokens', 'tokens.index.json');
    const toks = fs.existsSync(tokFile) ? new Set(JSON.parse(fs.readFileSync(tokFile, 'utf8')).tokens.map((t) => t.name.slice(2))) : null;
    Object.entries(design).forEach(([key, d]) => {
      if (leaves.size && !leaves.has(key)) bad.push('native-design.json: ' + key + ' is not a page');
      Object.values(d.images || {}).forEach((im) => { if (!fs.existsSync(path.join(root, 'platform', 'design-system', im.src))) bad.push('native-design.json: ' + key + ' image ' + im.src + ' is missing'); });
      const sections = new Set(((pages[key] || {}).rules || []).map((r) => r.section));
      (d.attributes || []).forEach((a) => { if (pages[key] && a.follows && !a.followsUrl && !sections.has(a.follows)) bad.push('native-design.json: ' + key + ' ' + a.attribute + ' follows ' + a.follows + ', not a section of its guidance'); });
      (d.variants || []).forEach((v) => { if (v.web && leaves.size && !leaves.has(v.web)) bad.push('native-design.json: ' + key + ' ' + v.name + ' web page ' + v.web + ' does not exist'); });
      if (toks) (JSON.stringify([d.variants, d.attributes, d.states]).match(/plx-(?:sys|comp)-[a-z0-9-]*[a-z0-9]/g) || []).forEach((t) => { if (!toks.has(t)) bad.push('native-design.json: ' + key + ' names ' + t + ', not a token'); });
    });
  }
  if (bad.length) throw new Error('native-guidance.json:\n  ' + bad.join('\n  '));
  // two files: the full guidance (native-guidance-full.js), which spec.js loads only when the reader opens iOS or Android,
  // and the index every page loads (native-guidance.js): the cross-platform maps, the Figma kit, and of each guidance page
  // and native design only what a Web page's "Across platforms" panel shows (summary, properties, rule count, variant names,
  // the comparison image)
  const full = { source: data.source, read: data.read, pages, byWeb, byAndroid, webMap, iosWeb, androidWeb, figma, design };
  const lightPages = {}, lightDesign = {};
  for (const [k, g] of Object.entries(pages)) lightPages[k] = { summary: g.summary, web: g.web, android: g.android, properties: g.properties, nRules: (g.rules || []).length };
  for (const [k, d] of Object.entries(design || {})) lightDesign[k] = { variants: (d.variants || []).map((v) => ({ name: v.name })), images: d.images && d.images.compare ? { compare: d.images.compare } : undefined };
  const light = Object.assign({}, full, { pages: lightPages, design: design ? lightDesign : null, light: true });
  const head = (what) => '/* Plenix · the native guidance' + what + '. GENERATED by build-native-guidance.js from\n'
    + '   platform/standards/native-guidance.json: edit the JSON, never this file. Plenix\'s own rules for each page of the Apple\n'
    + '   Human Interface Guidelines, each linked to the HIG section it follows. */\n';
  const files = [
    [out, head(', index (window.DSNativeGuidance, light: true; every page loads it)') + 'window.DSNativeGuidance = ' + JSON.stringify(light) + ';\n'],
    [out.replace(/\.js$/, '-full.js'), head(', full (window.DSNativeGuidance; spec.js loads it on the iOS and Android pages)') + 'window.DSNativeGuidance = ' + JSON.stringify(full) + ';\n']
  ];
  let changed = false;
  for (const [file, text] of files) if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text) { fs.writeFileSync(file, text); changed = true; }
  return { changed, pages: Object.keys(pages).length, rules, web: Object.keys(webMap).length };
};

if (require.main === module) { const r = module.exports(__dirname); console.log('Wrote platform/design-system/native-guidance.js (' + r.pages + ' pages, ' + r.rules + ' rules' + (r.changed ? '' : ', unchanged') + ')'); }
