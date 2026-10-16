// node tools/agent/build-study.js <study folder> [source.jsx]   compiles a study page's JSX (default samples.jsx) to .js
const fs=require('fs'),path=require('path');const Babel=require(path.resolve(__dirname,'../../node_modules/@babel/standalone'));
const dir=process.argv[2];const name=process.argv[3]||'samples.jsx';const src=fs.readFileSync(path.join(dir,name),'utf8');
const out=Babel.transform(src,{presets:['react'],sourceType:'script'}).code;const js=name.replace(/\.jsx$/,'.js');
fs.writeFileSync(path.join(dir,js),'/* compiled from '+name+'; do not edit */\n(function () {\n'+out+'\n})();\n');console.log('built',path.join(dir,js));
