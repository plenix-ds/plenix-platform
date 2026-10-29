/* Plenix · Icon, StatusIcon
   Summary: One icon of the Plenix set, drawn as an inline SVG in the current text color (a name outside the set, from
     icons-all.css, as a mask). StatusIcon is a tone's icon in the
     tone's color (info, success, warning, danger, neutral), alone or with a short label.
   Usage:
     <Icon name="folder" />
     <Icon name="bookmark" size="sm" filled label="Bookmarked" />
     import Add from 'plenix-platform/icons/plenix/add';  <Icon icon={Add} />      // an imported icon module (#282)
     registerIcons(Add, Close);  <Icon name="add" />                               // a name drawn from its module first
     el.innerHTML = '<button>' + iconMarkup(Add) + 'Add</button>';                 // the same markup as a string (issue 557)
     <StatusIcon tone="warning" />
     <StatusIcon tone="success" size="sm">Synced</StatusIcon>
   Props:
     name: the naming contract (2026-10-22): a Plenix name, with dashes (platform/icons/map.json: mic-off, person-cancel);
       a Plenix name that is its Material symbol with dashes also answers to the underscore spelling (mic_off,
       person_cancel); with the CDN's icons-all.css on the page, any other Material Symbols name (rocket_launch) too. A
       Material name that is also a Plenix name draws the Plenix icon (check, home). Unknown names draw nothing
     size: "xs" 12px | "sm" 16px | "md" 20px | "lg" 24px | "xl" 48px, a page title (--plx-sys-icon-size-*); without it the icon takes its container's
       grid icon (a control's --plx-sys-control-icon-<role>) or --plx-sys-icon-size
     icon: an imported icon module (platform/icons/layout.js: icons/<set>/<name>.js; in an application,
       import X from 'plenix-platform/icons/<set>/<name>'): drawn from its own drawings instead of icon.css, with the same
       classes, so sizes, fills, the optical size and right-to-left mirroring work exactly as for name (issue 282)
     filled: the filled version (default false)
     label: the accessible name, when the icon alone carries meaning
     className: more classes on the icon
     StatusIcon.tone: "info" (default) | "success" | "warning" | "danger" | "neutral"; each has its own icon (neutral shares
       the info icon, in the neutral color)
     StatusIcon.size: "sm" (16px) | "md" (default; 20px) | "lg" (24px)
     StatusIcon.label: the accessible name of the icon alone (default: the tone's word from strings)
     StatusIcon.children: a short visible label after the icon; the icon is then decorative and the text says the state
     StatusIcon.strings: the tone words, for other languages: { info: "Information", success: "Success", warning: "Warning",
       danger: "Error", neutral: "Note" }
     StatusIcon.className: more classes on the status icon
     library: where a name is looked up (issue 281): "plenix" (default: registered modules, the Plenix set, then the
       Material library, as before), "material" (Material's own symbol even where a Plenix name exists), or a project's own
       library registered with registerIcons(..., { library }) (only its modules). setDefaultIconLibrary(name) sets the page's
       default: call it at startup, before icons draw (icons already on the page do not draw again)
     registerIcons(...modules[, { library }]): modules drawn first by their name and their symbol's spelling, in their
       set's library or the one named
     iconMarkup(icon[, { size, filled, label, className, library }]): the markup Icon renders, as an HTML string, from an
       imported module or a name with a registered module (no module: the span without a drawing, and a development
       warning); for code that writes HTML instead of the deprecated bare class plx-icon--<name>
     Every loaded icon file and every module drawing is untrusted (issue 285): it is read through the allow-list in
       utils/iconSafety.js (one svg, one path, values by grammar, bounded size), and anything else refuses it; development
       warns once with the reason. Nothing is ever inserted as HTML: the values become React props.
     A name drawn by a run-time fetch (a Material name not imported or registered) warns once in development: production
       should import or register it. An icon value that is not a module warns once per kind of value and draws nothing
   Behavior:
     The component that owns a current or selected state passes filled (NavList's current item and pinned pin, a
       selected or pressed Button); filled={false} keeps the outline (Tree owns each item state).
     Omitting filled: until every owner passes it, the filled version is still drawn inside a current or selected
       element (aria-current, aria-pressed, aria-selected, .is-selected, .is-current): the rollout backlog.
     The optical size follows the context: 24 in a Comfortable region and in a 24px container (the app header, a
       pictogram), and for sizes lg and xl; 20 everywhere else.
     A pinned item shows the filled pin, not a filled row.
     Without a label the icon is decorative and hidden from assistive technology; with one it is an image (role="img").
     StatusIcon alone is an image named by its tone (role="img", "Warning"), so the state never rests on color only; with a
       visible label the label carries the state and the icon is hidden from assistive technology.
   Notes:
     The set is Material Symbols Sharp, weight 300, used exactly as published (platform/icons/).
     The size names the icon's whole square, which includes the set's own padding (1/12 of the square on each side): the
       system adds none to make up for it.
     Other props pass through to the <span>. The drawings come from icon modules (issue 557): imported (the icon prop), or
     registered by name (registerIcons; a page's icon file, plenix-icons-<site>.js, or plenix-icons-plenix.js for every
     Plenix icon); a Plenix name with no module loads its files once from the asset layout beside the bundle (dist/icons/plenix/,
     or the CDN's /cdn/<version>/icons/plenix/), and development warns that production should register it. Never from the
     stylesheet. The outline or the filled version, at optical sizes 20 and 24, the stylesheet showing the one the context
     draws; inline paths paint about 200 times faster than masks (owner, 2026-10-23). Every icon that points along the reading
     direction is marked plx-icon--mirrored and mirrors in right to left.
     A bare class name (plx-icon plx-icon--<name>, no component) is deprecated (owner, issue 277 Q3): it still draws the mask from
       the stylesheet in this release, and development warns (dev/style-audit.js); iconMarkup(icon) writes the component's
       markup where a page builds HTML.
     StatusIcon's colors and sizes are its own tokens (--plx-comp-status-icon-*, components/Icon/status-icon.css); the label
       keeps the text color and size of where it sits.
*/
import React from 'react';
import { devWarn, development } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { SYMBOLS, NAMES, MIRRORED, LIBRARY, LIBRARY_COMMIT } from './glyphs.js';
import { checkIconSvg, checkDrawing, ICON_LIMITS } from '../../utils/iconSafety.js';
import AlertIcon from 'plenix-platform/icons/plenix/alert';
import CircleCheckIcon from 'plenix-platform/icons/plenix/circle-check';
import CircleInfoIcon from 'plenix-platform/icons/plenix/circle-info';
import WarningIcon from 'plenix-platform/icons/plenix/warning';
import { useStrings } from '../../providers/LocaleProvider.jsx';

