#!/usr/bin/env node
// Copies every icon library that platform/icons/inventory/libraries.json allows into the local store (not in git),
// one folder per library, and writes the store's manifest.json (source, version, license, count per library).
//
//   node tools/icons/fetch-libraries.js [--store <dir>] [--only id,id]
//
// Store layout:  <store>/<library id>/<source>/{icons.json, info.json, LICENSE*, svg/<name>.svg}
// Downloads are data: nothing in them is run. Archives are unpacked by the system tar into their own folder.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const CATALOG = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform/icons/inventory/libraries.json'), 'utf8'));
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const STORE = path.resolve(arg('--store') || CATALOG.store);
const ONLY = arg('--only') ? arg('--only').split(',') : null;

async function json(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(url + ' → HTTP ' + r.status);
  return r.json();
}
async function download(url, file) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(url + ' → HTTP ' + r.status);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
}
function untar(tgz, dir) {
  fs.mkdirSync(dir, { recursive: true });
  execFileSync(process.platform === 'win32' ? path.join(process.env.SystemRoot || 'C:/Windows', 'System32', 'tar.exe') : 'tar', ['-xzf', tgz, '-C', dir], { stdio: 'pipe' });
}
const esc = (s) => String(s).replace(/[^a-z0-9._-]/gi, '_');

// One Iconify icon as a standalone SVG file (its own box, the collection's default box otherwise).
function iconSvg(set, icon) {
  const left = icon.left ?? set.left ?? 0, top = icon.top ?? set.top ?? 0;
  const w = icon.width ?? set.width ?? 16, h = icon.height ?? set.height ?? 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left} ${top} ${w} ${h}" width="${w}" height="${h}">${icon.body}</svg>\n`;
}

