// #197 exact-base CI comparison: identical test scopes and runner, no baseline updates.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const head=__dirname.replace(/[\\/]tests$/,''),base=process.argv[2],out=process.argv[3];
if(process.env.PLX197_PRELOAD){
 const Module=require('module'),load=Module._load,scope=require(path.join(process.env.PLX197_HEAD,'tests/changed.js'));
 if(process.env.PLX197_A11Y_FOCUS){scope.pages=()=>[];scope.routesIn=async()=>['#/data-display/card'];scope.anyDS=()=>true;scope.dsHome=()=>false;}
 Module._load=function(id,parent,...args){if(id==='./changed.js'&&parent?.filename.includes(path.sep+'tests'+path.sep))return scope;return load.call(this,id,parent,...args);};
}else{
 fs.mkdirSync(out,{recursive:true});const tests=(process.env.PAIR_TESTS||'visual,theme,data-table,labs,pages,targets,reflow').split(',');
 const results=[];
 for(const name of tests)for(const [label,root] of [['base',base],['head',head]]){
  const env={...process.env,PLX197_PRELOAD:'1',PLX197_HEAD:head,CHANGED_BASE:'e9782b790039f5cdaea852cfe016eca3ef4b387d',TEST_PORT:process.env.PAIR_PORT||'9651',TARGETS_PORT:process.env.PAIR_PORT||'9651',LABS_PORT:process.env.PAIR_PORT||'9651',TEST_TIMEOUT_MS:'600000',PAGES_TRACE:'1'};
  delete env.TEST_SHARD;delete env.TEST_SCOPE;
  if(name==='labs')env.LABS_ONLY='text-field,user-card,feature-card,prompt-dialog';
  const r=cp.spawnSync(process.execPath,['-r',__filename,path.join(root,'tests',name+'.test.js')],{cwd:root,env,encoding:'utf8',timeout:660000,maxBuffer:64*1024*1024});
  fs.writeFileSync(path.join(out,name+'-'+label+'.log'),(r.stdout||'')+(r.stderr||''));
  const entry={name,label,status:r.status,error:r.error?.message,signal:r.signal};results.push(entry);console.log(JSON.stringify(entry));fs.writeFileSync(path.join(out,'status.json'),JSON.stringify(results,null,2));
 }
}
