/* Plenix · color migration 70
   Summary: Applies the owner's 83-to-70 chart from an immutable source graph.
   Usage: node tools/agent/color-migration-70.js [--apply]; dry run never writes.
   Props: The checked-in migration JSON is the authoritative chart transcription.
   Behavior: Plans and validates every file before writing; an already migrated palette is never remapped.
   Notes: Old reused names cannot preserve old identity; all repository consumers move in the same pass. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const { execFileSync } = require('child_process');
const { isGenerated } = require('./generated');
const ROOT = path.resolve(__dirname, '../..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const json = f => JSON.parse(read(f));
const rows = json('docs/color-consolidation/plenix-70-migration.json');
const refFile = 'platform/tokens/reference.tokens.json';
const families = ['gray','red','pink','magenta','orange','brown','yellow','green','teal','cyan','blue','purple'];
const family = name => /^(black|white)$/.test(name) ? 'gray' : name.split('-')[0];
const lightness = hex => {
  const [r,g,b] = hex.slice(1).match(/../g).slice(0,3).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return .2104542553*Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b)+.793617785*Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b)-.0040720468*Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
};
function validateChart(chart = rows) {
  const fail = message => { throw Error(message); };
  if(chart.length!==83 || new Set(chart.map(r=>r.originalToken)).size!==83)fail('Chart must contain83 distinct original tokens');
  const originalHex = new Set(chart.map(r=>r.originalHex)), dest = new Map();
  for(const r of chart){
    if(!originalHex.has(r.newHex))fail('New hex forbidden: '+r.newHex);
    if(dest.has(r.newToken)&&dest.get(r.newToken)!==r.newHex)fail('Conflicting destination '+r.newToken);
    dest.set(r.newToken,r.newHex);
    if(r.operation.startsWith('Keep')&&(r.originalToken!==r.newToken||r.originalHex!==r.newHex))fail('Keep changed: '+r.originalToken);
  }
  if(dest.size!==70)fail('Expected70 canonical colors');
  for(const f of families){
    const sorted=[...dest].filter(([n])=>family(n)===f&&!/^(black|white)$/.test(n)).sort((a,b)=>+a[0].split('-').pop()-+b[0].split('-').pop());
    for(let i=1;i<sorted.length;i++)if(lightness(sorted[i][1])>=lightness(sorted[i-1][1]))fail('Non-darkening family '+f);
  }
  return dest;
}
function flatten(o, prefix='', out={}) {
  for(const [k,v] of Object.entries(o))if(!k.startsWith('$')&&v&&typeof v==='object'){
    const name=prefix?prefix+'.'+k:k;
    if('$value' in v)out[name]=v; else flatten(v,name,out);
  }
  return out;
}
function resolve(graph,name,seen=new Set()) {
  if(seen.has(name))throw Error('Circular token '+[...seen,name].join(' -> '));
  const t=graph[name];if(!t)throw Error('Missing token '+name);
  const value=t.$value, m=typeof value==='string'&&/^\{([^{}]+)\}$/.exec(value);
  return m?resolve(graph,m[1],new Set([...seen,name])):value;
}
function validateGraph(graph) {
  function refs(value, seen){
    if(typeof value==='string')for(const m of value.matchAll(/\{([^{}]+)\}/g)){
      if(!graph[m[1]])throw Error('Missing token '+m[1]);
      if(seen.has(m[1]))throw Error('Circular token '+m[1]);
      refs(graph[m[1]].$value,new Set([...seen,m[1]]));
    } else if(value&&typeof value==='object')Object.values(value).forEach(v=>refs(v,seen));
  }
  for(const [name,t] of Object.entries(graph))refs(t.$value,new Set([name]));
}
const format = o => JSON.stringify(o,null,2)+'\n';
function mapIdentity(R, chart, name) {
    const source=flatten({"plx-ref":R}), byOld=new Map(chart.map(r=>[r.originalToken,r]));
    const key='plx-ref.color-'+name;
    if(!source[key])throw Error('Unknown reference '+name);
    let id=name, seen=new Set();
    while(R['color-'+id]?.$deprecated){
      if(seen.has(id))throw Error('Circular alias '+id);seen.add(id);
      const m=/^\{plx-ref\.color-([^}]+)\}$/.exec(R['color-'+id].$value);
      if(!m)throw Error('Nonreference deprecated alias '+id);id=m[1];
    }
    return byOld.get(id)?.newToken||id;
}
// Owner rule: compare resolved colors after the chart, then choose the nearest darker shade in the same family.
function categoryBorders(reference, theme) {
  const graph=Object.assign({},flatten(reference),flatten(theme)), changed=[];
  const palette=Object.entries(reference['plx-ref']).filter(([key,t])=>key.startsWith('color-')&&!t.$deprecated&&/^#[0-9a-f]{6}$/i.test(t.$value));
  for(const key of Object.keys(theme['plx-sys']).filter(k=>/^category-[a-z]+$/.test(k))){
    const base=resolve(graph,'plx-sys.'+key), borderKey=key+'-soft-border';
    if(resolve(graph,'plx-sys.'+borderKey)!==base)continue;
    const canonical=palette.find(([,t])=>t.$value===base);
    if(!canonical)throw Error('No canonical category base '+key);
    const name=canonical[0].slice(6), f=family(name), level=+name.split('-').pop();
    const next=palette.filter(([k,t])=>family(k.slice(6))===f&&+k.split('-').pop()>level&&lightness(t.$value)<lightness(base)).sort((a,b)=>+a[0].split('-').pop()-+b[0].split('-').pop())[0];
    if(!next)throw Error('No darker same-family category border '+key);
    const before=theme['plx-sys'][borderKey].$value, after='{plx-ref.'+next[0]+'}';
    theme['plx-sys'][borderKey].$value=after;
    theme['plx-sys'][borderKey].$description='Category border: next darker same-family shade when the base and border coincide (owner, 2026-10-16).';
    changed.push({category:key.slice(9),before,after,hex:next[1].$value});
  }
  return changed;
}
function migrate(options={}) {
  const dest=validateChart(), changes=new Map(), report=[];
  const ref=json(refFile), R=ref['plx-ref'];
  const canonical=Object.entries(R).filter(([k,v])=>k.startsWith('color-')&&!v.$deprecated&&/^#[0-9a-f]{6}$/i.test(v.$value));
  if(canonical.length===70){
    for(const [n,v]of dest)if(R['color-'+n]?.$value!==v)throw Error('Partially migrated palette: '+n);
    console.log('PALETTE_70 already applied; refusing to map reused names again.');
    return {already:true,changes,report};
  }
  if(canonical.length!==83)throw Error('Expected original83 palette, got'+canonical.length);
  const source=flatten(ref), byOld=new Map(rows.map(r=>[r.originalToken,r]));
  for(const r of rows)if(R['color-'+r.originalToken]?.$value!==r.originalHex||R['color-'+r.originalToken].$deprecated)throw Error('Source identity mismatch '+r.originalToken);
  const identity = name => mapIdentity(R,rows,name);
  const replace = text => text.replace(/\{plx-ref\.color-([^}]+)\}/g,(all,n)=>'{plx-ref.color-'+identity(n)+'}').replace(/--plx-ref-color-([a-z0-9-]+)/g,(all,n)=>'--plx-ref-color-'+identity(n));
  // The entire original graph is retained until every consumer and alias has been planned.
  const finalRef=JSON.parse(JSON.stringify(ref)), out={};
  for(const [k,v]of Object.entries(R))if(!k.startsWith('color-')||!byOld.has(k.slice(6))&&!v.$deprecated)out[k]=v;
  for(const [name,value]of dest)out['color-'+name]=R['color-'+name]?.$value===value&&!R['color-'+name].$deprecated?R['color-'+name]:{$value:value,$type:'color',$description:'Canonical palette (owner revised 70-color proposal, 2026-10-16).'};
  for(const [key,t]of Object.entries(R)){
    const name=key.slice(6);if(!key.startsWith('color-')||dest.has(name)||(!t.$deprecated&&!byOld.has(name)))continue;
    const target=identity(name);
    out[key]={...t,$value:'{plx-ref.color-'+target+'}',$deprecated:'Retired palette alias: use --plx-ref-color-'+target+' (kept for one release).',$description:'Deprecated alias; migrated by original token identity.'};
  }
  finalRef['plx-ref']=out;changes.set(refFile,format(finalRef));
  const tracked=execFileSync('git',['ls-files'],{cwd:ROOT,encoding:'utf8'}).trim().split(/\r?\n/);
  const tokenFiles=tracked.filter(f=>/^platform\/tokens\/.+\.tokens\.json$/.test(f)&&f!==refFile);
  const beforeDocs=new Map(tokenFiles.map(f=>[f,json(f)])), afterDocs=new Map();
  for(const [file,doc]of beforeDocs){
    const copy=JSON.parse(JSON.stringify(doc));
    function walk(o){for(const [k,v]of Object.entries(o))if(k==='$value')o[k]=JSON.parse(replace(JSON.stringify(v)));else if(v&&typeof v==='object')walk(v);}
    walk(copy);
    if(file==='platform/tokens/theme-default.light.tokens.json'){ copy['plx-sys']['status-away'].$value='{plx-ref.color-brown-600}'; copy['plx-sys']['status-away'].$description='Away: owner-approved brown-600; retains the 3:1 minimum on light surfaces (2026-10-16).'; }
    afterDocs.set(file,copy);
    if(format(doc)!==format(copy)){changes.set(file,format(copy));report.push('Token consumers: '+file);}
  }
  // Only active CSS/JSX/JSON consumers move. Proposals and historic migration logs retain their source identities.
  for(const file of tracked.filter(f=>/^(platform|docs|dashboard|projects|messages|contacts|calendar|tasks|notes|bookmarks|files|settings|dam|suite)\//.test(f)&&/\.(css|jsx|json)$/.test(f)&&!f.startsWith('platform/tokens/')&&!f.startsWith('platform/design-system/')&&!f.startsWith('docs/color-consolidation/')&&!isGenerated(f))){
    const text=read(file), next=replace(text);
    if(next!==text){changes.set(file,next);const lines=text.split('\n');lines.forEach((line,i)=>{if(replace(line)!==line)report.push('Direct '+file+':'+(i+1)+' '+line.trim()+' -> '+replace(line).trim());});}
  }
  const borderChanges=[];
  for(const mode of ['light','dark']){
    const file='platform/tokens/theme-default.'+mode+'.tokens.json', theme=afterDocs.get(file);
    for(const key of Object.keys(theme['plx-sys']).filter(k=>/^category-brown(?:-|$)/.test(k))){
      const target=key.replace('category-brown','category-orange');
      theme['plx-sys'][key]={...theme['plx-sys'][key],$value:'{plx-sys.'+target+'}',$deprecated:'Use --plx-sys-'+target+'; Brown is retired in favor of Orange (kept for one release).'};
    }
    for(const change of categoryBorders(finalRef,theme))borderChanges.push({mode,...change});
    if(format(beforeDocs.get(file))!==format(theme))changes.set(file,format(theme));
  }
  report.push('\n## Owner-approved category border changes','| Mode | Category | Border before → after | Final color |','|---|---|---|---|');
  for(const c of borderChanges)report.push('| '+[c.mode,c.category,c.before+' → '+c.after,c.hex].join(' | ')+' |');
  const themes=['light','dark'];
  const graphFor=(docs,mode,reference)=>Object.assign({},flatten(reference),...Array.from(docs).filter(([f])=>!/^platform\/tokens\/theme-.+\.(light|dark)\.tokens\.json$/.test(f)||f==='platform/tokens/theme-default.'+mode+'.tokens.json').map(([,d])=>flatten(d)));
  for(const mode of themes)validateGraph(graphFor(afterDocs,mode,finalRef));
  const C={};vm.createContext(C);vm.runInContext(read('platform/utils/contrast.js').replace(/^export (const|function) /gm,'$1 ')+'\nthis.api={CONTRAST_PAIRS,contrastRatio};',C);
  const {CONTRAST_PAIRS,contrastRatio}=C.api;
  const modeGraphs=Object.fromEntries(themes.map(m=>[m,[graphFor(beforeDocs,m,ref),graphFor(afterDocs,m,finalRef)]]));
  const roles=[...new Set(themes.flatMap(m=>Object.keys(afterDocs.get('platform/tokens/theme-default.'+m+'.tokens.json')['plx-sys'])))];
  const roleChanges=[];
  report.push('\n## Changed semantic roles','| Role | Light before → after | Dark before → after | Contrast pairs before → after |','|---|---|---|---|');
  for(const role of roles){
    const values=themes.map(m=>modeGraphs[m].map(g=>resolve(g,'plx-sys.'+role)));
    if(!values.some(([a,b])=>a!==b))continue;
    roleChanges.push(role);
    const pairs=CONTRAST_PAIRS.filter(p=>p.fg===role||p.bg===role).flatMap(p=>themes.map(m=>{
      const ratios=modeGraphs[m].map(g=>contrastRatio(resolve(g,'plx-sys.'+p.fg),resolve(g,'plx-sys.'+p.bg)).toFixed(2));
      return m+' '+p.fg+'/'+p.bg+' ('+p.rule+'): '+ratios.join(' → ');
    }));
    report.push('| --plx-sys-'+role+' | '+values[0].join(' → ')+' | '+values[1].join(' → ')+' | '+(pairs.join('<br>')||'No registered pair')+' |');
  }
  const categoryKeys=roles.filter(r=>/^category-[a-z]+$/.test(r)&&!afterDocs.get('platform/tokens/theme-default.light.tokens.json')['plx-sys'][r].$deprecated), collisions=[];
  report.push('\n## Category collisions','| Mode | Channel | Categories | Final color |','|---|---|---|---|');
  for(const mode of themes)for(const suffix of ['','-soft','-soft-border','-on-soft']){
    const groups=new Map();for(const key of categoryKeys){const hex=resolve(modeGraphs[mode][1],'plx-sys.'+key+suffix);if(!groups.has(hex))groups.set(hex,[]);groups.get(hex).push(key.slice(9));}
    for(const [hex,names]of groups)if(names.length>1){const row=[mode,suffix||'base',names.join(', '),hex];collisions.push(row);report.push('| '+row.join(' | ')+' |');}
  }
  const tokens=Object.entries(out).filter(([k,v])=>k.startsWith('color-')&&!v.$deprecated&&/^#[0-9a-f]{6}$/i.test(v.$value));
  let palette='# Plenix color palette\n\n70 canonical colors in 12 families, including Black and White. Applied from the owner’s revised 70-color chart; no new hex values. Transparent tokens are separate.\n\n';
  palette+='Higher numbered shades are darker by Oklab L. System and category role names are preserved. Deprecated aliases last one release; reused names carry only their new meaning.\n\n| Family | Colors |\n|---|---|\n'+families.map(f=>'| '+f+' | '+tokens.filter(([k])=>family(k.slice(6))===f).length+' |').join('\n')+'\n\n';
  for(const f of families)palette+='## '+f[0].toUpperCase()+f.slice(1)+'\n\n| Token | Value | Oklab L |\n|---|---|---|\n'+tokens.filter(([k])=>family(k.slice(6))===f).map(([k,v])=>'| `--plx-ref-'+k+'` | `'+v.$value+'` | '+lightness(v.$value).toFixed(4)+' |').join('\n')+'\n\n';
  palette+='## Transparent\n\n| Token | Value |\n|---|---|\n'+Object.entries(out).filter(([k,v])=>k.startsWith('color-')&&!v.$deprecated&&!/^#[0-9a-f]{6}$/i.test(v.$value)).map(([k,v])=>'| `--plx-ref-'+k+'` | `'+v.$value+'` |').join('\n')+'\n\n## Deprecated aliases\n\n| Alias | Destination |\n|---|---|\n'+Object.entries(out).filter(([,v])=>v.$deprecated).map(([k,v])=>'| `--plx-ref-'+k+'` | `'+v.$value+'` |').join('\n')+'\n';
  changes.set('docs/palette.md',palette);
  const roleCell=(mode,key)=>{const t=afterDocs.get('platform/tokens/theme-default.'+mode+'.tokens.json')['plx-sys'][key];return '`'+t.$value+'` `'+resolve(modeGraphs[mode][1],'plx-sys.'+key)+'`';};
  let pills='# Plenix pills and color values\n\nThe owner’s revised 70-color palette has 12 families; see [Palette](palette.md) for every canonical color, transparent token and deprecated alias. The owner approved the remaining category mappings and retired Brown in favor of Orange.\n\n## Pill rule\n\nUse the existing soft fill, soft border and on-soft text roles; radius 4px. Statuses use semantic roles. There are 19 active categories. Brown is a deprecated alias of Orange for one release; existing Brown data uses Orange. Components read system roles, never hex values. Orange means action required; Yellow means waiting; Brown reference shades remain available; Brown is no longer a category.\n\n## Semantic pills\n\n| Variant | Light fill | Light border | Light text | Contrast |\n|---|---|---|---|---|\n';
  const semantic=[['Neutral','neutral'],['Success','success'],['Active','active'],['Waiting','waiting'],['Action required','action-required'],['Negative','negative']];
  for(const [label,key]of semantic){const g=modeGraphs.light[1], prefix='status-pill-'+key;pills+='| '+label+' | '+roleCell('light',prefix+'-background')+' | '+roleCell('light',prefix+'-border')+' | '+roleCell('light',prefix+'-text')+' | '+contrastRatio(resolve(g,'plx-sys.'+prefix+'-text'),resolve(g,'plx-sys.'+prefix+'-background')).toFixed(2)+' |\n';}
  for(const mode of themes){pills+='\n## Categories — '+mode+'\n\n| Category | Base | Soft | Border | Text | Text contrast |\n|---|---|---|---|---|---|\n';for(const key of categoryKeys){const g=modeGraphs[mode][1];pills+='| '+key.slice(9)+' | '+['','-soft','-soft-border','-on-soft'].map(s=>roleCell(mode,key+s)).join(' | ')+' | '+contrastRatio(resolve(g,'plx-sys.'+key+'-on-soft'),resolve(g,'plx-sys.'+key+'-soft')).toFixed(2)+' |\n';}}
  pills+='\n## Owner decisions\n\nBrown is retired: its system roles alias Orange for one release and it is omitted from the category pickers. Lime and Yellow share their base, as approved. Blue’s base becomes the primary brand blue; Cyan, Pink and Lavender borders use the next darker same-family shade, distinct from their bases. Olive’s base becomes Green 500, and Beige’s border becomes Orange 200. No alternate mapping has been invented.\n\n| Mode | Channel | Categories | Final color |\n|---|---|---|---|\n'+collisions.map(r=>'| '+r.join(' | ')+' |').join('\n')+'\n';
  pills+='\n## Category border rule\n\nA category border never equals its base. When their resolved colors coincide after migration, use the next darker canonical shade in the same family. Keep on-soft text contrast at least 4.5:1.\n\n| Mode | Category | Border before → after | Final color |\n|---|---|---|---|\n'+borderChanges.map(c=>'| '+[c.mode,c.category,c.before+' → '+c.after,c.hex].join(' | ')+' |').join('\n')+'\n';
  changes.set('docs/pills-and-colors.md',pills);
  console.log('PALETTE_70:83 rows,70 canonical,'+Object.values(out).filter(v=>v.$deprecated).length+' aliases; no new hex; all families darker by number; both theme graphs valid.');
  if(!report.some(r=>r.startsWith('Direct ')))report.push('Direct CSS/JSX/JSON consumers outside token files: none. Historical proposals/logs are preserved; palette and pill docs are regenerated.');
  console.log(report.join('\n'));console.log('\nChanged roles:'+roleChanges.length+'; files planned:'+changes.size+'\n'+[...changes.keys()].join('\n'));
  if(options.apply)for(const [file,text]of changes)fs.writeFileSync(path.join(ROOT,file),text);
  console.log(options.apply?'Applied from original snapshot.':'Dry run: nothing written.');
  return {changes,report,roleChanges,collisions};
}
module.exports={categoryBorders,mapIdentity,validateChart,flatten,resolve,validateGraph,lightness,migrate,rows};
if(require.main===module){try{migrate({apply:process.argv.includes('--apply')});}catch(e){console.error('PALETTE_70_FAIL '+e.message);process.exitCode=1;}}
