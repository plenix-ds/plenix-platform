# Lane 200 proof

Base: e711db8309cb8d34e2264e58826a0c13b9a97cfc; DS: 87751698ff3b1c5ac5afa246e535dc5179b8ab00.
Portable Node 22.23.3 / local Chrome on the same Windows runner; light only.

- `node tests/prefetch-200.test.js`: import without a document is inert; explicit opt-in, marked links, origin/protocol/anchor/download/target exclusion, conservative intent, URL deduplication and idempotent cleanup.
- `node tests/vendor-base-200.test.js`: no implicit CDN or SSR document dereference; missing configuration throws; local script and explicit override paths work.
- `node tests/distribution-200.test.js`: package import/SSR, public opt-in subpath, no classic vendor loader in ESM, separate local engine chunk, licenses and all chunks in the offline manifest.
- `node tests/packaged-editor-200.test.js`: no engine request on import; one local lazy chunk, typing/onChange, framed editor, chunk reuse, no remote requests or page errors.
- `TRUSTED_PACKAGE=1 node tests/packaged-editor-200.test.js`: the same editor test with enforced `require-trusted-types-for 'script'; trusted-types dompurify`. An untrusted innerHTML assignment is checked to throw before the editor test. Real typing and the frame both pass. Raw log retained.
- `GLOBAL_EDITOR=1 node tests/packaged-editor-200.test.js`: classic local vendor loading and framed editing remain functional (no Trusted Types assertion on this legacy variant).
- `node tests/trusted-html-200.test.js`: enforced Trusted Types, hostile HTML stripped, valid prose retained, cleanRichText remains a string API, html-to-JSX switching removes prior content. No default policy is installed.

The shared sanitizer uses vendored DOMPurify 3.4.17 plus the pre-existing Plenix editor allow-list. The app's Trusted Types CSP allows `dompurify`. The upstream sanitizer factory is exported without eager browser/policy initialization; source, license and packaging modifications are documented under platform/utils/vendor. The existing Tiptap file is unchanged. Package generation adapts exactly two HTML assignments and one DOMParser call to this entry point via AST; an unexpected sink count stops the build. `node tests/lane-200-proof/count-upstream-sinks.cjs` records the original sinks.

Package build reports TIPTAP_TRUSTED_SINKS_OK, W15C_PACKAGES_OK (32 checks) and PERF_OK. SYSTEM_OK / SPEC_OK and syntax checks pass. No CSS or tokens changed. RichText html is sanitized into DOM nodes and mounted in the browser; JSX children remain the SSR rendering route. Classic global vendor files are retained for existing consumers; the package ESM has no script-loader fallback or remote default.

The general utilities suite has the same unrelated resource-404 finding on this head and a rebuilt detached exact base on this runner: 1 failed / 16 passed. Scope banners differ (head changed mode, base forced full), but the checks and finding match. Raw logs retained; no baseline or assertion changed.

Package fixtures install a deliberately broken ambient window.PlenixTiptap before rendering; the packaged editor still loads its own factory and works. The legacy global variant retains ambient engine reuse. Distribution contract: 4 local ESM chunks, all present with prefetch declarations and DOMPurify license in the offline manifest.

Paste follow-up: package generation also replaces the single upstream ProseMirrorClipboard identity-policy helper with the shared sanitizer. Strict CSP still allows only dompurify. Initial strong formatting, typing and hostile-HTML/plain-text clipboard tests pass in package, strict package and classic modes. The shared SAFE_HREF import is retained for the editor link callbacks.
