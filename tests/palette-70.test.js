/* Plenix · palette70 regression
   Summary: Checks the authoritative chart, original-identity aliases and every final token graph.
   Usage: node tests/palette-70.test.js
   Props: None.
   Behavior: Rejects new colors, conflicting destinations, reordered families and missing/circular references.
   Notes: Contrast stays in contrast.test.js with its unchanged thresholds. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {execFileSync}=require('child_process');
const {categoryBorders,lightness,rows,validateChart,flatten,resolve,validateGraph,mapIdentity}=require('../tools/agent/color-migration-70');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f));
let count=0;const check=(name,fn)=>{fn();count++;};
const final=validateChart(),R=json('platform/tokens/reference.tokens.json')['plx-ref'];
check('chart exactly matches authoritative proposal',()=>{
 const chart=[...read('docs/color-consolidation/plenix-revised-70-color-proposal.md').matchAll(/^\| `--plx-ref-color-([^`]+)` \| `(#[0-9a-f]{6})` \| `--plx-ref-color-([^`]+)` \| `(#[0-9a-f]{6})` \| ([^|]+) \|$/gm)].map(m=>({originalToken:m[1],originalHex:m[2],newToken:m[3],newHex:m[4],operation:m[5].trim()}));assert.deepEqual(rows,chart);
});
check('70canonical,99aliases',()=>{assert.equal(Object.entries(R).filter(([k,v])=>k.startsWith('color-')&&!v.$deprecated&&/^#[0-9a-f]{6}$/i.test(v.$value)).length,70);assert.equal(Object.values(R).filter(v=>v.$deprecated).length,99);});
for(const [name,hex]of final)check('canonical '+name,()=>{assert.equal(R['color-'+name].$value,hex);assert.ok(!R['color-'+name].$deprecated);});
const original=Object.fromEntries(rows.map(r=>['color-'+r.originalToken,{$value:r.originalHex}]));
for(const row of rows)check('identity '+row.originalToken,()=>assert.equal(mapIdentity(original,rows,row.originalToken),row.newToken));
// Verify all83 compatibility aliases from the first consolidation against their original destination, not its reused name.
const oldPlan=read('docs/color-consolidation/plenix-color-consolidation-plan.md'),oldRows=oldPlan.slice(oldPlan.indexOf('## Complete migration log')).split('\n').map(line=>line.split('|').map(s=>s.trim())).filter(c=>c.length>=7&&/^`--plx-ref-color-/.test(c[1])&&c[1]!==c[3]);
check('83 first-consolidation entries',()=>assert.equal(oldRows.length,83));
for(const c of oldRows){const strip=s=>s.replace(/`/g,'').replace('--plx-ref-color-','');const name=strip(c[1]),prior=strip(c[3]),target=rows.find(r=>r.originalToken===prior)?.newToken||prior;check('legacy alias '+name,()=>{assert.equal(R['color-'+name].$value,'{plx-ref.color-'+target+'}');assert.ok(R['color-'+name].$deprecated);});}
check('aliases resolve through original brown identities',()=>{original['color-legacy-brown']={$value:'{plx-ref.color-brown-500}',$deprecated:true};original['color-nested']={$value:'{plx-ref.color-legacy-brown}',$deprecated:true};assert.equal(mapIdentity(original,rows,'nested'),'orange-500');});
for(const mode of ['light','dark']){
 const files=execFileSync('git',['ls-files','platform/tokens'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).filter(f=>f.endsWith('.tokens.json')&&(!/^platform\/tokens\/theme-.+\.(light|dark)\.tokens\.json$/.test(f)||f==='platform/tokens/theme-default.'+mode+'.tokens.json'));
 const graph=Object.assign({},...files.map(f=>flatten(json(f))));check('all '+mode+'references present and acyclic',()=>validateGraph(graph));
 for(const name of Object.keys(R).filter(n=>n.startsWith('color-')))check(mode+' '+name+' resolves',()=>assert.match(resolve(graph,'plx-ref.'+name),/^#[0-9a-f]{6,8}$/i));
 const S=json('platform/tokens/theme-default.'+mode+'.tokens.json')['plx-sys'];
 check(mode+'19 active categories',()=>assert.equal(Object.keys(S).filter(k=>/^category-[a-z]+$/.test(k)&&!S[k].$deprecated).length,19));
 for(const suffix of ['','-soft','-soft-border','-on-soft','-on'])check(mode+'Brown compatibility '+suffix,()=>{const key='category-brown'+suffix;assert.equal(S[key].$value,'{plx-sys.category-orange'+suffix+'}');assert.ok(S[key].$deprecated);assert.equal(resolve(graph,'plx-sys.'+key),resolve(graph,'plx-sys.category-orange'+suffix));});
 if(mode==='light')check('accessible owner-approved away role',()=>{assert.equal(S['status-away'].$value,'{plx-ref.color-brown-600}');});
 const palette=Object.entries(R).filter(([k,v])=>k.startsWith('color-')&&!v.$deprecated&&/^#[0-9a-f]{6}$/i.test(v.$value));
 const contrastSource=read('platform/utils/contrast.js').replace(/^export (const|function) /gm,'$1 '),context={};require('vm').createContext(context);require('vm').runInContext(contrastSource+'\nthis.ratio=contrastRatio;',context);
 for(const key of Object.keys(S).filter(k=>/^category-[a-z]+$/.test(k)))check(mode+'category border and text '+key,()=>{
   const base=resolve(graph,'plx-sys.'+key),border=resolve(graph,'plx-sys.'+key+'-soft-border');assert.notEqual(border,base);
   const text=resolve(graph,'plx-sys.'+key+'-on-soft'),soft=resolve(graph,'plx-sys.'+key+'-soft');assert.ok(context.ratio(text,soft)>=4.5);
 });
 for(const [name,dest]of [['cyan','cyan-700'],['pink','pink-700'],['lavender','purple-500']])check(mode+'approved border '+name,()=>assert.equal(S['category-'+name+'-soft-border'].$value,'{plx-ref.color-'+dest+'}'));
 const fixture=structuredClone(json('platform/tokens/theme-default.'+mode+'.tokens.json'));
 for(const name of ['cyan','pink','lavender'])fixture['plx-sys']['category-'+name+'-soft-border'].$value=fixture['plx-sys']['category-'+name].$value;
 const applied=categoryBorders({'plx-ref':R},fixture);check(mode+'generic next-darker policy',()=>{assert.equal(applied.length,3);for(const c of applied){const base=resolve(graph,'plx-sys.category-'+c.category),baseName=palette.find(([,v])=>v.$value===base)[0],borderName=c.after.replace(/^\{plx-ref\.color-/, '').replace(/\}$/, '');assert.equal(borderName.split('-')[0],baseName.slice(6).split('-')[0]);assert.ok(lightness(c.hex)<lightness(base));}});
 check(mode+'border policy idempotent',()=>assert.deepEqual(categoryBorders({'plx-ref':R},fixture),[]));

 for(const [name,destination]of [['category-yellow-on-soft','brown-600'],['category-lime','yellow-150'],['category-blue','blue-400']])check(mode+'role '+name,()=>assert.equal(S[name].$value,'{plx-ref.color-'+destination+'}'));
}
check('reject missing ref',()=>assert.throws(()=>validateGraph({'plx-ref.a':{$value:'{plx-ref.absent}'}}),/Missing/));
check('reject cycle',()=>assert.throws(()=>validateGraph({'plx-ref.a':{$value:'{plx-ref.b}'},'plx-ref.b':{$value:'{plx-ref.a}'}}),/Circular/));
check('reject invented hex',()=>{const bad=structuredClone(rows);bad[0].newHex='#123456';assert.throws(()=>validateChart(bad),/New hex/);});
check('reject conflict',()=>{const bad=structuredClone(rows);const merge=bad.find(r=>r.originalToken==='blue-500');merge.newHex='#000000';assert.throws(()=>validateChart(bad),/Conflicting/);});
check('reject reversed family order',()=>{const bad=structuredClone(rows);for(const r of bad){if(r.newToken==='gray-100')r.newToken='gray-200';else if(r.newToken==='gray-200')r.newToken='gray-100';if(r.operation.startsWith('Keep'))r.operation='Rename';}assert.throws(()=>validateChart(bad),/Non-darkening/);});
check('rerun does not reapply reused names',()=>{const before=read('platform/tokens/reference.tokens.json');const output=execFileSync(process.execPath,['tools/agent/color-migration-70.js','--apply'],{cwd:root,encoding:'utf8'});assert.match(output,/already applied/);assert.equal(read('platform/tokens/reference.tokens.json'),before);});
console.log('PALETTE_70_OK '+count+' checks');
