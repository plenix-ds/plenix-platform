// Builds platform/components/Icon/icon.css from the icon set in platform/icons/ (batch 144). Run by build-app.js.
//
// The set: Material Symbols Sharp, weight 300, from google/material-design-icons at the commit in platform/icons/map.json.
// The SVG files are used exactly as published (never edited): <symbol>.svg and <symbol>-fill.svg are optical size 20 (icons
// up to 20px), <symbol>-24.svg and <symbol>-24-fill.svg optical size 24 (24px icons). map.json names the symbol behind every
// Plenix icon name. The stylesheet carries every file as a data: URI, so an icon (outline or filled) never waits for a
// download when it first appears or when its row is selected.
// It also writes platform/components/Icon/glyphs.js: every symbol's four path drawings and the name of each Plenix icon,
// so the Icon component draws an inline SVG (owner, 2026-10-23: a mask icon cost ~0.6 ms to paint, an inline path
// ~200 times less). A class name alone (no component, or a Material name from icons-all.css) still draws the mask.
const fs = require('fs');
const path = require('path');
const layout = require('./platform/icons/layout.js');   // the icon asset layout (#279): icons/<set>/<name>.svg|.js

const ident = (sym) => sym.replace(/_/g, '-');
// the naming contract (owner, 2026-10-22): Plenix names use dashes; a name that is its Material symbol with dashes
// (mic-off = mic_off) also answers to the symbol's own spelling, so both work in every Icon slot
const aliasOf = (M, n) => { const sym = M.map[n].split('#')[0]; return n.includes('-') && n.replace(/-/g, '_') === sym && !M.map[sym] ? sym : null; };
const selectors = (M, n) => '.plx-icon--' + n + (aliasOf(M, n) ? ',.plx-icon--' + aliasOf(M, n) : '');
// an SVG as a CSS url(): double quotes become single quotes; only the characters CSS and URLs need are escaped
const dataUri = (svg) => 'url("data:image/svg+xml,' + svg.trim().replace(/\s+/g, ' ').replace(/"/g, "'")
  .replace(/%/g, '%25').replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/\{/g, '%7B').replace(/\}/g, '%7D') + '")';

