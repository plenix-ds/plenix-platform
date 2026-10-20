// Normalize runner-only locations; retain assertions, findings, route names and counts.
const fs=require('fs'),path=require('path');const dir=process.argv[2],out=[];
for(const name of ['visual','theme','data-table','labs','pages','targets','reflow','a11y']){
 const a=path.join(dir,name+'-base.log'),b=path.join(dir,name+'-head.log');if(!fs.existsSync(a)||!fs.existsSync(b))continue;
 const normalize=s=>s.replaceAll('task182-base','task182').replace(/plx-theme-good-[a-zA-Z0-9]+/g,'plx-theme-good-TEMP').replace(/plx-theme-bad-[a-zA-Z0-9]+/g,'plx-theme-bad-TEMP');
 const base=normalize(fs.readFileSync(a,'utf8')),head=normalize(fs.readFileSync(b,'utf8'));
 out.push({test:name,normalizedEqual:base===head,baseSummary:base.split(/\r?\n/).filter(x=>/^(?:[A-Z_]+_(?:OK|FAIL)|Error|ProtocolError|TIMEOUT|  FAIL|FAIL )/.test(x)),headSummary:head.split(/\r?\n/).filter(x=>/^(?:[A-Z_]+_(?:OK|FAIL)|Error|ProtocolError|TIMEOUT|  FAIL|FAIL )/.test(x))});
}
console.log(JSON.stringify(out,null,2));
