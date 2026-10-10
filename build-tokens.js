// Builds the token stylesheets from the token source in platform/tokens/ (batch 158). Run by build-app.js; also
//   node build-tokens.js            writes the stylesheets and the index
//   node build-tokens.js --check    exits with 1 if a stylesheet differs from what the source generates (check-system runs this)
//
// The source is JSON in the W3C Design Tokens format (Design Tokens Community Group): one file per token set
// (platform/tokens/*.tokens.json). A token is { "$value", "$type", "$description" }; a value that names another token is
// a reference, "{plx-ref.color-gray-800}" (group = the tier, key = the rest of the name), also inside a longer value
// ("calc({plx-ref.space-8px} * -1)"). Each set's "$extensions"."com.plenix" says which stylesheet and selector it is
// written into (light or dark, a density, an interaction mode); platform/tokens/build.json lists the stylesheets, their
// header comments and the order of their sets. Comments that sit between tokens in the stylesheet are kept on the token
// they precede ("before"), a comment after a token on its line is its "$description" ("after" keeps its spacing), so the
// stylesheet is written exactly as it always was: same names, same values, same comments.
//
// The stylesheets (platform/system/tokens/reference.css, semantic.css, components.css, and one per theme in
// platform/system/themes/ — the themes are listed in platform/standards/themes.json)
// are generated: edit the JSON, never the CSS. platform/tokens/tokens.index.json is written for the design spec: every
// token with its tier, set values, references, the values it resolves to in light and dark at each density, where it
// is written (file and line) and what uses it.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'platform', 'tokens');
const EXT = 'com.plenix';
const DEFAULT_THEME = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'platform', 'standards', 'themes.json'), 'utf8')).default; } catch (e) { return 'default'; } })();
const TIERS = ['plx-ref', 'plx-sys', 'plx-comp'];

// "{plx-ref.color-gray-800}" <-> "var(--plx-ref-color-gray-800)"
const toCss = (v) => String(v).replace(/\{(plx-(?:ref|sys|comp))\.([a-z0-9-]+)\}/g, 'var(--$1-$2)');
const toJson = (v) => String(v).replace(/var\(--(plx-(?:ref|sys|comp))-([a-z0-9-]+)\)/g, '{$1.$2}');
const refsOf = (v) => [...String(v).matchAll(/\{(plx-(?:ref|sys|comp))\.([a-z0-9-]+)\}/g)].map((m) => '--' + m[1] + '-' + m[2]);

// a set's tokens in order: [{ name: '--plx-…', token }]
function tokensOf(set) {
  const out = [];
  for (const tier of TIERS) for (const [key, token] of Object.entries(set[tier] || {})) out.push({ name: '--' + tier + '-' + key, token, order: (token.$extensions && token.$extensions[EXT] && token.$extensions[EXT].order) || 0 });
  return out.sort((a, b) => a.order - b.order);
}

