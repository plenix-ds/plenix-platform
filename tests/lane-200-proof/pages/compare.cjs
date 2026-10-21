const fs=require('fs'),path=require('path'),Module=require('module');
const root=process.argv[2],file=path.join(root,'tests/pages.test.js');let source=fs.readFileSync(file,'utf8');
const routes=['#/navigation/application-header/v/accent-header','#/content/rich-text/v/article-rich-text','#/specialized/mention-input/v/mention-in-a-text-area'];
const substitutions=[['for (const a of APP_PAGES)', 'for (const a of [])'],['const DS_OPEN = HAS_DS && changed.anyDS();','const DS_OPEN = HAS_DS;'],['const routes = DS_OPEN ? await changed.routesIn(page, all) : [];','const routes = '+JSON.stringify(routes)+';']];
for(const [from,to] of substitutions){if(!source.includes(from))throw Error('Unmatched focused scope: '+from);source=source.replace(from,to);}
source=source.replace("  let current", "  let current");
const mod=new Module(file,module);mod.filename=file;mod.paths=Module._nodeModulePaths(path.dirname(file));mod._compile(source,file);
