const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const code=require('esbuild').transformSync(fs.readFileSync('platform/utils/vendorBase.js','utf8'),{format:'cjs'}).code;
function load(extra={}){const context={module:{exports:{}},exports:{},URL,...extra};vm.runInNewContext(code,context);return context.module.exports.vendorBase;}
assert.throws(()=>load()(),/explicit/);
assert.throws(()=>load({window:{},document:{currentScript:null,scripts:[]}})(),/explicit/);
assert.equal(load({window:{PlenixVendorBase:'/assets/engines'},document:{currentScript:null,scripts:[]}})(),'/assets/engines/');
assert.equal(load({document:{currentScript:{src:'https://example.test/platform/dist/platform.js'},scripts:[]}})(),'https://example.test/platform/vendor/');
assert.equal(load({document:{currentScript:null,scripts:[{src:'https://example.test/assets/plenix.global.js'}]}})(),'https://example.test/assets/vendor/');
console.log('VENDOR_BASE_200_OK no implicit CDN; SSR explicit error; local script and override resolution');
