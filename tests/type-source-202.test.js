const assert=require('node:assert/strict'),read=require('../build-types-source');
const props=read('export const Example=React.forwardRef(function Inner({as: Tag="span", count=3, onChange},ref){return <Tag/>;});','Example');
assert.equal(props.jsx,true);assert.equal(props.props.as.local,'Tag');assert.equal(props.props.as.default,'"span"');assert.equal(props.props.count.default,'3');
const forwarded=read('export function Grid(props){ const {columns=[]}=props; const value=props.data; function nested(props){return props.private;} return ready ? <Table {...props}/> : null; }','Grid');
assert.ok(forwarded.props.columns);assert.ok(forwarded.props.data);assert.equal(forwarded.props.private,undefined);assert.equal(forwarded.jsx,true);
assert.equal(read('export function helper(value){return value;}','Missing'),null);
console.log('TYPE_SOURCE_202_OK actual props, aliases/defaults, conditional JSX, ref wrappers and lexical shadowing');