// One way to draw an icon (owner, 2026-10-23: "no band-aid"): every name goes through resolveIcon, and every icon is an
// inline SVG in the text color (inline paths paint about 200 times faster than masks).
//   1. A registered or imported module: drawn at once from its own drawings.
//   2. A Plenix name (map.json, dashes; its underscore alias too) with no module: its files are loaded once from the
//      Plenix asset layout (platform/dist/icons/plenix beside the bundle, or the CDN's /cdn/<version>/icons/plenix/), and
//      development warns that production should import or register it (#557); the box stays empty while it loads.
//   3. Any other Material Symbols name, in dashes or underscores, any case (rocket_launch, Rocket-Launch): its files are
//      loaded once from the library (platform/icons/library beside the bundle, or the CDN's /cdn/material/<commit>/)
//      and drawn the same way.
//   4. An unknown name draws nothing (never a filled square) and warns once, with the closest names.
// The outline or the filled version, at optical sizes 20 and 24: the stylesheet shows the one the context draws (icon.css).
const LARGE = { lg: true, xl: true };
const VARIANT = ['', '-fill', '-24', '-24-fill'];   // outline 20, filled 20, outline 24, filled 24
const library = new Set(LIBRARY.split(' ')), plenix = new Set(SYMBOLS.split(' ')), mirroredSymbols = new Set(MIRRORED.split(' '));
// a Plenix symbol -> its Plenix name (the dashed spelling: the asset layout's file names; an alias has no file of its own)
const nameOfSymbol = new Map();
for (const n of Object.keys(NAMES)) if (!n.includes('_') && !nameOfSymbol.has(NAMES[n][0])) nameOfSymbol.set(NAMES[n][0], n);
// imported icon modules (#282): { name, set, symbol, fillOutline, mirrored, drawings: { 20: { outline, fill }, 24: … } }.
// The registry (#281): per library, a name (and its symbol's spelling) -> its module. registerIcons(...modules) puts each
// module in its own set's library ("plenix", "material"); registerIcons(...modules, { library: 'acme' }) makes a
// project's own library, which <Icon library="acme"> draws from only
const libraries = new Map();   // library -> Map(name -> module)
// a module is untrusted (#285): its four drawings pass the same allow-list as a file, once per module object
const checked = new WeakMap();
function moduleProblem(m) {
  if (!(m && typeof m === 'object' && m.drawings && m.drawings[20] && m.drawings[24] && m.name)) return 'not an icon module';
  if (checked.has(m)) return checked.get(m);
  let problem = null;
  // the problem is a message to developers (the console), not a word for people
  for (const size of [20, 24]) for (const k of ['outline', 'fill']) { const r = checkDrawing(m.drawings[size][k]); if (!r.ok && !problem) problem = ['its', size, k, 'drawing:', r.reason].join(' '); }
  checked.set(m, problem);
  return problem;
}
const isModule = (m) => !moduleProblem(m);
// for the components that take an icon (#280, stage 5a): an imported module counts as an icon as a name does
export const isIconModule = isModule;
// an icon slot's value as an element: a name or an imported module becomes an Icon (props: more Icon props); an element,
// null or anything else passes through
export function asIcon(i, props) {
  if (typeof i === 'string') return <Icon name={i} {...props} />;
  if (isModule(i)) return <Icon icon={i} {...props} />;
  return i;
}
// an icon slot's value as a key (a name, or a module's name): for the tables keyed by icon name (an open folder's icon)
export const iconKey = (i) => (typeof i === 'string' ? i : isModule(i) ? i.name : null);
export function registerIcons(...args) {
  const last = args[args.length - 1], options = last && typeof last === 'object' && !Array.isArray(last) && !isModule(last) && 'library' in last ? args.pop() : null;
  for (const m of args.flat()) {
    const problem = moduleProblem(m);
    if (problem) { if (typeof console !== 'undefined') console.warn('[Plenix] registerIcons: refused (' + problem + ')', m); continue; }
    const lib = (options && options.library) || m.set || 'plenix';
    if (!libraries.has(lib)) libraries.set(lib, new Map());
    const map = libraries.get(lib); map.set(m.name, m); if (m.symbol && m.symbol !== m.name) map.set(m.symbol, m);
  }
}
// the library an Icon without its own library prop draws from: "plenix" (the Plenix set, then the Material library, as
// before), "material", or a project's own registered library
let defaultLibrary = 'plenix';
// call it at startup, before icons draw: an icon already on the page does not draw again when it changes
export function setDefaultIconLibrary(name) { defaultLibrary = name ? String(name) : 'plenix'; }
// a module's drawing i (VARIANT order: outline 20, filled 20, outline 24, filled 24) as [path, viewBox, extra], the shape
// parseSvg gives, with the extras in the same order, so the markup is the same as from the stylesheet
const SLOT = [[20, 'outline'], [20, 'fill'], [24, 'outline'], [24, 'fill']];
function moduleGlyph(m, i) {
  const d = m.drawings[SLOT[i][0]] && m.drawings[SLOT[i][0]][SLOT[i][1]];
  if (!d || !d.d || !d.viewBox) return null;
  const extra = {}; for (const key of ['transform', 'fillRule', 'clipRule']) if (d[key]) extra[key] = d[key];
  return [d.d, d.viewBox, extra];
}
const normal = (name) => String(name == null ? '' : name).trim();
// One resolver (#281): the registered modules of the chosen library first; then, for "plenix", the Plenix set (its files
// in the asset layout) and the Material library; for "material", the Material library only (a Material name draws
// Material's own symbol even where a Plenix name exists); a project's library draws only its registered modules. A name
// that is not registered is fetched at run time (development warns once that production should import or register it).
// Returns { kind: 'module' | 'plenix' | 'library', symbol, fillOutline, file?, module? } or null; file is a Plenix
// name's file in the asset layout.
export function resolveIcon(name, options) {
  const n = normal(name), lib = (options && options.library) || defaultLibrary;
  const fromRegistry = (l) => { const map = libraries.get(l); const m = map && (map.get(n) || map.get(n.toLowerCase().replace(/_/g, '-')) || map.get(n.toLowerCase().replace(/-/g, '_'))); return m ? { kind: 'module', symbol: m.symbol || m.name, fillOutline: !!m.fillOutline, module: m } : null; };
  if (lib === 'material') {
    const reg = fromRegistry('material'); if (reg) return reg;
    const symbol = n.toLowerCase().replace(/-/g, '_');
    if (library.has(symbol)) return { kind: 'library', symbol, fillOutline: false };
    // Plenix's own drawings (platform/icons/custom) are not in the library: their files are in the Plenix layout
    return plenix.has(symbol) && nameOfSymbol.has(symbol) ? { kind: 'plenix', symbol, fillOutline: false, file: nameOfSymbol.get(symbol) } : null;
  }
  if (lib !== 'plenix') return fromRegistry(lib);
  // a registered Plenix module, then the Plenix set: a registered Material module never replaces a Plenix name (importing
  // material/home must not swap every <Icon name="home"> on the page); it serves only names outside the Plenix set
  const reg = fromRegistry('plenix'); if (reg) return reg;
  const p = resolvePlenix(n); if (p && p.kind === 'plenix') return p;
  return fromRegistry('material') || p;
}
// a Plenix name -> its symbol, its fill flag and its file in the Plenix asset layout (the name, dashed: an alias has no
// file of its own, so mic_off loads mic-off's files)
function resolvePlenix(n) {
  const named = (key) => ({ kind: 'plenix', symbol: NAMES[key][0], fillOutline: NAMES[key][1] === 1, file: key.includes('_') && NAMES[key.replace(/_/g, '-')] ? key.replace(/_/g, '-') : key });
  if (NAMES[n]) return named(n);
  const dashed = n.toLowerCase().replace(/_/g, '-');
  if (NAMES[dashed]) return named(dashed);
  const symbol = n.toLowerCase().replace(/-/g, '_');
  if (plenix.has(symbol) && nameOfSymbol.has(symbol)) return { kind: 'plenix', symbol, fillOutline: false, file: nameOfSymbol.get(symbol) };
  if (library.has(symbol)) return { kind: 'library', symbol, fillOutline: false };
  return null;
}
// where the library's files are: set by the page (setIconLibrary), else beside the bundle's script or stylesheet
let libraryBase = null, plenixBase;
export function setIconLibrary(url) { libraryBase = url ? String(url).replace(/\/?$/, '/') : null; files.clear(); }
// the Plenix bundle's own script or stylesheet on the page (its URL), or null
function bundleUrl() {
  if (typeof document === 'undefined') return null;
  return [...document.querySelectorAll('script[src], link[rel="stylesheet"][href]')].map((el) => el.src || el.href)
    .find((url) => /\/(plenix(\.esm|\.min)?\.(js|css)|platform\.(js|css))(\?|#|$)/.test(url)) || null;
}
function base() {
  if (libraryBase) return libraryBase;
  // a page (or an extension whose bundler renames the Plenix files) can name it before Plenix draws: window.PlenixIconLibrary
  if (typeof window !== 'undefined' && typeof window.PlenixIconLibrary === 'string' && window.PlenixIconLibrary) return (libraryBase = window.PlenixIconLibrary.replace(/\/?$/, '/'));
  const at = bundleUrl();
  if (!at) return null;
  // the CDN: /cdn/<version>/plenix.js -> /cdn/material/<commit>/; this repository: platform/... -> platform/icons/library/
  libraryBase = /\/cdn\/[^/]+\/[^/]+$/.test(new URL(at).pathname) ? new URL('../material/' + LIBRARY_COMMIT + '/', at).href
    : new URL(/\/dist\/[^/]+$/.test(new URL(at).pathname) ? '../icons/library/' : 'icons/library/', at).href;
  return libraryBase;
}
// where the Plenix set's files are (the asset layout, #279): icons/plenix/ beside plenix.js or plenix.css (the CDN's
// /cdn/<version>/, a self-hosted archive) and beside dist/platform.js; platform/dist/icons/plenix/ from platform.css
function plenixFiles() {
  if (plenixBase !== undefined) return plenixBase;
  const at = bundleUrl();
  if (!at) return null;   // not kept: the bundle's tag may not be on the page yet
  plenixBase = new URL(/\/platform\.css(\?|#|$)/.test(at) ? 'dist/icons/plenix/' : 'icons/plenix/', at).href;
  return plenixBase;
}
// an icon file -> [path, viewBox, { transform, fillRule, clipRule }]: its one path, in its viewBox (or its width and height)
// an icon file -> [path, viewBox, { transform, fillRule, clipRule }], through the allow-list (#285: a loaded file is
// untrusted; utils/iconSafety.js): anything else in the file refuses it, and development warns once with the reason
const refused = new Set();
function parseSvg(svg, from) {
  if (!svg) return null;
  const r = checkIconSvg(svg);
  if (!r.ok) {
    const key = (from || 'an icon file') + ': ' + r.reason;
    if (!refused.has(key) && development() && typeof console !== 'undefined') { refused.add(key); console.warn('[Plenix] Icon: refused ' + key); }
    return null;
  }
  const { viewBox, d, ...extra } = r.drawing;
  return [d, viewBox, extra];
}
// a fetched file is read only up to the size limit (issue 285): a Content-Length over it is refused before reading, and a
// body without one is read in chunks and dropped as soon as it passes the limit
function readCapped(response) {
  const max = ICON_LIMITS.file, length = Number(response.headers && response.headers.get && response.headers.get('content-length'));
  if (length > max) return null;
  if (!response.body || typeof response.body.getReader !== 'function') return response.text().then((t) => (t.length > max ? null : t));
  const reader = response.body.getReader(), parts = [];
  let size = 0;
  const step = () => reader.read().then(({ done, value }) => {
    if (done) return new TextDecoder().decode(parts.length === 1 ? parts[0] : parts.reduce((all, p) => { const out = new Uint8Array(all.length + p.length); out.set(all); out.set(p, all.length); return out; }, new Uint8Array(0)));
    size += value.length;
    if (size > max) { reader.cancel(); return null; }
    parts.push(value);
    return step();
  });
  return step();
}
// key -> [path, viewBox, extra] | null (missing) | a Promise while it loads. Keys: a library file (rocket_launch-24), or
// "plenix:" and a Plenix layout file (plenix:chevron-right-24)
const files = new Map();
const PLENIX_FILE = 'plenix:';
function loadFile(key) {
  if (files.has(key)) return files.get(key);
  const fromPlenix = key.startsWith(PLENIX_FILE), file = fromPlenix ? key.slice(PLENIX_FILE.length) : key, root = fromPlenix ? plenixFiles() : base();
  const job = !root || typeof fetch !== 'function' ? Promise.resolve(null) : fetch(root + file + '.svg').then((r) => (r.ok ? readCapped(r) : null))
    .then((text) => parseSvg(text, file + '.svg')).catch(() => null).then((glyph) => { files.set(key, glyph); return glyph; });
  files.set(key, job);
  return job;
}
const warned = new Set();
function warnUnknown(name) {
  const n = normal(name);
  if (!n || warned.has(n)) return;
  warned.add(n);
  const key = n.toLowerCase().replace(/[-_\s]+/g, '');
  const near = [...Object.keys(NAMES), ...library].filter((c) => { const k = c.replace(/[-_]/g, ''); return k.includes(key) || key.includes(k); }).slice(0, 6);
  if (typeof console !== 'undefined') console.warn('[Plenix] Icon: no icon is named "' + n + '"; nothing is drawn.' + (near.length ? ' Closest: ' + near.join(', ') + '.' : ''));
}
// a name drawn by a run-time fetch: development warns once that production should import or register it
const fetchedNotice = new Set();
function noticeFetch(found) {
  const key = found.kind + ':' + (found.file || found.symbol);
  if (fetchedNotice.has(key) || !development() || typeof console === 'undefined') return;
  fetchedNotice.add(key);
  console.warn('[Plenix] Icon: ' + (found.file || found.symbol) + ' was fetched at run time; for production ' + (found.kind === 'plenix'
    ? 'load an icon file after plenix.js (plenix-icons-<site>.js from tools/icons/site-icons.js, or plenix-icons-plenix.js), import it (plenix-platform/icons/plenix/' + found.file + ') or register it (registerIcons).'
    : 'import it (plenix-platform/icons/material/' + found.symbol.replace(/_/g, '-') + ') or register it (registerIcons).'));
}
function useDrawings(name, size, filled, mod, lib) {
  const resolved = mod ? { kind: 'module', symbol: mod.symbol || mod.name, fillOutline: !!mod.fillOutline, module: mod } : resolveIcon(name, { library: lib });
  const found = resolved;
  if (found && found.kind === 'module') mod = found.module;
  const fill = filled === true || (found && found.fillOutline);
  const wanted = LARGE[size] ? [[fill ? 3 : 2, 24]] : [[fill ? 1 : 0, 20], [fill ? 3 : 2, 24]];
  const fetched = found && (found.kind === 'library' || found.kind === 'plenix');
  // a fetched drawing's key: the library's file (symbol), or the Plenix layout's file (the Plenix name)
  const fileOf = (i) => (found.kind === 'plenix' ? PLENIX_FILE + found.file : found.symbol) + VARIANT[i];
  const [, redraw] = React.useReducer((x) => x + 1, 0);
  const pending = fetched ? wanted.filter(([i]) => !Array.isArray(files.get(fileOf(i))) && files.get(fileOf(i)) !== null) : [];
  React.useEffect(() => {
    if (!found) { warnUnknown(name); return undefined; }
    if (fetched) noticeFetch(found);
    if (!pending.length) return undefined;
    let live = true;
    Promise.all(pending.map(([i]) => loadFile(fileOf(i)))).then(() => { if (live) redraw(); });
    return () => { live = false; };
  }, [found && found.kind, found && (found.file || found.symbol), fill, LARGE[size] ? 1 : 0, pending.length]);
  if (!found) return [];
  const glyphs = wanted.map(([i, optical]) => [found.kind === 'module' ? moduleGlyph(mod, i) : files.get(fileOf(i)), optical]).filter(([glyph]) => Array.isArray(glyph));
  if (!glyphs.length) return [];
  // the drawings share one svg when they share a box (nearly every icon): the stylesheet shows one path; otherwise each
  // drawing is its own svg in its own box
  if (glyphs.every(([glyph]) => glyph[1] === glyphs[0][0][1]))
    return [<svg key="svg" className="plx-icon__svg plx-icon__svg--shared" viewBox={glyphs[0][0][1]} aria-hidden="true" focusable="false">{glyphs.map(([glyph, optical]) => <path key={optical} className={'plx-icon__glyph--' + optical} d={glyph[0]} {...(glyph[2] || null)} />)}</svg>];
  return glyphs.map(([glyph, optical]) => <svg key={optical} className={'plx-icon__svg plx-icon__glyph--' + optical} viewBox={glyph[1]} aria-hidden="true" focusable="false"><path d={glyph[0]} {...(glyph[2] || null)} /></svg>);
}

const badIcon = new Set();
export function Icon({ icon, name, library: lib, size, filled, label, className, ...rest }) {
  if (icon == null && name != null && typeof name === 'object' && isModule(name)) { icon = name; name = undefined; }   // a module given as the name
  devWarn('Icon', { size }, { size: ['xs','sm','md','lg','xl'] });
  // an imported module (icon); else the name through the resolver (registered modules, the Plenix files, the library)
  // once per kind of bad value (its type and keys), so an object written inline, new on every render, warns once
  const badKey = icon != null && !isModule(icon) ? Object.prototype.toString.call(icon) + ':' + (typeof icon === 'object' ? Object.keys(icon).sort().join(',') : String(icon)) : null;
  if (badKey && !badIcon.has(badKey)) { badIcon.add(badKey); if (typeof console !== 'undefined') console.warn('[Plenix] Icon: icon is refused (' + moduleProblem(icon) + '; import it from plenix-platform/icons/<set>/<name>); nothing is drawn.', icon); }
  const shown = isModule(icon) ? icon.name : name;
  const svg = useDrawings(shown, size, filled, isModule(icon) ? icon : null, lib);
  return (
    <span className={iconClasses(shown, isModule(icon) ? icon : null, lib, size, filled, className)}
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest}>{svg}</span>
  );
}
// the classes of an Icon's span. Every icon that points along the reading direction is marked plx-icon--mirrored, which
// icon.css mirrors in right to left (#557): a module by its mirrored flag, a name by its symbol (glyphs.js MIRRORED)
function iconClasses(shown, mod, lib, size, filled, className) {
  const f = mod ? null : resolveIcon(shown, { library: lib });
  const m = mod || (f && f.kind === 'module' ? f.module : null);
  const mirrored = m ? !!m.mirrored : !!(f && mirroredSymbols.has(f.symbol));
  return cx('plx-icon', 'plx-icon--' + normal(shown), size ? 'plx-icon--size-' + size : null, filled === true && 'plx-icon--filled', filled === false && 'plx-icon--outline', 'plx-icon--inline', mirrored && 'plx-icon--mirrored', className);
}

// iconMarkup(icon, { size, filled, label, className }): the markup <Icon> renders, as a string, for code that writes HTML
// (a server-rendered page, a lab that builds an HTML string) instead of the deprecated bare class (plx-icon--<name>, #557).
// icon: an imported module, or a name with a registered module (an icon file on the page, registerIcons). The drawing
// comes only from the module, through the allow-list (#285: numbers and path grammar only), and every value is escaped;
// a name with no module gives the span without a drawing, and development warns once.
const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPE[c]);
const markupMissing = new Set();
export function iconMarkup(icon, options) {
  const o = options || {}, size = LARGE[o.size] || ['xs', 'sm', 'md'].includes(o.size) ? o.size : undefined;
  const given = isModule(icon) ? icon : null, shown = given ? icon.name : normal(icon);
  const f = given ? null : resolveIcon(shown, { library: o.library });
  const mod = given || (f && f.kind === 'module' ? f.module : null);
  let svg = '';
  if (mod && !moduleProblem(mod)) {
    const fill = o.filled === true || !!mod.fillOutline;
    const wanted = LARGE[size] ? [[fill ? 3 : 2, 24]] : [[fill ? 1 : 0, 20], [fill ? 3 : 2, 24]];
    const glyphs = wanted.map(([i, optical]) => [moduleGlyph(mod, i), optical]).filter(([g]) => Array.isArray(g));
    const attrs = (g) => ' d="' + esc(g[0]) + '"' + (g[2].transform ? ' transform="' + esc(g[2].transform) + '"' : '') + (g[2].fillRule ? ' fill-rule="' + esc(g[2].fillRule) + '"' : '') + (g[2].clipRule ? ' clip-rule="' + esc(g[2].clipRule) + '"' : '');
    if (glyphs.length && glyphs.every(([g]) => g[1] === glyphs[0][0][1]))
      svg = '<svg class="plx-icon__svg plx-icon__svg--shared" viewBox="' + esc(glyphs[0][0][1]) + '" aria-hidden="true" focusable="false">' + glyphs.map(([g, optical]) => '<path class="plx-icon__glyph--' + optical + '"' + attrs(g) + '></path>').join('') + '</svg>';
    else svg = glyphs.map(([g, optical]) => '<svg class="plx-icon__svg plx-icon__glyph--' + optical + '" viewBox="' + esc(g[1]) + '" aria-hidden="true" focusable="false"><path' + attrs(g) + '></path></svg>').join('');
  } else if (!markupMissing.has(shown) && development() && typeof console !== 'undefined') {
    markupMissing.add(shown);
    console.warn('[Plenix] iconMarkup: "' + shown + '" has no module (import it, or load an icon file before this runs); its span is written without a drawing.');
  }
  const classes = iconClasses(shown, mod, o.library, size, o.filled, o.className).split(' ').map((c) => c.replace(/[^A-Za-z0-9_-]/g, '')).filter(Boolean).join(' ');
  // as Icon: with a label (the caller's words) an image, without one decorative
  const named = o.label ? { role: 'img', 'aria-label': o.label } : { 'aria-hidden': 'true' };
  return '<span class="' + esc(classes) + '"' + Object.keys(named).map((k) => ' ' + k + '="' + esc(named[k]) + '"').join('') + '>' + svg + '</span>';
}

// stateIcon: an icon a component draws in its own state: filled while the state is on, the outline otherwise (Styling
// Standard 3.6: the component that owns the state passes it; no rule reaches in from the ancestor). A string is an icon
// name or an imported module; an Icon element the caller gives keeps a fill it sets itself; anything else passes through. extra: more props for
// the Icon (a size), given only where the caller set none.
export function stateIcon(icon, on, extra) {
  if (typeof icon === 'string') return <Icon name={icon} filled={!!on} {...extra} />;
  if (isModule(icon)) return <Icon icon={icon} filled={!!on} {...extra} />;
  if (React.isValidElement(icon) && icon.type === Icon) {
    const add = {};
    if (icon.props.filled === undefined) add.filled = !!on;
    for (const k of Object.keys(extra || {})) if (icon.props[k] === undefined) add[k] = extra[k];
    return Object.keys(add).length ? React.cloneElement(icon, add) : icon;
  }
  return icon;
}

// StatusIcon: a tone's icon in the tone's color, alone (an image named by the tone) or before a short visible label
const STATUS_ICONS = { info: CircleInfoIcon, success: CircleCheckIcon, warning: WarningIcon, danger: AlertIcon, neutral: CircleInfoIcon };   // imported (#280)
export function StatusIcon({ tone = 'info', size = 'md', label, children, strings, className, ...rest }) {
  devWarn('StatusIcon', { tone, size }, { tone: ['info','success','warning','danger','neutral'], size: ['sm','md','lg'] });
  const t = STATUS_ICONS[tone] ? tone : 'info';
  const words = useStrings('icon.status', strings);
  const shown = children !== undefined && children !== null && children !== false;
  return (
    <span className={cx('plx-status-icon', 'plx-status-icon--' + t, 'plx-status-icon--' + size, className)} {...rest}>
      <span className={cx('plx-status-icon__glyph', 'plx-status-icon__glyph--' + t)}><Icon name={STATUS_ICONS[t]} size={size} label={shown ? undefined : (label || words[t])} /></span>
      {shown ? <span className="plx-status-icon__label">{children}</span> : null}
    </span>
  );
}
