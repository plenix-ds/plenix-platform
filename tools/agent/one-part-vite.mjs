// node tools/agent/one-part-vite.mjs <entry> -> JSON [{ name, bytes, gzip }]
// The Rollup half of tools/agent/one-part-sizes.js (#807, owner): what one import from the npm package costs an application bundled with Vite, which is
// Rollup with esbuild's minifier and what most consumers of the package use. Each case of one-part-sizes.js is a tiny entry that imports from the package's
// ES module entry; React stays external; what counts is the entry chunk and the chunks it imports statically, so a chunk only a dynamic import() reaches
// (the icon names, the lazily loaded parts) loads later and is not counted. Run by one-part-sizes.js, never alone but for a look.
import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import path from 'path';
import zlib from 'zlib';
import { build } from 'vite';

const require = createRequire(import.meta.url);
const { CASES } = require('./one-part-sizes.js');
const entry = path.resolve(process.argv[2]);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-one-part-vite-'));
const results = [];
for (const c of CASES) {
  const file = path.join(dir, c.name.replace(/\W+/g, '_') + '.js');
  fs.writeFileSync(file, c.code.replace('"plenix"', JSON.stringify(entry)));
  const r = await build({
    root: dir, logLevel: 'silent', configFile: false, resolve: { dedupe: ['react'] },
    build: { write: false, minify: 'esbuild', target: 'es2019', reportCompressedSize: false, rollupOptions: { input: file, external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'] } },
  });
  const chunks = (Array.isArray(r) ? r[0] : r).output.filter((o) => o.type === 'chunk'), byName = Object.fromEntries(chunks.map((o) => [o.fileName, o]));
  const seen = new Set(), todo = [chunks.find((o) => o.isEntry).fileName], code = [];
  while (todo.length) { const f = todo.pop(); if (seen.has(f) || !byName[f]) continue; seen.add(f); code.push(Buffer.from(byName[f].code)); byName[f].imports.forEach((i) => todo.push(i)); }
  const all = Buffer.concat(code);
  results.push({ name: c.name, bytes: all.length, gzip: zlib.gzipSync(all).length });
}
fs.rmSync(dir, { recursive: true, force: true });
console.log(JSON.stringify(results));
