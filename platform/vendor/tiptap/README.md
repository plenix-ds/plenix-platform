# Tiptap (vendored)

Every Plenix rich-text editor runs on Tiptap: the Platform `RichTextEditor` component drives a Tiptap `Editor` (no
`@tiptap/react`) whose editing element is the editor's area, drawn in the Plenix style with tokens only (the interface; the content keeps the person's own formatting)
(`platform/components/RichTextEditor/rich-text-editor.css`). The owner chose Tiptap on 2026-10-14: free, MIT, on
ProseMirror, and it carries what the editor can add later: editing together (Yjs
through `@tiptap/extension-collaboration`) and embeds (custom nodes). Only MIT packages are used: no Tiptap Pro or cloud
package. On 2026-10-14 the owner asked for all of Tiptap's formatting: the bundle holds every official free formatting
extension ("just use that... i would like all formatting options that come with tiptap").

| File | Packages | Version | Build | License | Source | SHA-256 |
|---|---|---|---|---|---|---|
| `tiptap.min.js` | @tiptap/core, @tiptap/pm, @tiptap/starter-kit, @tiptap/extension-list, @tiptap/extension-mention, @tiptap/extension-table, @tiptap/extension-text-style, @tiptap/extension-text-align, @tiptap/extension-highlight, @tiptap/extension-subscript, @tiptap/extension-superscript, @tiptap/extension-image, @tiptap/extension-typography (with @tiptap/suggestion, @tiptap/extension-link and the extensions the starter kit pulls in) | 3.31.3 (2026-09-04) | one minified IIFE, sets `window.PlenixTiptap` (esbuild 0.25.10, ES2019) | MIT | the npm registry (registry.npmjs.org), installed with `npm install --ignore-scripts --save-exact` | `7ba0c6e1f2acae2b48628648e306bb36baa0f57d613d6e0b2fbede29685a1282` |
| `LICENSES.txt` | every package in the bundle (46) | | the license file of each, with its name and version | MIT | the same packages | `67b5bbe0217c2f522b145656098f5f91e583975ca3e6d5f6190db265e3863de6` |

Built on 2026-10-14: 480,852 bytes, 152,582 bytes gzipped (gzip -9); the first build (StarterKit, Link and Mention only)
was 411,147 bytes, 132,211 gzipped. The bundle also holds, from the same install:
prosemirror-model 1.25.12, prosemirror-view 1.42.6, prosemirror-state 1.4.4, prosemirror-transform 1.12.2,
prosemirror-commands 1.7.2, prosemirror-history 1.5.1, prosemirror-inputrules 1.5.1, prosemirror-keymap 1.2.3,
prosemirror-schema-list 1.5.1, prosemirror-gapcursor 1.4.1, prosemirror-dropcursor 1.8.4, orderedmap 2.1.1,
rope-sequence 1.3.4, w3c-keyname 2.2.8, linkifyjs 4.3.3, prosemirror-tables 1.8.5 (2025-12-24; the table extension's) and
@floating-ui/dom 1.8.0 (with core 1.8.0, utils 0.2.12), all MIT. `@tiptap/extension-placeholder` 3.31.3 was installed too and is not used: the editor shows its placeholder on the
area itself (`.plx-rich-text-editor__area.is-empty::before`).

`window.PlenixTiptap` holds only what RichTextEditor uses. The editor keeps Tiptap's own keyboard behavior (Tab and
Shift+Tab nest and lift list items and move between table cells; Escape then Tab leaves the editor). The table is drawn
without its column group and the task item with the Platform checkbox, so the engine writes no style of its own; the
person's own formatting (color, highlight, font, size, alignment) is kept as Tiptap stores it, inline on their text. The
bundle's entry file:

```js
export { Editor, Extension, mergeAttributes } from '@tiptap/core';
export { StarterKit } from '@tiptap/starter-kit';
export { TaskList, TaskItem } from '@tiptap/extension-list';
export { Mention } from '@tiptap/extension-mention';
export { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
export { TextStyle, Color, FontFamily, FontSize } from '@tiptap/extension-text-style';
export { TextAlign } from '@tiptap/extension-text-align';
export { Highlight } from '@tiptap/extension-highlight';
export { Subscript } from '@tiptap/extension-subscript';
export { Superscript } from '@tiptap/extension-superscript';
export { Image } from '@tiptap/extension-image';
export { Typography } from '@tiptap/extension-typography';
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
2. In a new empty folder outside the repository: `npm install --ignore-scripts --save-exact` with `@<v>` on each of
   @tiptap/core, pm, starter-kit, extension-link, extension-mention, extension-list, extension-table, extension-text-style,
   extension-text-align, extension-highlight, extension-subscript, extension-superscript, extension-image and
   extension-typography; check every package is MIT.
3. Bundle the entry file above with esbuild (the repository's devDependency), from a folder of its own, with the install's
   `node_modules` as `nodePaths`: `bundle: true, minify: true, format: 'iife', globalName: 'PlenixTiptap', target: 'es2019',
   legalComments: 'none'`, and a banner naming the version and LICENSES.txt.
4. Rebuild `LICENSES.txt` from the license file of every package in the bundle (esbuild's metafile lists them).
5. Record the version, sizes and SHA-256 values (`sha256sum tiptap.min.js LICENSES.txt`) and the date here and in
   `../README.md`, and the version in the RichTextEditor's header, `tiptap.js` and its design-system record and docs.
6. Run `node build-app.js`, `node check-system.js`, `node check-spec.js`, the tests, and drive an editor in Chrome
   (every toolbar option and shortcut, Tab in lists and tables, Escape then Tab, Markdown and typography, colors, fonts,
   sizes, tables, images, task lists, paste, a mention, undo and redo, read-only, the overflow at a narrow width).
