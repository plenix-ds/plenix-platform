const assert = require('node:assert/strict'), fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-docs-201-'));
try {
  const records = [{id:'application-shell',plenix:'AppShell',title:'Application shell'}, {id:'specialized-media-viewer',plenix:'MediaViewer',title:'Viewer'}, {id:'media-lightbox',plenix:'MediaViewer',title:'Lightbox'}, {id:'button',plenix:'Button',title:'Button'}, {id:'navigation',plenix:'Button',title:'Navigation button'}];
  const write=(file,text)=>fs.writeFileSync(file,text);
  const index=require('../build-docs-components')(records,{},folder,folder,r=>'Canonical '+r.id,write);
  assert.deepEqual(index[0].componentNames,['AppShell']);
  assert.equal(fs.readFileSync(path.join(folder,'button.md'),'utf8'),'Canonical button','aliases never replace canonical pages');
  assert.match(fs.readFileSync(path.join(folder,'app-shell.md'),'utf8'),/application-shell.md/);
  const viewer=fs.readFileSync(path.join(folder,'media-viewer.md'),'utf8');
  assert.match(viewer,/specialized-media-viewer.md/); assert.match(viewer,/media-lightbox.md/);
  for(const record of index) for(const alias of record.aliases) assert.ok(fs.existsSync(path.join(folder,alias)));
  console.log('COMPONENT_DOCS_201_OK names, acronym-safe aliases, multi-record links and canonical collision protection');
} finally { fs.rmSync(folder,{recursive:true,force:true}); }