module.exports = function buildIcons(root) {
  const dir = path.join(root, 'platform', 'icons');
  const out = path.join(root, 'platform', 'components', 'Icon', 'icon.css');
  const M = JSON.parse(fs.readFileSync(path.join(dir, 'map.json'), 'utf8'));
  const VARIANTS = [['', ''], ['-fill', '-fill'], ['-24', '-24'], ['-24-fill', '-24-fill']];
  const symbols = [...new Set(Object.values(M.map).map((v) => v.split('#')[0]))].sort();
  const glyphs = [], paths = {};
  for (const s of symbols) for (const [file, suffix] of VARIANTS) {
    // the working set first, then Plenix's own icons (platform/icons/custom, owner 2026-10-19), then the full library
    // (platform/icons/library: every symbol, batch 273)
    let f = path.join(dir, s + file + '.svg');
    if (!fs.existsSync(f)) f = path.join(dir, 'custom', s + file + '.svg');
    if (!fs.existsSync(f)) f = path.join(dir, 'library', s + file + '.svg');
    if (!fs.existsSync(f)) throw new Error('icon file missing: ' + s + file + '.svg');
    layout.readDrawing(f);   // the allow-list (#285): a file the Icon component would refuse stops the build here
    // one path per file, in its own box (its viewBox, or its width and height when it has none), with the path's own
    // drawing attributes (a transform, a fill rule: Plenix's custom person icons place their path with a transform)
    const svg = fs.readFileSync(f, 'utf8'), tag = svg.match(/<path\b([^>]*)\/?>/), box = svg.match(/viewBox="([^"]+)"/), w = svg.match(/ width="([\d.]+)"/), h = svg.match(/ height="([\d.]+)"/);
    const attr = (name) => { const m = tag && tag[1].match(new RegExp('\\s' + name + '="([^"]+)"')); return m ? m[1] : null; };
    if (!tag || !attr('d') || (svg.match(/<path/g) || []).length !== 1 || !(box || (w && h))) throw new Error('icon file is not one path with a box: ' + s + file + '.svg');
    const extra = {}; for (const [a, key] of [['transform', 'transform'], ['fill-rule', 'fillRule'], ['clip-rule', 'clipRule']]) if (attr(a)) extra[key] = attr(a);
    (paths[s] = paths[s] || []).push([attr('d'), box ? box[1] : '0 0 ' + w[1] + ' ' + h[1]].concat(Object.keys(extra).length ? [extra] : []));
    glyphs.push('  --plx-comp-icon-glyph-' + ident(s) + suffix + ':' + dataUri(svg) + ';');
  }
  const names = Object.keys(M.map).sort().map((n) => {
    const v = M.map[n], s = ident(v.split('#')[0]), fill = v.endsWith('#fill');
    const o = '--plx-comp-icon-glyph-' + s + (fill ? '-fill' : ''), f = '--plx-comp-icon-glyph-' + s + '-fill';
    const auto = (g) => 'var(' + g.replace('--plx-comp-icon-glyph-', '--plx-comp-icon-auto-') + ',var(' + g + '))';
    return selectors(M, n) + '{--plx-comp-icon-filled:' + auto(f) + ';--plx-comp-icon-filled-24:var(' + f.replace(/-fill$/, '-24-fill') + ');--plx-comp-icon-outline:' + auto(o) + ';--plx-comp-icon-outline-24:var(' + o.replace(/(-fill)?$/, '-24$1') + ');}';
  });
  // the symbols that point along the reading direction: mirrored in right to left
  const MIRROR = layout.MIRROR;
  // the optical size a context draws, per symbol: 20 by default (every density context but Comfortable resets it, so a
  // region nested in a Comfortable one draws 20 again), 24 in a Comfortable region and in a 24px container
  const autos = (big) => symbols.flatMap((sym) => ['', '-fill'].map((f) => '--plx-comp-icon-auto-' + ident(sym) + f + ':var(--plx-comp-icon-glyph-' + ident(sym) + (big ? '-24' : '') + f + ');')).join('');
  const css = [
    '/* Plenix · Icon (platform/components/Icon/icon.css). GENERATED by build-icons.js from platform/icons/ (do not edit by hand).',
    '   The set: Material Symbols Sharp, weight 300, used exactly as published (' + M._source + ').',
    '   Each Plenix name (plx-icon--<name>) points at its symbol (platform/icons/map.json); every file is carried here as a data: URI.',
    '   Outline by default; filled (the set’s fill version) with plx-icon--filled (<Icon filled>, passed by the component that owns the current or selected state).',
    '   Optical size 20 for icons up to 20px; optical size 24 where icons are 24px (size lg and xl, Comfortable, and inside a container that sets data-plx-icon-optical="24": the app header, a pictogram).',
    '   The icon’s square includes the set’s own padding (1/12 of the square on each side); the system adds none to make up for it.',
    '   Context hooks (Styling Standard 4.1), set by the slot that holds the icon on its own element: --plx-comp-icon-size, --plx-comp-icon-turn (a chevron turned with its state; its -duration and -easing), --plx-comp-icon-mask-size, --plx-comp-icon-lead (the space before it, in running text).',
    '   Default size: --plx-sys-icon-size; a control gives its role’s grid icon (--plx-sys-control-icon-<role>); named sizes xs, sm, md, lg, xl (48px: a page title). */',
    ':root{', ...glyphs, '}',
    '/* the optical size each context draws (exclusive): a Comfortable region and a 24px container draw 24, every other',
    '   density context 20 (the page itself is one) */',
    '[data-plx-density]:where(:not([data-plx-density="comfortable"], [data-plx-icon-optical="24"])){--plx-comp-icon-context-show-20:block;--plx-comp-icon-context-show-24:none;' + autos(false) + '}',
    '[data-plx-density="comfortable"]:where(:not([data-plx-icon-optical="24"])){--plx-comp-icon-context-show-20:none;--plx-comp-icon-context-show-24:block;' + autos(true) + '}',
    '[data-plx-icon-optical="24"]{--plx-comp-icon-context-show-20:none;--plx-comp-icon-context-show-24:block;' + autos(true) + '}',
    '.plx-icon{outline-color:var(--plx-comp-icon-context-keyline-color,currentcolor);outline-offset:var(--plx-comp-icon-context-keyline-offset,0);outline-style:var(--plx-comp-icon-context-keyline-style,none);outline-width:var(--plx-comp-icon-context-keyline-width,medium);border-inline-start-color:currentcolor;border-inline-start-style:solid;border-inline-start-width:var(--plx-state-icon-stroke,calc(var(--plx-comp-icon-size,var(--plx-sys-icon-size)) * var(--plx-sys-icon-forced-stroke)));-webkit-mask-image:var(--plx-state-icon-mask,var(--plx-comp-icon-url,linear-gradient(transparent,transparent)));-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:var(--plx-comp-icon-mask-size,contain);background-color:var(--plx-state-icon-paint,currentcolor);block-size:var(--plx-comp-icon-size,var(--plx-sys-icon-size));display:inline-block;flex-shrink:0;inline-size:var(--plx-comp-icon-size,var(--plx-sys-icon-size));margin-inline-start:var(--plx-comp-icon-lead,0);mask-image:var(--plx-state-icon-mask,var(--plx-comp-icon-url,linear-gradient(transparent,transparent)));mask-position:center;mask-repeat:no-repeat;mask-size:var(--plx-comp-icon-mask-size,contain);transform:var(--plx-comp-icon-turn,none);transition-duration:var(--plx-comp-icon-turn-duration,0s);transition-property:transform;transition-timing-function:var(--plx-comp-icon-turn-easing,ease);vertical-align:middle;}',
    '@property --plx-state-icon-mask{syntax:"*";inherits:false;}',
    '@property --plx-state-icon-paint{syntax:"*";inherits:false;}',
    '@property --plx-state-icon-stroke{syntax:"*";inherits:false;}',
    '/* the inline drawing (<Icon>): the svg in the text color, no mask; the paths show by the same rules as the mask: the',
    '   context\'s optical size, or 24 for lg and xl (the component draws only the fill it is given) */',
    '.plx-icon--inline{--plx-state-icon-mask:none;--plx-state-icon-paint:transparent;--plx-state-icon-stroke:0px;}',
    '.plx-icon--inline:where(:not(.plx-icon--size-lg, .plx-icon--size-xl)){--plx-comp-icon-glyph-show-20:var(--plx-comp-icon-context-show-20,block);--plx-comp-icon-glyph-show-24:var(--plx-comp-icon-context-show-24,none);}',
    '.plx-icon--inline:where(.plx-icon--size-lg, .plx-icon--size-xl){--plx-comp-icon-glyph-show-20:none;--plx-comp-icon-glyph-show-24:block;}',
    '.plx-icon__svg{block-size:var(--plx-comp-icon-mask-size,100%);fill:currentcolor;inline-size:var(--plx-comp-icon-mask-size,100%);margin-block-end:0;margin-block-start:calc((100% - var(--plx-comp-icon-mask-size,100%)) / 2);margin-inline:auto;overflow:hidden;pointer-events:none;}',
    '.plx-icon__glyph--20{display:var(--plx-comp-icon-glyph-show-20,block);}',
    '.plx-icon__glyph--24{display:var(--plx-comp-icon-glyph-show-24,none);}',
    '.plx-icon__svg--shared{display:block;}',
    '.plx-icon--size-xs{--plx-comp-icon-size:var(--plx-comp-icon-size-xs);}',
    '.plx-icon--size-sm{--plx-comp-icon-size:var(--plx-comp-icon-size-sm);}',
    '.plx-icon--size-md{--plx-comp-icon-size:var(--plx-comp-icon-size-md);}',
    '.plx-icon--size-lg{--plx-comp-icon-size:var(--plx-comp-icon-size-lg);}',
    '.plx-icon--size-xl{--plx-comp-icon-size:var(--plx-comp-icon-size-xl);}',
    '/* the drawing (exclusive): outline or filled, at the context\'s optical size or, for lg and xl, at 24. Filled is the',
    '   icon\'s own plx-icon--filled, which the component owning the state passes (<Icon filled>, stateIcon: NavList\'s',
    '   current item, a selected Button, a chosen tile\'s check). Content inside a selected row or card stays outline',
    '   (owner, 2026-10-20): nothing fills an icon from an ancestor */',
    ...(() => {
      const F = '.plx-icon--filled', B = '.plx-icon--size-lg, .plx-icon--size-xl';
      return ['.plx-icon:where(:not(' + F + ', ' + B + ')){--plx-comp-icon-url:var(--plx-comp-icon-outline);}',
        '.plx-icon:where(' + F + '):where(:not(' + B + ')){--plx-comp-icon-url:var(--plx-comp-icon-filled);}',
        '.plx-icon:where(' + B + '):where(:not(' + F + ')){--plx-comp-icon-url:var(--plx-comp-icon-outline-24);}',
        '.plx-icon:where(' + F + '):where(' + B + '){--plx-comp-icon-url:var(--plx-comp-icon-filled-24);}'];
    })(),
    ...names,
    '/* right to left: the directional icons mirror (Material Symbols\' bidirectional set); scale, so a rotation on the icon still applies (batch 213) */',
    Object.keys(M.map).filter((n) => MIRROR.indexOf(M.map[n].split('#')[0]) >= 0).sort().map((n) => selectors(M, n).split(',').map((sel) => sel + ':dir(rtl)').join(',')).join(',') + '{scale:-1 1;}',
    '/* an imported icon module outside the Plenix set that points along the reading direction (its mirrored flag; issue 281):',
    '   the Icon component marks it plx-icon--mirrored, and it mirrors the same way */',
    '.plx-icon--mirrored:dir(rtl){scale:-1 1;}',
  ].join('\n') + '\n';
  const missing = Object.keys(M.map).filter((n) => !css.includes('.plx-icon--' + n + '{') && !css.includes('.plx-icon--' + n + ','));
  if (missing.length) throw new Error('icon names without a rule: ' + missing.join(', '));
  fs.writeFileSync(out, css);
  // the inline drawings: symbol -> [outline 20, filled 20, outline 24, filled 24]; Plenix name (and its underscore alias) ->
  // [symbol, 1 when its outline is the symbol's fill version (map.json '#fill')]
  const named = {};
  for (const n of Object.keys(M.map).sort()) { const v = M.map[n], entry = [v.split('#')[0], v.endsWith('#fill') ? 1 : 0]; named[n] = entry; const a = aliasOf(M, n); if (a) named[a] = entry; }
  // the whole library's symbol names (platform/icons/library, every symbol with its four files): the Icon component
  // resolves any Material name against it and loads that symbol's files on demand (here, or /cdn/material/<commit>/)
  const libDir = path.join(dir, 'library'), files = new Set(fs.existsSync(libDir) ? fs.readdirSync(libDir) : []);
  const library = [...new Set([...files].map((f) => f.replace(/(-24)?(-fill)?\.svg$/, '')))].filter((s) => VARIANTS.every(([v]) => files.has(s + v + '.svg'))).sort();
  fs.writeFileSync(path.join(root, 'platform', 'components', 'Icon', 'glyphs.js'),
    '/* Plenix · Icon glyphs\n' +
    '   Summary: GENERATED FILE — DO NOT EDIT. Written by build-icons.js from platform/icons/ (Material Symbols Sharp, weight\n' +
    '     300, used exactly as published): the names the Icon component resolves. The drawings themselves are in icon.css\n' +
    '     (one copy: the component reads a Plenix symbol\'s files from its --plx-comp-icon-glyph-* data URIs).\n' +
    '   Usage: import { SYMBOLS, NAMES, LIBRARY, LIBRARY_COMMIT } from \'./glyphs.js\'   (Icon.jsx only)\n' +
    '   Props:\n' +
    '     SYMBOLS: the Plenix set\'s symbols, space separated (their drawings are in icon.css)\n' +
    '     NAMES: each Plenix icon name (and its underscore alias) -> [symbol, 1 when its outline is the fill version]\n' +
    '     LIBRARY: the whole library\'s symbol names, space separated (their files load on demand)\n' +
    '     LIBRARY_COMMIT: the library\'s commit (the CDN keeps its files under /cdn/material/<commit>/) */\n' +
    'export const SYMBOLS = ' + JSON.stringify(Object.keys(paths).sort().join(' ')) + ';\n' +
    'export const NAMES = ' + JSON.stringify(named) + ';\n' +
    'export const LIBRARY = ' + JSON.stringify(library.join(' ')) + ';\n' +
    'export const LIBRARY_COMMIT = ' + JSON.stringify(String(M._commit).slice(0, 12)) + ';\n');
  // the asset layout of the Plenix set (#279, stage 1): platform/dist/icons/plenix/<name>.svg|.js and index.json, generated
  // and not committed; no consumer reads it yet (icon.css and glyphs.js above still draw every icon)
  const assets = layout.writeSet(root, 'plenix', path.join(root, 'platform', 'dist', 'icons', 'plenix'));
  return { symbols: symbols.length, names: names.length, bytes: Buffer.byteLength(css), assets };
};
