// node tools/agent/one-part-sizes.js [--check] [--entry <file>]
// What one import from @plenix-ds/react costs an application (#685): tiny applications that import one part, bundled the
// way the audit measured (#684, #685): the repository's esbuild, minified, React external, against the built package
// (packages/react, from node build-packages.js). Prints the minified and gzipped size of each; --check fails when an import
// goes above its limit, so tree-shaking cannot break again unseen. Not a test: it builds and measures, it runs no page.
'use strict';
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const esbuild = require('esbuild');

const ROOT = path.resolve(__dirname, '../..');
const PKG = path.join(ROOT, 'packages', 'react');
// the imports measured, with their limits in KB, minified (#685). Before #685 every one-part import cost the whole library,
// 913 KB; the whole library was 1,608.0 KB. A limit holds the size measured when it was set, with a little room
const CASES = [
  { name: '{ Button }', code: 'import { Button } from "plenix"; console.log(Button);', limit: 330 },
  { name: '{ Badge }', code: 'import { Badge } from "plenix"; console.log(Badge);', limit: 100 },
  { name: '{ DataGrid }', code: 'import { DataGrid } from "plenix"; console.log(DataGrid);', limit: 700 },
  { name: '* as P', code: 'import * as P from "plenix"; console.log(P);', limit: 1610 },
];
// the module the application imports: the package's ES module entry, as a bundler reads it (package.json "module")
const entryOf = () => path.join(PKG, JSON.parse(fs.readFileSync(path.join(PKG, 'package.json'), 'utf8')).module);

// each case bundled against entry: [{ name, kb, gz, limit, over }]
function measure(entry = entryOf()) {
  return CASES.map((c) => {
    const out = esbuild.buildSync({
      stdin: { contents: c.code, resolveDir: ROOT, loader: 'js' }, bundle: true, minify: true, write: false, format: 'esm', target: 'es2019', logLevel: 'silent',
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'], alias: { plenix: entry },
    });
    const code = out.outputFiles[0].contents, kb = code.length / 1024;
    return { name: c.name, kb, gz: zlib.gzipSync(code).length / 1024, limit: c.limit, over: kb > c.limit };
  });
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
