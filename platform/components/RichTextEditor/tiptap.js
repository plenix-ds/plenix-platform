/* Plenix · RichTextEditor engine (tiptap.js)
   Summary: Loads the engine every RichTextEditor runs on: Tiptap 3.31.3 (MIT, on ProseMirror), vendored as one file in
     platform/vendor/tiptap/tiptap.min.js that sets window.PlenixTiptap.
   Usage:
     loadTiptap().then((T) => new T.Editor({ element: { mount: el }, extensions: [T.StarterKit] }));
   Props:
     loadTiptap(win): adds the engine's script to the page once (the given window's, default this one: an editor in a
       frame runs on its frame's engine), and resolves with that window's PlenixTiptap
   Behavior:
     Only the first editor on a page loads the file; later editors reuse the same promise. Pages without an editor never
       load it (no prefetch): RichTextEditor.preload() starts the load early on a page whose first screen has an editor.
     The file comes from the vendor folder the DataTable's engine uses (vendorBase in DataTable/tabulator.js: next to the
       Platform script, the release's CDN copy in the npm package, or window.PlenixVendorBase).
     The engine has no stylesheet of its own: the few rules ProseMirror needs are in rich-text-editor.css, on tokens.
   Notes:
     A failed load rejects and is forgotten, so the next editor that mounts tries again.
     The bundle holds @tiptap/core, @tiptap/pm, @tiptap/starter-kit, @tiptap/extension-link, @tiptap/extension-mention
       and their dependencies (platform/vendor/README.md: versions, licenses, how it is built). */

import { vendorBase } from '../DataTable/tabulator.js';

const loading = new WeakMap();
export function loadTiptap(win) {
  const w = win || (typeof window !== 'undefined' ? window : null);
  if (!w) return Promise.reject(new Error('Tiptap needs a browser'));
  if (w.PlenixTiptap) return Promise.resolve(w.PlenixTiptap);
  if (loading.has(w)) return loading.get(w);
  const doc = w.document;
  const p = new Promise((resolve, reject) => {
    const script = doc.createElement('script');
    script.src = vendorBase() + 'tiptap/tiptap.min.js'; script.async = true; script.setAttribute('data-plx-vendor', 'tiptap');
    script.onload = () => { if (w.PlenixTiptap) resolve(w.PlenixTiptap); else { loading.delete(w); script.remove(); reject(new Error('Tiptap did not load from ' + script.src)); } };
    script.onerror = () => { loading.delete(w); script.remove(); reject(new Error('Tiptap could not be loaded from ' + script.src)); };
    doc.head.appendChild(script);
  });
  loading.set(w, p);
  return p;
}
