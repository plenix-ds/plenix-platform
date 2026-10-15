const fs=require('fs'),path=require('path');const Babel=require('D:/Documents/Projects/Projects_Applications/Plenix/node_modules/@babel/standalone');
const dir=process.argv[2];const src=fs.readFileSync(path.join(dir,'samples.jsx'),'utf8');
const out=Babel.transform(src,{presets:['react'],sourceType:'script'}).code;
fs.writeFileSync(path.join(dir,'samples.js'),'/* compiled from samples.jsx; do not edit */\n(function () {\n'+out+'\n})();\n');console.log('built',dir);
