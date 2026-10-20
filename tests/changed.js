// Plenix tests · what changed, and what each browser test loads for it (owner, 2026-10-13: during work and for releases only
// the checks for what changed run; the full suite runs only when everything is marked complete, the manual final gate,
// .github/workflows/full.yml). The changes: git diff from CHANGED_BASE (default HEAD~1; in CI the push's before-SHA) to the
// working tree, untracked files included, and the design-system submodule's own diff between its recorded commits. Mapped:
//   an app folder (dashboard, projects, settings, dam, …)     → that app's pages; suite/ → the first page of every app
//   a design-system record, docs entry, guidance, part or lab  → only those records' pages and labs (the record ids the diff
//                                                                hunks fall in; a part's stylesheet → its part's records)
//   a Platform component or pattern (its folder, its export, its stylesheet import, its component tokens, by key)
//                                                              → the app pages that use it (their plenix-platform imports and
//                                                                plx- classes, through the Platform's own imports) and its
//                                                                design-system pages and labs
//   global files (platform.css's foundations, system/, the semantic and reference tokens, providers, vendor, fonts, icons,
//   dev/, tests/lib.js, this file, the builders)               → a small fixed slice: each app's first page, the first two
//                                                                records of each design-system section, every 40th lab
//   a test's own file or baseline                              → that test on the slice
//   nothing relevant                                           → each test prints its OK line with 0 and exits 0
//   TEST_SCOPE=changed (default) | full     full: every page, as before
//   CHANGED_BASE=<commit>                   what to compare with (default HEAD~1)
//   TEST_SHARD=<i>/<n>                      only the i-th of n parts of the pages, routes and labs (the full gate's matrix)
//   node tests/changed.js                   print the scope
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DS_DIR = 'platform/design-system';
const DS = path.join(ROOT, DS_DIR);
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'dam'];
const FULL = process.env.TEST_SCOPE === 'full';
const SHARD = /^(\d+)\/(\d+)$/.exec(process.env.TEST_SHARD || '') ? process.env.TEST_SHARD.split('/').map(Number) : null;
const TEST = path.basename(process.argv[1] || '').replace(/\.test\.js$/, '').replace(/\.js$/, '');
// baselines named for another test
const BASELINE_OF = { button: 'visual' };
// a record set this large is a broad change: the slice stands for it
const BROAD = 40;

const git = (dir, args) => { try { return execFileSync('git', ['-C', dir].concat(args), { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 28 }); } catch (e) { return null; } };
const commit = (dir, ref) => { const r = git(dir, ['rev-parse', '--verify', '--quiet', ref + '^{commit}']); return r ? r.trim() : null; };
const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch (e) { return ''; } };
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');   // DS.slug (ds.js)
const walk = (dir, test, out = []) => { if (!fs.existsSync(dir)) return out; for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'dist') walk(p, test, out); } else if (test(e.name)) out.push(p); } return out; };
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

