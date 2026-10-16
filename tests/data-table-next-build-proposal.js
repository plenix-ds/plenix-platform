/* Plenix · proposed trial build integration
   Summary: Verifies the three proposed build changes without editing their source files.
   Usage: node tests/data-table-next-build-proposal.js build-app.js|check-system.js|check-spec.js
   Props: The exact replacement proposal stored with the trial.
   Behavior: Compiles only the proposed builder modules in this isolated Node process.
   Notes: This is proposal verification, not a replacement for regular required gates. */
const fs=require('fs'),path=require('path'),Module=require('module'),ROOT=path.resolve(__dirname,'..');
const updates=JSON.parse(fs.readFileSync(path.join(ROOT,'platform/components/DataTableNext/build-integration-proposal.json'),'utf8'));
const proposed={};for(const [file,changes]of Object.entries(updates)){if(!['build-app.js','build-exports.js','build-spec-parts.js'].includes(file))throw Error('Unexpected builder');let text=fs.readFileSync(path.join(ROOT,file),'utf8');for(const [old,next]of changes){if(!text.includes(old))throw Error('Proposal context differs: '+file);text=text.replace(old,next);}proposed[path.join(ROOT,file)]=text;}
const load=Module._load;Module._load=function(request,parent,isMain){const filename=Module._resolveFilename(request,parent,isMain);if(proposed[filename]){if(require.cache[filename])return require.cache[filename].exports;const m=new Module(filename,parent);m.filename=filename;m.paths=Module._nodeModulePaths(path.dirname(filename));require.cache[filename]=m;m._compile(proposed[filename],filename);return m.exports;}return load.apply(this,arguments);};
const entry=process.argv[2]||'build-app.js';if(!['build-app.js','check-system.js','check-spec.js'].includes(entry))throw Error('Unknown verification entry');console.log('PROPOSAL_ONLY: builder source files remain unchanged; regular gates still require scope approval.');require(path.join(ROOT,entry));
