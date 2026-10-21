const path = require('node:path');
const root = path.resolve(__dirname, '..');
const deps = process.env.TYPECHECK_DEPS;
if (!deps) throw Error('Set TYPECHECK_DEPS to an isolated install containing typescript and @types/react');
const ts = require(path.join(deps, 'node_modules/typescript'));
require('../build-types')(path.join(root, 'packages/react/index.d.ts'), require('../package.json').version);
const program = ts.createProgram([path.join(__dirname, 'fixtures/collection-types-201.ts')], {
  noEmit: true, strict: true, skipLibCheck: true, esModuleInterop: true,
  target: ts.ScriptTarget.ES2020, moduleResolution: ts.ModuleResolutionKind.Node10,
  typeRoots: [path.join(deps, 'node_modules/@types')]
});
const errors = ts.getPreEmitDiagnostics(program);
if (errors.length) { console.error(ts.formatDiagnosticsWithColorAndContext(errors, {getCurrentDirectory:()=>root,getCanonicalFileName:x=>x,getNewLine:()=> '\n'})); process.exitCode=1; }
else console.log('COLLECTION_TYPES_201_OK row inference, panel state, invalid rows and invalid choices');
