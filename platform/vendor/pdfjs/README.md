# PDF.js (the DocumentViewer's PDF engine)

PDF.js 4.10.38, from the official pdfjs-dist npm package. Apache-2.0; license in LICENSE. `build/pdf.mjs` and
`build/pdf.worker.mjs` renamed to `.js` for JavaScript MIME serving. The only source addition is a Plenix provenance
header; the upstream code is unchanged.

| File | SHA-256 |
|---|---|
| `pdf.js` | `7a7c23693521dad18b017e86881e538d5fb9c54314f8db978549add85400c7e7` |
| `pdf.worker.js` | `345bfc303101c22f2e7dcbc9c8cd16506987cab905be02134c5dd5dcb541d412` |

DocumentViewer loads it lazily from the shared vendor folder through `vendorBase()` (platform/utils/vendorBase.js): beside
the repository's `platform/dist/platform.js` it is `platform/vendor/pdfjs/`; beside the CDN's `plenix.js` it is
`/cdn/<version>/vendor/pdfjs/`; in the npm package `dist/vendor/pdfjs/` (build-packages.js copies it to both, and the CDN
manifest hashes it). `window.PlenixVendorBase` overrides the folder; `pdfModuleUrl` and `pdfWorkerUrl` override the files.

Serving it: `pdf.js` is an ES module (`text/javascript`); allow its origin in `script-src` and the worker in `worker-src`
(Content Security Policy); on another origin than the page it needs CORS headers (`Access-Control-Allow-Origin`).
Moved here from platform/components/DocumentViewer/vendor/ on 2026-10-22 (issue #238).
