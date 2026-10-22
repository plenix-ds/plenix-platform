const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const file = 'platform/components/DataGrid/uniformPills.js';
function load() {
  const source = fs.readFileSync(file, 'utf8').replace(/^import .*;\r?$/gm, '').replace(/export /g, '');
  const context = { SIZE_STEPS: [24,28,32,40,48,64,80,100,120,160,200,240,320,360,900] };
  vm.runInNewContext(source + '\nthis.measurePills = measurePills;', context);
  return context.measurePills;
}
function pill(field, width) { return {dataset:{plxPillField:field}, querySelector:selector=>selector.includes('__value')?({scrollWidth:width}):null, ownerDocument:{defaultView:{getComputedStyle:()=>({paddingInlineStart:'6',paddingInlineEnd:'10',borderInlineStartWidth:'1',borderInlineEndWidth:'1',columnGap:'4'})}}, getBoundingClientRect:()=>({width:0})}; }
test('uniform widths use natural text, group by field and round up to a size token', () => {
  const root={querySelectorAll:()=>[pill('name',91),pill('name',10),pill('date',20)]};
  assert.deepEqual({...load()(root)}, {name:120,date:40});
});
test('removing wide rows shrinks the result and empty grids clear all widths', () => {
  const measure=load(); assert.deepEqual({...measure({querySelectorAll:()=>[pill('name',10)]})},{name:28});
  assert.deepEqual({...measure({querySelectorAll:()=>[]})},{});
});

test('nested grids cannot widen their parent column', () => {
  const outer=pill('name',10), inner=pill('name',700);
  const root={querySelectorAll:()=>[outer,inner]};
  outer.closest=()=>root; inner.closest=()=>({});
  assert.deepEqual({...load()(root)},{name:28});
});
