// Lane 200: importing prefetch is inert; explicit conservative opt-in touches only marked, safe-origin links.
const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const source = require('esbuild').transformSync(fs.readFileSync('platform/utils/prefetch.js','utf8'), {format:'cjs'}).code;
const context = {exports:{},module:{exports:{}},URL};
vm.runInNewContext(source, context);
const {enablePrefetch} = context.module.exports;
const hints = [], listeners = new Map(); let registrations = 0;
const doc = {defaultView:{location:{protocol:'https:',href:'https://example.test/records'}},head:{appendChild(hint){hints.push(hint);}},
 querySelector(){return null;}, createElement(tag){assert.equal(tag,'link');return {remove(){hints.splice(hints.indexOf(this),1);}};},
 addEventListener(type,fn){registrations++;listeners.set(type,fn);},removeEventListener(type,fn){assert.equal(listeners.get(type),fn);listeners.delete(type);}};
assert.equal(registrations,0); assert.equal(hints.length,0); assert.equal(typeof enablePrefetch(),'function');
const stop = enablePrefetch({document:doc}); assert.equal(registrations,1);assert.equal(hints.length,0);
assert.equal(enablePrefetch({document:doc}),stop);assert.equal(registrations,1);
const press=(href,marked=true,skip=false)=>listeners.get('pointerdown')({target:{closest(){return {href,matches(selector){return selector==='a[data-plx-prefetch]'?marked:skip;}};}}});
press('https://example.test/next',false);press('https://other.test/next');press('http://[');press('javascript:alert(1)');press('https://example.test/records#x');press('https://example.test/sign-out',true,true);
assert.equal(hints.length,0);press('https://example.test/next#x');assert.equal(hints.length,1);assert.equal(hints[0].rel,'prefetch');assert.equal(hints[0].href,'https://example.test/next');
press('https://example.test/next#y');assert.equal(hints.length,1);stop();assert.equal(hints.length,0);assert.equal(listeners.size,0);stop();
assert.throws(()=>enablePrefetch({eagerness:'moderate'}),/conservative/);assert.throws(()=>enablePrefetch({selector:''}),/selector/);
console.log('PREFETCH_200_OK import inert; marked links only; no prerender; deduplication and cleanup');
