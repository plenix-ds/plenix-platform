# Tiptap (vendored)

Every Plenix rich-text editor runs on Tiptap: the Platform `RichTextEditor` component drives a Tiptap `Editor` (no
`@tiptap/react`) whose editing element is the editor's area, drawn in the Plenix style with tokens only
(`platform/components/RichTextEditor/rich-text-editor.css`). The owner chose Tiptap on 2026-10-14: free, MIT, on
ProseMirror, and it carries what the editor can add later: tables (`@tiptap/extension-table`), editing together (Yjs
through `@tiptap/extension-collaboration`) and embeds (custom nodes). Only the MIT core is used: no Tiptap Pro or cloud
package.

| File | Packages | Version | Build | License | Source | SHA-256 |
|---|---|---|---|---|---|---|
| `tiptap.min.js` | @tiptap/core, @tiptap/pm, @tiptap/starter-kit, @tiptap/extension-link, @tiptap/extension-mention (with @tiptap/suggestion and the extensions the starter kit pulls in) | 3.31.3 (2026-09-04) | one minified IIFE, sets `window.PlenixTiptap` (esbuild 0.25.10, ES2019) | MIT | the npm registry (registry.npmjs.org), installed with `npm install --ignore-scripts --save-exact` | `a149da27420c8c511beb12d717398e1a0f83b31a63bbbd528273f98a72f0ca48` |
| `LICENSES.txt` | every package in the bundle | | the license file of each, with its name and version | MIT | the same packages | `73655944f7dba8802879af787930c4bf8b39d5baacd5d2d4cad70bc82d94a67f` |

Built on 2026-10-14: 411,147 bytes, 132,211 bytes gzipped (gzip -9). The bundle also holds, from the same install:
prosemirror-model 1.25.12, prosemirror-view 1.42.6, prosemirror-state 1.4.4, prosemirror-transform 1.12.2,
prosemirror-commands 1.7.2, prosemirror-history 1.5.1, prosemirror-inputrules 1.5.1, prosemirror-keymap 1.2.3,
prosemirror-schema-list 1.5.1, prosemirror-gapcursor 1.4.1, prosemirror-dropcursor 1.8.4, orderedmap 2.1.1,
rope-sequence 1.3.4, w3c-keyname 2.2.8, linkifyjs 4.3.3 and @floating-ui/dom 1.8.0 (with core 1.8.0, utils 0.2.12), all
MIT. `@tiptap/extension-placeholder` 3.31.3 was installed too and is not used: the editor shows its placeholder on the
area itself (`.plx-rich-text-editor__area.is-empty::before`).

`window.PlenixTiptap` holds only what RichTextEditor uses: `Editor`, `Extension`, `textblockTypeInputRule`, `StarterKit`
(which brings @tiptap/extension-link), `ListItem` (from @tiptap/extension-list, re-made without Tab nesting) and `Mention`. The bundle's entry file:

```js
export { Editor, Extension, textblockTypeInputRule } from '@tiptap/core';
export { StarterKit } from '@tiptap/starter-kit';
export { ListItem } from '@tiptap/extension-list';
export { Mention } from '@tiptap/extension-mention';
```

## How pages load it

Only pages that show an editor load it. The `RichTextEditor` component calls `loadTiptap()`
(`platform/components/RichTextEditor/tiptap.js`) the first time it mounts: it adds `tiptap.min.js` from this folder, once
per page (per window: an editor in a frame loads its frame's copy), and waits for `window.PlenixTiptap`. Nothing
prefetches it; a page whose first screen has an editor can call `RichTextEditor.preload()`. The folder is found as the
DataTable finds Tabulator's (`vendorBase()` in `components/DataTable/tabulator.js`: next to `platform/dist/platform.js`,
`./vendor/` next to a CDN build's `plenix.js`, the release's CDN copy in the npm package, or `window.PlenixVendorBase`).
`build-packages.js` copies this folder to the CDN (`/cdn/<version>/vendor/tiptap/`) and the React package
(`dist/vendor/tiptap/`).

Tiptap's own stylesheet is never injected (`injectCSS: false`). The few rules ProseMirror needs (white space, the
separator image, the hidden selection) are at the end of `rich-text-editor.css`, on tokens; `check-system.js` allows the two
ProseMirror classes there and nowhere else.

## Updating

1. Pick a stable release at least two weeks old (https://github.com/ueberdosis/tiptap/releases), the same version for
   every `@tiptap/*` package.
2. In a new empty folder outside the repository: `npm install --ignore-scripts --save-exact @tiptap/core@<v> @tiptap/pm@<v>
   @tiptap/starter-kit@<v> @tiptap/extension-link@<v> @tiptap/extension-mention@<v>`; check every package is MIT.
3. Bundle the entry file above with esbuild (the repository's devDependency), from a folder of its own, with the install's
   `node_modules` as `nodePaths`: `bundle: true, minify: true, format: 'iife', globalName: 'PlenixTiptap', target: 'es2019',
   legalComments: 'none'`, and a banner naming the version and LICENSES.txt.
4. Rebuild `LICENSES.txt` from the license file of every package in the bundle (esbuild's metafile lists them).
5. Record the version, sizes and SHA-256 values (`sha256sum tiptap.min.js LICENSES.txt`) and the date here and in
   `../README.md`, and the version in the RichTextEditor's header, `tiptap.js` and its design-system record and docs.
6. Run `node build-app.js`, `node check-system.js`, `node check-spec.js`, the tests, and drive an editor in Chrome
   (typing, Ctrl+B/I/K, Markdown shortcuts, paste, a mention, undo and redo, read-only).
