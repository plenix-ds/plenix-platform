/* CDN artifact and development token-check regressions. Build packages first; no publishing occurs. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const ROOT=path.resolve(__dirname,'..');
if(!fs.existsSync(path.join(ROOT,'platform/design-system/inventory.js'))){console.log('CDN_DEVX_SKIP no design system');process.exit(0);}
let checks=0;const ok=(value,message)=>{assert.ok(value,message);checks++;};
(async()=>{
 const builder=fs.readFileSync(path.join(ROOT,'build-packages.js'),'utf8'),start=builder.indexOf('// CDN documentation helpers:'),end=builder.indexOf('// End CDN documentation helpers.');
 ok(start>=0&&end>start,'Documentation helpers are available for isolated fixture checks');
 const ctx=vm.createContext({VERSION:'1.2.3',SITE:'https://example.test'});vm.runInContext(builder.slice(start,end),ctx);
 const fixture=['# Changes','## [Unreleased]','### Changed','- Future change','## [1.2.3] - 2026-10-15','### Added','- New component','### Changed','- Existing behavior','  continues here.','### Removed','- Removed option','## [1.2.2] - 2026-10-14','### Fixed','- Old bug'].join('\n');
 const versions=ctx.cdnChangelog(fixture);
 ok(versions.length===2&&versions[0].version==='1.2.3'&&versions[0].date==='2026-10-15','Only concrete released versions enter the CDN index');
 ok(JSON.stringify(versions[0].breaking)===JSON.stringify(['Existing behavior continues here.','Removed option']),'Changed and Removed sections preserve wrapped entries without Added or Unreleased entries');
 ok(versions[1].breaking.length===0,'Versions without Changed or Removed have an empty list');
 const source=['/* Plenix · Example','   Summary: One summary.','   Usage:','     <Example value="text" />','     <Example disabled />','   Props:','     value: the text','       kept by the caller','     onChange(text): saves a value','   Behavior: An explicit action.','*/','throw new Error("Do not execute examples");'].join('\r\n');
 const head=ctx.cdnHeader(source);
 ok(head.summary==='One summary.'&&head.usage.includes('<Example disabled />'),'Header parsing preserves multiline Windows usage examples');
 ok(head.props.length===2&&head.props[0][1]==='the text kept by the caller','Header parsing keeps callback names and wrapped prop descriptions');
 const markdown=ctx.cdnRecordDoc({id:'example',sec:'actions',leaf:'Example',src:'components/Example/Example.jsx',examples:[['Variants',[['Disabled',()=>{throw Error('Never render');},null,'disabled']]]]}, {purpose:'Written purpose'}, source);
 ok(markdown.includes('Written purpose')&&markdown.includes('## Usage')&&markdown.includes('## Props')&&markdown.includes('## Examples'),'Record docs combine written purpose, header props and usage');
 ok(markdown.includes('### Variants')&&markdown.includes('- Disabled')&&markdown.includes('https://example.test/#/actions/example'),'Record examples retain labels, prop snippets and the live route without executing JSX');
 ok(ctx.cdnCode('```').startsWith('````'),'Markdown fences cannot be broken by an embedded code fence');
 const version=require(path.join(ROOT,'package.json')).version,cdn=path.join(ROOT,'release/cdn',version),load=file=>JSON.parse(fs.readFileSync(path.join(cdn,file),'utf8'));
 ok(fs.readFileSync(path.join(cdn,'CHANGELOG.md'),'utf8')===fs.readFileSync(path.join(ROOT,'CHANGELOG.md'),'utf8'),'CDN changelog is an exact source copy');
 const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'release/cdn/index.json'),'utf8')),current=load('index.json');
 ok(catalog.latest===version&&catalog.versions.some(v=>v.version===version)&&Array.isArray(current.breaking),'Both CDN indexes identify the built version and expose breaking lists');
 ok(catalog.versions.some(v=>v.breaking.length>0),'Actual historical Changed/Removed entries are published');
 const tokens=load('tokens.json'),index=JSON.parse(fs.readFileSync(path.join(ROOT,'platform/tokens/tokens.index.json'),'utf8'));
 ok(tokens.count===index.tokens.length&&tokens.tokens.length===tokens.count,'Published token list contains every source-index token');
 ok(tokens.tokens.every(t=>typeof t.name==='string'&&['plx-ref','plx-sys','plx-comp'].includes(t.tier)&&typeof t.purpose==='string'&&t.value!==undefined&&Array.isArray(t.values)),'Token metadata includes names, tiers, purposes and contextual values');
 const contextual=index.tokens.find(t=>t.resolved&&Object.keys(t.resolved).length>1);
 ok(!contextual||JSON.stringify(tokens.tokens.find(t=>t.name===contextual.name).value)===JSON.stringify(contextual.resolved),'Resolved theme/density values are preserved rather than flattened');
 const docs=load('docs/index.json'),components=JSON.parse(fs.readFileSync(path.join(ROOT,'release/api/v1/components.json'),'utf8')).components;
 ok(docs.count===components.length&&docs.records.length===docs.count,'Every built record has a discoverable Markdown file');
 ok(docs.records.every(r=>fs.existsSync(path.join(cdn,'docs',r.href))),'Every documentation index link resolves');
 const button=fs.readFileSync(path.join(cdn,'docs/button.md'),'utf8');
 ok(button.includes('## Purpose')&&button.includes('## Usage')&&button.includes('## Props')&&button.includes('## Examples')&&button.includes('variant')&&button.includes('<Button'),'Button docs contain actual source-header API and JSX examples');
 ok(fs.readFileSync(path.join(cdn,'token-check.js'),'utf8')===fs.readFileSync(path.join(ROOT,'platform/dev/token-check.js'),'utf8'),'Opt-in checker is copied to the same versioned CDN directory');
 const checker=fs.readFileSync(path.join(ROOT,'platform/dev/token-check.js'),'utf8');
 const style=values=>Object.assign(Object.keys(values),{getPropertyValue:name=>values[name]});
 const unknownSheet={cssRules:[{style:style({color:'var(--plx-typo, var(--plx-nested-typo))','--plx-private':'var(--plx-sys-valid)',padding:'var(--plx-private)',content:'"var(--plx-string-only)"'})}]};
 const unreadable={href:'https://external.invalid/styles.css'};Object.defineProperty(unreadable,'cssRules',{get(){throw Error('Cross origin');}});
 async function run({host='localhost',mode=null,src='http://localhost/Plenix/platform/dev/token-check.js',fail=false}={}){
  const warnings=[],fetches=[],document={baseURI:'http://localhost/Plenix/',readyState:'complete',currentScript:{src,getAttribute:name=>name==='data-mode'?mode:null},styleSheets:[{cssRules:[{style:style({color:'var(--plx-sys-valid)'})},{cssRules:unknownSheet.cssRules},{styleSheet:unreadable}]}],adoptedStyleSheets:[]};
  const global={document,location:{hostname:host},console:{warn:message=>warnings.push(message)},fetch:async address=>{fetches.push(address);return {ok:!fail,status:404,json:async()=>({tokens:[{name:'--plx-sys-valid'}]})};}};
  vm.runInNewContext(checker,{window:global,URL,Set,Promise});
  const result=global.PlenixTokenCheck?await global.PlenixTokenCheck.ready:null;return{global,document,warnings,fetches,result};
 }
 let got=await run();ok(got.result.unknown.join(',')==='--plx-nested-typo,--plx-typo','Checker finds nested undefined references and ignores quoted text/private declarations');
 ok(got.result.skipped.length===1&&got.warnings.length===1,'Inaccessible stylesheets are returned without aborting other sheets');
 got.global.PlenixTokenCheck.report();ok(got.warnings.length===1,'Repeated audits warn only once per unknown name');
 got.document.adoptedStyleSheets.push({cssRules:[{style:style({color:'var(--plx-new-typo)'})}]});got.global.PlenixTokenCheck.report();ok(got.warnings.length===2&&got.warnings[1].includes('--plx-new-typo'),'Adopted stylesheets and later new mistakes can be audited');
 ok(got.fetches[0]==='http://localhost/Plenix/platform/tokens/tokens.index.json','Source checker resolves the local source token index');
 got=await run({host:'app.example.test'});ok(!got.global.PlenixTokenCheck&&got.fetches.length===0&&got.warnings.length===0,'Production pages stay inert with no network request or warning');
 got=await run({host:'app.example.test',mode:'development',src:'https://cdn.example.test/cdn/1.2.3/token-check.js'});ok(got.fetches[0]==='https://cdn.example.test/cdn/1.2.3/tokens.json','Remote development explicitly opts in against the same CDN version');
 got=await run({fail:true});ok(got.result.error==='HTTP 404'&&!got.result.unknown.length&&got.warnings[0].includes('could not load'),'Index failures never label all real tokens unknown');
 console.log('CDN_DEVX_OK '+checks+' checks, '+docs.count+' Markdown records, '+tokens.count+' tokens');
})().catch(error=>{console.error(error);process.exitCode=1;});
