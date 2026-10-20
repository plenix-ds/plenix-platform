/* Plenix · canonical table record regressions
   Summary: Covers typed identities, multi-membership groups, summaries and immutable nested/tree edits.
   Usage: node tests/data-grid-next-records.test.js.
   Props: The owned pure record helpers; no browser or engine fixture.
   Behavior: Rejects duplicate display keys and prototype paths; preserves caller-owned records.
   Notes: Exercises nested membership and missing-value summary boundaries. */
const assert = require('node:assert/strict'), path = require('path'), vm = require('vm');
const output = require('esbuild').buildSync({ entryPoints: [path.resolve(__dirname, '../platform/components/DataGrid/records.js')], bundle: true, write: false, format: 'cjs' }).outputFiles[0].text;
const moduleScope = { exports: {} }; vm.runInNewContext(output, { module: moduleScope, exports: moduleScope.exports, Set, Map, Number, JSON, Object, Array });
const { recordsOf, setField, changeRecord, groupedRows, groupSummary, groupDisplay } = moduleScope.exports;
const records = [{ id: 1, tags: ['A', 'A', 'B'], team: 'X', cost: 10, nested: { name: 'First' } }, { id: '1', tags: ['A'], team: 'Y', cost: 20 }, { id: 3, tags: [], team: 'X', cost: null }];
const rows = records.map(record => ({ id: typeof record.id + ':' + record.id, original: record, getValue: field => record[field] }));
const groups = groupedRows(rows, ['tags', 'team'], [{ field: 'tags', multi: true }]);
assert.equal(groups.length, 3); assert.equal(groups[0].rows.length, 2); assert.equal(groups[1].rows.length, 1); assert.equal(groups[0].groups.length, 2);
assert.equal(groupSummary(groups[0], { field: 'cost', summary: 'sum' }), 30); assert.equal(groupSummary(groups[0], { field: 'cost', summary: 'average' }), 15);
assert.equal(groupSummary(groups[2], { field: 'cost', summary: 'sum' }), 0); assert.equal(groupSummary(groups[2], { field: 'cost', summary: 'average' }), null);
const implicit=groupedRows(rows.map(row=>({...row,getValue:()=>{throw Error('Field has no displayed column');}})),['team'],[]);assert.equal(implicit.length,2);assert.equal(implicit[0].rows.length,2);
const display = groupDisplay(groups, new Set(), true); assert.equal(new Set(display.map(row => row.displayKey)).size, display.length);
assert.equal(display.filter(row => row.id === 'number:1').length, 2); assert.equal(groupDisplay(groups, new Set([groups[0].id]), false).filter(row => row.id === 'string:1').length, 0);
const changed = setField(records[0], 'nested.name', 'Changed'); assert.equal(changed.nested.name, 'Changed'); assert.equal(records[0].nested.name, 'First'); assert.throws(() => setField(records[0], '__proto__.bad', true), /Unsupported/);
const tree = [{ id: 5, _children: [records[0], records[1]] }]; assert.equal(recordsOf(tree, 'id', '_children').length, 3);
const updated = changeRecord(tree, 'number:1', record => ({ ...record, cost: 99 }), 'id', '_children'); assert.equal(updated[0]._children[0].cost, 99); assert.equal(tree[0]._children[0].cost, 10);
assert.equal(changeRecord(tree, 'number:1', () => null, 'id', '_children')[0]._children.length, 1);
console.log('DATA_GRID_NEXT_RECORDS_OK memberships, typed canonical IDs, summaries, display keys and immutable tree edits');