// the themes (platform/standards/themes.json, batch 219): one stylesheet each, platform/system/themes/<name>.css, from its
// light and dark token sets. The selectors come from the theme's name: the default theme also answers :root (a page with
// no data-plx-theme); another theme answers only its own name. Every theme defines the same roles as the default theme,
// and a theme value never writes a color literal (colors come from the palette, by reference).
const COLOR_LITERAL = /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(/i;
function themeSelectors(name, isDefault) {
  const t = '[data-plx-theme="' + name + '"]';
  return isDefault
    ? { light: ':root,' + t + '[data-plx-mode="light"]', dark: ':root[data-plx-mode="dark"],' + t + '[data-plx-mode="dark"]' }
    : { light: t + ',' + t + '[data-plx-mode="light"]', dark: t + '[data-plx-mode="dark"]' };
}
const NL = String.fromCharCode(10);
function themeOutputs(root) {
  const std = JSON.parse(fs.readFileSync(path.join(root, 'platform', 'standards', 'themes.json'), 'utf8'));
  const names = Object.keys(std.themes || {});
  if (!std.themes || !std.themes[std.default]) throw new Error('platform/standards/themes.json: the default theme "' + std.default + '" is not defined');
  // the default theme first, so a theme's rules come after the ones it overrides
  names.sort((a, b) => (a === std.default ? -1 : b === std.default ? 1 : 0));
  const outs = [], errors = [];
  let roles = null, scales = null;
  for (const name of names) {
    const th = std.themes[name], sel = themeSelectors(name, name === std.default), sets = [];
    // the theme's foundations (typefaces, weights, shape, lines, motion, opacity, the focus ring): the same in light and
    // dark, so they sit on the theme alone (batch 220); every theme defines the same scales as the default theme
    if (!th.foundations) errors.push(name + ': no foundations token file');
    else {
      const fsel = name === std.default ? ':root,[data-plx-theme="' + name + '"]' : '[data-plx-theme="' + name + '"]';
      const data = JSON.parse(fs.readFileSync(path.join(SRC, th.foundations), 'utf8'));
      data.$extensions = data.$extensions || {}; data.$extensions[EXT] = Object.assign({}, data.$extensions[EXT], { output: 'platform/system/themes/' + name + '.css', selector: fsel, opener: fsel + '{' });
      const toks = tokensOf(data), list = toks.map((x) => x.name).sort().join(',');
      toks.forEach((x) => { if (COLOR_LITERAL.test(String(x.token.$value))) errors.push(th.foundations + ': ' + x.name + ' writes a color (' + x.token.$value + ')'); });
      if (scales === null) scales = list; else if (list !== scales) errors.push(th.foundations + ': does not define the same foundations as the default theme');
      sets.push({ tokens: th.foundations, before: '', data });
    }
    for (const mode of ['light', 'dark']) {
      if (!th[mode]) { errors.push(name + ': no ' + mode + ' token file'); continue; }
      const data = JSON.parse(fs.readFileSync(path.join(SRC, th[mode]), 'utf8'));
      data.$extensions = data.$extensions || {}; data.$extensions[EXT] = Object.assign({}, data.$extensions[EXT], { output: 'platform/system/themes/' + name + '.css', selector: sel[mode], opener: sel[mode] + '{' });
      const toks = tokensOf(data);
      toks.forEach((x) => { if (COLOR_LITERAL.test(String(x.token.$value))) errors.push(th[mode] + ': ' + x.name + ' writes a color (' + x.token.$value + '): point to a palette color, e.g. {plx-ref.color-blue-400}'); });
      const names2 = toks.map((x) => x.name).sort().join(',');
      if (roles === null && mode === 'light') roles = names2;
      else if (names2 !== roles) errors.push(th[mode] + ': does not define the same roles as the default theme');
      sets.push({ tokens: th[mode], before: NL, data });
    }
    outs.push({ file: 'platform/system/themes/' + name + '.css',
      prologue: '/* GENERATED by build-tokens.js from platform/tokens/ (' + th.light + ', ' + th.dark + ') and platform/standards/themes.json. Edit the JSON, never this file. */' + NL
        + '/* Plenix · Theme "' + name + '" (platform/system/themes/' + name + '.css): ' + (th.description || '') + NL
        + '   Every semantic color and elevation role, light and dark. <html data-plx-theme="' + name + '" data-plx-mode="light | dark">'
        + (name === std.default ? '; the default theme also applies without the attributes.' : '.') + ' */' + NL,
      sets, epilogue: NL });
  }
  if (errors.length) throw new Error('Themes (platform/standards/themes.json):' + NL + '  ' + errors.join(NL + '  '));
  return outs;
}

function load(root = ROOT) {
  const manifest = JSON.parse(fs.readFileSync(path.join(SRC, 'build.json'), 'utf8'));
  for (const o of manifest.outputs) for (const s of o.sets) s.data = JSON.parse(fs.readFileSync(path.join(SRC, s.tokens), 'utf8'));
  manifest.outputs = manifest.outputs.concat(themeOutputs(root));
  return manifest;
}

// the stylesheets as text: { 'platform/system/tokens/reference.css': text, … }, and where each token is written
function generate(manifest) {
  const files = {}, written = [];
  for (const o of manifest.outputs) {
    let text = o.prologue;
    for (const s of o.sets) {
      const ext = s.data.$extensions[EXT];
      const lines = [];
      for (const { name, token } of tokensOf(s.data)) {
        const x = (token.$extensions && token.$extensions[EXT]) || {};
        (x.before || []).forEach((l) => lines.push(l));
        written.push({ name, file: o.file, set: s.tokens, selector: ext.selector, line: text.split('\n').length + lines.length + 1 });
        lines.push('  ' + name + ': ' + toCss(token.$value) + ';' + (x.after || ''));
      }
      (ext.tail || []).forEach((l) => lines.push(l));
      text += s.before + ext.opener + '\n' + lines.join('\n') + '\n}';
    }
    files[o.file] = text + o.epilogue;
  }
  return { files, written };
}

// the selector items a set is written under, as conditions: an item applies when every attribute it names has that value
function applies(selector, ctx) {
  return selector.split(',').some((item) => {
    if (/data-plx-density-policy/.test(item)) return false;
    if (/:not\(\[data-plx-interaction\]\)/.test(item) && ctx.interaction) return false;
    for (const m of item.matchAll(/data-plx-([a-z-]+)="([^"]+)"/g)) {
      const k = m[1], v = m[2];
      if (k === 'theme') { if (v !== (ctx.theme || DEFAULT_THEME)) return false; continue; }
      if (ctx[k] !== v) return false;
    }
    return true;
  });
}