async function fetchIconify(prefix, dir) {
  const meta = await json(`https://registry.npmjs.org/@iconify-json/${prefix}/latest`);
  const tmp = path.join(dir, '_download');
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  const tgz = path.join(tmp, 'package.tgz');
  await download(meta.dist.tarball, tgz);
  untar(tgz, tmp);
  const pkg = path.join(tmp, 'package');
  for (const f of fs.readdirSync(pkg)) if (/^(icons|info|metadata|chars)\.json$|^LICENSE/i.test(f)) fs.copyFileSync(path.join(pkg, f), path.join(dir, f));
  fs.rmSync(tmp, { recursive: true, force: true });
  const set = JSON.parse(fs.readFileSync(path.join(dir, 'icons.json'), 'utf8'));
  const info = fs.existsSync(path.join(dir, 'info.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'info.json'), 'utf8')) : set.info || {};
  const svgDir = path.join(dir, 'svg');
  fs.rmSync(svgDir, { recursive: true, force: true });
  fs.mkdirSync(svgDir, { recursive: true });
  let n = 0;
  for (const [name, icon] of Object.entries(set.icons)) { fs.writeFileSync(path.join(svgDir, esc(name) + '.svg'), iconSvg(set, icon)); n++; }
  return {
    source: `npm @iconify-json/${prefix}@${meta.version}`, tarball: meta.dist.tarball, version: meta.version,
    upstreamVersion: info.version || null, upstream: info.author?.url || null, author: info.author?.name || null,
    license: info.license?.spdx || info.license?.title || meta.license, licenseUrl: info.license?.url || null,
    icons: n, aliases: Object.keys(set.aliases || {}).length, grid: info.height || set.height || null,
  };
}

// A package's own SVG folder (basicons), or Chakra's React components (paths extracted).
async function fetchNpm(src, dir) {
  const meta = await json(`https://registry.npmjs.org/${src.npm.replace('/', '%2F')}/latest`);
  const tmp = path.join(dir, '_download');
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  const tgz = path.join(tmp, 'package.tgz');
  await download(meta.dist.tarball, tgz);
  untar(tgz, tmp);
  const pkg = path.join(tmp, 'package');
  for (const f of fs.readdirSync(pkg)) if (/^LICENSE/i.test(f)) fs.copyFileSync(path.join(pkg, f), path.join(dir, f));
  const svgDir = path.join(dir, 'svg');
  fs.rmSync(svgDir, { recursive: true, force: true });
  fs.mkdirSync(svgDir, { recursive: true });
  let n = 0;
  if (src.dir) {
    let from = path.join(pkg, src.dir);
    if (!fs.existsSync(from)) {
      // Not in the npm package: take the folder from the repository at the package's version.
      const repo = (meta.repository?.url || '').replace(/^git\+/, '').replace(/\.git$/, '').replace('https://github.com/', '');
      const gtgz = path.join(tmp, 'repo.tgz');
      await download(`https://codeload.github.com/${repo}/tar.gz/HEAD`, gtgz);
      untar(gtgz, path.join(tmp, 'repo'));
      const top = fs.readdirSync(path.join(tmp, 'repo'))[0];
      from = path.join(tmp, 'repo', top, src.dir);
      if (!fs.existsSync(path.join(dir, 'LICENSE'))) for (const f of fs.readdirSync(path.join(tmp, 'repo', top))) if (/^LICENSE/i.test(f)) fs.copyFileSync(path.join(tmp, 'repo', top, f), path.join(dir, f));
    }
    const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.svg')) { fs.copyFileSync(p, path.join(svgDir, esc(path.relative(from, p).replace(/[\\/]/g, '--')))); n++; } } };
    walk(from);
  } else if (src.chakra) {
    // createIcon({ displayName: "XIcon", d: "...", viewBox }) or path: [jsx("path", { d: ... })]
    const dist = path.join(pkg, 'dist');
    const files = [];
    const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (/\.m?js$/.test(f)) files.push(p); } };
    walk(dist);
    const seen = new Set();
    for (const f of files) {
      const src2 = fs.readFileSync(f, 'utf8');
      const re = /displayName:\s*"(\w+)"([\s\S]*?)(?=displayName:|$)/g;
      let m;
      while ((m = re.exec(src2))) {
        const name = m[1].replace(/Icon$/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        if (seen.has(name)) continue;
        const body = m[2];
        const vb = (body.match(/viewBox:\s*"([^"]+)"/) || [, '0 0 24 24'])[1];
        const ds = [...body.matchAll(/\bd:\s*"([^"]+)"/g)].map((x) => x[1]);
        if (!ds.length) continue;
        seen.add(name);
        fs.writeFileSync(path.join(svgDir, name + '.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${ds.map((d) => `<path fill="currentColor" d="${d}"/>`).join('')}</svg>\n`);
        n++;
      }
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  return { source: `npm ${src.npm}@${meta.version}`, tarball: meta.dist.tarball, version: meta.version, license: meta.license, icons: n };
}

(async () => {
  fs.mkdirSync(STORE, { recursive: true });
  const manifestFile = path.join(STORE, 'manifest.json');
  const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : { libraries: {} };
  for (const lib of CATALOG.libraries) {
    if (ONLY && !ONLY.includes(lib.id)) continue;
    if (!lib.sources || !['downloaded', 'attribution', 'local'].includes(lib.status)) continue;
    const entry = { name: lib.name, status: lib.status, catalogLicense: lib.license, fetched: new Date().toISOString(), sources: [] };
    for (const src of lib.sources) {
      const key = src.iconify || esc(src.npm);
      const dir = path.join(STORE, lib.id, key);
      fs.mkdirSync(dir, { recursive: true });
      try {
        const r = src.iconify ? await fetchIconify(src.iconify, dir) : await fetchNpm(src, dir);
        entry.sources.push({ folder: path.relative(STORE, dir).replace(/\\/g, '/'), ...r });
        console.log(`${lib.id}/${key}: ${r.icons} icons, ${r.license}, ${r.source}`);
      } catch (e) {
        entry.sources.push({ folder: path.relative(STORE, dir).replace(/\\/g, '/'), error: String(e.message || e) });
        console.log(`${lib.id}/${key}: FAILED ${e.message}`);
      }
    }
    entry.icons = entry.sources.reduce((s, x) => s + (x.icons || 0), 0);
    manifest.libraries[lib.id] = entry;
  }
  manifest._about = 'Local copies of the icon libraries Plenix may use (platform/icons/inventory/libraries.json). Written by tools/icons/fetch-libraries.js; not in git.';
  manifest.updated = new Date().toISOString();
  manifest.total = Object.values(manifest.libraries).reduce((s, x) => s + x.icons, 0);
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Manifest: ${manifestFile} (${Object.keys(manifest.libraries).length} libraries, ${manifest.total} icons)`);
})();