// ---- the changed files, and their diff hunks
function changes() {
  const note = [];
  const asked = process.env.CHANGED_BASE;
  let base = asked && !/^0+$/.test(asked) ? commit(ROOT, asked) : null;
  if (asked && !base) {
    // a new branch (a before-SHA of zeros) or a commit this clone lacks: where the branch left main, else the previous commit
    const mb = (git(ROOT, ['merge-base', 'HEAD', 'origin/main']) || '').trim();
    base = mb && mb !== commit(ROOT, 'HEAD') ? mb : commit(ROOT, 'HEAD~1');
    note.push('CHANGED_BASE ' + asked.slice(0, 9) + ' is not usable: compared with ' + (base || '(none)').slice(0, 9));
  }
  if (!asked) base = commit(ROOT, 'HEAD~1');
  if (!base) return { base: null, files: [], note: note.concat('no base commit: the slice runs') };
  const files = new Map();   // repo path -> { dir, base, path in its repository }
  const list = (dir, b, prefix, skip) => {
    const out = (git(dir, ['diff', '--name-only', '--no-renames', b]) || '') + (git(dir, ['ls-files', '--others', '--exclude-standard']) || '');
    out.split('\n').map((x) => x.trim()).filter(Boolean).forEach((f) => { if (f !== skip) files.set(prefix + f, { dir, base: b, file: f }); });
  };
  list(ROOT, base, '', DS_DIR);
  if (fs.existsSync(path.join(DS, 'index.html'))) {
    const was = ((git(ROOT, ['ls-tree', base, DS_DIR]) || '').match(/[0-9a-f]{40}/) || [])[0];
    let old = was && commit(DS, was);
    if (was && !old) { git(DS, ['fetch', '--quiet', '--depth=1', 'origin', was]); old = commit(DS, was); }
    if (old) list(DS, old, DS_DIR + '/');
    else { note.push('the design system\'s earlier commit ' + (was || '(none)').slice(0, 7) + ' is not here: its slice runs'); files.set(DS_DIR + '/(unknown)', null); }
  }
  return { base, files, note };
}
// the lines a file's hunks touch: { changed: [line text], at: [line numbers in the new file] }
function hunks(c) {
  const d = git(c.dir, ['diff', '-U0', '--no-renames', c.base, '--', c.file]);
  if (d === null || d === '') return null;   // untracked, or no textual diff: the whole file
  const out = { changed: [], at: [] };
  d.split('\n').forEach((l) => {
    const m = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(l); if (m) { out.at.push(+m[1]); return; }
    if (/^[+-](?![+-]{2} )/.test(l)) out.changed.push(l.slice(1));
  });
  return out;
}
const oldText = (c) => git(c.dir, ['show', c.base + ':' + c.file]) || '';

