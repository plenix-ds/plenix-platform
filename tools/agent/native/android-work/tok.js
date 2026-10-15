const fs=require('fs');
const idx=JSON.parse(fs.readFileSync('D:/Documents/Projects/Projects_Applications/Plenix/platform/tokens/tokens.index.json','utf8')).tokens;
for(const p of process.argv.slice(2)){const re=new RegExp(p);for(const t of idx){if(re.test(t.name)){console.log(t.name.slice(2), '=', (t.sets[0]||{}).value, '=>', JSON.stringify(t.resolved));}}}
