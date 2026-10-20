// Plenix tests · the selector-kinds classifier (check-system.rules/selector-kinds.js; the Plenix Styling Standard, 3.6)
// on its fixtures (tests/fixtures/zero-overlap/selector-kinds.css): every rule is classified as the kind its line
// expects, or produces the finding it expects; and a state variable passes only when registered with inherits: false.
const assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { classify, parse, splitList, unregisteredStates } = require('../check-system.rules/selector-kinds.js');
const lines = fs.readFileSync(path.join(__dirname, 'fixtures', 'zero-overlap', 'selector-kinds.css'), 'utf8').split('\n').filter((l) => /^\/\* expect: /.test(l));
let n = 0; const wrong = [];
for (const l of lines) {
  const want = l.match(/^\/\* expect: ([a-z -]+) \*\//)[1].trim(), css = l.replace(/^\/\*.*?\*\/\s*/, '');
  const { rules } = parse(css);
  assert.ok(rules.length, 'no rule parsed: ' + css);
  // a nested rule reports on the inner rule; every other line has one rule, judged selector by selector
  const results = rules.flatMap((r) => splitList(r.sel).map((s) => classify(s, r)));
  const got = results.find((x) => x.problem) ? 'fail ' + results.find((x) => x.problem).problem : results[0].kind;
  if (got !== want) wrong.push(want + ' expected, got ' + got + ':  ' + css);
  n++;
}
assert.deepEqual(wrong, [], wrong.join('\n'));
// state variables: registered with inherits: false passes; unregistered or inheriting fails
const sheet = (css) => Object.assign({ file: 'fixture.css' }, parse(css));
assert.deepEqual(unregisteredStates([sheet('@property --plx-state-x-a { syntax: "*"; inherits: false; } .plx-x--b{--plx-state-x-a:1px;}')]), []);
assert.equal(unregisteredStates([sheet('.plx-x--b{--plx-state-x-a:1px;}')]).length, 1);
assert.equal(unregisteredStates([sheet('@property --plx-state-x-a { syntax: "*"; inherits: true; } .plx-x--b{--plx-state-x-a:1px;}')]).length, 1);
assert.deepEqual(unregisteredStates([sheet('.plx-x{--plx-comp-empty-state-text:red;}')]), []);
console.log('SELECTOR_KINDS_TEST_OK ' + n + ' fixtures classified as expected; state-variable registration proven');