// ---- the Platform: its units (a component or pattern folder, a hook or utility file), exports, imports and records
const unitOf = (p) => { const m = /^(components|patterns)\/([^/]+)\//.exec(p) || /^((?:hooks|utils)\/[^/]+)$/.exec(p); return m ? (m[2] ? m[1] + '/' + m[2] : m[1]) : null; };
function platform() {
  const P = path.join(ROOT, 'platform');
  const exportsOf = {};   // export name -> unit
  for (const f of [path.join(P, 'index.js')].concat(walk(path.join(P, 'exports'), (n) => /\.js$/.test(n)))) {
    for (const m of read(f).matchAll(/export\s*\{([^}]*)\}\s*from\s*'([^']+)'/g)) {
      const u = unitOf(path.posix.normalize(path.posix.join(rel(path.dirname(f)).replace(/^platform\/?/, ''), m[2])));
      if (u) m[1].split(',').map((x) => x.trim().split(/\s+as\s+/).pop()).filter(Boolean).forEach((n) => { exportsOf[n] = u; });
    }
  }
  const users = {};   // unit -> units that import it
  for (const f of walk(P, (n) => /\.jsx?$/.test(n)).filter((f) => /^platform\/(components|patterns|hooks|utils|providers)\//.test(rel(f)))) {
    const from = unitOf(rel(f).replace(/^platform\//, '')); if (!from) continue;
    for (const m of read(f).matchAll(/(?:from|import)\s*'(\.{1,2}\/[^']+)'/g)) {
      const to = unitOf(path.posix.normalize(path.posix.join(rel(path.dirname(f)).replace(/^platform\//, ''), m[1])));
      if (to && to !== from) (users[to] = users[to] || new Set()).add(from);
    }
  }
  const units = new Set(Object.values(exportsOf).concat(['components', 'patterns'].flatMap((d) => fs.existsSync(path.join(P, d)) ? fs.readdirSync(path.join(P, d)).map((x) => d + '/' + x) : [])));
  // the apps that use each unit: their plenix-platform imports and the unit's plx- class in their sources (suite/ is shared by every suite app)
  const appsOf = {};
  for (const app of APPS.concat('suite')) {
    const text = walk(path.join(ROOT, app), (n) => /\.(jsx|html)$/.test(n)).map(read).join('\n');
    const who = app === 'suite' ? APPS.filter((a) => a !== 'dam') : [app];
    const add = (u) => { appsOf[u] = appsOf[u] || new Set(); who.forEach((a) => appsOf[u].add(a)); };
    for (const m of text.matchAll(/import\s*\{([^}]*)\}\s*from\s*'plenix-platform'/g)) m[1].split(',').map((x) => x.trim().split(/\s+as\s+/)[0]).filter(Boolean).forEach((n) => { if (exportsOf[n]) add(exportsOf[n]); });
    units.forEach((u) => { const k = /^(components|patterns)\/(.+)$/.exec(u); if (k && new RegExp('plx-' + kebab(k[2]) + '(?![\\w-])').test(text)) add(u); });
  }
  return { exportsOf, users, units: [...units], appsOf };
}
// the starts of a design-system file's sections, by the kind of file: a record (its id where it is written, else its
// section and leaf), a lab, a docs entry (a record id, at the file's top indent), a guidance entry (its route)
const kindOf = (p) => (/(\.labs|-labs?)\.js$/.test(p) ? 'lab' : /(\.docs|inventory-docs)\.js$/.test(p) ? 'docs' : /inventory-guidance\.js$/.test(p) ? 'guidance' : 'record');
const DOCS_KEY = /^( *)["']([\w-]+)["']: \{/;
const docsIndent = (text) => Math.min(...text.split('\n').map((l) => DOCS_KEY.exec(l)).filter(Boolean).map((m) => m[1].length), 99);
function starts(line, kind, indent) {
  let m;
  if (kind === 'record') {
    const id = /^ {0,6}\{ id: '([\w-]+)'/.exec(line), leaf = /\bsec: '([\w-]+)'.*?\bleaf: '([^']+)'/.exec(line);
    return id || leaf ? { id: id && id[1], leaf: leaf && leaf[1] + '|' + leaf[2] } : null;
  }
  if (kind === 'lab' && (m = /registerLab\('([\w-]+)'/.exec(line))) return { id: m[1] };
  if (kind === 'docs' && (m = DOCS_KEY.exec(line)) && m[1].length === indent) return { id: m[2] };
  if (kind === 'guidance' && (m = /^ ?"([\w-]+)\|([^"]+)": \{/.exec(line))) return { route: '#/' + m[1] + '/leaf-' + m[1] + '-' + slug(m[2]) };
  return null;
}

// ---- the scope
function compute() {
  const s = { full: FULL, base: null, files: [], note: [], apps: new Set(), appSlice: false, ds: new Set(), leaves: new Set(), dsRoutes: new Set(), dsSlice: false,
    units: new Set(), direct: [], around: [], names: {}, tests: new Set(), why: [] };
  if (FULL) return s;
  const { base, files, note } = changes();
  s.base = base; s.note = note; s.files = [...files.keys()].sort();
  if (!base) { s.appSlice = s.dsSlice = true; return s; }
  const why = (f, what) => s.why.push(f + ' → ' + what);
  const globalFile = (f) => { s.appSlice = s.dsSlice = true; why(f, 'the slice'); };
  const DERIVED = /^(platform\/dist\/|platform\/system\/tokens\/|platform\/system\/themes\/|platform\/providers\/themes\.js$|platform\/tokens\/tokens\.index\.json$|platform\/components\/Icon\/icon\.css$|platform\/design-system\/(usage|spec-parts)\.js$|platform\/exports\/index\.|(dashboard|projects|messages|contacts|calendar|tasks|notes|bookmarks|files|settings)\/app\.js$|dam\/app\/assets\.js$)/;
  // lanes/<task>/design-system/: a task branch's design-system files, counted where tools/agent/lane-overlay.js copies them
  const IGNORED = /(\.md$|^docs\/|^lanes\/|^\.github\/|^\.gitignore$|^\.gitmodules$|^check-system\.js$|^check-system\.rules\/|^check-spec\.js$|^deploy\.sh$|^tokenize-component\.js$|^build-(docs|packages|exports|mobile|native-guidance|platforms|types|brand|spec-parts|steps)\.js$|^services\/(?!login\/|save\/)|^tests\/(compare|pixels|style-compare|a11y-report|data-grid-reference|run)\.js$|^platform\/mobile\/|^platform\/design-system\/(native\/.*\.png|.*\.md)$)/;
  const GLOBAL = /^(platform\/(platform\.css|plenix-system\.css|system\/|tokens\/|providers\/|vendor\/|fonts\/|icons\/|dev\/|standards\/|utils\/cx\.js)|tests\/(lib|changed|limit)\.js$|build-(app|tokens|standards|usage|icons)\.js$|package-lock\.json$)/;
  const real = s.files.filter((f) => !DERIVED.test(f));
  const list = real.length ? real : s.files;   // only generated files changed (a rebuild): treat them as sources
  let P = null; const plat = () => (P = P || platform());
  const unit = (u, f) => { s.units.add(u); why(f, u); };
  const dsFile = (f) => {
    const c = files.get(f); const p = f.slice(DS_DIR.length + 1);
    if (!c) { s.dsSlice = true; why(f, 'the design-system slice'); return; }
    const textOf = (file) => read(path.join(DS, file)) || oldText({ dir: DS, base: c.base, file });
    const sections = (text, kind) => { const ind = docsIndent(text); return text.split('\n').map((l) => starts(l, kind, ind)).filter(Boolean); };
    const add = (st) => { if (st.id) s.ds.add(st.id); if (st.leaf) s.leaves.add(st.leaf); if (st.route) s.dsRoutes.add(st.route); };
    const whole = (file) => sections(textOf(file), kindOf(file));
    const ofPart = (w) => ['records', 'labs', 'docs'].flatMap((k) => whole('parts/' + w + '.' + k + '.js'));
    // a part's stylesheet: its part's records and labs; a lab's stylesheet: its lab
    const part = /^parts\/(w\w+?)\./.exec(p);
    let found = [];
    if (/\.css$/.test(p)) {
      if (part) found = ofPart(part[1]);
      else if (fs.existsSync(path.join(DS, p.replace(/\.css$/, '.js'))) && /-labs?\.css$/.test(p)) found = whole(p.replace(/\.css$/, '.js'));
    } else if (/^(inventory|inventory-docs|inventory-guidance)\.js$|^parts\/.*\.js$|-labs?\.js$/.test(p)) {
      const h = hunks(c);
      if (!h) found = whole(p);
      else {
        const kind = kindOf(p), text = textOf(p), ind = docsIndent(text), lines = text.split('\n');
        h.changed.forEach((l) => { const st = starts(l, kind, ind); if (st) found.push(st); });
        // each hunk: the section it falls in (the nearest start above it)
        h.at.forEach((n) => { for (let i = Math.min(n, lines.length) - 1; i >= 0; i--) { const st = starts(lines[i], kind, ind); if (st) { found.push(st); break; } } });
        if (!found.length && part) found = ofPart(part[1]);
      }
    }
    if (!found.length) { s.dsSlice = true; why(f, 'the design-system slice'); return; }
    found.forEach(add);
    const names = [...new Set(found.map((x) => x.id || x.leaf || x.route))];
    why(f, names.slice(0, 8).join(', ') + (names.length > 8 ? ', … (' + names.length + ')' : ''));
  };
  // component tokens in the shared token files: the units whose kebab name begins the changed keys
  const tokenKeys = (f) => {
    const c = files.get(f); const now = (() => { try { return JSON.parse(read(path.join(ROOT, f)) || '{}'); } catch (e) { return null; } })();
    const was = (() => { try { return JSON.parse(oldText(c) || '{}'); } catch (e) { return null; } })();
    if (!now || !was) return false;
    const a = Object.assign({}, was['plx-comp']), b = Object.assign({}, now['plx-comp']);
    const keys = [...new Set(Object.keys(a).concat(Object.keys(b)))].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
    const rest = JSON.stringify(Object.assign({}, was, { 'plx-comp': 0 })) !== JSON.stringify(Object.assign({}, now, { 'plx-comp': 0 }));
    if (rest) return false;
    const byName = plat().units.filter((u) => /^(components|patterns)\//.test(u)).map((u) => [kebab(u.split('/')[1]), u]).sort((x, y) => y[0].length - x[0].length);
    const hits = keys.map((k) => byName.find(([n]) => k === n || k.indexOf(n + '-') === 0));
    if (!hits.every(Boolean)) return false;
    [...new Set(hits.map((x) => x[1]))].forEach((u) => unit(u, f));
    return true;
  };
  for (const f of list) {
    const top = f.split('/')[0];
    const t = /^tests\/(?:baselines\/)?([\w-]+?)(?:\.test)?\.js(?:on)?$/.exec(f);
    if (t && fs.existsSync(path.join(__dirname, (BASELINE_OF[t[1]] || t[1]) + '.test.js'))) { s.tests.add(BASELINE_OF[t[1]] || t[1]); why(f, 'its test on the slice'); continue; }
    if (IGNORED.test(f)) continue;
    if (f === 'package.json') { const h = hunks(files.get(f)); if (h && h.changed.every((l) => /^\s*"version":/.test(l))) continue; globalFile(f); continue; }
    if (f.indexOf(DS_DIR + '/') === 0) { dsFile(f); continue; }
    if (APPS.includes(top)) { s.apps.add(top); why(f, top); continue; }
    if (top === 'suite') { s.appSlice = true; why(f, 'the first page of every app'); continue; }
    if (top === 'capabilities') { s.apps.add('settings'); why(f, 'settings'); continue; }
    if (/^services\/(login|save)\//.test(f)) { unit('services/login', f); continue; }
    if (/^platform\/brand\//.test(f)) { unit('brand', f); continue; }
    const pf = f.replace(/^platform\//, '');
    if (/^platform\/tokens\/components\/[\w-]+\.tokens\.json$/.test(f)) {
      const k = path.basename(f).replace(/\.tokens\.json$/, ''); const u = plat().units.find((x) => /^(components|patterns)\//.test(x) && kebab(x.split('/')[1]) === k);
      if (u) { unit(u, f); continue; }
    }
    if (/^platform\/tokens\/components[\w.-]*\.tokens\.json$/.test(f) && tokenKeys(f)) continue;
    // the stylesheet list and the export lists: the units of the lines that changed
    if (/^platform\/(platform\.css|index\.js|exports\/[\w-]+\.(js|css))$/.test(f)) {
      const h = hunks(files.get(f)); const lines = h ? h.changed : read(path.join(ROOT, f)).split('\n');
      const dir = path.posix.dirname(pf);
      const hit = lines.map((l) => /(?:from\s*|@import url\()["']([^"']+)["']/.exec(l)).filter(Boolean).map((m) => unitOf(path.posix.normalize(path.posix.join(dir, m[1]))));
      const other = lines.filter((l) => l.trim() && !/^\s*(\/\/|\/\*|\*)/.test(l) && !/(?:from\s*|@import url\()["']/.test(l));
      if (hit.length && hit.every(Boolean) && !other.length) { hit.forEach((u) => unit(u, f)); continue; }
      if (!hit.length && !other.length) continue;   // comments only
      globalFile(f); continue;
    }
    const u = /^platform\//.test(f) && unitOf(pf);
    if (u && !GLOBAL.test(f)) { unit(u, f); continue; }
    if (GLOBAL.test(f)) { globalFile(f); continue; }
    globalFile(f);   // not known: the slice, to be safe
  }
  // the units' effects: the apps that use them or anything built on them; their design-system records are matched in the
  // page, from the live inventory (routesIn, labsIn)
  const direct = [...s.units].filter((u) => /^(components|patterns|hooks|utils)\//.test(u));
  if (direct.length) {
    const { users, appsOf, exportsOf } = plat();
    const all = new Set(direct); const queue = direct.slice();
    while (queue.length) { const u = queue.shift(); (users[u] || []).forEach((v) => { if (!all.has(v)) { all.add(v); queue.push(v); } }); }
    all.forEach((u) => (appsOf[u] || []).forEach((a) => s.apps.add(a)));
    s.direct = direct; s.around = [...all].filter((u) => direct.indexOf(u) < 0); s.names = exportsOf;
    if (s.around.length) s.why.push(direct.join(', ') + ' → built on by ' + s.around.length + ' more units (' + s.around.slice(0, 6).join(', ') + (s.around.length > 6 ? ', …' : '') + ')');
  }
  return s;
}

let S = null;
const scope = () => (S = S || compute());
const shard = (list) => (SHARD ? list.filter((x, i) => i % SHARD[1] === SHARD[0] - 1) : list);
const appOf = (p) => p.split('/')[0];
const routeId = (r) => (r.split('/')[2] || '');
const own = (test) => scope().tests.has(test || TEST);
const dsSlice = (test) => { const s = scope(); return s.dsSlice || s.appSlice || own(test); };
// the records in scope, from the page's inventory: the ids, sections and leaves the diff names, and the records of the
// units that changed (their src, also and css files, or the Platform names they document); a record set only reached
// through what is built on a unit, larger than BROAD, stands for a broad change: the slice
let MATCH = null;
async function matched(page) {
  if (MATCH) return MATCH;
  const s = scope();
  const meta = await page.evaluate(() => (window.DSInventory || []).map((r) => ({ id: r.id, key: r.sec + '|' + r.leaf,
    files: [].concat(r.src || [], r.also || [], r.css || []).filter((x) => typeof x === 'string'), names: [].concat(r.plenix || []).join(',').split(/[,\s]+/).filter(Boolean) })));
  const touches = (r, units) => units.length > 0 && (r.files.some((p) => units.some((u) => p === u || p.indexOf(u + '/') === 0)) || r.names.some((n) => units.indexOf(s.names[n]) >= 0));
  const ids = new Set(meta.filter((r) => s.ds.has(r.id) || s.leaves.has(r.key) || touches(r, s.direct)).map((r) => r.id));
  s.ds.forEach((id) => ids.add(id));   // a lab or docs id with no record of its own
  const around = meta.filter((r) => !ids.has(r.id) && touches(r, s.around)).map((r) => r.id);
  let broad = false;
  if (around.length > BROAD) broad = true; else around.forEach((id) => ids.add(id));
  return (MATCH = { ids, broad });
}
// the first two records of each section of a route list
const firstTwo = (list) => { const per = {}, out = new Set(); list.forEach((r) => { const sec = r.split('/')[1], id = routeId(r); per[sec] = per[sec] || []; if (per[sec].indexOf(id) < 0 && per[sec].length < 2) per[sec].push(id); if (per[sec].indexOf(id) >= 0) out.add(r); }); return out; };

module.exports = {
  get full() { return FULL; },
  get scope() { return scope(); },
  // the app pages to load, of a test's list ('settings/index.html#/account', 'dam/settings-system.html', …); the slice:
  // each app's first page
  pages(list, test) {
    if (FULL) return shard(list);
    const s = scope(), slice = s.appSlice || own(test), seen = new Set();
    return shard(list.filter((p) => { const a = appOf(p), first = !seen.has(a); seen.add(a); return s.apps.has(a) || (slice && first); }));
  },
  // whether a design-system page may be in scope (decided before the browser opens the design system), and its home page
  anyDS(test) { const s = scope(); return FULL || dsSlice(test) || s.ds.size > 0 || s.leaves.size > 0 || s.dsRoutes.size > 0 || s.direct.length > 0; },
  dsHome(test) { return (FULL || dsSlice(test)) && (!SHARD || SHARD[0] === 1); },
  // the design-system routes to load, of a test's list ('#/sec/id', '#/sec/id/v/…', '#/sec/leaf-…'), with the design
  // system open in the page; the slice: the first two records of each section
  async routesIn(page, list, test) {
    if (FULL) return shard(list);
    const s = scope(), m = await matched(page), first = dsSlice(test) || m.broad ? firstTwo(list) : new Set();
    return shard(list.filter((r) => m.ids.has(routeId(r)) || s.dsRoutes.has(r) || first.has(r)));
  },
  // the component labs to run (a lab's id is its record's), with the design system open in the page; the slice: every 40th
  // lab (a lab takes about half a minute)
  async labsIn(page, ids, test) {
    if (FULL) return shard(ids);
    const m = await matched(page), slice = dsSlice(test) || m.broad;
    return shard(ids.filter((id, i) => m.ids.has(id) || (slice && i % 40 === 0)));
  },
  // a test of fixed fixtures: does anything it covers change? { units: ['components/Button'], apps: ['settings'], ids: ['toolbar'] }
  wants(what, test) {
    if (FULL) return true;
    const s = scope();
    if (s.appSlice || s.dsSlice || own(test)) return true;
    return (what.units || []).some((u) => s.units.has(u) || s.around.indexOf(u) >= 0) || (what.apps || []).some((a) => s.apps.has(a)) || (what.ids || []).some((i) => s.ds.has(i));
  },
  // one line on what the test covers this run
  report(counts, test) {
    const s = scope();
    const what = FULL ? 'full' : 'changed since ' + (s.base || '?').slice(0, 9) + ' (' + s.files.length + ' files)';
    console.log('SCOPE ' + (test || TEST) + ': ' + what + (SHARD ? ', shard ' + SHARD.join('/') : '') + (counts ? ' · ' + counts : ''));
    s.note.forEach((n) => console.log('  note: ' + n));
  },
  // nothing to load: the test's OK line, with 0, and exit 0
  none(line) { console.log(line + ' (nothing in scope)'); process.exit(0); },
  // --update writes a baseline: only from a full run
  noPartialUpdate(test) { if (process.argv.includes('--update') && !FULL) { console.log((test || TEST).toUpperCase().replace(/-/g, '_') + '_FAIL --update needs TEST_SCOPE=full (a baseline is never written from a partial run)'); process.exit(1); } },
};

if (require.main === module) {
  const s = scope();
  if (FULL) { console.log('SCOPE full: every page'); process.exit(0); }
  console.log('SCOPE changed since ' + (s.base || '(none)').slice(0, 9) + ': ' + s.files.length + ' files');
  s.note.forEach((n) => console.log('  note: ' + n));
  s.why.forEach((w) => console.log('  ' + w));
  console.log('  apps: ' + ([...s.apps].join(', ') || '-') + (s.appSlice ? ' + the first page of every app' : ''));
  const ds = [...s.ds].concat([...s.leaves]);
  console.log('  design system: ' + (ds.length ? ds.length + ' records (' + ds.slice(0, 10).join(', ') + (ds.length > 10 ? ', …' : '') + ')' : '-') + (s.dsRoutes.size ? ', ' + s.dsRoutes.size + ' guidance pages' : '')
    + (s.direct.length ? ', the records of ' + s.direct.length + ' units' : '') + (s.dsSlice ? ' + the slice' : ''));
  console.log('  units: ' + ([...s.units].join(', ') || '-') + (s.tests.size ? ' · tests on the slice: ' + [...s.tests].join(', ') : ''));
}
