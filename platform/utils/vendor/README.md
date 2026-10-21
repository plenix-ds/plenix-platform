# Vendored DOMPurify

DOMPurify 3.4.17, from npm dompurify@3.4.17 (Cure53 release https://github.com/cure53/DOMPurify/releases/tag/3.4.17).
Licenses: Apache 2.0 / MPL 2.0; complete upstream license retained in DOMPurify-LICENSE.txt. Upstream copyright header retained.

The upstream dist/purify.es.mjs is copied as dompurify.js. Two documented packaging changes: export createDOMPurify directly instead of creating a default browser instance at import; remove the unavailable source-map URL. Sanitization code is unchanged. This keeps policy and DOM initialization opt-in until the shared richText helper is called.

Fetched with `npm pack dompurify@3.4.17 --ignore-scripts` into an isolated tools folder; no dependency installation or runtime network loading. npm tarball shasum: 074bbb24eaa419535ac19ffe7f663104b0e1543d.

Vendored dompurify.js SHA-256: ce4fa3dc4721a41d0e39653f986722f7325e3e7bb1ac1474969289390755aa03.
