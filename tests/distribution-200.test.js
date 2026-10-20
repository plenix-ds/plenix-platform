// Package distribution contract: local chunks, explicit opt-in entry, licenses and offline completeness.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const version=require('../package.json').version,root=path.resolve(__dirname,'..'),pkg=path.join(root,'packages/react'),cdn=path.join(root,'release/cdn',version);
const main=fs.readFileSync(path.join(pkg,'dist/index.js'),'utf8');
assert.ok(!/PlenixVendorBase|data-plx-vendor|__PLENIX_VENDOR__/.test(main),'ESM contains no classic vendor-script loading fallback');
const manifest=JSON.parse(fs.readFileSync(path.join(pkg,'package.json'),'utf8'));
assert.ok(manifest.exports['./prefetch'].import&&manifest.exports['./prefetch'].require&&manifest.exports['./prefetch'].types);
assert.equal(typeof require(path.join(pkg,'dist/prefetch.cjs')).enablePrefetch,'function');
assert.equal(typeof require(path.join(pkg,'dist/index.cjs')).RichTextEditor,'function','CommonJS imports without browser globals');
const files=JSON.parse(fs.readFileSync(path.join(cdn,'bundle-manifest.json'),'utf8')).files.map(f=>f.path);
const chunks=fs.readdirSync(path.join(pkg,'dist/chunks')).filter(f=>f.endsWith('.js'));
assert.ok(chunks.some(f=>f.startsWith('tiptap-engine-')),'engine is a separate lazy ESM chunk');
for(const chunk of chunks){assert.ok(files.includes('chunks/'+chunk),'offline archive includes '+chunk);assert.ok(fs.existsSync(path.join(cdn,'chunks',chunk)));}
for(const file of ['prefetch.js','prefetch.d.ts','DOMPurify-LICENSE.txt'])assert.ok(files.includes(file),'offline archive includes '+file);
assert.ok(fs.existsSync(path.join(pkg,'DOMPurify-LICENSE.txt')));
console.log('DISTRIBUTION_200_OK '+chunks.length+' local chunks; opt-in prefetch entry; SSR; offline manifest and sanitizer license');
