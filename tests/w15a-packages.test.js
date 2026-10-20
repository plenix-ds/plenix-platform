// Focused package contracts; optional real Angular peers live outside the repository.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{pathToFileURL}=require('url'),{createRequire}=require('module');
const ROOT=path.resolve(__dirname,'..'),PKG=path.join(ROOT,'packages');
if(!fs.existsSync(path.join(ROOT,'platform/design-system/inventory.js'))||!fs.existsSync(path.join(PKG,'angular/index.mjs'))){console.log('W15A_PACKAGES_SKIP: build packages with the design system checked out');process.exit(0);}
async function main(){
 let checks=0;const ok=(value,msg)=>{assert.ok(value,msg);checks++;},read=f=>JSON.parse(fs.readFileSync(path.join(PKG,f),'utf8'));
 const schema=read('angular/components.json'),types=fs.readFileSync(path.join(PKG,'angular/index.d.ts'),'utf8'),react=fs.readFileSync(path.join(PKG,'react/index.d.ts'),'utf8');
 const names=[...react.matchAll(/export declare const (\w+): React\.ComponentType</g)].map(m=>m[1]);assert.deepEqual(Object.keys(schema),names);checks++;
 for(const n of ['Input','Checkbox','Button','DataGrid']){ok(schema[n],'adapter '+n);ok(types.includes('class '+n+' '),'typed '+n);}
 ok(schema.Input.inputs.includes('value'),'typed value input');ok(schema.Button.events.some(e=>e.output==='plxClick'),'click output');ok(schema.Input.events.some(e=>e.output==='plxBlur'),'touch output');
 const mapping=read('figma/code-connect.json'),variables=read('figma/variables.json'),native=read('figma/native-designs.json'),original=JSON.parse(fs.readFileSync(path.join(ROOT,'platform/standards/figma-map.json'),'utf8'));
 const nodes=Object.values(original.pages).flatMap(p=>p.components||[]);assert.equal(mapping.mappings.length,nodes.length);checks++;
 for(const m of mapping.mappings){ok(nodes.some(n=>n.id===m.nodeId&&n.name===m.name),'real kit node '+m.nodeId);ok(m.url.includes(encodeURIComponent(m.nodeId)),'node URL');}
 const index=JSON.parse(fs.readFileSync(path.join(ROOT,'platform/tokens/tokens.index.json'),'utf8'));assert.equal(variables.variables.length,index.tokens.length);checks++;
 for(const token of index.tokens){const v=variables.variables.find(v=>v.name===token.name);assert.deepEqual(v.valuesByMode,Object.fromEntries(token.sets.map(s=>[s.selector,s.value])));}checks++;
 ok(Object.keys(native.pages).length>0,'native data exported');
 const api=await import(pathToFileURL(path.join(PKG,'figma/index.mjs')));assert.deepEqual(await api.mappings(),mapping);assert.deepEqual(await api.variables(),variables);assert.deepEqual(await api.nativeDesigns(),native);checks+=3;
 const peers=process.env.PLENIX_ANGULAR_PEERS;
 if(peers){
  const req=createRequire(path.join(peers,'package.json')),temp=fs.mkdtempSync(path.join(peers,'plenix-test-'));let fixture;
  try{
   fs.copyFileSync(path.join(PKG,'angular/index.mjs'),path.join(temp,'index.mjs'));
   for(const f of ['index.d.ts','react-props.d.ts'])fs.copyFileSync(path.join(PKG,'angular',f),path.join(temp,f));
   fs.writeFileSync(path.join(temp,'package.json'),JSON.stringify({type:'module'}));
   fs.writeFileSync(path.join(temp,'check.mts'),'import {Input,Button} from "./index.js";\nconst input=new Input();input.width="md";input.value="draft";\n// @ts-expect-error unknown width\ninput.width="giant";\nconst button=new Button();button.plxClick.subscribe(()=>{});\n');
   const typed=require('child_process').spawnSync(process.execPath,[req.resolve('typescript/bin/tsc'),'--noEmit','--strict','--module','NodeNext','--moduleResolution','NodeNext','--target','ES2022',path.join(temp,'check.mts')],{encoding:'utf8'});assert.equal(typed.status,0,typed.stdout+typed.stderr);checks++;

   const {JSDOM}=req('jsdom'),dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'http://localhost'});
   for(const key of ['window','document','HTMLElement','Element','Node','Event','CustomEvent'])globalThis[key]=dom.window[key];
   await import(pathToFileURL(req.resolve('zone.js/node')));await import(pathToFileURL(req.resolve('@angular/compiler')));
   const {TestBed}=await import(pathToFileURL(req.resolve('@angular/core/testing'))),{BrowserDynamicTestingModule,platformBrowserDynamicTesting}=await import(pathToFileURL(req.resolve('@angular/platform-browser-dynamic/testing')));
   TestBed.initTestEnvironment(BrowserDynamicTestingModule,platformBrowserDynamicTesting());
   const ng=await import(pathToFileURL(req.resolve('@angular/core'))),forms=await import(pathToFileURL(req.resolve('@angular/forms'))),React=req('react'),ReactDOM=req('react-dom/client'),bridge=await import(pathToFileURL(path.join(temp,'index.mjs')));
   let passed;
   bridge.configurePlenix({React,ReactDOM,Plenix:{Tree:p=>React.createElement("span",null,p.nodes[0].label),FileBrowser:p=>React.createElement("span",null,p.root.label),Input:p=>{passed=p;return React.createElement('input',{value:p.value||'',disabled:p.disabled,onChange:p.onChange,onBlur:p.onBlur});},Button:p=>React.createElement('button',{onClick:p.onClick},p.children)}});
   TestBed.configureTestingModule({imports:[bridge.Input,bridge.Button]});fixture=TestBed.createComponent(bridge.Input);fixture.detectChanges();await new Promise(r=>setTimeout(r,30));
   const instance=fixture.componentInstance,accessors=fixture.debugElement.injector.get(forms.NG_VALUE_ACCESSOR);ok(accessors.includes(instance),'actual Angular CVA provider');
   instance.writeValue('draft');await new Promise(r=>setTimeout(r,30));assert.equal(passed.value,'draft');checks++;
   let changed,touched=false,event;instance.registerOnChange(v=>changed=v);instance.registerOnTouched(()=>touched=true);instance.plxChange.subscribe(v=>event=v);passed.onChange({target:{value:'next'}});assert.equal(changed,'next');ok(event.target.value==='next','Angular output');passed.onBlur();ok(touched,'blur touch');
   instance.disabled='';instance.ngOnChanges();await new Promise(r=>setTimeout(r,30));ok(passed.disabled,'bare boolean attribute');instance.setDisabledState(true);await new Promise(r=>setTimeout(r,30));ok(passed.disabled,'disabled state');fixture.destroy();fixture=null;
   // Existing public inputs must not overwrite bridge state.
   TestBed.resetTestingModule();TestBed.configureTestingModule({imports:[bridge.Tree,bridge.FileBrowser]});
   fixture=TestBed.createComponent(bridge.Tree);fixture.componentRef.setInput('nodes',[{id:'one',label:'Tree node'}]);fixture.detectChanges();await new Promise(r=>setTimeout(r,30));ok(fixture.nativeElement.textContent.includes('Tree node'),'nodes input does not collide');fixture.destroy();fixture=null;
   fixture=TestBed.createComponent(bridge.FileBrowser);fixture.componentRef.setInput('root',{label:'File root'});fixture.detectChanges();await new Promise(r=>setTimeout(r,30));ok(fixture.nativeElement.textContent.includes('File root'),'root input does not collide');fixture.destroy();fixture=null;TestBed.resetTestingModule();
   // Exercise projection and Angular bindings through an actual standalone host.
   class Host{constructor(){this.label='Save';this.clicked=0;}}
   ng.Component({standalone:true,imports:[bridge.Button],template:'<plx-button (plxClick)="clicked=clicked+1">{{label}}</plx-button>'})(Host);
   TestBed.resetTestingModule();TestBed.configureTestingModule({imports:[Host]});fixture=TestBed.createComponent(Host);fixture.detectChanges();await new Promise(r=>setTimeout(r,30));ok(fixture.nativeElement.textContent.includes('Save'),'projected Angular content');fixture.componentInstance.label='Updated';fixture.detectChanges();ok(fixture.nativeElement.textContent.includes('Updated'),'reactive projection');fixture.nativeElement.querySelector('button').click();ok(fixture.componentInstance.clicked===1,'actual output binding');fixture.destroy();fixture=null;TestBed.resetTestingModule();class FormHost{constructor(){this.name='initial';this.disabled=false;}}
   ng.Component({standalone:true,imports:[bridge.Input,forms.FormsModule],template:'<plx-input [(ngModel)]="name" [disabled]="disabled"/>'})(FormHost);
   TestBed.configureTestingModule({imports:[FormHost]});fixture=TestBed.createComponent(FormHost);fixture.detectChanges();await new Promise(r=>setTimeout(r,40));assert.equal(passed.value,'initial');checks++;passed.onChange({target:{value:'edited'}});fixture.detectChanges();assert.equal(fixture.componentInstance.name,'edited');checks++;fixture.componentInstance.name='external';fixture.detectChanges();await new Promise(r=>setTimeout(r,40));assert.equal(passed.value,'external');checks++;fixture.componentInstance.disabled=true;fixture.detectChanges();await new Promise(r=>setTimeout(r,40));ok(passed.disabled,'ngModel disabled propagation');fixture.destroy();fixture=null;TestBed.resetTestingModule();
   TestBed.configureTestingModule({imports:[bridge.Input],providers:[{provide:ng.PLATFORM_ID,useValue:'server'}]});fixture=TestBed.createComponent(bridge.Input);fixture.detectChanges();ok(!fixture.componentInstance.__plxRoot,'server does not mount React');fixture.destroy();fixture=null;TestBed.resetTestingModule();dom.window.close();
  }finally{fixture?.destroy();fs.rmSync(temp,{recursive:true,force:true});}
 }else console.log('Angular runtime optional: set PLENIX_ANGULAR_PEERS to an external peer install');
 console.log('W15A_PACKAGES_OK '+checks+' checks');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
