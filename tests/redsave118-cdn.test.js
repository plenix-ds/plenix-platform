// Verify the built downloadable CDN with an independent tar reader and extracted-file hashes.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto'),assert=require('node:assert/strict'),{spawnSync}=require('child_process');
const ROOT=path.resolve(__dirname,'..'),version=require('../package.json').version,cdn=path.join(ROOT,'release/cdn',version),indexFile=path.join(cdn,'index.json');
if(!fs.existsSync(indexFile)){console.log('REDSAVE118_CDN_SKIP: run build-app and build-packages first');process.exit(0);}
const index=JSON.parse(fs.readFileSync(indexFile,'utf8'));if(!index.bundle){console.log('REDSAVE118_CDN_SKIP: offline bundle has not been generated');process.exit(0);}
const sha=data=>crypto.createHash('sha256').update(data).digest('hex'),archive=path.join(cdn,index.files.bundle),temp=fs.mkdtempSync(path.join(os.tmpdir(),'plenix-offline-'));let checks=0;
const ok=(v,m)=>{assert.ok(v,m);checks++;};
try{
 const data=fs.readFileSync(archive);assert.equal(sha(data),index.bundle.sha256);checks++;assert.equal(data.length,index.bundle.bytes);checks++;
 const list=spawnSync('tar',['-tzf',archive],{encoding:'utf8'});assert.equal(list.status,0,list.stderr);checks++;
 const names=list.stdout.trim().split(/\r?\n/);ok(new Set(names).size===names.length,'no duplicate entries');ok(names.every(n=>!path.isAbsolute(n)&&!n.split('/').includes('..')),'no escaping paths');
 const unpack=spawnSync('tar',['-xzf',archive,'-C',temp],{encoding:'utf8'});assert.equal(unpack.status,0,unpack.stderr);checks++;
 const manifest=JSON.parse(fs.readFileSync(path.join(temp,'bundle-manifest.json'),'utf8'));assert.equal(manifest.version,version);checks++;assert.equal(manifest.algorithm,'sha256');checks++;
 assert.deepEqual(manifest,JSON.parse(fs.readFileSync(path.join(cdn,index.bundle.manifest),'utf8')));checks++;
 assert.deepEqual(names.slice().sort(),manifest.files.map(f=>f.path).concat('bundle-manifest.json').sort());checks++;
 for(const file of manifest.files){const actual=fs.readFileSync(path.join(temp,file.path));assert.equal(actual.length,file.bytes,file.path);assert.equal(sha(actual),file.sha256,file.path);assert.deepEqual(actual,fs.readFileSync(path.join(cdn,file.path)),file.path);checks+=3;}
 for(const file of ['plenix.esm.js','plenix.js','plenix.css','plenix.min.css','fonts.css','theme-boot.js','vendor/react.production.min.js','vendor/react-dom.production.min.js'])ok(names.includes(file),'required offline asset '+file);
 ok(names.some(n=>n.startsWith('vendor/tabulator/')),'DataTable lazy engine bundled');ok(names.some(n=>n.startsWith('vendor/tiptap/')),'editor lazy engine bundled');ok(names.some(n=>n.startsWith('fonts/')),'fonts bundled');
 const fonts=fs.readFileSync(path.join(temp,'fonts.css'),'utf8');for(const match of fonts.matchAll(/url\(["']?([^"')]+)["']?\)/g)){ok(!/^(https?:|\/\/)/.test(match[1]),'local font URL');ok(fs.existsSync(path.resolve(temp,match[1])),'font URL resolves');}
 const versions=JSON.parse(fs.readFileSync(path.join(ROOT,'release/cdn/index.json'),'utf8'));assert.equal(versions.versions.find(v=>v.version===version).bundle,version+'/'+index.files.bundle);checks++;
 console.log('REDSAVE118_CDN_OK '+checks+' checks, '+manifest.files.length+' hashed runtime files');
}finally{const target=fs.realpathSync(temp),parent=fs.realpathSync(os.tmpdir());if(path.dirname(target)!==parent||!path.basename(target).startsWith('plenix-offline-'))throw Error('Unexpected offline test cleanup path');fs.rmSync(target,{recursive:true,force:true});}
