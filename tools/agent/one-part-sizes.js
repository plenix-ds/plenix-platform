// node tools/agent/one-part-sizes.js [--check] [--entry <file>]
// What one import from @plenix-ds/react costs an application (#685): tiny applications that import one part, bundled the
// way the audit measured (#684, #685): the repository's esbuild, minified, React external, against the built package
// (packages/react, from node build-packages.js). Prints the minified and gzipped size of each; --check fails when an import
// goes above its limit, so tree-shaking cannot break again unseen. Not a test: it builds and measures, it runs no page.
// Why esbuild and not Vite (#709 step 6): it stands in for the application's bundler, not for Plenix's build. esbuild is a
// standard bundler many applications use, it tree-shakes the package as a typical application bundler would, and keeping it
// keeps every limit comparable with the audit's numbers (#684, #685).
'use strict';
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const esbuild = require('esbuild');

const ROOT = path.resolve(__dirname, '../..');
const PKG = path.join(ROOT, 'packages', 'react');
// the imports measured, with their limits in KB, minified (#685). Before #685 every one-part import cost the whole library,
// 913 KB; the whole library was 1,608.0 KB. A limit holds the size measured when it was set, with a little room. #702
// (Arabic opt-in, the icon names loaded when needed): Button 317.5 -> 101.4, Badge 79.0 -> 25.0, DataGrid 645.0 -> 428.9,
// * as P 1608.5 -> 1392.4 (Button's start is now mostly the English words, 53 KB, and Icon, 24 KB)
const CASES = [
  { name: '{ Button }', code: 'import { Button } from "plenix"; console.log(Button);', limit: 105 },
  { name: '{ Badge }', code: 'import { Badge } from "plenix"; console.log(Badge);', limit: 30 },
  { name: '{ DataGrid }', code: 'import { DataGrid } from "plenix"; console.log(DataGrid);', limit: 440 },
  { name: '* as P', code: 'import * as P from "plenix"; console.log(P);', limit: 1420 }, // 1,420: the owner-approved #775 and #769 parts (branch loader #814, Anchor, Cascader extras) add about 1 to 2 KB each
];
// the module the application imports: the package's ES module entry, as a bundler reads it (package.json "module")
const entryOf = () => path.join(PKG, JSON.parse(fs.readFileSync(path.join(PKG, 'package.json'), 'utf8')).module);

// each case bundled against entry: [{ name, kb, gz, limit, over }]. Bundled with splitting, as an application's bundler
// does, and counted as what loads at the start: the entry and the chunks it imports statically. A chunk only a dynamic
// import() reaches (the icon name list, #702) loads later, when needed, and is not counted. With no dynamic import this is
// the same number as one flat file (#685's measure).
function measure(entry = entryOf()) {
  return CASES.map((c) => {
    const out = esbuild.buildSync({
      entryPoints: { app: caseFile(c) }, absWorkingDir: ROOT,
      bundle: true, minify: true, write: false, format: 'esm', target: 'es2019', logLevel: 'silent', splitting: true, outdir: path.join(ROOT, '.one-part-sizes'), metafile: true,
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'], alias: { plenix: entry },
    });
    const files = new Map(out.outputFiles.map((f) => [f.path, f.contents]));
    const outputs = out.metafile.outputs, start = Object.keys(outputs).find((k) => outputs[k].entryPoint), seen = new Set();
    const walk = (k) => { if (seen.has(k)) return; seen.add(k); outputs[k].imports.filter((i) => i.kind === 'import-statement' && outputs[i.path]).forEach((i) => walk(i.path)); };
    walk(start);
    const code = Buffer.concat([...seen].map((k) => Buffer.from(files.get(path.resolve(ROOT, k))))), kb = code.length / 1024;
    return { name: c.name, kb, gz: zlib.gzipSync(code).length / 1024, limit: c.limit, over: kb > c.limit };
  });
}
// a case's code as a file in the scratch folder: splitting needs a real entry point (stdin cannot be split)
function caseFile(c) {
  const dir = path.join(require('os').tmpdir(), 'plenix-one-part-sizes');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, c.name.replace(/\W+/g, '_') + '.js');
  fs.writeFileSync(file, c.code);
  return file;
}
const line = (r) => r.name.padEnd(13) + (r.kb.toFixed(1) + ' KB').padStart(11) + (r.gz.toFixed(1) + ' KB gzipped').padStart(19) + '   limit ' + r.limit + ' KB' + (r.over ? '   OVER' : '');
module.exports = { measure, line, entryOf, CASES };

if (require.main === module) {
  const args = process.argv.slice(2), at = args.indexOf('--entry');
  const entry = at >= 0 ? path.resolve(args[at + 1]) : entryOf();
  if (!fs.existsSync(entry)) { console.error('ONE_PART_SIZES_FAIL ' + path.relative(ROOT, entry) + ' is missing: run node build-app.js and node build-packages.js first'); process.exit(2); }
  const results = measure(entry);
  console.log('One import from ' + path.relative(ROOT, entry) + ' (minified, React external):');
  results.forEach((r) => console.log('  ' + line(r)));
  if (args.includes('--check')) {
    const over = results.filter((r) => r.over);
    if (over.length) { console.log('ONE_PART_SIZES_FAIL ' + over.map((r) => r.name + ' ' + r.kb.toFixed(1) + ' KB > ' + r.limit + ' KB').join('; ')); process.exit(1); }
    console.log('ONE_PART_SIZES_OK');
  }
}
