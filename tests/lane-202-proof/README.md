# Lane 202 verification

The generator reads actual source bindings, prop access and defaults, including aliased props, conditional JSX and forwarded refs. Hyphenated source prop names are quoted in declarations. Component default literals remain in their documented unions.

Structural contracts cover DataGridColumn/row callbacks, Tabs value callbacks, MediaViewer items/index, collection state and nullable AppLayout state/claim releases. DataTable preserves the DataGrid type. The hook contract resolver prefers the adjacent declaration supplied by lane201 after integration; its fallback is tested independently. Documented components must be readable; a TypeScript AST gate rejects erased component declarations and ComponentType<any>.

Local validation on target61171bfa:
- type-source-202: aliases/defaults, ref wrappers, lexical shadowing, conditional JSX and component namespaces.
- type-contracts-202: standalone fallback and adjacent lane declaration precedence.
- types-202: TypeScript5.6.3 with strict:true and skipLibCheck:false. Valid JSX compiles for columns, callbacks, MediaViewer, MediaCard4/3, Text span and hook composition. @ts-expect-error checks invalid columns, wrong row fields, DOM-event tab callbacks, media indexes/kinds, invalid aspect and hook value types. IsAny checks guard viewer/hook erasure.
- cdn-types:579 public declarations match npm/CDN output, manifest hashes and offline archive bytes.
- Build/app, usage, SYSTEM_OK1058, SPEC_OK1171/767, package/performance checks and JavaScript syntax pass.

No component implementation, stylesheet, token or baseline changed. Generated package output is checked, then left uncommitted per AGENTS.md. Full CI and Styling proof are dispatched with the PR; they are not claimed complete here.
