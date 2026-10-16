/* Plenix · paired table performance
   Summary: Runs the identical rich 600-row fixture against both engines in isolated browsers.
   Usage: PERF_REPORT=<combined JSON path> node tests/data-table-next-perf.test.js.
   Props: Chrome and the built Platform bundle.
   Behavior: Reports four plain/saved scenarios per engine, then enforces the trial's timing targets.
   Notes: Existing-engine misses are reported for comparison; its accepted baseline has a documented opening cost. */
const fs=require('fs'),path=require('path'),os=require('os'),{spawnSync}=require('child_process');
const files=[],report=[];
try {
 for(const engine of ['current','next']){
  const file=path.join(os.tmpdir(),'plenix-perf-'+process.pid+'-'+engine+'.json');files.push(file);
  const result=spawnSync(process.execPath,[path.join(__dirname,'data-table-perf.test.js')],{cwd:path.resolve(__dirname,'..'),env:{...process.env,DT_ENGINE:engine,PERF_BASELINE:engine==='current'?'1':'',PERF_REPORT:file,TEST_PORT:engine==='current'?'9280':'9281'},encoding:'utf8',timeout:240000,maxBuffer:2*1024*1024});
  process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
  if(fs.existsSync(file))report.push(...JSON.parse(fs.readFileSync(file,'utf8')));
  if(result.error||result.status!==0)throw result.error||Error(engine+' performance checks failed ('+result.status+')');
 }
 if(process.env.PERF_REPORT)fs.writeFileSync(process.env.PERF_REPORT,JSON.stringify(report,null,2)+'\n');
 console.log('DATA_TABLE_NEXT_PERF_OK 8 identical rich-cell scenarios, including scrolling');
} finally {for(const file of files)if(fs.existsSync(file))fs.unlinkSync(file);}
