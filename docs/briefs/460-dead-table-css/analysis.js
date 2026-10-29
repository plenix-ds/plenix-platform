// which Table / DataGrid CSS selectors can never match: a selector naming a plx-table__ or plx-data-grid__ class that no
// source writes (exactly, by a literal prefix, or by the engine's block variable B / GRID + '__suffix')
const fs=require('fs'),path=require('path');const ROOT=process.argv[2],DS=process.argv[3],SJ=process.argv[4];
const postcss=require(ROOT+'/node_modules/postcss');
const files=[];const skip=/(node_modules|\.git|dist|release|packages|Archived|previews)$/;
const walk=(d)=>{if(!fs.existsSync(d))return;for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory()){if(!skip.test(e.name)&&!(d===ROOT+'/platform'&&e.name==='design-system'))walk(f);}else if(/\.(jsx?|mjs|cjs|html|md|json|ts|tsx)$/.test(e.name)&&!/\.min\.|app\.js$|assets\.js$|platform\.js$/.test(e.name))files.push(f);}};
['platform','suite','dashboard','projects','messages','contacts','calendar','tasks','notes','bookmarks','files','settings','dam','services','tests','tools','docs','templates'].forEach(d=>walk(path.join(ROOT,d)));
const nRepo=files.length;walk(DS);const nDs=files.length-nRepo;walk(SJ);const nSj=files.length-nRepo-nDs;
// generated bundles stay out (they come from these sources); the CSS files themselves are not readers
const corpus=files.filter(f=>!/\.css$/.test(f)).map(f=>fs.readFileSync(f,'utf8')).join('\n');
const exact=new Set(corpus.match(/plx-[a-z0-9_-]+/g)||[]);
const lit=new Set();for(const m of corpus.matchAll(/(plx-[a-z0-9_-]*[-_])['"`]\s*\+|(plx-[a-z0-9_-]*[-_])\$\{|['"`](plx-[a-z0-9_-]*[-_])['"`]/g))lit.add(m[1]||m[2]||m[3]);
// the engine's block variable: B+'__x', GRID+'__x', `${B}__x`, B + '__x-' + kind
const suf=new Set(),sufPre=new Set();
for(const m of corpus.matchAll(/\b(?:B|GRID|block|base|b)\s*\+\s*['"`]((?:__|--)[a-z0-9_-]+)['"`](\s*\+)?/g)){(m[2]?sufPre:suf).add(m[1]);}
for(const m of corpus.matchAll(/\$\{\s*(?:B|GRID|block|b)\s*\}((?:__|--)[a-z0-9_-]+)(\$\{)?/g)){(m[2]?sufPre:suf).add(m[1]);}
const read=(c)=>{if(exact.has(c))return 'exact';for(const p of lit)if(c.startsWith(p))return 'prefix '+p;const m=/^plx-(table|data-grid)((?:__|--)[a-z0-9_-]+)$/.exec(c);if(m){if(suf.has(m[2]))return 'block '+m[2];for(const p of sufPre)if(m[2].startsWith(p))return 'block-prefix '+p;}return null;};
const out={corpus:{files:files.length,repo:nRepo,spec:nDs,stjohn:nSj},suffixes:suf.size,suffixPrefixes:sufPre.size,files:{}};
for(const cssf of ['platform/components/Table/table-base.css','platform/components/DataGrid/data-grid.css']){
 const css=fs.readFileSync(path.join(ROOT,cssf),'utf8');const root=postcss.parse(css);const dead=[],partial=[];let deadBytes=0,cls=new Map();
 root.walkRules(r=>{if(r.parent&&r.parent.type==='atrule'&&/keyframes/.test(r.parent.name))return;const sels=r.selectors;const deadSel=sels.filter(s=>[...s.matchAll(/\.(plx-(?:table|data-grid)[a-z0-9_-]*)/g)].some(m=>{const ok=read(m[1]);cls.set(m[1],ok);return !ok;}));
  if(!deadSel.length)return;if(deadSel.length===sels.length){dead.push(r);deadBytes+=r.toString().length;}else partial.push({sel:deadSel,of:sels.length});});
 const unread=[...cls].filter(([c,ok])=>!ok).map(([c])=>c);
 out.files[cssf]={bytes:css.length,rules:dead.length,ruleBytes:deadBytes,partialRules:partial.length,partialSelectors:partial.reduce((a,p)=>a+p.sel.length,0),unreadClasses:unread.length,sample:unread.slice(0,200)};}
console.log(JSON.stringify(out,null,1));
