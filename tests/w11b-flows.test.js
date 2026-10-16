// Plenix · lane B workflow regressions: explicit access, controlled permissions, optional education and help.
const fs = require('fs'), path = require('path'), assert = require('assert');
const {serve, launch} = require('./lib.js');
if (!fs.existsSync(path.join(__dirname,'../platform/design-system/index.html'))) {
  console.log('W11B_OK skipped: design system is not checked out'); process.exit(0);
}
(async () => {
  const server = await serve(+process.env.TEST_PORT || 8941); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(), errors = [];
    page.on('pageerror',e=>errors.push(String(e)));
    await page.goto('http://127.0.0.1:'+(+process.env.TEST_PORT||8941)+'/Plenix/platform/design-system/',{waitUntil:'networkidle0'});
    const checks = await page.evaluate(async () => {
      const P=window.Plenix,R=window.React,D=window.ReactDOM,h=R.createElement;
      const host=document.createElement('div');host.id='plx-w11b-tests';document.body.appendChild(host);
      let root=D.createRoot(host),checks=0;
      const wait=(n=50)=>new Promise(r=>setTimeout(r,n));
      const assert=(ok,msg)=>{if(!ok)throw new Error(msg);checks++;};
      const mount=async(node)=>{D.flushSync(()=>root.render(node));await wait(150);};
      const reset=async()=>{D.flushSync(()=>root.unmount());root=D.createRoot(host);await wait();};
      const button=(text,scope=document)=>[...scope.querySelectorAll('button')].find(b=>b.textContent.trim()===text);
      const click=async(text,scope=document)=>{const b=button(text,scope);if(!b)throw new Error('Missing button '+text);b.click();await wait();};
      const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return {resolve,reject,promise};};
      const people=[{value:'maya',label:'Maya Chen'},{value:'alex',label:'Alex Kim'}];
      // Editing existing access is a draft until persistence succeeds.
      let request=deferred(),saves=[],closed=0;
      await mount(h(P.ShareDialog,{open:true,title:'Share record',people,grants:[{person:'maya',role:'viewer'}],url:'https://example.com/record',
        onSave:v=>{saves.push(v);return request.promise;},onClose:()=>closed++}));
      const role=document.querySelector('select[aria-label="Role: Maya Chen"]');
      role.value='editor';role.dispatchEvent(new Event('change',{bubbles:true}));await wait();
      assert(saves.length===0,'Role edits must not persist silently');
      await click('Save access');button('Save access').click();await wait();
      assert(saves.length===1&&saves[0].grants[0].role==='editor','Save must persist the draft exactly once');
      assert(document.querySelector('select[aria-label="Role: Maya Chen"]').disabled,'Pending access changes must be locked');
      request.reject(new Error('network'));await wait();
      assert(document.querySelector('[role="alert"]')&&closed===0,'Failed sharing must preserve the dialog');
      await click('Cancel');assert(document.querySelector('[role="alertdialog"]')&&closed===0,'Dirty access changes need confirmation');
      await click('Keep editing');assert(closed===0,'Keeping access edits retains them');
      request=deferred();await click('Save access');request.resolve();await wait();
      assert(closed===1,'Successful access save can close');
      await reset();
      // Link copy never changes access; unsupported Web Share falls back to copy.
      await mount(h(P.ShareDialog,{open:true,title:'Share link',initialTab:'link',url:'https://example.com/record',onClose:()=>{},webShare:false}));
      assert(document.querySelector('[role=dialog] select').value==='restricted','Link access defaults to restricted');
      assert([...document.querySelectorAll('button')].some(b=>(b.getAttribute('aria-label')||'').includes('Copy link')),'Copy link remains available');
      assert(!button('Share using device'),'Web Share can be disabled');
      await reset();
      // Controlled checklist counts only known ids; native controls update immutably.
      let completed=['a','stale'],dismiss=0;
      function Tasks(){const [v,set]=R.useState(completed);return h(P.Checklist,{title:'Setup',items:[{id:'a',label:'Profile'},{id:'b',label:'Invite team'},{id:'c',label:'Locked task',disabled:true}],completed:v,onChange:n=>{completed=n;set(n);},onDismiss:()=>dismiss++,collapsible:true});}
      await mount(h(Tasks));
      assert(host.textContent.includes('1 / 3'),'Checklist excludes unknown completed ids');
      host.querySelectorAll('input[type=checkbox]')[1].click();await wait();
      assert(completed.join()==='a,b','Checklist updates known ids without mutating the input');
      assert(host.querySelectorAll('input[type=checkbox]')[2].disabled,'Disabled tasks stay disabled');
      await click('Setup',host);await click('Setup',host);assert(completed.join()==='a,b','Collapsing retains progress');
      await click('Dismiss checklist',host);assert(dismiss===1,'Checklist dismissal is explicit');
      await reset();
      // Tour remembers the chosen step after skip and resumes without resetting.
      let at=0,reason;
      function Guided(){const [open,set]=R.useState(true);return h(P.Tour,{open,onOpenChange:set,spotlight:false,onStepChange:i=>at=i,onFinish:r=>reason=r,
        steps:[{id:'a',title:'Library',target:h(P.Button,null,'Library target'),content:'Find records here.'},{id:'b',title:'Views',target:h(P.Button,null,'Views target'),content:'Save your filters.'}]});}
      await mount(h(Guided));await click('Next');assert(at===1,'Tour advances and reports its step');
      await click('Skip tour');assert(reason==='skip'&&!document.querySelector('.plx-teaching-bubble'),'Skip closes education');
      await click('Resume tour');assert(document.querySelector('.plx-teaching-bubble').textContent.includes('Views'),'Resume retains the last step');
      await click('Finish tour');assert(reason==='complete','Finishing reports completion separately from skip');
      await reset();
      // Welcome can be skipped without hiding setup tasks.
      await mount(h(P.Onboarding,{title:'Welcome',tasks:[{id:'a',label:'Set up profile'}],completed:[],onChange:()=>{}},h(P.Text,null,'Welcome content')));
      await click('Skip welcome');assert(!document.querySelector('[role=dialog]')&&host.textContent.includes('Set up profile'),'Skipping welcome leaves setup available');
      await reset();
      let seen=0;await mount(h(P.FeatureIntro,{title:'Saved views',onDismiss:()=>seen++},h(P.Text,null,'Save useful filters.')));
      assert(host.querySelector('.plx-badge__icon'),'New status is an icon Badge');
      await click('What is new');assert(document.querySelector('[role=dialog]').textContent.includes('Save useful filters.'),'Feature details open on request');
      await click('Got it');assert(seen===1&&!document.querySelector('[role=dialog]'),'Dismiss records seen state');
      await reset();
      // Help search and back keep the user in context.
      await mount(h(P.HelpPanel,{title:'Help',articles:[{id:'a',title:'Create record',summary:'Add an item',content:h(P.Text,null,'Enter record details.')},{id:'b',title:'Share record',summary:'Invite a person',content:h(P.Text,null,'Choose a role.')}]}));
      await click('Share record',host);assert(host.textContent.includes('Choose a role.'),'Help opens the selected article');
      await click('Back to articles',host);assert(button('Create record',host),'Back restores article results');
      const search=host.querySelector('input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(search,'missing');search.dispatchEvent(new Event('input',{bubbles:true}));await wait();
      assert(host.textContent.includes('No matching articles'),'Help has an explicit empty search state');
      await reset();
      // Permission matrices preserve locked subjects and save only on request.
      let rights,saveCount=0,persist=deferred();
      function Matrix(){const [v,set]=R.useState({viewer:['view'],owner:['view','edit']});rights=v;return h(P.PermissionsEditor,{subjects:[{id:'viewer',label:'Viewer'},{id:'owner',label:'Owner',locked:true}],capabilities:[{id:'view',label:'View'},{id:'edit',label:'Edit'}],value:v,onChange:set,onSave:()=>{saveCount++;return persist.promise;}});}
      await mount(h(Matrix));await wait(1500);
      const boxes=[...host.querySelectorAll('input[type=checkbox]')];
      assert(boxes.length===4,'Permission grid has one checkbox per intersection');
      assert(boxes.filter(b=>b.disabled).length===2,'Locked subject cells are read-only');
      const editBox=boxes.find(b=>b.closest('label').textContent.includes('Viewer: Edit'));editBox.click();await wait();
      assert(rights.viewer.includes('edit')&&saveCount===0,'Matrix changes are controlled drafts');
      await click('Save permissions',host);assert(saveCount===1,'Permission save is explicit');
      persist.reject(new Error('network'));await wait();assert(host.textContent.includes('Could not save permissions')&&rights.viewer.includes('edit'),'Failed permission save retains draft');
      await reset();D.flushSync(()=>root.unmount());host.remove();return checks;
    });
    assert.deepStrictEqual(errors,[]);console.log('W11B_OK '+checks+' workflow checks');
  } finally {if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1);});