function index(manifest, written) {
  const sets = [];
  for (const o of manifest.outputs) for (const s of o.sets) sets.push({ file: s.tokens, output: o.file, selector: s.data.$extensions[EXT].selector, tokens: tokensOf(s.data) });
  const byName = {};
  for (const s of sets) for (const { name, token } of s.tokens) {
    const t = byName[name] = byName[name] || { name, tier: name.slice(2).split('-').slice(0, 2).join('-'), type: token.$type, description: token.$description || '', sets: [], refs: [], usedBy: [], referencedBy: [] };
    t.sets.push({ file: s.file, output: s.output, selector: s.selector, value: toCss(token.$value) });
    for (const r of refsOf(token.$value)) if (!t.refs.includes(r)) t.refs.push(r);
    if (!t.type && token.$type) t.type = token.$type;
  }
  for (const w of written) { const t = byName[w.name]; (t.written = t.written || []).push({ file: w.file, line: w.line, selector: w.selector }); }
  for (const t of Object.values(byName)) for (const r of t.refs) if (byName[r] && !byName[r].referencedBy.includes(t.name)) byName[r].referencedBy.push(t.name);
  // the value in a context: the last set that applies wins; references resolve in the same context
  const CONTEXTS = [];
  for (const mode of ['light', 'dark']) for (const density of ['compact', 'standard', 'comfortable']) CONTEXTS.push({ mode, density, interaction: null });
  const raw = (name, ctx) => { let v = null; for (const s of sets) if (applies(s.selector, ctx)) for (const x of s.tokens) if (x.name === name) v = toCss(x.token.$value); return v; };
  const resolve = (name, ctx, seen = new Set(), rawFn = raw) => {
    if (seen.has(name)) return null; seen.add(name);
    const v = rawFn(name, ctx); if (v == null) return null;
    return v.replace(/var\((--plx-[a-z0-9-]+)\)/g, (m, n) => { const r = resolve(n, ctx, new Set(seen), rawFn); return r == null ? m : r; });
  };
  // component settings a component's own stylesheet declares (.plx-button{--plx-comp-button-height:…}): indexed with the
  // stylesheet as their source (the icon glyphs, generated data URIs, are left out)
  const local = (dir) => { if (!fs.existsSync(dir)) return; for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { local(p); continue; }
    if (!f.name.endsWith('.css') || f.name === 'icon.css') continue;
    const rel = path.relative(ROOT, p).replace(/\\/g, '/'), css = fs.readFileSync(p, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) for (const d of m[2].matchAll(/(--plx-[a-z0-9-]+)\s*:\s*([^;]+)/g)) {
      const name = d[1], value = d[2].trim(), selector = m[1].trim().replace(/\s+/g, ' ');
      if (byName[name] && !byName[name].local) continue;
      const t = byName[name] = byName[name] || { name, tier: name.slice(2).split('-').slice(0, 2).join('-'), type: null, description: 'Declared by its component’s stylesheet (' + rel + ').', local: true, sets: [], refs: [], usedBy: [], referencedBy: [], written: [] };
      t.sets.push({ file: rel, output: rel, selector, value });
      t.written.push({ file: rel, line: css.slice(0, m.index + m[0].indexOf(d[0])).split('\n').length, selector });
      for (const r of value.matchAll(/var\((--plx-[a-z0-9-]+)/g)) if (!t.refs.includes(r[1])) t.refs.push(r[1]);
    }
  } };
  for (const k of ['components', 'patterns', 'system']) local(path.join(ROOT, 'platform', k));
  for (const t of Object.values(byName)) if (t.local) for (const r of t.refs) if (byName[r] && !byName[r].referencedBy.includes(t.name)) byName[r].referencedBy.push(t.name);
  const rawLocal = raw;
  const raw2 = (name, ctx) => { const v = rawLocal(name, ctx); if (v != null) return v; const t = byName[name]; return t && t.local ? t.sets[0].value : null; };
  for (const t of Object.values(byName)) {
    const vals = {}; for (const c of CONTEXTS) vals[c.mode + '/' + c.density] = resolve(t.name, c, undefined, raw2);
    const uniq = [...new Set(Object.values(vals))];
    t.resolved = uniq.length === 1 ? { all: uniq[0] } : vals;
  }
  // what uses each token: the Platform's stylesheets other than the token files
  const used = (dir) => { if (!fs.existsSync(dir)) return; for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (!/^(dist|vendor|tokens|design-system|icons)$/.test(f.name)) used(p); continue; }
    if (!f.name.endsWith('.css') || /themes[\\/]plenix\.css$/.test(p)) continue;
    const rel = path.relative(ROOT, p).replace(/\\/g, '/'), css = fs.readFileSync(p, 'utf8');
    for (const m of new Set([...css.matchAll(/var\((--plx-[a-z0-9-]+)/g)].map((x) => x[1]))) if (byName[m]) byName[m].usedBy.push(rel);
  } };
  used(path.join(ROOT, 'platform'));
  return { $description: 'Generated by build-tokens.js from platform/tokens (do not edit). One record per token.', count: Object.keys(byName).length, tokens: Object.values(byName) };
}

