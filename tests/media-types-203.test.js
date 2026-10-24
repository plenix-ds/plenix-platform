const path = require('node:path');
const deps = process.env.TYPECHECK_DEPS;
if (!deps) throw Error('Set TYPECHECK_DEPS to an isolated TypeScript/@types/react install');
const ts = require(path.join(deps, 'node_modules/typescript')), root = path.resolve(__dirname, '..');
const program = ts.createProgram([path.join(__dirname, 'fixtures/media-types-203.ts')], {
  noEmit: true, strict: true, skipLibCheck: false, target: ts.ScriptTarget.ES2020,
  moduleResolution: ts.ModuleResolutionKind.Node10, typeRoots: [path.join(deps, 'node_modules/@types')]
});
const errors = ts.getPreEmitDiagnostics(program);
if (errors.length) { console.error(ts.formatDiagnosticsWithColorAndContext(errors, { getCurrentDirectory: () => root, getCanonicalFileName: x => x, getNewLine: () => '\n' })); process.exitCode = 1; }
else console.log('MEDIA_TYPES_203_OK eager/lazy collections and negative count, source and accessor cases');
