const path=require('node:path'),assert=require('node:assert/strict'),fs=require('node:fs');
const deps=process.env.TYPECHECK_DEPS;if(!deps)throw Error('Set TYPECHECK_DEPS to an isolated TypeScript/@types/react install');
const ts=require(path.join(deps,'node_modules/typescript')),root=path.resolve(__dirname,'..'),builder=require('../build-types');
builder(path.join(root,'packages/react/index.d.ts'),require('../package.json').version);
assert.throws(()=>builder.assertTypedComponents('export declare const Missing: any;',['Missing']),/documented component/);
assert.throws(()=>builder.assertTypedComponents('export declare function Missing(): any;',['Missing']),/documented component/);
assert.throws(()=>builder.assertTypedComponents('export declare const Missing: React.ComponentType<any>;',['Missing']),/documented component/);
const program=ts.createProgram([path.join(__dirname,'fixtures/types-202.tsx')],{noEmit:true,strict:true,skipLibCheck:false,esModuleInterop:true,jsx:ts.JsxEmit.React,target:ts.ScriptTarget.ES2020,moduleResolution:ts.ModuleResolutionKind.Node10,typeRoots:[path.join(deps,'node_modules/@types')]});
const errors=ts.getPreEmitDiagnostics(program);if(errors.length){console.error(ts.formatDiagnosticsWithColorAndContext(errors,{getCurrentDirectory:()=>root,getCanonicalFileName:x=>x,getNewLine:()=> '\n'}));process.exitCode=1;}else console.log('TYPES_202_OK structural columns, value callbacks, media, defaults, typed hooks and negative cases');
