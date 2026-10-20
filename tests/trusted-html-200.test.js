const assert=require('node:assert/strict'),{serve,launch}=require('./lib');
(async()=>{const port=+process.env.TEST_PORT||9782,server=await serve(port);let browser;
try{browser=await launch();const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+port+'/Plenix/tests/fixtures/trusted-200.html',{waitUntil:'networkidle0'});await page.waitForFunction(()=>window.Plenix&&window.ReactDOM);
const result=await page.evaluate(()=>{
 let enforced=false;try{document.createElement('div').innerHTML='<p>unsafe</p>';}catch(e){enforced=e instanceof TypeError;}
 const h=React.createElement,host=document.getElementById('fixture'),root=ReactDOM.createRoot(host);
 const dirty='<p onclick="window.bad200=1">Hello <b>safe</b><a href="java&#10;script:alert(1)">link</a><img src="javascript:alert(1)" onerror="window.bad200=2"><script>window.bad200=3</script></p>';
 ReactDOM.flushSync(()=>root.render(h(Plenix.RichText,{html:dirty})));
 const safe=host.textContent.includes('Hello safe')&&!host.querySelector('script,svg,[onclick],[onerror],a[href],img')&&!window.bad200;
 const clean=Plenix.cleanRichText(dirty),cleanSafe=clean.includes('<strong>safe</strong>')&&!/script|onclick|onerror/i.test(clean);
 ReactDOM.flushSync(()=>root.render(h(Plenix.RichText,null,h('p',null,'JSX only'))));
 const switched=host.textContent==='JSX only';
 return {enforced,safe,cleanSafe,switched};});assert.deepEqual(result,{enforced:true,safe:true,cleanSafe:true,switched:true});assert.deepEqual(errors,[]);console.log('TRUSTED_HTML_200_OK '+JSON.stringify(result));
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});