function build(root = ROOT, { check = false } = {}) {
  const manifest = load(root);
  const { files, written } = generate(manifest);
  const stale = [];
  for (const [rel, text] of Object.entries(files)) {
    const p = path.join(root, rel);
    const now = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
    if (now !== text) { stale.push(rel); if (!check) fs.writeFileSync(p, text); }
  }
  if (!check) fs.writeFileSync(path.join(SRC, 'tokens.index.json'), JSON.stringify(index(manifest, written)) + '\n');
  // the native outputs from the same tokens (Platforms Standard 7.2): Swift, Kotlin and Dart in platform/mobile (build-mobile.js)
  const mobile = check ? null : require('./build-mobile.js')(root);
  return { files: Object.keys(files), stale, count: written.length, mobile };
}

module.exports = build;
module.exports.toCss = toCss; module.exports.toJson = toJson;
if (require.main === module) {
  const check = process.argv.includes('--check');
  const r = build(ROOT, { check });
  if (check) { if (r.stale.length) { console.log('Token stylesheets differ from platform/tokens (edit the JSON, then build): ' + r.stale.join(', ')); process.exit(1); } console.log('tokens ok (' + r.count + ')'); }
  else console.log('Built ' + r.files.length + ' token stylesheets (' + r.count + ' tokens' + (r.stale.length ? ', ' + r.stale.length + ' changed' : ', unchanged') + ') and tokens.index.json');
}
