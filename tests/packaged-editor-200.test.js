const assert=require('node:assert/strict'),{serve,launch}=require('./lib');
(async()=>{const port=+process.env.TEST_PORT||9783,server=await serve(port);let browser;
try{browser=await launch();const page=await browser.newPage(),requests=[],errors=[];page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+port+'/Plenix/tests/fixtures/'+(process.env.GLOBAL_EDITOR?'global-200.html':process.env.TRUSTED_PACKAGE?'packages-trusted-200.html':'packages-200.html'),{waitUntil:'networkidle0'});
if(!process.env.GLOBAL_EDITOR) await page.evaluate(()=>{window.PlenixTiptap={Editor(){throw Error('Packaged editor reused an ambient engine');}};});
if(process.env.TRUSTED_PACKAGE) assert.equal(await page.evaluate(()=>{try{document.createElement('div').innerHTML='<p>blocked</p>';return false;}catch(e){return e instanceof TypeError;}}),true,'Trusted Types enforcement is active');
await page.evaluate(async global=>{window.Package200=global?window.Plenix:await import('/Plenix/packages/react/dist/index.js');},!!process.env.GLOBAL_EDITOR);
assert.equal(requests.filter(u=>/chunks\/tiptap-engine/.test(u)).length,0,'no editor code loaded by package import');
assert.equal(await page.evaluate(()=>!!document.querySelector('script[type=speculationrules],link[rel=prefetch]')),false,'no import prefetch effects');
await page.evaluate(()=>{window.change200=[];ReactDOM.createRoot(document.getElementById('fixture')).render(React.createElement(Package200.RichTextEditor,{label:'Packaged editor',defaultValue:'<p>Hello editor</p>',onChange:html=>change200.push(html)}));});
await page.waitForFunction(()=>document.querySelector('.ProseMirror'));
assert.equal(requests.filter(u=>process.env.GLOBAL_EDITOR?/vendor\/tiptap\/tiptap.min.js/.test(u):/chunks\/tiptap-engine/.test(u)).length,1,'one local lazy engine load');
await page.click('.ProseMirror');await page.keyboard.press('End');await page.keyboard.type(' typed');await page.waitForFunction(()=>change200.some(html=>html.includes('typed')));
await page.evaluate(()=>{const iframe=document.createElement('iframe');document.body.appendChild(iframe);ReactDOM.createRoot(iframe.contentDocument.body).render(React.createElement(Package200.RichTextEditor,{label:'Framed editor',defaultValue:'<p>Frame safe</p>'}));});
await page.waitForFunction(()=>document.querySelector('iframe').contentDocument.querySelector('.ProseMirror'));
assert.ok(await page.evaluate(()=>document.querySelector('iframe').contentDocument.body.textContent.includes('Frame safe')),'per-window editor factory');
assert.equal(requests.filter(u=>process.env.GLOBAL_EDITOR?/vendor\/tiptap\/tiptap.min.js/.test(u):/chunks\/tiptap-engine/.test(u)).length,process.env.GLOBAL_EDITOR?2:1,'engine initialized per frame, packaged chunk reused');
assert.ok(requests.every(u=>u.startsWith('http://127.0.0.1:'+port)||u.startsWith('data:')),'no runtime remote requests');assert.deepEqual(errors,[]);console.log('PACKAGED_EDITOR_200_OK '+(process.env.TRUSTED_PACKAGE?'Trusted Types enforced; ':'')+'lazy local chunk; typing; per-window factory; no remote code or import effects');
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});

