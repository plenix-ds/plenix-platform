// Plenix tests · wave 10 lane C: persistence ordering, validation and recovery in real Platform compositions.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { serve, launch } = require('./lib.js');
if (!fs.existsSync(path.join(__dirname, '../platform/design-system/index.html'))) {
  console.log('W10C_OK skipped: design system is not checked out');
  process.exit(0);
}
(async () => {
  const server = await serve(+process.env.TEST_PORT || 8933);
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('http://127.0.0.1:' + (+process.env.TEST_PORT || 8933) + '/Plenix/platform/design-system/index.html', { waitUntil: 'networkidle0' });
    const checks = await page.evaluate(async () => {
      const P = window.Plenix, R = window.React, D = window.ReactDOM, h = R.createElement;
      const host = document.createElement('div'); host.id = 'plx-workflow-test'; document.body.appendChild(host);
      let root = D.createRoot(host), checks = 0;
      const wait = (ms = 30) => new Promise((r) => setTimeout(r, ms));
      const assert = (ok, message) => { if (!ok) throw new Error(message); checks++; };
      const mount = async (node) => { D.flushSync(() => root.render(node)); await wait(); };
      const reset = async () => { D.flushSync(() => root.unmount()); root = D.createRoot(host); await wait(); };
      const click = async (text, scope = host) => {
        const b = [...scope.querySelectorAll('button')].find((b) => (b.querySelector('.plx-progress-steps__label')?.textContent || b.textContent).trim() === text);
        if (!b) throw new Error('Missing button: ' + text);
        b.click(); await wait();
      };
      const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return {promise,resolve,reject}; };
      // Autosave: initial values are clean, overlapping edits are serialized, and the latest edit wins.
      let edit, save, writes = [], first = deferred();
      function Saving() {
        const [v, set] = R.useState('initial'); edit = set;
        save = P.useAutosave(v, (value) => { writes.push(value); return value === 'first' ? first.promise : Promise.resolve(); }, { delay: 5 });
        return h(P.Autosave, { state: save.state, onRetry: save.retry });
      }
      await mount(h(Saving)); assert(writes.length === 0 && !save.dirty, 'Initial value must not save');
      D.flushSync(() => edit('first')); await wait();
      D.flushSync(() => edit('latest')); await wait();
      assert(writes.join() === 'first', 'Only one request may be in flight');
      first.resolve(); await wait(80);
      assert(writes.join() === 'first,latest' && save.state === 'saved' && !save.dirty, 'Latest edit must persist after the first');
      await reset();
      // Failure preserves dirty data and Retry actually persists it.
      let reject = true;
      function FailedSave() {
        const [v, set] = R.useState('initial'); edit = set;
        save = P.useAutosave(v, () => reject ? Promise.reject(new Error('network')) : Promise.resolve(), {delay: 5});
        return h(P.Autosave, {state: save.state, onRetry: save.retry});
      }
      await mount(h(FailedSave)); D.flushSync(() => edit('changed')); await wait(70);
      assert(save.state === 'failed' && save.dirty, 'Failed save must remain dirty');
      assert(host.querySelector('[role="alert"]'), 'Failed status must announce an alert');
      reject = false; await click('Retry');
      assert(save.state === 'saved' && !save.dirty, 'Retry must clear dirty state only after success');
      await reset();
      // Offline edits are retained and reconnect triggers a write.
      writes = [];
      await mount(h(Saving)); window.dispatchEvent(new Event('offline'));
      D.flushSync(() => edit('offline edit')); await wait();
      assert(save.state === 'offline' && save.dirty && writes.length === 0, 'Offline edits must not be dropped or submitted');
      window.dispatchEvent(new Event('online')); await wait(70);
      assert(writes.join() === 'offline edit' && !save.dirty, 'Reconnect must persist the pending edit');
      await reset();
      // Unmount cancels the debounce timer.
      let calls = 0;
      function Pending() { const [v,set] = R.useState('initial'); edit=set; P.useAutosave(v, () => {calls++;}, {delay: 100}); return null; }
      await mount(h(Pending)); D.flushSync(() => edit('pending')); await reset(); await wait(120);
      assert(calls === 0, 'Unmount must cancel scheduled persistence');
      // Wizard validation, Back state retention and failed completion.
      let finished = 0, fail = true, name = '', update;
      function Steps() {
        const [v,set] = R.useState(''); name=v; update=set;
        return h(P.Wizard, {label: 'Test wizard', steps: [
          {id:'name', label:'Details', validate: () => v ? '' : 'Enter a name.', content: h(P.Field,{label:'Name'},h(P.Input,{value:v,onChange:e=>set(e.target.value)}))},
          {id:'review',label:'Review',content:h(P.Text,null,'Check the details.')}
        ], onComplete: () => { finished++; if (fail) return Promise.reject(new Error('save')); }});
      }
      await mount(h(Steps)); await click('Next');
      assert(host.textContent.includes('Enter a name.') && !host.querySelector('fieldset').hidden, 'Invalid step must not advance');
      D.flushSync(() => update('Record')); await click('Next');
      assert(host.querySelectorAll('fieldset')[0].hidden, 'Valid step must advance');
      assert(document.activeElement.textContent === 'Review', 'Step change must focus its heading');
      await click('Back'); assert(name === 'Record', 'Back must preserve fields');
      await click('Next'); await click('Finish');
      assert(host.textContent.includes('Could not save.') && finished === 1, 'Failed completion must preserve the flow');
      fail = false; await click('Finish'); assert(finished === 2, 'Completion must be retryable');
      await reset();
      // Free navigation must still enforce native required fields on Finish, including hidden steps.
      await mount(h(P.Wizard,{label:'Native validation',navigation:'free',steps:[
        {id:'required',label:'Required details',content:h(P.Field,{label:'Name',required:true},h(P.Input))},
        {id:'review',label:'Review',content:h(P.Text,null,'Review')}
      ],onComplete:()=>finished++}));
      const before = finished;
      await click('Review'); await click('Finish');
      assert(finished === before && !host.querySelector('fieldset').hidden, 'Finish must reject an invalid hidden native field');
      await reset();
      // FormFlow blocks duplicate writes, keeps values on failure, and guards dirty Cancel.
      let flow, count = 0, request = deferred(), cancelled = 0;
      function Flow() { return h(P.ToastProvider,null,h(P.FormFlow,{title:'Edit record',mode:'edit',initialValue:{name:'Before'},onSubmit:()=>{count++;return request.promise;},onCancel:()=>cancelled++},f=>{flow=f;return h(P.Field,{label:'Name'},h(P.Input,{value:f.value.name,onChange:e=>f.setValue({name:e.target.value})}));})); }
      await mount(h(Flow)); D.flushSync(()=>flow.setValue({name:'After'})); await wait();
      host.querySelector('form').requestSubmit(); host.querySelector('form').requestSubmit(); await wait();
      assert(count === 1, 'A pending FormFlow submission must not repeat');
      assert(host.querySelector('input').matches(':disabled'), 'Pending form fields must not change under validation');
      request.reject(new Error('network')); await wait();
      assert(flow.value.name === 'After' && host.textContent.includes('Could not save.'), 'Failed submit must keep entered values');
      await click('Cancel');
      assert(cancelled === 0 && document.querySelector('[role="alertdialog"]'), 'Dirty Cancel must ask first');
      await click('Keep editing',document); assert(cancelled === 0, 'Keeping edits must retain the form');
      await reset();
      // Draft discard needs confirmation; failure stays actionable.
      let discarded = 0, discardFails = true;
      await mount(h(P.DraftState,{onDiscard:()=>{discarded++;return discardFails?Promise.reject(new Error('network')):Promise.resolve();}}));
      await click('Discard draft'); assert(discarded === 0,'Discard must not happen before confirmation');
      await click('Discard draft',document.querySelector('[role="alertdialog"]'));
      assert(discarded === 1 && document.querySelector('[role="alertdialog"]').textContent.includes('Could not update'), 'Discard failure must remain visible inside confirmation');
      discardFails=false; await click('Discard draft',document.querySelector('[role="alertdialog"]'));
      assert(discarded === 2 && !document.querySelector('[role="alertdialog"]'), 'Successful discard closes confirmation');
      await reset();
      // SaveAs validates whitespace and retains values when persistence fails.
      let copies = [];
      await mount(h(P.SaveAs,{initialName:'   ',initialLocation:'root',locations:[{id:'root',label:'Library'}],onSave:v=>{copies.push(v);return Promise.reject(new Error('conflict'));}}));
      await click('Save copy'); assert(copies.length===0 && host.textContent.includes('Enter a name'), 'SaveAs must reject whitespace names');
      await reset();
      await mount(h(P.SaveAs,{initialName:' Copy ',initialLocation:'root',locations:[{id:'root',label:'Library'}],formats:[{value:'pdf',label:'PDF'}],onSave:v=>{copies.push(v);return Promise.reject(new Error('conflict'));}}));
      await click('Save copy');
      assert(copies[0].name==='Copy' && copies[0].location==='root' && copies[0].format==='pdf', 'SaveAs must submit a trimmed name, location and format');
      assert(host.querySelector('input').value===' Copy ' && host.textContent.includes('Could not save'), 'Failed SaveAs must retain values');
      await reset();
      // Archive/restore is controlled and leaves the banner visible on failure.
      let archiveFail=true;
      function Archive() {const [archived,set]=R.useState(false);return h(P.ArchiveRestore,{archived,onArchive:()=>archiveFail?Promise.reject(new Error('network')):set(true),onRestore:()=>set(false)});}
      await mount(h(Archive)); await click('Archive');
      assert(!host.querySelector('.plx-banner') && host.textContent.includes('Could not update'), 'Archive failure must retain active status');
      archiveFail=false;await click('Archive');assert(host.querySelector('.plx-badge__icon'),'Archived status must have an icon Badge');
      await click('Restore');assert(!host.querySelector('.plx-banner'),'Successful restore removes archived banner');
      await reset();
      // A dirty wizard dialog guards Escape and supports each approved size.
      for (const size of ["md", "lg", "full"]) {
        let closed = 0;
        await mount(h(P.WizardDialog,{open:true,title:"Create record",size,dirty:true,onClose:()=>closed++,steps:[{id:"one",label:"Details",content:h(P.Text,null,"Details")}]}));
        const dialog = document.querySelector("[role=dialog]");
        assert(dialog && dialog.className.includes("plx-dialog--" + size), "WizardDialog must honor size " + size);
        document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));await wait();
        assert(closed===0 && document.querySelector("[role=alertdialog]"), "Dirty Escape must request confirmation");
        await click("Keep editing",document);
        assert(closed===0, "Keep editing retains the wizard dialog");
        await reset();
      }
      // A late validator must never submit a Wizard after it has been dismissed.
      let late = deferred(), lateSaves = 0;
      await mount(h(P.Wizard,{label:"Late validation",steps:[{id:"one",label:"Details",validate:()=>late.promise,content:h(P.Text,null,"Details")}],onComplete:()=>lateSaves++}));
      await click("Finish");await reset();late.resolve();await wait();
      assert(lateSaves===0,"Unmounted wizard must not submit after late validation");
      D.flushSync(()=>root.unmount());host.remove();
      return checks;
    });
    assert.deepStrictEqual(errors, []);
    console.log('W10C_OK ' + checks + ' workflow behavior checks');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
